// Pure presentation helpers shared by tools/render-shell.mjs (static fallback) and rebound.mjs (live view).
// Presentation state such as ?brand= is deliberately ignored here: it must never change inputs or results.
import { energyRatioAt, threshold, approxEqual } from './model/task-energy.mjs';
import { SCENARIOS, scenarioById } from './model/scenarios.mjs';

export const F04_DEFAULTS = Object.freeze({ q: 0.5, s0: 0.5, s1: 0.5, iRatio: 0.5, pueRatio: 1, e: 1.5 });
export const F04_KEYS = Object.freeze(['q', 's0', 's1', 'iRatio', 'pueRatio', 'e']);
export const BASELINE_KEYS = Object.freeze(['S0', 'I0', 'p0']);
const TOP_KEYS = Object.freeze(['e', 'q', 's0', 's1', 'iRatio', 'pueRatio']);
const ROUTE_FIELD_KEYS = Object.freeze(['share', 's', 'iRatio', 'pueRatio']);
const ROUTE_PARAM = /^([a-z][a-z0-9-]{0,39})\.(share|s|iRatio|pueRatio)$/;
const NUMBER = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/;

export const fmt = Object.freeze({
  index: (value) => value.toFixed(1),
  ratio: (value) => value.toFixed(3),
  elasticity: (value) => value.toFixed(2),
  kwh: (value) => String(Number(value.toPrecision(4))),
  count: (value) => String(Number(value.toPrecision(6))),
});

export function parseNumber(raw) {
  const text = String(raw ?? '').trim();
  if (text === '') return null;
  return NUMBER.test(text) ? Number(text) : Number.NaN;
}

export const fieldId = (scope, key) => `${scope}-${key.replaceAll('.', '-')}`;
export const errorKey = (field) => field.replace(/\[(\d+)\]/g, '.$1');
export const fieldSpecKey = (key) => key.split('.').at(-1);

// Field keys a scenario exposes, in display order: top-level keys, then routes.<index>.<key>.
export function scenarioFieldKeys(scenario) {
  const keys = Object.keys(scenario.inputs).filter((key) => key !== 'routes');
  for (const [index] of (scenario.inputs.routes || []).entries()) {
    keys.push(...ROUTE_FIELD_KEYS.map((key) => `routes.${index}.${key}`));
  }
  return keys;
}

export function rawFromInputs(scenario, inputs) {
  const raw = {};
  for (const key of scenarioFieldKeys(scenario)) {
    const value = key.startsWith('routes.')
      ? inputs.routes[Number(key.split('.')[1])][fieldSpecKey(key)]
      : inputs[key];
    raw[key] = value === null || value === undefined ? '' : String(value);
  }
  return raw;
}

export function baselineFromRaw(raw) {
  const values = Object.fromEntries(BASELINE_KEYS.map((key) => [key, parseNumber(raw[key])]));
  return BASELINE_KEYS.every((key) => values[key] === null) ? null : values;
}

export function inputsFromRaw(scenario, raw, absolute = null) {
  const inputs = {};
  for (const key of Object.keys(scenario.inputs)) {
    if (key === 'routes') {
      inputs.routes = scenario.inputs.routes.map((route, index) => ({
        id: route.id,
        ...Object.fromEntries(ROUTE_FIELD_KEYS.map((field) => [field, parseNumber(raw[`routes.${index}.${field}`])])),
      }));
    } else {
      inputs[key] = parseNumber(raw[key]);
    }
  }
  if (absolute) inputs.absolute = absolute;
  return inputs;
}

const quote = (value) => `“${String(value).slice(0, 40)}”`;

export function isLabParam(key) {
  return key === 'scenario' || TOP_KEYS.includes(key) || BASELINE_KEYS.includes(key) || ROUTE_PARAM.test(key);
}

