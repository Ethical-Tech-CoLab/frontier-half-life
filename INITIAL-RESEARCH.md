# CONCEPT-IDEA.md

## Working Title

**The Compute Rebound: Modeling How AI Efficiency, Demand, Neocloud Capacity, and Energy Use Co-Evolve**

## Document Status

- **Stage:** Concept / research initiation
- **Method:** Ethical Tech CoLab project-startup method: begin with a consequential human question, distinguish evidence from inference, expose uncertainty, keep claims source-addressable, require human review, and treat the prototype as a research instrument rather than an oracle.
- **Primary case:** Anthropic, using its 2026 S-1, S-1/A, final prospectus, exhibits, and subsequent public filings as the anchor evidence base.
- **Intended outputs:** Research paper, evidence-governed dataset, interactive futures dashboard, and documented modeling toolkit.
- **Initial author:** York E. Rhodes III / Ethical Tech CoLab
- **Date initiated:** 2026-11-27

---

## 1. The Human Question

**If frontier AI becomes dramatically cheaper and more efficient per unit of useful work, will total compute demand and energy use fall, stabilize, or accelerate, and who bears the economic and environmental consequences of each future?**

This project begins from a paradox. Better models, hardware, software optimization, caching, batching, routing, and long-term capacity procurement can reduce the cost of an AI task. Lower cost, however, can expand adoption, increase task complexity, stimulate new workloads, and raise aggregate demand. Efficiency may therefore reduce the resource intensity of each task while increasing total compute, power, water, land, financing, and infrastructure requirements.

Anthropic is a particularly useful case because its public filings expose both sides of this dynamic: rapid revenue and usage growth, substantial improvements in compute cost as a share of revenue through Q2 2026, a Q3 reversal associated partly with expensive short-term compute, price reductions that stimulated or accompanied greater use, and extraordinarily large multi-year infrastructure commitments.

---

## 2. Core Research Proposition

The project will test whether frontier-model efficiency behaves primarily as:

1. **A conservation mechanism**, reducing total resource demand;
2. **A growth mechanism**, lowering prices enough to expand demand faster than efficiency improves;
3. **A capacity-release mechanism**, shifting demand among hyperscalers, neoclouds, chip architectures, regions, and energy systems;
4. **A volatility mechanism**, producing cycles of overcommitment, scarcity pricing, stranded capacity, and emergency short-term procurement; or
5. **A mixed regime**, in which the outcome changes by workload, customer segment, time horizon, and energy market.

The central analytical object is not “cost per token” alone. It is the causal chain:

**technical efficiency → cost per useful task → pricing → demand elasticity → workload mix → capacity procurement → provider economics → electricity and water demand → emissions and community impacts.**

---

## 3. Why Anthropic and Why Now

Anthropic's filings provide a rare public view into frontier-AI unit economics and infrastructure commitments. Initial filing-derived observations to validate against the primary documents include:

- Revenue rose from approximately **$4.6 billion in FY2025 to $33.2 billion in the first nine months of 2026**.
- Compute and infrastructure expense represented approximately **48% of revenue in Q2 2026**, after being far higher in early 2025, but increased to approximately **58% in Q3 2026**.
- Q3 included approximately **$5.0 billion of compute under short-term commitments**, described as significantly more expensive than comparable compute under multi-year commitments.
- Price reductions and contractual discounts reportedly offset roughly **$600 million of Q3 revenue growth**, making price-performance improvement a demand-side variable rather than merely a margin variable.
- The amended filing disclosed approximately **$895.4 billion of aggregate committed spend**, substantially all related to compute and infrastructure, with meaningful portions contingent on financing, facilities, approvals, or termination provisions.
- Anthropic's supply portfolio spans hyperscalers, neoclouds, specialized infrastructure providers, multiple accelerator families, long-duration leases, and short-term capacity.

These facts do not on their own establish sustainable efficiency. They reveal a system in which model efficiency, procurement timing, pricing, demand growth, financing, and physical infrastructure interact.

---

## 4. Research Aim

Build an evidence-governed research and modeling environment that can:

- Reconstruct Anthropic's reported efficiency gains and reversals from primary filings;
- Separate model-level, task-level, financial, and physical efficiency;
- Estimate how price-performance changes may affect aggregate AI demand;
- Model the consequences for neocloud utilization, pricing, financing, and concentration;
- Translate compute scenarios into electricity, water, carbon, land, and infrastructure implications;
- Identify conditions under which efficiency reduces total impact versus creating a rebound effect;
- Expose assumptions, uncertainty, source quality, and model limitations to researchers and decision-makers.

---

## 5. Research Questions

### 5.1 Anthropic unit economics

1. What exactly drove the reported decline in compute and infrastructure expense relative to revenue through Q2 2026?
2. How much is attributable to technical efficiency, model routing, hardware mix, utilization, caching, procurement terms, revenue mix, accounting classification, or pricing?
3. Why did the ratio worsen in Q3, and which drivers appear temporary versus structural?
4. What is the correct denominator for efficiency: revenue, tokens, active users, tasks, benchmark-adjusted capability, customer value, or another measure?
5. How do training, inference, research, safety, and internal workloads contribute to reported compute costs?

