# 11 - Phase 9: Monetization Ready

## Goal

Prepare for AdSense without harming UX, trust, SEO, or performance.

No live ads until:
- enough useful content exists
- legal/trust pages exist
- no infringing content
- navigation is good
- site is not thin
- performance is acceptable

## Ad Strategy

Use in-feed ads later, not MVP.

Possible placements:
- after 6th or 8th printable card
- after a useful section
- lower related content area

Never:
- above H1
- before primary content
- inside printable cards
- between image and download button
- near buttons in a deceptive way
- styled like a download button

## Technical Plan

Create disabled `AdSlot.astro` later:
- `ADS_ENABLED=false`
- renders nothing in production if disabled
- optional dev placeholder only

Reserve space only when enabled.

## Consent

Before personalized ads to EEA/UK/Swiss users:
- Google-compatible CMP
- cookie/privacy policy updated
- no fake consent

## Analytics

Start privacy-friendly:
- Cloudflare Web Analytics
- Plausible later if needed

Avoid COPPA issues:
- do not knowingly track children
- avoid behavioral targeting to child-directed pages
- keep kids pages safe and non-invasive

## Task 9.1: Monetization Checklist

Create:
`docs/monetization_checklist.md`

## Task 9.2: Disabled Ad Slot

Create disabled ad component only when ready.

## Phase 9 Done Criteria

- no live ads unless explicitly enabled
- ad layout plan exists
- consent plan exists
- UX remains clean
