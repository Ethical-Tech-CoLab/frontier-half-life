# Source register and evidence-access record — v0.4

**Initial author:** yorkerhodes3. **Research cutoff / access check:** 2026-11-27.
**Status:** Discovery and access triage, not a completed literature review or authenticated financial dataset.

<a id="author-decisions-2026-11-28"></a>
**Author decisions, 2026-11-28 (yorkerhodes3):**
1. **Filing captures are authentic.** The author attests that the supplied copies of the S-1, the three amendments, the final prospectus, the 8-K and their exhibits (SRC-001, SRC-002, SRC-014–SRC-017) are authentic. This satisfies the document-authentication step of FR-01 by attestation; it is recorded as such and is not a network verification.
2. **Financial reviewer.** yorkerhodes3 is the financial reviewer for now. Company claims stay `unknown` until that review is recorded claim by claim with a date.
3. **Literature files.** The supplied literature captures, including the three previously "held back" files (SRC-024–SRC-026), may be used as attributed input to this project.

**2026-11-28 W1 update:** A reproducible text-based reconstruction ([research/W1-FILING-RECONSTRUCTION.md](research/W1-FILING-RECONSTRUCTION.md); `node tools/extract-filing-facts.mjs --check`) locates the company claims in SRC-001/002/014/015/016 with line locators and records per-version revisions. No source is origin-authenticated; no claim is promoted to `verified`.

**2026-11-28 intake update:** All requested text captures for the selected filing sequence are received: original S-1, three amendments, final prospectus, November 25 8-K and the requested exhibits/indices. All 80 present manifest-listed files match their recorded hashes and sizes. See [the intake review](research/FILING-INTAKE-REVIEW.md). Original PDFs are not required; the author directed use of the extracted text. Claim-level reconciliation and review remain pending.

