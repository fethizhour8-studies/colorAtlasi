# 01 - Decisions and Non-Negotiables

## Final Stack

Website:
- Astro
- TypeScript
- Tailwind CSS
- static generation

Pipeline:
- Python CLI
- local batch processing
- no web upload in MVP

Hosting:
- cPanel static files
- Cloudflare in front

## Final Architecture

Use:

```txt
content type → hub/subcategory → topic/collection → optional individual printable
```

A topic page can be the collection page.

A separate pack/subcollection page is optional and only used when a topic is too large.

## MVP UX Rules

- no full-pack download button
- no lightboxes
- no modals
- no language switcher
- no live ads
- no dark mode
- no database
- no admin
- no login
- no public uploads

## MVP Collection Page Rules

- short intro
- quick facts
- printable grid early
- individual download buttons
- print button optional
- helpful content after grid
- FAQ if useful
- related collections

## SEO Rules

- `/en/` from day one
- English only at launch
- topic/collection pages are main SEO pages
- individual printable pages are optional and default noindex
- PDFs are usually noindex
- avoid thin pages

## Legal / Brand Safety

Never create pages or sample data around protected franchises.

Use original/generic topics.
