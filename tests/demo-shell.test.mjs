import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';
import { THEMES, tokensFor } from '../docs/assets/js/themes.mjs';
import { contrast } from '../docs/assets/js/color.mjs';
import { SITE } from '../docs/assets/js/config.mjs';
import { SECTIONS, FILINGS } from '../docs/assets/js/research.mjs';
import { resolveBrand, withBrand, readPreference, savePreference, initializeTheme, STORAGE_KEY } from '../docs/assets/js/site.mjs';
import { renderShell } from '../tools/render-shell.mjs';
import { initializeNavigation } from '../docs/assets/js/navigation.mjs';
import { MODEL_VERSION } from '../docs/assets/js/model/task-energy.mjs';
import { SCENARIOS } from '../docs/assets/js/model/scenarios.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
// Every generated page is covered; adding a page cannot skip structure or link checks.
const pages = Object.keys(renderShell()).filter((file) => file.endsWith('.html'));
const LAB_STATUS = 'Illustrative indexed scenario — not calibrated, not a forecast';
const read = (path) => readFile(resolve(root, path), 'utf8');
const decode = (value) => value.replaceAll('&amp;', '&').replaceAll('&#39;', "'").replaceAll('&quot;', '"');
const ids = (html) => [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);

test('checked-in static pages and token CSS match the one-source renderer', async () => {
  for (const [file, contents] of Object.entries(renderShell())) {
    assert.equal(await read(`docs/${file}`), contents, `${file} must be regenerated after content/config changes`);
    assert.doesNotMatch(contents, /^[\t ]+$/m, `${file} must not render whitespace-only lines`);
  }
});

test('existing Pages root preserves presentation state and excludes source captures', async () => {
  const entry = await read('index.html');
  const script = entry.match(/<script>([\s\S]*?)<\/script>/)[1];
  let target;
  runInNewContext(script, { location: {
    search: '?brand=anthropic', hash: '#roadmap', replace(value) { target = value; },
  } });
  assert.equal(target, 'docs/index.html?brand=anthropic#roadmap');
  assert.match(entry, /href="docs\/index.html"/);
  const config = await read('_config.yml');
  for (const excluded of ['research', 'paper', 'tools', 'tests', 'CLAIM-LEDGER.csv', 'DATA-DICTIONARY.md', 'docs/SHELL-NOTES.md', 'docs/assets/fonts/LICENSES.md']) {
    assert.ok(config.split('\n').includes(`  - ${excluded}`), `${excluded} must not be published by Jekyll`);
  }
});

test('all 13 presets carry approximation, provenance, font deviations, and the source-ID alias', () => {
  assert.equal(Object.keys(THEMES).length, 13);
  for (const theme of Object.values(THEMES)) {
    assert.equal(theme.approximation, true, theme.id);
    assert.match(theme.affiliation, /No affiliation or endorsement/);
    assert.ok(theme.sources.length > 0 && theme.sources.every((url) => url.startsWith('https://')));
    assert.ok(theme.confidence && theme.deviation && theme.licensing);
    assert.match(tokensFor(theme)['--font-body'], /system-ui|Georgia|Space Mono/);
  }
  assert.equal(THEMES.voltagepark.sourceId, 'voltage-park');
  assert.match(THEMES.anthropic.sources[0], /github.com\/anthropics\/skills/);
  assert.match(THEMES.nscale.confidence, /unverified/);
});

