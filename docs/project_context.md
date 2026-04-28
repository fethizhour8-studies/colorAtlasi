# Project Context: Printable / Coloring Sheets Website

This is the master context for the `coloringsheetsV2` project.

Read this file before every task.

## 1. Role of the Local LLM

You are an implementation agent. You are not the product strategist.

The architecture, UX direction, SEO model, security model, and monetization constraints are already chosen.

You must:
- Follow these instructions exactly.
- Build one small slice at a time.
- List files before editing.
- Do not add unrequested features.
- Do not change architecture unless explicitly asked.
- Keep the project beginner-operable.
- Keep the public site static-first.
- Prioritize real users first, SEO/GEO second, ads third.

## 2. Product Goal

Build a high-quality website for free downloadable printable resources:
- coloring pages
- coloring sheets
- printable PDFs
- calendars
- planners
- worksheets
- mandalas
- activity pages
- teacher/classroom printables
- adult relaxing printables
- kids printables

The site should eventually compete with large printable/coloring sites, but it must not look like a thin AI-generated mass-content site.

It should feel:
- useful
- warm
- trustworthy
- colorful
- organized
- print-focused
- friendly for parents and teachers
- calm enough for adults
- not childish chaos
- not corporate SaaS
- not generic AI-spam

## 3. Chosen Launch Stack

Website:
- Astro static site generator
- TypeScript
- Tailwind CSS
- Data-driven pages
- Minimal client-side JavaScript

Content:
- JSON/YAML metadata at launch
- Later: Astro Content Collections and Zod validation
- Markdown/MDX only for editorial/trust/guide pages
- No giant single file when content grows

Search:
- No search in early MVP
- Pagefind after core pages and templates are stable

Asset pipeline:
- Python CLI pipeline
- Pillow for image processing
- img2pdf or reportlab for PDFs
- PyYAML for batch manifests
- python-slugify for safe filenames
- pydantic or dataclasses for validation
- imagehash for duplicate/perceptual checks later
- optional exiftool for thorough metadata stripping

Hosting/deployment:
- Static Astro build
- Upload only `site/dist/` to cPanel
- Apache/cPanel serves static files
- Cloudflare in front for SSL, CDN, cache, WAF, and bot protection

## 4. Do Not Build During MVP

Do not add:
- WordPress
- Next.js full-stack app
- Laravel/Django CMS
- live database
- public admin dashboard
- public upload form
- user accounts
- authentication
- favorites
- paid packs
- bundle builder
- server-side rendering app on cPanel
- live AdSense code
- live analytics that requires consent complexity
- multilingual UI
- dark mode
- modal/lightbox preview system

## 5. Corrected Information Architecture

Use this mental model:

```txt
content type → hub/subcategory → topic/collection → optional individual printable
```

Examples:

```txt
Coloring Pages
  → Kids
    → Fantasy & Magic
      → Wizard School Coloring Pages
        → Magic Owl Coloring Page

Coloring Pages
  → Animals
    → Farm Animal Coloring Pages
      → Cute Cow Coloring Page

Printables
  → Worksheets
    → Preschool Worksheets
      → Counting Animals Worksheet

Calendars
  → 2026 Calendars
    → January 2026 Calendar
```

Important:
- A topic page can also be the collection page.
- Do not force a separate pack page for every topic.
- Use separate pack/subcollection pages only when a topic becomes large enough to split.

Good URL examples:

```txt
/en/
/en/coloring-pages/
/en/coloring-pages/kids/
/en/coloring-pages/kids/wizard-school-coloring-pages/
/en/coloring-pages/kids/wizard-school-coloring-pages/magic-owl-coloring-page/

/en/coloring-pages/animals/
/en/coloring-pages/animals/farm-animals/
/en/coloring-pages/animals/farm-animals/cute-cow-coloring-page/

/en/calendars/2026-calendars/
/en/printables/worksheets/preschool-counting-worksheets/
```

## 6. Launch Indexing Rules

Main SEO pages:
- homepage
- content type hubs
- hub/subcategory pages
- topic/collection pages

Optional pages:
- individual printable pages

Individual printable pages:
- may exist for UX and Pinterest/social sharing
- default to `noindex,follow` unless they have real unique value
- canonicalize to the topic/collection page when thin

Raw PDFs:
- usually noindex
- HTML pages should rank, not PDFs

## 7. Topic / Collection Page UX

A topic/collection page is the main user experience.

Example:
`/en/coloring-pages/kids/wizard-school-coloring-pages/`

Structure:
1. H1
2. short intro, 2-4 sentences
3. quick facts
4. filter chips
5. large scrollable printable grid
6. individual PDF download/print buttons under every card
7. future in-feed ad slots between cards, disabled at MVP
8. helpful usage content
9. printing tips
10. related collections
11. FAQ
12. license/trust note

MVP rules:
- No full-pack download button at launch.
- No lightbox or modal preview at launch.
- Users browse by scrolling the page.
- Each printable card has its own Download PDF button.
- Each printable card may link to an optional individual page.
- Printables must appear early; do not bury them under long text.

Reason for no full-pack download at MVP:
- keeps MVP simpler
- makes users inspect/select the printable they want
- supports catalogue browsing
- preserves room for future testing

Do not frame this as manipulating users for time-on-page.

## 8. Grid Rules

Printable grids should emphasize preview quality.

