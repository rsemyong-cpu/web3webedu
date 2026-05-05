---
title: "DoH与DoT加密DNS研究"
description: "研究DNS over HTTPS和DNS over TLS协议的工作原理、隐私保护效果、部署现状及对域名持有者的意义。"
slug: "dns-security-governance/dns-over-https"
section: "research"
cluster: "dns-security-governance"
type: "longtail"
language: "zh-CN"
publishedAt: "2026-04-25"
updatedAt: "2026-04-28"
author: "Web3 Domain Institute Editorial Team"
reviewer: "Domain Infrastructure Research Desk"
tags:
- "DoH"
- "DoT"
- "加密DNS"
- "DNS隐私"
keywords:
 primary: "DoH加密DNS"
 secondary:
   - "DNS over HTTPS"
   - "DNS over TLS"
riskLevel: "medium"
index: true
audience:
- "域名持有者"
- "研究者"
- "Web3创业者"
- "技术人员"
summary: "研究DNS over HTTPS和DNS over TLS协议的工作原理、隐私保护效果、部署现状及对域名持有者的意义。"
faqs:
-
  question: "DoH和DoT有什么区别？"
  answer: "DoT（DNS over TLS）使用TCP 853端口建立TLS加密通道传输DNS查询，是专门的DNS加密协议，易于被网络管理员识别和管理。DoH（DNS over HTTPS）使用TCP 443端口将DNS查询封装在HTTPS请求中，与普通网页流量混合，难以被识别和过滤，隐私性更强但管理挑战更大。"
-
  question: "加密DNS对域名持有者有什么实际影响？"
  answer: "加密DNS改变了DNS查询的路径：用户可能绕过本地ISP的递归解析器，直接向Cloudflare或Google等公共DoH/DoT解析器查询。这意味着域名持有者通过传统ISP层面对DNS解析的可见性和控制力下降，同时也意味着DNSSEC验证可能依赖解析器而非本地网络配置。域名持有者应确保DNS记录在主要公共解析器上正确解析。"
references:
-
  title: "ICANN: Domain Name System (DNS)"
  url: "https://www.icann.org/resources/pages/what-2012-02-25-en"
  source: "ICANN"
-
  title: "ICANN: DNSSEC"
  url: "https://www.icann.org/resources/pages/dnssec-2012-02-25-en"
  source: "ICANN"
-
  title: "NIST SP 800-81"
  url: "https://csrc.nist.gov/publications/detail/sp/800-81/2/final"
  source: "NIST"
related:
-
  title: "DNS劫持与防护研究"
  url: "/research/dns-security-governance/dns-hijacking/"
-
  title: "DNSSEC研究"
  url: "/research/dns-security-governance/dnssec/"
-
  title: "DNS安全治理研究"
  url: "/research/dns-security-governance/"
-
  title: "DNS术语"
  url: "/glossary/dns/"
updateCadence: "as-needed"
schemaType: "Article"
---

## 摘要

DNS over HTTPS和DNS over TLS协议通过加密DNS查询和响应，防止第三方监听和篡改用户的DNS请求。DoH和DoT在隐私保护和部署策略上存在差异，其推广对域名持有者的DNS解析监控、安全策略和运营方式具有实质影响。

## 问题定义

本页讨论的核心问题是：DoH和DoT协议的工作原理和差异是什么，加密DNS对用户隐私的保护效果如何，浏览器和操作系统的部署现状怎样，以及对域名持有者的DNS运营有何影响。

## 背景知识

传统DNS查询以明文形式通过UDP 53端口传输，任何网络路径上的观察者都能看到用户查询的域名。这一设计缺陷使ISP、网络管理员和恶意攻击者能够监控用户访问的网站，甚至篡改DNS响应。IETF分别于2016年和2018年标准化了DoT（RFC 7858）和DoH（RFC 8484）协议，为DNS查询提供传输层加密。

## DoT协议机制

DoT在TCP 853端口上建立TLS加密通道，DNS查询和响应在该通道内传输。递归解析器作为DoT服务器监听853端口，客户端（如操作系统DNS解析器或路由器）与解析器完成TLS握手后，通过加密连接发送DNS查询。DoT使用专用端口，网络管理员可识别和管理DoT流量，在企业环境中便于实施DNS安全策略和流量审计。

## DoH协议机制

