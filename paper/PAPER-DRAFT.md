# Models, Megawatts, and Moats

## Testing open-model catch-up, AI efficiency, demand rebound, and infrastructure consequences

**Initial author:** yorkerhodes3

**Working version:** v0.4

**Evidence cutoff:** literature 2026-11-27; filing captures through 2026-11-25 (8-K)

**Status:** Early, incomplete research draft for review. Filing passages are now located and internally checked ([W1 reconstruction](../research/W1-FILING-RECONSTRUCTION.md)), but **no company figure is verified**: capture origin is not yet authenticated and no financial reviewer has signed off. No company energy estimates or empirical stress findings are presented.

This is the manuscript source for the **live linked research reader**, a key deliverable alongside the dashboard. A non-analytical Pages shell is authorized on 2026-11-28 for navigation and section summaries. The full manuscript rendering, analytical visuals and versioned replay remain later work; shell availability is not analytical publication.

The requested primary filing texts and exhibits are received, including all three amendments and the November 25 8-K. The author directed text-based review and waived original PDFs. A reproducible text-based reconstruction (T-011–T-014) now locates every initial company claim, recomputes footings and ratios, and records revisions; company-specific conclusions still await origin authentication and financial review. Independent literature summaries still distinguish inspected indexed passages from full-text review.

## Reader guide

