import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MODEL_VERSION, TOLERANCE, SYNTHETIC_FIXTURES, approxEqual, compute, threshold, priceRatio, validateInputs, sweepElasticity,
} from '../docs/assets/js/model/task-energy.mjs';
import { SCENARIOS, scenarioById } from '../docs/assets/js/model/scenarios.mjs';
import { buildManifest, parseManifest, MAX_MANIFEST_BYTES } from '../docs/assets/js/model/manifest.mjs';
import { readUrlState, stateHref, rawFromInputs } from '../docs/assets/js/rebound-view.mjs';
import { createLabState, evaluateLab, initializeReboundLab } from '../docs/assets/js/rebound.mjs';

const close = (actual, expected, message) => assert.ok(approxEqual(actual, expected), `${message}: ${actual} ≉ ${expected}`);
const codes = (result) => result.errors.map((error) => error.code);
const fixtureBase = { e: 1, q: 1, s0: 0.5, s1: 0.5, iRatio: 1, pueRatio: 1, absolute: { S0: 100, I0: 0.01, p0: 1.2 } };
const presetManifest = () => buildManifest(SCENARIOS.map((scenario) => ({ id: scenario.id, inputs: scenario.inputs }))).manifest;

test('SPECIFICATION §8 fixtures reproduce 2.4, 2.4 and 4.8 kWh within the documented tolerance', () => {
  assert.equal(MODEL_VERSION, 'task-energy/0.4.0');
  assert.deepEqual(TOLERANCE, { relative: 1e-9, absolute: 1e-12 });
  const unchanged = compute(fixtureBase);
  close(unchanged.absolute.A0, 200, 'baseline attempts');
  close(unchanged.absolute.E0, 2.4, 'baseline kWh');
  close(unchanged.absolute.E1, 2.4, 'unchanged price kWh');
  const halved = { ...fixtureBase, q: 0.5, iRatio: 0.5 };
  close(compute({ ...halved, e: 1 }).absolute.E1, 2.4, 'halved price and intensity, e = 1');
  close(compute({ ...halved, e: 2 }).absolute.E1, 4.8, 'halved price and intensity, e = 2');
  close(compute({ ...halved, e: 2 }).absolute.A1, 800, 'e = 2 attempts');
  for (const fixture of SYNTHETIC_FIXTURES) close(compute(fixture.inputs).absolute.E1, fixture.expectedKWh, fixture.id);
});

test('proportional price and intensity change gives E1/E0 = g^(1−e) and break-even e* = 1', () => {
  for (const g of [0.1, 0.25, 0.5, 0.9]) {
    for (const e of [0, 0.5, 1, 1.5, 2, 3]) {
      const result = compute({ e, q: g, s0: 0.7, s1: 0.7, iRatio: g, pueRatio: 1 });
      close(result.energyRatio, g ** (1 - e), `g=${g}, e=${e}`);
    }
    const t = threshold(g, g);
    assert.equal(t.status, 'threshold');
    close(t.value, 1, `threshold for g=${g}`);
    assert.deepEqual([t.below, t.above], ['falls', 'rises']);
  }
  const sweep = sweepElasticity({ e: 1, q: 0.5, s0: 0.5, s1: 0.5, iRatio: 0.5, pueRatio: 1 });
  assert.deepEqual(sweep.rows.map((row) => row.e), [0, 0.5, 1, 1.5, 2, 2.5, 3]);
  sweep.rows.forEach((row) => close(row.energyRatio, 0.5 ** (1 - row.e), `sweep e=${row.e}`));
});

