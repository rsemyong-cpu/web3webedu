import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { escapeXml, readContentFiles, siteUrl } from "./lib/content-files";

const files = (await readContentFiles())
  .filter((item) => item.data.index !== false)
  .sort((a, b) => new Date(b.data.updatedAt).valueOf() - new Date(a.data.updatedAt).valueOf())
  .slice(0, 80);

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Web3 Domain Institute</title>
    <link>${siteUrl("/")}</link>
    <description>Web3域名与稳定币研究学院最新内容</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${files
      .map(
        (item) => `<item>
      <title>${escapeXml(item.data.title)}</title>
      <link>${siteUrl(item.url)}</link>
      <guid>${siteUrl(item.url)}</guid>
      <description>${escapeXml(item.data.description)}</description>
      <pubDate>${new Date(item.data.updatedAt).toUTCString()}</pubDate>
    </item>`
      )
      .join("\n    ")}
  </channel>
</rss>
`;

await mkdir(dirname("public/rss.xml"), { recursive: true });
await writeFile("public/rss.xml", rss, "utf8");
console.log(`Generated RSS with ${files.length} entries.`);
