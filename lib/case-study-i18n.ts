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
  highlights: {
    eyebrow: string;
    title: string;
    cards: { title: string; description: string }[];
  };
  interviewerFocus: {
    eyebrow: string;
    title: string;
    cards: { title: string; description: string }[];
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
  technicalDecisions: {
    eyebrow: string;
    title: string;
    description: string;
    items: { title: string; body: string }[];
  };
  myRole: {
    eyebrow: string;
    title: string;
    items: string[];
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
  architectureShowcase: {
    eyebrow: string;
    title: string;
    description: string;
    cards: { labelEn: string; label: string; items: string[] }[];
    flowNodes: string[];
    flowCaption: string;
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
      badge: "v0.15.10 · 作品集案例页",
      tags: ["Next.js · TypeScript", "规则引擎 · AI MVP"],
      title: "出国咨询信息整理平台",
      subtitle:
        "路线规划、本地 AI 问答与多语言展示——个人作品集，呈现前端工程与产品拆解。",
      ctaPlan: "查看路线规划",
      ctaAi: "体验 AI 问答 MVP",
    },
    highlights: {
      eyebrow: "HIGHLIGHTS",
      title: "不是一个普通资讯站，而是一个完整的项目展示。",
      cards: [
        {
          title: "规则规划",
          description:
            "/plan 将预算、语言、目标和风险拆成可解释规则，生成路线建议与匹配理由。",
        },
        {
          title: "AI MVP",
          description:
            "/ai 使用本地 mock 展示 AI 产品原型、信息拆解方式和边界意识。",
        },
        {
          title: "多语言作品集",
          description:
            "中文 / 日本語 / English，为日本 IT 求职场景而设计。",
        },
        {
          title: "工程结构",
          description:
            "components、lib、docs、card-system 与 Vercel 部署共同体现工程组织能力。",
        },
      ],
    },
    interviewerFocus: {
      eyebrow: "For Interviewers",
      title: "面试官可以重点看什么",
      cards: [
        {
          title: "路线规划规则引擎",
          description:
            "/plan 将预算、语言、目标和风险拆成本地规则推荐流程，展示产品拆解与业务逻辑组织能力。",
        },
        {
          title: "本地 AI 问答 MVP",
          description:
            "/ai 当前不接真实 AI API，而是用本地 mock 展示 AI 产品原型、信息拆解和边界意识。",
        },
        {
          title: "多语言作品集展示",
          description:
            "/case-study 和核心页面支持中文 / 日本語 / English，方便日本求职场景下展示项目。",
        },
        {
          title: "设计系统与组件化",
          description:
            "统一 card-system、Navbar、Footer、ArticleCard、Plan、AI 等组件，展示前端工程组织能力。",
        },
      ],
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
      description: "内容、规划、问答与案例展示——四个模块，各自可独立演示。",
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
    technicalDecisions: {
      eyebrow: "Decisions",
      title: "关键技术决策",
      description: "以下取舍基于个人作品集的范围与迭代成本，便于面试时说明「为什么这样做」。",
      items: [
        {
          title: "为什么先做本地规则引擎，而不是后端数据库",
          body: "出国路线推荐的核心是「可解释的规则与流程」，先用 TypeScript 本地引擎验证匹配逻辑和页面交互，比先搭数据库更快迭代，也更容易在代码评审中讲清楚。",
        },
        {
          title: "为什么 /ai 当前保持 mock，而不是直接接真实 AI API",
          body: "真实 API 会引入密钥管理、成本、合规与回答不可控等问题。先用 mock 固定回答结构，验证问题拆解与 UX，再决定是否接入以及边界如何设计。",
        },
        {
          title: "为什么不做登录和付费功能",
          body: "项目目标是求职作品集，不是商业化 SaaS。登录和付费会分散精力，且与当前「本地演示、无后端」的架构不一致。",
        },
        {
          title: "为什么抽离 lib/plan、lib/ai、lib/i18n",
          body: "页面只负责组合与展示，业务逻辑按功能域放在 lib 下，便于单独阅读、测试，也避免 page.tsx 膨胀。",
        },
        {
          title: "为什么先做作品集展示，而不是商业化",
          body: "需要向面试官说明需求来源、架构取舍和工程边界。case-study 页和多语言展示优先于运营功能，更符合当前目标。",
        },
        {
          title: "为什么采用 GitHub + Vercel 迭代部署",
          body: "个人项目需要低成本、可回溯的发布方式。Git 管版本，Vercel 自动部署，改动能快速在线上验证，适合作品集持续打磨。",
        },
      ],
    },
    myRole: {
      eyebrow: "My Role",
      title: "我在项目中完成了什么",
      items: [
        "从需求拆解到页面结构设计",
        "使用 Next.js / React / TypeScript 搭建页面",
        "拆分 components、lib、docs 等目录",
        "实现 /plan 本地规则推荐流程",
        "实现 /ai 本地问答 MVP",
        "统一 Apple 风格视觉系统",
        "完成 GitHub 版本管理与 Vercel 部署",
        "补充 README、项目状态文档和多语言展示",
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
    architectureShowcase: {
      eyebrow: "ARCHITECTURE",
      title: "项目架构",
      description:
        "从页面层到业务逻辑层，展示项目整体结构与职责划分。",
      cards: [
        {
          labelEn: "PAGE LAYER",
          label: "页面层",
          items: [
            "/ 首页",
            "/articles 文章系统",
            "/plan 路线规划",
            "/ai AI 问答",
            "/case-study 作品集展示",
          ],
        },
        {
          labelEn: "COMPONENT LAYER",
          label: "组件层",
          items: [
            "Navbar",
            "Footer",
            "ArticleCard",
            "PlanForm",
            "AiChatPanel",
            "Modal",
          ],
        },
        {
          labelEn: "BUSINESS LAYER",
          label: "业务层",
          items: [
            "规则路由生成",
            "AI Mock Answer",
            "文章搜索",
            "语言切换",
            "分类过滤",
          ],
        },
        {
          labelEn: "DATA LAYER",
          label: "数据层",
          items: [
            "lib/articles.ts",
            "lib/plan",
            "lib/i18n",
            "localStorage",
            "静态数据源",
          ],
        },
      ],
      flowNodes: ["用户", "页面层", "组件层", "业务层", "数据层"],
      flowCaption:
        "项目采用页面层、组件层、业务层、数据层分离设计，提高可维护性与后续扩展能力。",
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
        "当前没有登录系统",
        "当前没有付费功能",
        "当前不保存历史记录",
        "不提供真实签证、录取或就业承诺",
        "内容仅作信息整理与作品集展示",
        "重要信息仍应以学校、使领馆、入管局和官方政策为准",
      ],
    },
    future: {
      title: "后续可以做什么",
      items: [
        "接入真实 AI 前先设计安全边界与免责声明",
        "增加测试与更完整的错误状态处理",
        "增加更多真实案例与文章内容",
        "补充日文 README 或独立面试说明文档",
        "将项目讲解整理成面试材料（架构图、演示脚本）",
        "增强 /plan 与 /ai 的上下文联动",
      ],
    },
    status: {
      eyebrow: "Status",
      title: "v0.15.10 — 导航与卡片质感统一",
      body: "Case Study 页修复 mega menu hover 区域，统一深色玻璃卡片与 Architecture 节点风格，并优化多语言可见标签。",
    },
  },
  ja: {
    hero: {
      badge: "v0.15.10 · Portfolio Case Study",
      tags: ["Next.js · TypeScript", "ルールエンジン · AI MVP"],
      title: "留学・海外生活 情報整理プラットフォーム",
      subtitle:
        "ルート計画、ローカル AI 問答、多言語展示——個人ポートフォリオとして、フロントエンドとプロダクト分解力を示します。",
      ctaPlan: "進路プランニングを見る",
      ctaAi: "AI 問答 MVP を試す",
    },
    highlights: {
      eyebrow: "HIGHLIGHTS",
      title: "単なる情報サイトではなく、完成度の高いプロジェクト展示。",
      cards: [
        {
          title: "ルールプランニング",
          description:
            "/plan は予算・語学・目標・リスクを説明可能なルールに分解し、ルート提案を生成します。",
        },
        {
          title: "AI MVP",
          description:
            "/ai はローカル mock で、AI プロトタイプ、情報分解、境界意識を示します。",
        },
        {
          title: "多言語ポートフォリオ",
          description:
            "中文 / 日本語 / English。日本 IT 就職向けの説明を想定。",
        },
        {
          title: "エンジニアリング構成",
          description:
            "components、lib、docs、card-system、Vercel デプロイで構成力を示します。",
        },
      ],
    },
    interviewerFocus: {
      eyebrow: "For Interviewers",
      title: "面接官に見てほしいポイント",
      cards: [
        {
          title: "進路プランニングのルールエンジン",
          description:
            "/plan は予算、語学、目標、リスクをローカルルールに分解し、プロダクト分解とビジネスロジック設計力を示します。",
        },
        {
          title: "ローカル AI 問答 MVP",
          description:
            "/ai は本番 AI API を使わず、mock で AI プロトタイプ、情報分解、境界意識を示します。",
        },
        {
          title: "多言語ポートフォリオ展示",
          description:
            "/case-study と主要ページは中文 / 日本語 / English に対応。日本就職向けの説明に使えます。",
        },
        {
          title: "デザインシステムとコンポーネント化",
          description:
            "card-system、Navbar、Footer、ArticleCard、Plan、AI などを統一し、フロントエンド構成力を示します。",
        },
      ],
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
    technicalDecisions: {
      eyebrow: "Decisions",
      title: "主な技術判断",
      description:
        "個人ポートフォリオのスコープとコストに基づく判断です。面接で「なぜそうしたか」を説明しやすく整理しています。",
      items: [
        {
          title: "なぜ最初に DB ではなくローカルルールエンジンか",
          body: "進路推薦の核心は説明可能なルールとフローです。TypeScript のローカルエンジンでマッチングと UI を先に検証する方が、DB より速く、コードレビューでも説明しやすいです。",
        },
        {
          title: "なぜ /ai は mock のままか",
          body: "本番 API は鍵管理、コスト、コンプライアンス、回答の不確実性を伴います。mock で構造と UX を固定してから、接続の是非と境界を決めます。",
        },
        {
          title: "なぜログイン・課金を作らないか",
          body: "目的は就職ポートフォリオであり、商用 SaaS ではありません。認証・課金は「ローカルデモ・無バックエンド」と方向がずれ、工数も分散します。",
        },
        {
          title: "なぜ lib/plan、lib/ai、lib/i18n を分離するか",
          body: "ページは組み立てのみ。ロジックを lib に置くことで、単体で読みやすく、page.tsx の肥大化も防げます。",
        },
        {
          title: "なぜ商用化よりポートフォリオ展示を優先するか",
          body: "面接官に要件の背景、アーキテクチャ判断、制約を説明する必要があります。case-study と多言語が運用機能より優先されます。",
        },
        {
          title: "なぜ GitHub + Vercel で反復デプロイするか",
          body: "個人開発には低コストで履歴が残る公開手段が必要です。Git で版管理、Vercel で自動デプロイし、変更をすぐ検証できます。",
        },
      ],
    },
    myRole: {
      eyebrow: "My Role",
      title: "このプロジェクトで担当したこと",
      items: [
        "要件分解からページ構造設計まで",
        "Next.js / React / TypeScript でページ実装",
        "components、lib、docs などのディレクトリ分割",
        "/plan のローカルルール推薦フロー実装",
        "/ai のローカル問答 MVP 実装",
        "Apple 風ビジュアルシステムの統一",
        "GitHub 版管理と Vercel デプロイ",
        "README、プロジェクト状態ドキュメント、多言語展示の整備",
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
    architectureShowcase: {
      eyebrow: "ARCHITECTURE",
      title: "プロジェクトアーキテクチャ",
      description:
        "ページ層からビジネスロジック層まで、全体構成と役割分担を示します。",
      cards: [
        {
          labelEn: "PAGE LAYER",
          label: "ページ層",
          items: [
            "/ ホーム",
            "/articles 記事システム",
            "/plan ルート計画",
            "/ai AI 問答",
            "/case-study ポートフォリオ",
          ],
        },
        {
          labelEn: "COMPONENT LAYER",
          label: "コンポーネント層",
          items: [
            "Navbar",
            "Footer",
            "ArticleCard",
            "PlanForm",
            "AiChatPanel",
            "Modal",
          ],
        },
        {
          labelEn: "BUSINESS LAYER",
          label: "ビジネス層",
          items: [
            "ルールベースルート生成",
            "AI Mock Answer",
            "記事検索",
            "言語切替",
            "カテゴリフィルタ",
          ],
        },
        {
          labelEn: "DATA LAYER",
          label: "データ層",
          items: [
            "lib/articles.ts",
            "lib/plan",
            "lib/i18n",
            "localStorage",
            "静的データソース",
          ],
        },
      ],
      flowNodes: [
        "ユーザー",
        "ページ層",
        "コンポーネント層",
        "ビジネス層",
        "データ層",
      ],
      flowCaption:
        "ページ層・コンポーネント層・ビジネス層・データ層を分離し、保守性と拡張性を高めています。",
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
        "ログインシステムなし",
        "有料機能なし",
        "履歴保存なし",
        "ビザ・合格・就業の保証は提供しない",
        "コンテンツは情報整理とポートフォリオ展示のみ",
        "重要情報は学校、大使館、入管、公式政策を優先してください",
      ],
    },
    future: {
      title: "今後できること",
      items: [
        "本番 AI 接続前に安全境界と免責事項を設計",
        "テストとエラー状態処理の充実",
        "より多くの実例コンテンツと記事の追加",
        "日本語 README や面接用説明資料の追加",
        "プロジェクト説明を面接資料（構成図、デモ手順）に整理",
        "/plan と /ai のコンテキスト連携の強化",
      ],
    },
    status: {
      eyebrow: "Status",
      title: "v0.15.10 — ナビゲーションとカード質感の統一",
      body: "Mega menu の hover 領域、ダークガラスカード、Architecture 内部カード、多言語ラベルを調整しました。",
    },
  },
  en: {
    hero: {
      badge: "v0.15.10 · Portfolio Case Study",
      tags: ["Next.js · TypeScript", "Rules · AI MVP"],
      title: "Study Abroad Information Platform",
      subtitle:
        "Route planning, local AI Q&A, and multilingual showcase—a personal portfolio for frontend and product thinking.",
      ctaPlan: "View route planning",
      ctaAi: "Try AI Q&A MVP",
    },
    highlights: {
      eyebrow: "HIGHLIGHTS",
      title: "Not a plain info site—a complete portfolio showcase.",
      cards: [
        {
          title: "Rule-based planning",
          description:
            "/plan breaks budget, language, goals, and risk into explainable rules and route suggestions.",
        },
        {
          title: "AI MVP",
          description:
            "/ai uses local mock responses to show an AI product prototype and boundary awareness.",
        },
        {
          title: "Multilingual portfolio",
          description:
            "中文 / 日本語 / English—designed for Japan IT job interviews.",
        },
        {
          title: "Engineering structure",
          description:
            "components, lib, docs, card-system, and Vercel deployment show engineering organization.",
        },
      ],
    },
    interviewerFocus: {
      eyebrow: "For Interviewers",
      title: "What Interviewers Can Focus On",
      cards: [
        {
          title: "Route planning rule engine",
          description:
            "/plan breaks budget, language, goals, and risk into a local rule-based flow—showing product decomposition and business logic organization.",
        },
        {
          title: "Local AI Q&A MVP",
          description:
            "/ai does not call a real AI API. Local mock demonstrates an AI product prototype, information breakdown, and boundary awareness.",
        },
        {
          title: "Multilingual portfolio presentation",
          description:
            "/case-study and core pages support 中文 / 日本語 / English for Japan job-application demos.",
        },
        {
          title: "Design system & componentization",
          description:
            "Unified card-system, Navbar, Footer, ArticleCard, Plan, and AI components show frontend engineering organization.",
        },
      ],
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
    technicalDecisions: {
      eyebrow: "Decisions",
      title: "Key Technical Decisions",
      description:
        "Trade-offs shaped by portfolio scope and iteration cost—written so I can explain the “why” in interviews.",
      items: [
        {
          title: "Why a local rule engine first, not a backend database",
          body: "Route recommendations depend on explainable rules and flows. A TypeScript local engine validates matching and UI faster than standing up a database, and is easier to walk through in code review.",
        },
        {
          title: "Why /ai stays mock instead of a real AI API",
          body: "A real API adds keys, cost, compliance, and unpredictable answers. Mock fixes the answer structure and UX first; connection and boundaries come later.",
        },
        {
          title: "Why no login or paid features",
          body: "The goal is a job portfolio, not commercial SaaS. Auth and billing would distract from the current local-demo, no-backend architecture.",
        },
        {
          title: "Why lib/plan, lib/ai, and lib/i18n are split out",
          body: "Pages compose only; logic lives in lib by domain for easier reading, testing, and to keep page.tsx from growing too large.",
        },
        {
          title: "Why portfolio presentation before commercialization",
          body: "Interviewers need requirements, architecture trade-offs, and boundaries explained. Case study and multilingual pages beat ops features for that goal.",
        },
        {
          title: "Why GitHub + Vercel iterative deploy",
          body: "A solo project needs low-cost, traceable releases. Git for history, Vercel for auto deploy—changes are verified online quickly while polishing the portfolio.",
        },
      ],
    },
    myRole: {
      eyebrow: "My Role",
      title: "My Role in This Project",
      items: [
        "Requirements breakdown through page structure design",
        "Built pages with Next.js / React / TypeScript",
        "Split components, lib, and docs directories",
        "Implemented /plan local rule-based recommendation flow",
        "Implemented /ai local Q&A MVP",
        "Unified Apple-style visual system",
        "GitHub versioning and Vercel deployment",
        "README, project status docs, and multilingual presentation",
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
    architectureShowcase: {
      eyebrow: "ARCHITECTURE",
      title: "Project Architecture",
      description:
        "From the page layer to business logic—how the project is structured and responsibilities are divided.",
      cards: [
        {
          labelEn: "PAGE LAYER",
          label: "Page Layer",
          items: [
            "/ Home",
            "/articles Content",
            "/plan Route planning",
            "/ai AI Q&A",
            "/case-study Portfolio",
          ],
        },
        {
          labelEn: "COMPONENT LAYER",
          label: "Component Layer",
          items: [
            "Navbar",
            "Footer",
            "ArticleCard",
            "PlanForm",
            "AiChatPanel",
            "Modal",
          ],
        },
        {
          labelEn: "BUSINESS LAYER",
          label: "Business Layer",
          items: [
            "Rule-based route generation",
            "AI Mock Answer",
            "Article search",
            "Language switching",
            "Category filtering",
          ],
        },
        {
          labelEn: "DATA LAYER",
          label: "Data Layer",
          items: [
            "lib/articles.ts",
            "lib/plan",
            "lib/i18n",
            "localStorage",
            "Static data sources",
          ],
        },
      ],
      flowNodes: [
        "User",
        "Page Layer",
        "Component Layer",
        "Business Layer",
        "Data Layer",
      ],
      flowCaption:
        "The project separates page, component, business, and data layers to improve maintainability and future extension.",
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
        "No login system",
        "No paid features",
        "No history storage",
        "No real visa, admission, or employment guarantees",
        "Content is for information organization and portfolio display only",
        "Important details should still follow schools, embassies, immigration offices, and official policy",
      ],
    },
    future: {
      title: "What can come next",
      items: [
        "Design safety boundaries and disclaimers before connecting a real AI API",
        "Add tests and more complete error-state handling",
        "Expand real case content and articles",
        "Add a Japanese README or dedicated interview brief",
        "Turn project walkthrough into interview materials (diagrams, demo script)",
        "Strengthen context linking between /plan and /ai",
      ],
    },
    status: {
      eyebrow: "Status",
      title: "v0.15.10 — Navigation and card system polish",
      body: "Case study now refines the mega menu hover area, dark glass card system, architecture card consistency, and multilingual labels.",
    },
  },
};
