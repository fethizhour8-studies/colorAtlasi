# 03 - Phase 1: Static Site Foundation

## Goal

Create or maintain the static Astro foundation.

If Phase 0 already has these pieces, do not recreate them. Improve only if needed.

## Required Stack

- Astro
- TypeScript
- Tailwind
- static build

## Required Structure

```txt
coloringsheetsV2/
  project_context.md
  docs/
  site/
    astro.config.mjs
    package.json
    tsconfig.json
    tailwind.config.*
    src/
      components/
      layouts/
      pages/
      data/
      styles/
    public/
  pipeline/
  incoming/
  archive/
  content/
```

## Task 1.1: Verify Astro Foundation

Verify:
- `npm install`
- `npm run dev`
- `npm run build`

Do not add features.

## Task 1.2: Global Design Tokens

Use the final palette:

```txt
--paper: #FAF7F2
--surface: #FFFFFF
--ink: #1A1A2E
--muted: #6B6B7B
--border: #E8E2D9
--teal: #2D9F93
--teal-dark: #167D78
--coral: #F06B52
--sunshine: #F4C95D
--green: #4CAF7D
--teacher-blue: #5B7FD6
--adult-lavender: #8B7FC7
--kids-peach: #FFB38A
--sky: #BFE7F5
--mint: #DDF5E7
--pink: #FFE1E8
--yellow-soft: #FFF2B8
```

## Task 1.3: Core Layout Components

Required:
- `BaseLayout.astro`
- `SiteHeader.astro`
- `SiteFooter.astro`
- `Container.astro`
- `Button.astro`
- `Breadcrumbs.astro`

Header:
- simple brand
- English-only nav
- no dropdowns
- robust mobile layout

Footer:
- legal/trust links
- simple categories
- no clutter

## Task 1.4: Core Routes

Required:
- `/`
- `/en/`
- `/en/coloring-pages/`
- `/en/coloring-pages/kids/`
- `/en/coloring-pages/kids/wizard-school-coloring-pages/`
- optional individual page route

Use safe generic topics.

Do not use franchise names.

## Phase 1 Done Criteria

- static build works
- pages exist
- header/footer are correct
- no forbidden MVP features
