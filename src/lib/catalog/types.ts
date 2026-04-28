export type Locale = "en";

export type ContentTypeId =
  | "coloring-pages"
  | "worksheets"
  | "calendars"
  | "planners";

export interface SiteConfig {
  name: string;
  locale: Locale;
  basePath: `/${Locale}`;
}

export interface OrderedRecord {
  id: string;
  slug: string;
  title: string;
  description: string;
  order: number;
}

export interface ContentType extends OrderedRecord {
  id: ContentTypeId;
  seoTitle: string;
  seoDescription: string;
}

export interface Hub extends OrderedRecord {
  contentTypeId: ContentTypeId;
  seoTitle: string;
  seoDescription: string;
}

export interface QuickFact {
  label: string;
  value: string;
}

export interface Topic extends OrderedRecord {
  contentTypeId: ContentTypeId;
  hubId?: string;
  h1: string;
  intro: string;
  quickFacts: QuickFact[];
  tags: string[];
  relatedTopicIds: string[];
  indexable: boolean;
  seoTitle: string;
  seoDescription: string;
}

export type PrintableIndexing = "index" | "noindex";

export interface Printable extends OrderedRecord {
  topicId: string;
  previewImage: string;
  downloadPdf: string;
  difficulty: string;
  format: "PDF";
  tags: string[];
  indexing: PrintableIndexing;
  canonicalTopicId: string;
}

export interface Catalog {
  site: SiteConfig;
  contentTypes: ContentType[];
  hubs: Hub[];
  topics: Topic[];
  printables: Printable[];
}

export interface SeoMeta {
  title: string;
  description: string;
  path: string;
  canonicalPath: string;
  robots: "index,follow" | "noindex,follow";
}
