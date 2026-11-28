// Reproducible W1 extraction: locate claim-relevant passages in the received
// filing text captures and record per-version values with line locators.
// Run: node tools/extract-filing-facts.mjs [--check]
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);

export const FILINGS = Object.freeze([
  { key: 'S-1', form: 'S-1', source: 'SRC-001', accession: '0001628280-26-067168', date: '2026-10-26',
    file: 'research/01-s1-2026-10-26__primary-document-anthropicpbc-sx1.md' },
  { key: 'S-1/A-1', form: 'S-1/A', source: 'SRC-002', accession: '0001628280-26-068676', date: '2026-11-02',
    file: 'research/02-s1a1-2026-11-02__primary-document-anthropicpbc-sx1ax1.txt', joined: true },
  { key: 'S-1/A-2', form: 'S-1/A', source: 'SRC-014', accession: '0001628280-26-072484', date: '2026-11-10',
    file: 'research/02b-s1a2-2026-11-10__primary-document-anthropicpbc-sx1ax2.md' },
  { key: 'S-1/A-3', form: 'S-1/A', source: 'SRC-015', accession: '0001628280-26-074338', date: '2026-11-17',
    file: 'research/03-s1a3-2026-11-17__primary-document-anthropicpbc-sx1ax3.md' },
  { key: '424B4', form: '424B4', source: 'SRC-016', accession: '0001628280-26-074944', date: '2026-11-19',
    file: 'research/04-424b4-2026-11-19__primary-document-anthropicpbc-424b4.md' },
].map(Object.freeze));

const QUARTERS = ['Q1-2025', 'Q2-2025', 'Q3-2025', 'Q4-2025', 'Q1-2026', 'Q2-2026', 'Q3-2026'];
const series = (labels) => (match) => match[1].replace(/\$/g, ' ').trim().split(/\s+/)
  .map((value, index) => ({ period: labels[index], value }));
const groups = (...periods) => (match) => periods.map((period, index) => ({ period, value: match[index + 1] ?? null }));
const disclosed = (period) => () => [{ period, value: 'disclosed' }];
const interim = (text, index) => {
  const before = text.slice(Math.max(0, index - 900), index);
  const six = before.lastIndexOf('Six Months Ended');
  const nine = before.lastIndexOf('Nine Months Ended');
  return nine > six ? '9M' : six >= 0 ? 'H1' : 'interim';
};

