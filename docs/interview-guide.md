# 面试讲解稿 · Interview Guide

> 个人作品集项目「出国咨询信息整理平台」  
> 用途：日本 IT 求职面试前复习、口述练习、多语言自我介绍  
> 在线地址：https://study-abroad-consulting.vercel.app

---

## 1. 项目一句话介绍

### 中文

这是一个个人开发的出国信息整理与路线规划作品集项目，围绕内容文章、路线规划、本地 AI 问答 MVP 和项目案例展示，体现前端工程、产品拆解、规则逻辑、多语言和 UI 设计能力。

### 日本語

留学・海外生活に関する情報整理、ルート計画、ローカル AI 問答 MVP を含む個人ポートフォリオプロジェクトです。フロントエンド実装、プロダクト設計、ルールベースのロジック、多言語対応、UI 設計力を示すことを目的としています。

### English

This is a personal portfolio project for organizing study-abroad information, route planning, and a local AI Q&A MVP. It demonstrates frontend engineering, product thinking, rule-based logic, multilingual support, and UI design ability.

---

## 2. 1 分钟项目介绍

### 中文版

我做过一个个人作品集项目，叫「出国咨询信息整理平台」。  
很多人准备出国时会同时纠结国家、预算、语言、签证这些问题，信息很散。我想把这些内容整理成能直接用的页面和流程。

网站主要有四块：文章系统、`/plan` 路线规划、`/ai` 本地问答 MVP，还有 `/case-study` 项目说明页。  
技术栈是 Next.js、React、TypeScript 和 Tailwind，代码放在 GitHub，用 Vercel 部署。

需要特别说明的是：这是作品集，不是商业产品。`/plan` 用的是本地规则引擎，不是 AI 预测；`/ai` 目前是 mock，没有接真实 API，也没有数据库和登录。  
我把它做成中文、日文、英文三语言，主要是为了方便在日本 IT 面试时展示。

---

### 日本語版

個人で「留学・海外生活 情報整理プラットフォーム」というポートフォリオを作りました。  
留学を考える人は、国選び、予算、語学、ビザなどを同時に整理しなければならず、情報が分散しがちです。それをページとフローにまとめるのが目的です。

主要機能は、記事システム、`/plan` のルート計画、`/ai` のローカル問答 MVP、`/case-study` のプロジェクト説明です。  
Next.js、React、TypeScript、Tailwind で実装し、GitHub と Vercel で公開しています。

商用サービスではなく、`/plan` はローカルルール、`/ai` は mock で、DB やログインはありません。  
中文 / 日本語 / English に対応し、日本 IT 就職向けの説明を想定しています。

---

### English Version

I built a personal portfolio called a study-abroad information platform.  
People preparing to go abroad often juggle country choice, budget, language, and visa questions at once. I organized that into structured pages and flows.

The site has four parts: articles, `/plan` route planning, `/ai` local Q&A MVP, and `/case-study` for project explanation.  
It uses Next.js, React, TypeScript, and Tailwind, hosted on GitHub and Vercel.

This is a portfolio, not a commercial product. `/plan` uses local rules, not AI predictions. `/ai` is mock-only—no real API, database, or login.  
It supports Chinese, Japanese, and English for Japan IT job interviews.

---

## 3. 3 分钟项目介绍

### 中文版

**1. 项目背景**  
准备出国的人常常信息过载：国家怎么选、预算够不够、语言要不要先学、签证怎么准备。网上内容很多，但分散、难对照。  
我做这个项目，一方面是整理这些信息，另一方面是向面试官展示：我能从需求出发，把问题拆成页面和产品流程。

**2. 核心功能**  
- 首页 + 文章：分类、搜索、详情，支持三语言内容  
- `/plan`：输入年龄、学历、预算、语言、目标等，本地规则生成路线建议和匹配分数  
- `/ai`：输入问题，本地 mock 拆成目标、预算、语言、风险、下一步建议  
- `/case-study`：项目背景、技术栈、架构、技术决策、面试重点

