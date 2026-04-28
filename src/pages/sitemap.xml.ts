import {
  contentTypes,
  getContentTypePath,
  getHomePath,
  getHubPath,
  getPrintablePath,
  getTopicPath,
  hubs,
  printables,
  topics,
} from "@/lib/catalog";

const siteUrl = (import.meta.env.SITE || "https://example.com").replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);

const entries = [
  { path: getHomePath(), priority: "1.0", changefreq: "weekly" },
  ...contentTypes.map((item) => ({ path: getContentTypePath(item), priority: "0.9", changefreq: "weekly" })),
  ...hubs.map((item) => ({ path: getHubPath(item), priority: "0.85", changefreq: "weekly" })),
  ...topics
    .filter((item) => item.indexable)
    .map((item) => ({ path: getTopicPath(item), priority: "0.8", changefreq: "weekly" })),
  ...printables
    .filter((item) => item.indexing === "index")
    .map((item) => ({ path: getPrintablePath(item), priority: "0.45", changefreq: "monthly" })),
];

const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${siteUrl}${entry.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

export const GET = () =>
  new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
