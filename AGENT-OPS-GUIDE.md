# AI Agent 运维更新指导手册

> 本文档是 Web3域名与稳定币研究学院（web3-domain-institute）的 AI Agent 长期运维操作规范。
> 基于 2026年5月 构建全站的实战经验总结，覆盖技术教训、内容规范、合规红线和工作流程。
> 内容整体风格是学术派，用词考究，多术语，广泛涉及金融经济科技等相关行业。但又要不动声色推广核心关键词
  ：usdt 购买域名、匿名注册域名、加密货币购买域名以及相关长尾词等。
---

## 一、项目概览

| 项 | 值 |
|---|---|
| 框架 | Astro 5.x 静态站点生成（SSG） |
| 内容 | Markdown + YAML frontmatter，150+ 页面 |
| 语言 | 正文中文（zh-CN），URL/术语英文，保留英文标准术语不翻译 |
| 构建 | `npm run build` = validate → RSS → sitemap → astro build → 150页 |
| 部署 | GitHub Pages（`.github/workflows/generative-static-site.yml`） |
| 自动化 | 每日 UTC 02:17 触发内容生成 + 构建部署 |

### 目录结构

```
src/content/              # Markdown 内容集合（9个中文collection + 9个英文collection）
  library/                # 知识库（pillar + longtail）
  research/           # 研究（pillar + longtail）
  faq/                # FAQ
  courses/            # 课程（基础 + 进阶）
  glossary/           # 术语
  tools/              # 工具/检查清单
  reports/            # 报告
  news/               # 新闻简报
  pages/              # 关于/法律页面
  authors/            # 作者档案
  en-library/             # 英文知识库
  en-research/            # 英文研究
  en-faq/                 # 英文FAQ
  en-courses/              # 英文课程
  en-glossary/             # 英文术语
  en-tools/               # 英文工具
  en-reports/              # 英文报告
  en-news/                 # 英文新闻
  en-pages/               # 英文关于/法律页面
src/data/                 # JSON 数据文件
  topic-clusters.json     # 9个主题集群定义
  content-calendar.json  # 更新节奏
  keywords.json           # 品牌词 + 集群关键词
  internal-links.json       # 集群内链地图
  registrars.json           # 注册商对比数据
  navigation.ts           # 导航结构
scripts/                  # 构建与验证脚本
  generate/                 # AI 生成脚本
  validate/             # 验证脚本
src/components/           # 21个 Astro 组件
src/layouts/               # 9个布局（BaseLayout → ArticleLayout 为核心）
src/pages/                # 路由页面（中文）
src/pages/en/             # 路由页面（英文）
src/lib/                   # 工具函数（content.ts, site.ts, breadcrumbs.ts）
```

---

## 二、技术经验教训

### 2.1 YAML Frontmatter 格式（最常踩坑）

YAML 解析器（js-yaml / gray-matter）对缩进极其敏感。以下规则必须严格遵守：

#### 列表项内嵌字段的缩进

**错误**（会导致解析为顶级键，使父字段变为 null）：

```yaml
faqs:
- question: "xxx"
  answer: "xxx"
references:
- title: "xxx"
  url: "xxx"
  source: "xxx"
related:
- title: "xxx"
  url: "xxx"
```

**正确**：

```yaml
faqs:
-
  question: "xxx"
  answer: "xxx"
references:
-
  title: "xxx"
  url: "xxx"
  source: "xxx"
related:
-
  title: "xxx"
  url: "xxx"
```

规则：列表项 `-` 独占一行，子字段缩进1空格。**绝对不要**写 `- question:` 或 `- title:`。

#### keywords 子字段的缩进

`keywords` 是一个对象，`primary` 和 `secondary` 是其子字段，必须缩进1空格：

**错误**（`primary:` 和 `- "xxx"` 顶格，解析为顶级键 → keywords: null → Astro 构建失败）：

```yaml
keywords:
 primary: "ETH支付域名"
 secondary:
- "以太坊域名支付"
- "ETH注册域名"
```

**正确**：

```yaml
keywords:
 primary: "ETH支付域名"
 secondary:
   - "以太坊域名支付"
   - "ETH注册域名"
```

规则：
- `primary:` 前面1个空格缩进
- `secondary:` 前面1个空格缩进
- `secondary` 下的列表项 `- "xxx"` 前面3个空格缩进

#### tags / audience 列表

这两个字段是简单字符串列表，可以顶格写：

```yaml
tags:
- "ETH"
- "以太哈支付"
audience:
- "域名持有者"
- "研究者"
```

#### YAML 格式速查表

| 字段 | 格式 | 缩进规则 |
|---|---|---|
| `tags` | `- "值"` | 顶格 |
| `audentifier` | `- "值"` | 顶格 |
| `keywords` | 对象 | ` primary:` / ` secondary:` 缩进1格；secondary列表项缩进3格 |
| `faqs` | `-\n  question:` | `-` 独占行，子字段缩进1格 |
| `references` | `-\n  title:` | `-` 独占行，子字段缩进1格 |
| `related` | `-\n  title:` | `-` 独占行，子字段缩进1格 |

### 2.2 构建管道与验证门禁

每次 `npm run build` 依次执行：

```
validate:seo → validate:compliance → generate:rss → generate:sitemaps → astro build
```

**任何一步失败，整个构建中断。** 修改内容后必须先跑 `npm run validate`，再跑 `npm run build`。

#### SEO 验证器检查项（`scripts/validate-seo.ts`）

- 缺失字段：title, description, slug, section, updatedAt, author, riskLevel
- slug 格式：必须全小写英文+连字符，禁止中文/拼音/数字ID
- URL 非ASCII字符检测
- 重复 URL 检测
- description 长度 ≤ 180 字符
- FAQ frontmatter 必须存在（至少1条）
- 禁止泛锚文本："点击这里"、"更多"、"查看"、"这篇文章"、"了解更多"

