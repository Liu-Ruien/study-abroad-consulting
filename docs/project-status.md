# 项目状态文档

本文档用于在开启新 ChatGPT 聊天、Cursor、Codex 或其他 AI 工具会话时，快速理解当前项目状态和后续开发边界。

---

## 1. 项目基本信息

- 项目名称：出国咨询信息整理平台 / overseas-consulting / study-abroad-consulting
- 项目定位：面向日本 IT 求职的个人作品集项目（出国规划 / AI 应用场景演示）
- 当前版本：v0.17.0
- 当前阶段：第四阶段收尾，已完成作品集面试展示增强
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
  case-study/
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
  ui/
    card-system.ts
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
- v0.8.5 已为 `/ai` 新增复制回答功能。
- v0.8.6 已优化 `/ai` 移动端布局与首屏体验。
- v0.8.7 已为 `/ai` 新增重新开始功能。
- v0.17.0 已重构 README 为求职作品集首页，并增强 interview-guide 与 case-study 边界文案。
- v0.15.9 已完成 /case-study Apple 风格收口：Navbar mega menu、亮玻璃卡片与无 Footer 单屏流。
- v0.15.8 已收口 /case-study Presentation 导航与控制器：Footer 隐藏、Navbar hover 面板、Highlights 静态一屏化。
- v0.15.7 已收口 /case-study Presentation：首屏位置、滚动拦截、重复内容清理与系统字体栈。
- v0.15.6 已修复 /case-study 展示页核心交互：Hero 居中、按钮可读、圆角毛玻璃、完整切页与一屏架构。
- v0.15.5 已修复 /case-study 深色高级感、Footer 割裂、Hero 按钮与产品级切页体验。
- v0.15.4 已完成 /case-study 沉浸式深色产品叙事重构，并检查 /plan 编辑器 errors。
- v0.15.3 已放弃 /case-study 全页竖向 snap，改为 Apple 风格横向 Highlights Carousel。
- v0.15.2 已修复桌面端分屏滚动：前 6 屏受控 wheel 逐屏切换；移动端保持自然滚动。
- v0.15.1 已完成 /case-study 分屏滚动叙事（CSS Scroll Snap）；修复深色区块未占满视口问题。
- v0.15.0 已完成 /case-study Apple 产品级视觉叙事升级（Hero、深色 Feature、Architecture 精修、留白）。
- v0.14.0 已新增 /case-study 项目架构展示（Architecture 四层卡片 + 流程图）；README 增加 Architecture 章节。
- v0.13.1 已新增 docs/interview-guide.md 面试讲解稿（中日英介绍、Q&A、演示路线）；README 增加文档入口。
- v0.13.0 已完成 /case-study 面试官快速查看、技术决策、开发者职责说明；README 增加面试官路径。
- v0.12.4 已完成文章三语言化、全屏背景修复、文章详情页与分类页 i18n。
- v0.12.3 已完成全站页面文案语言同步、Plan 表单 tint 修复、首页/文章/关于背景统一。
- v0.12.2 已将语言切换重构为 Apple 风格下拉菜单（LanguageDropdown）。
- v0.12.1 已将语言切换升级为 Navbar 全站入口，localStorage 记住选择，Navbar / Footer 轻量同步。
- v0.12.0 已在 /case-study 增加中文 / 日本語 / English 本地语言切换，README 增加英文与日文概要。
- v0.11.1 已在 README 增加项目截图展示区域，强化 GitHub 仓库首页作品集效果。
- v0.11.0 已完成 README 作品集化升级，修正 GitHub 首页版本号。
- v0.10.3 已强化 ArticleCard tinted gradient，并修复 Navbar 滚动透底问题。
- v0.10.2 已完成全站视觉收口 QA，统一残留卡片、按钮、chip 与输入框风格。
- v0.10.1 已新增 /case-study 导航入口，并初步统一首页与内容页视觉风格。
- v0.10.0 已升级 `/case-study` 作品集案例页，强化求职展示定位。
- v0.9.2 已修复 /ai 全白卡片问题，恢复 Apple 风格柔和渐变与色彩层级。
- v0.9.1.1 已完成全站灰阶对比度修复，消除全白玻璃 UI。
- v0.9.1 已完成全站 Apple 级信息层级与设计系统统一。
- v0.9.0 已新增 `/case-study` 作品集页面。
- `/ai` 页面当前不影响 `/plan` 推荐规则和既有功能。
- 完成版本后应运行 `npm run build`、`npm run lint` 和 `npm run dev` 手动测试。

