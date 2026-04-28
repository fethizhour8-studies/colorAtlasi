import type { APIRoute } from "astro";
import {
  asAbsoluteUrl,
  contentTypes,
  getContentTypePath,
  getHubPath,
  getPrintablePath,
  getTopicPath,
  hubs,
  pages,
  text,
  topics,
} from "@lib/catalog";
import { trustPages } from "@lib/trustPages";

export const GET: APIRoute = ({ site }) => {
  const base = site || new URL("https://example.com");
  const lines = [
    "# Coloring Atlas",
    "",
    "Free printable coloring pages, coloring sheets, mandalas, calendars, worksheets, and classroom-friendly PDF resources.",
    "The canonical HTML pages and XML sitemap are authoritative. Individual printable pages may be noindex when thin; topic collection pages are the main SEO pages.",
    "",
    "## Main Pages",
    `- Home: ${asAbsoluteUrl("/en/", base)}`,
    `- Sitemap: ${asAbsoluteUrl("/sitemap.xml", base)}`,
    "",
    "## Content Types",
    ...contentTypes.map((item) => `- ${item.title}: ${asAbsoluteUrl(getContentTypePath(item), base)}`),
    "",
    "## Hubs",
    ...hubs.map((hub) => `- ${hub.title}: ${asAbsoluteUrl(getHubPath(hub), base)}`),
    "",
    "## Topic Collections",
    ...topics.map((topic) => `- ${topic.title}: ${asAbsoluteUrl(getTopicPath(topic), base)}`),
    "",
    "## Sample Printables",
    ...pages.slice(0, 30).map((page) => `- ${text(page.titles)}: ${asAbsoluteUrl(getPrintablePath(page), base)}`),
    "",
    "## Trust Pages",
    ...trustPages.map((page) => `- ${page.title}: ${asAbsoluteUrl(`/en/${page.slug}/`, base)}`),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