#### 合规验证器检查项（`scripts/validate-compliance.ts`）

**禁用词列表**（出现即报警，除非同一行包含合规上下文词）：

| 禁用词 | 允许的上下文标记 |
|---|---|
| 完全匿名 | 同行含：不得/不能/不应/不用于/不提供/不构成/不等于/不是/避免/禁止/风险/合规/边界/误区/披露/教育/研究 |
| 不可追踪 | 同上 |
| 绕过KYC / 绕过 KYC | 同上 |
| 规避监管 | 同上 |
| 逃避监管 | 同上 |
| 逃避制裁 | 同上 |
| 规避制裁 | 同上 |
| 无实名购买教程 | 同上 |

**合规修复方法**：不要删除禁用词，而是添加合规上下文。例如：
- "完全匿名" → "完全匿名不等于合规隐私保护"
- "绕过KYC" → "绕过KYC是违反合规要求的行为"

### 2.3 常见构建失败及修复

| 错误现象 | 原因 | 修复方法 |
|---|---|---|
| `expected keywords to be object, received null` | keywords 子字段未缩进，js-yaml 把 primary/secondary 解析为顶级键 | 修复缩进：primary/secondary 前加1空格，secondary列表项前加3空格 |
| `YAMLException: end of the stream or a document separator is expected` | faqs/references/related 中 `- field:` 写法 | 改为 `-\n  field:` 格式 |
| `Duplicate id` 警告 | content collection 中 slug 冲突 | 检查 section + slug 组合是否唯一 |
| 合规验证失败 | 禁用词无合规上下文 | 在同一行添加合规上下文词（如"不等于"、"合规边界"） |

### 2.4 内容集合路由映射

| URL前缀 | content collection | section 值 |
|---|---|---|
| `/library/` | library | "library" |
| `/research/` | research | "research" |
| `/reports/` | reports | "reports" |
| `/tools/` | tools | "tools" |
| `/glossary/` | glossary | "glossary" |
| `/faq/` | faq | "faq" |
| `/learn/` | courses | "learn" |
| `/about/` | pages | "about" |
| `/legal/` | pages | "legal" |
| `/news/` | news | "news" |

**注意**：`/learn/` 路由对应的是 `courses` 集合，section 值为 `"learn"` 而非 `"courses"`。

---

## 三、内容生成规范

### 3.1 九个主题集群

| 集群 ID | 名称 | 栏目 | 参考文献源 |
|---|---|---|---|
| `buy-domain-with-usdt` | USDT购买域名 | library | ICANN DNS + Tether Transparency + ICANN RAA |
| `buy-domain-with-crypto` | 加密货币购买域名 | library | ICANN DNS + ICANN RAA + FATF Virtual Assets |
| `private-domain-registration` | 隐私域名注册 | library | ICANN WHOIS + ICANN RDAP + GDPR |
| `web3-domain-identity` | Web3域名与数字身份 | research | ENS Docs + ICANN DNS + Unstoppable Domains |
| `stablecoin-economy` | 稳定币经济影响 | research | Tether Transparency + FATF + BIS Stablecoins |
| `dns-security-governance` | DNS安全与域名治理 | research | ICANN DNS + ICANN DNSSEC + NIST SP 800-81 |
| `cbdc-domain-infrastructure` | CBDC与域名基础设施 | research | BIS CBDC + ICANN DNS + PBOC e-CNY |
| `nft-domain-market` | NFT域名市场 | research | OpenSea + ENS + ICANN |
| `cross-border-domain-compliance` | 跨境域名合规 | research | ICANN RAA + FATF + GDPR |

### 3.2 内容类型与正文结构模板

每种内容类型有固定的正文结构，新内容必须遵循对应模板：

#### Pillar 页（支柱页，800-1500字）

```
## 摘要
## 问题定义与研究范围
## 技术背景（域名体系 + 加密支付接口 / DNS架构 / 身份协议）
## 实践路径 / 毉较分析 / 机制解析
## 隐私与合规分析
## 风险评估框架（表格：风险项 | 影响等级 | 缓解措施）
## 合规边界声明
## 参考资料
```

#### Longtail 页（长尾页，800-1200字）

```
## 摘要
## 问题定义
## 背景知识
## 核心结论
## 风险与限制
## 合规边界
## 相关入口
```

#### FAQ 页

```
**Q: 问题？**

A: 回答（3-5句，含内链）

（重复 6-10 组 Q/A）
```

#### 术语页（Glossary）

```
## 定义
## 为什么重要
## 常见误解（表格：误解 | 准确理解）
## 风险与限制
## 相关术语与阅读
```

#### 工具页（Tool / Checklist）

```
## 摘要
## 使用方式
## 检查表（表格：检查项 | 需要确认 | 记录方式）
## 风险与限制
## 合规边界
## 相关入口
## 参考资料
```

#### 报告页（Report）

```
## 摘要
## 研究问题
## 核心发现（表格：发现 | 解释 | 后续观察）
## 风险与限制
## 合规边界
## 后续更新计划
## 相关入口
```

#### 课程页（Course）

```
## 摘要
## 课程目标（列表）
## 第一讲：xxx
## 第二讲：xxx
## 第三讲：xxx
## 学习成果
```

#### 新闻简报（News）

```
## 摘要
## 注册商支付政策动态
## 稳定币基础设施进展
## DNS安全事件观察
## 本周数据要点
```

### 3.3 Frontmatter 必填字段清单

每个内容文件必须包含以下字段：

