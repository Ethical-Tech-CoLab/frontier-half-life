# Source register and evidence-access record — v0.4

**Initial author:** yorkerhodes3. **Research cutoff / access check:** 2026-11-27.
**Status:** Discovery and access triage, not a completed literature review or authenticated financial dataset.

**2026-11-28 intake update:** All requested text captures for the selected filing sequence are received: original S-1, three amendments, final prospectus, November 25 8-K and the requested exhibits/indices. All 80 present manifest-listed files match their recorded hashes and sizes. See [the intake review](research/FILING-INTAKE-REVIEW.md). Original PDFs are not required; the author directed use of the extracted text. Claim-level reconciliation and review remain pending.

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
- **Next:** Authenticate full submission, issuer, dates, and exhibits; establish which metrics/commitments change in amendments. Metadata alone does not substantiate amounts.
- **Feeds:** CL-001–CL-005, CL-012; paper P02/P03/P06.

<a id="src-002"></a>
## SRC-002 — Anthropic S-1/A candidate

- **Candidate:** 2026-11-02; accession `0001628280-26-068676`.
- **Primary document:** https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/anthropicpbc-sx1ax1.htm
- **Indexed official index:** https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/0001628280-26-068676-index.htm
- **Observed:** Search returned issuer/form/date and the named main document; searches for the amounts did not expose financial-table passages. Direct retrieval failed DNS.
- **Received text:** [Amendment 1](research/02-s1a1-2026-11-02__primary-document-anthropicpbc-sx1ax1.txt), index, header and revised exhibits; [join-check note](research/02-s1a1-2026-11-02__join-check-note.md) documents word-level continuity checks, not numeric alignment.
- **Next:** Verify the revenue periods, compute/infrastructure definition, short-term cost narrative, discount treatment, aggregate commitments, contingencies, and overlaps.
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
- **Status:** Hash/size inventory complete; claim extraction and reconciliation pending.

<a id="src-015"></a>
## SRC-015 — Amendment No. 3, received text and new exhibits

- **Accession / filing date:** `0001628280-26-074338`, 2026-11-17.
- **Local source:** [Primary](research/03-s1a3-2026-11-17__primary-document-anthropicpbc-sx1ax3.md), [index](research/03-s1a3-2026-11-17__filing-index.md), SEC header, underwriting form 1.1 and consents 23.1/23.2.
- **Use:** Compare the later offering/underwriting terms with Amendment 2 and the final prospectus.
- **Status:** All indexed primary/text exhibits present and hash/size matched; no assumption that financial tables are unchanged.

<a id="src-016"></a>
## SRC-016 — Final prospectus, received text

- **Accession / filed date:** `0001628280-26-074944`, 2026-11-19; prospectus dated 2026-11-18.
- **Local source:** [Final 424B4](research/04-424b4-2026-11-19__primary-document-anthropicpbc-424b4.md), index, header and directory listing.
- **Use:** Final registration/prospectus reconciliation, separate from later IPO-close events.
- **Status:** Received text with recorded provenance; individual claims require unit/period/passage checks, not PDF retrieval.

<a id="src-017"></a>
## SRC-017 — November 25 8-K, received primary and complete submission

- **Accession / filed date:** `0001628280-26-075973`, 2026-11-25; earliest reported event 2026-11-19.
- **Local sources:** [Primary](research/04b-8k-2026-11-25__primary-document-ant-20261119.md), [index](research/04b-8k-2026-11-25__filing-index.md), complete submission and five exhibits.
- **Inspected scope:** Items 1.01/3.02/3.03/5.03/7.01/8.01/9.01 concern closing agreements, placement/rights, governance, disclosure channels and IPO completion. Separate filed material from Item 7.01's furnished disclosures.
- **Use:** Financing/governance reconciliation in P02/P06; not a new historical compute-efficiency series.
- **Status:** Text/exhibit coverage and manifest integrity checked. No monetary claim or financing ratio has been promoted to verified by this intake pass.

## Remaining source streams

Provider/counterparty filings and contracts; official model/system cards, release notes and price histories; task-evaluation results; inference-runtime/hardware measurements; regional grid/utility planning, interconnection, emissions, water, permitting, and community submissions remain acquisition tasks, **not completed research**. The first pass above is an evidence-discovery seed.

Research availability does not grant redistribution permission. Cite and retain lawful locators; do not relicense third-party source text, weights, or assets under the repository's MIT license.
