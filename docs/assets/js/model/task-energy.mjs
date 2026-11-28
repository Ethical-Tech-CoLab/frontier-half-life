// Shared deterministic task-energy model for the paper (P05/P08) and the rebound lab (F04/F07).
// Implements SPECIFICATION §8 and research/INDEPENDENT-EVIDENCE.md#r05; symbols follow DATA-DICTIONARY.md.
// Pure functions only: no I/O, DOM, clock, randomness or network access.

export const MODEL_VERSION = 'task-energy/0.4.0';
export const INDEX_BASE = 100;
// Two values agree when |a − b| <= max(absolute, relative × max(|a|, |b|)).
export const TOLERANCE = Object.freeze({ relative: 1e-9, absolute: 1e-12 });
export const SWEEP_VALUES = Object.freeze([0, 0.5, 1, 1.5, 2, 2.5, 3]);
export const MAX_ROUTES = 8;

const TOP_KEYS = Object.freeze(['e', 'q', 's0', 's1', 'iRatio', 'pueRatio', 'routes', 'absolute']);
const SINGLE_ROUTE_KEYS = Object.freeze(['s1', 'iRatio', 'pueRatio']);
const ROUTE_KEYS = Object.freeze(['id', 'share', 's', 'iRatio', 'pueRatio']);
export const ABSOLUTE_KEYS = Object.freeze(['S0', 'I0', 'p0']);
const ROUTE_ID = /^[a-z][a-z0-9-]{0,39}$/;

function deepFreeze(value) {
  if (value && typeof value === 'object') {
    for (const child of Object.values(value)) deepFreeze(child);
    Object.freeze(value);
  }
  return value;
}

// Synthetic accounting fixtures from SPECIFICATION §8 (CL-014). Not research observations.
export const SYNTHETIC_FIXTURES = deepFreeze([
  { id: 'baseline', label: 'Baseline, unchanged price', expectedKWh: 2.4,
    inputs: { e: 1, q: 1, s0: 0.5, s1: 0.5, iRatio: 1, pueRatio: 1, absolute: { S0: 100, I0: 0.01, p0: 1.2 } } },
  { id: 'halved-e1', label: 'Halved price and IT intensity, e = 1', expectedKWh: 2.4,
    inputs: { e: 1, q: 0.5, s0: 0.5, s1: 0.5, iRatio: 0.5, pueRatio: 1, absolute: { S0: 100, I0: 0.01, p0: 1.2 } } },
  { id: 'halved-e2', label: 'Halved price and IT intensity, e = 2', expectedKWh: 4.8,
    inputs: { e: 2, q: 0.5, s0: 0.5, s1: 0.5, iRatio: 0.5, pueRatio: 1, absolute: { S0: 100, I0: 0.01, p0: 1.2 } } },
]);

export function isPlainObject(value) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

export function approxEqual(a, b, tolerance = TOLERANCE) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) return false;
  return Math.abs(a - b) <= Math.max(tolerance.absolute, tolerance.relative * Math.max(Math.abs(a), Math.abs(b)));
}

function numberError(field, value, label) {
  if (value === undefined || value === null) return { field, code: 'required', message: `${label}: enter a value.` };
  if (typeof value !== 'number') return { field, code: 'not-number', message: `${label}: must be a number.` };
  if (!Number.isFinite(value)) return { field, code: 'nonfinite', message: `${label}: must be a finite number.` };
  return null;
}

function checkElasticity(field, value, errors) {
  const error = numberError(field, value, 'Elasticity magnitude e');
  if (error) errors.push(error);
  else if (value < 0) {
    errors.push({ field, code: 'negative-elasticity',
      message: 'Elasticity magnitude e must be 0 or more; the formula applies the minus sign.' });
  }
}

function checkPriceRatio(field, value, errors) {
  const error = numberError(field, value, 'Price ratio q');
  if (error) errors.push(error);
  else if (value === 0) {
    errors.push({ field, code: 'free-price',
      message: 'A zero (free) price is outside this elasticity model. Specify a separate demand model; no tiny constant is substituted.' });
  } else if (value < 0) {
    errors.push({ field, code: 'nonpositive-price', message: 'Price ratio q must be positive; negative prices are outside this model.' });
  }
}

function checkSuccessRate(field, value, errors, label) {
  const error = numberError(field, value, label);
  if (error) errors.push(error);
  else if (value === 0) {
    errors.push({ field, code: 'zero-success',
      message: `${label} is 0: no attempt succeeds, so attempts and cost per successful task are undefined. Result withheld.` });
  } else if (value < 0 || value > 1) {
    errors.push({ field, code: 'out-of-range', message: `${label} must satisfy 0 < s ≤ 1.` });
  }
}

