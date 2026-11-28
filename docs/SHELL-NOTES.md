# v0.4 demo shell

Initial author: **yorkerhodes3**. This static, no-build-step site began as a narrow,
author-requested non-analytical shell. Its scope now also includes one **indexed
rebound lab** (T-023/T-025): illustrative, uncalibrated scenarios computed in the
browser by the shared task-energy model. Text captures are received; claim
reconciliation, model calibration and analytical publication remain gated.
The author approved the specification and plan/backlog on 2026-11-28; these
document verdicts do not verify research claims. No source documents, excerpts,
financial values, company or provider figures, or calibrated results are fetched or
embedded.

## Content and review links

- `index.html`: human question, scope, evidence/paper/dashboard roadmap, review gates.
- `paper.html#p00`–`#p12`: stable orientation anchors, **not** a second manuscript.
  Each links directly to its GitHub manuscript section and source/method/plan.
- `evidence.html#filing-timeline`: named capture chronology, not an authenticated
  filing series. Dates reflect supplied filenames. `#review-records` links to
  intake, manifest, source, and claim records.
- `rebound.html#elasticity-threshold` (F04, return to P05) and
  `#scenario-comparison` (F07, return to P08): the indexed rebound lab. Every
  value is a declared scenario assumption for an abstract **illustrative indexed
  workload**, labeled "Illustrative indexed scenario — not calibrated, not a
  forecast" in text. No company calibration exists (filing reconciliation T-014
  is incomplete) and workload rubrics (T-005) are unreviewed. Field errors
  withhold affected results and label the previous output stale. Run manifests
  (JSON, at most 1 MiB) export and replay all three futures; query parameters such
  as `?scenario=rebound-acceleration&e=1.4` replay one future. The page is
  deterministic: no seed, no Monte Carlo.
- Future efficiency, equivalency, provider, impact, and uncertainty routes remain
  explicitly unavailable.

## Rebound lab model and static fallback

`assets/js/model/task-energy.mjs` is the single engine (`task-energy/0.4.0`) for
the live view, the build-time static tables, and the tests; symbols, units,
domains and edge cases are defined in the repository's `DATA-DICTIONARY.md`.
`assets/js/model/scenarios.mjs` holds the three presets and their rationales;
`assets/js/model/manifest.mjs` builds and strictly validates run manifests.
`tools/render-shell.mjs` imports the same modules to render the default chart,
the §8 fixture table (2.4 / 2.4 / 4.8 kWh) and preset results into
`rebound.html`, so both figures remain readable without JavaScript. Interactive
controls stay hidden until `assets/js/rebound.mjs` loads. Imported text is
treated as data (strict fields, `textContent` only), and the presentation
theme never enters inputs or results.

The **single review-document base** is `assets/js/config.mjs` (`SITE.documentBase`).
It points to `main`, the current repository branch, not an
immutable reviewed release. Changing it requires regenerating the checked-in
HTML with `node tools/render-shell.mjs` from the repository root. This is an
optional maintenance command; serving `docs/` requires no build or dependencies.
The HTML guide never parses or duplicates analytical manuscript passages.

## Design and theme provenance

The CoLab default uses near-black purple and lime with **self-hosted Bebas Neue
400 headings and Space Mono 400/700 body/UI text**, matching the lab's deliberate
monospace typography and the neocloud-supply-os adoption. Heading weight,
uppercase treatment and `0.02em` tracking are theme tokens, so other brands do
not inherit CoLab's display treatment. The modular editorial layout uses the token
approach in [Neocloud Supply OS](https://github.com/yorkerhodes3/neocloud-supply-os/blob/96a6161c6d2b5e70b86c354cf1f164e67d74fec2/docs/assets/js/themes.js).
Palette/source metadata adaptations retain [attribution](assets/licenses/NOTICE.txt)
and the [Apache-2.0 license](assets/licenses/neocloud-supply-os-APACHE-2.0.txt).
Shell layout, theme controller, and contrast derivation are original
[MIT work](assets/licenses/MIT.txt).

The compact 68px sticky masthead, project wordmark, rounded navigation pills,
document CTA, swatch-led brand dropdown and collapsible mobile menu follow the
same reference's [shell](https://github.com/yorkerhodes3/neocloud-supply-os/blob/96a6161c6d2b5e70b86c354cf1f164e67d74fec2/docs/assets/js/shell.js)
and [navigation styles](https://github.com/yorkerhodes3/neocloud-supply-os/blob/96a6161c6d2b5e70b86c354cf1f164e67d74fec2/docs/assets/css/base.css).
The links remain project-specific rather than copying unrelated lab pages.
Menus close on Escape/outside navigation and retain keyboard focus; a small-screen
breakpoint collapses links rather than stacking a permanent second header row.

Font files retain their [family copyright/OFL notices](assets/fonts/LICENSES.md).
The actual CoLab fonts replace the initial shell's system-font approximations;
other brand presets retain their explicitly documented system substitutes.

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
- Status is written in words. A labeled native disclosure with theme buttons, skip link, visible
  focus, responsive single-column layouts, and reduced-motion support are included.
- URL `?brand=` takes priority over saved preference; unknown IDs show a visible
  CoLab fallback. Storage failures are visibly reported rather than silently lost.
  Theme changes only affect presentation and the `brand` query parameter; other
  query parameters, fragments, history state, and guide content are preserved.
- Site navigation and same-page section links retain the selected theme. External
  GitHub review links are not given presentation query parameters.
- With JavaScript off, all guide content and navigation links remain readable in
  CoLab using the same self-hosted fonts; the unavailable theme control is hidden
  with a written explanation and mobile navigation remains expanded.

## Focused checks

From the repository root:

```sh
node tools/render-shell.mjs --check
node --test tests/
```

Serve `docs/` with any static HTTP server. No accounts, analytics, live provider
calls, runtime dependencies, deployment workflow, or ingestion pipeline are added.
The existing Pages source is `main` at its root. A root redirect opens `docs/`;
root `_config.yml` excludes research, paper and other source records from Jekyll.
Review links go to GitHub, and original source text is not republished as Pages.
Browser accessibility/responsiveness and actual Pages publication are separate
parent-task checks. Full reviewed paper rendering, calibrated models, stochastic
runs, evidence filters, and immutable snapshots are intentionally not implemented;
only the indexed rebound lab has manifests and replay.
