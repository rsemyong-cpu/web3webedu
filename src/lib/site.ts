export const SITE = {
  name: "Web3 Domain Institute",
  zhName: "Web3域名与稳定币研究学院",
  enName: "Web3 Domain & Stablecoin Institute",
  description:
    "专注加密货币支付、域名基础设施、Web3身份、隐私注册与稳定币经济影响的开放研究型学院网站。",
  enDescription:
    "Open research institute focused on cryptocurrency payments, domain infrastructure, Web3 identity, privacy registration, and stablecoin economic impact.",
  defaultUrl: "https://web3-domain-institute.edu.pl",
  defaultImage:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=82",
  author: "Web3 Domain Institute Editorial Team"
};

export function absoluteUrl(path = "/", site?: URL | string) {
  const base = site?.toString() ?? SITE.defaultUrl;
  return new URL(path, base).toString();
}

export function localeFromPath(pathname: string): "zh-CN" | "en" {
  return pathname.startsWith("/en/") ? "en" : "zh-CN";
}

const translatedPaths = new Set([
  "/",
  "/learn/",
  "/research/",
  "/library/",
  "/reports/",
  "/tools/",
  "/news/",
  "/glossary/",
  "/faq/",
  "/people/",
  "/about/mission/",
  "/library/buy-domain-with-crypto/",
  "/library/buy-domain-with-usdt/",
  "/library/buy-domain-with-usdt/kyc/",
  "/library/buy-domain-with-usdt/trc20-vs-erc20/",
  "/library/private-domain-registration/",
  "/library/private-domain-registration/whois-privacy/",
  "/research/dns-security-governance/",
  "/research/dns-security-governance/dns-hijacking/",
  "/research/dns-security-governance/dnssec/",
  "/research/stablecoin-economy/",
  "/research/stablecoin-economy/stablecoins-and-domain-payments/",
  "/research/web3-domain-identity/",
  "/reports/2026-dns-security-governance-report/",
  "/reports/2026-usdt-domain-report/",
  "/tools/usdt-domain-risk-checklist/",
  "/tools/whois-rdap-guide/",
  "/glossary/ens/",
  "/glossary/usdt/",
  "/glossary/whois/",
  "/faq/crypto-domain-payment-faq/",
  "/faq/dns-security-faq/",
  "/faq/private-domain-registration-faq/",
  "/faq/stablecoin-economy-faq/",
  "/faq/usdt-domain-registration-faq/",
  "/faq/web3-domain-identity-faq/",
  "/learn/domain-basics/",
  "/learn/usdt-basics/",
  "/news/weekly-briefing/2026-05-04/"
]);

export function altLangPath(pathname: string): string | undefined {
  if (pathname.startsWith("/en/")) {
    const zhPath = pathname.replace(/^\/en/, "") || "/";
    return translatedPaths.has(zhPath) ? zhPath : undefined;
  }
  return translatedPaths.has(pathname) ? `/en${pathname}` : undefined;
}

export function localeName(locale: "zh-CN" | "en"): string {
  return locale === "en" ? "English" : "中文";
}