**3. 技术实现**  
Next.js App Router 做页面路由；React 组件化 UI；TypeScript 做类型约束；业务逻辑放在 `lib/plan`、`lib/ai`、`lib/i18n`；视觉统一用 `lib/ui/card-system.ts`。

**4. 技术取舍**  
- 不接数据库：当前无用户系统，静态数据 + 本地规则足够验证流程  
- `/ai` 保持 mock：先固定回答结构，避免成本、合规和不可控回答  
- 不做登录付费：聚焦作品集闭环，不分散在安全与支付上  
- 多语言：Navbar 切换 + localStorage 记住，服务日本求职展示

**5. 当前边界和后续计划**  
当前不提供签证/录取/就业承诺；不接真实 AI 和数据库。  
后续可以：接 AI 前设计安全边界、补测试、增加案例内容、整理成更完整的面试材料。

---

### 日本語版

**1. プロジェクト背景**  
留学準備では、国、予算、語学、ビザなどを同時に整理する必要があり、情報が散らばりやすいです。  
本プロジェクトは情報整理と、要件からページ・フローに落とすプロダクト思考の両方を示すために作りました。

**2. 主要機能**  
- ホーム + 記事：カテゴリ、検索、詳細、三言語コンテンツ  
- `/plan`：年齢、学歴、予算、語学、目標などからローカルルールでルート提案  
- `/ai`：質問を mock で目標・予算・語学・リスク・次の一手に分解  
- `/case-study`：背景、技術スタック、構成、技術判断、面接向け要点

**3. 技術実装**  
Next.js App Router、React コンポーネント、TypeScript、ロジックは `lib/plan` / `lib/ai` / `lib/i18n`、UI token は `lib/ui/card-system.ts`。

**4. 技術判断**  
DB なし（ユーザー機能不要）、AI は mock（構造と UX 優先）、ログイン・課金なし（ポートフォリオ集中）、多言語（日本就職向け）。

**5. 制約と今後**  
ビザ・合格・就業の保証はなし。本番 AI・DB 未接続。  
今後は安全境界、テスト、コンテンツ追加、面接資料の整理が可能です。

---

### English Version

**1. Project background**  
Study-abroad prep involves country, budget, language, and visa questions at once. Information online is scattered.  
I built this to organize content and show I can break requirements into pages and product flows.

**2. Core features**  
- Home + articles: categories, search, detail, trilingual content  
- `/plan`: local rules from age, education, budget, language, goals → route suggestions and scores  
- `/ai`: mock breaks questions into goals, budget, language, risk, next steps  
- `/case-study`: background, stack, architecture, decisions, interview focus

**3. Technical implementation**  
Next.js App Router, React components, TypeScript, logic in `lib/plan` / `lib/ai` / `lib/i18n`, UI tokens in `lib/ui/card-system.ts`.

**4. Technical trade-offs**  
No database (no user system yet), mock AI (structure and UX first), no login/billing (portfolio focus), multilingual (Japan job demos).

**5. Boundaries and next steps**  
No visa/admission/employment guarantees; no real AI or DB.  
Next: safety boundaries before AI, tests, more cases, interview materials.

---

## 4. 技术栈说明

| 技术 | 用它做了什么 | 在项目中的体现 |
|------|-------------|----------------|
| **Next.js 16** | 页面路由、布局、静态/动态渲染 | `app/` 下各路由：`/`、`/articles`、`/plan`、`/ai`、`/case-study`；`layout.tsx` 全站布局 |
| **React** | 组件化 UI、表单状态、客户端交互 | `components/` 下 ArticleCard、Plan 表单、AiChatPanel、CaseStudyContent 等 |
| **TypeScript** | 类型约束、数据结构定义 | `lib/plan/types.ts`、`lib/ai/types.ts`、`lib/articles.ts` 文章与规则类型 |
| **Tailwind CSS** | 响应式样式、设计 token 应用 | 全站样式；`lib/ui/card-system.ts` 导出 class token |
| **Git / GitHub** | 版本管理、协作记录、作品集展示 | 代码仓库、commit 历史、README 与 docs |
| **Vercel** | 在线部署、预览环境 | study-abroad-consulting.vercel.app 持续部署 |

