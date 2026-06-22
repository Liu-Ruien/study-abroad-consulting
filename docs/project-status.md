# 项目状态文档

本文档用于在开启新 ChatGPT 聊天、Cursor、Codex 或其他 AI 工具会话时，快速理解当前项目状态和后续开发边界。

---

## 1. 项目基本信息

- 项目名称：出国咨询信息整理平台 / overseas-consulting / study-abroad-consulting
- 项目定位：面向中国大陆用户的出国路线规划与真实经验整理平台
- 当前版本：v0.8.4
- 当前阶段：第四阶段进行中，已开始打通 `/plan` 与 `/ai` 的本地模拟问答联动
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

已完成 `/ai` 本地模拟问答 MVP，并持续优化交互、回答结构和视觉表现。当前仍不接真实 AI API、不接数据库、不保存历史记录。

---

## 3. 当前架构说明

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
- `components/ai/AiChatPanel.tsx` 负责输入、加载、校验、快捷问题选中态和回答状态。
- `lib/ai/mock-answer.ts` 根据关键词和固定优先级生成模拟回答。
- `/plan` 已稳定，不应在第四阶段无关任务中改动其核心逻辑。
- `lib/plan-routes.ts` 是路线规划兼容导出入口，业务逻辑在 `lib/plan/*`。

---

## 4. 当前功能限制

- 当前 `/ai` 不接真实 AI。
- 当前不接数据库。
- 当前没有用户系统。
- 当前不保存问答历史记录。
- 当前不添加 `.env` 或后端接口。
- 当前回答只基于本地关键词模拟逻辑。
- 当前回答只适合作为初步信息整理，不构成签证、移民、录取、法律或就业承诺。
- 重要信息需要以学校、使领馆、入管局、移民局及官方政策为准。

---

## 5. 当前稳定性状态

- 第三阶段 `/plan` 已完成 v0.6.2 回归测试。
- v0.8.0 已新增 `/ai` MVP 页面。
- v0.8.1 已完成 `/ai` 体验和回答结构优化。
- v0.8.2 已完成 `/ai` 视觉精修。
- v0.8.3 已完成 `/ai` 产品化渐变视觉重构。
- v0.8.4 已新增 `/plan` 到 `/ai` 的联动入口。
- `/ai` 页面当前不影响 `/plan` 推荐规则和既有功能。
- 完成版本后应运行 `npm run build`、`npm run lint` 和 `npm run dev` 手动测试。

---

## 6. 版本记录

### v0.8.4

- 新增 `/plan` 到 `/ai` 的联动入口。
- 支持从路线规划结果带问题跳转到 `/ai`。
- `/ai` 支持读取 URL 参数并自动生成本地模拟回答。
- 保持本地模拟问答，不接真实 AI、不接数据库、不保存历史记录。
- 小幅精简回答卡片重复问题展示。
- 优化 /ai 主功能区输入卡片与回答卡片的渐变和视觉一致性。
- 开发工作流优化：完善 `AGENTS.md` 项目协作规则，统一 Cursor 开发边界与输出要求。

### v0.8.3

- 参考 Apple Card 官网风格重构 `/ai` 页面视觉。
- 将纯白工具面板改为柔和渐变产品视觉。
- 优化 Hero、输入区、回答区和说明模块。
- 继续统一 `/ai` 页面整体视觉，让下方功能区、输入区、回答区和说明区同步靠近 Apple 风格。
- 保持本地模拟问答，不接真实 AI、不接数据库、不保存历史记录。

### v0.8.2

- 优化 `/ai` 页面视觉表现，让整体更轻、更克制、更接近 Apple 官网风格。
- 降低 Hero、输入区和回答区的边框、阴影和信息噪音。
- 优化回答区层级，将建议、风险和下一步行动改为更轻的阅读结构。
- 将 disclaimer 从重黑色条改为轻量说明样式。
- 继续保持本地模拟问答，不接真实 AI。

### v0.8.1

- 优化 loading 状态。
- 优化快捷问题交互和选中态。
- 优化空输入校验。
- 优化本地模拟回答结构。

### v0.8.0

- 新增 `/ai` AI 问答 MVP 页面。
- 新增 `components/ai/*` 和 `lib/ai/*`。
- 新增顶部导航 `AI 问答` 入口。
- 当前不接真实 AI、不接数据库、不保存历史记录。

### v0.7.0

- 新增项目状态文档。
- 标记第三阶段 `/plan` 出国路线规划页面完成。
- 明确第四阶段方向为 AI 问答页面 `/ai`。

---

## 7. 下一阶段建议

后续可继续增强 `/ai`：

- 接入真实 AI API，但必须保留安全边界和免责声明。
- 增加问答记录，但需要先设计用户系统或本地存储边界。
- 将 `/plan` 结果作为上下文辅助 AI 解释，但不能直接承诺结果。
- 后续再考虑用户系统、保存记录、真实经验社区和付费功能。

---

## 8. 给新聊天 / Cursor 的使用说明

如果以后开启新聊天，请先让 AI 阅读本文件和项目根目录 `AGENTS.md`，再继续开发。

后续开发前应先确认当前版本、目标版本和本次任务范围。每次完成版本后都要：

- `npm run build`
- `npm run lint`
- `npm run dev` 手动测试

Git 操作需用户明确指令后再执行，见 `AGENTS.md`。

---

## 9. 开发工具计划

### 已采用

- Cursor + ChatGPT 协作开发
- AGENTS.md 项目规则约束
- Context7 MCP：用于在需要时查询 Next.js、React、Tailwind、OpenAI 等官方文档，减少框架 API 用法误判。
- Context7 使用边界：仅在涉及框架/API/第三方库用法不确定时使用；普通样式、文案和页面微调不需要调用，避免增加上下文噪音。

### 后续计划

- Serena MCP：等项目组件和业务逻辑继续变多后再安装，用于更强的语义代码检索和编辑。