function checkIntensityRatio(field, value, errors) {
  const error = numberError(field, value, 'IT intensity ratio I1/I0');
  if (error) errors.push(error);
  else if (value < 0) {
    errors.push({ field, code: 'negative-intensity', message: 'IT intensity ratio I1/I0 must be 0 or more (I ≥ 0).' });
  }
}

function checkPueRatio(field, value, errors) {
  const error = numberError(field, value, 'PUE ratio p1/p0');
  if (error) errors.push(error);
  else if (value <= 0) {
    errors.push({ field, code: 'out-of-range', message: 'PUE ratio p1/p0 must be positive; PUE itself is at least 1.' });
  }
}

function checkUnknownKeys(object, allowed, prefix, errors) {
  for (const key of Object.keys(object)) {
    if (!allowed.includes(key)) {
      errors.push({ field: `${prefix}${key}`, code: 'unknown-field', message: `Unknown input field “${prefix}${key}”.` });
    }
  }
}

const ABSOLUTE_RULES = Object.freeze({
  S0: ['Baseline successful tasks S0', (value) => (value < 0 ? ['out-of-range', 'must be 0 or more (task volumes are nonnegative).'] : null)],
  I0: ['Baseline IT kWh per attempt I0', (value) => (value < 0 ? ['out-of-range', 'must be 0 or more.']
    : value === 0 ? ['zero-baseline-energy', 'is 0, so the energy ratio is undefined. Model a zero-energy boundary separately.'] : null)],
  p0: ['Baseline PUE p0', (value) => (value < 1 ? ['out-of-range', 'must be at least 1.'] : null)],
});

// Absolute inputs are optional. `null` or omission means unknown, never zero.
export function validateAbsolute(absolute, errors = []) {
  if (absolute === undefined || absolute === null) return errors;
  if (!isPlainObject(absolute)) {
    errors.push({ field: 'absolute', code: 'not-object', message: 'Absolute baseline must be an object or null.' });
    return errors;
  }
  checkUnknownKeys(absolute, ABSOLUTE_KEYS, 'absolute.', errors);
  for (const [key, [label, rule]] of Object.entries(ABSOLUTE_RULES)) {
    const value = absolute[key];
    if (value === undefined || value === null) continue;
    const error = numberError(`absolute.${key}`, value, label);
    if (error) {
      errors.push(error);
      continue;
    }
    const problem = rule(value);
    if (problem) errors.push({ field: `absolute.${key}`, code: problem[0], message: `${label} ${problem[1]}` });
  }
  return errors;
}

function completeAbsolute(absolute) {
  return isPlainObject(absolute) && ABSOLUTE_KEYS.every((key) => typeof absolute[key] === 'number');
}

function routesOf(inputs) {
  if (Object.hasOwn(inputs, 'routes')) return inputs.routes;
  return [{ id: 'single', share: 1, s: inputs.s1, iRatio: inputs.iRatio, pueRatio: inputs.pueRatio }];
}

function validateRoutes(routes, errors) {
  if (!Array.isArray(routes) || routes.length === 0 || routes.length > MAX_ROUTES) {
    errors.push({ field: 'routes', code: 'invalid-routes', message: `Routes must be a list of 1 to ${MAX_ROUTES} routes.` });
    return;
  }
  const seen = new Set();
  let shareTotal = 0;
  let sharesNumeric = true;
  routes.forEach((route, index) => {
    const prefix = `routes[${index}].`;
    if (!isPlainObject(route)) {
      errors.push({ field: `routes[${index}]`, code: 'not-object', message: 'Each route must be an object.' });
      sharesNumeric = false;
      return;
    }
    checkUnknownKeys(route, ROUTE_KEYS, prefix, errors);
    if (typeof route.id !== 'string' || !ROUTE_ID.test(route.id)) {
      errors.push({ field: `${prefix}id`, code: 'invalid-id', message: 'Route ID must be a short lowercase identifier.' });
    } else if (seen.has(route.id)) {
      errors.push({ field: `${prefix}id`, code: 'duplicate-id', message: `Duplicate route ID “${route.id}”.` });
    } else {
      seen.add(route.id);
    }
    const shareError = numberError(`${prefix}share`, route.share, 'Route share');
    if (shareError) {
      errors.push(shareError);
      sharesNumeric = false;
    } else if (route.share < 0 || route.share > 1) {
      errors.push({ field: `${prefix}share`, code: 'out-of-range', message: 'Route share must be between 0 and 1.' });
      sharesNumeric = false;
    } else {
      shareTotal += route.share;
    }
    checkSuccessRate(`${prefix}s`, route.s, errors, 'Route success rate s');
    checkIntensityRatio(`${prefix}iRatio`, route.iRatio, errors);
    checkPueRatio(`${prefix}pueRatio`, route.pueRatio, errors);
  });
  if (sharesNumeric && !approxEqual(shareTotal, 1, { relative: TOLERANCE.relative, absolute: 1e-9 })) {
    routes.forEach((route, index) => errors.push({ field: `routes[${index}].share`, code: 'shares-not-partition',
      message: `Route shares must partition successful demand and sum to 1; they sum to ${Number(shareTotal.toPrecision(6))}.` }));
  }
}

