import { mkdir, writeFile } from "node:fs/promises";
import { escapeXml, readContentFiles, siteUrl } from "./lib/content-files";

const staticPages = [
  "/",
  "/learn/",
  "/research/",
  "/library/",
  "/reports/",
  "/tools/",
  "/news/",
  "/glossary/",
  "/faq/",
  "/people/"
];

const groups: Record<string, { url: string; updatedAt: string }[]> = {
  pages: staticPages.map((url) => ({ url, updatedAt: new Date().toISOString() })),
  posts: [],
  reports: [],
  tools: [],
  glossary: [],
  news: []
};

const files = await readContentFiles();
for (const item of files) {
  if (item.data.index === false) continue;
  const record = {
    url: item.url,
    updatedAt: new Date(item.data.updatedAt).toISOString()
  };
  if (item.data.section === "reports") groups.reports.push(record);
  else if (item.data.section === "tools") groups.tools.push(record);
  else if (item.data.section === "glossary") groups.glossary.push(record);
  else if (item.data.section === "news") groups.news.push(record);
  else if (item.data.section === "about" || item.data.section === "legal" || item.data.section === "faq" || item.data.section === "learn") groups.pages.push(record);
  else groups.posts.push(record);
}

function urlset(items: { url: string; updatedAt: string }[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items
  .map(
    (item) => `  <url>
    <loc>${escapeXml(siteUrl(item.url))}</loc>
    <lastmod>${item.updatedAt}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>
`;
}

await mkdir("public", { recursive: true });

for (const [name, items] of Object.entries(groups)) {
  await writeFile(`public/sitemap-${name}.xml`, urlset(items), "utf8");
}

const index = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.keys(groups)
  .map(
    (name) => `  <sitemap>
    <loc>${escapeXml(siteUrl(`/sitemap-${name}.xml`))}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`
  )
  .join("\n")}
</sitemapindex>
`;

await writeFile("public/sitemap.xml", index, "utf8");
console.log(
  `Generated sitemap index with ${Object.values(groups).reduce((sum, items) => sum + items.length, 0)} URLs.`
);
