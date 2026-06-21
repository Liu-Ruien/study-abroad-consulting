# 项目状态文档 v0.7.0

本文档用于在开启新 ChatGPT 聊天、Cursor、Codex 或其他 AI 工具会话时，快速理解当前项目状态和后续开发边界。

---

## 1. 项目基本信息

- 项目名称：出国咨询信息整理平台 / overseas-consulting / study-abroad-consulting
- 项目定位：面向中国大陆用户的出国路线规划与真实经验整理平台
- 当前版本：v0.7.0
- 当前阶段：第三阶段已完成，准备进入第四阶段
- 在线地址：https://study-abroad-consulting.vercel.app/
- 技术栈：Next.js 16、React、TypeScript、Tailwind CSS、Git / GitHub、Vercel

---

## 2. 当前已完成阶段

### 第一阶段：内容网站 MVP

已完成首页、文章列表页、文章详情页、分类文章页、基础文章数据和内容结构。

### 第二阶段：产品化优化与部署

已完成产品化 UI 优化、搜索和筛选、GitHub 上传、Vercel 部署、README 项目包装和产品蓝图文档。

### 第三阶段：/plan 出国路线规划页面

已完成 `/plan` 路线规划功能的主要开发、UI 优化、推荐规则升级、组件拆分、`lib/plan` 架构整理、回归测试与稳定性修复。

---

## 3. 第三阶段已完成内容

- `/plan` 页面：提供出国路线规划入口和结果工作台。
- 表单填写：支持年龄、学历、专业、预算、语言、国家偏好、目标国家、打工意愿、长期规划和低预算路线接受度。
- 折叠分组：基础信息默认展开，路线偏好和长期规划可展开 / 折叠。
- 目标国家偏好：目标国家选项会根据国家 / 地区偏好联动筛选。
- 本地路线推荐规则：基于用户输入用本地规则生成推荐路线，不接真实 AI。
- 推荐路线结果：生成最多 3 条路线建议，支持推荐 1 / 2 / 3 切换。
- 适合指数：每条路线显示 `matchScore`，用于表示当前条件匹配程度。
- 风险等级：每条路线显示低 / 中 / 高风险提示。
- 推荐理由：每条路线展示匹配原因、风险提醒和下一步建议。
- 整体分析弹窗：汇总用户画像、推荐判断和路线对比。
- 路线详情弹窗：展示单条路线的概述、适合人群、优势、风险、下一步建议和推荐阅读。
- 复制摘要：可复制当前路线规划摘要，带 toast 提示。
- 打印 / 保存 PDF：可通过浏览器打印生成 PDF 报告。
- 重置确认弹窗：重置前二次确认，避免误触清空表单和结果。
- 移动端适配：表单、下拉框、结果卡片、弹窗和操作按钮已做响应式处理。
- Apple 风格 UI 优化：页面使用浅色背景、毛玻璃、柔和阴影、圆角卡片和简洁按钮层级。
- `/plan` 组件拆分：表单、选择器、摘要项、弹窗和 PDF 报告已拆到 `components/plan/`。
- `lib/plan` 架构整理：类型、选项、路线数据、标签、评分规则、推荐引擎和分析文案已拆分到 `lib/plan/`。

---

## 4. 当前架构说明

关键目录：

```text
app/
  plan/
    page.tsx

components/
  plan/
    SelectField.tsx
    FormSection.tsx
    SummaryItem.tsx
    PlanForm.tsx
    PlanResultWorkbench.tsx
    PlanInsightModal.tsx
    PlanRouteDetailModal.tsx
    PlanPdfReport.tsx
    ConfirmResetModal.tsx

lib/
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

- `lib/plan-routes.ts` 是兼容导出入口，保留旧导入路径。
- 新业务逻辑已迁移到 `lib/plan/*`。
- `app/plan/page.tsx` 主要负责页面状态、表单快照、弹窗状态、滚动行为和组件组合。
- `PlanResultWorkbench.tsx` 是路线结果工作台的目标拆分组件名；当前仓库还没有单独文件，结果工作台仍在 `app/plan/page.tsx` 中组合渲染。

---

## 5. 当前功能限制

- 当前不接真实 AI。
- 当前不接数据库。
- 当前没有用户系统。
- 当前不能保存用户历史记录。
- 当前推荐结果基于本地规则生成。
- 当前结果只适合作为初步参考，不构成签证、移民、法律、就业承诺。

---

## 6. 当前稳定性状态

- `npm run build` 已通过。
- `npm run lint` 已通过。
- 当前已完成 v0.6.2 回归测试。
- PDF 打印空白问题已修复。
- 移动端滚动问题已修复。
- 推荐排序和目标国家优先逻辑已修复。
- 重置确认弹窗已添加。

---

## 7. 下一阶段建议

第四阶段建议方向：Phase 4：AI 问答页面 `/ai`。

建议先做 AI 问答 MVP：

- 提供基础出国问题输入框和回答展示区。
- AI 仅提供解释和辅助建议，不直接承诺签证、移民、录取或就业结果。
- AI 回答应强调信息时效性和官方渠道核实。
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