// table: values come from a rendered table; A1's joined text does not support numeric alignment claims.
export const FACTS = Object.freeze([
  { id: 'REV-ANNUAL', claims: 'CL-001', metric: 'revenue', unit: 'USD million', table: true,
    pattern: /Revenue ?\$41 ?\$386 ?\$([\d,]+) ?\$([\d,]+) ?\$([\d,]+)/,
    read: (m, text) => { const p = interim(text, m.index); return [
      { period: 'FY2025', value: m[1] }, { period: `${p}-2025`, value: m[2] }, { period: `${p}-2026`, value: m[3] }]; } },
  { id: 'CI-ANNUAL', claims: 'CL-002', metric: 'compute and infrastructure expense', unit: 'USD million', table: true,
    pattern: /infrastructure ?433 ?2,522 ?([\d,]+) ?([\d,]+) ?([\d,]+)/,
    read: (m, text) => { const p = interim(text, m.index); return [
      { period: 'FY2025', value: m[1] }, { period: `${p}-2025`, value: m[2] }, { period: `${p}-2026`, value: m[3] }]; } },
  { id: 'REV-Q', claims: 'CL-001;CL-004', metric: 'quarterly revenue', unit: 'USD million', table: true,
    pattern: /Revenue ?(\$376(?: ?\$[\d,]+){5,6})/, read: series(QUARTERS) },
  { id: 'CI-Q', claims: 'CL-002;CL-003', metric: 'quarterly compute and infrastructure expense', unit: 'USD million', table: true,
    pattern: /infrastructure ?(944(?: [\d,]+){5,6})/, read: series(QUARTERS) },
  { id: 'CI-PCT-Q', claims: 'CL-002', metric: 'compute and infrastructure expense as percent of revenue', unit: 'percent', table: true,
    pattern: /infrastructure ?(251(?: \d+){5,6})/, read: series(QUARTERS) },
  { id: 'CI-PCT-9M', claims: 'CL-002', metric: 'compute and infrastructure expense as percent of revenue', unit: 'percent', table: true,
    pattern: /Compute and infrastructure ?\$4,381 ?\$18,808 ?\$14,427 ?329% ?Percentage of revenue ?(\d+)% ?(\d+)%/,
    read: groups('9M-2025', '9M-2026') },
  { id: 'CI-PCT-NARR', claims: 'CL-002', metric: 'compute and infrastructure expense as percent of revenue', unit: 'percent',
    pattern: /to (\d+)% for the three months ended June 30, 2026, as revenue growth outpaced the growth of our committed compute cost base, and increased to (\d+)% for the three months ended September 30, 2026/,
    read: groups('Q2-2026', 'Q3-2026') },
  { id: 'GROWTH-Q3', claims: 'CL-002', metric: 'year-over-year growth, revenue vs compute and infrastructure expense', unit: 'percent',
    pattern: /revenue grew ([\d,]+)% year over year for the three months ended September 30, 2026, compared to our compute and infrastructure expenses that grew (\d+)%/,
    read: groups('Q3-2026 revenue', 'Q3-2026 compute and infrastructure') },
  { id: 'CI-DEF', claims: 'CL-002', metric: 'compute and infrastructure definition', unit: 'text',
    pattern: /These costs primarily consist of compute fees (?:\d+ )?paid to CSPs under committed and on-demand arrangements/, read: disclosed('definition') },
  { id: 'CI-DEF-2026', claims: 'CL-002', metric: 'compute and infrastructure composition change', unit: 'text',
    pattern: /Beginning in 2026, as our obligations commence under compute and infrastructure leases, these expenses also include operating lease costs/,
    read: disclosed('from 2026') },
  { id: 'CE-DEF', claims: 'CL-002', metric: 'issuer definition of compute efficiency', unit: 'text',
    pattern: /We define compute efficiency as maximizing the intelligence produced and revenue generated per dollar of compute invested/,
    read: disclosed('definition') },
  { id: 'LEAD-TIME', claims: 'CL-003;CL-012', metric: 'compute procurement lead time', unit: 'months',
    pattern: /typically procure 12 to 18 months in advance of availability/, read: () => [{ period: 'stated practice', value: '12-18' }] },
  { id: 'ST-COST', claims: 'CL-003', metric: 'short-term compute relative cost wording', unit: 'text',
    pattern: /short-term compute(?:,)? (that currently costs significantly more than comparable compute procured under our multi-year commitments|which typically carries a higher cost per unit of compute)/,
    read: (m) => [{ period: 'stated', value: m[1].startsWith('that') ? 'currently costs significantly more than comparable multi-year compute' : 'typically carries a higher cost per unit of compute' }] },
  { id: 'ST-Q3', claims: 'CL-003', metric: 'compute under short-term commitments within expense', unit: 'USD billion',
    pattern: /This includes \$([\d.]+) billion of compute under short-term commitments/, read: groups('Q3-2026') },
  { id: 'ST-9M', claims: 'CL-003', metric: 'compute under short-term commitments within expense', unit: 'USD billion',
    pattern: /includes \$([\d.]+) billion of compute under short-term commitments for the nine months/, read: groups('9M-2026') },
  { id: 'PRICE-Q4-2025', claims: 'CL-004', metric: 'sequential revenue offset from price reductions and contractual discounts', unit: 'USD million',
    pattern: /September 30, 2025 to the three months ended December 31, 2025, the increase in revenue due to higher usage was partially offset by a decrease of approximately \$(\d+) million from price reductions/,
    read: groups('Q3-2025 to Q4-2025') },
  { id: 'PRICE-Q3-2026', claims: 'CL-004', metric: 'sequential revenue offset from price reductions and contractual discounts', unit: 'USD million',
    pattern: /June 30, 2026 to the three months ended September 30, 2026, the increase in revenue due to higher usage was partially offset by a decrease of approximately \$(\d+) million from price reductions introduced as part of new model versions and contractual discounts/,
    read: groups('Q2-2026 to Q3-2026') },
  { id: 'AGG-SUMMARY', claims: 'CL-005;CL-020', metric: 'aggregate committed spend (prospectus summary)', unit: 'USD billion',
    pattern: /with an aggregate committed spend of (?:a ?pproximately|more than) \$([\d.]*)/, read: groups('as of and subsequent to 2026-09-30') },
  { id: 'AGG-OBLIGATIONS', claims: 'CL-005;CL-020', metric: 'aggregate contractual obligations and commitments', unit: 'USD billion',
    pattern: /contractual obligations in the table below plus the short-term and subsequent commitments, as well as leases not yet commenced, each described in the paragraphs below,? are approximately \$([\d.]*)/,
    read: groups('as of and subsequent to 2026-09-30') },
  { id: 'AGG-2030', claims: 'CL-020', metric: 'committed spend expected before 2030-12-31', unit: 'USD billion',
    pattern: /These commitments include approximately \$([\d.]*) ?(?:billion )?expected to be incurred before December 31, 2030/, read: groups('through 2030') },
  { id: 'AGG-12M', claims: 'CL-020', metric: 'commitments due in 12 months following 2026-09-30', unit: 'USD billion',
    pattern: /Approximately \$([\d.]*) ?(?:billion )?of these commitments are due in the (?:next )?12 months/, read: groups('12 months after 2026-09-30') },
  { id: 'OBL-TABLE', claims: 'CL-020', metric: 'contractual obligations table total', unit: 'USD million', table: true,
    pattern: /Total\(4\)\(5\) ?\$?([\d,]*)/, read: groups('as of 2026-09-30') },
  { id: 'OBL-SHORT-TERM', claims: 'CL-020', metric: 'short-term commitments excluded from table', unit: 'USD billion',
    pattern: /Minimum payments under such contracts were approximately \$([\d.]+) billion/, read: groups('as of 2026-09-30') },
  { id: 'OBL-LEASES-NC', claims: 'CL-020', metric: 'leases executed and not yet commenced', unit: 'USD billion',
    pattern: /leases executed and not yet commenced as of September 30, 2026, with total estimated future undiscounted lease obligations of approximately \$([\d.]+) billion/,
    read: groups('as of 2026-09-30') },
  { id: 'OBL-SUBSEQUENT', claims: 'CL-020', metric: 'commitments entered after 2026-09-30', unit: 'USD billion',
    pattern: /commitments entered into after September 30, 2026, with aggregate future minimum payment obligations of approximately \$([\d.]+) billion/,
    read: groups('after 2026-09-30') },
  { id: 'OBL-SUBSEQUENT-ST', claims: 'CL-020', metric: 'short-term agreements entered after 2026-09-30', unit: 'USD billion',
    pattern: /Minimum payments under such contracts are approximately \$([\d.]+) billion/, read: groups('after 2026-09-30') },
  { id: 'OBL-CONDITIONAL', claims: 'CL-021', metric: 'obligations subject to termination rights or contingent conditions', unit: 'USD billion',
    pattern: /Approximately \$([\d.]+) billion of the aggregate total of our contractual obligations relates to arrangements that are subject to either exercisable termination rights or contingent conditions/,
    read: groups('aggregate') },
  { id: 'OBL-CONDITIONAL-12M', claims: 'CL-021', metric: 'next-12-month obligations subject to contingencies or termination rights', unit: 'USD billion',
    pattern: /of which approximately \$([\d.]+) billion relates to arrangements that are subject to either contingent conditions or termination rights/,
    read: groups('12 months after 2026-09-30') },
  { id: 'OBL-NO-FIXED', claims: 'CL-021', metric: 'estimated payments under arrangements without a fixed dollar commitment (excluded from aggregate)', unit: 'USD billion',
    pattern: /We estimate these payments to be in the range of \$(\d+) billion to \$(\d+) billion/, read: groups('low', 'high') },
  { id: 'C-MICROSOFT', claims: 'CL-022', metric: 'Microsoft minimum committed spend', unit: 'USD billion',
    pattern: /pursuant to which we committed to spend an aggregate of at least \$([\d.]+) billion(?: and up to \$([\d.]+) billion)? between November 2026 and (\w+ \d{4}), regardless of actual usage/,
    read: groups('minimum', 'maximum', 'term end') },
  { id: 'C-GOOGLE', claims: 'CL-022', metric: 'Google CSP hosting minimum committed spend', unit: 'USD billion',
    pattern: /agreement with Google, which was subsequently amended between \w+ and (\w+) 2026,? (?:and )?pursuant to which we committed to spend at least approximately \$([\d.]+) billion (?:\d+ )?between April 2026 and (\w+ \d{4})/,
    read: groups('amended through (2026)', 'minimum', 'term end') },
  { id: 'C-GOOGLE-TPU', claims: 'CL-022', metric: 'estimated additional TPU payments without fixed dollar commitment', unit: 'USD billion',
    pattern: /We estimate the aggregate future payments for such additional compute to be approximately \$([\d.]+) billion to \$([\d.]+) billion/,
    read: groups('low', 'high') },
  { id: 'C-AMAZON', claims: 'CL-022', metric: 'Amazon minimum committed spend', unit: 'USD billion',
    pattern: /committed to spend an aggregate of at least \$([\d.]+) billion between May 2026 and April 2036/, read: groups('2026-05 to 2036-04') },
  { id: 'C-SPACEXAI', claims: 'CL-022', metric: 'SpaceXAI maximum aggregate spend', unit: 'USD billion',
    pattern: /SpaceXAI Arrangements, we agreed to spend an aggregate of up to \$([\d.]+) billion/, read: groups('terms into 2029') },
  { id: 'C-SPACEXAI-MONTHLY', claims: 'CL-022', metric: 'SpaceXAI aggregate monthly fee once all capacity is delivered', unit: 'USD billion per month',
    pattern: /consisting of approximately \$([\d.]+) billion in the aggregate per month once all capacity has been delivered/, read: groups('full delivery') },
  { id: 'C-AMD', claims: 'CL-022', metric: 'AMD expected expenditure if initial capacity procured', unit: 'USD billion',
    pattern: /we expect aggregate expenditures to exceed \$([\d.]+) billion over the term of the agreement/, read: groups('lower bound') },
  { id: 'C-BROADCOM-LEASE', claims: 'CL-022', metric: 'Broadcom equipment lease rent excluding interest', unit: 'USD billion',
    pattern: /Our rent payments over the life of these leases are equal to an aggregate of approximately \$([\d.]+) billion excluding interest/,
    read: groups('lease terms') },
  { id: 'C-NSCALE', claims: 'CL-023', metric: 'Nscale maximum aggregate spend', unit: 'USD billion',
    pattern: /Nscale Services Agreements, we agreed to spend an aggregate of up to approximately \$([\d.]+) billion/, read: groups('terms into 2033') },
  { id: 'C-LAMBDA', claims: 'CL-023', metric: 'Lambda aggregate agreed spend', unit: 'USD billion',
    pattern: /Lambda Agreements, we agreed to spend an aggregate of approximately \$([\d.]+) billion/, read: groups('terms into 2034') },
  { id: 'C-LAMBDA-AUG', claims: 'CL-023', metric: 'Lambda August 2026 agreement share of commitment', unit: 'USD billion',
    pattern: /which represents approximately \$([\d.]+) billion of the aggregate commitment, either party may terminate if Lambda does not (?:timely )?secure the facility lease/,
    read: groups('August 2026 agreement') },
  { id: 'C-LAMBDA-STATUS', claims: 'CL-023', metric: 'Lambda August agreement termination status', unit: 'text',
    pattern: /Lambda did not secure the facility lease by such date and, as a result, the August 2026 agreement is currently terminable by either party/,
    read: () => [{ period: 'as of filing', value: 'currently terminable by either party' }] },
  { id: 'C-FLUIDSTACK', claims: 'CL-023', metric: 'Fluidstack colocation and services agreement', unit: 'text',
    pattern: /colocation and services agreement with Fluidstack USA I Inc\./, read: disclosed('no amount stated in passage') },
  { id: 'CHIP-FAMILIES', claims: 'CL-012', metric: 'accelerator families trained and served', unit: 'text',
    pattern: /four major chip families \(AWS Trainium, Google TPUs, NVIDIA GPUs, and AMD GPUs\)/, read: disclosed('stated') },
].map(Object.freeze));

