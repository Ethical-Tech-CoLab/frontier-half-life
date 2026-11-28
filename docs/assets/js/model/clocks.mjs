// Release-pair clock statistics for rubric 0.4.0 (T1, T2, T11, T13, T14).
// Pure functions shared by the Phase 1 tools and tests.
export const DAYS_PER_MONTH = 30.44;
export const Z_ONE_SIDED_95 = 1.6448536269514722;
export const Z_TWO_SIDED_95 = 1.959963984540054;

// T1: delta in proportion units; null when the task set is too small to declare a match.
export function margin(n) {
  if (!Number.isInteger(n) || n < 80) return null;
  return Math.max(3, Math.round(1.5 * 50 / Math.sqrt(n))) / 100;
}

// T2, paired: o and f are equal-length 0/1 arrays over the same task order.
export function pairedComparison(o, f) {
  if (o.length !== f.length || o.length < 2) throw new Error('Paired comparison needs equal-length task results.');
  const n = o.length;
  const d = o.map((value, index) => value - f[index]);
  const mean = d.reduce((sum, value) => sum + value, 0) / n;
  const variance = d.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (n - 1);
  const se = Math.sqrt(variance / n);
  return { n, diff: mean, se, lower: mean - Z_ONE_SIDED_95 * se, method: 'paired' };
}

// T2, unpaired: aggregate success rates only.
export function unpairedComparison(pO, nO, pF, nF) {
  const se = Math.sqrt((pO * (1 - pO)) / nO + (pF * (1 - pF)) / nF);
  const diff = pO - pF;
  return { n: Math.min(nO, nF), diff, se, lower: diff - Z_ONE_SIDED_95 * se, method: 'unpaired' };
}

export function matchStatus(comparison, delta) {
  if (delta === null) return { confirmed: false, nominal: false, reason: 'fewer than 80 tasks' };
  return { confirmed: comparison.lower >= -delta, nominal: comparison.diff >= -delta, reason: '' };
}

export const daysBetween = (from, to) => Math.round((Date.parse(to) - Date.parse(from)) / 86400000);

// T13: Kaplan–Meier estimate with Greenwood variance; observations are { time, event }.
export function kaplanMeier(observations) {
  const sorted = [...observations].sort((a, b) => a.time - b.time || Number(b.event) - Number(a.event));
  let atRisk = sorted.length;
  let survival = 1;
  let greenwood = 0;
  const steps = [];
  for (let index = 0; index < sorted.length;) {
    const time = sorted[index].time;
    let events = 0;
    let leaving = 0;
    while (index < sorted.length && sorted[index].time === time) {
      events += sorted[index].event ? 1 : 0;
      leaving += 1;
      index += 1;
    }
    if (events > 0) {
      survival *= 1 - events / atRisk;
      greenwood += atRisk > events ? events / (atRisk * (atRisk - events)) : Infinity;
      steps.push({ time, survival, se: survival * Math.sqrt(greenwood), atRisk, events });
    }
    atRisk -= leaving;
  }
  return steps;
}

// Median and Brookmeyer–Crowley 95% interval: times where |S(t) − 0.5| ≤ 1.96·SE(t).
export function kmMedian(observations) {
  const steps = kaplanMeier(observations);
  const median = steps.find((step) => step.survival <= 0.5)?.time ?? null;
  const inside = steps.filter((step) => Number.isFinite(step.se) && Math.abs(step.survival - 0.5) <= Z_TWO_SIDED_95 * step.se);
  const last = steps.at(-1);
  const lower = inside.length ? inside[0].time : median;
  // If S never falls clearly below 0.5 within follow-up, the upper bound is not reached.
  const upperReached = last && last.survival < 0.5 && !(Number.isFinite(last.se) && Math.abs(last.survival - 0.5) <= Z_TWO_SIDED_95 * last.se);
  const upper = upperReached ? (inside.at(-1)?.time ?? median) : null;
  return { median, lower, upper, events: observations.filter((o) => o.event).length, n: observations.length };
}

// T14 as adopted: consistent if the interval overlaps 4–6 months, refuted if entirely outside,
// otherwise inconclusive (median not estimable). `upper = null` means unbounded.
export function hypothesisDecision({ median, lower, upper }) {
  if (median === null || lower === null) return 'inconclusive';
  const lo = lower / DAYS_PER_MONTH;
  const hi = upper === null ? Infinity : upper / DAYS_PER_MONTH;
  return hi < 4 || lo > 6 ? 'refuted' : 'consistent';
}
