import rawCatalog from "@/data/catalog.json";
import type { Catalog, ContentType, ContentTypeId, Hub, Printable, Topic } from "./types";

export const catalog = rawCatalog as Catalog;

const byOrder = <T extends { order: number; title: string }>(items: T[]): T[] =>
  [...items].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

const findRequired = <T extends { id: string }>(items: T[], id: string, label: string): T => {
  const item = items.find((entry) => entry.id === id);

  if (!item) {
    throw new Error(`Missing ${label}: ${id}`);
  }

  return item;
};

export const site = catalog.site;
export const contentTypes = byOrder(catalog.contentTypes);
export const hubs = byOrder(catalog.hubs);
export const topics = byOrder(catalog.topics);
export const printables = byOrder(catalog.printables);

export const getContentTypeById = (id: ContentTypeId): ContentType =>
  findRequired(contentTypes, id, "content type");

export const getHubById = (id: string): Hub => findRequired(hubs, id, "hub");

export const getTopicById = (id: string): Topic => findRequired(topics, id, "topic");

export const getPrintableById = (id: string): Printable =>
  findRequired(printables, id, "printable");

export const getHubsForContentType = (contentTypeId: ContentTypeId): Hub[] =>
  hubs.filter((hub) => hub.contentTypeId === contentTypeId);

export const getTopicsForContentType = (contentTypeId: ContentTypeId): Topic[] =>
  topics.filter((topic) => topic.contentTypeId === contentTypeId);

export const getTopicsForHub = (hubId: string): Topic[] =>
  topics.filter((topic) => topic.hubId === hubId);

export const getRootTopicsForContentType = (contentTypeId: ContentTypeId): Topic[] =>
  topics.filter((topic) => topic.contentTypeId === contentTypeId && !topic.hubId);

export const getPrintablesForTopic = (topicId: string): Printable[] =>
  printables.filter((printable) => printable.topicId === topicId);

export const hasPrintables = (topic: Topic): boolean => getPrintablesForTopic(topic.id).length > 0;

export const getPublicTopics = (items: Topic[]): Topic[] => items.filter(hasPrintables);

export const getPublicTopicsForHub = (hubId: string): Topic[] => getPublicTopics(getTopicsForHub(hubId));

export const getPublicRootTopicsForContentType = (contentTypeId: ContentTypeId): Topic[] =>
  getPublicTopics(getRootTopicsForContentType(contentTypeId));

export const getRelatedTopics = (topic: Topic): Topic[] =>
  topic.relatedTopicIds.map((id) => getTopicById(id));

export const getPublicRelatedTopics = (topic: Topic): Topic[] => getPublicTopics(getRelatedTopics(topic));