export function validateInputs(inputs) {
  if (!isPlainObject(inputs)) {
    return { ok: false, errors: [{ field: '', code: 'not-object', message: 'Inputs must be an object.' }] };
  }
  const errors = [];
  checkUnknownKeys(inputs, TOP_KEYS, '', errors);
  checkElasticity('e', inputs.e, errors);
  checkPriceRatio('q', inputs.q, errors);
  checkSuccessRate('s0', inputs.s0, errors, 'Baseline success rate s0');
  const routed = Object.hasOwn(inputs, 'routes');
  if (routed) {
    for (const key of SINGLE_ROUTE_KEYS) {
      if (Object.hasOwn(inputs, key)) {
        errors.push({ field: key, code: 'conflicting-fields', message: `Specify either routes or ${key}, not both.` });
      }
    }
    validateRoutes(inputs.routes, errors);
  } else {
    checkSuccessRate('s1', inputs.s1, errors, 'Scenario success rate s1');
    checkIntensityRatio('iRatio', inputs.iRatio, errors);
    checkPueRatio('pueRatio', inputs.pueRatio, errors);
  }
  validateAbsolute(inputs.absolute, errors);
  if (!errors.length && completeAbsolute(inputs.absolute)) {
    routesOf(inputs).forEach((route, index) => {
      const p1 = inputs.absolute.p0 * route.pueRatio;
      if (p1 < 1 && !approxEqual(p1, 1)) {
        errors.push({ field: routed ? `routes[${index}].pueRatio` : 'pueRatio', code: 'pue-below-one',
          message: `With baseline PUE p0 = ${inputs.absolute.p0}, this PUE ratio implies p1 = ${Number(p1.toPrecision(6))}, below the minimum PUE of 1.` });
      }
    });
  }
  return { ok: errors.length === 0, errors };
}

export function priceRatio(P0, P1) {
  const errors = [];
  for (const [field, value, label] of [['P0', P0, 'Baseline price P0'], ['P1', P1, 'Scenario price P1']]) {
    const error = numberError(field, value, label);
    if (error) errors.push(error);
    else if (value === 0) {
      errors.push({ field, code: 'free-price',
        message: `${label} is 0 (free). This elasticity model needs positive prices; no tiny constant is substituted.` });
    } else if (value < 0) {
      errors.push({ field, code: 'nonpositive-price', message: `${label} must be positive.` });
    }
  }
  return errors.length ? { ok: false, errors } : { ok: true, value: P1 / P0 };
}

export function effectiveIntensityRatio({ s0, s1, iRatio, pueRatio }) {
  return (s0 / s1) * iRatio * pueRatio;
}

export function energyRatioAt(q, k, e) {
  return q ** -e * k;
}

const invalidThreshold = (message) => ({ status: 'invalid', value: null, below: null, above: null, everywhere: null, message });

// Break-even elasticity magnitude e* solving q^(−e) × k = 1, i.e. e* = ln(k) / ln(q).
// |ln q| <= TOLERANCE.relative is treated as an unchanged price and |k − 1| within TOLERANCE as k = 1.
export function threshold(q, k) {
  if (typeof q !== 'number' || !Number.isFinite(q) || q <= 0) {
    return invalidThreshold(q === 0 ? 'A zero (free) price has no elasticity threshold in this model.'
      : 'Price ratio q must be a finite positive number.');
  }
  if (typeof k !== 'number' || !Number.isFinite(k) || k < 0) {
    return invalidThreshold('Effective intensity ratio k must be a finite number of at least 0.');
  }
  if (k === 0) {
    return { status: 'zero-energy', value: null, below: null, above: null, everywhere: 'falls',
      message: 'k = 0: scenario IT energy is zero, so E1/E0 = 0 at every elasticity. No threshold exists.' };
  }
  const logQ = Math.log(q);
  const logK = approxEqual(k, 1) ? 0 : Math.log(k);
  if (Math.abs(logQ) <= TOLERANCE.relative) {
    const everywhere = logK === 0 ? 'unchanged' : logK < 0 ? 'falls' : 'rises';
    return { status: 'no-price-change', value: null, below: null, above: null, everywhere,
      message: 'Price is unchanged (q = 1): demand does not respond, so E1/E0 = k at every elasticity. No threshold exists.' };
  }
  const value = logK === 0 ? 0 : logK / logQ;
  const priceFalls = logQ < 0;
  if (value < 0) {
    const everywhere = priceFalls ? 'rises' : 'falls';
    return { status: 'outside-domain', value, below: null, above: null, everywhere,
      message: `e* is negative, outside the nonnegative elasticity domain: energy ${everywhere} at every e ≥ 0.` };
  }
  return {
    status: 'threshold', value, everywhere: null,
    below: value === 0 ? null : priceFalls ? 'falls' : 'rises',
    above: priceFalls ? 'rises' : 'falls',
    message: priceFalls
      ? 'Price falls: energy falls when e < e*, is unchanged at e = e*, and rises when e > e*.'
      : 'Price rises: energy rises when e < e*, is unchanged at e = e*, and falls when e > e*.',
  };
}

