---
title: "什么是Web3域名"
description: "解释Web3域名、ENS、钱包地址、去中心化域名和传统DNS差异。"
slug: "web3-domain-basics"
section: "learn"
cluster: "web3-domain-identity"
type: "course"
language: "zh-CN"
publishedAt: "2026-03-15"
updatedAt: "2026-04-20"
author: "Web3 Domain Institute Editorial Team"
reviewer: "Domain Infrastructure Research Desk"
tags:
  - "什么是Web3域名"
keywords:
  primary: "什么是Web3域名"
  secondary: []
riskLevel: "medium"
index: true
audience:
  - "域名持有者"
  - "研究者"
  - "Web3创业者"
  - "技术人员"
summary: "解释Web3域名、ENS、钱包地址、去中心化域名和传统DNS差异。"
faqs:
  -
    question: "什么是Web3域名适合谁阅读？"
    answer: "适合需要理解域名注册、加密支付、隐私保护、DNS安全或稳定币基础设施的研究者、域名持有者和创业团队。"
  -
    question: "页面内容是否构成投资或法律建议？"
    answer: "不构成。页面仅用于教育研究和资料整理，具体决策应结合注册商条款、适用法律和专业意见。"
references:
 -
   title: "Ethereum Name Service (ENS): Documentation"
   url: "https://docs.ens.domains/"
   source: "ENS"
 -
   title: "ICANN: Domain Name System (DNS)"
   url: "https://www.icann.org/resources/pages/what-2012-02-25-en"
   source: "ICANN"
 -
   title: "Unstoppable Domains: Overview"
   url: "https://unstoppabledomains.com/"
   source: "Unstoppable Domains"

related:
  -
    title: "Web3域名与数字身份研究"
    url: "/research/web3-domain-identity/"
  -
    title: "ENS和DNS有什么区别"
    url: "/research/web3-domain-identity/ens-vs-dns/"
  -
    title: "Web3域名术语"
    url: "/glossary/web3-domain/"
  -
    title: "加密支付域名注册商对比"
    url: "/tools/crypto-domain-registrar-comparison/"
  -
    title: "2026 Web3域名趋势报告"
    url: "/reports/2026-web3-domain-trends/"
updateCadence: "as-needed"
schemaType: "Course"
---

## 摘要

Web3域名是基于区块链的去中心化命名系统，将人类可读名称映射为钱包地址、内容哈希等链上资源。本课程系统讲解Web3域名的核心概念、ENS架构设计，以及与传统DNS域名的所有权模型与隐私差异对比。

## 课程目标

- 理解Web3域名的定义、技术特征与代表性项目
- 掌握ENS的智能合约架构与解析机制
- 比较Web3域名与传统DNS在所有权、解析与隐私维度的根本差异

## 第一讲：Web3域名概念

Web3域名是基于区块链智能合约实现的去中心化命名系统，核心功能是将可读名称映射为以太坊等链上的钱包地址或去中心化存储内容哈希。代表性项目包括以太坊域名服务（Ethereum Name Service, ENS）与Unstoppable Domains：ENS以.eth为顶级域名，通过智能合约管理注册与解析；Unstoppable Domains提供.crypto、.nft等多种TLD，采用一次性买断而非年费模式。与传统DNS由ICANN集中治理不同，Web3域名的命名空间与所有权规则完全由链上合约定义，注册过程无需经过中心化注册商审核，但这也意味着命名冲突解决依赖于合约逻辑而非统一争议政策。

## 第二讲：ENS架构

ENS是当前最具影响力的Web3域名系统，其架构由三层组成：注册表（ENS Registry）合约维护所有.eth域名的所有权映射，采用名称哈希（namehash）算法将域名转换为256位标识符；注册器（Registrar）合约负责.eth二级域名的分配与续费机制，当前采用按年付费模式；解析器（Resolver）合约实现名称到资源的映射，可指向钱包地址、内容哈希或其他记录类型。反向解析（reverse resolution）允许从钱包地址反查对应的ENS名称，常用于交易界面中显示可读名称替代长地址字符串。.eth顶级域名的所有权由根域持有者通过多签合约控制，根密钥持有者集履行类似ICANN根区管理者的职能，但治理范围仅限于ENS生态。

## 第三讲：Web3与传统域名对比

Web3域名与传统DNS域名在三个核心维度存在根本差异。所有权模型：传统域名本质上是注册商授予的使用权，到期未续费即丧失；Web3域名以NFT形式存在于链上，只要持有私钥即拥有完全控制权，不存在强制过期回收。解析机制：DNS通过层级权威服务器体系解析，兼容所有浏览器与应用；Web3域名需通过链上合约或专用网关解析，主流浏览器需依赖插件或ENS集成方可访问。隐私层面，传统域名的WHOIS信息受注册商隐私政策保护，而Web3域名的所有权与解析记录完全公开于链上，任何人均可查询——部分用户期望通过Web3实现匿名购买域名，但实际上链上记录的公开性与交易可追溯性意味着完全匿名不等于合规风险豁免，伪匿名性取决于地址与真实身份的关联程度。Web3域名的隐私保护需依赖地址隔离与混币工具等额外措施，而非系统本身的隐匿能力。

## 学习成果

完成本课程后，学习者应能：阐述Web3域名的定义及ENS与Unstoppable Domains的技术特征；描述ENS注册表、注册器与解析器的三层合约架构及反向解析机制；从所有权、解析与隐私三个维度比较Web3域名与传统DNS的本质差异。


## 相关入口

- [Web3域名与数字身份研究](/research/web3-domain-identity/)
- [ENS与DNS对比分析](/research/web3-domain-identity/ens-vs-dns/)
- [Unstoppable Domains研究](/research/web3-domain-identity/unstoppable-domains/)
- [Web3域名常见问题](/faq/web3-domain-identity-faq/)
- [进阶：Web3域名集成开发](/learn/advanced-web3-domain-integration/)
- [2026 Web3域名趋势报告](/reports/2026-web3-domain-trends/)