---

## 5. 核心功能讲解

### 首页与文章系统

- **做什么**：整理出国相关文章，提供分类浏览、搜索筛选、详情阅读  
- **实现**：`lib/articles.ts` 存文章数据（三语言 title / excerpt / content）；`ArticleCard`、`ArticleSearch` 展示与过滤；`lib/article-localization.ts` 做本地化  
- **面试怎么说**：「这是内容入口，展示信息架构和多语言内容组织能力，不是 CMS 后台」

### /plan 路线规划

- **做什么**：根据用户输入（预算、语言、目标国家、风险偏好等）推荐出国路线，给出匹配分数和理由  
- **实现**：`lib/plan/route-engine.ts`、`scoring-engine.ts`、`insight-engine.ts` 本地规则；`app/plan/page.tsx` + `components/plan/*` 表单与结果展示  
- **强调**：这是**规则驱动的信息整理工具**，不是 AI 预测，也不是官方结论或录取保证

### /ai 本地问答 MVP

- **做什么**：用户输入出国相关问题，系统拆成结构化回答（目标、预算、语言、风险、建议）  
- **实现**：`lib/ai/mock-answer.ts` 关键词匹配 + 固定模板；`components/ai/AiChatPanel.tsx` 等负责交互  
- **强调**：**不接真实 AI API**，目的是展示 AI 产品原型、信息拆解能力和边界意识

### /case-study 项目案例页

- **做什么**：面向面试官的项目说明书——背景、功能、技术栈、架构、工程亮点、技术决策、职责范围  
- **实现**：`lib/case-study-i18n.ts` + `components/case-study/CaseStudyContent.tsx`  
- **强调**：这是**求职展示页**，帮助面试官 3–5 分钟理解项目全貌

### 多语言支持

- **做什么**：Navbar 切换中文 / 日本語 / English；页面 UI、文章、Case Study 内容同步切换  
- **实现**：`LanguageProvider` + localStorage；`lib/i18n/ui-strings.ts`、`content.ts`；文章 `getLocalizedArticle()`  
- **强调**：优先服务**日本 IT 求职展示**，降低面试官理解成本

---

## 6. 重点技术决策说明

### 为什么不接真实 AI API？

**面试回答要点：**

- 当前目标是作品集 MVP，不是生产级 AI 产品  
- 需要先验证：用户怎么提问、回答怎么结构化、免责声明怎么放  
- 真实 API 带来：调用成本、密钥管理、提示词注入、错误/幻觉回答的责任问题  
- 如果后续接入，我会先做：免责声明、输入过滤、日志、错误降级、人工复核边界

---

### 为什么不接数据库？

**面试回答要点：**

- 当前没有用户账号、没有历史记录持久化需求  
- 文章和规则逻辑可以先放在 TypeScript 文件里，迭代更快  
- 降低后端复杂度，把精力放在前端工程和产品拆解展示上  
- 以后如果需要，可以接 Supabase、PostgreSQL 或 MySQL，数据结构已经按模块分开，迁移成本可控

---

### 为什么不做登录和付费？

**面试回答要点：**

- 项目定位是**个人求职作品集**，不是商业化 SaaS  
- 登录涉及密码安全、Session、隐私合规；付费涉及支付、退款、客服  
- 这些会分散精力，且与当前「本地演示、无后端」架构不一致  
- 面试时我更想展示：功能闭环、代码结构、边界意识

---

### 为什么使用本地规则引擎？

**面试回答要点：**

- 路线规划需要**可解释**：为什么推荐这条路、分数怎么来的  
- 规则引擎可以清楚展示：输入 → 匹配 → 评分 → 推荐理由  
- 比黑盒 AI 更适合面试讲解，也符合「信息整理工具」的定位  
- 以后 AI 可以放在「解释层」或「问答层」，但不替代核心规则判断

---

### 为什么做多语言？

**面试回答要点：**

