import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { SITE, documentURL } from '../docs/assets/js/config.mjs';
import { SECTIONS, FILINGS } from '../docs/assets/js/research.mjs';
import { THEMES, tokensFor } from '../docs/assets/js/themes.mjs';
import { paperBody, evidenceBody } from './render-reader.mjs';
import { providersBody, uncertaintyBody } from './render-views.mjs';

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
        ${[['index.html', 'Overview'], ['paper.html', 'Paper'], ['evidence.html', 'Evidence'], ['providers.html', 'Providers'], ['uncertainty.html', 'Stress']].map(([file, label]) =>
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
    <p id="theme-message" class="theme-message" role="status" aria-live="polite" aria-atomic="true">CoLab presentation. Review draft; no calibrated results.</p>
  </div>
  <noscript><p class="wrap noscript">JavaScript is off. All research-guide content and source links remain readable in the default CoLab theme. Theme switching requires JavaScript.</p></noscript>`;
}

function footer() {
  const theme = THEMES.colab;
  return `<footer class="site-footer">
    <div class="wrap">
      <div class="footer-top">
        <div><strong>Models, Megawatts, and Moats</strong>
          <p>${SITE.version} · Initial author ${SITE.author} · Review draft, not an analytical release</p>
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
    <div class="review-item"><small>Filing evidence</small><strong>Passages located · unverified</strong></div>
    <div class="review-item"><small>Human review</small><strong>Financial review pending</strong></div>
    <div class="review-item"><small>This site</small><strong>Review draft · no calibrated results</strong></div>
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
        <div class="actions">${siteLink('paper.html#about', 'Read the paper draft →', 'button')}${siteLink('evidence.html#claims', 'Inspect the evidence →', 'button secondary')}</div>
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
        <article class="card"><span class="step">01 / Evidence room</span><span class="status-label">Passages located · unverified</span><h3>Know what supports a claim.</h3><p>Follow the filing lineage and inspect every claim with its classification, verification state, locator and the paper sections that cite it.</p>${siteLink('evidence.html#claims', 'Open the claim inspector →')}</article>
        <article class="card"><span class="step">02 / Paper reader</span><span class="status-label">Review draft · P00–P12</span><h3>Read the argument, then contest it.</h3><p>The full manuscript, rendered from its source. Claim IDs open the evidence; figure panels say whether a view is live or planned.</p>${siteLink('paper.html#about', 'Read the paper →')}</article>
        <article class="card"><span class="step">03 / Dashboard workspace</span><span class="status-label">Planned · not available</span><h3>Challenge the assumptions.</h3><p>Task efficiency, equivalency, rebound, providers, impacts, and uncertainty views follow evidence and model review. No simulation runs here.</p>${docLink('PLAN.md#4-paper-coordination-and-pages-link-contract', 'Inspect planned views on GitHub ↗')}</article>
      </div>
    </section>
    <section class="section two-column" id="boundaries" aria-labelledby="boundaries-title">
      <div><p class="eyebrow">Deliberate boundaries</p><h2 id="boundaries-title">Useful questions.<br>Honest unknowns.</h2>
        <ul class="scope-list"><li>Useful-task efficiency, not just token prices.<span>Quality and failed attempts belong in the denominator.</span></li><li>Evidence-conditional company research.<span>Anthropic is an anchor, not a proxy for the whole sector.</span></li><li>Operational impacts, with place and boundaries.<span>No company-energy totals inferred from revenue.</span></li><li>Contestable scenarios, not investment forecasts.<span>Future results must retain assumptions and provenance.</span></li></ul>
      </div>
      <div><div class="gate-note"><h3>What this draft does—and does not—claim</h3><p>The author approved the specification and plan on November 28, 2026. The paper is published here as a review draft. Filing passages are located and internally checked, but origin authentication, financial review, calibrated models and analytical release still require their evidence and review gates.</p><p>Located filing values appear with their verification state; none is verified. No provider rankings, calibrated results, or impact estimates are shown.</p></div>
        <ul class="review-links"><li>${docLink('SPECIFICATION.md#9-non-functional-requirements', 'Read the design and accessibility contract ↗')}<p>Accessible presentation is independent of research state.</p></li><li>${docLink('PLAN.md#6-milestones-and-dependencies', 'Review staged evidence and model gates ↗')}<p>A working shell is not a completed research milestone.</p></li></ul>
      </div>
    </section>
  </main>`;
}

function paper() {
  return paperBody(reviewStrip());
}

function evidence() {
  return evidenceBody(reviewStrip());
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
  <link rel="preload" href="assets/fonts/bebas-neue-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="assets/fonts/space-mono-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="assets/fonts/fonts.css">
  <link rel="stylesheet" href="assets/themes.css">
  <link rel="stylesheet" href="assets/site.css">
  <link rel="stylesheet" href="assets/reader.css">
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
    'paper.html': page('paper.html', 'Live research reader', 'The v0.4 review draft of Models, Megawatts, and Moats, rendered from the manuscript with linked claims, sources and figures. Not an analytical release.', paper()),
    'evidence.html': page('evidence.html', 'Evidence room', 'Filing lineage and a claim inspector: located, internally checked passages with locators. No claim is verified yet.', evidence()),
    'providers.html': page('providers.html', 'Providers and commitments', 'F05 commitment exposure from the final prospectus: components, exclusions, conditional amounts and named arrangements. Located, unverified, never summed across instruments.', providersBody(reviewStrip())),
    'uncertainty.html': page('uncertainty.html', 'Stress boundaries', 'F08 illustrative reverse-stress boundaries: compute-cost pressure evaluated on reported quarters; capacity use and regional power marked insufficient evidence. No probabilities.', uncertaintyBody(reviewStrip())),
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
  console.log(check ? 'Shell HTML and theme CSS are current.' : 'Rendered static pages and theme CSS.');
}
