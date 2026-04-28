# Next Roadmap

## Decision Notes

- Keep the warm palette for now. It fits parents, teachers, and kids better than a cold SaaS interface, and the site still needs to feel organized rather than childish.
- Keep the launch stack static. It is cheaper, safer, and easy to host on Cloudflare Pages, Vercel, Netlify, or cPanel static hosting. Move to a database only when catalogue operations become painful.
- Offer PDF as the main download. The site still generates WebP previews because fast image previews help users and search engines, but the public call-to-action should be the print-ready PDF.

## Work Slices

1. Header and printable pipeline polish. Done.
2. Add trust pages for AdSense: About, Contact, Privacy Policy, Terms, Takedown/DMCA, Licensing. Done.
3. Build longer category templates with printable grid, guidance, FAQ, and safe ad slots. Done.
4. Add production security, AdSense readiness, generated headers, consent notes, and launch checks. Done.
5. Add blog/resource section for useful evergreen articles: color mixing, classroom printing tips, paper sizes, seasonal activity ideas.
6. Add optional API generation scripts for OpenAI and Gemini, guarded by environment variables and quota controls.
7. Add host-specific deployment notes after choosing cPanel, Cloudflare Pages, Vercel, or another target.

## AdSense Layout Direction

Ad slots should be reserved but not intrusive:

- One responsive slot after the intro, clearly labeled "Advertisement".
- One in-content slot after a meaningful block of text or after 6-8 printables.
- One sidebar slot on desktop only.
- No ads that look like download buttons, navigation, or related printable links.
- No ad slot immediately next to the PDF download button.

The goal is longer, useful pages, not forced scrolling. Google policies care about user value, clear navigation, and avoiding misleading ad placement.