test('CoLab loads the actual display/body fonts and preserves reference heading treatment', async () => {
  const fontCSS = await read('docs/assets/fonts/fonts.css');
  for (const id of ['colab', 'colab-daylight']) {
    const tokens = tokensFor(THEMES[id]);
    assert.match(tokens['--font-display'], /^"Bebas Neue"/);
    assert.match(tokens['--font-body'], /^"Space Mono"/);
    assert.equal(tokens['--font-mono'], tokens['--font-body']);
    assert.equal(tokens['--display-weight'], '400');
    assert.equal(tokens['--display-case'], 'uppercase');
    assert.equal(tokens['--display-tracking'], '0.02em');
  }
  assert.match(fontCSS, /font-family: "Bebas Neue"/);
  assert.match(fontCSS, /font-family: "Space Mono"/);
  for (const [, filename] of fontCSS.matchAll(/url\("([^"]+)"\)/g)) {
    const data = await readFile(resolve(root, 'docs/assets/fonts', filename));
    assert.equal(data.subarray(0, 4).toString(), 'wOF2', `${filename} must be a real WOFF2 font`);
  }
  for (const filename of ['Bebas-Neue-OFL.txt', 'Space-Mono-OFL.txt']) {
    assert.match(await read(`docs/assets/fonts/${filename}`), /SIL OPEN FONT LICENSE Version 1.1/);
  }
  const css = await read('docs/assets/site.css');
  assert.match(css, /font-weight: var\(--display-weight\)/);
  assert.match(css, /letter-spacing: var\(--display-tracking\)/);
  assert.doesNotMatch(fontCSS, /url\(["']?https?:/);
});

test('actual shipped CSS text, accent buttons, control edges, and focus pass contrast on every used surface', async () => {
  const sheet = await read('docs/assets/themes.css');
  const layout = await read('docs/assets/site.css');
  const colorUses = [...layout.matchAll(/(?:^|[;{\s])color:\s*var\((--[\w-]+)\)/g)].map((match) => match[1]);
  assert.deepEqual([...new Set(colorUses)].sort(), ['--accent', '--accent-ink', '--fg', '--muted']);
  assert.doesNotMatch(layout, /(?:^|[;{\s])opacity\s*:/);
  for (const theme of Object.values(THEMES)) {
    const block = sheet.match(new RegExp(`:root\\[data-brand="${theme.id}"\\] \\{([^}]+)\\}`));
    assert.ok(block, `${theme.id} exists in actual CSS`);
    const tokens = Object.fromEntries([...block[1].matchAll(/(--[\w-]+):\s*([^;]+);/g)].map((match) => [match[1], match[2]]));
    assert.deepEqual(tokens, tokensFor(theme));
    for (const background of ['--bg', '--surface', '--card']) {
      for (const foreground of ['--fg', '--muted', '--accent']) {
        assert.ok(contrast(tokens[foreground], tokens[background]) >= 4.5,
          `${theme.id}: ${foreground} on ${background}`);
      }
      for (const foreground of ['--control', '--focus']) {
        assert.ok(contrast(tokens[foreground], tokens[background]) >= 3,
          `${theme.id}: ${foreground} on ${background}`);
      }
    }
    assert.ok(contrast(tokens['--accent-ink'], tokens['--accent']) >= 4.5, `${theme.id}: button text`);
  }
});

test('URL preference wins, unknown IDs visibly fall back, and the reference alias normalizes', () => {
  assert.equal(resolveBrand('', 'anthropic').id, 'anthropic');
  assert.equal(resolveBrand('?brand=openai', 'nebius').id, 'openai');
  assert.equal(resolveBrand('').id, 'colab');
  for (const id of ['', 'not-real', '__proto__', 'constructor', '<script>']) {
    const result = resolveBrand(`?brand=${encodeURIComponent(id)}`, 'lambda');
    assert.equal(result.id, 'colab');
    assert.match(result.notice, /Unknown theme/);
  }
  assert.match(resolveBrand('', 'old-theme').notice, /Unknown theme/);
  assert.deepEqual(resolveBrand('?brand=voltage-park'), {
    id: 'voltagepark', notice: 'The source ID “voltage-park” is supported as an alias for “voltagepark”.',
  });
});

test('brand propagation preserves unrelated query state, fragments, and a Pages subpath', () => {
  const url = new URL(withBrand('paper.html?scenario=air-pocket&seed=42#p08',
    'https://example.test/frontier-half-life/index.html?brand=colab', 'anthropic'));
  assert.equal(url.pathname, '/frontier-half-life/paper.html');
  assert.equal(url.searchParams.get('brand'), 'anthropic');
  assert.equal(url.searchParams.get('scenario'), 'air-pocket');
  assert.equal(url.searchParams.get('seed'), '42');
  assert.equal(url.hash, '#p08');
});

test('blocked storage access and writes return visible notices, not a failed theme operation', () => {
  const blocked = () => { throw new Error('Storage disabled'); };
  assert.match(readPreference(blocked).notice, /storage is unavailable/);
  assert.match(savePreference(blocked, 'anthropic'), /could not be saved/);
  assert.equal(readPreference(() => ({ getItem: () => 'lambda' })).saved, 'lambda');
});

function browserFixture(href, { storageBlocked = false, writeBlocked = false, historyBlocked = false } = {}) {
  let url = new URL(href);
  const events = new Map();
  const storage = new Map([[STORAGE_KEY, 'lambda']]);
  const links = ['paper.html?scenario=air-pocket#p08', '#main'].map((href) => ({
    href,
    getAttribute() { return this.href; },
  }));
  const nodes = Object.fromEntries(['theme-trigger', 'theme-short', 'theme-message', 'theme-name', 'theme-description',
    'theme-confidence', 'theme-deviation', 'theme-license', 'theme-sources', 'theme-control']
    .map((id) => [id, {
      textContent: '', hidden: true, children: [],
      focus() { this.focused = true; },
      replaceChildren(...children) { this.children = children; },
      addEventListener(event, callback) { events.set(event, callback); },
    }]));
  const options = Object.keys(THEMES).map((id) => ({
    dataset: { themeOption: id }, attributes: {}, events: {},
    setAttribute(key, value) { this.attributes[key] = value; },
    addEventListener(event, callback) { this.events[event] = callback; },
  }));
  const state = Object.freeze({ readerSection: 'p08', seed: 42, evidenceVersion: 'pending' });
  const document = {
    documentElement: { dataset: {} },
    querySelector(selector) {
      assert.ok(selector.startsWith('#theme-'), 'runtime must only address theme UI, not research content');
      assert.ok(nodes[selector.slice(1)]);
      return nodes[selector.slice(1)];
    },
    querySelectorAll(selector) {
      if (selector === '[data-theme-option]') return options;
      assert.equal(selector, 'a[data-site-link]');
      return links;
    },
    createElement(name) { assert.equal(name, 'a'); return { textContent: '', href: '' }; },
  };
  const environment = {
    document,
    location: { get href() { return url.href; }, get search() { return url.search; } },
    history: {
      state,
      replaceState(sameState, unused, href) {
        assert.equal(sameState, state, 'theme changes must preserve history state');
        if (historyBlocked) throw new Error('History blocked');
        url = new URL(href);
      },
    },
    getStorage() {
      if (storageBlocked) throw new Error('Storage blocked');
      return {
        getItem: (key) => storage.get(key) ?? null,
        setItem: (key, value) => {
          if (writeBlocked) throw new Error('Write blocked');
          storage.set(key, value);
        },
      };
    },
    listen: (event, callback) => events.set(event, callback),
  };
  return { environment, nodes, options, storage, links, events, get url() { return url; } };
}

test('every theme switch changes presentation only and preserves research, URL, and history state', () => {
  const fixture = browserFixture('https://example.test/frontier-half-life/paper.html?brand=unknown&seed=42&scenario=air-pocket#p08');
  const researchBefore = JSON.stringify({ SECTIONS, FILINGS, state: fixture.environment.history.state });
  const controller = initializeTheme(fixture.environment);
  assert.equal(controller.brand, 'colab');
  assert.match(fixture.nodes['theme-message'].textContent, /Unknown theme/);
  assert.equal(fixture.nodes['theme-control'].hidden, false);
  for (const id of Object.keys(THEMES)) {
    fixture.nodes['theme-control'].open = true;
    fixture.options.find((option) => option.dataset.themeOption === id).events.click();
    assert.equal(controller.brand, id);
    assert.equal(fixture.environment.document.documentElement.dataset.brand, id);
    assert.equal(fixture.storage.get(STORAGE_KEY), id);
    assert.equal(fixture.url.searchParams.get('seed'), '42');
    assert.equal(fixture.url.searchParams.get('scenario'), 'air-pocket');
    assert.equal(fixture.url.hash, '#p08');
    assert.equal(JSON.stringify({ SECTIONS, FILINGS, state: fixture.environment.history.state }), researchBefore);
    for (const link of fixture.links) assert.equal(new URL(link.href).searchParams.get('brand'), id);
    assert.equal(fixture.options.filter((option) => option.attributes['aria-pressed'] === 'true').length, 1);
    assert.equal(fixture.options.find((option) => option.dataset.themeOption === id).attributes['aria-pressed'], 'true');
    assert.equal(fixture.nodes['theme-control'].open, false);
    assert.equal(fixture.nodes['theme-trigger'].focused, true);
  }
  assert.equal(new URL(fixture.links[0].href).hash, '#p08');
  assert.equal(new URL(fixture.links[0].href).searchParams.get('scenario'), 'air-pocket');
  fixture.events.get('popstate')();
  assert.equal(controller.brand, 'voltagepark');
});

test('the rendered status region reports storage and history failures while the selector still works', () => {
  for (const options of [{ storageBlocked: true }, { writeBlocked: true }, { historyBlocked: true }]) {
    const fixture = browserFixture('https://example.test/index.html?brand=anthropic', options);
    initializeTheme(fixture.environment);
    fixture.options.find((option) => option.dataset.themeOption === 'nebius').events.click();
    assert.equal(fixture.environment.document.documentElement.dataset.brand, 'nebius');
    assert.match(fixture.nodes['theme-message'].textContent, /unavailable|could not be saved|address bar could not be updated/);
  }
});

test('each static page is no-JS readable, has labeled navigation/status/skip focus, and no external runtime requests', async () => {
  for (const page of pages) {
    const html = await read(`docs/${page}`);
    assert.match(html, /<html lang="en"/);
    assert.match(html, /class="skip-link" href="#main" data-site-link/);
    assert.match(html, /id="main"[^>]+tabindex="-1"[^>]+data-research-content/);
    assert.match(html, /id="theme-message"[^>]+role="status"[^>]+aria-live="polite"/);
    assert.match(html, /id="theme-trigger"[^>]+aria-label="Choose presentation theme"/);
    assert.match(html, /role="group" aria-label="Presentation themes"/);
    assert.equal((html.match(/data-theme-option="/g) || []).length, 13);
    assert.match(html, /id="nav-toggle"[^>]+aria-controls="primary-nav"[^>]+aria-expanded="false" hidden/);
    assert.match(html, /id="theme-control"[^>]+hidden/);
    assert.equal((html.match(/aria-current="page"/g) || []).length, 1);
    for (const status of ['Passages located · unverified', 'Financial review pending', 'Review draft · no calibrated results']) assert.ok(html.includes(status), `${page}: ${status}`);
    assert.doesNotMatch(html, /Demo shell only|no analytical results/);
    assert.ok(html.includes(SITE.author) && html.includes(SITE.version));
    assert.match(html, /<a href="rebound.html" data-site-link[^>]*>Rebound lab<\/a>/);
    assert.doesNotMatch(html, /<(?:script|iframe|img)[^>]+src="https?:/);
    assert.doesNotMatch(html, / disabled|<iframe/);
    // Lab scenario forms sit inside a hidden data-rebound-interactive container (checked in the lab test).
    for (const form of html.match(/<form[^>]*>/g) || []) if (!/data-scenario-form/.test(form)) assert.match(form, /\bhidden\b/, `${page}: forms start hidden until their script runs`);
    assert.match(html, /<noscript>.*All research-guide content and source links remain readable/);
    assert.equal(new Set(ids(html)).size, ids(html).length, `${page}: duplicate IDs`);
  }
  const css = await read('docs/assets/site.css');
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(css, /@import|@font-face|url\(["']?https?:/);
  assert.ok((await read('docs/assets/licenses/neocloud-supply-os-APACHE-2.0.txt')).includes('Apache License'));
  await access(resolve(root, 'docs/.nojekyll'));
});

test('mobile navigation collapses accessibly and closes on Escape, links, outside clicks and breakpoint changes', () => {
  const handlers = new Map();
  const node = (name) => ({
    name, hidden: false, dataset: {}, attributes: {},
    addEventListener(event, callback) { handlers.set(`${name}:${event}`, callback); },
    setAttribute(key, value) { this.attributes[key] = value; },
    contains(target) { return target?.parent === this || target === this; },
    focus() { document.activeElement = this; },
  });
  const header = node('header'), nav = node('nav'), toggle = node('toggle');
  const picker = node('picker'), trigger = node('trigger');
  const document = {
    activeElement: null,
    querySelector(selector) { return {
      '#masthead': header, '#primary-nav': nav, '#nav-toggle': toggle,
      '#theme-control': picker, '#theme-trigger': trigger,
    }[selector]; },
    addEventListener(event, callback) { handlers.set(`document:${event}`, callback); },
  };
  const media = { matches: true, addEventListener(event, callback) { handlers.set(`media:${event}`, callback); } };
  initializeNavigation({ document, matchMedia: () => media });
  assert.equal(nav.hidden, true);
  assert.equal(toggle.hidden, false);
  handlers.get('toggle:click')();
  assert.equal(nav.hidden, false);
  assert.equal(toggle.attributes['aria-expanded'], 'true');
  handlers.get('document:keydown')({ key: 'Escape' });
  assert.equal(nav.hidden, true);
  assert.equal(document.activeElement, toggle);
  handlers.get('toggle:click')();
  handlers.get('nav:click')({ target: { closest: () => ({}) } });
  assert.equal(nav.hidden, true);
  handlers.get('toggle:click')();
  handlers.get('document:pointerdown')({ target: {} });
  assert.equal(nav.hidden, true);
  picker.open = true;
  handlers.get('document:keydown')({ key: 'Escape' });
  assert.equal(picker.open, false);
  assert.equal(document.activeElement, trigger);
  media.matches = false;
  handlers.get('media:change')();
  assert.equal(nav.hidden, false);
  assert.equal(toggle.hidden, true);
  document.activeElement = { parent: nav };
  media.matches = true;
  handlers.get('media:change')();
  assert.equal(nav.hidden, true);
  assert.equal(document.activeElement, toggle);
  handlers.get('toggle:click')();
  picker.open = true;
  handlers.get('picker:toggle')();
  assert.equal(nav.hidden, true);
  handlers.get('header:focusout')({ relatedTarget: {} });
  assert.equal(picker.open, false);
});

test('all site links, assets, source files, and explicit or GitHub-heading section anchors resolve', async () => {
  for (const page of pages) {
    const html = await read(`docs/${page}`);
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const href = decode(match[1]);
      if (href.startsWith(SITE.documentBase)) {
        const target = href.slice(SITE.documentBase.length);
        const [withQuery, fragment] = target.split('#');
        const path = withQuery.split('?')[0];
        await access(resolve(root, path));
        if (fragment && /^L\d+$/.test(fragment)) {
          assert.match(withQuery, /\?plain=1$/, `${page}: line locators need the plain view`);
          assert.ok(Number(fragment.slice(1)) <= (await read(path)).split('\n').length, `${page}: ${target}`);
        } else if (fragment) {
          const document = await read(path);
          const explicit = ids(document);
          const headingIDs = [...document.matchAll(/^#{1,6}\s+(.+)$/gm)].map((heading) =>
            heading[1].toLowerCase().replace(/[^\p{L}\p{N}_\-\s]/gu, '').trim().replace(/\s/g, '-'));
          assert.ok([...explicit, ...headingIDs].includes(fragment), `${page}: ${path}#${fragment}`);
        }
      } else if (!href.startsWith('https://')) {
        const [target, fragment] = href.split('#');
        const path = target.split('?')[0];
        const local = path ? resolve(root, 'docs', dirname(page), path) : resolve(root, 'docs', page);
        await access(local);
        if (fragment) assert.ok(ids(await readFile(local, 'utf8')).includes(fragment), `${page}: ${href}`);
      }
    }
  }
});

test('P00–P12 link directly to manuscript anchors, and timeline captures link without browser ingestion', async () => {
  const paper = await read('docs/paper.html');
  for (const section of SECTIONS) {
    assert.ok(ids(paper).includes(section.id));
    assert.ok(paper.includes(`${SITE.documentBase}paper/PAPER-DRAFT.md#${section.id}`));
  }
  assert.equal(FILINGS.length, 6);
  assert.deepEqual(FILINGS.map((filing) => filing.date), [...FILINGS.map((filing) => filing.date)].sort());
  const evidence = await read('docs/evidence.html');
  for (const filing of FILINGS) {
    assert.ok(evidence.includes(`${SITE.documentBase}${filing.file}`));
    assert.ok(evidence.includes(`datetime="${filing.date}"`));
  }
  assert.match(evidence, /Return to P02/);
  for (const module of ['site.mjs', 'rebound.mjs', 'rebound-view.mjs', 'model/task-energy.mjs', 'model/scenarios.mjs', 'model/manifest.mjs']) {
    assert.doesNotMatch(await read(`docs/assets/js/${module}`), /\bfetch\(|XMLHttpRequest|innerHTML|outerHTML|insertAdjacentHTML|eval\(|new Function|Math\.random/, module);
  }
});

test('P05 and P08 open live, labeled F04/F07 lab targets that return to their invoking sections', async () => {
  const paper = await read('docs/paper.html');
  for (const [section, target, figure] of [
    ['p05', 'rebound.html#elasticity-threshold', 'F04'],
    ['p08', 'rebound.html#scenario-comparison', 'F07'],
  ]) {
    const block = paper.match(new RegExp(`<section class="paper-section" id="${section}"[\\s\\S]*?</section>`))[0];
    assert.ok(block.includes(`href="${target}" data-site-link`), `${section} links to ${target}`);
    assert.ok(block.includes(`Explore ${figure} →`));
    assert.match(block, /Live view · not calibrated/);
    assert.match(block, /live, illustrative/);
  }
  const lab = await read('docs/rebound.html');
  for (const anchor of ['elasticity-threshold', 'scenario-comparison', 'method']) assert.ok(ids(lab).includes(anchor), anchor);
  for (const back of ['paper.html#p05', 'paper.html#p08']) assert.match(lab, new RegExp(`href="${back}" data-site-link`));
  assert.match(lab, /aria-current="page">Rebound lab</);
  assert.match(lab, /<script type="module" src="assets\/js\/rebound.mjs"><\/script>/);
  for (const figure of ['F04 · Elasticity threshold.', 'F07 · Scenario comparison.']) assert.ok(lab.includes(figure));
  assert.ok((lab.match(new RegExp(LAB_STATUS, 'g')) || []).length >= 4, 'status label is written in text, not color only');
  assert.ok(lab.includes(`Model ${MODEL_VERSION}`));
  for (const doc of ['DATA-DICTIONARY.md', 'SPECIFICATION.md#8-modeling-rules-and-edge-cases', 'research/INDEPENDENT-EVIDENCE.md#r05']) {
    assert.ok(lab.includes(`${SITE.documentBase}${doc}`), doc);
  }
  assert.match(lab, /T-014/);
  assert.match(lab, /T-005/);
  assert.match(lab, /<noscript><p class="planned-note">JavaScript is off: inputs, live results, and manifest export\/import are unavailable/);
  const overview = await read('docs/index.html');
  const registry = JSON.parse(await read('paper/figures.json')).figures;
  assert.ok(overview.includes(`${registry.filter((figure) => figure.status === 'live').length} of ${registry.length} figures live · none calibrated`));
  assert.match(overview, /<a href="rebound.html" data-site-link>Open the rebound lab →<\/a>/);
});

test('the rebound lab is readable without JavaScript and every control is labeled and progressively revealed', async () => {
  const lab = await read('docs/rebound.html');
  const staticParts = lab.split('<div class="static-reference">').slice(1).join('');
  for (const kWh of ['<td class="num">2.4</td><td class="num">2.4</td>', '<td class="num">4.8</td><td class="num">4.8</td>']) {
    assert.ok(staticParts.includes(kWh), `static §8 fixture ${kWh}`);
  }
  for (const scenario of SCENARIOS) {
    assert.ok(staticParts.includes(scenario.title));
    assert.ok(staticParts.includes(`<td>scenario</td><td>${scenario.evidence_status}</td>`));
  }
  assert.match(staticParts, /<td class="num">0\.500<\/td><td class="num">−50\.0%<\/td><td class="num">0\.500<\/td>/);
  assert.match(lab, /<path id="f04-curve" class="chart-curve" d="M[\d.]+ [\d.]+ L/);
  assert.match(lab, /<svg id="f04-chart"[^>]+role="img" aria-labelledby="f04-chart-title f04-chart-desc"/);
  const interactive = [...lab.matchAll(/<(form|div) [^>]*data-rebound-interactive hidden[^>]*>/g)];
  assert.equal(interactive.length, 2, 'F04 controls and the F07 live area start hidden');
  const f04 = lab.slice(lab.indexOf('<form id="f04-form"'), lab.indexOf('</form>', lab.indexOf('<form id="f04-form"')));
  const f07 = lab.slice(lab.indexOf('<div class="lab-live" data-rebound-interactive hidden>'), lab.lastIndexOf('<div class="static-reference">'));
  const inputs = [...lab.matchAll(/<input id="([^"]+)"([^>]*)>/g)];
  assert.equal(inputs.length, (f04.match(/<input /g) || []).length + (f07.match(/<input /g) || []).length, 'all inputs sit in hidden interactive regions');
  for (const [, id, attributes] of inputs) {
    assert.ok(lab.includes(`<label for="${id}">`), `${id} has a label`);
    if (!attributes.includes('type="file"')) {
      assert.match(attributes, new RegExp(`aria-describedby="${id}-hint ${id}-error"`));
      assert.ok(ids(lab).includes(`${id}-error`));
    }
  }
  assert.match(lab, /<input id="manifest-import" type="file" accept="application\/json,\.json"/);
  assert.match(lab, /id="manifest-errors" class="error-list" role="alert"/);
  for (const live of ['f04-summary', 'efficient-abundance-summary', 'manifest-status']) {
    assert.match(lab, new RegExp(`id="${live}"[^>]+role="status" aria-live="polite"`));
  }
});
