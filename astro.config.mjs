import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

const site = process.env.SITE_URL ?? "https://web3-domain-institute.edu.pl";

export default defineConfig({
  site,
  output: "static",
  integrations: [
    mdx(),
    sitemap({
      filter: (page) =>
        !page.includes("/admin/") &&
        !page.includes("/login/") &&
        !page.includes("/search/") &&
        !page.includes("/preview/") &&
        !page.includes("/drafts/")
    })
  ],
  markdown: {
    shikiConfig: {
      theme: "github-light"
    }
  }
});
