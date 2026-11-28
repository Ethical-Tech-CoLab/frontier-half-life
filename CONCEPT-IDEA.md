# CONCEPT-IDEA: Models, Megawatts, and Moats

> **Purpose:** Explain why this research should exist and who it serves before specifying or building the site.
> **Method:** Ethical Tech CoLab Project Startup Guide. Concept approved for specification drafting, not approval to build.

| Field | Value |
| --- | --- |
| Status | Approved for specification drafting — implementation remains gated |
| Initial author | yorkerhodes3 |
| Working version | v0.4 — advance as the work proceeds |
| Reviewer(s) | @yorkerhodes3 — concept-stage scope approval |
| Created | 2026-11-27 |
| Last updated | 2026-11-28 |

## 1. One-sentence pitch

> **Models, Megawatts, and Moats** helps public-interest AI researchers and infrastructure analysts examine how falling AI task costs and faster open-model catch-up could change compute demand, provider economics, and local energy impacts.

## 2. The problem

Evidence about frontier-AI economics and physical impacts is scattered across company filings, model releases, provider disclosures, energy records, and research papers. A lower reported compute-cost ratio or a benchmark result can be mistaken for proof that useful tasks—or the AI system overall—use fewer resources. Demand growth, workload changes, procurement contracts, and where electricity comes from can change that conclusion.

The project premise is that researchers and decision-makers need a way to compare these claims without blending reported facts, calculations, estimates, and scenarios. This is a research problem inferred from the proposed work, not yet validated through interviews with intended users. The filing figures, model-equivalency timelines, provider comparisons, and other claims in the supplied research draft are leads to verify against primary sources, not established findings.

## 3. Who it is for

| Audience | What they care about | How they might find the work |
| --- | --- | --- |
| Primary: public-interest AI researchers and infrastructure analysts | Source-traceable evidence, explicit assumptions, and comparable demand and impact scenarios | Research networks, Ethical Tech CoLab, and public project site |
| Secondary: policymakers, grid and infrastructure planners, and affected communities | Where uncertainty and physical burdens fall, and which assumptions drive outcomes | Public briefings, partner organizations, and the research site |
| Decision-maker / sponsor | Whether this research is useful, credible, and appropriately scoped | Ethical Tech CoLab project review; no funding or external commitments assumed |

## 4. The idea

This is a research project, not initially a forecasting product. It will investigate whether AI efficiency reduces total resource use or instead enables enough additional use to raise aggregate compute and energy demand. It will also examine how the time for open-weight models to reach useful, workload-specific equivalence with closed frontier models may affect pricing, model routing, provider economics, and already-committed capacity.

Anthropic is the initial company case, conditional on verifying the public filings identified in the draft. OpenAI provides a closed-model comparison where comparable public evidence exists, not an assumed second financial calibration. The project distinguishes model, task, financial, capacity, energy, and system-level efficiency rather than treating any one ratio as a proxy for all of them. Conclusions are limited to what the evidence can support.

The public-facing research site should follow the neocloud-supply-os design guide: an Ethical Tech CoLab foundation, reusable design tokens, a selectable theme switcher, clear evidence provenance, and explicit uncertainty. Its initial selectable themes should include **Ethical Tech CoLab, CoLab Daylight, Anthropic, OpenAI, CoreWeave, Nebius, Lambda, Crusoe, Together AI, Nscale, Fluidstack, Vultr, and Voltage Park**.

Third-party themes are illustrative approximations for demo dressing only—not official brand assets or endorsements. Use no company logos; record theme sources and confidence; use self-hosted, appropriately licensed fonts or open substitutes; and check text and control contrast for accessibility. A brand choice changes visual styling only and must not imply that a company supplied, reviewed, or endorsed research data.

**A day in the life (proposed):**

1. A researcher opens a claim or scenario and sees whether each input is reported, derived, estimated, assumed, or unknown.
2. They inspect its source, period, units, formula, and caveats, then adjust clearly labeled assumptions.
3. They compare outcomes across scenarios and export or cite the evidence and assumptions without mistaking a scenario for a prediction.

## 5. What success looks like

