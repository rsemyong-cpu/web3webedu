import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const DATE = "2026-05-04";
const AUTHOR = "Web3 Domain Institute Editorial Team";
const REVIEWER = "Domain Infrastructure Research Desk";

const commonRefs = [
  {
    title: "Google Search Central SEO Starter Guide",
    url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
    source: "Google for Developers"
  },
  {
    title: "Google URL Structure Guidelines",
    url: "https://developers.google.com/search/docs/crawling-indexing/url-structure",
    source: "Google for Developers"
  },
  {
    title: "ICANN: What is DNS?",
    url: "https://www.icann.org/resources/pages/what-2012-02-25-en",
    source: "ICANN"
  }
];

const clusterLinks = {
  "buy-domain-with-usdt": [
    ["USDT购买域名完整指南", "/library/buy-domain-with-usdt/"],
    ["USDT购买域名是否需要KYC", "/library/buy-domain-with-usdt/kyc/"],
    ["TRC20和ERC20支付区别", "/library/buy-domain-with-usdt/trc20-vs-erc20/"],
    ["USDT购买域名风险检查清单", "/tools/usdt-domain-risk-checklist/"],
    ["2026 USDT购买域名研究报告", "/reports/2026-usdt-domain-report/"]
  ],
  "buy-domain-with-crypto": [
    ["加密货币购买域名完整指南", "/library/buy-domain-with-crypto/"],
    ["USDT vs BTC购买域名", "/library/buy-domain-with-crypto/btc-vs-usdt/"],
    ["加密支付域名注册商对比", "/tools/crypto-domain-registrar-comparison/"],
    ["USDT术语解释", "/glossary/usdt/"],
    ["2026 加密货币域名注册商观察", "/reports/2026-crypto-domain-registrar-observatory/"]
  ],
  "private-domain-registration": [
    ["隐私域名注册完整指南", "/library/private-domain-registration/"],
    ["匿名注册和隐私保护的区别", "/library/private-domain-registration/anonymous-vs-private/"],
    ["WHOIS隐私保护", "/glossary/whois/"],
    ["域名隐私保护检查清单", "/tools/domain-privacy-checklist/"],
    ["2026 域名隐私与合规报告", "/reports/2026-domain-privacy-compliance-report/"]
  ],
  "web3-domain-identity": [
    ["Web3域名与数字身份研究", "/research/web3-domain-identity/"],
    ["ENS和DNS有什么区别", "/research/web3-domain-identity/ens-vs-dns/"],
    ["Web3域名术语", "/glossary/web3-domain/"],
    ["加密支付域名注册商对比", "/tools/crypto-domain-registrar-comparison/"],
    ["2026 Web3域名趋势报告", "/reports/2026-web3-domain-trends/"]
  ],
  "stablecoin-economy": [
    ["稳定币经济影响研究", "/research/stablecoin-economy/"],
    ["稳定币与域名支付", "/research/stablecoin-economy/stablecoins-and-domain-payments/"],
    ["USDT术语解释", "/glossary/usdt/"],
    ["加密支付域名注册商对比", "/tools/crypto-domain-registrar-comparison/"],
    ["2026 稳定币与互联网支付基础设施报告", "/reports/2026-stablecoin-internet-payments/"]
  ],
  "dns-security-governance": [
    ["DNS安全与域名治理指南", "/research/dns-security-governance/"],
    ["DNSSEC为什么重要", "/research/dns-security-governance/dnssec/"],
    ["DNS术语解释", "/glossary/dns/"],
    ["DNSSEC检测指南", "/tools/dnssec-check-guide/"],
    ["2026 DNS安全与域名治理报告", "/reports/2026-dns-security-governance-report/"]
  ]
};

function related(cluster) {
  const links = clusterLinks[cluster] ?? clusterLinks["buy-domain-with-usdt"];
  return links.map(([title, url]) => ({ title, url }));
}

function keywords(primary, secondary = []) {
  return { primary, secondary };
}

function scalar(value) {
  if (typeof value === "boolean") return String(value);
  return JSON.stringify(String(value));
}

function yamlObject(object, indent = 0) {
  return Object.entries(object)
    .map(([key, value]) => yamlPair(key, value, indent))
    .join("\n");
}

function yamlArray(array, indent = 0) {
  const pad = " ".repeat(indent);
  if (array.length === 0) return `${pad}[]`;
  return array
    .map((item) => {
      if (Array.isArray(item)) return `${pad}-\n${yamlArray(item, indent + 2)}`;
      if (typeof item === "object" && item !== null) return `${pad}-\n${yamlObject(item, indent + 2)}`;
      return `${pad}- ${scalar(item)}`;
    })
    .join("\n");
}

function yamlPair(key, value, indent = 0) {
  const pad = " ".repeat(indent);
  if (Array.isArray(value)) {
    if (value.length === 0) return `${pad}${key}: []`;
    return `${pad}${key}:\n${yamlArray(value, indent + 2)}`;
  }
  if (typeof value === "object" && value !== null) return `${pad}${key}:\n${yamlObject(value, indent + 2)}`;
  return `${pad}${key}: ${scalar(value)}`;
}

