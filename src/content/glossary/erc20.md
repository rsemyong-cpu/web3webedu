---
title: "ERC-20"
description: "解释ERC-20代币标准及其对USDT以太坊链转账、Gas费用和域名支付确认时间的影响。"
slug: "erc20"
section: "glossary"
cluster: "stablecoin-economy"
type: "glossary"
language: "zh-CN"
publishedAt: "2026-02-22"
updatedAt: "2026-04-10"
author: "Web3 Domain Institute Editorial Team"
reviewer: "Domain Infrastructure Research Desk"
tags:
- "ERC-20"
- "以太坊"
keywords:
 primary: "ERC-20"
 secondary: []
riskLevel: "medium"
index: true
audience:
- "域名持有者"
- "研究者"
- "Web3创业者"
- "技术人员"
summary: "解释ERC-20代币标准及其对USDT以太坊链转账、Gas费用和域名支付确认时间的影响。"
faqs:
-
  question: "ERC-20适合谁阅读？"
  answer: "适合需要理解域名注册、加密支付、隐私保护、DNS安全或稳定币基础设施的研究者、域名持有者和创业团队。"
-
  question: "页面内容是否构成投资或法律建议？"
  answer: "不构成。页面仅用于教育研究和资料整理，具体决策应结合注册商条款、适用法律和专业意见。"
references:
-
  title: "EIP-20 Token Standard"
  url: "https://eips.ethereum.org/EIPS/eip-20"
  source: "Ethereum"
-
  title: "Tether: USDT Transparency"
  url: "https://tether.to/en/transparency"
  source: "Tether"
-
  title: "FATF: Updated Guidance on Virtual Assets"
  url: "https://www.fatf-gafi.org/en/publications/Fatfguidance/Updated-Guidance-Virtual-Assets.html"
  source: "FATF"
related:
-
  title: "USDT术语"
  url: "/glossary/usdt/"
-
  title: "TRC-20 vs ERC-20"
  url: "/library/buy-domain-with-usdt/trc20-vs-erc20/"
-
  title: "稳定币术语"
  url: "/glossary/stablecoin/"
-
  title: "稳定币经济研究"
  url: "/research/stablecoin-economy/"
updateCadence: "as-needed"
schemaType: "DefinedTerm"
---

## 定义

ERC-20是以太坊区块链上的代币技术标准，由Fabian Vogelsteller于2015年提出（EIP-20），定义了同质化代币必须实现的一组接口函数——包括transfer、approve、balanceOf等核心方法。该标准确保了不同代币在以太坊生态中的互操作性，使得钱包、交易所和智能合约能够统一处理各类代币的转账和授权操作。

USDT在以太坊上的部署即遵循ERC-20标准。截至2026年，以太坊链上的USDT供应量约占USDT总发行量的50%以上，是DeFi生态和域名支付场景中使用最广泛的稳定币实现之一。ERC-20 USDT的每笔转账需要消耗Gas费（以ETH支付），转账速度取决于以太坊网络的区块确认时间——通常为12-15秒一个区块，注册商一般要求12个区块确认（约3分钟）才认定支付完成。

ERC-20标准的approve机制对域名支付场景有特殊影响。当域名持有者通过智能合约或DApp支付时，需要先授权（approve）合约从其地址中提取USDT，再执行实际的转账操作。这一两步流程增加了Gas费支出，也引入了授权被滥用或未及时撤销的风险。

## 为什么重要

ERC-20决定了USDT在以太坊链上的转账机制、费用结构和确认延迟。域名持有者使用ERC-20 USDT支付时，需关注Gas费的波动对总支付成本的影响——在网络拥堵时，Gas费可能超过域名注册费本身。理解ERC-20标准有助于域名持有者在以太坊和波场之间做出支付链选择。

## 常见误解

| 误解 | 更准确的理解 |
| --- | --- |
| ERC-20 USDT转账是免费的 | 每笔转账需支付Gas费，费用随网络拥堵程度波动 |
| ERC-20和TRC-20只是网络不同 | 两者在费用、速度、安全假设和生态系统上均有差异 |
| 所有ERC-20代币的转账逻辑完全相同 | USDT合约实现了部分非标准行为，如无return值的approve |

## 风险与限制

ERC-20 USDT的主要风险集中在Gas费不确定性和智能合约安全两个维度。以太坊的Gas费在DeFi活动密集期可能飙升至数十美元，对于支付10美元域名的场景，手续费占比可能极高。域名持有者应优先评估当前Gas价格再决定是否使用ERC-20链路。

智能合约层面，USDT的ERC-20合约存在历史设计偏差——其approve函数不返回布尔值，这与EIP-20规范不完全一致，可能导致依赖标准返回值的合约出现异常。此外，ERC-20 USDT合约由Tether Limited通过多签控制，存在中心化治理风险，包括潜在的冻结地址功能。域名持有者应了解这些技术特性，避免在不熟悉合约行为的情况下进行大额授权操作。

## 相关术语与阅读

- [USDT术语](/glossary/usdt/)
- [TRC-20 vs ERC-20](/library/buy-domain-with-usdt/trc20-vs-erc20/)
- [稳定币术语](/glossary/stablecoin/)
- [稳定币经济研究](/research/stablecoin-economy/)