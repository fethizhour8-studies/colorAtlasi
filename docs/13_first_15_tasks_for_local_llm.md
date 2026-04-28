# 13 - First 15 Tasks For The Local LLM

Use these in order.

## Task 1: Read Context

```txt
Read project_context.md and docs/01_decisions_and_non_negotiables.md.
Do not code.
Summarize the final architecture, stack, UX rules, and forbidden MVP features.
```

## Task 2: Inspect Current Project

```txt
Read project_context.md.
Inspect the current directory.
Report existing files and folders.
Do not modify anything.
Then state whether Phase 0 correction is needed.
```

## Task 3: Correct UX Direction

```txt
Read project_context.md and docs/02_phase_0_correct_current_direction.md.
Implement Task 0.1, 0.2, and 0.3 only:
- remove multilingual UI
- remove visible full-pack download CTAs
- remove lightbox/modal assumptions
Before coding, list files to edit.
After coding, provide verification.
```

## Task 4: Redesign Homepage Catalogue

```txt
Read project_context.md and docs/02_phase_0_correct_current_direction.md.
Implement Task 0.4 only.
Make homepage a printable catalogue, not a SaaS landing page.
No extra features.
```

## Task 5: Strengthen Printable Cards

```txt
Read project_context.md and docs/05_phase_3_design_system_and_cards.md.
Implement PrintableCard improvements only.
Cards need colored frame, white paper, border, shadow, title, badges, Download PDF button.
No modal.
No full-pack action.
```

## Task 6: Grid-First Topic Page

```txt
Read project_context.md and docs/02_phase_0_correct_current_direction.md.
Implement Task 0.6 only.
Topic page must show printables early in a large 2-column desktop grid.
Individual downloads only.
```

## Task 7: Update Docs After Corrections

```txt
Read project_context.md and docs/02_phase_0_correct_current_direction.md.
Update docs only to reflect corrected UX:
- no full-pack at MVP
- no lightboxes
- no multilingual UI
- grid-first collection pages
- Python pipeline
Do not edit code.
```

## Task 8: Verify Foundation

```txt
Read project_context.md and docs/03_phase_1_foundation.md.
Run npm install and npm run build in site/.
Fix only build errors.
Do not change architecture.
```

## Task 9: Restructure Content Model

```txt
Read project_context.md and docs/04_phase_2_content_model_ia.md.
Restructure starter data to:
content type -> hub/subcategory -> topic/collection -> optional individual printable.
Use safe original examples only.
```

## Task 10: Add URL Helpers

```txt
Read docs/04_phase_2_content_model_ia.md.
Create URL helper functions for content types, hubs, topics, and printables.
Use helpers in pages where practical.
```

## Task 11: Add Indexing Helpers

```txt
Read docs/04_phase_2_content_model_ia.md and docs/08_phase_6_seo_geo.md.
Add robots/canonical helpers.
Individual printables default to noindex unless marked indexable.
```

## Task 12: Add Component Polish

```txt
Read docs/05_phase_3_design_system_and_cards.md.
Implement or refine:
- CollectionCard
- PrintableGrid
- QuickFacts
- FilterChips
- TrustStrip
No new features.
```

## Task 13: Add Legal Pages

```txt
Read project_context.md and docs/06_phase_4_page_templates.md.
Create starter legal/trust pages:
About, Contact, Privacy, Terms, Licensing, DMCA, How to Print, AI-Assisted Policy.
No backend forms.
```

## Task 14: Python Pipeline Dry Run

```txt
Read project_context.md and docs/07_phase_5_python_asset_pipeline.md.
Create Python pipeline skeleton with dry-run only.
Do not generate files yet.
```

## Task 15: Create Sample Batch

```txt
Read docs/07_phase_5_python_asset_pipeline.md.
Create a sample manifest and sample folder structure.
Dry-run should show planned outputs.
Do not process real images yet.
```
