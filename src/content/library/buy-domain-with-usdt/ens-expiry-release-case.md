---
title: "案例分析：ENS域名到期释放与重新注册"
description: "分析ENS域名到期宽限期机制下的域名释放与重新注册事件，评估到期风险对域名持有者的影响。"
slug: "buy-domain-with-usdt/ens-expiry-release-case"
section: "library"
cluster: "buy-domain-with-usdt"
type: "case-study"
language: "zh-CN"
publishedAt: "2026-01-18"
updatedAt: "2026-04-28"
author: "Web3 Domain Institute Editorial Team"
reviewer: "Domain Infrastructure Research Desk"
tags:
- "ENS到期案例"
- "域名释放分析"
keywords:
 primary: "ENS域名到期释放案例"
 secondary:
  - "ENS到期宽限期"
  - "域名重新注册风险"
  - "ENS域名到期案例"
riskLevel: "high"
index: true
audience:
- "域名持有者"
- "研究者"
- "Web3创业者"
summary: "分析ENS域名到期宽限期机制下的域名释放与重新注册事件，评估到期风险对域名持有者的影响与防护建议。"
faqs:
-
  question: "ENS域名到期后会发生什么？"
  answer: "ENS域名到期后进入90天宽限期，期间仍归原持有者但无法转让；宽限期结束后域名释放至公共池，任何人可重新注册。"
-
  question: "如何避免ENS域名到期被释放？"
  answer: "设置日历提醒在到期前30天续费、使用ENS官方APP的自动续费功能、或一次性续费多年以降低到期风险。"
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
  title: "Tether: Transparency Report"
  url: "https://tether.to/en/transparency/"
  source: "Tether"

related:
-
  title: "USDT购买域名知识库"
  url: "/library/buy-domain-with-usdt/"
-
  title: "USDT购买域名安全性与风险评估"
  url: "/library/buy-domain-with-usdt/is-it-safe/"
-
  title: "USDT购买域名退款风险"
  url: "/library/buy-domain-with-usdt/refund-risk/"
-
  title: "ENS术语解释"
  url: "/glossary/ens/"
-
  title: "2026 USDT购买域名年度报告"
  url: "/reports/2026-usdt-domain-report/"
updateCadence: "as-needed"
schemaType: "ScholarlyArticle"
---

## 摘要

本案例分析ENS域名到期宽限期机制下的域名释放与重新注册事件。ENS域名采用年费续费模型，到期后进入90天宽限期，宽限期结束后域名释放至公共池。到期释放机制对域名持有者构成显著的资产损失风险，尤其是对持有多个ENS域名的持有者而言。

## 事件背景

| 日期 | 事件 | 信息来源 |
| --- | --- | --- |
| 2023-2025年 | 多个知名ENS域名因到期释放被第三方重新注册 | OpenSea域名交易记录 |
| 2024年3月 | ENS DAO讨论延长宽限期提案 | ENS治理论坛 |
| 2025年 | ENS官方APP增加到期提醒功能 | ENS官方公告 |

上述事件时间线基于公开可验证的链上交易记录与治理讨论。本案例不针对特定持有者或特定域名，而是分析ENS到期机制的通用风险模式。

## 技术分析

### ENS到期机制

ENS域名的到期机制由ETHRegistrarController合约实现。域名注册年费到期后，合约自动启动90天宽限期计时。宽限期内的域名状态为"grace period"：域名仍归原持有者所有，但无法执行转让操作；原持有者可在宽限期内通过renew函数续费恢复域名完整功能。

宽限期结束后，合约调用`releaseName`函数将域名释放至公共池。释放后的域名进入21天溢价拍卖期（premium period），首日溢价为10 ETH，逐日递减至0.01 ETH。溢价拍卖期结束后，域名以标准年费价格开放注册。

### 到期释放的链上可观测性

ENS域名的到期与释放过程完全链上可观测：到期时间可通过合约的`nameExpires`函数查询，宽限期状态可通过`isAvailable`函数查询，释放事件通过合约的`NameReleased`事件监听。第三方工具（如ENS Dashboard、Etherscan）提供到期提醒功能，但需持有者主动配置。

### 风险放大因素

以下因素放大ENS到期风险：第一，Gas费波动导致续费成本不确定，高峰期续费Gas费可能显著高于年费本身；第二，多域名持有者管理复杂度高，遗漏续费的概率随域名数量增加而上升；第三，宽限期内的"无法转让"限制使得持有者无法在到期前紧急出售域名止损。

## 影响评估

| 影响维度 | 受影响对象 | 严重程度 |
| --- | --- | --- |
| 资产损失 | 未及时续费的域名持有者 | 高 |
| 品牌风险 | 使用ENS域名的dApp与品牌方 | 高 |
| 抢注风险 | 被释放域名的潜在抢注者 | 中 |
| 生态信任 | ENS生态整体 | 中 |

资产损失是最直接的影响维度：持有者因未续费而永久失去域名资产，且被释放域名的重新注册成本远低于原持有者的持有成本（如原持有者以10 ETH购入的3字母域名，释放后可能以标准年费5美元被重新注册）。品牌风险对使用ENS域名作为入口的dApp尤为严重：域名释放后若被第三方注册并指向恶意内容，将损害品牌声誉与用户信任。

## 教训与建议

案例研究的教训需基于可验证事实，不得编造事件细节或对注册商做评价性结论。基于ENS到期机制的技术特征，可提出以下建议：

域名持有者应建立系统化的续费管理机制：设置日历提醒在到期前30天触发续费操作、使用ENS官方APP的到期提醒功能、对高价值域名一次性续费多年以降低到期频率。多域名持有者应考虑使用脚本批量查询域名到期时间并自动执行续费操作。

品牌方应避免将核心品牌入口完全依赖ENS域名：ENS域名应作为传统DNS域名的补充入口而非唯一入口。品牌方应同时注册对应的传统DNS域名作为备份，确保ENS域名到期释放后品牌入口不中断。

## 合规边界

本站以研究教育方式记录域名支付相关事件，内容不得用于规避监管、逃避制裁或其他违法目的。本案例分析不针对特定持有者或特定域名，不构成投资或法律建议。

## 相关入口

- [USDT购买域名知识库](/library/buy-domain-with-usdt/)
- [USDT购买域名安全性与风险评估](/library/buy-domain-with-usdt/is-it-safe/)
- [USDT购买域名退款风险](/library/buy-domain-with-usdt/refund-risk/)
- [ENS术语解释](/glossary/ens/)
- [2026 USDT购买域名年度报告](/reports/2026-usdt-domain-report/)
- [NFT域名市场研究](/research/nft-domain-market/)
- [ENS域名交易机制与流动性分析](/research/nft-domain-market/ens-name-trading/)

## 参考资料

- ENS官方文档：ENS域名到期机制、宽限期与释放流程的技术规范。[来源](https://docs.ens.domains/)
- ICANN域名系统概述：传统DNS域名到期机制与ENS到期机制的对比参考。[来源](https://www.icann.org/resources/pages/what-2012-02-25-en)
- Tether透明度报告：USDT作为域名续费支付方式的结算风险评估。[来源](https://tether.to/en/transparency/)
