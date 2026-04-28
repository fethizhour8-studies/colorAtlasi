# 07 - Phase 5: Python Asset Pipeline

## Goal

Build a local Python CLI pipeline that processes AI-generated/source images into:
- clean print-ready PDFs
- branded preview images
- thumbnails
- social images
- metadata records
- processing reports

The pipeline is separate from Astro.

Do not run it inside the public website.

## Python Stack

Use:
- Python 3.11+
- Pillow
- PyYAML
- python-slugify
- pydantic or dataclasses
- img2pdf or reportlab
- imagehash later
- filetype or python-magic where available
- optional exiftool for metadata stripping

## Folder Structure

```txt
pipeline/
  requirements.txt
  process_batch.py
  validate_manifest.py
  validate_image.py
  make_preview.py
  make_pdf.py
  write_metadata.py
  report.py
  utils/
    slug.py
    safe_filename.py
    paths.py
    image_quality.py

incoming/
  batch-YYYY-MM-DD-topic/
    manifest.yaml
    source/
      image1.png
      image2.jpg

archive/
  processed-batches/

site/public/
  assets/
    previews/
    thumbs/
    social/
    covers/
  downloads/
    coloring-pages/
    printables/
    calendars/
```

## Manifest Example

```yaml
batchId: batch_2026_04_27_wizard_school
defaultContentType: coloring-pages
defaultHub: kids
defaultTopic: wizard-school-coloring-pages
defaultAudience:
  - kids
  - parents
  - teachers
defaultDifficulty: easy
defaultLicense: free-personal-classroom-use

items:
  - source: magic owl.png
    title: Magic Owl Coloring Page
    type: coloring_page
    tags: [wizard, owl, fantasy, easy]
    topic: wizard-school-coloring-pages

  - source: potion class.jpeg
    title: Potion Class Coloring Page
    type: coloring_page
    tags: [wizard, potion, classroom, fantasy]
    topic: wizard-school-coloring-pages
```

## Pipeline Steps

1. Read manifest.
2. Validate manifest.
3. Validate source files exist.
4. Validate file type by content, not extension only when possible.
5. Normalize unsafe filenames.
6. Strip EXIF/metadata.
7. Validate dimensions/aspect ratio.
8. Detect duplicates by file hash.
9. Optional later: perceptual hash.
10. Convert/normalize image.
11. Generate PDF.
12. Generate branded preview.
13. Generate thumbnail.
14. Generate social image.
15. Write/update metadata.
16. Write processing report.
17. Archive originals.
18. Support dry run.

## Dry Run

Required first.

Command example:
```bash
python pipeline/process_batch.py incoming/batch-2026-04-27-wizard-school --dry-run
```

Dry run should show:
- source file
- safe slug
- output PDF path
- preview path
- thumbnail path
- metadata file path
- warnings/errors

## Image Dimensions

US Letter portrait:
- 2550 x 3300 px

US Letter landscape:
- 3300 x 2550 px

A4 later:
- portrait 2480 x 3508 px
- landscape 3508 x 2480 px

## Preview Generation

Individual preview:
- soft colored background/frame
- centered white paper sheet
- border
- shadow
- tiny brand/footer if appropriate
- readable artwork

PDF:
- clean white page
- no heavy watermark
- optional tiny footer only

## Task 5.1: Python Pipeline Skeleton

Create files and requirements.
Implement dry-run only.

## Task 5.2: Manifest Validation

Validate schema and missing fields.

## Task 5.3: Image Validation

Validate source files and image properties.

## Task 5.4: Preview Generation

Generate branded previews and thumbnails.

## Task 5.5: PDF Generation

Generate print-ready PDFs.

## Task 5.6: Metadata Writing

Update content JSON safely.

## Task 5.7: Processing Reports

Write reports for every batch.

## Phase 5 Done Criteria

- dry-run works
- sample batch processes
- preview looks good
- PDF opens and prints correctly
- metadata is written
- source files archived