// Reads replay state from a query string. Returns raw strings so invalid values surface as field errors.
export function readUrlState(search) {
  const params = new URLSearchParams(search);
  const state = { scenario: null, values: {}, baseline: {}, notices: [] };
  for (const key of BASELINE_KEYS) if (params.has(key)) state.baseline[key] = params.get(key);
  if (params.has('seed')) state.notices.push('The “seed” parameter is ignored: this lab is deterministic and has no random component.');
  const id = params.get('scenario');
  const scenarioKeys = [...params.keys()].filter((key) => isLabParam(key) && key !== 'scenario' && !BASELINE_KEYS.includes(key));
  if (id === null) {
    if (scenarioKeys.length) state.notices.push(`Parameters ${scenarioKeys.map(quote).join(', ')} need a scenario=… parameter; presets are shown.`);
    return state;
  }
  const scenario = scenarioById(id);
  if (!scenario) {
    state.notices.push(`Unknown scenario ${quote(id)} in the link; presets are shown.`);
    return state;
  }
  state.scenario = scenario.id;
  for (const key of scenarioKeys) {
    const value = params.get(key);
    const route = key.match(ROUTE_PARAM);
    if (route) {
      const index = (scenario.inputs.routes || []).findIndex((item) => item.id === route[1]);
      if (index === -1) state.notices.push(`${quote(key)} does not match a route in ${scenario.title}; ignored.`);
      else state.values[`routes.${index}.${route[2]}`] = value;
    } else if (Object.hasOwn(scenario.inputs, key)) {
      state.values[key] = value;
    } else {
      state.notices.push(`${quote(key)} does not apply to ${scenario.title}; ignored.`);
    }
  }
  return state;
}

export function stateHref(currentHref, scenario, raw, baselineRaw) {
  const url = new URL(currentHref);
  for (const key of [...url.searchParams.keys()]) if (isLabParam(key)) url.searchParams.delete(key);
  url.searchParams.set('scenario', scenario.id);
  for (const key of scenarioFieldKeys(scenario)) {
    const route = key.match(/^routes\.(\d+)\.(.+)$/);
    url.searchParams.set(route ? `${scenario.inputs.routes[Number(route[1])].id}.${route[2]}` : key, raw[key] ?? '');
  }
  for (const key of BASELINE_KEYS) if (String(baselineRaw[key] ?? '').trim()) url.searchParams.set(key, baselineRaw[key]);
  url.hash = 'scenario-comparison';
  return url.href;
}

export function changeText(ratio) {
  if (approxEqual(ratio, 1)) return 'unchanged';
  const percent = (ratio - 1) * 100;
  return `${percent > 0 ? '+' : '−'}${Math.abs(percent).toFixed(1)}%`;
}

export function thresholdLabel(result) {
  const { status, value } = result;
  if (status === 'threshold') return `e* = ${fmt.elasticity(value)}`;
  if (status === 'outside-domain') return `e* = ${fmt.elasticity(value)} (outside e ≥ 0)`;
  if (status === 'no-price-change') return 'None — price unchanged';
  if (status === 'zero-energy') return 'None — k = 0';
  return 'Undefined';
}

export function positionText(t, e) {
  if (t.status !== 'threshold') return t.message;
  if (approxEqual(e, t.value)) return `At e = ${fmt.elasticity(e)} the scenario sits on the threshold: energy is unchanged. ${t.message}`;
  const side = e < t.value ? 'below' : 'above';
  return `At e = ${fmt.elasticity(e)} the scenario is ${side} the threshold, so energy ${side === 'below' ? t.below : t.above}. ${t.message}`;
}

export function positionShort(t, e) {
  if (t.status === 'threshold') {
    if (approxEqual(e, t.value)) return `At e = ${fmt.elasticity(e)}, on e* = ${fmt.elasticity(t.value)}, so energy is unchanged.`;
    const side = e < t.value ? 'below' : 'above';
    return `At e = ${fmt.elasticity(e)}, ${side} e* = ${fmt.elasticity(t.value)}, so energy ${side === 'below' ? t.below : t.above}.`;
  }
  if (t.status === 'outside-domain') return `e* = ${fmt.elasticity(t.value)} lies outside e ≥ 0, so energy ${t.everywhere} at every elasticity.`;
  if (t.status === 'no-price-change') return 'Price is unchanged, so energy depends only on k at every elasticity.';
  if (t.status === 'zero-energy') return 'k = 0, so scenario energy is zero at every elasticity.';
  return t.message;
}

export function scenarioSummary(title, result, e) {
  return `${title}: successful tasks ${changeText(result.demandRatio)}, attempts ${changeText(result.attemptsRatio)}, facility energy ${changeText(result.energyRatio)} (index ${fmt.index(result.index.E1)}). ${positionShort(result.threshold, e)}`;
}

