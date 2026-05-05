import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const topicClusters = JSON.parse(await readFile("src/data/topic-clusters.json", "utf8")) as Array<{
  id: string;
  name: string;
  section: string;
  pillar: string;
  tool: string;
  report: string;
}>;
const calendar = JSON.parse(await readFile("src/data/content-calendar.json", "utf8")) as {
  daily: Array<{ cluster: string; type: string; count: number }>;
};

type Cluster = (typeof topicClusters)[number];

const today = new Date().toISOString().slice(0, 10);
const args = new Set(process.argv.slice(2));
const clusterId = process.argv.find((arg) => arg.startsWith("--cluster="))?.split("=")[1] ?? calendar.daily[0].cluster;
const matchedCluster = topicClusters.find((item) => item.id === clusterId);

if (!matchedCluster) {
  throw new Error(`Unknown cluster: ${clusterId}`);
}

const cluster: Cluster = matchedCluster;

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function yaml(data: Record<string, unknown>) {
  const lines: string[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const item of value) {
        if (typeof item === "object" && item !== null) {
          lines.push("  -");
          for (const [nestedKey, nestedValue] of Object.entries(item)) {
            lines.push(`    ${nestedKey}: ${JSON.stringify(String(nestedValue))}`);
          }
        } else {
          lines.push(`  - ${JSON.stringify(String(item))}`);
        }
      }
    } else if (typeof value === "object" && value !== null) {
      lines.push(`${key}:`);
      for (const [nestedKey, nestedValue] of Object.entries(value)) {
        if (Array.isArray(nestedValue)) {
          lines.push(`  ${nestedKey}:`);
          for (const nestedItem of nestedValue) lines.push(`    - ${JSON.stringify(String(nestedItem))}`);
        } else {
          lines.push(`  ${nestedKey}: ${JSON.stringify(String(nestedValue))}`);
        }
      }
    } else {
      lines.push(`${key}: ${typeof value === "boolean" ? String(value) : JSON.stringify(String(value))}`);
    }
  }
  return lines.join("\n");
}

async function aiBody(title: string, selectedCluster: Cluster) {
  if (!process.env.OPENAI_API_KEY) return "";
  const prompt = await readFile("prompts/article-generator.md", "utf8");
  try {
    const { default: OpenAI } = await import("openai");
    const client = new OpenAI();
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL ?? "gpt-5.2",
      instructions: prompt,
      input: `主题集群：${selectedCluster.name}\n目标页面标题：${title}\n支柱页：${selectedCluster.pillar}\n工具页：${selectedCluster.tool}\n报告页：${selectedCluster.report}\n请输出正文 Markdown，不要输出 frontmatter。`
    });
    return response.output_text;
  } catch (error) {
    console.warn(`OpenAI generation failed for ${selectedCluster.id}; using local template.`);
    console.warn(error instanceof Error ? error.message : String(error));
    return "";
  }
}

function deterministicBody(title: string, selectedCluster: Cluster) {
  return `## 摘要

${title} 是 ${selectedCluster.name} 主题集群中的长尾页面，用于回答一个具体问题，并把读者引导到支柱页、工具页、术语页和报告页。

## 问题定义

页面需要直接回答用户搜索意图，同时说明更新时间、适合读者、风险提示和资料限制。涉及注册商政策或稳定币支付时，必须避免编造事实。

## 背景知识

域名注册由注册商、注册局、TLD 政策、DNS 配置和争议处理共同影响。加密支付只改变付款方式，不改变域名治理和合规责任。

## 风险与限制

链上支付不可逆，注册商政策可能变化，隐私保护不等于违法匿名。用户应核验官方政策、发票、退款、KYC、DNSSEC 和账户安全设置。

## 合规边界

本站只提供教育研究内容，不提供规避监管、逃避制裁、洗钱、欺诈或侵权用途的指导。

## 相关入口

- [${selectedCluster.name}](${selectedCluster.pillar})
- [主题工具页](${selectedCluster.tool})
- [主题报告](${selectedCluster.report})
- [USDT术语](/glossary/usdt/)
- [DNS术语](/glossary/dns/)
`;
}

function frontmatterFor(selectedCluster: Cluster, title: string, slug: string, section: string) {
  return {
    title,
    description: `${selectedCluster.name}主题集群的自动更新页面，覆盖风险、合规边界、内链入口和后续更新计划。`,
    slug,
    section,
    cluster: selectedCluster.id,
    type: "longtail",
    language: "zh-CN",
    publishedAt: today,
    updatedAt: today,
    author: "Web3 Domain Institute Editorial Team",
    reviewer: "Domain Infrastructure Research Desk",
    tags: [selectedCluster.name, "自动更新"],
    keywords: { primary: selectedCluster.name, secondary: [] },
    riskLevel: "medium",
    index: true,
    audience: ["域名持有者", "研究者", "Web3创业者"],
    summary: `${selectedCluster.name}自动更新页面。`,
    faqs: [
      {
        question: `${selectedCluster.name}页面为什么需要定期更新？`,
        answer: "注册商政策、稳定币支付、DNS安全和隐私规则都可能变化，定期更新能降低过期信息风险。"
      }
    ],
    references: [
      { title: "ICANN: Domain Name System (DNS)", url: "https://www.icann.org/resources/pages/what-2012-02-25-en", source: "ICANN" },
      { title: "ICANN: Registrar Accreditation Agreement", url: "https://www.icann.org/resources/pages/approved-with-specs-2013-09-17-en", source: "ICANN" }
    ],
    related: [
      { title: selectedCluster.name, url: selectedCluster.pillar },
      { title: "主题工具页", url: selectedCluster.tool },
      { title: "主题报告", url: selectedCluster.report },
      { title: "USDT术语", url: "/glossary/usdt/" },
      { title: "DNS术语", url: "/glossary/dns/" }
    ],
    updateCadence: "daily",
    schemaType: "Article"
  };
}

const plans = args.has("--cluster")
  ? [{ cluster: cluster.id, type: "longtail", count: 1 }]
  : calendar.daily;

for (const plan of plans) {
  const selectedCluster = topicClusters.find((item) => item.id === plan.cluster);
  if (!selectedCluster) throw new Error(`Unknown cluster: ${plan.cluster}`);

  for (let index = 0; index < Math.max(1, plan.count); index += 1) {
    const suffix = index === 0 ? `generated-${today}` : `generated-${today}-${index + 1}`;
    const titleSuffix = index === 0 ? "" : `（${index + 1}）`;
    const title = `${selectedCluster.name}自动更新观察：${today}${titleSuffix}`;
    const slug = `${selectedCluster.id}/${suffix}`;
    const section = selectedCluster.section;
    const collection = section === "research" ? "research" : "library";
    const body = (await aiBody(title, selectedCluster)) || deterministicBody(title, selectedCluster);
    const file = path.join("src", "content", collection, slugify(selectedCluster.id), `${suffix}.md`);

    if (args.has("--dry-run")) {
      console.log(`Would write ${file}`);
      continue;
    }

    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, `---\n${yaml(frontmatterFor(selectedCluster, title, slug, section))}\n---\n\n${body}\n`, "utf8");
    console.log(`Generated ${file}`);
  }
}
