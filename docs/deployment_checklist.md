# Deployment Checklist

## Build

```bash
cd site
npm install
npm run build
```

Output:

```txt
site/dist/
```

## Upload Only

Upload contents of:

```txt
site/dist/
```

## Never Upload

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
manifest.yaml
credentials
scripts
```

## cPanel

- separate addon domain/account if possible
- isolate from WordPress
- disable directory listing
- use SFTP/SSH
- files 644
- folders 755
- AutoSSL or Cloudflare Full Strict
- ModSecurity if available

## Cloudflare

Enable:
- Full Strict SSL
- Always Use HTTPS
- Brotli
- WAF managed rules
- bot protection
- rate limiting for `/downloads/*`

Cache:
- `/assets/*`: long cache
- `/downloads/*`: long cache
- HTML: shorter cache

## Rollback

Keep previous deployment backup:

```txt
backups/deployments/YYYY-MM-DD-HHMM/
```

Rollback by restoring previous static files.
