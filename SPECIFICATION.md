# SPECIFICATION: Models, Megawatts, and Moats

> **Purpose:** Define research outputs and site behavior precisely enough to review before planning.
> **Input:** The approved [CONCEPT-IDEA.md](CONCEPT-IDEA.md).
> **Rule:** This is a specification draft, not permission to build or publish analytical findings.

**2026-11-28 scoped authorization:** The author requested a first non-analytical demo shell on Pages in parallel with document updates. Navigation, 13-theme styling, section summaries and received-text status may ship under that exception. This is not approval of the complete specification, calibrated models or public analytical conclusions.

| Field | Value |
| --- | --- |
| Status | Draft — human specification review required |
| Concept doc | [CONCEPT-IDEA.md](CONCEPT-IDEA.md), approved 2026-11-27 |
| Initial author | yorkerhodes3 |
| Drafting support | AI assistance; human review required |
| Reviewer(s) | Author review pending; specialist release reviewers not yet assigned |
| Working version | v0.4 — update as work proceeds |
| Last updated | 2026-11-28 |

## 1. Summary

The project studies how open-model catch-up and falling cost per useful AI task interact with demand, capacity economics, and operational environmental impacts. Anthropic is an evidence-conditional company anchor, not a proxy for the entire sector; OpenAI is a closed-model comparison only where public evidence is comparable. The site connects evidence to adjustable scenarios without turning unverified claims or illustrative assumptions into forecasts.

`INITIAL-RESEARCH.md` remains the initial research record. This specification inherits the narrower approved concept; it does not adopt all of the original's modules as initial-release requirements.

## 2. Goals and non-goals

**v0.4 goals:** Deliver a coordinated, evidence-backed paper draft for review **alongside** the dashboard. The paper is a live linked research reader, not a secondary download: its sections cite source passages, derived results, and versioned visuals or reproducible interactions on Pages. Publish a reviewable evidence package, compare quality-defined workloads and model catch-up clocks, demonstrate three deterministic rebound futures, and then add reproducible Monte Carlo analysis and three reverse stress tests.

v0.4 is the starting working version, not a claim of maturity or an automatic release. Paper, dashboard, evidence, and manifests display compatible versions and cutoffs; preserve review snapshots and advance labels explicitly as the work proceeds.

Delivery is staged, not permission to skip review:

| Stage | Required outputs | Boundary |
| --- | --- | --- |
| Evidence preparation | Source audit, claim ledger, metric dictionary, release-pair records, continuously written paper sections, and documented gaps | Unverified leads are explicitly labeled; no claim of calibrated findings |
| First research prototype | Evidence-first static site, provider profiles, deterministic scenario comparison, uncertainty inspection, and 13 themes | No accounts, private uploads, paid services, or live provider calls |
| Coordinated v0.4 review package | Prototype plus seeded Monte Carlo, three stress tests, model documentation, linked paper draft, and reviewer records | Requires review before analytical release; simulations remain exploratory |

**Non-goals:** Agent-based market simulation, comprehensive provider/facility maps, provider rankings, general-purpose chat equivalency, annual forecasts through 2035, investment recommendations, production procurement tools, full-lifecycle impact totals, and agent-selected community acceptability thresholds.

## 3. Users and permissions

| Role | Can do | Cannot do |
| --- | --- | --- |
| Public visitor / researcher | Read evidence, change local scenario parameters and theme, inspect provenance, download public datasets and run manifests | Edit published records, submit private data, or trigger remote model/provider calls |
| Repository contributor | Propose source, data, or assumption corrections through normal repository contribution channels | Publish changes or mark claims reviewed merely by editing browser state |
| Maintainer / author | Review and merge repository changes under repository permissions; record document verdicts | Bypass methodological and release gates by changing a theme or importing a manifest |
| Specialist / affected-stakeholder reviewer | Challenge methods, boundaries, and impacts through documented review | Be represented as having approved a threshold without an actual recorded verdict |

