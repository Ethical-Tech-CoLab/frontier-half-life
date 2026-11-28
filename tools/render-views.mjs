// F05 (providers.html#commitment-exposure) and F08 (uncertainty.html#stress-boundaries).
// Values come from the W1 extraction outputs; nothing here is calibrated or summed
// across instruments, and missing evidence renders as an explicit state.
import { SITE } from '../docs/assets/js/config.mjs';
import { escape } from './markdown.mjs';
import { loadResearch, docLink, siteLink, sourceLine } from './render-reader.mjs';
import { parseCSV } from './csv.mjs';
import { readFileSync } from 'node:fs';
import { evaluatePressure, summary, DEFAULT_THRESHOLD, REQUIRED_RUN, THRESHOLD_LIMITS } from '../docs/assets/js/stress.mjs';

const FINAL = '424B4';
const fact = (facts, id, period, filing = FINAL) => facts.find((row) => row.fact_id === id && row.filing === filing && row.period === period);
const num = (value) => Number(String(value).replace(/,/g, ''));
const locator = (row) => (row ? `<a class="line-ref" href="${escape(sourceLine(row.file, row.line_start))}">L${row.line_start}</a>` : '');

const COMPONENTS = [
  { label: 'Contractual obligations table, as of 2026-09-30', id: 'OBL-TABLE', period: 'as of 2026-09-30', scale: 1 / 1000 },
  { label: 'Short-term commitments excluded from the table', id: 'OBL-SHORT-TERM', period: 'as of 2026-09-30' },
  { label: 'Leases executed but not yet commenced', id: 'OBL-LEASES-NC', period: 'as of 2026-09-30' },
  { label: 'Commitments signed after the quarter', id: 'OBL-SUBSEQUENT', period: 'after 2026-09-30' },
  { label: 'Short-term agreements signed after the quarter', id: 'OBL-SUBSEQUENT-ST', period: 'after 2026-09-30' },
];

const ARRANGEMENTS = [
  { name: 'Broadcom equipment leases', id: 'C-BROADCOM-LEASE', period: 'lease terms', kind: 'Lease rent, excluding interest', terms: 'Five-year finance leases for TPU capacity; non-cancelable during the lease period', lineage: 'Unchanged across versions' },
  { name: 'Google — additional TPU', id: 'C-GOOGLE-TPU', period: 'low', upper: 'high', kind: 'Issuer estimate; no fixed dollar commitment', terms: 'Delivery expected 2028–2031; outside the obligations table', lineage: 'Unchanged across versions' },
  { name: 'Google — CSP hosting', id: 'C-GOOGLE', period: 'minimum', kind: 'Minimum, regardless of usage', terms: 'April 2026 to July 2033; true-up if spend falls short', lineage: 'S-1 $114.5B → A1 $121.3B' },
  { name: 'SpaceXAI', id: 'C-SPACEXAI', period: 'terms into 2029', kind: 'Up to', terms: '~$3.1B a month once fully delivered; cancellable on 90 days’ notice after initial periods', lineage: 'Unchanged across versions' },
  { name: 'Amazon', id: 'C-AMAZON', period: '2026-05 to 2036-04', kind: 'Minimum, regardless of usage', terms: 'May 2026 to April 2036; true-up if spend falls short', lineage: 'Unchanged across versions' },
  { name: 'Microsoft', id: 'C-MICROSOFT', period: 'minimum', upper: 'maximum', kind: 'Minimum to maximum, regardless of usage', terms: 'November 2026 to June 2033; per-tranche cancellation for undelivered tranches', lineage: 'S-1 ≥ $44.9B → A2 $47.2–49.2B' },
  { name: 'Nscale', id: 'C-NSCALE', period: 'terms into 2033', kind: 'Up to; fees on delivery and acceptance', terms: 'Nscale best-efforts financing condition', lineage: 'Unchanged across versions' },
  { name: 'Lambda, Inc.', id: 'C-LAMBDA', period: 'terms into 2034', kind: 'Aggregate agreed; fees on delivery and acceptance', terms: 'August 2026 agreement (~$34.9B) currently terminable by either party: facility lease not secured by the specified date', lineage: 'Terminable status first disclosed in A2' },
  { name: 'AMD', id: 'C-AMD', period: 'lower bound', kind: 'Expected lower bound if initial capacity is procured', terms: 'Conditional; no fixed dollar commitment; outside the table', lineage: 'Unchanged across versions' },
  { name: 'Fluidstack', id: 'C-FLUIDSTACK', period: 'no amount stated in passage', kind: 'No amount stated', terms: 'Colocation, data-center development and operations services', lineage: 'Unchanged across versions' },
];