function frontmatter(data) {
  return yamlObject(data);
}

function bodyFor(item) {
  const links = related(item.cluster);
  const [pillar, peer, term, tool, report] = links;
  const focus = item.focus ?? item.description;

  if (item.type === "tool") {
    return `## 摘要

${focus}

## 使用方式

先确认页面更新时间，再逐项核对注册商政策、支付链、KYC、发票、退款、DNSSEC 和 WHOIS/RDAP 隐私选项。工具页只能作为研究清单，不能替代注册商官方条款或法律意见。

## 检查表

| 检查项 | 需要确认 | 记录方式 |
| --- | --- | --- |
| 支付方式 | 是否支持 USDT、BTC、USDC 或第三方网关 | 记录官方页面与更新时间 |
| 链与手续费 | TRC20、ERC20、Polygon 等链是否可用 | 记录链、网络费和确认时间 |
| 身份与发票 | 是否要求 KYC、是否支持企业发票 | 记录适用场景 |
| 域名安全 | 是否支持 WHOIS 隐私、DNSSEC、Registry Lock | 记录 TLD 限制 |
| 争议处理 | 退款、失败支付、域名冻结与申诉路径 | 记录客服与条款链接 |

## 风险与限制

加密支付具有不可逆特征，支付成功不等于域名一定注册成功。链上转账、汇率、注册商风控、TLD 政策和争议处理都会影响最终结果。

## 合规边界

隐私保护用于减少个人信息公开暴露，不用于冒充身份、欺诈、侵权、逃避监管或其他违法目的。涉及高风险地区、制裁名单或敏感业务时，应进行额外合规审查。

## 相关入口

- [${pillar.title}](${pillar.url})
- [${peer.title}](${peer.url})
- [${term.title}](${term.url})
- [${tool.title}](${tool.url})
- [${report.title}](${report.url})

## 参考资料

- Google Search Central 关于 URL、结构化数据与 sitemap 的基础说明。
- ICANN 关于 DNS 与域名体系的基础解释。
`;
  }

  if (item.type === "glossary") {
    return `## 定义

${focus}

## 为什么重要

这个术语会影响域名购买、DNS 配置、隐私保护、加密支付和 Web3 身份研究的阅读理解。定义型页面用于给支柱页、工具页和报告页提供稳定内链。

## 常见误解

| 误解 | 更准确的理解 |
| --- | --- |
| 只看名称就能判断风险 | 需要结合注册商政策、技术机制和适用法律 |
| 隐私功能等于完全匿名 | 隐私保护不等于身份不可识别，也不改变合规义务 |
| Web3域名能替代所有DNS需求 | Web3域名和传统DNS有不同解析体系与治理边界 |

## 风险与限制

术语解释只提供基础定义，不能替代注册商条款、技术文档、法律意见或安全审计。涉及支付、隐私、DNS配置和身份系统时，应回到具体页面核验上下文。

## 相关术语与阅读

- [${pillar.title}](${pillar.url})
- [${peer.title}](${peer.url})
- [${term.title}](${term.url})
- [${tool.title}](${tool.url})
- [${report.title}](${report.url})
`;
  }

  if (item.type === "report") {
    return `## 摘要

${focus}

## 研究问题

本报告关注支付方式、域名注册流程、隐私保护、DNS 安全、注册商政策和稳定币基础设施之间的关系。报告不评估代币投资价值，也不提供金融建议。

## 核心发现

| 发现 | 解释 | 后续观察 |
| --- | --- | --- |
| 支付便利性提高 | 稳定币降低部分跨境支付摩擦 | 仍需核验注册商政策 |
| 隐私需求增长 | WHOIS/RDAP 暴露推动隐私保护需求 | 隐私不等于违法匿名 |
| 安全能力分化 | DNSSEC、锁定与争议处理能力不同 | 需要注册商级别比较 |

## 风险与限制

报告中的对比与观察必须以更新时间为边界。注册商支付政策、KYC、退款、TLD 支持和监管环境都可能变化。

## 合规边界

研究隐私域名注册时，本站只讨论 WHOIS 隐私、数据最小化、合规匿名性和风险教育；不得把内容用于欺诈、侵权、规避监管、逃避制裁或其他违法目的。

## 后续更新计划

季度更新数据集，月度检查核心引用，发现重大政策变化时发布新闻观察并回链到本报告。

## 相关入口

- [${pillar.title}](${pillar.url})
- [${peer.title}](${peer.url})
- [${term.title}](${term.url})
- [${tool.title}](${tool.url})
- [${report.title}](${report.url})
`;
  }

  return `## 摘要

${focus}

## 问题定义

本页讨论的核心问题是：在域名注册、续费、转移或研究场景中，如何理解相关支付方式、隐私保护、DNS 安全和合规边界。页面面向站长、研究者、创业团队和技术人员。

## 背景知识

域名是互联网基础设施的一部分，DNS 负责把人类可读的域名与网络资源关联起来。加密支付可以改变付款方式，但不会改变域名注册商、注册局、TLD 政策和争议解决机制。

## 核心结论

| 维度 | 结论 | 需要核验 |
| --- | --- | --- |
| 支付 | USDT 或其他加密货币可用于部分注册商或支付网关 | 支持币种、链、到账确认 |
| 隐私 | WHOIS/RDAP 隐私可减少公开暴露 | TLD 限制、KYC、注册商政策 |
| 安全 | DNSSEC、账户锁定、二次验证影响域名安全 | 注册商能力与启用状态 |
| 合规 | 隐私保护不等于违法匿名 | 业务用途、司法辖区、制裁与风控 |

## 风险与限制

链上支付不可逆，转账地址、链选择、汇率波动、支付超时和注册商风控都可能造成损失。域名还可能面临注册失败、退款复杂、争议、冻结、暂停、品牌侵权投诉或 DNS 配置错误。

## 合规边界

本站以教育研究方式讨论隐私保护、WHOIS 隐私、KYC、发票、退款和注册商政策。内容不得用于规避监管、逃避制裁、洗钱、欺诈、侵权或其他违法目的。对高风险业务，应先获得法律与合规意见。

## 相关术语与内链

- [${pillar.title}](${pillar.url})
- [${peer.title}](${peer.url})
- [${term.title}](${term.url})
- [${tool.title}](${tool.url})
- [${report.title}](${report.url})

## 参考资料

- Google Search Central：SEO、URL 与 sitemap 基础文档。
- ICANN：DNS 与域名体系基础说明。
`;
}