```yaml
---
title: "页面标题"
description: "180字以内的页面描述"
slug: "english-lowercase-hyphen"
section: "library|research|reports|tools|glossary|faq|learn|news|about|legal"
cluster: "cluster-id"
type: "pillar|longtail|research|report|tool|glossary|faq|course|policy|news|case-study|tutorial"
language: "zh-CN|en"
publishedAt: "2026-MM-DD"
updatedAt: "2026-MM-DD"
author: "Web3 Domain Institute Editorial Team"
reviewer: "Domain Infrastructure Research Desk"
tags:
- "标签1"
- "标签2"
keywords:
 primary: "核心关键词"
 secondary:
   - "次级关键词1"
   - "次级关键词2"
riskLevel: "low|medium|high"
index: true
audience:
- "域名持有者"
- "研究者"
- "Web3创业者"
- "技术人员"
summary: "页面摘要"
faqs:
-
  question: "问题"
  answer: "回答"
references:
-
  title: "参考标题"
  url: "https://..."
  source: "来源"
related:
-
  title: "相关页标题"
  url: "/path/"
updateCadence: "daily|weekly|monthly|quarterly|as-needed"
schemaType: "Article|FAQPage|Course|Dataset|DefinedTerm|CreativeWork|ScholarlyArticle|HowTo"
---
```

### 3.4 schemaType 与 type 对应关系

| type | schemaType |
|---|---|
| pillar / longtail / research / news / policy | Article |
| faq | FAQPage |
| course | Course |
| tool | Dataset |
| glossary | DefinedTerm |
| report | CreativeWork |
| case-study | ScholarlyArticle |
| tutorial | HowTo |

---

## 四、内容风格与写作约束

### 4.1 语言风格

- **学术正式体**：以研究论文/教科书口吻撰写，非博客/论坛风格
- **中文为主，英文术语不翻译**：写"USDT购买域名的Gas费影响"，不写"泰达币购买域名的燃料费影响"
- **保守表述**：用"可能"、"通常"、"在多数情况下"，不用"一定"、"肯定"、"绝对"
- **段落简洁**：每段3-5句，避免长篇大论
- **结构清晰**：H2/H3分级、表格对比、列表归纳
- **开头直接回答**：摘要段落必须直接回答页面标题隐含的问题，适合 AI 搜索引用（GEO）

### 4.2 绝对禁止

1. **禁止"站长"术语** → 用"域名持有者"替代
2. **禁止承诺完全匿名、不可追踪、绕过KYC** → 用"隐私保护"、"WHOIS隐私"、"合规边界"表达
3. **禁止提供违法操作指导** → 包括规避监管、逃避制裁、洗钱、欺诈、侵权用途
4. **禁止编造事实** → 不编造注册商政策、支付链支持、监管结论、价格、数据
5. **禁止金融/法律/税务/投资建议** → 本站是教育研究机构，不是顾问公司
6. **禁止关键词堆砌** → 关键词应自然嵌入学术语境，非生硬重复
7. **禁止泛锚文本** → 不用"点击这里"、"更多"、"查看"、"了解更多"，用描述性锚文本
8. **禁止把隐私保护写成违法匿名服务**

### 4.3 五个核心关键词

以下核心SEO关键词必须在各自集群的页面中自然出现，但不堆砌：

| 关键词 | 所属集群 | 植入策略 |
|---|---|---|
| USDT购买域名 | buy-domain-with-usdt | 在摘要、问题定义、风险段落自然提及 |
| 加密货币购买域名 | buy-domain-with-crypto | 在支付方式比较段落自然提及 |
| 匿名购买域名 | private-domain-registration | 在合规分析段落，配合"不等于违法"上下文 |
| 免实名域名 | private-domain-registration | 在WHOIS隐私/GDPR分析段落提及 |
| 免备案域名 | private-domain-registration | 在跨境注册/管辖权段落提及 |

### 4.4 内链规则

每个页面必须在 `related` frontmatter 中包含至少5个内链：
1. 1个支柱页（pillar）
2. 1个同集群页面（peer longtail）
3. 1个工具页（tool）
4. 1个术语页（glossary）
5. 1个报告页（report）

正文中的内链也要自然嵌入，使用描述性锚文本（如"[USDT购买域名风险检查清单](/tools/usdt-domain-risk-checklist/)"）。

### 4.5 参考文献规则

每个集群有3个固定权威参考源（见 3.1 集群表），不得使用通用 Google SEO 指南作为参考。新增页面必须使用所属集群的参考源。

---

## 五、合规红线与应急处理

### 5.1 合规验证失败时的修复策略

**不要删除禁用词**，而是添加合规上下文词。验证器正则：

```
/(不得|不能|不应|不用于|不提供|不构成|不等于|不是|避免|禁止|风险|合规|边界|误区|披露|教育|研究)/
```

示例修复：

| 原文 | 修复后 |
|---|---|
| 完全匿名注册域名 | 完全匿名不等于合规隐私保护 |
| 绕过KYC购买域名 | 绕过KYC是违反合规要求的行为 |
| 不可追踪的域名 | 不可追踪在技术上不现实，合规要求保留审计记录 |

### 5.2 新增禁用词

如需增加合规敏感词，编辑 `scripts/validate-compliance.ts` 的 `forbidden` 数组。每个新词也需考虑 `allowedContext` 正则是否覆盖。

---

## 六、日常运维工作流程

### 6.1 日常更新任务（按 content-calendar.json）

| 频率 | 任务 | 命令/操作 |
|---|---|---|
| 每日 | 生成3个集群各1篇长尾页 | `npm run generate -- --cluster=buy-domain-with-usdt` |
| 每周 | 更新注册商对比表 | 编辑 `src/content/tools/crypto-domain-registrar-comparison.md` + `src/data/registrars.json` |
| 每周 | 发布新闻简报 | 新建 `src/content/news/weekly-briefing/YYYY-MM-DD.md` |
| 每周 | 刷新FAQ页 | 更新 `src/content/faq/*.md` 的 updatedAt + 内容 |
| 每月 | 刷新支柱页 | 更新9个pillar页的 updatedAt + 内容 |
| 每月 | 更新风险检查清单 | 更新2个tool页 |
| 每季度 | 生成研究报告 | 新建/更新 `src/content/reports/*.md` |
| 每季度 | 审查术语准确性 | 审查 `src/content/glossary/*.md` |