test('threshold edge cases return explicit statuses, never NaN', () => {
  const cases = [
    [[1, 1], { status: 'no-price-change', value: null, everywhere: 'unchanged' }],
    [[1, 0.8], { status: 'no-price-change', value: null, everywhere: 'falls' }],
    [[1 + 1e-12, 1.3], { status: 'no-price-change', value: null, everywhere: 'rises' }],
    [[0.5, 1], { status: 'threshold', value: 0, below: null, above: 'rises' }],
    [[0.5, 2], { status: 'outside-domain', value: -1, everywhere: 'rises' }],
    [[2, 2], { status: 'threshold', value: 1, below: 'rises', above: 'falls' }],
    [[2, 0.5], { status: 'outside-domain', value: -1, everywhere: 'falls' }],
    [[0.5, 0], { status: 'zero-energy', value: null, everywhere: 'falls' }],
  ];
  for (const [[q, k], expected] of cases) {
    const result = threshold(q, k);
    for (const [key, value] of Object.entries(expected)) {
      if (typeof value === 'number') close(result[key], value, `threshold(${q}, ${k}).${key}`);
      else assert.equal(result[key], value, `threshold(${q}, ${k}).${key}`);
    }
    assert.ok(result.message.length > 20);
  }
  for (const [q, k] of [[0, 0.5], [-1, 0.5], [Number.NaN, 0.5], [Infinity, 0.5], [0.5, -1], [0.5, Number.NaN], ['0.5', 0.5]]) {
    const result = threshold(q, k);
    assert.equal(result.status, 'invalid', `threshold(${q}, ${k})`);
    assert.equal(result.value, null);
  }
});

test('zero success, free or negative prices and nonfinite inputs fail explicitly and withhold results', () => {
  const base = { e: 1, q: 0.5, s0: 0.5, s1: 0.5, iRatio: 0.5, pueRatio: 1 };
  const failures = [
    [{ s1: 0 }, 'zero-success'], [{ s0: 0 }, 'zero-success'], [{ s1: 1.2 }, 'out-of-range'],
    [{ q: 0 }, 'free-price'], [{ q: -0.5 }, 'nonpositive-price'],
    [{ q: Infinity }, 'nonfinite'], [{ e: Number.NaN }, 'nonfinite'], [{ iRatio: -Infinity }, 'nonfinite'],
    [{ e: -1 }, 'negative-elasticity'], [{ iRatio: -0.1 }, 'negative-intensity'], [{ pueRatio: 0 }, 'out-of-range'],
    [{ q: '0.5' }, 'not-number'], [{ q: null }, 'required'], [{ q: 1e-300, e: 3 }, 'overflow'],
    [{ formula: 'alert(1)' }, 'unknown-field'], [{ routes: [{ id: 'single', share: 1, s: 0.5, iRatio: 1, pueRatio: 1 }] }, 'conflicting-fields'],
  ];
  for (const [change, code] of failures) {
    const result = compute({ ...base, ...change });
    assert.equal(result.ok, false, JSON.stringify(change));
    assert.ok(codes(result).includes(code), `${JSON.stringify(change)} → ${codes(result)}`);
    assert.equal(result.energyRatio, undefined, 'no result is returned with an error');
  }
  assert.match(compute({ ...base, s1: 0 }).errors[0].message, /cost per successful task are undefined/);
  assert.match(compute({ ...base, q: 0 }).errors[0].message, /no tiny constant/);
  assert.deepEqual(priceRatio(2, 1), { ok: true, value: 0.5 });
  assert.deepEqual(codes(priceRatio(1, 0)), ['free-price']);
  assert.deepEqual(codes(priceRatio(-1, 1)), ['nonpositive-price']);
  assert.deepEqual(codes(priceRatio(Number.NaN, Infinity)), ['nonfinite', 'nonfinite']);
});

test('missing absolute inputs give indexed-only results, never fabricated or zero kWh', () => {
  const indexed = compute({ e: 2, q: 0.5, s0: 0.5, s1: 0.5, iRatio: 0.5, pueRatio: 1 });
  assert.equal(indexed.mode, 'indexed');
  assert.equal(indexed.absolute, null);
  assert.deepEqual(indexed.missingAbsolute, ['S0', 'I0', 'p0']);
  close(indexed.index.E1, 200, 'indexed energy');
  assert.match(indexed.notes[0], /no kWh is fabricated/);
  const partial = compute({ ...fixtureBase, absolute: { S0: 100, I0: null, p0: 1.2 } });
  assert.equal(partial.mode, 'indexed');
  assert.equal(partial.absolute, null);
  assert.deepEqual(partial.missingAbsolute, ['I0']);
  assert.deepEqual(codes(compute({ ...fixtureBase, absolute: { S0: 100, I0: 0, p0: 1.2 } })), ['zero-baseline-energy']);
  assert.deepEqual(codes(compute({ ...fixtureBase, absolute: { S0: -1, I0: 0.01, p0: 1.2 } })), ['out-of-range']);
  assert.deepEqual(codes(compute({ ...fixtureBase, absolute: { S0: 100, I0: 0.01, p0: 0.9 } })), ['out-of-range']);
  assert.deepEqual(codes(compute({ ...fixtureBase, pueRatio: 0.8 })), ['pue-below-one']);
  const zeroDemand = compute({ ...fixtureBase, absolute: { S0: 0, I0: 0.01, p0: 1.2 } });
  assert.equal(zeroDemand.absolute.E1, 0);
  assert.match(zeroDemand.notes[0], /zero/);
});