These are proposed review targets, not commitments or measured baselines.

| Signal | How we measure it | Draft target | By when |
| --- | --- | --- | --- |
| Traceable claims | Share of consequential published claims linked to a source or transparent formula and evidence state | 100% | Before the first public research release |
| Useful uncertainty | Independent reviewers can identify the assumptions and limitations behind a displayed result | At least 3 reviewers complete a documented review and identify no unlabelled scenario inputs | Before public release |
| Scenario distinction | A user can compare materially different demand/efficiency futures without interpreting them as a point forecast | At least 3 distinct scenarios with assumptions and uncertainty visible | First public prototype |

## 6. Explicitly out of scope (initial release)

- Not making investment recommendations, company ratings, or personalized financial advice.
- Not presenting agent simulations or scenario outputs as predictions.
- Not claiming comprehensive coverage of the AI industry or all providers, regions, workloads, and environmental impacts.
- Not treating benchmark parity, token price, revenue ratios, or installed capacity alone as proof of useful-task or system efficiency.
- Not building production-grade procurement, capacity trading, or operational planning software.
- Not implying affiliation with or endorsement by any company whose illustrative theme or public disclosures are referenced.
- Not beginning implementation before the concept review gate is approved.

## 7. Constraints and realities

- **Time:** Work in demonstrable stages rather than committing to an unconfirmed calendar deadline. Choose milestone dates and effort estimates at the plan review.
- **Money:** Start with public sources and a static, browser-based research site suitable for GitHub Pages. No paid data, model APIs, cloud resources, or financial commitments without separate approval.
- **Skills:** Keep the first model deterministic and auditable. Add stochastic methods only after validation and defer agent-based modeling until its value and reviewer capacity are established.
- **Rules:** Use public or appropriately licensed sources; retain source locations and retrieval dates; distinguish facts from analysis; avoid collecting personal data unless a reviewed need and policy exist. Confirm any additional institutional, privacy, accessibility, and licensing requirements.

## 8. Alternatives considered

| Option | Why not (yet) |
| --- | --- |
| Do nothing / status quo | Leaves the proposed cross-source comparison and uncertainty communication untested; first validate that the problem matters to intended users. |
| Write a conventional paper only | May be sufficient if the evidence cannot support a useful interactive comparison; consider this as a lower-scope alternative. |
| Build a broad AI-industry dashboard immediately | Too many data gaps and unresolved boundaries for a credible initial release. |
| Build a company-focused financial analysis only | Would not by itself answer whether efficiency changes physical resource demand or who bears the impact. |
| Build a model leaderboard only | Benchmark comparisons do not establish commercial or workload equivalency, cost per successful task, or energy consequences. |

## 9. Decisions on the open questions

Working choices made on 2026-11-27 at the author's request. They are reversible scope decisions, not verified research findings or a substitute for human sign-off. The previously checked question and review boxes are retained as review progress; no approval verdict is inferred from them.