The site has no separate authentication system. Repository permissions govern writes; public hosting serves only reviewed public artifacts.

## 4. User stories

Every story is a **Must** for its stated stage; deferred modules in §2 are not hidden v0.4 commitments.

| ID | Story | Stage |
| --- | --- | --- |
| US-01 | As a researcher, I want to authenticate sources and inspect claim status so I can distinguish evidence from leads. | Evidence |
| US-02 | As a researcher, I want task-specific release comparisons so I can test rather than assume a six-month lead. | Evidence |
| US-03 | As an analyst, I want distinct financial, task, capacity, and energy measures so I do not mistake one denominator for another. | Prototype |
| US-04 | As a researcher, I want to compare three adjustable futures and replay a run so I can challenge its assumptions. | Prototype |
| US-05 | As a reader, I want provider archetypes, documented geography, and impact gaps so I can see the limits of coverage. | Prototype |
| US-06 | As a demonstrator, I want independent, accessible brand styling so I can present the same research in different themes. | Prototype |
| US-07 | As a researcher, I want seeded distributions and explicit stress boundaries so I can explore uncertainty without confusing it with probability-calibrated prediction. | Coordinated v0.4 |
| US-08 | As a reader/reviewer, I want the paper's argument linked to evidence, methods, and specific reproducible Pages visuals so I can read, explore, and contest the same research. | All |

## 5. Functional requirements

| ID | Requirement | Stories | Acceptance criteria |
| --- | --- | --- | --- |
| FR-01 | Record authentication and access outcomes separately for every source used by a consequential claim. | US-01 | A blocked filing URL remains an access failure, not a finding of fabrication; issuer, document identifier, date, and passage must be authenticated before its claim is presented as verified. |
| FR-02 | Expose classification, verification state, confidence, units, period, provenance, and caveats independently. | US-01, US-08 | An unverified number from the initial draft stays unverified even with a source URL. A derived result opens its formula and input chain; estimates cannot acquire verified styling merely through calculation. |
| FR-03 | Compare releases against a versioned workload rubric and retain unmatched frontier releases. | US-02 | A pair displays benchmark, workload, and commercial catch-up separately. No match by the cutoff displays “not observed by cutoff,” not zero months or an omitted record. |
| FR-04 | Keep financial and physical measures separate and reject incompatible comparisons. | US-03 | Compute/revenue is not labeled gross margin or energy efficiency. Different units, periods, quality thresholds, or accounting boundaries produce a comparability warning, not an unqualified ranking. |
| FR-05 | Calculate attempted work and facility energy from declared workload assumptions. | US-03, US-04 | The numerical fixtures in §8 pass. Retries are counted once; zero-success workloads cannot produce finite cost per successful task. Missing energy inputs produce unknown absolute energy, not zero. |
| FR-06 | Compare efficient abundance, rebound acceleration, and demand air pocket / open-model substitution. | US-04 | Each preset declares its inputs as scenarios. Editing price, elasticity, success rate, or IT intensity updates results and sensitivity; no preset contains invented company calibration. |
| FR-07 | Export and import a versioned run manifest. | US-04, US-07 | A compatible manifest reproduces inputs, results, evidence versions, and seeds within documented numerical tolerance. Invalid or unsupported manifests show errors without replacing the current run. |
| FR-08 | Show the seven research-candidate profiles with archetype and unknown fields. | US-05 | CoreWeave, Nebius, Lambda, and Crusoe appear as infrastructure candidates; Together AI, Fireworks AI, and Baseten as managed-inference candidates. An unsupported Anthropic relationship is never inferred. |
| FR-09 | Preserve geography, operational boundaries, and evidence coverage in impact outputs. | US-05 | Unlocated capacity stays separate. Regional totals disclose included/excluded coverage and do not apply US factors to non-US commitments or double-count lab/provider/facility load. |
| FR-10 | Separate empirical impact values from sensitivity assumptions. | US-03, US-05 | Average and marginal emissions are distinct. Missing marginal or water data display unknown; an assumed range is visibly a scenario. Embodied and community impacts remain separate from operational totals. |
| FR-11 | Offer all 13 specified themes without changing research state. | US-06 | Switching every theme leaves datasets, parameters, seeds, and results unchanged. `?brand=<id>` survives navigation; an unknown ID produces CoLab plus a visible explanation. |
| FR-12 | Store theme metadata and enforce accessible, non-affiliated styling. | US-06 | Each theme has sources, confidence, licensing notes, and no company logo. Evidence states are text-labeled; contrast and keyboard checks in §9 pass for every preset. |
| FR-13 | Run reproducible Monte Carlo trials with disclosed input distributions and correlations. | US-07 | The same manifest and seed reproduce the ensemble. P10/P50/P90 and sample count are disclosed; assumed distributions and unsupported correlations are not labeled measured probabilities. Trial errors are counted and reported, never silently dropped. |
| FR-14 | Evaluate the three approved reverse stress boundaries. | US-07 | Adjustable 60% compute-cost pressure and 60% capacity-use triggers require four consecutive quarters. Regional power requires documented deliverable supply. Missing inputs yield insufficient evidence; no discovered breach yields “none found within searched domain,” not “safe.” |
| FR-15 | Deliver the paper as a live linked research reader with a correction trail. | US-01, US-08 | Every consequential paper claim resolves to ledger evidence or a formula. Each supporting figure/interaction has a stable paper-section anchor, Pages destination, dataset/model version, and replay manifest when applicable, plus caption, accessible explanation, and a static fallback. Return links identify the invoking paper section. Unbuilt interactions are visibly planned, not represented as deployed. Revisions preserve IDs, attribution, supersession, and actual review records. |
| FR-16 | Display and enforce document/release gates. | US-08 | A draft is visibly draft. Public analytical release requires three documented reviewers and resolution of blocking findings; disclosing an unresolved blocker does not authorize release. Concept approval is never represented as specification or specialist approval. |

