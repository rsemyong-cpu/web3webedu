import { getCollection, type CollectionEntry } from "astro:content";

export type ContentCollection =
  | "library"
  | "research"
  | "reports"
  | "tools"
  | "glossary"
  | "faq"
  | "news"
  | "courses"
  | "pages";

export const sectionCollectionMap: Record<string, ContentCollection> = {
  library: "library",
  research: "research",
  reports: "reports",
  tools: "tools",
  glossary: "glossary",
  faq: "faq",
  news: "news",
  learn: "courses",
  about: "pages",
  legal: "pages"
};

export function entryPath(entry: CollectionEntry<ContentCollection>) {
  const data = entry.data;
  const slug = data.slug ?? entry.slug;
  if (data.canonical) return data.canonical;
  if (data.section === "about" || data.section === "legal") return `/${slug}/`;
  return `/${data.section}/${slug}/`;
}

export async function getPublishedEntries(collection: ContentCollection) {
  const entries = await getCollection(collection, ({ data }) => data.index !== false);
  return entries.sort(
    (a, b) => b.data.updatedAt.valueOf() - a.data.updatedAt.valueOf()
  );
}

export async function getSectionEntries(section: string) {
  const collection = sectionCollectionMap[section];
  if (!collection) return [];
  const entries = await getPublishedEntries(collection);
  return entries.filter((entry) => entry.data.section === section);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}