- [x] **Q1 — Audience and decision:** Serve public-interest researchers and infrastructure analysts first. Help them assess which assumptions reverse conclusions about compute demand, provider exposure, and energy impacts. Policy, grid, and community audiences are secondary; do not optimize for trading or investment recommendations.
- [x] **Q2 — Research scope:** Study the interaction between open-model catch-up and efficiency/rebound. Treat four to six months as a hypothesis to test against workload-specific release pairs, not a law or the sole scenario.
- [x] **Q3 — Case and cohort:** Use Anthropic as the evidence-conditional anchor and a bounded sector scenario, not a sector forecast. Initial infrastructure research candidates: CoreWeave, Nebius, Lambda, and Crusoe. Initial managed-inference candidates: Together AI, Fireworks AI, and Baseten. These are distinct archetypes, not interchangeable neoclouds. Include a sourced profile even if metrics are unknown; include quantitative comparisons only when definitions and evidence are comparable. No provider relationship with Anthropic is presumed.
- [x] **Q4 — Useful work:** Begin with coding and structured extraction, plus bounded agent workflows composed of those tasks. Coding success means passing predefined functional tests; extraction success means meeting a predefined field-accuracy rubric; agent success means completing a predefined end goal within a declared tool/step budget. Count unsuccessful attempts, retries, context, and tool calls in cost and resource use. Set and version quality requirements before comparing releases; report success rate and cost per successful task together. Defer consumer chat and general knowledge-work equivalency until a defensible rubric exists.
- [x] **Q5 — Horizon and geography:** Reconstruct available historical evidence through the 2026-11-27 research cutoff, without inventing missing quarters. Use quarterly scenarios through 2030. Defer annual scenarios through 2035. Start regional impact research with documented US locations; identify non-US commitments separately rather than applying US factors to them. Keep unlocated capacity in an explicit unknown-location bucket.
- [x] **Q6 — Physical boundaries:** Include operational facility electricity and associated operational emissions first, separating IT energy from facility energy and average from marginal emissions. Include direct operational water only where credible regional data support it; otherwise show unknown or a labeled scenario range. Track embodied carbon, construction, land, noise, local pollution, and affordability as evidence gaps and qualitative impacts initially. Do not set community acceptability thresholds without affected-stakeholder review.
- [x] **Q7 — Deliverables:** First produce a source audit, claim ledger, release-pair evidence, and research-paper outline. After document gates, deliver an evidence-first static site with a deterministic rebound comparison. Then add seeded Monte Carlo analysis and three reverse stress tests for the first substantive research release. Defer agent-based markets, a comprehensive futures map, and provider rankings.
- [x] **Q8 — Feasibility:** Use a zero-incremental-spend starting constraint and milestone-based scope. Retain the §5 targets as release gates: lack of three reviewers delays public analytical release, not drafting. The author owns scope approval; specialist review and dates are assigned during planning, not invented here. No external account, paid service, or fixed delivery date is required to finish the current documents.
- [x] **Q9 — Stop or pivot:** Publish an evidence-gap analysis rather than a calibrated company model if the filing anchor cannot be authenticated. Drop the interactive component if users cannot identify a decision it improves over a paper or table. Narrow the study if task comparisons are not reproducible. A finding against six-month equivalency is a valid result, not a reason to hide or abandon the research.

## 10. Assumptions

- 🔴 We assume intended users need a source-addressable comparison across technical, economic, and physical measures. If they do not, the interactive research site may be unnecessary.
- 🔴 We assume public evidence can support at least a bounded company case and scenario analysis. Missing or non-comparable data may require narrowing the questions or publishing a gap analysis instead.
- 🔴 We assume the open-model-equivalency claim can be operationalized by workload and commercial readiness. A single elapsed-month figure may not be meaningful.
- 🟡 We assume public disclosures and defensible secondary sources will be sufficient for an initial study; private workload and facility data may remain unavailable.
- 🟡 We assume a theme switcher will help research demonstrations. It is a presentation choice, not a research requirement, and should be deferred if it distracts from evidence quality.
- 🟢 We assume the source hierarchy, evidence-state labels, and uncertainty disclosures in the supplied draft are useful starting principles; reviewers should amend them.

## 11. Research approach and decision boundaries

**2026-11-27 author direction:** Start the coordinated research, paper, and dashboard at **v0.4**, not v1. The paper is a key deliverable alongside the dashboard: a live, linked research reader whose text cites evidence and points to specific Pages visuals or reproducible interactions. `yorkerhodes3` is the initial author. The revised specification and requested plan remain drafts for review; this direction does not claim that their review gates have been completed.

**2026-11-28 intake/shell direction:** The requested filing text captures and exhibits are received; use extracted text and skip original PDFs. A non-analytical Pages demo shell is explicitly authorized in parallel with document updates. This narrow exception does not approve full analytical implementation, claim verification or publication of research findings.

**2026-11-28 review update:** The author subsequently approved the revised specification and, in a separate question, the coordinated plan/backlog. Their recorded verdicts permit the scoped work sequence; claim reconciliation and specialist analytical publication review remain required.

### 11.1 Preserve the initial research, validate before adopting it

