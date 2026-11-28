# PLAN: Coordinated research, paper, and dashboard — v0.4

| Field | Value |
| --- | --- |
| Status | Approved 2026-11-28; evidence and analytical release reviews remain required |
| Starting working version | v0.4; advance explicitly, not automatically to v1 |
| Initial author / coordinator | yorkerhodes3 |
| Input | [SPECIFICATION.md](SPECIFICATION.md), approved v0.4 |
| Companions | [BACKLOG.md](BACKLOG.md), [paper/PAPER-DRAFT.md](paper/PAPER-DRAFT.md), [SOURCES.md](SOURCES.md) |
| Last updated | 2026-11-28 |

## 1. Approach and deliverable contract

Treat **the coordinated paper draft for review and the dashboard as equal primary deliverables**. Research produces traceable evidence; each completed evidence tranche updates the relevant manuscript section, figure/interaction specification, and dashboard data together. The paper is the reader's entry point to the argument, not a report written after the interface. Its contextual links open specific evidence or reproducible scenarios, then return the reader to the invoking section.

The author approved the revised specification, plan and backlog on 2026-11-28. The first **non-analytical demo shell** was separately authorized while those reviews proceeded. Approved planning permits the bounded work sequence, not assertions of calibrated/verified results, paid acquisition or bypassing scientific review. All later analytical outputs still require their stated evidence and release gates.

**Current research state:** All requested filing texts, indices and new exhibits are received, including the November 25 8-K; [the intake record](research/FILING-INTAKE-REVIEW.md) confirms 80 manifest file hashes/sizes. The author waived original PDF retrieval. The [claim ledger](CLAIM-LEDGER.csv) still preserves unresolved claim reconciliation, including the initial filing-portfolio leads; derived fixtures are separate. Independent-source full-text gaps remain where no usable text was supplied. Intake completion is not completed financial reconstruction or literature review.

The gathering dependency is closed for this scope. The text-based reconstruction is drafted in [the W1 note](research/W1-FILING-RECONSTRUCTION.md): passages located with line locators across all versions, 22 derived checks passing, CL-005 superseded and CL-020–CL-025 added. Claims stay `unknown` until origin authentication and a financial reviewer's sign-off; Amendment 1 table cells remain alignment-unverified.

## 2. Technical and editorial decisions

| ID | Choice | Reason / rejected alternative |
| --- | --- | --- |
| D-01 | Static GitHub Pages reader and dashboard, subject to Pages eligibility | Zero-incremental-spend starting constraint; reject a backend, accounts, analytics, and paid model calls for this scope |
| D-02 | Markdown manuscript as source; generated HTML reader with stable explicit section IDs | One argument for repository review and Pages reading; reject separately hand-maintained paper HTML that can drift from the manuscript |
| D-03 | Versioned CSV/JSON evidence and manifests with dictionaries and validation | Auditable transformations and downloads; reject a private database as the sole provenance store |
| D-04 | Shared deterministic model and figure data for paper and dashboard | Avoid independently recalculating the same figure with divergent assumptions |
| D-05 | Browser-side JavaScript modules; seeded stochastic work only after baseline validation | Portable static interactions; reject agent-based markets before evidence and deterministic identities are established |
| D-06 | Existing 12 neocloud-supply-os theme IDs plus `anthropic`; default `colab` | Preserve the requested brand set without brand-dependent results; record asset provenance before reuse |
| D-07 | Pin a review snapshot by commit, dataset, model, and paper version | A changing live reader must not silently rewrite what was reviewed; display current and archived versions distinctly |
| D-08 | Sourced static caption/table for every interactive figure | The paper remains intelligible offline, without JavaScript, and with assistive technology |

Plan dependency selection and exact rendering tool only after checking licenses and minimum needs; do not install tooling merely to write these documents.

## 3. Evidence work packages

`yorkerhodes3` coordinates each package. Named specialist reviewers are not assumed to exist; assignment is a planning gate. Package owners must report evidence coverage, contradictory findings, and what cannot be inferred, not only successful extractions.