### 5.2 Demand and rebound

6. What demand elasticities are plausible for consumer, developer/API, coding, agentic, and enterprise workloads?
7. Does lower cost per task cause more tasks, more complex tasks, longer contexts, greater reasoning depth, or migration from smaller to frontier models?
8. At what elasticity does an efficiency gain increase total compute or energy use?
9. Could agentic applications create a superlinear rebound by increasing the number of machine-initiated transactions and inference loops?

### 5.3 Neocloud consequences

10. Under what demand and supply conditions do frontier labs rely on premium short-term neocloud capacity?
11. Which neocloud business models remain viable if hyperscaler capacity becomes abundant or model efficiency improves faster than demand?
12. Which providers are most exposed to utilization risk, refinancing risk, customer concentration, hardware obsolescence, energy-price volatility, or contract cancellation?
13. How do long-term take-or-pay commitments alter spot pricing, bargaining power, and the risk of stranded capacity?
14. Do heterogeneous accelerators and model portability widen the viable supplier set or consolidate demand around vertically integrated platforms?

### 5.4 Energy and externalities

15. Does efficiency lower total electricity consumption, or does demand growth dominate?
16. Where and when does marginal electricity come from in each scenario?
17. How do grid congestion, interconnection delays, behind-the-meter generation, natural gas, storage, renewables, and nuclear procurement change outcomes?
18. What are the consequences for emissions, water stress, land use, local air quality, electricity prices, and affected communities?
19. Who receives the benefits of cheaper AI, and who absorbs the infrastructure and environmental costs?

---

## 6. Definitions: Do Not Collapse These Measures

| Measure | Working definition | Why it matters |
|---|---|---|
| Model efficiency | Compute required for a defined model operation or capability | Technical progress |
| Inference efficiency | Compute, latency, or energy per generated token | Useful but incomplete |
| Task efficiency | Compute, cost, or energy required to complete a defined useful task at a quality threshold | Better unit of comparison |
| Economic efficiency | Revenue, gross profit, or customer value per dollar of compute | Connects technology to business |
| Capacity efficiency | Useful work per installed accelerator-hour or MW | Reveals utilization and stranded capacity |
| Energy efficiency | Useful task output per kWh | Connects workloads to power |
| Carbon efficiency | Useful task output per kg CO2e using marginal and location/time-aware factors | Avoids misleading annual averages |
| System efficiency | Socially valuable output relative to all financial and physical inputs and externalities | Ethical-Tech-CoLab target measure |

The dashboard must allow users to change the unit of analysis and see when a claimed “efficiency gain” disappears under another denominator.

---

## 7. Evidence Architecture

### 7.1 Source priority

1. SEC-filed S-1, amendments, final prospectus, exhibits, and subsequent filings;
2. Anthropic model cards, system cards, pricing pages, technical papers, safety publications, and infrastructure disclosures;
3. Counterparty filings and official disclosures from compute, chip, data-center, and energy providers;
4. Regulatory, utility, grid-operator, permitting, and environmental records;
5. Peer-reviewed research and credible technical measurement studies;
6. High-quality investigative and trade reporting;
7. Analyst estimates, clearly labeled as estimates;
8. Unverified commentary, used only to generate questions.

### 7.2 Claim ledger

Every consequential claim should have:

- `claim_id`
- exact claim text
- metric and units
- entity and period
- source URL and document identifier
- page, section, table, or quoted passage
- source date and retrieval date
- classification: `reported`, `derived`, `estimated`, `assumed`, or `scenario`
- confidence grade
- known caveats
- transformation or formula
- reviewer and review date

### 7.3 Evidence states

- **Verified:** directly supported by a primary source.
- **Corroborated:** supported by multiple independent sources.
- **Derived:** calculated transparently from verified inputs.
- **Estimated:** inferred from incomplete public evidence.
- **Scenario assumption:** intentionally adjustable, not asserted as fact.
- **Unknown:** material information not publicly available.
- **Contested:** credible sources conflict.

The interface must visually distinguish these states. Estimates must never inherit the visual authority of filed facts.

---

## 8. Initial Hypotheses

These are testable hypotheses, not conclusions.

