import {
  contentTypes,
  getContentTypePath,
  getHomePath,
  getHubPath,
  getTopicPath,
  hubs,
  topics,
} from "@/lib/catalog";

const siteUrl = (import.meta.env.SITE || "https://example.com").replace(/\/$/, "");

const lines = [
  "# Color Atlas",
  "",
  "Color Atlas is a static catalogue of free printable coloring pages, worksheets, calendars, planners, mandalas, and classroom-friendly PDF resources.",
  "",
  "## Primary pages",
  `- Home: ${siteUrl}${getHomePath()}`,
  ...contentTypes.map((item) => `- ${item.title}: ${siteUrl}${getContentTypePath(item)} - ${item.description}`),
  "",
  "## Hubs",
  ...hubs.map((item) => `- ${item.title}: ${siteUrl}${getHubPath(item)} - ${item.description}`),
  "",
  "## Indexable collections",
  ...topics.filter((item) => item.indexable).map((item) => `- ${item.title}: ${siteUrl}${getTopicPath(item)} - ${item.description}`),
  "",
  "## Usage notes",
  "Individual printable pages may be noindexed when they are thin and canonicalize to stronger collection pages.",
  "The site avoids copyrighted characters, brands, logos, and trademark-dependent printable topics.",
].join("\n");

export const GET = () =>
  new Response(`${lines}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
