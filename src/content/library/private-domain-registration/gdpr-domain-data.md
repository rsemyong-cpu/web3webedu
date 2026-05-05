---
title: "GDPR与域名注册数据处理"
description: "详解GDPR对域名注册数据的处理要求、WHOIS数据的合法使用边界以及域名持有者的数据权利。"
slug: "private-domain-registration/gdpr-domain-data"
section: "library"
cluster: "private-domain-registration"
type: "longtail"
language: "zh-CN"
publishedAt: "2026-04-15"
updatedAt: "2026-04-28"
author: "Web3 Domain Institute Editorial Team"
reviewer: "Domain Infrastructure Research Desk"
tags:
- "GDPR"
- "域名数据"
- "个人数据"
keywords:
 primary: "GDPR域名数据"
 secondary:
   - "GDPR域名注册"
   - "个人数据保护"
riskLevel: "medium"
index: true
audience:
- "域名持有者"
- "研究者"
- "Web3创业者"
- "技术人员"
summary: "详解GDPR对域名注册数据的处理要求、WHOIS数据的合法使用边界以及域名持有者的数据权利。"
faqs:
-
  question: "GDPR实施后WHOIS数据有什么变化？"
  answer: "GDPR实施后，ICANN发布了临时规范（Temp Spec），要求注册商不再公开显示域名持有者的个人数据（姓名、地址、邮箱、电话等），WHOIS查询结果中的个人数据被替换为注册商代持信息或隐私保护服务的联系信息。RDAP作为WHOIS的替代协议引入了分层访问机制，经认证的第三方可申请访问非公开数据。"
-
  question: "域名持有者可以要求删除WHOIS中的个人数据吗？"
  answer: "域名持有者可依据GDPR第17条（删除权）要求注册商删除其个人数据。但域名注册具有合同和法规义务，ICANN RAA要求注册商保留注册数据。因此删除权在域名注册场景中需与合同义务平衡——注册商通常以合法利益或法律义务为由拒绝完全删除，但必须将公开显示最小化。"
references:
-
  title: "ICANN: WHOIS Data Reminders"
  url: "https://www.icann.org/resources/pages/registrars/whois-data-reminder-2013-01-17-en"
  source: "ICANN"
-
  title: "ICANN: RDAP"
  url: "https://www.icann.org/rdap/"
  source: "ICANN"
-
  title: "GDPR Official Text"
  url: "https://gdpr-info.eu/"
  source: "EU"
related:
-
  title: "WHOIS隐私保护"
  url: "/library/private-domain-registration/whois-privacy/"
-
  title: "匿名vs隐私注册"
  url: "/library/private-domain-registration/anonymous-vs-private/"
-
  title: "隐私域名注册"
  url: "/library/private-domain-registration/"
-
  title: "WHOIS术语"
  url: "/glossary/whois/"
-
  title: "RDAP术语"
  url: "/glossary/rdap/"
updateCadence: "as-needed"
schemaType: "Article"
---

## 摘要

GDPR对域名注册数据的处理提出了严格要求，WHOIS公开显示个人数据的传统做法因此发生根本改变。域名持有者享有数据最小化、访问权和删除权等权利，但这些权利需与ICANN注册商认证协议的数据保留义务平衡。理解GDPR与域名注册数据的关系，是域名持有者保护个人信息和合规运营的基础。

## 问题定义

本页讨论的核心问题是：GDPR对域名注册数据的处理提出了哪些要求，WHOIS数据的合法使用边界在哪里，域名持有者享有哪些数据权利，ICANN的临时规范和EPDP工作组如何协调GDPR合规与域名体系需求。

## 背景知识

GDPR（通用数据保护条例）于2018年5月在欧盟生效，对处理欧盟居民个人数据的任何组织均具有约束力。域名注册过程中收集的姓名、地址、邮箱和电话号码属于个人数据，注册商作为数据处理者须遵守GDPR。ICANN的注册商认证协议（RAA）原要求注册商将域名持有者数据通过WHOIS公开，这与GDPR直接冲突。

## GDPR第6条：合法处理依据