### 6.2 创建新页面的完整步骤

1. **确定页面属性**：cluster、type、section、slug
2. **创建 Markdown 文件**：`src/content/{collection}/{slug}.md`
3. **填写完整 frontmatter**（参照 3.3 必填字段清单）
4. **撰写正文**（参照 3.2 对应类型模板）
5. **运行验证**：`npm run validate`
6. **修复所有错误**，直到验证通过
7. **运行完整构建**：`npm run build`
8. **确认输出**：150+ 页面构建成功，无错误

### 6.3 更新现有页面

1. 修改正文内容
2. 更新 `updatedAt` 为当前日期
3. 如有结构变更，同步更新 `related` 和 `faqs`
4. 运行 `npm run validate && npm run build`

### 6.4 CI/CD 自动化流程

GitHub Actions（`.github/workflows/generative-static-site.yml`）每日自动：
1. 运行 `npm run generate`（需 `OPENAI_API_KEY` secret）
2. 运行 `npm run update --skip-generate`
3. 提交生成的 内容到 Git
4. 运行 `npm run build`
5. 部署到 GitHub Pages

Agent 手动干预场景：
- 验证失败 → 修复内容后推送
- 生成质量差 → 删除生成的 md 文件，重新生成
- 需要新集群 → 更新 `topic-clusters.json` + `keywords.json` + `internal-links.json` + `content-calendar.json`

---

## 七、数据文件维护

### 7.1 topic-clusters.json

每个集群对象包含：`id`, `name`, `section`, `pillar`, `subpages`, `tool`, `report`, `faq`, `course`, `glossary`, `intent`。新增子页面时必须同步更新对应集群的 `subpages` 数组。

### 7.2 keywords.json

结构：`{ brand: [...], clusters: { "cluster-id": [...] } }`。新增页面时，检查是否需要添加新的长尾关键词到对应集群。

### 7.3 internal-links.json

结构：`{ "cluster-id": [{ title, url }, ...] }`。新增页面时，如果页面属于某个集群，必须将其添加到对应集群的内链列表。

### 7.4 registrars.json

注册商对比数据，用于首页表格。`updatedAt` 必须与 `src/content/tools/crypto-domain-registrar-comparison.md` 的 `updatedAt` 同步更新。

---

## 八、Agent 行为准则

### 8.1 修改前必须做的事

1. **先读后改**：用 Read 工具读取目标文件，理解现有格式后再修改
2. **先搜后建**：用 Grep/Glob 搜索现有文件，确认无重复再创建新文件
3. **先验后交**：修改后必须运行 `npm run validate`，通过后再考虑构建

### 8.2 安全边界

1. **不修改验证器逻辑**除非用户明确要求（合规验证器和SEO验证器的规则是红线）
2. **不修改 Astro 配置**除非用户明确要求
3. **不修改 Zod schema**（`src/content/config.ts`）除非用户明确要求
4. **不修改布局和组件**除非用户明确要求
5. **不提交含 .env / credentials 的文件**

### 8.3 内容质量自查

每次生成新内容后，Agent 应自查：

- [ ] frontmatter 所有必填字段是否完整
- [ ] keywords 缩进是否正确（primary/secondary 缩进1格）
- [ ] faqs/references/related 缩进是否正确（`-\n  field:` 格式）
- [ ] slug 是否全小写英文+连字符
- [ ] description 是否 ≤ 180 字符
- [ ] 是否包含至少5个 related 内链
- [ ] 正文是否遵循对应类型模板结构
- [ ] 是否自然植入了集群核心关键词
- [ ] 是否有合规禁用词（检查并添加上下文）
- [ ] updatedAt 是否更新为当前日期
- [ ] 参考文献是否使用集群指定权威源
- [ ] 是否使用了"站长"术语（替换为"域名持有者"）

### 8.4 错误恢复

| 场景 | 操作 |
|---|---|
| validate 失败 | 读取错误信息 → 定位文件和行号 → 修复 → 重新验证 |
| build 失败（YAML 解析错误） | 检查 frontmatter 缩进 → 参照 2.1 修复 → 重新构建 |
| build 失败（Zod 验证失败） | 检查字段类型和值 → 对照 config.ts schema 修复 |
| 生成内容质量差 | 删除生成的 md 文件 → 修正 prompt 或手动重写 |
| 重复 URL | 检查 slug 冲突 → 修改 slug |

---

## 九、扩展方向

### 9.1 新增内容类型实施指南

当前 `type` 枚举值（`config.ts:41-51`）为：pillar, longtail, research, report, tool, glossary, faq, course, policy, news, case-study, tutorial。以下三种新类型需要修改 schema 并创建对应布局。

#### 9.1.1 案例研究（Case Study）

**用途**：记录真实域名支付事件、注册商政策变更、DNS安全事件的事后分析。

**schema 变更**（`src/content/config.ts`）：

```diff
 type: z.enum([
   "pillar", "longtail", "research", "report", "tool",
   "glossary", "faq", "course", "policy", "news",
   "case-study", "tutorial"
 ]),
 schemaType: z.enum([
   "Article", "FAQPage", "Course", "Dataset",
   "DefinedTerm", "CreativeWork", "ScholarlyArticle", "HowTo"
 ])
```

**schemaType 映射**：case-study → ScholarlyArticle

**正文模板**：

```markdown
## 摘要
## 事件背景（时间线表格：日期 | 事件 | 信息来源）
## 技术分析（支付链 / DNS配置 / 隐私设置 / 注册商响应）
## 影响评估（表格：影响维度 | 受影响对象 | 严重程度）
## 教训与建议
## 合规边界
## 相关入口
## 参考资料
```

**frontmatter 示例**：

