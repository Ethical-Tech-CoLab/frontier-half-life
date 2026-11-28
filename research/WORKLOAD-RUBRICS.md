# Workload rubrics — proposed for reviewer selection — v0.4

| Field | Value |
| --- | --- |
| Rubric version | `0.4-draft`, with selections `0.4-sel.1` proposed in [§0](#selections) |
| Project version | v0.4 |
| Initial author | yorkerhodes3 |
| Drafting support | AI assistance; human review required |
| Status | **Selections proposed for author review (2026-11-28) — not adopted.** At the author's request, [§0](#selections) chooses pragmatic task sets and thresholds with reasons. Until the author records a verdict, every value stays a proposal for [SPECIFICATION §12 OQ-02](../SPECIFICATION.md#12-open-questions-carried-forward) |
| Date | 2026-11-28 |
| Backlog / requirements | [T-005](../BACKLOG.md#now--independent-research-and-document-review); FR-03, FR-05; [SPECIFICATION §8](../SPECIFICATION.md#8-modeling-rules-and-edge-cases) |
| Builds on | [R02 proposed rubrics](INDEPENDENT-EVIDENCE.md#r02), [R03 clocks](INDEPENDENT-EVIDENCE.md#r03), [literature tranche 01](LITERATURE-TRANCHE-01.md) |
| Spend | Phase 1 needs no spend. Phase 2 runs need a separate spend decision; [§0.4](#selections-phases) gives cost ceilings |

These rubrics define how a later, reviewed release-pair dataset would decide success and equivalency for three workloads: coding, structured extraction and bounded agents. **[PROPOSED]** marks a value a reviewer must accept, change or reject before any comparison is evaluated. No task-set licence or version has been inspected, and no rubric has been run. Nothing here is a result. Published third-party results can enter a comparison only if they carry the comparability-critical metadata in [§1.7](#17-required-metadata); otherwise the pair is recorded as **not comparable**.

<a id="selections"></a>
## 0. Proposed selections for author review — `0.4-sel.1`

On 2026-11-28 the author asked for pragmatic thresholds and task sets, with reasons, for review before work continues. This section makes those choices. **Nothing here is adopted until the author records a verdict.** On approval, these values replace the matching [PROPOSED] items in §1–§5, the rubric version becomes `0.4.0`, and the paper's P03/P04 text is updated. Task-set facts below come from indexed web-search results on 2026-11-28 ([SRC-027](../SOURCES.md#src-027)–[SRC-031](../SOURCES.md#src-031)). They are leads to confirm, not full-text inspections.

<a id="selections-constraints"></a>
### 0.1 Constraints that drove the choices

1. **Zero incremental spend** for now (CONCEPT §9; SPECIFICATION §10). Phase 1 therefore uses only published results. Running models ourselves (Phase 2) needs a separate spend decision.
2. **Published results compare only within one harness.** 42 of 61 evaluation citations omit the token budget (CL-042). On SWE-Bench Pro, vendor model cards report scores from their own harnesses that sit well above the leaderboard's, by up to about 18 points in one reported case (CL-053). A pair is matched only within one published harness configuration.
3. **Contamination.** OpenAI stopped reporting SWE-bench Verified in February 2026 because frontier models could reproduce gold patches or problem details (CL-052). Prefer task sets built to resist this.
4. **Statistical power.** A "match" must be distinguishable from task-sampling noise, so the margin depends on the number of tasks.
5. **Licences.** Prefer permissive task-set and harness licences. Publish instance IDs and aggregate results, not task text.

<a id="selections-task-sets"></a>
### 0.2 Task sets

| Workload | Selection | Role | Why | Main limitation | Licence (indexed; confirm before use) |
| --- | --- | --- | --- | --- | --- |
| Coding | **SWE-Bench Pro public set** (731 instances). Only leaderboard rows run in the board's standard configuration (250-turn limit, uncapped cost) count as one protocol; 50-turn capped rows and mini-SWE-agent rows are separate protocols; vendor model-card scores are "not comparable" | **Primary**: benchmark clock (Phase 1), workload clock (Phase 2) | Built from copyleft repositories to resist contamination, and recommended by OpenAI in place of Verified (CL-052). 731 tasks support a 3-point margin. The leaderboard publishes confidence intervals. Same benchmark family as the tranche's inference-budget study (L02) | Turn-matched, not dollar-matched. Per-instance results are not published, so comparisons are unpaired. Open-weight coverage among the standard rows must be checked | Dataset licence field not found; source repositories are copyleft (GPL family). Not confirmed |
| Coding | **SWE-bench Verified, "Bash Only" view** (mini-SWE-agent, bash only, 250-step and $3.00 limits) | **Secondary**: history from 2024 | The only public series that runs every model in one minimal harness with a dollar cap (a true matched budget). Per-instance results are public in `swe-bench/experiments`, so paired tests are possible | Contaminated (CL-052). Every Verified match is labelled "contamination-flagged" and can never alone date a catch-up | MIT per the SWE-bench repository; the dataset card has no licence field |
| Extraction | **Project-built filing-fact set `ffx-0.4`**, about 150 instances from the six author-attested filing captures (see the note below the table) | **Primary**: workload clock only (Phase 2) | No public extraction benchmark with harness-matched open and closed results was found. The filings are public records, dated October–November 2026, after most disclosed training cutoffs. The set tests exactly the extraction this project relies on, and costs nothing to build | Single domain. Gold values partly come from our own patterns, so the reviewer must check them, and null-gold distractors test hallucination. About 150 instances gives a 6-point margin. No benchmark clock, because no public results exist | Public SEC filings; locators and gold values are already published in `data/` |
| Agents | **τ²-bench**, English text tasks: airline 50, retail 115, telecom 114 (pooled n = 279) | **Primary**: benchmark clock (same-simulator rows) and workload clock | Success is a final database-state check plus policy constraints, matching §4's rule that a prohibited action is a failure. Reliability (pass^k) is built in. MIT licence; widely reported | Leaderboard rows are self-submitted with different user simulators, so only rows sharing a simulator and harness version compare. The public benchmark clock may therefore be thin. The LLM user simulator adds variance and cost. Airline alone (50 tasks) is too small | MIT (secondary source); confirm in the repository |
| Agents | **Terminal-Bench 2.0** (89 tasks), rows run with the benchmark's neutral Terminus 2 harness only | **Secondary** | Apache-2.0, audited leaderboard, and many models under one harness (to confirm on the leaderboard) | 89 tasks gives an 8-point margin; overlaps coding | Apache-2.0 |
| — | Not selected: original SWE-bench (superseded and the most exposed), project sandbox goals (build cost; deferred), public extraction benchmarks (none suitable found) | — | — | — | — |

**`ffx-0.4` composition.** The W1 extraction holds 198 located fact-by-version instances, but only 73 distinct passages, because unchanged passages repeat across versions. Counting repeats would inflate n, so each distinct passage counts once; a version change, such as $895.4B to $900.9B, counts as a separate instance. The proposed set is:

- 73 distinct W1 passages, each with several fields: amount, unit, period, counterparty, term and condition;
- about 40 null-gold distractors from the same filings that mention the same terms but do not state the field, including the S-1 blank placeholders;
- about 40 exhibit records from the captured filing indices: exhibit number, title, agreement date and counterparty.

The financial reviewer checks every gold value before the set is frozen.

<a id="selections-thresholds"></a>
### 0.3 Thresholds and rules

| # | Item | Selection | Reasoning | Main alternative considered |
| --- | --- | --- | --- | --- |
| T1 | Equivalence margin δ | `δ = max(3, round(1.5 × 50/√n))` percentage points. n = 731 → 3; 500 → 3; 279 → 4; 150 → 6; 89 → 8. Below 80 tasks: report only, no match can be declared | `50/√n` is the largest standard error of one success rate on n tasks. With δ at 1.5 times that, a statistically confirmed match means the open model scored at least about level: with about 20% of tasks discordant, the one-sided bound needs a point difference of about zero or better at every n above. Unpaired comparisons, which use published intervals only, need the open model about 1–4 points ahead to confirm (1.3 at 731 tasks; 3.0 at 279), which is conservative. Smaller margins would make matches almost unconfirmable on small sets; larger ones would call clearly weaker models equivalent | A fixed 3 points for every set (unconfirmable below about 500 tasks) or a fixed 5 points (too lenient at 731) |
| T2 | Match rule | **Primary: confirmed match.** The one-sided 95% lower bound of (open − frontier) is at least −δ. Paired by task where per-instance results exist; unpaired from published intervals otherwise. **Also reported: nominal match.** The point estimate is at least frontier − δ. Every lag gives both dates | The confirmed date is defensible against noise. The nominal date shows how much the conclusion depends on the rule. Fixing both now prevents choosing after seeing the data (§1.6) | Point estimate only: shorter, noisier lags |
| T3 | Runs | Published results: single runs accepted, flagged "run variance unmeasured". Own runs: 3 per (model, task) at the primary budget. Reliability = share of tasks solved in all 3 runs (pass^3), reported for both models | Public sources rarely publish repeats. Three is the smallest count that reveals inconsistency, and it matches τ²-bench's pass^k | 5 runs: about 1.7× the cost |
| T4 | Delivered output | One delivered output per task. pass@k never enters a clock. No hidden-test or oracle feedback. The optional coding retry policy is dropped for v0.4 | Matches leaderboard practice. Crediting any correct attempt overstates deployable success (L02) | Allow up to 3 trajectories with visible-failure retries |
| T5 | Budgets (own runs) | **Coding:** $3.00 and 250 steps per instance as the primary budget, equal to the Bash Only cap, so own and public runs compare; plus one run each at $1.00 and $0.30 to reveal budget censoring. **Extraction:** at most 2 attempts (initial plus one schema-validator repair), ≤ $0.10 per passage, provider-default reasoning. **Agents:** τ²-bench harness defaults, gpt-5.2 user simulator (recommended in the benchmark's submission guide), ≤ $1.00 of agent spend per episode | Dollars compare across tokenizers; tokens do not (L04) | Token caps per model family |
| T6 | Extraction success | Schema-valid and every required field correct under the §3 normalization rules. Workload threshold: document success non-inferior (δ by n); numeric and monetary micro-accuracy ≥ 0.98; hallucinated-field rate ≤ the frontier model's + 1 point | Financial extraction is used whole. 0.98 allows at most one wrong number in 50. The 1-point allowance stops a rare event from failing a model on noise | Field-level F1 as success, which credits partly wrong outputs |
| T7 | Workload clock | Quality match only, with reliability also non-inferior. The cost ratio is reported but **not required**. (Change from the draft, which required cost ≤ 1.0×.) | Cost depends on serving configuration and price lists (CL-048), which are the commercial question. Requiring it here would make "capability caught up" depend on that day's prices | Keep cost ≤ 1.0× in the workload clock |
| T8 | Commercial clock | The later of the workload match and availability, where availability means: <br>• a licence permitting commercial use; <br>• **at least 2 independent hosted providers** with public per-token prices; <br>• context at least the largest the frontier model used in own runs (128K tokens as a placeholder until runs exist); <br>• available in the United States. <br>Cost per successful task must be ≤ 1.0× the frontier model's at production endpoints when own runs exist; otherwise "cost not evaluated". Throughput is not required in v0.4; it is not publicly observable and is recorded as unknown | Two providers indicate a market rather than one self-hosted demonstration. The cohort's providers and the filings are US-centred | One provider, or self-hosting only |
| T9 | Frontier references | Anthropic and OpenAI flagship releases with a qualifying score in the same harness configuration | Project scope (CONCEPT §9) | Add Google: broader, but outside scope |
| T10 | Open candidates | Open-weight releases dated after the reference, with licence class recorded. Noncommercial licences count for the benchmark and workload clocks, not the commercial clock | FR-03; licence classes differ (CL-051) | — |
| T11 | Pre-existing match and not comparable | Excluded from lag distributions, but counted and shown beside them. Sensitivity check: treat "not comparable" as censored | Keeps the main estimate clean while showing how much evidence was unusable | Drop them silently |
| T12 | Contamination | Verified matches are flagged and never the sole basis. Record model training cutoffs where disclosed. No date filter in v0.4, because cutoffs are mostly undisclosed | CL-052 | Date-filter tasks after both models' cutoffs |
| T13 | Cutoff and summary | Freeze the pair dataset at T = 2026-11-30. Summarize each clock with a Kaplan–Meier median lag, which handles right-censoring, and the share matched within 6 months | "Not observed by cutoff" is neither zero nor dropped (FR-03) | Mean lag over matched pairs only (biased short) |
| T14 | Four-to-six-month decision rule | Per clock: **consistent** if the 95% interval of the Kaplan–Meier median overlaps 4–6 months; **refuted** if it lies entirely outside; otherwise **inconclusive**. With few frontier releases, expect "inconclusive" in v0.4 | Fixed before any data, as §1.6 requires | Point median only |

<a id="selections-phases"></a>
### 0.4 Phases and spend

- **Phase 1 — no spend.** Can start on approval.
  - Assemble benchmark-clock pairs from four public sources: SWE-Bench Pro standard rows, SWE-bench Verified Bash Only (history, flagged), τ²-bench same-simulator rows, and Terminal-Bench 2.0 Terminus 2 rows.
  - Build the `ffx-0.4` gold set for the financial reviewer's check.
- **Phase 2 — needs a spend decision.** Own runs for the workload and commercial clocks. These are ceilings from the budget caps, not estimates, and each pair needs two models:
  - coding pilot on 150 stratified SWE-Bench Pro instances: up to $1,545 per model;
  - extraction on about 150–200 instances: up to $60 per model;
  - agents on 279 τ²-bench tasks: up to $837 per model, plus user-simulator cost.

<a id="selections-changes"></a>
### 0.5 Changes from `0.4-draft`

- The cost criterion moves from the workload clock to the commercial clock (T7, T8).
- The optional coding retry policy is dropped (T4).
- δ is now size-dependent, with an 80-task floor (T1).
- τ²-bench is added as the primary agent set; Terminal-Bench 2.0 becomes secondary.
- The extraction set is defined; the search for a public extraction benchmark is closed for v0.4.

<a id="selections-review"></a>
### 0.6 Most consequential choices for review

1. SWE-Bench Pro as the primary coding set, with Verified as flagged history only.
2. The size-dependent margin δ (T1) with confirmed matches as primary (T2).
3. Moving cost out of the workload clock (T7).
4. The project-built extraction set, whose gold you review as financial reviewer.
5. Phase 1 without spend; Phase 2 ceilings for a later decision.

## 1. Rules common to all workloads

### 1.1 Units

- **Task instance:** one item from a fixed, versioned task set, such as one issue, one document or one environment goal.
- **Attempt:** one complete model-driven try at producing a candidate final output for one task instance. Every retry, resubmission, parallel sample and environment restart is a separate attempt, whether it succeeds, fails, times out or is aborted.
- **Delivered output:** the single output the declared policy would hand to a user or downstream system.
- **Protocol:** scaffold or harness, budgets, feedback, submission and selection rules, and decoding settings ([§1.5](#15-inference-time-compute-and-budgets)).

### 1.2 Attempt and retry accounting

1. Each retry is an attempt. Failed, timed-out and aborted attempts count in tokens, cost and energy.
2. Count every billed token class: input, cached input, output, reasoning and tool-result re-reads. Count every model call inside an attempt, including sub-agents, context-compaction summaries and repetition or LLM-judge guards. Count tool or sandbox execution where its cost is attributable.
3. Feedback that would not exist in deployment, such as hidden test results or oracle correctness signals, must not steer retries. [PROPOSED] Allowed feedback is limited to what a deployed user would have: visible tests, compiler or build errors, schema validators, and the environment's own observable state. Rationale: oracle feedback changes measured success and is ecologically valid mainly where real verifiers exist ([L02](LITERATURE-TRANCHE-01.md#l02), L101, L221, L285).
4. A judge or verifier used *only for scoring* is reported separately and excluded from workload cost. A verifier the deployed process would also run, such as a test suite or schema validator, is included.
5. Retry policy is declared per rubric. Multiplying an attempt count by a retry factor again is double counting ([R02](INDEPENDENT-EVIDENCE.md#r02)).

### 1.3 Success, selection and scoring rule

- Success is judged on the **delivered output** under a policy fixed in advance. Crediting a task because *any* attempt or submission was correct overstates deployable success. In the tranche, scoring by first or last submission lowered solve rates on most benchmarks ([L02](LITERATURE-TRANCHE-01.md#l02), L123, L143).
- **Primary metric:** delivered-output success rate per task instance. **Secondary metrics:** pass@k with k and budget stated, but only alongside the non-oracle selector that would choose the delivered output, plus reliability (the fraction of independent runs solving each task).
- Partial credit never counts as success in cost or energy per successful task. It may be reported as a secondary quality metric.

### 1.4 Cost and energy per successful task

```text
attempts_total = sum over task instances of attempts (each retry/resubmission/parallel sample = 1)
n_success      = number of task instances whose delivered output meets the rubric
cost_total     = model charges for all tokens of all attempts + attributable tool/sandbox/deployable-verifier charges
cost_per_success = cost_total / n_success        # undefined if n_success = 0: report "no successful outcome"
energy_per_success = energy_total / n_success     # unknown if any energy component is missing; never zero-filled
```

For the [R05](INDEPENDENT-EVIDENCE.md#r05) / §8 model, use `s = n_success / attempts_total` and `I = IT_energy_total / attempts_total` measured **under the same protocol**. Then `(S/s)·I·p` reproduces the measured total without double counting. Because `s` and `I` move together with the inference budget, scenario edits should change them jointly ([tranche S2](LITERATURE-TRANCHE-01.md#s2)).

Prices are dated list prices with their source, unit and token classes; discounts, batch tiers and caching are recorded explicitly. A price without a date and source makes the cost comparison **not comparable**.

### 1.5 Inference-time compute and budgets

Benchmark outcomes depend on token budget, feedback, submission rules and serial versus parallel allocation ([L02](LITERATURE-TRANCHE-01.md#l02); CL-040, CL-043). Each rubric therefore declares:

- reasoning-effort setting and reasoning-token cap per call;
- total token cap per attempt;
- turn or step cap;
- wall-clock timeout;
- maximum submissions per attempt;
- parallel width and selection rule;
- context-compaction rule;
- decoding settings.

Two comparison modes are kept separate and never mixed in one pair:

- **Mode A — matched budget** (required for the benchmark and workload clocks). Both models run under the same caps. [PROPOSED] The primary budget unit is dated list-price dollars per attempt. Token caps are matched only within a shared tokenizer, because tokens are not comparable across tokenizers ([L04](LITERATURE-TRANCHE-01.md#l04), L583). [PROPOSED] Report a **budget ladder** of at least three budgets rather than one point, so near-saturated and budget-censored results can be told apart (L02 L281–L287).
- **Mode B — production default** (an input to the commercial clock). Each model runs at the provider's documented default or recommended setting on a named endpoint, with that setting recorded.

### 1.6 Thresholds fixed before comparison

Rubric version, thresholds, task-set version and identifier list, scoring-code version, harness version and budgets are recorded with a date before **any** pair is evaluated. A change creates a new rubric version. Earlier evaluations are not silently re-scored; if re-scored, both versions remain visible. A threshold may not be chosen after seeing which pairs it would match.

### 1.7 Required metadata

C = comparability-critical: if unknown, the pair is **not comparable** for the affected clock. R = recorded, with null meaning unknown.

| Field | Status | Why |
| --- | --- | --- |
| Model name, version or snapshot identifier, release date, access type | C | Pair identity; silent endpoint updates |
| Open-weight licence class (unrestricted / restricted / noncommercial) and licence text version | C (commercial clock) | Open weights are not necessarily commercially usable ([L05](LITERATURE-TRANCHE-01.md#l05), L194; CL-051) |
| Provider/endpoint or self-hosting stack; run date or published-result date | C | Results drift; release date ≠ evidence date ([R03](INDEPENDENT-EVIDENCE.md#r03)) |
| Served-model identity method (none / provider attestation / cryptographic proof) | R | Router substitution cannot be detected from outputs ([L07](LITERATURE-TRANCHE-01.md#l07), L16, L38) |
| Serving configuration: engine/version, batch/concurrency, utilization or load if known | R (C for energy) | Realized cost per token varies about 70-fold with utilization on identical hardware ([L03](LITERATURE-TRANCHE-01.md#l03), L65; CL-048) |
| Quantization and precision | C | Changes quality, memory and cost |
| Hardware (accelerator type and count) where known | R (C for energy) | Energy per attempt |
| Inference-time compute: reasoning effort, reasoning-token cap, total token cap, turn/step cap, timeout, submissions, parallel width, compaction | C | Scores and costs are protocol-dependent (CL-040–CL-043) |
| Context window, and context actually used per attempt | C | Long-context re-reading dominates tokens in agentic use (L03 L139, L151, relayed) |
| Decoding: temperature, top-p, seed, greedy or sampled | R | Variance; reproducibility |
| Scaffold/harness name and version; tool list; tool-call counts per attempt | C | Harness differences shift measured capability (L02 L291) |
| Task-set name, version, subset identifiers, scorer version, any LLM-judge model | C | Subsets and harnesses must not be merged ([SRC-010](../SOURCES.md#src-010), [SRC-011](../SOURCES.md#src-011)) |
| Tokens by class; attempts; wall-clock latency | C (tokens, attempts) / R | Denominator accounting |
| Price source, date, units and token-class rates | C (cost) | Dated, sourced prices only |
| Energy method (metered / modeled / none) and boundary (IT vs facility) | C (energy) | Missing energy is unknown, not zero ([R04](INDEPENDENT-EVIDENCE.md#r04)) |

### 1.8 Evaluating the three clocks

The pair unit is (frontier release F, workload W, rubric version, mode). Lags are counted in days from F's general-availability date; months are reported as days ÷ 30.44. Only open-weight releases dated **after** F qualify ([R03](INDEPENDENT-EVIDENCE.md#r03)). [PROPOSED] An earlier open model that already meets F's threshold is flagged "pre-existing match" rather than assigned a negative lag.

- **Benchmark clock.** The earliest open-weight O whose score on the declared task-set version under mode A is non-inferior to F's ([§1.9](#19-proposed-statistical-matching-rule)). Published scores qualify only when every comparability-critical protocol field is documented and matches. The tranche found most published setups omit budgets and caps (CL-042).
- **Workload clock.** The earliest O whose delivered-output success meets the workload's fixed quality threshold, is non-inferior to F under mode A, and has cost per successful task ≤ F's at the same evaluation date ([PROPOSED] ratio ≤ 1.0; the ratio is always reported). Reliability is reported for both models.
- **Commercial clock.** The later of the workload match date and the date O became available under all of the following. Each requirement is [PROPOSED]:
  - a licence permitting the workload's commercial use;
  - at least one production endpoint, or a documented self-hosting configuration with published hardware needs;
  - context length at least the workload requirement;
  - throughput or rate limits sufficient for a declared reference volume;
  - availability in a declared jurisdiction;
  - a published price.

  Mode B metadata is recorded for both models.
- **Censoring.** If no match occurs by the dataset cutoff T, the record is **"not observed by cutoff T"**, with censored duration T − F release date. It is retained in every summary as right-censored: never zero months, never omitted (FR-03).
- **Not comparable.** If evidence is insufficient to evaluate a candidate, the pair status is "not comparable (missing: …)". This is reported separately from both matched and censored records; reviewers decide how it enters summaries.
- The four-to-six-month frame is a hypothesis these records may support or refute, not a prior to be fitted.

### 1.9 Proposed statistical matching rule

[PROPOSED] Non-inferiority on success rates paired by task instance. O matches F when the lower bound of a one-sided 95% interval for (O − F) is at least −δ. [PROPOSED] δ = 3 percentage points, with at least 3 independent runs per (model, task) to estimate run-to-run variance. For example, at 500 tasks and a success rate near 0.7, the binomial standard error of one rate is about 2 points. δ must therefore be judged against the task count; small sets such as a 12-task subset (L02 L291) cannot support a 3-point δ.

### 1.10 Licensing checks before any use

All pending, and all must be recorded with dates:

- task-set licence and terms, including redistribution of task text and derived outputs;
- harness licence;
- model-weight licence class;
- API terms permitting benchmarking and publication of results;
- copyright or personal data in documents or repositories;
- whether per-instance outputs may be published.

Licence uncertainty blocks publication of the affected per-instance artifacts, not the recording of the gap.

### 1.11 Validity threats (common)

| Threat | Effect | Proposed mitigation | Evidence |
| --- | --- | --- | --- |
| Inference-compute sensitivity | Scores and costs shift with budget, feedback and parallelism | Mode A ladder; record all §1.5 fields | L02 L135–L137, L215–L269; CL-040, CL-043 |
| Undocumented published protocols | Published pairs cannot be matched | Mark not comparable; do not impute | L02 L339; CL-042 |
| Any-correct or oracle scoring | Overstates deployable success | Delivered-output primary; no oracle-guided retries | L02 L123, L143, L285 |
| Harness/scaffold differences | Capability shifts across scaffolds | Pin harness and version; one harness per pair | L02 L291 |
| Contamination / training overlap | Inflated scores on public sets | Prefer tasks dated after both models' cutoffs; report task dates; flag public sets | L02 L291; [SRC-010](../SOURCES.md#src-010) |
| Small or subsampled task sets | Unstable comparisons | Minimum task counts tied to δ; publish identifiers | L02 L109, L291 |
| LLM judges | Judge error and saturation | Avoid as primary scorer for these rubrics; report judge model | L02 L109, L291 |
| Tokenizer non-comparability | Token budgets not like-for-like | Dollar-matched budgets across families | L04 L583 |
| Serving variance and price drift | Cost per success not portable | Record serving config, utilization and dated prices | L03 L65; CL-048 |
| Served-model substitution | Wrong model evaluated or billed | Record endpoint; identity "unverified" unless attested | L07 L16, L38 |
| Vendor self-reporting | Selective protocols and results | Treat as leads; require independent or project reproduction | L02 Table 8 L339–L345; [SRC-011](../SOURCES.md#src-011) |
| Benchmark ≠ workload ≠ commercial | Over-generalized equivalency | Three separate clocks; separate statuses | [R03](INDEPENDENT-EVIDENCE.md#r03) |

## 2. Coding rubric

- **Scope.** Repository issue resolution verified by predefined functional tests.
- **Candidate task sets.** None is adopted yet; see the proposed selections in [§0.2](#selections-task-sets) and [§5](#candidate-task-sets).
- **Success.** The delivered patch applies cleanly in the pinned harness container, and all designated fail-to-pass and pass-to-pass tests pass. [PROPOSED] Instances whose reference patch fails in the harness in any of 3 pre-runs are excluded from the task-set version beforehand, and the exclusions are published. No partial credit.
- **Attempts.** One attempt is one agent trajectory up to the declared caps. [PROPOSED] The delivered policy is a single delivered patch per task. The agent may iterate inside its trajectory using visible tests and build output, but never the hidden evaluation tests. [PROPOSED] An optional retry policy allows up to 3 trajectories, retrying only on failures visible without hidden tests: patch does not apply, build fails, or a visible test fails. Every trajectory is an attempt.
- **Budgets.** [PROPOSED] A mode A ladder of three total-token or dollar budgets spanning the lower and middle of the published range. The tranche reports "typical" SWE-Bench Pro budgets of ≈473K–16M tokens and little gain above ≈16M for frontier models under one scaffold (L02 L135, L147). The ladder values are for reviewers to set.
- **Quality threshold.** Delivered-output resolved rate, matched under [§1.9](#19-proposed-statistical-matching-rule). [PROPOSED] Reliability (the fraction of 3 runs solving each task) is reported, and in the workload clock it must be non-inferior to F's by the same δ.
- **Extra metadata.** Repository and commit, container image digest, test-runner version, visible-test policy and patch size.
- **Coding-specific threats.**
  - Public repositories and benchmark tasks invite contamination, so task dates must be recorded.
  - Tests check specified behaviour, not maintainability.
  - Results from SWE-bench, SWE-bench Verified and SWE-Bench Pro are different benchmarks and are never merged ([SRC-010](../SOURCES.md#src-010), [SRC-011](../SOURCES.md#src-011), [SRC-021](../SOURCES.md#src-021)).

## 3. Structured extraction rubric

- **Scope.** Fill a declared JSON Schema from a document. Gold values are annotated in advance.
- **Schema validity.** The output must parse and validate against the declared schema version. An invalid output is a failed attempt. A schema-repair retry using only validator feedback is allowed, because a validator exists in deployment, and counts as an attempt.
- **Field matching** [PROPOSED rules, fixed per schema version]:

  | Field type | Rule |
  | --- | --- |
  | Identifier string | Exact after Unicode NFC and whitespace trim; case-fold only where the schema marks the field case-insensitive |
  | Number or amount | Parse to a decimal value. Normalize the scale ("1.2 billion") and unit or currency. Exact at the gold value's stated precision. No numeric tolerance for monetary amounts |
  | Date | ISO 8601, exact |
  | Enumeration | Exact label |
  | List | Set equality unless the schema declares order |
  | Free-text span | Normalized exact match. [PROPOSED] Token-F1 ≥ 0.9 is recorded only as secondary partial credit |
  | Absent value | Gold null requires null or the declared "not found" token. Any value is a **hallucinated** field. Null where gold has a value is an abstention error |

- **Task success.** The output is schema-valid and **every required field** is correct. Partial credit (micro- and macro-averaged field accuracy) is secondary and never counts as success.
- **Quality threshold for the workload clock** [PROPOSED; every element is for reviewer decision]:
  - document success is non-inferior to F's ([§1.9](#19-proposed-statistical-matching-rule));
  - numeric and monetary field micro-accuracy is at least 0.98;
  - the hallucinated-field rate is no higher than F's.
- **Human verification.** If the deployed process includes human review, record the reviewer-time protocol. Its cost belongs to the workload's total, reported separately from model charges.
- **Extra metadata.** Schema version, document format and length, OCR or text-extraction step, annotation protocol and agreement rate.
- **Extraction-specific threats.**
  - Gold-label errors.
  - Text-conversion artifacts. This project's own captures render tables as loose text ([research/README.md](README.md)).
  - Documents that may already be in model training data.

## 4. Bounded-agent rubric

- **Scope.** A stated end goal in a sandboxed environment, verified by an automated final-state check, within declared step, tool and time budgets.
- **Success.** The final-state check passes within budget, and no listed prohibited action occurred; a constraint violation is a failure even if the goal is met. Timeout or budget exhaustion is a failure. Human intervention is a failure for the primary metric and is recorded separately. Milestone progress, as in a staged range scored by milestones (L02 L107), is a secondary metric only.
- **Budgets** [PROPOSED; reviewers to set values]:
  - a maximum number of steps or tool calls per episode;
  - a total-token or dollar cap per episode, as a ladder;
  - a wall-clock timeout per episode;
  - a maximum number of episodes per task.

  Each is recorded in the rubric version.
- **Attempts.** Each episode, including restarts after an environment reset, is an attempt. Within-episode submissions are counted. All sub-agent and tool-call tokens are included. Where known, environment compute cost is recorded separately.
- **Quality threshold.** Delivered-episode success non-inferior to F's ([§1.9](#19-proposed-statistical-matching-rule)), with [PROPOSED] reliability over at least 3 independent episodes per task reported for both models.
- **Extra metadata.** Environment image and version, tool versions, network access policy, prohibited-action list, step and token traces.
- **Agent-specific threats.**
  - Stateful environments make parallel attempts dependent, and parallel sampling helped stateful benchmarks less (L02 L53, L243).
  - Environment nondeterminism.
  - Timeouts that cap productive search (L02 L57).
  - Success on short bounded tasks does not transfer to longer autonomous workflows ([R02](INDEPENDENT-EVIDENCE.md#r02)).

<a id="candidate-task-sets"></a>
## 5. Candidate task sets (licence/version from indexed search; full inspection pending)

Statuses reflect the proposed selections in [§0.2](#selections-task-sets) and are not adopted until the author approves.

| Workload | Candidate | Where referenced | Version / size | Licence (indexed 2026-11-28) | Proposed status |
| --- | --- | --- | --- | --- | --- |
| Coding | SWE-bench (original) | [SRC-010](../SOURCES.md#src-010) | Not inspected | MIT (repository) | Not selected: superseded and most exposed |
| Coding | SWE-bench Verified, Bash Only view | [SRC-011](../SOURCES.md#src-011), [SRC-028](../SOURCES.md#src-028) | 500 instances; mini-SWE-agent, 250 steps, $3.00 | MIT per repository; dataset card has no licence field | **Secondary**, contamination-flagged history (CL-052, CL-054) |
| Coding | SWE-Bench Pro public set | [SRC-021](../SOURCES.md#src-021), [SRC-029](../SOURCES.md#src-029) | 731 instances; leaderboard standard configuration 250 turns, uncapped cost | Dataset licence not found; copyleft source repositories | **Primary** (CL-053) |
| Extraction | Project-built filing-fact set `ffx-0.4` | [W1](W1-FILING-RECONSTRUCTION.md), [MANIFEST.csv](MANIFEST.csv) | About 150 instances (see §0.2) | Public SEC filings | **Primary**; gold to be checked by the financial reviewer |
| Extraction | An existing public extraction benchmark | None with harness-matched open and closed results found | — | — | Not selected for v0.4 |
| Bounded agents | τ²-bench | [SRC-030](../SOURCES.md#src-030) | Airline 50, retail 115, telecom 114 | MIT (secondary source) | **Primary** |
| Bounded agents | Terminal-Bench 2.0 | [SRC-021](../SOURCES.md#src-021), [SRC-031](../SOURCES.md#src-031), L02 L105, L317 | 89 tasks | Apache-2.0 | **Secondary** (Terminus 2 rows only) |
| Bounded agents | Project-defined sandbox goals | — | To be defined | Project-authored | Deferred: build cost |

## 6. Decisions requested from reviewers (OQ-02)

The proposed answers to items 1–6 are in [§0](#selections); item 6 is answered by the phase plan in [§0.4](#selections-phases).

1. Accept, change or reject each [PROPOSED] value: δ, run counts, budget ladders, extraction accuracy floors, agent caps and the cost-ratio criterion.
2. Choose task sets after licence and version inspection; until then every candidate stays pending.
3. Decide the treatment of "pre-existing match" and "not comparable" records in lag summaries.
4. Decide the primary budget unit across tokenizers (dollars proposed) and the reference volume and jurisdiction for the commercial clock.
5. Decide whether pass@k results enter any clock, and only with which deployable selector.
6. Confirm that no paid run is in scope. Comparisons rely on documented published results meeting [§1.7](#17-required-metadata) until a funded, reviewed evaluation plan exists.

## 7. Change log

- `0.4-draft` (2026-11-28): first proposed version from R02 and literature tranche 01. Not reviewed or adopted.
- `0.4-sel.1` (2026-11-28): pragmatic task-set and threshold selections, with reasons, proposed for the author's review ([§0](#selections)). Not adopted.