`INITIAL-RESEARCH.md` remains the supplied research record. Its numerical claims, source URLs, hypothesized mechanisms, and proposed methods are not silently rewritten or promoted to verified evidence. This concept is the current scope authority; the original's broad modules and document sequence are research inputs, not permission to bypass the startup guide.

First authenticate the cited filing documents and their issuer, accession, filing date, and contents against the SEC and official issuer records. A blocked or unavailable URL is not proof that a filing does not exist or that a claim is false. Record access failures separately from verification outcomes and seek another official access path. If primary evidence remains unavailable, preserve the claim as unverified and exclude it from calibrated historical results.

Maintain separate fields for **claim classification** (reported, derived, estimated, assumed, scenario), **verification state** (verified, corroborated, unknown, contested), and source confidence. A number described as reported in the original draft is not verified merely because it has a URL. Keep formulas, units, reporting periods, source/retrieval dates, and review history with each consequential value.

### 11.2 Compare measures without collapsing denominators

Show model efficiency, compute/revenue, gross margin, customer cost per successful task, and energy per successful task separately. Gross margin is displayed only when accounting definitions support it; compute/revenue alone is not gross margin. Do not infer physical compute or energy from revenue ratios without a disclosed conversion and uncertainty.

Build a release-pair dataset that separates benchmark catch-up, workload catch-up, and commercial availability. Record licenses, serving configuration, quality requirements, release dates, production availability, migration friction, and uncertainty. Unmatched frontier releases remain in the dataset as not yet equivalent at the cutoff; excluding them would bias catch-up times downward. Distinguish open weights from open training data/code and from commercial deployment permission.

### 11.3 Stage the models and expose the assumptions

Begin with the auditable identity:

`facility energy = attempted tasks × IT energy per attempted task × PUE`

Use workload-specific success rates to translate requested successful work into attempts, including retries without counting them twice. Fix units and boundaries before combining workloads. Define demand elasticity as a nonnegative magnitude:

`task volume ratio = (new task price / baseline task price) ^ (-elasticity)`

In the simplified case of proportional price pass-through, fixed workload quality, and unchanged facility intensity, elasticity of one is the break-even threshold. It is not a universal threshold when prices, success rates, capability, workload mix, routing, or facility intensity change.

Compare three initial futures: **efficient abundance**, **rebound acceleration**, and **demand air pocket / open-model substitution**. Show input ranges and sensitivity, not unsupported calibrated probabilities. Later Monte Carlo runs publish seeds, parameter sources, distributions, correlations, and manifests; assumed distributions never masquerade as empirical frequency estimates.

The first three reverse stress tests are:

| Test | Starting scenario boundary | Interpretation |
| --- | --- | --- |
| Company compute-cost pressure | Compute/infrastructure expense exceeds 60% of revenue for four consecutive quarters | Adjustable research trigger, not a solvency or gross-margin claim; only use comparable accounting inputs |
| Capacity mismatch | Economically demanded work uses less than 60% of available committed capacity for four consecutive quarters | Adjustable exposure trigger, not a universal provider viability threshold; document contract obligations and delivery conditions |
| Regional power constraint | Required load exceeds documented deliverable supply in a modeled period | Only evaluate when boundary, delivery timing, geography, and units are supported; otherwise report insufficient evidence |

The two 60% thresholds are deliberately illustrative, must be adjustable, and require reviewer confirmation before publication. Do not assert minimal plausible shocks without disclosing the search domain, algorithm, and plausibility constraints. Financial covenant, climate, water-stress, and community-affordability boundaries require actual contract, regulatory, scientific, or stakeholder evidence; they are not defaults the agent can authorize.

### 11.4 Handle geography and impacts honestly

Quantify documented locations using period-appropriate energy factors. Publish the share of capacity that can and cannot be located, with denominator and evidence coverage. Do not sum facility, provider, and lab estimates when they describe the same load. Separate operational and embodied emissions and direct cooling water from electricity-generation water; do not claim a full lifecycle or total-water result from partial boundaries.

Where marginal generation or water data are unavailable, leave empirical values unknown and offer only explicitly labeled sensitivity scenarios. Keep distributional questions visible even when not quantified. Communities are participants entitled to challenge evidence and boundaries, not merely resource constraints.

