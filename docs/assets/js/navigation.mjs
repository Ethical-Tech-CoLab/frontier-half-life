export function initializeNavigation({ document, matchMedia }) {
  const header = document.querySelector('#masthead');
  const nav = document.querySelector('#primary-nav');
  const toggle = document.querySelector('#nav-toggle');
  const picker = document.querySelector('#theme-control');
  const trigger = document.querySelector('#theme-trigger');
  const mobile = matchMedia('(max-width: 1240px)');
  let open = false;

  function setOpen(value) {
    open = mobile.matches && value;
    nav.hidden = mobile.matches && !open;
    toggle.hidden = !mobile.matches;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  }

  header.dataset.navReady = 'true';
  setOpen(false);
  toggle.addEventListener('click', () => {
    picker.open = false;
    setOpen(!open);
  });
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  picker.addEventListener('toggle', () => {
    if (picker.open) setOpen(false);
  });
  document.addEventListener('pointerdown', (event) => {
    if (!picker.contains(event.target)) picker.open = false;
    if (!header.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (picker.open) {
      picker.open = false;
      trigger.focus();
    } else if (open) {
      setOpen(false);
      toggle.focus();
    }
  });
  header.addEventListener('focusout', (event) => {
    if (!header.contains(event.relatedTarget)) {
      picker.open = false;
      setOpen(false);
    }
  });
  mobile.addEventListener('change', () => {
    const focusWasInNav = nav.contains(document.activeElement);
    setOpen(false);
    if (mobile.matches && focusWasInNav) toggle.focus();
  });
}