- **H1, task-price rebound:** A reduction in cost per useful task increases task volume enough that aggregate inference compute rises.
- **H2, capability rebound:** Efficiency gains are reinvested in longer context, deeper reasoning, multimodality, and agent loops, keeping cost per high-value task roughly stable while capability rises.
- **H3, procurement lag:** Rapid demand growth creates temporary dependence on expensive short-term neocloud capacity because long-term supply arrives with a 12–36 month lag.
- **H4, long-contract margin recovery:** As contracted capacity comes online, unit costs fall, but fixed commitments increase downside risk if growth slows.
- **H5, physical bottleneck migration:** Optimization moves the constraint from accelerator availability to power, networking, cooling, interconnection, financing, or permitting.
- **H6, provider bifurcation:** Neoclouds divide into durable specialized suppliers and fragile capacity intermediaries exposed to refinancing and utilization shocks.
- **H7, carbon ambiguity:** Lower energy per task does not guarantee lower emissions because workload growth and marginal generation can dominate.
- **H8, agentic super-rebound:** Autonomous agents increase machine-generated demand and produce a higher elasticity than human-initiated chat or API use.
- **H9, six-month rent decay:** For a material share of workloads, open-weight models reach commercial equivalency within roughly four to six months, compressing Anthropic pricing power before its long-duration compute commitments expire.
- **H10, control-plane capture:** The largest open-inference winner is the provider that gains trusted routing and operational control across models and accelerators, rather than the provider that merely posts the lowest token price.

---

## 8A. The Six-Month Open-Model Equivalency Hypothesis

### 8A.1 Working hypothesis

A frontier closed model may retain a meaningful capability lead for only **approximately four to six months** before one or more open-weight models reach practical equivalency for a significant subset of inference workloads. “Equivalency” must not mean a single benchmark tie. It should be evaluated at the workload level across:

- task success and output quality;
- cost per successful or useful task;
- time to first token and output tokens per second;
- context length and tool use;
- reliability, availability, and operational support;
- customization and fine-tuning;
- privacy, security, compliance, and deployment control;
- switching and migration cost.

Recent evidence supports treating this as a serious hypothesis rather than a fixed law. Epoch AI estimated that the strongest open-weight models lagged state-of-the-art closed models by an average of roughly four months during 2026 on its aggregate capability index. Mozilla-related reporting similarly placed the gap near 4.4 months, while other historical analyses describe a compression from roughly 18 months, to 8.5 months, to approximately five or six months across successive model eras. These estimates are benchmark- and methodology-dependent, and open models may perform less well on private evaluations or integrated production workflows. The model should therefore use a probability distribution for time-to-equivalency, not a hard six-month constant.

### 8A.2 Historical investigation

The research should build a release-pair dataset rather than relying on the headline claim. For each frontier launch, identify the first later open-weight release that reaches defined equivalency thresholds for specific workload classes.

Candidate historical sequences include:

- GPT-4-class closed models followed by Mixtral, Llama 3, Qwen, and DeepSeek advances;
- OpenAI o1 and other closed reasoning models followed by DeepSeek-R1 and open reasoning variants;
- successive Claude Sonnet and Opus releases followed by Qwen, DeepSeek, Kimi, GLM, Llama, and Mistral models that approach them on coding, reasoning, agentic, or multimodal tasks;
- smaller open models that become equivalent after domain fine-tuning even when they do not reach general-purpose frontier parity.

For every pair, record:

- frontier launch date and open-model release date;
- benchmark and private-evaluation results;
- task categories where parity is reached and where it is not;
- inference price at comparable quality;
- hardware and quantization assumptions;
- license and geographic constraints;
- whether weights, training code, and data are genuinely open;
- serving providers available at launch;
- time from model release to reliable production availability.

This produces at least three clocks:

1. **Benchmark catch-up:** time until an open model reaches a defined public-evaluation threshold;
2. **Workload catch-up:** time until it performs equivalently on a customer's actual task distribution;
3. **Commercial catch-up:** time until providers can offer the model with sufficient reliability, compliance, throughput, support, and total cost advantage.

The third clock is the relevant one for Anthropic revenue risk.

### 8A.3 Anthropic risk mechanism

The six-month hypothesis creates a recurring **frontier-rent decay curve** for Anthropic:

1. Anthropic launches a frontier Claude model and can initially charge a premium for superior intelligence, reliability, safety, and product integration.
2. Open-weight models approach capability parity on routine or well-bounded workloads.
3. Independent inference providers optimize those models across runtimes and accelerators, lowering cost and improving throughput.
4. Model routers and enterprise platforms shift suitable traffic away from Claude while reserving Claude for difficult, high-value, long-context, or trust-sensitive work.
5. Anthropic responds through price reductions, faster model releases, product bundling, contractual discounts, or additional capability investment.
6. Lower prices and higher capability may expand total demand, but Anthropic may capture a smaller share of the resulting inference pool or earn lower gross margin on the workloads it retains.

This is not necessarily a demand-collapse scenario. It is a **mix and margin risk**. Anthropic can remain the frontier leader while losing price-sensitive and repeatable inference workloads to open models. The risk is amplified when Anthropic has already committed to large quantities of compute under long-duration arrangements. If open-model substitution slows Claude token growth after capacity has been contracted, Anthropic faces some combination of lower utilization, price pressure, workload stimulation, or the need to create new products that absorb the capacity.

The risk is moderated by assets that are difficult for an open model alone to reproduce:

- Claude Code and other integrated applications;
- enterprise distribution and marketplace access;
- safety, trust, and governance positioning;
- support, indemnity, compliance, and accountability;
- proprietary data flywheels and product telemetry;
- long-context and high-complexity performance;
- reliability and rapid access to the newest capabilities;
- contracts that bundle intelligence, application, and inference.

The model should therefore test both **model substitution** and **product-stack defensibility**.

### 8A.4 Variables to add

- `frontier_lead_months`, represented as a distribution by workload;
- `benchmark_to_commercial_lag_months`;
- `open_equivalency_share`, the fraction of workloads for which open models meet the required threshold;
- `closed_model_premium`, price premium per successful task;
- `premium_decay_rate` after open equivalency;
- `routing_share_open`, by workload and quarter;
- `migration_friction`, including evaluation, integration, compliance, and operational cost;
- `product_bundle_retention`, representing value beyond raw model access;
- `frontier_release_cadence` and `open_release_cadence`;
- `quality_adjusted_cost_gap`;
- `provider_time_to_production`, from weights release to production-grade endpoint;
- `capacity_commitment_mismatch`, committed compute less economically demanded Claude workload.

### 8A.5 Required scenarios

1. **Persistent frontier lead:** Anthropic maintains a 9–12 month commercial advantage and retains premium workloads.
2. **Six-month normalization:** open models reach broad workload parity in four to six months, continuously compressing Claude's premium.
3. **Fast open convergence:** equivalency arrives within one to three months for routine coding, extraction, classification, and agent subtasks.
4. **Benchmark parity without product parity:** open models match scores but enterprise migration remains slow due to operations, support, and governance.
5. **Router-mediated commoditization:** enterprises dynamically arbitrate closed and open models, allocating Claude only to requests where its incremental value exceeds its premium.
6. **Open-model discontinuity:** a low-cost open release matches frontier capability across several high-value workloads and causes an abrupt repricing event.

---

## 8B. Open-Model Inference Providers: Beneficiaries and Market-Visibility Mechanisms

### 8B.1 Who benefits most

The direct beneficiaries are providers that can turn newly released weights into reliable, low-cost production endpoints faster than customers can reproduce internally.

| Provider archetype | Representative providers | Primary advantage if equivalency compresses |
|---|---|---|
| Open-model inference clouds | Fireworks AI, Together AI | Rapid model onboarding, optimized serverless catalogs, token-volume economies, fine-tuning and developer APIs |
| Enterprise model-serving platforms | Baseten | Production deployment, dedicated capacity, observability, governance, and custom-model operations |
| Alternative-architecture inference | Groq, Cerebras, SambaNova | Step-change latency or throughput economics that challenge conventional GPU serving |
| Open ecosystem and distribution hubs | Hugging Face | Model discovery, community trust, evaluation, deployment pathways, and ecosystem control points |
| Developer marketplaces and serverless compute | Replicate, Modal | Low-friction experimentation and programmable deployment |
| Infrastructure moving upward | CoreWeave, Nebius AI, Lambda | Ability to combine compute supply with managed inference and capture more software margin |
| Regional and specialized platforms | SiliconFlow and other regional providers | Access to local model ecosystems, customers, regulation, and hardware supply |
| Routing and orchestration layer | Existing platforms and emerging independent routers | Arbitrage across models, providers, hardware, price, latency, geography, and reliability |

The strongest strategic position may belong not to the provider with the cheapest raw token, but to the provider that becomes the **trusted neutral control plane for inference**. Such a provider can observe demand across models, optimize placement, negotiate capacity, reduce switching costs, and retain the customer relationship even as the leading model changes.

### 8B.2 Provider advantage scorecard

The dashboard should compare providers on:

- cost per successful task, not only list price per token;
- time to first token, output speed, tail latency, throughput, reliability, and failure rate;
- model onboarding speed after an open release;
- number and quality of supported model families;
- portability across NVIDIA, AMD, TPUs, and alternative accelerators;
- serverless, dedicated, private, sovereign, and on-premises options;
- fine-tuning, quantization, caching, batching, speculative decoding, and model-routing capabilities;
- enterprise observability, security, compliance, support, and service-level agreements;
- utilization and gross-margin structure;
- capital intensity and dependence on owned GPU capacity;
- customer concentration and infrastructure concentration;
- interface compatibility and migration friction;
- ecosystem distribution and developer mindshare.

### 8B.3 How providers gain market visibility

Open-model inference providers need to become visible at the exact moment developers and enterprises evaluate a newly competitive model. Effective mechanisms include:

1. **Day-zero availability:** publish a production endpoint, deployment recipe, benchmark, and transparent price within hours or days of the weights release.
2. **Reproducible leaderboards:** benchmark cost per successful task, latency distributions, throughput, reliability, and quality under disclosed workloads. Avoid unverifiable “fastest” claims.
3. **OpenAI-compatible APIs and migration kits:** make a provider or model switch a configuration change rather than an application rewrite.
4. **Model and workload routers:** offer automatic selection among Claude, OpenAI, Gemini, and open models based on quality threshold, price, latency, privacy, and region.
5. **Developer distribution:** integrations with Hugging Face, GitHub, VS Code, LangChain, LlamaIndex, observability platforms, cloud marketplaces, and enterprise AI gateways.
6. **Reference workloads rather than generic demos:** publish validated recipes for coding, RAG, extraction, support, document intelligence, agents, and regulated use cases.
7. **Independent benchmark participation:** submit to credible third-party measurement and make raw methodology available.
8. **Enterprise proof:** disclose reliability, security posture, support capability, deployment geography, and reference customers where permitted.
9. **FinOps evidence:** provide customer-specific cost simulators, utilization reports, caching savings, and migration ROI.
10. **Community and research credibility:** contribute to runtimes such as vLLM and SGLang, release optimization research, and support open evaluation datasets.
11. **Channel partnerships:** partner with hyperscalers, infrastructure clouds, chip vendors, systems integrators, and enterprise software platforms.
12. **Switching assurance:** publish export, portability, fallback, and multi-provider resilience mechanisms so choosing the provider does not recreate closed-model lock-in.

Visibility itself becomes a measurable funnel:

`weight release → endpoint availability → benchmark visibility → developer trial → workload evaluation → production approval → routed token share → retained enterprise account`

The dashboard should track conversion and elapsed time through this funnel for each provider where evidence is available.

### 8B.4 Market-structure implication

If enterprises can arbitrage **model × inference engine × accelerator × cloud**, inference begins to resemble a programmable commodity market. Economic value may accrue to four scarce control points:

- the frontier intelligence owner during the temporary capability-lead window;
- silicon and power providers where physical supply remains constrained;
- the neutral inference control plane that routes and optimizes workloads;
- enterprise platforms that provide governance, reliability, and integration.

This creates an “Android versus iPhone” dynamic, but the project should avoid treating it as destiny. Open-weight licensing, geopolitical constraints, fragmented tooling, uneven quality, and operational complexity could prevent full commoditization.

---

## 9. Modeling Framework

The prototype should combine complementary methods rather than forcing one model to answer every question.

### 9.1 Deterministic identity model

Begin with an auditable identity:

`Total energy = useful tasks × compute per task × facility energy per compute unit`

A more complete sector form:

`Energy(t) = Σ[w,p,r] Tasks(w,t) × ComputePerTask(w,m,t) × HardwareIntensity(m,h,t) × PUE(p,r,t)`

Where:

- `w` = workload type;
- `m` = model or model-routing tier;
- `h` = hardware class;
- `p` = provider;
- `r` = region;
- `t` = time.

Demand response can be represented initially as:

`Tasks(t+1) = Tasks(t) × (PricePerTask(t+1) / PricePerTask(t)) ^ elasticity`

This should be extended to include capability, latency, reliability, customer budgets, and saturation.

### 9.2 Monte Carlo simulation

Use Monte Carlo methods to propagate uncertainty across:

- technical efficiency improvement rates;
- task-price reductions;
- demand elasticity by workload;
- agentic workload growth;
- utilization and capacity availability;
- accelerator performance and useful life;
- short-term versus long-term compute mix;
- provider pricing and financing costs;
- PUE and cooling technology;
- regional grid carbon intensity and marginal generation;
- power prices and fuel costs;
- contract delivery, cancellation, and delay probabilities.

Outputs should be distributions, not point forecasts: total compute, provider revenue, utilization, power, emissions, water, stranded capacity, and probability of covenant or liquidity stress.

### 9.3 Reverse Stress Testing (RST)

Rather than asking only “what is likely?”, define unacceptable or decision-relevant outcomes and solve backward for combinations that produce them.

Candidate failure conditions:

- Anthropic compute cost exceeds a selected share of revenue for four consecutive quarters;
- committed capacity utilization falls below a viability threshold;
- a neocloud cannot refinance or cover fixed obligations;
- aggregate capacity demand undershoots committed supply by a selected percentage;
- total power demand exceeds deliverable regional supply;
- marginal emissions exceed a climate-alignment threshold;
- water consumption exceeds local stress thresholds;
- electricity-price impacts breach a community affordability threshold;
- a critical provider or accelerator dependency exceeds a concentration limit.

RST should report the **minimal plausible combination of shocks** required to cross each boundary and identify which assumptions are load-bearing.

### 9.4 Agent-based or agentic simulation

Use an agentic model only where heterogeneous behavior matters. Candidate agents:

- frontier AI labs;
- hyperscalers;
- neoclouds;
- chip suppliers;
- data-center developers;
- utilities and grid operators;
- lenders and infrastructure investors;
- enterprise customers;
- regulators and local communities.

Each agent can have budgets, contracts, forecasts, risk tolerances, information delays, and decision rules. The purpose is to explore feedback loops such as:

- labs lowering prices to stimulate use;
- providers expanding capacity based on extrapolated demand;
- lenders tightening after utilization misses;
- delayed projects raising spot prices;
- local opposition shifting capacity to higher-carbon or water-stressed regions;
- customer routing among models based on price, quality, latency, privacy, and availability.

Agentic outputs must be treated as scenario generation, not prediction. Behaviors and prompts must be versioned and reviewable.

### 9.5 Scenario families

At minimum:

1. **Efficient abundance:** capability and hardware efficiency rise; capacity arrives; prices fall; elasticity is moderate.
2. **Jevons acceleration:** price-performance improvements generate explosive new demand, especially agentic workloads.
3. **Supply squeeze:** demand outpaces delivery; short-term neocloud pricing and fossil-backed power increase.
4. **Demand air pocket:** efficiency improves but adoption slows; long-term commitments create stranded capacity.
5. **Grid-constrained growth:** compute exists but power, interconnection, water, or permitting binds.
6. **Hardware diversification:** TPUs, Trainium, AMD, NVIDIA, and custom accelerators intensify price competition and portability.
7. **Regulated carbon constraint:** emissions, water, or grid rules alter siting and economics.
8. **Regional fragmentation:** sovereignty, export controls, and data localization split markets and reduce global utilization efficiency.

---

## 10. Critical Model Variables

### Demand

- tasks by workload and customer segment;
- tokens per task, reasoning depth, context length, tool calls, retries, and agent loops;
- quality-adjusted capability;
- price per task and customer budget;
- elasticity and saturation;
- workload substitution and new-use creation.

### Supply and economics

- installed and deliverable accelerator capacity;
- utilization and scheduling efficiency;
- hardware mix and depreciation;
- long-term, short-term, spot, and vertically integrated capacity;
- contract duration, minimum spend, cancellation rights, financing conditions, and delivery risk;
- provider gross margin, cost of capital, and customer concentration;
- model portability and switching costs.

### Physical impacts

- IT load, PUE, and hourly load profile;
- grid and behind-the-meter generation mix;
- marginal as well as average emissions factors;
- water usage effectiveness and local water stress;
- transmission and interconnection constraints;
- embodied carbon of accelerators and facilities;
- land, noise, local air pollution, and community electricity-price effects.

---

## 11. Dashboard Concept

### 11.1 Primary experience

The dashboard should let a researcher move from **evidence → assumptions → simulation → implications → challenge**.

### 11.2 Proposed modules

1. **S-1 Evidence Room**
   - Filing timeline and amendments;
   - sourced quarterly financial and compute metrics;
   - commitments by counterparty, instrument, timing, conditionality, and source;
   - highlighted reported-versus-derived-versus-estimated values;
   - direct source navigation.

2. **Efficiency Decomposition**
   - compute expense / revenue;
   - revenue / compute dollar;
   - price per task;
   - task-normalized compute and energy;
   - procurement-mix and hardware-mix effects;
   - waterfall explaining quarter-to-quarter movement.

3. **Demand Rebound Lab**
   - sliders or distributions for efficiency, pricing, elasticity, capability uplift, and agentic multiplication;
   - break-even elasticity at which total resource use stops falling;
   - workload-specific rebound curves.

4. **Neocloud Futures Map**
   - provider relationships, commitments, delivery timing, regions, hardware, power, and financing dependencies;
   - utilization, margin, concentration, refinancing, and stranded-asset scenarios;
   - comparison of hyperscaler, neocloud, and direct-build economics.

5. **Monte Carlo Explorer**
   - parameter distributions and correlations;
   - fan charts and outcome distributions;
   - sensitivity and value-of-information analysis;
   - reproducible run seed and downloadable scenario manifest.

6. **Reverse Stress Test Workbench**
   - selectable failure threshold;
   - minimal shock combinations;
   - ranked load-bearing assumptions;
   - early-warning indicators and mitigations.

7. **Agentic Market Simulation**
   - actor strategies and decision rules;
   - period-by-period contracting, pricing, deployment, and financing decisions;
   - causal event log explaining emergent outcomes.

8. **Energy and Community Footprint**
   - total and marginal power demand;
   - regional generation and emissions;
   - water, land, and local-pollution indicators;
   - hourly/seasonal stress where data permit;
   - distribution of benefits and burdens.

9. **Evidence and Uncertainty Inspector**
   - click any output to reveal formula, inputs, provenance, confidence, and unresolved evidence gaps;
   - compare “filed-only” results with research-augmented estimates.

### 11.3 Dashboard principles

- No result without a provenance path.
- No point forecast without an uncertainty range.
- No energy total without workload, location, time, and boundary assumptions.
- No “efficiency” claim without a declared denominator.
- No agentic result presented as a prediction.
- No optimization objective that silently excludes social or environmental costs.

---

## 12. Research Paper Outline