Read the argument below; inspect [the evidence register](../SOURCES.md), [claim ledger](../CLAIM-LEDGER.csv), and [independent research sections R01–R06](../research/INDEPENDENT-EVIDENCE.md) for support and caveats. [PLAN §4](../PLAN.md#4-paper-coordination-and-pages-link-contract) defines the contextual figure/replay contract. Proposed routes are shown as text rather than falsely clickable live destinations.

| Paper section | Evidence/work connection | Planned visual |
| --- | --- | --- |
| [P00 Abstract](#p00) | Synthesis after research and remediation | None |
| [P01 Question and literature](#p01) | R01; W4 | None |
| [P02 Evidence method](#p02) | Source register/ledger; W1 | F01 filing chronology |
| [P03 Efficiency decomposition](#p03) | R02; W1/W2 | F02 denominators |
| [P04 Open-model equivalency](#p04) | R03; W2/W3 | F03 release-pair clocks |
| [P05 Demand response](#p05) | R01/R05; W4/W7 | F04 rebound threshold |
| [P06 Provider/capacity economics](#p06) | W1/W5 | F05 commitment exposure |
| [P07 Energy and geography](#p07) | R04; W2/W6 | F06 location coverage |
| [P08 Deterministic futures](#p08) | R05; W4/W7 | F07 scenario comparison |
| [P09 Uncertainty and stress](#p09) | W5/W6/W7 | F08 stress boundaries |
| [P10 Ethics and communities](#p10) | R04; W6 | F09 community evidence |
| [P11 Discussion and limitations](#p11) | All packages | None |
| [P12 References and reproducibility](#p12) | Source/method records | Versioned artifact downloads |

<a id="p00"></a>
## P00 — Provisional abstract

Lower AI task costs can reduce the resource intensity of an operation while also making additional use attractive. Open-model catch-up may further change price, model routing, and who earns revenue from that use. This research proposes to examine those mechanisms together without equating a benchmark score, token price, or compute-expense ratio with useful-task or system efficiency.

The current draft sets out a source-addressable method, a bounded literature synthesis, distinct equivalency clocks, and a conditional demand–energy identity. The analytical identity shows why a break-even elasticity of one arises only under proportional price/intensity reductions and unchanged success/facility conditions. It does not estimate actual elasticity or demonstrate an Anthropic outcome. A text-based filing reconstruction supports four of the five initial financial figures and shows the fifth (aggregate commitments) was revised upward after the first amendment, with material conditional and excluded amounts; these remain unverified pending review. Empirical results, financial decomposition, release-pair distributions, and operational-impact estimates await acquisition, validation and review. Revise this abstract last when those results exist.

<a id="p01"></a>
## P01 — The efficiency question and competing mechanisms

The consequential question is not whether a particular AI operation becomes cheaper. It is whether cheaper, more capable useful work reduces total resource demand or induces enough additional use to offset the improvement, and how benefits and burdens are distributed.

The provisional literature gives reasons to consider more than one regime. UKERC's indexed review description treats rebound as a factor in realized savings, not proof that efficiency cannot save energy ([SRC-006](../SOURCES.md#src-006), CL-008). Indexed text from Masanet and colleagues describes historical data-center compute growth outpacing energy growth ([SRC-009](../SOURCES.md#src-009), CL-015). These sources motivate both rebound and effective resource-conservation scenarios. Neither estimates frontier-AI elasticity today.

The proposed causal chain is technical/task efficiency → useful-task cost → price and product design → demand and workload mix → model/provider allocation → capacity and energy consequences. Each arrow needs evidence or an explicitly labeled assumption. The task-demand identity captures a direct response; spending elsewhere, capability change, and economy-wide effects require additional analysis.

**Research backing:** [R01](../research/INDEPENDENT-EVIDENCE.md#r01), W4 in [PLAN §3](../PLAN.md#3-evidence-work-packages). Full-text review and empirical AI-demand literature remain open.

<a id="p02"></a>
## P02 — Evidence method and filing chronology

Anthropic is the proposed initial company anchor, conditional on authenticating primary documents. The source hierarchy favors filings and official disclosures, then independent research, with estimates and scenarios labeled separately. A claim described as “reported” is not automatically verified; classification, verification state, source confidence, and review status answer different questions.

The original S-1 and Amendment 1 are received text captures ([SRC-001](../SOURCES.md#src-001), [SRC-002](../SOURCES.md#src-002)), alongside Amendments 2/3, the final prospectus and November 25 8-K (SRC-014–SRC-017). All six headers name the same issuer and CIK, with accessions and acceptance times matching the captured indices (CL-011). That is internal agreement, not authentication against SEC origin, which remains blocked by network access in the research environment.

The [W1 reconstruction](../research/W1-FILING-RECONSTRUCTION.md) applies one declared pattern per fact to all five registration-sequence documents and records each value with its line locator, so a reader can see where a figure first appears, when it changes, and where a version left a placeholder. Derived checks recompute quarterly footings, rounded ratios, growth rates and the commitment decomposition; all 22 pass. The lineage matters: the original S-1 reports results only through June 30, 2026 and leaves every commitment amount blank; Amendment 1 adds the September quarter and first quantifies commitments; Amendment 2 revises the commitment total and adds termination and exclusion disclosures; Amendment 3 and the final prospectus leave the extracted facts unchanged. The 8-K covers closing, governance and placement items, not a new compute or revenue series.

Four of the five initial financial claims are supported by located passages (CL-001–CL-004) and one is superseded (CL-005, see P06). “Supported” is a reconstruction disposition. Every company claim keeps `verification_state=unknown` until origin authentication and a financial reviewer's sign-off are recorded; successive filings by the same issuer are not independent corroboration. Amendment 1's joined text is not used to assert table alignment.

**F01 — Filing chronology and revision lineage:** `evidence.html#filing-timeline`. Static fallback: [W1 §2 identity table](../research/W1-FILING-RECONSTRUCTION.md#w1-identity) and the per-version [extracted facts](../data/extracted/w1-filing-facts.csv). Return destination: `paper.html#p02`.

<a id="p03"></a>
## P03 — Decomposing efficiency without collapsing denominators

Financial ratios can change through pricing, product/revenue mix, accounting boundaries, procurement terms, utilization, or technical efficiency. The ratio of compute expense to revenue alone cannot distinguish those drivers, and is not a measure of gross margin unless the accounting definitions support that relationship. Company revenue cannot be converted to physical energy without workload and infrastructure evidence.

The filings illustrate the problem. The issuer reports compute and infrastructure expense falling from 251% of revenue in Q1-2025 to 48% in Q2-2026, then rising to 58% in Q3-2026 when $5.0B of short-term compute was delivered (CL-002, CL-003). It defines “compute efficiency” as intelligence produced and revenue generated per dollar of compute invested (CL-024). That is a financial and capability definition. The expense line covers research, model development, serving and internal use as one shared pool, and its composition widens in 2026 as leases and depreciation begin. The ratio therefore mixes revenue growth, prepaid capacity coming online, procurement terms and workload mix; it reports no task, token or energy denominator. It is evidence that financial efficiency improved during a ramp, not a measure of useful-task or physical efficiency ([W1 §3](../research/W1-FILING-RECONSTRUCTION.md#w1-revenue-compute)).

The provisional task-energy literature describes different deployment costs across tasks and model configurations ([SRC-005](../SOURCES.md#src-005), CL-007). The appropriate denominator therefore includes useful output and quality, not just tokens or requests. For coding, test-defined issue resolution offers a candidate operational criterion ([SRC-010](../SOURCES.md#src-010), CL-016). Different task subsets and harnesses, including SWE-bench Verified, must not be merged into one supposedly comparable score ([SRC-011](../SOURCES.md#src-011), CL-017).

The proposed useful-task measures count failed attempts, retries, context and tools. They display success rate alongside cost and energy per successful outcome. Extraction and bounded-agent rubrics must be defined in advance; they cannot inherit a coding rubric by analogy.

**F02 — Denominator comparison (planned):** `efficiency.html#task-and-financial-measures`. Static caption: show model/operation compute, successful-task cost, financial ratios, capacity use and operational energy as distinct measures with their units and missing-data states. The financial row may show the reported ratio series with its composition caveat once reviewed; no task or energy row is populated from filings, which disclose neither. Return: `paper.html#p03`.

**Research backing:** [R02](../research/INDEPENDENT-EVIDENCE.md#r02), [W1 §3](../research/W1-FILING-RECONSTRUCTION.md#w1-revenue-compute), W2; financial series located, review pending.

<a id="p04"></a>
## P04 — What it would mean for an open model to catch up

The initial four-to-six-month hypothesis is testable only after specifying equivalency. Epoch's indexed analysis concerns an aggregate ECI gap, with a caution about public/private benchmark differences ([SRC-004](../SOURCES.md#src-004), CL-006). It is not an observed distribution of production substitutes for a particular Claude workload.

We distinguish benchmark catch-up, workload catch-up, and commercial catch-up. The second requires a matched task rubric and quality/cost configuration; the third adds licensing, serving availability, region, throughput, reliability and operational requirements. Open weights alone do not settle those requirements.

The release-pair investigation will retain frontier releases without a match by the cutoff as censored records. It will also record configuration and endpoint availability, rather than treating a model-release date as immediate commercial readiness. At present no release-pair dataset or equivalency distribution has been evaluated; no numerical lag finding is claimed.

**F03 — Release-pair clocks (planned):** `equivalency.html#release-pairs`. Static caption: show three clocks and an explicit “not observed by cutoff” state, with workload/harness versions and license caveats. No invented matched pair is supplied. Return: `paper.html#p04`.

**Research backing:** [R03](../research/INDEPENDENT-EVIDENCE.md#r03), W2/W3.

<a id="p05"></a>
## P05 — Demand response and the conditional rebound threshold

For a defined workload, use nonnegative price-elasticity magnitude `e`. With positive prices, the scenario demand ratio is `(P1/P0)^(-e)`. This is a modeling assumption about price response, not a fitted relationship. Identifying real elasticity requires variation that distinguishes price from capability, customer growth, budgets, routing and other changes. A simultaneous price reduction and revenue increase does not identify it by itself. The filings show exactly that pattern: from Q2 to Q3 2026 revenue rose $5.4B while the issuer attributes an offset of about $600M to price reductions with new model versions and contractual discounts (CL-004). New models, products and customers arrived in the same quarter, so the observation is co-movement, not an elasticity estimate.

Facility energy is expected attempted work times IT energy per attempt times matched PUE. Under the declared repeated-attempt model, successful task demand `S` and success rate `s>0` imply expected attempts `S/s`. Combining these definitions gives:

```text
E1/E0 = (P1/P0)^(-e) × (s0/s1) × (I1/I0) × (p1/p0)
```

If price and IT energy per attempt both decline by factor `g`, with `0<g<1` and success/PUE unchanged, `E1/E0=g^(1-e)`. Thus the threshold `e=1` is a conditional analytical result (CL-013), not a universal rule. Partial pass-through, quality changes, routing and changed facility intensity can move the boundary.

**F04 — Rebound threshold (planned):** `rebound.html#elasticity-threshold`. Static caption: under the stated proportional conditions, energy falls for `e<1`, stays unchanged for `e=1`, and rises for `e>1`; changing other conditions requires recalculation. Return: `paper.html#p05`.

**Research backing:** [R05](../research/INDEPENDENT-EVIDENCE.md#r05), [specification modeling rules](../SPECIFICATION.md#8-modeling-rules-and-edge-cases), W4/W7. No actual elasticity estimate is available.

<a id="p06"></a>
## P06 — Provider economics and committed capacity

Open-model substitution may change who serves a workload without reducing aggregate useful-task demand. A frontier lab could retain high-value tasks while losing repeatable price-sensitive traffic; conversely, product integration, governance, reliability and migration costs could slow substitution. These are hypotheses to investigate, not findings about Anthropic's realized margins.

Capacity economics must distinguish installed, available, contractually committed, and economically demanded capacity, with compatible units and delivery dates. Price pressure does not automatically imply insolvency. Cancellation rights, financing conditions, contract amendments, hardware usability, fixed obligations and realized utilization require contract-level evidence.

The initial research candidates are CoreWeave, Nebius, Lambda and Crusoe for infrastructure, and Together AI, Fireworks AI and Baseten for managed inference. They are research cohorts, not a list of Anthropic counterparties or a ranking. Provider-specific disclosures remain acquisition tasks.

The final prospectus states aggregate contractual obligations and commitments of about $900.9B, substantially all compute and infrastructure, as of and after September 30, 2026 (CL-020). This replaces Amendment 1's $895.4B, which the initial draft carried (CL-005, superseded); the whole change is $5.5B of commitments signed after the quarter. Exposure is not one number. About $186.2B is subject to termination rights or contingent conditions, and an estimated $150–175B of variable arrangements is excluded from the total (CL-021). The named arrangements, including Amazon, Google, Microsoft, SpaceXAI, Broadcom and AMD, use different instruments, terms and conditions and must not be summed (CL-022).

Of the seven research candidates, only Lambda is named as a counterparty: about $41.3B of agreements into 2034, with fees only as capacity is delivered and accepted, of which an August 2026 agreement of about $34.9B is currently terminable by either party because Lambda did not secure a facility lease in time (CL-023). Nscale and Fluidstack are also named. The other six candidates are not named in these documents, which is not evidence that no relationship exists. This gives the provider chapter one evidenced, explicitly fragile edge, and shows why delivery and financing conditions matter more than headline totals ([W1 §5–6](../research/W1-FILING-RECONSTRUCTION.md#w1-commitments)).

**F05 — Commitment exposure (planned):** `providers.html#commitment-exposure`. Static caption: separate fixed, variable, conditional and excluded commitments; show the evidenced Lambda edge with its termination status; retain unknown relationships and incompatible metrics. No summed exposure across instruments. Return: `paper.html#p06`.

**Research backing:** [W1 §5–6](../research/W1-FILING-RECONSTRUCTION.md#w1-commitments), W5; CL-012/CL-020–CL-023 located but unverified. Provider-side evidence is still to be acquired.

<a id="p07"></a>
## P07 — Operational energy, geography, and excluded impacts

Sector energy reports provide context, not a shortcut to company allocation. The indexed LBNL and IEA descriptions cover historical estimates and future scenarios, with different geography and inclusion of non-AI services ([SRC-007](../SOURCES.md#src-007), CL-009; [SRC-008](../SOURCES.md#src-008), CL-010). We have not inspected their full methods and do not insert their headline totals into the company model.

Operational electricity, historical emissions accounting, fixed-grid marginal response, and long-run effects of persistent load are different questions. Indexed EPA and Cambium records identify candidate methods, but annual inventory rates and long-run modeled rates are not interchangeable ([SRC-012](../SOURCES.md#src-012), CL-018; [SRC-013](../SOURCES.md#src-013), CL-019). Each calculation must disclose year, geography, units, factor type, grid assumptions, and coverage.

Unlocated capacity remains unlocated; US factors are not applied to non-US commitments. Direct cooling water is separate from electricity-generation water, and both are distinct from embodied/construction impacts. Missing factors produce unknowns or clearly labeled sensitivity scenarios, not zero impact.

**F06 — Location coverage (planned):** `impacts.html#location-coverage`. Static caption: quantify the share of capacity with documented compatible regional evidence and show excluded/unknown locations. There is no regional capacity allocation or company energy total in this draft. Return: `paper.html#p07`.

**Research backing:** [R04](../research/INDEPENDENT-EVIDENCE.md#r04), W2/W6.

<a id="p08"></a>
## P08 — Deterministic futures: synthetic checks before empirical results

The first scenario families are efficient abundance, rebound acceleration, and demand air pocket / open-model substitution. They are not forecasts or calibrated probabilities. Their implementation must separate exogenous task demand, price response, model routing, success rates and physical intensity, without applying the same demand response repeatedly.

Before company calibration, the following checks expose the accounting logic (CL-014). Baseline desired successful tasks are 100, success rate is 0.5, IT energy is 0.01 kWh per attempt and PUE is 1.2. Baseline expected attempts are 200 and facility energy is 2.4 kWh.

| Synthetic check | Price ratio | IT intensity ratio | Elasticity magnitude | Facility energy | Meaning |
| --- | --- | --- | --- | --- | --- |
| Baseline | 1 | 1 | Response not applied | 2.4 kWh | Accounting fixture |
| Halved price/intensity | 0.5 | 0.5 | 1 | 2.4 kWh | Conditional break-even |
| Halved price/intensity | 0.5 | 0.5 | 2 | 4.8 kWh | Illustrative rebound, not observed AI demand |

These examples are verified arithmetic, not research measurements. The actual three futures, calibration and versioned run manifests have not been implemented. Without sufficient data, the eventual tool must label its results indexed or assumed rather than imply empirical absolute company energy.

**F07 — Scenario comparison (planned):** `rebound.html#scenario-comparison`. Static fallback: the table above and the declared equations; future “Explore this result” links must pin the exact model/data versions and inputs, not just a seed. Return: `paper.html#p08`.

**Research backing:** [R05](../research/INDEPENDENT-EVIDENCE.md#r05), W7; real scenario results pending.

<a id="p09"></a>
## P09 — Uncertainty and reverse stress tests

Monte Carlo methods can propagate declared uncertainty but do not transform assumed distributions into measured event probabilities. Distribution choice, parameter correlations, seeds, failures, and model/data versions must accompany the results. No stochastic trials have been run for this paper.

The initial reverse tests investigate compute-cost pressure, committed-capacity mismatch, and regional power constraints. The two illustrative financial/capacity boundaries are expense above 60% of revenue and use below 60% of available committed capacity, respectively, for four consecutive comparable quarters. The regional boundary compares required load with documented deliverable supply in a matched period.

These are research triggers, not solvency, covenant, climate, or community acceptability certificates. Applying the compute-pressure trigger to the reported quarters shows why (CL-025): expense exceeded 60% of revenue in every 2025 quarter (251%, 177%, 148%, 144%) and in Q1-2026 (72%), so the four-quarter boundary was met during 2025, a period when revenue grew more than fivefold while committed capacity came online. Q2 and Q3 2026 were 48% and 58%. Crossing the boundary during a deliberate ramp is not a failure signal, and continuity across 2025–2026 depends on the composition change noted in P03 ([W1 §7](../research/W1-FILING-RECONSTRUCTION.md#w1-stress)). The capacity-use and regional-power tests remain unevaluated: the filings disclose no utilization or facility-level supply. A search finding no breach within its domain is not evidence of safety outside that domain; claiming a minimal shock requires publishing the search method and admissible assumptions.

**F08 — Stress boundaries (planned):** `uncertainty.html#stress-boundaries`. Static fallback: the three definitions above; the compute-pressure history as a derived table with its comparability caveat; “insufficient evidence” for capacity use and regional power. No forward probability. Return: `paper.html#p09`.

**Research backing:** [PLAN §3 W7](../PLAN.md#3-evidence-work-packages), [specification](../SPECIFICATION.md#8-modeling-rules-and-edge-cases), W5/W6/W7.

<a id="p10"></a>
## P10 — Distributional consequences and contestability

A useful task can benefit one group while shifting infrastructure burdens to another. The research therefore retains questions about affordability, water, land, noise, pollution and who participates in decisions, even where the initial quantitative boundary is operational electricity and emissions. Omitting an impact from a numerical total does not establish its absence.

Affected communities are participants who can contest sources, boundaries and acceptable tradeoffs, not merely constraints in a simulation. No stakeholder consultation or community-threshold agreement is claimed here. W6 must locate relevant evidence and review needs before drawing local conclusions.

**F09 — Community evidence (planned):** `impacts.html#community-evidence`. Static caption: identify who benefits, who bears burdens, documented local evidence, exclusions, and who can challenge an assumption. No invented community score or threshold is supplied. Return: `paper.html#p10`.

**Research backing:** [R04](../research/INDEPENDENT-EVIDENCE.md#r04), the [initial ethical review questions](../INITIAL-RESEARCH.md#13-ethical-tech-colab-review-questions), W6.

<a id="p11"></a>
## P11 — Discussion, limits, and review questions

The present contribution is a bounded method and provisional synthesis, not an empirical verdict about Anthropic, neocloud viability, or total AI energy. The derived rebound identity supplies a conditional boundary, while the literature leads motivate multiple possible regimes and measurable workload definitions. Much of the central evidence remains to be acquired and inspected.

The first filing pass confirmed four of the five initial figures and superseded the fifth; later passes and review can still correct numbers or change the case-study framing. Failure to authenticate the anchor must produce an evidence-gap analysis, not a modeled company result. Failure of the six-month hypothesis is a valid finding. Future results should distinguish task price, workload growth, model substitution, provider allocation and facility intensity rather than report one efficiency score.

**Questions for review:** Are the task rubrics defensible? Are the three equivalency clocks appropriately separated? Which causal links have identification evidence, rather than co-movement? Are financial/physical boundaries compatible? Can a reader trace every number through a source or formula? Which local impacts and participant perspectives are still missing?

Follow [PLAN milestones and dependencies](../PLAN.md#6-milestones-and-dependencies) and [the backlog](../BACKLOG.md) to see what is unfinished. The author approved the revised specification and plan/backlog on 2026-11-28. Three actual reviewers and resolution of blocking findings are still required before analytical release.

<a id="p12"></a>
## P12 — References, reproducibility, and version history

The following references are stable **discovery records**, not claims of completed primary-document review. Their exact available URLs, inspection scope, and limitations are maintained in the source register.

| Reference | Work | Use here |
| --- | --- | --- |
| [SRC-001](../SOURCES.md#src-001), [SRC-002](../SOURCES.md#src-002), [SRC-003](../SOURCES.md#src-003), [SRC-014](../SOURCES.md#src-014), [SRC-015](../SOURCES.md#src-015), [SRC-016](../SOURCES.md#src-016), [SRC-017](../SOURCES.md#src-017) | Received S-1/amendments/final/8-K text captures and chronology | P02/P03/P06; claim reconciliation pending, no PDF prerequisite |
| [SRC-004](../SOURCES.md#src-004) | Epoch AI, open/closed ECI gap | P04; indexed analysis, not commercial parity |
| [SRC-005](../SOURCES.md#src-005) | Luccioni, Jernite and Strubell, *Power Hungry Processing* | P03/P07; task-measurement method |
| [SRC-006](../SOURCES.md#src-006) | UKERC, rebound review | P01/P05; competing mechanisms |
| [SRC-007](../SOURCES.md#src-007), [SRC-008](../SOURCES.md#src-008) | LBNL US report; IEA *Energy and AI* | P07; sector context and scenario limits |
| [SRC-009](../SOURCES.md#src-009) | Masanet and colleagues, *Recalibrating global data center energy-use estimates* | P01/P11; historical counterpoint |
| [SRC-010](../SOURCES.md#src-010), [SRC-011](../SOURCES.md#src-011) | SWE-bench paper; OpenAI Verified announcement | P03/P04; coding rubric/harness provenance |
| [SRC-012](../SOURCES.md#src-012), [SRC-013](../SOURCES.md#src-013) | EPA eGRID FAQ; NREL Cambium documentation/data descriptions | P07; different emissions questions |
| CL-013/CL-014 in [CLAIM-LEDGER.csv](../CLAIM-LEDGER.csv) | Local algebra and synthetic checks | P05/P08; not empirical inputs |
| [W1 reconstruction](../research/W1-FILING-RECONSTRUCTION.md), [extracted facts](../data/extracted/w1-filing-facts.csv), [derived checks](../data/derived/w1-reconciliation-checks.csv) | Reproducible filing extraction (`node tools/extract-filing-facts.mjs --check`) | P02/P03/P05/P06/P09; CL-001–CL-005, CL-011/CL-012, CL-020–CL-025 |

**Reproducibility status:** No company-calibrated dataset, engine release, Monte Carlo trial set, scenario manifest, or deployed Pages interaction exists yet. Current algebra and synthetic inputs are fully shown in P05/P08 and [R05](../research/INDEPENDENT-EVIDENCE.md#r05). Later snapshots must pin paper, source/data/model versions and manifests; a live update must not silently change a reviewed result.

**v0.4, 2026-11-27:** Initial coordinated manuscript, independent literature synthesis, source-access triage, and synthetic identities. Primary filings are being gathered by the author; remediation is planned, not completed. The initial author is **yorkerhodes3**. Repository original work is MIT licensed; third-party materials retain their respective terms.

**v0.4 intake update, 2026-11-28:** Requested text intake complete; claim reconciliation pending. PDF retrieval waived by author; non-analytical demo shell authorized and revised specification/plan/backlog separately approved. Evidence cutoff stays 2026-11-27; analytical release is not approved.

**v0.4 W1 update, 2026-11-28:** Text-based filing reconstruction: located passages and line locators for all initial company claims; 22 derived checks pass; CL-005 superseded by CL-020; new claims CL-020–CL-025; P02/P03/P05/P06/P09 revised. All company claims remain unverified pending origin authentication and financial review.
