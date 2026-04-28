import {
  asAbsoluteUrl,
  getBreadcrumbsForPrintable,
  getContentTypePath,
  getHub,
  getHubPath,
  getHomePath,
  getPrintablePath,
  getTopic,
  getTopicPath,
  text,
  type ContentType,
  type Crumb,
  type Hub,
  type PrintablePage,
  type Topic,
} from "./catalog";

export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function robotsForIndexable(indexable = true): string {
  return indexable ? "index,follow,max-image-preview:large" : "noindex,follow";
}

export function breadcrumbJsonLd(crumbs: Crumb[], site: URL | string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: asAbsoluteUrl(crumb.href, site),
    })),
  };
}

export function websiteJsonLd(site: URL | string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Coloring Atlas",
    url: asAbsoluteUrl(getHomePath(), site),
    description: "Free printable coloring pages, worksheets, calendars, and simple PDF activities.",
    inLanguage: "en",
  };
}

export function collectionJsonLd(item: ContentType | Hub | Topic, path: string, site: URL | string) {
  const isTopic = "quickFacts" in item;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: item.title,
    description: item.description,
    url: asAbsoluteUrl(path, site),
    inLanguage: "en",
    ...(isTopic
      ? {
          mainEntity: {
            "@type": "ItemList",
            name: item.title,
          },
        }
      : {}),
  };
}

export function printableJsonLd(page: PrintablePage, site: URL | string) {
  const topic = getTopic(page.primaryTopicId);
  const hub = getHub(topic.hubId);
  const pageUrl = asAbsoluteUrl(getPrintablePath(page), site);
  const imageUrl = asAbsoluteUrl(page.files.preview, site);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: text(page.titles),
    description: text(page.descriptions),
    url: pageUrl,
    inLanguage: "en",
    isPartOf: {
      "@type": "CollectionPage",
      name: topic.title,
      url: asAbsoluteUrl(getTopicPath(topic), site),
      isPartOf: {
        "@type": "CollectionPage",
        name: hub.title,
        url: asAbsoluteUrl(getHubPath(hub), site),
      },
    },
    breadcrumb: breadcrumbJsonLd(getBreadcrumbsForPrintable(page), site),
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: imageUrl,
      contentUrl: imageUrl,
      caption: text(page.titles),
      encodingFormat: "image/webp",
    },
    mainEntity: {
      "@type": "DigitalDocument",
      name: text(page.titles),
      description: text(page.descriptions),
      isAccessibleForFree: true,
      license: page.license,
      encodingFormat: "application/pdf",
      url: asAbsoluteUrl(page.files.pdf, site),
      image: imageUrl,
    },
  };
}