const CANDIDATES = [
  { name: 'CoreWeave', archetype: 'Infrastructure (neocloud)' },
  { name: 'Nebius', archetype: 'Infrastructure (neocloud)' },
  { name: 'Lambda', archetype: 'Infrastructure (neocloud)', named: 'CL-023' },
  { name: 'Crusoe', archetype: 'Infrastructure (neocloud)' },
  { name: 'Together AI', archetype: 'Managed inference' },
  { name: 'Fireworks AI', archetype: 'Managed inference' },
  { name: 'Baseten', archetype: 'Managed inference' },
];

function bar(value, max, upper) {
  const width = (100 * value) / max;
  const extra = upper ? (100 * (upper - value)) / max : 0;
  return `<span class="bar-track" aria-hidden="true"><span class="bar-fill" style="width:${width.toFixed(2)}%"></span>${extra ? `<span class="bar-range" style="width:${extra.toFixed(2)}%"></span>` : ''}</span>`;
}

function intro(eyebrow, title, accent, lead, meta) {
  return `<header class="page-intro"><p class="eyebrow">${eyebrow}</p><h1>${title}<br><span class="accent">${accent}</span></h1>
      <p class="lead">${lead}</p>
      <p class="page-meta">${SITE.version} · Initial author ${SITE.author} · ${meta}</p>
    </header>`;
}