## 6. Screens and states

All data-bearing views show the dataset version and cutoff. Loading state identifies the pending artifact; failure identifies what failed and offers retry or a versioned download where available. A failed artifact must not be replaced with invented sample data.

| View | Shows / actions | Empty state | Error state |
| --- | --- | --- | --- |
| Research overview | Human question, scope, review status, paper and dataset downloads, theme switcher | “Evidence preparation in progress”; link to the concept and known gaps | Unavailable artifact is labeled unavailable; existing validated content remains readable |
| Live paper reader | yorkerhodes3 attribution, v0.4/version history, contents, stable section IDs, inline citations, figure captions and contextual exploration links | Unwritten results are labeled awaiting evidence, with a research-task reference | Missing visual or replay displays an explanation and static caption/table; the paper's argument remains readable without JavaScript |
| Evidence room / inspector | Claims, financial measures, provenance, amendment history, verification filters | Distinguish no records from no filter matches; offer reset | Broken source access is reported separately from claim validity; missing required provenance blocks verified presentation |
| Equivalency explorer | Workload rubric, releases, three clocks, unmatched records, licensing and serving caveats | No comparable pair or no observed match by cutoff | Incompatible rubric/version or dates prevent that comparison and explain why |
| Rebound lab | Three futures, editable inputs, indexed/absolute results, sensitivity and manifest controls | No baseline means no company calibration; an explicitly illustrative indexed scenario may be selected | Invalid inputs show field-level errors and withhold affected results; previous output is labeled stale, not current |
| Providers and impacts | Archetypes, sourced commitments, coverage, operational electricity/emissions, water and qualitative gaps | Unknown metrics and locations stay visible | Incompatible boundary or missing geography blocks the affected total, not unrelated evidence |
| Uncertainty / stress workbench | Trial count, distributions, seeds, quantiles, thresholds, shock search domain | No trials yet / stress test not evaluable | Failed trials and search limits are explicit; no “minimal” claim without the method and domain |

