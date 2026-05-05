import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { escapeXml, readContentFiles, siteUrl } from "./lib/content-files";

const allFiles = await readContentFiles();
const zhFiles = allFiles
  .filter((item) => item.data.index !== false && !item.file.includes("/en-"))
  .sort((a, b) => new Date(b.data.updatedAt).valueOf() - new Date(a.data.updatedAt).valueOf())
  .slice(0, 80);

const enFiles = allFiles
  .filter((item) => item.data.index !== false && item.file.includes("/en-"))
  .sort((a, b) => new Date(b.data.updatedAt).valueOf() - new Date(a.data.updatedAt).valueOf())
  .slice(0, 80);

function buildRss(items: typeof zhFiles, title: string, description: string, language: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>${escapeXml(title)}</title>
<link>${siteUrl("/")}</link>
<description>${escapeXml(description)}</description>
<language>${language}</language>
<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items
  .map(
    (item) => `<item>
<title>${escapeXml(item.data.title)}</title>
<link>${siteUrl(item.url)}</link>
<guid>${siteUrl(item.url)}</guid>
<description>${escapeXml(item.data.description)}</description>
<pubDate>${new Date(item.data.updatedAt).toUTCString()}</pubDate>
</item>`
  )
  .join("\n ")}
</channel>
</rss>
`;
}

await mkdir(dirname("public/rss.xml"), { recursive: true });
await writeFile("public/rss.xml", buildRss(zhFiles, "Web3 Domain Institute", "Web3域名与稳定币研究学院最新内容", "zh-CN"), "utf8");
await mkdir(dirname("public/en/rss.xml"), { recursive: true });
await writeFile("public/en/rss.xml", buildRss(enFiles, "Web3 Domain & Stablecoin Institute", "Latest content from the Web3 Domain & Stablecoin Institute", "en"), "utf8");
console.log(`Generated RSS with ${zhFiles.length} zh-CN + ${enFiles.length} en entries.`);
