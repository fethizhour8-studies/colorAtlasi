# 09 - Phase 7: Security and Deployment

## Goal

Deploy the static site safely to cPanel with Cloudflare.

## Rule

Upload only:

```txt
site/dist/
```

Never upload:
```txt
.env
.git/
node_modules/
package.json
package-lock.json
pipeline/
incoming/
content/
archive/
raw source images
manifests
credentials
scripts
```

## cPanel

Do:
- separate addon domain/account if possible
- isolate from WordPress
- AutoSSL or Cloudflare Full Strict
- disable directory listing
- SFTP/SSH, not FTP
- strong password + 2FA
- ModSecurity if available
- files 644
- folders 755
- no writable public upload folder

## Cloudflare

Enable:
- Full Strict SSL
- Always Use HTTPS
- Brotli
- WAF managed rules
- bot protection
- rate limiting for `/downloads/*`
- long cache for assets/downloads

Cache:
```txt
/assets/*       long cache
/downloads/*    long cache
/*.html         standard or short cache
```

## Security Headers

Before ads:

```txt
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
X-Frame-Options: SAMEORIGIN
Content-Security-Policy: default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self';
```

AdSense requires a revised CSP later. Do not disable CSP casually.

## Backups

Back up:
- source images
- processed images
- PDFs
- metadata
- site code
- pipeline code
- reports

Use:
- Git for code/metadata
- external/cloud backup for large assets
- weekly full backup
- restore test monthly

## Task 7.1: Deployment Checklist

Create/update `docs/deployment_checklist.md`.

## Task 7.2: Example `.htaccess`

Create an example static `.htaccess` for Apache headers and directory listing prevention.

## Phase 7 Done Criteria

- deploy procedure documented
- private files excluded
- Cloudflare settings documented
- build output deployable
