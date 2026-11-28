# W4 — What would identify a demand response? (T-018) — v0.4

| Field | Value |
| --- | --- |
| Initial author / coordinator | yorkerhodes3 |
| Prepared | 2026-11-28 |
| Status | **Draft method note for review.** No elasticity is estimated here. |
| Builds on | [R01](INDEPENDENT-EVIDENCE.md#r01), [R05](INDEPENDENT-EVIDENCE.md#r05), [literature tranche 01 S4](LITERATURE-TRANCHE-01.md#s4), [W1 §4](W1-FILING-RECONSTRUCTION.md#w1-short-term-pricing) |
| Feeds | Paper [P05](../paper/PAPER-DRAFT.md#p05), [P08](../paper/PAPER-DRAFT.md#p08); rebound lab presets; claims CL-004, CL-026, CL-027 |

<a id="w4-question"></a>
## 1. The estimand

The model in [SPECIFICATION §8](../SPECIFICATION.md#8-modeling-rules-and-edge-cases) needs `e`, the own-price elasticity magnitude of **successful tasks** for a defined workload with respect to **price per successful task**, at fixed quality. Three neighbouring quantities are often mistaken for it:

| Quantity | Why it is not `e` |
| --- | --- |
| Token or request growth | Tokens are not tasks. Context re-reading, agent loops and longer reasoning raise tokens per task without changing tasks ([tranche S4](LITERATURE-TRANCHE-01.md#s4)). |
| Revenue growth during price cuts | Revenue mixes price, usage, customers, products and channel; the issuer attributes about $600M of Q2→Q3 2026 offset to price reductions while revenue rose $5.4B (CL-004). Co-movement, not a demand curve. |
| Economy-wide rebound | Indirect and economy-wide effects (re-spending, new products, sector growth) sit outside a single workload's own-price response ([R01](INDEPENDENT-EVIDENCE.md#r01), CL-008). |

Short-run and long-run responses differ: integration, procurement and workflow redesign take time. A rebound claim must say which horizon it uses.

<a id="w4-constraint"></a>
## 2. The filing makes naive estimation invalid

The issuer states it has “consistently operated in a compute-constrained environment where customer demand exceeds available compute” (424B4 L13462–L13464; also L13914–L13916, L15902–L15904) and that it has changed “usage limits, rate limits, or model and product capabilities” (L3398) (**CL-026**). When supply binds, observed usage measures **capacity allocated**, not demand at the posted price:

- Quantities are censored from above. A price cut can leave measured usage unchanged (if capacity binds) or produce a jump when new capacity arrives. Both are supply events.
- Non-price rationing (rate limits, usage caps, waitlists, model access tiers) changes the effective price without changing the list price.
- The Q3-2026 delivery of $5.0B of short-term compute (CL-003) coincides with the quarter whose usage and price changes are reported (CL-004). Supply and price moved together.

Revenue is “primarily consumption-based” and much of it is not under long-term commitments (424B4 L3718; L6878) (**CL-027**). So usage, and therefore revenue, can move quickly in either direction. That is a reason to expect a demand response, not a measurement of one.

**Consequence for this project:** no elasticity can be read from the filing's quarterly series. Any future estimate must model or remove the capacity constraint first.

<a id="w4-confounders"></a>
## 3. Confounders any estimate must address

| Confounder | Mechanism | Source |
| --- | --- | --- |
| Capability change | Price cuts arrive with new model versions; quality and price shift together | CL-004 (L15531–L15535) |
| Capacity release | New compute arrives and relaxes rationing | CL-003, CL-026 |
| Non-price rationing | Rate and usage limits change effective price | CL-026 (L3398) |
| Diffusion and customer acquisition | Customer counts grew from ~400 to >11,900 at $100K+ TTM over six quarters (424B4 L15521–L15523) | W1 extraction |
| Channel substitution | Use moves between API, apps, cloud marketplaces and partners | Tranche 01 S4 (L03 L151) |
| Relocation to owned hardware | Usage leaves metered revenue but not the grid | Tranche 01 S4 (L03 L157) |
| Supply-injected volume and subsidies | Free tiers and promotional credits raise tokens without a paid price | Tranche 01 S4 (L03 L151) |
| Tokens-per-task drift | Longer reasoning or contexts change tokens per task | CL-040, CL-041 |

<a id="w4-strategies"></a>
## 4. Candidate identification strategies (proposals)

None is feasible with evidence in hand. Each is listed with its data requirement so a reviewer can judge whether it is worth acquiring.

| Strategy | Variation used | Data needed | Main threat | Availability |
| --- | --- | --- | --- | --- |
| Event study of price-only changes | A list-price cut on an *existing* model version, with no capability change | Daily usage by model and tier around the change | Simultaneous capacity or rate-limit changes | Usage not public |
| Tier substitution | Batch vs real-time or cached vs uncached prices for the same model | Usage shares by tier and price | Different latency needs make tiers imperfect substitutes | Prices public; usage not |
| Cross-model routing | Matched-quality frontier vs open-model price gaps on routers | Router usage shares by model, prices, quality under a fixed rubric | Quality matching; router users are not representative | Router shares partly public; quality matching needs T-005/T-015 |
| Borrowed analogue | Elasticities from cloud compute, bandwidth or lighting | Peer-reviewed estimates with their context | Transfer validity; label **borrowed**, not measured | Literature acquisition (W4) |
| Enterprise budget evidence | Planned spend vs price in procurement surveys | Survey microdata | Stated not revealed preference | Out of scope (no paid data) |

<a id="w4-implications"></a>
## 5. What the paper and lab can say now

1. `e` stays a **scenario parameter**. The rebound lab sweeps it and labels every preset value `assumed — not calibrated`; that is correct and should stay so.
2. Under proportional price and intensity reductions, energy rises only if `e > 1` (CL-013). No evidence in hand says whether any workload's `e` is above or below 1.
3. The supply constraint (CL-026) means near-term energy use is set by **delivered capacity**, not by price response, for as long as demand exceeds supply. That links P05 to P06/P09: commitments (CL-020) and their delivery schedules may matter more than elasticity until the constraint stops binding. This is a framing hypothesis for review, not a finding.
4. A credible estimate needs usage data by model, tier and date, which no public source in hand provides.

<a id="w4-review"></a>
## 6. Review questions

- Is the successful-task own-price elasticity the right estimand for the rebound question, or should the paper also carry a cross-price (frontier vs open-model) elasticity explicitly?
- Should the scenario presets add a capacity-constrained regime in which energy follows delivered capacity regardless of `e`?
- Which, if any, of the strategies in §4 justify acquisition effort?