export function normalize(raw) {
  const lines = raw.split(/\r?\n/);
  let text = '';
  const starts = [];
  lines.forEach((line, index) => {
    const content = line.replace(/\s+/g, ' ').trim();
    if (!content) return;
    starts.push([text.length, index + 1]);
    text += `${content} `;
  });
  const lineAt = (offset) => {
    let low = 0; let high = starts.length - 1;
    while (low < high) {
      const mid = Math.ceil((low + high) / 2);
      if (starts[mid][0] <= offset) low = mid; else high = mid - 1;
    }
    return starts[low][1];
  };
  return { text, lineAt };
}

const excerpt = (value) => (value.length > 200 ? `${value.slice(0, 197)}...` : value);

export function extract(documents) {
  const rows = [];
  for (const fact of FACTS) {
    for (const filing of FILINGS) {
      const { text, lineAt } = documents[filing.key];
      const match = fact.pattern.exec(text);
      const base = {
        fact_id: fact.id, claim_ids: fact.claims, metric: fact.metric, unit: fact.unit,
        filing: filing.key, form: filing.form, accession: filing.accession, filing_date: filing.date,
        source_id: filing.source, file: filing.file,
      };
      if (!match) {
        rows.push({ ...base, period: '', line_start: '', line_end: '', value: '', status: 'not-found',
          match_text: '', note: 'Pattern not found in this version; absence requires reviewer confirmation, not a negative finding.' });
        continue;
      }
      const lineStart = lineAt(match.index);
      const lineEnd = lineAt(match.index + match[0].length - 1);
      for (const { period, value } of fact.read(match, text)) {
        let status = 'extracted';
        let note = '';
        if (value === null) {
          status = 'not-stated';
          note = 'Optional term is not stated in this version.';
        } else if (value === '') {
          status = 'blank-in-version';
          note = 'Passage present with an unfilled amount placeholder in this version.';
        } else if (fact.table && filing.joined) {
          status = 'alignment-unverified';
          note = 'A1 text joins two renderings; the supplied join check excludes numbers and table punctuation.';
        }
        rows.push({ ...base, period, line_start: lineStart, line_end: lineEnd, value: value ?? '', status,
          match_text: excerpt(match[0]), note });
      }
    }
  }
  return rows;
}

