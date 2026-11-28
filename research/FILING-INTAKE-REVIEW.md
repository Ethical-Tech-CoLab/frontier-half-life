# Filing intake and text-based review — v0.4

**Initial author:** yorkerhodes3

**Inventory checked:** 2026-11-28

**Evidence cutoff:** 2026-11-27, unchanged

**Status:** Requested text intake complete for the selected public filing sequence. Claim-level reconstruction is drafted in [W1-FILING-RECONSTRUCTION.md](W1-FILING-RECONSTRUCTION.md); origin authentication and financial review remain pending.

**Author direction, 2026-11-28:** Use the extracted text already provided and skip original PDFs. There is no outstanding PDF/HTML retrieval prerequisite for this phase. Preserve the extraction limitations rather than treating conversion as lossless.

## Received

The uploaded package is on `main` and has been synced into the working checkout. It includes the five primary filing text captures required for the public registration/prospectus sequence:

| Filing | Date | Accession | Local primary capture |
| --- | --- | --- | --- |
| Original S-1 | 2026-10-26 | 0001628280-26-067168 | [Original](01-s1-2026-10-26__primary-document-anthropicpbc-sx1.md) |
| S-1/A No. 1 | 2026-11-02 | 0001628280-26-068676 | [Amendment 1](02-s1a1-2026-11-02__primary-document-anthropicpbc-sx1ax1.txt) |
| S-1/A No. 2 | 2026-11-10 | 0001628280-26-072484 | [Amendment 2](02b-s1a2-2026-11-10__primary-document-anthropicpbc-sx1ax2.md) |
| S-1/A No. 3 | 2026-11-17 | 0001628280-26-074338 | [Amendment 3](03-s1a3-2026-11-17__primary-document-anthropicpbc-sx1ax3.md) |
| Final 424B4 | Filed 2026-11-19; prospectus dated 2026-11-18 | 0001628280-26-074944 | [Final prospectus](04-424b4-2026-11-19__primary-document-anthropicpbc-424b4.md) |

The November 25 8-K, its filing index, five text exhibits and complete submission are also present under `04b-8k-2026-11-25` (accession `0001628280-26-075973`). Amendment 3 now has its index, SEC header and newly filed exhibits 1.1, 23.1 and 23.2. The captured indices for these two groups have no missing primary or text-exhibit links.

Numerous original and revised exhibits are present, including AWS financing, Broadcom/Google note agreements, the credit agreement, Broadcom equipment lease and Amendment 2's Class N purchase agreements.

All **80 manifest-listed document files present on disk** match their recorded SHA-256 hashes and byte sizes. This establishes consistency with the supplied manifest, **not** independent authenticity against SEC-hosted originals or lossless conversion. The manifest describes the 8-K complete submission as a byte-exact original; this check confirms the supplied bytes/hash, not an independent network download.

The primary captures begin with provenance headers and filing cover text. The registration captures reach signature pages; the final prospectus reaches the financial notes/back cover. This boundary check does not prove every page, table, or image survived conversion.

## Previously requested gaps — closed

### November 25 current report and exhibits — received

The [8-K primary capture](04b-8k-2026-11-25__primary-document-ant-20261119.md), [index](04b-8k-2026-11-25__filing-index.md), complete submission, and all five listed text exhibits are present. The report is within the evidence cutoff.

The primary text has been inspected at the item level. It covers IPO-closing agreements (Item 1.01), private-placement securities (3.02), security-holder rights (3.03), certificate/bylaw changes (5.03), disclosure channels (7.01), IPO closing (8.01), and exhibits (9.01). It is relevant to financing/governance reconciliation; it does not independently establish the historical compute-efficiency ratios. Reconcile company versus selling-stockholder proceeds before using financing totals. No new monetary claim is promoted to verified by this intake check.

### Amendment No. 3 index, header and newly filed exhibits — received

The [filing index](03-s1a3-2026-11-17__filing-index.md) and [SEC header](03-s1a3-2026-11-17__sec-header.md) are present, along with:

- [Exhibit 1.1 — Form of Underwriting Agreement](03-s1a3-2026-11-17__ex-01-01-form-of-underwriting-agreement.md).
- [Exhibit 23.1 — Grant Thornton consent](03-s1a3-2026-11-17__ex-23-01-consent-grant-thornton.md).
- [Exhibit 23.2 — Ernst & Young consent](03-s1a3-2026-11-17__ex-23-02-consent-ernst-and-young.md).

The later underwriting form can now be compared with Amendment 2's version. Previously filed exhibits are retained in their original groups; do not double-count incorporated material.

### Original-layout retrieval — waived; text-check limitations retained

No original PDF inspection or further original-layout retrieval is required by the author. The PDF already uploaded is left untouched and is not part of this text-based audit.

The [Amendment 1 join-check note](02-s1a1-2026-11-02__join-check-note.md) reports continuous wording and no missing/duplicated passages in the checked second part against neighboring filings. It explicitly ignores numbers, table punctuation and page headers. It does **not** validate numeric table alignment or prove that revised financial disclosures are identical.

For each consequential number, retain text line/page/table locators, check headings/units and reconcile across the supplied captures. If a specific cell remains ambiguous, mark that value unresolved; do not restore a blanket PDF blocker or silently infer alignment.

## Lower-priority or conditional retrievals

- **Original S-1 filing-fee table:** Its captured filing index references `exfilingfees-s1.htm` and `exfilingfees-s1_htm.xml`; neither is present. Amendment 2's fee table is present. The original fee record is useful for a complete registration history but is not a blocker for task-efficiency or energy research.
- **S-1MEF and relevant free-writing prospectuses:** Listed as missing in the manifest. Acquire if the 8-K/final-offering reconciliation or claims about offering proceeds, pricing or share counts require them.
- **DRS/DRS amendments:** Useful for an earlier draft-history study, not necessary to begin the selected public S-1-to-final reconciliation.
- **Forms 3/4, S-8, exchange registration/certification and effectiveness records:** Not required now for the core efficiency/rebound study unless a specific claim depends on them.
- **Huge complete-submission text archives, image-only marketing pages and XML fee duplicates:** Not required for this phase. Document any claim-specific extraction gap rather than request these indiscriminately.

The exhibit index also discloses redacted terms and omitted schedules under Regulation S-K. Those are limits of public evidence, not necessarily failed retrievals. Do not ask the author to obtain nonpublic confidential terms.

## Inventory discrepancies, not missing research requests

- `README - retrieval notes.md` predates the Amendment 2 update and still says it was not retrieved. Amendment 2 is now present.
- `README.md` and `MANIFEST.csv` say three literature captures were held back for license checks, but the Anthropic inference article and two Stanford AI Index captures are actually present. Their hashes match. **Resolved 2026-11-28 by author decision:** they may be used as attributed input to this project ([decisions](../SOURCES.md#author-decisions-2026-11-28)). Use does not convert their terms to MIT, and their full text is not republished on Pages.
- Source register, backlog and paper are updated to received-text status. This does **not** supersede pending claim reconciliation or research-review requirements.

## Work that can proceed

The six primary filing texts and exhibits are sufficient to begin source-located extraction and revision comparison. Follow [PLAN §6.1](../PLAN.md#61-filing-intake-and-remediation) and [BACKLOG T-010–T-014](../BACKLOG.md#next-evidence-reconstruction).

Keep the claim ledger's financial values unverified until their exact passages, definitions, period boundaries and text-conversion accuracy are reconciled. The selected intake is complete, not the full universe of SEC filings or scientific analysis. This review changes no supplied source files, initial research claims, evidence cutoff or full specification/plan approval verdicts.
