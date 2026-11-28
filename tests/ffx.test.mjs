import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, findable, EXCLUDED_FACTS } from '../tools/build-ffx.mjs';
import { margin } from '../docs/assets/js/model/clocks.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));

test('ffx-0.4 is current, sized for a match margin, and uniquely identified', async () => {
  const { files, instances } = await build();
  for (const [path, contents] of Object.entries(files)) assert.equal(await readFile(resolve(root, path), 'utf8'), contents, `${path} is stale`);
  assert.ok(instances.length >= 80, 'at least 80 instances so a match can be declared (T1)');
  assert.equal(Math.round(margin(instances.length) * 100), 8);
  assert.equal(new Set(instances.map((i) => i.id)).size, instances.length);
  assert.ok(instances.every((i) => !EXCLUDED_FACTS.includes(i.fact_id)));
});

test('every fact gold value is present in its passage, and blank versions carry null gold', async () => {
  const { instances } = await build();
  for (const instance of instances.filter((i) => i.kind === 'fact')) {
    for (const field of instance.schema) {
      const gold = instance.gold[field.name];
      assert.ok(field.description && field.unit, `${instance.id} ${field.name} is described`);
      if (gold !== null && field.type === 'number') assert.ok(findable(instance.passage, { ...field, gold, display: String(gold) }) || instance.passage.replace(/[\s,]/g, '').includes(String(gold).replace('.', '')), `${instance.id} ${field.name}`);
    }
  }
  const s1Commitment = instances.find((i) => i.fact_id === 'AGG-OBLIGATIONS' && i.versions.includes('S-1'));
  assert.ok(Object.values(s1Commitment.gold).every((g) => g === null), 'S-1 placeholders test abstention');
});

test('null-gold distractors contain none of their fact gold values', async () => {
  const { instances } = await build();
  const distractors = instances.filter((i) => i.kind === 'null-distractor');
  assert.ok(distractors.length >= 25);
  for (const d of distractors) {
    assert.ok(Object.values(d.gold).every((g) => g === null), d.id);
    const golds = instances.filter((i) => i.kind === 'fact' && i.fact_id === d.fact_id).flatMap((i) => Object.values(i.gold)).filter((g) => g !== null);
    const compact = d.passage.replace(/[\s,]/g, '');
    for (const g of golds) assert.ok(!compact.includes(String(g).replace(/,/g, '')) || String(g).length < 3, `${d.id} contains ${g}`);
  }
});