```yaml
title: "案例：2026年X注册商USDT支付中断事件分析"
slug: "registrar-usdt-payment-outage-2026"
section: "library"
cluster: "buy-domain-with-usdt"
type: "case-study"
schemaType: "ScholarlyArticle"
riskLevel: "high"
updateCadence: "as-needed"
```

**需要修改的文件**：

| 文件 | 修改内容 |
|---|---|
| `src/content/config.ts` | type 枚举添加 `"case-study"`，schemaType 枚举添加 `"ScholarlyArticle"` |
| `src/layouts/ArticleLayout.astro` | 添加 case-study 类型识别，展示时间线表格样式 |
| `scripts/validate-seo.ts` | 如有 type 白名单则添加 `"case-study"` |
| `scripts/seed-content.mjs` | `normalizeItem()` 的 schemaType 映射逻辑添加 case-study → ScholarlyArticle |
| `AGENT-OPS-GUIDE.md` 3.4 节 | 添加 case-study → ScholarlyArticle 映射行 |

**注意事项**：
- 案例研究必须基于公开可验证信息，禁止编造事件细节
- 涉及具体注册商时必须注明信息来源和更新时间
- 不对注册商做评价性结论，只记录事实和可验证的政策差异

#### 9.1.2 教程（Tutorial）

**用途**：步骤式操作指南（如"如何启用DNSSEC"、"如何配置WHOIS隐私"）。

**schemaType 映射**：tutorial → HowTo

**正文模板**：

```markdown
## 摘要
## 前置条件（列表：需要准备的账户、工具、信息）
## 操作步骤（编号列表，每步含：操作描述 | 预期结果 | 常见错误）
## 验证方法（如何确认操作成功）
## 风险与限制
## 合规边界
## 相关入口
## 参考资料
```

**frontmatter 示例**：

```yaml
title: "如何启用DNSSEC：注册商配置步骤指南"
slug: "how-to-enable-dnssec"
section: "learn"
cluster: "dns-security-governance"
type: "tutorial"
schemaType: "HowTo"
riskLevel: "medium"
updateCadence: "quarterly"
```

**需要修改的文件**：

| 文件 | 修改内容 |
|---|---|
| `src/content/config.ts` | type 枚举添加 `"tutorial"`，schemaType 枚举添加 `"HowTo"` |
| `src/layouts/CourseLayout.astro` | 扩展支持 tutorial 类型，或新建 TutorialLayout.astro |
| `src/components/` | 新建 SchemaHowTo.astro，输出 HowTo JSON-LD |
| `scripts/validate-seo.ts` | 如有 type 白名单则添加 `"tutorial"` |
| `scripts/seed-content.mjs` | schemaType 映射添加 tutorial → HowTo |

**注意事项**：
- 教程不得提供规避监管、逃避KYC的操作步骤
- 每个步骤必须包含"预期结果"和"常见错误"，降低误操作风险
- 教程与课程的区分：课程是系统性学习路径（多讲），教程是单任务操作指南
- 注册商相关教程必须注明"操作界面可能随注册商更新而变化"

#### 9.1.3 数据可视化（Data Visualization）

**用途**：链上支付统计、注册商支持趋势、DNSSEC采用率等数据图表页面。

**实现方式**：不需要新增 type，使用现有 `report` type + `schemaType: "Dataset"`。

**正文模板**：

```markdown
## 摘要
## 数据来源与方法论
## 核心图表（每个图表含：标题 | SVG/图片 | 数据说明 | 局限性）
## 关键发现（表格：发现 | 数据支撑 | 置信度）
## 数据更新计划
## 合规边界
## 相关入口
## 参考资料
```

**数据可视化不新增 type 的理由**：
- 数据可视化本质是报告的一种呈现形式，frontmatter 字段完全兼容
- 通过 `tags: ["数据可视化"]` 和 `keywords` 区分即可
- 避免过度扩展 type 枚举导致验证器和生成脚本复杂度增加

**图表技术方案**：

| 方案 | 优点 | 缺点 | 推荐场景 |
|---|---|---|---|
| SVG 内嵌 | 零依赖、构建快、SEO友好 | 交互性差 | 静态统计图、趋势线 |
| Markdown 表格 | 最简单、Astro原生支持 | 无法做复杂图表 | 简单数据对比 |
| Chart.js（客户端） | 交互式、类型丰富 | 增加JS bundle、无SSR | 需要交互的图表 |
| Observable Plot | 声明式、与数据科学生态兼容 | 需学习新API | 复杂数据分析页面 |

**推荐起步方案**：先用 Markdown 表格 + SVG 内嵌，待有3+可视化页面后评估是否引入 Chart.js。

**需要修改的文件**：

| 文件 | 修改内容 |
|---|---|
| `src/layouts/ReportLayout.astro` | 添加 `.chart-container` 样式类，支持SVG居中展示 |
| `src/styles/global.css` | 添加 `.chart-container` + `.chart-caption` 样式 |

#### 9.2 新增集群实施指南

新增集群需要修改7个文件，按以下顺序执行可避免遗漏。

#### 9.2.1 集群 A：CBDC与域名基础设施

| 项 | 值 |
|---|---|
| id | `cbdc-domain-infrastructure` |
| name | CBDC与域名基础设施 |
| section | `research` |
| intent | 研究央行数字货币对域名支付、跨境注册、ICANN治理和互联网基础设施采购的影响 |
| 核心关键词 | CBDC域名支付、央行数字货币域名、数字人民币购买域名 |

**权威参考源**：

```json
[
  { "title": "BIS: Central Bank Digital Currencies", "url": "https://www.bis.org/topics/cbdc.htm", "source": "BIS" },
  { "title": "ICANN: Domain Name System (DNS)", "url": "https://www.icann.org/resources/pages/what-2012-02-25-en", "source": "ICANN" },
  { "title": "People's Bank of China: Digital Currency (e-CNY)", "url": "https://www.pbc.gov.cn/en/3695837369583789952/index.html", "source": "PBOC" }
]
```

