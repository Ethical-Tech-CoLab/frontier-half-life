# Phase 1 — coding history tranche (SWE-bench Verified, Bash Only) — v0.4

| Field | Value |
| --- | --- |
| Initial author / coordinator | yorkerhodes3 |
| Prepared | 2026-11-28 under rubric [`0.4.0`](WORKLOAD-RUBRICS.md#selections) |
| Status | **Contamination-flagged history (T12).** Not used to decide the four-to-six-month hypothesis; never the sole basis for dating a catch-up. Draft for review |
| Data | [Pinned submissions](../data/raw/swebench-verified-bash-only/SOURCE.md) (48 mini-SWE-agent runs at `SWE-bench/experiments@40f164d`, SHA-256 in `MANIFEST.csv`) |
| Reproduce | `node tools/evaluate-coding-history.mjs --check` (offline); refetch with `node tools/fetch-swebench-bash-only.mjs` |
| Outputs | [models](../data/derived/coding-history-models.csv) · [pairs](../data/derived/coding-history-pairs.csv) · [same-harness pairs](../data/derived/coding-history-pairs-same-harness.csv) · [summary](../data/derived/coding-history-summary.json) |
| Feeds | Paper [P04](../paper/PAPER-DRAFT.md#p04); claim CL-055; BACKLOG T-015 |

<a id="ph1-method"></a>
## 1. Method and interpretation choices

Every submission runs one minimal harness (mini-SWE-agent, bash only) on the same 500 tasks, so the protocol is matched across models, as rubric §1.5 requires. The choices below interpret the rubric for this data. They are listed so a reviewer can contest them.

1. **Model score:** the best configuration per model (reasoning effort and harness version recorded). Three tag aliases join submissions of the same model (`ALIASES` in the tool).
2. **Frontier references (T9):** a closed Anthropic or OpenAI model whose best score exceeds every earlier Anthropic/OpenAI model in this protocol, one per release date, released on or after **2025-01-01**. The window start was **set after inspecting the data**: the oldest closed model here, GPT-4o (2024-11-20), was not OpenAI's frontier at release, and earlier frontier models are absent. Including it would add one more confirmed match (233 days, unpaired).
3. **Open candidates (T10):** models whose submission marks `os_model: true`, plus Llama 4 Maverick and Scout, whose metadata says closed although Meta published their weights (`OPEN_WEIGHT_OVERRIDES`). Neither Llama model changes any result.
4. **Release dates:** as reported in each submission's metadata (`model_release_date`), not independently verified.
5. **Match rule (T1, T2):** δ = 3 points for 500 tasks. *Confirmed*: the one-sided 95% lower bound of (open − reference) ≥ −δ; *nominal*: point difference ≥ −δ. Paired by task where the per-instance file is trustworthy; otherwise unpaired from published scores.
6. **Data-quality guard (found during this pass):** three per-instance files contradict their own published scores (Claude 3.7 Sonnet: 10.2% vs 52.8%; Gemini 3 Pro v2 run: 0% vs 69.6%; Gemini 3.5 Flash: 441 tasks, 81.4% vs 71.8%). A file is used for pairing only if it covers 500 tasks and reproduces the published score within 0.5 points. Seven submissions publish no per-instance file.
7. **Harness versions:** the Bash Only view spans mini-SWE-agent 0.0.0 to 2.4.2. The primary table treats it as one protocol, as the leaderboard does; a sensitivity table repeats the analysis within each major version.
8. **Cutoff and summary (T13):** censoring at 2026-11-30; Kaplan–Meier median with Brookmeyer–Crowley 95% interval.

<a id="ph1-results"></a>
## 2. Results (history only)

| Frontier reference (released, score) | First confirmed open match | Lag | First nominal match | Lag |
| --- | --- | ---: | --- | ---: |
| Claude 3.7 Sonnet (2025-02-24, 52.8%) | Qwen3-Coder 480B (2025-07-22, +2.6 pts, unpaired) | 148 d | same | 148 d |
| o3 (2025-04-16, 58.4%) | MiniMax M2 (2025-10-27, +2.6 pts) | 194 d | Qwen3-Coder 480B (−3.0 pts) | 97 d |
| Claude 4 Opus (2025-05-22, 67.6%) | DeepSeek V3.2 (2025-12-01, +2.4 pts) | 193 d | same | 193 d |
| Claude Sonnet 4.5 (2025-09-29, 71.4%) | Kimi K2.5 (2026-01-27, −0.6 pts; bound −2.997, borderline) | 120 d | DeepSeek V3.2 (−1.4 pts) | 63 d |
| Claude Opus 4.5 (2025-11-24, 76.8%) | **not observed by 2026-11-30** (371 d censored) | — | MiniMax M2.5 (2026-02-12, −1.0 pt) | 80 d |

| Summary | Matches / references | Kaplan–Meier median | 95% interval | Adopted T14 label |
| --- | --- | ---: | --- | --- |
| Confirmed match | 4 / 5 | 6.3 months (193 d) | 3.9 months – not reached | consistent |
| Nominal match | 5 / 5 | 3.2 months (97 d) | 2.1 – 4.9 months | consistent |
| Confirmed, same harness major version | v1: 2 / 5 · v2: 2 / 3 | v1: not reached · v2: 3.9 months | lower 2.9 (v1), 3.8 (v2); upper not reached | v1 inconclusive · v2 consistent |

**Reading:** On this contaminated benchmark, the open models that later matched each frontier release took about four to six and a half months to do so statistically, and about two to six months by point estimate. The newest frontier reference in this protocol (Claude Opus 4.5) has no confirmed open match a year later, although MiniMax M2.5 came within one point after 80 days. Results depend heavily on the match rule and on mixing harness versions: within a single major version, fewer references have a confirmed match, and each version subset admits its own oldest closed model as a reference (GPT-4.1 in v1, GPT-5 mini in v2), the same start-of-data artifact described in §1. The frontier models named in the 2026 filings (Opus 5, Fable 5, Mythos 5) and later OpenAI models do not appear in this protocol, consistent with developers abandoning Verified (CL-052).

<a id="ph1-issues"></a>
## 3. Issues raised for the author

1. **Decision rule T14 has a flaw (drafting error in `0.4-sel.1`).** As written, an interval whose upper bound is never reached counts as "consistent" if it starts below six months, so the confirmed and nominal summaries above both read "consistent" despite medians of 6.3 and 3.2 months. **Proposed amendment `0.4.1`:** label "inconclusive" when the upper bound is not reached or the median is not estimable; otherwise keep the overlap rule. Under the amendment, the confirmed summary becomes inconclusive and the nominal summary stays consistent. Awaiting the author's decision; the tool still applies the adopted rule.
2. **Primary coding data is not reachable here.** SWE-Bench Pro publishes per-instance results on GitHub for only four leaderboard models (Claude Sonnet 4 and 4.5, GPT-5, Kimi K2 Instruct). Newer results sit in a public S3 bucket that needs an AWS account, and the leaderboard page is blocked in this environment. A Pro tranche needs either leaderboard access from another environment or approval to use an AWS account (no compute spend expected for reading a public bucket; confirm before use).
3. **Harness-version mixing:** decide whether the primary table should keep the leaderboard's single Bash Only protocol (as here) or require one harness major version (much sparser).
