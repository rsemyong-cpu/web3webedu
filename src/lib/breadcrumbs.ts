const labels: Record<string, string> = {
  learn: "课程",
  research: "研究",
  library: "知识库",
  reports: "报告",
  tools: "工具",
  news: "新闻",
  glossary: "术语",
  faq: "问答",
  about: "关于",
  legal: "法律",
  people: "作者",
  "buy-domain-with-usdt": "USDT购买域名",
  "buy-domain-with-crypto": "加密货币购买域名",
  "private-domain-registration": "隐私域名注册",
  "web3-domain-identity": "Web3域名与数字身份",
  "stablecoin-economy": "稳定币经济",
  "dns-security-governance": "DNS安全与域名治理",
  "cbdc-domain-infrastructure": "CBDC与域名基础设施",
  "nft-domain-market": "NFT域名市场",
  "cross-border-domain-compliance": "跨境域名合规"
};

const enLabels: Record<string, string> = {
  learn: "Courses",
  research: "Research",
  library: "Library",
  reports: "Reports",
  tools: "Tools",
  news: "News",
  glossary: "Glossary",
  faq: "FAQ",
  about: "About",
  legal: "Legal",
  people: "People",
  "buy-domain-with-usdt": "Buy Domain with USDT",
  "buy-domain-with-crypto": "Buy Domain with Crypto",
  "private-domain-registration": "Private Domain Registration",
  "web3-domain-identity": "Web3 Domain & Identity",
  "stablecoin-economy": "Stablecoin Economy",
  "dns-security-governance": "DNS Security & Governance",
  "cbdc-domain-infrastructure": "CBDC & Domain Infrastructure",
  "nft-domain-market": "NFT Domain Market",
  "cross-border-domain-compliance": "Cross-Border Domain Compliance"
};

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export function titleFromSegment(segment: string, isEn = false) {
  const map = isEn ? enLabels : labels;
  return map[segment] ?? segment.replaceAll("-", " ");
}

export function buildBreadcrumbs(section: string, slug: string, title: string, isEn = false) {
  const prefix = isEn ? "/en" : "";
  const items: BreadcrumbItem[] = [{ label: isEn ? "Home" : "首页", href: `${prefix}/` }];
  const sectionHref = section === "about" || section === "legal" ? `${prefix}/${section}/` : `${prefix}/${section}/`;
  items.push({ label: titleFromSegment(section, isEn), href: sectionHref });

  const parts = slug.split("/").filter(Boolean);
  if (parts[0] === section) parts.shift();
  if (parts.length === 0) {
    items[items.length - 1] = { label: title, href: sectionHref };
    return items;
  }
  let href = `${prefix}/${section}/`;
  parts.forEach((part, index) => {
    href += `${part}/`;
    const isLast = index === parts.length - 1;
    items.push({
      label: isLast ? title : titleFromSegment(part, isEn),
      href
    });
  });

  return items;
}
