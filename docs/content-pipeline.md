# Content and Image Generation Pipeline

This project should stay launch-focused: publish original, safe, useful printable pages first, then expand with keyword clusters that have demand and low legal risk.

## 1. Keyword source of truth

Use `docs/keyword-opportunities.md` and the Semrush export workbook as the first filter.

Prioritize:

- general coloring pages
- free coloring pages
- coloring sheets
- coloring pages for kids
- adult coloring pages
- mandala coloring pages
- cute coloring pages
- dinosaur coloring pages
- animal coloring pages
- seasonal printables
- printable calendars

Avoid by default:

- copyrighted characters
- movie, TV, game, anime, celebrity, brand, mascot, toy, and franchise terms
- trademarked names even when competitors rank for them
- anything that relies on copying a known visual style or recognizable character design

## 2. Launch page clusters

Build the first batch around evergreen, non-risky pages:

| Cluster | Suggested pages | Notes |
| --- | --- | --- |
| Kids | dinosaur, cute animals, simple shapes, alphabet-adjacent pages | broad demand and low legal risk |
| Animals | rainforest, ocean animals, farm animals, pets, butterflies | strong classroom use |
| Adults | relaxing scenes, cozy rooms, gardens, patterns | good GEO-friendly descriptive content |
| Mandalas | floral, geometric, simple mandala, detailed mandala | high evergreen interest |
| Seasonal | Christmas, fall, spring, Halloween-generic, winter | avoid copyrighted holiday characters |
| Calendars | 2026 yearly, monthly, blank planner, classroom calendar | adjacent printable demand |

## 3. Prompt manifest

Create prompt jobs in `incoming/image-prompts.example.json` format, then save them as `incoming/image-prompts.json`.

Each job should include:

- `categoryId`
- `primaryTopicId`
- `topic`
- `audience`
- `difficulty`
- `title.en`
- `description.en`
- `keywords`
- `tags`
- `composition`

The generator injects safety and print instructions automatically, including no trademarks, no recognizable franchise characters, no logo, no text, no watermark, no color, and clean black-and-white line art.

## 4. Generate images with Gemini / Nano Banana

Set the API key locally only:

```bash
export GEMINI_API_KEY="your-local-key"
```

Optional model override:

```bash
export GEMINI_IMAGE_MODEL="gemini-2.5-flash-image-preview"
```

Run:

```bash
npm run generate:images -- incoming/image-prompts.json
```

The script writes images to `incoming/generated/` and creates `incoming/manifest.generated.json`.

## 5. Ingest generated files

```bash
npm run ingest incoming/manifest.generated.json
```

This creates the production assets and JSON page records used by the static site.

## 6. Quality checks before publishing

Reject or regenerate any page with:

- text inside the artwork
- colored artwork
- gray fills or heavy black areas
- watermark/signature/logo
- copyrighted or trademark-looking character shapes
- messy line art that will not print cleanly
- confusing composition or tiny details for the target difficulty

## 7. GEO and multilingual readiness

For every topic page, keep structured fields stable and translation-ready:

- slug should remain language-independent in IDs but localizable in future routes
- title, description, and intro should support localized versions
- keywords should be stored as arrays so per-locale keyword sets can be added later
- avoid hardcoding `/en/` in data records; route helpers should own locale paths

Future language rollout should start with one additional locale at a time. Translate high-value hubs first, then topic pages, then individual printable pages.

## 8. Competitor-inspired additions without copying

Competitors often add supporting content around each printable: usage ideas, classroom tips, related topics, download instructions, and preview galleries. Use this as structural inspiration only; keep wording, artwork, and page concepts original.

Recommended additions per topic page:

- short intro with target audience
- what is included section
- printing tips
- related coloring pages
- classroom or family activity ideas
- FAQ section using generic, helpful questions
- internal links to hubs and nearby topics

## 9. Fast launch order

1. Finish production env values and domain.
2. Publish 30 to 60 safe original PDFs across 6 to 10 clusters.
3. Add analytics and download tracking.
4. Submit sitemap in Google Search Console.
5. Add more languages after the English structure proves stable.
