import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { SITE, documentURL } from '../docs/assets/js/config.mjs';
import { SECTIONS, FILINGS } from '../docs/assets/js/research.mjs';
import { THEMES, tokensFor } from '../docs/assets/js/themes.mjs';

const escape = (value) => String(value).replace(/[&<>"']/g, (character) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const docLink = (path, label, className = '') =>
  `<a href="${escape(documentURL(path))}"${className ? ` class="${className}"` : ''}>${escape(label)}</a>`;
const siteLink = (path, label, className = '') =>
  `<a href="${escape(path)}" data-site-link${className ? ` class="${className}"` : ''}>${escape(label)}</a>`;

function header(page) {
  return `<a class="skip-link" href="#main" data-site-link>Skip to content</a>
  <header class="masthead">
    <div class="wrap header-row">
      <a class="identity" href="index.html" data-site-link aria-label="Ethical Tech CoLab — research overview">
        <span class="identity-mark" aria-hidden="true">C↗</span>
        <span><strong>Ethical Tech CoLab</strong><small>Frontier half-life / research</small></span>
      </a>
      <nav class="site-nav" aria-label="Main navigation">
        ${[['index.html', 'Overview'], ['paper.html', 'Paper guide'], ['evidence.html', 'Evidence']].map(([file, label]) =>
          `<a href="${file}" data-site-link${page === file ? ' aria-current="page"' : ''}>${label}</a>`).join('\n        ')}
      </nav>
      <div id="theme-control" class="theme-control" hidden>
        <label for="theme-select">Presentation theme</label>
        <select id="theme-select" aria-describedby="theme-message theme-disclaimer">
          ${Object.values(THEMES).map((theme) => `<option value="${theme.id}">${escape(theme.name)}</option>`).join('\n          ')}
        </select>
      </div>
    </div>
  </header>
  <div class="wrap notice-row">
    <span class="version">${SITE.version} / DEMO</span>
    <p id="theme-message" class="theme-message" role="status" aria-live="polite" aria-atomic="true">CoLab presentation. Demo shell only; no analytical results.</p>
  </div>
  <noscript><p class="wrap noscript">JavaScript is off. All research-guide content and source links remain readable in the default CoLab theme. Theme switching requires JavaScript.</p></noscript>`;
}

function footer() {
  const theme = THEMES.colab;
  return `<footer class="site-footer">
    <div class="wrap">
      <div class="footer-top">
        <div><strong>Models, Megawatts, and Moats</strong>
          <p>${SITE.version} · Initial author ${SITE.author} · Demo shell only</p>
          <p>Text capture portfolio through ${SITE.captureThrough}; not a validated dataset cutoff.</p>
        </div>
        <nav class="footer-links" aria-label="Review documents">
          ${docLink('paper/PAPER-DRAFT.md', 'Manuscript draft')}
          ${docLink('CLAIM-LEDGER.csv', 'Claim ledger')}
          ${docLink('PLAN.md#4-paper-coordination-and-pages-link-contract', 'Reader / figure plan')}
        </nav>
      </div>
      <details class="theme-provenance">
        <summary>Theme provenance &amp; accessibility · <span id="theme-name">CoLab · presentation only</span></summary>
        <p id="theme-disclaimer" class="disclaimer">All themes are approximate, non-affiliated presentation presets. No company logos or official endorsement. Choosing a theme does not identify a research subject, provider relationship, or verified result.</p>
        <p id="theme-description">${escape(theme.description)}</p>
        <p id="theme-confidence">Source confidence: high. All styling is approximate.</p>
        <p id="theme-deviation">${escape(theme.deviation)}</p>
        <p id="theme-license">${escape(theme.licensing)}</p>
        <div id="theme-sources" class="provenance-links">
          <a href="${theme.registry}">Identity / registry reference</a><a href="${theme.sources[0]}">Source 1</a>
        </div>
        <p>Reading text is contrast-adjusted to at least 4.5:1 and controls / focus to at least 3:1 on the used surfaces. System fonts only; no network fonts, analytics, or browser ingestion of source documents.</p>
        <div class="provenance-links"><a href="SHELL-NOTES.md">Shell scope and design notes</a><a href="assets/licenses/MIT.txt">Shell MIT license</a><a href="assets/licenses/NOTICE.txt">Reference attribution</a><a href="assets/licenses/neocloud-supply-os-APACHE-2.0.txt">Apache-2.0 reference license</a></div>
      </details>
    </div>
  </footer>`;
}

function reviewStrip() {
  return `<div class="review-strip" aria-label="Research and release status">
    <div class="review-item"><small>Intake</small><strong>Text captures received</strong></div>
    <div class="review-item"><small>Evidence review</small><strong>Claim reconciliation pending</strong></div>
    <div class="review-item"><small>This site</small><strong>Demo shell only</strong></div>
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
        <article class="card"><span class="step">03 / Dashboard workspace</span><span class="status-label">Planned · not available</span><h3>Challenge the assumptions.</h3><p>Task efficiency, equivalency, rebound, providers, impacts, and uncertainty views follow evidence and model review. No simulation runs here.</p>${docLink('PLAN.md#4-paper-coordination-and-pages-link-contract', 'Inspect planned views on GitHub ↗')}</article>
      </div>
    </section>
    <section class="section two-column" id="boundaries" aria-labelledby="boundaries-title">
      <div><p class="eyebrow">Deliberate boundaries</p><h2 id="boundaries-title">Useful questions.<br>Honest unknowns.</h2>
        <ul class="scope-list"><li>Useful-task efficiency, not just token prices.<span>Quality and failed attempts belong in the denominator.</span></li><li>Evidence-conditional company research.<span>Anthropic is an anchor, not a proxy for the whole sector.</span></li><li>Operational impacts, with place and boundaries.<span>No company-energy totals inferred from revenue.</span></li><li>Contestable scenarios, not investment forecasts.<span>Future results must retain assumptions and provenance.</span></li></ul>
      </div>
      <div><div class="gate-note"><h3>What this demo does—and does not—authorize</h3><p>The author requested this narrow, non-analytical shell and separately approved the specification and plan on November 28, 2026. Claim reconciliation, calibrated models, and analytical publication still require their evidence and review gates.</p><p>No verified financial amounts, provider rankings, simulated results, or reported impact estimates are shown.</p></div>
        <ul class="review-links"><li>${docLink('SPECIFICATION.md#9-non-functional-requirements', 'Read the design and accessibility contract ↗')}<p>Accessible presentation is independent of research state.</p></li><li>${docLink('PLAN.md#6-milestones-and-dependencies', 'Review staged evidence and model gates ↗')}<p>A working shell is not a completed research milestone.</p></li></ul>
      </div>
    </section>
  </main>`;
}

function paper() {
  return `<main id="main" class="wrap" tabindex="-1" data-research-content>
    <header class="page-intro"><p class="eyebrow">The linked research reader / section guide</p><h1>A question you can<br><span class="accent">follow and challenge.</span></h1>
      <p class="lead">Thirteen stable sections connect the manuscript, its evidence, and the planned analysis. These short orientation notes do not reproduce or publish the unreconciled draft’s analytical claims.</p>
      <p class="page-meta">${SITE.version} · Initial author ${SITE.author} · Text portfolio through ${SITE.captureThrough}<br>Draft for review · No calibrated dataset or analytical results</p>
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
          <p class="caption">${escape(section.figure)} · Non-analytical, received-text view.<br>${siteLink(section.shell, `${section.shellLabel} →`)}</p>` : ''}
          ${siteLink('#contents', 'Back to section contents ↑', 'back-to-contents')}
        </section>`).join('\n')}
        <div class="gate-note"><h3>The full reader is still a planned deliverable.</h3><p>Reviewed manuscript rendering, accessible figures, versioned datasets, manifests, and exact replay / return states are not available in this shell. Source links point to the current review branch, not an immutable analytical release.</p></div>
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

function page(file, title, description, body) {
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
  <link rel="stylesheet" href="assets/themes.css">
  <link rel="stylesheet" href="assets/site.css">
  <script type="module" src="assets/js/site.mjs"></script>
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
    'index.html': page('index.html', 'Models, Megawatts, and Moats', 'An evidence-first research demo about AI efficiency, open-model catch-up, demand, and infrastructure. No analytical results are published.', overview()),
    'paper.html': page('paper.html', 'Paper section guide', 'P00–P12 orientation notes and direct manuscript, source, and research-plan links. Draft for review, not a published analytical paper.', paper()),
    'evidence.html': page('evidence.html', 'Evidence room', 'A non-analytical chronology of six received text captures, with claim reconciliation pending and links to review records.', evidence()),
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
  console.log(check ? 'Shell HTML and theme CSS are current.' : 'Rendered three static pages and theme CSS.');
}