const number = (value) => Number(String(value).replace(/,/g, ''));
const pick = (rows, factId, filing, period) => {
  const row = rows.find((r) => r.fact_id === factId && r.filing === filing && r.period === period && r.value !== '');
  if (!row) throw new Error(`Missing ${factId} ${filing} ${period}`);
  return number(row.value);
};

// Derived checks: footing, recomputed ratios, decomposition and revision deltas.
export function checks(rows) {
  const out = [];
  const add = (id, description, formula, computed, reported, tolerance, inputs, note = '') => {
    const pass = Math.abs(computed - reported) <= tolerance;
    out.push({ check_id: id, description, formula, computed: Number(computed.toFixed(4)), reported, tolerance,
      result: pass ? 'pass' : 'fail', inputs, note });
  };
  const F = '424B4';
  const q = (fact, period, filing = F) => pick(rows, fact, filing, period);
  const sum = (fact, periods, filing = F) => periods.reduce((total, period) => total + q(fact, period, filing), 0);
  const Q25 = QUARTERS.slice(0, 4); const Q9M25 = QUARTERS.slice(0, 3); const Q9M26 = QUARTERS.slice(4, 7);
  add('CHK-01', 'Quarterly revenue Q1-Q4 2025 foots to FY2025 revenue', 'sum(REV-Q 2025)', sum('REV-Q', Q25), q('REV-ANNUAL', 'FY2025'), 0, '424B4 REV-Q;REV-ANNUAL');
  add('CHK-02', 'Quarterly revenue Q1-Q3 2025 foots to nine-month 2025 revenue', 'sum(REV-Q Q1-Q3 2025)', sum('REV-Q', Q9M25), q('REV-ANNUAL', '9M-2025'), 0, '424B4 REV-Q;REV-ANNUAL');
  add('CHK-03', 'Quarterly revenue Q1-Q3 2026 foots to nine-month 2026 revenue', 'sum(REV-Q Q1-Q3 2026)', sum('REV-Q', Q9M26), q('REV-ANNUAL', '9M-2026'), 0, '424B4 REV-Q;REV-ANNUAL');
  add('CHK-04', 'Quarterly compute and infrastructure 2025 foots to FY2025', 'sum(CI-Q 2025)', sum('CI-Q', Q25), q('CI-ANNUAL', 'FY2025'), 0, '424B4 CI-Q;CI-ANNUAL');
  add('CHK-05', 'Quarterly compute and infrastructure Q1-Q3 2025 foots to nine-month 2025', 'sum(CI-Q Q1-Q3 2025)', sum('CI-Q', Q9M25), q('CI-ANNUAL', '9M-2025'), 0, '424B4 CI-Q;CI-ANNUAL');
  add('CHK-06', 'Quarterly compute and infrastructure Q1-Q3 2026 foots to nine-month 2026', 'sum(CI-Q Q1-Q3 2026)', sum('CI-Q', Q9M26), q('CI-ANNUAL', '9M-2026'), 0, '424B4 CI-Q;CI-ANNUAL');
  for (const [index, period] of QUARTERS.entries()) {
    add(`CHK-07${String.fromCharCode(97 + index)}`, `Recomputed compute/revenue ratio rounds to reported percent, ${period}`,
      'round(100*CI-Q/REV-Q)', Math.round((100 * q('CI-Q', period)) / q('REV-Q', period)), q('CI-PCT-Q', period), 0,
      '424B4 CI-Q;REV-Q;CI-PCT-Q', 'Financial ratio only; not gross margin or physical efficiency.');
  }
  add('CHK-08', 'Recomputed nine-month 2026 compute/revenue ratio rounds to reported percent', 'round(100*CI 9M-2026/REV 9M-2026)',
    Math.round((100 * q('CI-ANNUAL', '9M-2026')) / q('REV-ANNUAL', '9M-2026')), q('CI-PCT-9M', '9M-2026'), 0, '424B4 CI-ANNUAL;REV-ANNUAL;CI-PCT-9M');
  add('CHK-09', 'Q3 2026 year-over-year revenue growth recomputes to reported percent', 'round(100*(REV Q3-2026/REV Q3-2025-1))',
    Math.round(100 * (q('REV-Q', 'Q3-2026') / q('REV-Q', 'Q3-2025') - 1)), q('GROWTH-Q3', 'Q3-2026 revenue'), 0, '424B4 REV-Q;GROWTH-Q3');
  add('CHK-10', 'Q3 2026 year-over-year compute growth recomputes to reported percent', 'round(100*(CI Q3-2026/CI Q3-2025-1))',
    Math.round(100 * (q('CI-Q', 'Q3-2026') / q('CI-Q', 'Q3-2025') - 1)), q('GROWTH-Q3', 'Q3-2026 compute and infrastructure'), 0, '424B4 CI-Q;GROWTH-Q3');
  const decomposition = (filing) => q('OBL-TABLE', 'as of 2026-09-30', filing) / 1000 + q('OBL-SHORT-TERM', 'as of 2026-09-30', filing)
    + q('OBL-LEASES-NC', 'as of 2026-09-30', filing) + q('OBL-SUBSEQUENT', 'after 2026-09-30', filing) + q('OBL-SUBSEQUENT-ST', 'after 2026-09-30', filing);
  add('CHK-11', 'Final aggregate commitments decompose into disclosed components', 'table/1000 + short-term + leases not commenced + subsequent + subsequent short-term',
    decomposition(F), q('AGG-OBLIGATIONS', 'as of and subsequent to 2026-09-30'), 0.05, '424B4 OBL-*;AGG-OBLIGATIONS', 'Tolerance reflects one-decimal rounding of disclosed billions.');
  add('CHK-12', 'Amendment 1 aggregate commitments decompose into its disclosed components', 'same components, A1 narrative values',
    decomposition('S-1/A-1'), q('AGG-OBLIGATIONS', 'as of and subsequent to 2026-09-30', 'S-1/A-1'), 0.05, 'S-1/A-1 OBL-*;AGG-OBLIGATIONS',
    'Table total read from joined A1 text; numeric alignment unverified, checked against A2-424B4 equality below.');
  add('CHK-13', 'A1 to A2 aggregate revision equals the change in post-quarter commitments', '(AGG A2 - AGG A1) - (SUBSEQUENT A2 - SUBSEQUENT A1)',
    (q('AGG-OBLIGATIONS', 'as of and subsequent to 2026-09-30', 'S-1/A-2') - q('AGG-OBLIGATIONS', 'as of and subsequent to 2026-09-30', 'S-1/A-1'))
    - (q('OBL-SUBSEQUENT', 'after 2026-09-30', 'S-1/A-2') - q('OBL-SUBSEQUENT', 'after 2026-09-30', 'S-1/A-1')), 0, 0.05, 'S-1/A-1;S-1/A-2 AGG-OBLIGATIONS;OBL-SUBSEQUENT');
  add('CHK-14', 'Original S-1 six-month 2026 revenue equals later Q1+Q2 2026 quarterly revenue', 'REV H1-2026 (S-1) - (REV Q1-2026 + REV Q2-2026) (424B4)',
    q('REV-ANNUAL', 'H1-2026', 'S-1') - (q('REV-Q', 'Q1-2026') + q('REV-Q', 'Q2-2026')), 0, 0, 'S-1 REV-ANNUAL;424B4 REV-Q');
  add('CHK-15', 'Original S-1 six-month 2026 compute equals later Q1+Q2 2026 quarterly compute', 'CI H1-2026 (S-1) - (CI Q1-2026 + CI Q2-2026) (424B4)',
    q('CI-ANNUAL', 'H1-2026', 'S-1') - (q('CI-Q', 'Q1-2026') + q('CI-Q', 'Q2-2026')), 0, 0, 'S-1 CI-ANNUAL;424B4 CI-Q');
  let changed = 0;
  for (const fact of ['REV-Q', 'CI-Q', 'CI-PCT-Q']) {
    for (const period of QUARTERS.slice(0, 6)) {
      for (const filing of ['S-1', 'S-1/A-2', 'S-1/A-3']) if (q(fact, period, filing) !== q(fact, period)) changed += 1;
    }
  }
  add('CHK-16', 'Overlapping quarterly values Q1-2025 to Q2-2026 unchanged across S-1, A2, A3 and 424B4', 'count of differing quarterly cells',
    changed, 0, 0, 'REV-Q;CI-Q;CI-PCT-Q', 'A1 tables excluded because numeric alignment is not established by the join check.');
  return out;
}