export function absoluteText(result, { baselineInvalid = false } = {}) {
  if (baselineInvalid) return 'Withheld — baseline input invalid';
  if (result.absolute) return `${fmt.kwh(result.absolute.E0)} → ${fmt.kwh(result.absolute.E1)} kWh (your assumptions; not measured)`;
  return result.missingAbsolute.length === BASELINE_KEYS.length
    ? 'Unknown — indexed only' : `Unknown — indexed only (missing ${result.missingAbsolute.join(', ')})`;
}

// Rows shared by the live comparison table and the build-time static reference table.
export const COMPARISON_ROWS = Object.freeze([
  ['e', 'Elasticity magnitude e', (result, inputs) => fmt.elasticity(inputs.e)],
  ['S1', 'Successful tasks (index)', (result) => `${fmt.index(result.index.S1)} · ${changeText(result.demandRatio)}`],
  ['A1', 'Attempts (index)', (result) => `${fmt.index(result.index.A1)} · ${changeText(result.attemptsRatio)}`],
  ['E1', 'Facility energy (index)', (result) => `${fmt.index(result.index.E1)} · ${changeText(result.energyRatio)}`],
  ['k', 'Effective intensity ratio k', (result) => fmt.ratio(result.k)],
  ['threshold', 'Threshold e*', (result) => thresholdLabel(result.threshold)],
  ['absolute', 'Absolute energy', (result, inputs, options) => absoluteText(result, options)],
].map(Object.freeze));

export const CHART = Object.freeze({ width: 720, height: 390, left: 76, right: 20, top: 30, bottom: 64, eMax: 3, yMax: 3 });
export const X_TICKS = Object.freeze([0, 0.5, 1, 1.5, 2, 2.5, 3]);
export const Y_TICKS = Object.freeze([0, 0.5, 1, 1.5, 2, 2.5, 3]);
export const chartX = (e) => CHART.left + (e / CHART.eMax) * (CHART.width - CHART.left - CHART.right);
export const chartY = (ratio) => CHART.top
  + (1 - Math.min(Number.isFinite(ratio) ? ratio : CHART.yMax, CHART.yMax) / CHART.yMax) * (CHART.height - CHART.top - CHART.bottom);
const ratioAt = (q, k, e) => (k === 0 ? 0 : energyRatioAt(q, k, e));

export function chartGeometry(q, k, selectedE) {
  const steps = 60;
  const ratios = Array.from({ length: steps + 1 }, (unused, index) => ratioAt(q, k, (index / steps) * CHART.eMax));
  const path = `M${ratios.map((ratio, index) => `${chartX((index / steps) * CHART.eMax).toFixed(1)} ${chartY(ratio).toFixed(1)}`).join(' L')}`;
  const t = threshold(q, k);
  const thresholdVisible = t.status === 'threshold' && t.value <= CHART.eMax;
  const selectedRatio = ratioAt(q, k, selectedE);
  return {
    path,
    clipped: ratios.some((ratio) => !(ratio <= CHART.yMax)),
    threshold: { visible: thresholdVisible, x: chartX(thresholdVisible ? t.value : 0), label: thresholdLabel(t),
      labelX: chartX(thresholdVisible ? t.value : 0) + (thresholdVisible && t.value > CHART.eMax * 0.7 ? -8 : 8),
      labelAnchor: thresholdVisible && t.value > CHART.eMax * 0.7 ? 'end' : 'start' },
    selected: { visible: selectedE <= CHART.eMax, x: chartX(Math.min(selectedE, CHART.eMax)), y: chartY(selectedRatio),
      clipped: !(selectedRatio <= CHART.yMax), ratio: selectedRatio },
  };
}

export function chartDescription(q, k, e, energyRatio) {
  const t = threshold(q, k);
  return `Line chart of the energy ratio E1/E0 against elasticity magnitude e from 0 to ${CHART.eMax}, for price ratio q = ${fmt.ratio(q)} and effective intensity ratio k = ${fmt.ratio(k)}. A dashed line marks E1/E0 = 1 (no change). Threshold: ${thresholdLabel(t)}. Selected e = ${fmt.elasticity(e)} gives E1/E0 = ${fmt.ratio(energyRatio)}. Values above ${CHART.yMax} are clipped at the top edge.`;
}

export { SCENARIOS };
