# ffx-0.4 — filing-fact extraction set (rubric 0.4.0)

| Field | Value |
| --- | --- |
| Built by | `node tools/build-ffx.mjs` (deterministic, offline; `--check` fails if stale) |
| Initial author / coordinator | yorkerhodes3 |
| Status | **Gold pending the financial reviewer's check.** Not frozen; no model has been run |
| Sources | Author-attested filing captures (S-1, Amendments 1–3, final prospectus) and the [W1 extraction](../../data/extracted/w1-filing-facts.csv) |
| Instances | 90 (59 fact passages, 31 null-gold distractors); 180 fields, 69 with null gold |
| Equivalence margin | δ = 8 points for 90 instances (T1) |
| Files | [instances.jsonl](instances.jsonl) (passage, schema, gold per line) |

## Composition and rules

- **Fact passages:** one per distinct W1 passage. Unchanged passages repeated across filing versions count once; a version change, such as $895.4B to $900.9B, is a separate instance. Passages are line windows around the W1 locator (tables include 30 preceding lines so headers are visible). Gold values come from the W1 extraction; versions that leave an amount blank carry null gold, which tests abstention.
- **Null-gold distractors:** final-prospectus passages that mention the same topic (for example "Lambda" or "short-term commitments") but contain none of the fact's gold values. Every field's gold is null, so any value a model returns is a hallucinated field.
- **Excluded:** free-text facts (CI-DEF, CI-DEF-2026, CE-DEF, ST-COST, C-LAMBDA-STATUS, C-FLUIDSTACK, CHIP-FAMILIES), whose gold strings are paraphrases; Amendment 1 table cells, whose alignment is unverified; 0 passages whose gold value could not be found in the window (listed below).
- **Scoring (rubric §3, T6):** numbers compared at the gold value's stated precision in the stated unit; months as `YYYY-MM`; success requires every field correct, including nulls.

## Known limitations

- About 90 instances, below the 150 proposed in rubric §0.2, because exhibit records were not added: their only gold source is the filing index, which paraphrases titles. The margin is wider as a result.
- Gold for fact passages comes from this project's own patterns; distractor nulls rely on a keyword and value-string check. Both need the financial reviewer's check before the set is frozen.
- Single domain (one issuer's 2026 registration sequence).

## Review checklist for the financial reviewer

1. Spot-check fact passages: does each gold value match the passage, with the right unit and period?
2. Check every null-distractor passage: does it truly not state the field?
3. Approve, or list instance IDs to fix or remove. The set is then frozen as `ffx-0.4` with a checksum.
