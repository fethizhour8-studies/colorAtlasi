import contentTypesData from "../data/contentTypes.json";
import hubsData from "../data/hubs.json";
import topicsData from "../data/topics.json";

export type ContentType = {
  id: string;
  slug: string;
  title: string;
  description: string;
  accent: string;
  sortOrder: number;
  seo: SeoFields;
};

export type Hub = {
  id: string;
  contentTypeId: string;
  slug: string;
  title: string;
  navTitle: string;
  description: string;
  audiences: string[];
  accent: string;
  indexable: boolean;
  seo: SeoFields;
};

export type Topic = {
  id: string;
  contentTypeId: string;
  hubId: string;
  slug: string;
  title: string;
  intro: string;
  description: string;
  audiences: string[];
  difficulty: string;
  tags: string[];
  printableType: string;
  indexable: boolean;
  quickFacts: {
    format: string;
    paperSize: string;
    license: string;
  };
  seo: SeoFields;
};

export type PrintablePage = {
  id: string;
  primaryTopicId: string;
  audience: string;
  difficulty: string;
  license: string;
  disclosure?: string;
  slugs: Record<string, string>;
  titles: Record<string, string>;
  descriptions: Record<string, string>;
  keywords: string[];
  tags?: string[];
  seo?: {
    indexable?: boolean;
  };
  files: {
    preview: string;
    thumbnail: string;
    png?: string;
    pdf: string;
  };
};

export type SeoFields = {
  title: string;
  metaDescription: string;
};

export type Crumb = {
  name: string;
  href: string;
};

const pageModules = import.meta.glob("../data/pages/*.json", { eager: true, import: "default" });

export const contentTypes = [...(contentTypesData as ContentType[])].sort((a, b) => a.sortOrder - b.sortOrder);
export const hubs = hubsData as Hub[];
export const topics = topicsData as Topic[];
export const pages = Object.values(pageModules) as PrintablePage[];

export const topNav = [
  { label: "Coloring Pages", href: "/en/coloring-pages/" },
  { label: "Printables", href: "/en/printables/" },
  { label: "Calendars", href: "/en/calendars/" },
  { label: "Mandalas", href: "/en/coloring-pages/mandalas/" },
  { label: "Worksheets", href: "/en/printables/worksheets/" },
];

export function text(record: Record<string, string> | string): string {
  return typeof record === "string" ? record : record.en;
}

export function getHomePath(): string {
  return "/en/";
}

export function getContentType(id: string): ContentType {
  const item = contentTypes.find((contentType) => contentType.id === id);
  if (!item) throw new Error(`Unknown content type: ${id}`);
  return item;
}

export function getContentTypeBySlug(slug: string): ContentType | undefined {
  return contentTypes.find((contentType) => contentType.slug === slug);
}

export function getHub(id: string): Hub {
  const item = hubs.find((hub) => hub.id === id);
  if (!item) throw new Error(`Unknown hub: ${id}`);
  return item;
}

export function getHubBySlug(contentTypeSlug: string, hubSlug: string): Hub | undefined {
  const contentType = getContentTypeBySlug(contentTypeSlug);
  if (!contentType) return undefined;
  return hubs.find((hub) => hub.contentTypeId === contentType.id && hub.slug === hubSlug);
}

export function getTopic(id: string): Topic {
  const item = topics.find((topic) => topic.id === id);
  if (!item) throw new Error(`Unknown topic: ${id}`);
  return item;
}

export function getTopicBySlug(contentTypeSlug: string, hubSlug: string, topicSlug: string): Topic | undefined {
  const hub = getHubBySlug(contentTypeSlug, hubSlug);
  if (!hub) return undefined;
  return topics.find((topic) => topic.hubId === hub.id && topic.slug === topicSlug);
}

export function getPageBySlug(contentTypeSlug: string, hubSlug: string, topicSlug: string, pageSlug: string): PrintablePage | undefined {
  const topic = getTopicBySlug(contentTypeSlug, hubSlug, topicSlug);
  if (!topic) return undefined;
  return pages.find((page) => page.primaryTopicId === topic.id && text(page.slugs) === pageSlug);
}