Default printable collection grid:
- mobile: 2 columns when readable, otherwise 1 column for very narrow screens
- tablet: 2 columns
- desktop: 2 columns for large previews
- wide desktop: optional 3 columns only if cards remain large and readable

Category/topic cards:
- mobile: 1-2 columns
- tablet: 2-3 columns
- desktop: 3-4 columns

Do not use tiny 4-column printable previews if users cannot inspect the images.

## 9. Future In-Feed Ads

No live ads in MVP.

However, the printable grid should be structured so a disabled ad slot can later be inserted after every 6th or 8th printable card.

Rules:
- ads never appear above the H1
- ads never appear before the first useful grid content
- ads never appear inside a printable card
- ads never appear between a card image and its download button
- ads must not look like download buttons
- reserve space later to reduce layout shift

## 10. Copyright and Trademark Safety

Do not build around protected characters, franchises, or trademarks.

Avoid:
- Disney
- Elsa
- Minecraft
- Mario
- Pokémon
- SpongeBob
- Peppa Pig
- Paw Patrol
- Harry Potter
- Marvel
- Pixar
- Nintendo
- TV/movie/game character names
- logos or brand-identifying costumes

Use safer alternatives:
- wizard school coloring pages
- magic academy coloring pages
- fairy tale princess coloring pages
- ice princess coloring pages
- block adventure coloring pages
- puppy rescue coloring pages only if original and non-infringing
- fantasy castle coloring pages
- original animals
- original vehicles
- holidays
- mandalas
- worksheets
- calendars

## 11. Visual Design Direction

The current design must not feel like a SaaS startup landing page.

It must feel like a premium printable catalogue.

Design values:
- warm
- cheerful
- useful
- soft but not weak
- colorful but not chaotic
- paper-inspired
- family-friendly
- teacher-friendly
- adult-friendly where appropriate
- trustworthy

Do not:
- use oversized black hero typography like a generic SaaS site
- use complex language dropdowns
- overuse white-on-white printable previews
- hide actual printable cards below too much text
- make cards look like ads
- make everything monochrome

## 12. Color System

Use CSS variables and Tailwind tokens.

Core palette:
- Paper background: `#FAF7F2`
- Surface: `#FFFFFF`
- Ink: `#1A1A2E`
- Muted text: `#6B6B7B`
- Warm border: `#E8E2D9`
- Primary teal: `#2D9F93`
- Deep teal: `#167D78`
- Coral: `#F06B52`
- Sunshine: `#F4C95D`
- Soft green: `#4CAF7D`
- Teacher blue: `#5B7FD6`
- Adult lavender: `#8B7FC7`
- Kids peach: `#FFB38A`
- Soft sky: `#BFE7F5`
- Soft mint: `#DDF5E7`
- Soft pink: `#FFE1E8`
- Soft yellow: `#FFF2B8`

Use category accents:
- Kids: sunshine, peach, coral
- Adults: lavender, sage/green
- Teachers/worksheets: blue, teal
- Calendars/planners: teal, mint
- Seasonal: contextual accents
- Mandalas: lavender, deep teal

## 13. Typography

Use a friendly but professional sans-serif.

Recommended:
- system font stack first for performance
- optionally use a rounded heading font later

Style:
- headings strong but not giant
- body text readable
- buttons bold and clear
- avoid childish fonts
- avoid corporate startup typography

## 14. Header Rules

MVP header:
- simple brand/logo
- nav links:
  - Coloring Pages
  - Printables
  - Calendars
  - Mandalas
  - Worksheets
- no language switcher
- no complex dropdown
- no mega menu
- mobile nav may wrap or horizontally scroll
- keep it robust and clean

Keep `/en/` URL structure, but do not show multilingual UI yet.

## 15. Card Preview System

Printable thumbnails must not be plain white pages on white backgrounds.

Use a branded folder/paper-card preview system.

Printable card:
- colored soft frame/background
- white paper sheet inside
- visible paper border
- subtle shadow
- title below image
- PDF badge
- difficulty/audience badge
- clear Download PDF button
- optional Print button
- optional View Page link
- optional Pinterest placeholder later
- not ad-like

Collection card:
- colorful soft panel
- stacked paper effect
- title
- short description
- count when available
- accent color
- clear link

The preview is packaging. The PDF itself must remain clean and printable.

## 16. Page Types

Required MVP page types:
- homepage
- content type hub
- hub/subcategory page
- topic/collection page
- optional individual printable page
- legal/trust pages

Search, ads, advanced filters, and localization come later.

## 17. Legal / Trust Pages

Create:
- `/en/about/`
- `/en/contact/`
- `/en/privacy-policy/`
- `/en/terms/`
- `/en/licensing/`
- `/en/dmca-takedown/`
- `/en/how-to-print/`
- `/en/ai-assisted-content-policy/`

Do not add backend contact forms in MVP.

## 18. Security Baseline

Best security decision: keep public site static.

No public:
- admin
- upload form
- database
- PHP app
- user accounts

Deploy only:
```txt
site/dist/
```

Never upload:
- `.env`
- `.git/`
- `node_modules/`
- `package.json`
- `pipeline/`
- `incoming/`
- `content/`
- `archive/`
- raw source images
- manifests
- credentials

## 19. Implementation Discipline

For every task:
1. Read this file.
2. Read the relevant phase file.
3. Restate the task briefly.
4. List files to create/edit.
5. Implement only the requested slice.
6. Provide commands to run.
7. Provide verification steps.
8. Do not change architecture unless asked.
