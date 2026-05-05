---
title: "跨境域名合规常见问题"
description: "集中回答跨境域名注册KYC差异、制裁筛查机制、WHOIS与GDPR冲突、ICP备案等常见合规疑问。"
slug: "cross-border-domain-compliance-faq"
section: "faq"
cluster: "cross-border-domain-compliance"
type: "faq"
language: "zh-CN"
publishedAt: "2026-03-24"
updatedAt: "2026-04-28"
author: "Web3 Domain Institute Editorial Team"
reviewer: "Domain Infrastructure Research Desk"
tags:
- "跨境域名合规FAQ"
keywords:
 primary: "跨境域名合规常见问题"
 secondary:
  - "域名注册合规FAQ"
  - "域名KYC FAQ"
  - "域名制裁筛查FAQ"
riskLevel: "medium"
index: true
audience:
- "域名持有者"
- "研究者"
- "合规分析师"
summary: "集中回答跨境域名注册的主要合规疑问，涵盖KYC差异、制裁筛查、WHOIS与GDPR冲突及ICP备案。"
faqs:
-
  question: "跨境域名合规常见问题适合谁阅读？"
  answer: "适合需要理解多司法辖区域名注册合规差异的研究者、域名持有者和合规分析师。"
-
  question: "页面内容是否构成法律建议？"
  answer: "不构成。页面仅以教育研究方式回答合规相关疑问，具体合规决策应结合适用法律与专业法律意见。"
-
  question: "WHOIS数据在欧盟是否公开？"
  answer: "根据ICANN临时规范与GDPR要求，欧盟注册商对个人注册人的WHOIS数据默认实施隐私保护，仅向认证的合法利益方披露完整数据。企业注册人的WHOIS数据通常仍可公开查询。"
-
  question: "被列入制裁清单后能否持有域名？"
  answer: "被列入OFAC SDN清单的个人或实体，其在美国注册商处持有的域名资产将被冻结，不得转让、出售或续费。其他司法辖区的执行机制取决于当地法律。"
-
  question: "中国.cn域名注册是否必须实名？"
  answer: "是的。CNNIC要求所有.cn域名注册必须经过强制实名认证，个人需提交身份证扫描件，企业需提交营业执照副本。未经实名认证的注册申请将被拒绝。"
-
  question: "境外注册的域名是否需要ICP备案？"
  answer: "若域名用于托管面向中国大陆公众的网站且服务器位于中国大陆境内，则需完成ICP备案。服务器位于中国大陆境外的网站目前不强制要求ICP备案。"
references:
-
  title: "ICANN: Registrar Accreditation Agreement"
  url: "https://www.icann.org/resources/pages/approved-with-specs-2013-09-17-en"
  source: "ICANN"
-
  title: "FATF: International Standards on Combating Money Laundering"
  url: "https://www.fatf-gafi.org/en/publications/Fatfguidance/Fatf-recommendations.html"
  source: "FATF"
-
  title: "GDPR: Official Regulation Text"
  url: "https://gdpr-info.eu/"
  source: "EU"

related:
-
  title: "跨境域名合规研究"
  url: "/research/cross-border-domain-compliance/"
-
  title: "各司法管辖区域名注册KYC要求比较"
  url: "/research/cross-border-domain-compliance/kyc-jurisdiction-comparison/"
-
  title: "制裁筛查与域名注册合规风险"
  url: "/research/cross-border-domain-compliance/sanction-screening-domain/"
-
  title: "KYC术语解释"
  url: "/glossary/kyc/"
-
  title: "2026 跨境域名合规报告"
  url: "/reports/2026-cross-border-domain-compliance-report/"
updateCadence: "monthly"
schemaType: "FAQPage"
---

## 摘要

本页面集中回答关于跨境域名合规的常见疑问，涵盖KYC要求差异、制裁筛查机制、WHOIS与GDPR冲突、ICP备案义务与加密支付合规。