1. Abstract
2. The frontier-AI efficiency paradox
3. Literature: Jevons paradox, rebound effects, cloud economics, and AI energy measurement
4. Anthropic filing chronology and evidence method
5. Reconstructing reported efficiency gains and the Q3 reversal
6. Decomposing technical, procurement, pricing, and revenue effects
7. Demand elasticity and the cost-per-useful-task framework
8. Neocloud market structure and capacity-financing risk
9. Energy, emissions, water, and community impacts
10. Monte Carlo futures
11. Reverse stress tests
12. Agentic market scenarios
13. Findings, limits, and decision implications
14. Ethical analysis and distributional consequences
15. Data and methods appendix
16. Claim ledger and reproducibility manifest

---

## 13. Ethical-Tech-CoLab Review Questions

Before model construction:

- What human circumstance is improved by this work?
- Who could use the dashboard to make a consequential decision?
- Who is represented as an actor, and who is represented only as a constraint or externality?
- Which communities bear power, water, land, noise, pollution, and affordability effects?
- Which values are embedded in “viability,” “efficiency,” and “optimal”?
- What harmful decisions could a misleading result encourage?
- What uncertainty must remain visible even if it makes the interface less decisive?
- Which conclusions require human judgment rather than automated recommendation?
- How can affected communities challenge assumptions or add evidence?

---

## 14. Risks and Guardrails

| Risk | Guardrail |
|---|---|
| Treating filing ratios as physical efficiency | Decompose accounting, pricing, procurement, utilization, and technical drivers |
| False precision from incomplete data | Use ranges, evidence states, sensitivity analysis, and explicit unknowns |
| Confusing tokens with useful work | Use task- and quality-adjusted measures where possible |
| Double-counting commitments | Build contract-level records with dates, amendments, overlaps, and conditionality |
| Misstating energy or emissions | Declare system boundary; use region/time-aware factors; separate average and marginal impacts |
| Agent simulation anthropomorphism | Publish decision rules and treat outputs as exploratory scenarios |
| Investment-recommendation misuse | Position tool as research and scenario analysis, not personalized financial advice |
| Corporate-claim laundering | Preserve source text and distinguish filed facts from analyst interpretation |
| Ignoring distributional impacts | Include local community and environmental indicators alongside financial outcomes |
| Model monoculture | Compare deterministic, stochastic, stress, and agentic methods |

---

## 15. Minimum Viable Research Product

The first release should not attempt to forecast the entire AI economy. It should deliver:

1. A versioned Anthropic filing dataset covering quarterly revenue, compute/infrastructure expense, key adjustments, pricing disclosures, and compute commitments;
2. A claim ledger with primary-source locations;
3. A deterministic demand–efficiency–energy model;
4. A Monte Carlo model with documented distributions;
5. Three reverse stress tests;
6. A preliminary provider/commitment network focused on neocloud exposure;
7. An energy module with clearly labeled high/central/low assumptions;
8. A dashboard prototype that exposes provenance and uncertainty;
9. A research-paper working draft documenting findings and gaps.

---

## 16. Phased Work Plan

### Phase 0: Human review and scope lock

- Review this concept with research, finance, infrastructure, energy, and ethics perspectives.
- Decide whether the primary decision audience is investors, infrastructure planners, policymakers, researchers, or a multi-audience comparison.
- Lock definitions of useful task, viable future, neocloud, efficiency, and energy boundary.

### Phase 1: Primary-source reconstruction

- Download and archive all relevant Anthropic filings and exhibits.
- Extract tables and narrative claims with page/section provenance.
- Reconcile original S-1, amendments, final prospectus, and subsequent filings.
- Build the contract and counterparty ledger.

### Phase 2: Deep research

- Triangulate counterparties through their filings and official disclosures.
- Research hardware performance, pricing, delivery schedules, and portability.
- Assemble energy, grid, water, permitting, and regional datasets.
- Review rebound-effect and AI-energy literature.

### Phase 3: Baseline model

- Implement the deterministic identities.
- Reproduce historical quarters.
- Decompose Q2 efficiency improvement and Q3 reversal.
- Document residuals that cannot be explained publicly.

### Phase 4: Futures methods

- Add Monte Carlo distributions and correlations.
- Conduct reverse stress tests.
- Prototype agentic market interactions only after baseline validation.

### Phase 5: Dashboard and paper

- Build evidence-first dashboard views.
- Write results with verified facts, derived results, scenarios, and unknowns separated.
- Conduct external methodological review.

---

## 17. Success Criteria

The project succeeds if:

- A reviewer can trace every major number to a source or formula;
- Anthropic's efficiency narrative can be decomposed without equating margin improvement to technical efficiency;
- The model identifies the elasticity threshold at which efficiency raises total demand;
- At least three materially different viable futures emerge from plausible assumptions;
- RST reveals non-obvious combinations that threaten lab, neocloud, grid, or environmental viability;
- Energy results change transparently when geography, timing, PUE, utilization, and marginal generation change;
- The dashboard communicates uncertainty without becoming unusable;
- The paper states what cannot be known from public data;
- Human reviewers can challenge and revise assumptions without rewriting the model.

