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
  | "pages"
  | "en-library"
  | "en-research"
  | "en-reports"
  | "en-tools"
  | "en-glossary"
  | "en-faq"
  | "en-news"
  | "en-courses"
  | "en-pages";

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

export const enSectionCollectionMap: Record<string, ContentCollection> = {
  library: "en-library",
  research: "en-research",
  reports: "en-reports",
  tools: "en-tools",
  glossary: "en-glossary",
  faq: "en-faq",
  news: "en-news",
  learn: "en-courses",
  about: "en-pages",
  legal: "en-pages"
};

export function entryPath(entry: CollectionEntry<ContentCollection>) {
  const data = entry.data;
  const slug = data.slug ?? entry.slug;
  const isEn = (entry.collection as string).startsWith("en-");
  const prefix = isEn ? "/en" : "";
  if (data.canonical) return data.canonical;
  if (data.section === "about" || data.section === "legal") return `${prefix}/${slug}/`;
  return `${prefix}/${data.section}/${slug}/`;
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

export function formatDateEn(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

export type EnContentCollection = Extract<ContentCollection, `en-${string}`>;

export async function getPublishedEntriesEn(collection: EnContentCollection) {
  const entries = await getCollection(collection, ({ data }) => data.index !== false);
  return entries.sort(
    (a, b) => b.data.updatedAt.valueOf() - a.data.updatedAt.valueOf()
  );
}

export async function getSectionEntriesEn(section: string) {
  const collection = enSectionCollectionMap[section];
  if (!collection) return [];
  const entries = await getPublishedEntriesEn(collection as EnContentCollection);
  return entries.filter((entry) => entry.data.section === section);
}