## KYC与实名验证

**域名注册必须实名吗？**
gTLD域名注册遵循ICANN RAA要求，需提供注册人姓名（或组织名称）、地址、邮箱与电话信息，但不强制要求提供身份证件扫描件。ccTLD域名注册的实名要求因注册局而异：.cn域名需强制实名认证并提交证件扫描件，.de与.uk域名遵循各注册局的实名验证标准。

**境外注册商的KYC要求是否比境内宽松？**
境外注册商遵循ICANN RAA的KYC基线要求，通常不要求身份证件扫描件。但境外注册商的KYC要求并不"宽松"——美国注册商需执行OFAC制裁筛查，欧盟注册商需遵守GDPR数据最小化原则。注册商KYC的严格程度取决于其所在司法辖区的法律要求，而非注册商的地理位置。

## 制裁筛查

**域名注册商如何执行制裁筛查？**
注册商通常在注册流程中嵌入自动化筛查系统，将注册人姓名与OFAC SDN清单、欧盟制裁清单与联合国安理会清单进行模糊匹配。匹配命中后进入人工复核流程，确认命中则拒绝注册申请。

**加密支付域名注册是否受制裁合规约束？**
是的。加密支付域名注册涉及注册KYC与支付KYC两个环节的合规要求。美国注册商通过BitPay、Coinbase Commerce等VASP网关收款时，VASP受FinCEN监管需执行制裁筛查；欧盟注册商通过VASP收款时需满足MiCA合规要求。支付环节的制裁筛查与注册环节的制裁筛查相互独立但相互补充。

## WHOIS与GDPR

**WHOIS数据在欧盟是否公开？**
根据ICANN 2018年临时规范与GDPR要求，欧盟注册商对个人注册人的WHOIS数据默认实施隐私保护处理，仅向认证的合法利益方（如知识产权持有者、执法机构）披露完整数据。企业注册人的WHOIS数据通常仍可公开查询，因为GDPR对法人数据的保护力度低于自然人数据。

**ICANN是否已解决WHOIS与GDPR冲突？**
尚未永久解决。ICANN于2025年启动WHOIS数据披露框架的永久化改革，拟建立分层访问机制，但截至2026年4月仍在政策制定阶段。当前仍沿用2018年临时规范作为过渡方案。

## ICP备案

**境外注册的域名是否需要ICP备案？**
ICP备案的适用范围取决于服务器位置与目标受众：若域名用于托管面向中国大陆公众的网站且服务器位于中国大陆境内，则需完成ICP备案；服务器位于中国大陆境外的网站目前不强制要求ICP备案。使用境外注册商并不改变域名持有者在境内的ICP备案义务。

## 合规边界声明

本页面以教育研究为目的，回答跨境域名合规常见疑问。内容不构成法律建议。域名持有者进行跨境注册时应咨询专业法律意见，确保满足注册商所在司法辖区与持有者所在司法辖区的合规要求。

## 参考资料

- ICANN注册商认证协议：gTLD注册商KYC要求与WHOIS数据披露义务。[来源](https://www.icann.org/resources/pages/approved-with-specs-2013-09-17-en)
- FATF反洗钱国际标准：制裁合规与VASP监管框架。[来源](https://www.fatf-gafi.org/en/publications/Fatfguidance/Fatf-recommendations.html)
- GDPR官方文本：数据保护法规对WHOIS数据处理的要求。[来源](https://gdpr-info.eu/)

## 相关入口

- [跨境域名合规研究](/research/cross-border-domain-compliance/)
- [各司法管辖区域名注册KYC要求比较](/research/cross-border-domain-compliance/kyc-jurisdiction-comparison/)
- [制裁筛查与域名注册合规风险](/research/cross-border-domain-compliance/sanction-screening-domain/)
- [隐私域名注册研究](/library/private-domain-registration/)
- [2026 跨境域名合规报告](/reports/2026-cross-border-domain-compliance-report/)
