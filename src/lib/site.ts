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

export function altLangPath(pathname: string): string {
  if (pathname.startsWith("/en/")) {
    return pathname.replace(/^\/en/, "") || "/";
  }
  return `/en${pathname}` || "/en/";
}

export function localeName(locale: "zh-CN" | "en"): string {
  return locale === "en" ? "English" : "中文";
}