- 我的目标是在日本找 IT 相关工作  
- 面试官可能不懂中文，Case Study 和核心页面需要日文/英文  
- 多语言也体现：状态管理（LanguageProvider）、文案抽离（lib/i18n）、组件复用  
- 不是为运营全球化，而是为**作品集展示**服务

---

## 7. 项目架构讲解

```text
app/                    # 页面入口（Next.js App Router）
├── page.tsx            # 首页
├── articles/           # 文章列表与详情
├── categories/         # 分类页
├── plan/               # 路线规划
├── ai/                 # AI 问答 MVP
├── case-study/         # 项目案例页
├── about/              # 关于
└── layout.tsx          # 全站布局（Navbar、Footer、背景）

components/             # UI 组件
├── ai/                 # AI 问答相关
├── plan/               # 路线规划表单、弹窗、PDF
├── articles/           # 文章页内容
├── case-study/         # Case Study 页面
├── home/               # 首页内容
├── Navbar.tsx          # 导航 + 语言切换
└── Footer.tsx

lib/                    # 业务逻辑与数据
├── plan/               # route-engine、scoring-engine、insight-engine
├── ai/                 # mock-answer、types
├── i18n/               # 多语言文案、Language 类型
├── ui/                 # card-system 设计 token
├── articles.ts         # 文章数据
└── article-localization.ts

docs/                   # 文档
├── project-status.md   # 项目状态与版本记录
└── interview-guide.md  # 本面试讲解稿
```

**讲解顺序建议：** 先讲 `app/` 路由对应用户路径 → 再讲 `components/` 负责展示 → 最后讲 `lib/` 承载逻辑，页面尽量薄。

---

## 8. 面试官可能追问的问题与回答

### Q1. 这个项目你为什么做？

**A：** 一方面我自己对出国规划类信息有整理需求；另一方面我在准备日本 IT 求职，需要一个能展示前端、产品拆解和边界意识的作品集。所以做成了「内容 + 规划 + AI MVP + 案例页」的组合，而不是单一静态博客。

---

### Q2. 这个项目和普通静态网站有什么区别？

**A：** 不只是展示 HTML 页面。`/plan` 有输入、规则计算、评分和结果展示；`/ai` 有问题拆解和结构化回答流程；多语言是运行时切换，不是三套独立站点。业务逻辑在 `lib/` 里，页面主要负责组合。

---

### Q3. /plan 的推荐逻辑是怎么实现的？

**A：** 用户在表单里填预算、语言、目标国家等，提交后由 `lib/plan/route-engine.ts` 等模块做匹配和打分。规则是 TypeScript 写的，可以输出推荐理由。没有机器学习，重点是可解释和可演示。

---

### Q4. /ai 为什么不接真实 AI？

**A：** 当前阶段是 MVP。真实 API 要处理密钥、成本、回答质量和法律责任。我先用 mock 固定回答结构，证明我懂 AI 产品的交互和信息架构。接 API 是下一步，会先设计边界。

---

### Q5. 如果以后接真实 AI，你会怎么设计？

**A：** 我会加：明确的免责声明、输入长度和敏感词过滤、API 密钥放服务端、超时和错误降级、不保存用户隐私数据（或征得同意后再存）、回答模板仍保持结构化，方便用户核对而不是盲信。

---

### Q6. 为什么不用数据库？

**A：** 现在没有用户系统和历史记录需求，文章和规则用本地文件维护足够。这样部署简单、迭代快，适合作品集。如果要做用户收藏或问答历史，再考虑 Supabase 等。

---

### Q7. 这个项目哪里体现 TypeScript 能力？

**A：** 路线、文章、AI 回答都有明确类型定义；`lib/plan/types.ts`、`lib/articles.ts` 等避免魔法字符串；组件 props 有类型约束；重构时编译器能帮忙抓错误。

---

### Q8. 这个项目哪里体现组件化？

**A：** 按功能域拆分：`components/plan`、`components/ai`、`components/articles`；共用 `ArticleCard`、`Navbar`；样式 token 集中在 `card-system.ts`，避免每个页面重复写 class。