export function compute(inputs) {
  const validation = validateInputs(inputs);
  if (!validation.ok) return { ok: false, modelVersion: MODEL_VERSION, errors: validation.errors };
  const { e, q, s0 } = inputs;
  const demandRatio = q ** -e;
  const routes = routesOf(inputs).map((route) => {
    const attemptsFactor = s0 / route.s;
    const k = attemptsFactor * route.iRatio * route.pueRatio;
    return {
      id: route.id, share: route.share, attemptsFactor, k,
      successIndex: INDEX_BASE * demandRatio * route.share,
      attemptsIndex: INDEX_BASE * demandRatio * route.share * attemptsFactor,
      energyIndex: INDEX_BASE * demandRatio * route.share * k,
    };
  });
  const k = routes.reduce((sum, route) => sum + route.share * route.k, 0);
  const attemptsRatio = demandRatio * routes.reduce((sum, route) => sum + route.share * route.attemptsFactor, 0);
  const energyRatio = demandRatio * k;
  const notes = [];
  const missingAbsolute = ABSOLUTE_KEYS.filter((key) => !isPlainObject(inputs.absolute) || typeof inputs.absolute[key] !== 'number');
  let absolute = null;
  if (missingAbsolute.length === 0) {
    const { S0, I0, p0 } = inputs.absolute;
    const S1 = S0 * demandRatio;
    const A0 = S0 / s0;
    const E0 = A0 * I0 * p0;
    let A1 = 0;
    let E1 = 0;
    for (const route of routesOf(inputs)) {
      const routeAttempts = (S1 * route.share) / route.s;
      A1 += routeAttempts;
      E1 += routeAttempts * (I0 * route.iRatio) * (p0 * route.pueRatio);
    }
    absolute = { S0, S1, A0, A1, E0, E1 };
    if (S0 === 0) notes.push('Baseline demand is zero, so absolute energy is zero in both periods; ratios describe scaling per unit of baseline demand.');
  } else {
    notes.push(`Absolute energy unknown (missing ${missingAbsolute.join(', ')}): only indexed results are reported; no kWh is fabricated.`);
  }
  const numbers = [demandRatio, attemptsRatio, k, energyRatio,
    ...routes.flatMap((route) => [route.k, route.successIndex, route.attemptsIndex, route.energyIndex]),
    ...(absolute ? Object.values(absolute) : [])];
  if (!numbers.every(Number.isFinite)) {
    return { ok: false, modelVersion: MODEL_VERSION, errors: [{ field: 'e', code: 'overflow',
      message: 'The result exceeds the representable numeric range for these inputs. Result withheld.' }] };
  }
  return {
    ok: true, modelVersion: MODEL_VERSION, mode: absolute ? 'absolute' : 'indexed',
    demandRatio, attemptsRatio, k, energyRatio,
    index: { base: INDEX_BASE, S1: INDEX_BASE * demandRatio, A1: INDEX_BASE * attemptsRatio, E1: INDEX_BASE * energyRatio },
    threshold: threshold(q, k), routes, absolute, missingAbsolute, notes,
  };
}

export function sweepElasticity(inputs, values = SWEEP_VALUES) {
  const base = compute(inputs);
  if (!base.ok) return { ok: false, errors: base.errors, rows: [] };
  const rows = values.map((e) => {
    const result = compute({ ...inputs, e });
    return result.ok
      ? { e, ok: true, energyRatio: result.energyRatio, energyIndex: result.index.E1, E1: result.absolute ? result.absolute.E1 : null }
      : { e, ok: false, errors: result.errors };
  });
  return { ok: true, rows, threshold: base.threshold };
}
