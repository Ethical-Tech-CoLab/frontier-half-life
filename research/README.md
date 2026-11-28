# Filing intake 2026-11-27: source documents (text captures)

This folder holds text copies of the SEC filings and research papers listed in the project's source inventory, plus S-1/A Amendment No. 2 (added from EDGAR), gathered on 2026-11-27 for filing reconstruction ([PLAN.md §6.1, "Filing intake and remediation"](https://github.com/Ethical-Tech-CoLab/frontier-half-life/blob/main/PLAN.md#61-filing-intake-and-remediation)). [MANIFEST.csv](MANIFEST.csv) is the register for this intake: one row per document with its SHA-256 hash, size, official source, accession number, form, date, retrieval method and status, plus rows for documents that are still missing.

> **Status: unauthenticated text captures.** Each file is a complete text rendering of an official source, not a byte-for-byte original. Check passages against EDGAR or the publisher before relying on them (PLAN.md §6.1, step 2).

## File names

`<nn>-<form>-<filing date>__<document>.<ext>`: the part before `__` identifies the filing (what would be the folder in a nested layout); the part after it identifies the document.

| Prefix | Filing | Accession | Filed | Files here |
|---|---|---|---|---|
| `01-s1-2026-10-26` | Form S-1 (original registration statement) | 0001628280-26-067168 | 2026-10-26 | 35 |
| `02-s1a1-2026-11-02` | Form S-1/A, Amendment No. 1 | 0001628280-26-068676 | 2026-11-02 | 7 |
| `02b-s1a2-2026-11-10` | Form S-1/A, Amendment No. 2 (preliminary prospectus dated 2026-11-10) | 0001628280-26-072484 | 2026-11-10 | 12 |
| `03-s1a3-2026-11-17` | Form S-1/A, Amendment No. 3 (preliminary prospectus dated 2026-11-17) | 0001628280-26-074338 | 2026-11-17 | 1 |
| `04-424b4-2026-11-19` | Final prospectus, Rule 424(b)(4) | 0001628280-26-074944 | 2026-11-19 | 4 |
| `05-lit` | Research papers (arXiv, CC BY 4.0) | - | - | 4 |

`02b` was added in an update so that no file from the first version had to be renamed; it sorts between `02` and `03`, in filing-date order.

Document names within a filing:

- `primary-document-<EDGAR file name>`: the registration statement or prospectus itself
- `filing-index`: the EDGAR filing index (list of documents in the submission)
- `sec-header`: the SEC header of the complete submission file, included in place of the full submission
- `filing-fee-table`: the filing fee table (Exhibit 107.1; EDGAR document type EX-FILING FEES)
- `ex-NN-NN-<description>`: an exhibit, numbered with zero padding (EX-10.2 becomes `ex-10-02`) so exhibits sort in order
- `directory-listing`: the EDGAR directory listing for the 424B4 submission

Every document begins with a YAML header recording its source URL, publication time, retrieval date and retrieval method.

## Provenance and integrity

- **Sources:** the official URL for each file is in MANIFEST.csv (`source_url`). Where the source inventory listed a different URL, `inventory_url` keeps the original.
- **Method:** pages and PDFs were rendered to text in a web browser on 2026-11-27, using the Jina Reader service (r.jina.ai) for every document except the S-1/A No. 1 primary document (see Known limitations). Each file's YAML header states the method used.
- **Hashes:** `sha256` is computed on each file exactly as stored here. To check a file: `Get-FileHash <file> -Algorithm SHA256` (Windows PowerShell) or `shasum -a 256 <file>` (macOS/Linux).

## Known limitations

1. **S-1/A No. 1 primary document** (`02-s1a1-2026-11-02__primary-document-anthropicpbc-sx1ax1.txt`): the Markdown reader returned only the cover page, so the text was assembled from two renderings of the SEC-hosted document: the cover through prospectus page 340 from the W3C html2txt service, and the financial statements through the signature pages from page-by-page browser captures. The join point is marked in the file. In the second part a few lines may be duplicated or missing at page boundaries.
2. **Issuer prospectus:** the inventory's issuer link (ipo.anthropic.com/documents/us/prospectus.pdf) now redirects to investor.anthropic.com. The 2026-11-17 preliminary prospectus it pointed to was taken from its EDGAR filing, S-1/A Amendment No. 3 (`03-s1a3-...`). Only its primary document was retrieved.
3. **Complete submission files** were not retrieved (EDGAR lists the submissions at 224 MB for the S-1, 94 MB for S-1/A No. 1, 96 MB for S-1/A No. 2 and 94 MB for the 424B4); each filing's SEC header is included instead. A file over 100 MiB cannot be pushed to GitHub without Git LFS.
4. **arXiv ID:** 2606.1793 in the source inventory is corrected to 2606.17930.
5. **Layout:** tables, charts and images were converted to text; figures and some table structure are not preserved.

## Missing documents

