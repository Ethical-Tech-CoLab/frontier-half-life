// Browser controller for the rebound lab (F04/F07). All numbers come from the shared task-energy engine.
// Imported or URL-provided text is only ever written with textContent / value, never parsed as HTML.
import { MODEL_VERSION, compute, sweepElasticity, validateAbsolute, SWEEP_VALUES } from './model/task-energy.mjs';
import { SCENARIOS, scenarioById } from './model/scenarios.mjs';
import { buildManifest, parseManifest, MAX_MANIFEST_BYTES } from './model/manifest.mjs';
import {
  F04_DEFAULTS, F04_KEYS, BASELINE_KEYS, COMPARISON_ROWS, CHART, fmt, parseNumber, fieldId, errorKey, scenarioFieldKeys,
  rawFromInputs, baselineFromRaw, inputsFromRaw, readUrlState, stateHref, changeText, thresholdLabel, positionText,
  scenarioSummary, chartGeometry, chartDescription,
} from './rebound-view.mjs';

export const MANIFEST_FILENAME = 'frontier-half-life-run-manifest-v0.4.json';

// Pure: initial lab state from a query string. Presentation parameters such as ?brand= are ignored.
export function createLabState(search) {
  const url = readUrlState(search);
  const raw = Object.fromEntries(SCENARIOS.map((scenario) => [scenario.id, rawFromInputs(scenario, scenario.inputs)]));
  if (url.scenario) Object.assign(raw[url.scenario], url.values);
  const baselineRaw = Object.fromEntries(BASELINE_KEYS.map((key) => [key, url.baseline[key] ?? '']));
  return { raw, baselineRaw, selected: url.scenario, notices: url.notices, values: url.values };
}

// Pure: evaluate every future with the shared engine. Baseline errors withhold only absolute kWh.
export function evaluateLab(state) {
  const baseline = baselineFromRaw(state.baselineRaw);
  const baselineErrors = validateAbsolute(baseline);
  const absolute = baselineErrors.length ? null : baseline;
  const scenarios = Object.fromEntries(SCENARIOS.map((scenario) => {
    const inputs = inputsFromRaw(scenario, state.raw[scenario.id], absolute);
    return [scenario.id, { inputs, result: compute(inputs), sweep: sweepElasticity(inputs) }];
  }));
  return { baselineErrors, scenarios };
}

