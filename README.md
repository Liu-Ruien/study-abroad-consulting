# 出国咨询信息整理平台

这是一个个人开发的出国信息整理与路线规划项目，用于展示内容组织、路线规划、本地 AI 问答 MVP、组件化前端工程和作品集级 UI 设计能力。

**当前版本：** v0.11.0  
**当前定位：** 个人作品集项目 / 日本 IT 求职展示项目

---

## 在线访问

[https://study-abroad-consulting.vercel.app](https://study-abroad-consulting.vercel.app)

---

## 项目背景

很多准备出国的用户会同时面对国家选择、预算、语言、签证、学校、就业方向等问题，信息分散且容易焦虑。本项目尝试把这些信息拆成结构化页面、路线规划流程和本地问答 MVP，帮助用户先把问题问清楚，再决定下一步。

---

## 核心功能

- **内容文章系统**：文章列表、分类、详情、搜索筛选
- **/plan 路线规划**：基于预算、语言、目标、风险的本地规则推荐
- **/ai 本地问答 MVP**：将出国问题拆成目标、预算、语言、风险和下一步
- **/case-study 项目案例页**：展示项目背景、技术栈、架构、工程亮点和后续计划
- **响应式 UI**：适配桌面端和移动端
- **Vercel 在线部署**

---

## 技术栈

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Git / GitHub
- Vercel

---

## 项目结构

```text
app/
  page.tsx
  articles/
  categories/
  plan/
  ai/
  case-study/

components/
  ai/
  plan/
  ArticleCard.tsx
  Navbar.tsx
  Footer.tsx

lib/
  ai/
  plan/
  ui/

docs/
  project-status.md
```

---

## 工程亮点

- **页面与业务逻辑分离**：页面负责组合与展示，业务规则下沉到 `lib/*`
- **/plan 规则引擎抽离**：推荐、评分、分析文案位于 `lib/plan`（如 `route-engine`、`scoring-engine`、`insight-engine`）
- **/ai 边界清晰**：当前为本地 mock，不伪装真实 AI，便于展示产品原型与信息架构
- **统一设计系统**：`lib/ui/card-system.ts` 维护卡片、按钮、标签与页面视觉 token
- **逐步迭代**：从内容网站 MVP → 路线规划 → AI 问答 → 作品集展示页
- **版本管理与部署**：GitHub 管理代码，Vercel 持续部署线上环境

---

## AI MVP 边界

当前 `/ai` 页面**不接真实 AI API**，**不保存历史记录**，**不提供**签证、移民、录取、就业承诺。它主要用于展示 AI 产品原型设计、信息拆解和交互流程能力。

---

## 本地运行

```bash
npm install
npm run dev
npm run build
npm run lint
```

开发环境默认访问 [http://localhost:3000](http://localhost:3000)。若 3000 端口被占用，Next.js 可能会自动使用 3001。

---

## 页面入口

| 页面 | 路径 |
|------|------|
| 首页 | `/` |
| 全部文章 | `/articles` |
| 路线规划 | `/plan` |
| AI 问答 | `/ai` |
| 项目案例 | `/case-study` |
| 关于 | `/about` |

---

## 后续计划

- 补充更多真实案例内容
- 增强 `/plan` 与 `/ai` 的上下文联动
- 接入真实 AI API 前先设计安全边界
- 增加更完整的错误状态和测试
- 后续补充英文或日文版本，用于日本求职展示

---

## 项目声明

本项目为**个人作品集项目**，内容仅作信息整理和功能展示，不构成签证、移民、录取、就业或法律建议。重要信息应以学校、使领馆、入管局和官方政策为准。

---

## 相关文档

- 项目状态与版本记录：[docs/project-status.md](docs/project-status.md)
