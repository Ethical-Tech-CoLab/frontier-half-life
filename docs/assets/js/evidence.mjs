// Progressive enhancement for the claim inspector. Without JavaScript every
// claim stays visible. Filtering only toggles `hidden`; no markup is injected.
export function matches(card, { state = '', classification = '', search = '' }) {
  const query = search.trim().toLowerCase();
  return (!state || card.dataset.state === state)
    && (!classification || card.dataset.classification === classification)
    && (!query || card.dataset.search.includes(query));
}

export function initializeClaims({ document, location, listen }) {
  const form = document.querySelector('#claim-filters');
  if (!form) return null;
  const cards = [...document.querySelectorAll('.claim-card')];
  const count = document.querySelector('#claim-count');
  const empty = document.querySelector('#claims-empty');

  function apply() {
    const criteria = {
      state: form.elements.state.value,
      classification: form.elements.classification.value,
      search: form.elements.search.value,
    };
    let shown = 0;
    for (const card of cards) {
      const visible = matches(card, criteria);
      card.hidden = !visible;
      if (visible) shown += 1;
    }
    count.textContent = shown === cards.length ? `${cards.length} claims.` : `${shown} of ${cards.length} claims match.`;
    empty.hidden = shown !== 0 || cards.length === 0;
    return shown;
  }

  // A claim linked from the paper must never be hidden by a stale filter.
  function reveal() {
    const id = decodeURIComponent(location.hash.slice(1));
    const target = cards.find((card) => card.id === id);
    if (target && target.hidden) { form.reset(); apply(); }
  }

  form.hidden = false;
  form.addEventListener('input', apply);
  form.addEventListener('change', apply);
  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('reset', () => setTimeout(apply, 0));
  listen('hashchange', reveal);
  apply();
  reveal();
  return { apply };
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  initializeClaims({ document, location: window.location, listen: (event, callback) => window.addEventListener(event, callback) });
}
