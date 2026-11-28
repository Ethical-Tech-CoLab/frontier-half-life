import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { SITE, documentURL } from '../docs/assets/js/config.mjs';
import { SECTIONS, FILINGS } from '../docs/assets/js/research.mjs';
import { THEMES, tokensFor } from '../docs/assets/js/themes.mjs';
import { MODEL_VERSION, TOLERANCE, SWEEP_VALUES, SYNTHETIC_FIXTURES, compute, sweepElasticity } from '../docs/assets/js/model/task-energy.mjs';
import { SCENARIOS, FIELDS, WORKLOAD } from '../docs/assets/js/model/scenarios.mjs';
import { EVIDENCE_CUTOFF } from '../docs/assets/js/model/manifest.mjs';
import { F04_DEFAULTS, F04_KEYS, BASELINE_KEYS, CHART, X_TICKS, Y_TICKS, COMPARISON_ROWS, fmt, fieldId, fieldSpecKey, scenarioFieldKeys,
  chartX, chartY, chartGeometry, chartDescription, changeText, thresholdLabel, positionText, scenarioSummary } from '../docs/assets/js/rebound-view.mjs';

const escape = (value) => String(value).replace(/[&<>"']/g, (character) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const docLink = (path, label, className = '') =>
  `<a href="${escape(documentURL(path))}"${className ? ` class="${className}"` : ''}>${escape(label)}</a>`;
const siteLink = (path, label, className = '') =>
  `<a href="${escape(path)}" data-site-link${className ? ` class="${className}"` : ''}>${escape(label)}</a>`;

function header(page) {
  return `<a class="skip-link" href="#main" data-site-link>Skip to content</a>
  <header class="masthead" id="masthead">
    <div class="wrap header-row">
      <a class="identity" href="index.html" data-site-link aria-label="Frontier half-life — Ethical Tech CoLab research overview">
        <span class="identity-mark" aria-hidden="true">C↗</span>
        <span class="identity-text"><strong>Frontier half-life</strong><small>Ethical Tech CoLab · research demo</small></span>
      </a>
      <nav class="site-nav" id="primary-nav" aria-label="Main navigation">
        ${[['index.html', 'Overview'], ['paper.html', 'Paper guide'], ['evidence.html', 'Evidence'], ['rebound.html', 'Rebound lab']].map(([file, label]) =>
          `<a href="${file}" data-site-link${page === file ? ' aria-current="page"' : ''}>${label}</a>`).join('\n        ')}
        ${docLink('PLAN.md', 'Research docs ↗', 'nav-cta')}
      </nav>
      <details id="theme-control" class="theme-picker" hidden>
        <summary id="theme-trigger" aria-label="Choose presentation theme" aria-describedby="theme-disclaimer">
          <span class="theme-swatch" aria-hidden="true"><i></i><i></i></span>
          <span id="theme-short">CoLab</span>
          <svg class="chevron" viewBox="0 0 12 12" aria-hidden="true"><path d="m2.5 4.5 3.5 3.5 3.5-3.5"/></svg>
        </summary>
        <div class="theme-panel" role="group" aria-label="Presentation themes">
          ${Object.values(THEMES).map((theme) => `<button type="button" class="theme-option" data-theme-option="${theme.id}" aria-pressed="${theme.id === 'colab'}"><span>${escape(theme.name)}</span><small>${escape(theme.ground)} · ${escape(theme.confidence)}</small></button>`).join('\n          ')}
          <p>Presentation only. No logos or affiliation; research content stays unchanged.</p>
          ${siteLink('#theme-provenance', 'Theme sources and font licenses')}
        </div>
      </details>
      <button id="nav-toggle" class="nav-toggle" type="button" aria-label="Open navigation" aria-controls="primary-nav" aria-expanded="false" hidden>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </div>
  </header>
  <div class="wrap notice-row">
    <span class="version">${SITE.version} / DEMO</span>
    <p id="theme-message" class="theme-message" role="status" aria-live="polite" aria-atomic="true">CoLab presentation. Demo; no calibrated results.</p>
  </div>
  <noscript><p class="wrap noscript">JavaScript is off. All research-guide content and source links remain readable in the default CoLab theme. Theme switching requires JavaScript.</p></noscript>`;
}

function footer() {
  const theme = THEMES.colab;
  return `<footer class="site-footer">
    <div class="wrap">
      <div class="footer-top">
        <div><strong>Models, Megawatts, and Moats</strong>
          <p>${SITE.version} · Initial author ${SITE.author} · Demo · no calibrated results</p>
          <p>Text capture portfolio through ${SITE.captureThrough}; not a validated dataset cutoff.</p>
        </div>
        <nav class="footer-links" aria-label="Review documents">
          ${docLink('paper/PAPER-DRAFT.md', 'Manuscript draft')}
          ${docLink('CLAIM-LEDGER.csv', 'Claim ledger')}
          ${docLink('PLAN.md#4-paper-coordination-and-pages-link-contract', 'Reader / figure plan')}
        </nav>
      </div>
      <details class="theme-provenance" id="theme-provenance">
        <summary>Theme provenance &amp; accessibility · <span id="theme-name">CoLab · presentation only</span></summary>
        <p id="theme-disclaimer" class="disclaimer">All themes are approximate, non-affiliated presentation presets. No company logos or official endorsement. Choosing a theme does not identify a research subject, provider relationship, or verified result.</p>
        <p id="theme-description">${escape(theme.description)}</p>
        <p id="theme-confidence">Source confidence: high. All styling is approximate.</p>
        <p id="theme-deviation">${escape(theme.deviation)}</p>
        <p id="theme-license">${escape(theme.licensing)}</p>
        <div id="theme-sources" class="provenance-links">
          <a href="${theme.registry}">Identity / registry reference</a><a href="${theme.sources[0]}">Source 1</a>
        </div>
        <p>Reading text is contrast-adjusted to at least 4.5:1 and controls / focus to at least 3:1 on the used surfaces. CoLab fonts are self-hosted; other presets retain documented system substitutes. No external font requests, analytics, or browser ingestion of source documents.</p>
        <div class="provenance-links">${docLink('docs/assets/fonts/LICENSES.md', 'CoLab font provenance')}<a href="assets/fonts/Bebas-Neue-OFL.txt">Bebas Neue OFL</a><a href="assets/fonts/Space-Mono-OFL.txt">Space Mono OFL</a></div>
        <div class="provenance-links">${docLink('docs/SHELL-NOTES.md', 'Shell scope and design notes')}<a href="assets/licenses/MIT.txt">Shell MIT license</a><a href="assets/licenses/NOTICE.txt">Reference attribution</a><a href="assets/licenses/neocloud-supply-os-APACHE-2.0.txt">Apache-2.0 reference license</a></div>
      </details>
    </div>
  </footer>`;
}

function reviewStrip() {
  return `<div class="review-strip" aria-label="Research and release status">
    <div class="review-item"><small>Intake</small><strong>Text captures received</strong></div>
    <div class="review-item"><small>Evidence review</small><strong>Claim reconciliation pending</strong></div>
    <div class="review-item"><small>This site</small><strong>Demo · no calibrated results</strong></div>
  </div>`;
}

function overview() {
  return `<main id="main" class="wrap" tabindex="-1" data-research-content>
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow">A research question, not a forecast</p>
        <h1 id="hero-title"><span>Models,</span> <span>Megawatts,</span> <span class="accent">and Moats.</span></h1>
        <p class="question">When useful AI gets cheaper, do we use fewer resources—or just more AI?</p>
        <p class="intro">An evidence-first inquiry into open-model catch-up, task efficiency, demand rebound, and the infrastructure that makes it possible.</p>
        <div class="actions">${siteLink('paper.html#contents', 'Read the paper guide ↗', 'button')}${siteLink('evidence.html#filing-timeline', 'Follow the evidence →', 'button secondary')}</div>
        <p class="caption" style="margin-top:1rem">${SITE.version} · Initial author ${SITE.author} · Research draft for review</p>
      </div>
      <aside class="concept-board" aria-label="Conceptual research chain, not a measured chart">
        <div class="board-heading"><span>The research chain</span><span>No measured series</span></div>
        <div class="concept-node"><p class="node-label">01 / Models</p><h3>Capability becomes useful work.</h3><p>Quality, catch-up, task success, and serving boundaries.</p></div>
        <div class="connector" aria-hidden="true"></div>
        <div class="concept-node"><p class="node-label">02 / Demand</p><h3>Useful work meets a price.</h3><p>Product design, substitution, and induced demand.</p></div>
        <div class="connector" aria-hidden="true"></div>
        <div class="concept-node"><p class="node-label">03 / Infrastructure</p><h3>Demand has a physical footprint.</h3><p>Capacity, electricity, place, and who bears the burden.</p></div>
        <p class="board-note">Each connection needs evidence.<br>None is calibrated in this demo.</p>
      </aside>
    </section>
    ${reviewStrip()}
    <section class="section" id="roadmap" aria-labelledby="roadmap-title">
      <div class="section-heading"><div><p class="eyebrow">One argument. Three connected surfaces.</p><h2 id="roadmap-title">A path from evidence to understanding.</h2></div><p>The paper and dashboard are equal deliverables. This shell makes the path inspectable before results are ready.</p></div>
      <div class="cards">
        <article class="card"><span class="step">01 / Evidence room</span><span class="status-label">Received text · review pending</span><h3>Know what supports a claim.</h3><p>Follow the filing sequence and find source, claim, and intake records. Receipt is separate from verification.</p>${siteLink('evidence.html', 'Open the evidence room →')}</article>
        <article class="card"><span class="step">02 / Paper reader</span><span class="status-label">Section guide available</span><h3>Read the shape of the argument.</h3><p>P00–P12 anchors lead to the manuscript and research plan. This is a navigation guide, not a published analytical paper.</p>${siteLink('paper.html#contents', 'Explore the paper guide →')}</article>
        <article class="card"><span class="step">03 / Dashboard workspace</span><span class="status-label">Indexed rebound lab only · other views planned</span><h3>Challenge the assumptions.</h3><p>Only the illustrative indexed rebound lab is available: an elasticity-threshold explorer and three uncalibrated futures with replayable manifests. Efficiency, equivalency, provider, impact, and uncertainty views remain planned.</p>${siteLink('rebound.html', 'Open the rebound lab →')}</article>
      </div>
    </section>
    <section class="section two-column" id="boundaries" aria-labelledby="boundaries-title">
      <div><p class="eyebrow">Deliberate boundaries</p><h2 id="boundaries-title">Useful questions.<br>Honest unknowns.</h2>
        <ul class="scope-list"><li>Useful-task efficiency, not just token prices.<span>Quality and failed attempts belong in the denominator.</span></li><li>Evidence-conditional company research.<span>Anthropic is an anchor, not a proxy for the whole sector.</span></li><li>Operational impacts, with place and boundaries.<span>No company-energy totals inferred from revenue.</span></li><li>Contestable scenarios, not investment forecasts.<span>Future results must retain assumptions and provenance.</span></li></ul>
      </div>
      <div><div class="gate-note"><h3>What this demo does—and does not—authorize</h3><p>The author requested a narrow, non-analytical shell and separately approved the specification and plan on November 28, 2026. The rebound lab adds only illustrative, uncalibrated indexed scenarios from that plan; it awaits review. Claim reconciliation, calibrated models, and analytical publication still require their evidence and review gates.</p><p>No verified financial amounts, provider rankings, calibrated or stochastic results, or reported impact estimates are shown.</p></div>
        <ul class="review-links"><li>${docLink('SPECIFICATION.md#9-non-functional-requirements', 'Read the design and accessibility contract ↗')}<p>Accessible presentation is independent of research state.</p></li><li>${docLink('PLAN.md#6-milestones-and-dependencies', 'Review staged evidence and model gates ↗')}<p>A working shell is not a completed research milestone.</p></li></ul>
      </div>
    </section>
  </main>`;
}

function paper() {
  return `<main id="main" class="wrap" tabindex="-1" data-research-content>
    <header class="page-intro"><p class="eyebrow">The linked research reader / section guide</p><h1>A question you can<br><span class="accent">follow and challenge.</span></h1>
      <p class="lead">Thirteen stable sections connect the manuscript, its evidence, and the planned analysis. These short orientation notes do not reproduce or publish the unreconciled draft’s analytical claims.</p>
      <p class="page-meta">${SITE.version} · Initial author ${SITE.author} · Text portfolio through ${SITE.captureThrough}<br>Draft for review · No calibrated dataset or results; the rebound lab is illustrative and indexed</p>
      <div class="actions">${docLink('paper/PAPER-DRAFT.md', 'Open the review manuscript on GitHub ↗', 'button secondary')}${siteLink('evidence.html#review-records', 'Inspect review records →')}</div>
    </header>
    ${reviewStrip()}
    <div class="reader-layout">
      <nav id="contents" class="contents" aria-label="Paper section contents"><h2>In this paper / P00–P12</h2><ol>
        ${SECTIONS.map((section) => `<li><a href="#${section.id}" data-site-link><span class="section-id">${section.id.toUpperCase()}</span><span>${escape(section.title)}</span></a></li>`).join('\n        ')}
      </ol></nav>
      <div class="paper-sections">${SECTIONS.map((section) => `
        <section class="paper-section" id="${section.id}" aria-labelledby="${section.id}-title">
          <p class="eyebrow">${section.id.toUpperCase()} / ${escape(section.lane)}</p>
          <h2 id="${section.id}-title">${escape(section.title)}</h2>
          <p>${escape(section.summary)}</p>
          <div class="section-links">${docLink(`paper/PAPER-DRAFT.md#${section.id}`, `Read ${section.id.toUpperCase()} in the review draft ↗`)}${docLink(section.source, 'Source register ↗')}${docLink(section.research, 'Research / method notes ↗')}${docLink('PLAN.md#4-paper-coordination-and-pages-link-contract', 'Section / figure plan ↗')}</div>
          <p class="planned-note">${escape(section.next)}</p>${section.shell ? `
          <p class="caption">${escape(section.figure)} · ${escape(section.shellStatus)}<br>${siteLink(section.shell, `${section.shellLabel} →`)}</p>` : ''}
          ${siteLink('#contents', 'Back to section contents ↑', 'back-to-contents')}
        </section>`).join('\n')}
        <div class="gate-note"><h3>The full reader is still a planned deliverable.</h3><p>Reviewed manuscript rendering, versioned datasets, immutable review snapshots, and most figures are not available. Only F04 and F07 open live, illustrative indexed views with run manifests and return links; they are uncalibrated and unreviewed. Source links point to the current review branch, not an immutable analytical release.</p></div>
      </div>
    </div>
  </main>`;
}

function evidence() {
  return `<main id="main" class="wrap" tabindex="-1" data-research-content>
    <header class="page-intro"><p class="eyebrow">The evidence room / intake first</p><h1>Received is not<br><span class="accent">reconciled.</span></h1>
      <p class="lead">A useful record begins with what arrived, what changed, and what still needs checking. This chronology identifies six named text captures; it does not authenticate the issuer, filing metadata, or financial claims.</p>
      <p class="page-meta">${SITE.version} · Initial author ${SITE.author} · Named capture dates through ${SITE.captureThrough}<br>No source documents or excerpts are loaded into your browser.</p>
      <div class="actions">${siteLink('#filing-timeline', 'Explore filing chronology ↓', 'button')}${siteLink('#review-records', 'Find the review records ↓', 'button secondary')}</div>
    </header>
    ${reviewStrip()}
    <section class="section" id="filing-timeline" aria-labelledby="timeline-title">
      <div class="section-heading"><div><p class="eyebrow">F01 / Received-text chronology shell</p><h2 id="timeline-title">Follow the document lineage.</h2></div><p>Dates and form labels reflect the supplied capture names, not a verified external filing history. Originals and PDFs are not embedded here.</p></div>
      <ol class="timeline">
        ${FILINGS.map((filing) => `<li><time datetime="${filing.date}">${filing.date}</time>
          <div><p class="eyebrow">${escape(filing.form)}</p><h3>${escape(filing.label)}</h3><p>${escape(filing.note)}</p>${docLink(filing.file, 'Inspect the text capture on GitHub ↗')}<span class="source-path">${escape(filing.file.split('/')[1])}</span></div>
          <div><span class="status-label">Text received</span><p class="caption">Claim reconciliation pending</p></div></li>`).join('\n        ')}
      </ol>
      <p class="caption" style="margin-top:1.5rem">${siteLink('paper.html#p02', 'Return to P02 · evidence method →')} · ${docLink('PLAN.md#61-filing-intake-and-remediation', 'Inspect intake / reconciliation method ↗')}</p>
    </section>
    <section class="section two-column" id="review-records" aria-labelledby="records-title">
      <div><p class="eyebrow">Source → claim → interpretation</p><h2 id="records-title">Open the review trail.</h2>
        <ul class="review-links">
          <li>${docLink('SOURCES.md#access-and-evidence-policy', 'Source register and evidence policy ↗')}<p>Access, authentication, and evidence limitations are separate questions.</p></li>
          <li>${docLink('CLAIM-LEDGER.csv', 'Claim ledger · repository record ↗')}<p>Inspect claim IDs and unresolved states in the review file; no ledger values are imported here.</p></li>
          <li>${docLink('research/FILING-INTAKE-REVIEW.md', 'Filing intake review ↗')}<p>Received captures, completeness checks, reconciliation work, and remaining review questions.</p></li>
          <li>${docLink('research/MANIFEST.csv', 'Capture manifest ↗')}<p>File inventory and integrity record. Matching a supplied hash does not establish claim truth.</p></li>
          <li>${docLink('research/INDEPENDENT-EVIDENCE.md#r06', 'Independent evidence and work boundaries ↗')}<p>Separate literature and method work from filing-dependent calibration.</p></li>
        </ul>
      </div>
      <div><div class="gate-note"><h3>Before a company claim becomes a result</h3><p>Authenticate document identity and provenance, locate the relevant passage, reconcile amendments and periods, inspect contract overlap, and record a human review.</p><p>Text capture receipt does not complete those steps. No financial values, relationships, or physical conversions are endorsed by this timeline.</p></div>
        <ul class="scope-list" style="margin-top:1.5rem"><li>Originals and excerpts<span>Not served, fetched, or parsed by this site.</span></li><li>Analytical dataset<span>Unavailable until reconciliation and validation.</span></li><li>Evidence filters and claim inspector<span>Planned, not represented as working controls.</span></li><li>Historical snapshots and manifests<span>Planned; these links identify the current review branch.</span></li></ul>
      </div>
    </section>
  </main>`;
}

const LAB_STATUS = 'Illustrative indexed scenario — not calibrated, not a forecast';
const n1 = (value) => Number(value.toFixed(1));
const metric = (id, label, value) => `<div><dt>${escape(label)}</dt><dd id="${id}">${escape(value)}</dd></div>`;
const table = (caption, head, rows, className = 'data-table numeric') => `<div class="table-wrap"><table class="${className}"><caption>${escape(caption)}</caption>
          <thead><tr>${head.map((cell) => `<th scope="col">${escape(cell)}</th>`).join('')}</tr></thead>
          <tbody>
            ${rows.join('\n            ')}
          </tbody></table></div>`;

function labField(scope, key, value) {
  const spec = FIELDS[fieldSpecKey(key)];
  const id = fieldId(scope, key);
  return `<div class="field"><label for="${id}">${escape(spec.label)}</label><input id="${id}" type="text" inputmode="decimal" autocomplete="off" spellcheck="false" value="${escape(value)}" data-field="${escape(key)}" aria-describedby="${id}-hint ${id}-error"><p class="field-hint" id="${id}-hint">${escape(spec.hint)}</p><p class="field-error" id="${id}-error" hidden></p></div>`;
}

function thresholdChart(q, k, e, energyRatio) {
  const geometry = chartGeometry(q, k, e);
  const right = CHART.width - CHART.right;
  const bottom = CHART.height - CHART.bottom;
  return `<svg id="f04-chart" class="threshold-chart" viewBox="0 0 ${CHART.width} ${CHART.height}" role="img" aria-labelledby="f04-chart-title f04-chart-desc">
              <title id="f04-chart-title">F04 · Energy ratio E1/E0 versus elasticity magnitude e</title>
              <desc id="f04-chart-desc">${escape(chartDescription(q, k, e, energyRatio))}</desc>
              <g class="chart-grid">${Y_TICKS.map((tick) => `<line x1="${CHART.left}" x2="${right}" y1="${n1(chartY(tick))}" y2="${n1(chartY(tick))}"/>`).join('')}</g>
              <g class="chart-text" aria-hidden="true">${Y_TICKS.map((tick) => `<text x="${CHART.left - 10}" y="${n1(chartY(tick)) + 5}" text-anchor="end">${tick}</text>`).join('')}${X_TICKS.map((tick) => `<text x="${n1(chartX(tick))}" y="${bottom + 24}" text-anchor="middle">${tick}</text>`).join('')}<text x="${n1((CHART.left + right) / 2)}" y="${CHART.height - 8}" text-anchor="middle">Elasticity magnitude e</text><text class="chart-ytitle" transform="translate(20 ${n1((CHART.top + bottom) / 2)}) rotate(-90)" text-anchor="middle">Energy ratio E1/E0</text></g>
              <path class="chart-axis" d="M${CHART.left} ${CHART.top}V${bottom}H${right}"/>
              <line class="chart-one" x1="${CHART.left}" x2="${right}" y1="${n1(chartY(1))}" y2="${n1(chartY(1))}"/>
              <text class="chart-label" x="${right - 6}" y="${n1(chartY(1)) + 22}" text-anchor="end" aria-hidden="true">1 = no change</text>
              <path id="f04-curve" class="chart-curve" d="${geometry.path}"/>
              <g id="f04-threshold-mark"${geometry.threshold.visible ? '' : ' hidden'}><line id="f04-threshold-line" class="chart-threshold" x1="${n1(geometry.threshold.x)}" x2="${n1(geometry.threshold.x)}" y1="${CHART.top}" y2="${bottom}"/><text id="f04-threshold-text" class="chart-label" x="${n1(geometry.threshold.labelX)}" y="${CHART.top + 18}" text-anchor="${geometry.threshold.labelAnchor}" aria-hidden="true">${escape(geometry.threshold.label)}</text></g>
              <circle id="f04-point" class="chart-point" cx="${n1(geometry.selected.x)}" cy="${n1(geometry.selected.y)}" r="7"${geometry.selected.visible ? '' : ' hidden'}/>
            </svg>`;
}

function f04Section() {
  const defaults = F04_DEFAULTS;
  const inputs = { e: defaults.e, q: defaults.q, s0: defaults.s0, s1: defaults.s1, iRatio: defaults.iRatio, pueRatio: defaults.pueRatio };
  const result = compute(inputs);
  const geometry = chartGeometry(defaults.q, result.k, defaults.e);
  const rows = sweepElasticity(inputs).rows.map((row) => {
    const demand = compute({ ...inputs, e: row.e }).demandRatio;
    return `<tr><th scope="row">${fmt.elasticity(row.e)}</th><td class="num">${fmt.ratio(demand)}</td><td class="num">${fmt.ratio(row.energyRatio)}</td><td class="num">${changeText(row.energyRatio)}</td><td class="num">${fmt.ratio(0.5 ** (1 - row.e))}</td></tr>`;
  });
  return `<section class="section" id="elasticity-threshold" aria-labelledby="f04-title">
      <div class="section-heading"><div><p class="eyebrow">F04 / Elasticity threshold · P05</p><h2 id="f04-title">Where cheaper becomes more.</h2></div><p>Below the threshold e*, induced demand is too weak to offset lower energy per successful task, so facility energy falls. Above it, demand outruns efficiency and energy rises. The threshold moves whenever success, intensity, or PUE changes.</p></div>
      <p class="status-label">${LAB_STATUS}</p>
      <div class="lab-grid">
        <form id="f04-form" class="lab-form" data-rebound-interactive hidden novalidate aria-labelledby="f04-form-title">
          <h3 id="f04-form-title">Declared conditions</h3>
          <p class="caption">Defaults reproduce the P05 proportional case: price and IT energy per attempt both halve (g = 0.5) with success and PUE unchanged, so e* = 1.</p>
          ${F04_KEYS.map((key) => labField('f04', key, String(defaults[key]))).join('\n          ')}
          <button type="button" id="f04-reset" class="button secondary">Reset to the P05 case</button>
        </form>
        <div class="lab-output">
          <div class="result-panel" id="f04-result">
            <p class="result-state" id="f04-state">Build-time default · ${MODEL_VERSION}</p>
            <dl class="metric-list">
              ${metric('f04-k', 'Effective intensity ratio k', fmt.ratio(result.k))}
              ${metric('f04-threshold', 'Threshold', thresholdLabel(result.threshold))}
              ${metric('f04-demand', 'Demand S1/S0 at e', fmt.ratio(result.demandRatio))}
              ${metric('f04-energy', 'Energy E1/E0 at e', `${fmt.ratio(result.energyRatio)} · ${changeText(result.energyRatio)}`)}
            </dl>
            <p class="result-summary" id="f04-summary" role="status" aria-live="polite">${escape(positionText(result.threshold, defaults.e))}</p>
          </div>
          <figure class="lab-figure">
            ${thresholdChart(defaults.q, result.k, defaults.e, result.energyRatio)}
            <figcaption class="caption"><strong>F04 · Elasticity threshold.</strong> E1/E0 = q^(−e) × k for elasticity magnitudes 0–3, with the no-change line (dashed), the break-even e* = ln(k)/ln(q) (dotted), and the selected e (dot). <span id="f04-clip-note">${geometry.clipped ? `Values above ${CHART.yMax} are clipped at the top edge.` : ''}</span> ${LAB_STATUS}. Model ${MODEL_VERSION} · paper ${SITE.version}.</figcaption>
          </figure>
        </div>
      </div>
      <div class="static-reference">
        <h3>Static reference · the P05 proportional case</h3>
        <p class="caption">Computed at build time with ${MODEL_VERSION} for q = 0.5 and k = 0.5: price and IT energy per attempt both halve while success and PUE stay fixed. It does not change with your edits and stays readable without JavaScript. Here E1/E0 = g^(1−e) with g = 0.5, so energy falls for e &lt; 1, is unchanged at e = 1, and rises for e &gt; 1. This is a conditional identity (CL-013), not an elasticity estimate.</p>
        ${table('F04 static fallback · energy ratio by elasticity magnitude, g = 0.5', ['e', 'Demand S1/S0', 'Energy E1/E0', 'Energy change', 'Check 0.5^(1−e)'], rows)}
      </div>
      <p class="return-links">${siteLink('paper.html#p05', 'Return to P05 · demand response →')} · ${docLink('paper/PAPER-DRAFT.md#p05', 'P05 in the review draft ↗')}</p>
    </section>`;
}

function scenarioCard(scenario, result) {
  const id = scenario.id;
  const topKeys = scenarioFieldKeys(scenario).filter((key) => !key.startsWith('routes.'));
  const routeFields = (scenario.inputs.routes || []).map((route, index) => `
            <fieldset class="route-fieldset"><legend>${escape(scenario.routeLabels[route.id])}</legend>${['share', 's', 'iRatio', 'pueRatio']
    .map((key) => labField(id, `routes.${index}.${key}`, String(route[key]))).join('')}</fieldset>`).join('');
  const routeTable = scenario.inputs.routes ? `
            ${table('Route breakdown · index; baseline 100 on one frontier route', ['Route', 'Tasks', 'Energy'], result.routes.map((route, index) =>
    `<tr><th scope="row">${escape(scenario.routeLabels[route.id])}</th><td class="num" id="${id}-route-${index}-S">${fmt.index(route.successIndex)}</td><td class="num" id="${id}-route-${index}-E">${fmt.index(route.energyIndex)}</td></tr>`), 'data-table numeric compact')}` : '';
  return `<article class="scenario-card" id="card-${id}" aria-labelledby="${id}-title">
          <p class="eyebrow">Future ${scenario.number} / ${escape(scenario.classification)}</p>
          <h3 id="${id}-title">${escape(scenario.title)}</h3>
          <p class="status-label">Scenario · ${escape(scenario.evidence_status)}</p>
          <p class="selected-note" id="${id}-selected" hidden>Opened from the link in the address bar</p>
          <p class="card-summary">${escape(scenario.summary)}</p>
          <div class="result-panel" id="${id}-result">
            <p class="result-state" id="${id}-state">Build-time preset · ${MODEL_VERSION}</p>
            <dl class="metric-list">
              ${['S1', 'A1', 'E1', 'k', 'threshold', 'absolute'].map((key) => {
    const [, label, value] = COMPARISON_ROWS.find(([row]) => row === key);
    return metric(`${id}-${key}`, label, value(result, scenario.inputs, {}));
  }).join('\n              ')}
            </dl>${routeTable}
            <p class="result-summary" id="${id}-summary" role="status" aria-live="polite">${escape(scenarioSummary(scenario.title, result, scenario.inputs.e))}</p>
            <p class="state-link-row"><a id="${id}-link" class="state-link" href="rebound.html?scenario=${id}#scenario-comparison" data-site-link>Link to this state</a></p>
          </div>
          <form class="scenario-form" data-scenario-form="${id}" novalidate aria-label="${escape(scenario.title)} · declared inputs">
            <fieldset><legend>Declared inputs</legend>${topKeys.map((key) => labField(id, key, String(scenario.inputs[key]))).join('')}</fieldset>${routeFields}
          </form>
        </article>`;
}

function f07Section() {
  const evaluated = SCENARIOS.map((scenario) => ({ scenario, result: compute(scenario.inputs), sweep: sweepElasticity(scenario.inputs) }));
  const head = ['Measure', ...SCENARIOS.map((scenario) => scenario.title)];
  const comparison = (live) => COMPARISON_ROWS.map(([key, label, value]) => `<tr><th scope="row">${escape(label)}</th>${evaluated.map(({ scenario, result }) =>
    `<td${live ? ` id="cmp-${scenario.id}-${key}"` : ''}>${escape(value(result, scenario.inputs, {}))}</td>`).join('')}</tr>`);
  const sensitivity = [...SWEEP_VALUES.map((e, index) => `<tr><th scope="row">e = ${fmt.elasticity(e)}</th>${evaluated.map(({ scenario, sweep }) =>
    `<td class="num" id="sens-${scenario.id}-${index}">${fmt.index(sweep.rows[index].energyIndex)}</td>`).join('')}</tr>`),
  `<tr><th scope="row">Threshold e*</th>${evaluated.map(({ scenario, result }) => `<td class="num" id="sens-${scenario.id}-threshold">${escape(thresholdLabel(result.threshold))}</td>`).join('')}</tr>`];
  const assumptions = SCENARIOS.flatMap((scenario) => scenarioFieldKeys(scenario).map((key) => {
    const route = key.match(/^routes\.(\d+)\.(.+)$/);
    const routeData = route ? scenario.inputs.routes[Number(route[1])] : null;
    const label = route ? `${scenario.routeLabels[routeData.id]} · ${FIELDS[route[2]].label}` : FIELDS[key].label;
    const value = route ? routeData[route[2]] : scenario.inputs[key];
    const rationale = scenario.rationale[route ? `routes.${routeData.id}.${route[2]}` : key];
    return `<tr><th scope="row">${escape(scenario.title)}</th><td>${escape(label)}</td><td class="num">${value}</td><td>${escape(scenario.classification)}</td><td>${escape(scenario.evidence_status)}</td><td>${escape(rationale)}</td></tr>`;
  }));
  const fixtures = SYNTHETIC_FIXTURES.map((fixture) => {
    const { inputs } = fixture;
    const result = compute(inputs);
    return `<tr><th scope="row">${escape(fixture.label)}</th><td class="num">${inputs.absolute.S0}</td><td class="num">${inputs.s0}</td><td class="num">${inputs.q}</td><td class="num">${inputs.absolute.I0} → ${fmt.count(inputs.absolute.I0 * inputs.iRatio)}</td><td class="num">${inputs.absolute.p0}</td><td class="num">${inputs.e}</td><td class="num">${fmt.kwh(result.absolute.E1)}</td><td class="num">${fixture.expectedKWh}</td></tr>`;
  });
  return `<section class="section" id="scenario-comparison" aria-labelledby="f07-title">
      <div class="section-heading"><div><p class="eyebrow">F07 / Scenario comparison · P08</p><h2 id="f07-title">Three futures, one identity.</h2></div><p>Each future declares price, elasticity, success, intensity, and—for substitution—routing assumptions for the same abstract workload. Edit any input: results, comparison, and sensitivity update together. Invalid inputs withhold results rather than guess.</p></div>
      <p class="status-label">${LAB_STATUS}</p>
      <p class="caption figure-caption"><strong>F07 · Scenario comparison.</strong> Indexed successful tasks, attempts, and facility energy (baseline = 100) for three declared futures, with each future’s threshold e* and an elasticity sensitivity sweep. Workload: ${WORKLOAD}. Evidence cutoff: ${EVIDENCE_CUTOFF}. ${LAB_STATUS}. Model ${MODEL_VERSION} · paper ${SITE.version}.</p>
      <noscript><p class="planned-note">JavaScript is off: inputs, live results, and manifest export/import are unavailable. The static reference tables below were computed at build time with ${MODEL_VERSION} and remain readable.</p></noscript>
      <div class="lab-live" data-rebound-interactive hidden>
        <p id="lab-url-notice" class="planned-note" hidden></p>
        <fieldset class="baseline-fieldset">
          <legend>Optional absolute baseline · shared by all three futures</legend>
          <p class="caption">Leave blank to stay indexed. Absolute kWh are computed only when you enter all of S0, I0, and p0—your own assumptions, never company data. A blank stays unknown, not zero.</p>
          <div class="field-row">${BASELINE_KEYS.map((key) => labField('baseline', key, '')).join('')}</div>
        </fieldset>
        <div class="scenario-grid">
        ${evaluated.map(({ scenario, result }) => scenarioCard(scenario, result)).join('\n        ')}
        </div>
        <h3 class="table-title">Live comparison</h3>
        ${table('F07 live comparison · indexed results, baseline = 100; withheld when inputs are invalid', head, comparison(true), 'data-table')}
        <h3 class="table-title">Sensitivity to elasticity</h3>
        ${table('Facility energy index when only e changes; every other input stays at each future’s current value', ['Elasticity', ...SCENARIOS.map((scenario) => scenario.title)], sensitivity)}
        <div class="manifest-tools" aria-labelledby="manifest-title">
          <h3 id="manifest-title">Run manifest · export and replay</h3>
          <p class="caption">A manifest records schema, model and paper versions, the evidence cutoff (${EVIDENCE_CUTOFF}), all inputs, results, and tolerance (relative ${TOLERANCE.relative}). Import replays it and requires the recorded results to reproduce; a rejected file leaves the current run unchanged. Files are read locally and never uploaded.</p>
          <div class="manifest-actions"><button type="button" class="button" id="manifest-export">Export run manifest (JSON)</button><button type="button" class="button secondary" id="lab-reset">Reset all to presets</button></div>
          <div class="field file-field"><label for="manifest-import">Import run manifest (JSON, at most 1 MiB)</label><input id="manifest-import" type="file" accept="application/json,.json" aria-describedby="manifest-import-hint"><p class="field-hint" id="manifest-import-hint">Imported text is treated as data: strict fields, finite numbers, known scenario and route references.</p></div>
          <p id="manifest-status" class="result-summary" role="status" aria-live="polite">No manifest imported. Showing the presets.</p>
          <div id="manifest-errors" class="error-list" role="alert"></div>
        </div>
      </div>
      <div class="static-reference">
        <h3>Static reference · build-time presets</h3>
        <p class="caption">Computed when this page was generated, with the same ${MODEL_VERSION} engine. These values do not change with your edits and remain readable without JavaScript.</p>
        ${table('F07 static fallback · preset results, indexed (baseline = 100)', head, comparison(false), 'data-table')}
        <h3>Declared preset assumptions</h3>
        ${table('Every preset value is a scenario assumption for an illustrative indexed workload; none is calibrated to company or provider data', ['Future', 'Input', 'Value', 'Classification', 'Evidence status', 'Rationale'], assumptions, 'data-table')}
        <h3>Synthetic accounting fixtures (SPECIFICATION §8)</h3>
        ${table('Fixture checks recomputed by the engine at build time (CL-014); arithmetic checks, not research observations', ['Case', 'S0', 's', 'q', 'I0 → I1 kWh', 'PUE', 'e', 'Engine E1 kWh', 'Expected kWh'], fixtures)}
      </div>
      <p class="return-links">${siteLink('paper.html#p08', 'Return to P08 · deterministic futures →')} · ${docLink('paper/PAPER-DRAFT.md#p08', 'P08 in the review draft ↗')}</p>
    </section>`;
}

function rebound() {
  const formulas = [
    ['S1/S0 = q^(−e)', 'Successful demand responds to the price ratio q = P1/P0.'],
    ['A = S / s', 'Attempts; each retry counts once as an attempt.'],
    ['E = A × I × p', 'Facility kWh = attempts × IT kWh per attempt × PUE.'],
    ['E1/E0 = q^(−e) × k', 'k = (s0/s1) × (I1/I0) × (p1/p0), the effective intensity ratio.'],
    ['e* = ln(k) / ln(q)', 'Break-even elasticity magnitude, defined for q ≠ 1 and k > 0.'],
  ];
  return `<main id="main" class="wrap" tabindex="-1" data-research-content>
    <header class="page-intro"><p class="eyebrow">The rebound lab / F04 + F07</p><h1>Cheaper tasks.<br><span class="accent">More energy, or less?</span></h1>
      <p class="lead">An explorer for the conditional demand–energy identity in P05 and the three futures named in P08. Every number here comes from declared assumptions about an abstract, illustrative indexed workload—not from company data, measured elasticities, or forecasts.</p>
      <p class="page-meta">${SITE.version} · Initial author ${SITE.author} · Model ${MODEL_VERSION} · Evidence cutoff: ${EVIDENCE_CUTOFF}<br>${LAB_STATUS}</p>
      <div class="actions">${siteLink('#elasticity-threshold', 'F04 · Explore the threshold ↓', 'button')}${siteLink('#scenario-comparison', 'F07 · Compare three futures ↓', 'button secondary')}</div>
      <p class="return-links">${siteLink('paper.html#p05', 'Return to P05')} · ${siteLink('paper.html#p08', 'Return to P08')}</p>
    </header>
    ${reviewStrip()}
    <section class="section two-column" id="method" aria-labelledby="method-title">
      <div><p class="eyebrow">Method / one shared identity</p><h2 id="method-title">Declared assumptions in. Indexed results out.</h2>
        <dl class="formula-list">
          ${formulas.map(([formula, meaning]) => `<div><dt><code>${escape(formula)}</code></dt><dd>${escape(meaning)}</dd></div>`).join('\n          ')}
        </dl>
        <p class="caption">Routed futures partition successful demand with shares that sum to 1, then apply each route’s success rate and intensity: k = Σ share × k(route). Results agree within relative ${TOLERANCE.relative} (absolute floor ${TOLERANCE.absolute}).</p>
      </div>
      <div><div class="gate-note"><h3>What this lab is—and is not</h3><p>No company calibration: filing reconciliation (T-014) is incomplete, and no Anthropic, OpenAI, or provider figure enters any input. The workload is an abstract illustrative indexed workload until the coding, extraction, and agent rubrics (T-005) are reviewed.</p><p>Indexed baseline = 100. Absolute kWh appear only from all three baseline values you enter; missing values stay unknown, never zero. Deterministic: no seed and no Monte Carlo (T-031 is later work).</p><p>A price ratio is not a margin, and an energy index is not an efficiency score; financial and physical measures stay separate. Not yet reviewed.</p></div>
        <ul class="review-links">
          <li>${docLink('DATA-DICTIONARY.md', 'Metric dictionary ↗')}<p>Symbols, units, domains, classifications, and what each measure is not.</p></li>
          <li>${docLink('SPECIFICATION.md#8-modeling-rules-and-edge-cases', 'Modeling rules and edge cases (§8) ↗')}<p>Fixtures, positive prices, success and PUE domains, and import limits.</p></li>
          <li>${docLink('research/INDEPENDENT-EVIDENCE.md#r05', 'Analytical derivation (R05) ↗')}<p>The conditional threshold derivation; not an empirical estimate.</p></li>
          <li>${docLink('docs/assets/js/model/task-energy.mjs', 'Shared engine source ↗')}<p>The same module renders the static tables and runs the live view.</p></li>
        </ul>
      </div>
    </section>
    ${f04Section()}
    ${f07Section()}
  </main>`;
}

function page(file, title, description, body, scripts = []) {
  return `<!doctype html>
<!-- Generated by tools/render-shell.mjs. Review document base: docs/assets/js/config.mjs. -->
<html lang="en" data-brand="colab">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark light">
  <meta name="description" content="${escape(description)}">
  <title>${escape(title)} · ${SITE.version} · Ethical Tech CoLab</title>
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="preload" href="assets/fonts/bebas-neue-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="assets/fonts/space-mono-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="assets/fonts/fonts.css">
  <link rel="stylesheet" href="assets/themes.css">
  <link rel="stylesheet" href="assets/site.css">
  <script type="module" src="assets/js/site.mjs"></script>${scripts.map((script) => `
  <script type="module" src="${script}"></script>`).join('')}
</head>
<body>
  ${header(file)}
  ${body}
  ${footer()}
</body>
</html>
`;
}

export function renderShell() {
  const themeCSS = `/* Generated from the attributed registry by tools/render-shell.mjs. */\n${Object.values(THEMES).map((theme) =>
    `${theme.id === 'colab' ? ':root, ' : ''}:root[data-brand="${theme.id}"] {\n${Object.entries(tokensFor(theme)).map(([key, value]) => `  ${key}: ${value};`).join('\n')}\n}`).join('\n\n')}\n`;
  return {
    'index.html': page('index.html', 'Models, Megawatts, and Moats', 'An evidence-first research demo about AI efficiency, open-model catch-up, demand, and infrastructure. Only illustrative, uncalibrated indexed scenarios are computed.', overview()),
    'paper.html': page('paper.html', 'Paper section guide', 'P00–P12 orientation notes and direct manuscript, source, and research-plan links. Draft for review, not a published analytical paper.', paper()),
    'evidence.html': page('evidence.html', 'Evidence room', 'A non-analytical chronology of six received text captures, with claim reconciliation pending and links to review records.', evidence()),
    'rebound.html': page('rebound.html', 'Rebound lab', 'F04 elasticity threshold and F07 scenario comparison: illustrative indexed scenarios computed with the task-energy model. Not calibrated, not a forecast.', rebound(), ['assets/js/rebound.mjs']),
    'assets/themes.css': themeCSS,
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const check = process.argv.includes('--check');
  for (const [file, contents] of Object.entries(renderShell())) {
    const path = new URL(`../docs/${file}`, import.meta.url);
    if (check) {
      if (await readFile(path, 'utf8') !== contents) throw new Error(`${file} is stale; run node tools/render-shell.mjs`);
    } else {
      await writeFile(path, contents);
    }
  }
  console.log(check ? 'Shell HTML and theme CSS are current.' : 'Rendered four static pages and theme CSS.');
}
