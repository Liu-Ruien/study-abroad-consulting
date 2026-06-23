# v1.0.0 Portfolio Release

> **Draft for GitHub Release** — copy to GitHub → Releases → New release when ready.  
> Tag: `v1.0.0` · Target branch: `main`

---

## Overview

This release marks the **portfolio-ready v1.0.0** of the Study Abroad Information Organizer—a personal project built for **Japan IT job interviews**, not commercial operation.

It packages content organization, rule-based route planning, a local AI Q&A MVP, multilingual case study presentation, and complete interview documentation into a deployable, reviewable repository.

**Live demo:** https://study-abroad-consulting.vercel.app  
**Recommended entry:** https://study-abroad-consulting.vercel.app/case-study

---

## Included

- **Content article system** — categories, search, localized article pages
- **Route planning page** (`/plan`) — explainable suggestions from local TypeScript rules
- **Local AI Q&A MVP** (`/ai`) — structured mock answers with clear boundaries
- **Case Study presentation** (`/case-study`) — interview-oriented walkthrough (中文 / 日本語 / English)
- **Multilingual support** — UI strings, case study copy, and localized articles
- **Documentation** — README, project status, interview guide, resume descriptions, Japanese scripts
- **Vercel deployment** — production build from `main`

---

## Technical Highlights

- Next.js 16 App Router page organization
- React / TypeScript component design
- Tailwind CSS visual system with shared UI tokens
- Rule-based route planning logic (`lib/plan`)
- Mock AI boundary design (`lib/ai`)
- Multilingual content structure (`lib/i18n`, `lib/case-study-i18n.ts`)
- GitHub + Vercel deployment workflow
- Versioned documentation (`docs/project-status.md`)

---

## Boundaries

This release intentionally does **not** include:

- Real AI API integration
- User login or accounts
- Database or persistent user history
- Payment or subscription features
- Legal, visa, immigration, or job-success guarantees

Content is for **information organization and portfolio demonstration only**. Official sources should always be consulted for study-abroad decisions.

---

## Recommended Review Flow

1. [README](../README.md)
2. [Online Demo](https://study-abroad-consulting.vercel.app)
3. [/case-study](https://study-abroad-consulting.vercel.app/case-study)
4. [/plan](https://study-abroad-consulting.vercel.app/plan)
5. [/ai](https://study-abroad-consulting.vercel.app/ai)
6. [/articles](https://study-abroad-consulting.vercel.app/articles)
7. [docs/interview-guide.md](./interview-guide.md)

---

## Job Application Materials (v0.19.0+)

| Document | Purpose |
|----------|---------|
| [docs/resume-project-description.md](./resume-project-description.md) | 中文 / 日本語 / English resume copy |
| [docs/japanese-interview-script.md](./japanese-interview-script.md) | 30s / 1min / 3min Japanese oral scripts |
| [docs/interview-guide.md](./interview-guide.md) | Full interview Q&A and demo route |

---

## v1.0.0 Final Acceptance Checklist

- [x] Online demo deployed on Vercel
- [x] `/case-study` interview presentation ready
- [x] README optimized for portfolio review
- [x] Interview guide and follow-up Q&A prepared
- [x] Project status documented through v0.19.0
- [x] Multilingual case study supported
- [x] Resume project descriptions (中 / 日 / EN)
- [x] Japanese interview scripts prepared
- [x] Release notes draft prepared
- [ ] GitHub Release tag `v1.0.0` published
- [ ] Optional: refresh screenshots if UI drifted

---

## Suggested Release Title & Description (GitHub)

**Title:** `v1.0.0 — Portfolio release for Japan IT job applications`

**Description (paste into GitHub Release body):**

Portfolio-ready release of the Study Abroad Information Organizer. Includes articles, rule-based `/plan`, mock `/ai` MVP, multilingual `/case-study`, and full interview documentation. Not a commercial product—built for technical interview demonstration.

See [Recommended Review Flow](#recommended-review-flow) above or start at [/case-study](https://study-abroad-consulting.vercel.app/case-study).
