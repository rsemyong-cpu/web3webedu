import { defineCollection, z } from "astro:content";

const faqSchema = z.object({
  question: z.string(),
  answer: z.string()
});

const referenceSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  source: z.string().optional()
});

const relatedSchema = z.object({
  title: z.string(),
  url: z.string()
});

const keywordsSchema = z.object({
  primary: z.string(),
  secondary: z.array(z.string()).default([])
});

const commonContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string().optional(),
  section: z.enum([
    "learn",
    "research",
    "library",
    "reports",
    "tools",
    "news",
    "glossary",
    "faq",
    "about",
    "legal"
  ]),
  cluster: z.string().optional(),
  type: z.enum([
    "pillar",
    "longtail",
    "research",
    "report",
    "tool",
    "glossary",
    "faq",
    "course",
    "policy",
    "news"
  ]),
  language: z.string().default("zh-CN"),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  author: z.string(),
  reviewer: z.string().optional(),
  tags: z.array(z.string()).default([]),
  keywords: keywordsSchema,
  riskLevel: z.enum(["low", "medium", "high"]).default("medium"),
  canonical: z.string().optional(),
  index: z.boolean().default(true),
  audience: z.array(z.string()).default([]),
  summary: z.string().optional(),
  faqs: z.array(faqSchema).default([]),
  references: z.array(referenceSchema).default([]),
  related: z.array(relatedSchema).default([]),
  updateCadence: z.string().optional(),
  schemaType: z
    .enum([
      "Article",
      "FAQPage",
      "Course",
      "Dataset",
      "DefinedTerm",
      "CreativeWork"
    ])
    .default("Article")
});

const authorSchema = z.object({
  name: z.string(),
  slug: z.string().optional(),
  title: z.string(),
  description: z.string(),
  role: z.string(),
  focus: z.array(z.string()).default([]),
  updatedAt: z.coerce.date(),
  disclosure: z.string(),
  email: z.string().email().optional(),
  index: z.boolean().default(true)
});

export const collections = {
  library: defineCollection({ type: "content", schema: commonContentSchema }),
  research: defineCollection({ type: "content", schema: commonContentSchema }),
  reports: defineCollection({ type: "content", schema: commonContentSchema }),
  tools: defineCollection({ type: "content", schema: commonContentSchema }),
  glossary: defineCollection({ type: "content", schema: commonContentSchema }),
  faq: defineCollection({ type: "content", schema: commonContentSchema }),
  news: defineCollection({ type: "content", schema: commonContentSchema }),
  courses: defineCollection({ type: "content", schema: commonContentSchema }),
  pages: defineCollection({ type: "content", schema: commonContentSchema }),
  authors: defineCollection({ type: "content", schema: authorSchema })
};
