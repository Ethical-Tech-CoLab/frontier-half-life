// Versioned run manifests for the rebound lab (FR-07). Imported manifests are data only: strict keys,
// finite numbers, known scenario/route references, and results that must reproduce within TOLERANCE.
import { MODEL_VERSION, TOLERANCE, INDEX_BASE, approxEqual, compute, isPlainObject, validateInputs } from './task-energy.mjs';
import { SCENARIOS, SCENARIO_CLASSIFICATION, SCENARIO_EVIDENCE_STATUS, WORKLOAD, scenarioById, cloneInputs } from './scenarios.mjs';

export const MANIFEST_SCHEMA = 'frontier-half-life/run-manifest';
export const MANIFEST_SCHEMA_VERSION = '1.0.0';
export const PAPER_VERSION = 'v0.4';
export const EVIDENCE_CUTOFF = 'none (indexed)';
export const MAX_MANIFEST_BYTES = 1024 * 1024;
export const CREATED_BY = 'Frontier half-life rebound lab (v0.4) export. Deterministic engine; no random seed. Illustrative indexed scenarios — not calibrated, not a forecast.';
const FIGURES = Object.freeze(['F07']);
const MODEL_COMPATIBLE = /^task-energy\/0\.4\.\d+$/;
const SCHEMA_COMPATIBLE = /^1\.\d+\.\d+$/;
const TOP_KEYS = Object.freeze(['schema', 'schema_version', 'model_version', 'paper_version', 'evidence_cutoff', 'workload',
  'index_base', 'figures', 'classification', 'evidence_status', 'tolerance', 'created_by', 'scenarios']);
const SCENARIO_KEYS = Object.freeze(['id', 'inputs', 'results']);

export function summarize(result) {
  return {
    mode: result.mode,
    demand_ratio: result.demandRatio,
    attempts_ratio: result.attemptsRatio,
    effective_intensity_ratio: result.k,
    energy_ratio: result.energyRatio,
    threshold: { status: result.threshold.status, value: result.threshold.value },
    routes: result.routes.map((route) => ({
      id: route.id, success_index: route.successIndex, attempts_index: route.attemptsIndex, energy_index: route.energyIndex,
    })),
    absolute: result.absolute ? { ...result.absolute } : null,
  };
}

export function buildManifest(entries) {
  const errors = [];
  const scenarios = entries.map(({ id, inputs }) => {
    const result = compute(inputs);
    if (!result.ok) {
      const title = scenarioById(id)?.title || id;
      errors.push(...result.errors.map((error) => `${title}: ${error.message}`));
      return null;
    }
    return { id, inputs: cloneInputs(inputs), results: summarize(result) };
  });
  if (errors.length) return { ok: false, errors };
  return {
    ok: true,
    manifest: {
      schema: MANIFEST_SCHEMA, schema_version: MANIFEST_SCHEMA_VERSION, model_version: MODEL_VERSION,
      paper_version: PAPER_VERSION, evidence_cutoff: EVIDENCE_CUTOFF, workload: WORKLOAD, index_base: INDEX_BASE,
      figures: [...FIGURES], classification: SCENARIO_CLASSIFICATION, evidence_status: SCENARIO_EVIDENCE_STATUS,
      tolerance: { ...TOLERANCE }, created_by: CREATED_BY, scenarios,
    },
  };
}

function nonfinitePaths(value, path = 'manifest', found = []) {
  if (typeof value === 'number' && !Number.isFinite(value)) found.push(path);
  else if (Array.isArray(value)) value.forEach((item, index) => nonfinitePaths(item, `${path}[${index}]`, found));
  else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) nonfinitePaths(child, `${path}.${key}`, found);
  }
  return found;
}

function exactKeys(object, allowed, path, errors) {
  for (const key of Object.keys(object)) {
    if (!allowed.includes(key)) errors.push(`${path}: unknown field “${key}” is not accepted.`);
  }
  for (const key of allowed) {
    if (!Object.hasOwn(object, key)) errors.push(`${path}: required field “${key}” is missing.`);
  }
}

function sameStructure(recorded, expected, path, errors) {
  if (typeof expected === 'number') {
    if (typeof recorded !== 'number' || !approxEqual(recorded, expected)) {
      errors.push(`${path}: recorded result does not reproduce within tolerance (expected ${expected}).`);
    }
  } else if (expected === null || typeof expected === 'string') {
    if (recorded !== expected) errors.push(`${path}: recorded value does not match the replayed result.`);
  } else if (Array.isArray(expected)) {
    if (!Array.isArray(recorded) || recorded.length !== expected.length) {
      errors.push(`${path}: recorded list does not match the replayed result.`);
    } else {
      expected.forEach((item, index) => sameStructure(recorded[index], item, `${path}[${index}]`, errors));
    }
  } else if (!isPlainObject(recorded)) {
    errors.push(`${path}: recorded result must be an object.`);
  } else {
    exactKeys(recorded, Object.keys(expected), path, errors);
    for (const key of Object.keys(expected)) {
      if (Object.hasOwn(recorded, key)) sameStructure(recorded[key], expected[key], `${path}.${key}`, errors);
    }
  }
}