---

## 6. 版本记录

### v0.17.0

- README 重构为求职作品集展示首页
- 新增日本語概要与 English Summary
- 增加 For Interviewers / 面试官快速理解
- 增加 Recommended Review Flow、Core Features / Tech Stack 表格
- 强化 Current Boundaries 中英说明
- docs/interview-guide.md 新增 v0.17.0 面试追问准备（8 问，中 / 日 / 英）
- /case-study 边界与后续计划文案三语小幅增强
- 不修改业务逻辑和视觉系统

### v0.16.3

- 修复 mega menu 从导航移动到面板时提前消失
- 使用 120ms 延迟关闭提升 hover 容错
- 恢复 mega menu 打开时页面主体轻微 blur overlay（`z-40`，独立于 header）
- 保持语言按钮独立，不触发 mega menu
- 保持业务逻辑不变

### v0.16.2

- 重构 Navbar mega menu 为 Apple 风格无缝毛玻璃下拉
- 修复菜单内容被 page blur overlay 覆盖的问题
- 页面主体 blur 改为 `backdrop-blur-sm`，仅轻微失焦
- mega menu panel 使用 `z-[60]`，overlay 使用 `z-40`，LanguageDropdown 使用 `z-[70]` / `z-[80]`
- hover 区域仅包裹主导航链接与 mega menu panel，语言按钮独立
- 移动端不启用 hover mega menu
- 保持业务逻辑不变

### v0.16.1

- 修复 Navbar mega menu 内容不可见问题（blur overlay 遮挡 mega menu 内容）
- 调整 mega menu（z-[60]）与 blur overlay（z-40）层级
- 语言切换按钮独立于 mega menu hover 区域，LanguageDropdown 使用 z-[70]
- 移动端保持自然纵向阅读，不强制桌面端滚轮切页；presentation 类名仅在 md 及以上启用
- 保持业务逻辑不变

### v0.16.0

- /case-study 文案升级为面试官视角
- 强化项目背景、技术决策、个人职责、边界和后续计划
- docs/interview-guide.md 增加 v0.16.0 面试讲解重点（五问五答，中 / 日 / 英）
- README 增加「面试官快速理解」说明
- 不修改业务逻辑和视觉系统

### v0.15.10

- 修复 Navbar mega menu hover 区域，鼠标进入下拉菜单时不再消失
- 统一 case-study 深色玻璃卡片质感
- 为卡片增加细微顶部色彩光感
- 统一 Architecture Layer 与 Pipeline 节点样式
- 将用户可见的 i18n 文案改为多语言 / 多言語 / Multilingual
- 保持业务逻辑不变

### v0.15.9

- Navbar hover mega menu 改为 Apple 风格无缝下拉
- 菜单打开时页面内容轻微模糊
- /case-study 不再显示 Footer，减少页面滚动条干扰
- 提升 case-study 各 panel 卡片亮度与毛玻璃层次
- 删除 Highlights 内部重复分页控件
- 保持业务逻辑不变

### v0.15.8

- 调整 Presentation 底部控制器位置，避免半截隐藏
- /case-study 隐藏 Footer，减少页面额外滚动
- Navbar 新增 Apple 风格 hover 下拉面板，承载 Footer 链接
- 统一 Presentation panel 的深色渐变、网格与毛玻璃质感
- 删除 Highlights 内部重复分页控件
- Highlights 改为 Architecture 风格一屏卡片布局
- 保持业务逻辑不变

