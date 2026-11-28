# DATA DICTIONARY: task-energy model — v0.4

> **Purpose:** Define every quantity used by the shared task-energy model, the rebound lab (F04/F07) and paper sections P05/P08, so units, domains and meanings cannot drift between the paper and the dashboard.
> **Input:** [SPECIFICATION §7–§8](SPECIFICATION.md#8-modeling-rules-and-edge-cases), [R05](research/INDEPENDENT-EVIDENCE.md#r05), [PLAN D-03/D-04](PLAN.md#2-technical-and-editorial-decisions).

| Field | Value |
| --- | --- |
| Status | Draft for review — not reviewed by a methods or energy reviewer |
| Working version | v0.4 |
| Initial author | yorkerhodes3 |
| Drafting support | AI assistance; human review required |
| Model version | `task-energy/0.4.0` — [`docs/assets/js/model/task-energy.mjs`](docs/assets/js/model/task-energy.mjs) |
| Run manifest schema | `frontier-half-life/run-manifest`, schema version `1.0.0` — [`docs/assets/js/model/manifest.mjs`](docs/assets/js/model/manifest.mjs) |
| Backlog | T-023 (dictionary and fixture validation), T-025 (scenario view and manifest replay) |
| Last updated | 2026-11-28 |

## 1. Calibration status and workload boundary

- **No company calibration exists.** Filing claims are located but unverified (BACKLOG T-014 awaits financial review), so no Anthropic, OpenAI, provider, or filing-derived value enters any model input, preset, or result. The claim ledger entries CL-001–CL-005 and CL-012 remain unverified leads.
- **The workload is abstract.** Every preset and every run describes an **illustrative indexed workload** until the coding, extraction and bounded-agent rubrics (BACKLOG T-005) are defined and reviewed. It is not a coding, extraction or agent workload, and its success rates are not evaluation results.
- **Results are illustrative indexed scenarios — not calibrated, not forecasts.** They show what the declared assumptions imply under the identity in §4. They are not measured elasticities, energy totals, or probabilities.
- **The model is deterministic.** It has no seed and no random component. Monte Carlo analysis (T-031) is later, separately reviewed work.

## 2. Classifications and evidence status

Classification describes where a value comes from; it is independent of verification state (`verified`, `corroborated`, `unknown`, `contested`) and confidence (`high`, `medium`, `low`, `unassessed`), as in [SPECIFICATION §7](SPECIFICATION.md#7-data-model).

| Classification | Meaning in this model | Used now? |
| --- | --- | --- |
| `reported` | A value taken from a located, cited source passage, with units, period and boundary | **No.** No reported value is used until reconciliation and review |
| `derived` | Calculated from other values by a published formula (for example k or e\*) | Yes — every result; derivation does not make an input verified |
| `estimated` | A documented estimation from evidence with a stated method and uncertainty | **No** |
| `assumed` | A value chosen as a modeling assumption with a written rationale | Yes — the shared index base of 100 and the §8 fixture inputs |
| `scenario` | An assumption deliberately varied to compare futures | Yes — all F07 preset inputs: `classification: scenario`, `evidence_status: assumed — not calibrated` |

Derived results inherit the weakest classification of their inputs: a result calculated from scenario inputs is a scenario result.

## 3. Metric dictionary

`null` (or a blank field) means **unknown, never zero**. Zero is a valid value only where the domain allows it and must be entered deliberately.

| Symbol | Name | Units | Allowed domain | Mode | Engine key | What it is **not** |
| --- | --- | --- | --- | --- | --- | --- |
| S | Successful tasks: desired task completions meeting the workload's success criterion | tasks per period | finite, S ≥ 0 | Absolute (S0); indexed as S1/S0 × 100 | `absolute.S0` | Not requests, tokens, or attempts; not revenue or users |
| P | Price per successful task, including charges for failed attempts and retries | currency per successful task (or an index) | finite, P > 0; **P = 0 is rejected** | Enters only as the ratio q | via `q`; helper `priceRatio(P0, P1)` | Not a token price, not cost to serve, not gross margin |
| e | Price-elasticity magnitude of successful demand | dimensionless | finite, e ≥ 0 | Both | `e` | Not a measured or fitted elasticity; not an economy-wide rebound estimate |
| s | Success rate: probability that one attempt succeeds | dimensionless | finite, 0 < s ≤ 1; **s = 0 is rejected** | Both (s0, s1 or route s) | `s0`, `s1`, `routes[].s` | Not a benchmark score or a general quality rating |
| A | Attempts = S / s; every retry counts once as an attempt | attempts per period | derived, A ≥ 0 | Absolute; indexed as A1/A0 × 100 | result `absolute.A0/A1`, `attemptsRatio` | Not a retry multiplier to apply again after counting attempts |
| I | IT electricity per attempt | kWh per attempt | finite, I ≥ 0; baseline I0 > 0 for ratios | Absolute (I0); I1/I0 as `iRatio` | `absolute.I0`, `iRatio`, `routes[].iRatio` | Not facility energy, not a carbon or water factor, not a measured model figure |
| p | Power usage effectiveness of the matched facility boundary | dimensionless | finite, p ≥ 1 | Absolute (p0); p1/p0 as `pueRatio` | `absolute.p0`, `pueRatio`, `routes[].pueRatio` | Not an emissions factor; not a regional grid property |
| E | Facility electricity = A × I × p | kWh per period | derived, E ≥ 0 | Absolute (E0, E1); indexed as E1/E0 × 100 | result `absolute.E0/E1`, `energyRatio` | Not company electricity, not emissions, not inferred from revenue |
| q | Price ratio P1/P0 | dimensionless | finite, q > 0 | Both | `q` | Not a margin change or pass-through evidence |
| k | Effective intensity ratio (s0/s1)(I1/I0)(p1/p0); routed: Σ share × k(route) | dimensionless | derived, k ≥ 0 | Both | result `k` | Not energy efficiency by itself; it excludes the demand response |
| e\* | Break-even elasticity magnitude solving q^(−e) × k = 1, so e\* = ln(k) / ln(q) | dimensionless | derived; may be negative or undefined (see §6) | Both | result `threshold` | Not a universal constant; e\* = 1 only under proportional price/intensity change with fixed s and p |
| share | Fraction of scenario successful demand served by one route | dimensionless | finite, 0 ≤ share ≤ 1; shares **sum to 1** | Both | `routes[].share` | Not market share or revenue share; not evidence of substitution |

**Financial and physical measures stay separate.** Price ratios and price indices are financial; attempts, kWh and PUE are physical. Compute expense divided by revenue is not gross margin and is not energy efficiency; company revenue is never converted into kWh in this model (FR-04).

## 4. Equations

For one workload and one comparison period, with positive prices:

```text
successful demand   S1 = S0 × q^(−e),          q = P1 / P0
attempts            A  = S / s                 (each retry counted once)
facility energy     E  = A × I × p
energy ratio        E1/E0 = q^(−e) × (s0/s1) × (I1/I0) × (p1/p0) = q^(−e) × k
threshold           e* = ln(k) / ln(q)         for q ≠ 1 and k > 0
```

**Routing.** The baseline is served by one route. A scenario may partition successful demand across routes whose shares sum to 1; each route then applies its own success rate, intensity ratio and PUE ratio: `A1 = Σ S1 × share / s(route)` and `k = Σ share × (s0/s(route)) × (I(route)/I0) × (p(route)/p0)`. The demand response is applied once, to total successful demand, before routing.

**Proportional identity (CL-013).** If price and IT intensity both scale by `0 < g < 1` and s and p are unchanged, then `E1/E0 = g^(1−e)` and e\* = 1.

## 5. Indexed and absolute modes

| Mode | When | Reports | Never |
| --- | --- | --- | --- |
| Indexed | Default; any of S0, I0 or p0 is unknown | Baseline = 100 for successful tasks, attempts and facility energy; ratios q, k, E1/E0; e\* | A kWh value |
| Absolute | All of S0, I0 and p0 are entered | Indexed results plus S1, A0, A1 and E0, E1 in kWh per period | A claim that the kWh are measured; they follow from the entered assumptions |

Missing absolute inputs produce a note naming the missing symbols and leave absolute energy unknown. No default kWh, zero, or substitute value is filled in. In the rebound lab, one optional absolute baseline is shared by all three futures.

## 6. Edge cases and explicit statuses

| Case | Engine behavior |
| --- | --- |
| Nonfinite input (NaN, ±Infinity, or JSON numbers such as `1e400`) | Field error `nonfinite`; result withheld |
| Price ratio q = 0 or either price is 0 | Field error `free-price`: a free price needs a separate demand model; no tiny constant is substituted |
| q < 0 or a negative price | Field error `nonpositive-price` |
| Success rate s = 0 | Field error `zero-success`: attempts and cost per successful task are undefined; result withheld |
| s < 0 or s > 1 | Field error `out-of-range` |
| e < 0 | Field error `negative-elasticity` (enter a magnitude) |
| I1/I0 < 0, PUE ratio ≤ 0, p0 < 1, or p0 × PUE ratio < 1 | Field error; result withheld |
| I0 = 0 | Field error `zero-baseline-energy`: the energy ratio is undefined; model a zero-energy boundary separately |
| S0 = 0 | Allowed: absolute energy is zero in both periods; a note explains that ratios describe per-unit scaling |
| Route shares that do not sum to 1, duplicate route IDs, or more than 8 routes | Field error; result withheld |
| Unknown or conflicting input fields | Field error `unknown-field` or `conflicting-fields` |
| Result too large to represent | Error `overflow`; result withheld |
| Threshold, q = 1 (within tolerance) | Status `no-price-change`: E1/E0 = k at every e; no threshold |
| Threshold, k = 0 | Status `zero-energy`: E1/E0 = 0 at every e; no threshold |
| Threshold, k = 1 and q ≠ 1 | Status `threshold`, e\* = 0 |
| Threshold, q < 1 and k < 1 | Status `threshold`, e\* > 0: energy falls below e\*, rises above it |
| Threshold, q > 1 and k > 1 | Status `threshold`, e\* > 0: energy rises below e\*, falls above it |
| Threshold, e\* < 0 (q < 1 with k > 1, or q > 1 with k < 1) | Status `outside-domain`: energy rises (or falls) at every e ≥ 0 |

In the rebound lab, an invalid field shows a field-level error, withholds the affected result and comparison cells, and labels the previous output as stale in text.

## 7. Numerical tolerance and fixtures

Two numbers agree when `|a − b| ≤ max(1e-12, 1e-9 × max(|a|, |b|))`. The same rule decides whether q or k equals 1 and whether route shares sum to 1, and it is the replay tolerance for manifests.

Synthetic §8 fixtures (CL-014), checked by `tests/model.test.mjs` and recomputed in the page's static fallback: S0 = 100, s = 0.5, I0 = 0.01 kWh, p = 1.2, unchanged price gives **2.4 kWh**; halving price and I with e = 1 gives **2.4 kWh**; with e = 2, **4.8 kWh**. They check accounting, not real demand or energy.

## 8. Scenario presets and run manifests

The three F07 presets — *efficient abundance*, *rebound acceleration*, *demand air pocket / open-model substitution* — are defined in [`docs/assets/js/model/scenarios.mjs`](docs/assets/js/model/scenarios.mjs) with a rationale for every value. They contain no company figures and make no claim about any company or provider. The open-model route is an abstract assumption, not a measured substitute.

A run manifest is JSON with exactly these top-level fields: `schema`, `schema_version`, `model_version`, `paper_version` (`v0.4`), `evidence_cutoff` (`none (indexed)`), `workload`, `index_base` (100), `figures` (`["F07"]`), `classification`, `evidence_status`, `tolerance`, `created_by`, and `scenarios` (each `id`, `inputs`, `results`). Import accepts at most 1 MiB of JSON; requires schema 1.x, model `task-energy/0.4.x` and paper `v0.4`; and rejects unknown fields, nonfinite numbers, unknown scenario or route references, markup in `created_by`, and recorded results that do not reproduce within tolerance. A rejected import leaves the current run unchanged. Query parameters (`?scenario=…&e=…`) replay a single future; `?brand=` and other presentation parameters never change inputs or results.

## Reviewer sign-off

- [ ] Symbols, units and domains match SPECIFICATION §8 and R05.
- [ ] Classifications and "what it is not" boundaries are adequate for P05/P08.
- [ ] Preset rationales are clearly assumptions, with no implied company or provider evidence.
- [ ] Edge-case statuses and tolerance are acceptable for replay.

**Reviewer:** _pending_

**Date:** _pending_

**Verdict:** _pending_
