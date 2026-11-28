---
title: "S-1/A No. 1 assembled text: join and page-boundary check"
publisher_or_filer: "Compiled for this intake"
date: "11/27/2026"
accession_or_identifier: "0001628280-26-068676"
form_or_exhibit: "Verification note"
retrieved_on: "2026-11-27"
retrieval_method: "Word-by-word comparison by script of the assembled text with the captured text of S-1/A No. 2 and the S-1"
---
# S-1/A Amendment No. 1: check of the assembled text

- **File checked:** `02-s1a1-2026-11-02__primary-document-anthropicpbc-sx1ax1.txt` (SHA-256 `ab13b010db1c27d4be6ebf134f1a82c659c34347b4fc7dcd63664cc641144f41`)
- **Checked:** 2026-11-27
- **Why:** this file joins two renderings of the SEC-hosted document after prospectus page 340: the W3C html2txt rendering (cover through page 340) and page-by-page browser captures (the rest, from the financial statements through the signature pages). The intake README warned that lines might be duplicated or missing at page boundaries in the second part.

## Method

Amendment No. 1's own HTML is a single 14 MB line and could not be read whole through the browser, so the second part was cross-checked against independent captures of the neighbouring filings instead: S-1/A Amendment No. 2 (filed 2026-11-10; `02b-s1a2-2026-11-10__primary-document-anthropicpbc-sx1ax2.md`) and the original S-1 (filed 2026-10-26; `01-s1-2026-10-26__primary-document-anthropicpbc-sx1.md`).

- Everything after the join was compared word by word, in order, with the same section of Amendment No. 2 (from the sentence that ends part one to the end of the document).
- Numbers, table punctuation, page numbers, running headers and "Table of Contents" links were ignored, so the comparison is about the words.
- Text missing from Amendment No. 1 would appear as a passage that Amendment No. 2 **and** the S-1 both contain. A duplicated passage would appear as text that only Amendment No. 1 contains.

## Results

| Check | Result |
|---|---|
| Join | Continuous. In Amendment No. 2 the sentence that ends part one is followed directly by the sentence that begins part two ("As a result of this offering, we will become subject to the information and reporting requirements of the Exchange Act and, in accordance therewith, will file periodic reports, proxy statements, and other information with the SEC"), as in this file. |
| Words in part two | 31,103 words; 31,071 (99.90%) match Amendment No. 2 in sequence. |
| Passages missing from this file | None found. |
| Duplicated passages | None found. The only wording found here but not in Amendment No. 2 is "to be filed by amendment" (twice, as in the S-1; Amendment No. 2 gives the figures) and the exhibit-table header "Exhibit Number Description", which Amendment No. 2 places differently. |
| Other differences | 7 passages of 6 or more words appear in Amendment No. 2 but in neither this file nor the S-1, so they are revisions made in Amendment No. 2 (listed below). The 98 differences of 1 to 5 words are page numbers and running headers, wording edits in Amendment No. 2, and split words such as "g rant" for "grant"; none is a missing sentence or line. |

## Revisions in Amendment No. 2 (not capture gaps)

| # | Words | Start of the passage (lower-cased; numbers and punctuation removed) |
|---|---|---|
| 1 | 44 | liabilities in certain instances these consolidated vies have variable interests in the non consolidated lessor vies described below as of september unaudited this includes all of the operating ... |
| 2 | 106 | judgment is required to identify the activities that most significantly impact the economic performance of these vies based on their purpose and design this judgment includes but is ... |
| 3 | 28 | including the non execution of the definitive lease agreement or the developers failure to obtain construction financing these arrangements generally have remaining terms of less than one year |
| 4 | 57 | in the company also guaranteed the payment obligations of a data center provider under a power purchase contract the company would be required to pay upon a written ... |
| 5 | 204 | on november the company's board of directors modified the service based vesting condition applicable to approximately million rsus that would otherwise have satisfied such condition on november pursuant ... |
| 6 | 74 | we have also agreed to enter into indemnification agreements with the founder llc and the ltbt providing for indemnification to the fullest extent permitted by law of those ... |
| 7 | 26 | class n common stock purchase agreement by and between the registrant and google llc dated as of november form of class n common stock purchase agreement |

## Limits

This is a cross-check against neighbouring filings, not a comparison with Amendment No. 1's own HTML. Part one (cover through page 340) was not part of this check. To compare against the original byte for byte, add the original with the workflow described in the intake README.
