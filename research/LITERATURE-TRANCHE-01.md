# Literature tranche 01 — supplied `05-lit` texts — v0.4

| Field | Value |
| --- | --- |
| Initial author | yorkerhodes3 |
| Drafting support | AI assistance; human review required |
| Status | **Draft analysis for review — not reviewed** |
| Analysis date | 2026-11-28 |
| Inputs | Seven supplied text captures with the `05-lit` prefix, registered in [MANIFEST.csv](MANIFEST.csv) |
| Records created | [SRC-020–SRC-026](../SOURCES.md#supplied-literature-tranche-01); CL-040–CL-051 in the [claim ledger](../CLAIM-LEDGER.csv) |
| Feeds | W2, W3, W4, W5, W6; T-005 ([proposed rubrics](WORKLOAD-RUBRICS.md)), T-015, T-018; flagged qualifications in [R02](INDEPENDENT-EVIDENCE.md#r02), [R03](INDEPENDENT-EVIDENCE.md#r03), [R05](INDEPENDENT-EVIDENCE.md#r05) |

## Evidence boundary and method

On 2026-11-28 the SHA-256 hash and byte size of each of the seven files matched `MANIFEST.csv`. That establishes intake integrity, not fidelity to the origin. Network access to arXiv, Stanford and Anthropic was unavailable, and no web verification is claimed. The text conversion dropped figures and some tables. Chart values appear as loose numbers, so any value read from a chart is our reconstruction and is labeled as such.

The manifest still marks the two Stanford files and the Anthropic file "held back - license check"; on 2026-11-28 the author decided they may be used as attributed input to this project ([decisions](../SOURCES.md#author-decisions-2026-11-28)). This note quotes at most a sentence from any source and otherwise paraphrases. The four arXiv papers are listed as CC BY 4.0 (see [research/README.md](README.md)).

**Locators.** `Lnnn` is a line number in the local file as hashed; a section name is the source's own heading. **Tags:** **[obs]** is the source authors' own observation or measurement; **[relay]** is a figure repeated from another party (vendor, press, another study); **[est]** is an estimate or model output from stated assumptions; **[proj]** is a projection, scenario or subjective probability; **[assert]** is an argument without a method in the text. Ledger mapping: obs/relay → `reported`, est → `estimated`, proj → `scenario`. Assertions are not entered as claims we rely on. All new claims remain verification state `unknown`.

Separation rule: each source section states what the source says before giving **our assessment**. Interpretations are marked as ours.

## Summary

| Note | Source | Type | Can support, with caveats | Cannot support |
| --- | --- | --- | --- | --- |
| [L01](#l01) | Grogan, arXiv 2604.06217 v1 | Single-author argumentative thesis | Hypotheses on value migration and inference as a cost centre | Any measured catch-up lag, parity, price, cost or demand value |
| [L02](#l02) | McFadyen et al., arXiv 2606.17930 v3 | Controlled evaluation experiment (UK AI Security Institute) | Benchmark scores depend on inference budget and protocol; reach/reliability/efficiency decomposition; protocol-documentation gaps | Open-vs-closed lag (no open-weight models tested); dollar cost or energy |
| [L03](#l03) | Matsuoka, arXiv 2607.07207 v1 | Single-author scenario model plus relayed market data | Stress-test structure; cost-boundary definitions; catalogue of demand-tracker biases | Observed solvency, probabilities, elasticities or verified market figures |
| [L04](#l04) | Laber et al., arXiv 2609.27166 v2 | Controlled experiment, one distilled open-weight family, synthetic tasks | Larger model ≠ fewer tokens per correct answer in that family | Frontier/commercial models, real workloads, cost or energy |
| [L05](#l05) | Stanford HAI, AI Index 2026, Ch. 1 (full chapter) | Secondary synthesis | Pointers to underlying estimates; release-access and licence categories | Primary measurements; company energy; chart reconstructions |
| [L06](#l06) | Stanford HAI, Ch. 1 highlights page | Secondary summary | Nothing beyond L05 | Independent support |
| [L07](#l07) | Anthropic, provable-inference research post | Vendor research on its own prototype | Served-model identity is not verifiable from outputs today; prototype overhead | Independent evidence; Claude serving cost or efficiency |

<a id="l01"></a>
## L01 — Grogan, *The End of the Foundation Model Era* (arXiv 2604.06217)

**Identity.** Jared James Grogan (Universitas AI), arXiv:2604.06217, v1 only; capture records submission on 18 March 2026, and the paper says events are covered through 9 March 2026 (L1–L18, L31–L37). File [`05-lit__arxiv-2604.06217-end-of-the-foundation-model-era.md`](05-lit__arxiv-2604.06217-end-of-the-foundation-model-era.md), SHA-256 prefix `21c00a872203`; CC BY 4.0. [SRC-020](../SOURCES.md#src-020). **Metadata flag:** an arXiv `2604` prefix normally denotes April 2026, which disagrees with the recorded 18 March v1 date; resolve at origin before citing a date.

**What it is and how.** A structural argument across economic, technical, commercial and political axes (abstract L23, L47). It has no dataset, sample, model or measurement protocol. The author states that revenue figures come from journalism and that the national-security track is inferred from structure (L237).

**What it says (relevant to W2/W3/W5):**
- Asserts that open models have reached frontier performance "while inference costs approach zero" (L23) and parity "for most tasks" (L53, no citation in that passage). Llama 3 matching GPT-4-class performance is cited to [12][13] (L63). [assert]
- Argues that test-time compute moves the compute budget from training to inference and that a smaller model with enough inference budget can beat a larger one on reasoning (L75), and that inference becomes the main ongoing cost (L71). [assert]
- Relays training-cost history (GPT-2 ≈$43k to GPT-4.5 ≈$500M; DeepSeek-R1 reported <$6M) (L67). [relay]
- Hyperscaler investor–supplier "circular" financing thesis (L83–L91); "commodity trap" (L95); value migrates to proprietary data, integration and operational trust (L99–L107); hardware vendors capture value (L197–L201). [assert]
- Relays an Anthropic revenue run-rate of ≈$3B (May 2025) and ≈$9B (end 2025) from press (L95). [relay]
- States that the shift "is not a prediction" because it has already occurred (L223). [assert]

**Stated limitations.** Version 1.0 through 9 March 2026; later events may change the record (L237). Endnote 3 acknowledges an Epoch projection that later models may return to larger pre-training runs (L263).

**Our assessment.** Usable as a list of hypotheses to test, with its bibliography as discovery leads. It cannot support a lag, parity, price, cost or demand value. "Parity" is undefined against any rubric, quality threshold or price unit. The abstract's near-zero inference cost conflicts with its own argument that inference becomes the main ongoing cost (L23 vs L71); per-token price and total inference spend are conflated. The press run-rate is a different metric from recognized revenue and must not be compared with CL-001 or used in W1. No ledger claim is entered.

**Relation to existing notes.** Its "parity" framing conflicts with [CL-006](../CLAIM-LEDGER.csv) (Epoch's indexed ≈4-month aggregate lag), but L01 supplies no measurement that could adjudicate. Neither framing is promoted, and four-to-six months remains a hypothesis ([R03](INDEPENDENT-EVIDENCE.md#r03)). Its emphasis on integration and trust moats (L103) is compatible with R03's separation of benchmark and commercial clocks.

<a id="l02"></a>
## L02 — McFadyen et al., *How Inference Compute Shapes Frontier LLM Evaluation* (arXiv 2606.17930)

**Identity.** Jessica McFadyen, Ole Jorgensen, Harry Coppock, Kevin Wei, Cozmin Ududec (UK AI Security Institute; University of Oxford; Harvard) (L14, L29, L41). arXiv:2606.17930, v1 16 June, v2 14 July, v3 16 July 2026; capture is v3 (L8, L43). The intake corrected the identifier from 2606.1793 ([README](README.md)). File [`05-lit__arxiv-2606.17930-inference-compute-and-frontier-evaluation.md`](05-lit__arxiv-2606.17930-inference-compute-and-frontier-evaluation.md), SHA-256 prefix `558de029d5bf`; CC BY 4.0. [SRC-021](../SOURCES.md#src-021).

**What it measures and how.** A fully crossed design (L63–L91, L97–L115):
- **Models:** six Anthropic and OpenAI models released May 2025–March 2026 (Opus 4/4.5/4.6; GPT-5/5.2/5.4), using reasoning effort xhigh/high and 16k reasoning tokens per call (L67).
- **Benchmarks:** TerminalBench 2.0, SWE-Bench Pro, FrontierMath, HealthBench Hard and HLE. Each uses up to 100 deterministically fixed tasks; FrontierMath has 12 (L105–L113).
- **Protocol:** one ReAct scaffold in Inspect, two feedback conditions and 5 trajectories per task per condition.
- **Budgets:** 5M–30M tokens per trajectory (one to three orders of magnitude above typical defaults), context compaction at 130k tokens, and up to 999 submissions with a repetition guard (L97). Budgets include input, output and reasoning tokens; judge tokens are excluded (L101).
- **Earlier data:** two cyber benchmarks reuse AISI data on up to 10 models, including an Anthropic-supplied "Mythos Preview" checkpoint (L63, L67).
- **Prior practice:** 89 harness setups documented in 61 citations (Table 8, L339).

**What it finds:**
- Scores are protocol-dependent. Expanded budgets added ≈+11.7 points on FrontierMath (1M→10M tokens) and ≈+11.9 on HLE (64K→5M), but ≈+0.3 on SWE-Bench Pro (≈16M→30M) and ≈+1.3 on TerminalBench (L135–L137; Table 3 L147–L159). [obs] → CL-040
- "Typical" published budgets for SWE-Bench Pro span 473K–16M tokens. The authors converted published turn caps of 50–250 using their own trajectories (L147–L149, L337), so the range is more than 30-fold inside one benchmark name. [est]
- Generational gains come mainly from **reach** (more tasks unlocked) and **reliability** (more consistent solving). Output tokens per solve fell significantly with generation on four of six benchmarks, including SWE-Bench Pro and TerminalBench, but not FrontierMath or HLE (L175, L201–L207; Table 4 L177–L191). [obs] → CL-041
- Repeated submission raised cumulative performance on all five main benchmarks: +6.4 to +17.3 points overall and +14.4 on SWE-Bench Pro (L215–L219). SWE-Bench Pro realized ~90% of that gain within 3–4 submissions (L233). Oracle correctness feedback mattered most for HLE and SWE-Bench Pro (L221). [obs] → CL-043
- A trajectory is credited if *any* submission is correct (L123). Scoring by first or last submission, which the authors call arguably more representative of real use, lowered solve rates on most benchmarks but not on SWE-Bench Pro (L143). [obs]
- At a fixed total budget, ten parallel trajectories helped HLE and HealthBench far more than SWE-Bench Pro (0.673→0.701 at the cap) and helped newer models less (L243–L269). [obs]
- Published setups rarely document stopping limits. The token budget was undocumented in 42/61 citations, the cost cap in 57/61, and trajectories per task in 34/61 (L339). [obs of literature] → CL-042
- Recommendations: report capability across inference budgets, document protocol choices, and compare generations at matched budgets over a shared range (L281–L287). Oracle feedback is most valid where real verifiers such as code execution exist (L285).

**Stated limitations.** Single scaffold; a deliberately simple protocol that gives a lower bound; FrontierMath has only 12 tasks and possible training overlap; the LLM-judge repetition guard (L291). Subsampling and budgets make absolute scores incomparable with published results (L109). Weak scaling is read as a property of the protocol (L119).

**Our assessment.** This is the tranche's strongest methodological source for W2/W3. It supports three requirements: benchmark-clock comparisons must fix and record budget, feedback, submission and sampling protocol; "success" must specify a scoring rule; and newer models are not automatically more token-efficient. It cannot support open-weight comparisons (none tested), dollar cost or energy (it reports tokens), production workloads, or general capability. AISI is a government evaluator, not a vendor, but it received developer-provided access (L67), and this is an unrefereed preprint. Minor internal inconsistencies: Table 8's caption says both "61 citations" and "Across the 60 citations" (L339). The TerminalBench typical budget is 932K–7.3M in Table 3 (L147) but 1M–7.3M in Appendix A.1.2 (L337). Its SWE-Bench Pro is a different benchmark from SWE-bench and SWE-bench Verified ([SRC-010](../SOURCES.md#src-010), [SRC-011](../SOURCES.md#src-011)); do not merge them.

**Relation to existing notes.** Qualifies R02 (attempts include resubmissions and parallel samples; the inference setting belongs to the rubric) and R03 (the benchmark clock needs a matched budget, not only index or harness version). It qualifies CL-006 indirectly: an aggregate index built from published results inherits protocol variation of unknown sign and size. Whether Epoch's ECI controls for this is unknown because its method is uninspected (T-015). L02 does not test the four-month figure.

<a id="l03"></a>
## L03 — Matsuoka, *Memory Scarcity, Open Models, and the Restructuring of the AI Industry, 2026–2030* (arXiv 2607.07207)

**Identity.** Satoshi Matsuoka (single author), arXiv:2607.07207 v1, 8 July 2026, with the subtitle "A quantitative scenario analysis…" (L1–L27). Capture of the arXiv HTML v1. File [`05-lit__arxiv-2607.07207-memory-scarcity-open-models-ai-industry.md`](05-lit__arxiv-2607.07207-memory-scarcity-open-models-ai-industry.md), SHA-256 prefix `4b6dac256c9f`; CC BY 4.0. [SRC-022](../SOURCES.md#src-022). The manifest's own evidence treatment is "do not treat projections as facts".

**What it is and how.** It makes no new measurement.
- **Cost model:** a closed-form cost in dollars per petabyte of memory bandwidth delivered for bandwidth-bound decode (L57–L63). Assumed parameters include four-year amortization, a 1.5× system multiplier, $0.08/kWh, PUE 1.3, $0.25/GPU-hour operations and memory-bandwidth utilization of 0.50–0.62. It uses two HBM-price branches (L57).
- **Derived outputs:** entrant-versus-incumbent gaps, vintage breakeven, training-cost divergence, a "solvency corridor", five scenarios with subjective probabilities revised over five rounds (L35, L131–L135) and elicited probabilities for a greenfield entrant (L197).
- **Market context:** relayed from press, vendors and analysts (L43–L47, L139–L141, L217). Only the caption of the appendix parameter table survived extraction (L213–L217).

**What it says:**
- Entrant full cost versus the incumbent floor is a 3.2× gap in 2026, ≈1.9× in 2027, then widens again to ≈3–4×+ (L33, L71). [est]
- A frontier training run costs ≈$1.5B in 2026 and $18B/$38B in 2030; replicating "good enough" capability falls toward ≈$5M (L93–L99). [proj]
- **Solvency corridor:** with announced capacity growth (≈2.6× by 2029) and an assumed 30%/yr bytes-per-token efficiency gain, new capacity stays solvent only with ≈2× annual token-demand growth for four years. The threshold is ≈1.6×–2.4× for 15–45%/yr efficiency (L33, L113–L127). [proj] → CL-045
- Scenario probabilities: Landlord 25%, Jevons Absorption 20%, Re-differentiation 18%, Crash 25%, Bifurcation 12% (L35). The author describes them as revised subjective judgments (L135). [proj]
- Relayed market observations:
  - DRAM contract prices rose ≈90% in Q1 2026 over Q4 2025, and memory is ≈40–50% of accelerator bill of materials (L43). [relay]
  - GLM-5.2 (744B total/40B active parameters, MIT licence) is said to "match or exceed" proprietary flagships on long-horizon coding/agentic benchmarks at ≈1/6 of the serving price (L45, press citation [3]). [relay] → CL-047
  - A SpaceX/xAI lease of Colossus 1 to Anthropic at ≈$1.25B/month (L47, press [6]). [relay]
  - Token trackers: Google from 9.7T tokens/month in May 2024 to 3.2 quadrillion in May 2026; Microsoft Foundry ≈30% QoQ; OpenRouter from ≈5T to >31T tokens/week; China ≈180T/day (L139). [relay] → CL-046
  - Prices: Stanford "≈280× cheaper" GPT-3.5-class inference over two years; a16z ≈10×/yr at constant capability; on OpenRouter in late May 2026, Anthropic had ≈42% of revenue on ≈11% of tokens, with Opus-class output at ≈$25–30/M tokens versus $0.09–0.18/M for DeepSeek V4 Flash (L141). [relay]
  - A serving-cost study found $0.21–$15.25 per million output tokens on identical H100 hardware, depending on utilization and request rate (L65, citation [25]). [relay] → CL-048
- **Tracker critique:** headline token trackers overstate underlying demand because of supply-injected volume, channel substitution, subsidy, low-value context re-reading, and base effects/disclosure selection (L151). The author's "quality-adjusted" growth is plausibly 2–3×/yr (L153). [est, author judgment]
- Asserts a Q2 2026 "regime break" from token maximization to minimization, with an evidence window of "only weeks" (L157, L163). Proposes tokens per task and dollars per task as the observables (L165). [assert]
- Calls AI-for-Science demand "comparatively inelastic" without an estimate (L119). [assert]

**Stated limitations.** The $/PB unit applies only to saturated bandwidth-bound decode (L65). The post-break slope is unconfirmed (L35, L163). Financing figures are approximate and of uneven legal strength (L185–L187). The paper had substantial assistance from AI products of companies it analyzes, and readers are told to verify critical numbers independently (L221).

**Our assessment.** Useful structure:
- It separates full from marginal cost and metered from total inference (L55), which maps to W5/W6 boundaries and the metric dictionary (T-023).
- Its tracker critique is a ready confounder list for T-018/P05.
- Its corridor and vintage logic can inform the design of *scenario* stress tests (FR-14).

It cannot support observed values:
- Corridor values, probabilities and costs are outputs of assumed parameters, some of which are missing from the extraction.
- Market facts are second-hand relays.
- No price elasticity is estimated or borrowed; "Jevons Absorption" is a scenario label.

Inconsistency flags: the stated 3,600–7,400× training-cost gap (L99) versus ≈7,600× from $38B/$5M by our arithmetic (minor). The scenario Table 1 body is absent from the extraction (L133). The Chinese open-weight token share is ">50%" at L141 and "≈60%" at L157, apparently for different dates. Speculative elements: the regime break, AI-for-Science inelasticity and the elicited probabilities.

**Relation to existing notes.** Consistent with R01's multiple regimes (abundance, rebound, air pocket), but adds no identification. Its PUE and electricity price are assumptions, not R04-grade factors. **Cross-check lead for W1/W5, not reconciled:** the received final prospectus describes "SpaceXAI Arrangements" with different scope and magnitude (aggregate up to $120.5B; ≈$3.1B/month once all capacity is delivered) ([424B4 text L17073–L17083](04-424b4-2026-11-19__primary-document-anthropicpbc-424b4.md)). That is not L03's ≈$1.25B/month press relay. Resolve only under T-013/T-016. The press figure must not substitute for filing reconciliation. Against CL-006, L03's "effectively caught up" (L45) and "parity … within months" (L177) are relayed or asserted, not measured.

<a id="l04"></a>
## L04 — Laber et al., *Scaling of Capability and Efficiency at Inference Time in Large Reasoning Models* (arXiv 2609.27166)

**Identity.** Moritz Laber, Zohair Shafi, Germans Savcisens, Brennan Klein, Matteo Chinazzi, Samuel V. Scarpino, Albert-László Barabási, Alessandro Vespignani and Tina Eliassi-Rad. arXiv:2609.27166 v2: v1 22 September and v2 24 September 2026; the text is dated 25 September 2026 (L8, L13, L44). File [`05-lit__arxiv-2609.27166-scaling-capability-and-efficiency.md`](05-lit__arxiv-2609.27166-scaling-capability-and-efficiency.md), SHA-256 prefix `984d5732061f`; CC BY 4.0. [SRC-023](../SOURCES.md#src-023).

**What it measures and how.**
- **Models:** five DeepSeek-R1-Distill models (Qwen 1.5B/7B/14B/32B; Llama 70B) (L62–L66; model list after L583).
- **Tasks:** four synthetic tasks with tunable size (addition, brackets, parity, index); 100 random instances per size `n` ∈ {2, 10, 50, 100, …, 500}.
- **Sampling:** temperatures 0.4, 0.6 and 0.8, with a 75,000-token cap; served with SGLang on H100/H200 (L66, L105–L107, L603).
- **Analysis:** hierarchical Bayesian models of solve probability and of output length among correct answers (L22, L62, L1045–L1047). Code is released (L1051).

**What it finds:**
- Solve probability decays roughly exponentially with instance size, and the decay scale grows sublinearly with parameters. For addition at τ=0.6, doubling parameters multiplies the scale by ≈1.61 (exponent ≈0.69, 95% credible interval ≈0.53–0.85) (L337–L353). [obs/est] → CL-044
- Output length among correct answers grows as a power law in instance size. For most task–temperature combinations it does not fall systematically with model size (L22, L500, L543–L549). [obs/est] → CL-044
- Offered explanations: algorithmic operation counts, and that post-training does not reward token efficiency (L551). [hypothesis]

**Stated limitations.** One distilled family and four synthetic tasks; tokenizer differences across base models may confound results; capability and efficiency are analyzed separately; efficiency is conditioned on correct answers (L581–L583). AI assistants were used for proofreading, derivations and code, which the authors say they verified (L1059).

**Our assessment.** It supports a narrow W2 point: within this open-weight family, a larger model does not use fewer output tokens per correct solution, so any per-task saving from scaling up must come from higher success, not shorter outputs. *Our interpretation, not the paper's claim:* per-token compute rises with active parameters, so equal token counts imply more compute, and plausibly more energy, per correct answer for a larger model on tasks a smaller model already solves. That favours routing to the smallest adequate model, but it is untested here. The paper cannot support claims about frontier or commercial models, real workloads, prices or energy. Its efficiency metric excludes failed-attempt tokens, unlike our cost-per-successful-task boundary. It complements L02 on a different axis (size within a family versus generations across releases) and has no bearing on CL-006.

<a id="l05"></a>
## L05 — Stanford HAI, *AI Index Report 2026*, Chapter 1 "Research and Development" (full chapter)

**Identity.** Stanford HAI, AI Index Report 2026, Chapter 1. The capture is a text conversion of the 57-page chapter PDF; no individual authors appear in the extraction (L1–L11). The capture gives a PDF publication time of 16 July 2026, while the manifest and highlights page give 13 April 2026, so the edition may have been revised and must be checked. File [`05-lit__stanford-hai-ai-index-2026-ch1-full-chapter.md`](05-lit__stanford-hai-ai-index-2026-ch1-full-chapter.md), SHA-256 prefix `5020fdfa9768`. **Licence pending:** the manifest notes CC BY-NC-ND 4.0 for the full report as listed on arXiv (2606.15708), and the file is marked "held back - license check". [SRC-024](../SOURCES.md#src-024).

**What it is and how.** A secondary synthesis of third-party data:
- Epoch AI: notable models, training compute, hardware and capacity (L156–L258, L318–L344).
- Cloudscene: data-centre counts (L366).
- Jegham et al. (2025), IEA (2025) and de Vries and Gao (2025): energy (L392).
- GitHub and Hugging Face via Longpre et al. (2025): open-source activity (L515, L567).

The capture also contains the opening overview of Chapter 2 (L990–L994).

**What it says:**
- In 2025, 47 of 102 notable models were released with API access, and "open weights (unrestricted)" was the second most common type. Open weights are split into unrestricted, restricted-use and noncommercial. 81 of 102 notable models shipped without training code (L194). [relay of Epoch-classified data] → CL-051
- Frontier labs no longer disclose parameters, data size or training duration (L220). Epoch estimates compute from hardware/usage or benchmark proxies (L258). [relay]
- Global AI compute is ≈17.1M H100-equivalents, growing ≈3.3×/yr since 2022, with Nvidia >60%. The figures are inferred from revenue data, disclosures and analyst reports (L344, footnote 12). [est]
- AI data-centre power capacity is ≈29.6 GW by Q4 2025: rated chip TDP of ≈11.8 GW times a ≈2.5 infrastructure multiplier (L356). [est] → CL-049
- A separate de Vries and Gao estimate gives ≈5,200 MW for accelerator modules and ≈9,400 MW all-in, cumulative through 2024, with utilization/efficiency uncertainty (L476). [est] If its loose numbers are in order, the capacity series reads ≈13.5 GW at 2024 Q4 (L360). The chapter does not reconcile the two; they use different definitions (rated capacity versus estimated demand).
- Inference energy per ≈1,000-in/1,000-out prompt, citing Jegham et al. (2025) (L434). [est relay] → CL-050
  - DeepSeek V3.2/V3.2 Exp: ≈23 Wh.
  - GPT-5 (high): ≈21.9 Wh.
  - Claude 4 Opus and GPT-5 mini (medium): 5–6 Wh.
  - Reading the loose chart numbers in label order gives GPT-5 (medium) ≈13.1 Wh and GPT-5 (low) ≈8.4 Wh (L436). This alignment is our reconstruction, with low confidence. If correct, the reasoning setting changes per-prompt energy by a multiple.
- A short GPT-4o query is ≈0.42 Wh, versus 0.3 Wh for a search query. Annual GPT-4o inference water use is ≈1.3–1.6 million kL (L454). [est relay]
- Hardware FLOP/s per watt rose ≈10× over a decade, while training power and emissions rose; Grok 4 training is ≈72,816 tCO2e (L396). [est relay]
- The GPU compute cost index fell >99% since 2006. The chapter's regional data-centre electricity figure shows IEA *projections*, not observations (L499, L515 footnote 15). [relay; proj]
- Data-centre counts (US 5,427) do not capture size, capacity or utilization (L374).
- The appended Chapter 2 overview says the gap between top models is shrinking and agents "still fail roughly one in three attempts" (L994). No Chapter 2 data or method is supplied. [relay summary]

**Stated limitations.** Disclosure gaps (L220, L248, L396); the estimation bases (L344 footnote 12, L356, L476); IEA projections (L515); Chinese code platforms are excluded from the GitHub data (L515).

**Our assessment.** It works as a map to the underlying sources for T-004/T-017, and as a source of licence categories for the commercial clock. It cannot support primary measurements, company or regional energy, or anything that depends on reconstructing charts. Per-prompt energy is per prompt, not per successful task, and the serving/hardware assumptions are not in the extraction.

Internal flags:
- The AIME 2025 chart labels "Gemini 1.5 Pro" highest at 95.7% (L295; highlights page L34). That is implausible for an older model and is possibly a label error.
- The text calls OLMo 3.1 Think 32B "comparable" on AIME 2025 (L304), while the chart shows 78.1% against 91.3–95.7% (L295).
- Grok 4 is stated to have 3 trillion parameters (L304), although the chapter says frontier labs do not disclose parameter counts (L220). The source is not visible in the extraction.
- The capacity and demand estimates above are not reconciled.

**Relation to existing notes.** Consistent with R04: these are sector estimates and projections, not company metering. The ≈2.5 multiplier covers cooling, networking and other infrastructure and is not R04's matched PUE. The chart attribution "International Energy Agency (2025), Energy and AI" (L505, L511) is a secondary lead on [SRC-008](../SOURCES.md#src-008)'s edition question, not authentication. No lag measurement bears on CL-006.

<a id="l06"></a>
## L06 — Stanford HAI, AI Index 2026 Chapter 1 highlights page

**Identity.** The chapter-highlights web page, dated 13 April 2026 (L1–L11). File [`05-lit__stanford-hai-ai-index-2026-ch1-web-page.md`](05-lit__stanford-hai-ai-index-2026-ch1-web-page.md), SHA-256 prefix `c7f9cf183a68`. No licence statement was found; it is marked "held back - license check". [SRC-025](../SOURCES.md#src-025).

**Content.** Ten takeaways with image alt text (L12–L70) that repeat L05's headline numbers.

**Our assessment.** It adds nothing analyzable beyond L05; cite L05. Flag: the image under takeaway 1 is described as a GitHub-projects chart, which does not match its takeaway (L12–L16).

<a id="l07"></a>
## L07 — Anthropic, *Progress on provable inference for large language models*

**Identity.** Anthropic research post dated 2 November 2026 (L2–L8). Authors are Roy Rinberg and Alex Allain (Anthropic) with collaborators from EPFL, StarkWare, MIT/RESI and Succinct, plus Anthropic fellows (L12). File [`05-lit__anthropic-provable-inference-progress.md`](05-lit__anthropic-provable-inference-progress.md), SHA-256 prefix `c3d138e2b30e`. No licence is stated for the article text; the code, Lean proofs and documentation are Apache 2.0 (L34). It is marked "held back - license check". [SRC-026](../SOURCES.md#src-026).

**What it measures and how.** "FlashProve" is a zkSNARK system that proves committed, hidden weights produced the given output tokens.
- **Test model:** Llama 4 Maverick, a 400B mixture-of-experts model with ≈17B active parameters, using its public 4-bit weights.
- **Prover:** one H100 with 24 CPU cores, proving 1,024-token windows in batches of 24 requests (L115–L118).
- **Baseline:** vLLM serving the FP8 release on 8×H100 (L120).
- **Formal statements:** in Lean (L136–L154).

**What it finds [obs by vendor]:**
- Proving runs at ≈110 tokens/s, with 18.78 MB proofs and 223 s per 24-request batch (L117).
- Verification takes 17 s on 24 threads. The offline commitment takes 39 minutes and is valid for ≈16M requests (L117–L118).
- Proving costs ≈72× (66–77×) the vLLM GPU time per GPU, and ≈94× at the highest load tried (L120). The post summarizes this as roughly two orders of magnitude of overhead (L169).
- Motivation: users cannot check that a response came from the claimed model rather than a cheaper model substituted by a routing service (L16, L38).

**Stated limitations.** Research prototype. No formal guarantee covers the fast code. Proofs cover an integer model under greedy decoding, so sampled or floating-point serving can diverge. Mixture-of-experts architectures only. Side channels are out of scope. Context is capped at 1,024 tokens (L173–L179). The post shares "intermediate progress" (L34).

**Our assessment.** This is vendor research about the vendor's own prototype, run on a third-party open-weight model rather than Claude. It is not independent and says nothing about Anthropic's serving cost or efficiency.

It supports two points:
- **A validity threat for W2/W3:** the identity of a model served through an API or router cannot currently be verified from its outputs. Evaluations should record provider and endpoint and treat identity as unverified.
- **A cost consideration:** in this prototype, required provable inference would add ≈70–95× GPU time on proven tokens. That would affect denominators but is not current practice.

The figures are internally consistent: 24 × 1,024 tokens / 223 s ≈ 110 tokens/s.

<a id="synthesis"></a>
## Cross-source synthesis

<a id="s1"></a>
### S1 — The three equivalency clocks

- **Benchmark clock.** L02 shows a benchmark score depends on model, task subset, scaffold, token budget, feedback, submission rule and parallel width. A match therefore requires equal protocols, or a comparison of curves over a shared budget range. Most published setups omit those fields (CL-042). That includes many open-weight launch posts listed in L02's Table 8 for SWE-Bench Pro (L339–L345). Many published open/closed pairs will therefore be *not comparable* rather than matched or unmatched. The direction of bias is unknown. Fixed budgets understate models that convert extra compute well (L53, L287), and L02 finds newer frontier models do this better; but vendors choose their own budgets.
- **Workload clock.** Success and tokens per task both move with budget and model (L02, L04). The workload clock must fix the quality threshold and the budget or cost policy *before* comparison, and it must count all attempts. L02's reach/reliability maps to our success term. Its tokens-per-solve maps to our intensity term, but only conditional on success, so failed-attempt cost is excluded.
- **Commercial clock.** Open-weight licences differ (unrestricted, restricted, noncommercial; L05 L194), and served-model identity is unverifiable from outputs (L07). L03 relays persistent price spreads and a premium-revenue share (L141) during a period when benchmark parity was being claimed. That is compatible with clocks diverging, but it is relayed and not quality-matched.
- **CL-006 and the four-to-six-month hypothesis.** No source in this tranche measures an open/closed lag. L01 and L03 assert near-parity without a method, and L02 implies aggregate indices are protocol-sensitive. CL-006 is unchanged, as is the hypothesis status of four to six months.

<a id="s2"></a>
### S2 — Inference-time compute and cost per successful task

- **Test-time compute is a choice variable.** It raises tokens, and so cost and energy, per attempt, and it can raise success. L02's SWE-Bench Pro budgets go up to 30M tokens per trajectory, with ≈+0.3 points beyond ≈16M (L135); typical budgets span 473K–16M (L147). L05 relays ≈21.9 Wh per prompt for GPT-5 (high) versus 5–6 Wh for Claude 4 Opus and GPT-5 mini (medium) (L434), as modeled estimates per prompt.
- **Implication for [R05](INDEPENDENT-EVIDENCE.md#r05):** success rate `s` and IT energy per attempt `I` are set *jointly* by the reasoning budget and protocol. Scenarios must vary them together, from the same protocol. A falling price per token does not imply a falling price per successful task if reasoning or context tokens per task rise. L03's ≈15× agentic tokens per request, mostly context re-reading (L139, L151), is a relayed example.
- **Attempt accounting.** Count every submission, resubmission, parallel sample and compaction call (L97, L101, L241). Count judge or verifier calls when they would exist in deployment. Report the delivered single-output result as primary. Report pass@k only together with a deployable, non-oracle selector (L143, L285).
- **Units.** Tokens are not comparable across tokenizers (L04 L583). Prefer dated list-price dollars, plus measured energy where available, and record tokens by type.
- **Serving configuration dominates realized cost per token.** The relayed range is $0.21–$15.25 per million output tokens on identical H100 hardware (L03 L65). Cost per successful task without serving metadata is not comparable.
- **Efficiency gains are uneven.** Generational token-efficiency gains exist but vary by benchmark (L02 L205). Scaling up size within a family did not shorten correct answers (L04).

<a id="s3"></a>
### S3 — Memory/hardware scarcity and provider economics

- **Relayed observations:** a DRAM contract-price surge and the memory share of accelerator cost (L03 L43); compute capacity, Nvidia's share and TSMC concentration (L05 L344, L370). Contract sources are uninspected.
- **Model outputs:** entrant/incumbent gap, vintage breakeven, solvency corridor and scenario or greenfield probabilities (L03). Use them only as hypotheses and stress-test structure for W5/W7, never as calibration.
- **For W5's seven candidate profiles:** L03's statements about neocloud repricing, covenants and impairments are unsourced in their passages or are scenario narrative (L47, L169, L189). No profile fact should be taken from them.
- **Anthropic-specific relays:** L03's Colossus lease and L01's run-rate revenue are press relays. The filing's SpaceXAI passage is a reconciliation lead for T-013/T-016 only (see [L03](#l03)). No Anthropic relationship or financial value is inferred here.
- **Definitions to reuse:** L03's full versus marginal cost and metered versus total inference (L55) are candidate definitions for P06 and the metric dictionary (T-023).

<a id="s4"></a>
### S4 — Demand and rebound evidence

| Evidence type | What this tranche provides | Status |
| --- | --- | --- |
| Measured AI price elasticity | None. No source estimates one. | Gap |
| Borrowed elasticity | None. "Jevons Absorption" (L03 L35, L189) is a scenario label, not an elasticity. | Gap |
| Assumed demand paths | Token growth of 1.5×–2.5×/yr, a Goldman 24× path and decaying cases; efficiency trends of 15–45%/yr (L03 L113, L123, L169). AI-for-Science "comparatively inelastic" (L03 L119). | Scenario/assertion |
| Observed co-movement | Token-volume growth from vendor trackers (L03 L139) alongside relayed price declines (L03 L141) | Co-movement, not identification |
| Named confounders | Supply-injected volume, channel substitution, subsidy, low-value context re-reading, base effects, disclosure selection (L03 L151); budget rationing and on-premises relocation (L03 L141, L157) | Useful for P05/T-018 |

The R05 identity is unchanged, and token growth must not be read as `e>1`. Tokens are not tasks; L03 itself proposes tokens per task and dollars per task as observables (L165). Relocation from metered cloud to owned hardware (L157) is not demand destruction for energy accounting; it moves load outside providers' revenue lines.

<a id="s5"></a>
### S5 — Operational energy (W6)

The tranche's energy figures are secondary estimates:
- chip TDP times a multiplier (CL-049);
- modeled per-prompt energy (CL-050);
- IEA projections (L05 L515).

None is company metering, and none is per successful task. R04's boundary, factor-matching and no-allocation-by-revenue rules stand. L03's PUE 1.3 and $0.08/kWh are assumptions.

<a id="s6"></a>
### S6 — Numbers by evidence type

| Number | Locator | Type | Allowed use |
| --- | --- | --- | --- |
| +11.7 / +11.9 / +0.3 / +1.3 points from expanded budgets | L02 L135–L137 | obs (controlled; ≤100-task subsets) | Protocol-sensitivity evidence (CL-040) |
| 473K–16M "typical" SWE-Bench Pro token budgets | L02 L147, L337 | est (conversion from turn caps) | Illustrates protocol spread |
| 42/61 citations without a token budget | L02 L339 | obs (literature tabulation) | Comparability rule (CL-042) |
| ×1.61 decay scale per parameter doubling | L04 L353 | est (posterior mean) | Narrow W2 context (CL-044) |
| 3.2× entrant gap; $18–38B runs by 2030; ≈2× corridor; scenario probabilities | L03 L33–L35, L71, L93, L113 | est/proj | Scenario structure only (CL-045) |
| Google/OpenRouter token volumes | L03 L139 | relay (vendor) | Context; biased upward per L151 (CL-046) |
| GLM-5.2 "matches or exceeds" at ≈1/6 price | L03 L45 | relay (press) | Benchmark-clock lead only (CL-047) |
| $0.21–$15.25 per M output tokens | L03 L65 | relay (uninspected study) | Comparability rule (CL-048) |
| DRAM +90% Q1 2026; memory 40–50% of BOM | L03 L43 | relay (market surveys) | Context pending source inspection |
| ≈$1.25B/month Colossus lease | L03 L47 | relay (press) | None; reconcile against the filing under W1/W5 |
| 29.6 GW AI data-centre capacity; 9.4 GW all-in demand | L05 L356, L476 | est (different methods) | Context only (CL-049) |
| ≈23 / 21.9 / 5–6 Wh per prompt | L05 L434 | est relay (modeled) | Order of magnitude only (CL-050) |
| 47/102 API; 81/102 without training code | L05 L194 | relay (Epoch classification) | Licence-category rule (CL-051) |
| Regional data-centre electricity to 2030 | L05 L499, L515 | proj (IEA) | None as observation |
| ≈110 tokens/s; ≈70–95× GPU-time overhead | L07 L117–L120, L169 | obs by vendor | Prototype context only |
| Anthropic run-rate ≈$3B/≈$9B (2025) | L01 L95 | relay (press) | None; not comparable with CL-001 |

<a id="s7"></a>
### S7 — What remains unknown

- Any measured distribution of open/closed lags at benchmark, workload or commercial level, and Epoch's ECI method and protocol controls (T-015).
- Open-weight results under protocols matched to frontier results, for any of the three workloads.
- Dollar cost and energy per *successful* task for any current frontier or open model. No tranche source measures either.
- Whether token-efficiency gains offset rising test-time budgets in deployed workloads.
- Any identified AI price elasticity; the direction of the asserted Q2 2026 "regime break".
- The underlying methods of Jegham et al. (2025), de Vries and Gao (2025), the IEA (2025) edition, the H100 serving-cost study and the DRAM price surveys.
- Origin authentication for all seven files (their use as attributed input was approved by the author on 2026-11-28), and the edition and date of the Stanford PDF and of arXiv 2604.06217.

## Impacts on existing records (flagged, not silently rewritten)

- **[R02](INDEPENDENT-EVIDENCE.md#r02):** its rubric table is superseded for review by [WORKLOAD-RUBRICS.md](WORKLOAD-RUBRICS.md), version `0.4-draft`, not adopted. The tranche adds protocol and scoring-rule requirements.
- **[R03](INDEPENDENT-EVIDENCE.md#r03):** the benchmark clock must preserve the inference budget and protocol, and "not comparable" becomes a pair status distinct from censoring.
- **[R05](INDEPENDENT-EVIDENCE.md#r05):** `s` and `I` co-vary with the inference budget; no elasticity is supplied.
- **R01, R04 and R06** are not contradicted.
- **CL-006** is unchanged; the conflicting "parity" assertions in L01/L03 are recorded here without adjudication.
- **Suggested paper integration** (paper not modified here):
  - P03: protocol and denominator rules.
  - P04: the three clocks and "not comparable".
  - P05: the S4 table.
  - P01/P11: the scenario-versus-evidence distinction and the unknowns in S7.

## Limitations of this analysis

One analyst pass, not reviewed. Line locators depend on the hashed captures and will not match origin pagination. Chart-derived numbers are reconstructions. Cited secondary studies were not inspected. No numbers were recomputed from raw data. The summaries may contain errors and should be checked against the files before any claim's status changes.