test('routing shares must partition successful demand before route success and intensity apply', () => {
  const routed = (shares) => ({ e: 0.3, q: 0.8, s0: 0.6, routes: [
    { id: 'frontier', share: shares[0], s: 0.62, iRatio: 0.85, pueRatio: 1 },
    { id: 'open-model', share: shares[1], s: 0.5, iRatio: 0.45, pueRatio: 1.1 },
  ] });
  for (const shares of [[0.6, 0.3], [0.6, 0.5], [0.7, -0.7]]) {
    const result = compute(routed(shares));
    assert.equal(result.ok, false);
    assert.ok(codes(result).some((code) => code === 'shares-not-partition' || code === 'out-of-range'), String(shares));
  }
  assert.match(compute(routed([0.6, 0.3])).errors[0].message, /sum to 1; they sum to 0\.9/);
  const result = compute(routed([0.6, 0.4]));
  const k = 0.6 * (0.6 / 0.62) * 0.85 + 0.4 * (0.6 / 0.5) * 0.45 * 1.1;
  close(result.k, k, 'share-weighted k');
  close(result.energyRatio, 0.8 ** -0.3 * k, 'routed energy');
  close(result.routes[0].successIndex + result.routes[1].successIndex, result.index.S1, 'routes partition tasks');
  close(result.routes[0].energyIndex + result.routes[1].energyIndex, result.index.E1, 'routes partition energy');
  const single = compute({ e: 1.2, q: 0.5, s0: 0.6, s1: 0.7, iRatio: 0.4, pueRatio: 1.05, absolute: { S0: 50, I0: 0.02, p0: 1.3 } });
  const oneRoute = compute({ e: 1.2, q: 0.5, s0: 0.6, routes: [{ id: 'only', share: 1, s: 0.7, iRatio: 0.4, pueRatio: 1.05 }],
    absolute: { S0: 50, I0: 0.02, p0: 1.3 } });
  close(oneRoute.absolute.E1, single.absolute.E1, 'one route equals single-route inputs');
  assert.deepEqual(codes(compute({ ...routed([0.5, 0.5]), routes: [routed([0.5, 0.5]).routes[0], { ...routed([0.5, 0.5]).routes[1], id: 'frontier' }] })), ['duplicate-id']);
});

test('presets are declared, uncalibrated scenarios with rationales and valid illustrative results', () => {
  assert.deepEqual(SCENARIOS.map((scenario) => scenario.id), ['efficient-abundance', 'rebound-acceleration', 'air-pocket']);
  for (const scenario of SCENARIOS) {
    assert.equal(scenario.classification, 'scenario');
    assert.equal(scenario.evidence_status, 'assumed — not calibrated');
    assert.ok(Object.isFrozen(scenario.inputs));
    assert.ok(validateInputs(scenario.inputs).ok, scenario.id);
    assert.equal(Object.keys(scenario.rationale).length, Object.keys(rawFromInputs(scenario, scenario.inputs)).length, `${scenario.id} rationale per input`);
    assert.doesNotMatch(JSON.stringify(scenario), /anthropic|openai|coreweave|nebius|lambda|crusoe|together|fireworks|baseten|\$/i);
  }
  const [abundance, rebound, airPocket] = SCENARIOS.map((scenario) => compute(scenario.inputs));
  assert.ok(abundance.energyRatio < 1 && abundance.demandRatio > 1, 'efficient abundance: more tasks, less energy');
  assert.ok(rebound.energyRatio > 1, 'rebound acceleration: energy rises');
  assert.ok(airPocket.routes[0].successIndex < 100 && airPocket.index.S1 > 100, 'air pocket: frontier volume falls');
});

