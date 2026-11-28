export const SITE = Object.freeze({
  version: 'v0.4',
  author: 'yorkerhodes3',
  documentBase: 'https://github.com/Ethical-Tech-CoLab/frontier-half-life/blob/docs/intake-demo-shell/',
  captureThrough: '2026-11-25',
  reviewState: 'Claim reconciliation pending',
});

export function documentURL(path) {
  return `${SITE.documentBase}${path}`;
}
