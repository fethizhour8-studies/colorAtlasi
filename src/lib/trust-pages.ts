export type TrustPageSlug =
  | "about"
  | "contact"
  | "privacy-policy"
  | "terms"
  | "licensing"
  | "dmca"
  | "how-to-print"
  | "ai-assisted-content-policy";

interface TrustPageSection {
  heading: string;
  paragraphs: string[];
}

export interface TrustPageContent {
  slug: TrustPageSlug;
  title: string;
  eyebrow: string;
  description: string;
  updated: string;
  sections: TrustPageSection[];
}

export const trustPages: Record<TrustPageSlug, TrustPageContent> = {
  about: {
    slug: "about",
    title: "About Color Atlas",
    eyebrow: "About",
    description:
      "Color Atlas is a static-first printable catalogue for coloring pages, worksheets, calendars, planners, and classroom resources.",
    updated: "April 2026",
    sections: [
      {
        heading: "What this site is",
        paragraphs: [
          "Color Atlas is being built as a calm, organized library of free printable content. The goal is to make printable pages easy to browse, inspect, download, and use without forcing visitors through accounts, popups, or confusing download flows.",
          "The site focuses on strong topic and collection pages instead of thousands of thin item pages. That structure helps parents, teachers, and adult colorers find useful sets of printables more quickly.",
        ],
      },
      {
        heading: "How the catalogue is organized",
        paragraphs: [
          "Content is organized by printable type, then by hub or subcategory, then by topic or collection. Individual printable pages are optional and usually point back to the stronger collection page.",
          "This structure keeps the site simple at launch while leaving room to scale to a much larger printable library later.",
        ],
      },
      {
        heading: "Content standards",
        paragraphs: [
          "Color Atlas avoids copyrighted and trademarked characters, franchises, logos, and fan-art themes. Starter collections use safe original alternatives such as wizard school, farm animals, mandalas, calendars, planners, and classroom worksheets.",
          "The site is built to be static, fast, and low-maintenance, with no database, no public upload form, and no user accounts at launch.",
        ],
      },
    ],
  },
  contact: {
    slug: "contact",
    title: "Contact",
    eyebrow: "Contact",
    description:
      "Contact Color Atlas about printable corrections, licensing questions, takedown requests, or general site questions.",
    updated: "April 2026",
    sections: [
      {
        heading: "How to reach the site owner",
        paragraphs: [
          "Before launch, replace this placeholder with the public contact email for the site. Use one address consistently across Contact, DMCA, Privacy Policy, and Terms pages.",
          "Suggested format: contact@your-domain.com.",
        ],
      },
      {
        heading: "What to include",
        paragraphs: [
          "For printable corrections, include the page URL and a short explanation of the problem.",
          "For licensing or classroom-use questions, include the printable or collection URL and describe the intended use.",
          "For takedown requests, include the exact URL, your contact information, and enough detail to identify the content in question.",
        ],
      },
      {
        heading: "No public uploads",
        paragraphs: [
          "Color Atlas does not accept public uploads, user accounts, or visitor-submitted printable files at launch. This keeps the site safer, simpler, and easier to maintain.",
        ],
      },
    ],
  },
  "privacy-policy": {
    slug: "privacy-policy",
    title: "Privacy Policy",
    eyebrow: "Privacy",
    description:
      "Privacy policy for Color Atlas, a static printable catalogue with no accounts, no public uploads, and no live advertising during the MVP.",
    updated: "April 2026",
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Color Atlas is designed as a static-first website. At MVP launch, the site does not provide user accounts, public uploads, comments, checkout, or a public admin area.",
          "This policy describes the intended privacy posture for the MVP. It should be reviewed and updated before enabling analytics, advertising, email forms, or any third-party service that collects visitor data.",
        ],
      },
      {
        heading: "Information visitors provide",
        paragraphs: [
          "The MVP does not include a contact form or account system. If visitors contact the site owner by email, the information they send may be used to respond to that message.",
          "Visitors should not send sensitive personal information through email unless it is necessary for the request.",
        ],
      },
      {
        heading: "Hosting and server logs",
        paragraphs: [
          "Like most websites, the hosting provider, server, CDN, or security service may process technical information such as IP address, browser type, request URL, referrer, and timestamp.",
          "These logs are used for security, troubleshooting, performance, and abuse prevention.",
        ],
      },
      {
        heading: "Advertising and analytics",
        paragraphs: [
          "Color Atlas does not run live ads during the MVP. If advertising, analytics, or similar third-party tools are added later, this policy should be updated before those tools go live.",
          "Future advertising slots must be visually distinct from download buttons and must not appear between a printable preview and its download button.",
        ],
      },
    ],
  },
  terms: {
    slug: "terms",
    title: "Terms of Use",
    eyebrow: "Terms",
    description:
      "Terms of use for browsing, downloading, printing, and using Color Atlas printable files.",
    updated: "April 2026",
    sections: [
      {
        heading: "Using the site",
        paragraphs: [
          "By using Color Atlas, visitors agree to use the site and printable files lawfully and respectfully.",
          "The site is provided as a free printable catalogue. Availability, content, filenames, URLs, and download paths may change as the catalogue grows.",
        ],
      },
      {
        heading: "Printable downloads",
        paragraphs: [
          "Printable files are provided for personal, home, and classroom use unless a page states otherwise.",
          "Visitors may print pages for individual use, family activities, classroom packets, and similar non-commercial settings.",
        ],
      },
      {
        heading: "Restrictions",
        paragraphs: [
          "Visitors may not resell Color Atlas printable files, upload them as standalone products on other platforms, claim the files as their own original work, or use them in a way that suggests endorsement by Color Atlas.",
          "Visitors may link to Color Atlas pages, but should not hotlink, scrape, or bulk-download files in a way that harms site performance.",
        ],
      },
      {
        heading: "No professional advice",
        paragraphs: [
          "Educational worksheets and planning pages are provided as general printable resources. They are not professional educational, legal, financial, medical, or therapeutic advice.",
        ],
      },
    ],
  },
  licensing: {
    slug: "licensing",
    title: "Licensing",
    eyebrow: "License",
    description:
      "Plain-language licensing information for Color Atlas printable pages and PDF downloads.",
    updated: "April 2026",
    sections: [
      {
        heading: "Allowed use",
        paragraphs: [
          "Unless a specific page says otherwise, Color Atlas printables may be downloaded and printed for personal use, family use, classroom use, homeschool use, library activities, and similar non-commercial settings.",
          "Teachers may include printed pages in classroom packets and activities for their own students.",
        ],
      },
      {
        heading: "Not allowed",
        paragraphs: [
          "Do not sell the PDF files, sell printed copies as standalone products, upload the files to marketplaces, include them in paid digital bundles, or redistribute the files as if they are your own.",
          "Do not remove source notes, alter files to misrepresent ownership, or use Color Atlas files to train, market, or populate another printable catalogue.",
        ],
      },
      {
        heading: "Linking is welcome",
        paragraphs: [
          "You may share links to Color Atlas collection pages. Linking to the HTML page is preferred over linking directly to raw PDF files because the page contains context, usage notes, and related resources.",
        ],
      },
    ],
  },
  dmca: {
    slug: "dmca",
    title: "DMCA and Takedown Policy",
    eyebrow: "Takedown",
    description:
      "DMCA and takedown policy for Color Atlas printable pages, previews, and PDF files.",
    updated: "April 2026",
    sections: [
      {
        heading: "Content safety approach",
        paragraphs: [
          "Color Atlas is designed to avoid copyrighted and trademarked characters, franchises, logos, and fan-art themes. The catalogue uses original generic alternatives instead.",
          "If you believe content on the site infringes your rights, send a detailed takedown request to the public contact email listed on the Contact page before launch.",
        ],
      },
      {
        heading: "What to include",
        paragraphs: [
          "Include the exact URL of the page or file, a description of the copyrighted work, your contact information, a statement that you believe the use is unauthorized, and a statement that the information in your notice is accurate.",
          "If you are acting on behalf of a rights owner, include information showing that you are authorized to act for that owner.",
        ],
      },
      {
        heading: "Review process",
        paragraphs: [
          "Takedown requests should be reviewed promptly. If a request appears valid, the affected content can be removed or disabled while the issue is evaluated.",
          "Repeat or bad-faith abuse reports may not receive a detailed response.",
        ],
      },
    ],
  },
  "how-to-print": {
    slug: "how-to-print",
    title: "How to Print",
    eyebrow: "Printing help",
    description:
      "Simple printing guidance for Color Atlas PDF coloring pages, worksheets, calendars, and planner pages.",
    updated: "April 2026",
    sections: [
      {
        heading: "Basic steps",
        paragraphs: [
          "Open the printable collection, choose the page you want, and select Download PDF. Open the PDF in your browser or PDF reader, then print from that program.",
          "Use standard letter-size paper unless the page says otherwise. For most coloring pages and worksheets, printing at actual size or 100% gives the most predictable result.",
        ],
      },
      {
        heading: "Printer settings",
        paragraphs: [
          "If part of the page is cut off, try Fit to printable area. If the page looks too small, switch back to actual size or 100%.",
          "For coloring pages, black-and-white or grayscale printing is usually enough. For planners and calendars, choose the setting that gives the clearest lines on your printer.",
        ],
      },
      {
        heading: "Classroom use",
        paragraphs: [
          "Teachers can print a sample page first before making a full classroom set. This helps catch printer margin differences, paper orientation issues, and low-ink settings.",
        ],
      },
    ],
  },
  "ai-assisted-content-policy": {
    slug: "ai-assisted-content-policy",
    title: "AI-Assisted Content Policy",
    eyebrow: "Content policy",
    description:
      "How Color Atlas handles AI-assisted printable concepts, review, safety, and publishing standards.",
    updated: "April 2026",
    sections: [
      {
        heading: "AI-assisted workflow",
        paragraphs: [
          "Color Atlas may use AI-assisted tools during concepting, drafting, layout exploration, or image preparation. AI assistance does not replace human review before publication.",
          "Published content should be checked for safe themes, useful filenames, clean previews, printable formatting, and basic quality standards.",
        ],
      },
      {
        heading: "Original themes only",
        paragraphs: [
          "The catalogue avoids prompts, images, and page concepts based on copyrighted or trademarked franchises, characters, logos, games, movies, or television shows.",
          "Safer original alternatives include themes such as wizard school, magic academy, fairy tale princesses, ice princesses, fantasy castles, cute animals, vehicles, holidays, mandalas, calendars, planners, and educational worksheets.",
        ],
      },
      {
        heading: "Human review",
        paragraphs: [
          "Before content is published, it should be reviewed for obvious visual errors, confusing anatomy, inappropriate details, unsafe topics, spelling issues, and poor print quality.",
          "Thin individual printable pages should usually remain noindex and canonicalize to the stronger topic or collection page unless they contain unique value.",
        ],
      },
      {
        heading: "Corrections",
        paragraphs: [
          "If a visitor notices a problem with a printable, they can report it through the Contact page. Problematic files can be corrected, replaced, unpublished, or redirected as needed.",
        ],
      },
    ],
  },
};

export const getTrustPage = (slug: TrustPageSlug): TrustPageContent => trustPages[slug];