function pageBody(item) {
  return `## 页面定位

${item.focus ?? item.description}

## 编辑原则

本站坚持研究、教育、资料库和工具化表达，不提供金融投资建议，不代办违法匿名服务，不提供规避监管、逃避制裁、洗钱或欺诈用途的指导。

## 内容审核

所有核心页面都应检查标题、描述、URL、FAQ、风险提示、内链、参考资料和更新时间。涉及注册商政策、稳定币支付、DNS 安全或隐私注册时，需要保守表述并标明限制。

## 相关入口

- [USDT购买域名完整指南](/library/buy-domain-with-usdt/)
- [隐私域名注册完整指南](/library/private-domain-registration/)
- [编辑政策](/about/editorial-policy/)
- [风险披露](/legal/risk-disclosure/)
- [作者与编辑团队](/people/)
`;
}

const contentItems = [
  {
    collection: "library",
    slug: "buy-domain-with-usdt",
    title: "USDT购买域名完整指南：流程、风险与合规边界",
    description: "系统介绍USDT购买域名的流程、注册商类型、KYC、退款、链上支付风险与合规边界。",
    cluster: "buy-domain-with-usdt",
    type: "pillar",
    tags: ["USDT购买域名", "加密货币购买域名", "域名注册"],
    keywords: keywords("USDT购买域名", ["usdt买域名", "buy domain with USDT"]),
    focus: "USDT购买域名是指使用稳定币向支持加密支付的注册商或支付网关支付域名费用。它可以提高部分跨境付款便利性，但必须同时理解 KYC、退款、链选择、发票、争议处理和合规边界。"
  },
  {
    collection: "library",
    slug: "buy-domain-with-crypto",
    title: "加密货币购买域名完整指南",
    description: "比较USDT、BTC、USDC等加密货币购买域名的支付差异、注册商政策、风险与适用场景。",
    cluster: "buy-domain-with-crypto",
    type: "pillar",
    tags: ["加密货币购买域名", "虚拟货币购买域名"],
    keywords: keywords("加密货币购买域名", ["buy domain with crypto", "crypto domain registrar"]),
    focus: "加密货币购买域名覆盖稳定币、比特币和第三方支付网关等不同路径。核心不是追求噱头，而是核验注册商是否支持、支付失败如何处理、域名是否安全可控。"
  },
  {
    collection: "library",
    slug: "private-domain-registration",
    title: "隐私域名注册完整指南：WHOIS隐私与合规边界",
    description: "解释隐私域名注册、WHOIS/RDAP信息保护、匿名注册误区、KYC与合法使用边界。",
    cluster: "private-domain-registration",
    type: "pillar",
    tags: ["隐私域名注册", "WHOIS隐私保护", "匿名购买域名"],
    keywords: keywords("隐私域名注册", ["WHOIS隐私保护", "anonymous domain registration"]),
    focus: "隐私域名注册的合理目标是减少个人信息公开暴露，而不是实现违法匿名。页面用合规语言解释 WHOIS 隐私、RDAP、KYC、注册商政策和不适用场景。"
  },
  {
    collection: "library",
    slug: "buy-domain-with-usdt/is-it-safe",
    title: "USDT购买域名安全吗：风险、注册商与支付确认",
    description: "直接回答USDT购买域名的安全性，拆解链上支付、注册商信誉、退款、KYC和域名争议风险。",
    cluster: "buy-domain-with-usdt",
    type: "longtail",
    tags: ["USDT购买域名安全吗", "域名支付风险"],
    keywords: keywords("USDT购买域名安全吗", ["usdt买域名安全吗"]),
    focus: "USDT购买域名在支付层面可以完成跨境付款，但安全性取决于注册商信誉、链选择、风控政策、退款机制、账户保护和域名争议处理能力。"
  },
  {
    collection: "library",
    slug: "buy-domain-with-usdt/kyc",
    title: "USDT购买域名是否需要KYC",
    description: "说明使用USDT购买域名时可能遇到的KYC、发票、账户风控、企业采购和合规核验问题。",
    cluster: "buy-domain-with-usdt",
    type: "longtail",
    tags: ["USDT购买域名KYC", "域名注册KYC"],
    keywords: keywords("USDT购买域名是否需要KYC", ["usdt买域名实名"]),
    focus: "是否需要 KYC 不由 USDT 本身决定，而由注册商、支付网关、订单金额、账户风险、TLD 政策和适用法律共同决定。"
  },
  {
    collection: "library",
    slug: "buy-domain-with-usdt/trc20-vs-erc20",
    title: "TRC20和ERC20购买域名区别",
    description: "比较TRC20、ERC20、Polygon等链在USDT购买域名时的手续费、确认速度和误转风险。",
    cluster: "buy-domain-with-usdt",
    type: "longtail",
    tags: ["TRC20", "ERC20", "USDT支付"],
    keywords: keywords("TRC20和ERC20购买域名区别", ["USDT TRC20 ERC20"]),
    focus: "链选择影响手续费、到账速度、确认体验和误转风险。下单前必须确认注册商指定链、收款地址、支付窗口和订单匹配规则。"
  },
  {
    collection: "library",
    slug: "buy-domain-with-usdt/refund-risk",
    title: "USDT购买域名的退款与失败支付风险",
    description: "解释USDT支付不可逆、订单超时、链选择错误、注册失败和退款流程复杂等风险。",
    cluster: "buy-domain-with-usdt",
    type: "longtail",
    tags: ["USDT退款", "域名支付失败"],
    keywords: keywords("USDT购买域名退款", ["域名支付失败", "链上支付不可逆"]),
    focus: "USDT 转账完成后通常无法像银行卡一样撤回。若订单超时、地址错误或注册失败，退款流程依赖注册商与支付网关政策。"
  },
  {
    collection: "library",
    slug: "buy-domain-with-crypto/btc-vs-usdt",
    title: "USDT vs BTC购买域名：速度、波动与退款差异",
    description: "比较USDT和BTC购买域名时的价格波动、确认时间、手续费、支付网关和退款处理差异。",
    cluster: "buy-domain-with-crypto",
    type: "longtail",
    tags: ["BTC购买域名", "USDT购买域名"],
    keywords: keywords("USDT vs BTC购买域名", ["bitcoin domain registration"]),
    focus: "USDT 更接近计价稳定的支付工具，BTC 则存在更明显价格波动与确认体验差异。最终选择仍取决于注册商支持和风险承受能力。"
  },
  {
    collection: "library",
    slug: "private-domain-registration/anonymous-vs-private",
    title: "匿名注册和隐私保护有什么区别",
    description: "解释匿名域名注册、隐私域名注册、WHOIS隐私、KYC和合规匿名性的差异。",
    cluster: "private-domain-registration",
    type: "longtail",
    tags: ["匿名域名注册", "隐私域名注册"],
    keywords: keywords("匿名注册和隐私保护", ["anonymous vs private domain registration"]),
    focus: "隐私保护是减少公开信息暴露，匿名注册常被误解为完全不可识别。合规场景应讨论 WHOIS 隐私、数据最小化和合理身份保护。"
  },
  {
    collection: "library",
    slug: "private-domain-registration/whois-privacy",
    title: "WHOIS隐私保护是什么",
    description: "介绍WHOIS隐私保护解决的问题、可见信息、TLD限制、RDAP关系和合规边界。",
    cluster: "private-domain-registration",
    type: "longtail",
    tags: ["WHOIS隐私保护", "RDAP"],
    keywords: keywords("WHOIS隐私保护", ["whois privacy"]),
    focus: "WHOIS 隐私保护通过隐藏或替换公开注册信息来降低个人信息暴露，但不取消注册商、注册局或执法合规流程中的核验可能。"
  },
  {
    collection: "research",
    slug: "web3-domain-identity",
    title: "Web3域名与数字身份研究框架",
    description: "研究Web3域名、ENS、钱包地址、品牌保护、传统DNS与数字身份治理之间的关系。",
    cluster: "web3-domain-identity",
    type: "pillar",
    tags: ["Web3域名", "数字身份", "ENS"],
    keywords: keywords("Web3域名", ["区块链域名", "ENS域名"]),
    focus: "Web3 域名把名称、地址、身份和资产入口连接起来，但它不天然替代传统 DNS。研究重点在互操作性、品牌保护、治理和用户安全。"
  },
  {
    collection: "research",
    slug: "stablecoin-economy",
    title: "稳定币经济影响研究",
    description: "从跨境支付、互联网服务采购、加密支付网关和金融稳定风险角度研究稳定币经济影响。",
    cluster: "stablecoin-economy",
    type: "pillar",
    tags: ["稳定币经济", "USDT跨境支付"],
    keywords: keywords("稳定币经济", ["stablecoin economy", "USDT跨境支付"]),
    focus: "稳定币正在影响跨境支付、互联网服务采购和加密支付网关，但其风险同样涉及储备、监管、链上拥堵、合规审查和用户保护。"
  },
  {
    collection: "research",
    slug: "dns-security-governance",
    title: "DNS安全与域名治理指南",
    description: "解释DNS、DNSSEC、域名劫持、Registry Lock、ICANN治理和注册局安全机制。",
    cluster: "dns-security-governance",
    type: "pillar",
    tags: ["DNS安全", "DNSSEC", "域名治理"],
    keywords: keywords("DNS安全", ["DNSSEC", "域名治理"]),
    focus: "DNS 安全决定域名是否可靠解析。支付方式只是入口，长期运营还需要 DNSSEC、账户安全、注册商锁定、争议处理和治理理解。"
  },
  {
    collection: "research",
    slug: "web3-domain-identity/ens-vs-dns",
    title: "ENS和DNS有什么区别",
    description: "比较ENS与传统DNS在解析体系、治理、所有权、品牌保护和用户体验上的差异。",
    cluster: "web3-domain-identity",
    type: "research",
    tags: ["ENS", "DNS", "Web3域名"],
    keywords: keywords("ENS和DNS区别", ["ENS vs DNS"]),
    focus: "ENS 和 DNS 都围绕名称解析，但它们的治理结构、技术栈、用户风险和应用场景不同。企业通常需要同时理解两套系统。"
  },
  {
    collection: "research",
    slug: "stablecoin-economy/stablecoins-and-domain-payments",
    title: "稳定币与域名支付基础设施",
    description: "研究稳定币如何进入域名注册、续费、跨境采购和互联网基础设施支付场景。",
    cluster: "stablecoin-economy",
    type: "research",
    tags: ["稳定币支付", "域名支付"],
    keywords: keywords("稳定币与域名支付", ["stablecoins and domain payments"]),
    focus: "稳定币可以降低部分跨境付款摩擦，但域名支付仍受注册商、支付网关、KYC、发票、退款和争议机制约束。"
  },
  {
    collection: "research",
    slug: "dns-security-governance/dnssec",
    title: "DNSSEC为什么重要",
    description: "解释DNSSEC的作用、可防范的风险、启用限制和与域名注册商安全能力的关系。",
    cluster: "dns-security-governance",
    type: "research",
    tags: ["DNSSEC", "DNS安全"],
    keywords: keywords("DNSSEC为什么重要", ["DNSSEC"]),
    focus: "DNSSEC 可以帮助验证 DNS 响应完整性，降低部分篡改风险。但它不是万能安全方案，还需要注册商账户保护和正确配置。"
  },
  {
    collection: "reports",
    slug: "2026-usdt-domain-report",
    title: "2026 USDT购买域名研究报告",
    description: "聚焦USDT购买域名的注册商支持、链选择、KYC、退款、发票、隐私保护与合规边界。",
    cluster: "buy-domain-with-usdt",
    type: "report",
    schemaType: "CreativeWork",
    tags: ["2026报告", "USDT购买域名"],
    keywords: keywords("2026 USDT购买域名研究报告"),
    focus: "本报告为 USDT 购买域名主题建立年度观察框架，关注注册商政策变化、支付链差异、失败支付、隐私保护和风险教育。"
  },
  {
    collection: "reports",
    slug: "2026-crypto-domain-registrar-observatory",
    title: "2026 加密货币域名注册商观察",
    description: "观察域名注册商对USDT、BTC、USDC和加密支付网关的支持变化及风险提示。",
    cluster: "buy-domain-with-crypto",
    type: "report",
    schemaType: "CreativeWork",
    tags: ["注册商研究", "加密支付"],
    keywords: keywords("加密货币域名注册商观察"),
    focus: "注册商对加密支付的支持并不稳定，必须持续跟踪币种、链、KYC、退款、发票和 TLD 限制。"
  },
  {
    collection: "reports",
    slug: "2026-web3-domain-trends",
    title: "2026 Web3域名趋势报告",
    description: "研究Web3域名、ENS、去中心化域名、钱包身份和传统DNS之间的趋势与限制。",
    cluster: "web3-domain-identity",
    type: "report",
    schemaType: "CreativeWork",
    tags: ["Web3域名", "趋势报告"],
    keywords: keywords("2026 Web3域名趋势报告"),
    focus: "Web3 域名仍处在多生态并存阶段。趋势判断需要同时观察用户体验、品牌保护、解析兼容性和治理风险。"
  },
  {
    collection: "reports",
    slug: "2026-stablecoin-internet-payments",
    title: "2026 稳定币与互联网支付基础设施报告",
    description: "分析稳定币在域名、主机、SaaS与跨境互联网服务采购中的机会、限制和监管风险。",
    cluster: "stablecoin-economy",
    type: "report",
    schemaType: "CreativeWork",
    tags: ["稳定币", "互联网支付"],
    keywords: keywords("稳定币与互联网支付基础设施"),
    focus: "稳定币支付可能进入更多互联网服务采购场景，但合规、退款、会计、制裁筛查和消费者保护问题仍是关键限制。"
  },
  {
    collection: "reports",
    slug: "2026-domain-privacy-compliance-report",
    title: "2026 域名隐私与合规报告",
    description: "研究WHOIS/RDAP隐私、KYC、匿名注册误区、数据保护和域名注册合规边界。",
    cluster: "private-domain-registration",
    type: "report",
    schemaType: "CreativeWork",
    tags: ["域名隐私", "合规报告"],
    keywords: keywords("域名隐私与合规报告"),
    focus: "域名隐私需求会继续存在，但合规表达必须从数据保护、WHOIS 隐私和合法匿名性出发，而不是承诺不可追踪。"
  },
  {
    collection: "reports",
    slug: "2026-dns-security-governance-report",
    title: "2026 DNS安全与域名治理报告",
    description: "梳理DNSSEC、注册商锁定、域名劫持、ICANN治理和注册局安全实践。",
    cluster: "dns-security-governance",
    type: "report",
    schemaType: "CreativeWork",
    tags: ["DNS安全", "域名治理"],
    keywords: keywords("DNS安全与域名治理报告"),
    focus: "DNS 安全报告用于提升站点权威性，解释域名基础设施安全能力与注册商选择之间的关系。"
  },
  {
    collection: "tools",
    slug: "crypto-domain-registrar-comparison",
    title: "加密支付域名注册商对比表",
    description: "对比注册商是否支持USDT、支持链、KYC、WHOIS隐私、发票、退款、DNSSEC与风险评级。",
    cluster: "buy-domain-with-crypto",
    type: "tool",
    schemaType: "Dataset",
    tags: ["注册商对比", "加密支付"],
    keywords: keywords("加密支付域名注册商对比"),
    focus: "该工具以表格方式记录注册商支付与域名安全能力，便于每周更新和引用。"
  },
  {
    collection: "tools",
    slug: "usdt-domain-risk-checklist",
    title: "USDT购买域名风险检查清单",
    description: "在使用USDT购买域名前检查链选择、收款地址、订单超时、KYC、退款、发票与域名安全。",
    cluster: "buy-domain-with-usdt",
    type: "tool",
    schemaType: "Dataset",
    tags: ["USDT风险清单", "域名购买"],
    keywords: keywords("USDT购买域名风险检查清单"),
    focus: "该清单帮助用户在付款前完成基本核验，降低误转、超时、退款困难和域名控制权风险。"
  },
  {
    collection: "tools",
    slug: "domain-privacy-checklist",
    title: "域名隐私保护检查清单",
    description: "检查WHOIS/RDAP展示、隐私代理、KYC、联系邮箱、DNS安全和不适用匿名场景。",
    cluster: "private-domain-registration",
    type: "tool",
    schemaType: "Dataset",
    tags: ["域名隐私", "WHOIS隐私"],
    keywords: keywords("域名隐私保护检查清单"),
    focus: "该清单用于把隐私注册需求转换为合法、可审计、可维护的域名保护流程。"
  },
  {
    collection: "tools",
    slug: "whois-rdap-guide",
    title: "WHOIS/RDAP查询入口与解释指南",
    description: "说明WHOIS与RDAP查询结果、公开字段、隐私保护状态和合规使用边界。",
    cluster: "private-domain-registration",
    type: "tool",
    schemaType: "Dataset",
    tags: ["WHOIS", "RDAP"],
    keywords: keywords("WHOIS RDAP查询"),
    focus: "WHOIS/RDAP 查询可以帮助理解域名公开信息，但查询结果不应用于骚扰、滥用或其他不当用途。"
  },
  {
    collection: "tools",
    slug: "dnssec-check-guide",
    title: "DNSSEC检测指南",
    description: "介绍DNSSEC检测、启用前准备、常见配置错误和与注册商安全能力的关系。",
    cluster: "dns-security-governance",
    type: "tool",
    schemaType: "Dataset",
    tags: ["DNSSEC", "DNS检测"],
    keywords: keywords("DNSSEC检测指南"),
    focus: "DNSSEC 检测用于确认域名是否具备 DNS 响应验证能力，但启用前应了解 DS 记录、密钥轮换和解析商支持。"
  }
];

