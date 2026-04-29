import {
  contentTypes,
  getContentTypePath,
  getHubPath,
  getPrintablePath,
  getPrintablesForTopic,
  getPublicTopics,
  getTopicPath,
  hubs,
  printables,
  topics,
} from "@/lib/catalog";

const collectionItems = getPublicTopics(topics).map((topic) => ({
  type: "Collection",
  title: topic.title,
  description: topic.description,
  url: getTopicPath(topic),
  tags: topic.tags,
  count: getPrintablesForTopic(topic.id).length,
}));

const printableItems = printables.map((printable) => ({
  type: "Printable",
  title: printable.title,
  description: printable.description,
  url: getPrintablePath(printable),
  tags: printable.tags,
  count: 1,
}));

const hubItems = hubs.map((hub) => ({
  type: "Hub",
  title: hub.title,
  description: hub.description,
  url: getHubPath(hub),
  tags: [hub.slug, hub.contentTypeId],
  count: 0,
}));

const contentTypeItems = contentTypes.map((contentType) => ({
  type: "Category",
  title: contentType.title,
  description: contentType.description,
  url: getContentTypePath(contentType),
  tags: [contentType.slug],
  count: 0,
}));

export const GET = () =>
  new Response(JSON.stringify([...collectionItems, ...printableItems, ...hubItems, ...contentTypeItems]), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
