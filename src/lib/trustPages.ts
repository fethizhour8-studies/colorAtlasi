export type TrustPage = {
  slug: string;
  title: string;
  description: string;
  sections: Array<{
    heading: string;
    body: string[];
  }>;
};

const siteName = "Coloring Atlas";
const contactEmail = import.meta.env.PUBLIC_CONTACT_EMAIL || "hello@your-domain.com";

export const trustPages: TrustPage[] = [
  {
    slug: "about",
    title: "About Coloring Atlas",
    description: "Learn about Coloring Atlas, a library of printable coloring pages and classroom-friendly PDFs.",
    sections: [
      {
        heading: "Our purpose",
        body: [
          `${siteName} is being built as a simple library of printable coloring pages, coloring sheets, calendars, and classroom-friendly activity pages.`,
          "The goal is to help parents, teachers, and creative adults find clean PDF printables quickly without confusing downloads or complicated tools.",
        ],
      },
      {
        heading: "How printables are made",
        body: [
          "Printables may be created with original illustration workflows, AI-assisted image generation, manual cleanup, and PDF formatting. Each published file should be reviewed before it appears on the site.",
          "We avoid intentionally publishing unlicensed copyrighted characters, brand logos, celebrity likenesses, or trademarked material unless rights are clearly available.",
        ],
      },
    ],
  },
  {
    slug: "contact",
    title: "Contact",
    description: "Contact Coloring Atlas about printables, licensing, corrections, and site questions.",
    sections: [
      {
        heading: "General contact",
        body: [
          `For questions, corrections, or business requests, contact ${contactEmail}.`,
          "Before launch, replace this email with your final domain email so users, schools, and ad partners can reach you.",
        ],
      },
      {
        heading: "What to include",
        body: [
          "For a printable issue, include the page URL and a short description of the problem.",
          "For rights or takedown questions, include the page URL, your relationship to the work, and enough detail to review the request.",
        ],
      },
    ],
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: "Privacy information for Coloring Atlas visitors, downloads, analytics, cookies, and advertising.",
    sections: [
      {
        heading: "Information we collect",
        body: [
          "The static website can be browsed without creating an account. Standard server logs may include request details such as IP address, browser, visited pages, and timestamps.",
          "If analytics, advertising, or contact forms are added, those tools may process cookies, device data, and usage signals according to their own policies.",
        ],
      },
      {
        heading: "Advertising and cookies",
        body: [
          "If Google AdSense is enabled, Google and its partners may use cookies or similar technologies to serve and measure ads.",
          "Do not enable personalized ads, consent banners, or third-party tracking until the final privacy setup matches your deployment country and traffic regions.",
          "For EEA, UK, and Swiss visitors, advertising should not be enabled until a Google-certified consent management platform is configured where required.",
        ],
      },
      {
        heading: "Contact",
        body: [`Privacy questions can be sent to ${contactEmail}. Replace this address with the final production email before launch.`],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms and Conditions",
    description: "Terms for using Coloring Atlas printable downloads and website pages.",
    sections: [
      {
        heading: "Use of printables",
        body: [
          "Unless a page says otherwise, printables are offered for personal, classroom, and non-commercial use.",
          "You may print copies for home, school, or small group activities. You may not resell the files, upload them as your own product, or redistribute the download library in bulk.",
        ],
      },
      {
        heading: "Website use",
        body: [
          "Do not scrape the site at high volume, bypass security controls, interfere with the website, or use downloads in a way that violates another party's rights.",
          "The site may change, remove, or update pages and files as the catalogue grows.",
        ],
      },
    ],
  },
  {
    slug: "takedown-policy",
    title: "Takedown Policy",
    description: "How to request review or removal of a printable page on Coloring Atlas.",
    sections: [
      {
        heading: "Rights concerns",
        body: [
          "If you believe a page or downloadable file infringes your rights, send a review request with the page URL, the work involved, your contact details, and a clear explanation of the issue.",
          `Requests can be sent to ${contactEmail}. Replace this address with the final production email before launch.`,
        ],
      },
      {
        heading: "Review process",
        body: [
          "We may remove, update, or disable access to files while reviewing a credible request.",
          "Pages involving unlicensed brand characters, logos, or copyrighted characters should not be part of the automated publishing workflow.",
        ],
      },
    ],
  },
  {
    slug: "licensing",
    title: "Licensing",
    description: "Licensing rules for Coloring Atlas printable coloring pages and classroom PDFs.",
    sections: [
      {
        heading: "Default license",
        body: [
          "The default download license is free for personal, classroom, and non-commercial use.",
          "Commercial redistribution, resale, print-on-demand uploads, paid bundles, and mass reposting require written permission.",
        ],
      },
      {
        heading: "Commercial requests",
        body: [
          `For commercial licensing or partnership questions, contact ${contactEmail}.`,
          "Before launch, update this page with your final brand name, domain, and business email.",
        ],
      },
    ],
  },
];

export function getTrustPage(slug: string): TrustPage | undefined {
  return trustPages.find((page) => page.slug === slug);
}

export function trustPageAlternates(slug: string) {
  const path = `/en/${slug}/`;
  return [
    { locale: "en", path },
    { locale: "x-default" as const, path },
  ];
}
