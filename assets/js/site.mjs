import { THEMES, DEFAULT_BRAND, BRAND_ALIASES } from './themes.mjs';

export const STORAGE_KEY = 'frontier-half-life.brand';

export function resolveBrand(search, saved = null) {
  const parameters = new URLSearchParams(search);
  const requested = parameters.has('brand') ? parameters.get('brand') : saved;
  if (requested === null) return { id: DEFAULT_BRAND, notice: '' };
  const id = Object.hasOwn(BRAND_ALIASES, requested) ? BRAND_ALIASES[requested] : requested;
  if (Object.hasOwn(THEMES, id)) {
    return { id, notice: requested !== id
      ? 'The source ID “voltage-park” is supported as an alias for “voltagepark”.' : '' };
  }
  return { id: DEFAULT_BRAND,
    notice: `Unknown theme “${requested}”. Using Ethical Tech CoLab instead.` };
}

export function withBrand(href, base, id) {
  const url = new URL(href, base);
  url.searchParams.set('brand', id);
  return url.href;
}

export function readPreference(getStorage) {
  try {
    return { saved: getStorage().getItem(STORAGE_KEY), notice: '' };
  } catch {
    return { saved: null,
      notice: 'Local preference storage is unavailable. Your theme will travel in site links but may not be remembered on a later visit.' };
  }
}

export function savePreference(getStorage, id) {
  try {
    getStorage().setItem(STORAGE_KEY, id);
    return '';
  } catch {
    return 'Your theme could not be saved locally. It still works on this page and travels in site links.';
  }
}

export function initializeTheme({ document, location, history, getStorage, listen }) {
  const preference = readPreference(getStorage);
  let persistenceNotice = preference.notice;
  let addressNotice = '';
  const selector = document.querySelector('#theme-select');
  const message = document.querySelector('#theme-message');

  function show(id, notice = '') {
    const theme = THEMES[id];
    document.documentElement.dataset.brand = id;
    selector.value = id;
    document.querySelector('#theme-name').textContent = `${theme.short} · presentation only`;
    document.querySelector('#theme-description').textContent = theme.description;
    document.querySelector('#theme-confidence').textContent = `Source confidence: ${theme.confidence}. All styling is approximate.`;
    document.querySelector('#theme-deviation').textContent = theme.deviation;
    document.querySelector('#theme-license').textContent = theme.licensing;
    const sources = document.querySelector('#theme-sources');
    const links = [...new Set([theme.registry, ...theme.sources])].map((href, index) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = index === 0 ? 'Identity / registry reference' : `Source ${index}`;
      return link;
    });
    sources.replaceChildren(...links);
    try {
      history.replaceState(history.state, '', withBrand(location.href, location.href, id));
    } catch {
      addressNotice = 'The address bar could not be updated. The selected theme still travels in site links.';
    }
    for (const link of document.querySelectorAll('a[data-site-link]')) {
      link.href = withBrand(link.getAttribute('href'), location.href, id);
    }
    message.textContent = [`${theme.short} theme. Presentation only; research content is unchanged.`,
      notice, persistenceNotice, addressNotice].filter(Boolean).join(' ');
    return id;
  }

  const initial = resolveBrand(location.search, preference.saved);
  let current = show(initial.id, initial.notice);
  document.querySelector('#theme-control').hidden = false;
  selector.addEventListener('change', () => {
    const selection = resolveBrand(`?brand=${encodeURIComponent(selector.value)}`);
    const savedNotice = savePreference(getStorage, selection.id);
    persistenceNotice = savedNotice || persistenceNotice;
    current = show(selection.id, selection.notice);
  });
  listen('popstate', () => {
    const selection = resolveBrand(location.search, current);
    current = show(selection.id, selection.notice);
  });
  return { get brand() { return current; } };
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  initializeTheme({
    document, location: window.location, history: window.history,
    getStorage: () => window.localStorage,
    listen: (event, callback) => window.addEventListener(event, callback),
  });
}
