import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { margin, pairedComparison, unpairedComparison, matchStatus, kmMedian, hypothesisDecision, DAYS_PER_MONTH } from '../docs/assets/js/model/clocks.mjs';
import { build, frontierReferences, REFERENCE_WINDOW_START } from '../tools/evaluate-coding-history.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (path) => readFile(resolve(root, path), 'utf8');

test('T1 margin follows the adopted size-dependent rule with an 80-task floor', () => {
  assert.deepEqual([731, 500, 279, 150, 89, 80].map((n) => Math.round(margin(n) * 100)), [3, 3, 4, 6, 8, 8]);
  assert.equal(margin(79), null);
  assert.deepEqual(matchStatus({ diff: 0, lower: -0.01 }, null), { confirmed: false, nominal: false, reason: 'fewer than 80 tasks' });
});

test('T2 paired and unpaired comparisons separate confirmed from nominal matches', () => {
  const f = Array.from({ length: 500 }, (_, i) => Number(i < 350));
  const same = pairedComparison(f, f);
  assert.equal(same.diff, 0);
  assert.equal(same.se, 0);
  assert.equal(matchStatus(same, 0.03).confirmed, true);
  const o = f.map((value, i) => (i < 20 ? 0 : value)); // 20 fewer solved: -4 points
  const worse = pairedComparison(o, f);
  assert.ok(Math.abs(worse.diff + 0.04) < 1e-12);
  assert.deepEqual([matchStatus(worse, 0.03).confirmed, matchStatus(worse, 0.03).nominal], [false, false]);
  const close = unpairedComparison(0.69, 500, 0.70, 500);
  assert.equal(matchStatus(close, 0.03).nominal, true);
  assert.equal(matchStatus(close, 0.03).confirmed, false, 'unpaired needs the open model ahead to confirm');
  assert.throws(() => pairedComparison([1], [1, 0]));
});

test('Kaplan–Meier median keeps censored references and reports an unreached upper bound', () => {
  const events = [{ time: 100, event: true }, { time: 200, event: true }, { time: 300, event: true }, { time: 400, event: true }];
  assert.equal(kmMedian(events).median, 200);
  const censored = [{ time: 120, event: true }, { time: 150, event: true }, { time: 190, event: true }, { time: 195, event: true }, { time: 370, event: false }];
  const result = kmMedian(censored);
  assert.equal(result.median, 190);
  assert.equal(result.events, 4);
  assert.equal(result.n, 5);
  assert.equal(kmMedian([{ time: 50, event: false }, { time: 60, event: false }]).median, null);
});

test('T14 as adopted: overlap is consistent, outside is refuted, no median is inconclusive', () => {
  const m = DAYS_PER_MONTH;
  assert.equal(hypothesisDecision({ median: 5 * m, lower: 4.5 * m, upper: 5.5 * m }), 'consistent');
  assert.equal(hypothesisDecision({ median: 2 * m, lower: 1 * m, upper: 3 * m }), 'refuted');
  assert.equal(hypothesisDecision({ median: null, lower: null, upper: null }), 'inconclusive');
  // Known weakness, reported for amendment: an unbounded interval reaching into 4–6 months counts as consistent.
  assert.equal(hypothesisDecision({ median: 6.3 * m, lower: 3.9 * m, upper: null }), 'consistent');
});

test('coding history outputs are current, flagged, and never use inconsistent per-instance files', async () => {
  const { files, summary, models } = await build();
  for (const [path, contents] of Object.entries(files)) assert.equal(await read(path), contents, `${path} is stale`);
  assert.match(summary.status, /Contamination-flagged history \(T12\)/);
  const claude37 = models.find((m) => m.model === 'claude-3-7-sonnet-20250219');
  assert.match(claude37.per_instance, /^inconsistent/);
  const pairs = await read('data/derived/coding-history-pairs.csv');
  const claudeRow = pairs.split('\n').find((line) => line.startsWith('claude-3-7-sonnet'));
  assert.match(claudeRow, /,unpaired,/, 'an inconsistent per-instance file falls back to an unpaired test');
  assert.ok(pairs.split('\n').slice(1).filter(Boolean).every((line) => line.endsWith('contamination-flagged history (T12)')));
});

test('frontier references are closed Anthropic/OpenAI models inside the window, one per release date', () => {
  const models = [
    { model: 'a', org: 'OpenAI', openWeight: false, released: '2024-11-20', resolved: 0.2 },
    { model: 'b', org: 'Anthropic', openWeight: false, released: '2025-02-24', resolved: 0.5 },
    { model: 'c', org: 'OpenAI', openWeight: false, released: '2025-03-01', resolved: 0.4 },
    { model: 'd', org: 'Anthropic', openWeight: false, released: '2025-05-22', resolved: 0.6 },
    { model: 'e', org: 'Anthropic', openWeight: false, released: '2025-05-22', resolved: 0.65 },
    { model: 'f', org: 'Moonshot AI', openWeight: true, released: '2025-06-01', resolved: 0.9 },
    { model: 'g', org: 'Google DeepMind', openWeight: false, released: '2025-06-02', resolved: 0.95 },
  ];
  assert.equal(REFERENCE_WINDOW_START, '2025-01-01');
  assert.deepEqual(frontierReferences(models).map((m) => m.model), ['b', 'e']);
});
