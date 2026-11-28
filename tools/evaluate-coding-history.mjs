// Phase 1, coding history tranche: benchmark clock on SWE-bench Verified "Bash Only"
// (mini-SWE-agent) under rubric 0.4.0. Contamination-flagged history (T12): never the
// sole basis for dating a catch-up or deciding the four-to-six-month hypothesis.
// Run: node tools/evaluate-coding-history.mjs [--check]
import { readFile, readdir, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { margin, pairedComparison, unpairedComparison, matchStatus, daysBetween, kmMedian, hypothesisDecision, DAYS_PER_MONTH } from '../docs/assets/js/model/clocks.mjs';

const RAW = new URL('../data/raw/swebench-verified-bash-only/', import.meta.url);
export const CUTOFF = '2026-11-30';
export const RUBRIC = '0.4.0';
// Same model under different tags (explicit, reviewable).
export const ALIASES = Object.freeze({
  'claude-4-5-opus': 'claude-opus-4-5-20251101',
  'gpt-5-2': 'gpt-5.2-2025-12-11',
  'deepseek-v3.2-reasoner': 'deepseek-v3.2',
});
// Coordinator classification where submission metadata disagrees with public weight releases.
export const OPEN_WEIGHT_OVERRIDES = Object.freeze({
  'llama-4-maverick-instruct': 'Weights published by Meta under the Llama 4 Community License (restricted); metadata says os_model false',
  'llama-4-scout-instruct': 'Weights published by Meta under the Llama 4 Community License (restricted); metadata says os_model false',
});
const REFERENCE_VENDORS = new Set(['Anthropic', 'OpenAI']);
// Set after inspecting the data and disclosed as such: the earliest closed model in this dataset
// (GPT-4o, 2024-11-20) was not OpenAI's frontier at release, and earlier frontier models are absent.
export const REFERENCE_WINDOW_START = '2025-01-01';
// A per-instance file is used for paired tests only if it reproduces the published score.
export const PER_INSTANCE_TOLERANCE = 0.005;

const field = (yaml, key) => (yaml.match(new RegExp(`^\\s*${key}:\\s*(.*)$`, 'm'))?.[1] ?? '').trim().replace(/^['"]|['"]$/g, '');
const isoDate = (value) => `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;

export async function loadSubmissions() {
  const out = [];
  for (const name of (await readdir(RAW)).sort()) {
    if (!/_mini-v/.test(name)) continue;
    const yaml = await readFile(new URL(`${name}/metadata.yaml`, RAW), 'utf8');
    const tag = (yaml.match(/^\s*model:\s*\n\s*-\s*(.+)$/m)?.[1] ?? '').trim().toLowerCase();
    const model = ALIASES[tag] ?? tag;
    let tasks = null;
    try {
      await access(new URL(`${name}/per_instance_details.json`, RAW));
      tasks = JSON.parse(await readFile(new URL(`${name}/per_instance_details.json`, RAW), 'utf8'));
    } catch { /* aggregate-only submission */ }
    const override = OPEN_WEIGHT_OVERRIDES[model];
    const resolved = Number(field(yaml, 'resolved')) / 100;
    let perInstance = 'absent';
    if (tasks) {
      const values = Object.values(tasks);
      const mean = values.filter((task) => task.resolved === true).length / values.length;
      if (values.length === 500 && Math.abs(mean - resolved) <= PER_INSTANCE_TOLERANCE) perInstance = 'consistent';
      else {
        perInstance = `inconsistent: ${values.length} tasks, ${(mean * 100).toFixed(2)}% vs published ${(resolved * 100).toFixed(2)}%`;
        tasks = null;
      }
    }
    out.push({
      submission: name, model, display: field(yaml, 'name'), org: field(yaml, 'model_org') || field(yaml, 'org'),
      released: isoDate(field(yaml, 'model_release_date')), harness: field(yaml, 'mini-swe-agent_version'),
      effort: field(yaml, 'reasoning_effort') || 'default', resolved, perInstance,
      openWeight: override ? true : field(yaml, 'os_model') === 'true', openWeightNote: override ?? '',
      tasks, n: 500,
    });
  }
  return out;
}

// Best configuration per model, optionally restricted to one harness major version.
export function bestByModel(submissions, major = null) {
  const best = new Map();
  for (const s of submissions) {
    if (major !== null && s.harness.split('.')[0] !== major) continue;
    const current = best.get(s.model);
    if (!current || s.resolved > current.resolved || (s.resolved === current.resolved && s.submission < current.submission)) best.set(s.model, s);
  }
  return [...best.values()];
}

// T9 operationalized: an Anthropic/OpenAI closed model is a reference when its best score
// exceeds every earlier Anthropic/OpenAI model's; one reference per release date.
export function frontierReferences(models) {
  const closed = models.filter((m) => !m.openWeight && REFERENCE_VENDORS.has(m.org) && m.released >= REFERENCE_WINDOW_START).sort((a, b) => a.released.localeCompare(b.released) || b.resolved - a.resolved);
  const references = [];
  let best = -1;
  for (const m of closed) {
    if (m.resolved > best && !references.some((r) => r.released === m.released)) references.push(m);
    best = Math.max(best, m.resolved);
  }
  return references;
}

export function compare(o, f) {
  if (o.tasks && f.tasks) {
    const ids = Object.keys(f.tasks).filter((id) => id in o.tasks).sort();
    if (ids.length === Object.keys(f.tasks).length && ids.length === Object.keys(o.tasks).length) {
      return pairedComparison(ids.map((id) => Number(o.tasks[id].resolved)), ids.map((id) => Number(f.tasks[id].resolved)));
    }
  }
  return unpairedComparison(o.resolved, o.n, f.resolved, f.n);
}

export function evaluatePairs(models, cutoff = CUTOFF) {
  const open = models.filter((m) => m.openWeight).sort((a, b) => a.released.localeCompare(b.released) || a.model.localeCompare(b.model));
  return frontierReferences(models).map((f) => {
    const delta = margin(f.n);
    const rows = open.map((o) => ({ o, cmp: compare(o, f) })).map((entry) => ({ ...entry, status: matchStatus(entry.cmp, delta) }));
    const after = rows.filter(({ o }) => o.released > f.released);
    const preexisting = rows.filter(({ o, status }) => o.released <= f.released && status.confirmed).map(({ o }) => o.model);
    const confirmed = after.find(({ status }) => status.confirmed);
    const nominal = after.find(({ status }) => status.nominal);
    const censored = daysBetween(f.released, cutoff);
    const describe = (hit) => (hit ? { model: hit.o.model, released: hit.o.released, lag: daysBetween(f.released, hit.o.released),
      diff: hit.cmp.diff, lower: hit.cmp.lower, method: hit.cmp.method, harness: hit.o.harness, effort: hit.o.effort } : null);
    return { f, delta, confirmed: describe(confirmed), nominal: describe(nominal), censored, preexisting };
  });
}

const round = (value, digits = 4) => (value === null || value === undefined ? '' : Number(value.toFixed(digits)));
function csv(rows) {
  const header = Object.keys(rows[0]);
  const cell = (value) => { const text = String(value ?? ''); return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text; };
  return `${header.join(',')}\n${rows.map((row) => header.map((key) => cell(row[key])).join(',')).join('\n')}\n`;
}

function summarize(pairs, key) {
  const observations = pairs.map((p) => (p[key] ? { time: p[key].lag, event: true } : { time: p.censored, event: false }));
  const km = kmMedian(observations);
  const months = (days) => (days === null ? null : round(days / DAYS_PER_MONTH, 2));
  return { events: km.events, references: km.n, median_days: km.median, median_months: months(km.median),
    ci_lower_months: months(km.lower), ci_upper_months: km.upper === null ? 'not reached' : months(km.upper),
    within_6_months: observations.filter((o) => o.event && o.time <= 6 * DAYS_PER_MONTH).length,
    adopted_rule_label: hypothesisDecision(km) };
}

export async function build() {
  const submissions = await loadSubmissions();
  const models = bestByModel(submissions);
  const pairs = evaluatePairs(models);
  const majors = [...new Set(submissions.map((s) => s.harness.split('.')[0]))].sort();
  const sameVersion = majors.flatMap((major) => evaluatePairs(bestByModel(submissions, major)).map((p) => ({ major, ...p })));
  const modelRows = models.sort((a, b) => a.released.localeCompare(b.released) || a.model.localeCompare(b.model)).map((m) => ({
    model: m.model, display: m.display, org: m.org, released_submitter_reported: m.released, open_weight: m.openWeight,
    open_weight_note: m.openWeightNote, best_submission: m.submission, harness: m.harness, reasoning_effort: m.effort,
    resolved: round(m.resolved, 4), tasks: m.n, per_instance: m.perInstance,
    frontier_reference: frontierReferences(models).some((f) => f.model === m.model) }));
  const pairRow = (p, extra = {}) => ({ ...extra, reference: p.f.model, reference_released: p.f.released, reference_resolved: round(p.f.resolved),
    tasks: p.f.n, delta: round(p.delta, 2),
    confirmed_model: p.confirmed?.model ?? '', confirmed_released: p.confirmed?.released ?? '', confirmed_lag_days: p.confirmed?.lag ?? '',
    confirmed_diff: round(p.confirmed?.diff), confirmed_lower_bound: round(p.confirmed?.lower), confirmed_method: p.confirmed?.method ?? '',
    nominal_model: p.nominal?.model ?? '', nominal_released: p.nominal?.released ?? '', nominal_lag_days: p.nominal?.lag ?? '', nominal_diff: round(p.nominal?.diff),
    status: p.confirmed ? 'confirmed match' : `not observed by cutoff ${CUTOFF}`, censored_days: p.confirmed ? '' : p.censored,
    preexisting_matches: p.preexisting.join(';'), flag: 'contamination-flagged history (T12)' });
  const summary = {
    rubric: RUBRIC, task_set: 'SWE-bench Verified (500), Bash Only view, mini-SWE-agent', cutoff: CUTOFF,
    status: 'Contamination-flagged history (T12). Not used to decide the four-to-six-month hypothesis.',
    confirmed: summarize(pairs, 'confirmed'), nominal: summarize(pairs, 'nominal'),
    same_harness_major: Object.fromEntries(majors.map((major) => [`v${major}`, summarize(sameVersion.filter((p) => p.major === major), 'confirmed')])),
  };
  return { models: modelRows, pairs, summary, files: {
    'data/derived/coding-history-models.csv': csv(modelRows),
    'data/derived/coding-history-pairs.csv': csv(pairs.map((p) => pairRow(p))),
    'data/derived/coding-history-pairs-same-harness.csv': csv(sameVersion.map((p) => pairRow(p, { harness_major: `v${p.major}` }))),
    'data/derived/coding-history-summary.json': `${JSON.stringify(summary, null, 2)}\n`,
  } };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const check = process.argv.includes('--check');
  const { files, summary } = await build();
  for (const [path, contents] of Object.entries(files)) {
    const url = new URL(`../${path}`, import.meta.url);
    if (check) {
      if (await readFile(url, 'utf8') !== contents) throw new Error(`${path} is stale; run node tools/evaluate-coding-history.mjs`);
    } else await writeFile(url, contents);
  }
  console.log(JSON.stringify(summary, null, 2));
}
