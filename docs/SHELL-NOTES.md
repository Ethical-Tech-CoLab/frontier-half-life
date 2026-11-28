# v0.4 demo shell

Initial author: **yorkerhodes3**. This static, no-build-step site is a narrow,
author-requested non-analytical shell. Text captures are received; claim
reconciliation, model calibration and analytical publication remain gated.
The author approved the specification and plan/backlog on 2026-11-28; these
document verdicts do not verify research claims. No source documents, excerpts, financial values, or
model results are fetched or embedded.

## Content and review links

- `index.html`: human question, scope, evidence/paper/dashboard roadmap, review gates.
- `paper.html#p00`–`#p12`: stable orientation anchors, **not** a second manuscript.
  Each links directly to its GitHub manuscript section and source/method/plan.
- `evidence.html#filing-timeline`: named capture chronology, not an authenticated
  filing series. Dates reflect supplied filenames. `#review-records` links to
  intake, manifest, source, and claim records.
- Future efficiency, equivalency, rebound, provider, impact, and uncertainty
  routes are explicitly unavailable. There are no mock simulation controls.

The **single review-document base** is `assets/js/config.mjs` (`SITE.documentBase`).
It currently points to `docs/intake-demo-shell`, a moving review branch, not an
immutable reviewed release. Changing it requires regenerating the checked-in
HTML with `node tools/render-shell.mjs` from the repository root. This is an
optional maintenance command; serving `docs/` requires no build or dependencies.
The HTML guide never parses or duplicates analytical manuscript passages.

## Design and theme provenance

The CoLab default uses near-black purple, lime, a condensed system display face,
quiet system body text, and a modular editorial layout inspired by the token
approach in [Neocloud Supply OS](https://github.com/yorkerhodes3/neocloud-supply-os/blob/96a6161c6d2b5e70b86c354cf1f164e67d74fec2/docs/assets/js/themes.js).
Palette/source metadata adaptations retain [attribution](assets/licenses/NOTICE.txt)
and the [Apache-2.0 license](assets/licenses/neocloud-supply-os-APACHE-2.0.txt).
Shell layout, theme controller, and contrast derivation are original
[MIT work](assets/licenses/MIT.txt).

Thirteen theme IDs: `colab`, `colab-daylight`, `anthropic`, `openai`, `coreweave`,
`nebius`, `lambda`, `crusoe`, `together`, `nscale`, `fluidstack`, `vultr`,
`voltagepark`. The pinned public registry actually uses **`voltage-park`**, not
`voltagepark`; the former is supported as an alias. Nscale retains the reference's
low-confidence, unverified-palette warning.

Anthropic's warm paper, ink, and terracotta palette is sourced from the
[official public identity reference](https://github.com/anthropics/skills/blob/e4bb5d960d87126ff3b3a8af1a104b7db67560ba/skills/brand-guidelines/SKILL.md).
Arial and Georgia replace Poppins and Lora. Each theme's expandable provenance
describes source confidence, licensing, and typography deviations. All are
approximate; **no company logos or implied endorsement**. There are no bundled
proprietary fonts or external font requests. Accessible accent values intentionally
differ from source colors, especially on light backgrounds.

## Accessibility and presentation state

- Normal foreground, muted text, and link text meet 4.5:1 on all used reading
  surfaces. Accent-button text meets 4.5:1; control boundaries and focus exceed
  3:1. Low-contrast separators are decorative, never sole control boundaries.
- Status is written in words. Native labeled theme selection, skip link, visible
  focus, responsive single-column layouts, and reduced-motion support are included.
- URL `?brand=` takes priority over saved preference; unknown IDs show a visible
  CoLab fallback. Storage failures are visibly reported rather than silently lost.
  Theme changes only affect presentation and the `brand` query parameter; other
  query parameters, fragments, history state, and guide content are preserved.
- Site navigation and same-page section links retain the selected theme. External
  GitHub review links are not given presentation query parameters.
- With JavaScript off, all guide content and source links remain readable in CoLab;
  the unavailable theme control is hidden with a written explanation.

## Focused checks

From the repository root:

```sh
node tools/render-shell.mjs --check
node --test tests/demo-shell.test.mjs
```

Serve `docs/` with any static HTTP server. No accounts, analytics, live provider
calls, runtime dependencies, deployment workflow, or ingestion pipeline are added.
Browser accessibility/responsiveness and actual Pages publication are separate
parent-task checks. Full reviewed paper rendering, models, replay, exports, evidence
filters, and immutable snapshots are intentionally not implemented.
