import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  badgeSoft,
  btnPrimary,
  btnSecondary,
  cardHero,
  cardHover,
  cardInfo,
  cardTintIndigo,
  cardTintRose,
  cardTintSky,
  caseStudyModule,
  caseStudyModuleIndigo,
  caseStudyModuleRose,
  pageBackground,
  tagApple,
} from "@/lib/ui/card-system";

export const metadata: Metadata = {
  title: "Case Study · 出国咨询信息整理平台",
  description:
    "个人求职作品集项目案例页：路线规划、本地 AI 问答 MVP、内容组织与工程能力展示。",
};

const heroTags = [
  "Next.js / React / TypeScript",
  "本地规则引擎",
  "AI 问答 MVP",
];

const featureCards = [
  {
    title: "内容文章系统",
    description:
      "文章列表、分类、详情与搜索筛选，整理出国相关经验与指南，作为信息入口。",
    toneClass: cardTintSky,
  },
  {
    title: "/plan 路线规划",
    description:
      "基于预算、语言、目标与风险的本地规则推荐，输出可解释的路线匹配与评分。",
    toneClass: cardTintIndigo,
  },
  {
    title: "/ai 本地问答 MVP",
    description:
      "将问题拆成目标、预算、语言与风险，本地 mock 生成结构化回答，不接真实 AI。",
    toneClass: cardTintRose,
  },
  {
    title: "/case-study 作品集展示",
    description:
      "说明项目背景、技术栈、架构取舍与工程亮点，用于面试与求职场景展示。",
    toneClass: caseStudyModuleIndigo,
  },
];

const techStack = [
  "Next.js 16",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Git / GitHub",
  "Vercel",
  "本地 mock 逻辑",
  "规则评分引擎",
];

const engineeringHighlights = [
  {
    title: "组件化拆分",
    body: "components/ai、components/plan 负责 UI 与交互；lib/ai、lib/plan 承载业务逻辑，页面只做组合。",
  },
  {
    title: "规则引擎抽离",
    body: "route-engine、scoring-engine、insight-engine 独立维护 /plan 推荐逻辑，便于测试与迭代。",
  },
  {
    title: "AI MVP 边界清晰",
    body: "当前不接真实 AI、不保存历史、不给签证 / 移民 / 录取承诺，先验证信息架构与交互形态。",
  },
  {
    title: "UI 设计系统",
    body: "lib/ui/card-system.ts 统一卡片、按钮、渐变与阴影层级，/ai 与作品集页共享 token。",
  },
  {
    title: "版本逐步演进",
    body: "从内容 MVP → /plan 规则规划 → /ai 本地问答 → case-study，每阶段有明确范围与文档记录。",
  },
  {
    title: "部署与协作",
    body: "GitHub 管理代码，Vercel 在线部署；AGENTS.md 与 project-status.md 约束 AI 协作边界。",
  },
];

const architectureLayers = [
  {
    label: "app",
    title: "页面入口",
    items: ["/", "/articles", "/plan", "/ai", "/case-study"],
    toneClass: cardTintSky,
  },
  {
    label: "components",
    title: "UI 与交互",
    items: ["ai/* 问答组件", "plan/* 表单与弹窗", "Navbar / Footer"],
    toneClass: cardTintIndigo,
  },
  {
    label: "lib/plan",
    title: "路线规划规则",
    items: ["route-engine", "scoring-engine", "insight-engine"],
    toneClass: caseStudyModuleRose,
  },
  {
    label: "lib/ai",
    title: "本地问答逻辑",
    items: ["mock-answer", "format-answer", "types"],
    toneClass: caseStudyModule,
  },
];

const capabilityMap = [
  {
    title: "前端工程",
    body: "App Router 页面、组件拆分、表单状态、URL searchParams、响应式布局与移动端适配。",
  },
  {
    title: "产品思维",
    body: "从「用户到底在焦虑什么」出发，把出国问题拆成可核对的目标、预算、语言与风险。",
  },
  {
    title: "AI 应用理解",
    body: "先做本地 MVP 验证流程与边界，再考虑真实 API；不为了「有 AI」而牺牲可解释性。",
  },
  {
    title: "代码组织",
    body: "业务逻辑从 page.tsx 抽离到 lib/*，/plan 与 /ai 各自独立，降低页面复杂度。",
  },
  {
    title: "求职展示",
    body: "能说明需求来源、架构取舍、当前限制与后续计划，适合日本 IT 求职场景演示。",
  },
];

const currentBoundaries = [
  "当前不接真实 AI API",
  "当前不接数据库",
  "当前没有用户系统",
  "当前不保存历史记录",
  "当前内容仅作信息整理与作品集展示",
  "重要信息仍应以学校、使领馆、入管局和官方政策为准",
];

