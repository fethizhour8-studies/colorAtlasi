# Production Launch Checklist

Use this checklist before uploading `dist/` to cPanel, Cloudflare Pages, Vercel, Netlify, or another static host.

## Required Environment

Set these before the production build:

```powershell
$env:SITE_URL="https://your-real-domain.com"
$env:PUBLIC_CONTACT_EMAIL="contact@your-real-domain.com"
npm run build:production
```

`SITE_URL` controls canonical URLs, sitemap URLs, robots.txt, and llms.txt. Do not launch with `example.com`, `your-domain.com`, localhost, or an IP address.

`PUBLIC_CONTACT_EMAIL` appears on the contact, privacy, takedown, and licensing pages. Use a domain email before applying for AdSense.

## Security Headers

The build generates `public/_headers` and `public/.htaccess` before Astro builds. `_headers` is useful on Cloudflare Pages and similar static hosts. `.htaccess` is for cPanel/Apache hosting when `mod_headers` is enabled. The default mode is a no-ads CSP:

- `default-src 'self'`
- `object-src 'none'`
- `frame-ancestors 'none'`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` blocks sensitive browser APIs the site does not need

When `PUBLIC_ADSENSE_ENABLED=true`, the generated CSP opens only the Google ad endpoints needed for AdSense-style rendering. Test this in the browser console after deployment because Google ad delivery can change host usage over time.

## AdSense Readiness

Keep ads disabled until all of this is true:

- The site has real About, Contact, Privacy Policy, Terms, Takedown Policy, and Licensing pages.
- The catalogue has enough original, useful printable pages that the site is not thin content.
- Download buttons are visually distinct from ad slots.
- No ad slot sits immediately next to a PDF download button.
- A Google-certified CMP is configured before serving personalized ads to EEA, UK, or Swiss users.
- `PUBLIC_GOOGLE_CERTIFIED_CMP=true` is only set after that CMP is actually installed and tested.

Official references:

- Google AdSense consent requirements: https://support.google.com/adsense/answer/13790256
- Google CSP guidance for publisher tags: https://developers.google.com/publisher-tag/guides/content-security-policy

## Enabling Ads

After AdSense approval and CMP setup:

```powershell
$env:SITE_URL="https://your-real-domain.com"
$env:PUBLIC_CONTACT_EMAIL="contact@your-real-domain.com"
$env:PUBLIC_ADSENSE_ENABLED="true"
$env:PUBLIC_ADSENSE_CLIENT="ca-pub-0000000000000000"
$env:PUBLIC_ADSENSE_SLOT_LEADERBOARD="0000000000"
$env:PUBLIC_ADSENSE_SLOT_RECTANGLE="0000000000"
$env:PUBLIC_ADSENSE_SLOT_SIDEBAR="0000000000"
$env:PUBLIC_GOOGLE_CERTIFIED_CMP="true"
npm run build:production
```

Do not use fake slot IDs in production. The build validation rejects missing or malformed IDs when ads are enabled.

## Consent Notes

`PUBLIC_CONSENT_NOTICE_ENABLED=true` shows a small preference notice, but this is not a Google-certified CMP. It is only a local preference UI for optional features. For EEA, UK, and Swiss ad traffic, use a certified CMP that integrates with Google's required framework.

## Final Checks

Run these before deployment:

```powershell
npm audit --audit-level=moderate
npm run build:production
```

Then verify:

- `dist/_headers` exists.
- `dist/.htaccess` exists if deploying to cPanel/Apache.
- `dist/sitemap.xml` uses the real domain.
- `dist/robots.txt` points to the real sitemap.
- `dist/llms.txt` uses the real domain.
- No built file contains `example.com`, `your-domain.com`, or `hello@your-domain.com`.
- The deployed site returns the security headers from the host.