---

## 18. Open Questions Requiring Early Resolution

1. Does “Anthropic efficiency” mean model efficiency, company gross margin, compute/revenue, customer task cost, or all four shown separately?
2. Should the dashboard model Anthropic only, or use Anthropic as a calibrated anchor for a sector model?
3. Which neoclouds qualify for the first provider cohort?
4. What time horizon is decision-relevant: quarterly through 2030, annual through 2035, or both?
5. What is the defensible unit of useful work for coding, agents, enterprise knowledge work, and consumer chat?
6. Can public power and facility data locate enough committed capacity to support regional energy estimates?
7. How should embodied emissions and construction impacts be treated?
8. Which community-impact thresholds should be selected with affected stakeholders rather than by the research team alone?

---

## 19. Initial Source Register

### Primary and near-primary

- Anthropic Investor Relations, **SEC Filings**: https://investor.anthropic.com/sec-filings/default.aspx
- SEC EDGAR, Anthropic S-1/A filed 2026-11-02, accession `0001628280-26-068676`: https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/anthropicpbc-sx1ax1.htm
- SEC EDGAR, Anthropic S-1 filed 2026-10-26, accession `0001628280-26-067168`: https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/anthropicpbc-sx1.htm

### Filing analyses and sector reporting to verify against primary sources

- SEC API, **Anthropic S-1 and S-1/A IPO Filings Analysis**: https://sec-api.io/insights/anthropic-ant-s-1-and-s-1-a-ipo-filings-analysis-q3-2026-revenue-17-0bn-and-895bn-compute-commitments
- Data Center Dynamics, **Anthropic S-1 update reveals $895.4bn in cloud and data center commitments**: https://www.datacenterdynamics.com/en/news/anthropic-s-1-update-reveals-8954bn-in-cloud-and-data-center-commitments/
- TechCrunch, **Anthropic is still grappling with the economics of compute**: https://techcrunch.com/2026/11/03/anthropic-is-still-grappling-with-the-economics-of-compute/

- Epoch AI, **Open models lag state-of-the-art closed models by 4 months**: https://epoch.ai/data-insights/open-closed-eci-gap
- Ars Technica, **Paying for frontier AI models buys a 4-month head start at 5x the cost**: https://arstechnica.com/ai/2026/09/exclusive-open-chinese-models-close-gap-with-silicon-valleys-frontier-ai-models/
- OpenBenchmarks, **Baseten vs Fireworks AI measured comparison**: https://openbenchmarks.com/inference/baseten-vs-fireworks-ai

### Research streams to add

- Jevons paradox and direct/indirect economy-wide rebound literature;
- AI inference and training energy measurement;
- quality-adjusted task benchmarks and inference-cost studies;
- data-center PUE, WUE, marginal emissions, and hourly carbon accounting;
- utility IRPs, grid interconnection queues, air permits, water permits, and local planning records;
- public filings and official disclosures from named cloud, neocloud, chip, financing, data-center, and energy counterparties.

---

## 20. Recommended Repository Structure

```text
/
├── CONCEPT-IDEA.md
├── README.md
├── RESEARCH-PLAN.md
├── CLAIM-LEDGER.csv
├── DATA-DICTIONARY.md
├── MODEL-CARD.md
├── ETHICS-AND-IMPACT.md
├── SOURCES.md
├── assumptions/
│   ├── baseline.yaml
│   ├── distributions.yaml
│   └── scenarios/
├── data/
│   ├── raw/
│   ├── extracted/
│   └── derived/
├── models/
│   ├── deterministic/
│   ├── monte-carlo/
│   ├── reverse-stress/
│   └── agentic/
├── dashboard/
├── paper/
└── validation/
```

---

## 21. Immediate Next Documents

Following human review of this concept, create in order:

1. `RESEARCH-PLAN.md` with source-by-source acquisition and validation tasks;
2. `CLAIM-LEDGER.csv` seeded from the S-1/S-1-A;
3. `DATA-DICTIONARY.md` defining every metric, unit, period, and evidence state;
4. `MODEL-CARD.md` defining scope, equations, assumptions, validation, and prohibited uses;
5. `DASHBOARD-SPEC.md` translating the modules above into user stories and acceptance criteria;
6. `PAPER-OUTLINE.md` with claims mapped to required evidence;
7. `ETHICS-AND-IMPACT.md` documenting stakeholders, harms, review gates, and governance.

---

## 22. Human Review Gate

**Do not begin implementation until a human reviewer confirms:**

- the consequential question and intended decision audience;
- the definition of efficiency and useful work;
- the initial neocloud cohort;
- the energy and emissions system boundaries;
- the unacceptable outcomes used in reverse stress testing;
- the distinction between factual reconstruction, derived analysis, and exploratory futures;
- the project's non-goals and prohibited uses.

The first act of the project is not coding. It is deciding whether this framing is sufficiently accurate, contestable, and useful to justify the research.