const futurePlans = [
  "接入真实 AI API 前先设计安全边界与免责声明",
  "补充更完整的测试与错误状态处理",
  "增加更多真实案例与文章内容",
  "增强 /plan 与 /ai 的上下文联动",
  "后续补充英文或日文版本，用于日本求职展示",
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 text-center md:mb-10">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-sky-600">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold leading-snug tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function ContentCard({
  title,
  children,
  toneClass = caseStudyModule,
}: {
  title: string;
  children: ReactNode;
  toneClass?: string;
}) {
  return (
    <div className={`p-6 sm:p-8 ${toneClass} ${cardHover}`}>
      <h3 className="text-xl font-semibold leading-snug tracking-tight text-gray-950 sm:text-2xl">
        {title}
      </h3>
      <div className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">
        {children}
      </div>
    </div>
  );
}

export default function CaseStudyPage() {
  return (
    <main
      className={`min-h-screen overflow-x-hidden text-gray-950 ${pageBackground}`}
    >
      {/* Hero */}
      <section className="px-4 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16">
        <div
          className={`relative mx-auto max-w-5xl overflow-hidden px-5 py-10 text-center sm:px-8 sm:py-14 lg:px-12 lg:py-16 ${cardHero}`}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(186,230,253,0.32),transparent_40%),radial-gradient(circle_at_84%_12%,rgba(221,214,254,0.20),transparent_38%)]" />

          <div className="relative">
            <p className={`mb-5 inline-flex sm:px-4 sm:py-1.5 ${badgeSoft}`}>
              v0.10.0 · 作品集案例页
            </p>

            <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
              {heroTags.map((tag) => (
                <span key={tag} className={tagApple}>
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-[2rem] font-semibold leading-[1.06] tracking-[-0.055em] text-gray-950 sm:text-5xl md:text-6xl">
              出国咨询信息整理平台
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-gray-600 sm:mt-6 sm:text-base lg:text-lg">
              面向中文用户的出国规划信息整理项目。使用 Next.js、React、TypeScript
              与本地规则逻辑，展示路线规划、AI 问答 MVP、内容组织与作品集级 UI
              设计能力。
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row">
              <Link
                href="/plan"
                className={`inline-flex rounded-full px-6 py-3 text-sm font-medium ${btnPrimary}`}
              >
                查看路线规划
              </Link>
              <Link
                href="/ai"
                className={`inline-flex rounded-full px-6 py-3 text-sm font-medium ${btnSecondary}`}
              >
                体验 AI 问答 MVP
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-4 pb-20 sm:px-6 sm:pb-24 lg:space-y-20">
        {/* 项目背景 */}
        <section>
          <SectionHeading eyebrow="Background" title="项目背景" />
          <ContentCard title="解决什么问题" toneClass={caseStudyModule}>
            <p>
              很多准备出国的人会同时面对国家选择、预算、语言、签证、学校、就业方向等问题，信息分散且容易焦虑。
            </p>
            <p className="mt-4">
              本项目尝试把这些问题拆成结构化流程，帮助用户先把问题问清楚，再决定下一步。当前作为个人作品集维护，重点展示工程实现与产品思路，而非商业化运营。
            </p>
          </ContentCard>
        </section>

        {/* 核心功能 */}
        <section>
          <SectionHeading
            eyebrow="Features"
            title="核心功能"
            description="四个模块覆盖内容、规划、问答与作品集展示，逻辑彼此独立、可分别演示。"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
            {featureCards.map((card) => (
              <div
                key={card.title}
                className={`min-w-0 p-6 sm:p-7 ${card.toneClass} ${cardHover}`}
              >
                <h3 className="text-lg font-semibold leading-snug tracking-tight text-gray-950 sm:text-xl">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 技术栈 */}
        <section>
          <SectionHeading eyebrow="Stack" title="技术栈" />
          <div
            className={`mx-auto max-w-4xl p-6 sm:p-8 ${caseStudyModuleIndigo}`}
          >
            <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
              {techStack.map((item) => (
                <span key={item} className={tagApple}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 工程亮点 */}
        <section>
          <SectionHeading
            eyebrow="Engineering"
            title="工程亮点"
            description="面向面试评审，说明代码组织、边界意识与迭代方式。"
          />
          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            {engineeringHighlights.map((item) => (
              <div
                key={item.title}
                className={`p-5 sm:p-6 ${cardInfo} ${cardHover}`}
              >
                <h3 className="text-base font-semibold leading-snug text-gray-950 sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 项目架构 */}
        <section>
          <SectionHeading
            eyebrow="Architecture"
            title="项目架构"
            description="业务逻辑从页面抽离，按功能域划分目录。"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {architectureLayers.map((layer) => (
              <div
                key={layer.label}
                className={`p-5 sm:p-6 ${layer.toneClass} ${cardHover}`}
              >
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-sky-600">
                  {layer.label}
                </p>
                <h3 className="mt-2 text-lg font-semibold leading-snug text-gray-950">
                  {layer.title}
                </h3>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-gray-700">
                  {layer.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 能力映射 */}
        <section>
          <SectionHeading
            eyebrow="Capabilities"
            title="这个项目展示了什么能力"
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {capabilityMap.map((item, index) => (
              <div
                key={item.title}
                className={`p-5 sm:p-6 ${
                  index === 4 ? caseStudyModuleRose : cardInfo
                } ${cardHover}`}
              >
                <h3 className="text-base font-semibold leading-snug text-gray-950 sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 当前边界 & 后续计划 */}
        <section className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          <ContentCard title="当前边界" toneClass={caseStudyModuleRose}>
            <ul className="space-y-2.5">
              {currentBoundaries.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </ContentCard>

          <ContentCard title="后续计划" toneClass={caseStudyModuleIndigo}>
            <ul className="space-y-2.5">
              {futurePlans.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </ContentCard>
        </section>

        {/* Status */}
        <section className="text-center">
          <div
            className={`mx-auto max-w-2xl px-6 py-10 sm:px-10 sm:py-12 ${cardHero}`}
          >
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-sky-600">
              Status
            </p>
            <p className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-gray-950 sm:text-3xl">
              v0.10.0 — Case Study 升级
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-700">
              作品集案例页已重构，用于日本 IT 求职场景下的项目演示。在线地址：
              study-abroad-consulting.vercel.app
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
