import { readContentFiles } from "./lib/content-files";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/;
const badAnchorPattern = /\]\((\/[^)]+)\)/g;
const genericAnchors = ["点击这里", "更多", "查看", "这篇文章", "了解更多"];

const files = await readContentFiles();
const errors: string[] = [];
const seenUrls = new Map<string, string>();

for (const item of files) {
  const { file, data, content, url } = item;

  if (!data.title) errors.push(`${file}: missing title`);
  if (!data.description) errors.push(`${file}: missing description`);
  if (!data.slug) errors.push(`${file}: missing slug`);
  if (!data.section) errors.push(`${file}: missing section`);
  if (!data.updatedAt) errors.push(`${file}: missing updatedAt`);
  if (!data.author) errors.push(`${file}: missing author`);
  if (!data.riskLevel) errors.push(`${file}: missing riskLevel`);

  if (data.slug && !slugPattern.test(data.slug)) {
    errors.push(`${file}: slug must be lowercase English words, numbers and hyphens only`);
  }

  if (/[^\x00-\x7F]/.test(url.replace(/^\/(learn|research|library|reports|tools|news|glossary|faq|about|legal)\//, "")) && data.section !== "about") {
    errors.push(`${file}: URL contains non-ASCII characters`);
  }

  if (seenUrls.has(url)) {
    errors.push(`${file}: duplicate URL ${url}; first seen in ${seenUrls.get(url)}`);
  } else {
    seenUrls.set(url, file);
  }

  if (String(data.description ?? "").length > 180) {
    errors.push(`${file}: description is longer than 180 characters`);
  }

  if (!Array.isArray(data.faqs) || data.faqs.length === 0) {
    errors.push(`${file}: missing FAQ frontmatter`);
  }



  for (const anchor of genericAnchors) {
    if (content.includes(`[${anchor}]`)) {
      errors.push(`${file}: generic anchor text "${anchor}" is not allowed`);
    }
  }
}

if (errors.length > 0) {
  console.error(`SEO validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`SEO validation passed for ${files.length} content pages.`);
