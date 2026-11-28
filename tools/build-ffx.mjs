// Builds the filing-fact extraction set ffx-0.4 (rubric 0.4.0, §0.2) from the W1 extraction
// and the author-attested filing captures. Offline and deterministic.
// Run: node tools/build-ffx.mjs [--check]
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { parseCSV } from './csv.mjs';
import { margin } from '../docs/assets/js/model/clocks.mjs';

const root = new URL('../', import.meta.url);
const OUT = 'research/ffx-0.4/';
export const VERSION = 'ffx-0.4';
// Free-text facts carry paraphrased gold values, which exact-match scoring would penalize unfairly.
export const EXCLUDED_FACTS = Object.freeze(['CI-DEF', 'CI-DEF-2026', 'CE-DEF', 'ST-COST', 'C-LAMBDA-STATUS', 'C-FLUIDSTACK', 'CHIP-FAMILIES']);
const TABLE_FACTS = new Set(['REV-ANNUAL', 'CI-ANNUAL', 'REV-Q', 'CI-Q', 'CI-PCT-Q', 'CI-PCT-9M', 'OBL-TABLE']);
// Keyword for null-gold distractor passages from the final prospectus.
const DISTRACTOR_KEYWORDS = Object.freeze({
  'REV-ANNUAL': 'revenue', 'REV-Q': 'revenue', 'CI-ANNUAL': 'compute and infrastructure', 'CI-Q': 'compute and infrastructure',
  'CI-PCT-Q': 'percentage of revenue', 'CI-PCT-9M': 'percentage of revenue', 'CI-PCT-NARR': 'percentage of revenue', 'GROWTH-Q3': 'grew',
  'LEAD-TIME': 'in advance', 'ST-Q3': 'short-term', 'ST-9M': 'short-term', 'PRICE-Q4-2025': 'pricing', 'PRICE-Q3-2026': 'pricing',
  'AGG-SUMMARY': 'commitments', 'AGG-OBLIGATIONS': 'contractual obligations', 'AGG-2030': 'commitments', 'AGG-12M': '12 months',
  'OBL-TABLE': 'purchase commitments', 'OBL-SHORT-TERM': 'short-term commitments', 'OBL-LEASES-NC': 'not yet commenced',
  'OBL-SUBSEQUENT': 'subsequent to September 30, 2026', 'OBL-SUBSEQUENT-ST': 'subsequent', 'OBL-CONDITIONAL': 'termination rights',
  'OBL-CONDITIONAL-12M': 'termination rights', 'OBL-NO-FIXED': 'fixed dollar commitment', 'C-MICROSOFT': 'Microsoft', 'C-GOOGLE': 'Google',
  'C-GOOGLE-TPU': 'TPU', 'C-AMAZON': 'Amazon', 'C-SPACEXAI': 'SpaceXAI', 'C-SPACEXAI-MONTHLY': 'SpaceXAI', 'C-AMD': 'AMD',
  'C-BROADCOM-LEASE': 'Broadcom', 'C-NSCALE': 'Nscale', 'C-LAMBDA': 'Lambda', 'C-LAMBDA-AUG': 'Lambda',
});
const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
function monthValue(text) {
  const match = text.trim().match(/^([A-Za-z]+)(?:\s+(\d{4}))?$/);
  if (!match) return null;
  const month = MONTHS.indexOf(match[1].toLowerCase()) + 1;
  return month ? `${match[2] ?? '2026'}-${String(month).padStart(2, '0')}` : null;
}

// One fact row -> one or more typed fields with gold values (null when the version leaves it blank).
function fieldsFor(row) {
  const name = `${slug(row.fact_id)}__${slug(row.period)}`;
  const description = `${row.metric} — ${row.period} (${row.unit})`;
  if (row.status === 'blank-in-version' || row.status === 'not-stated') return [{ name, description, type: 'number', unit: row.unit, gold: null, display: null }];
  if (row.fact_id === 'LEAD-TIME') {
    const [low, high] = row.value.split('-').map(Number);
    return [{ name: 'lead_time__min', description: 'compute procurement lead time, lower end (months)', type: 'number', unit: 'months', gold: low, display: String(low) },
      { name: 'lead_time__max', description: 'compute procurement lead time, upper end (months)', type: 'number', unit: 'months', gold: high, display: String(high) }];
  }
  const month = monthValue(row.value);
  if (month) return [{ name, description: `${row.metric} — ${row.period} (month)`, type: 'month', unit: 'YYYY-MM', gold: month, display: row.value }];
  const number = Number(row.value.replace(/[ ,]/g, ''));
  if (!Number.isFinite(number)) throw new Error(`Unparsed gold value ${row.fact_id} ${row.value}`);
  return [{ name, description, type: 'number', unit: row.unit, gold: number, display: row.value }];
}