const glossary = [
  ["usdt", "USDT", "解释USDT作为稳定币在域名支付、链选择、转账确认和退款风险中的角色。", "stablecoin-economy"],
  ["domain-name", "域名", "解释域名作为互联网资源名称、品牌入口和数字身份基础设施的作用。", "dns-security-governance"],
  ["dns", "DNS", "解释DNS如何把域名与网络资源关联起来，以及为什么它是域名研究的基础。", "dns-security-governance"],
  ["whois", "WHOIS", "解释WHOIS公开注册信息、隐私保护、RDAP替代和合规查询边界。", "private-domain-registration"],
  ["rdap", "RDAP", "解释RDAP作为注册数据访问协议与WHOIS的关系，以及隐私显示差异。", "private-domain-registration"],
  ["dnssec", "DNSSEC", "解释DNSSEC如何帮助验证DNS响应完整性及其配置限制。", "dns-security-governance"],
  ["web3-domain", "Web3域名", "解释Web3域名、链上名称、钱包地址映射和传统DNS之间的差异。", "web3-domain-identity"],
  ["stablecoin", "稳定币", "解释稳定币的支付属性、储备与监管风险，以及互联网服务采购中的用途。", "stablecoin-economy"]
].map(([slug, title, description, cluster]) => ({
  collection: "glossary",
  slug,
  title,
  description,
  cluster,
  type: "glossary",
  schemaType: "DefinedTerm",
  tags: [title],
  keywords: keywords(title),
  focus: description
}));