test('a manifest round trip reproduces inputs and results within tolerance', () => {
  const entries = SCENARIOS.map((scenario) => ({ id: scenario.id, inputs: { ...structuredClone(scenario.inputs), absolute: { S0: 100, I0: 0.01, p0: 1.2 } } }));
  entries[1].inputs.e = 2.2;
  const built = buildManifest(entries);
  assert.equal(built.ok, true);
  const { manifest } = built;
  assert.equal(manifest.schema, 'frontier-half-life/run-manifest');
  assert.equal(manifest.model_version, MODEL_VERSION);
  assert.equal(manifest.paper_version, 'v0.4');
  assert.equal(manifest.evidence_cutoff, 'none (indexed)');
  assert.deepEqual(manifest.scenarios.map((scenario) => scenario.id), SCENARIOS.map((scenario) => scenario.id));
  const parsed = parseManifest(JSON.stringify(manifest));
  assert.equal(parsed.ok, true, parsed.errors?.join('\n'));
  for (const [index, entry] of parsed.entries.entries()) {
    assert.deepEqual(entry.inputs, entries[index].inputs);
    const replayed = compute(entry.inputs);
    close(replayed.energyRatio, manifest.scenarios[index].results.energy_ratio, `${entry.id} energy ratio`);
    close(replayed.absolute.E1, manifest.scenarios[index].results.absolute.E1, `${entry.id} kWh`);
  }
  assert.deepEqual(buildManifest([{ id: 'efficient-abundance', inputs: { ...SCENARIOS[0].inputs, q: 0 } }]).ok, false);
});

test('incompatible, oversized, nonfinite, tampered or executable-looking manifests are rejected', () => {
  const valid = presetManifest();
  const variant = (change) => {
    const copy = structuredClone(valid);
    change(copy);
    return JSON.stringify(copy);
  };
  const rejected = [
    ['oversized', JSON.stringify({ ...valid, created_by: 'x'.repeat(MAX_MANIFEST_BYTES) }), /limited to 1 MiB/],
    ['not JSON', '{"schema": ', /not valid JSON/],
    ['array', '[]', /JSON object/],
    ['schema', variant((m) => { m.schema = 'other/manifest'; }), /Incompatible schema:/],
    ['schema version', variant((m) => { m.schema_version = '2.0.0'; }), /schema version/],
    ['model version', variant((m) => { m.model_version = 'task-energy/0.5.0'; }), /model version/],
    ['paper version', variant((m) => { m.paper_version = 'v0.5'; }), /paper version/],
    ['cutoff', variant((m) => { m.evidence_cutoff = '2026-11-27'; }), /evidence cutoff/],
    ['nonfinite', JSON.stringify(valid).replace('"e":0.6', '"e":1e400'), /nonfinite/],
    ['unknown top-level field', variant((m) => { m.onload = 'alert(1)'; }), /unknown field “onload”/],
    ['prototype key', JSON.stringify(valid).replace('"schema":', '"__proto__":{"polluted":true},"schema":'), /unknown field “__proto__”/],
    ['unknown input field', variant((m) => { m.scenarios[0].inputs.script = '<script>'; }), /Unknown input field/],
    ['markup note', variant((m) => { m.created_by = '<img src=x onerror=alert(1)>'; }), /without markup/],
    ['broken scenario reference', variant((m) => { m.scenarios[0].id = 'calibrated-company'; }), /unknown scenario reference/],
    ['broken route reference', variant((m) => { m.scenarios[2].inputs.routes[1].id = 'provider-x'; }), /route references/],
    ['duplicate scenario', variant((m) => { m.scenarios[1] = structuredClone(m.scenarios[0]); }), /only once/],
    ['missing scenario', variant((m) => { m.scenarios.pop(); }), /exactly the 3/],
    ['tampered result', variant((m) => { m.scenarios[0].results.energy_ratio = 0.1; }), /does not reproduce within tolerance/],
    ['invalid input', variant((m) => { m.scenarios[0].inputs.q = 0; }), /zero \(free\) price/],
    ['mixed baselines', variant((m) => { m.scenarios[0].inputs.absolute = { S0: 1, I0: 1, p0: 1 }; }), /share the same absolute baseline|does not reproduce/],
  ];
  for (const [label, text, pattern] of rejected) {
    const result = parseManifest(text);
    assert.equal(result.ok, false, label);
    assert.ok(result.errors.some((error) => pattern.test(error)), `${label}: ${result.errors.join(' | ')}`);
  }
  assert.equal({}.polluted, undefined);
  assert.ok(Object.isFrozen(SCENARIOS[0].inputs), 'presets cannot be mutated by imports');
});

