import type { Language } from "@/lib/i18n/language";

export type CaseStudyLocale = Language;

export type CaseStudyContent = {
  hero: {
    badge: string;
    tags: string[];
    title: string;
    subtitle: string;
    ctaPlan: string;
    ctaAi: string;
  };
  background: {
    eyebrow: string;
    title: string;
    cardTitle: string;
    paragraphs: [string, string];
  };
  features: {
    eyebrow: string;
    title: string;
    description: string;
    cards: { title: string; description: string }[];
  };
  stack: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  engineering: {
    eyebrow: string;
    title: string;
    description: string;
    items: { title: string; body: string }[];
  };
  architecture: {
    eyebrow: string;
    title: string;
    description: string;
    layers: { label: string; title: string; items: string[] }[];
  };
  capabilities: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string }[];
  };
  boundaries: {
    title: string;
    items: string[];
  };
  future: {
    title: string;
    items: string[];
  };
  status: {
    eyebrow: string;
    title: string;
    body: string;
  };
};

export const caseStudyContent: Record<CaseStudyLocale, CaseStudyContent> = {
  zh: {
    hero: {
      badge: "v0.12.1 · 作品集案例页",
      tags: ["Next.js / React / TypeScript", "本地规则引擎", "AI 问答 MVP"],
      title: "出国咨询信息整理平台",
      subtitle:
        "面向中文用户的出国规划信息整理项目。使用 Next.js、React、TypeScript 与本地规则逻辑，展示路线规划、AI 问答 MVP、内容组织与作品集级 UI 设计能力。",
      ctaPlan: "查看路线规划",
      ctaAi: "体验 AI 问答 MVP",
    },
    background: {
      eyebrow: "Background",
      title: "项目背景",
      cardTitle: "解决什么问题",
      paragraphs: [
        "很多准备出国的人会同时面对国家选择、预算、语言、签证、学校、就业方向等问题，信息分散且容易焦虑。",
        "本项目尝试把这些问题拆成结构化流程，帮助用户先把问题问清楚，再决定下一步。当前作为个人作品集维护，重点展示工程实现与产品思路，而非商业化运营。",
      ],
    },
    features: {
      eyebrow: "Features",
      title: "核心功能",
      description: "四个模块覆盖内容、规划、问答与作品集展示，逻辑彼此独立、可分别演示。",
      cards: [
        {
          title: "内容文章系统",
          description:
            "文章列表、分类、详情与搜索筛选，整理出国相关经验与指南，作为信息入口。",
        },
        {
          title: "/plan 路线规划",
          description:
            "基于预算、语言、目标与风险的本地规则推荐，输出可解释的路线匹配与评分。",
        },
        {
          title: "/ai 本地问答 MVP",
          description:
            "将问题拆成目标、预算、语言与风险，本地 mock 生成结构化回答，不接真实 AI。",
        },
        {
          title: "/case-study 作品集展示",
          description:
            "说明项目背景、技术栈、架构取舍与工程亮点，用于面试与求职场景展示。",
        },
      ],
    },
    stack: {
      eyebrow: "Stack",
      title: "技术栈",
      items: [
        "Next.js 16",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Git / GitHub",
        "Vercel",
        "本地 mock 逻辑",
        "规则评分引擎",
      ],
    },
    engineering: {
      eyebrow: "Engineering",
      title: "工程亮点",
      description: "面向面试评审，说明代码组织、边界意识与迭代方式。",
      items: [
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
      ],
    },
    architecture: {
      eyebrow: "Architecture",
      title: "项目架构",
      description: "业务逻辑从页面抽离，按功能域划分目录。",
      layers: [
        {
          label: "app",
          title: "页面入口",
          items: ["/", "/articles", "/plan", "/ai", "/case-study"],
        },
        {
          label: "components",
          title: "UI 与交互",
          items: ["ai/* 问答组件", "plan/* 表单与弹窗", "Navbar / Footer"],
        },
        {
          label: "lib/plan",
          title: "路线规划规则",
          items: ["route-engine", "scoring-engine", "insight-engine"],
        },
        {
          label: "lib/ai",
          title: "本地问答逻辑",
          items: ["mock-answer", "format-answer", "types"],
        },
      ],
    },
    capabilities: {
      eyebrow: "Capabilities",
      title: "这个项目展示了什么能力",
      items: [
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
      ],
    },
    boundaries: {
      title: "当前边界",
      items: [
        "当前不接真实 AI API",
        "当前不接数据库",
        "当前没有用户系统",
        "当前不保存历史记录",
        "当前内容仅作信息整理与作品集展示",
        "重要信息仍应以学校、使领馆、入管局和官方政策为准",
      ],
    },
    future: {
      title: "后续计划",
      items: [
        "接入真实 AI API 前先设计安全边界与免责声明",
        "补充更完整的测试与错误状态处理",
        "增加更多真实案例与文章内容",
        "增强 /plan 与 /ai 的上下文联动",
        "视需要将多语言展示扩展到更多页面",
      ],
    },
    status: {
      eyebrow: "Status",
      title: "v0.12.1 — 全站导航级多语言",
      body: "语言切换已移至 Navbar，Case Study 页面支持中文 / 日本語 / English。用于日本 IT 求职场景下的项目演示。在线地址：study-abroad-consulting.vercel.app",
    },
  },
  ja: {
    hero: {
      badge: "v0.12.1 · ポートフォリオ Case Study",
      tags: [
        "Next.js / React / TypeScript",
        "ルールベースエンジン",
        "AI 問答 MVP",
      ],
      title: "留学・海外生活 情報整理プラットフォーム",
      subtitle:
        "留学・海外生活に関する情報整理を目的とした個人ポートフォリオです。Next.js、React、TypeScript とローカルルールロジックで、進路プランニング、AI 問答 MVP、コンテンツ構成、UI 設計力を示します。",
      ctaPlan: "進路プランニングを見る",
      ctaAi: "AI 問答 MVP を試す",
    },
    background: {
      eyebrow: "Background",
      title: "プロジェクト背景",
      cardTitle: "どんな課題に向き合うか",
      paragraphs: [
        "留学や海外生活を検討する人は、国選び、予算、語学、ビザ、学校、就業先など多くの情報を同時に整理しなければならず、不安を感じやすい状況にあります。",
        "本プロジェクトは、これらの問題を構造化されたフローに分解し、まず何を確認すべきかを明確にすることを目指しています。商用サービスではなく、個人ポートフォリオとして実装力とプロダクト思考を示すことを目的としています。",
      ],
    },
    features: {
      eyebrow: "Features",
      title: "主要機能",
      description:
        "コンテンツ、プランニング、問答、ポートフォリオ展示の 4 モジュールで構成。それぞれ独立してデモ可能です。",
      cards: [
        {
          title: "コンテンツ記事システム",
          description:
            "記事一覧、カテゴリ、詳細、検索・フィルタで留学関連情報を整理し、情報入口として機能します。",
        },
        {
          title: "/plan 進路プランニング",
          description:
            "予算、語学力、目標、リスクに基づくローカルルール推薦。説明可能なルートマッチングとスコアリングを出力します。",
        },
        {
          title: "/ai ローカル問答 MVP",
          description:
            "質問を目標・予算・語学・リスクに分解し、ローカル mock で構造化回答を生成。本番 AI API は未接続です。",
        },
        {
          title: "/case-study ポートフォリオ展示",
          description:
            "背景、技術スタック、アーキテクチャ判断、エンジニアリングの要点を面接・選考向けに説明します。",
        },
      ],
    },
    stack: {
      eyebrow: "Stack",
      title: "技術スタック",
      items: [
        "Next.js 16",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Git / GitHub",
        "Vercel",
        "ローカル mock ロジック",
        "ルールベース評価エンジン",
      ],
    },
    engineering: {
      eyebrow: "Engineering",
      title: "エンジニアリングの要点",
      description:
        "面接向けに、コード構成、技術的な境界設計、段階的な改善方法を説明できるように整理しています。",
      items: [
        {
          title: "コンポーネント分割",
          body: "components/ai、components/plan が UI と操作を担当。lib/ai、lib/plan にビジネスロジックを分離し、ページは組み合わせのみ行います。",
        },
        {
          title: "ルールエンジンの分離",
          body: "route-engine、scoring-engine、insight-engine が /plan の推薦ロジックを独立管理。テストと改善がしやすい構成です。",
        },
        {
          title: "AI MVP の境界が明確",
          body: "本番 AI 未接続、履歴保存なし、ビザ・移民・合格の保証なし。まず情報設計と UX を検証する段階です。",
        },
        {
          title: "UI デザインシステム",
          body: "lib/ui/card-system.ts でカード、ボタン、グラデーション、影の階層を統一。/ai と Case Study ページで共通 token を使用。",
        },
        {
          title: "段階的なバージョン管理",
          body: "コンテンツ MVP → /plan ルールプランニング → /ai ローカル問答 → case-study と、各段階でスコープとドキュメントを明確化。",
        },
        {
          title: "デプロイと協業",
          body: "GitHub でコード管理、Vercel で公開。AGENTS.md と project-status.md で AI 協業の境界を定義。",
        },
      ],
    },
    architecture: {
      eyebrow: "Architecture",
      title: "プロジェクト構成",
      description:
        "ビジネスロジックをページから分離し、機能ドメインごとにディレクトリを整理しています。",
      layers: [
        {
          label: "app",
          title: "ページ入口",
          items: ["/", "/articles", "/plan", "/ai", "/case-study"],
        },
        {
          label: "components",
          title: "UI と操作",
          items: ["ai/* 問答コンポーネント", "plan/* フォームとモーダル", "Navbar / Footer"],
        },
        {
          label: "lib/plan",
          title: "進路プランニングルール",
          items: ["route-engine", "scoring-engine", "insight-engine"],
        },
        {
          label: "lib/ai",
          title: "ローカル問答ロジック",
          items: ["mock-answer", "format-answer", "types"],
        },
      ],
    },
    capabilities: {
      eyebrow: "Capabilities",
      title: "このプロジェクトで示す能力",
      items: [
        {
          title: "フロントエンド実装",
          body: "App Router、コンポーネント分割、フォーム状態、URL searchParams、レスポンシブレイアウト、モバイル対応。",
        },
        {
          title: "プロダクト思考",
          body: "ユーザーの不安点から出発し、留学関連の問題を目標・予算・語学・リスクに分解して整理。",
        },
        {
          title: "AI 活用の理解",
          body: "本番 API の前にローカル MVP でフローと境界を検証。説明可能性を優先し、AI ありきにしない設計。",
        },
        {
          title: "コード構成",
          body: "ビジネスロジックを page.tsx から lib/* へ分離。/plan と /ai は独立し、ページの複雑さを抑制。",
        },
        {
          title: "選考向け説明力",
          body: "要件の背景、アーキテクチャ判断、現状の制約、今後の計画を説明でき、日本 IT 就職向けデモに適しています。",
        },
      ],
    },
    boundaries: {
      title: "現在の制約",
      items: [
        "本番 AI API は未接続",
        "データベースは未使用",
        "ユーザー認証・管理機能なし",
        "履歴保存なし",
        "コンテンツは情報整理とポートフォリオ展示のみ",
        "重要情報は学校、大使館、入管、公式政策を優先してください",
      ],
    },
    future: {
      title: "今後の予定",
      items: [
        "本番 AI API 接続前に安全境界と免責事項を設計",
        "テストとエラー状態処理の充実",
        "より多くの実例コンテンツと記事の追加",
        "/plan と /ai のコンテキスト連携の強化",
        "必要に応じて多言語展示を他ページへ拡張",
      ],
    },
    status: {
      eyebrow: "Status",
      title: "v0.12.1 — 全站ナビ多言語対応",
      body: "言語切替は Navbar に移動。Case Study ページは中文 / 日本語 / English に対応。日本 IT 就職向けのプロジェクト説明に利用できます。公開 URL：study-abroad-consulting.vercel.app",
    },
  },
  en: {
    hero: {
      badge: "v0.12.1 · Portfolio Case Study",
      tags: [
        "Next.js / React / TypeScript",
        "Rule-based engine",
        "AI Q&A MVP",
      ],
      title: "Study Abroad Information Platform",
      subtitle:
        "A personal portfolio project for organizing study-abroad planning information. Built with Next.js, React, TypeScript, and local rule-based logic to demonstrate route planning, a local AI Q&A MVP, content organization, and portfolio-grade UI design.",
      ctaPlan: "View route planning",
      ctaAi: "Try AI Q&A MVP",
    },
    background: {
      eyebrow: "Background",
      title: "Project background",
      cardTitle: "What problem it addresses",
      paragraphs: [
        "People preparing to go abroad often face country choice, budget, language, visa, school, and career questions at the same time. Information is scattered and easy to feel anxious about.",
        "This project breaks those questions into structured flows so users can clarify what to check first, then decide next steps. It is maintained as a personal portfolio focused on engineering and product thinking, not commercial operation.",
      ],
    },
    features: {
      eyebrow: "Features",
      title: "Core features",
      description:
        "Four modules cover content, planning, Q&A, and portfolio presentation. Each can be demonstrated independently.",
      cards: [
        {
          title: "Content & articles",
          description:
            "Article list, categories, detail pages, and search filters organize study-abroad guides as an information entry point.",
        },
        {
          title: "/plan route planning",
          description:
            "Local rule-based recommendations from budget, language, goals, and risk. Outputs explainable route matching and scoring.",
        },
        {
          title: "/ai local Q&A MVP",
          description:
            "Breaks questions into goals, budget, language, and risk. Local mock generates structured answers without a real AI API.",
        },
        {
          title: "/case-study portfolio page",
          description:
            "Explains background, stack, architecture choices, and engineering highlights for interviews and job applications.",
        },
      ],
    },
    stack: {
      eyebrow: "Stack",
      title: "Tech stack",
      items: [
        "Next.js 16",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Git / GitHub",
        "Vercel",
        "Local mock logic",
        "Rule-based scoring engine",
      ],
    },
    engineering: {
      eyebrow: "Engineering",
      title: "Engineering highlights",
      description:
        "Structured for interview review: code organization, boundary awareness, and iterative delivery.",
      items: [
        {
          title: "Component separation",
          body: "components/ai and components/plan handle UI and interaction; lib/ai and lib/plan hold business logic; pages compose only.",
        },
        {
          title: "Rule engine isolation",
          body: "route-engine, scoring-engine, and insight-engine maintain /plan recommendation logic independently for easier testing and iteration.",
        },
        {
          title: "Clear AI MVP boundaries",
          body: "No real AI API, no history storage, no visa / immigration / admission promises. Validates information architecture and interaction first.",
        },
        {
          title: "UI design system",
          body: "lib/ui/card-system.ts unifies cards, buttons, gradients, and shadow levels. Shared tokens across /ai and the case study page.",
        },
        {
          title: "Incremental versioning",
          body: "Content MVP → /plan rule planning → /ai local Q&A → case-study, each phase with a clear scope and documentation.",
        },
        {
          title: "Deployment & collaboration",
          body: "Code on GitHub, deployed on Vercel. AGENTS.md and project-status.md define AI collaboration boundaries.",
        },
      ],
    },
    architecture: {
      eyebrow: "Architecture",
      title: "Project architecture",
      description:
        "Business logic is extracted from pages and organized by functional domain.",
      layers: [
        {
          label: "app",
          title: "Page routes",
          items: ["/", "/articles", "/plan", "/ai", "/case-study"],
        },
        {
          label: "components",
          title: "UI & interaction",
          items: ["ai/* Q&A components", "plan/* forms & modals", "Navbar / Footer"],
        },
        {
          label: "lib/plan",
          title: "Route planning rules",
          items: ["route-engine", "scoring-engine", "insight-engine"],
        },
        {
          label: "lib/ai",
          title: "Local Q&A logic",
          items: ["mock-answer", "format-answer", "types"],
        },
      ],
    },
    capabilities: {
      eyebrow: "Capabilities",
      title: "What this project demonstrates",
      items: [
        {
          title: "Frontend engineering",
          body: "App Router pages, component splitting, form state, URL searchParams, responsive layout, and mobile adaptation.",
        },
        {
          title: "Product thinking",
          body: "Starts from user anxiety and breaks study-abroad questions into verifiable goals, budget, language, and risk.",
        },
        {
          title: "AI application awareness",
          body: "Validates flow and boundaries with a local MVP before a real API. Prioritizes explainability over having AI for its own sake.",
        },
        {
          title: "Code organization",
          body: "Business logic moved from page.tsx to lib/*; /plan and /ai stay independent to reduce page complexity.",
        },
        {
          title: "Portfolio presentation",
          body: "Can explain requirements, architecture trade-offs, current limits, and next steps—suited for Japan IT job interviews.",
        },
      ],
    },
    boundaries: {
      title: "Current boundaries",
      items: [
        "No real AI API connected",
        "No database",
        "No user system",
        "No history storage",
        "Content is for information organization and portfolio display only",
        "Important details should still follow schools, embassies, immigration offices, and official policy",
      ],
    },
    future: {
      title: "Next steps",
      items: [
        "Design safety boundaries and disclaimers before connecting a real AI API",
        "Add more complete tests and error-state handling",
        "Expand real case content and articles",
        "Strengthen context linking between /plan and /ai",
        "Extend multilingual presentation to more pages if needed",
      ],
    },
    status: {
      eyebrow: "Status",
      title: "v0.12.1 — Site-wide navbar language",
      body: "Language switching lives in the Navbar. The case study page supports 中文 / 日本語 / English for Japan IT job interviews. Live at study-abroad-consulting.vercel.app",
    },
  },
};
