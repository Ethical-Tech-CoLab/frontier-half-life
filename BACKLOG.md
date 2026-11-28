# BACKLOG: Research, paper, and dashboard — v0.4

| Field | Value |
| --- | --- |
| Initial author / coordinator | yorkerhodes3 |
| Last groomed | 2026-11-28 |
| Current milestone | M0 demo shell published; M1 text reconstruction drafted, awaiting authentication and financial review |
| Status | Specification, plan and backlog approved 2026-11-28; claim/release review still required |

IDs are stable. **S** means less than an hour of active work; **M** means a few hours. These are proposed sizes, not measured effort. Tasks larger than a source batch or one view must be split before work. Dependencies are explicit, not inferred from order. References point to [SPECIFICATION.md](SPECIFICATION.md) requirements and [PLAN §3](PLAN.md#3-evidence-work-packages) work packages. Drafted artifacts are not marked reviewed or merged merely because they exist.

## Now — independent research and document review

| ID | Task | Ref | Size / state | Acceptance / dependency |
| --- | --- | --- | --- | --- |
| T-001 | Review revised v0.4 specification, including live-reader and evidence boundaries | FR-15, FR-16 | M / done | Author approved 2026-11-28; source access does not waive claim or release review |
| T-002 | Review coordinated plan, backlog, milestones and paper-section dependencies | FR-16; W8 | M / done | Author separately approved 2026-11-28 after specification approval; not inferred from drafting request |
| T-003 | Inspect full UKERC review and Masanet methods once public access works | FR-01, FR-02; W4 | M / blocked by independent-source access | Capture sections/limitations and supporting or contrary findings; revise R01/P01 without borrowing AI elasticities |
| T-004 | Inspect inference-energy and SWE-bench method/version/annotation records | FR-03, FR-04; W2 | M / blocked by independent-source access | Record task/hardware/harness/license boundaries; revise R02/P03/P04; no invented current frontier-energy inputs |
| T-005 | Define proposed coding, extraction and bounded-agent rubrics for reviewer selection | FR-03, FR-05; W2 | M / draft / review | Draft rubric `0.4-draft` is in [research/WORKLOAD-RUBRICS.md](research/WORKLOAD-RUBRICS.md), built from the R02 proposals and [literature tranche 01](research/LITERATURE-TRANCHE-01.md). Every threshold, budget and task-set choice remains a proposal for the OQ-02 decision. Task-set licences and versions are not inspected (pending). Not adopted until a reviewer records a verdict |
| T-006 | Review reader prose and citation/figure links as a coordinated artifact | FR-15; W8 | M / review — now readable on Pages (`paper.html`) | P00–P12 are readable without interactions; F01–F09 and every empirical claim have support or explicit gaps; do not promote provisional summaries to findings |

The author authorized a narrow non-analytical demo-shell/Pages exception on 2026-11-28. T-020–T-022 and shell-only theme work may proceed under it. Complete analytical models and later implementation still wait for T-001/T-002 and the relevant evidence.

<a id="next-evidence-reconstruction"></a>
## Next — evidence reconstruction

The requested texts are received; T-010 is complete for this scope. T-011–T-014 now have a reproducible text-based draft in [the W1 reconstruction](research/W1-FILING-RECONSTRUCTION.md) (`node tools/extract-filing-facts.mjs --check`). Review, not further extraction, is the next step for the selected claims.

| ID | Task | Ref / package | Size | Depends on / acceptance |
| --- | --- | --- | --- | --- |
| T-010 | Inventory S-1, three amendments, final prospectus, 8-K and requested exhibits | FR-01; W1 | S / done | All 80 manifest-listed present files hash/size matched; selected text intake complete; see intake review |
| T-011 | Authenticate filing identities and enumerate changes through cutoff | FR-01, FR-02; W1 | M / review | Internal identity/chronology and per-version change lineage drafted ([W1 §2](research/W1-FILING-RECONSTRUCTION.md#w1-identity)); origin authentication still blocked by SEC network access or needs author attestation plus reviewer record |
| T-012 | Reconstruct revenue and compute/infrastructure definitions for one source batch | FR-02, FR-04; W1 | M / review | Seven quarters, annual and nine-month values located with footings and recomputed ratios; definition and 2026 composition change recorded ([W1 §3](research/W1-FILING-RECONSTRUCTION.md#w1-revenue-compute)); Note 8 cost of revenue not extracted |
| T-013 | Reconstruct short-term compute, pricing adjustments and commitments | FR-02, FR-08; W1 | M / review | Short-term, pricing, aggregate decomposition, conditionality, exclusions and ten named arrangements with revision lineage drafted ([W1 §4–6](research/W1-FILING-RECONSTRUCTION.md#w1-short-term-pricing)); exhibit-level terms and Notes 13/17 not extracted |
| T-014 | Reconcile original/amended/final findings and paper impacts | FR-02, FR-15; W1/W8 | M / review | CL-001–CL-004 supported, CL-005 superseded, CL-020–CL-025 added; P02/P03/P05/P06/P09 revised; unknowns listed ([W1 §8–10](research/W1-FILING-RECONSTRUCTION.md#w1-claims)). Awaiting a financial reviewer's actual sign-off; no claim marked verified |
| T-015 | Inspect Epoch method and create one workload-specific release-pair tranche | FR-03; W3 | M | T-004/T-005 and source access; three clocks, versions, censored unmatched records; expand only in bounded subsequent batches. Tranche 01 note: [L02](research/LITERATURE-TRANCHE-01.md#l02) requires matched inference budgets and protocols for the benchmark clock, with "not comparable" as a separate status. No supplied source measures the lag, so CL-006 is unchanged |
| T-016 | Acquire one provider/counterparty profile batch | FR-08; W5 | M | Source access; compare archetypes, preserve unknown metrics/relationships; no inference of Anthropic ties without evidence |
| T-017 | Inspect LBNL/IEA/eGRID/Cambium boundaries and one regional evidence tranche | FR-09, FR-10; W6 | M | Source access; compatible editions, location/period units, coverage and unknowns; no company allocation by revenue |
| T-018 | Write demand-identification note with competing empirical studies | FR-02, FR-06; W4 | M | Source access; distinguish measured, borrowed and assumed elasticity; P05 names confounders rather than asserting causality. Tranche 01 note: [the tranche](research/LITERATURE-TRANCHE-01.md#s4) supplies no measured or borrowed AI elasticity, only assumed scenario paths. CL-046 relays token trackers together with a list of confounders |

## Implementation queue — shell exception; full phase still gated

| ID | Task | Ref / milestone | Size | Depends on / acceptance |
| --- | --- | --- | --- | --- |
| T-020 | Confirm Pages eligibility/settings | FR-16; M0 | S / done | Existing legacy Pages site inspected; docs-only publication authorized; full reviewer assignments remain open |
| T-021 | Build branded reader/evidence shell with explicit draft states | FR-11, FR-12, FR-15, FR-16; M0 | M / done | Three static pages, 13 themes, P00–P12 orientation and six-filing timeline; local browser/theme/mobile and focused tests pass |
| T-022 | Deploy and verify the walking reader URL and fragments | FR-15, FR-16; M0 | S / done | PR #3 merged; GitHub Pages run 46100801021 succeeded and artifact matches local root/shell/assets; public HTTP blocked here, local navigation checked; no analytical publication |
| T-023 | Add metric dictionary and shared deterministic fixture validation | FR-04, FR-05; M3 | M / review (indexed, uncalibrated) | T-001/T-002 done; T-005 rubrics still open, so [DATA-DICTIONARY.md](DATA-DICTIONARY.md) defines an abstract “illustrative indexed workload”. Shared engine `docs/assets/js/model/task-energy.mjs` (`task-energy/0.4.0`) passes the §8 fixtures (2.4 / 2.4 / 4.8 kWh), the g^(1−e) identity, threshold edge cases, positive-price, zero-success and indexed-only rules in `tests/model.test.mjs`. No company calibration without T-014; human methods review pending |
| T-024 | Build one evidence view with bidirectional P02/F01 source references | FR-01, FR-02, FR-15; M3 | M / done (review) | `evidence.html#filing-timeline` lineage table and `#claims` inspector generated from the W1 extraction and ledger; text-labeled states, empty/no-match states, line locators and “Return to Pnn” links; claims remain unverified |
| T-025 | Build the deterministic scenario view and compatible manifest replay | FR-05, FR-06, FR-07, FR-15; M3 | M / review (indexed, uncalibrated) | T-021/T-023; `docs/rebound.html` F04 `#elasticity-threshold` and F07 `#scenario-comparison` use the shared engine: three illustrative presets labeled `scenario` / `assumed — not calibrated`, field-level errors that withhold results and mark output stale, sensitivity, build-time static fallback, P05/P08 return links, run-manifest export/import (≤ 1 MiB, strict schema/version checks) and URL replay; results are theme-invariant. Pages deployment and human review pending |
| T-026 | Source all 13 theme metadata records and contrast-tested tokens | FR-11, FR-12; M3 | M | T-001/T-002; bounded batches if needed; official/approximate distinction and font/license notes, no logos |
| T-027 | Integrate theme switching independently of research state | FR-11, FR-12; M3 | M | T-021/T-026; keyboard, URL/state and unchanged-result checks |
| T-028 | Implement one release-pair/provider/impact view at a time | FR-03, FR-08, FR-09, FR-10, FR-15; M3 | M per view | T-015/T-016/T-017 as appropriate plus T-021; split into specific view tasks before implementation |
| T-030 | Specify evidence/assumptions for one uncertainty parameter batch | FR-13; M4 | M | T-018/T-023 and relevant W5/W6 evidence; record distribution/correlation rationale |
| T-031 | Add bounded seeded Monte Carlo with failure counts and replay | FR-07, FR-13; M4 | M | T-025/T-030; deterministic checks first; publish trial settings and model limitations |
| T-032 | Implement each stress search in a separately reviewable tranche | FR-14; M4 | M per test | T-023 and relevant T-014/T-016/T-017; exact domain and threshold logic; insufficient evidence stays explicit |
| T-040 | Integrate paper chapters and F01–F09 against shared evidence/manifests | FR-15; M5 | M per chapter | Relevant evidence/views; split chapter batches; no conflicting values or broken return/replay links |
| T-041 | Produce static/versioned paper review snapshot and reviewer questions | FR-15, FR-16; M5 | M | T-040; pin versions/cutoff/claims, retain citations and static tables without interactions |
| T-042 | Complete three scoped reviews and release disposition | FR-16; M5 | M coordination | T-041 and actual reviewers; blockers resolved or analytical release withheld; no fabricated sign-offs |

## Blockers and handoffs

| Blocker | Affects | Owner / unblocker | Since / next action |
| --- | --- | --- | --- |
| Filing origin authentication and financial review | Promotion of CL-001–CL-005/CL-011/CL-012/CL-020–CL-025 beyond `unknown`; company calibration | yorkerhodes3 + financial reviewer | 2026-11-28; text reconstruction drafted and reproducible; needs origin check or author attestation, then review of dispositions and the 2026 comparability judgment |
| Public-source full-text retrieval fails DNS | T-003/T-004 and full-method portions of T-015–T-018 | Session environment/access restoration or lawful accessible documents | 2026-11-27; provisional indexed synthesis remains limited, not falsely complete |
| Release reviewers not assigned | T-042 and public analytical release | yorkerhodes3 | 2026-11-27; proposed assignment/access checkpoint 2026-12-01, not an automated reminder |

## Draft research status

| Artifact | Current completion boundary | Ref |
| --- | --- | --- |
| v0.4 specification/plan and author attribution | Author approved 2026-11-28; evidence/release verdicts remain separate | FR-15, FR-16 |
| Source register and ledger | Received filing-text provenance; W1 passages located for company claims (CL-001–CL-005, CL-011/012, CL-020–CL-025); all unverified pending review | FR-01, FR-02 |
| Independent evidence synthesis R01–R06 | Scoped source summaries and checked algebra; not full W2–W6 research | FR-03, FR-04, FR-05 |
| Literature tranche 01 | Seven supplied `05-lit` texts analyzed with line locators in [research/LITERATURE-TRANCHE-01.md](research/LITERATURE-TRANCHE-01.md). Draft, not reviewed. Recorded as SRC-020–SRC-026 and CL-040–CL-051 at verification state `unknown`; three files license-pending; paper integration pending | FR-02, FR-03, FR-05 |
| Paper P00–P12 | Prose/methods/synthetic checks and gaps linked to work and planned figures | FR-15 |
| Task-energy model and rebound lab | Dictionary, engine, fixtures and F04/F07 illustrative indexed views; uncalibrated and unreviewed | FR-04–FR-07, FR-15 |

## Done — previously merged

| ID | Work | Completed | PR |
| --- | --- | --- | --- |
| T-000 | Initial concept, preserved research and MIT license | 2026-11-27 | #1 |
| M0 | Non-analytical v0.4 overview, paper guide, evidence timeline and 13 themes | 2026-11-28 | #3 |

The v0.4 research-planning package was merged in #2. The author separately approved the revised specification and plan/backlog on 2026-11-28; those verdicts are recorded in the documents and do not approve financial findings.

## Later / cuts

Agent-based markets, comprehensive facility maps, additional cohorts, 2035 extensions, full lifecycle estimates, and generalized consumer-chat equivalency remain deferred. They do not silently enter the current milestone. Do not cut evidence provenance, static paper readability, missing-data disclosure or human release review to make the package look complete.

## Grooming and review

At each evidence tranche, update its claim/source records, R/P/F references, remaining blockers, and actual review state. Split aggregate acquisition/view tasks before execution. Recheck the evidence cutoff and version before publishing. Keep unresolved questions in [SPECIFICATION §12](SPECIFICATION.md#12-open-questions-carried-forward) and do not treat changed task status as a scientific finding.