DoH将DNS查询封装在HTTP/2或HTTP/3请求中，通过TCP 443端口与普通HTTPS网页流量混合传输。DoH服务器作为HTTPS端点提供服务，客户端将DNS查询编码为HTTP请求发送至该端点。由于DoH流量与普通网页流量无法区分，网络管理员难以识别和过滤，这为用户提供了更强的隐私保护，但也削弱了企业网络和公共网络中的DNS管理能力。

## 隐私保护效果

DoH和DoT的核心价值是防止DNS查询被第三方监听。在明文DNS环境下，ISP可以看到用户访问的每个域名（虽不能看到具体页面内容），并可能基于DNS查询进行流量分类、限速或审查。加密DNS使ISP只能看到用户与DoH/DoT解析器之间的加密连接，无法获知具体的DNS查询内容。

但加密DNS并非完整的隐私方案：ISP仍可通过SNI（Server Name Indication）和IP地址推断用户访问的网站。ESNI和ECH（Encrypted Client Hello）技术正在解决SNI泄露问题，但部署仍在推进中。完整的隐私保护需要加密DNS与加密SNI的组合。

## 浏览器部署现状

Firefox是DoH的主要推动者，默认在美国地区启用DoH，使用Cloudflare（1.1.1.1）作为首选解析器。Chrome提供DoH可选配置但未默认启用。Edge和Safari尚未原生支持DoH。浏览器的DoH部署策略引发了对DNS解析中心化的担忧：大量DNS查询从分散的ISP解析器集中到少数大型公共解析器，可能影响DNS生态的多样性和抗脆弱性。

企业环境中，浏览器通常尊重网络管理员通过canary域名或防火墙规则发出的DoH禁用信号。Firefox支持通过网络策略禁用DoH，Chrome也提供类似的管理机制。

## ISP与用户控制权的张力

加密DNS的推广引发了ISP与用户之间的控制权争议。ISP通过DNS查询监控用户行为、实施家长控制和遵守法规要求（如内容过滤）。DoH绕过了ISP的DNS基础设施，使其无法通过DNS层实施这些策略。部分国家（如英国）的ISP被法律要求通过DNS过滤特定内容，DoH的普及可能削弱这些法律机制的效力。

## 对域名持有者的影响

加密DNS对域名持有者的影响体现在以下方面：

**解析监控变化**：传统环境下域名持有者可通过ISP层面对域名解析的可见性间接了解流量分布。DoH/DoT使查询流向公共解析器，ISP层面的DNS监控数据不再完整反映实际解析情况。

**DNSSEC验证转移**：在加密DNS环境下，DNSSEC验证由DoH/DoT解析器执行而非本地网络。域名持有者需确保其DNSSEC配置在主要公共解析器（Cloudflare、Google、Quad9等）上正确验证。

**解析一致性**：不同DoH/DoT解析器可能对同一域名返回不同的解析结果（如基于地理位置的负载均衡）。域名持有者应验证域名在主要公共解析器上的解析行为是否符合预期。

**安全策略实施**：企业域名持有者若需在内部网络中实施DNS安全策略（如阻止访问恶意域名），需配置DNS策略以在DoH环境下保持有效，可通过企业网络管理工具禁用客户端DoH或部署内部DoH服务器。

## 风险与限制

加密DNS不等于安全DNS：DoH/DoT保护的是查询传输的隐私和完整性，但不验证DNS响应内容的真实性。DNSSEC仍需独立部署以提供端到端的数据源认证。加密DNS的推广可能导致解析中心化，少数公共解析器故障将影响大量用户。Split-horizon DNS（内网使用内部DNS、外网使用公共DNS）在DoH环境下可能被打破，影响企业内部域名解析。

## 合规边界

本站以教育研究方式讨论DoH和DoT协议的技术机制和影响。内容不构成法律或安全建议。域名持有者在部署加密DNS相关策略时应考虑本地法规要求，必要时咨询网络安全和法律专业意见。

## 相关术语与内链

- [DNS劫持与防护研究](/research/dns-security-governance/dns-hijacking/)
- [DNSSEC研究](/research/dns-security-governance/dnssec/)
- [DNS安全治理研究](/research/dns-security-governance/)
- [DNS术语](/glossary/dns/)

## 参考资料

- ICANN DNS 概览：域名系统核心机制与安全基础。
- ICANN DNSSEC 文档：DNS安全扩展的部署指南与验证机制。
- NIST SP 800-81：DNS服务器安全配置指南，涵盖加密DNS部署建议。
