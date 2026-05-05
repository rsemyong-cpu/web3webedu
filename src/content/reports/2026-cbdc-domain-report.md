---
title: "2026 CBDC与域名基础设施报告"
description: "梳理全球CBDC项目进展、跨境支付试点、域名注册商接入现状与ICANN结算体系兼容性评估。"
slug: "2026-cbdc-domain-report"
section: "reports"
cluster: "cbdc-domain-infrastructure"
type: "report"
language: "zh-CN"
publishedAt: "2026-04-25"
updatedAt: "2026-04-28"
author: "Web3 Domain Institute Editorial Team"
reviewer: "Domain Infrastructure Research Desk"
tags:
- "CBDC域名报告"
- "央行数字货币基础设施"
keywords:
 primary: "CBDC与域名基础设施报告"
 secondary:
  - "2026 CBDC域名报告"
  - "央行数字货币域名基础设施"
riskLevel: "medium"
index: true
audience:
- "域名持有者"
- "研究者"
- "政策分析师"
summary: "报告梳理全球CBDC项目进展、跨境支付试点mBridge与Dunbar项目、域名注册商接入现状与ICANN结算体系兼容性评估。"
faqs:
-
  question: "2026 CBDC与域名基础设施报告适合谁阅读？"
  answer: "适合需要理解CBDC技术架构、跨境支付试点进展、域名基础设施采购趋势的研究者、域名持有者和政策分析师。"
-
  question: "报告内容是否构成投资或政策建议？"
  answer: "不构成。报告仅用于教育研究和资料整理，具体决策应结合央行政策、适用法律和专业意见。"
references:
-
  title: "BIS: Central Bank Digital Currencies"
  url: "https://www.bis.org/topics/cbdc.htm"
  source: "BIS"
-
  title: "ICANN: Domain Name System (DNS)"
  url: "https://www.icann.org/resources/pages/what-2012-02-25-en"
  source: "ICANN"
-
  title: "People's Bank of China: Digital Currency (e-CNY)"
  url: "https://www.pbc.gov.cn/en/3695837369583789952/index.html"
  source: "PBOC"

related:
-
  title: "CBDC与域名基础设施研究"
  url: "/research/cbdc-domain-infrastructure/"
-
  title: "数字人民币购买域名可行性分析"
  url: "/research/cbdc-domain-infrastructure/e-cny-domain-payment/"
-
  title: "USDT术语解释"
  url: "/glossary/usdt/"
-
  title: "加密支付域名注册商对比"
  url: "/tools/crypto-domain-registrar-comparison/"
-
  title: "2026 CBDC与域名基础设施报告"
  url: "/reports/2026-cbdc-domain-report/"
updateCadence: "quarterly"
schemaType: "Article"
---

## 摘要

本报告系统梳理2026年全球CBDC项目进展及其对域名基础设施的影响。截至2026年第一季度，超过130个司法辖区的央行已启动CBDC研究或试点，其中3个经济体已正式上线零售型CBDC，19个进入试点阶段。mBridge多边央行数字货币桥项目已进入最低可行产品阶段，但跨境域名支付的商业可行性仍受限于参与央行数量与互操作协议成熟度。

## 全球CBDC项目进展

| 项目 | 类型 | 阶段 | 关键进展 |
| --- | --- | --- | --- |
| e-CNY（中国） | 零售型 | 全面推广 | 26个试点城市，跨境mBridge试点 |
| 数字欧元（欧盟） | 零售型 | 立法准备 | 欧洲议会通过CBDC框架法案 |
| 数字美元（美国） | 零售型 | 研究阶段 | 美联储发布技术可行性报告 |
| mBridge | 跨境批发 | MVP阶段 | BIS牵头，4个司法辖区参与 |
| Project Dunbar | 跨境批发 | 试验完成 | BIS与新加坡/澳大利亚/南非央行 |
| Sand Dollar（巴哈马） | 零售型 | 正式上线 | 加勒比地区首个CBDC |

## CBDC跨境支付试点分析

mBridge项目是当前CBDC跨境支付最具代表性的基础设施。项目由BIS创新中心牵头，中国人民银行、阿联酋央行、泰国央行与欧洲央行参与，旨在构建基于分布式账本的跨境CBDC支付桥接网络。mBridge的核心技术特征包括：参与央行各自运营CBDC账本节点，通过共享的mBridge账本完成跨币种原子兑换与实时清算，交易确认时间可达秒级。

Project Dunbar则探索了多CBDC互操作模型的另一种路径：参与央行在共享测试网络上模拟跨境CBDC交易，验证了模型B（共享mBridge账本）与模型C（多边互连网络）两种架构的可行性。试验结论表明，技术可行性已获验证，但治理框架、流动性管理与合规审查标准仍需参与方进一步协商。

## 域名基础设施影响评估

CBDC对域名基础设施的影响可从三个层面评估：

1. **注册费用支付层**：零售型CBDC可替代银行卡或加密支付网关完成注册费用支付，但当前仅限于境内场景。跨境域名注册支付仍依赖稳定币或传统银行渠道。

2. **批量结算层**：批发型CBDC可压缩注册商与注册局之间的批量结算周期，从T+1至T+2压缩至实时。但该影响路径的实现依赖于注册局所在司法辖区的CBDC部署进度。

3. **ICANN治理层**：CBDC对ICANN结算体系的影响尚处于理论讨论阶段。ICANN以美元计价收取注册商年费与变数费用，CBDC与ICANN结算体系之间的桥接需要央行、ICANN与商业银行三方协议支持。

## 注册商CBDC接入现状

截至2026年第一季度，尚无国际域名注册商正式接入CBDC支付通道。境内注册商方面，部分区域性注册商在e-CNY试点城市完成了技术对接，但头部注册商（如阿里云、腾讯云域名服务）尚未上线e-CNY支付选项。注册商接入CBDC支付通道的主要顾虑包括：跨境支付能力不足、用户需求有限、合规成本不确定。

## 合规边界声明

本报告以教育研究为目的，梳理CBDC项目进展与域名基础设施影响。内容不构成投资、法律或政策建议。CBDC的发行与使用受各国央行与监管机构管辖，用户应遵守所在司法辖区的外汇管理、反洗钱与数据保护法规。

## 参考资料

- BIS央行数字货币研究：全球CBDC项目进展与跨境互操作框架。[来源](https://www.bis.org/topics/cbdc.htm)
- ICANN域名系统概述：DNS基础设施与跨境结算机制。[来源](https://www.icann.org/resources/pages/what-2012-02-25-en)
- 中国人民银行数字人民币官方页面：e-CNY试点进展与跨境支付布局。[来源](https://www.pbc.gov.cn/en/3695837369583789952/index.html)

## 相关入口

- [CBDC与域名基础设施研究](/research/cbdc-domain-infrastructure/)
- [数字人民币购买域名可行性分析](/research/cbdc-domain-infrastructure/e-cny-domain-payment/)
- [CBDC与稳定币在域名支付中的差异](/research/cbdc-domain-infrastructure/cbdc-vs-stablecoin-domain/)
- [稳定币经济影响研究](/research/stablecoin-economy/)
- [USDT术语解释](/glossary/usdt/)
