---
title: "注册局"
description: "解释域名注册局的角色、与注册商的区别、对顶级域的管理权以及与DNS安全和治理的关系。"
slug: "registry"
section: "glossary"
cluster: "dns-security-governance"
type: "glossary"
language: "zh-CN"
publishedAt: "2026-02-28"
updatedAt: "2026-04-10"
author: "Web3 Domain Institute Editorial Team"
reviewer: "Domain Infrastructure Research Desk"
tags:
- "注册局"
- "域名体系"
keywords:
 primary: "注册局"
 secondary: []
riskLevel: "medium"
index: true
audience:
- "域名持有者"
- "研究者"
- "Web3创业者"
- "技术人员"
summary: "解释域名注册局的角色、与注册商的区别、对顶级域的管理权以及与DNS安全和治理的关系。"
faqs:
-
  question: "注册局适合谁阅读？"
  answer: "适合需要理解域名注册、加密支付、隐私保护、DNS安全或稳定币基础设施的研究者、域名持有者和创业团队。"
-
  question: "页面内容是否构成投资或法律建议？"
  answer: "不构成。页面仅用于教育研究和资料整理，具体决策应结合注册商条款、适用法律和专业意见。"
references:
-
  title: "ICANN: Domain Name System"
  url: "https://www.icann.org/resources/pages/what-2012-02-25-en"
  source: "ICANN"
-
  title: "ICANN: DNSSEC Overview"
  url: "https://www.icann.org/resources/pages/dnssec-what-is-it-and-why-is-it-important-2019-02-21-en"
  source: "ICANN"
-
  title: "IANA Root Zone Database"
  url: "https://www.iana.org/domains/root/db"
  source: "IANA"
related:
-
  title: "注册商术语"
  url: "/glossary/registrar/"
-
  title: "DNS术语"
  url: "/glossary/dns/"
-
  title: "DNSSEC术语"
  url: "/glossary/dnssec/"
-
  title: "DNS安全治理研究"
  url: "/research/dns-security-governance/"
updateCadence: "as-needed"
schemaType: "DefinedTerm"
---

## 定义

域名注册局（Registry）是负责运营和管理某个顶级域（TLD）的机构。注册局维护该TLD下所有已注册域名的权威数据库，运行TLD的权威DNS服务器，并通过共享注册系统（SRS）向认证注册商提供域名注册、续费、转移和删除的实时接口。注册局与注册商的关系是批发与零售的关系——注册局不直接面向终端用户销售域名，而是通过认证注册商网络分销。

每个gTLD有且仅有一个注册局运营者，该运营权通过ICANN的注册局协议（Registry Agreement）授予。例如Verisign运营.com和.net，Identity Digital运营多个新gTLD。ccTLD的注册局通常由各国政府指定的机构运营，如CNNIC运营.cn。注册局的职责包括维护TLD的区域文件（zone file）、部署DNSSEC签名、实施注册政策以及执行IDN（国际化域名）变体规则。

注册局在DNS安全架构中扮演关键角色。TLD的DNSSEC密钥签名密钥（KSK）由注册局管理，其安全状态直接影响该TLD下所有域名的解析可信度。若注册局的DNS基础设施遭受攻击或密钥管理出现失误，整个TLD的域名解析可能受到波及。

## 为什么重要

注册局的技术运维质量直接决定TLD下所有域名的可用性和安全性。注册局的DNSSEC部署状态、Anycast网络覆盖和灾难恢复能力影响域名解析的延迟和抗攻击能力。对于域名持有者而言，理解注册局的角色有助于区分注册商层面的服务问题与注册局层面的系统性风险。

## 常见误解

| 误解 | 更准确的理解 |
| --- | --- |
| 注册局和注册商是同一实体 | 注册局管理TLD数据库，注册商面向用户销售，二者角色不同 |
| 注册局可以直接修改域名的注册信息 | 注册局通过注册商间接管理，域名持有者的数据变更须经注册商提交 |
| 所有TLD的注册局运营标准一致 | gTLD遵循ICANN统一协议，ccTLD的运营标准因国家而异 |

## 风险与限制

注册局的运营失败或恶意行为是域名持有者的系统性风险。若注册局未能履行ICANN注册局协议的义务（如维持DNS服务的99.9%可用性），ICANN可启动授权终止程序并指定后备注册局接管，但过渡期间域名的解析和续费可能出现中断。2019年.Uniregistry将多个gTLD出售给Identity Digital的案例表明，注册局所有权变更可能带来政策调整。

DNS安全层面，注册局的DNSSEC密钥轮转操作需要极高的精确性。2017年Verisign在轮转.com的KSK时曾因技术问题导致部分递归解析器验证失败，影响了全球数百万用户的域名解析。域名持有者虽然无法直接控制注册局的密钥管理，但应关注所使用TLD的DNSSEC运营历史和应急响应能力，以评估其解析基础设施的可靠程度。

## 相关术语与阅读

- [DNS安全与域名治理研究](/research/dns-security-governance/)
- [DNSSEC部署分析](/research/dns-security-governance/dnssec/)
- [DNS劫持攻击研究](/research/dns-security-governance/dns-hijacking/)
- [DNS over HTTPS研究](/research/dns-security-governance/dns-over-https/)
- [DNS安全常见问题](/faq/dns-security-faq/)
- [进阶：DNSSEC部署实践](/courses/advanced-dnssec-deployment/)

- [注册商术语](/glossary/registrar/)
- [DNS术语](/glossary/dns/)
- [DNSSEC术语](/glossary/dnssec/)
- [DNS安全治理研究](/research/dns-security-governance/)