import { readFile } from "node:fs/promises";
import fg from "fast-glob";
import matter from "gray-matter";

export type ContentFile = {
  file: string;
  data: Record<string, any>;
  content: string;
  url: string;
};

export const contentGlobs = [
  "src/content/library/**/*.md",
  "src/content/research/**/*.md",
  "src/content/reports/**/*.md",
  "src/content/tools/**/*.md",
  "src/content/glossary/**/*.md",
  "src/content/faq/**/*.md",
  "src/content/news/**/*.md",
  "src/content/courses/**/*.md",
  "src/content/pages/**/*.md"
];

export function contentUrl(data: Record<string, any>) {
  if (data.canonical) return data.canonical;
  if (data.section === "about" || data.section === "legal") return `/${data.slug}/`;
  return `/${data.section}/${data.slug}/`;
}

export async function readContentFiles() {
  const paths = await fg(contentGlobs, { dot: false });
  const files: ContentFile[] = [];

  for (const file of paths) {
    const raw = await readFile(file, "utf8");
    const parsed = matter(raw);
    files.push({
      file,
      data: parsed.data,
      content: parsed.content,
      url: contentUrl(parsed.data)
    });
  }

  return files.sort((a, b) => a.url.localeCompare(b.url));
}

export function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function siteUrl(path = "/") {
  return new URL(path, process.env.SITE_URL ?? "https://web3-domain-institute.edu.pl").toString();
}
