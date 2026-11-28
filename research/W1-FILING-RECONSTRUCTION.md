# W1 — Filing reconstruction (T-011 to T-014) — v0.4

| Field | Value |
| --- | --- |
| Initial author / coordinator | yorkerhodes3 |
| Prepared | 2026-11-28, text-based pass over the supplied captures |
| Status | **Draft reconstruction for review.** Passages are located and internally checked; no claim is `verified`. The author attested the captures authentic on 2026-11-28 ([decisions](../SOURCES.md#author-decisions-2026-11-28)). The financial review by yorkerhodes3 is still required. |
| Reproduce | `node tools/extract-filing-facts.mjs` (writes), `node tools/extract-filing-facts.mjs --check` (fails if stale or if a derived check fails) |
| Outputs | [extracted facts](../data/extracted/w1-filing-facts.csv) · [derived checks](../data/derived/w1-reconciliation-checks.csv) · [illustrative compute-pressure evaluation](../data/derived/w1-compute-pressure-illustrative.csv) |
| Feeds | [CLAIM-LEDGER.csv](../CLAIM-LEDGER.csv) CL-001–CL-005, CL-011, CL-012, CL-020–CL-025 · paper [P02](../paper/PAPER-DRAFT.md#p02), [P03](../paper/PAPER-DRAFT.md#p03), [P06](../paper/PAPER-DRAFT.md#p06), [P09](../paper/PAPER-DRAFT.md#p09) |

<a id="w1-scope"></a>
## 1. Scope and method

This pass follows [PLAN §6.1](../PLAN.md#61-filing-intake-and-remediation) steps 2–5, using the extracted text the author supplied and directed us to use (no original PDFs). It covers the five registration-sequence primary documents and confirms the subsequent 8-K's scope. It does **not** inspect exhibits for financial terms, the audited statement notes beyond the passages cited, or any non-issuer evidence.

1. A dependency-free extractor ([tools/extract-filing-facts.mjs](../tools/extract-filing-facts.mjs)) normalizes whitespace, applies one declared pattern per fact to every version, and records the value, period, unit, status and **line locator in the local capture**. A missing match is recorded as `not-found`; an unfilled amount placeholder as `blank-in-version`; an optional term absent from a version as `not-stated`.
2. Amendment 1 joins two renderings. Its [join check](02-s1a1-2026-11-02__join-check-note.md) excludes numbers and table punctuation, so every A1 **table** value is labelled `alignment-unverified`. A1 narrative amounts are recorded normally and checked against neighbouring versions.
3. Derived checks recompute footings, rounded ratios, growth rates, the commitment decomposition and the A1→A2 revision. Any failure makes `--check` exit non-zero.
4. Text extraction artifacts were found and tolerated explicitly, not edited: page numbers inside sentences (for example “compute fees 151 paid”, “$121.3 billion 179 between”) and split words (“a pproximately” in A2/A3). The source files are unchanged.

**What this does not establish:** Hash agreement with the supplied manifest and internal consistency do not authenticate the captures. Authentication now rests on the author's attestation of 2026-11-28 ([decisions](../SOURCES.md#author-decisions-2026-11-28)), not on a network check against SEC. Successive filings by the same issuer are **not independent corroboration**. Every company claim therefore remains `verification_state=unknown` until the financial reviewer records a sign-off.

<a id="w1-identity"></a>
## 2. T-011 — Identity and chronology

All six SEC headers or complete-submission headers name **Anthropic, PBC, CIK 0002130357** (SIC 7372, Delaware, fiscal year-end 12/31).

| Seq | Form | Accession | Filed | Accepted (header, ET) | Financial periods present | Material change for this project |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | S-1 | 0001628280-26-067168 | 2026-10-26 | 2026-10-26 09:00:11 | FY2023–FY2025; six months to 2026-06-30; quarters to Q2-2026 | Commitment amounts and the obligations table are **blank placeholders** |
| 2 | S-1/A (A1) | 0001628280-26-068676 | 2026-11-02 | 2026-11-02 09:24:24 | Adds nine months to 2026-09-30 and Q3-2026 | First quantified commitments: ~$895.4B aggregate; short-term cost wording strengthened |
| 3 | S-1/A (A2) | 0001628280-26-072484 | 2026-11-10 | 2026-11-10 06:29:24 | Same periods as A1 | Aggregate revised to ~$900.9B; adds $150–175B excluded estimate; Lambda August agreement terminable; Microsoft range |
| 4 | S-1/A (A3) | 0001628280-26-074338 | 2026-11-17 | 2026-11-17 06:26:31 | Same | No change found in the extracted facts |
| 5 | 424B4 | 0001628280-26-074944 | 2026-11-19 (prospectus 2026-11-18) | 2026-11-19 06:05:50 | Same | No change found in the extracted facts; this is the reference version below |
| 6 | 8-K | 0001628280-26-075973 | 2026-11-25 (event 2026-11-19) | 2026-11-25 16:10:29 | None | Closing, governance and placement items; **no** compute, revenue or commitment series ([intake review](FILING-INTAKE-REVIEW.md)) |

Accession numbers, forms, dates and CIK agree between filenames, captured indices, headers and [SOURCES.md](../SOURCES.md) (SRC-001, SRC-002, SRC-014–SRC-017). That is internal agreement. Authentication rests on the author's attestation of 2026-11-28.

<a id="w1-revenue-compute"></a>
## 3. T-012 — Revenue and compute/infrastructure expense

Reference: 424B4 summary table L2611–L2613 and quarterly table L15371–L15456. Values in USD millions; percent is compute and infrastructure expense ÷ revenue as reported.

| Quarter | Q1-2025 | Q2-2025 | Q3-2025 | Q4-2025 | Q1-2026 | Q2-2026 | Q3-2026 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Revenue | 376 | 787 | 1,382 | 2,040 | 4,731 | 11,555 | 16,956 |
| Compute and infrastructure | 944 | 1,390 | 2,047 | 2,945 | 3,387 | 5,558 | 9,863 |
| Reported ratio | 251% | 177% | 148% | 144% | 72% | 48% | 58% |

Annual and interim: revenue FY2023 $41M, FY2024 $386M, **FY2025 $4,585M**, nine months 2025 $2,545M, **nine months 2026 $33,242M**; compute and infrastructure FY2025 $7,326M, nine months 2026 $18,808M (57% of revenue).

**Checks ([derived checks](../data/derived/w1-reconciliation-checks.csv)):** quarterly revenue and expense foot exactly to FY2025 and both nine-month totals (CHK-01–06); every recomputed quarterly ratio rounds to the reported percent (CHK-07a–g); the nine-month ratio recomputes to 57% (CHK-08); Q3-2026 year-over-year growth recomputes to the reported 1,127% revenue and 382% expense (CHK-09/10). The S-1's six-month 2026 totals equal the later Q1+Q2 2026 quarters (CHK-14/15), and no overlapping quarterly cell changes across S-1, A2, A3 and 424B4 (CHK-16).

**Definitions that govern interpretation:**

- The line item covers research, model development, serving customers and internal usage; costs are “primarily … compute fees paid to CSPs under committed and on-demand arrangements” plus storage, networking, partner-channel serving, colocation, equipment leases and committed power (424B4 L14352–L14366). The issuer manages committed compute “as a single, shared resource across all workloads” rather than by workload (L14418–L14422).
- **Composition change:** “Beginning in 2026”, as leases commence, the line also includes lease costs, amortization of finance-lease assets, and depreciation and amortization of owned servers and data-center assets (L14368–L14370). Any four-quarter evaluation spanning 2025 and 2026 needs reviewer judgment about comparability.
- The issuer defines **compute efficiency** as “maximizing the intelligence produced and revenue generated per dollar of compute invested” (L13440–L13442). That is a financial/capability definition. It is not a physical, per-task or energy measure ([SPECIFICATION FR-04](../SPECIFICATION.md#5-functional-requirements)).
- Cost of revenue (customer-serving workloads) is a **different** functional caption, presented in Note 8. This pass did not extract it. The compute/revenue ratio above is not gross margin.
- Compute is typically procured 12 to 18 months before availability, and expense is recognized as compute becomes available (L13348–L13350, L14408–L14412). Expense therefore lags commitment.

<a id="w1-short-term-pricing"></a>
## 4. T-013a — Short-term compute and pricing

- **Short-term compute:** Q3-2026 expense “includes $5.0 billion of compute under short-term commitments” (424B4 L15561), and the nine months to 2026-09-30 include $6.5B (L14709–L14711). Both first appear in A1. The amount is **inside** the Q3 $9,863M expense; it is not an additional commitment.
- **Cost wording changed:** the S-1 says short-term compute “typically carries a higher cost per unit of compute” (S-1 L12989). From A1 onward, it “currently costs significantly more than comparable compute procured under our multi-year commitments” (424B4 L13352–L13354). No premium rate or unit cost is disclosed. We do not compute a “ratio excluding short-term compute”: replacement compute would not have been free, so that counterfactual would be invented.
- **Pricing:** From Q2-2026 to Q3-2026, the increase from higher usage “was partially offset by a decrease of approximately $600 million from price reductions introduced as part of new model versions and contractual discounts” (L15531–L15535). A smaller ~$70M offset is reported for Q3-2025 to Q4-2025 (L15525–L15529). The issuer says price changes were not material to the other quarterly trends. Sequential Q3-2026 revenue still rose $5,401M.
- **Interpretation boundary:** These are the issuer's accounting attributions. They show price cuts accompanied by higher usage. They do not identify a demand elasticity, because model capability, product launches and customer mix changed at the same time ([P05](../paper/PAPER-DRAFT.md#p05)).

<a id="w1-commitments"></a>
## 5. T-013b — Commitments, conditionality and revisions

| Component (USD billion) | A1 (11-02) | A2–424B4 (11-10 to 11-19) | 424B4 locator |
| --- | ---: | ---: | --- |
| Contractual obligations table, as of 2026-09-30 | 320.0 ¹ | 320.0 | L16935 |
| Short-term commitments excluded from the table | 17.4 | 17.4 | L16983–L16985 |
| Leases executed, not yet commenced | 451.2 | 451.2 | L16987–L16989 |
| Commitments entered after 2026-09-30 | **100.2** | **105.7** | L16995–L16997 |
| Short-term agreements entered after 2026-09-30 | 6.6 | 6.6 | L17001–L17003 |
| **Aggregate stated** | **~895.4** | **~900.9** | L16890–L16892, L665 |
| Expected before 2030-12-31 | 447.5 | 451.6 | L667–L669 |
| Due within 12 months of 2026-09-30 | 69.8 | 70.7 | L671 |
| Subject to exercisable termination rights or contingent conditions | **213.8** | **186.2** | L16906–L16910 |
| …of which in the next 12 months | 4.3 | 4.2 | L17011–L17013 |
| Arrangements without a fixed dollar commitment (**excluded** from the aggregate) | not stated | est. 150–175 | L16898 |

¹ $319,993M, read from A1's joined table (alignment unverified) and identical in A2, A3 and 424B4.

- The aggregate decomposes into the disclosed components within rounding (CHK-11: 900.893; CHK-12: 895.393). The entire A1→A2 increase is the +$5.5B in post-quarter commitments (CHK-13).
- **CL-005 is superseded.** The supplied $895.4B figure is accurate for A1 only. A2, A3 and the final prospectus state ~$900.9B and add a separately estimated $150–175B of variable arrangements that the aggregate excludes. New claims CL-020 and CL-021 carry the final figures. CL-005 is retained for lineage.
- **Conditionality is material and moving:** the share described as terminable or contingent fell from $213.8B to $186.2B between A1 and A2. The reason is not given in the extracted text.
- **Do not add the amounts below to the aggregate or to each other.** Some sit inside the table or lease totals, some are variable estimates outside the aggregate, and SpaceXAI is an “up to” amount with cancellation rights.

| Counterparty / arrangement (424B4) | Stated amount | Key terms | Revision lineage |
| --- | --- | --- | --- |
| Amazon | ≥ $110.0B, 2026-05 to 2036-04 | Regardless of usage; true-up | Unchanged |
| Google (CSP hosting) | ≥ ~$121.3B, 2026-04 to 2033-07 | Regardless of usage; true-up | S-1 $114.5B (amended through August) → A1 $121.3B (through October) |
| Google (additional TPU) | est. ~$125.0–150.0B | No fixed dollar commitment; delivery 2028–2031; outside the table | Unchanged |
| Microsoft | ≥ $47.2B, up to $49.2B, 2026-11 to 2033-06 | Regardless of usage; per-tranche cancellation for undelivered tranches | S-1 ≥ $44.9B to May 2033 → A1 to June 2033 → A2 range |
| SpaceXAI | up to $120.5B, terms into 2029 | ~$3.1B a month at full delivery; cancellable on 90 days' notice after initial periods | Unchanged |
| Broadcom equipment leases | ~$161.2B rent excluding interest | Five-year finance leases; TPU capacity | Unchanged |
| AMD | expected > $20.0B if initial capacity is procured | Conditional; no fixed dollar commitment; outside the table | Unchanged |
| Nscale | up to ~$44.6B, terms into 2033 | Fees only as capacity is delivered and accepted; Nscale best-efforts financing condition | Unchanged |
| Lambda, Inc. | ~$41.3B, terms into 2034 | Fees only as capacity is delivered and accepted; August 2026 agreement (~$34.9B) **currently terminable by either party** | Terminable status first disclosed in A2 |
| Fluidstack USA I Inc. | No amount in passage | Colocation, data-center development and operations services | Unchanged |

<a id="w1-providers"></a>
## 6. Provider-edge consequences (W5, FR-08)

- **Lambda** is the only one of the seven research candidates named in these documents as an Anthropic counterparty. This is now an evidenced edge with explicit fragility: ~$34.9B of ~$41.3B is terminable by either party because a facility lease was not secured by the specified date. Neither party had given notice as of the prospectus date (424B4 L17133–L17155).
- **Nscale** and **Fluidstack** are named counterparties. They are theme presets in this project but **not** research candidates. Treat any later profile as an addition requiring a backlog decision.
- **CoreWeave, Nebius, Crusoe, Together AI, Fireworks AI and Baseten** were not found in the five primary documents by name search. That is an absence in these documents, not evidence of no relationship (FR-08).
- The issuer describes four accelerator families (Trainium, TPUs, NVIDIA GPUs, AMD GPUs) and a hybrid “Anthropic Direct” model of leased hardware in third-party-operated facilities (424B4 L13466–L13468; L20049–L20105). Facility locations and power were not extracted; P07 remains without company-specific geography.

<a id="w1-stress"></a>
## 7. Illustrative compute-pressure boundary (P09, FR-14)

The approved illustrative trigger is compute/infrastructure expense **strictly above 60% of revenue for four consecutive comparable quarters**. Applied to the reported quarters ([derived file](../data/derived/w1-compute-pressure-illustrative.csv)):

| Quarter | Q1-2025 | Q2-2025 | Q3-2025 | Q4-2025 | Q1-2026 | Q2-2026 | Q3-2026 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Ratio | 251.1% | 176.6% | 148.1% | 144.4% | 71.6% | 48.1% | 58.2% |
| Above 60%? | yes | yes | yes | yes | yes | no | no |
| Consecutive count | 1 | 2 | 3 | **4** | 5 | 0 | 0 |

The boundary is met within 2025, where the disclosed composition is the same. During those quarters revenue grew more than fivefold while committed compute ramped. This shows why the trigger is **not** a solvency or viability signal: a company can cross it during a deliberate ramp. Reading the 2026 quarters also depends on the composition change in §3. The Q3-2026 rise from 48% to 58% coincides with the $5.0B short-term compute. These are historical, derived observations. They do not forecast future pressure and do not certify safety.

<a id="w1-claims"></a>
## 8. T-014 — Claim dispositions

| Claim | Disposition | Final value / note |
| --- | --- | --- |
| CL-001 revenue | **Supported** by located passages; footings pass | FY2025 $4,585M; nine months 2026 $33,242M; do not compare the nine-month figure with a full year as growth |
| CL-002 compute share | **Supported**; ratios recompute | Q2-2026 48%, Q3-2026 58%; financial ratio only |
| CL-003 short-term compute | **Supported**, with scope clarified | $5.0B in Q3 expense, $6.5B nine-month; premium undisclosed |
| CL-004 pricing offset | **Supported**; issuer attribution only | ~$600M Q2→Q3 2026; ~$70M Q3→Q4 2025; not an elasticity |
| CL-005 aggregate commitments | **Superseded** after A1 | $895.4B (A1) → ~$900.9B (A2–424B4); see CL-020 |
| CL-011 filing identity | **Supported** internally across headers, indices and filenames | Attested authentic by the author 2026-11-28; not network-verified |
| CL-012 supply portfolio | **Supported** with specifics | Four accelerator families, multiple CSPs, Anthropic Direct, named neocloud counterparties |
| CL-020 (new) | Reported | Final aggregate, timing and decomposition |
| CL-021 (new) | Reported | Conditional $186.2B and excluded $150–175B variable estimate |
| CL-022 (new) | Reported | Major named arrangements; not additive |
| CL-023 (new) | Reported | Lambda/Nscale/Fluidstack edges; six candidates unnamed |
| CL-024 (new) | Reported | Expense scope, 2026 composition change and issuer “compute efficiency” definition |
| CL-025 (new) | Derived | Illustrative trigger met in 2025; not a viability verdict |

“Supported” means the passage was located with consistent values across the applicable versions. It is a reconstruction disposition, not `verified`. Reviewer and review-date fields stay blank until an actual review happens.

<a id="w1-paper-impacts"></a>
## 9. Paper and dashboard impacts

- **P02:** The chronology is now a reconstructed lineage with revision points (S-1 placeholders → A1 quantification → A2 revisions) instead of a receipt list. F01 can show per-version status.
- **P03:** Use the issuer's financial “compute efficiency” definition only as a contrast to task and physical efficiency. The ratio series is a financial denominator.
- **P05:** The $600M offset co-occurs with usage growth and releases. It is not identification.
- **P06:** Use CL-020–CL-023 for commitment exposure (F05): fixed versus variable, conditional versus unconditional, and the evidenced Lambda edge with termination risk.
- **P09:** CL-025 illustrates the trigger's limits. F08 must show the comparability caveat.
- **Model inputs:** Nothing is calibrated. The indexed rebound model takes no values from this note. A future calibration needs reviewer-verified claims, plus a task-volume denominator that the filings do not disclose.

<a id="w1-unknowns"></a>
## 10. Remaining unknowns and review requests

1. **Authentication — resolved by attestation.** The author attested the captures authentic on 2026-11-28 ([decisions](../SOURCES.md#author-decisions-2026-11-28)). A network check against SEC remains possible later but is no longer a blocker.
2. **Financial review — reviewer assigned (yorkerhodes3).** The reviewer should confirm the dispositions in §8, especially the comparability judgment across the 2026 composition change and the treatment of A1 table values.
3. **Not yet extracted:** the Note 8 functional presentation (cost of revenue), Note 13 and Note 17 commitments, exhibit-level contract terms, Anthropic Direct facility locations and power, cash-flow and capex series, and the reason the contingent amount fell between A1 and A2.
4. **Undisclosed:** short-term compute premium, unit prices, task or token volumes, utilization, and energy. These rule out any physical-efficiency or per-task calibration from the filings alone.
