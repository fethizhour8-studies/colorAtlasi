# 12 - Phase 10: Scale Ready

## Goal

Prepare for tens of thousands of files without overbuilding too early.

## Stage 1: Static MVP

- Astro static
- JSON/YAML metadata
- local assets
- cPanel
- Cloudflare

## Stage 2: Static + Object Storage

Move:
- previews
- thumbnails
- social images
- PDFs

To:
- Cloudflare R2 or S3-compatible storage

Keep:
- Astro static pages
- metadata files if manageable

## Stage 3: Database-Backed Content

Only when needed:
- MariaDB/Postgres
- private admin dashboard
- object storage
- search service

## Stage 4: Large Catalog Platform

Add:
- database
- object storage
- CDN
- search
- queue processing
- editorial workflow
- private admin
- localization workflow

## Search Scaling

Launch:
- Pagefind

Later:
- Typesense
- Meilisearch
- Algolia
- database-backed search

## Data Rules for Migration

Every entity needs:
- stable ID
- slug
- locale
- type
- contentTypeId
- hubId
- topicId
- printableId
- asset paths
- createdAt
- updatedAt
- indexable
- canonical target

## Phase 10 Done Criteria

This is mostly a plan until scale requires it.

Do not implement too early.