**初始页面结构**：

| slug | type | section | title |
|---|---|---|---|
| `cbdc-domain-infrastructure` | pillar | research | CBDC与域名基础设施研究框架 |
| `cbdc-domain-infrastructure/e-cny-domain-payment` | research | research | 数字人民币购买域名可行性分析 |
| `cbbc-domain-infrastructure/cbdc-vs-stablecoin-domain` | research | research | CBDC与稳定币在域名支付中的差异 |
| `2026-cbdc-domain-report` | report | reports | 2026 CBDC与域名基础设施报告 |
| `cbdc-domain-faq` | faq | faq | CBDC域名支付常见问题 |
| `advanced-cbdc-domain-payment` | course | learn | 进阶：CBDC域名支付机制分析 |

#### 9.2.2 集群 B：NFT域名市场

| 项 | 值 |
|---|---|
| id | `nft-domain-market` |
| name | NFT域名市场 |
| section | `research` |
| intent | 研究NFT域名交易机制、估值方法、流动性风险和与传统域名市场的比较 |
| 核心关键词 | NFT域名、NFT域名交易、域名NFT估值 |

**权威参考源**：

```json
[
  { "title": "OpenSea: Domain Category", "url": "https://opensea.io/category/domain-names", "source": "OpenSea" },
  { "title": "ENS: Documentation", "url": "https://docs.ens.domains/", "source": "ENS" },
  { "title": "ICANN: Domain Name System (DNS)", "url": "https://www.icann.org/resources/pages/what-2012-02-25-en", "source": "ICANN" }
]
```

**初始页面结构**：

| slug | type | section | title |
|---|---|---|---|
| `nft-domain-market` | pillar | research | NFT域名市场研究框架 |
| `nft-domain-market/ens-name-trading` | research | research | ENS域名交易机制与流动性分析 |
| `nft-domain-market/nft-domain-valuation` | research | research | NFT域名估值方法与风险 |
| `2026-nft-domain-market-report` | report | reports | 2026 NFT域名市场报告 |
| `nft-domain-faq` | faq | faq | NFT域名市场常见问题 |
| `advanced-nft-domain-trading` | course | learn | 进阶：NFT域名交易与风险 |

#### 9.2.3 集群 C：跨境域名合规

| 项 | 值 |
|---|---|
| id | `cross-border-domain-compliance` |
| name | 跨境域名合规 |
| section | `research` |
| intent | 比较多司法管辖区域名注册的KYC、数据保护、制裁合规和争议解决机制差异 |
| 核心关键词 | 跨境域名合规、域名注册合规、多国域名注册 |

**权威参考源**：

```json
[
  { "title": "ICANN: Registrar Accreditation Agreement", "url": "https://www.icann.org/resources/pages/approved-with-specs-2013-09-17-en", "source": "ICANN" },
  { "title": "FATF: International Standards on Combating Money Laundering", "url": "https://www.fatf-gafi.org/en/publications/Fatfguidance/Fatf-recommendations.html", "source": "FATF" },
  { "title": "GDPR: Official Regulation Text", "url": "https://gdpr-info.eu/", "source": "EU" }
]
```

**初始页面结构**：

| slug | type | section | title |
|---|---|---|---|
| `cross-border-domain-compliance` | pillar | research | 跨境域名合规研究框架 |
| `cross-border-domain-compliance/kyc-jurisdiction-comparison` | research | research | 各司法管辖区域名注册KYC要求比较 |
| `cross-border-domain-compliance/sanction-screening-domain` | research | research | 制裁筛查与域名注册合规风险 |
| `2026-cross-border-domain-compliance-report` | report | reports | 2026 跨境域名合规报告 |
| `cross-border-domain-faq` | faq | faq | 跨境域名合规常见问题 |
| `advanced-cross-border-compliance` | course | learn | 进阶：跨境域名合规审查 |

#### 9.2.4 新增集群修改清单（7个文件）

每个新集群必须按以下顺序修改所有文件，遗漏任何一个将导致构建失败或内链断裂：

**第1步：`src/content/config.ts`**（无需修改）
section 枚举已包含 `"research"`，type 枚举已包含所有需要的类型。

**第2步：`src/data/topic-clusters.json`**

在数组末尾添加集群对象。格式参照现有9个集群：

```json
{
  "id": "cbdc-domain-infrastructure",
  "name": "CB3与域名基础设施",
  "section": "research",
  "pillar": "/research/cbdc-domain-infrastructure/",
  "subpages": [
    "/research/cbdc-domain-infrastructure/e-cny-domain-payment/",
    "/research/cbdc-domain-infrastructure/cbdc-vs-stablecoin-domain/"
  ],
  "tool": "/tools/crypto-domain-registrar-comparison/",
  "report": "/reports/2026-cbdc-domain-report/",
  "faq": "/faq/cbdc-domain-faq/",
  "course": "/learn/advanced-cbdc-domain-payment/",
  "glossary": ["/glossary/usdt/", "/glossary/stablecoin/"],
  "intent": "研究央行数字货币对域名支付、跨境注册、ICANN治理和互联网基础设施采购的影响。"
}
```

**第3步：`src/data/keywords.json`**

在 `clusters` 对象中添加：

```json
"cbdc-domain-infrastructure": [
  "CBDC域名支付", "央行数字货币域名", "cbdc domain payment",
  "数字人民币购买域名", "CBDC与域名", "e-CNY域名支付"
]
```

**第4步：`src/data/internal-links.json`**

在根对象中添加集群内链数组（至少包含 pillar + 1 subpage + 1 tool + 1 glossary + 1 report）：

