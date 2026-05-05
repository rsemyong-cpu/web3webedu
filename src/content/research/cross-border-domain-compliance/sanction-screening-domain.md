---
title: "制裁筛查与域名注册合规风险"
description: "分析OFAC、欧盟与联合国制裁清单对域名注册的合规影响、筛查机制与违规后果。"
slug: "cross-border-domain-compliance/sanction-screening-domain"
section: "research"
cluster: "cross-border-domain-compliance"
type: "research"
language: "zh-CN"
publishedAt: "2026-04-26"
updatedAt: "2026-04-28"
author: "Web3 Domain Institute Editorial Team"
reviewer: "Domain Infrastructure Research Desk"
tags:
- "制裁筛查域名"
- "OFAC域名合规"
keywords:
 primary: "制裁筛查与域名注册合规"
 secondary:
  - "OFAC域名注册"
  - "SDN清单域名"
  - "域名制裁合规风险"
riskLevel: "high"
index: true
audience:
- "域名持有者"
- "研究者"
- "合规分析师"
- "法律从业者"
summary: "制裁筛查是跨境域名注册中风险最高的合规领域，OFAC违规可导致注册商面临巨额罚款与刑事追诉。"
faqs:
-
  question: "域名注册商如何执行制裁筛查？"
  answer: "注册商通常在注册流程中嵌入自动化筛查系统，将注册人信息与OFAC SDN清单、欧盟制裁清单与联合国安理会清单进行匹配。匹配命中后，注册商需进行人工复核确认，确认命中则拒绝注册申请。"
-
  question: "被列入制裁清单的个人能否注册域名？"
  answer: "被列入OFAC SDN清单的个人或实体不得通过美国注册商注册域名。欧盟与联合国制裁清单的限制范围取决于注册商所在司法辖区的法律执行机制。"
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
  title: "KYC术语解释"
  url: "/glossary/kyc/"
-
  title: "域名隐私保护检查清单"
  url: "/tools/domain-privacy-checklist/"
-
  title: "2026 跨境域名合规报告"
  url: "/reports/2026-cross-border-domain-compliance-report/"
updateCadence: "monthly"
schemaType: "Article"
---

## 摘要

制裁筛查是跨境域名注册中风险最高的合规领域。OFAC（美国财政部海外资产控制办公室）对违反制裁规定的实体可处以每项违规最高约35万美元的罚款，情节严重者可面临刑事追诉。域名注册商作为受制裁管辖的实体，必须在注册流程中嵌入制裁筛查机制，拒绝被制裁个人或实体的注册申请。

## OFAC制裁体系

### SDN清单

OFAC特别指定国民（Specially Designated Nationals, SDN）清单是美国制裁体系的核心执行工具。SDN清单覆盖超过12,000个实体与个人，包括被制裁国家的政府机构、国有企业、恐怖组织、武器扩散者与跨国犯罪集团。SDN清单上的个人或实体的资产在美国境内或受美国管辖范围内将被冻结，美国主体不得与其进行任何交易。

### 制裁管辖范围

OFAC的制裁管辖范围包括：美国公民与永久居民（不论身处何地）、美国境内任何主体、涉及美国金融系统的任何交易（包括美元结算）、以及由美国主体拥有或控制的境外实体。这意味着即使注册商位于美国境外，若其注册费用通过美国金融系统结算（如使用美元银行卡支付），该交易仍受OFAC管辖。

### 50%规则

OFAC的50%规则规定：若一个实体被一个或多个SDN清单实体合计直接或间接拥有50%以上权益，该实体视为受制裁实体，美国主体不得与其交易。50%规则对域名注册的影响在于：注册商不仅需筛查注册人是否直接在SDN清单上，还需评估注册人的所有权结构是否触发50%规则。

## 欧盟制裁体系

欧盟制裁清单由欧盟理事会根据《欧盟运行条约》第215条通过决议发布，针对特定国家、恐怖组织与武器扩散者实施资产冻结与旅行禁令。欧盟制裁清单与OFAC SDN清单存在重叠但不完全一致：部分实体在OFAC清单上但不在欧盟清单上，反之亦然。

欧盟注册商需在注册流程中筛查欧盟制裁清单，拒绝被制裁实体的注册申请。欧盟制裁的执行机制依赖成员国监管机构，违规后果包括行政罚款与刑事追诉，具体标准因成员国而异。

## 联合国安理会制裁体系

联合国安理会根据《联合国宪章》第七章通过决议实施的制裁具有国际法效力，所有联合国成员国均有义务执行。安理会综合制裁清单由安理会制裁委员会维护，涵盖恐怖组织（如基地组织、ISIS）与武器扩散者（如朝鲜武器采购实体）。

安理会制裁清单在域名注册场景中的执行机制尚不明确。ICANN RAA未明确要求注册商筛查安理会制裁清单，但注册商所在司法辖区的国内法可能将安理会制裁清单纳入执行范围。

## 制裁筛查机制

### 自动化筛查

注册商通常在注册流程中嵌入自动化筛查系统，将注册人姓名、组织名称与地址信息与OFAC SDN清单、欧盟制裁清单与联合国安理会清单进行模糊匹配。匹配命中后，系统标记为潜在命中（Potential Match），需人工复核确认。

### 误报处理

制裁筛查系统的误报率较高，常见原因包括：姓名拼写相似（如阿拉伯语/俄语姓名的英文音译差异）、常见姓名重复（如"Mohammed"等高频姓名）。注册商需建立误报处理流程，在确认非真实命中后解除注册阻止。

### 加密支付场景筛查

在加密货币购买域名场景中，制裁筛查的复杂性进一步增加：链上地址本身不在制裁清单上（除非被公开标记），注册商需依赖支付网关的KYC与筛查结果。部分注册商要求加密支付用户额外提交身份信息以独立完成制裁筛查。

## 违规后果

| 管辖 | 违规后果 | 罚款上限 |
| --- | --- | --- |
| 美国（OFAC） | 行政罚款+刑事追诉 | 每项违规约35万美元 |
| 欧盟 | 行政罚款+刑事追诉（因成员国而异） | 因成员国而异 |
| 英国（HMT） | 行政罚款+刑事追诉 | 无固定上限 |

## 合规边界声明

本文以教育研究为目的，分析制裁筛查对域名注册的合规影响。内容不构成法律建议。域名持有者与注册商应咨询专业法律意见，确保制裁筛查机制满足所在司法辖区的合规要求。本站内容不得用于规避制裁筛查或协助被制裁实体获取域名注册服务。

## 参考资料

- ICANN注册商认证协议：gTLD注册商合规义务与数据保留要求。[来源](https://www.icann.org/resources/pages/approved-with-specs-2013-09-17-en)
- FATF反洗钱国际标准：制裁合规框架在VASP与域名支付场景中的适用。[来源](https://www.fatf-gafi.org/en/publications/Fatfguidance/Fatf-recommendations.html)
- GDPR官方文本：制裁筛查中的个人信息处理合法性基础。[来源](https://gdpr-info.eu/)

## 相关入口

- [跨境域名合规研究](/research/cross-border-domain-compliance/)
- [各司法管辖区域名注册KYC要求比较](/research/cross-border-domain-compliance/kyc-jurisdiction-comparison/)
- [隐私域名注册研究](/research/private-domain-registration/)
- [KYC术语解释](/glossary/kyc/)
- [2026 跨境域名合规报告](/reports/2026-cross-border-domain-compliance-report/)
