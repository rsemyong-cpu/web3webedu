import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";
import { readContentFiles } from "./lib/content-files";

const staticRoutes = [
  "/",
  "/learn/",
  "/research/",
  "/library/",
  "/reports/",
  "/tools/",
  "/news/",
  "/glossary/",
  "/faq/",
  "/people/",
  "/en/",
  "/en/learn/",
  "/en/research/",
  "/en/library/",
  "/en/reports/",
  "/en/tools/",
  "/en/news/",
  "/en/glossary/",
  "/en/faq/",
  "/en/about/",
  "/en/people/"
];

const allowedAssetPrefixes = ["/_astro/", "/api/"];
const allowedAssetPaths = ["/rss.xml", "/en/rss.xml", "/sitemap.xml", "/favicon.svg"];

function normalizePath(url: string) {
  const clean = url.split("#")[0].split("?")[0];
  if (!clean.startsWith("/")) return "";
  if (path.extname(clean)) return clean;
  if (clean === "/en") return "/en/";
  return clean.endsWith("/") ? clean : `${clean}/`;
}

function extractInternalLinks(file: string, text: string) {
  const links: string[] = [];
  const patterns = [
    /href=["'](\/[^"'#?]+\/?)(?:[#?][^"']*)?["']/g,
    /\]\((\/[^)#?]+\/?)(?:[#?][^)]*)?\)/g,
    /"(?:url|href|pillar|tool|report|faq|course)"\s*:\s*"(\/[^"#?]+\/?)"/g
  ];
  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) links.push(normalizePath(match[1]));
  }
  if (file.endsWith(".md")) {
    const parsed = matter(text);
    const walk = (value: unknown) => {
      if (Array.isArray(value)) value.forEach(walk);
      else if (value && typeof value === "object") Object.values(value).forEach(walk);
      else if (typeof value === "string" && value.startsWith("/")) links.push(normalizePath(value));
    };
    walk(parsed.data);
  }
  return links.filter(Boolean);
}

function isAllowedSpecialPath(url: string) {
  return allowedAssetPaths.includes(url) || url.startsWith("/sitemap-") || allowedAssetPrefixes.some((prefix) => url.startsWith(prefix));
}

const files = await readContentFiles();
const routes = new Set(staticRoutes);

for (const item of files) {
  if (item.data.index !== false) routes.add(normalizePath(item.url));
}

for (const file of await fg("src/content/authors/*.md")) {
  const parsed = matter(readFileSync(file, "utf8"));
  const slug = parsed.data.slug ?? path.basename(file, ".md");
  routes.add(`/people/${slug}/`);
  routes.add(`/en/people/${slug}/`);
}

const errors: string[] = [];
for (const file of await fg(["src/content/**/*.{md,mdx}", "src/data/**/*.json", "src/pages/**/*.astro", "src/components/**/*.astro"])) {
  const text = readFileSync(file, "utf8");
  for (const url of extractInternalLinks(file, text)) {
    if (isAllowedSpecialPath(url) || path.extname(url)) continue;
    if (!routes.has(url)) errors.push(`${file}: missing internal target ${url}`);
  }
}

if (process.argv.includes("--dist") && existsSync("dist")) {
  const htmlFiles = await fg("dist/**/*.html");
  for (const file of htmlFiles) {
    const text = readFileSync(file, "utf8");
    for (const url of extractInternalLinks(file, text)) {
      if (isAllowedSpecialPath(url)) continue;
      const target = path.join("dist", url);
      if (!existsSync(path.join(target, "index.html")) && !existsSync(target)) {
        errors.push(`${file}: built HTML links to missing target ${url}`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Link validation passed for ${routes.size} known routes.`);
