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
      badge: "v0.16.0 · 作品集案例页",
      tags: ["Next.js · TypeScript", "规则引擎 · AI MVP"],
      title: "出国咨询信息整理平台",
      subtitle:
        "这是一个面向日本 IT 求职展示的个人作品集项目，围绕内容整理、路线规划、本地 AI 问答和多语言展示，呈现前端工程、产品拆解与 AI 应用理解能力。",
      ctaPlan: "查看路线规划",
      ctaAi: "体验 AI 问答 MVP",
    },
    highlights: {
      eyebrow: "HIGHLIGHTS",
      title: "面试官 30 秒能抓住的四个重点。",
      cards: [
        {
          title: "规则规划引擎",
          description:
            "将预算、语言、目标和风险拆成可解释规则，生成路线建议，而不是直接给出不可解释结论。",
        },
        {
          title: "本地 AI 问答 MVP",
          description:
            "不接真实 API，先用 mock 验证问答交互、信息拆解和边界提示。",
        },
        {
          title: "多语言作品集",
          description:
            "支持中文 / 日本語 / English，降低日本面试官理解成本。",
        },
        {
          title: "工程结构展示",
          description:
            "通过 components、lib、docs、card-system 分层组织代码，展示可维护性。",
        },
      ],
    },
    interviewerFocus: {
      eyebrow: "For Interviewers",
      title: "面试官重点看什么",
      cards: [
        {
          title: "我如何拆解需求",
          description:
            "从用户焦虑点出发，把出国问题拆成目标、预算、语言、风险等可核对模块。面试价值：证明你能把模糊需求变成可实现的页面和功能。",
        },
        {
          title: "我如何设计边界",
          description:
            "明确不接真实 AI、不保存历史、不做签证/就业承诺。面试价值：说明你有产品安全意识，不会为堆功能忽略风险。",
        },
        {
          title: "我如何组织代码",
          description:
            "页面负责组合，业务逻辑放在 lib/plan、lib/ai、lib/i18n，UI token 集中在 card-system。面试价值：代码可读、可维护、便于讲解。",
        },
        {
          title: "我如何持续迭代",
          description:
            "从内容 MVP → /plan → /ai → case-study，每阶段有版本记录和文档。面试价值：证明你能独立推进、控制范围、留下可追溯交付。",
        },
      ],
    },
    background: {
      eyebrow: "Background",
      title: "项目背景",
      cardTitle: "解决什么问题",
      paragraphs: [
        "准备出国的人常面对分散的信息：国家怎么选、预算够不够、语言要不要先学、签证怎么准备。很多人只看结论，却不理解预算、语言、签证和风险之间的关系。",
        "本项目不是替代中介或给出官方承诺，而是把信息整理成结构化流程，帮助用户先问对问题。当前版本定位为个人作品集 MVP，重点展示工程实现、产品拆解和面试讲解能力，而非商业化运营。",
      ],
    },
    features: {
      eyebrow: "Features",
      title: "核心功能",
      description: "每个模块都能独立演示，并对应一项可在面试中说明的工程能力。",
      cards: [
        {
          title: "内容文章系统",
          description:
            "文章列表、分类、详情与搜索筛选。面试价值：展示内容组织和本地数据管理能力。",
        },
        {
          title: "/plan 路线规划",
          description:
            "基于预算、语言、目标与风险的本地规则推荐。面试价值：展示规则逻辑、条件判断和结果解释能力。",
        },
        {
          title: "/ai 本地问答 MVP",
          description:
            "将问题拆成目标、预算、语言与风险，本地 mock 生成结构化回答。面试价值：展示 AI 产品原型、边界说明和交互设计。",
        },
        {
          title: "/case-study 作品集展示",
          description:
            "说明项目背景、技术取舍、个人职责与边界。面试价值：展示项目复盘、工程表达和求职展示能力。",
        },
      ],
    },
    technicalDecisions: {
      eyebrow: "Decisions",
      title: "关键技术决策",
      description: "采用「决策 / 原因 / 结果」结构，便于面试时说明为什么这样做。",
      items: [
        {
          title: "决策：为什么使用本地规则引擎",
          body: "原因：路线推荐需要可解释，面试时要讲清输入→匹配→输出。结果：用 TypeScript 本地引擎快速验证流程，比先搭数据库更易演示和维护。",
        },
        {
          title: "决策：为什么 AI 问答先用 mock",
          body: "原因：真实 API 带来成本、密钥、合规和回答不可控。结果：先用 mock 固定回答结构，验证交互与信息拆解，再决定是否接入。",
        },
        {
          title: "决策：为什么暂时不做登录和数据库",
          body: "原因：当前无用户系统和历史持久化需求，目标是作品集 MVP。结果：降低后端复杂度，把精力放在前端工程和产品拆解展示上。",
        },
        {
          title: "决策：为什么做多语言",
          body: "原因：目标是在日本 IT 求职，面试官可能不懂中文。结果：Case Study 和核心页面支持三语言，降低理解成本，也体现 i18n 工程能力。",
        },
        {
          title: "决策：为什么抽象 card-system",
          body: "原因：多页面需要统一视觉，避免每页重复写 class。结果：lib/ui/card-system.ts 集中管理 token，提升一致性和维护效率。",
        },
      ],
    },
    myRole: {
      eyebrow: "My Role",
      title: "我在这个项目中负责什么",
      items: [
        "页面结构设计与实现（个人独立完成）",
        "文章系统与分类页面",
        "/plan 路线规划交互与结果展示",
        "/ai 本地问答 MVP",
        "/case-study 作品集展示页",
        "多语言内容结构（中文 / 日本語 / English）",
        "README、项目状态文档、面试讲解稿",
        "GitHub 版本管理与 Vercel 部署",
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
      description: "技术栈不只是罗列工具，而是说明「我用它解决了什么问题」。",
      items: [
        {
          title: "Next.js",
          body: "负责 App Router 页面组织、静态页面生成和 Vercel 部署适配。",
        },
        {
          title: "TypeScript",
          body: "约束文章数据、多语言文案、路线规划配置和组件 props，减少重构风险。",
        },
        {
          title: "Tailwind CSS",
          body: "快速建立统一视觉系统和响应式布局，配合 card-system 保持一致性。",
        },
        {
          title: "Git / GitHub",
          body: "记录版本演进、阶段提交，作为作品集公开源码和面试后查阅入口。",
        },
        {
          title: "Vercel",
          body: "提供在线部署和稳定访问地址，方便面试现场演示和远程查看。",
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
        "从页面层到业务逻辑层，展示项目整体结构与职责划分。这个结构不是为了复杂而复杂，而是让页面、组件、规则逻辑和文档各自负责不同职责。",
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
        "页面、组件、规则逻辑和文档分层协作——提高可维护性，也为后续扩展留出空间。",
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
        "不接真实 AI API",
        "不保存用户历史",
        "不提供签证 / 求职 / 移民承诺",
        "内容仅用于信息整理与作品集展示",
        "重要信息仍应以学校、使领馆、入管局和官方政策为准",
      ],
    },
    future: {
      title: "后续计划",
      items: [
        "接入真实 AI 前先设计安全边界",
        "增加测试用例",
        "补充更多真实文章案例",
        "增加英文 / 日文 README",
        "增强 /plan 与 /ai 联动",
        "如果产品化，再考虑登录、数据库和权限",
      ],
    },
    status: {
      eyebrow: "Status",
      title: "v0.16.0 — 面试官视角优化",
      body: "本版本将 Case Study 从「功能展示」升级为「面试讲解型项目展示」，重点说明问题背景、技术取舍、个人职责、项目边界和后续计划。",
    },
  },
  ja: {
    hero: {
      badge: "v0.16.0 · ポートフォリオ Case Study",
      tags: ["Next.js · TypeScript", "ルールエンジン · AI MVP"],
      title: "留学・海外生活 情報整理プラットフォーム",
      subtitle:
        "日本 IT 就職向けの個人ポートフォリオです。情報整理、ルート計画、ローカル AI 問答、多言語展示を通じて、フロントエンド実装、プロダクト分解、AI 活用の理解を示します。",
      ctaPlan: "進路プランニングを見る",
      ctaAi: "AI 問答 MVP を試す",
    },
    highlights: {
      eyebrow: "HIGHLIGHTS",
      title: "面接官が 30 秒で把握できる 4 つの要点。",
      cards: [
        {
          title: "ルールプランニングエンジン",
          description:
            "予算・語学・目標・リスクを説明可能なルールに分解し、ブラックボックスではないルート提案を生成します。",
        },
        {
          title: "ローカル AI 問答 MVP",
          description:
            "本番 API は未接続。mock で問答 UI、情報分解、境界提示を先に検証します。",
        },
        {
          title: "多言語ポートフォリオ",
          description:
            "中文 / 日本語 / English に対応。日本の面接官の理解コストを下げます。",
        },
        {
          title: "エンジニアリング構成",
          description:
            "components、lib、docs、card-system でレイヤー分けし、保守性を示します。",
        },
      ],
    },
    interviewerFocus: {
      eyebrow: "For Interviewers",
      title: "面接官に見てほしいポイント",
      cards: [
        {
          title: "要件の分解方法",
          description:
            "ユーザーの不安から、目標・予算・語学・リスクなど検証可能なモジュールに分解。面接価値：曖昧な要件を実装可能な機能に落とせること。",
        },
        {
          title: "境界の設計",
          description:
            "本番 AI 未接続、履歴保存なし、ビザ・就業の保証なしを明示。面接価値：機能追加より安全意識を優先できること。",
        },
        {
          title: "コードの整理",
          description:
            "ページは組み立て、lib/plan・lib/ai・lib/i18n にロジック、card-system に UI token。面接価値：読みやすく説明しやすい構成。",
        },
        {
          title: "継続的な改善",
          description:
            "コンテンツ MVP → /plan → /ai → case-study と段階的に進め、各版を記録。面接価値：独立してスコープを管理し、成果を残せること。",
        },
      ],
    },
    background: {
      eyebrow: "Background",
      title: "プロジェクト背景",
      cardTitle: "どんな課題に向き合うか",
      paragraphs: [
        "留学を考える人は、国選び、予算、語学、ビザなど情報が分散しています。結論だけ見て、予算・語学・ビザ・リスクの関係を理解しないケースが多いです。",
        "本プロジェクトは仲介の代替や公式保証ではなく、情報を構造化したフローに整理することを目的とします。現版は個人ポートフォリオ MVP で、商用運用ではなく実装力と面接説明力を示します。",
      ],
    },
    features: {
      eyebrow: "Features",
      title: "主要機能",
      description:
        "各モジュールは独立してデモでき、面接で説明できる工程能力に対応します。",
      cards: [
        {
          title: "コンテンツ記事システム",
          description:
            "記事一覧、カテゴリ、詳細、検索・フィルタ。面接価値：コンテンツ整理とローカルデータ管理。",
        },
        {
          title: "/plan 進路プランニング",
          description:
            "予算・語学・目標・リスクに基づくローカルルール推薦。面接価値：ルールロジック、条件分岐、結果の説明。",
        },
        {
          title: "/ai ローカル問答 MVP",
          description:
            "質問を目標・予算・語学・リスクに分解し、mock で構造化回答。面接価値：AI プロトタイプ、境界設計、UI 設計。",
        },
        {
          title: "/case-study ポートフォリオ展示",
          description:
            "背景、技術判断、担当範囲、制約を説明。面接価値：振り返り、技術説明、就職向け展示力。",
        },
      ],
    },
    technicalDecisions: {
      eyebrow: "Decisions",
      title: "主な技術判断",
      description:
        "「判断 / 理由 / 結果」の形式で、面接で説明しやすく整理しています。",
      items: [
        {
          title: "判断：なぜローカルルールエンジンか",
          body: "理由：ルート推薦は説明可能である必要がある。結果：TypeScript ローカルエンジンでフローを先に検証。DB よりデモと保守が容易。",
        },
        {
          title: "判断：なぜ AI は mock からか",
          body: "理由：本番 API はコスト、鍵、コンプライアンス、回答の不確実性がある。結果：mock で構造と UX を固定してから接続を判断。",
        },
        {
          title: "判断：なぜログイン・DB を作らないか",
          body: "理由：ユーザー管理や履歴保存の要件がなく、ポートフォリオ MVP が目的。結果：バックエンドを抑え、フロントとプロダクト分解に集中。",
        },
        {
          title: "判断：なぜ多言語対応か",
          body: "理由：日本 IT 就職向けで、面接官が中文を読めない場合がある。結果：Case Study と主要ページを 3 言語化し、i18n 能力も示す。",
        },
        {
          title: "判断：なぜ card-system を抽象化するか",
          body: "理由：複数ページで統一 UI が必要。結果：lib/ui/card-system.ts に token を集約し、一貫性と保守性を向上。",
        },
      ],
    },
    myRole: {
      eyebrow: "My Role",
      title: "このプロジェクトで担当したこと",
      items: [
        "ページ構造の設計と実装（個人で完遂）",
        "記事システムとカテゴリページ",
        "/plan の進路プランニング UI と結果表示",
        "/ai ローカル問答 MVP",
        "/case-study ポートフォリオページ",
        "多言語コンテンツ構造（中文 / 日本語 / English）",
        "README、プロジェクト状態、面接説明稿",
        "GitHub 版管理と Vercel デプロイ",
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
        "技術スタックはツール列挙ではなく、「何の課題をどう解決したか」を示します。",
      items: [
        {
          title: "Next.js",
          body: "App Router のページ構成、静的生成、Vercel デプロイへの適合を担当。",
        },
        {
          title: "TypeScript",
          body: "記事データ、多言語文案、ルート設定、コンポーネント props を型で拘束。",
        },
        {
          title: "Tailwind CSS",
          body: "統一 UI とレスポンシブレイアウトを迅速に構築。card-system と連携。",
        },
        {
          title: "Git / GitHub",
          body: "版の記録、段階的コミット、公開ソースと面接後の参照入口。",
        },
        {
          title: "Vercel",
          body: "オンラインデプロイと安定 URL。面接デモとリモート閲覧に使用。",
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
        "ページ層からビジネスロジック層まで、全体構成と役割分担を示します。複雑さのためではなく、ページ・コンポーネント・ルール・ドキュメントがそれぞれの責務を持つための構造です。",
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
        "ページ、コンポーネント、ルール、ドキュメントが分担協力——保守性を高め、将来の拡張余地も確保。",
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
        "ユーザー履歴は保存しない",
        "ビザ・就職・移民の保証は提供しない",
        "コンテンツは情報整理とポートフォリオ展示のみ",
        "重要情報は学校、大使館、入管、公式政策を優先してください",
      ],
    },
    future: {
      title: "今後の計画",
      items: [
        "本番 AI 接続前に安全境界を設計",
        "テストケースを追加",
        "より多くの実例記事を追加",
        "英語 / 日本語 README を追加",
        "/plan と /ai の連携を強化",
        "プロダクト化する場合のみ、ログイン・DB・権限を検討",
      ],
    },
    status: {
      eyebrow: "Status",
      title: "v0.16.0 — 面接官視点の最適化",
      body: "Case Study を「機能展示」から「面接説明型のプロジェクト展示」へ。背景、技術判断、担当範囲、制約、今後の計画を重点的に説明します。",
    },
  },
  en: {
    hero: {
      badge: "v0.16.0 · Portfolio Case Study",
      tags: ["Next.js · TypeScript", "Rules · AI MVP"],
      title: "Study Abroad Information Platform",
      subtitle:
        "A personal portfolio for Japan IT job applications. It showcases content organization, route planning, local AI Q&A, and multilingual presentation—frontend engineering, product breakdown, and AI boundary design.",
      ctaPlan: "View route planning",
      ctaAi: "Try AI Q&A MVP",
    },
    highlights: {
      eyebrow: "HIGHLIGHTS",
      title: "Four points an interviewer can grasp in 30 seconds.",
      cards: [
        {
          title: "Rule-based planning engine",
          description:
            "Breaks budget, language, goals, and risk into explainable rules—not black-box conclusions.",
        },
        {
          title: "Local AI Q&A MVP",
          description:
            "No real API yet. Mock validates Q&A flow, information breakdown, and boundary messaging.",
        },
        {
          title: "Multilingual portfolio",
          description:
            "中文 / 日本語 / English—lowers the barrier for Japanese interviewers.",
        },
        {
          title: "Engineering structure",
          description:
            "Layers code across components, lib, docs, and card-system to show maintainability.",
        },
      ],
    },
    interviewerFocus: {
      eyebrow: "For Interviewers",
      title: "What Interviewers Should Look For",
      cards: [
        {
          title: "How I break down requirements",
          description:
            "Start from user anxiety and split study-abroad questions into verifiable modules: goals, budget, language, risk. Interview value: turning vague needs into shippable features.",
        },
        {
          title: "How I design boundaries",
          description:
            "No real AI, no history storage, no visa or job guarantees. Interview value: product safety over feature stacking.",
        },
        {
          title: "How I organize code",
          description:
            "Pages compose; lib/plan, lib/ai, lib/i18n hold logic; card-system holds UI tokens. Interview value: readable, explainable structure.",
        },
        {
          title: "How I iterate",
          description:
            "Content MVP → /plan → /ai → case-study, each version documented. Interview value: independent delivery with controlled scope.",
        },
      ],
    },
    background: {
      eyebrow: "Background",
      title: "Project background",
      cardTitle: "What problem it addresses",
      paragraphs: [
        "People preparing to go abroad face scattered information: country choice, budget, language, visa prep. Many read conclusions without understanding how budget, language, visa, and risk relate.",
        "This project does not replace agencies or make official promises. It organizes information into structured flows. The current release is a portfolio MVP focused on engineering and interview storytelling—not commercial operation.",
      ],
    },
    features: {
      eyebrow: "Features",
      title: "Core features",
      description:
        "Each module demos independently and maps to an engineering skill you can discuss in interviews.",
      cards: [
        {
          title: "Content & articles",
          description:
            "List, categories, detail pages, search and filters. Interview value: content organization and local data management.",
        },
        {
          title: "/plan route planning",
          description:
            "Local rules from budget, language, goals, and risk. Interview value: rule logic, condition checks, and explainable results.",
        },
        {
          title: "/ai local Q&A MVP",
          description:
            "Breaks questions into goals, budget, language, and risk; mock generates structured answers. Interview value: AI prototype, boundaries, and interaction design.",
        },
        {
          title: "/case-study portfolio page",
          description:
            "Background, trade-offs, my role, and limits. Interview value: project recap, technical communication, and portfolio presentation.",
        },
      ],
    },
    technicalDecisions: {
      eyebrow: "Decisions",
      title: "Key Technical Decisions",
      description:
        "Structured as decision / reason / outcome—easy to explain in interviews.",
      items: [
        {
          title: "Decision: why a local rule engine",
          body: "Reason: route recommendations must be explainable (input → match → output). Outcome: TypeScript local engine validates the flow faster than standing up a database.",
        },
        {
          title: "Decision: why AI stays mock-first",
          body: "Reason: real APIs add cost, keys, compliance, and unpredictable answers. Outcome: mock fixes structure and UX before deciding whether to connect.",
        },
        {
          title: "Decision: why no login or database yet",
          body: "Reason: no user system or history persistence needed; goal is a portfolio MVP. Outcome: less backend complexity; focus on frontend and product breakdown.",
        },
        {
          title: "Decision: why multilingual",
          body: "Reason: targeting Japan IT jobs; interviewers may not read Chinese. Outcome: case study and core pages in three languages; demonstrates i18n engineering.",
        },
        {
          title: "Decision: why abstract card-system",
          body: "Reason: multiple pages need consistent UI without repeating classes. Outcome: lib/ui/card-system.ts centralizes tokens for consistency and maintenance.",
        },
      ],
    },
    myRole: {
      eyebrow: "My Role",
      title: "What I Owned in This Project",
      items: [
        "Page structure design and implementation (solo)",
        "Article system and category pages",
        "/plan route planning UI and results",
        "/ai local Q&A MVP",
        "/case-study portfolio page",
        "Multilingual content structure (中文 / 日本語 / English)",
        "README, project status docs, and interview guide",
        "GitHub versioning and Vercel deployment",
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
        "The stack is not a tool list—it shows what problem each choice solved.",
      items: [
        {
          title: "Next.js",
          body: "App Router page organization, static pages, and Vercel deployment fit.",
        },
        {
          title: "TypeScript",
          body: "Types for articles, i18n copy, route config, and component props—safer refactors.",
        },
        {
          title: "Tailwind CSS",
          body: "Fast unified visual system and responsive layout, paired with card-system tokens.",
        },
        {
          title: "Git / GitHub",
          body: "Version history, phased commits, public source for post-interview review.",
        },
        {
          title: "Vercel",
          body: "Online deploy and stable URL for live demos and remote viewing.",
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
        "From the page layer to business logic—how responsibilities are divided. The structure is not complexity for its own sake; pages, components, rules, and docs each own a clear role.",
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
        "Pages, components, rules, and docs work in layers—better maintainability and room to extend later.",
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
        "No user history stored",
        "No visa, job, or immigration guarantees",
        "Content for information organization and portfolio display only",
        "Important details should still follow schools, embassies, immigration offices, and official policy",
      ],
    },
    future: {
      title: "What comes next",
      items: [
        "Design safety boundaries before connecting a real AI API",
        "Add test cases",
        "Expand real article examples",
        "Add English and Japanese README files",
        "Strengthen /plan and /ai linkage",
        "If productized later: login, database, and permissions",
      ],
    },
    status: {
      eyebrow: "Status",
      title: "v0.16.0 — Interviewer-focused refresh",
      body: "Case Study upgraded from feature showcase to interview-oriented project presentation—background, trade-offs, my role, boundaries, and next steps.",
    },
  },
};