test('URL replay state ignores presentation parameters and surfaces invalid values as field errors', () => {
  const anthropic = createLabState('?brand=anthropic&scenario=rebound-acceleration&e=1.4');
  const colab = createLabState('?brand=colab&scenario=rebound-acceleration&e=1.4');
  assert.deepEqual(anthropic, colab);
  assert.deepEqual(evaluateLab(anthropic), evaluateLab(colab));
  assert.equal(anthropic.raw['rebound-acceleration'].e, '1.4');
  const routed = readUrlState('?scenario=air-pocket&frontier.share=0.7&open-model.share=0.3&s1=0.5&seed=42');
  assert.deepEqual(routed.values, { 'routes.0.share': '0.7', 'routes.1.share': '0.3' });
  assert.ok(routed.notices.some((notice) => /seed.*deterministic/.test(notice)));
  assert.ok(routed.notices.some((notice) => /“s1” does not apply/.test(notice)));
  assert.match(readUrlState('?scenario=<b>x</b>').notices[0], /Unknown scenario/);
  assert.match(readUrlState('?e=2').notices[0], /need a scenario/);
  const invalid = evaluateLab(createLabState('?scenario=efficient-abundance&q=0'));
  assert.equal(invalid.scenarios['efficient-abundance'].result.ok, false);
  assert.deepEqual(codes(invalid.scenarios['efficient-abundance'].result), ['free-price']);
  assert.equal(invalid.scenarios['rebound-acceleration'].result.ok, true, 'other futures are unaffected');
  const scenario = scenarioById('air-pocket');
  const raw = { ...rawFromInputs(scenario, scenario.inputs), 'routes.0.share': '0.5', 'routes.1.share': '0.5' };
  const href = stateHref('https://example.test/docs/rebound.html?brand=anthropic&view=print#top', scenario, raw, { S0: '100', I0: '', p0: '' });
  const url = new URL(href);
  assert.equal(url.searchParams.get('brand'), 'anthropic');
  assert.equal(url.searchParams.get('view'), 'print');
  assert.equal(url.hash, '#scenario-comparison');
  const replay = readUrlState(url.search);
  assert.equal(replay.scenario, 'air-pocket');
  assert.deepEqual(replay.values, raw);
  assert.deepEqual(replay.baseline, { S0: '100' });
});

function fakeLab(search) {
  const nodes = new Map();
  const listeners = new Map();
  const node = (id) => {
    if (!nodes.has(id)) {
      nodes.set(id, {
        id, hidden: false, value: '', textContent: '', href: '', attributes: {}, children: [],
        setAttribute(key, value) { this.attributes[key] = String(value); },
        removeAttribute(key) { delete this.attributes[key]; },
        hasAttribute(key) { return Object.hasOwn(this.attributes, key); },
        toggleAttribute(key, force) { if (force) this.attributes[key] = ''; else delete this.attributes[key]; },
        addEventListener(event, callback) { listeners.set(`${id}:${event}`, callback); },
        replaceChildren(...children) { this.children = children; },
      });
    }
    return nodes.get(id);
  };
  const document = {
    getElementById: node,
    querySelector: node,
    querySelectorAll: () => [],
    createElement: (tag) => ({ tag, className: '', textContent: '', children: [], append(...children) { this.children.push(...children); } }),
  };
  const saved = [];
  const lab = initializeReboundLab({ document, location: { search: search ?? '', href: `https://example.test/docs/rebound.html${search ?? ''}` },
    saveFile: (name, text) => saved.push({ name, text }) });
  const results = () => [...nodes.values()].filter((item) => /^(cmp|sens)-|-(S1|A1|E1|k|threshold|absolute|summary)$/.test(item.id))
    .map((item) => `${item.id}=${item.textContent}`).sort().join('\n');
  const file = (name, text, type = 'application/json') => ({ name, type, size: new TextEncoder().encode(text).length, text: async () => text });
  const importFile = (selected) => listeners.get('manifest-import:change')({ target: { files: [selected], value: selected.name } });
  return { lab, node, listeners, saved, results, file, importFile };
}