export function getContentTypePath(contentType: ContentType): string {
  return `/en/${contentType.slug}/`;
}

export function getHubPath(hub: Hub): string {
  return `${getContentTypePath(getContentType(hub.contentTypeId))}${hub.slug}/`;
}

export function getTopicPath(topic: Topic): string {
  return `${getHubPath(getHub(topic.hubId))}${topic.slug}/`;
}

export function getPrintablePath(page: PrintablePage): string {
  return `${getTopicPath(getTopic(page.primaryTopicId))}${text(page.slugs)}/`;
}

export function getHubsForContentType(contentTypeId: string): Hub[] {
  return hubs.filter((hub) => hub.contentTypeId === contentTypeId);
}

export function getTopicsForHub(hubId: string): Topic[] {
  return topics.filter((topic) => topic.hubId === hubId);
}

export function getTopicsForContentType(contentTypeId: string): Topic[] {
  return topics.filter((topic) => topic.contentTypeId === contentTypeId);
}

export function getPagesForTopic(topicId: string): PrintablePage[] {
  return pages.filter((page) => page.primaryTopicId === topicId);
}

export function getPagesForHub(hubId: string): PrintablePage[] {
  const topicIds = new Set(getTopicsForHub(hubId).map((topic) => topic.id));
  return pages.filter((page) => topicIds.has(page.primaryTopicId));
}

export function getPagesForContentType(contentTypeId: string): PrintablePage[] {
  const topicIds = new Set(getTopicsForContentType(contentTypeId).map((topic) => topic.id));
  return pages.filter((page) => topicIds.has(page.primaryTopicId));
}

export function getRelatedTopics(topic: Topic, limit = 4): Topic[] {
  return topics.filter((item) => item.hubId === topic.hubId && item.id !== topic.id).slice(0, limit);
}

export function getRelatedPages(page: PrintablePage, limit = 4): PrintablePage[] {
  const topic = getTopic(page.primaryTopicId);
  const sameTopic = pages.filter((item) => item.primaryTopicId === page.primaryTopicId && item.id !== page.id);
  const sameHub = getPagesForHub(topic.hubId).filter((item) => item.primaryTopicId !== page.primaryTopicId && item.id !== page.id);
  return [...sameTopic, ...sameHub].slice(0, limit);
}

export function getBreadcrumbsForContentType(contentType: ContentType): Crumb[] {
  return [
    { name: "Home", href: getHomePath() },
    { name: contentType.title, href: getContentTypePath(contentType) },
  ];
}

export function getBreadcrumbsForHub(hub: Hub): Crumb[] {
  const contentType = getContentType(hub.contentTypeId);
  return [...getBreadcrumbsForContentType(contentType), { name: hub.title, href: getHubPath(hub) }];
}

export function getBreadcrumbsForTopic(topic: Topic): Crumb[] {
  return [...getBreadcrumbsForHub(getHub(topic.hubId)), { name: topic.title, href: getTopicPath(topic) }];
}

export function getBreadcrumbsForPrintable(page: PrintablePage): Crumb[] {
  return [...getBreadcrumbsForTopic(getTopic(page.primaryTopicId)), { name: text(page.titles), href: getPrintablePath(page) }];
}

export function asAbsoluteUrl(path: string, site: URL | string): string {
  return new URL(path, site).toString();
}

export function allSitemapEntries(): Array<{ path: string; priority: string; changefreq: string }> {
  return [
    { path: getHomePath(), priority: "1.0", changefreq: "weekly" },
    ...contentTypes.map((contentType) => ({ path: getContentTypePath(contentType), priority: "0.9", changefreq: "weekly" })),
    ...hubs.map((hub) => ({ path: getHubPath(hub), priority: "0.85", changefreq: "weekly" })),
    ...topics.map((topic) => ({ path: getTopicPath(topic), priority: "0.8", changefreq: "weekly" })),
    ...pages.map((page) => ({ path: getPrintablePath(page), priority: page.seo?.indexable ? "0.55" : "0.3", changefreq: "monthly" })),
  ];
}
