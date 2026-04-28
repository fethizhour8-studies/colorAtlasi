# Launch Content, SEO, GEO, and Branding Roadmap

This roadmap is for the current Astro static catalogue structure. It focuses on launching quickly with safe, useful printable content while leaving room for future language expansion.

## 1. Safe keyword clusters to prioritize

The uploaded keyword workbook points toward several strong, non-copyright directions. Use these first before chasing protected character searches.

### Highest-priority launch clusters

1. General coloring pages
   - coloring pages
   - free coloring pages
   - coloring sheets
   - printable coloring pages

2. Kids evergreen
   - coloring pages for kids
   - cute coloring pages
   - rainbow coloring pages
   - train coloring pages
   - fruit coloring pages

3. Animals
   - farm animals coloring pages
   - cat coloring pages
   - dog coloring pages
   - bear coloring pages
   - ocean animals coloring pages
   - butterfly coloring pages

4. Dinosaurs
   - dinosaur coloring pages
   - ankylosaurus coloring pages
   - brachiosaurus coloring pages
   - therizinosaurus coloring pages
   - parasaurolophus coloring pages

5. Mandalas and adult coloring
   - mandala coloring pages
   - adult coloring pages
   - relaxing coloring pages
   - floral mandala coloring pages
   - geometric mandala coloring pages

6. Calendars and planning
   - 2026 calendar
   - printable calendar
   - monthly calendar
   - weekly planner printable

7. Worksheets and activity pages
   - preschool counting worksheets
   - connect the dots printable
   - dot to dot printables
   - color by number printable

## 2. Avoid by default

Do not build pages around protected or risky intent:

- Disney, Pixar, Marvel, Nintendo, Sanrio, Nickelodeon, Paw Patrol, Bluey, Pokemon, Minecraft, Barbie, Sonic, or similar brand/franchise terms
- exact TV/movie/game/anime/toy character names
- celebrities, influencers, brand logos, sports teams, mascots, or costumes
- anything where searchers clearly expect a recognizable copyrighted design

Use original alternatives instead:

- wizard school instead of a protected wizard franchise
- ice princess instead of a specific movie character
- block adventure instead of a specific game brand
- puppy rescue only if fully original and non-infringing
- fantasy castle, dragon, fairy tale, animals, mandalas, calendars, worksheets

## 3. Content expansion order

Do not create too many thin collections. Add multiple usable PDFs per topic first.

Recommended launch order:

1. Strengthen existing topics with 4 to 8 PDFs each.
2. Add Kids: cute, rainbow, train, fruit, simple shapes.
3. Add Animals: cats, dogs, ocean animals, butterflies, frogs, bears.
4. Add Dinosaurs: main dinosaur collection plus 3 to 5 individual species collections if there are enough pages.
5. Add Adults: relaxing, cozy scenes, floral mandalas, geometric mandalas.
6. Add Calendars: 2026 yearly, monthly calendars, blank monthly calendar.
7. Add Worksheets: counting, dot-to-dot, color-by-number.

## 4. Topic page content requirements

Each indexable topic should include:

- H1 matching the safe keyword target
- short intro that says exactly what the collection includes
- quick facts
- printable grid early on the page
- download button under each card
- helpful usage content
- printing tips
- related collections
- FAQ
- license/trust note

Current topic pages already support these sections. Keep adding catalogue data and PDFs rather than creating a new template for every topic.

## 5. Competitor-inspired structure without copying

MondayMandala-style sites often use:

- clear top navigation
- big collection grids
- seasonal sections
- calendar sections
- trust/legal links
- download instructions
- related topics
- high-volume character pages

Use the structure ideas, not the risky protected-character strategy. This site should win on original, safe, organized, classroom-friendly printables.

## 6. GEO / AI discovery plan

Keep pages easy for AI systems to understand:

- use direct section headings
- say what is included
- say who it is for
- say how to print
- link related collections
- keep `llms.txt` current as the catalogue grows
- keep individual thin printable pages noindex unless they become substantial

## 7. Future multilingual plan

Keep English as the launch locale. The `/en/` structure is already in place.

Future locale path pattern:

- `/en/`
- `/es/`
- `/fr/`
- `/pt/`
- `/de/`

Implementation recommendation:

- keep IDs language-neutral
- add localized slug/title/description fields later
- localize content-type pages first
- localize top-performing topic pages second
- add `hreflang` only when equivalent translated pages are live
- do not show a language switcher until at least one second language is real

## 8. Analytics and monitoring

Use Plausible or another privacy-light analytics provider first.

Track:

- page views by collection
- PDF downloads by file
- top referrers
- 404s from hosting logs
- build errors
- large asset regressions
- topics with views but low downloads
- topics with downloads but low traffic

Do not collect personal data unless the privacy policy and consent model are updated.

## 9. Security checklist

Before launch:

- set `SITE_URL`
- keep `.env` out of git
- run `npm run build`
- confirm `dist/_headers` exists for static hosts
- confirm `dist/.htaccess` exists for cPanel/Apache
- upload only `dist/`
- do not upload `.git`, `node_modules`, raw sources, manifests, or credentials
- use Cloudflare SSL/CDN/WAF if possible

## 10. Naming and domain ideas

Do not lock into Color Atlas if a better domain is available. Choose a simple name that says printable/coloring clearly.

Best practical domain directions to check manually:

- PrintColoring.com
- EasyColoringPages.com
- FreeColoringPages.co
- ColoringPagePrints.com
- PrintablesGarden.com
- HappyPrintables.com
- ColoringShelf.com
- PrintPageKids.com
- SimpleColoringPages.com
- PDFColoringPages.com

If available, strongest options for SEO clarity and memory:

1. EasyColoringPages.com
2. PrintColoring.com
3. SimpleColoringPages.com
4. ColoringPagePrints.com
5. ColoringShelf.com

A broader name like HappyPrintables or PrintablesGarden gives room for calendars and worksheets, but a coloring-focused name is clearer for the first launch.

## 11. Next design/card ideas

Future small UI improvements:

- add audience chips to printable cards: Kids, Adults, Teachers
- add difficulty chips: Easy, Medium, Detailed
- add format chips: PDF, Letter
- add seasonal ribbons for timely pages
- add topic count badges on hubs
- add a simple search later with Pagefind after content grows
- add disabled ad placeholders only after content and UX are stable

Do not add live ads during MVP.