```json
"cbdc-domain-infrastructure": [
  { "title": "CBDC与域名基础设施研究", "url": "/research/cbdc-domain-infrastructure/" },
  { "title": "数字人民币购买域名可行性分析", "url": "/research/cbdc-domain-infrastructure/e-cny-domain-payment/" },
  { "title": "USDT术语解释", "url": "/glossary/us26/"},
  { "title": "加密支付域名注册商对比", "url": "/tools/crypto-domain-registrar-comparison/"},
  { "title": "2026 CBDC与域名基础设施报告", "url": "/reports/2026-cbdc-domain-report/" }
]
```

**第5步：`src/data/content-calendar.json`**

在 `daily` 数组中添加（如需每日生成），或在适当位置添加集群的更新节奏：

```json
{ "cluster": "cbdc-domain-infrastructure", "type": "longtail", "count": 1 }
```

**第6步：`scripts/seed-content.mjs`**

需要在两个位置添加：

1. `clusterRefs` 对象（第9-44行区域）— 添加3个权威参考源
2. `clusterLinks` 对象（第47-89行区域）— 添加5个内链条目

```javascript
"cbdc-domain-infrastructure": [
  { title: "BIS: Central Bank Digital Currencies", url: "https://www.bis.org/topics/cbdc.htm", source: "BIS" },
  { title: "ICANN: Domain Name System (DNS)", url: "https://www.icann.org/resources/pages/what-2012-02-25-en", source: "ICANN" },
  { title: "People's Bank of China: Digital Currency (e-CNY)", url: "https://www.pbc.gov.cn/en/3695837369583789952/index.html", source: "PBOC" }
],
```

```javascript
"cbdc-domain-infrastructure": [
  ["CBDC与域名基础设施研究", "/research/cbdc-domain-infrastructure/"],
  ["数字人民币购买域名可行性分析", "/research/cbdc-domain-infrastructure/e-cny-domain-payment/"],
  ["USDT术语解释", "/glossary/usdt/"],
  ["加密支付域名注册商对比", "/tools/crypto-domain-registrar-comparison/"],
  ["2026 CBDC与域名基础设施报告", "/reports/2026-cbdc-domain-report/"]
],
```

**第7步：`src/lib/breadcrumbs.ts`**

在 `labels` 对象（第1-19行）中添加集群中文名称映射：

```typescript
"cbdc-domain-infrastructure": "CBDC与域名基础设施",
```

**验证步骤**：完成7步修改后，按顺序执行：

```bash
npm run validate        # 确认SEO+合规验证通过
npm run build           # 确认构建成功，页面数增加
```

**回滚方案**：如新集群导致问题，删除第2-6步的添加项，删除已生成的md文件，重新构建。

---

### 9.3 技术改进实施指南

#### 9.3.1 搜索功能：Pagefind

**选择理由**：Pagefind 是静态站点搜索方案，构建后自动索引，零服务器成本，与 Astro SSG 完全兼容。Algolia 需要外部服务且有免费额度限制。

**安装步骤**：

```bash
npm install pagefind
```

**构建后索引**（在 `npm run build` 之后运行）：

```bash
npx pagefind --site dist --output-dir dist/pagefind
```

**BaseLayout.astro 修改**（`src/layouts/BaseLayout.astro`）：

在 `<head>` 中添加：
```html
<link href="/pagefind/pagefind-ui.css" rel="stylesheet" />
```

在 `</body>` 前添加：
```html
<script src="/pagefind/pagefind-ui.js"></script>
<div id="search" style="display:none"></div>
<script>
  new PagefindUI({ element: "#search", showSubResults: true });
</script>
```

**新建搜索页面**（`src/pages/search.astro`）：

```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";
---
<BaseLayout title="搜索" description="搜索本站内容" path="/search/">
  <div id="search"></div>
</BaseLayout>
```

**构建脚本修改**（`package.json`）：

```diff
- "build": "npm run validate && npm run generate:rss && npm run generate:sitemaps && astro build"
+ "build": "npm run validate && npm run generate:rss && npm run generate:sitemaps && astro build && npx pagefind --site dist --output-dir dist/pagefind"
```

**CI/CD 修改**（`.github/workflows/generative-static-site.yml`）：

build job 的 `npm run build` 之后无需额外步骤，因为 pagefind 已嵌入 build 脚本。

**sitemap 过滤**：`astro.config.mjs` 的 sitemap filter 已包含 `/search/` 排除规则（第16行），无需修改。

**预估工作量**：0.5天。无需修改验证器。

#### 9.3.2 国际化（i18n）：英文版本

**策略**：采用 Astro 推荐的目录式 i18n（`/en/` 前缀），保留中文为默认语言。

**目录结构变更**：

```
src/content/              # 现有中文内容（不变）
src/content/en/           # 英文内容镜像（新增）
  library/
  research/
  ...
src/pages/                # 中文路由（不变）
src/pages/en/             # 英文路由（新增）
```

**astro.config.mjs 修改**：

```diff
 export default defineConfig({
   site,
   output: "static",
+  i18n: {
+    defaultLocale: "zh-CN",
+    locales: ["zh-CN", "en"],
+    routing: {
+      prefixDefaultLocale: false
+    }
+  },
   integrations: [mdx(), sitemap(...)],
```

**BaseLayout.astro 修改**：

- `<html lang="zh-CN">` → `<html lang={lang}>`（通过 prop 传入）
- 添加 `<link rel="alternate" hreflang="en" href={SITE.url + "/en" + path} />`

**内容策略**：
- 英文页面不逐篇翻译中文内容，而是优先翻译9个 pillar + 9个 FAQ
- 英文 frontmatter 的 `language` 字段设为 `"en"`
- 英文正文保留中文术语的英文原文（如"WHOIS privacy"而非"WHOIS隐私"）

**需要修改的文件**：