| Form | Description | Accession | Date | Status |
|---|---|---|---|---|
| DRS | Draft Registration Statement | 0002130357-26-000005 | 2026-06-01 | Not retrieved; not in the source inventory |
| DRS/A | Draft Registration Statement | 0001628279-26-000861, 0001628279-26-000993, 0001628279-26-001111, 0002130357-26-000009, 0002130357-26-000014 | 2026-07-13 to 2026-10-09 | Not retrieved; not in the source inventory |
| FWP | Filing under Securities Act Rules 163/433 of free writing prospectuses | 0001628280-26-072949, 0001628280-26-072952, 0001628280-26-072953, 0001628280-26-073040, 0001628280-26-073045, 0001628280-26-074628, 0001628280-26-074937 | 2026-11-12 to 2026-11-19 | Not retrieved; not in the source inventory |
| 8-A12B | Registration of securities [Section 12(b)] | 0001628280-26-074342 | 2026-11-17 | Not retrieved; not in the source inventory |
| 3 | Initial statement of beneficial ownership of securities | 8 filings (see MANIFEST.csv) | 2026-11-18 | Not retrieved; not in the source inventory |
| CERT | Certification by an exchange approving securities for listing | 0001354457-26-001088 | 2026-11-18 | Not retrieved; not in the source inventory |
| S-1MEF | Registration adding securities to prior Form S-1 registration [Rule 462(b)] | 0001628280-26-074904 | 2026-11-18 | Not retrieved; not in the source inventory |
| EFFECT | Notice of Effectiveness | 9999999995-26-003574 | 2026-11-18 | Not retrieved; not in the source inventory |
| S-8 | Securities to be offered to employees in employee benefit plans | 0001628280-26-074931, 0001628280-26-074934 | 2026-11-19 | Not retrieved; not in the source inventory |
| 4 | Statement of changes in beneficial ownership of securities | 0001221820-26-000005, 0001997244-26-000005, 0002157947-26-000004, 0002158120-26-000003 | 2026-11-23 | Not retrieved; not in the source inventory |
| 8-K | Current report, items 1.01, 3.02, 3.03, 5.03, 7.01, 8.01, and 9.01 | 0001628280-26-075973 | 2026-11-25 | Not retrieved; not in the source inventory |

Each of these has its own row in MANIFEST.csv with a link to its EDGAR filing index.

## Held back pending a license check

PLAN.md §6.1 asks to confirm redistribution rights before committing full copies. These documents are listed in MANIFEST.csv with their hashes but are not in this folder:

| File | License information found |
|---|---|
| `05-lit__anthropic-provable-inference-progress.md` | No license stated for the article text; the post says its code, Lean proofs and documentation are released under Apache 2.0 |
| `05-lit__stanford-hai-ai-index-2026-ch1-full-chapter.md` | arXiv lists the full AI Index Report 2026 (arXiv:2606.15708) under CC BY-NC-ND 4.0; this copy is a text conversion of the chapter |
| `05-lit__stanford-hai-ai-index-2026-ch1-web-page.md` | No license statement found on the captured web page |

## Attribution: arXiv papers (CC BY 4.0)

- Grogan, J. J. "The End of the Foundation Model Era: Open-Weight Models, Sovereign AI, and Inference as Infrastructure." arXiv:2604.06217. Licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). File: `05-lit__arxiv-2604.06217-end-of-the-foundation-model-era.md`.
- McFadyen, J., Jorgensen, O., Coppock, H., Wei, K., and Ududec, C. "How Inference Compute Shapes Frontier LLM Evaluation." arXiv:2606.17930. Licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). File: `05-lit__arxiv-2606.17930-inference-compute-and-frontier-evaluation.md`.
- Matsuoka, S. "Memory Scarcity, Open Models, and the Restructuring of the AI Industry, 2026-2030 -- A quantitative scenario analysis of inference economics, training-cost divergence, and infrastructure solvency." arXiv:2607.07207. Licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). File: `05-lit__arxiv-2607.07207-memory-scarcity-open-models-ai-industry.md`.
- Laber, M., Shafi, Z., Savcisens, G., Klein, B., Chinazzi, M., Scarpino, S. V., Barabási, A.-L., Vespignani, A., and Eliassi-Rad, T. "Scaling of Capability and Efficiency at Inference Time in Large Reasoning Models." arXiv:2609.27166. Licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). File: `05-lit__arxiv-2609.27166-scaling-capability-and-efficiency.md`.

Changes made to each paper: converted to Markdown text by an automated reader; a metadata header and a title/abstract block were added above the paper text; figures and some table layout are not preserved.

## Change log

- 2026-11-27: first version (51 documents).
- 2026-11-27, update: added S-1/A Amendment No. 2 (filed 2026-11-10; accession 0001628280-26-072484) as group `02b`: the primary document, filing index, SEC header, filing fee table and 8 exhibits (12 files). Corrected the `note` line in `01-s1-2026-10-26__filing-index.md`: the index page lists 79 files, while EDGAR counts 87 documents in the submission. Updated this README and MANIFEST.csv.
