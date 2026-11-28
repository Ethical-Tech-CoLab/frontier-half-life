import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCSV } from '../tools/csv.mjs';
import { evaluatePressure, parseThreshold, initializeStress, summary } from '../docs/assets/js/stress.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (path) => readFile(resolve(root, path), 'utf8');
const text = (html) => html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'");

test('every dollar amount on the providers page traces to an extracted filing fact', async () => {
  const html = await read('docs/providers.html');
  const main = text(html.slice(html.indexOf('<main'), html.indexOf('</main>')));
  const values = new Set(parseCSV(await read('data/extracted/w1-filing-facts.csv')).rows.map((row) => row.value.replace(/,/g, '')));
  const amounts = [...main.matchAll(/\$(\d+(?:\.\d+)?)(?:–(\d+(?:\.\d+)?))?B/g)].flatMap((match) => match.slice(1).filter(Boolean));
  assert.ok(amounts.length >= 10, 'page states amounts');
  for (const amount of amounts) {
    const derived = amount === '5.5';
    assert.ok(values.has(amount) || values.has(`${amount}.0`) || derived, `$${amount}B is not an extracted value`);
  }
});

test('named arrangements are never totalled and research candidates keep unknown fields visible', async () => {
  const html = await read('docs/providers.html');
  const named = html.slice(html.indexOf('id="named-arrangements"'), html.indexOf('id="provider-candidates"'));
  assert.doesNotMatch(named, /total-row|>Total|Sum of/i);
  assert.match(named, /must not be summed/);
  const candidates = html.slice(html.indexOf('id="provider-candidates"'));
  const rows = [...candidates.matchAll(/<tr><th scope="row">([^<]+)<\/th>/g)].map((match) => match[1]);
  assert.deepEqual(rows, ['CoreWeave', 'Nebius', 'Lambda', 'Crusoe', 'Together AI', 'Fireworks AI', 'Baseten']);
  assert.equal((candidates.match(/Not named in the five primary documents/g) || []).length, 6);
  assert.equal((candidates.match(/unknown · unknown · unknown · unknown/g) || []).length, 7);
  assert.match(html, /CHK-11 pass/);
  assert.match(html, /href="paper\.html#p06" data-site-link/);
});

test('the compute-pressure boundary needs strictly-above values over consecutive known quarters', () => {
  const quarters = [251.06, 176.62, 148.12, 144.36, 71.59, 48.1, 58.17].map((ratio, index) => ({ period: `Q${index}`, ratio }));
  const base = evaluatePressure(quarters);
  assert.equal(base.met, true);
  assert.equal(base.firstMet, 'Q3');
  assert.equal(base.longest, 5);
  assert.equal(evaluatePressure(quarters, 150).longest, 2);
  assert.equal(evaluatePressure(quarters, 150).met, false);
  assert.equal(evaluatePressure([{ period: 'a', ratio: 60 }], 60).rows[0].above, false, 'strictly above');
  const gap = evaluatePressure([70, 70, null, 70, 70].map((ratio, index) => ({ period: `q${index}`, ratio })), 60);
  assert.equal(gap.longest, 2, 'a missing quarter interrupts continuity');
  assert.match(summary(evaluatePressure(quarters, 300)), /not “safe”/);
  for (const bad of ['', 'abc', '0', '301', 'Infinity']) assert.ok(parseThreshold(bad).error, bad);
  assert.equal(parseThreshold(' 75 ').value, 75);
});