### 11.5 Site and brands are presentation, not evidence

Use the neocloud-supply-os site's token-based Ethical Tech CoLab design direction and retain all 12 of its listed presets, adding Anthropic for **13 selectable themes**. Default to CoLab; keep brand selection separate from the company/model/provider being analyzed. Changing a theme must not change data, assumptions, evidence-state labels, or outcomes.

Carry `?brand=<id>` through navigation, use an accessible labeled switcher, and fall back to CoLab with a visible explanation for unknown IDs. Keep theme preferences local to the browser. No tracking, accounts, uploaded private evidence, or live provider calls in the first site. Theme metadata records provenance and confidence; Anthropic styling must be sourced before implementation, not invented as an official palette. Require text contrast of at least 4.5:1 for normal text and control contrast of at least 3:1 where WCAG requires it, keyboard access, and evidence states distinguishable without color.

### 11.6 Trace the original early questions and remaining research

| `INITIAL-RESEARCH.md` §18 question | Current disposition |
| --- | --- |
| 1. Definition of Anthropic efficiency | Separate all measures; §11.2 |
| 2. Anthropic-only or sector anchor | Evidence-conditional Anthropic case plus bounded sector scenarios; Q3 |
| 3. First neocloud cohort | Seven candidates split into infrastructure and managed-inference archetypes; Q3 |
| 4. 2030 or 2035 horizon | Quarterly through 2030 first; 2035 deferred; Q5 |
| 5. Useful-work unit | Coding, extraction, and bounded agent task rubrics; Q4 |
| 6. Capacity-location data availability | Research task, not assumed answered; quantify coverage and unknown locations; §11.4 |
| 7. Embodied/construction impacts | Separate qualitative/evidence-gap treatment initially; Q6 and §11.4 |
| 8. Community thresholds | Require affected-stakeholder input; no numerical defaults; Q6 |

The original §5 questions about actual efficiency drivers, elasticities, contract economics, provider viability, marginal electricity, and who bears costs remain **research questions**. They cannot be answered by choosing a project scope. Record missing inputs, conflicting sources, and unanswered causal questions explicitly.

### 11.7 Review sequence and what requires the author now

Follow [the project-startup-guide workflow](https://github.com/Ethical-Tech-CoLab/project-startup-guide/blob/main/guide/01-DOCUMENT-WORKFLOW.md): **CONCEPT-IDEA → human approval → SPECIFICATION → human approval → PLAN + BACKLOG → human approval → build**. Use [its review checklist](https://github.com/Ethical-Tech-CoLab/project-startup-guide/blob/main/templates/REVIEW-CHECKLIST.md); record each verdict in the document and use review PRs when preparing those stage changes for sharing.

The author approved this approach, including the stop/pivot criteria in Q9, on 2026-11-27 through the session's explicit approval question. No additional author answer is needed to draft the specification. Approval permits drafting the specification, not building, publishing analytical claims, spending money, or authorizing community-impact thresholds. Specialist methodological review remains a later release gate, not something this concept verdict claims to have completed.

---

## Reviewer sign-off

The concept gate is approved for drafting `SPECIFICATION.md`. The specification requires its own human review before planning and implementation.

- [x] The problem is real and clearly stated, independent of the proposed site.
- [x] The audience and decision are specific enough to guide the research.
- [x] Success criteria are measurable and feasible.
- [x] The first-release scope is narrow and the out-of-scope list is honest.
- [x] Risky assumptions and unanswered decisions are visible.
- [x] Factual claims carried forward from the supplied research draft are verified or explicitly marked unverified.
- [x] The reviewer has answered the “what would make this project pointless?” question by approving the stop/pivot criteria in Q9.

**Reviewer:** @yorkerhodes3

**Date:** 2026-11-27

**Verdict:** `Approved` for specification drafting

**Reviewer notes:**

> The author selected “Approve the concept approach for specification drafting (Recommended)” after reviewing the scope summary and the reference to §§9–11. This records concept-stage approval only, not verification of the initial research claims, completion of specialist review, or authorization to implement or publish analytical results.
