// Generates the live paper reader and evidence room bodies from the manuscript,
// claim ledger, figure registry and W1 extraction. One source of truth: the
// Markdown manuscript is rendered, never re-written by hand in HTML.
import { readFileSync } from 'node:fs';
import { posix } from 'node:path';
import { SITE, documentURL } from '../docs/assets/js/config.mjs';
import { SECTIONS, FILINGS } from '../docs/assets/js/research.mjs';
import { blocks, escape } from './markdown.mjs';
import { parseCSV } from './csv.mjs';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
export const docLink = (path, label, className = '') =>
  `<a href="${escape(documentURL(path))}"${className ? ` class="${className}"` : ''}>${escape(label)}</a>`;
export const siteLink = (path, label, className = '') =>
  `<a href="${escape(path)}" data-site-link${className ? ` class="${className}"` : ''}>${escape(label)}</a>`;
export const sourceLine = (file, line) => `${documentURL(file)}?plain=1#L${line}`;

export function loadResearch() {
  const manuscript = read('paper/PAPER-DRAFT.md');
  const ledger = parseCSV(read('CLAIM-LEDGER.csv')).rows;
  const figures = JSON.parse(read('paper/figures.json')).figures;
  const facts = parseCSV(read('data/extracted/w1-filing-facts.csv')).rows;
  const checks = parseCSV(read('data/derived/w1-reconciliation-checks.csv')).rows;
  return { manuscript, ledger, figures, facts, checks };
}

// Split the manuscript at the explicit <a id="pNN"></a> anchors.
export function splitManuscript(markdown) {
  const parts = markdown.split(/^<a id="(p\d{2})"><\/a>$/m);
  const sections = [];
  for (let index = 1; index < parts.length; index += 2) sections.push({ id: parts[index], markdown: parts[index + 1] });
  return { front: parts[0], sections };
}

// Expand "CL-001–CL-005" style ranges so citations count every claim in the range.
export function citedClaims(markdown) {
  const ids = new Set();
  for (const match of markdown.matchAll(/CL-(\d{3})(?:\s*[–-]\s*CL-(\d{3}))?/g)) {
    const start = Number(match[1]);
    const end = match[2] ? Number(match[2]) : start;
    for (let value = start; value <= end && value - start < 50; value += 1) ids.add(`CL-${String(value).padStart(3, '0')}`);
  }
  return [...ids].sort();
}

