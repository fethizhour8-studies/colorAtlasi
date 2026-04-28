# Launch SEO, GEO, Analytics, and Branding Plan

## Launch positioning

Coloring Atlas should launch as a clean, trustworthy library of original printable PDFs for parents, teachers, kids, and adults. The strongest early positioning is not to compete on copyrighted characters. Compete on safe, useful, fast-loading, printable pages with clear topical organization.

## SEO priorities

### Safe first-wave clusters

Use the keyword workbook and `docs/keyword-opportunities.md` to prioritize:

1. coloring pages
2. free coloring pages
3. coloring sheets
4. coloring pages for kids
5. cute coloring pages
6. dinosaur coloring pages
7. animal coloring pages
8. mandala coloring pages
9. adult coloring pages
10. relaxing coloring pages
11. seasonal coloring pages
12. 2026 printable calendars

### Blocked or high-risk keyword types

Do not generate or publish pages targeting:

- copyrighted characters
- movie, TV, game, anime, or toy franchises
- brand names and mascots
- celebrities
- terms where the expected intent is a recognizable protected character or logo

### Page template requirements

Every indexable hub or topic should include:

- one focused H1
- short intro that matches search intent
- download gallery with PDF cards
- related topics section
- printing tips
- usage ideas for parents/teachers/adults
- FAQ section where useful
- internal links to hub, topic, and printable pages
- descriptive alt text for previews
- canonical URL
- structured data where applicable

## GEO plan

For AI answers and search generative experiences, pages should be direct, descriptive, and entity-rich.

Add consistent sections:

- What is included
- Best for
- How to print
- Suggested activities
- Related printable pages
- License summary

Use concise factual descriptions instead of thin keyword stuffing. Repeat the exact topic naturally in the first paragraph, title, meta description, and nearby internal links.

## Multilingual future plan

Keep English as the launch locale. Prepare data and routes so more languages can be added without restructuring.

Recommended route structure:

- `/en/` for English
- `/fr/` for French
- `/es/` for Spanish
- `/pt/` for Portuguese
- `/de/` for German

Implementation notes:

- Keep IDs stable and language-neutral.
- Localize display titles, descriptions, intros, FAQs, and slugs later.
- Do not duplicate binary PDF assets until a locale has enough demand.
- Add `hreflang` only after translated pages are live and equivalent.
- Start translation with hubs and high-volume topic pages before individual printable detail pages.

## Analytics and tracking

The project supports optional Plausible analytics through environment variables. Use the file-download/outbound-link script variant so PDF downloads can be tracked.

Set:

```bash
PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com
PUBLIC_PLAUSIBLE_SRC=https://plausible.io/js/script.file-downloads.outbound-links.js
```

Track launch KPIs:

- page views by hub
- PDF downloads by file
- top internal search/referrer pages if available
- outbound clicks
- 404s from hosting logs
- build failures
- large asset regressions

Do not collect personal data unless there is a clear legal basis and privacy policy update.

## Security and operational checks

Before launch:

- rotate any API key that was pasted into chat or logs
- store `GEMINI_API_KEY` only in local shell or CI secrets
- keep `.env` and generated images ignored
- run production validation
- verify generated security headers
- keep AdSense disabled until CMP, privacy policy, and publisher values are final
- use HTTPS-only hosting
- submit sitemap only after canonical domain is set

## Branding direction

Current name: Coloring Atlas.

Brand idea: a warm, organized printable map/library. Keep visual design friendly, clear, and classroom-safe.

Suggested tagline options:

- Print-friendly coloring pages for every little adventure.
- Original coloring pages, organized for easy printing.
- Free printable coloring pages for kids, classrooms, and calm moments.
- A simple atlas of printable coloring pages and activity sheets.

Suggested domain ideas to check manually:

- ColoringAtlas.com
- ColoringAtlas.co
- GetColoringPages.com
- PrintColoring.com
- PrintableColoring.co
- ColoringPagesLibrary.com
- EasyColoringPages.com
- FreeColoringAtlas.com
- AtlasColoring.com
- ColorPagePrints.com

Best fit if available: `ColoringAtlas.com`. It matches the brand, is memorable, and leaves room for calendars, worksheets, and future printable categories.

## Design/card suggestions

Add gradually after launch:

- topic cards with audience chips: Kids, Teachers, Adults
- difficulty chips: Easy, Medium, Detailed
- format chips: PDF, US Letter, A4 future
- seasonal ribbons for holiday collections
- download count or popular badge only after analytics data is real
- related topic cards at the bottom of each printable detail page
- classroom-use badge for safe school content
- preview cards with stronger print-sheet framing

## Image generation prompt principles

Generate original print-ready line art only. Prompts should specify:

- black-and-white line art
- no text
- no watermark
- no logo
- no color
- no grayscale shading
- clean outlines
- white background
- centered composition
- target audience and difficulty
- generic original design, no copyrighted characters

## Fast launch checklist

1. Pick domain and set `SITE_URL`.
2. Set contact email.
3. Configure optional Plausible domain.
4. Generate 30 to 60 safe pages using prompt manifests.
5. Ingest assets.
6. Manually reject low-quality or risky generated art.
7. Run `npm run build:production`.
8. Deploy static `dist/`.
9. Verify `_headers` or `.htaccess` are applied by host.
10. Add Google Search Console and submit sitemap.
11. Monitor downloads and errors for the first week.
