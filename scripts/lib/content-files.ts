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
  "src/content/pages/**/*.md",
  "src/content/en-library/**/*.md",
  "src/content/en-research/**/*.md",
  "src/content/en-reports/**/*.md",
  "src/content/en-tools/**/*.md",
  "src/content/en-glossary/**/*.md",
  "src/content/en-faq/**/*.md",
  "src/content/en-news/**/*.md",
  "src/content/en-courses/**/*.md",
  "src/content/en-pages/**/*.md"
];

function isEnContent(file: string) {
  return file.includes("/en-");
}

export function contentUrl(data: Record<string, any>, file?: string) {
  if (data.canonical) return data.canonical;
  const prefix = file && isEnContent(file) ? "/en" : "";
  if (data.section === "about" || data.section === "legal") return `${prefix}/${data.slug}/`;
  return `${prefix}/${data.section}/${data.slug}/`;
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
      url: contentUrl(parsed.data, file)
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
