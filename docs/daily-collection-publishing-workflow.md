# Daily Collection Publishing Workflow

This workflow is for adding collection/pack pages such as `Cow Coloring Pages`, `Spring Coloring Pages`, or `Brachiosaurus Coloring Pages`.

## Goal

The indexable page should be the collection page, not every individual PDF page.

Example collection page:

```text
/en/coloring-pages/animals/cow-coloring-pages/
```

Example individual printable page:

```text
/en/coloring-pages/animals/cow-coloring-pages/cute-cow-standing-in-field/
```

Collection pages should be rich, useful, and indexable. Individual printable pages should usually remain `noindex,follow` and canonicalize to the collection.

## Recommended folder pattern

Create one folder per collection in `incoming/`:

```text
incoming/cow-coloring-pages/
  collection.json
  cow-001.pdf
  cow-002.pdf
  cow-003.pdf
  ...
  cow-050.pdf
```

The pipeline can later generate:

```text
public/downloads/coloring-pages/animals/cow-coloring-pages/cow-001.pdf
public/assets/previews/coloring-pages/animals/cow-coloring-pages/cow-001.webp
src/data/catalog.json entries
```

## `collection.json` shape

Use a metadata file like this for each collection:

```json
{
  "id": "cow-coloring-pages",
  "contentTypeId": "coloring-pages",
  "hubId": "coloring-pages-animals",
  "slug": "cow-coloring-pages",
  "title": "Cow Coloring Pages",
  "h1": "Cow Coloring Pages",
  "intro": "A collection of original cow coloring pages with barns, fields, calves, milk pails, and friendly farm scenes.",
  "description": "Free printable cow coloring pages for kids, farm animal units, classroom packets, and simple home activities.",
  "tags": ["cow", "farm animals", "animals", "kids", "classroom"],
  "relatedTopicIds": [
    "farm-animals-coloring-pages",
    "cat-coloring-pages",
    "dog-coloring-pages"
  ],
  "indexable": true,
  "seoTitle": "Free Printable Cow Coloring Pages",
  "seoDescription": "Browse free printable cow coloring pages with barns, fields, calves, and simple PDF downloads.",
  "quickFacts": [
    { "label": "Best for", "value": "Kids, farm units, classroom packets" },
    { "label": "Format", "value": "Letter-size PDF printables" },
    { "label": "Difficulty", "value": "Easy to medium" }
  ],
  "sections": [
    {
      "eyebrow": "Activity ideas",
      "title": "Ways to use cow coloring pages",
      "body": "Use these cow coloring pages for farm animal lessons, quiet classroom activities, rainy-day crafts, or simple screen-free home activities. Print a few different designs to create a mini farm packet."
    },
    {
      "eyebrow": "Classroom use",
      "title": "Cow coloring pages for farm units",
      "body": "Pair cow pages with vocabulary words such as calf, barn, pasture, milk, and hay. Younger learners can color the page, circle farm objects, or tell a short story about the scene."
    }
  ]
}
```

## Collection page behavior

On a collection page:

- preview image click downloads the PDF directly
- title click downloads the PDF directly
- `View page` opens the individual printable page
- individual printable pages are useful for sharing but usually remain `noindex,follow`
- collection pages carry the main SEO/GEO content

## Individual printable page behavior

On an individual printable page:

- show the single preview/card
- show `Download PDF`
- show `Back to collection`
- do not show a second `View page` link to the same URL
- keep the canonical URL pointing to the collection unless the individual page becomes genuinely substantial

## When to make a collection indexable

Keep `indexable: false` until the collection has real assets.

Good baseline for `indexable: true`:

- at least 4 real PDF printables
- at least one strong preview image
- original non-infringing subject matter
- clear intro
- quick facts
- collection guide sections
- useful related collections
- no brand/character/trademark dependency

## Avoid

Do not create collection pages around:

- copyrighted characters
- exact franchise names
- brand logos
- celebrity likenesses
- sports team marks
- mascot designs
- pages where the search intent expects protected IP

Use original alternatives instead.

## Recommended daily publishing rhythm

1. Pick one safe keyword cluster.
2. Create the incoming folder.
3. Add 10 to 50 approved PDFs.
4. Add `collection.json` with useful unique text.
5. Run the pipeline to generate previews and catalogue entries.
6. Build locally.
7. Check the collection page on desktop and mobile.
8. Turn `indexable` to `true` only when the collection is not thin.
9. Add internal links from related live collections.
10. Monitor downloads after launch.
