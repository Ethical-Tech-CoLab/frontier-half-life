# PLAN: Coordinated research, paper, and dashboard — v0.4

| Field | Value |
| --- | --- |
| Status | Draft requested by the author; specification and plan reviews pending |
| Starting working version | v0.4; advance explicitly, not automatically to v1 |
| Initial author / coordinator | yorkerhodes3 |
| Input | [SPECIFICATION.md](SPECIFICATION.md), revised v0.4 draft |
| Companions | [BACKLOG.md](BACKLOG.md), [paper/PAPER-DRAFT.md](paper/PAPER-DRAFT.md), [SOURCES.md](SOURCES.md) |
| Last updated | 2026-11-27 |

## 1. Approach and deliverable contract

Treat **the coordinated paper draft for review and the dashboard as equal primary deliverables**. Research produces traceable evidence; each completed evidence tranche updates the relevant manuscript section, figure/interaction specification, and dashboard data together. The paper is the reader's entry point to the argument, not a report written after the interface. Its contextual links open specific evidence or reproducible scenarios, then return the reader to the invoking section.

The author requested planning now; the specification and this plan remain review drafts. Read-only source discovery and the provisional manuscript have begun. No website/model implementation, paid acquisition, deployment, or public analytical release is authorized by this plan draft. Follow the startup guide's review gates before building.

**Current research state:** [The source-access record](SOURCES.md#access-and-evidence-policy) and [independent synthesis](research/INDEPENDENT-EVIDENCE.md) contain indexed official/original-source leads, scoped literature summaries and checked analytical fixtures. Direct primary retrieval remains blocked by DNS. The [claim ledger](CLAIM-LEDGER.csv) preserves unresolved verification, including all six initial filing-portfolio leads; derived fixtures are separately labeled. This is not completed financial reconstruction or a completed literature review.

On 2026-11-27 the author confirmed they are gathering the necessary filings and directed the remaining work to proceed. This authorizes independent research and draft preparation, **not** invented company evidence, completed review verdicts, or site/model implementation. Filing-dependent sections remain blocked until the intake/remediation below.

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
| M0 — Walking reader | Verified public URL with v0.4 attribution, readable paper contents, explicit draft states and non-analytical placeholder links | US-06, US-08; FR-11/FR-15/FR-16 foundation | Specification/plan approvals and Pages eligibility; first build milestone |
| M1 — Evidence audit | Source register, authenticated filing passages where available, reconciled claim statuses, and P02 narrative; alternatively an explicit gap report | US-01; W1/W8 | Access resolution; not dependent on M0 or UI |
| M2 — Research dossier and paper methods | W2–W6 evidence notes, task/pair/profile/factor records, written P01/P03–P07/P10 methods and limits | US-02, US-03, US-05; W2–W6/W8 | W1 governs company claims; other literature and public-source research can proceed independently |
| M3 — Paired paper/dashboard baseline | Three deterministic futures, F01–F07 static/interactive evidence views, P08 prose and manifests; no contradictory numbers | US-03–US-06/US-08; FR-02–FR-12/FR-15 | M0, validated M1/M2 data or explicit indexed assumptions, approved model dictionary |
| M4 — Uncertainty chapter | Seeded ensembles, three stress tests or explicit insufficient-evidence states, F08 and P09 | US-07; FR-13/FR-14 | M3 fixtures and disclosed input distributions/search constraints |
| M5 — Coordinated review package | Coherent P00–P12 paper, F01–F09, dashboard, references, versioned static snapshot, and consolidated review questions | All Must stories; FR-15/FR-16 | M2–M4 integration; initial human review before public analytical release |

M1 and the M0 skeleton can proceed independently after the relevant gates. W2/W3 require a shared rubric before claiming task parity. W4 informs assumptions but does not automatically calibrate elasticity. W5/W6 bound stress and impact interpretations; unknowns prevent claims, not the writing of limitations. W8 runs alongside every package rather than waiting for M4.

**Access/review checkpoints:** yorkerhodes3 coordinates the next source-access and reviewer-assignment check by **2026-12-01** (proposed checkpoint, not a delivery promise). If full access is still unavailable, prioritize gap documentation and accessible literature; do not fill filing tables from snippets. Choose actual milestone dates after approval and availability confirmation.

### 6.1 Filing intake and remediation

The necessary documents are a hard evidence dependency, not an optional final citation pass. When the author supplies the original S-1, amendment(s), final prospectus and relevant exhibits:

1. **Inventory and preserve:** Record original filenames, size/hash, provider and receipt date, official origin/accession/form/date, and any missing documents. Preserve originals as data; never execute embedded content. Confirm redistribution rights before committing full copies.
2. **Authenticate and locate:** Inspect issuer, form, accession, filing date and completeness; match official records or documented official download provenance. Uploaded files are not automatically authenticated. Capture page/table/section locators and extraction/OCR uncertainties.
3. **Reconcile definitions and revisions:** Compare original, amendments, final prospectus and subsequent material filings through the cutoff. Separate expense from commitment, quarter from year-to-date, contingent from unconditional capacity, and original from superseded clauses. Track overlaps and unexplained residuals.
4. **Remediate claims:** Check CL-001–CL-005/CL-012 individually; record supported, contradicted, unresolved or superseded status, scope, reviewer and transformation. A discovery snippet is not evidence for an absent table. Corrections preserve lineage rather than overwrite the initial research record.
5. **Propagate to the coordinated reader:** Revise P02/P03/P06/P09, F01/F02/F05/F08 specifications, provider edges and any model inputs/results dependent on a changed claim. Mark downstream derivations/manifests stale until revalidated; do not silently reuse old assumptions.
6. **Revalidate and review:** Recompute affected transformations and checks, update coverage/cutoff/version explicitly, review financial interpretation, and record remaining blockers. Filing arrival does not complete W2–W6, authorize unsupported physical conversions, or waive the paper/dashboard review gates.

These steps correspond to T-010–T-014 in [BACKLOG.md](BACKLOG.md#next-evidence-reconstruction). W2/W3/W4/W6 literature, rubrics, analytical derivations and manuscript methods can continue independently; Anthropic calibration, actual counterparty attribution, company-energy estimates and empirical financial stress conclusions cannot.

## 7. Environments, deployment, and versioning

Planned Pages root: `https://ethical-tech-colab.github.io/frontier-half-life/`; **not deployed or verified in this work**. Confirm repository Pages settings/eligibility before M0. Use local static preview and generated artifacts when hosting is unavailable; record that a deployment blocker remains.

On reviewed merges, generate the reader from manuscript/evidence, run link and reproducibility checks, then deploy `docs/` through the approved Pages configuration. Verify HTTP availability, section fragments, assets, and replay before marking a URL live. M0 may show draft prose and planned states; it does not waive review of analytical conclusions.

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

- [ ] Revised specification reviewed before this plan is approved.
- [ ] Paper and dashboard are equal deliverables with section-level evidence dependencies.
- [ ] Milestones, estimates, ownership, access checkpoints and scope cuts are realistic.
- [ ] All Must stories and original research streams have a place or an explicit deferral.
- [ ] Link/version/replay contract, research authenticity, and publication gates are acceptable.

**Verdict:** Pending human review. Drafting this plan records the request, not approval to implement it.
