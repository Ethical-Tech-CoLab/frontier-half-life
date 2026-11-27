# Frontier AI source documents - retrieved 2026-11-27

Complete text for 50 of the 53 sources in your inventory (one through a replacement source), SEC headers in place of
the 3 oversized complete-submission files, and one added source (the full AI Index chapter). The updated inventory
(`Frontier AI efficiency SEC filing source inventory - updated.csv`) maps every row to its local file,
retrieval status, method and notes. Every document starts with a header block giving its source URL,
filing details and how it was captured.

## Folders
| Folder | Contents |
|---|---|
| 01 SEC S-1 - 2026-10-26 (0001628280-26-067168) | Primary document, filing index, SEC header, 32 exhibits |
| 02 SEC S-1A Amendment No. 1 - 2026-11-02 (0001628280-26-068676) | Amended registration statement, filing index, SEC header, 4 revised exhibits |
| 03 SEC 424B4 Final Prospectus - 2026-11-19 (0001628280-26-074944) | Final prospectus, filing index, SEC header, directory listing |
| 04 Issuer Prospectus dated 2026-11-17 (SEC S-1A Amendment No. 3) | The Nov 17 preliminary prospectus (replaces the dead issuer PDF link) |
| 05 Research Papers and Industry Reports | 4 arXiv papers, Anthropic research article, Stanford AI Index page and full chapter |

## What to know
- **Format.** Documents are complete text in Markdown (one plain-text file), not the original HTML/PDF bytes. Tables appear as text rows; graphics are linked to their SEC URLs rather than embedded.
- **Complete submission .txt files (3 rows).** At 224 MB, 95 MB and 94 MB, these are mostly encoded images and could not be captured. Each filing's SEC header is provided instead, and every text document inside those submissions is provided individually.
- **Issuer prospectus PDF.** `ipo.anthropic.com/documents/us/prospectus.pdf` now redirects to the investor-relations home page. The same Nov 17 preliminary prospectus is on EDGAR as S-1/A Amendment No. 3 (0001628280-26-074338) and is provided in full. For page layout and charts, the investor-relations site hosts PDFs: Amendment No. 3 at https://d18rn0p25nwr6d.cloudfront.net/CIK-0002130357/a29b8637-f99d-4119-a00f-536f4b69d99a.pdf and the final 424B4 at https://investor.anthropic.com/files/doc_downloads/Anthropic-PBC-424B4.pdf
- **S-1/A Amendment No. 1.** The converters could not handle this filing in one pass, so its text was assembled from two renderings of the same SEC document; the join point is marked in the file.
- **Corrected identifier.** arXiv 2606.1793 is 2606.17930 (trailing zero dropped in the original sheet).
- **Not in your inventory.** EDGAR also shows S-1/A Amendment No. 2 (Nov 10), free writing prospectuses, an S-1MEF and S-8s; Amendment No. 2 is listed in the updated inventory as identified but not retrieved.