### v0.15.7

- 修复 /case-study 第一屏 Hero 偏下问题
- 修复 Presentation 底部控制器显示不完整
- 修复 Presentation 切页时页面纵向滚动干扰
- 清理 Presentation 后方重复旧内容
- 优化全站中 / 日 / 英字体栈，接近 Apple 系统字体观感
- 保持业务逻辑不变

### v0.15.6

- 修复 Hero 初始位置不居中
- 修复 Hero 主按钮文字不可见
- 恢复 Hero 圆角毛玻璃卡片
- 重做 Case Study Presentation 切页逻辑
- 将项目背景、核心功能、技术决策、架构等主要模块纳入切页
- Architecture 改为一屏可读布局
- 统一深色渐变与毛玻璃背景
- 保持业务逻辑不变

### v0.15.5

- 修复 /case-study 深色页面纯黑质感问题
- 增加蓝紫 radial gradient 与毛玻璃深色卡片层次
- 修复 Hero 主按钮文字不可见问题
- Footer 增加 dark variant，解决深色页底部割裂
- 新增 Case Study Presentation Stage，实现桌面端受控切页体验
- 保持 /plan、/ai、/articles 业务逻辑不变

### v0.15.4

- /case-study 升级为沉浸式深色产品叙事页
- 统一 Hero、Highlights、Architecture 和后续 section 的深色视觉
- 精修 Apple 风格横向 Highlights Carousel（scale / opacity / transform）
- 清理旧 scroll snap 方案残留
- 检查 app/plan/page.tsx 编辑器 errors，并用最小类型注解修复隐式 any
- 不改变业务逻辑

### v0.15.3

- 放弃 /case-study 全页竖向 scroll snap
- 新增 Apple 风格横向 Highlights Carousel
- 支持滚轮横向切换和底部分页控制
- 修复深色区块视觉割裂与上一页残留问题
- 页面恢复正常纵向滚动，不影响后续长内容阅读
- 保持业务逻辑不变

### v0.15.2

- 修复 v0.15.1 scroll snap 体验不明显的问题
- /case-study 桌面端（≥768px）前 6 屏改为受控分屏滚动（wheel + 方向键）
- 滚轮一次切换一屏，800ms 滚动锁，smooth scrollIntoView
- 第 7 屏起恢复普通长页阅读；`prefers-reduced-motion` 不拦截 wheel
- 移动端保留 CSS snap proximity + 自然滚动
- 不改变业务逻辑

### v0.15.1

- /case-study 增加分屏滚动叙事体验（CSS Scroll Snap）
- Hero、深色 Feature、面试官重点、背景+功能、技术决策、Architecture 六屏 snap
- 修复深色区块未占满屏幕导致的视觉割裂（min-h calc(100svh - nav)）
- `prefers-reduced-motion` 时关闭 smooth scroll
- 第 7 屏起恢复普通长页阅读；业务逻辑不变

### v0.15.0

- /case-study 升级为 Apple 产品级视觉叙事
- Hero 视觉增强：更大首屏、更短副标题、高级径向渐变、弱边界浮层感
- 新增深色 Feature 区块（规则规划 / AI MVP / 多语言作品集）
- Architecture 区块精修：分层卡片、更宽流程节点、更轻连接线
- 优化 section 节奏与留白（间距增大、文案 line-clamp 减密度）
- 新增 case-study 专用视觉 token（`lib/ui/card-system.ts`）
- 不改变 /plan、/ai、/articles 业务逻辑

### v0.14.0

- /case-study 新增项目架构展示模块（Architecture Showcase）
- 四层架构卡片：Page / Component / Business / Data Layer
- 新增纯前端架构流程图（用户 → 各层，Apple 风格圆角节点）
- 支持中文 / 日本語 / English（`lib/case-study-i18n.ts`）
- README 新增 Architecture 章节说明各层职责
- 不改变 /plan、/ai、/articles 业务逻辑

