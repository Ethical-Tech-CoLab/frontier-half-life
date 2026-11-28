export const SITE = Object.freeze({
  version: 'v0.4',
  author: 'yorkerhodes3',
  documentBase: 'https://github.com/Ethical-Tech-CoLab/frontier-half-life/blob/main/',
  captureThrough: '2026-11-25',
  reviewState: 'Passages located · review pending',
  // Pinned review snapshots: sources at the git tag; PDFs printed from that commit.
  snapshots: Object.freeze([Object.freeze({
    id: 'v0.4-review.1', date: '2026-11-28',
    paper: 'snapshots/v0.4-review.1/frontier-half-life-v0.4-review.1-paper.pdf',
    evidence: 'snapshots/v0.4-review.1/frontier-half-life-v0.4-review.1-evidence.pdf',
    checksums: 'snapshots/v0.4-review.1/SHA256SUMS',
  })]),
});

export function documentURL(path) {
  return `${SITE.documentBase}${path}`;
}