function window(lines, start, end, before, after) {
  return lines.slice(Math.max(0, start - 1 - before), Math.min(lines.length, end + after))
    .map((line) => line.replace(/\s+/g, ' ').trim()).filter(Boolean).join('\n');
}
// A gold value is findable if its digits appear in the passage (tables may split thousands separators).
export const findable = (passage, field) => field.gold === null || field.type === 'month'
  || passage.replace(/[\s,]/g, '').includes(String(field.display).replace(/[\s,]/g, ''));

export async function build() {
  const facts = parseCSV(await readFile(new URL('data/extracted/w1-filing-facts.csv', root), 'utf8')).rows
    .filter((row) => row.status !== 'not-found' && row.status !== 'alignment-unverified' && !EXCLUDED_FACTS.includes(row.fact_id));
  const captures = new Map();
  const linesOf = async (file) => {
    if (!captures.has(file)) captures.set(file, (await readFile(new URL(file, root), 'utf8')).split(/\r?\n/));
    return captures.get(file);
  };
  // Group rows into distinct passages: same fact and same matched text count once across versions.
  const groups = new Map();
  for (const row of facts) {
    const key = `${row.fact_id}|${row.match_text}`;
    if (!groups.has(key)) groups.set(key, { rows: [], versions: new Set() });
    const group = groups.get(key);
    if (!group.versions.size || group.rows[0].filing === row.filing) group.rows.push(row);
    group.versions.add(row.filing);
  }
  const instances = [];
  const dropped = [];
  for (const [key, group] of [...groups.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const first = group.rows[0];
    const lines = await linesOf(first.file);
    const start = Number(first.line_start);
    const end = Number(first.line_end);
    const passage = TABLE_FACTS.has(first.fact_id) ? window(lines, start, end, 30, 2) : window(lines, start, end, 6, 6);
    const fields = group.rows.flatMap(fieldsFor);
    const missing = fields.filter((field) => !findable(passage, field));
    if (missing.length) { dropped.push({ key, reason: `gold not found in passage: ${missing.map((f) => f.name).join(', ')}` }); continue; }
    instances.push({ id: `${VERSION}-${String(instances.length + 1).padStart(3, '0')}`, kind: 'fact', fact_id: first.fact_id,
      source_file: first.file, lines: [start, end], versions: [...group.versions], passage,
      schema: fields.map(({ name, description, type, unit }) => ({ name, description, type, unit })), gold: Object.fromEntries(fields.map((f) => [f.name, f.gold])) });
  }
  // Null-gold distractors: final-prospectus passages that mention the topic but not the gold values.
  const finalFile = 'research/04-424b4-2026-11-19__primary-document-anthropicpbc-424b4.md';
  const finalLines = await linesOf(finalFile);
  // Exclude regions around every final-prospectus fact locator, including passages first seen in earlier versions.
  const used = facts.filter((row) => row.file === finalFile).map((row) => [Number(row.line_start), Number(row.line_end)]);
  const factInstances = [...instances];
  for (const [factId, keyword] of Object.entries(DISTRACTOR_KEYWORDS)) {
    const template = factInstances.find((i) => i.fact_id === factId && i.versions.includes('424B4')) ?? factInstances.find((i) => i.fact_id === factId);
    if (!template) continue;
    const golds = Object.values(template.gold).filter((g) => g !== null).map((g) => String(g));
    const goldDisplays = facts.filter((r) => r.fact_id === factId).map((r) => r.value.replace(/[\s,]/g, ''));
    for (let line = 1; line <= finalLines.length; line += 1) {
      if (!finalLines[line - 1].toLowerCase().includes(keyword.toLowerCase())) continue;
      if (used.some(([a, b]) => line >= a - 40 && line <= b + 40)) continue;
      const passage = window(finalLines, line, line, 6, 6);
      const compact = passage.replace(/[\s,]/g, '');
      if ([...golds, ...goldDisplays].some((g) => g && compact.includes(g.replace(/[\s,]/g, '')))) continue;
      if (passage.length < 300) continue;
      used.push([line - 6, line + 6]);
      instances.push({ id: `${VERSION}-${String(instances.length + 1).padStart(3, '0')}`, kind: 'null-distractor', fact_id: factId,
        source_file: finalFile, lines: [line, line], versions: ['424B4'], passage, schema: template.schema,
        gold: Object.fromEntries(template.schema.map((f) => [f.name, null])) });
      break;
    }
  }
  const counts = { instances: instances.length, fact: instances.filter((i) => i.kind === 'fact').length,
    null_distractors: instances.filter((i) => i.kind === 'null-distractor').length,
    null_gold_fields: instances.reduce((sum, i) => sum + Object.values(i.gold).filter((g) => g === null).length, 0),
    fields: instances.reduce((sum, i) => sum + i.schema.length, 0), dropped: dropped.length };
  const delta = margin(counts.instances);
  const card = `# ${VERSION} — filing-fact extraction set (rubric 0.4.0)

| Field | Value |
| --- | --- |
| Built by | \`node tools/build-ffx.mjs\` (deterministic, offline; \`--check\` fails if stale) |
| Initial author / coordinator | yorkerhodes3 |
| Status | **Gold pending the financial reviewer's check.** Not frozen; no model has been run |
| Sources | Author-attested filing captures (S-1, Amendments 1–3, final prospectus) and the [W1 extraction](../../data/extracted/w1-filing-facts.csv) |
| Instances | ${counts.instances} (${counts.fact} fact passages, ${counts.null_distractors} null-gold distractors); ${counts.fields} fields, ${counts.null_gold_fields} with null gold |
| Equivalence margin | δ = ${delta === null ? 'none (fewer than 80 instances)' : `${Math.round(delta * 100)} points`} for ${counts.instances} instances (T1) |
| Files | [instances.jsonl](instances.jsonl) (passage, schema, gold per line) |

## Composition and rules

- **Fact passages:** one per distinct W1 passage. Unchanged passages repeated across filing versions count once; a version change, such as $895.4B to $900.9B, is a separate instance. Passages are line windows around the W1 locator (tables include 30 preceding lines so headers are visible). Gold values come from the W1 extraction; versions that leave an amount blank carry null gold, which tests abstention.
- **Null-gold distractors:** final-prospectus passages that mention the same topic (for example "Lambda" or "short-term commitments") but contain none of the fact's gold values. Every field's gold is null, so any value a model returns is a hallucinated field.
- **Excluded:** free-text facts (${EXCLUDED_FACTS.join(', ')}), whose gold strings are paraphrases; Amendment 1 table cells, whose alignment is unverified; ${counts.dropped} passages whose gold value could not be found in the window (listed below).
- **Scoring (rubric §3, T6):** numbers compared at the gold value's stated precision in the stated unit; months as \`YYYY-MM\`; success requires every field correct, including nulls.

## Known limitations

- About ${counts.instances} instances, below the 150 proposed in rubric §0.2, because exhibit records were not added: their only gold source is the filing index, which paraphrases titles. The margin is wider as a result.
- Gold for fact passages comes from this project's own patterns; distractor nulls rely on a keyword and value-string check. Both need the financial reviewer's check before the set is frozen.
- Single domain (one issuer's 2026 registration sequence).

## Review checklist for the financial reviewer

1. Spot-check fact passages: does each gold value match the passage, with the right unit and period?
2. Check every null-distractor passage: does it truly not state the field?
3. Approve, or list instance IDs to fix or remove. The set is then frozen as \`${VERSION}\` with a checksum.
${dropped.length ? `\n## Dropped passages\n\n${dropped.map((d) => `- \`${d.key}\`: ${d.reason}`).join('\n')}\n` : ''}`;
  return { instances, counts, dropped, files: {
    [`${OUT}instances.jsonl`]: `${instances.map((i) => JSON.stringify(i)).join('\n')}\n`,
    [`${OUT}README.md`]: card,
  } };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const check = process.argv.includes('--check');
  const { files, counts } = await build();
  for (const [path, contents] of Object.entries(files)) {
    const url = new URL(path, root);
    if (check) {
      if (await readFile(url, 'utf8') !== contents) throw new Error(`${path} is stale; run node tools/build-ffx.mjs`);
    } else { await mkdir(new URL('.', url), { recursive: true }); await writeFile(url, contents); }
  }
  console.log(JSON.stringify(counts));
}
