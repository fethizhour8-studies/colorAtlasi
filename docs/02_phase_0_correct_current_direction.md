# 02 - Phase 0: Correct Current Direction

## Goal

Fix the current site direction before building more.

The previous attempt drifted into:
- generic SaaS landing page
- oversized hero
- premature multilingual UI
- weak printable cards
- possible full-pack/lightbox assumptions

This phase corrects that.

## Task 0.1: Remove Premature Multilingual UI

### Requirements

Keep:
- `/en/` route structure

Remove from UI:
- language dropdown
- EN/ES/FR/PT/DE switcher
- translated UI states
- language pill menu

Header must be English-only for MVP.

### Likely Files

- `site/src/components/SiteHeader.astro`
- `site/src/layouts/BaseLayout.astro`
- `site/src/pages/en/index.astro`
- `site/src/styles/global.css`

### Done When

- no language dropdown visible
- no translated UI visible
- `/en/` routes still work

## Task 0.2: Remove Full-Pack Download UI

### Requirements

Do not delete data fields yet if they exist.

Remove visible full-pack CTAs:
- homepage
- topic pages
- pack pages

Replace with:
- individual download buttons under cards
- browse/scroll CTAs

### Done When

- no full-pack download button visible in MVP UI
- individual card downloads remain visible

## Task 0.3: Remove Lightbox/Modal Assumptions

### Requirements

No modal behavior.
No "Preview modal coming soon" language.
No lightbox placeholder.

Card behavior:
- image/title link to optional individual page if available
- download button links directly to PDF
- print button may link to PDF or be placeholder if print not implemented

### Done When

- no modal code
- no lightbox language
- no preview modal buttons

## Task 0.4: Redesign Homepage as Catalogue

### Required Homepage Structure

1. compact hero
2. browse/search prompt
3. popular categories
4. featured collections
5. seasonal collections
6. new printables
7. teacher/parent trust notes

### Visual Requirements

- smaller hero type
- more color blocks
- printable previews appear early
- category/topic cards visible above or near the fold
- not SaaS-like
- not sterile

### Done When

Homepage looks like a printable catalogue.

## Task 0.5: Strengthen Printable Card Design

### Requirements

Update `PrintableCard`:
- soft colored frame
- white paper inside
- visible border
- stronger shadow
- title below preview
- badges
- Download PDF button
- optional Print button
- optional View Page link
- no modal button
- no ad-like styling

### Done When

Cards clearly show framed printable previews.

## Task 0.6: Grid-First Topic Pages

### Requirements

Topic/collection page:
- H1 and intro
- quick facts
- filters if simple
- grid appears early
- individual download buttons

Grid:
- mobile: 2 columns when readable
- tablet: 2 columns
- desktop: 2 columns
- wide desktop: optional 3 only if readable

### Done When

The user can scroll and choose printables directly.

## Phase 0 Done Criteria

- no multilingual UI
- no full-pack button
- no lightbox/modal
- homepage feels like printable catalogue
- topic pages are grid-first
- cards are branded and colorful
- build succeeds
