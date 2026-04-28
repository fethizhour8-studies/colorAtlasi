# 04 - Phase 2: Content Model and Information Architecture

## Goal

Build a content model that supports the corrected architecture.

## Architecture

```txt
content type → hub/subcategory → topic/collection → optional individual printable
```

## Entities

### Content Type

Examples:
- Coloring Pages
- Printables
- Calendars
- Worksheets
- Planners

Fields:
- `id`
- `slug`
- `title`
- `description`
- `sortOrder`
- `accent`
- `seo.title`
- `seo.metaDescription`

### Hub / Subcategory

Examples:
- Kids
- Adults
- Animals
- Seasonal
- Mandalas
- Teachers
- Preschool
- 2026 Calendars

Fields:
- `id`
- `contentTypeId`
- `slug`
- `title`
- `description`
- `audiences`
- `accent`
- `seo`
- `indexable`

### Topic / Collection

Examples:
- Wizard School Coloring Pages
- Farm Animal Coloring Pages
- Train Coloring Pages
- Christmas Ornament Coloring Pages
- Preschool Counting Worksheets

Fields:
- `id`
- `contentTypeId`
- `hubId`
- `slug`
- `title`
- `intro`
- `description`
- `audiences`
- `difficulty`
- `tags`
- `printableType`
- `items`
- `indexable`
- `locale`
- `quickFacts`
- `seo`

### Optional Subcollection / Pack

Use only when a topic is large enough to split.

Examples:
- Easy Train Coloring Pages
- Realistic Train Coloring Pages
- Christmas Train Coloring Pages

Fields:
- `id`
- `topicId`
- `slug`
- `title`
- `description`
- `items`
- `indexable`
- `seo`

### Printable

Fields:
- `id`
- `topicId`
- `subcollectionId` optional
- `slug`
- `title`
- `shortDescription`
- `printableType`
- `audience`
- `difficulty`
- `orientation`
- `paperSizes`
- `tags`
- `assets.preview`
- `assets.thumbnail`
- `assets.social`
- `assets.pdf`
- `seo.indexable`
- `seo.canonicalTo`
- `license`
- `source.aiAssisted`
- `source.humanReviewed`

## Starter Data

Use safe examples:
- Coloring Pages
- Printables
- Calendars
- Kids
- Adults
- Animals
- Mandalas
- Wizard School Coloring Pages
- Farm Animal Coloring Pages
- Train Coloring Pages
- Christmas Ornament Coloring Pages
- Cute Steam Train Coloring Page
- Magic Owl Coloring Page
- Cute Cow Coloring Page

Do not use Harry Potter, Disney, Minecraft, or any franchise.

## Task 2.1: Restructure Data

Create data files that match the corrected IA.

Recommended early files:
```txt
site/src/data/contentTypes.json
site/src/data/hubs.json
site/src/data/topics.json
site/src/data/printables.json
```

Optional:
```txt
site/src/data/subcollections.json
```

## Task 2.2: URL Builders

Create centralized URL helpers:
- `getContentTypeUrl`
- `getHubUrl`
- `getTopicUrl`
- `getPrintableUrl`

No repeated hardcoded URL logic.

## Task 2.3: Indexing Helpers

Implement:
- normal robots for indexable pages
- `noindex,follow` for thin individual printables
- canonical fallback to topic/collection page

## Task 2.4: Validation

Use Zod or simple validation first.

Validate:
- required fields
- valid slugs
- valid IDs
- no missing topic references
- no missing printable assets
- no indexable printable without meaningful description

## Phase 2 Done Criteria

- content model matches corrected IA
- URL helpers exist
- indexing helpers exist
- starter data is safe
- build works
