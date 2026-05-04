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
  "dns-security-governance": "DNS安全与域名治理"
};

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export function titleFromSegment(segment: string) {
  return labels[segment] ?? segment.replaceAll("-", " ");
}

export function buildBreadcrumbs(section: string, slug: string, title: string) {
  const items: BreadcrumbItem[] = [{ label: "首页", href: "/" }];
  const sectionHref = section === "about" || section === "legal" ? `/${section}/` : `/${section}/`;
  items.push({ label: titleFromSegment(section), href: sectionHref });

  const parts = slug.split("/").filter(Boolean);
  if (parts[0] === section) parts.shift();
  if (parts.length === 0) {
    items[items.length - 1] = { label: title, href: sectionHref };
    return items;
  }
  let href = `/${section}/`;
  parts.forEach((part, index) => {
    href += `${part}/`;
    const isLast = index === parts.length - 1;
    items.push({
      label: isLast ? title : titleFromSegment(part),
      href
    });
  });

  return items;
}