// FR-14 illustrative trigger (strictly >60% for four consecutive comparable quarters).
// Not a viability, solvency or community-acceptability verdict.
export function computePressure(rows, threshold = 60) {
  let run = 0;
  return QUARTERS.map((period) => {
    const revenue = pick(rows, 'REV-Q', '424B4', period);
    const expense = pick(rows, 'CI-Q', '424B4', period);
    const ratio = (100 * expense) / revenue;
    const above = ratio > threshold;
    run = above ? run + 1 : 0;
    return {
      period, revenue_usd_million: revenue, compute_infrastructure_usd_million: expense,
      ratio_percent: Number(ratio.toFixed(2)), threshold_percent: threshold, above_threshold: above,
      consecutive_quarters_above: run, boundary_met: run >= 4,
      comparability: period.endsWith('2026')
        ? 'Composition expands in 2026 as lease, depreciation and amortization costs commence; continuity across Q4-2025/Q1-2026 needs reviewer judgment.'
        : 'Same disclosed composition within 2025.',
      source: '424B4 REV-Q and CI-Q',
    };
  });
}

function csv(rows) {
  const header = Object.keys(rows[0]);
  const cell = (value) => {
    const text = String(value ?? '');
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  return `${header.join(',')}\n${rows.map((row) => header.map((key) => cell(row[key])).join(',')).join('\n')}\n`;
}

export async function build() {
  const documents = {};
  for (const filing of FILINGS) documents[filing.key] = normalize(await readFile(new URL(filing.file, root), 'utf8'));
  const facts = extract(documents);
  const pressure = computePressure(facts);
  return { facts, checks: checks(facts), pressure, files: {
    'data/extracted/w1-filing-facts.csv': csv(facts),
    'data/derived/w1-reconciliation-checks.csv': csv(checks(facts)),
    'data/derived/w1-compute-pressure-illustrative.csv': csv(pressure),
  } };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const check = process.argv.includes('--check');
  const { files, checks: results } = await build();
  for (const [path, contents] of Object.entries(files)) {
    const url = new URL(path, root);
    if (check) {
      if (await readFile(url, 'utf8') !== contents) throw new Error(`${path} is stale; run node tools/extract-filing-facts.mjs`);
    } else {
      await mkdir(new URL('.', url), { recursive: true });
      await writeFile(url, contents);
    }
  }
  const failed = results.filter((row) => row.result !== 'pass');
  console.log(`${check ? 'Checked' : 'Wrote'} W1 extraction: ${results.length} derived checks, ${failed.length} failed.`);
  if (failed.length) { console.error(failed); process.exitCode = 1; }
}
