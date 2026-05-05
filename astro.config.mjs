import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

const site = process.env.SITE_URL ?? "https://web3-domain-institute.edu.pl";

export default defineConfig({
  site,
  output: "static",
  i18n: {
    defaultLocale: "zh-CN",
    locales: ["zh-CN", "en"],
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) =>
        !page.includes("/admin/") &&
        !page.includes("/login/") &&
        !page.includes("/search/") &&
        !page.includes("/preview/") &&
        !page.includes("/drafts/"),
      i18n: {
        defaultLocale: "zh-CN",
        locales: {
          "zh-CN": "zh-CN",
          en: "en"
        }
      }
    })
  ],
  markdown: {
    shikiConfig: {
      theme: "github-light"
    }
  }
});
