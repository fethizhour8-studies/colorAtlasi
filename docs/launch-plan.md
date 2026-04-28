# Coloring Atlas Launch Plan

## Positioning

Start with original, safe evergreen printable pages: kids, animals, cute pages, mandalas, adult coloring, seasonal pages, and printable calendars. Avoid unlicensed IP keywords such as Disney, Paw Patrol, Sonic, Bluey, Hello Kitty, Pokemon, and similar character terms unless you have explicit rights.

## Stack

- Astro static site, deployed to Cloudflare Pages, Netlify, or Vercel.
- Content stored as JSON files in `src/data/pages`.
- Downloadable assets stored in `public/downloads`.
- Image ingestion handled by `npm run ingest incoming/manifest.json`.
- No database required for launch. Move content to a CMS or database only when catalogue operations need it.

## Production Workflow

1. Review keyword clusters from `docs/keyword-opportunities.md`.
2. Generate original line art in your image generator using `prompts/style-guide.md`.
3. Save JPEG or PNG source images in `incoming/`.
4. Add entries to `incoming/manifest.json`.
5. Run `npm run ingest incoming/manifest.json`.
6. Review the branded PDF, preview, page title, description, and translated slugs.
7. Run `npm run build`.
8. Deploy the `dist/` folder or connect the repo to your host.

## SEO And GEO Basics

- Every printable has one indexable HTML landing page.
- Each page has a canonical URL, translated alternates, Open Graph tags, Twitter card tags, breadcrumb JSON-LD, and CreativeWork/ImageObject structured data.
- The sitemap includes `hreflang` alternates for English, French, Spanish, Portuguese, and German.
- `robots.txt` allows normal search crawling and explicitly allows `OAI-SearchBot` for ChatGPT Search discovery.
- `llms.txt` is included as an optional AI-assistant index, but canonical HTML and sitemap remain the source of truth.
- Use honest AI-assisted production disclosures. Do not hide provenance to deceive users, platforms, or partners.

## Scaling Path

- 0 to 5,000 pages: static JSON files and Astro builds.
- 5,000 to 50,000 pages: split sitemaps by locale/category and generate content from a CMS export.
- 50,000+ pages: move page records to a database or object storage, use incremental/static rendering, add queue-based image processing, and keep public URLs unchanged.
- The JSON records are migration-friendly because every page is already a structured object with stable `id`, slugs, category, metadata, and file URLs.

## Security Defaults

- Static hosting keeps server risk low.
- `_headers` sets content type, frame, referrer, permissions, and CSP basics.
- No user uploads are exposed on the website.
- Ingestion runs locally, writes only normalized public assets and JSON records.
- Keep API keys out of the repo and use `.env` files or host-managed environment variables.
