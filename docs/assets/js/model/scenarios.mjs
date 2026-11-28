// Three illustrative indexed futures (FR-06). Every value is a declared scenario assumption for an abstract
// "illustrative indexed workload": no company, provider, filing, or measured value is used.
export const SCENARIO_CLASSIFICATION = 'scenario';
export const SCENARIO_EVIDENCE_STATUS = 'assumed — not calibrated';
export const WORKLOAD = 'illustrative indexed workload';

function deepFreeze(value) {
  if (value && typeof value === 'object') {
    for (const child of Object.values(value)) deepFreeze(child);
    Object.freeze(value);
  }
  return value;
}

export const FIELDS = deepFreeze({
  e: { label: 'Elasticity magnitude e', hint: '0 or more. Demand ratio S1/S0 = q^(−e).' },
  q: { label: 'Price ratio q = P1/P0', hint: 'Positive. 0.5 halves the price per successful task.' },
  s0: { label: 'Baseline success rate s0', hint: '0 < s ≤ 1. Attempts = successful tasks ÷ s.' },
  s1: { label: 'Scenario success rate s1', hint: '0 < s ≤ 1. Retries count once each as attempts.' },
  iRatio: { label: 'IT intensity ratio I1/I0', hint: '0 or more. IT kWh per attempt relative to baseline.' },
  pueRatio: { label: 'PUE ratio p1/p0', hint: 'Positive. Facility overhead relative to baseline.' },
  share: { label: 'Share of successful demand', hint: 'Between 0 and 1. All route shares must sum to 1.' },
  s: { label: 'Route success rate s', hint: '0 < s ≤ 1 on this route.' },
  S0: { label: 'Baseline successful tasks S0', hint: 'Tasks per period, 0 or more. Blank = unknown.' },
  I0: { label: 'Baseline IT kWh per attempt I0', hint: 'kWh, above 0. Blank = unknown.' },
  p0: { label: 'Baseline PUE p0', hint: 'At least 1. Blank = unknown.' },
});

export const SCENARIOS = deepFreeze([
  {
    id: 'efficient-abundance', number: '01', title: 'Efficient abundance',
    summary: 'Cheaper, more reliable tasks with a modest demand response that stays below the threshold: more successful tasks, less facility energy.',
    classification: SCENARIO_CLASSIFICATION, evidence_status: SCENARIO_EVIDENCE_STATUS,
    inputs: { e: 0.6, q: 0.6, s0: 0.6, s1: 0.7, iRatio: 0.5, pueRatio: 1 },
    rationale: {
      e: 'Assumed inelastic response (below 1) to illustrate conservation; not a measured AI elasticity.',
      q: 'Assumed 40% lower price per successful task; pass-through is not evidenced.',
      s0: 'Assumed baseline success for an abstract workload; rubrics await T-005.',
      s1: 'Assumed reliability gain, so fewer retries per successful task.',
      iRatio: 'Assumed halving of IT kWh per attempt.',
      pueRatio: 'Assumed matched, unchanged facility boundary.',
    },
  },
  {
    id: 'rebound-acceleration', number: '02', title: 'Rebound acceleration',
    summary: 'A steeper price fall meets an elastic response above the threshold: efficiency gains are outrun by induced demand.',
    classification: SCENARIO_CLASSIFICATION, evidence_status: SCENARIO_EVIDENCE_STATUS,
    inputs: { e: 1.4, q: 0.4, s0: 0.6, s1: 0.65, iRatio: 0.6, pueRatio: 1 },
    rationale: {
      e: 'Assumed elastic response (above 1) to illustrate rebound; not a measured AI elasticity.',
      q: 'Assumed 60% lower price per successful task; pass-through is not evidenced.',
      s0: 'Same abstract baseline success assumption as the other futures.',
      s1: 'Assumed small reliability gain.',
      iRatio: 'Assumed 40% lower IT kWh per attempt.',
      pueRatio: 'Assumed matched, unchanged facility boundary.',
    },
  },
  {
    id: 'air-pocket', number: '03', title: 'Demand air pocket / open-model substitution',
    summary: 'A small price cut meets a weak demand response while part of successful demand moves to an open-model route; the frontier route’s volume falls even as total tasks edge up.',
    classification: SCENARIO_CLASSIFICATION, evidence_status: SCENARIO_EVIDENCE_STATUS,
    inputs: {
      e: 0.3, q: 0.8, s0: 0.6,
      routes: [
        { id: 'frontier', share: 0.6, s: 0.62, iRatio: 0.85, pueRatio: 1 },
        { id: 'open-model', share: 0.4, s: 0.5, iRatio: 0.45, pueRatio: 1 },
      ],
    },
    routeLabels: { frontier: 'Frontier-model route', 'open-model': 'Open-model route' },
    rationale: {
      e: 'Assumed weak demand response (an air pocket); not a measured AI elasticity.',
      q: 'Assumed 20% lower blended price per successful task.',
      s0: 'Same abstract baseline success assumption; the baseline is served by one frontier route.',
      'routes.frontier.share': 'Assumed share of successful demand retained by the frontier route.',
      'routes.frontier.s': 'Assumed small frontier reliability gain.',
      'routes.frontier.iRatio': 'Assumed 15% lower IT kWh per frontier attempt.',
      'routes.frontier.pueRatio': 'Assumed matched, unchanged facility boundary.',
      'routes.open-model.share': 'Assumed substitution share; shares partition successful demand and sum to 1.',
      'routes.open-model.s': 'Assumed lower success per attempt, so more retries; not an evaluation result.',
      'routes.open-model.iRatio': 'Assumed lower IT kWh per attempt for a smaller served model; not measured.',
      'routes.open-model.pueRatio': 'Assumed the same facility overhead as baseline; vary it to test the boundary.',
    },
  },
]);

export function scenarioById(id) {
  return SCENARIOS.find((scenario) => scenario.id === id) || null;
}

export function cloneInputs(inputs) {
  return JSON.parse(JSON.stringify(inputs));
}
