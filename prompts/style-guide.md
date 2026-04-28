# Coloring Page Prompt Guide

Use this for image generators that allow commercial or website use under your account terms. Keep every prompt away from copyrighted characters, brand names, logos, celebrities, and living artists.

## Base Prompt

Black and white printable coloring page, clean vector-like line art, white background, no shading, no grayscale, no color, thick smooth outlines, enclosed shapes, centered composition, kid-friendly, printable on letter paper, no text, no watermark.

## Recommended Image Sizes

Use the largest clean output your generator allows. The pipeline will normalize JPEG or PNG files into print-ready PDFs, but these source ratios make better results:

| Printable type | Best source ratio | OpenAI Image API size | Gemini / Nano Banana prompt wording |
| --- | --- | --- | --- |
| Coloring page | Portrait 2:3 | `1024x1536` | portrait 2:3 printable page |
| Coloring sheet / worksheet | Portrait 2:3 | `1024x1536` | portrait 2:3 worksheet page |
| Mandala | Square or portrait | `1024x1024` or `1024x1536` | centered square mandala, no crop |
| Calendar | Landscape 3:2 | `1536x1024` | landscape 3:2 printable calendar |
| Planner | Portrait 2:3 or landscape 3:2 | `1024x1536` or `1536x1024` | clean planner page, lots of writing space |

For print quality, avoid tiny outputs. A 1024px source can work for launch, but 1536px+ on the long edge is better. The ingest script upscales to letter-size PDF dimensions, creates WebP previews for the website, and writes PDF metadata from the manifest.

## Kids Variant

Simple black and white printable coloring page for kids, broad outlines, large open spaces, friendly original subject, white background, no shading, no color, no text, no logo.

## Adult Variant

Detailed black and white printable coloring page for adults, intricate original ornamental line art, balanced negative space, crisp outlines, white background, no shading, no color, no text, no logo.

## Negative Prompt

color, gray shading, realistic photo, text, letters, words, watermark, logo, signature, messy lines, cropped subject, copyrighted character, brand mascot, celebrity, low contrast, filled black areas.

## Batch Naming

Name source files before ingestion with a descriptive working name:

`incoming/rainforest-animals.png`
`incoming/geometric-flower-mandala.png`
`incoming/cute-unicorn-stars.png`

The ingest script will create SEO-ready public filenames and data records.

## Manifest Fields

Set `type` and `orientation` so the PDF frame matches the product:

```json
{
  "source": "incoming/april-2026-easter-calendar.jpg",
  "categoryId": "printable-calendars",
  "type": "calendar",
  "orientation": "landscape",
  "title": { "en": "April 2026 Easter Calendar Printable" },
  "description": { "en": "A landscape April 2026 calendar with Easter details." },
  "keywords": ["april 2026 calendar", "printable calendar", "easter calendar"]
}
```