---

### Q9. 多语言是怎么实现的？

**A：** `LanguageProvider` 用 React context + localStorage 记住语言；UI 文案在 `lib/i18n/content.ts` 和 `ui-strings.ts`；文章用 `getLocalizedArticle()`。切换语言时不改 URL，适合作品集演示。

---

### Q10. 你如何保证页面视觉统一？

**A：** 建立了 `lib/ui/card-system.ts`，定义 cardHero、cardTintSky、btnPrimary 等 token；各页面引用同一套 class，保持 Apple 风格的淡色渐变和留白，避免每页各自为政。

---

### Q11. 你如何部署这个项目？

**A：** 代码 push 到 GitHub，Vercel 关联仓库自动构建部署。本地 `npm run build` 和 `npm run lint` 通过后再 push。线上地址是 study-abroad-consulting.vercel.app。

---

### Q12. 如果给你继续做一个月，你会优先做什么？

**A：** 我会优先：补关键路径的测试（尤其是 `/plan` 规则输出）；完善错误状态和空状态；把 `/plan` 里仍偏中文的选项文案做完 i18n；接 AI 前先写安全设计文档；增加 1–2 个更真实的案例文章。不会先做登录付费。

---

## 9. 日本語 面试问答简版

### Q1. なぜこのプロジェクトを作りましたか？

**A：** 留学情報の整理需要と、日本 IT 就職向けポートフォリオの両方のためです。静的サイトではなく、ルート計画と AI MVP まで含めて実装力を示したかったです。

---

### Q2. 普通の Web サイトとの違いは？

**A：** `/plan` には入力とルール計算、`/ai` には質問分解フローがあります。ロジックは `lib/` に分離し、ページは薄く保っています。

---

### Q3. `/plan` のロジックは？

**A：** TypeScript のローカルルールでマッチングとスコアリングを行います。ML ではなく、説明可能なデモ向けです。

---

### Q4. なぜ本番 AI を使わない？

**A：** まず MVP で UX と回答構造を固定したいからです。コスト、セキュリティ、責任の問題を整理してから接続を検討します。

---

### Q5. なぜ DB を使わない？

**A：** ユーザー機能や履歴保存がまだ不要だからです。記事とルールはローカルファイルで十分で、デプロイも簡単です。

---

### Q6. TypeScript の活用例は？

**A：** ルート、記事、AI 回答に型定義があり、props も型付けしています。リファクタ時にコンパイラが助けてくれます。

---

### Q7. 多言語はどう実装？

**A：** `LanguageProvider` と localStorage、`lib/i18n` の文案分離、記事の `getLocalizedArticle()` です。

---

### Q8. 今後 1 ヶ月で優先することは？

**A：** テスト追加、エラー状態の改善、残り i18n、AI 接続前の安全設計です。ログイン・課金は優先しません。

---

## 10. English Interview Q&A

### Q1. Why did you build this project?

**A:** To organize study-abroad information and to show frontend, product, and boundary-aware AI MVP skills for Japan IT job applications—not just a static blog.

---

### Q2. How is it different from a static site?

**A:** `/plan` has form input and rule-based scoring; `/ai` has structured Q&A flow. Logic lives in `lib/`, pages stay thin.

---

### Q3. How does `/plan` work?

**A:** Local TypeScript rules match inputs to routes and scores. Explainable demo logic, not machine learning.

---

### Q4. Why no real AI API?

**A:** MVP first—fix UX and answer structure. Real APIs add cost, security, and liability; I’d design boundaries before connecting.

---

### Q5. Why no database?

**A:** No users or history yet. Articles and rules in TS files keep deploy simple for a portfolio.

---

### Q6. Where does TypeScript help?

**A:** Typed routes, articles, and AI responses; typed component props; safer refactors.

---

### Q7. How is i18n implemented?

**A:** LanguageProvider + localStorage, copy in `lib/i18n`, articles via `getLocalizedArticle()`.

---

### Q8. What would you do next in one month?