export function initializeReboundLab({ document, location, saveFile }) {
  const $ = (id) => document.getElementById(id);
  // Writing only changed text keeps polite live regions from re-announcing unchanged results.
  const setText = (id, text) => {
    if ($(id).textContent !== text) $(id).textContent = text;
  };
  for (const node of document.querySelectorAll('[data-rebound-interactive]')) node.hidden = false;

  function showFieldErrors(scope, keys, errors, mapKey = errorKey) {
    const messages = new Map();
    for (const error of errors) {
      const key = mapKey(error.field);
      if (!messages.has(key)) messages.set(key, error.message);
    }
    for (const key of keys) {
      const id = fieldId(scope, key);
      const message = messages.get(key);
      if (message) $(id).setAttribute('aria-invalid', 'true');
      else $(id).removeAttribute('aria-invalid');
      $(`${id}-error`).hidden = !message;
      setText(`${id}-error`, message ? `Error: ${message}` : '');
    }
  }

  function markState(panelId, stateId, valid, errorCount) {
    const panel = $(panelId);
    if (valid) {
      panel.removeAttribute('data-stale');
      setText(stateId, `Current · ${MODEL_VERSION}`);
    } else {
      panel.setAttribute('data-stale', '');
      setText(stateId, `Stale · result withheld (${errorCount} field error${errorCount === 1 ? '' : 's'}). Values below are from the last valid inputs, not the current ones.`);
    }
  }

  // F04 — threshold explorer.
  const f04Raw = Object.fromEntries(F04_KEYS.map((key) => [key, String(F04_DEFAULTS[key])]));
  function renderF04() {
    const inputs = Object.fromEntries(F04_KEYS.map((key) => [key, parseNumber(f04Raw[key])]));
    const result = compute(inputs);
    showFieldErrors('f04', F04_KEYS, result.ok ? [] : result.errors);
    markState('f04-result', 'f04-state', result.ok, result.ok ? 0 : result.errors.length);
    const chart = $('f04-chart');
    if (!result.ok) {
      chart.setAttribute('data-stale', '');
      setText('f04-summary', `Result withheld: ${result.errors[0].message} The chart and values show the last valid inputs.`);
      return;
    }
    chart.removeAttribute('data-stale');
    const geometry = chartGeometry(inputs.q, result.k, inputs.e);
    setText('f04-k', fmt.ratio(result.k));
    setText('f04-threshold', thresholdLabel(result.threshold));
    setText('f04-demand', fmt.ratio(result.demandRatio));
    setText('f04-energy', `${fmt.ratio(result.energyRatio)} · ${changeText(result.energyRatio)}`);
    setText('f04-summary', positionText(result.threshold, inputs.e));
    setText('f04-chart-desc', chartDescription(inputs.q, result.k, inputs.e, result.energyRatio));
    setText('f04-clip-note', geometry.clipped ? `Values above ${CHART.yMax} are clipped at the top edge.` : '');
    $('f04-curve').setAttribute('d', geometry.path);
    $('f04-threshold-mark').toggleAttribute('hidden', !geometry.threshold.visible);
    for (const attribute of ['x1', 'x2']) $('f04-threshold-line').setAttribute(attribute, geometry.threshold.x.toFixed(1));
    $('f04-threshold-text').setAttribute('x', geometry.threshold.labelX.toFixed(1));
    $('f04-threshold-text').setAttribute('text-anchor', geometry.threshold.labelAnchor);
    setText('f04-threshold-text', geometry.threshold.label);
    $('f04-point').toggleAttribute('hidden', !geometry.selected.visible);
    $('f04-point').setAttribute('cx', geometry.selected.x.toFixed(1));
    $('f04-point').setAttribute('cy', geometry.selected.y.toFixed(1));
  }
  $('f04-form').addEventListener('input', (event) => {
    const key = event.target.dataset.field;
    if (!key) return;
    f04Raw[key] = event.target.value;
    renderF04();
  });
  $('f04-reset').addEventListener('click', () => {
    for (const key of F04_KEYS) {
      f04Raw[key] = String(F04_DEFAULTS[key]);
      $(fieldId('f04', key)).value = f04Raw[key];
    }
    renderF04();
  });
  renderF04();

  // F07 — scenario comparison.
  const state = createLabState(location.search);
  const lastValid = Object.fromEntries(SCENARIOS.map((scenario) => [scenario.id, compute(scenario.inputs)]));

  function syncInputs() {
    for (const scenario of SCENARIOS) {
      for (const key of scenarioFieldKeys(scenario)) $(fieldId(scenario.id, key)).value = state.raw[scenario.id][key];
    }
    for (const key of BASELINE_KEYS) $(fieldId('baseline', key)).value = state.baselineRaw[key];
  }

  function renderScenario(scenario, evaluation, baselineInvalid) {
    const { id } = scenario;
    const { inputs, result, sweep } = evaluation;
    showFieldErrors(id, scenarioFieldKeys(scenario), result.ok ? [] : result.errors);
    markState(`${id}-result`, `${id}-state`, result.ok, result.ok ? 0 : result.errors.length);
    const options = { baselineInvalid };
    for (const [key, , value] of COMPARISON_ROWS) {
      setText(`cmp-${id}-${key}`, result.ok ? value(result, inputs, options) : 'Withheld · invalid input');
    }
    SWEEP_VALUES.forEach((e, index) => {
      setText(`sens-${id}-${index}`, result.ok ? fmt.index(sweep.rows[index].energyIndex) : 'Withheld');
    });
    setText(`sens-${id}-threshold`, result.ok ? thresholdLabel(result.threshold) : 'Withheld');
    if (!result.ok) {
      setText(`${id}-summary`, `${scenario.title}: result withheld. ${result.errors[0].message}`);
      return;
    }
    lastValid[id] = result;
    for (const [key, , value] of COMPARISON_ROWS) {
      if (key !== 'e') setText(`${id}-${key}`, value(result, inputs, options));
    }
    result.routes.forEach((route, index) => {
      if (!scenario.inputs.routes) return;
      setText(`${id}-route-${index}-S`, fmt.index(route.successIndex));
      setText(`${id}-route-${index}-E`, fmt.index(route.energyIndex));
    });
    setText(`${id}-summary`, scenarioSummary(scenario.title, result, inputs.e));
    $(`${id}-link`).href = stateHref(location.href, scenario, state.raw[id], state.baselineRaw);
  }

  function renderF07() {
    const evaluation = evaluateLab(state);
    showFieldErrors('baseline', BASELINE_KEYS, evaluation.baselineErrors, (field) => field.replace(/^absolute\./, ''));
    for (const scenario of SCENARIOS) {
      renderScenario(scenario, evaluation.scenarios[scenario.id], evaluation.baselineErrors.length > 0);
    }
    return evaluation;
  }

  function showManifestErrors(title, errors) {
    const container = $('manifest-errors');
    if (!errors.length) {
      container.replaceChildren();
      return;
    }
    const heading = document.createElement('p');
    heading.className = 'error-title';
    heading.textContent = title;
    const list = document.createElement('ul');
    for (const message of errors.slice(0, 12)) {
      const item = document.createElement('li');
      item.textContent = message;
      list.append(item);
    }
    if (errors.length > 12) {
      const item = document.createElement('li');
      item.textContent = `…and ${errors.length - 12} more.`;
      list.append(item);
    }
    container.replaceChildren(heading, list);
  }

  for (const scenario of SCENARIOS) {
    document.querySelector(`[data-scenario-form="${scenario.id}"]`).addEventListener('input', (event) => {
      const key = event.target.dataset.field;
      if (!key) return;
      state.raw[scenario.id][key] = event.target.value;
      renderF07();
    });
  }
  document.querySelector('.baseline-fieldset').addEventListener('input', (event) => {
    const key = event.target.dataset.field;
    if (!key) return;
    state.baselineRaw[key] = event.target.value;
    renderF07();
  });

  $('lab-reset').addEventListener('click', () => {
    for (const scenario of SCENARIOS) state.raw[scenario.id] = rawFromInputs(scenario, scenario.inputs);
    for (const key of BASELINE_KEYS) state.baselineRaw[key] = '';
    syncInputs();
    renderF07();
    showManifestErrors('', []);
    setText('manifest-status', 'Reset to the presets. No manifest imported.');
  });

  $('manifest-export').addEventListener('click', () => {
    const evaluation = evaluateLab(state);
    const built = evaluation.baselineErrors.length
      ? { ok: false, errors: evaluation.baselineErrors.map((error) => `Absolute baseline: ${error.message}`) }
      : buildManifest(SCENARIOS.map((scenario) => ({ id: scenario.id, inputs: evaluation.scenarios[scenario.id].inputs })));
    if (!built.ok) {
      showManifestErrors('Export withheld: a manifest must reproduce current valid results. Fix these inputs first.', built.errors);
      setText('manifest-status', 'Export withheld because some inputs are invalid.');
      return;
    }
    showManifestErrors('', []);
    saveFile(MANIFEST_FILENAME, `${JSON.stringify(built.manifest, null, 2)}\n`);
    setText('manifest-status', `Exported ${MANIFEST_FILENAME}: three futures, ${MODEL_VERSION}, paper v0.4, evidence cutoff none (indexed).`);
  });

  $('manifest-import').addEventListener('change', async (event) => {
    const input = event.target;
    const [file] = input.files || [];
    input.value = '';
    if (!file) return;
    const reject = (errors) => {
      showManifestErrors('Import rejected — the current run is unchanged.', errors);
      setText('manifest-status', 'Import rejected. The current run is unchanged.');
    };
    if (file.size > MAX_MANIFEST_BYTES) {
      reject([`The file is ${file.size} bytes; manifests are limited to 1 MiB (${MAX_MANIFEST_BYTES} bytes).`]);
      return;
    }
    if (!/\.json$/i.test(file.name) && file.type !== 'application/json') {
      reject(['Only JSON run manifests (.json) are accepted.']);
      return;
    }
    let text;
    try {
      text = await file.text();
    } catch {
      reject(['The file could not be read.']);
      return;
    }
    const parsed = parseManifest(text, file.size);
    if (!parsed.ok) {
      reject(parsed.errors);
      return;
    }
    for (const entry of parsed.entries) {
      state.raw[entry.id] = rawFromInputs(scenarioById(entry.id), entry.inputs);
    }
    const absolute = parsed.entries[0].inputs.absolute || null;
    for (const key of BASELINE_KEYS) {
      state.baselineRaw[key] = absolute && absolute[key] !== null && absolute[key] !== undefined ? String(absolute[key]) : '';
    }
    syncInputs();
    renderF07();
    showManifestErrors('', []);
    setText('manifest-status', `Imported and replayed ${parsed.entries.length} futures with ${MODEL_VERSION}; recorded results reproduced within tolerance.`);
  });

  if (state.selected) {
    const scenario = scenarioById(state.selected);
    $(`card-${scenario.id}`).setAttribute('data-selected', '');
    $(`${scenario.id}-selected`).hidden = false;
    const changed = Object.entries(state.values).map(([key, value]) => `${key} = ${String(value).slice(0, 40)}`).join(', ');
    state.notices.unshift(`Opened from a link: ${scenario.title}${changed ? ` with ${changed}` : ''}; other inputs use the preset. Presentation parameters such as brand never change inputs or results.`);
  }
  if (state.notices.length) {
    $('lab-url-notice').hidden = false;
    setText('lab-url-notice', state.notices.join(' '));
  }
  syncInputs();
  renderF07();
  return { state, renderF04, renderF07 };
}

function saveFile(filename, text) {
  const url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.hidden = true;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

if (typeof window !== 'undefined' && typeof document !== 'undefined' && document.getElementById('scenario-comparison')) {
  initializeReboundLab({ document, location: window.location, saveFile });
}
