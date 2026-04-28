# Asset Pipeline Dry Run

This folder contains the local-only asset pipeline scaffold for Color Atlas.

For this phase, the pipeline does not generate previews or PDFs. It validates the
static catalogue manifest and prints the files that a later pipeline should
produce.

Run:

```powershell
npm run pipeline:dry-run
```

Current checks:

- catalogue relationships are valid
- slugs and filenames are lowercase, ASCII, and hyphenated
- preview paths use `/assets/previews/.../*.webp`
- PDF paths use `/downloads/.../*.pdf`
- individual printable pages default to `noindex`
- thin printable pages canonicalize to their topic page
- blocked franchise/trademark terms are not present in starter content

Future phases can add real generation steps with Pillow, PyYAML,
python-slugify, img2pdf or reportlab, and imagehash. Those dependencies are not
required for the dry run.