function linkFor(href) {
  if (href.startsWith('#')) return { href, attrs: 'data-site-link' };
  if (/^https?:\/\//.test(href)) return { href };
  const resolved = posix.normalize(posix.join('paper', href));
  if (resolved.startsWith('data/')) return { href: `../${resolved}` };
  return { href: documentURL(resolved) };
}

function claimDecorator(claims) {
  return (html) => html.replace(/\bCL-\d{3}\b/g, (id) => {
    const claim = claims.get(id);
    if (!claim) return id;
    const label = `${claim.classification}, verification ${claim.verification_state}`;
    return `<a class="claim-ref" href="evidence.html#${id.toLowerCase()}" data-site-link title="${escape(label)}">${id}</a>`;
  });
}

function figureAside(block, figure) {
  const live = figure.status === 'live';
  const status = live ? 'Live view · not calibrated' : 'Planned · not available';
  const fallback = figure.fallback.startsWith('paper/PAPER-DRAFT.md#')
    ? siteLink(`#${figure.fallback.split('#')[1]}`, 'Static explanation in this section')
    : docLink(figure.fallback, 'Static fallback ↗');
  const data = figure.data ? `<a href="../${escape(figure.data)}">Data (CSV)</a>` : '';
  return `<aside class="figure-ref" id="${figure.id.toLowerCase()}" aria-label="Figure ${figure.id}: ${escape(figure.title)}">
          <p class="figure-head"><span class="eyebrow">${figure.id} · ${escape(figure.title)}</span><span class="status-label">${status}</span></p>
          <p>${block.html}</p>
          <p class="figure-actions">${live ? siteLink(figure.route, `Explore ${figure.id} →`, 'button') : `<span class="caption">Route reserved: ${escape(figure.route)}</span>`}${fallback}${data}</p>
        </aside>`;
}

function renderBlocks(list, figures) {
  return list.map((block) => {
    if (block.type === 'p') {
      const figure = block.text.match(/^\*\*(F\d{2})\b/);
      if (figure) {
        const record = figures.find((entry) => entry.id === figure[1]);
        if (record) return figureAside(block, record);
      }
      return `<p>${block.html}</p>`;
    }
    if (block.type === 'h3') return `<h3>${block.html}</h3>`;
    if (block.type === 'h2' || block.type === 'h1') return `<h3>${block.html}</h3>`;
    return block.html;
  }).join('\n          ');
}

export function paperBody(reviewStrip) {
  const { manuscript, ledger, figures } = loadResearch();
  const claims = new Map(ledger.map((row) => [row.claim_id, row]));
  const options = { link: linkFor, decorate: claimDecorator(claims) };
  const { front, sections } = splitManuscript(manuscript);
  const frontBlocks = blocks(front, options);
  const title = frontBlocks.find((block) => block.type === 'h1');
  const subtitle = frontBlocks.find((block) => block.type === 'h2');
  const meta = frontBlocks.filter((block) => block.type === 'p' && /^\*\*(Initial author|Working version|Evidence cutoff|Status):\*\*/.test(block.text));
  const guideStart = frontBlocks.findIndex((block) => block.type === 'h2' && block.text === 'Reader guide');
  const introduction = frontBlocks.filter((block, index) => block.type === 'p' && !meta.includes(block) && (guideStart < 0 || index < guideStart));
  const guide = guideStart >= 0 ? frontBlocks.slice(guideStart + 1) : [];
  const byID = new Map(SECTIONS.map((section) => [section.id, section]));
  const rendered = sections.map(({ id, markdown }) => {
    const list = blocks(markdown, options);
    const heading = list.find((block) => block.type === 'h2');
    const titleText = heading ? heading.text.replace(/^P\d{2}\s+—\s+/, '') : byID.get(id)?.title ?? id;
    const body = list.filter((block) => block !== heading);
    const cited = citedClaims(markdown).filter((claim) => claims.has(claim));
    const lane = byID.get(id)?.lane ?? '';
    return `
        <section class="paper-section" id="${id}" aria-labelledby="${id}-title">
          <p class="eyebrow">${id.toUpperCase()} / ${escape(lane)}</p>
          <h2 id="${id}-title">${escape(titleText)}</h2>
          ${renderBlocks(body, figures)}
          <div class="section-links">${docLink(`paper/PAPER-DRAFT.md#${id}`, `${id.toUpperCase()} source on GitHub ↗`)}${cited.length ? `<span class="caption">Claims: ${cited.map((claim) => siteLink(`evidence.html#${claim.toLowerCase()}`, claim)).join(' · ')}</span>` : ''}</div>
          ${siteLink('#contents', 'Back to section contents ↑', 'back-to-contents')}
        </section>`;
  });
  return `<main id="main" class="wrap" tabindex="-1" data-research-content>
    <header class="page-intro"><p class="eyebrow">The live research reader / review draft</p><h1>${title ? title.html : 'Models, Megawatts, and Moats'}</h1>
      ${subtitle ? `<p class="lead">${subtitle.html}</p>` : ''}
      <div class="page-meta paper-meta">${meta.map((block) => `<p>${block.html}</p>`).join('')}</div>
      <div class="actions">${siteLink('#p00', 'Start reading ↓', 'button')}${siteLink('evidence.html#claims', 'Inspect the claims →', 'button secondary')}${docLink('paper/PAPER-DRAFT.md', 'Manuscript source ↗')}<button type="button" class="button secondary" data-print hidden>Print or save as PDF</button></div>
      <p class="print-only">Printed from the live research reader: https://ethical-tech-colab.github.io/frontier-half-life/docs/paper.html · ${SITE.version} review draft, not an analytical release. Claim IDs (CL-NNN) resolve at docs/evidence.html#cl-NNN; figure routes are printed in each figure panel with its static explanation.</p>
    </header>
    ${reviewStrip}
    <div class="reader-layout">
      <nav id="contents" class="contents" aria-label="Paper section contents"><h2>In this paper / P00–P12</h2><ol>
        <li><a href="#about" data-site-link><span class="section-id">—</span><span>About this draft</span></a></li>
        ${SECTIONS.map((section) => `<li><a href="#${section.id}" data-site-link><span class="section-id">${section.id.toUpperCase()}</span><span>${escape(section.title)}</span></a></li>`).join('\n        ')}
      </ol></nav>
      <div class="paper-sections prose">
        <section class="paper-section" id="about" aria-labelledby="about-title">
          <p class="eyebrow">Reader guide</p>
          <h2 id="about-title">About this draft</h2>
          ${introduction.map((block) => `<p>${block.html}</p>`).join('\n          ')}
          ${renderBlocks(guide, figures)}
          <p class="caption">Claim IDs link to the evidence room, where each claim shows its classification, verification state, locator and the sections that cite it. Figure panels state whether a view is live or planned; every figure keeps a static explanation.</p>
        </section>${rendered.join('\n')}
      </div>
    </div>
  </main>`;
}

const LINEAGE = [
  { fact: 'REV-ANNUAL', period: '9M-2026', label: 'Revenue, nine months to 2026-09-30', unit: 'USD M' },
  { fact: 'CI-PCT-NARR', period: 'Q3-2026', label: 'Compute ÷ revenue, Q3-2026', unit: '%' },
  { fact: 'ST-Q3', period: 'Q3-2026', label: 'Short-term compute in Q3 expense', unit: 'USD B' },
  { fact: 'PRICE-Q3-2026', period: 'Q2-2026 to Q3-2026', label: 'Price/discount revenue offset, Q2→Q3 2026', unit: 'USD M' },
  { fact: 'AGG-OBLIGATIONS', period: 'as of and subsequent to 2026-09-30', label: 'Aggregate commitments', unit: 'USD B' },
  { fact: 'OBL-SUBSEQUENT', period: 'after 2026-09-30', label: 'Commitments signed after the quarter', unit: 'USD B' },
  { fact: 'OBL-CONDITIONAL', period: 'aggregate', label: 'Conditional or terminable', unit: 'USD B' },
  { fact: 'OBL-NO-FIXED', period: 'low', upper: 'high', label: 'Excluded variable-payment estimate', unit: 'USD B' },
  { fact: 'C-GOOGLE', period: 'minimum', label: 'Google CSP minimum', unit: 'USD B' },
  { fact: 'C-MICROSOFT', period: 'minimum', label: 'Microsoft minimum', unit: 'USD B' },
  { fact: 'C-LAMBDA-STATUS', period: 'as of filing', label: 'Lambda August agreement', unit: '' },
];
const VERSIONS = ['S-1', 'S-1/A-1', 'S-1/A-2', 'S-1/A-3', '424B4'];

function lineageCell(facts, spec, version) {
  const row = facts.find((entry) => entry.fact_id === spec.fact && entry.filing === version && (entry.period === spec.period || entry.status === 'not-found'));
  if (!row || row.status === 'not-found') return '<td><span aria-hidden="true">—</span><span class="visually-hidden">Not in this version</span></td>';
  const where = `<a class="line-ref" href="${escape(sourceLine(row.file, row.line_start))}" aria-label="${escape(`${spec.label}, ${version}, source line ${row.line_start}`)}">L${row.line_start}</a>`;
  if (row.status === 'blank-in-version') return `<td><span class="cell-state">blank</span> ${where}</td>`;
  if (row.status === 'not-stated') return `<td><span class="cell-state">not stated</span> ${where}</td>`;
  const flag = row.status === 'alignment-unverified' ? '<span class="cell-state" title="A1 joined text; table alignment unverified">†</span>' : '';
  const upper = spec.upper && facts.find((entry) => entry.fact_id === spec.fact && entry.filing === version && entry.period === spec.upper);
  const value = spec.unit ? escape(upper ? `${row.value}–${upper.value}` : row.value) : '<span class="cell-state">terminable</span>';
  return `<td class="num">${value}${flag} ${where}</td>`;
}

function claimCard(claim, citedIn) {
  const sources = claim.source_ids.split(';').filter(Boolean)
    .map((source) => docLink(`SOURCES.md#${source.toLowerCase()}`, source)).join(' · ');
  const inputs = claim.input_ids.split(';').filter(Boolean)
    .map((input) => siteLink(`#${input.toLowerCase()}`, input)).join(' · ');
  const search = [claim.claim_id, claim.claim_text, claim.entity, claim.metric, claim.period, claim.caveats].join(' ').toLowerCase();
  const field = (label, value) => (value ? `<div><dt>${label}</dt><dd>${value}</dd></div>` : '');
  return `<article class="claim-card" id="${claim.claim_id.toLowerCase()}" data-state="${escape(claim.verification_state)}" data-classification="${escape(claim.classification)}" data-search="${escape(search)}">
          <header><h3>${escape(claim.claim_id)}</h3><p class="claim-labels"><span class="status-label">${escape(claim.classification)}</span><span class="status-label">Verification: ${escape(claim.verification_state)}</span><span class="status-label">Confidence: ${escape(claim.confidence)}</span>${/SUPERSEDED/.test(claim.caveats) ? '<span class="status-label">Superseded</span>' : ''}</p></header>
          <p class="claim-text">${escape(claim.claim_text)}</p>
          <dl>
            ${[
    field('Entity · metric', `${escape(claim.entity)} · ${escape(claim.metric)}`),
    field('Period · units', `${escape(claim.period)} · ${escape(claim.units)}`),
    field('Sources', sources),
    field('Locator', escape(claim.locator)),
    field('Formula', claim.formula ? `<code>${escape(claim.formula)}</code>` : ''),
    field('Inputs', inputs),
    field('Caveats', escape(claim.caveats)),
    field('Review', claim.reviewer ? `${escape(claim.reviewer)} · ${escape(claim.review_date)}` : 'No human review recorded'),
  ].filter(Boolean).join('\n            ')}
          </dl>
          <p class="caption">Cited in: ${citedIn.length ? citedIn.map((section) => siteLink(`paper.html#${section}`, `Return to ${section.toUpperCase()}`)).join(' · ') : 'not yet cited in the manuscript'}</p>
        </article>`;
}

export function evidenceBody(reviewStrip) {
  const { manuscript, ledger, facts, checks } = loadResearch();
  const { sections } = splitManuscript(manuscript);
  const citedBy = new Map();
  for (const section of sections) {
    for (const claim of citedClaims(section.markdown)) citedBy.set(claim, [...(citedBy.get(claim) ?? []), section.id]);
  }
  const passed = checks.filter((check) => check.result === 'pass').length;
  const states = [...new Set(ledger.map((claim) => claim.verification_state))].sort();
  const classes = [...new Set(ledger.map((claim) => claim.classification))].sort();
  const filingFile = (key) => facts.find((row) => row.filing === key)?.file;
  return `<main id="main" class="wrap" tabindex="-1" data-research-content>
    <header class="page-intro"><p class="eyebrow">The evidence room / located, not yet verified</p><h1>Located is not<br><span class="accent">verified.</span></h1>
      <p class="lead">Each company figure below is found in a supplied filing text, has a line locator, and is checked for internal consistency. None is verified yet: the captures have not been authenticated against SEC origin, and no financial reviewer has signed off.</p>
      <p class="page-meta">${SITE.version} · Initial author ${SITE.author} · Filing captures through ${SITE.captureThrough}<br>${ledger.length} ledger claims · ${passed}/${checks.length} derived W1 checks pass · No source document is loaded into your browser.</p>
      <div class="actions">${siteLink('#claims', 'Inspect the claims ↓', 'button')}${siteLink('#filing-timeline', 'Follow the filing lineage ↓', 'button secondary')}</div>
    </header>
    ${reviewStrip}
    <section class="section" id="filing-timeline" aria-labelledby="timeline-title">
      <div class="section-heading"><div><p class="eyebrow">F01 / Filing chronology and revision lineage</p><h2 id="timeline-title">Follow the document lineage.</h2></div><p>The headers agree on issuer, CIK, accessions and dates. That is internal agreement, not authentication against SEC origin.</p></div>
      <ol class="timeline">
        ${FILINGS.map((filing) => `<li><time datetime="${filing.date}">${filing.date}</time>
          <div><p class="eyebrow">${escape(filing.form)}</p><h3>${escape(filing.label)}</h3><p>${escape(filing.note)}</p>${docLink(filing.file, 'Inspect the text capture on GitHub ↗')}<span class="source-path">${escape(filing.file.split('/')[1])}</span></div>
          <div><span class="status-label">${escape(filing.status)}</span></div></li>`).join('\n        ')}
      </ol>
      <h3 class="table-title" id="revision-lineage">What changed between versions</h3>
      <div class="table-wrap" role="region" tabindex="0" aria-labelledby="revision-lineage"><table class="lineage">
        <caption>Selected extracted values per version, with source line locators. “Blank” means the version left a placeholder; “—” means the passage is not in that version; † marks Amendment 1 table values whose alignment the join check does not establish. Values are unverified.</caption>
        <thead><tr><th scope="col">Fact</th>${VERSIONS.map((version) => `<th scope="col" class="num">${filingFile(version) ? docLink(filingFile(version), version.replace('S-1/A-', 'A')) : escape(version)}</th>`).join('')}</tr></thead>
        <tbody>${LINEAGE.map((spec) => `<tr><th scope="row">${escape(spec.label)}${spec.unit ? ` <span class="caption">(${escape(spec.unit)})</span>` : ''}</th>${VERSIONS.map((version) => lineageCell(facts, spec, version)).join('')}</tr>`).join('\n        ')}</tbody>
      </table></div>
      <p class="caption" style="margin-top:1rem">${siteLink('paper.html#p02', 'Return to P02 · evidence method →')} · ${docLink('research/W1-FILING-RECONSTRUCTION.md#w1-commitments', 'Read the W1 reconstruction ↗')} · <a href="../data/extracted/w1-filing-facts.csv">All extracted facts (CSV)</a> · <a href="../data/derived/w1-reconciliation-checks.csv">Derived checks (CSV)</a></p>
    </section>
    <section class="section" id="claims" aria-labelledby="claims-title">
      <div class="section-heading"><div><p class="eyebrow">Claim inspector</p><h2 id="claims-title">Every claim, with its limits.</h2></div><p>Classification, verification state and confidence are separate fields. A state is always written out, never shown by color alone.</p></div>
      <form id="claim-filters" class="filters" hidden aria-label="Filter claims">
        <label>Verification <select name="state"><option value="">All states</option>${states.map((state) => `<option value="${escape(state)}">${escape(state)}</option>`).join('')}</select></label>
        <label>Classification <select name="classification"><option value="">All classes</option>${classes.map((value) => `<option value="${escape(value)}">${escape(value)}</option>`).join('')}</select></label>
        <label>Search <input name="search" type="search" autocomplete="off" placeholder="e.g. Lambda, revenue, CL-020"></label>
        <button type="reset" class="button secondary">Reset filters</button>
      </form>
      <p id="claim-count" class="caption" role="status" aria-live="polite">${ledger.length} claims.</p>
      <p id="claims-empty" class="planned-note" hidden>No claims match these filters. Reset the filters to see all ${ledger.length} claims.</p>${ledger.length ? '' : `
      <p class="planned-note">The claim ledger has no records.</p>`}
      <div class="claim-list">
        ${ledger.map((claim) => claimCard(claim, citedBy.get(claim.claim_id) ?? [])).join('\n        ')}
      </div>
      <p class="caption">${docLink('CLAIM-LEDGER.csv', 'Download the claim ledger (CSV) ↗')} · ${docLink('SOURCES.md#access-and-evidence-policy', 'Source register and evidence policy ↗')}</p>
    </section>
    <section class="section two-column" id="review-records" aria-labelledby="records-title">
      <div><p class="eyebrow">Source → claim → interpretation</p><h2 id="records-title">Open the review trail.</h2>
        <ul class="review-links">
          <li>${docLink('research/W1-FILING-RECONSTRUCTION.md', 'W1 filing reconstruction ↗')}<p>Method, identity, definitions, commitments, provider edges, dispositions and open questions.</p></li>
          <li>${docLink('SOURCES.md#access-and-evidence-policy', 'Source register and evidence policy ↗')}<p>Access, authentication and evidence limitations are separate questions.</p></li>
          <li>${docLink('research/FILING-INTAKE-REVIEW.md', 'Filing intake review ↗')}<p>Received captures, completeness checks and extraction limits.</p></li>
          <li>${docLink('research/MANIFEST.csv', 'Capture manifest ↗')}<p>File inventory and integrity record. Matching a supplied hash does not establish claim truth.</p></li>
          <li>${docLink('research/INDEPENDENT-EVIDENCE.md#r06', 'Independent evidence and work boundaries ↗')}<p>Literature and method work kept separate from filing-dependent calibration.</p></li>
        </ul>
      </div>
      <div><div class="gate-note"><h3>Before a located claim becomes verified</h3><p>Authenticate the capture against SEC origin (or record the author's attestation), confirm the passage and definitions, and record a human financial review with reviewer and date.</p><p>Successive filings by one issuer are not independent corroboration. Located values must not be used to calibrate a model until that review is recorded.</p></div>
        <ul class="scope-list" style="margin-top:1.5rem"><li>Source documents<span>Linked on GitHub; not served, fetched or parsed in your browser.</span></li><li>Extracted data<span>Short excerpts with locators, regenerated by <code>tools/extract-filing-facts.mjs</code>.</span></li><li>Versioned snapshots<span>Planned; links currently identify the main branch.</span></li></ul>
      </div>
    </section>
    <script type="module" src="assets/js/evidence.mjs"></script>
  </main>`;
}