const courses = [
  ["domain-basics", "什么是域名", "入门解释域名、注册商、注册局、TLD、解析和续费的基础概念。", "dns-security-governance"],
  ["dns-basics", "什么是DNS", "解释DNS解析、权威服务器、递归解析、缓存和常见安全风险。", "dns-security-governance"],
  ["usdt-basics", "什么是USDT", "解释USDT的稳定币属性、常见链、转账确认、费用和支付风险。", "stablecoin-economy"],
  ["web3-domain-basics", "什么是Web3域名", "解释Web3域名、ENS、钱包地址、去中心化域名和传统DNS差异。", "web3-domain-identity"]
].map(([slug, title, description, cluster]) => ({
  collection: "courses",
  slug,
  title,
  description,
  cluster,
  type: "course",
  schemaType: "Course",
  tags: [title],
  keywords: keywords(title),
  focus: description
}));

const faqs = [
  {
    collection: "faq",
    slug: "usdt-domain-registration-faq",
    title: "USDT购买域名常见问题",
    description: "集中回答USDT购买域名是否安全、是否需要KYC、是否能退款、是否等于匿名等问题。",
    cluster: "buy-domain-with-usdt",
    type: "faq",
    schemaType: "FAQPage",
    tags: ["USDT购买域名FAQ"],
    keywords: keywords("USDT购买域名常见问题"),
    focus: "FAQ 页面直接回答用户问题，并把答案链接回支柱页、工具页、术语页和报告页。"
  },
  {
    collection: "faq",
    slug: "private-domain-registration-faq",
    title: "隐私域名注册常见问题",
    description: "回答隐私域名注册、匿名注册误区、WHOIS隐私、RDAP和合规边界相关问题。",
    cluster: "private-domain-registration",
    type: "faq",
    schemaType: "FAQPage",
    tags: ["隐私域名注册FAQ"],
    keywords: keywords("隐私域名注册常见问题"),
    focus: "隐私域名注册 FAQ 用合规表达承接匿名购买域名相关搜索意图。"
  }
];