### v0.13.1

- 新增 `docs/interview-guide.md` 面试讲解文档
- 补充中文 / 日本語 / English 项目介绍（1 分钟、3 分钟版）
- 补充技术栈说明、技术决策、架构讲解和面试 Q&A（中 / 日 / 英）
- 补充面试演示路线与自我提醒
- README 增加面试讲解文档入口
- 不改变网站业务逻辑

### v0.13.0

- /case-study 增加面试官快速查看区域（4 张重点卡片）
- 增加关键技术决策说明（6 条开发者视角取舍）
- 增加「我在项目中完成了什么」开发者职责说明
- 增强当前边界与后续路线表述（登录/付费/承诺范围更清晰）
- README 增加「面试官快速查看」与「技术决策摘要」
- 不改变 /plan 推荐算法、/ai mock 逻辑与文章数据结构

### v0.12.4

- 修复 `/`、`/articles`、`/about`、`/articles/[slug]` 背景非全屏问题（layout body/main 统一 `pageBackground`）
- 文章数据三语言化：`lib/articles.ts` 标题、摘要、正文 zh / ja / en
- 新增 `lib/article-localization.ts`（`getLocalizedArticle`、`formatReadTime`）
- 文章卡片、首页推荐、分类页、详情页支持语言切换
- 统一文章列表、分类页、详情页 Apple 风格 tint 卡片视觉
- 不改变推荐算法、AI 问答逻辑与 case-study 业务内容

### v0.12.3

- 全站页面文案语言同步（首页、文章、关于、AI、Plan）
- 新增 `lib/i18n/content.ts` 统一维护 zh / ja / en 页面文案
- 修复 `/plan` 左侧表单 tint 视觉回退（FormSection、planFormShell）
- 统一 `/`、`/articles`、`/about` 使用 `pageBackground`
- 不改变推荐算法、AI 问答逻辑与 case-study 业务内容

### v0.12.2

- 语言切换重构为 Apple 风格下拉菜单（LanguageDropdown）
- Navbar 桌面端：🌐 当前语言 ▼；移动端菜单内：语言 ▼ 展开
- 当前语言勾选、毛玻璃面板、点击外部关闭
- 删除旧三按钮 LanguageSwitcher，不改变业务逻辑

### v0.12.1

- 语言切换升级为顶部导航级入口
- /case-study 改为读取全站语言状态
- localStorage 记住语言选择
- Navbar / Footer 轻量多语言同步
- 不引入 i18n 框架，不改变业务逻辑

### v0.12.0

- /case-study 新增中文 / 日本語 / English 本地语言切换
- README 增加 English Summary 和 日本語概要
- 首页增加多语言展示提示
- 不引入 i18n 框架，不改变业务逻辑
- 继续保持作品集和日本 IT 求职展示定位

### v0.11.1

- README 增加项目截图展示区域
- 新增首页、路线规划、AI 问答、项目案例页截图引用或截图资源
- 强化 GitHub 仓库首页的作品集展示效果
- 不改变网站业务逻辑

### v0.11.0

- README 升级为作品集展示文档，适合 GitHub 首页与日本 IT 求职展示
- 修正 README 版本号（原 v0.8.3 → v0.11.0）
- 补充项目背景、核心功能、技术栈、工程亮点、AI MVP 边界与本地运行说明
- 移除商业化与过时阶段描述，不改变网站业务逻辑

### v0.10.3

- 强化 `ArticleCard` 与首页推荐阅读区：按分类应用明显但克制的 tinted gradient
- `/articles` 列表统一使用 `ArticleCard`，解决卡片仍接近纯白的问题
- 增强 Navbar：`bg-white/95` + `backdrop-blur-xl` + `z-50`，修复滚动时内容透底
- 保持 `/plan`、`/ai` 业务逻辑不变