## 7. Data model

All artifacts use stable IDs and a schema version. Null means unknown, not zero. Every consequential numerical record carries units, period, system boundary, and source/assumption references. The concrete file layouts belong in the later plan and metric dictionary.

| Record | Required fields and meanings | Optional / conditional fields |
| --- | --- | --- |
| Source | `source_id`, URL, document identifier, issuer, source/retrieval dates, `access_status`, `authentication_state`, locator | Archive/hash where lawful; access-error details; superseded document reference |
| Claim / observation | `claim_id`, exact text, entity, metric, units, period, boundary, classification, verification state, confidence, caveats | Numerical value/range; source IDs and passages for sourced claims; formula and input IDs for derived values; reviewer/date when reviewed |
| Workload | `workload_id`, category, versioned rubric, required success criterion, attempt/retry definition, task-set reference | Tool/step budget for agents; evaluation license and known limitations |
| Model release / pair | IDs, model family, release date, closed/open-weight status, frontier reference, workload/rubric version, cutoff | Observed match dates by clock, evaluation claims, quantization/hardware/serving details, license constraints, missing-match status |
| Provider / commitment | Provider ID, name, archetype; commitment ID, counterparties, source references, instrument and period when evidenced | Capacity/unit, delivery dates, location, financing/cancellation conditions, amendment/overlap links; unknown relationship status |
| Regional factor | ID, location, period, factor type, units, operational boundary, source or scenario reference | Average/marginal designation, uncertainty, coverage and excluded-load notes |
| Assumption / scenario | ID, workload and period, parameter value/range, units, rationale, evidence status, version | Distribution, correlation, routing and capacity-allocation assumptions; reviewer record |
| Run manifest | Schema/model/dataset versions, cutoff, scenarios, parameters, boundaries, results/status, numerical tolerance | Seeds, trial settings, failures, quantiles, stress thresholds, shock domain and algorithm for applicable methods |
| Theme | Stable ID, name, visual tokens, source URLs, confidence, font/license notes, non-affiliation disclaimer | Local selected-theme preference; no research parameters |
| Paper section / figure / review | Stable section/figure IDs, title, initial author, paper/artifact version, claim and method references, caption and static fallback for figures, review scope and actual verdict/date when given | Pages target/status, return section, manifest/dataset/model references for interactive results, unresolved findings, public reviewer identity with consent, correction/supersession records |

Claim classifications: `reported`, `derived`, `estimated`, `assumed`, `scenario`. Verification states: `verified`, `corroborated`, `unknown`, `contested`. Confidence is separately `high`, `medium`, `low`, or `unassessed`, with a rationale. Derived classification does not automatically establish direct primary-source verification.

Claims reference sources and derivation inputs; pairs reference releases, workloads, and evaluation claims; scenarios reference assumptions; runs reference immutable artifact versions. Dangling references are validation errors.

**Retention / deletion:** Public research versions remain traceable under their licenses; source archives are retained only where redistribution is permitted. No visitor identity, telemetry, or private uploads are collected. Local theme/scenario preferences can be cleared in the site and browser; clearing them does not delete repository artifacts or a visitor's downloaded files. Public correction records do not request sensitive information.

## 8. Modeling rules and edge cases

For each workload and quarter, define baseline desired successful tasks `S0`, baseline/new price per successful task `P0/P1`, nonnegative elasticity magnitude `e`, positive success rate `s`, IT kWh per attempt `I`, and facility PUE `p`:

```text
successful demand S1 = S0 × (P1 / P0)^(-e)
attempts A1 = S1 / s
facility energy E1 = A1 × I × p
```

Declare baseline demand and exogenous growth independently by quarter; do not apply the price response repeatedly to a baseline that already includes it. Provider/model allocation shares, when modeled, partition successful demand and sum to one before applying each route's success rate and energy intensity.

