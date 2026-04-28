import type { APIRoute } from "astro";
import { allSitemapEntries, asAbsoluteUrl } from "@lib/catalog";
import { trustPages } from "@lib/trustPages";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const GET: APIRoute = ({ site }) => {
  const base = site || new URL("https://example.com");
  const lastmod = new Date().toISOString().split("T")[0];
  const entries = [
    ...allSitemapEntries(),
    ...trustPages.map((page) => ({ path: `/en/${page.slug}/`, priority: "0.4", changefreq: "yearly" })),
  ];
  const urls = entries
    .map((entry) =>
      [
        "<url>",
        `<loc>${escapeXml(asAbsoluteUrl(entry.path, base))}</loc>`,
        `<lastmod>${lastmod}</lastmod>`,
        `<changefreq>${entry.changefreq}</changefreq>`,
        `<priority>${entry.priority}</priority>`,
        "</url>",
      ].join(""),
    )
    .join("");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
