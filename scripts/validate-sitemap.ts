import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import fg from "fast-glob";

const baseUrl = process.env.SITE_URL ?? "https://web3-domain-institute.edu.pl";
const sitemapFiles = await fg("public/sitemap*.xml");
const errors: string[] = [];

for (const file of sitemapFiles) {
  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const loc = match[1];
    if (loc.endsWith(".xml")) continue;
    const url = new URL(loc);
    if (url.origin !== new URL(baseUrl).origin) {
      errors.push(`${file}: unexpected sitemap origin ${loc}`);
      continue;
    }
    if (!existsSync("dist")) continue;
    const pathname = url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`;
    const htmlFile = path.join("dist", pathname, "index.html");
    if (!existsSync(htmlFile)) errors.push(`${file}: sitemap URL has no built HTML ${pathname}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Sitemap validation passed for ${sitemapFiles.length} files.`);
