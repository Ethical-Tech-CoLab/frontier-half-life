# Independent evidence and analytical foundations — v0.4

**Initial author:** yorkerhodes3. **Cutoff / research date:** 2026-11-27.
**Status:** Provisional synthesis of inspected indexed source passages plus explicit analytical derivations. Full-text source review and empirical calibration are incomplete.

This work proceeds independently of the pending Anthropic filings. It does not establish any of the initial financial figures, provider relationships, actual workload elasticities, or company energy estimates. See the [access record](../SOURCES.md#independent-continuation-pass) and [claim ledger](../CLAIM-LEDGER.csv).

<a id="r01"></a>
## R01 — Rebound is a question, not a predetermined result

The indexed UKERC review description treats rebound as a reason realized savings may differ from engineering expectations, while still recognizing efficiency's potential to save energy ([SRC-006](../SOURCES.md#src-006), CL-008). Its project description illustrates direct rebound through cheaper use of a single service. This supports examining demand response; it does not provide an AI elasticity or prove economy-wide backfire.

An independent historical counterpoint comes from indexed text of Masanet and colleagues' data-center estimates: compute instances grew much faster than energy consumption in 2010–2018, with equipment, virtualization, and facility efficiency as explanatory mechanisms ([SRC-009](../SOURCES.md#src-009), CL-015). We have not retrieved the full methodology; numerical values from that paper are not adopted as calibration.

**Research consequence:** Include efficient-abundance and demand-slowdown scenarios as seriously as rebound acceleration. The sector may experience different regimes across periods and workloads. A task-level direct-demand equation is not a substitute for indirect spending effects or macroeconomic adjustment.

**Open work:** Full-text UKERC/Masanet review; competing empirical findings; AI/service-demand studies with identifiable price variation rather than merely rising usage. Feeds W4, paper P01/P05/P11.

<a id="r02"></a>
## R02 — Define useful work before comparing efficiency

The indexed abstract and passages from *Power Hungry Processing* describe task-dependent deployment energy measurements rather than a single universal per-inference cost ([SRC-005](../SOURCES.md#src-005), CL-007). The project must retain task, model, serving/hardware configuration, output length, and quality when transferring such evidence. These historical experiments are not measurements of contemporary Claude or OpenAI infrastructure.

SWE-bench provides a candidate coding-task definition: generated patches are tested against the repository's issue-resolution tests ([SRC-010](../SOURCES.md#src-010), CL-016). OpenAI's indexed Verified announcement describes human-reviewed task selection ([SRC-011](../SOURCES.md#src-011), CL-017). The datasets and harness versions differ. Neither the benchmark name “Verified” nor a test pass implies general commercial equivalency.

**Proposed rubrics, not evaluated results:**

| Workload | Success definition to fix before comparison | Account for | What remains unestablished |
| --- | --- | --- | --- |
| Coding | A specified task set and harness passes issue-resolution and regression tests | Failed patches, repeated attempts, context, tools, model and agent configuration | General code quality, deployment reliability, contamination, and customer-specific utility |
| Extraction | A specified set of documents and schema meets a preregistered field-accuracy/error rubric | Abstentions, malformed output, retries, verification effort | Dataset/license choice and exact thresholds; not borrowed from a coding score |
| Bounded agent workflow | A stated end goal within declared time/tool/step limits | All subtasks, failures, retries and verification, including failed loops | Whether an observed success transfers to longer autonomous workflows |

Cost per successful task is total attributable cost across all attempts divided by successful outcomes, provided there are successful outcomes. Energy uses the same accounting boundary. Multiplying by retries again after an attempt count already includes them would double-count work.

**Open work:** Fix licensed task sets and rubrics, inspect harnesses and study limitations, compare price histories at matched quality/configuration. No benchmark run or paid inference experiment has been performed. Feeds W2, paper P03/P04/P07.

<a id="r03"></a>
## R03 — Benchmark, workload, and commercial catch-up are different clocks

Epoch's indexed analysis describes an aggregate ECI capability gap and cautions that public/private benchmark performance may differ ([SRC-004](../SOURCES.md#src-004), CL-006). An aggregate four-month statement is therefore a lead for investigation, not a measured distribution of commercially equivalent Anthropic substitutes.

For each frontier release, define:

1. **Benchmark clock:** First later open-weight release meeting a declared evaluation threshold, with index/harness version preserved.
2. **Workload clock:** First later release meeting the project's task-quality, cost and reliability rubric.
3. **Commercial clock:** First production availability meeting the relevant licensing, region, support, throughput and operational requirements.

A release can match one clock and remain unmatched on another. At the cutoff, preserve unmatched frontier releases as right-censored records; dropping them selectively would shorten observed lags. Track release-to-endpoint delay separately from model release date. “Open weights” is not necessarily open training data/code or unrestricted commercial deployment.

**Open work:** Build actual release-pair records from official releases and comparable evaluations; select equivalency criteria before examining favorable pairs. No time-to-equivalency distribution is yet estimated. Feeds W3, paper P04/P11.

<a id="r04"></a>
## R04 — Energy boundaries and electricity factors must match the question

Indexed official LBNL and IEA descriptions provide sector estimates and scenarios, not company-specific meter readings ([SRC-007](../SOURCES.md#src-007), CL-009; [SRC-008](../SOURCES.md#src-008), CL-010). Their global/US scopes, editions, methods, and inclusion of non-AI services must be retained before comparing values. We do not allocate sector totals to Anthropic by revenue share.

EPA's indexed eGRID FAQ distinguishes output accounting rates and nonbaseload rates ([SRC-012](../SOURCES.md#src-012), CL-018). Indexed Cambium records describe modeled future and long-run marginal metrics that may include structural grid changes ([SRC-013](../SOURCES.md#src-013), CL-019).

| Question | Candidate evidence type | Limit |
| --- | --- | --- |
| How much operational electricity was consumed? | Matched-period IT/facility load, meter or documented operational estimate | PUE converts matched IT load to facility load; it is not a carbon or water factor |
| How should historical electricity emissions be accounted for? | Matched-year geographic inventory/output factor | Annual average is not the consequence of an extra request at a particular hour |
| What changes on a fixed grid at the margin? | Documented short-run marginal method; nonbaseload proxy only with caveats | No facility-specific dispatch inference from geography alone |
| What might a long-lived new load cause? | Disclosed long-run grid scenario and marginal method | Modeled structural response is not observed history or a guaranteed forecast |

Apply emission factors only after matching kWh/MWh, CO2 versus CO2e, location, reporting period, and operational boundary. Separate direct cooling water from water associated with electricity generation, and separate both from embodied/construction effects. Missing locations and factors stay unknown.

**Open work:** Inspect full reports and data editions; acquire actual regional load/utility/permitting evidence; report located capacity coverage. Community acceptability is a stakeholder decision, not a numerical default. Feeds W6, paper P07/P10.

<a id="r05"></a>
## R05 — Analytical rebound threshold, with constraints

This is a **derived identity**, not an empirical estimate (CL-013). Let desired successful tasks be `S`, price per successful task `P`, success probability `s`, IT energy per attempt `I`, and matched facility PUE `p`. With independent repeated attempts represented by a positive success rate, expected attempts are `A=S/s`; this is not a realistic retry policy unless the model's retry assumptions are declared.

For positive baseline/new prices and nonnegative elasticity magnitude `e`:

```text
S1/S0 = (P1/P0)^(-e)
E = (S/s) × I × p
E1/E0 = (P1/P0)^(-e) × (s0/s1) × (I1/I0) × (p1/p0)
```

If price and IT intensity both fall by the same positive factor `g<1` and success/PUE stay fixed, `E1/E0=g^(1-e)`. Energy falls when `e<1`, is unchanged at `e=1`, and rises when `e>1`. The result is conditional on price pass-through, task quality, demand baseline, success rate, and facility boundary.

For price ratio `q<1` and effective intensity ratio `k=(s0/s1)(I1/I0)(p1/p0)>0`, the break-even value solves `q^(-e)k=1`, or `e*=ln(k)/ln(q)`. This may be negative or outside the modeled elasticity range. For unchanged price, zero price, or zero baseline energy, do not pretend the logarithmic or ratio formula remains defined. Model free prices or zero-energy boundaries separately.

**Synthetic verification fixtures (CL-014):**

| Case | Baseline successful tasks | Success rate | Price ratio | IT kWh/attempt | PUE | Facility kWh |
| --- | --- | --- | --- | --- | --- | --- |
| Baseline | 100 | 0.5 | 1 | 0.01 | 1.2 | 2.4 |
| Halved price/intensity, `e=1` | 100 | 0.5 | 0.5 | 0.005 | 1.2 | 2.4 |
| Halved price/intensity, `e=2` | 100 | 0.5 | 0.5 | 0.005 | 1.2 | 4.8 |

These fixtures check accounting/signs; they are not evidence of real demand, energy, savings, or provider economics. Task-cost reductions need not pass through fully to prices, and better capability may change what constitutes a task. Feeds W7, paper P05/P08.

<a id="r06"></a>
## R06 — Work allowed now and work requiring remediation

Continue source discovery, scoped literature synthesis, rubric design, algebra, reader/citation contracts, and writing methods/limitations. All retain review status and documented evidence access.

Do not fill company financial tables, estimate actual Anthropic margins, assert counterparty relationships, infer company electricity from revenue, fit historical quarters, or issue empirical stress conclusions without the relevant primary records. The author is gathering them; [the intake/remediation sequence](../PLAN.md#61-filing-intake-and-remediation) is the next step when they arrive.

This note is a bounded independent research tranche. It does not complete W2–W6, establish current price/energy values, or replace specialist review. Paper results and interpretations must be revised if fuller evidence contradicts these provisional source summaries.
