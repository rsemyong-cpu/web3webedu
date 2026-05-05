---
title: "什么是DNS"
description: "解释DNS解析、权威服务器、递归解析、缓存和常见安全风险。"
slug: "dns-basics"
section: "learn"
cluster: "dns-security-governance"
type: "course"
language: "zh-CN"
publishedAt: "2026-03-05"
updatedAt: "2026-04-20"
author: "Web3 Domain Institute Editorial Team"
reviewer: "Domain Infrastructure Research Desk"
tags:
  - "什么是DNS"
keywords:
  primary: "什么是DNS"
  secondary: []
riskLevel: "medium"
index: true
audience:
  - "域名持有者"
  - "研究者"
  - "Web3创业者"
  - "技术人员"
summary: "解释DNS解析、权威服务器、递归解析、缓存和常见安全风险。"
faqs:
  -
    question: "什么是DNS适合谁阅读？"
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
   title: "ICANN: DNSSEC – What Is It and Why Is It Important?"
   url: "https://www.icann.org/resources/pages/dnssec-what-is-it-and-why-is-it-important-2019-02-21-en"
   source: "ICANN"
 -
   title: "NIST: Secure Domain Name System (DNS) Deployment Guide"
   url: "https://csrc.nist.gov/publications/detail/sp/800-81/rev-1/final"
   source: "NIST"

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

DNS（Domain Name System）是互联网的核心寻址基础设施，负责将人类可读域名解析为机器可识别的IP地址。本课程系统讲解DNS递归解析原理、核心记录类型及其功能，以及DNS安全机制与常见威胁防护。

## 课程目标

- 理解DNS递归解析与权威应答的完整查询链路
- 掌握A、AAAA、CNAME、MX等核心记录类型的功能与配置
- 了解DNSSEC、DoH/DoT等安全机制的原理与部署意义
- 识别DNS劫持等常见威胁及防护策略

## 第一讲：DNS解析原理

DNS解析采用递归查询（recursive resolution）模型：当用户访问某域名时，操作系统的存根解析器（stub resolver）首先向配置的递归解析器（recursive resolver）发起查询。递归解析器依次向根服务器、TLD权威服务器及域的权威服务器（authoritative nameserver）发起迭代查询，逐级获取下一级服务器的NS记录与地址，最终从权威服务器获得最终应答。为降低查询延迟与根服务器负载，解析器与客户端均依赖缓存（caching）机制：每条DNS记录附带TTL（Time to Live）值，指示该记录可被缓存的有效时长，TTL到期前无需重新查询。TTL设置需平衡时效性与查询效率——短TTL保证记录更新及时但增加解析负载，长TTL提升性能但变更生效缓慢。

## 第二讲：DNS记录类型

DNS区域文件中包含多种资源记录（Resource Record），各自承担不同职能：A记录将域名映射至IPv4地址；AAAA记录映射至IPv6地址；CNAME记录为域名创建别名指向另一域名；MX记录指定邮件服务器及其优先级；TXT记录承载任意文本信息，广泛用于SPF、DKIM等邮件验证与域名所有权证明；NS记录声明该区域授权的权威服务器；SOA记录定义区域的管理参数，包括主权威服务器、管理员邮箱、序列号与各超时值。正确配置记录类型是域名可用性与服务可靠性的基础，错误配置可能导致网站不可访问、邮件投递失败或安全验证失效。

## 第三讲：DNS安全基础

DNS协议最初未设计认证与加密机制，面临缓存投毒与DNS劫持（DNS hijacking）等威胁。DNSSEC通过数字签名对权威应答进行来源认证与完整性验证，防止解析过程中记录被篡改。递归解析器验证DNSSEC签名后可确认应答真实可信，但DNSSEC仅解决数据完整性问题，不加密查询本身。DoH（DNS over HTTPS）与DoT（DNS over TLS）通过加密通道传输DNS查询，防止中间人窃听与篡改，增强用户隐私保护。无论采用传统信用卡还是USDT购买域名，DNS安全都直接影响域名解析的可信度——支付方式的差异不改变DNS层面的攻击面，域名劫持、DNS缓存投毒等威胁对所有域名持有者均构成同等风险。部署DNSSEC并启用加密DNS查询是提升域名安全态势的基本措施。

## 学习成果

完成本课程后，学习者应能：描述DNS从存根解析器到权威服务器的完整递归查询链路与缓存机制；解释A、AAAA、CNAME、MX、TXT、NS、SOA等核心记录类型的功能；阐述DNSSEC的签名验证原理及DoH/DoT的加密传输意义；识别DNS劫持等常见威胁并制定基础防护策略。