const pages = [
  ["about", "学院简介", "介绍Web3域名与稳定币研究学院的定位、研究方向、内容系统和边界。"],
  ["about/mission", "研究使命", "说明本站为什么研究加密支付、域名基础设施、Web3身份和稳定币经济。"],
  ["about/editorial-policy", "编辑政策", "公开内容选题、资料核验、AI生成、人工审核、更新和纠错流程。"],
  ["about/disclaimer", "免责声明", "说明本站内容不构成投资、金融、法律或税务建议，也不提供违法匿名指导。"],
  ["about/contact", "联系方式", "提供联系、纠错、合作、投稿和注册商政策更新反馈入口。"],
  ["about/contribute", "合作与投稿", "说明外部贡献者如何提交资料、披露利益关系和接受编辑审核。"],
  ["legal/risk-disclosure", "风险披露", "集中披露加密支付、稳定币、域名注册、隐私保护和DNS安全相关风险。"],
  ["legal/privacy-policy", "隐私政策", "说明本站如何处理访问、投稿、联系和内容更新相关数据。"],
  ["legal/terms", "使用条款", "说明访问本站内容、引用资料、使用工具和提交反馈的基本条款。"],
  ["legal/corrections-policy", "纠错政策", "说明事实错误、链接失效、注册商政策变化和风险提示更新的处理方式。"]
].map(([slug, title, description]) => ({
  collection: "pages",
  slug,
  title,
  description,
  section: slug.startsWith("legal/") ? "legal" : "about",
  cluster: "site-policy",
  type: "policy",
  tags: ["站点政策"],
  keywords: keywords(title),
  focus: description
}));

