# Models, Megawatts, and Moats

## Testing open-model catch-up, AI efficiency, demand rebound, and infrastructure consequences

**Initial author:** yorkerhodes3

**Working version:** v0.4

**Evidence cutoff:** indexed literature 2026-11-27; supplied literature tranche analyzed 2026-11-28; filing captures through 2026-11-25 (8-K)

**Status:** Early, incomplete research draft for review. Filing passages are now located and internally checked ([W1 reconstruction](../research/W1-FILING-RECONSTRUCTION.md)), but **no company figure is verified**: the author attested the filing copies authentic on 2026-11-28 ([decisions](../SOURCES.md#author-decisions-2026-11-28)), and the financial review by the author is still pending. No company energy estimates or empirical stress findings are presented.

This is the manuscript source for the **live linked research reader**, a key deliverable alongside the dashboard. Pages renders this file directly as the reader, so the published text and the reviewed source cannot drift. Claim IDs open the evidence room; figure panels state whether their view is live or planned. Publishing the review draft is not an analytical release, and versioned replay snapshots remain later work.

The requested primary filing texts and exhibits are received, including all three amendments and the November 25 8-K. The author directed text-based review and waived original PDFs. A reproducible text-based reconstruction (T-011–T-014) now locates every initial company claim, recomputes footings and ratios, and records revisions; the author has attested the copies authentic, and company-specific conclusions await the author's financial review. Independent literature summaries still distinguish inspected indexed passages from full-text review.

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

Lower AI task costs can reduce the resource intensity of an operation while also making additional use attractive. Open-model catch-up may further change price, model routing, and who earns revenue from that use. This draft examines those mechanisms together without equating a benchmark score, token price, or compute-expense ratio with useful-task or system efficiency.

The draft contributes a source-addressable method and four evidence bases. A reproducible reconstruction of the supplied filing texts supports four of five initial financial figures (CL-001–CL-004). It supersedes the fifth: the aggregate commitment rose from $895.4B to about $900.9B after the first amendment (CL-005, CL-020). The same reconstruction locates material conditional and excluded amounts (CL-021) and one evidenced, currently terminable neocloud edge (CL-023). The filings also show why they cannot identify a demand response: the issuer reports demand exceeding available compute, so observed usage measures allocated capacity (CL-026). A first literature tranche finds no measured AI price elasticity and no measured open/closed lag, and shows that benchmark scores depend on inference budget and protocol (CL-040, CL-042). An analytical identity locates the energy break-even at an elasticity of one only under proportional price and intensity reductions with unchanged success and facility conditions (CL-013). An indexed, uncalibrated lab lets readers vary those conditions.

Every company figure is located in author-attested filing copies but stays unverified until the financial review is recorded. No elasticity, catch-up lag, cost or energy per successful task, or company energy estimate is claimed. The abstract will be rewritten when reviewed results exist.

<a id="p01"></a>
## P01 — The efficiency question and competing mechanisms

The consequential question is not whether a particular AI operation becomes cheaper. It is whether cheaper, more capable useful work reduces total resource demand or induces enough additional use to offset the improvement, and how benefits and burdens are distributed.

The provisional literature gives reasons to consider more than one regime. UKERC's indexed review description treats rebound as a factor in realized savings, not proof that efficiency cannot save energy ([SRC-006](../SOURCES.md#src-006), CL-008). Indexed text from Masanet and colleagues describes historical data-center compute growth outpacing energy growth ([SRC-009](../SOURCES.md#src-009), CL-015). These sources motivate both rebound and effective resource-conservation scenarios. Neither estimates frontier-AI elasticity today.

The proposed causal chain is technical/task efficiency → useful-task cost → price and product design → demand and workload mix → model/provider allocation → capacity and energy consequences. Each arrow needs evidence or an explicitly labeled assumption. The task-demand identity captures a direct response; spending elsewhere, capability change, and economy-wide effects require additional analysis.

The first supplied literature tranche sharpens what is missing rather than settling the question ([tranche 01 S4](../research/LITERATURE-TRANCHE-01.md#s4)). None of its seven sources measures or borrows an AI price elasticity. Rapid token growth is reported from vendor trackers ([SRC-022](../SOURCES.md#src-022), CL-046), but tokens are not tasks, and the same source lists ways those trackers overstate demand. The source's solvency corridor and scenario probabilities are outputs of assumed parameters, so they can structure a stress test but cannot calibrate one (CL-045).

**Research backing:** [R01](../research/INDEPENDENT-EVIDENCE.md#r01), [tranche 01](../research/LITERATURE-TRANCHE-01.md#synthesis), W4 in [PLAN §3](../PLAN.md#3-evidence-work-packages). Full-text review and empirical AI-demand literature remain open.

<a id="p02"></a>
## P02 — Evidence method and filing chronology

Anthropic is the initial company anchor; the author attested the supplied primary documents authentic on 2026-11-28. The source hierarchy favors filings and official disclosures, then independent research, with estimates and scenarios labeled separately. A claim described as “reported” is not automatically verified; classification, verification state, source confidence, and review status answer different questions.

The original S-1 and Amendment 1 are received text captures ([SRC-001](../SOURCES.md#src-001), [SRC-002](../SOURCES.md#src-002)), alongside Amendments 2/3, the final prospectus and November 25 8-K (SRC-014–SRC-017). All six headers name the same issuer and CIK, with accessions and acceptance times matching the captured indices (CL-011). That is internal agreement. Authentication rests on the author's attestation of 2026-11-28 ([decisions](../SOURCES.md#author-decisions-2026-11-28)), not on a network check against SEC, which remains unavailable in the research environment.

The [W1 reconstruction](../research/W1-FILING-RECONSTRUCTION.md) applies one declared pattern per fact to all five registration-sequence documents and records each value with its line locator, so a reader can see where a figure first appears, when it changes, and where a version left a placeholder. Derived checks recompute quarterly footings, rounded ratios, growth rates and the commitment decomposition; all 22 pass. The lineage matters: the original S-1 reports results only through June 30, 2026 and leaves every commitment amount blank; Amendment 1 adds the September quarter and first quantifies commitments; Amendment 2 revises the commitment total and adds termination and exclusion disclosures; Amendment 3 and the final prospectus leave the extracted facts unchanged. The 8-K covers closing, governance and placement items, not a new compute or revenue series.

Four of the five initial financial claims are supported by located passages (CL-001–CL-004) and one is superseded (CL-005, see P06). “Supported” is a reconstruction disposition. Every company claim keeps `verification_state=unknown` until the financial reviewer (the author, for now) records a sign-off; successive filings by the same issuer are not independent corroboration. Amendment 1's joined text is not used to assert table alignment.

**F01 — Filing chronology and revision lineage:** `evidence.html#filing-timeline`. Static fallback: [W1 §2 identity table](../research/W1-FILING-RECONSTRUCTION.md#w1-identity) and the per-version [extracted facts](../data/extracted/w1-filing-facts.csv). Return destination: `paper.html#p02`.

<a id="p03"></a>
## P03 — Decomposing efficiency without collapsing denominators

Financial ratios can change through pricing, product/revenue mix, accounting boundaries, procurement terms, utilization, or technical efficiency. The ratio of compute expense to revenue alone cannot distinguish those drivers, and is not a measure of gross margin unless the accounting definitions support that relationship. Company revenue cannot be converted to physical energy without workload and infrastructure evidence.

The filings illustrate the problem. The issuer reports compute and infrastructure expense falling from 251% of revenue in Q1-2025 to 48% in Q2-2026, then rising to 58% in Q3-2026 when $5.0B of short-term compute was delivered (CL-002, CL-003). It defines “compute efficiency” as intelligence produced and revenue generated per dollar of compute invested (CL-024). That is a financial and capability definition. The expense line covers research, model development, serving and internal use as one shared pool, and its composition widens in 2026 as leases and depreciation begin. The ratio therefore mixes revenue growth, prepaid capacity coming online, procurement terms and workload mix; it reports no task, token or energy denominator. It is evidence that financial efficiency improved during a ramp, not a measure of useful-task or physical efficiency ([W1 §3](../research/W1-FILING-RECONSTRUCTION.md#w1-revenue-compute)).

The provisional task-energy literature describes different deployment costs across tasks and model configurations ([SRC-005](../SOURCES.md#src-005), CL-007). The appropriate denominator therefore includes useful output and quality, not just tokens or requests. For coding, test-defined issue resolution offers a candidate operational criterion ([SRC-010](../SOURCES.md#src-010), CL-016). Different task subsets and harnesses, including SWE-bench Verified, must not be merged into one supposedly comparable score ([SRC-011](../SOURCES.md#src-011), CL-017).

Inference-time compute makes the denominator harder still. A controlled evaluation of six frontier models found that larger token budgets added about 12 points on some benchmarks and about 0.3 on SWE-Bench Pro, and that repeated submissions raised scores everywhere ([SRC-021](../SOURCES.md#src-021), CL-040, CL-043). Success rate and energy per attempt are therefore set together by the reasoning budget and protocol; a falling price per token need not mean a falling price per successful task. Larger models in one distilled family did not give shorter correct answers (CL-044), and realized serving cost on identical hardware varied more than seventyfold with utilization (CL-048). Cost per successful task without protocol and serving metadata is not comparable ([tranche 01 S2](../research/LITERATURE-TRANCHE-01.md#s2)).

The proposed useful-task measures count failed attempts, retries, context and tools. They display success rate alongside cost and energy per successful outcome. Extraction and bounded-agent rubrics must be defined in advance; they cannot inherit a coding rubric by analogy. The author adopted rubric [`0.4.0`](../research/WORKLOAD-RUBRICS.md#selections) on 2026-11-28. Coding success is a single delivered patch passing the task's tests; extraction success requires every field correct, numeric accuracy of at least 0.98 and a hallucination rate within one point of the frontier model's; agent success is a final-state check with no prohibited action. Each counts every attempt, and reliability is reported as the share of tasks solved in all three runs.

**F02 — Denominator comparison (live; mostly unknown by design):** `efficiency.html#task-and-financial-measures`. Six measures each keep their own unit and denominator; only the financial ratio has located values, and every other row states why it is unknown. Static caption: show model/operation compute, successful-task cost, financial ratios, capacity use and operational energy as distinct measures with their units and missing-data states. The financial row may show the reported ratio series with its composition caveat once reviewed; no task or energy row is populated from filings, which disclose neither. Return: `paper.html#p03`.

**Research backing:** [R02](../research/INDEPENDENT-EVIDENCE.md#r02), [W1 §3](../research/W1-FILING-RECONSTRUCTION.md#w1-revenue-compute), [tranche 01 S2](../research/LITERATURE-TRANCHE-01.md#s2), [rubric 0.4.0](../research/WORKLOAD-RUBRICS.md#selections), W2; financial series located, review pending.

<a id="p04"></a>
## P04 — What it would mean for an open model to catch up

The initial four-to-six-month hypothesis is testable only after specifying equivalency. Epoch's indexed analysis concerns an aggregate ECI gap, with a caution about public/private benchmark differences ([SRC-004](../SOURCES.md#src-004), CL-006). It is not an observed distribution of production substitutes for a particular Claude workload.

We distinguish benchmark catch-up, workload catch-up, and commercial catch-up. The second requires a matched task rubric and quality/cost configuration; the third adds licensing, serving availability, region, throughput, reliability and operational requirements. Open weights alone do not settle those requirements.

The benchmark clock is more fragile than it looks. Scores move with token budget, feedback, submission rule and parallel sampling, and 42 of 61 published evaluation citations do not record a token budget at all ([SRC-021](../SOURCES.md#src-021), CL-040, CL-042). Many published open-versus-closed score pairs will therefore be **not comparable**, a status distinct from matched or censored. Release type and licence also vary: in 2025, 47 of 102 notable models were released through API access, and 81 of 102 without training code (CL-051). Two supplied preprints assert open-weight parity without a stated method, and one relays a press claim that an open-weight model matches proprietary flagships at a fraction of the price (CL-047). These are leads, not measurements. No source in the tranche measures the lag, so CL-006 and the four-to-six-month hypothesis are unchanged ([tranche 01 S1](../research/LITERATURE-TRANCHE-01.md#s1)).

The adopted rubric fixes the comparison before any data are gathered ([rubric 0.4.0](../research/WORKLOAD-RUBRICS.md#selections)). Coding uses the SWE-Bench Pro public set, comparing only leaderboard rows run in one harness configuration; SWE-bench Verified serves as contamination-flagged history because its tasks have leaked into training data (CL-052, CL-053). Agents use τ²-bench, and extraction uses a set built from this project's own attested filings. An open model **matches** a frontier release when its success rate is statistically no worse than the frontier model's by a margin that shrinks with task count (three points at 731 tasks, four at 279). Both the confirmed and the point-estimate match dates are reported. Each clock is summarized by a Kaplan–Meier median lag, and the four-to-six-month hypothesis is judged in advance as consistent, refuted or inconclusive from that median's 95% interval. With few frontier releases, inconclusive is the likely first outcome.

The release-pair investigation will retain frontier releases without a match by the cutoff as censored records. It will also record configuration and endpoint availability, rather than treating a model-release date as immediate commercial readiness. At present no release-pair dataset or equivalency distribution has been evaluated; no numerical lag finding is claimed.

**F03 — Release-pair clocks (planned):** `equivalency.html#release-pairs`. Static caption: show three clocks and an explicit “not observed by cutoff” state, with workload/harness versions and license caveats. No invented matched pair is supplied. Return: `paper.html#p04`.

**Research backing:** [R03](../research/INDEPENDENT-EVIDENCE.md#r03), [tranche 01 S1](../research/LITERATURE-TRANCHE-01.md#s1), [rubric 0.4.0](../research/WORKLOAD-RUBRICS.md#selections), W2/W3.

<a id="p05"></a>
## P05 — Demand response and the conditional rebound threshold

For a defined workload, use nonnegative price-elasticity magnitude `e`. With positive prices, the scenario demand ratio is `(P1/P0)^(-e)`. This is a modeling assumption about price response, not a fitted relationship. Identifying real elasticity requires variation that distinguishes price from capability, customer growth, budgets, routing and other changes. A simultaneous price reduction and revenue increase does not identify it by itself. The filings show exactly that pattern: from Q2 to Q3 2026 revenue rose $5.4B while the issuer attributes an offset of about $600M to price reductions with new model versions and contractual discounts (CL-004). New models, products and customers arrived in the same quarter, so the observation is co-movement, not an elasticity estimate. The literature tranche adds named confounders for any future estimate: supply-injected volume, channel substitution, subsidies, low-value context re-reading, base effects, budget rationing and relocation from metered cloud to owned hardware. Relocation moves load out of a provider's revenue without removing it from the grid ([SRC-022](../SOURCES.md#src-022); [tranche 01 S4](../research/LITERATURE-TRANCHE-01.md#s4)).

A further obstacle is specific to this case. The issuer says it has consistently operated with customer demand exceeding available compute, and that it has changed usage and rate limits (CL-026). When supply binds, observed usage measures capacity allocated, not demand at the posted price; non-price rationing changes the effective price without changing the list price; and new capacity arrived in the same quarter as the reported price cuts. Revenue is mainly consumption-based and not under long-term contracts (CL-027), so a demand response would show up quickly, but the quarterly series cannot isolate it. While the constraint binds, near-term energy use may follow **delivered capacity** more than price response, which ties this section to the commitments in P06 and the stress boundaries in P09. That is a framing hypothesis for review. The [identification note](../research/W4-DEMAND-IDENTIFICATION.md) lists confounders and candidate strategies, each with the data it would need; none is feasible with evidence in hand.

Facility energy is expected attempted work times IT energy per attempt times matched PUE. Under the declared repeated-attempt model, successful task demand `S` and success rate `s>0` imply expected attempts `S/s`. Combining these definitions gives:

```text
E1/E0 = (P1/P0)^(-e) × (s0/s1) × (I1/I0) × (p1/p0)
```

If price and IT energy per attempt both decline by factor `g`, with `0<g<1` and success/PUE unchanged, `E1/E0=g^(1-e)`. Thus the threshold `e=1` is a conditional analytical result (CL-013), not a universal rule. Partial pass-through, quality changes, routing and changed facility intensity can move the boundary.

**F04 — Rebound threshold (live, illustrative):** `rebound.html#elasticity-threshold`. The explorer computes the threshold `e*=ln(k)/ln(q)` and the energy ratio across elasticities with the shared `task-energy/0.4.0` engine; every input is a declared scenario value, not a measurement. Static caption: under the stated proportional conditions, energy falls for `e<1`, stays unchanged for `e=1`, and rises for `e>1`; changing other conditions requires recalculation. Return: `paper.html#p05`.

**Research backing:** [R05](../research/INDEPENDENT-EVIDENCE.md#r05), [W4 identification note](../research/W4-DEMAND-IDENTIFICATION.md), [specification modeling rules](../SPECIFICATION.md#8-modeling-rules-and-edge-cases), W4/W7. No actual elasticity estimate is available.

<a id="p06"></a>
## P06 — Provider economics and committed capacity

Open-model substitution may change who serves a workload without reducing aggregate useful-task demand. A frontier lab could retain high-value tasks while losing repeatable price-sensitive traffic; conversely, product integration, governance, reliability and migration costs could slow substitution. These are hypotheses to investigate, not findings about Anthropic's realized margins.

Capacity economics must distinguish installed, available, contractually committed, and economically demanded capacity, with compatible units and delivery dates. Price pressure does not automatically imply insolvency. Cancellation rights, financing conditions, contract amendments, hardware usability, fixed obligations and realized utilization require contract-level evidence.

The initial research candidates are CoreWeave, Nebius, Lambda and Crusoe for infrastructure, and Together AI, Fireworks AI and Baseten for managed inference. They are research cohorts, not a list of Anthropic counterparties or a ranking. Provider-specific disclosures remain acquisition tasks.

The final prospectus states aggregate contractual obligations and commitments of about $900.9B, substantially all compute and infrastructure, as of and after September 30, 2026 (CL-020). This replaces Amendment 1's $895.4B, which the initial draft carried (CL-005, superseded); the whole change is $5.5B of commitments signed after the quarter. Exposure is not one number. About $186.2B is subject to termination rights or contingent conditions, and an estimated $150–175B of variable arrangements is excluded from the total (CL-021). The named arrangements, including Amazon, Google, Microsoft, SpaceXAI, Broadcom and AMD, use different instruments, terms and conditions and must not be summed (CL-022).

Of the seven research candidates, only Lambda is named as a counterparty: about $41.3B of agreements into 2034, with fees only as capacity is delivered and accepted, of which an August 2026 agreement of about $34.9B is currently terminable by either party because Lambda did not secure a facility lease in time (CL-023). Nscale and Fluidstack are also named. The other six candidates are not named in these documents, which is not evidence that no relationship exists. This gives the provider chapter one evidenced, explicitly fragile edge, and shows why delivery and financing conditions matter more than headline totals ([W1 §5–6](../research/W1-FILING-RECONSTRUCTION.md#w1-commitments)).

**F05 — Commitment exposure (live, located and unverified):** `providers.html#commitment-exposure`. The view shows the issuer's decomposition of the aggregate, the excluded variable estimate and the conditional amount as a characteristic rather than a component, the named arrangements with their instruments and revisions, and the seven research candidates with unknown fields left visible. Static caption: separate fixed, variable, conditional and excluded commitments; show the evidenced Lambda edge with its termination status; retain unknown relationships and incompatible metrics. No summed exposure across instruments. Return: `paper.html#p06`.

**Research backing:** [W1 §5–6](../research/W1-FILING-RECONSTRUCTION.md#w1-commitments), W5; CL-012/CL-020–CL-023 located but unverified. Provider-side evidence is still to be acquired.

<a id="p07"></a>
## P07 — Operational energy, geography, and excluded impacts

Sector energy reports provide context, not a shortcut to company allocation. The indexed LBNL and IEA descriptions cover historical estimates and future scenarios, with different geography and inclusion of non-AI services ([SRC-007](../SOURCES.md#src-007), CL-009; [SRC-008](../SOURCES.md#src-008), CL-010). We have not inspected their full methods and do not insert their headline totals into the company model.

Operational electricity, historical emissions accounting, fixed-grid marginal response, and long-run effects of persistent load are different questions. Indexed EPA and Cambium records identify candidate methods, but annual inventory rates and long-run modeled rates are not interchangeable ([SRC-012](../SOURCES.md#src-012), CL-018; [SRC-013](../SOURCES.md#src-013), CL-019). Each calculation must disclose year, geography, units, factor type, grid assumptions, and coverage.

Unlocated capacity remains unlocated; US factors are not applied to non-US commitments. Direct cooling water is separate from electricity-generation water, and both are distinct from embodied/construction impacts. Missing factors produce unknowns or clearly labeled sensitivity scenarios, not zero impact.

**F06 — Location coverage (planned):** `impacts.html#location-coverage`. Static caption: quantify the share of capacity with documented compatible regional evidence and show excluded/unknown locations. There is no regional capacity allocation or company energy total in this draft. Return: `paper.html#p07`.

Secondary energy figures in the tranche illustrate the boundary problem. One estimate converts chip power ratings into about 29.6 GW of AI data-center capacity using a roughly 2.5× multiplier (CL-049). Modeled per-prompt estimates span roughly 5 to 23 Wh depending on model and reasoning setting (CL-050). Neither is company metering, and neither is energy per successful task. Both are order-of-magnitude context only ([tranche 01 S5](../research/LITERATURE-TRANCHE-01.md#s5)).

**Research backing:** [R04](../research/INDEPENDENT-EVIDENCE.md#r04), [tranche 01 S5](../research/LITERATURE-TRANCHE-01.md#s5), W2/W6.

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

**F07 — Scenario comparison (live, illustrative):** `rebound.html#scenario-comparison`. Three uncalibrated indexed futures (efficient abundance, rebound acceleration, demand air pocket / open-model substitution) with editable inputs, field-level errors, sensitivity and exportable run manifests that replay inputs and results with the pinned model version. Static fallback: the table above and the declared equations. Return: `paper.html#p08`.

**Research backing:** [R05](../research/INDEPENDENT-EVIDENCE.md#r05), W7; real scenario results pending.

<a id="p09"></a>
## P09 — Uncertainty and reverse stress tests

Monte Carlo methods can propagate declared uncertainty but do not transform assumed distributions into measured event probabilities. Distribution choice, parameter correlations, seeds, failures, and model/data versions must accompany the results. No stochastic trials have been run for this paper.

The initial reverse tests investigate compute-cost pressure, committed-capacity mismatch, and regional power constraints. The two illustrative financial/capacity boundaries are expense above 60% of revenue and use below 60% of available committed capacity, respectively, for four consecutive comparable quarters. The regional boundary compares required load with documented deliverable supply in a matched period.

These are research triggers, not solvency, covenant, climate, or community acceptability certificates. Applying the compute-pressure trigger to the reported quarters shows why (CL-025): expense exceeded 60% of revenue in every 2025 quarter (251%, 177%, 148%, 144%) and in Q1-2026 (72%), so the four-quarter boundary was met during 2025, a period when revenue grew more than fivefold while committed capacity came online. Q2 and Q3 2026 were 48% and 58%. Crossing the boundary during a deliberate ramp is not a failure signal, and continuity across 2025–2026 depends on the composition change noted in P03 ([W1 §7](../research/W1-FILING-RECONSTRUCTION.md#w1-stress)). The capacity-use and regional-power tests remain unevaluated: the filings disclose no utilization or facility-level supply. A search finding no breach within its domain is not evidence of safety outside that domain; claiming a minimal shock requires publishing the search method and admissible assumptions.

**F08 — Stress boundaries (live for compute pressure only):** `uncertainty.html#stress-boundaries`. The view evaluates the compute-pressure history with an adjustable illustrative threshold and shows capacity use, regional power and Monte Carlo as insufficient evidence or not yet run. Static fallback: the three definitions above; the compute-pressure history as a derived table with its comparability caveat; “insufficient evidence” for capacity use and regional power. No forward probability. Return: `paper.html#p09`.

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

Still unknown after the first literature tranche ([S7](../research/LITERATURE-TRANCHE-01.md#s7)): any measured distribution of open/closed lags at any of the three clocks; open-weight results under protocols matched to frontier results; dollar cost and energy per successful task for any current model; whether token-efficiency gains offset rising test-time budgets; and any identified AI price elasticity.

**Questions for review.** Each question points to the record a reviewer would check.

| Area | Question | Where to check |
| --- | --- | --- |
| Filing evidence | Do the W1 dispositions hold, and is a four-quarter comparison across the 2026 change in expense composition defensible? (Capture authenticity was attested by the author on 2026-11-28.) | [W1 §8–10](../research/W1-FILING-RECONSTRUCTION.md#w1-claims), `evidence.html#claims` |
| Commitments | Is treating the conditional $186.2B as a characteristic rather than a component the right reading? Should Nscale and Fluidstack enter the provider cohort? | [W1 §5–6](../research/W1-FILING-RECONSTRUCTION.md#w1-commitments), `providers.html` |
| Rubrics | Rubric `0.4.0` was adopted on 2026-11-28. Once Phase 1 data arrive, do the size-dependent margin and the single-harness rule leave enough comparable pairs? | [Rubric 0.4.0](../research/WORKLOAD-RUBRICS.md#selections) |
| Equivalency | Are the three clocks and the separate “not comparable” status the right structure for P04? | [Tranche 01 S1](../research/LITERATURE-TRANCHE-01.md#s1) |
| Demand | Is the successful-task own-price elasticity the right estimand? Should the scenarios add a capacity-constrained regime? | [W4 note](../research/W4-DEMAND-IDENTIFICATION.md#w4-review) |
| Model | Are the indexed presets and the threshold explorer clear about what they are not? | [Data dictionary](../DATA-DICTIONARY.md), `rebound.html` |
| Stress triggers | Are the illustrative 60% triggers useful, given that the reported history crosses one during a ramp? | [W1 §7](../research/W1-FILING-RECONSTRUCTION.md#w1-stress), `uncertainty.html` |
| Traceability | Can every number be followed to a source line or a formula? | `evidence.html`, [extracted facts](../data/extracted/w1-filing-facts.csv) |
| Impacts | Which local impacts and participant perspectives are still missing? | P07, P10 |

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
| [SRC-020](../SOURCES.md#src-020)–[SRC-026](../SOURCES.md#src-026); [literature tranche 01](../research/LITERATURE-TRANCHE-01.md) | Four arXiv preprints (2026), Stanford AI Index 2026 Ch. 1, Anthropic provable-inference post | P01/P03/P04/P05/P07/P11; CL-040–CL-051; supplied local text, unreviewed, licensing of three files unresolved |
| [Workload rubrics `0.4.0`](../research/WORKLOAD-RUBRICS.md#selections); [SRC-027](../SOURCES.md#src-027)–[SRC-031](../SOURCES.md#src-031) | Adopted coding, extraction and bounded-agent rubrics; task-set sources from indexed search | P03/P04; adopted 2026-11-28 (OQ-02) |
| [W1 reconstruction](../research/W1-FILING-RECONSTRUCTION.md), [extracted facts](../data/extracted/w1-filing-facts.csv), [derived checks](../data/derived/w1-reconciliation-checks.csv) | Reproducible filing extraction (`node tools/extract-filing-facts.mjs --check`) | P02/P03/P05/P06/P09; CL-001–CL-005, CL-011/CL-012, CL-020–CL-025 |

**Reproducibility status:** The indexed rebound lab (F04/F07) uses the shared deterministic engine `task-energy/0.4.0`, defined in [DATA-DICTIONARY.md](../DATA-DICTIONARY.md), and exports run manifests (`frontier-half-life/run-manifest` 1.0.0) that replay its illustrative scenarios. No company-calibrated dataset or Monte Carlo trial set exists. Current algebra and synthetic inputs are fully shown in P05/P08 and [R05](../research/INDEPENDENT-EVIDENCE.md#r05). Later snapshots must pin paper, source/data/model versions and manifests; a live update must not silently change a reviewed result.

**v0.4, 2026-11-27:** Initial coordinated manuscript, independent literature synthesis, source-access triage, and synthetic identities. Primary filings are being gathered by the author; remediation is planned, not completed. The initial author is **yorkerhodes3**. Repository original work is MIT licensed; third-party materials retain their respective terms.

**v0.4 intake update, 2026-11-28:** Requested text intake complete; claim reconciliation pending. PDF retrieval waived by author; non-analytical demo shell authorized and revised specification/plan/backlog separately approved. Evidence cutoff stays 2026-11-27; analytical release is not approved.

**v0.4 W1 update, 2026-11-28:** Text-based filing reconstruction: located passages and line locators for all initial company claims; 22 derived checks pass; CL-005 superseded by CL-020; new claims CL-020–CL-025; P02/P03/P05/P06/P09 revised. All company claims remain unverified pending origin authentication and financial review.

**v0.4 rubric adoption, 2026-11-28:** The author approved the workload-rubric selections as proposed (rubric `0.4.0`, OQ-02 resolved). P03, P04, P11 and P12 updated; CL-052–CL-054 added. Phase 1 (no spend) begins.

**v0.4 author decisions, 2026-11-28:** The author attested the supplied filing copies authentic, named themself financial reviewer for now, and approved using the supplied literature files as attributed input ([decisions](../SOURCES.md#author-decisions-2026-11-28)). No claim changes state until the financial review is recorded. Workload-rubric selections were proposed separately for the author's review.

**Correction to snapshot r1, 2026-11-28:** The entry below says a GitHub pre-release attaches the PDF. Creating releases is not permitted for the session that produced the snapshot, so no release exists. The tag `v0.4-review.1` exists as described. The PDFs, printed from the tagged commit with every repository link pointing at the tag, are published at `docs/snapshots/v0.4-review.1/` with SHA-256 checksums and linked from the top of this reader. The snapshot text is left unchanged, so its PDF still contains the original sentence.

**v0.4 review snapshot r1, 2026-11-28:** The git tag `v0.4-review.1` pins the commit containing this entry: manuscript, claim ledger, figure registry, W1 extraction, model `task-energy/0.4.0` and manifest schema 1.0.0. A pre-release with the same tag attaches a PDF of this reader whose source links point at the tag, not at `main`. The live reader keeps changing; review comments should cite the snapshot. This is a review draft, not an analytical release.

**v0.4 demand-identification update, 2026-11-28:** T-018 note added; CL-026 (supply constraint and non-price rationing) and CL-027 (consumption-based revenue) located; P05 states why the filing series cannot identify an elasticity.

**v0.4 literature update, 2026-11-28:** Literature tranche 01 (SRC-020–SRC-026, CL-040–CL-051) and draft workload rubrics integrated into P01/P03/P04/P05/P07/P11/P12. No elasticity or open/closed lag is measured by any supplied source; CL-006 unchanged. The manuscript is published on Pages as the live reader (review draft).
