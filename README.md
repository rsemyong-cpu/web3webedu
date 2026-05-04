# Web3 Domain Institute

生成式静态内容站：Astro + Content Collections + Markdown/MDX + AI 生成式更新 + SEO/GEO 校验 + 自动构建发布。

## 项目定位

Web3域名与稳定币研究学院，研究方向包括：

- USDT购买域名
- 加密货币购买域名
- 隐私域名注册与合规边界
- Web3域名与数字身份
- 稳定币经济影响
- DNS安全与域名治理

## 常用命令

```bash
npm install
npm run seed
npm run dev
npm run validate
npm run build
```

## 生成式更新

```bash
npm run generate
npm run update
```

`npm run generate` 会读取 `src/data/content-calendar.json` 与 `prompts/article-generator.md`。如果设置 `OPENAI_API_KEY`，脚本会使用 OpenAI Responses API 生成正文；否则使用保守的本地模板生成可审核草稿。

## 内容结构

- `src/content/library/`：知识库、支柱页、长尾页
- `src/content/research/`：研究中心
- `src/content/reports/`：报告与出版物
- `src/content/tools/`：工具与数据页
- `src/content/glossary/`：术语词典
- `src/content/faq/`：问答中心
- `src/content/courses/`：课程中心
- `src/content/pages/`：关于、法律、政策页面
- `src/content/authors/`：作者与编辑团队

## 质量约束

构建前会运行：

- `scripts/validate-seo.ts`
- `scripts/validate-compliance.ts`
- `scripts/generate-rss.ts`
- `scripts/generate-sitemap.ts`

校验包括标题、描述、URL、FAQ、风险提示、内链、泛锚文本、重复 URL 和违规匿名/规避监管表达。

## 自动发布

`.github/workflows/generative-static-site.yml` 提供：

- 每日定时内容生成
- 内容校验
- RSS 与拆分 sitemap 生成
- Astro 静态构建
- GitHub Pages 发布
