import { getContentTypeById, getHubById, getTopicById, site } from "./data";
import { getContentTypePath, getHubPath, getHomePath, getPrintablePath, getTopicPath } from "./urls";
import type { ContentType, Hub, Printable, SeoMeta, Topic } from "./types";

const siteUrl = (import.meta.env.SITE || "https://example.com").replace(/\/$/, "");

const absoluteUrl = (path: string) => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

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

export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: absoluteUrl(getHomePath()),
  inLanguage: site.locale,
  description: "Free printable coloring pages, worksheets, calendars, planners, and classroom-friendly PDF activities.",
});

export const collectionJsonLd = (item: ContentType | Hub | Topic, path: string, count?: number) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: item.title,
  description: item.description,
  url: absoluteUrl(path),
  inLanguage: site.locale,
  isAccessibleForFree: true,
  ...(typeof count === "number"
    ? {
        mainEntity: {
          "@type": "ItemList",
          name: item.title,
          numberOfItems: count,
        },
      }
    : {}),
});

export const breadcrumbJsonLd = (items: Array<{ label: string; href?: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.label,
    ...(item.href ? { item: absoluteUrl(item.href) } : {}),
  })),
});

export const topicFaqJsonLd = (topic: Topic) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: `Can I use these ${topic.title.toLowerCase()} in a classroom?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. These printables are intended for personal, home, and classroom use unless a page says otherwise.",
      },
    },
    {
      "@type": "Question",
      name: `Do I need special software for ${topic.title.toLowerCase()}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Open the PDF in your browser or PDF viewer, then print it with normal printer settings.",
      },
    },
    {
      "@type": "Question",
      name: "Why do individual printable pages point back to the collection?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Collection pages are stronger because visitors can compare previews, read printing tips, and find related PDFs in one place.",
      },
    },
  ],
});

export const printableJsonLd = (printable: Printable) => {
  const topic = getTopicById(printable.topicId);
  const contentType = getContentTypeById(topic.contentTypeId);
  const hub = topic.hubId ? getHubById(topic.hubId) : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: printable.title,
    description: printable.description,
    url: absoluteUrl(getPrintablePath(printable)),
    inLanguage: site.locale,
    isPartOf: {
      "@type": "CollectionPage",
      name: topic.title,
      url: absoluteUrl(getTopicPath(topic)),
      ...(hub
        ? {
            isPartOf: {
              "@type": "CollectionPage",
              name: hub.title,
              url: absoluteUrl(getHubPath(hub)),
              isPartOf: {
                "@type": "CollectionPage",
                name: contentType.title,
                url: absoluteUrl(getContentTypePath(contentType)),
              },
            },
          }
        : {
            isPartOf: {
              "@type": "CollectionPage",
              name: contentType.title,
              url: absoluteUrl(getContentTypePath(contentType)),
            },
          }),
    },
    mainEntity: {
      "@type": "DigitalDocument",
      name: printable.title,
      description: printable.description,
      isAccessibleForFree: true,
      encodingFormat: "application/pdf",
      url: absoluteUrl(printable.downloadPdf),
      image: absoluteUrl(printable.previewImage),
    },
  };
};
