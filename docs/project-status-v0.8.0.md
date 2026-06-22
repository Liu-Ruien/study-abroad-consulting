# 项目状态文档 v0.8.0

本文档用于在开启新 ChatGPT 聊天、Cursor、Codex 或其他 AI 工具会话时，快速理解当前项目状态和后续开发边界。

---

## 1. 项目基本信息

- 项目名称：出国咨询信息整理平台 / overseas-consulting / study-abroad-consulting
- 项目定位：面向中国大陆用户的出国路线规划与真实经验整理平台
- 当前版本：v0.8.0
- 当前阶段：第四阶段已开始，已新增 `/ai` AI 问答 MVP 页面
- 在线地址：https://study-abroad-consulting.vercel.app/
- 技术栈：Next.js 16、React、TypeScript、Tailwind CSS、Git / GitHub、Vercel

---

## 2. 当前已完成阶段

### 第一阶段：内容网站 MVP

已完成首页、文章列表页、文章详情页、分类文章页、基础文章数据和内容结构。

### 第二阶段：产品化优化与部署

已完成产品化 UI 优化、搜索和筛选、GitHub 上传、Vercel 部署、README 项目包装和产品蓝图文档。

### 第三阶段：/plan 出国路线规划页面

已完成 `/plan` 路线规划功能、Apple 风格 UI 优化、本地推荐规则升级、`lib/plan` 架构整理、PDF 打印、移动端适配和 v0.6.2 回归修复。

### 第四阶段：/ai AI 问答 MVP 页面

已开始第四阶段，并新增 `/ai` AI 问答 MVP 页面。当前只使用本地模拟回答逻辑，不调用真实 AI API。

---

## 3. v0.8.0 已新增内容

- 新增 `/ai` 页面：作为出国问题 AI 问答助手 MVP。
- 新增问题输入区：支持用户输入留学、预算、语言、签证、求职和路线选择问题。
- 新增提交按钮：点击后生成本地模拟回答。
- 新增回答展示区：包含简短结论、分点建议、风险提醒和下一步行动。
- 新增常见问题快捷按钮：点击后直接生成对应模拟回答。
- 新增基础加载状态：模拟整理回答过程。
- 新增空输入校验：空问题不会生成回答，并显示轻量提示。
- 新增固定风险提示：每条回答都提示不构成签证、移民、录取或就业承诺。
- 新增导航入口：顶部导航增加 `AI 问答`。

---

## 4. 当前架构说明

关键目录：

```text
app/
  ai/
    page.tsx
  plan/
    page.tsx

components/
  ai/
    AiChatPanel.tsx
    AiQuestionForm.tsx
    AiAnswerCard.tsx
    AiSuggestionChips.tsx
  plan/
    SelectField.tsx
    FormSection.tsx
    SummaryItem.tsx
    PlanForm.tsx
    PlanInsightModal.tsx
    PlanRouteDetailModal.tsx
    PlanPdfReport.tsx
    ConfirmResetModal.tsx

lib/
  ai/
    types.ts
    mock-answer.ts
    index.ts
  plan/
    types.ts
    options.ts
    route-data.ts
    labels.ts
    scoring-engine.ts
    route-engine.ts
    insight-engine.ts
    index.ts

lib/plan-routes.ts
```

说明：

- `/ai` 当前是本地模拟问答页面，不接真实 AI API。
- `components/ai/AiChatPanel.tsx` 负责输入、加载、校验和回答状态。
- `lib/ai/mock-answer.ts` 根据关键词生成模拟回答。
- `/plan` 已稳定，不应在第四阶段无关任务中改动其核心逻辑。
- `lib/plan-routes.ts` 仍是路线规划兼容导出入口，业务逻辑在 `lib/plan/*`。

---

## 5. 当前功能限制

- 当前 `/ai` 不接真实 AI。
- 当前不接数据库。
- 当前没有用户系统。
- 当前不保存问答历史记录。
- 当前不添加 `.env` 或后端接口。
- 当前回答只基于本地关键词模拟逻辑。
- 当前回答只适合作为初步信息整理，不构成签证、移民、录取、法律或就业承诺。
- 重要信息需要以学校、使领馆、入管局、移民局及官方政策为准。

---

## 6. 当前稳定性状态

- 第三阶段 `/plan` 已完成 v0.6.2 回归测试。
- v0.8.0 已新增 `/ai` MVP 页面。
- `/ai` 页面当前不影响 `/plan` 推荐规则和既有功能。
- 完成版本后应运行 `npm run build` 和 `npm run lint`。

---

## 7. 下一阶段建议

后续可在第四阶段继续增强 `/ai`：

- 接入真实 AI API，但必须保留安全边界和免责声明。
- 增加问答记录，但需要先设计用户系统或本地存储边界。
- 将 `/plan` 结果作为上下文辅助 AI 解释，但不能直接承诺结果。
- 后续再考虑用户系统、保存记录、真实经验社区和付费功能。

---

## 8. 给新聊天 / Cursor 的使用说明

如果以后开启新聊天，请先发送本文件内容，或让 AI 阅读本文件，再继续开发。

后续开发前应先确认当前版本、目标版本和本次任务范围。每次完成版本后都要：

- `npm run build`
- `npm run lint`
- `npm run dev` 手动测试
- `git add`
- `git commit`
- `git push`
