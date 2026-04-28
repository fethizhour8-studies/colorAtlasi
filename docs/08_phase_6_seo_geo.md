# 08 - Phase 6: SEO and GEO

## Goal

Make pages clear, useful, indexable, and resistant to thin-content problems.

## URL Strategy

Use `/en/` only at launch.

Do not publish other languages until translation/localization workflow is ready.

Examples:

```txt
/en/
/en/coloring-pages/
/en/coloring-pages/kids/
/en/coloring-pages/kids/wizard-school-coloring-pages/
/en/coloring-pages/kids/wizard-school-coloring-pages/magic-owl-coloring-page/
```

## Canonical Rules

- indexable pages canonicalize to themselves
- thin individual printable pages use `noindex,follow`
- thin individual printable pages canonicalize to topic/collection page
- PDFs usually noindex

## Sitemap Strategy

Launch:
```txt
/sitemap.xml
```

Later:
```txt
/sitemap-index.xml
/sitemaps/sitemap-en-hubs.xml
/sitemaps/sitemap-en-topics.xml
/sitemaps/sitemap-en-printables-001.xml
```

## Structured Data

Use when appropriate:
- WebSite
- SearchAction later
- Organization
- BreadcrumbList
- CollectionPage
- ItemList
- CreativeWork
- DigitalDocument
- ImageObject
- FAQPage only if visible and genuinely useful

Do not mass-generate repetitive FAQ spam.

## Metadata

Every indexable page needs:
- title
- meta description
- canonical
- Open Graph title
- Open Graph description
- Open Graph image
- breadcrumbs
- last updated date

## Content Guidelines

Homepage:
- 500-900 useful words total across sections

Content type hub:
- 400-800 words total

Hub/subcategory:
- 300-700 words

Topic/collection:
- 500-1,000 words total, split around the grid

Individual printable:
- 80-200 words if indexable
- minimal if noindex

Useful content:
- who it is for
- difficulty
- classroom uses
- printing tips
- age suitability
- what is included
- related activities
- licensing terms

Avoid:
- filler
- keyword stuffing
- repeated AI paragraphs
- near-duplicate pages

## GEO

For generative engines:
- use clear summaries
- quick facts
- what is included
- how to print
- classroom ideas
- related content
- license
- FAQ
- human review notes

## AI Transparency

Do not hide AI use.

Suggested wording:
"Some printable pages are created with a mix of digital illustration tools, AI-assisted drafting, and human review. Each file is checked, cleaned, formatted, and prepared for printing before publication."

## Task 6.1: SEO Helpers

Add helpers for:
- title
- description
- canonical
- robots
- OG metadata

## Task 6.2: Breadcrumb Schema

Add BreadcrumbList JSON-LD.

## Task 6.3: Collection Schema

Add CollectionPage/ItemList JSON-LD for topic pages.

## Task 6.4: Sitemap

Generate static sitemap.

## Phase 6 Done Criteria

- metadata correct
- noindex logic correct
- schema valid enough
- sitemap builds
- no thin-content pattern