- Coding requires predefined functional tests; extraction requires a predefined accuracy rubric; agents require an end goal and step/tool budget. Include failed attempts and retries in totals, including provider charges and task costs.
- Prices must be finite and positive for this elasticity formula; `0 < s <= 1`, `I >= 0`, `p >= 1`, and task volumes are nonnegative. A free-price scenario needs a separately specified demand model; do not approximate division by zero with a tiny constant.
- Fixtures: with `S0=100`, `s=0.5`, `I=0.01`, `p=1.2`, and unchanged price, energy is **2.4 kWh**. Halving price and `I` with `e=1` and unchanged `s/p` leaves energy at **2.4 kWh**; with `e=2`, energy is **4.8 kWh**. These are synthetic verification fixtures, not research observations.
- When success rate is zero, attempts per successful task and successful-task costs are undefined; explicitly report the failure. Missing absolute inputs permit only a labeled indexed scenario, not a purported empirical kWh total.
- Stress boundaries are strictly `>60%` expense/revenue, `<60%` committed-capacity use, and required load `>` deliverable supply. Four-quarter continuity requires comparable consecutive quarters; missing quarters interrupt evaluation. These are illustrative triggers, not financial or community viability certifications.
- Quantitative commitment totals reconcile amendments, overlaps, conditionality, delivery dates, and units. Duplicate IDs fail validation; amended records supersede without erasing lineage.
- Reconcile historical financial periods only when verified definitions match. Keep unexplained residuals and unavailable quarters visible.
- File import is limited to a public scenario manifest, maximum 1 MiB. Reject incompatible schemas, nonfinite values, broken references, and executable content; imports never modify published evidence. No arbitrary uploads or visitor-provided endpoints.

## 9. Non-functional requirements

| Category | Testable requirement |
| --- | --- |
| Accessibility | Every theme: normal text contrast at least 4.5:1; controls at least 3:1 where required; labeled inputs, visible keyboard focus, and keyboard-completable happy path. Evidence states never rely on color alone. |
| Devices / browsers | Demonstrate the happy path in current stable Chrome, Firefox, Edge, and Safari; no page-level horizontal scrolling at 375 px except explicitly scrollable data tables. |
| Reproducibility | Published synthetic fixtures and compatible manifest replays pass with documented tolerance; publish engine/dataset versions and random algorithm for seeded methods. |
| Privacy / security | No analytics, accounts, private uploads, credentials, or live provider calls. Treat imported fields and source text as data, never executable HTML or commands. |
| Performance | Parameter edits do not freeze navigation; long trials expose progress and cancellation. Trial limits and measurable timing budgets must be set in the plan before implementing stochastic runs. |
| Cost / availability | Zero-incremental-spend starting constraint; static hosting is best-effort, not an SLA. Source or hosting outages show explicit states rather than changing evidence or producing fake success. |
| Licensing | Original work uses MIT. Third-party documents, model weights, fonts, and brand assets retain their own terms; no unauthorized redistribution or implied endorsement. |

## 10. External dependencies

| Dependency | Use | Account / spend | Unavailable behavior |
| --- | --- | --- | --- |
| GitHub repository and optional Pages | Version control, review, public static hosting | Existing repository access; Pages eligibility checked in planning; no new paid service | Local static viewing and versioned artifacts remain usable; do not assume deployment succeeded |
| SEC / official issuer and counterparty sources | Authenticate filings and disclosures | Public access subject to terms and access limits | Record access issue, seek another official path, and keep affected claims unverified |
| Public evaluation, grid, regulatory, and research sources | Workload comparisons and regional factors | Public or appropriately licensed evidence only | Unknown or labeled sensitivity scenario; no guessed measured inputs |
| Self-hosted fonts / theme references | Illustrative styling | Licensed assets and cited provenance | Licensed system-font fallback; no external font tracking |

