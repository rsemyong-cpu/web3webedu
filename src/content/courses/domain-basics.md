---
title: "什么是域名"
description: "入门解释域名、注册商、注册局、TLD、解析和续费的基础概念。"
slug: "domain-basics"
section: "learn"
cluster: "dns-security-governance"
type: "course"
language: "zh-CN"
publishedAt: "2026-03-01"
updatedAt: "2026-04-20"
author: "Web3 Domain Institute Editorial Team"
reviewer: "Domain Infrastructure Research Desk"
tags:
  - "什么是域名"
keywords:
  primary: "什么是域名"
  secondary: []
riskLevel: "medium"
index: true
audience:
  - "域名持有者"
  - "研究者"
  - "Web3创业者"
  - "技术人员"
summary: "入门解释域名、注册商、注册局、TLD、解析和续费的基础概念。"
faqs:
  -
    question: "什么是域名适合谁阅读？"
    answer: "适合需要理解域名注册、加密支付、隐私保护、DNS安全或稳定币基础设施的研究者、域名持有者和创业团队。"
  -
    question: "页面内容是否构成投资或法律建议？"
    answer: "不构成。页面仅用于教育研究和资料整理，具体决策应结合注册商条款、适用法律和专业意见。"
references:
 -
   title: "ICANN: Domain Name System (DNS)"
   url: "https://www.icann.org/resources/pages/what-2012-02-25-en"
   source: "ICANN"
 -
   title: "Tether: USDT Transparency"
   url: "https://tether.to/en/transparency"
   source: "Tether"
 -
   title: "ICANN: Registrar Accreditation Agreement"
   url: "https://www.icann.org/resources/pages/approved-with-specs-2013-09-17-en"
   source: "ICANN"

related:
  -
    title: "DNS安全与域名治理指南"
    url: "/research/dns-security-governance/"
  -
    title: "DNSSEC为什么重要"
    url: "/research/dns-security-governance/dnssec/"
  -
    title: "DNS术语解释"
    url: "/glossary/dns/"
  -
    title: "DNSSEC检测指南"
    url: "/tools/dnssec-check-guide/"
  -
    title: "2026 DNS安全与域名治理报告"
    url: "/reports/2026-dns-security-governance-report/"
updateCadence: "as-needed"
schemaType: "Course"
---

## 摘要

域名是互联网基础设施的核心标识层，将人类可读名称映射为网络资源地址。本课程系统讲解域名体系结构、注册商与注册局的职能分工、域名生命周期管理，以及跨境注册场景中的管辖权差异与政策考量。

## 课程目标

- 理解DNS层级结构与顶级域名分类体系
- 区分注册商与注册局的职能及认证机制
- 掌握域名从注册到过期赎回的完整生命周期
- 了解跨境注册中的司法管辖差异与政策合规要求

## 第一讲：域名体系结构

域名系统（DNS）采用树状层级结构：根域位于最顶层，向下依次为顶级域名（TLD）、二级域名（second-level domain）及更下级子域。TLD分为通用顶级域名（gTLD，如.com、.org）与国家代码顶级域名（ccTLD，如.cn、.de）。ICANN作为全球域名治理机构，负责根区管理、新gTLD审批及注册商认证，通过多利益相关方模型协调各方权益。二级域名由注册人在相应TLD规则下自行选择并注册，构成用户可直接访问的互联网地址。

## 第二讲：注册商与注册局

注册局（registry）负责特定TLD的域名数据库维护与运营，如Verisign运营.com与.net根区。注册商（registrar）面向终端用户提供域名注册、续费与管理服务，需与ICANN签订注册商认证协议（Registrar Accreditation Agreement, RAA）以获得gTLD销售资质。RAA规定了注册商的数据托管、WHOIS义务、用户权益保障及争议处理程序。此外，注册商可通过经销商（reseller）模型拓展销售渠道，但经销商不直接与ICANN签约，注册商需对经销商行为承担合规责任。ccTLD的认证体系则由各国家或地区注册局独立制定。

## 第三讲：域名生命周期

域名从注册到删除经历多个阶段：注册期（registration）为1至10年不等，由注册人选择；续费期（renewal）允许注册人在到期前延长有效期；转移期（transfer）支持注册人在注册商之间迁移域名，需通过授权码（authCode）验证所有权。若域名到期未续费，将进入宽限期（grace period，通常30至45天），期间仍可原价续费；随后进入赎回宽限期（redemption grace period, RGP，约30天），恢复需支付较高赎回费；最终进入待删除期（pending delete），域名被释放回公共池供重新注册。理解生命周期有助于避免意外丢失域名。

## 第四讲：跨境注册与管辖权

域名的法律管辖权取决于TLD类型与注册商注册地：gTLD受ICANN统一政策约束，而ccTLD由各国注册局自主管理，政策差异显著。部分司法辖区对域名注册实施备案或实名审查制度，而某些ccTLD或离岸注册商提供免备案域名服务，注册流程相对简化，但需评估该类域名的法律稳定性与争议解决机制的有效性。ICANN的统一域名争议解决政策（UDRP）适用于gTLD争议，ccTLD则适用各注册局制定的争议规则，维权路径与成本存在较大差异。跨境注册人应充分了解目标TLD的注册政策、数据披露规则及适用法律，避免因管辖权不熟悉而陷入争议被动。

## 学习成果

完成本课程后，学习者应能：阐述DNS层级结构与TLD分类体系；区分注册局与注册商的职能及RAA认证机制；描述域名从注册到赎回删除的完整生命周期；分析跨境注册场景中的管辖权差异与合规考量。


## 相关入口

- [DNS安全与域名治理研究](/research/dns-security-governance/)
- [DNSSEC部署分析](/research/dns-security-governance/dnssec/)
- [DNS劫持攻击研究](/research/dns-security-governance/dns-hijacking/)
- [DNS over HTTPS研究](/research/dns-security-governance/dns-over-https/)
- [DNS安全常见问题](/faq/dns-security-faq/)
- [进阶：DNSSEC部署实践](/courses/advanced-dnssec-deployment/)