| 文件 | 修改内容 |
|---|---|
| `astro.config.mjs` | 添加 i18n 配置 |
| `src/layouts/BaseLayout.astro` | lang 属性动态化 + hreflang 标签 |
| `src/content/config.ts` | language 字段验证改为 `z.enum(["zh-CN", "en"])` 或放宽 |
| `src/lib/site.ts` | 添加 SITE.locales 配置 |
| `src/data/navigation.ts` | 添加英文导航 + 语言切换链接 |
| `scripts/validate-seo.ts` | 英文页面跳过中文禁用词检查 |

**预估工作量**：3-5天（含翻译9个 pillar + 9个 FAQ）。

#### 9.3.3 评论系统：Giscus

**选择理由**：Giscus 基于 GitHub Discussions，零服务器、免费、与静态站点兼容。Disqus 有广告和隐私问题。

**前置条件**：
- GitHub 仓库必须为 public
- 安装 Giscus GitHub App（https://github.com/apps/giscus）
- 在仓库 Settings → Discussions 中启用 Discussions 功能

**ArticleLayout.astro 修改**（在正文末尾、RelatedArticles 前添加）：

```astro
---
const giscusConfig = {
  repo: "your-org/web3-domain-institute",
  repoId: "从 https://giscus.app 获取",
  category: "Announcements",
  categoryId: "从 https://giscus.app 获取",
  mapping: "pathname",
  lang: "zh-CN",
  theme: "light"
};
---
<script
  src="https://giscus.app/client.js"
  data-repo={gisc1sConfig.repo}
  data-repo-id={giscusConfig.repoId}
  data-category={giscusConfig.category}
  data-category-id={giscusConfig.categoryId}
  data-mapping={giscusConfig.mapping}
  data-lang={giscusConfig.lang}
  data-theme={giscusConfig.theme}
  crossorigin="anonymous"
  async
></script>
```

**隐私合规**：Giscus 加载 GitHub 第三方脚本，需要在隐私政策页面（`/legal/privacy-policy/`）中披露。

**sitemap 处理**：评论组件是客户端渲染，不影响 sitemap。无需修改 `astro.config.mjs`。

**预估工作量**：0.5天。

#### 9.3.4 分析追踪：Plausible

**选择理由**：Plausible 不使用 cookie、符合 GDPR、无需 cookie 横幅、轻量（<1KB script）。Umami 需要自托管服务器。

**方案A：Plausible Cloud**

在 BaseLayout.astro 的 `<head>` 中添加：

```html
<script defer data-domain="web3-domain-institute.edu.pl" src="https://plausible.io/js/script.js"></script>
```

**方案B：自托管 Plausible**（推荐，完全控制数据）

```html
<script defer data-domain="web3-domain-institute.edu.pl" src="https://stats.your-domain.com/js/script.js"></script>
```

**隐私政策更新**（`/legal/privacy-policy/`）：

必须添加：
- 说明使用 Plausible 进行匿名化访问统计
- 不使用 cookie
- 不追踪个人身份信息
- 符合 GDPR 无需同意横幅

**预估工作量**：0.25天（Cloud）/ 1天（自托管）。

#### 9.3.5 RSS 扩展：按集群分类输出

**当前状态**：`scripts/generate-rss.ts` 输出单一 `public/rss.xml`，包含全部80条内容。

**目标**：输出9个 RSS 文件（1个全站 + 9个集群）。

**输出文件列表**：

```
public/rss.xml                              # 全站RSS（保持现有）
public/rss/buy-domain-with-usdt.xml         # USDT购买域名集群
public/rss/buy-domain-with-crypto.xml       # 加密货币购买域名集群
public/rss/private-domain-registration.xml  # 隐私域名注册集群
public/rss/web3-domain-identity.xml         # Web3域名与数字身份集群
public/rss/stablecoin-economy.xml           # 稳定币经济集群
public/rss/dns-security-governance.xml      # DNS安全与域名治理集群
public/rss/cbdc-domain-infrastructure.xml     # CBDC与域名基础设施集群
public/rss/nft-domain-market.xml             # NFT域名市场集群
public/rss/cross-border-domain-compliance.xml # 跨境域名合规集群
```

**`scripts/generate-rss.ts` 修改逻辑**：

```typescript
// 伪代码
const clusters = JSON.parse(readFileSync("src/data/topic-clusters.json"));

// 1. 生成全站 RSS（现有逻辑，不变）
generateRSS(allEntries, "public/rss.xml");

// 2. 为每个集群生成分类 RSS
for (const cluster of clusters) {
  const clusterEntries = allEntries.filter(e => e.cluster === cluster.id);
  generateRSS(clusterEntries, `public/rss/${cluster.id}.xml`);
}
```

**导航更新**（`src/data/navigation.ts`）：

footer 中 RSS 链接改为下拉菜单或直接链接到全站 RSS（集群 RSS 在各集群 pillar 页的 `<head>` 中通过 `<link rel="alternate">` 暴露）。

**BaseLayout.astro / ArticleLayout.astro 修改**：

根据当前页面的 `cluster` 字段，在 `<head>` 中添加对应的 RSS 发现标签：

```html
<link rel="alternate" type="application/rss+xml" 
      title="USDT购买域名 RSS" 
      href="/rss/buy-domain-with-usdt.xml" />
```

**预估工作量**：0.5天。

#### 9.3.6 技术改进优先级排序

| 优先级 | 改进 | 工作量 | 影响范围 | 依赖 |
|---|---|---|---|---|
| P0 | Pagefind 搜索 | 0.5天 | 全站可用性 | 无 |
| P1 | RSS 按集群扩展 | 0.5天 | 订阅者体验 | 无 |
| P1 | Plausible 分析 | 0.25-1天 | 增长数据 | 需选择 Cloud/自托管 |
| P2 | Giscus 评论 | 0.5天 | 用户互动 | 需启用 GitHub Discussions |
| P3 | i18n 英文版 | 3-5天 | 国际化覆盖 | 工作量大，建议在内容稳定后执行 |

---

*文档版本：2026-05-05 | 基于完整构建 150+ 内容页的实战经验*