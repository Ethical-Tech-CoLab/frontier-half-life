import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { blocks, inline } from '../tools/markdown.mjs';
import { citedClaims, splitManuscript, loadResearch } from '../tools/render-reader.mjs';
import { initializeClaims, matches } from '../docs/assets/js/evidence.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (path) => readFile(resolve(root, path), 'utf8');
const ids = (html) => [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);

test('manuscript Markdown is escaped: source text cannot inject markup', () => {
  const html = blocks('<script>alert(1)</script> **bold** `0<g<1` [x](javascript:alert(1)) <img src=x onerror=1>')
    .map((block) => block.html).join('');
  assert.doesNotMatch(html, /<script|<img/);
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /<strong>bold<\/strong>/);
  assert.match(html, /<code>0&lt;g&lt;1<\/code>/);
  assert.equal(inline('[a](b)', { link: () => null }), 'a');
});

test('ranges expand when counting cited claims', () => {
  assert.deepEqual(citedClaims('see CL-001–CL-003 and CL-020'), ['CL-001', 'CL-002', 'CL-003', 'CL-020']);
});

test('the reader renders every manuscript section from source with no hand-maintained copy', async () => {
  const paper = await read('docs/paper.html');
  const { manuscript } = loadResearch();
  const { sections } = splitManuscript(manuscript);
  assert.equal(sections.length, 13);
  for (const section of sections) {
    assert.ok(ids(paper).includes(section.id), section.id);
    const first = blocks(section.markdown).find((block) => block.type === 'p');
    const words = first.text.replace(/[`*[\]()]/g, '').split(/\s+/).slice(0, 6).join(' ');
    assert.ok(paper.replace(/<[^>]+>/g, '').replace(/&#39;/g, "'").replace(/&amp;/g, '&').includes(words), `${section.id}: ${words}`);
  }
  assert.match(paper, /yorkerhodes3/);
  assert.match(paper, /v0\.4/);
});

test('every cited claim links to an evidence card, and every card links back to its citing sections', async () => {
  const paper = await read('docs/paper.html');
  const evidence = await read('docs/evidence.html');
  const { manuscript, ledger } = loadResearch();
  const known = new Set(ledger.map((row) => row.claim_id));
  for (const claim of citedClaims(manuscript)) {
    assert.ok(known.has(claim), `${claim} is cited but missing from the ledger`);
    assert.ok(ids(evidence).includes(claim.toLowerCase()), `${claim} card`);
  }
  for (const [, id] of paper.matchAll(/class="claim-ref" href="evidence\.html#(cl-\d{3})"/g)) {
    assert.ok(ids(evidence).includes(id), id);
  }
  assert.match(evidence, /id="cl-005"[\s\S]*?Superseded/);
  assert.match(evidence, /href="paper\.html#p06" data-site-link>Return to P06/);
  assert.doesNotMatch(evidence, /Verification: verified/);
});

test('figure panels follow the registry: live routes resolve, planned routes are never links', async () => {
  const paper = await read('docs/paper.html');
  const { figures, manuscript } = loadResearch();
  assert.deepEqual(figures.map((figure) => figure.id), ['F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'F07', 'F08', 'F09']);
  for (const figure of figures) {
    assert.match(manuscript, new RegExp(`\\*\\*${figure.id} — `), `${figure.id} paragraph exists`);
    const panel = paper.match(new RegExp(`<aside class="figure-ref" id="${figure.id.toLowerCase()}"[\\s\\S]*?</aside>`));
    assert.ok(panel, `${figure.id} panel`);
    const [page, fragment] = figure.route.split('#');
    if (figure.status === 'live') {
      assert.match(panel[0], /Live view · not calibrated/);
      assert.ok(panel[0].includes(`href="${figure.route}"`));
      assert.ok(ids(await read(`docs/${page}`)).includes(fragment), figure.route);
    } else {
      assert.match(panel[0], /Planned · not available/);
      assert.ok(!panel[0].includes(`href="${figure.route}"`), `${figure.id} must not link a planned route`);
    }
  }
});

test('claim filters hide only non-matching cards, report empty results, and reveal linked claims', () => {
  const card = (id, state, classification, search) => ({ id, hidden: false, dataset: { state, classification, search } });
  const cards = [card('cl-001', 'unknown', 'reported', 'cl-001 revenue'), card('cl-025', 'unknown', 'derived', 'cl-025 pressure')];
  const listeners = {};
  const elements = { state: { value: '' }, classification: { value: '' }, search: { value: '' } };
  const form = {
    hidden: true, elements,
    addEventListener(event, callback) { listeners[event] = callback; },
    reset() { elements.state.value = ''; elements.classification.value = ''; elements.search.value = ''; },
  };
  const count = { textContent: '' };
  const empty = { hidden: true };
  const location = { hash: '' };
  const document = {
    querySelector: (selector) => ({ '#claim-filters': form, '#claim-count': count, '#claims-empty': empty })[selector],
    querySelectorAll: () => cards,
  };
  let onHash;
  const controller = initializeClaims({ document, location, listen: (event, callback) => { onHash = callback; } });
  assert.equal(form.hidden, false);
  elements.classification.value = 'derived';
  assert.equal(controller.apply(), 1);
  assert.equal(cards[0].hidden, true);
  assert.match(count.textContent, /1 of 2/);
  elements.search.value = 'nothing';
  assert.equal(controller.apply(), 0);
  assert.equal(empty.hidden, false);
  location.hash = '#cl-001';
  onHash();
  assert.equal(cards[0].hidden, false);
  assert.equal(empty.hidden, true);
  assert.equal(matches(cards[1], { search: 'PRESSURE' }), true);
});

test('reader styles use only the contrast-tested text tokens', async () => {
  const css = await read('docs/assets/reader.css');
  const used = [...css.matchAll(/(?:^|[;{\s])color:\s*var\((--[\w-]+)\)/g)].map((match) => match[1]);
  assert.ok(used.every((token) => ['--accent', '--accent-ink', '--fg', '--muted'].includes(token)), used.join());
  assert.doesNotMatch(css, /(?:^|[;{\s])opacity\s*:/);
  assert.doesNotMatch(await read('docs/assets/js/evidence.mjs'), /innerHTML|\bfetch\(|eval\(/);
});