## 11. Definition of done for the coordinated v0.4 package

- [ ] Specification approved, then PLAN + BACKLOG separately reviewed before implementation.
- [ ] Every staged Must story demonstrated against its requirements; synthetic fixtures and manifest replay validated.
- [ ] Source audit, claim ledger, dictionary, release-pair evidence, model documentation, and working paper agree on versions and boundaries.
- [ ] All consequential published claims trace to evidence or a formula; unknowns, uncertainty, and corrections remain visible.
- [ ] A coherent paper draft is reviewable end to end, with section-level evidence/method references and contextual Pages links that reproduce the cited visuals and assumptions.
- [ ] Paper and dashboard display yorkerhodes3 initial attribution and compatible version/cutoff labels; static reading and archived review snapshots remain available as the live work changes.
- [ ] Three reviewers can identify the assumptions behind outputs; blocking release findings are resolved or explicitly prevent analytical release.
- [ ] A first-time reader completes evidence → assumptions → comparison → provenance without assistance.
- [ ] All 13 themes pass accessibility and research-invariance checks; no affiliation claims.
- [ ] Public release is deployed at a verified URL with reproducibility downloads and README instructions, subject to the release gate.

## 12. Open questions carried forward

These are explicit research/planning dependencies, not requests to invent missing evidence. The three most uncertain areas are source availability/comparability, workload equivalency rubrics, and impact coverage.

| ID | Question / required decision | Owner role | Needed by |
| --- | --- | --- | --- |
| OQ-01 | Can the initial filing claims be authenticated and compared? If not, activate the concept's evidence-gap path. | Research lead | Before historical calibration |
| OQ-02 | Which licensed task sets, extraction thresholds, and agent budgets define each versioned rubric? | Research lead + methodological reviewer | Before release-pair evaluation |
| OQ-03 | What fraction of commitments can be located, and where are marginal/water factors defensible? | Infrastructure/energy reviewer | Before regional numerical claims |
| OQ-04 | What workload-specific distributions, correlations, and shock domains have evidence or must remain assumptions? | Modeling reviewer | Before stochastic/stress publication |
| OQ-05 | Are the illustrative stress triggers useful, and which actual contract/community boundaries require separate review? | Author + relevant specialist/stakeholder | Before publishing those stress interpretations |
| OQ-06 | Who are the three release reviewers, and what are milestone dates, scope cuts, Pages eligibility, and browser-run budgets? | Author / maintainer | PLAN + BACKLOG review |
| OQ-07 | What sourced Anthropic approximation and licensed fonts satisfy the 13-theme requirement? | Design contributor + reviewer | Before theme implementation |

**2026-11-28 filing handoff:** The requested text captures, including Amendment 3's new exhibits and the November 25 8-K, are received. The author directed use of extracted text and asked to skip original PDFs; no PDF/HTML retrieval dependency remains. OQ-01 now concerns claim-specific reconciliation and interpretation, not file acquisition. Follow [PLAN §6.1](PLAN.md#61-filing-intake-and-remediation); hash matching and a word-only join check do not verify every financial table.

## Reviewer sign-off

- [ ] Every Must story maps to a testable functional requirement.
- [ ] Data fields cover the views, provenance, and replay requirements.
- [ ] Empty, loading, invalid-input, and unavailable-evidence paths are specified.
- [ ] Workload, financial, energy, and geographic boundaries match the approved concept.
- [ ] Stage scope, cost constraints, privacy, accessibility, and licensing are acceptable.
- [ ] Open research dependencies and illustrative thresholds are not presented as resolved evidence.
- [ ] The definition of done and remaining planning decisions are realistic.

**Reviewer:** Pending human specification review

**Date:** Not yet reviewed

**Verdict:** Pending — no specification approval recorded

**Reviewer notes:** Record `Approved`, `Approved with changes`, or `Needs rework` after review. Only an approved specification advances to PLAN + BACKLOG; this document does not authorize implementation.