**A:** Tests, error states, remaining i18n, AI safety design—not login or billing first.

---

---

## v0.16.0 面试讲解重点

> 本章节对应 v0.16.0：Case Study 已从「功能展示」升级为「面试讲解型项目展示」。建议面试前配合 [/case-study](https://study-abroad-consulting.vercel.app/case-study) 和本文档一起复习。

### 面试官最可能问的 5 个问题

| # | 问题 |
|---|------|
| Q1 | 这个项目解决什么问题？ |
| Q2 | 你为什么不接真实 AI API？ |
| Q3 | `/plan` 的规则逻辑怎么设计？ |
| Q4 | 这个项目体现了你的哪些工程能力？ |
| Q5 | 如果继续迭代，你会优先做什么？ |

---

### Q1：这个项目解决什么问题？

**推荐回答（中文）：**

准备出国的人面对分散的信息——国家、预算、语言、签证、风险——容易只看结论，不理解它们之间的关系。我做这个个人作品集，不是替代中介或做商业产品，而是把信息整理成结构化流程：文章入口、`/plan` 可解释的路线规则、`/ai` 本地问答 MVP，以及 `/case-study` 项目说明。目标是向日本 IT 面试官展示：我能从真实问题出发，拆解需求、设计边界、组织代码并持续迭代。

**日本語（简版）：**

留学を考える人は情報が分散し、予算・語学・ビザ・リスクの関係を理解しにくいです。商用サービスではなく個人ポートフォリオとして、記事、`/plan` の説明可能なルール、`/ai` の mock 問答、`/case-study` で整理しました。日本 IT 就職向けに、要件分解と実装力を示すことが目的です。

**English (brief):**

People preparing to go abroad face scattered info and often miss how budget, language, visa, and risk connect. This is a personal portfolio—not a commercial product. I organize content into articles, explainable `/plan` rules, a local `/ai` MVP, and `/case-study` for project storytelling aimed at Japan IT interviews.

---

### Q2：你为什么不接真实 AI API？

**推荐回答（中文）：**

当前阶段目标是验证 AI 产品的交互形态和信息拆解方式，而不是追求「有 AI」本身。真实 API 会带来密钥管理、调用成本、合规责任和回答不可控。我先用 mock 固定回答结构——目标、预算、语言、风险、下一步——并明确边界：不保存历史、不做签证/就业承诺。等 UX 和边界设计清楚后，再考虑接入，并会先设计安全边界和免责声明。

**日本語（简版）：**

今は UX と情報分解を mock で検証する段階です。本番 API は鍵、コスト、コンプライアンス、回答の不確実性があります。履歴保存やビザ保証はしません。接続前に安全境界を設計します。

**English (brief):**

The MVP validates Q&A flow and answer structure, not API integration. Real APIs add keys, cost, compliance, and unpredictable output. Mock keeps goals, budget, language, risk, and next steps structured—with clear limits: no history, no visa/job promises. I'd design safety boundaries before connecting.

---

### Q3：`/plan` 的规则逻辑怎么设计？

**推荐回答（中文）：**

`/plan` 用的是本地 TypeScript 规则引擎，不是机器学习预测。用户输入年龄、学历、预算、语言、目标、风险偏好等，引擎在 `lib/plan` 里做路线匹配和评分：route-engine 负责候选路线，scoring-engine 负责打分，insight-engine 负责生成可读的匹配理由。我选择本地规则而不是先搭数据库，是因为核心需求是「可解释」——面试时我能讲清输入→规则→输出，也方便在代码评审里 walk through。

**日本語（简版）：**

`/plan` は TypeScript のローカルルールです。入力に対し `lib/plan` でマッチングとスコアリング。route-engine、scoring-engine、insight-engine に分離。ML ではなく説明可能性を優先し、DB より先にフローを検証しました。

**English (brief):**

`/plan` uses local TypeScript rules, not ML. Inputs go through `lib/plan`: route-engine for candidates, scoring-engine for scores, insight-engine for readable match reasons. Local rules prioritize explainability—I can walk through input → rules → output in an interview.

---

### Q4：这个项目体现了你的哪些工程能力？

**推荐回答（中文）：**

主要有四块：第一，前端工程——Next.js App Router、组件拆分、表单状态、响应式和多语言 UI；第二，产品拆解——把出国焦虑拆成可核对模块，并设计清晰边界；第三，规则与逻辑组织——`lib/plan`、`lib/ai` 从 page 抽离，page 只做组合；第四，作品集表达——README、project-status、interview-guide、三语言 case-study，以及 GitHub + Vercel 的完整交付链路。这些都是个人独立完成的。

**日本語（简版）：**

フロントエンド（Next.js、コンポーネント、レスポンシブ、i18n）、プロダクト分解と境界設計、lib/plan・lib/ai へのロジック分離、README・ドキュメント・Case Study・GitHub/Vercel まで個人で完遂しました。

**English (brief):**

Frontend (Next.js, components, responsive, i18n), product breakdown and boundaries, logic in `lib/plan` and `lib/ai` with thin pages, plus docs, trilingual case study, and GitHub/Vercel delivery—all solo.

---

### Q5：如果继续迭代，你会优先做什么？

**推荐回答（中文）：**

我会按风险和价值排序：第一，接入真实 AI 前先设计安全边界和测试；第二，给 `/plan` 和核心 lib 增加测试用例；第三，补充更多真实文章案例；第四，增加英文/日文 README，降低面试官阅读成本；第五，增强 `/plan` 与 `/ai` 的上下文联动。登录、数据库和权限只有在明确产品化方向时才会考虑，当前不会为了「看起来完整」而提前引入。

**日本語（简版）：**

優先順位：① AI 接続前の安全設計とテスト ② lib のテスト追加 ③ 記事コンテンツ拡充 ④ 英日 README ⑤ /plan と /ai の連携。ログイン・DB はプロダクト化が決まってから。

**English (brief):**

Priority: (1) safety design and tests before a real AI API, (2) tests for `/plan` and core lib, (3) more real articles, (4) EN/JA README, (5) stronger `/plan`–`/ai` linkage. Login and DB only if the product direction is clear—not for optics.

---

## 11. 面试演示路线

| 顺序 | 去哪里 | 讲什么 |
|------|--------|--------|
| 1 | **GitHub README** | 项目定位、一句话介绍、面试官快速查看、技术决策摘要、在线链接 |
| 2 | **在线首页 /** | 项目是什么、内容分类、推荐阅读；提到这是个人作品集 |
| 3 | **/case-study** | 背景、面试官重点、技术决策、我的职责、当前边界（3–5 分钟核心） |
| 4 | **/plan** | 填表单 → 生成路线 → 讲规则引擎、可解释性、不是 AI 预测 |
| 5 | **/ai** | 输入问题 → 看结构化回答 → 强调 mock、边界、产品原型 |
| 6 | **/articles** | 切换语言 → 搜索/分类 → 点一篇详情 → 多语言内容 |
| 7 | **回到 GitHub 目录** | 指 `app/`、`components/`、`lib/plan`、`lib/ai`、`lib/i18n`、`docs/` |

**时间控制：** 总演示 8–12 分钟为宜；若时间紧，优先 case-study + plan + 架构目录。

---

## 12. 自我提醒

- **不要夸大**：这是个人作品集，不是日活百万的产品，也不是官方签证服务  
- **主动说明边界**：不接真实 AI、不接 DB、无登录付费、无录取/就业承诺  
- **强调个人完成范围**：从需求到部署、文档、多语言，体现能独立迭代  
- **诚实面对不会的问题**：可以说「这块我还没做，但我会从官方文档 / 小范围 POC 开始学习」  
- **演示前**：打开 `/case-study`，语言切到日文或英文，确认 Navbar 语言切换正常  
- **演示后**：愿意分享 GitHub 链接和 `docs/project-status.md`，方便面试官事后查看

---

*文档版本：v0.16.0 · 与 project-status.md 同步维护*
