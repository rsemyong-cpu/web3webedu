---
title: "ENS"
description: "解释ENS（以太坊域名服务）的工作原理、与传统DNS的区别、在Web3身份体系中的角色及其对域名持有者的影响。"
slug: "ens"
section: "glossary"
cluster: "web3-domain-identity"
type: "glossary"
language: "zh-CN"
publishedAt: "2026-03-03"
updatedAt: "2026-04-10"
author: "Web3 Domain Institute Editorial Team"
reviewer: "Domain Infrastructure Research Desk"
tags:
- "ENS"
- "以太坊域名"
keywords:
 primary: "ENS"
 secondary: []
riskLevel: "medium"
index: true
audience:
- "域名持有者"
- "研究者"
- "Web3创业者"
- "技术人员"
summary: "解释ENS（以太坊域名服务）的工作原理、与传统DNS的区别、在Web3身份体系中的角色及其对域名持有者的影响。"
faqs:
-
  question: "ENS适合谁阅读？"
  answer: "适合需要理解域名注册、加密支付、隐私保护、DNS安全或稳定币基础设施的研究者、域名持有者和创业团队。"
-
  question: "页面内容是否构成投资或法律建议？"
  answer: "不构成。页面仅用于教育研究和资料整理，具体决策应结合注册商条款、适用法律和专业意见。"
references:
-
  title: "ENS Documentation"
  url: "https://docs.ens.domains/"
  source: "ENS"
-
  title: "ICANN: Domain Name System"
  url: "https://www.icann.org/resources/pages/what-2012-02-25-en"
  source: "ICANN"
-
  title: "Unstoppable Domains"
  url: "https://unstoppabledomains.com/"
  source: "Unstoppable Domains"
related:
-
  title: "Web3域名术语"
  url: "/glossary/web3-domain/"
-
  title: "ENS vs DNS研究"
  url: "/research/web3-domain-identity/ens-vs-dns/"
-
  title: "Web3域名身份研究"
  url: "/research/web3-domain-identity/"
-
  title: "DNS术语"
  url: "/glossary/dns/"
updateCadence: "as-needed"
schemaType: "DefinedTerm"
---

## 定义

ENS（Ethereum Name Service，以太坊域名服务）是基于以太坊区块链的去中心化命名系统，将人类可读的名称（如alice.eth）映射为机器可读的标识符——包括以太坊地址、内容哈希和其他元数据。ENS的核心架构由注册表（ENS Registry）和解析器（Resolver）两层合约组成：注册表维护名称的所有权记录，解析器负责将名称翻译为对应的资源记录。.eth二级域名的所有权以NFT（ERC-721）形式存在，持有者可自由转让、设定子域名和配置解析记录。

ENS与传统DNS在技术架构和治理模型上存在根本差异。DNS依赖层级化的权威服务器和ICANN的集中式治理，而ENS的.eth根域由去中心化的智能合约管理，名称注册通过拍卖或即时购买机制完成，无需注册商中介。ENS的解析过程通过智能合约调用而非递归查询实现，解析结果受以太坊共识机制保护，不存在DNS缓存投毒和BGP劫持等传统攻击面。

然而ENS也存在与传统DNS互补而非替代的关系。ENS的DNS集成功能允许将传统DNS域名（如example.com）通过DNSSEC验证后导入ENS系统，使得DNS域名持有者可以在以太坊上使用其现有域名进行加密地址解析。这一桥接机制拓展了ENS的适用范围，但也依赖DNSSEC的安全假设——若DNS域名的DNSSEC被攻破，ENS中的对应记录也可能被篡改。

## 为什么重要

ENS代表了Web3身份体系的基础设施层，将区块链地址从40字符的十六进制串转化为可记忆的名称。对于域名持有者，理解ENS有助于评估Web3域名的投资价值和使用场景，以及判断ENS与传统DNS之间是竞争还是互补关系。ENS还直接影响USDT支付场景——持有者可设置ENS名称解析至其收款地址，简化支付流程。

## 常见误解

| 误解 | 更准确的理解 |
| --- | --- |
| ENS可以替代传统DNS | ENS主要服务于区块链地址解析，与DNS的网页解析是不同功能域 |
| .eth域名与传统域名法律地位相同 | .eth名称是链上资产，不受ICANN和UDRP管辖 |
| ENS名称不需要续费 | .eth二级域名需以ETH缴纳年费，到期未续费名称将释放 |

## 风险与限制

ENS的最大风险在于其名称到地址的映射完全依赖持有者的正确配置。若持有者将ENS名称解析至错误的地址，所有发送至该名称的交易将不可逆转地转入错误地址。与DNS不同，ENS没有注册商级别的安全干预机制——持有者对名称拥有完全控制权，也承担完全的操作风险。

此外，.eth域名的续费机制要求持有者持续持有ETH并按时缴纳年费。若域名持有者因私钥丢失、ETH价格波动或忘记续费而错过截止日期，名称将进入释放期并可被他人重新注册——这意味着品牌方可能永久失去其Web3身份标识。域名持有者应设置多重提醒并考虑使用自动化续费工具，以避免因操作疏忽导致ENS名称丢失。

## 相关术语与阅读

- [Web3域名与数字身份研究](/research/web3-domain-identity/)
- [ENS与DNS对比分析](/research/web3-domain-identity/ens-vs-dns/)
- [Unstoppable Domains研究](/research/web3-domain-identity/unstoppable-domains/)
- [Web3域名常见问题](/faq/web3-domain-identity-faq/)
- [进阶：Web3域名集成开发](/courses/advanced-web3-domain-integration/)
- [2026 Web3域名趋势报告](/reports/2026-web3-domain-trends/)

- [Web3域名术语](/glossary/web3-domain/)
- [ENS vs DNS研究](/research/web3-domain-identity/ens-vs-dns/)
- [Web3域名身份研究](/research/web3-domain-identity/)
- [DNS术语](/glossary/dns/)