test('the lab controller withholds invalid results as stale and keeps the run when an import is rejected', async () => {
  const lab = fakeLab('?brand=colab');
  assert.match(lab.node('air-pocket-state').textContent, /^Current · task-energy\/0\.4\.0/);
  const previousEnergy = lab.node('air-pocket-E1').textContent;
  lab.listeners.get('[data-scenario-form="air-pocket"]:input')({ target: { dataset: { field: 'routes.0.share' }, value: '0.5' } });
  assert.match(lab.node('air-pocket-state').textContent, /^Stale · result withheld/);
  assert.ok(lab.node('air-pocket-result').hasAttribute('data-stale'));
  assert.equal(lab.node('air-pocket-routes-0-share').attributes['aria-invalid'], 'true');
  assert.match(lab.node('air-pocket-routes-0-share-error').textContent, /^Error: Route shares must partition/);
  assert.equal(lab.node('air-pocket-E1').textContent, previousEnergy, 'previous output stays visible, labeled stale');
  assert.equal(lab.node('cmp-air-pocket-E1').textContent, 'Withheld · invalid input');
  assert.equal(lab.node('sens-air-pocket-0').textContent, 'Withheld');
  lab.listeners.get('manifest-export:click')();
  assert.equal(lab.saved.length, 0, 'invalid runs are not exported');
  assert.match(lab.node('manifest-status').textContent, /Export withheld/);

  lab.listeners.get('[data-scenario-form="air-pocket"]:input')({ target: { dataset: { field: 'routes.1.share' }, value: '0.5' } });
  assert.match(lab.node('air-pocket-state').textContent, /^Current/);
  const before = JSON.stringify(lab.lab.state);
  const shown = lab.results();
  const bad = structuredClone(presetManifest());
  bad.model_version = 'task-energy/9.0.0';
  for (const selected of [lab.file('bad.json', JSON.stringify(bad)), lab.file('notes.txt', 'hello', 'text/plain'),
    lab.file('nonfinite.json', JSON.stringify(presetManifest()).replace('"e":0.6', '"e":1e400')),
    { name: 'huge.json', type: 'application/json', size: MAX_MANIFEST_BYTES + 1, text: async () => '{}' }]) {
    await lab.importFile(selected);
    assert.equal(JSON.stringify(lab.lab.state), before, `${selected.name} must not replace the run`);
    assert.equal(lab.results(), shown, `${selected.name} must not change displayed results`);
    assert.match(lab.node('manifest-status').textContent, /rejected.*unchanged/);
    assert.match(lab.node('manifest-errors').children[0].textContent, /current run is unchanged/);
  }

  lab.listeners.get('manifest-export:click')();
  assert.equal(lab.saved.length, 1);
  assert.equal(lab.saved[0].name, 'frontier-half-life-run-manifest-v0.4.json');
  const exported = parseManifest(lab.saved[0].text);
  assert.equal(exported.ok, true);
  assert.equal(exported.entries[2].inputs.routes[0].share, 0.5);
  lab.listeners.get('lab-reset:click')();
  assert.equal(lab.lab.state.raw['air-pocket']['routes.0.share'], '0.6');
  await lab.importFile(lab.file('run.json', lab.saved[0].text));
  assert.match(lab.node('manifest-status').textContent, /^Imported and replayed 3 futures/);
  assert.equal(lab.lab.state.raw['air-pocket']['routes.0.share'], '0.5');
  assert.equal(lab.node('air-pocket-routes-0-share').value, '0.5');
});

test('rendered lab results are identical whichever presentation brand is in the URL', () => {
  const replay = 'scenario=rebound-acceleration&e=1.4';
  const outputs = ['colab', 'anthropic', 'openai', 'not-a-theme'].map((brand) => fakeLab(`?brand=${brand}&${replay}`).results());
  for (const output of outputs.slice(1)) assert.equal(output, outputs[0]);
  assert.match(outputs[0], /cmp-rebound-acceleration-E1=199\.8 · \+99\.8%/);
});
