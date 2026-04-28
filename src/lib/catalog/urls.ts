import {
  getContentTypeById,
  getHubById,
  getTopicById,
  site,
} from "./data";
import type { ContentType, ContentTypeId, Hub, Printable, Topic } from "./types";

const trimSlashes = (segment: string): string => segment.replace(/^\/+|\/+$/g, "");

export const withTrailingSlash = (...segments: string[]): string => {
  const cleanSegments = segments.map(trimSlashes).filter(Boolean);
  return `/${cleanSegments.join("/")}/`;
};

export const getHomePath = (): string => withTrailingSlash(site.basePath);

export const getContentTypePath = (contentType: ContentType | ContentTypeId): string => {
  const record =
    typeof contentType === "string" ? getContentTypeById(contentType) : contentType;

  return withTrailingSlash(site.basePath, record.slug);
};

export const getHubPath = (hub: Hub | string): string => {
  const record = typeof hub === "string" ? getHubById(hub) : hub;
  const contentType = getContentTypeById(record.contentTypeId);

  return withTrailingSlash(site.basePath, contentType.slug, record.slug);
};

export const getTopicPath = (topic: Topic | string): string => {
  const record = typeof topic === "string" ? getTopicById(topic) : topic;
  const contentType = getContentTypeById(record.contentTypeId);
  const hub = record.hubId ? getHubById(record.hubId) : undefined;

  return withTrailingSlash(site.basePath, contentType.slug, hub?.slug ?? "", record.slug);
};

export const getPrintablePath = (printable: Printable): string => {
  const topic = getTopicById(printable.topicId);

  return withTrailingSlash(getTopicPath(topic), printable.slug);
};
