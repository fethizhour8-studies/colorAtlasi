# Dedicated Server Deployment

This guide assumes:

- `cPanel` is installed.
- `Apache` serves the public site.
- `Nginx` may be acting as a reverse proxy or cache layer.
- The site is deployed as a static Astro build.
- Cloudflare sits in front of the domain.

## 1. Prepare the domain

1. Buy or choose the final domain.
2. Add the domain to cPanel and point its document root to a clean folder such as `public_html/coloring-atlas`.
3. In Cloudflare, add the domain and switch the nameservers at the registrar.
4. In Cloudflare DNS:
   - Create the `A` record for the root domain pointing to the server IP.
   - Create the `CNAME` for `www` pointing to the root domain.
   - Keep both proxied through Cloudflare.

## 2. Prepare the app config

1. Set the real `SITE_URL` in the local `.env`.
2. Set the real contact email.
3. If AdSense will be enabled later, keep it disabled until the domain is approved and the consent setup is finished.
4. Run:

```powershell
npm run build:production
```

This should fail if placeholders are still present. Fix those before upload.

## 3. Build and upload

1. Build locally:

```powershell
npm run build
```

2. Upload the contents of `dist/` into the cPanel document root for the site.
3. Make sure these generated files are included:
   - `dist/.htaccess`
   - `dist/_headers`
   - `dist/robots.txt`
   - `dist/sitemap.xml`
   - `dist/llms.txt`

## 4. Apache and HTTPS

1. In cPanel, enable AutoSSL for the domain.
2. In Cloudflare, use:
   - SSL/TLS mode: `Full (strict)`
   - Always Use HTTPS: `On`
   - Automatic HTTPS Rewrites: `On`
3. In cPanel or `.htaccess`, make sure HTTP requests redirect to HTTPS.
4. Test:
   - `https://your-domain.com/`
   - `https://www.your-domain.com/`
   - pick one canonical host and redirect the other to it through Cloudflare or Apache.

## 5. Cloudflare security baseline

Use these settings first:

- `SSL/TLS > Edge Certificates > HSTS`: enable only after HTTPS redirects and certificates are confirmed.
- `Security Level`: `Medium`
- `Bot Fight Mode`: `On`
- `WAF managed rules`: `On`
- `Browser Integrity Check`: `On`
- `Always Online`: `On`
- `Caching > Cache Rules`: cache static assets aggressively

Recommended cache rule:

- Match: `*.css`, `*.js`, `*.woff2`, `*.png`, `*.jpg`, `*.jpeg`, `*.webp`, `*.svg`, `*.pdf`
- Action: cache eligible content with long edge TTL

Do not cache HTML aggressively until launch behavior is stable.

## 6. cPanel and server hardening

1. Update cPanel packages and OS packages.
2. Disable password SSH login if key-based login is available.
3. Change the SSH port only if you know how to maintain it correctly.
4. Confirm these services stay enabled:
   - firewall
   - malware scanning
   - brute-force protection
5. Remove unused subdomains, staging folders, and old backups from public web roots.
6. Keep WordPress and this static site in separate document roots.
7. Do not store source `.env` files in the public web root.

## 7. Analytics and Search Console

Use privacy-aware analytics first, then add Google tools if needed.

### Google Analytics

1. Create a GA4 property.
2. Add the measurement ID through the site config once the final domain is set.
3. If consent mode is needed for your traffic mix, wire it before enabling personalized ads.

### Google Search Console

1. Add the domain property.
2. Verify through Cloudflare DNS TXT.
3. Submit:
   - `/sitemap.xml`

### Bing Webmaster Tools

1. Add the site.
2. Import from Search Console or verify through DNS.

## 8. Sentry

Use Sentry only if you want real front-end error reporting in production.

1. Create a Sentry project for the frontend.
2. Add the DSN as a public runtime setting only after choosing the final host strategy.
3. Capture only front-end exceptions and route changes at first.
4. Disable session replay until you intentionally configure privacy rules.

## 9. Email setup

For transactional email, do not use raw server mail if you can avoid it.

Preferred options:

1. Resend
2. Postmark
3. Mailgun

If you must use the server mailbox:

1. Create `hello@your-domain.com` in cPanel.
2. Add SPF, DKIM, and DMARC.
3. Test deliverability to Gmail and Outlook.
4. Use it for contact mail, not bulk campaigns.

## 10. AdSense readiness

Before enabling ads:

1. Confirm the privacy policy, terms, contact page, and licensing page use the real domain and email.
2. Confirm cookie/consent handling is correct for your target regions.
3. Confirm layout spacing leaves room for ads without layout shift.
4. Keep ads off until enough real content exists for review.

## 11. Launch checks

Run these after upload:

1. Open the home page and one page in each hub.
2. Open one topic page and one printable page.
3. Confirm PDF downloads work.
4. Confirm `robots.txt` and `sitemap.xml` load.
5. Confirm alternate language URLs load.
6. Confirm Cloudflare serves HTTPS without mixed-content errors.
7. Run PageSpeed on mobile and desktop.
8. Check server response headers in the browser network panel.

## 12. Ongoing operations

Weekly:

1. Check Search Console coverage and indexing.
2. Review 404s and fix internal links.
3. Watch disk usage for PDFs and previews.
4. Back up the generated content data and `public/downloads`.

Monthly:

1. Patch cPanel and server packages.
2. Review Cloudflare firewall events.
3. Review Lighthouse and Core Web Vitals.
4. Rebuild the site after large ingest batches and resubmit the sitemap if the catalog changes heavily.
