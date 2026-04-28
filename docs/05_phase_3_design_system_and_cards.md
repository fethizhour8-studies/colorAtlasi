# 05 - Phase 3: Design System and Cards

## Goal

Create a uniform, premium printable catalogue visual system.

## Design Target

Not:
- SaaS landing page
- sterile black/white
- chaotic kids site
- generic template
- white papers on white background

Yes:
- warm paper background
- colorful soft panels
- visible framed printable cards
- friendly but professional
- catalogue feel
- easy browsing

## Components

Required:
- `CollectionCard.astro`
- `PrintableCard.astro`
- `PrintableGrid.astro`
- `QuickFacts.astro`
- `FilterChips.astro`
- `TrustStrip.astro`
- `RelatedCollections.astro`

## CollectionCard

Used for:
- hubs
- topics
- related collections
- seasonal collections

Requirements:
- colorful soft panel
- stacked paper effect
- title
- description
- count when available
- accent color
- CTA text like "Browse pages"
- accessible link
- responsive

## PrintableCard

Used for individual printables in grids.

Requirements:
- soft colored outer frame
- white paper sheet inside
- visible paper border
- subtle shadow
- preview image centered
- title below preview
- PDF badge
- difficulty badge
- audience badge optional
- Download PDF button
- Print button optional
- View Page link optional
- no modal button
- no full-pack action
- no ad-like styling

## PrintableGrid

Requirements:
- loops through printable cards
- supports future ad slot insertion after every 6th or 8th item
- ad slot disabled at MVP
- does not place ads inside cards
- CSS grid:
  - very narrow: 1 column if needed
  - mobile: 2 columns when readable
  - tablet: 2 columns
  - desktop: 2 columns
  - wide: optional 3 if card width remains good

## QuickFacts

Show:
- pages count
- format
- paper size
- difficulty
- audience
- license

Style:
- small colorful chips/cards
- not too dominant

## FilterChips

MVP:
- visual chips only or simple anchor filters
- no complex JS needed

Examples:
- All
- Easy
- Cute
- Detailed
- Classroom
- Animals
- Seasonal

## TrustStrip

Show:
- Free PDF
- Easy to print
- Human-reviewed
- Personal/classroom use

## Task 3.1: Implement/Refine CollectionCard

## Task 3.2: Implement/Refine PrintableCard

## Task 3.3: Implement PrintableGrid

## Task 3.4: Add QuickFacts, FilterChips, TrustStrip

## Task 3.5: Apply to Homepage and Topic Pages

## Phase 3 Done Criteria

- cards look premium and printable-focused
- printables are visually easy to inspect
- design is uniform
- no modal/full-pack/language UI
- build succeeds
