# Coloring Atlas

This is Static multilingual website for downloadable coloring pages, coloring sheets, mandalas, seasonal printables, and simple printable calendars.

## Quick Start

```bash
npm install
npm run seed:samples
npm run dev
```

Open `http://127.0.0.1:4321`.

## Production Build

```bash
$env:SITE_URL="https://your-domain.com"
$env:PUBLIC_CONTACT_EMAIL="hello@your-domain.com"
npm run build
```

Deploy the generated `dist/` folder, or connect the project to Cloudflare Pages, Netlify, or Vercel.
The build generates both `dist/_headers` for static platforms and `dist/.htaccess` for cPanel/Apache-style hosting.

For a real launch, use the stricter production command:

```bash
$env:SITE_URL="https://your-real-domain.com"
$env:PUBLIC_CONTACT_EMAIL="contact@your-real-domain.com"
npm run build:production
```

See `docs/production-launch-checklist.md` before applying for AdSense or uploading `dist/`.

## Preview Ad Slots

AdSense code is not installed yet. To preview reserved ad positions while designing category pages:

```bash
$env:PUBLIC_SHOW_AD_PLACEHOLDERS="true"
npm run dev
```

Keep placeholders disabled on production until the final AdSense publisher ID, consent/privacy setup, and CSP rules are ready.

To enable real AdSense units later, set `PUBLIC_ADSENSE_ENABLED=true`, `PUBLIC_ADSENSE_CLIENT`, the three slot IDs, and `PUBLIC_GOOGLE_CERTIFIED_CMP=true`. The production validator intentionally fails if those values are missing.

## Add New Coloring Pages

1. Generate original black-and-white line art with your image generator as JPEG or PNG.
2. Save the source image in `incoming/`.
3. Copy `incoming/manifest.example.json` to `incoming/manifest.json`.
4. Edit the manifest with title, category, type, orientation, description, and keywords.
5. Run:

```bash
npm run ingest incoming/manifest.json
```

The script creates a branded print-ready PDF, WebP preview, WebP thumbnail, PDF metadata, SEO-ready filenames, and a JSON page record. Use `-- --with-png` only if you also want to publish PNG downloads.

Examples:

```bash
npm run ingest incoming/manifest.json
npm run ingest incoming/manifest.json -- --with-png
```

## Keyword Notes

See `docs/keyword-opportunities.md` for the first launch interpretation from the attached Semrush workbook.
