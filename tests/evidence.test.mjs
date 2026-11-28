import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from '../tools/extract-filing-facts.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (path) => readFile(resolve(root, path), 'utf8');

function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') { cell += '"'; index += 1; } else if (character === '"') quoted = false; else cell += character;
    } else if (character === '"') quoted = true;
    else if (character === ',') { row.push(cell); cell = ''; } else if (character === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; } else cell += character;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [header, ...body] = rows;
  return { header, rows: body.map((values) => Object.fromEntries(header.map((key, index) => [key, values[index]]))), widths: body.map((values) => values.length) };
}

test('W1 extraction outputs are current and every derived check passes', async () => {
  const { files, checks } = await build();
  for (const [path, contents] of Object.entries(files)) {
    assert.equal(await read(path), contents, `${path} is stale; run node tools/extract-filing-facts.mjs`);
  }
  assert.ok(checks.length >= 20);
  assert.deepEqual(checks.filter((check) => check.result !== 'pass'), []);
});

test('W1 preserves version lineage: blanks, supersession, and alignment-limited A1 tables', async () => {
  const { facts, pressure } = await build();
  const value = (id, filing, period) => facts.find((row) => row.fact_id === id && row.filing === filing && row.period === period);
  assert.equal(value('AGG-OBLIGATIONS', 'S-1', 'as of and subsequent to 2026-09-30').status, 'blank-in-version');
  assert.equal(value('AGG-OBLIGATIONS', 'S-1/A-1', 'as of and subsequent to 2026-09-30').value, '895.4');
  for (const filing of ['S-1/A-2', 'S-1/A-3', '424B4']) {
    assert.equal(value('AGG-OBLIGATIONS', filing, 'as of and subsequent to 2026-09-30').value, '900.9');
  }
  assert.ok(facts.filter((row) => row.filing === 'S-1/A-1' && ['REV-Q', 'CI-Q', 'CI-PCT-Q'].includes(row.fact_id))
    .every((row) => row.status === 'alignment-unverified'));
  assert.ok(facts.every((row) => row.status === 'not-found' || Number(row.line_start) > 0));
  assert.equal(value('C-MICROSOFT', 'S-1', 'maximum').status, 'not-stated');
  assert.deepEqual(pressure.map((row) => row.consecutive_quarters_above), [1, 2, 3, 4, 5, 0, 0]);
  assert.ok(pressure.every((row) => row.comparability));
});

test('claim ledger is well formed, references resolve, and nothing is verified without a reviewer', async () => {
  const { header, rows, widths } = parseCSV(await read('CLAIM-LEDGER.csv'));
  assert.ok(widths.every((width) => width === header.length), 'every row has the header width');
  const ids = rows.map((row) => row.claim_id);
  assert.equal(new Set(ids).size, ids.length, 'claim IDs are unique');
  const sources = await read('SOURCES.md');
  const states = new Set(['verified', 'corroborated', 'unknown', 'contested']);
  const classes = new Set(['reported', 'derived', 'estimated', 'assumed', 'scenario']);
  for (const row of rows) {
    assert.ok(states.has(row.verification_state), `${row.claim_id} state`);
    assert.ok(classes.has(row.classification), `${row.claim_id} classification`);
    for (const source of row.source_ids.split(';').filter(Boolean)) {
      assert.ok(sources.includes(`<a id="${source.toLowerCase()}"></a>`), `${row.claim_id} cites missing ${source}`);
    }
    for (const input of row.input_ids.split(';').filter(Boolean)) assert.ok(ids.includes(input), `${row.claim_id} input ${input}`);
    if (row.verification_state === 'verified') assert.ok(row.reviewer && row.review_date, `${row.claim_id} verified without review`);
    if (row.classification === 'derived') assert.ok(row.formula, `${row.claim_id} derived without formula`);
  }
  const superseded = rows.find((row) => row.claim_id === 'CL-005');
  assert.match(superseded.caveats, /SUPERSEDED/);
  assert.match(superseded.caveats, /CL-020/);
});

test('research Markdown links added for W1 resolve to files and explicit anchors', async () => {
  for (const path of ['research/W1-FILING-RECONSTRUCTION.md', 'research/W4-DEMAND-IDENTIFICATION.md', 'paper/PAPER-DRAFT.md']) {
    const text = await read(path);
    const base = resolve(root, path, '..');
    for (const [, target] of text.matchAll(/\]\(((?:\.\.\/|[\w-]+\/|[\w-]+\.)[^)\s]*)\)/g)) {
      if (target.startsWith('http')) continue;
      const [file, fragment] = target.split('#');
      const contents = await readFile(resolve(base, file), 'utf8');
      if (fragment && /W1-FILING|W4-DEMAND|PAPER-DRAFT|SOURCES|LITERATURE-TRANCHE|INDEPENDENT-EVIDENCE/.test(file)) {
        assert.ok(contents.includes(`<a id="${fragment}"></a>`), `${path}: ${target}`);
      }
    }
  }
});