| Package | Research and acquisition | Output / acceptance | Paper sections | Specification |
| --- | --- | --- | --- | --- |
| W1 — Filing reconstruction | Authenticate issuer/accessions; enumerate S-1, amendments, prospectus, exhibits, and subsequent filings through cutoff. Extract revenue, compute definitions, pricing adjustments, and contract conditionality. | Quarterly reconciliation and contract-level lineage with locators; original/amended/final differences; no incompatible-period growth calculation or double-counted commitments; unresolved claims remain unknown. | P02, P03, P06 | FR-01, FR-02, FR-04, FR-08 |
| W2 — Useful-task economics | Inspect model/system cards, price histories, task datasets and energy studies. Define coding tests, extraction field rubric, bounded-agent goal/budget; include failures, retries, context, tool calls, hardware and quality. | Versioned licensed task rubrics fixed before comparison; successful-task cost and energy calculations with units and exclusions. No new paid inference experiment is presumed. | P03, P04, P07 | FR-03, FR-04, FR-05 |
| W3 — Frontier lead clocks | Reconstruct closed/open release pairs using official releases and independent evaluations; inspect Epoch's method. Separate benchmark, workload, and commercial clocks, licenses, production availability, and censored unmatched releases. | Release-pair dataset with at least one reproducible comparison per included workload or an explicit gap; no six-month constant masquerading as a finding. | P04, P11 | FR-03 |
| W4 — Demand and rebound | Read direct/indirect/economy-wide rebound literature and credible AI/service-demand studies. Examine price pass-through, confounding, capability shifts, budgets and saturation. | Literature synthesis with competing findings and identification limits; elasticity ranges labeled measured, borrowed, or assumed; causal claims require more than co-moving revenue and price. | P01, P05, P08 | FR-02, FR-06 |
| W5 — Providers and contracts | Official filings/disclosures for CoreWeave, Nebius, Lambda, Crusoe, Together AI, Fireworks AI, Baseten and evidenced counterparties. Trace delivery, financing, cancellation, utilization and hardware exposure. | Seven archetype profiles with evidence dates and missing fields; only sourced edges to Anthropic; comparable metrics only, no rankings. | P06, P09 | FR-08, FR-14 |
| W6 — Operational and distributional impacts | Inspect LBNL/IEA methods; acquire location/period-aware grid and utility, interconnection, emissions, water, permit, and community records. | Location coverage denominator, regional factors and boundaries; separate average/marginal, direct/indirect water, operational/embodied. Missing factors remain unknown; qualitative community evidence is retained without invented thresholds. | P07, P10 | FR-09, FR-10 |
| W7 — Models and uncertainty | Derive identities; reproduce comparable quarters only where justified; model substitution/routing, sensitivity, distributions/correlations, and the three scoped stress searches. | Fixtures pass; historical residuals visible; indexed versus calibrated results distinct; seeds and search domain exported; no unsupported risk probabilities or “safe” verdict. | P08, P09, P11 | FR-05, FR-06, FR-07, FR-13, FR-14 |
| W8 — Reader and editorial integration | Write methods and results alongside every tranche; maintain citations, argument, figure captions, interaction targets, limitations, and review responses. | End-to-end paper draft and dashboard refer to the same claims, methods, versions and figures; broken/planned links are explicit; reviewer can challenge from prose to source. | P00–P12 | FR-11, FR-12, FR-15, FR-16 |

The original 19 research questions are retained: W1/W2 address §5.1; W3/W4/W7 address §5.2 and open-equivalency extensions; W5 addresses §5.3; W6/W7 address §5.4. H1–H10 remain hypotheses, including potential disconfirming findings. General chat, broad agentic markets, and complete lifecycle modeling remain deferred.

## 4. Paper coordination and Pages link contract

The section IDs below are permanent even if titles change. The initial [paper draft](paper/PAPER-DRAFT.md) already uses them. Proposed routes are **planned strings, not live links**; no page or figure is represented as deployed.

