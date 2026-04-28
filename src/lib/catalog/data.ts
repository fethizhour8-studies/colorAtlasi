import rawCatalog from "@/data/catalog.json";
import type { Catalog, ContentSection, ContentType, ContentTypeId, Hub, Printable, Topic } from "./types";

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

const defaultSectionsForTopic = (topic: Topic): ContentSection[] => {
  const titleLower = topic.title.toLowerCase();
  const isCalendar = topic.tags.includes("calendar") || titleLower.includes("calendar");
  const isWorksheet = topic.contentTypeId === "worksheets";
  const isPlanner = topic.contentTypeId === "planners";
  const isAdult = topic.tags.includes("adult coloring") || topic.tags.includes("relaxing") || titleLower.includes("mandala");
  const isAnimal = topic.tags.includes("animals") || topic.tags.includes("farm");

  if (isCalendar) {
    return [
      {
        eyebrow: "Planning ideas",
        title: `Ways to use ${topic.title}`,
        body: `Use ${titleLower} for family schedules, classroom reminders, desk planning, simple habit notes, and monthly overview pages. Print one clean copy for the wall and keep another near your desk for quick edits.`,
      },
      {
        eyebrow: "Printable setup",
        title: "Simple calendar printing tips",
        body: "Print at actual size for US Letter or choose fit to page for A4. Use a pencil first if the page will change often, or laminate a copy and use a dry-erase marker for reusable planning.",
      },
    ];
  }

  if (isWorksheet) {
    return [
      {
        eyebrow: "Learning ideas",
        title: `How to use ${titleLower}`,
        body: `Use these ${titleLower} for early finishers, morning work, quiet practice, or small-group review. Keep the instructions short and let children focus on one skill at a time.`,
      },
      {
        eyebrow: "Classroom use",
        title: "Make a mini activity packet",
        body: "Combine a few related worksheets with one coloring page to make a simple printable packet. This keeps the activity useful without needing a screen or extra materials.",
      },
    ];
  }

  if (isPlanner) {
    return [
      {
        eyebrow: "Organization ideas",
        title: `Ways to use ${titleLower}`,
        body: `Use ${titleLower} for weekly routines, family reminders, class planning, chores, priorities, and simple notes. Keep one page visible so the plan stays easy to review.`,
      },
      {
        eyebrow: "Planning tip",
        title: "Keep the layout calm",
        body: "Print a fresh page each week and write only the most important tasks first. A simple printable planner works best when it stays clear, readable, and easy to update.",
      },
    ];
  }

  if (isAdult) {
    return [
      {
        eyebrow: "Relaxing ideas",
        title: `Best ways to use ${titleLower}`,
        body: `Use these ${titleLower} for calm breaks, mindful coloring, quiet evenings, or screen-free creative time. Start with a small color palette if you want the page to feel more peaceful.`,
      },
      {
        eyebrow: "Coloring tip",
        title: "Build depth slowly",
        body: "Try coloring repeated shapes with light and dark versions of the same color. This creates a polished look without needing advanced art supplies.",
      },
    ];
  }

  if (isAnimal) {
    return [
      {
        eyebrow: "Activity ideas",
        title: `Ways to use ${titleLower}`,
        body: `Use these ${titleLower} for animal units, farm lessons, rainy-day activities, early finishers, or simple home crafts. Print several pages together to make a mini animal coloring packet.`,
      },
      {
        eyebrow: "Learning ideas",
        title: "Connect coloring with simple facts",
        body: "After coloring, ask children to name the animal, describe where it lives, or tell a short story about the scene. This turns a printable page into a small language or science activity.",
      },
    ];
  }

  return [
    {
      eyebrow: "Activity ideas",
      title: `Ways to use ${titleLower}`,
      body: `Use these ${titleLower} for quiet time, class packets, weekend activities, simple art practice, or screen-free creative breaks. Print a few related pages together to make a themed mini pack.`,
    },
    {
      eyebrow: "Creative ideas",
      title: "Make the page your own",
      body: "Try crayons for younger kids, colored pencils for details, or markers on thicker paper. Add background colors, patterns, names, or small story details after the main picture is finished.",
    },
  ];
};

const withDefaultSections = (topic: Topic): Topic => ({
  ...topic,
  sections: topic.sections && topic.sections.length > 0 ? topic.sections : defaultSectionsForTopic(topic),
});

const demoPrintables: Printable[] = [
  ...Array.from({ length: 8 }, (_, index) => ({
    id: `mandala-layout-demo-${index + 1}`,
    topicId: "mandala-coloring-pages",
    slug: `mandala-layout-demo-${index + 1}`,
    title: `Mandala Layout Preview ${index + 1}`,
    description: "A temporary layout preview card for checking collection grid density before final PDFs are generated.",
    previewImage: "/assets/previews/coloring-pages/adults/mandalas/geometric-flower-mandala-coloring-page.webp",
    downloadPdf: "#",
    difficulty: index % 2 === 0 ? "medium" : "detailed",
    format: "PDF" as const,
    tags: ["mandala", "layout preview"],
    indexing: "noindex" as const,
    canonicalTopicId: "mandala-coloring-pages",
    order: 100 + index,
  })),
  ...Array.from({ length: 8 }, (_, index) => ({
    id: `farm-animal-layout-demo-${index + 1}`,
    topicId: "farm-animals-coloring-pages",
    slug: `farm-animal-layout-demo-${index + 1}`,
    title: `Farm Animal Layout Preview ${index + 1}`,
    description: "A temporary layout preview card for checking collection grid density before final PDFs are generated.",
    previewImage: "/assets/previews/coloring-pages/animals/farm-animals/cute-cow-coloring-page.webp",
    downloadPdf: "#",
    difficulty: "easy",
    format: "PDF" as const,
    tags: ["farm", "animals", "layout preview"],
    indexing: "noindex" as const,
    canonicalTopicId: "farm-animals-coloring-pages",
    order: 100 + index,
  })),
  ...Array.from({ length: 6 }, (_, index) => ({
    id: `wizard-school-layout-demo-${index + 1}`,
    topicId: "wizard-school-coloring-pages",
    slug: `wizard-school-layout-demo-${index + 1}`,
    title: `Wizard School Layout Preview ${index + 1}`,
    description: "A temporary layout preview card for checking collection grid density before final PDFs are generated.",
    previewImage: "/assets/previews/coloring-pages/kids/wizard-school/magic-owl-coloring-page.webp",
    downloadPdf: "#",
    difficulty: "easy",
    format: "PDF" as const,
    tags: ["fantasy", "layout preview"],
    indexing: "noindex" as const,
    canonicalTopicId: "wizard-school-coloring-pages",
    order: 100 + index,
  })),
];

export const site = catalog.site;
export const contentTypes = byOrder(catalog.contentTypes);
export const hubs = byOrder(catalog.hubs);
export const topics = byOrder(catalog.topics.map(withDefaultSections));
export const printables = byOrder([...catalog.printables, ...demoPrintables]);

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