域名注册商处理WHOIS个人数据需依据GDPR第6条中的合法处理依据。可适用的依据包括：合同履行必要性（域名注册合同要求提供联系信息）、合法利益（维护域名体系安全和可追溯性）、法律义务（适用法律要求数据保留）。ICANN在GDPR生效后主张合法利益作为WHOIS数据处理的主要依据，但数据保护机构对此解释并不完全一致。

## 数据最小化原则

GDPR第5条要求数据处理遵循最小化原则——仅收集和处理实现目的所必需的数据。这对域名注册的影响是：注册商应限制收集的字段数量，不应要求超出注册必要性的个人数据。WHOIS公开显示也应最小化，仅公开对域名体系运行必要的数据字段。这一原则直接推动了WHOIS隐私保护成为行业默认实践。

## 删除权与域名注册义务

GDPR第17条赋予数据主体删除权（被遗忘权），域名持有者可要求注册商删除其个人数据。但ICANN RAA要求注册商在域名注册期间及到期后一定期限内保留注册数据。删除权与数据保留义务的冲突通过合法性抗辩解决：注册商可依据法律义务或合法利益拒绝完全删除请求，但必须在最小化原则下限制数据使用和公开范围。域名到期后的数据保留期限也是EPDP工作组的争议焦点。

## ICANN临时规范

2018年5月GDPR生效时，ICANN发布了临时规范（Temporary Specification for gTLD Registration Data），要求注册商不再通过WHOIS公开显示域名持有者的个人数据。临时规范建立了分层访问模型：公众只能查询注册商代持信息或隐私保护服务联系方式；经认证的合法权益方（如知识产权律师、执法机构）可通过分层访问机制申请访问非公开数据。临时规范有效期为一年，后续由EPDP工作组制定长期政策。

## EPDP工作组成果

EPDP（Expedited Policy Development Process）工作组是ICANN为解决GDPR合规问题设立的专门政策制定流程。EPDP第一阶段确立了gTLD注册数据的分层访问框架和注册商数据保留要求。第二阶段研究了合法性审查和分层访问的具体实施机制。EPDP的成果虽已纳入ICANN共识政策，但分层访问系统的技术实施仍在推进中，域名持有者数据的访问标准和审批流程尚未完全定型。

## 分层访问机制

RDAP（Registration Data Access Protocol）作为WHOIS的替代协议，原生支持分层访问。公众通过RDAP查询获取脱敏数据，经认证的第三方通过访问凭证查询完整数据。分层访问的认证标准和审批流程由ICANN协调各利益相关方制定。目前挑战包括：认证流程复杂且耗时，中小型知识产权持有者获取访问权限困难，不同注册商的RDAP实现一致性不足。

## 域名持有者的数据权利

域名持有者在GDPR框架下享有以下权利：知情权（了解数据如何被处理）、访问权（获取注册商持有的个人数据副本）、更正权（更正不准确的数据）、删除权（在合法范围内要求删除）、限制处理权（在争议期间限制数据处理）、数据可携带权（以结构化格式获取数据）、反对权（反对基于合法利益的数据处理）。域名持有者应向注册商行使这些权利，注册商须在30天内响应请求。

## 风险与限制

GDPR的执行依赖数据保护机构的监管能力，非欧盟注册商的合规程度参差不齐。分层访问系统的实施仍在进行中，域名持有者数据的保护水平因注册商而异。GDPR不适用于非欧盟居民的域名数据，全球域名体系的隐私保护标准因此存在地域差异。过度脱敏可能影响域名争议解决和执法效率。

## 合规边界

本站以教育研究方式讨论GDPR与域名注册数据的关系。内容不构成法律建议。域名持有者在处理个人数据时应咨询数据保护法律专业意见，确保符合适用司法辖区的法律要求。

## 相关术语与内链

- [WHOIS隐私保护](/library/private-domain-registration/whois-privacy/)
- [匿名vs隐私注册](/library/private-domain-registration/anonymous-vs-private/)
- [隐私域名注册](/library/private-domain-registration/)
- [WHOIS术语](/glossary/whois/)
- [RDAP术语](/glossary/rdap/)

## 参考资料

- ICANN WHOIS 数据提醒：注册商对域名持有者数据的年度验证要求。
- ICANN RDAP 服务：注册数据访问协议的技术规范与分层访问框架。
- GDPR 官方文本：欧盟通用数据保护条例全文及各条款解读。