export function providersBody(reviewStrip) {
  const { facts, checks } = loadResearch();
  const aggregate = fact(facts, 'AGG-OBLIGATIONS', 'as of and subsequent to 2026-09-30');
  const conditional = fact(facts, 'OBL-CONDITIONAL', 'aggregate');
  const low = fact(facts, 'OBL-NO-FIXED', 'low');
  const high = fact(facts, 'OBL-NO-FIXED', 'high');
  const decomposition = checks.find((check) => check.check_id === 'CHK-11');
  const components = COMPONENTS.map((spec) => {
    const row = fact(facts, spec.id, spec.period);
    return { ...spec, row, value: num(row.value) * (spec.scale ?? 1) };
  });
  const componentMax = Math.max(...components.map((c) => c.value), num(high.value));
  const arrangements = ARRANGEMENTS.map((spec) => {
    const row = fact(facts, spec.id, spec.period);
    const upper = spec.upper ? fact(facts, spec.id, spec.upper) : null;
    const value = row && row.value !== 'disclosed' ? num(row.value) : null;
    return { ...spec, row, value, upperValue: upper ? num(upper.value) : null };
  });
  const arrangementMax = Math.max(...arrangements.map((a) => a.upperValue ?? a.value ?? 0));
  const A1 = 'S-1/A-1';
  const value = (id, period, filing = FINAL) => fact(facts, id, period, filing).value;
  const aggA1 = value('AGG-OBLIGATIONS', 'as of and subsequent to 2026-09-30', A1);
  const subsequentDelta = (num(value('OBL-SUBSEQUENT', 'after 2026-09-30')) - num(value('OBL-SUBSEQUENT', 'after 2026-09-30', A1))).toFixed(1);
  const lambda = value('C-LAMBDA', 'terms into 2034');
  const nscale = value('C-NSCALE', 'terms into 2033');
  return `<main id="main" class="wrap" tabindex="-1" data-research-content>
    ${intro('Providers and commitments / F05', 'Commitments are not', 'one number.',
    `The final prospectus states about $${aggregate.value}B of compute and infrastructure commitments. That total mixes fixed tables, leases not yet commenced and post-quarter deals; it excludes variable arrangements; and about a fifth of it can be terminated or depends on conditions. Every value here is located in the filing text and unverified.`,
    'Filing captures through 2026-11-25 · Located, unverified · No summed exposure across instruments')}
    ${reviewStrip}
    <section class="section" id="commitment-exposure" aria-labelledby="exposure-title">
      <div class="section-heading"><div><p class="eyebrow">F05 / Commitment exposure</p><h2 id="exposure-title">What the $${escape(aggregate.value)}B is made of.</h2></div><p>The issuer's own decomposition, checked: the five components add to ${escape(decomposition.computed)} against a stated ${escape(aggregate.value)} (${escape(decomposition.check_id)} ${escape(decomposition.result)}).</p></div>
      <div class="table-wrap" role="region" tabindex="0" aria-labelledby="components-caption"><table class="bar-table">
        <caption id="components-caption">Components of the stated aggregate, USD billions, final prospectus. Bar length is scaled to the largest value in this table. Values located, unverified.</caption>
        <thead><tr><th scope="col">Component</th><th scope="col" class="bar-col">Scale</th><th scope="col" class="num">USD B</th><th scope="col">Source</th></tr></thead>
        <tbody>
        ${components.map((c) => `<tr><th scope="row">${escape(c.label)}</th><td class="bar-col">${bar(c.value, componentMax)}</td><td class="num">${c.value.toFixed(1)}</td><td>${locator(c.row)}</td></tr>`).join('\n        ')}
        <tr class="total-row"><th scope="row">Stated aggregate (issuer)</th><td class="bar-col"><span class="cell-state">Sum of the rows above</span></td><td class="num">${escape(aggregate.value)}</td><td>${locator(aggregate)}</td></tr>
        <tr><th scope="row">Outside the aggregate: arrangements without a fixed dollar commitment (issuer estimate)</th><td class="bar-col">${bar(num(low.value), componentMax, num(high.value))}</td><td class="num">${escape(low.value)}–${escape(high.value)}</td><td>${locator(low)}</td></tr>
        <tr><th scope="row">Characteristic, not a component: subject to termination rights or contingent conditions</th><td class="bar-col">${bar(num(conditional.value), componentMax)}</td><td class="num">${escape(conditional.value)}</td><td>${locator(conditional)}</td></tr>
        </tbody></table></div>
      <div class="two-column compact">
        <div class="gate-note"><h3>How this changed between versions</h3><p>The S-1 left every amount blank. Amendment 1 stated ~$${escape(aggA1)}B; Amendment 2 raised it to ~$${escape(aggregate.value)}B, entirely from +$${subsequentDelta}B of post-quarter commitments, and cut the conditional share from $${escape(value('OBL-CONDITIONAL', 'aggregate', A1))}B to $${escape(conditional.value)}B. It also first disclosed the $${escape(low.value)}–${escape(high.value)}B excluded estimate. ${siteLink('evidence.html#revision-lineage', 'See the lineage table →')}</p></div>
        <div class="gate-note"><h3>What this view does not show</h3><p>No delivery schedule, utilization, unit price, location or energy: the filing does not disclose them per arrangement. The conditional amount is not attributed to components. Nothing here is a solvency, exposure or risk score.</p></div>
      </div>
      <h3 class="table-title" id="named-arrangements">Named arrangements — not additive</h3>
      <div class="table-wrap" role="region" tabindex="0" aria-labelledby="named-arrangements"><table class="bar-table">
        <caption>Final prospectus terms. These overlap with the components above in undisclosed ways, mix minimums, maximums, estimates and lease rent, and must not be summed. Bar length is scaled to the largest value in this table; a lighter extension shows a stated range.</caption>
        <thead><tr><th scope="col">Counterparty</th><th scope="col">Instrument</th><th scope="col" class="bar-col">Scale</th><th scope="col" class="num">USD B</th><th scope="col">Terms and conditions</th><th scope="col">Lineage</th></tr></thead>
        <tbody>
        ${arrangements.map((a) => `<tr><th scope="row">${escape(a.name)}</th><td>${escape(a.kind)}</td><td class="bar-col">${a.value === null ? '<span class="cell-state">no amount</span>' : bar(a.value, arrangementMax, a.upperValue)}</td><td class="num">${a.value === null ? '—' : a.upperValue ? `${a.value.toFixed(1)}–${a.upperValue.toFixed(1)}` : a.value.toFixed(1)} ${locator(a.row)}</td><td>${escape(a.terms)}</td><td>${escape(a.lineage)}</td></tr>`).join('\n        ')}
        </tbody></table></div>
      <p class="caption">Static fallback: ${docLink('research/W1-FILING-RECONSTRUCTION.md#w1-commitments', 'W1 §5 commitments ↗')} · Claims ${siteLink('evidence.html#cl-020', 'CL-020')} · ${siteLink('evidence.html#cl-021', 'CL-021')} · ${siteLink('evidence.html#cl-022', 'CL-022')} · ${siteLink('evidence.html#cl-023', 'CL-023')} · <a href="../data/extracted/w1-filing-facts.csv">Extracted facts (CSV)</a> · ${siteLink('paper.html#p06', 'Return to P06 →')}</p>
    </section>
    <section class="section" id="provider-candidates" aria-labelledby="candidates-title">
      <div class="section-heading"><div><p class="eyebrow">Research candidates / FR-08</p><h2 id="candidates-title">Seven providers, one evidenced edge.</h2></div><p>The cohort is a research choice, not a list of Anthropic suppliers. Unknown fields stay visible rather than being filled in.</p></div>
      <div class="table-wrap" role="region" tabindex="0" aria-labelledby="candidates-title"><table>
        <thead><tr><th scope="col">Provider</th><th scope="col">Archetype</th><th scope="col">Relationship to Anthropic in the filings</th><th scope="col">Capacity · utilization · financing · locations</th></tr></thead>
        <tbody>
        ${CANDIDATES.map((c) => `<tr><th scope="row">${escape(c.name)}</th><td>${escape(c.archetype)}</td><td>${c.named ? `Named counterparty, about $${escape(lambda)}B; largest agreement currently terminable (${siteLink(`evidence.html#${c.named.toLowerCase()}`, c.named)})` : '<span class="cell-state">Not named in the five primary documents</span> — absence is not evidence of no relationship'}</td><td><span class="cell-state">unknown · unknown · unknown · unknown</span></td></tr>`).join('\n        ')}
        </tbody></table></div>
      <p class="caption">Also named in the filings but not research candidates: Nscale (up to ~$${escape(nscale)}B) and Fluidstack (colocation services). Provider-side disclosures are still to be acquired (BACKLOG T-016).</p>
    </section>
  </main>`;
}

export function uncertaintyBody(reviewStrip) {
  const rows = parseCSV(readFileSync(new URL('../data/derived/w1-compute-pressure-illustrative.csv', import.meta.url), 'utf8')).rows;
  const quarters = rows.map((row) => ({ period: row.period, ratio: Number(row.ratio_percent) }));
  const result = evaluatePressure(quarters, DEFAULT_THRESHOLD);
  const scaleMax = 260;
  return `<main id="main" class="wrap" tabindex="-1" data-research-content>
    ${intro('Uncertainty and stress / F08', 'A boundary is', 'not a verdict.',
    'Three illustrative reverse-stress boundaries, evaluated only where evidence exists. The compute-pressure boundary can be checked against reported quarters; capacity use and regional power cannot yet. No Monte Carlo trials have been run.',
    'Reported quarters Q1-2025 to Q3-2026 · Derived, unverified · No probabilities')}
    ${reviewStrip}
    <section class="section" id="stress-boundaries" aria-labelledby="stress-title">
      <div class="section-heading"><div><p class="eyebrow">F08 / Stress boundaries</p><h2 id="stress-title">Compute-cost pressure, in history.</h2></div><p>Trigger: compute and infrastructure expense strictly above the threshold share of revenue for ${REQUIRED_RUN} consecutive comparable quarters (SPECIFICATION FR-14). The 60% default is illustrative and adjustable.</p></div>
      <form id="pressure-form" class="filters" hidden aria-label="Adjust the illustrative threshold">
        <label for="threshold-input">Threshold, % of revenue <input id="threshold-input" name="threshold" type="number" inputmode="decimal" min="${THRESHOLD_LIMITS.min}" max="${THRESHOLD_LIMITS.max}" step="1" value="${DEFAULT_THRESHOLD}" aria-describedby="threshold-error pressure-status"></label>
        <button type="reset" class="button secondary">Reset to ${DEFAULT_THRESHOLD}%</button>
        <p id="threshold-error" class="field-error" role="alert" hidden></p>
      </form>
      <p id="pressure-status" class="planned-note" role="status" aria-live="polite">${escape(summary(result))}</p>
      <div class="table-wrap" role="region" tabindex="0" aria-labelledby="pressure-caption"><table id="pressure-table" class="bar-table pressure" data-scale-max="${scaleMax}" style="--threshold-pos:${((100 * DEFAULT_THRESHOLD) / scaleMax).toFixed(2)}%">
        <caption id="pressure-caption">Reported compute and infrastructure expense ÷ revenue by quarter (final prospectus; recomputed from dollar values). The vertical marker shows the threshold (<span id="threshold-label">${DEFAULT_THRESHOLD}%</span>); bars are scaled to ${scaleMax}%.</caption>
        <thead><tr><th scope="col">Quarter</th><th scope="col" class="bar-col">Ratio</th><th scope="col" class="num">%</th><th scope="col">Above threshold?</th><th scope="col" class="num">Run</th><th scope="col">Boundary</th></tr></thead>
        <tbody>
        ${result.rows.map((row) => `<tr data-period="${escape(row.period)}" data-ratio="${row.ratio}"><th scope="row">${escape(row.period)}</th><td class="bar-col"><span class="bar-track" aria-hidden="true"><span class="bar-fill" style="width:${Math.min(100, (100 * row.ratio) / scaleMax).toFixed(2)}%"></span><span class="threshold-marker"></span></span></td><td class="num">${row.ratio.toFixed(1)}</td><td data-cell="above">${row.above ? 'Above' : 'Not above'}</td><td class="num" data-cell="run">${row.run}</td><td data-cell="met">${row.met ? 'Met' : '—'}</td></tr>`).join('\n        ')}
        </tbody></table></div>
      <div class="two-column compact">
        <div class="gate-note"><h3>Why crossing it here is not distress</h3><p>Every 2025 quarter was above 60% while revenue grew more than fivefold and prepaid capacity came online: a deliberate ramp. Continuity into 2026 depends on a composition change (leases and depreciation join the line item in 2026), so the Q4-2025 → Q1-2026 run needs reviewer judgment. ${siteLink('evidence.html#cl-025', 'CL-025')} · ${siteLink('evidence.html#cl-024', 'CL-024')}</p></div>
        <div class="gate-note"><h3>What is not shown</h3><p>No forecast, probability, solvency or covenant test. The issuer does not report a task or energy denominator, so this is a financial pressure measure only.</p></div>
      </div>
      <h3 class="table-title" id="other-boundaries">The other two boundaries</h3>
      <div class="cards">
        <article class="card"><span class="step">Committed-capacity use</span><span class="status-label">Insufficient evidence</span><h3>Below 60% for four quarters?</h3><p>Not evaluable. The filings disclose no utilization of committed capacity, and delivery schedules are not given per arrangement.</p></article>
        <article class="card"><span class="step">Regional power</span><span class="status-label">Insufficient evidence</span><h3>Required load above deliverable supply?</h3><p>Not evaluable. No facility locations, load or documented deliverable supply have been extracted (W6).</p></article>
        <article class="card"><span class="step">Monte Carlo ensemble</span><span class="status-label">No trials yet</span><h3>Seeded uncertainty runs</h3><p>Planned after the deterministic model and disclosed input distributions are reviewed (BACKLOG T-030/T-031). No probabilities are presented anywhere on this site.</p></article>
      </div>
      <p class="caption" style="margin-top:1.5rem">Static fallback: ${docLink('research/W1-FILING-RECONSTRUCTION.md#w1-stress', 'W1 §7 ↗')} · <a href="../data/derived/w1-compute-pressure-illustrative.csv">Derived data (CSV)</a> · ${siteLink('paper.html#p09', 'Return to P09 →')}</p>
    </section>
    <script type="module" src="assets/js/stress.mjs"></script>
  </main>`;
}