const news = [
  {
    collection: "news",
    slug: "weekly-briefing/2026-05-04",
    title: "2026-05-04 加密支付与域名基础设施每周观察",
    description: "本周观察注册商支付政策、稳定币支付基础设施、DNS安全和Web3域名研究的更新方向。",
    cluster: "buy-domain-with-crypto",
    type: "news",
    tags: ["每周观察"],
    keywords: keywords("加密支付与域名基础设施每周观察"),
    focus: "新闻观察用于记录可变化事项，避免频繁扰动支柱页和报告页。"
  }
];

const allItems = [...contentItems, ...glossary, ...courses, ...faqs, ...pages, ...news];

function normalizeItem(item) {
  const section =
    item.section ??
    (item.collection === "courses"
      ? "learn"
      : item.collection === "pages"
        ? item.slug.startsWith("legal/")
          ? "legal"
          : "about"
        : item.collection);
  const cluster = item.cluster ?? "site-policy";
  const schemaType =
    item.schemaType ??
    (item.type === "glossary"
      ? "DefinedTerm"
      : item.type === "tool"
        ? "Dataset"
        : item.type === "report"
          ? "CreativeWork"
          : item.type === "course"
            ? "Course"
            : item.type === "faq"
              ? "FAQPage"
              : "Article");
  return {
    title: item.title,
    description: item.description,
    slug: item.slug,
    section,
    cluster,
    type: item.type,
    language: "zh-CN",
    publishedAt: DATE,
    updatedAt: DATE,
    author: AUTHOR,
    reviewer: REVIEWER,
    tags: item.tags ?? [],
    keywords: item.keywords ?? keywords(item.title),
    riskLevel: item.riskLevel ?? "medium",
    index: true,
    audience: ["站长", "研究者", "Web3创业者", "技术人员"],
    summary: item.focus ?? item.description,
    faqs: [
      {
        question: `${item.title}适合谁阅读？`,
        answer: "适合需要理解域名注册、加密支付、隐私保护、DNS安全或稳定币基础设施的研究者、站长和创业团队。"
      },
      {
        question: "页面内容是否构成投资或法律建议？",
        answer: "不构成。页面仅用于教育研究和资料整理，具体决策应结合注册商条款、适用法律和专业意见。"
      }
    ],
    references: commonRefs,
    related: related(cluster),
    updateCadence:
      item.type === "pillar" ? "monthly" : item.type === "tool" ? "weekly" : item.type === "report" ? "quarterly" : "as-needed",
    schemaType
  };
}