| Paper section | Evidence / work dependency | Planned contextual Pages target | Reviewable output |
| --- | --- | --- | --- |
| P00 — Abstract | All; written last after synthesis | `paper.html#p00` | Question, method, actually supported findings, limitations |
| P01 — Question and literature | W4; SRC-005/SRC-006 | `paper.html#p01` | Conservation/rebound mechanisms and competing evidence |
| P02 — Evidence method and chronology | W1; source register/ledger | `evidence.html#filing-timeline` (F01) | Filing lineage, authenticity and source-quality method |
| P03 — Efficiency decomposition | W1/W2 | `efficiency.html#task-and-financial-measures` (F02) | Distinct denominators, sourced adjustments and residuals |
| P04 — Open-model equivalency | W2/W3 | `equivalency.html#release-pairs` (F03) | Three clocks, censored pairs, quality/license caveats |
| P05 — Demand response | W4 | `rebound.html#elasticity-threshold` (F04) | Identification limits and explicit elasticity conventions |
| P06 — Provider/capacity economics | W1/W5 | `providers.html#commitment-exposure` (F05) | Contract risks, conditionality, archetypes and evidence gaps |
| P07 — Energy and location | W2/W6 | `impacts.html#location-coverage` (F06) | Operational boundaries, regional coverage and sensitivity |
| P08 — Deterministic futures | W4/W7 | `rebound.html#scenario-comparison` (F07) | Three scenario results, assumptions and reproducible manifests |
| P09 — Uncertainty and stress | W5/W6/W7 | `uncertainty.html#stress-boundaries` (F08) | Distributions, load-bearing inputs and bounded shock searches |
| P10 — Ethics and communities | W6 | `impacts.html#community-evidence` (F09) | Benefits/burdens, excluded impacts and stakeholder challenges |
| P11 — Discussion and limitations | All | `paper.html#p11` | What follows from evidence, what remains unknown, next tests |
| P12 — References and reproducibility | All | `paper.html#p12` | Source locators, dictionary, model card, manifest and review history |

**Status, 2026-11-28:** F04 and F07 now exist in `docs/rebound.html` as illustrative indexed, uncalibrated views awaiting review (T-023/T-025); company calibration still depends on T-014. Apart from the F01 chronology shell, the other planned routes remain unbuilt.

Each F01–F09 record must declare: paper section, purpose, caption, claim IDs, source/method locators, dataset/model/paper versions, evidence cutoff, deployed/planned status, accessible static table or explanation, and manifest ID for a simulated figure. Empirical figures without a run still pin their data and transformation version.

**Reader contract:** Inline citations open a source/claim locator; “Explore this result” opens the exact visual state, not the site's landing page. A replay reference identifies an immutable manifest, not just a seed; seed-only links omit potentially changed inputs. The view offers “Return to P08,” for example, and maintains the paper version. Missing historical manifests show an unavailable-state message and static result, never substitute today's model.

Use `?brand=<id>` as independent presentation state. It must not alter cited research or replay inputs. A PDF/print export contains prose, references, captions, static results, and written URLs/manifest IDs; it must not depend on clicking an interaction to understand a conclusion.

## 5. Architecture and planned layout

```text
official / licensed sources -> source register + immutable raw references
  -> extracted claims / contracts / pairs / factors -> validated derivations
    -> scenario manifests + shared figure records
      -> manuscript sections <-> Pages reader <-> dashboard views
                           -> review snapshot and static export
```

Existing research documents plus proposed later implementation artifacts:

```text
CONCEPT-IDEA.md, INITIAL-RESEARCH.md, SPECIFICATION.md, PLAN.md, BACKLOG.md
SOURCES.md, CLAIM-LEDGER.csv          current discovery records
paper/PAPER-DRAFT.md                 current manuscript source
research/INDEPENDENT-EVIDENCE.md     current scoped literature/method synthesis
DATA-DICTIONARY.md, MODEL-CARD.md     later, before model validation
data/{raw,extracted,derived}/        later, lawful source refs and typed data
research/                           further package notes with exact locators
paper/figures.json                  later, F01–F09 link/version records
models/, validation/                later, shared calculations and checks
docs/                              later, generated Pages reader and views
```