**2026-11-28 literature update:** The seven supplied `05-lit` texts are registered as SRC-020–SRC-026 under [supplied literature tranche 01](#supplied-literature-tranche-01). Their analysis is a draft and has not been reviewed.

## Access and evidence policy

Direct `web_fetch` requests to the two supplied SEC filings, the issuer filing page, Epoch, and IEA failed hostname resolution. A second, direct HTTP attempt also failed DNS resolution for SEC submissions, the amended filing, issuer page, Epoch, arXiv, and IEA. These are environment access failures, not evidence that the sources or claims are false.

Earlier web search returned indexed passages attributed to official sources. For the SEC claims, the supplied local text captures now supersede snippet-only access. No claim in [CLAIM-LEDGER.csv](CLAIM-LEDGER.csv) has been upgraded to `verified` by file receipt alone. Check exact passages, definitions, periods, amendments and text-conversion caveats before changing a claim's status. The previously supplied figures remain unverified pending that work.

The ledger's `retrieval_date` records the discovery/check date, **not** successful archival download. `source_date` is the candidate date supplied by the original draft or indexed source; verify it against the document. A locator containing “pending” means no primary passage has yet been captured. Confidence in discovery is not confidence in the truth of the claim.

Use the received text files and their manifest identifiers/checksums to capture exact locators, metric boundaries and reviewer records. No PDF/HTML reacquisition gate is imposed. For independent sources still unavailable, retain access failures separately. Use revisions rather than overwriting contradictory or superseded evidence. See [PLAN §3](PLAN.md#3-evidence-work-packages) and [BACKLOG T-010](BACKLOG.md#next-evidence-reconstruction).

## Filing handoff and remediation

The 2026-11-27 gathering request has been fulfilled for the selected intake. On 2026-11-28 the author directed text-based review without original PDFs. The primary filing covers, indices, 8-K items and join-check limits have been inspected; financial claims have not yet been reconciled or signed off.

Continue [PLAN §6.1](PLAN.md#61-filing-intake-and-remediation) from the completed inventory: reconcile primary passages across the captured revisions, update claims individually, and revise P02/P03/P06/P09 plus any dependent figure/manifest. Receipt and hash matching do not establish every value's accuracy. The join-check explicitly excludes numeric/table alignment.

## Independent continuation pass

Further direct retrieval attempts for UKERC, the inference-energy study, Epoch, LBNL, Science and EPA also failed DNS resolution. Search returned original-paper and institutional excerpts useful for a **bounded, provisional literature synthesis** in [research/INDEPENDENT-EVIDENCE.md](research/INDEPENDENT-EVIDENCE.md). New source entries below identify their observed scope. None is represented as a full-text review, an authenticated company measure, or a measured AI elasticity.

The ledger also contains explicitly `derived` algebra/synthetic fixtures with local method locators. These are analytical checks, not externally reported observations; their pending verification/reviewer fields must not imply primary-source authentication.

<a id="src-001"></a>
## SRC-001 — Anthropic original S-1 candidate

- **Candidate:** 2026-10-26; accession `0001628280-26-067168`, CIK `2130357`.
- **Primary document:** https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/anthropicpbc-sx1.htm
- **Indexed official header:** https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/0001628280-26-067168-index-headers.html
- **Observed:** Search returned a header identifying Anthropic, PBC, that accession, and form S-1. Direct document retrieval failed DNS.
- **Received text:** [Primary capture](research/01-s1-2026-10-26__primary-document-anthropicpbc-sx1.md), index, header and exhibits in [research/MANIFEST.csv](research/MANIFEST.csv); received-text inventory confirmed 2026-11-28.
- **Authentication:** Attested authentic by the author, 2026-11-28 ([decisions](#author-decisions-2026-11-28)); not network-verified.
- **Next:** Financial review of the W1 dispositions. W1 found results only through 2026-06-30 and blank commitment placeholders in this version ([W1 §2](research/W1-FILING-RECONSTRUCTION.md#w1-identity)).
- **Feeds:** CL-001–CL-005, CL-012; paper P02/P03/P06.

<a id="src-002"></a>
## SRC-002 — Anthropic S-1/A candidate

- **Candidate:** 2026-11-02; accession `0001628280-26-068676`.
- **Primary document:** https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/anthropicpbc-sx1ax1.htm
- **Indexed official index:** https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/0001628280-26-068676-index.htm
- **Observed:** Search returned issuer/form/date and the named main document; searches for the amounts did not expose financial-table passages. Direct retrieval failed DNS.
- **Received text:** [Amendment 1](research/02-s1a1-2026-11-02__primary-document-anthropicpbc-sx1ax1.txt), index, header and revised exhibits; [join-check note](research/02-s1a1-2026-11-02__join-check-note.md) documents word-level continuity checks, not numeric alignment.
- **Authentication:** Attested authentic by the author, 2026-11-28 ([decisions](#author-decisions-2026-11-28)); not network-verified.
- **Next:** Financial review. W1 located the A1 values (first Q3-2026 data; $895.4B aggregate, later superseded); table cells are alignment-unverified per the join check ([W1 §5](research/W1-FILING-RECONSTRUCTION.md#w1-commitments)).
- **Feeds:** CL-001–CL-005; paper P02/P03/P06. No calibrated model inputs yet.

<a id="src-003"></a>
## SRC-003 — Issuer filing chronology candidate

- **Official listing:** https://investor.anthropic.com/sec-filings/default.aspx
- **Observed:** Earlier indexed listing identified the final prospectus and 8-K; their local captures/indices are now present (SRC-016/SRC-017), alongside all three amendments. Direct online listing access previously failed DNS.
- **Next:** Reconcile the selected sequence through the cutoff. Do not presume the prospectus equals an amendment or that receipt completes a census of every SEC filing.
- **Feeds:** Paper P02/P03/P06; T-010/T-011.

<a id="src-004"></a>
## SRC-004 — Epoch AI open/closed capability-gap analysis

- **Title:** Open models lag state-of-the-art closed models by 4 months.
- **URL:** https://epoch.ai/data-insights/open-closed-eci-gap
- **Observed:** Indexed text describes an average four-month gap since January 2026 on the Epoch Capabilities Index and cautions that public/private benchmark differences may understate the gap. Search metadata gives 2026-05-29; the publication/update history still needs document inspection. Direct retrieval failed DNS.
- **Supports as a lead:** Aggregate benchmark catch-up is worth investigating.
- **Does not establish:** Workload-specific or commercial parity, a universal six-month law, or an Anthropic margin effect.
- **Next:** Capture methodology, release coverage, index versions, censoring and benchmark caveats; build independent release-pair records.
- **Feeds:** CL-006; paper P04; W3.

<a id="src-005"></a>
## SRC-005 — Task-dependent deployment energy research

- **Authors/title:** Alexandra Sasha Luccioni, Yacine Jernite, and Emma Strubell, *Power Hungry Processing: Watts Driving the Cost of AI Deployment?*
- **Publication record:** https://arxiv.org/abs/2311.16863
- **Version to inspect:** https://arxiv.org/abs/2311.16863v3
- **Observed:** Indexed abstract describes energy/carbon measurement for 1,000 inferences across task-specific and general-purpose models. Initial submission is indexed as 2023-11-28; final publication/version details need checking. Direct version retrieval failed DNS.
- **Use:** Motivate task-specific measurement and model/hardware boundary disclosure.
- **Limit:** Historical experimental configurations are not current Claude/OpenAI energy measurements and do not alone normalize by successful useful tasks.
- **Next:** Inspect full experiment design, hardware, batches, outputs, measurement method, and task quality before reusing results.
- **Feeds:** CL-007; paper P01/P03/P07; W2/W6.

<a id="src-006"></a>
## SRC-006 — Rebound evidence review

- **Institution/title:** UK Energy Research Centre, *The Rebound Effect: An Assessment of the Evidence for Economy-wide Energy Savings from Improved Energy Efficiency* (2007).
- **URL:** https://ukerc.ac.uk/publications/the-rebound-effect-an-assessment-of-the-evidence-for-economy-wide-energy-savings-from-improved-energy-efficiency/
- **Observed:** Indexed institutional description reviews rebound mechanisms/evidence and says efficiency remains useful while rebound requires explicit treatment. Full report and author metadata have not been retrieved.
- **Use:** Distinguish direct, indirect, and economy-wide rebound; avoid presenting backfire as inevitable.
- **Limit:** It is not an estimate of AI workload demand elasticity.
- **Next:** Read the report's definitions, empirical evidence, and limits; add peer-reviewed AI/service-demand evidence and competing findings.
- **Additional discovery:** The indexed [UKERC project description](https://ukerc.ac.uk/project/the-rebound-effect-report/) uses cheaper driving as an example of direct rebound. Its [microeconomic working-paper record](https://ukerc.ac.uk/publications/the-rebound-effect-microeconomic-defintions-extensions-and-limitations/) explicitly limits its scope to direct rebound for one service. This helps separate the proposed task-demand identity from an economy-wide claim; full reports still need inspection.
- **Feeds:** CL-008; paper P01/P05; W4.

<a id="src-007"></a>
## SRC-007 — US data-center energy estimates

- **Institution/title:** Lawrence Berkeley National Laboratory, *2024 United States Data Center Energy Usage Report*, report `LBNL-2001637`.
- **Official record:** https://datacenters.lbl.gov/publications/2024-lbnl-data-center-energy-usage-report
- **Report:** https://eta-publications.lbl.gov/sites/default/files/2024-12/us_data_center_energy_usage_report_lbnl-2001637.pdf
- **Observed:** Indexed official record describes historical estimates using studies/shipment data and future demand scenarios through 2028. The indexed executive summary gives 176 TWh for 2023 and a 325–580 TWh range for 2028; full tables and boundaries have not been retrieved.
- **Use:** Sector-level context and boundary checks, not a company/facility energy allocation.
- **Limit:** Historical estimates and future scenario ranges are neither direct meter readings for all facilities nor marginal regional emissions factors.
- **Next:** Inspect report assumptions, accelerator/load accounting, PUE, water, and uncertainty; do not transfer its sector totals into the company model.
- **Feeds:** CL-009; paper P07; W6.

<a id="src-008"></a>
## SRC-008 — Global data-center energy scenarios

- **Institution/title:** International Energy Agency, *Energy and AI*, executive summary.
- **URL:** https://www.iea.org/reports/energy-and-ai/executive-summary
- **Observed:** Indexed text gives approximately 415 TWh of data-center electricity in 2024 and approximately 945 TWh in 2030 in the described projection. Full retrieval failed DNS. The underlying report edition/date must be established; search crawl/update timestamps are not publication dates.
- **Use:** Global context and alternative scenario comparison.
- **Limit:** Data-center demand includes non-AI services; sector projections do not demonstrate a particular company's demand, marginal generator, or community impact.
- **Next:** Inspect scenario assumptions, geographic scope, definitions and edition, and compare with regional utility/grid evidence.
- **Feeds:** CL-010; paper P07; W6.

<a id="src-009"></a>
## SRC-009 — Historical data-center efficiency counterpoint

- **Authors/title:** Eric Masanet, Arman Shehabi, Nuoa Lei, Sarah Smith, and Jonathan Koomey, *Recalibrating global data center energy-use estimates* (2020).
- **Primary publication:** https://www.science.org/doi/10.1126/science.aba3758
- **Indexed publication text:** https://www.science.org/doi/pdf/10.1126/science.aba3758
- **Observed:** Indexed text compares global data-center estimates for 2010–2018, describing much faster compute-instance growth than energy growth and efficiency gains from equipment, virtualization, and shifts toward larger facilities. Direct Science retrieval failed DNS.
- **Use:** A historical counterpoint to treating explosive energy growth as an inevitable consequence of service growth.
- **Limit:** Sector-level estimates in that historical period are not modern frontier inference measurements, constant-elasticity calibration, or proof that future AI energy demand stays flat.
- **Next:** Inspect estimation methods, definitions, uncertainty, and supplemental data before quoting numerical estimates.
- **Feeds:** CL-015; paper P01/P07/P11; W4/W6.

<a id="src-010"></a>
## SRC-010 — Test-defined software issue resolution

- **Title:** *SWE-bench: Can Language Models Resolve Real-World GitHub Issues?*
- **Publication / version:** https://arxiv.org/abs/2310.06770 ; https://arxiv.org/pdf/2310.06770v3
- **Observed:** Indexed original-paper passages describe GitHub issue/patch tasks evaluated by repository tests; successful resolution requires applying the patch and passing the relevant tests. The initial record is from 2023; the indexed v3 is dated 2024-11-11. Full text/version has not been downloaded.
- **Use:** A candidate operational definition of coding-task success and an example of a versioned evaluation harness.
- **Limit:** Test-defined resolution is not every aspect of usefulness, maintainability or enterprise reliability. Scores across different harnesses, task subsets, tools, and budgets are not automatically comparable.
- **Next:** Confirm version, authors, license, task population, test selection, contamination issues, and evaluator reproducibility before selecting the project rubric.
- **Feeds:** CL-016; paper P03/P04; W2/W3.

<a id="src-011"></a>
## SRC-011 — Human-reviewed coding-benchmark subset

- **Institution/title:** OpenAI, *Introducing SWE-bench Verified*.
- **URL:** https://openai.com/index/introducing-swe-bench-verified/
- **Observed:** Indexed official announcement dated 2024-08-13 describes a 500-sample subset selected with human annotations to address problematic benchmark tasks.
- **Use:** Evidence that task-set selection and version matter when comparing coding outcomes.
- **Limit:** “Verified” is the benchmark name, not a verification state for this ledger or a commercial-equivalency certificate. This is a vendor announcement, not an independent assessment of its own models.
- **Next:** Inspect annotations, dataset/harness license, selection method, and independent checks; do not mix original, Lite, and Verified scores.
- **Feeds:** CL-017; paper P03/P04; W2/W3.

<a id="src-012"></a>
## SRC-012 — Historical regional electricity-emission accounting

- **Institution/title:** US EPA, *Frequent Questions About eGRID*.
- **URL:** https://www.epa.gov/egrid/frequent-questions-about-egrid
- **Observed:** Indexed official FAQ describes output rates from emissions divided by generation at multiple geographic aggregations, alongside nonbaseload rates. Direct retrieval of the eGRID landing page failed DNS.
- **Use:** Specify geography, reporting year, units, and annual average versus nonbaseload accounting.
- **Limit:** Nonbaseload rates are a proxy described by EPA, not automatically a facility-specific hourly marginal dispatch factor or a long-run response to new data-center demand.
- **Next:** Inspect selected data edition, geographic matching, imports/exports, units, and rate definition before allocating any regional emissions.
- **Feeds:** CL-018; paper P07; W6.

<a id="src-013"></a>
## SRC-013 — Modeled long-run marginal electricity response

- **Institution/title:** NREL, *Cambium Documentation: Version 2021*, technical-report record.
- **Official publication record:** https://www.osti.gov/biblio/1835075
- **Official dataset description:** https://catalog.data.gov/dataset/long-run-marginal-emission-rates-for-electricity-workbooks-for-2022-cambium-data
- **Observed:** Indexed official records describe simulated hourly data for possible electricity-sector futures and long-run marginal rates that include possible grid operating and structural changes.
- **Use:** Distinguish consequences of a long-lived load intervention from annual inventory accounting or fixed-grid short-run marginal dispatch.
- **Limit:** A modeled scenario is not an observed marginal generator or a forecast guaranteed to hold. Documentation and data editions differ and must be matched.
- **Next:** Select a compatible edition, scenario, location and time horizon; inspect method/uncertainty and report all choices before using rates.
- **Feeds:** CL-019; paper P07/P09; W6/W7.

<a id="src-014"></a>
## SRC-014 — Amendment No. 2, received text

- **Accession / filing date:** `0001628280-26-072484`, 2026-11-10.
- **Local source:** [Primary capture](research/02b-s1a2-2026-11-10__primary-document-anthropicpbc-sx1ax2.md), index, header, fee table and eight exhibits.
- **Use:** Reconcile revisions from Amendment 1, including contract/note disclosures; do not treat newly added passages as capture gaps without checking.
- **Status:** Hash/size inventory complete. W1 extraction: commitment total revised to ~$900.9B, $150–175B variable exclusion and Lambda terminable status first appear here ([W1 §5](research/W1-FILING-RECONSTRUCTION.md#w1-commitments)).

<a id="src-015"></a>
## SRC-015 — Amendment No. 3, received text and new exhibits

- **Accession / filing date:** `0001628280-26-074338`, 2026-11-17.
- **Local source:** [Primary](research/03-s1a3-2026-11-17__primary-document-anthropicpbc-sx1ax3.md), [index](research/03-s1a3-2026-11-17__filing-index.md), SEC header, underwriting form 1.1 and consents 23.1/23.2.
- **Use:** Compare the later offering/underwriting terms with Amendment 2 and the final prospectus.
- **Status:** All indexed primary/text exhibits present and hash/size matched. W1 extraction found no change from A2 in the extracted facts; other passages were not compared.

<a id="src-016"></a>
## SRC-016 — Final prospectus, received text

- **Accession / filed date:** `0001628280-26-074944`, 2026-11-19; prospectus dated 2026-11-18.
- **Local source:** [Final 424B4](research/04-424b4-2026-11-19__primary-document-anthropicpbc-424b4.md), index, header and directory listing.
- **Use:** Final registration/prospectus reconciliation, separate from later IPO-close events.
- **Status:** Received text with recorded provenance. Reference version for [W1](research/W1-FILING-RECONSTRUCTION.md); attested authentic by the author 2026-11-28; company claims located with line locators, unverified pending financial review.

<a id="src-017"></a>
## SRC-017 — November 25 8-K, received primary and complete submission

- **Accession / filed date:** `0001628280-26-075973`, 2026-11-25; earliest reported event 2026-11-19.
- **Local sources:** [Primary](research/04b-8k-2026-11-25__primary-document-ant-20261119.md), [index](research/04b-8k-2026-11-25__filing-index.md), complete submission and five exhibits.
- **Inspected scope:** Items 1.01/3.02/3.03/5.03/7.01/8.01/9.01 concern closing agreements, placement/rights, governance, disclosure channels and IPO completion. Separate filed material from Item 7.01's furnished disclosures.
- **Use:** Financing/governance reconciliation in P02/P06; not a new historical compute-efficiency series.
- **Status:** Text/exhibit coverage and manifest integrity checked. No monetary claim or financing ratio has been promoted to verified by this intake pass.

<a id="supplied-literature-tranche-01"></a>
## Supplied literature tranche 01 (2026-11-28)

Seven supplied `05-lit` text captures were analyzed in [research/LITERATURE-TRANCHE-01.md](research/LITERATURE-TRANCHE-01.md). That analysis is a draft and has not been reviewed. On 2026-11-28 each file's SHA-256 and size matched [research/MANIFEST.csv](research/MANIFEST.csv). Origins were not network-authenticated, so receipt and hash matching establish intake integrity only. Line locators refer to the hashed local files. Three files remain marked "held back - license check": cite them with short quotations and locators only, and do not republish them. SRC-018–SRC-019 are reserved for concurrent filing-reconstruction records.

<a id="src-020"></a>
## SRC-020 — Open-weight commoditization thesis (argumentative preprint)

- **Author/title:** Jared James Grogan, *The End of the Foundation Model Era: Open-Weight Models, Sovereign AI, and Inference as Infrastructure*.
- **Identifier / version:** arXiv:2604.06217 v1. The capture records submission on 2026-03-18 and events covered through 2026-03-09. The `2604` prefix and the March date disagree; check at origin.
- **URL (manifest):** https://arxiv.org/pdf/2604.06217
- **Local source:** [Text capture](research/05-lit__arxiv-2604.06217-end-of-the-foundation-model-era.md); SHA-256 prefix `21c00a872203`.
- **Access / authentication:** Supplied local text; hash matched manifest; origin not network-authenticated.
- **License / redistribution:** CC BY 4.0 per manifest and capture header; attribution in [research/README.md](research/README.md#attribution-arxiv-papers-cc-by-40).
- **Observed:** A single-author structural argument with no dataset or measurement protocol. Its revenue figures come from press reporting.
- **Use:** Hypotheses about value migration and inference as a cost centre. Its "parity" framing conflicts with CL-006 and is recorded without adjudication.
- **Limit:** Its assertions are not measurements of catch-up, price, cost or demand, and its press-relayed revenue run-rate is not a W1 input.
- **Feeds:** [L01](research/LITERATURE-TRANCHE-01.md#l01); W3/W5 hypotheses only; no ledger claim.

<a id="src-021"></a>
## SRC-021 — Inference-compute sensitivity of frontier evaluation (UK AISI preprint)

- **Authors/title:** Jessica McFadyen, Ole Jorgensen, Harry Coppock, Kevin Wei and Cozmin Ududec, *How Inference Compute Shapes Frontier LLM Evaluation*.
- **Identifier / version:** arXiv:2606.17930. v1 is dated 2026-06-16 and v3 2026-07-16; the capture is v3. The intake corrected the identifier from 2606.1793.
- **URL (manifest):** https://arxiv.org/pdf/2606.17930
- **Local source:** [Text capture](research/05-lit__arxiv-2606.17930-inference-compute-and-frontier-evaluation.md); SHA-256 prefix `558de029d5bf`.
- **Access / authentication:** Supplied local text; hash matched manifest; origin not network-authenticated.
- **License / redistribution:** CC BY 4.0 per manifest; attribution in [research/README.md](research/README.md#attribution-arxiv-papers-cc-by-40).
- **Observed:** A controlled crossed design: six Anthropic/OpenAI models on five benchmarks, under two feedback conditions with 5 trajectories per task. Budgets run to 5M–30M tokens per trajectory, and a literature table covers 89 published harness setups.
- **Use:** Benchmark scores depend on inference budget, feedback, submission and sampling protocol. Most published setups omit those fields. Generational gains come mainly from reach and reliability.
- **Limit:** No open-weight models; tokens, not dollars or energy; up to 100-task subsets (12 for FrontierMath); one scaffold; unrefereed preprint. The authors had developer-provided model access.
- **Next:** Confirm the version at origin; inspect the appendices on the efficiency-model specification and budget conversions before reusing numbers.
- **Feeds:** CL-040–CL-043; [L02](research/LITERATURE-TRANCHE-01.md#l02); [proposed rubrics](research/WORKLOAD-RUBRICS.md); W2/W3; paper P03/P04.

<a id="src-022"></a>
## SRC-022 — Memory-scarcity scenario analysis (single-author preprint)

- **Author/title:** Satoshi Matsuoka, *Memory Scarcity, Open Models, and the Restructuring of the AI Industry, 2026–2030 — A quantitative scenario analysis of inference economics, training-cost divergence, and infrastructure solvency*.
- **Identifier / version:** arXiv:2607.07207 v1, 2026-07-08, captured from arXiv HTML.
- **URL (manifest):** https://arxiv.org/html/2607.07207v1
- **Local source:** [Text capture](research/05-lit__arxiv-2607.07207-memory-scarcity-open-models-ai-industry.md); SHA-256 prefix `4b6dac256c9f`.
- **Access / authentication:** Supplied local text; hash matched manifest; origin not network-authenticated.
- **License / redistribution:** CC BY 4.0 per manifest; attribution in [research/README.md](research/README.md#attribution-arxiv-papers-cc-by-40).
- **Observed:** A closed-form $/PB bandwidth cost model with assumed parameters. Only the caption of the appendix parameter table survived extraction. It sets out five scenarios with subjective probabilities. Market figures are relayed from press, vendors and analysts. The author discloses substantial AI assistance.
- **Use:** Stress-test structure, full versus marginal cost and metered versus total inference definitions, and a list of demand-tracker biases (confounders for T-018).
- **Limit:** Projections and probabilities are model outputs, not observations. No price elasticity is estimated or borrowed. Relayed figures, including a press-reported Anthropic compute lease, are not authenticated and do not substitute for filing reconciliation.
- **Next:** Inspect the cited serving-cost study, DRAM price surveys and tracker disclosures before using any number.
- **Feeds:** CL-045–CL-048; [L03](research/LITERATURE-TRANCHE-01.md#l03); W4/W5/W6 scenarios; paper P05/P06/P09 context.

<a id="src-023"></a>
## SRC-023 — Capability and token-efficiency scaling in a distilled reasoning family

- **Authors/title:** Moritz Laber, Zohair Shafi, Germans Savcisens, Brennan Klein, Matteo Chinazzi, Samuel V. Scarpino, Albert-László Barabási, Alessandro Vespignani and Tina Eliassi-Rad, *Scaling of Capability and Efficiency at Inference Time in Large Reasoning Models*.
- **Identifier / version:** arXiv:2609.27166 v2. v1 is dated 2026-09-22 and v2 2026-09-24; the text is dated 2026-09-25.
- **URL (manifest):** https://arxiv.org/pdf/2609.27166
- **Local source:** [Text capture](research/05-lit__arxiv-2609.27166-scaling-capability-and-efficiency.md); SHA-256 prefix `984d5732061f`.
- **Access / authentication:** Supplied local text; hash matched manifest; origin not network-authenticated.
- **License / redistribution:** CC BY 4.0 per manifest; attribution in [research/README.md](research/README.md#attribution-arxiv-papers-cc-by-40).
- **Observed:** Five DeepSeek-R1-Distill models (1.5B–70B) on four synthetic tasks, analyzed with hierarchical Bayesian models. Code is reported as released.
- **Use:** Within this family, larger models did not produce shorter correct answers; capability grew sublinearly with parameters.
- **Limit:** One distilled family, synthetic tasks and possible tokenizer confounding. Efficiency is conditioned on correct answers. No cost or energy is measured.
- **Feeds:** CL-044; [L04](research/LITERATURE-TRANCHE-01.md#l04); W2.

<a id="src-024"></a>
## SRC-024 — Stanford HAI AI Index 2026, Chapter 1 (full chapter text)

- **Institution/title:** Stanford Institute for Human-Centered AI, *2026 AI Index Report*, Chapter 1 "Research and Development" (57-page chapter).
- **Identifier / date:** The manifest gives 2026-04-13. The capture records the PDF as published 2026-07-16, so a later revision is possible; confirm the edition.
- **URL (manifest):** https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_1_research_development.pdf
- **Local source:** [Text capture](research/05-lit__stanford-hai-ai-index-2026-ch1-full-chapter.md); SHA-256 prefix `5020fdfa9768`.
- **Access / authentication:** Supplied local text; hash matched manifest; origin not network-authenticated.
- **License / redistribution:** Author decision 2026-11-28: usable as attributed input to this project. Short quotations with attribution and locators; the full text is not republished on Pages (`research/` stays excluded). The manifest notes that arXiv lists the full report (arXiv:2606.15708) under CC BY-NC-ND 4.0; those terms still apply to any reuse beyond quotation.
- **Observed:** A secondary synthesis of Epoch AI, Jegham et al. (2025), IEA (2025), de Vries and Gao (2025), Cloudscene and GitHub/Hugging Face data. Charts survive only as loose numbers.
- **Use:** Release-access and licence categories; pointers to underlying energy and compute estimates.
- **Limit:** Estimates and projections, not company metering. Per-prompt energy is not per successful task. The extraction has some suspect chart labels, and the capacity and demand estimates are not reconciled.
- **Feeds:** CL-049–CL-051; [L05](research/LITERATURE-TRANCHE-01.md#l05); W3/W6; T-004/T-017 discovery.

<a id="src-025"></a>
## SRC-025 — Stanford HAI AI Index 2026, Chapter 1 highlights page

- **Institution/title:** Stanford HAI, *Research and Development | The 2026 AI Index Report*, a highlights web page dated 2026-04-13.
- **URL (manifest):** https://hai.stanford.edu/ai-index/2026-ai-index-report/research-and-development
- **Local source:** [Text capture](research/05-lit__stanford-hai-ai-index-2026-ch1-web-page.md); SHA-256 prefix `c7f9cf183a68`.
- **Access / authentication:** Supplied local text; hash matched manifest; origin not network-authenticated.
- **License / redistribution:** No licence statement found. Author decision 2026-11-28: usable as attributed input to this project. Short quotations with attribution and locators; the full text is not republished on Pages (`research/` stays excluded).
- **Observed:** Ten takeaways that repeat the chapter's headline numbers.
- **Limit:** Adds nothing beyond SRC-024; cite the chapter instead.
- **Feeds:** [L06](research/LITERATURE-TRANCHE-01.md#l06); no ledger claim.

<a id="src-026"></a>
## SRC-026 — Anthropic provable-inference research post (issuer research)

- **Authors/title:** Roy Rinberg, Alex Allain and collaborators, *Progress on provable inference for large language models* (Anthropic research post, 2026-11-02).
- **URL (manifest):** https://www.anthropic.com/research/provable-inference
- **Local source:** [Text capture](research/05-lit__anthropic-provable-inference-progress.md); SHA-256 prefix `c3d138e2b30e`.
- **Access / authentication:** Supplied local text; hash matched manifest; origin not network-authenticated.
- **License / redistribution:** No licence stated for the article text; the post says its code, Lean proofs and documentation are Apache 2.0. Author decision 2026-11-28: usable as attributed input to this project. Short quotations with attribution and locators; the full text is not republished on Pages (`research/` stays excluded).
- **Observed:** A vendor-measured prototype: zkSNARK proofs for Llama 4 Maverick at about 110 tokens/s on one H100, roughly 70–95 times vLLM GPU time, with stated limits (greedy integer model, MoE only, 1,024-token context).
- **Use:** A validity threat. Served-model identity through APIs or routers cannot be verified from outputs, so evaluations must record endpoint and identity status.
- **Limit:** Issuer research on its own prototype; primary only for those prototype results. Not independent, not Claude serving, and not evidence of Anthropic efficiency or cost.
- **Feeds:** [L07](research/LITERATURE-TRANCHE-01.md#l07); [proposed rubrics](research/WORKLOAD-RUBRICS.md) metadata; no ledger claim.

<a id="task-set-sources"></a>
## Task-set sources for the adopted rubric selections (indexed search, 2026-11-28)

These records support the [rubric selections](research/WORKLOAD-RUBRICS.md#selections), adopted by the author on 2026-11-28. They come from indexed web-search excerpts; direct retrieval still fails in this environment. None has been inspected in full. Confirm each against its origin before results from that task set are used.

<a id="src-027"></a>
## SRC-027 — OpenAI, "Why we no longer evaluate SWE-bench Verified"

- **URL:** https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/ (dated 2026-02-23 in the index)
- **Access:** Indexed excerpt only.
- **Observed:** OpenAI states that Verified is increasingly contaminated: all frontier models it tested reproduced gold patches or verbatim problem details for some tasks. It also states that an audit found flawed tests in many hard tasks, that it stopped reporting Verified scores, and that it recommends SWE-bench Pro.
- **Limit:** Vendor statement. The contamination probe used LLM elicitation and judges.
- **Feeds:** CL-052; rubric selections T12 and §0.2.

<a id="src-028"></a>
## SRC-028 — SWE-bench "Bash Only" configuration and public submissions

- **URLs:** https://github.com/SWE-bench/swe-bench.github.io/blob/master/data/posts/250820-mini-roulette.md; https://github.com/swe-bench/experiments; settings as described by a third-party explainer, https://codepress.dev/benchmarks/swe-bench-verified
- **Access:** Indexed excerpts only.
- **Observed:** The Bash Only view runs every model in mini-SWE-agent with bash as the only tool. The explainer gives a 250-step limit, a $3.00 cost limit and a 60-second command timeout. Submissions publish per-instance predictions, results and trajectories.
- **Limit:** The limits come from a third-party page; confirm them in the SWE-bench configuration.
- **Feeds:** CL-054; rubric selections §0.2 and T5.

<a id="src-029"></a>
## SRC-029 — Scale AI, SWE-Bench Pro leaderboard and dataset card

- **URLs:** https://labs.scale.com/leaderboard/swe_bench_pro (indexed 2026-11-28); https://huggingface.co/datasets/ScaleAI/SWE-bench_Pro; third-party explainer https://codepress.dev/benchmarks/swe-bench-pro
- **Access:** Indexed excerpts only.
- **Observed:**
  - The public set has 731 instances drawn from copyleft-licensed repositories. Held-out and commercial sets are not published.
  - The leaderboard runs most entries with a 250-turn limit and uncapped cost, and marks older 50-turn cost-capped runs separately.
  - The explainer says asterisked rows use mini-SWE-agent, and that vendor model cards report scores under other harnesses, including one far above the board's top.
- **Limit:** The dataset licence field was not found. The leaderboard's method page has not been inspected.
- **Feeds:** CL-053; rubric selections §0.1 and §0.2.

<a id="src-030"></a>
## SRC-030 — Sierra, τ²-bench

- **URLs:** https://github.com/sierra-research/tau2-bench; secondary summary https://aiwiki.ai/wiki/tau2-bench
- **Access:** Indexed excerpts only.
- **Observed:** Airline (50), retail (115) and telecom (114) tasks, scored on final database state and policy constraints, with pass^k reliability. The licence is MIT per the secondary summary. Leaderboard submissions report their user simulator; the submission guide recommends gpt-5.2.
- **Limit:** The licence and task counts come partly from a secondary page, and the repository's newer multilingual packs use different task frames. Pin a version tag before use.
- **Feeds:** Rubric selections §0.2 and T5.

<a id="src-031"></a>
## SRC-031 — Terminal-Bench 2.0

- **URLs:** https://github.com/harbor-framework/terminal-bench-2; leaderboard https://www.tbench.ai
- **Access:** Indexed excerpts only.
- **Observed:** Apache-2.0 tasks and harness; 89 tasks in release 2.0; run through the Harbor framework; audited leaderboard.
- **Limit:** Which leaderboard rows use the neutral Terminus 2 harness has not been confirmed.
- **Feeds:** Rubric selections §0.2.

## Remaining source streams

Provider/counterparty filings and contracts; official model/system cards, release notes and price histories; task-evaluation results; inference-runtime/hardware measurements; regional grid/utility planning, interconnection, emissions, water, permitting, and community submissions remain acquisition tasks, **not completed research**. The first pass above is an evidence-discovery seed.

Research availability does not grant redistribution permission. Cite and retain lawful locators; do not relicense third-party source text, weights, or assets under the repository's MIT license.