### v0.10.2

- 完成全站视觉收口 QA，统一残留卡片、按钮、chip、输入框与 Footer 风格
- `/plan` 仅做轻量视觉同步（表单、弹窗、结果卡片 token），不改业务逻辑
- 扩展 `lib/ui/card-system.ts` 导航、链接、弹窗、进度条等共用 token
- 保持 `/ai`、`/case-study` 视觉效果与业务逻辑不变

### v0.10.1

- 顶部导航与 Footer 新增「项目案例」入口，链接 `/case-study`
- 首页 Hero 视觉升级，新增「查看项目案例」CTA，文案调整为作品集定位
- 初步统一首页、文章列表/详情、分类页、关于页的视觉风格（复用 `card-system` token）
- 保持 `/ai`、`/case-study`、`/plan` 业务逻辑不变

### v0.10.0

- 升级 `/case-study` 作品集案例页，面向日本 IT 求职展示场景
- 补充项目背景、核心功能、技术栈、工程亮点、架构说明、能力映射、当前边界与后续计划
- 强化个人作品集定位，不改变 `/plan` 与 `/ai` 业务逻辑
- 小幅扩展 `lib/ui/card-system.ts` 中 case-study 专用模块 token

### v0.9.2

- 修复 `/ai` 页面全白卡片问题，恢复 Apple 风格柔和渐变和色彩层级
- 扩展 `lib/ui/card-system.ts`：Hero / 输入 / 回答 / 三卡分色 tint token
- `/ai` 文案轻微调整为作品集方向，强调本地模拟 MVP 与工程能力展示
- 不改变本地模拟问答逻辑，不接真实 AI、不接数据库

### v0.9.1.1

- 全局背景改为 `#f5f6f8` 灰阶，消除整页发白
- 卡片系统从 `white/60~80 + backdrop-blur` 改为实色 `bg-white` + 分层 border/shadow
- 三卡区域（建议 / 风险 / 下一步）主卡 `scale-[1.03]` + `border-black/20`，次级卡 `opacity-80`
- 按钮、输入框增强边界对比度，不改结构与业务逻辑

### v0.9.1

- 新增 `lib/ui/card-system.ts` 统一三层卡片系统（Base / Elevated / Floating）
- 全站卡片、按钮、输入框统一设计 token，不改业务逻辑与组件拆分
- `/ai` 回答区改为 Apple 文档式阅读层级（semibold 标题、relaxed 正文、段落间距）
- 三卡区域（建议 / 风险 / 下一步）中间「风险」卡视觉权重提升
- `/case-study` 同步 Floating Card 与 Apple tag 样式
- 减少纯白 UI，强化阴影分层与 glass 质感

### v0.9.0

- 新增 Case Study 作品集页面
- 将项目从功能型升级为作品集展示型结构
- 强化 Apple 风格 UI 表达
- 提升面试展示能力

### v0.8.7

- 为 `/ai` 页面新增重新开始功能
- 支持清空问题、回答、提示状态，并从 `/ai?q=...` 回到 `/ai`
- 保持本地模拟问答，不接真实 AI、不接数据库、不保存历史记录

### v0.8.6

- 优化 `/ai` 页面移动端布局和首屏体验
- 调整 Hero、功能区、回答卡片和复制反馈在小屏幕下的表现
- 保持本地模拟问答，不接真实 AI、不接数据库、不保存历史记录
- 优化 `/ai` 左侧输入卡片尺寸和输入框舒适度

### v0.8.5

- 为 `/ai` 页面新增复制回答功能
- 支持复制标题、结论、建议、风险、下一步和边界提示
- 保持本地模拟问答，不接真实 AI、不接数据库、不保存历史记录
- 将复制成功反馈从按钮文案变化改为独立 toast 提示，避免挤压回答标题

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
