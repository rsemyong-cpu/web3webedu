---
title: "什么是USDT"
description: "解释USDT的稳定币属性、常见链、转账确认、费用和支付风险。"
slug: "usdt-basics"
section: "learn"
cluster: "stablecoin-economy"
type: "course"
language: "zh-CN"
publishedAt: "2026-03-10"
updatedAt: "2026-04-20"
author: "Web3 Domain Institute Editorial Team"
reviewer: "Domain Infrastructure Research Desk"
tags:
  - "什么是USDT"
keywords:
  primary: "什么是USDT"
  secondary: []
riskLevel: "medium"
index: true
audience:
  - "域名持有者"
  - "研究者"
  - "Web3创业者"
  - "技术人员"
summary: "解释USDT的稳定币属性、常见链、转账确认、费用和支付风险。"
faqs:
  -
    question: "什么是USDT适合谁阅读？"
    answer: "适合需要理解域名注册、加密支付、隐私保护、DNS安全或稳定币基础设施的研究者、域名持有者和创业团队。"
  -
    question: "页面内容是否构成投资或法律建议？"
    answer: "不构成。页面仅用于教育研究和资料整理，具体决策应结合注册商条款、适用法律和专业意见。"
references:
 -
   title: "Tether: USDT Transparency"
   url: "https://tether.to/en/transparency"
   source: "Tether"
 -
   title: "FATF: Updated Guidance on Virtual Assets"
   url: "https://www.fatf-gafi.org/en/publications/Fatfguidance/Updated-Guidance-Virtual-Assets.html"
   source: "FATF"
 -
   title: "BIS: Stablecoins and Central Bank Digital Currencies"
   url: "https://www.bis.org/topics/stablecoins.htm"
   source: "BIS"

related:
  -
    title: "稳定币经济影响研究"
    url: "/research/stablecoin-economy/"
  -
    title: "稳定币与域名支付"
    url: "/research/stablecoin-economy/stablecoins-and-domain-payments/"
  -
    title: "USDT术语解释"
    url: "/glossary/usdt/"
  -
    title: "加密支付域名注册商对比"
    url: "/tools/crypto-domain-registrar-comparison/"
  -
    title: "2026 稳定币与互联网支付基础设施报告"
    url: "/reports/2026-stablecoin-internet-payments/"
updateCadence: "as-needed"
schemaType: "Course"
---

## 摘要

USDT（Tether USD）是与美元锚定的法定抵押型稳定币，由Tether Limited发行，广泛用于加密资产交易与跨境支付场景。本课程系统讲解USDT的稳定币机制、链上转账确认流程、在域名支付场景中的实际应用，以及相关的风险与合规要求。

## 课程目标

- 理解USDT的法币抵押模型与储备证明机制
- 掌握USDT在不同区块链网络上的转账确认流程
- 了解USDT在域名注册支付中的应用路径
- 识别USDT支付场景下的价格锚定风险与合规义务

## 第一讲：USDT的稳定币机制

USDT采用法定货币抵押（fiat-collateralized）模型，理论上每枚USDT由Tether Limited持有的等值美元资产作为储备支撑。储备构成包括现金、国债、货币市场基金及其他短期资产，Tether定期发布储备证明（reserve attestation）报告以增强透明度，但该证明并非严格意义上的独立审计。USDT部署于多条区块链，其中TRC-20（Tron网络）与ERC-20（以太坊网络）为最常用的两种标准：TRC-20转账手续费极低、确认速度快，适合小额高频场景；ERC-20依托以太坊安全性更高，但gas费用波动较大。理解链差异是选择合适USDT转账方式的前提。

## 第二讲：USDT转账与确认

USDT链上转账需经过区块确认（block confirmation）方可视为到账，不同链的确认数要求各异——ERC-20通常需12至20个区块确认，TRC-20则约20个确认即达终态。地址格式因链而异：ERC-20以0x开头，TRC-20以T开头，误选链将导致资产不可逆损失。部分中心化交易所和支付网关要求填写memo或tag以标识收款账户，遗漏将导致入账失败。gas费用方面，ERC-20受以太坊网络拥堵程度影响显著，TRC-20则因Tron的资源模型而相对稳定。进行USDT购买域名操作时，须提前确认注册商所支持的链类型与最低确认数要求。

## 第三讲：USDT在域名支付中的应用

部分域名注册商与第三方支付网关已集成USDT支付能力。USDT购买域名的基本流程为：用户在注册商平台选择域名并进入结算页面，选择USDT支付后系统生成指定链的收款地址与金额，用户从钱包发起转账，待区块确认后注册商自动完成域名注册。支付网关在流程中充当法币与加密货币的桥梁，承担汇率换算、链上监控与到账通知职能。部分网关支持自动将USDT兑换为美元结算，降低注册商的法币波动敞口。需注意，不同注册商对USDT到账超时窗口的规定不同，超时未到账的订单可能被自动取消。

## 第四讲：风险与合规

USDT面临价格锚定风险（price peg risk）：在市场剧烈波动或流动性紧张时，USDT可能短暂脱锚，影响支付金额的实际购买力。在合规层面，FATF旅行规则（Travel Rule）要求虚拟资产服务提供商在转账时传递发起方与受益方信息，这对USDT支付流程提出信息披露要求。此外，受制裁司法辖区的地址或实体可能被列入OFAC制裁名单，注册商与支付网关需执行制裁合规筛查。对于通过加密货币购买域名的用户，应了解所在司法辖区的反洗钱与税务申报义务，确保支付行为的合规性。隐私保护不等于违法匿名，合规边界需结合业务用途与适用法律综合判断。

## 学习成果

完成本课程后，学习者应能：阐述USDT的法定抵押模型与储备透明度机制；区分TRC-20与ERC-20在手续费、确认速度和地址格式上的差异；描述USDT支付域名注册的完整流程与支付网关的角色；识别价格脱锚、旅行规则与制裁合规等关键风险维度。