async function writeContentItem(item) {
  const data = normalizeItem(item);
  const dir = path.join(ROOT, "src", "content", item.collection, path.dirname(item.slug));
  const basename = path.basename(item.slug);
  await mkdir(dir, { recursive: true });
  const body = item.collection === "pages" ? pageBody(item) : bodyFor(item);
  const file = path.join(dir, `${basename}.md`);
  await writeFile(file, `---\n${frontmatter(data)}\n---\n\n${body}`, "utf8");
}

async function writeAuthors() {
  const authors = [
    {
      name: AUTHOR,
      slug: "editorial-team",
      title: "编辑团队",
      description: "负责支柱页、知识库、工具页和报告的编辑维护，重点检查事实、风险、内链和更新节奏。",
      role: "Editorial Team",
      focus: ["USDT购买域名", "隐私域名注册", "SEO/GEO内容结构"],
      updatedAt: DATE,
      disclosure: "编辑团队不接受以规避监管、欺诈、侵权或误导用户为目的的内容委托。",
      index: true
    },
    {
      name: REVIEWER,
      slug: "research-desk",
      title: "研究审稿组",
      description: "负责研究报告、DNS安全、稳定币经济和注册商政策变更的审稿与风险提示。",
      role: "Research Desk",
      focus: ["DNS安全", "稳定币经济", "域名治理"],
      updatedAt: DATE,
      disclosure: "审稿组不代表注册商、交易所或任何金融机构提供建议。",
      index: true
    }
  ];

  for (const author of authors) {
    const dir = path.join(ROOT, "src", "content", "authors");
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, `${author.slug}.md`), `---\n${frontmatter(author)}\n---\n`, "utf8");
  }
}

for (const item of allItems) {
  await writeContentItem(item);
}
await writeAuthors();

console.log(`Seeded ${allItems.length} content pages and 2 author profiles.`);