Do not create empty source/data folders or model stubs just to resemble a completed project.

## 6. Milestones and dependencies

| ID | Demonstrable outcome | Covers | Dependencies / target |
| --- | --- | --- | --- |
| M0 — Walking reader | Verified public URL with v0.4 attribution, paper-section navigation, explicit draft states and non-analytical placeholder links | US-06, US-08; FR-11/FR-15/FR-16 foundation | Narrow shell authorized by the author 2026-11-28; full specification/plan reviews remain pending |
| M1 — Evidence audit | Source register, checked filing passages, reconciled claim statuses, and P02 narrative; alternatively a claim-specific gap report | US-01; W1/W8 | Text intake complete; passage/definition/revision checks pending; independent of M0 |
| M2 — Research dossier and paper methods | W2–W6 evidence notes, task/pair/profile/factor records, written P01/P03–P07/P10 methods and limits | US-02, US-03, US-05; W2–W6/W8 | W1 governs company claims; other literature and public-source research can proceed independently |
| M3 — Paired paper/dashboard baseline | Three deterministic futures, F01–F07 static/interactive evidence views, P08 prose and manifests; no contradictory numbers | US-03–US-06/US-08; FR-02–FR-12/FR-15 | M0, validated M1/M2 data or explicit indexed assumptions, approved model dictionary |
| M4 — Uncertainty chapter | Seeded ensembles, three stress tests or explicit insufficient-evidence states, F08 and P09 | US-07; FR-13/FR-14 | M3 fixtures and disclosed input distributions/search constraints |
| M5 — Coordinated review package | Coherent P00–P12 paper, F01–F09, dashboard, references, versioned static snapshot, and consolidated review questions | All Must stories; FR-15/FR-16 | M2–M4 integration; initial human review before public analytical release |

M1 and the narrowly authorized M0 shell proceed independently. W2/W3 require a shared rubric before claiming task parity. W4 informs assumptions but does not automatically calibrate elasticity. W5/W6 bound stress and impact interpretations; unknowns prevent claims, not the writing of limitations. W8 runs alongside every package rather than waiting for M4.

**Access/review checkpoints:** yorkerhodes3 coordinates the next source-access and reviewer-assignment check by **2026-12-01** (proposed checkpoint, not a delivery promise). If full access is still unavailable, prioritize gap documentation and accessible literature; do not fill filing tables from snippets. Choose actual milestone dates after approval and availability confirmation.

### 6.1 Filing intake and remediation

The requested filing texts are received. Use the extracted material, not the original PDFs, as directed by the author on 2026-11-28. Continue the following remediation from completed file inventory:

1. **Inventory and preserve — completed for supplied scope:** Record filenames, size/hash, provider/receipt, stated official origin/accession/form/date. All 80 manifest-listed present files match their hashes/sizes. Preserve received text as data; leave the already uploaded PDF untouched. Hash matching is not independent source authentication.
2. **Check provenance and locate:** Inspect issuer, form, accession, date, captured indices and provenance headers. Capture text line/page/table locators and conversion uncertainties. The Amendment 1 join-check validates wording continuity, not numbers or table alignment. No PDF/HTML reacquisition prerequisite remains; keep claim-specific ambiguity explicit.
3. **Reconcile definitions and revisions:** Compare original, amendments, final prospectus and subsequent material filings through the cutoff. Separate expense from commitment, quarter from year-to-date, contingent from unconditional capacity, and original from superseded clauses. Track overlaps and unexplained residuals.
4. **Remediate claims:** Check CL-001–CL-005/CL-012 individually; record supported, contradicted, unresolved or superseded status, scope, reviewer and transformation. A discovery snippet is not evidence for an absent table. Corrections preserve lineage rather than overwrite the initial research record.
5. **Propagate to the coordinated reader:** Revise P02/P03/P06/P09, F01/F02/F05/F08 specifications, provider edges and any model inputs/results dependent on a changed claim. Mark downstream derivations/manifests stale until revalidated; do not silently reuse old assumptions.
6. **Revalidate and review:** Recompute affected transformations and checks, update coverage/cutoff/version explicitly, review financial interpretation, and record remaining blockers. Filing arrival does not complete W2–W6, authorize unsupported physical conversions, or waive the paper/dashboard review gates.

