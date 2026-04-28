import { getTopicById } from "./data";
import { getContentTypePath, getHubPath, getPrintablePath, getTopicPath } from "./urls";
import type { ContentType, Hub, Printable, SeoMeta, Topic } from "./types";

export const buildContentTypeSeo = (contentType: ContentType): SeoMeta => {
  const path = getContentTypePath(contentType);

  return {
    title: contentType.seoTitle,
    description: contentType.seoDescription,
    path,
    canonicalPath: path,
    robots: "index,follow",
  };
};

export const buildHubSeo = (hub: Hub): SeoMeta => {
  const path = getHubPath(hub);

  return {
    title: hub.seoTitle,
    description: hub.seoDescription,
    path,
    canonicalPath: path,
    robots: "index,follow",
  };
};

export const buildTopicSeo = (topic: Topic): SeoMeta => {
  const path = getTopicPath(topic);

  return {
    title: topic.seoTitle,
    description: topic.seoDescription,
    path,
    canonicalPath: path,
    robots: topic.indexable ? "index,follow" : "noindex,follow",
  };
};

export const buildPrintableSeo = (printable: Printable): SeoMeta => {
  const topic = getTopicById(printable.canonicalTopicId);
  const path = getPrintablePath(printable);
  const canonicalPath = getTopicPath(topic);
  const robots = printable.indexing === "index" ? "index,follow" : "noindex,follow";

  return {
    title: printable.title,
    description: printable.description,
    path,
    canonicalPath,
    robots,
  };
};