function checkScenario(entry, index, errors) {
  const path = `scenarios[${index}]`;
  if (!isPlainObject(entry)) {
    errors.push(`${path}: must be an object.`);
    return null;
  }
  exactKeys(entry, SCENARIO_KEYS, path, errors);
  const preset = typeof entry.id === 'string' ? scenarioById(entry.id) : null;
  if (!preset) {
    errors.push(`${path}: unknown scenario reference; expected one of ${SCENARIOS.map((scenario) => scenario.id).join(', ')}.`);
    return null;
  }
  const validation = validateInputs(entry.inputs);
  if (!validation.ok) {
    errors.push(...validation.errors.map((error) => `${path}.inputs${error.field ? `.${error.field}` : ''}: ${error.message}`));
    return null;
  }
  const presetRoutes = preset.inputs.routes?.map((route) => route.id) || null;
  const importedRoutes = entry.inputs.routes?.map((route) => route.id) || null;
  if (JSON.stringify(presetRoutes) !== JSON.stringify(importedRoutes)) {
    errors.push(`${path}.inputs: route references must match the “${preset.id}” preset (${presetRoutes ? presetRoutes.join(', ') : 'single route'}).`);
    return null;
  }
  const result = compute(entry.inputs);
  sameStructure(entry.results, summarize(result), `${path}.results`, errors);
  return { id: preset.id, inputs: cloneInputs(entry.inputs) };
}

// Returns { ok: true, entries } or { ok: false, errors }. Never mutates application state.
export function parseManifest(text, byteLength) {
  if (typeof text !== 'string') return { ok: false, errors: ['The manifest must be text.'] };
  const size = byteLength ?? new TextEncoder().encode(text).length;
  if (size > MAX_MANIFEST_BYTES) {
    return { ok: false, errors: [`The file is ${size} bytes; manifests are limited to 1 MiB (${MAX_MANIFEST_BYTES} bytes).`] };
  }
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return { ok: false, errors: ['The file is not valid JSON.'] };
  }
  if (!isPlainObject(data)) return { ok: false, errors: ['The manifest must be a JSON object.'] };
  const nonfinite = nonfinitePaths(data);
  if (nonfinite.length) return { ok: false, errors: nonfinite.map((path) => `${path}: nonfinite numbers are not accepted.`) };
  const errors = [];
  exactKeys(data, TOP_KEYS, 'manifest', errors);
  if (errors.length) return { ok: false, errors };
  if (data.schema !== MANIFEST_SCHEMA) errors.push(`Incompatible schema: expected “${MANIFEST_SCHEMA}”.`);
  if (typeof data.schema_version !== 'string' || !SCHEMA_COMPATIBLE.test(data.schema_version)) {
    errors.push(`Incompatible schema version: this lab reads 1.x manifests (current ${MANIFEST_SCHEMA_VERSION}).`);
  }
  if (typeof data.model_version !== 'string' || !MODEL_COMPATIBLE.test(data.model_version)) {
    errors.push(`Incompatible model version: this lab replays task-energy/0.4.x (current ${MODEL_VERSION}).`);
  }
  if (data.paper_version !== PAPER_VERSION) errors.push(`Incompatible paper version: expected ${PAPER_VERSION}.`);
  if (data.evidence_cutoff !== EVIDENCE_CUTOFF) errors.push(`Unsupported evidence cutoff: only “${EVIDENCE_CUTOFF}” indexed runs exist.`);
  if (data.workload !== WORKLOAD) errors.push(`Unsupported workload: expected “${WORKLOAD}”.`);
  if (data.index_base !== INDEX_BASE) errors.push(`Unsupported index base: expected ${INDEX_BASE}.`);
  if (JSON.stringify(data.figures) !== JSON.stringify(FIGURES)) errors.push('Unsupported figure list: expected ["F07"].');
  if (data.classification !== SCENARIO_CLASSIFICATION || data.evidence_status !== SCENARIO_EVIDENCE_STATUS) {
    errors.push(`Classification must be “${SCENARIO_CLASSIFICATION}” with evidence status “${SCENARIO_EVIDENCE_STATUS}”.`);
  }
  if (JSON.stringify(data.tolerance) !== JSON.stringify(TOLERANCE)) {
    errors.push(`Unsupported tolerance: expected relative ${TOLERANCE.relative} and absolute ${TOLERANCE.absolute}.`);
  }
  if (typeof data.created_by !== 'string' || data.created_by.length > 300 || /[<>]|javascript:|data:/i.test(data.created_by)) {
    errors.push('created_by must be a plain note of at most 300 characters without markup or script URLs.');
  }
  if (!Array.isArray(data.scenarios) || data.scenarios.length !== SCENARIOS.length) {
    errors.push(`scenarios must list exactly the ${SCENARIOS.length} preset futures.`);
  }
  if (errors.length) return { ok: false, errors };
  const entries = data.scenarios.map((entry, index) => checkScenario(entry, index, errors));
  const ids = entries.filter(Boolean).map((entry) => entry.id);
  if (new Set(ids).size !== ids.length) errors.push('Each scenario may appear only once.');
  const absolutes = data.scenarios.map((entry) => JSON.stringify(entry?.inputs?.absolute ?? null));
  if (new Set(absolutes).size > 1) errors.push('All three futures must share the same absolute baseline in this lab.');
  if (errors.length) return { ok: false, errors };
  return { ok: true, entries };
}