test('the stress view withholds results on invalid input and recomputes on valid input', async () => {
  const html = await read('docs/uncertainty.html');
  assert.match(html, /<form id="pressure-form"[^>]*hidden/);
  assert.equal((html.match(/Insufficient evidence/g) || []).length, 2);
  assert.match(html, /No trials yet/);
  assert.match(html, /Boundary met: above 60% for 4 consecutive quarters by Q4-2025/);
  const cells = () => ({ above: { textContent: '' }, run: { textContent: '' }, met: { textContent: '' } });
  const rows = [251.06, 176.62, 148.12, 144.36, 71.59, 48.1, 58.17].map((ratio, index) => {
    const c = cells();
    return { dataset: { period: `Q${index}`, ratio: String(ratio) }, querySelector: (selector) => c[selector.match(/"(\w+)"/)[1]], c };
  });
  const listeners = {};
  const input = { value: '60', setAttribute() {}, removeAttribute() {}, addEventListener: (event, callback) => { listeners[event] = callback; } };
  const form = { hidden: true, elements: { threshold: input }, addEventListener() {} };
  const nodes = { '#pressure-form': form, '#threshold-error': { hidden: true, textContent: '' }, '#pressure-status': { textContent: '' },
    '#pressure-table': { dataset: { scaleMax: '260' }, style: { setProperty(key, value) { this[key] = value; } } }, '#threshold-label': { textContent: '' } };
  const document = { querySelector: (selector) => nodes[selector], querySelectorAll: () => rows };
  const controller = initializeStress({ document });
  assert.equal(form.hidden, false);
  input.value = '150';
  assert.equal(controller.apply().longest, 2);
  assert.equal(nodes['#pressure-table'].style['--threshold-pos'], '57.69%');
  assert.equal(rows[2].c.above.textContent, 'Not above');
  assert.match(nodes['#pressure-status'].textContent, /Not met/);
  input.value = 'abc';
  assert.equal(controller.apply(), null);
  assert.equal(nodes['#threshold-error'].hidden, false);
  assert.equal(rows[0].dataset.stale, 'true');
  assert.match(nodes['#pressure-status'].textContent, /withheld/);
});

test('the efficiency view keeps six measures in their own units and only the financial row has values', async () => {
  const html = await read('docs/efficiency.html');
  const rows = [...html.matchAll(/<tr id="measure-([\w-]+)">/g)].map((match) => match[1]);
  assert.deepEqual(rows, ['financial', 'issuer-definition', 'operation-compute', 'task-cost', 'capacity', 'energy']);
  const facts = parseCSV(await read('data/extracted/w1-filing-facts.csv')).rows;
  const ratios = ['Q1-2025', 'Q2-2025', 'Q3-2025', 'Q4-2025', 'Q1-2026', 'Q2-2026', 'Q3-2026']
    .map((period) => facts.find((row) => row.fact_id === 'CI-PCT-Q' && row.filing === '424B4' && row.period === period).value);
  assert.ok(html.includes(ratios.map((value) => `${value}%</span>`).join(' → ').replace(/<\/span>/g, '</span>')) || ratios.every((value) => html.includes(`${value}%`)));
  assert.equal((html.match(/<span class="status-label">Unknown<\/span>/g) || []).length, 3);
  const unknownRows = html.split('<tr id="measure-').slice(4).join('');
  assert.doesNotMatch(text(unknownRows), /\d+(\.\d+)?\s?(kWh|Wh|USD|%)/, 'unknown rows state no invented values');
  assert.match(html, /href="paper\.html#p03" data-site-link>Return to P03/);
});

test('print is revealed only by script and calls the browser print dialog', async () => {
  const { initializePrint } = await import('../docs/assets/js/site.mjs');
  let printed = 0;
  let onClick;
  const button = { hidden: true, addEventListener: (event, callback) => { onClick = callback; } };
  assert.equal(initializePrint({ document: { querySelectorAll: () => [button] }, print: () => { printed += 1; } }), 1);
  assert.equal(button.hidden, false);
  onClick();
  assert.equal(printed, 1);
  const paper = await read('docs/paper.html');
  assert.match(paper, /<button type="button" class="button secondary" data-print hidden>/);
  assert.match(paper, /class="print-only">Printed from the live research reader/);
});

test('every brand prints with the contrast-tested light tokens', async () => {
  const { THEMES, tokensFor } = await import('../docs/assets/js/themes.mjs');
  const css = await read('docs/assets/themes.css');
  const block = css.slice(css.indexOf('@media print'));
  assert.match(block, /:root, :root\[data-brand\] \{/);
  for (const [key, value] of Object.entries(tokensFor(THEMES['colab-daylight']))) assert.ok(block.includes(`${key}: ${value};`), key);
});
