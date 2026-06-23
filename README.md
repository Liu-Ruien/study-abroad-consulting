# 出国咨询信息整理平台

这是一个面向日本 IT 求职展示的个人作品集项目，使用 Next.js、React、TypeScript 与本地规则逻辑，实现内容整理、路线规划、本地 AI 问答 MVP、多语言展示和项目案例页。

**Version:** v0.17.0  
**定位：** 个人作品集 / 日本 IT 求职展示

---

## Online Demo

[https://study-abroad-consulting.vercel.app](https://study-abroad-consulting.vercel.app)

---

## Project Screenshots

### Home / 首页

![Home](./public/screenshots/home.png)

Project overview, content categories, and recommended reading entry points.  
项目定位、内容分类与推荐阅读入口。

### Route Plan / 路线规划

![Route Plan](./public/screenshots/plan.png)

Explainable route suggestions powered by local rules.  
基于本地规则的可解释路线推荐流程。

### AI Q&A MVP / AI 问答

![AI Q&A MVP](./public/screenshots/ai.png)

Structured Q&A MVP with mock logic and clear boundaries.  
本地 mock 问答与问题拆解能力展示。

### Case Study / 项目案例

![Case Study](./public/screenshots/case-study.png)

Interview-oriented project presentation: background, decisions, and scope.  
面向面试官的项目背景、技术取舍与边界说明。

---

## For Interviewers / 面试官快速理解

**English**

This is not a commercial consulting service.  
It is a personal portfolio project designed to demonstrate:

- Frontend engineering with Next.js App Router
- Rule-based route planning logic
- Local AI Q&A MVP design
- Multilingual portfolio presentation
- Documentation and iterative development workflow

**中文**

这不是一个商业咨询服务，而是一个个人作品集项目，用于展示前端工程、规则逻辑、本地 AI 问答 MVP、多语言展示、文档整理与持续迭代能力。

**推荐入口：** [/case-study](https://study-abroad-consulting.vercel.app/case-study) · **讲解稿：** [docs/interview-guide.md](./docs/interview-guide.md)

---

## 日本語概要

このプロジェクトは、商用サービスではなく、日本での IT 就職活動に向けた個人ポートフォリオです。  
Next.js、React、TypeScript を使用し、留学・海外生活に関する情報整理、ルートプランニング、ローカル AI 質問応答 MVP、多言語表示、ケーススタディページを実装しています。

フロントエンド実装、ルールベースのロジック、AI MVP の境界設計、ドキュメント整備を面接で説明できることを目的としています。

---

## English Summary

This project is a personal portfolio for IT job interviews in Japan.  
It demonstrates frontend engineering, rule-based planning, local AI Q&A MVP design, multilingual presentation, project documentation, and iterative development.

It is not a commercial product. Important decisions about study abroad, visas, or careers should always follow official sources.

---

## Recommended Review Flow

1. Open [`/case-study`](https://study-abroad-consulting.vercel.app/case-study)
2. Review the project background and technical decisions
3. Try [`/plan`](https://study-abroad-consulting.vercel.app/plan)
4. Try [`/ai`](https://study-abroad-consulting.vercel.app/ai)
5. Browse [`/articles`](https://study-abroad-consulting.vercel.app/articles)
6. Read [`docs/interview-guide.md`](./docs/interview-guide.md)

---

## Core Features

| Feature | Purpose |
|---|---|
| Articles | Organize study abroad and overseas life information |
| Route Plan | Generate explainable route suggestions from local rules |
| AI Q&A MVP | Demonstrate AI-style interaction with mock logic |
| Case Study | Explain the project from an interviewer's perspective |
| Multilingual UI | Support Chinese, Japanese and English presentation |

---

## Tech Stack

| Area | Tools |
|---|---|
| Framework | Next.js 16 / App Router |
| UI | React / TypeScript / Tailwind CSS |
| Logic | Local rule engine / mock AI answer |
| Docs | README / project-status / interview guide |
| Deploy | Vercel |
| Version Control | Git / GitHub |

---

## Engineering Highlights

1. **App Router based page organization** — clear routes for `/`, `/articles`, `/plan`, `/ai`, `/case-study`
2. **Componentized UI system** — shared tokens via `lib/ui/card-system.ts`, reusable Navbar and page components
3. **Local rule engine for `/plan`** — `route-engine`, `scoring-engine`, `insight-engine` in `lib/plan`
4. **Mock AI boundary design for `/ai`** — structured answers without real API, keys, or compliance risk
5. **Multilingual content structure** — UI strings, case study copy, and localized articles (中文 / 日本語 / English)
6. **Case Study presentation flow** — desktop panel walkthrough for interview demos
7. **Continuous versioned documentation** — `project-status.md`, `interview-guide.md`, and README kept in sync

---

## Current Boundaries

**English**

- No real AI API is connected
- No user login
- No database
- No payment
- No legal / immigration / job guarantee
- Content is for information organization and portfolio demonstration only

**中文**

- 不接真实 AI API，不保存用户登录与数据库
- 不提供付费、签证、移民或求职成功承诺
- 内容仅用于信息整理与作品集展示，重要决策请以官方信息为准

---

## Documentation

| Document | Description |
|---|---|
| [docs/project-status.md](./docs/project-status.md) | Version history, scope, and development boundaries |
| [docs/interview-guide.md](./docs/interview-guide.md) | Interview scripts and Q&A (中文 / 日本語 / English) |
| [docs/product-blueprint-v0.2.md](./docs/product-blueprint-v0.2.md) | Product direction and feature blueprint |

---

## Local Development

```bash
npm install
npm run dev
npm run build
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) after `npm run dev`. If port 3000 is in use, Next.js may use 3001 instead.

---

## Page Routes

| Page | Path |
|------|------|
| Home | `/` |
| Articles | `/articles` |
| Route Plan | `/plan` |
| AI Q&A | `/ai` |
| Case Study | `/case-study` |
| About | `/about` |

---

## Version History (Recent)

- **v0.17.0** — README portfolio homepage, interview follow-up prep, case-study boundary copy
- **v0.16.x** — Navbar mega menu, case-study interviewer narrative
- See [docs/project-status.md](./docs/project-status.md) for full changelog

---

## Disclaimer

This is a **personal portfolio project**. Content is for information organization and demonstration only. It does not constitute visa, immigration, admission, employment, or legal advice. Always verify with schools, embassies, immigration offices, and official policy.