These steps correspond to T-010–T-014 in [BACKLOG.md](BACKLOG.md#next-evidence-reconstruction). T-010 is complete; interpretation and review are not. Calibration, counterparty attribution, energy and stress conclusions still require the relevant reconciled evidence and phase approvals.

## 7. Environments, deployment, and versioning

Pages root: `https://ethical-tech-colab.github.io/frontier-half-life/`. The first demo shell is authorized separately from analytical publication; deployment status is recorded in README after actual verification. The repository already serves Pages from **`main` at `/`**. Updating Pages settings to `gh-pages` was denied to this session token, so retain the existing configuration: a root `index.html` forwards to the static `docs/` shell, preserving the brand query and fragment. A no-JavaScript link opens the same shell.

The former `main`-root Pages build failed when Jekyll interpreted imported filing date metadata as invalid datetimes. Root `_config.yml` now excludes research captures, PDFs, paper/source documents, tests and tools from the public build. It leaves the static shell and its local assets available without rewriting source captures. Review documents and shell notes link to GitHub, not to publicly rendered source text.

Publication follows a reviewed source PR merged to `main`, using the existing Pages build. No Pages-admin permission or extra build dependency is required. An unused `gh-pages` artifact snapshot was created during the initial attempt; it is not the configured deployment source. Do not assume pushing to that branch publishes the site.

Verify real HTTP availability, section navigation, assets and brand behavior before reporting the site live. Future reader/model releases require reviewed source changes and their own reproducibility checks. M0 presents non-analytical summaries, not a completed paper rendering or replay engine.

**2026-11-28 deployment record:** PR #3 merged with explicit author authorization. GitHub Pages run `46100801021` succeeded, Pages reports `built`, and the downloaded artifact contains the exact locally checked root/shell/assets without research or source records. All 13 themes, section navigation and 375px layouts were exercised locally. Direct public HTTP/browser access is blocked by this environment, so remote browser verification remains unavailable rather than falsely claimed.

**2026-11-28 build sequence:** Each bundle was merged by PR and its Pages run checked before the next: #5 W1 filing reconstruction (run `46109275112`); #6 literature tranche 01 (`46109838588`); #7 live reader and claim inspector (`46110003099`); #8 literature integration (`46110189114`); #9 indexed rebound lab (`46110772364`); #10 commitment exposure and stress boundaries (`46111073334`); #11 status record (`46111280840`); #12 efficiency view, print export and navigation fix (`46111718524`); #13 demand-identification note (`46111848031`); #14 review-snapshot preparation (`46111922525`). All succeeded. Review snapshot r1 is tag `v0.4-review.1` on `a5a4156`, with PDFs at `docs/snapshots/v0.4-review.1/`. Creating a GitHub release returned 403 for this session token. The artifacts for #7 and #10 were downloaded and matched every published local file byte-for-byte, with research captures, manuscript source, tools, tests and Markdown excluded. Local headless-Chrome checks covered fonts, 375–1440px layouts, theme invariance and interactions. Public HTTP remains blocked here. Publishing the review draft is not an analytical release.

Show working version **v0.4**, initial author **yorkerhodes3**, dataset cutoff, and review state on the paper/dashboard and exports. Subsequent changes advance the version deliberately; a later retrieval date is not silently a later evidence cutoff. Archive paper+dataset+model+manifest compatibility at each review. Do not overwrite the original supplied research record.

## 8. Quality and research-to-paper integration

**Ready:** Each task has a bounded evidence question or UI behavior, spec reference, input dependencies, and exact acceptance conditions. **Done:** Artifacts are inspected, uncertainties recorded, corresponding paper section and figure references updated, reviewed/merged when shared, and no dependent claim falsely marked complete.

- Research: Check identity, source date, period, units, boundaries, provenance and licensing. Inspect relevant full source sections before authenticating figures; corroborate consequential inferences and retain disagreements.
- Data/model: Validate schemas, ID references, contract overlap, units, rubric versions, missing/zero distinctions, success/failure accounting, and numerical fixtures. Publish historical residuals, not forced fits.
- Paper: Every consequential number points to a claim/formula; each finding states evidence versus assumption. Check claim → paragraph → figure → manifest → inputs in both directions. Reviewer can annotate a stable section and claim ID.
- Reader: Check all source/section/return links, planned versus deployed states, no-JavaScript static reading, keyboard/contrast across 13 themes, and same-result theme switching.
- Replay: Identical versions/inputs/seed reproduce within published tolerance. Errors, canceled runs and unsupported versions remain explicit; no silent trial deletion.
- Performance planning targets: 375 px mobile readability; deterministic edits visible within 250 ms on the documented reference laptop; trial progress at least once per second and cancel response within one second. Start with at most 1,000 browser trials and a 10-second target on that laptop; profile before raising limits. These are proposed acceptance budgets, not measured performance.
- Review: Three actual reviewers spanning methods/finance and energy/ethics inspect the analytical package; one may cover multiple areas, but record scope. Unresolved release blockers stop publication. PR approval for code is not scientific validation.

## 9. Risks and explicit pivots

| Risk | Trigger | Action |
| --- | --- | --- |
| Primary-source access / unverifiable anchor | DNS failures persist at access checkpoint or full passages cannot be authenticated | Preserve unknowns; deliver evidence-gap paper section and uncalibrated indexed scenarios rather than company findings |
| False commercial parity | Benchmark match lacks task/production support | Keep three clocks separate, censor unmatched records, and constrain claims to the observed workload |
| Paper and dashboard drift | Different values/version/state for the same F/CL identifier | Block integration; regenerate from shared evidence/manifest and update both before review |
| Unsupported regional allocation | Capacity location/factor coverage inadequate | Publish coverage/gaps; do not invent regional totals or community thresholds |
| Scope and reviewer bottlenecks | Evidence packages or reviewers exceed availability | Split acquisition by bounded source batch; cut deferred extras; label partial manuscript rather than fabricate completion |
| Pages unavailable / link rot | Deployment ineligible or citation/replay inaccessible | Local/static exports plus explicit broken-state notice; never advertise planned targets as live |
| Biased narratives | Only supporting studies or matched release pairs included | Search competing results; retain censored pairs and a disconfirmation section |

## 10. Effort and scope cuts

Planning estimates, not commitments: M0 **4–8 h**, M1 **12–20 h**, M2 **40–64 h**, M3 **24–40 h**, M4 **20–32 h**, M5 **12–20 h** of active work. Total **112–184 h**, or **168–276 h** with the guide's 1.5× buffer. Estimates cover bounded initial cohorts and iteration, not full industry coverage; access and external-review waiting time are additional.

At an illustrative 10 active hours/week, this is approximately 17–28 weeks. No weekly capacity or deadline has been supplied; schedule dates are selected at plan approval. Start paper writing in M1/M2 so review need not wait for the full dashboard.

Cut agent-based markets, comprehensive maps, extra provider cohorts and 2035/lifecycle extensions first. If needed, present stochastic results as a clearly deferred chapter and ship a **partial v0.4 review draft**, not a falsely complete substantive package. Never cut provenance, uncertainty, author credit, readable static paper, or the explicit release gate.

## Reviewer sign-off

- [x] Revised specification reviewed and approved 2026-11-28.
- [x] Paper and dashboard are equal deliverables with section-level evidence dependencies.
- [x] Milestones, estimates, ownership, access checkpoints and scope cuts are accepted for planning.
- [x] All Must stories and original research streams have a place or an explicit deferral.
- [x] Link/version/replay contract, research authenticity, and publication gates are acceptable.

**Reviewer:** yorkerhodes3

**Date:** 2026-11-28

**Verdict:** `Approved`

**Reviewer notes:** The author selected “Approve the v0.4 plan and backlog” after receiving links to the coordinated plan and its task companion. This approves the sequence and scoped implementation, not the truth of unreconciled financial claims, unavailable model results, or public analytical release.
