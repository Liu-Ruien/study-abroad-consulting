import type { Language } from "./language";

export type SiteContent = {
  home: {
    badge: string;
    title: string;
    subtitle: string;
    ctaCaseStudy: string;
    ctaArticles: string;
    ctaAbout: string;
    languageHint: string;
    categoriesTitle: string;
    categoriesDescription: string;
    categoryCardDescription: (name: string) => string;
    featuredTitle: string;
    featuredDescription: string;
    featuredViewAll: string;
  };
  articles: {
    title: string;
    description: string;
    searchPlaceholder: string;
    clear: string;
    all: string;
    resultCount: (count: number) => string;
    empty: string;
  };
  about: {
    title: string;
    intro: string;
    positioningTitle: string;
    positioningParagraphs: [string, string];
    categoriesTitle: string;
    disclaimerTitle: string;
    disclaimer: string;
    portfolioNote: string;
  };
  categoryPage: {
    unknownCategory: string;
    articleCount: (count: number) => string;
    empty: string;
  };
  articleDetail: {
    backLink: string;
    categoryLabel: string;
    readTimeLabel: string;
  };
  ai: {
    badge: string;
    title: string;
    titleLine2: string;
    description: string;
    previewKicker: string;
    previewTitle: string;
    previewBody: string;
    focusCards: { title: string; description: string }[];
    inputLabel: string;
    inputPlaceholder: string;
    submit: string;
    submitting: string;
    reset: string;
    emptyError: string;
    loadingBadge: string;
    loadingTitle: string;
    loadingBody: string;
    previewBadge: string;
    previewStructureTitle: string;
    previewStructureBody: string;
    previewCards: { label: string; hint: string }[];
    disclaimerLabel: string;
    disclaimer: string;
    quickQuestions: string[];
  };
  plan: {
    badge: string;
    title: string;
    description: string;
    steps: { label: string; value: string }[];
    empty: {
      kicker: string;
      title: string;
      description: string;
      cards: { step: string; title: string; desc: string }[];
      reminder: string;
    };
    result: {
      workbench: string;
      generated: string;
      outdated: string;
      heading: string;
      viewInsight: string;
      recommendTab: (index: number, country: string) => string;
      matchScore: string;
      matchScoreHint: string;
      matchReasons: string;
      askAi: string;
      viewDetail: string;
      relatedArticles: string;
      actionsKicker: string;
      actionsTitle: string;
      generatedAt: (time: string) => string;
      copySummary: string;
      printPdf: string;
      disclaimerLabel: string;
      disclaimer: string;
      noRoutesKicker: string;
      noRoutesTitle: string;
      noRoutesBody: string;
      noRoutesBoxTitle: string;
      noRoutesAdvice: string;
      noRoutesCta: string;
      copyInfo: string;
    };
    form: {
      summaryKicker: string;
      summaryTitle: string;
      summaryHint: string;
      outdatedWarning: string;
      formTitle: string;
      formHint: string;
      sections: {
        basic: { title: string; description: string };
        preference: { title: string; description: string };
        goal: { title: string; description: string };
      };
      labels: {
        age: string;
        education: string;
        major: string;
        budget: string;
        language: string;
        countryPreference: string;
        targetCountry: string;
        partTime: string;
        longTerm: string;
        lowBudget: string;
      };
      placeholders: {
        age: string;
        education: string;
        major: string;
      };
      targetCountryHelper: string;
      notFilled: string;
      ageSuffix: string;
      generate: string;
      regenerating: string;
      regenerate: string;
      resetAll: string;
      reset: string;
    };
    errors: {
      age: string;
      education: string;
    };
    copy: {
      success: string;
      failed: string;
    };
    modal: {
      resetTitle: string;
      resetBody: string;
      cancel: string;
      confirmReset: string;
    };
    risk: {
      low: string;
      medium: string;
      high: string;
    };
  };
};

export const pageContent: Record<Language, SiteContent> = {
  zh: {
    home: {
      badge: "个人开发项目 · 作品集展示",
      title: "出国咨询信息整理平台",
      subtitle:
        "围绕内容文章、路线规划、本地 AI 问答 MVP 和项目案例展示，呈现信息整理、产品拆解、前端工程与 AI 应用理解能力。",
      ctaCaseStudy: "查看项目案例",
      ctaArticles: "浏览全部文章",
      ctaAbout: "了解本站",
      languageHint:
        "项目案例页已提供中文 / 日本語 / English 展示，方便求职与面试说明。",
      categoriesTitle: "内容分类",
      categoriesDescription: "按主题快速找到你需要的出国信息。",
      categoryCardDescription: (name) =>
        `查看 ${name} 相关的基础信息和实用指南。`,
      featuredTitle: "推荐阅读",
      featuredDescription: "先从这些基础文章开始了解出国准备。",
      featuredViewAll: "查看全部 →",
    },
    articles: {
      title: "全部文章",
      description: "搜索与分类筛选出国相关指南，内容仅供信息整理参考。",
      searchPlaceholder: "搜索文章，例如：日本、签证、生活成本",
      clear: "清空",
      all: "全部",
      resultCount: (count) => `当前共找到 ${count} 篇文章`,
      empty: "没有找到相关文章，请尝试更换关键词或分类。",
    },
    about: {
      title: "关于本站",
      intro:
        "「出国咨询」是个人开发的出国信息整理平台，也是面向日本 IT 求职的作品集项目之一。本站把分散的留学、签证与海外生活信息结构化呈现，并配合路线规划、本地 AI 问答 MVP 与项目案例页，展示工程实现与产品思路。",
      positioningTitle: "网站定位",
      positioningParagraphs: [
        "本站目前聚焦日本留学与新西兰留学两大方向，同时覆盖签证材料准备、落地后的银行卡与租房等海外生活话题。所有内容以实用为导向，力求语言清晰、结构分明。",
        "项目采用 Next.js 构建，文章数据暂存于本地 TypeScript 文件，不依赖数据库与第三方服务，便于快速迭代与作品集演示。",
      ],
      categoriesTitle: "内容分类",
      disclaimerTitle: "免责声明",
      disclaimer:
        "本站内容仅供参考，不构成任何法律、移民或留学申请建议。各国政策、院校要求与费用标准可能随时变化，请以官方机构、使领馆及院校发布的最新信息为准。本站为作品集演示项目，不提供签证、移民、录取或就业承诺。",
      portfolioNote:
        "本项目为个人作品集，用于展示前端工程、产品拆解与信息架构能力，非商业化运营。",
    },
    categoryPage: {
      unknownCategory: "未知分类",
      articleCount: (count) => `当前分类下共有 ${count} 篇文章`,
      empty: "当前分类下暂无文章。",
    },
    articleDetail: {
      backLink: "← 返回全部文章",
      categoryLabel: "分类",
      readTimeLabel: "阅读时间",
    },
    ai: {
      badge: "v0.9.2 · 本地模拟 AI 问答 MVP",
      title: "先把问题问清楚。",
      titleLine2: "再决定下一步。",
      description:
        "这是一个面向出国规划场景的本地模拟问答 MVP，用于展示信息拆解、组件化前端与产品设计能力。",
      previewKicker: "模拟回答预览",
      previewTitle: "预算和目标要一起判断",
      previewBody:
        "本地规则会把问题拆成目标、预算、语言和风险，再给出可继续核实的下一步。",
      focusCards: [
        {
          title: "目标",
          description: "先判断你要留学、工作、短期体验，还是长期发展。",
        },
        {
          title: "预算",
          description: "把学费、生活费、保证金和应急金拆开计算。",
        },
        {
          title: "风险",
          description: "提前看见签证、语言、就业和政策变化的不确定性。",
        },
      ],
      inputLabel: "输入你的出国问题",
      inputPlaceholder: "例如：预算 15 万人民币适合哪些出国路线？",
      submit: "生成模拟回答",
      submitting: "正在整理回答...",
      reset: "重新开始",
      emptyError: "请先输入你想了解的问题。",
      loadingBadge: "正在整理回答",
      loadingTitle: "正在根据你的问题生成初步建议",
      loadingBody:
        "当前为本地模拟逻辑，用于演示 AI 问答场景下的信息拆解，不调用真实 API，也不会保存问题历史。",
      previewBadge: "回答结构预览",
      previewStructureTitle: "一个问题，会被拆成三个部分。",
      previewStructureBody:
        "你可以询问留学、语言学校、预算、路线选择、求职准备或签证风险。本 MVP 用 Next.js + TypeScript 组件化实现，仅做本地规则整理，不接真实 AI。",
      previewCards: [
        { label: "结论", hint: "先看清楚，再继续核实。" },
        { label: "建议", hint: "先看清楚，再继续核实。" },
        { label: "风险", hint: "先看清楚，再继续核实。" },
      ],
      disclaimerLabel: "使用边界：",
      disclaimer:
        "本页为作品集演示，使用本地模拟逻辑，不接真实 AI，不保存历史记录，不提供签证、移民、录取或就业承诺。重要信息请以学校、使领馆、入管局及官方政策为准。",
      quickQuestions: [
        "日本语言学校期间应该怎么准备 IT 求职？",
        "预算 15 万人民币适合哪些出国路线？",
        "英语不好还能出国吗？",
        "留学、打工度假和工签路线有什么区别？",
      ],
    },
    plan: {
      badge: "v0.5.2 · 出国路线决策工作台",
      title: "先看清方向，再决定路线。",
      description:
        "输入基础情况，获得本地规则生成的路线建议、风险提示和下一步行动清单。",
      steps: [
        { label: "输入", value: "基础条件" },
        { label: "分析", value: "路线匹配" },
        { label: "输出", value: "规划报告" },
      ],
      empty: {
        kicker: "开始规划前",
        title: "你的路线建议会显示在这里",
        description:
          "填写左侧信息后，系统会根据当前规则推荐 3 条出国路线。当前版本用于帮助你快速建立方向，不代表最终申请结论。",
        cards: [
          {
            step: "1",
            title: "填写基本情况",
            desc: "年龄、学历、专业、预算和语言能力。",
          },
          {
            step: "2",
            title: "生成路线建议",
            desc: "系统会给出路线、优势、风险和下一步建议。",
          },
          {
            step: "3",
            title: "保存规划结果",
            desc: "你可以复制摘要，也可以打印保存为 PDF。",
          },
        ],
        reminder:
          "提醒：当前结果由本地规则生成，适合作为初步筛选工具。真实申请前仍需进一步核对政策和个人条件。",
      },
      result: {
        workbench: "路线结果工作台",
        generated: "已根据最新信息生成",
        outdated: "信息已修改，需重新生成",
        heading: "先看最适合你的路线，再切换查看其他备选方案",
        viewInsight: "查看整体分析",
        recommendTab: (index, country) => `推荐 ${index} · ${country}`,
        matchScore: "适合指数",
        matchScoreHint:
          "适合指数表示该路线与你当前目标、预算和基础条件的匹配程度，不代表录取、签证或就业成功率。",
        matchReasons: "匹配原因",
        askAi: "带着这条路线问 AI",
        viewDetail: "查看详细内容",
        relatedArticles: "推荐阅读",
        actionsKicker: "结果操作",
        actionsTitle: "保存你的路线规划结果",
        generatedAt: (time) => `生成时间：${time}`,
        copySummary: "复制结果摘要",
        printPdf: "打印 / 保存 PDF",
        disclaimerLabel: "重要提示：",
        disclaimer:
          "当前结果是基于本地规则生成的初步建议，不构成签证、移民、法律或就业承诺。涉及政策、签证、学校和费用的信息，请以官方机构和最新资料为准。",
        noRoutesKicker: "暂未匹配到明确路线",
        noRoutesTitle: "当前不建议直接选择具体路线",
        noRoutesBody:
          "根据你填写的信息，当前条件存在较高不确定性。建议先提升语言能力、明确职业或学习方向，并重新评估预算和目标国家可行性，再生成具体路线建议。",
        noRoutesBoxTitle: "建议先做一对一可行性评估",
        noRoutesAdvice:
          "如果你仍然希望继续了解出国可能性，建议先由人工根据年龄、学历、预算、语言能力、目标国家和家庭情况进行单独判断，避免盲目申请、盲目缴费或选择不适合自己的路线。",
        noRoutesCta: "了解一对一评估",
        copyInfo: "先复制当前信息",
      },
      form: {
        summaryKicker: "已填写信息摘要",
        summaryTitle: "当前路线基于这些信息生成",
        summaryHint:
          "点击可编辑的信息项即可单独修改。修改后需要重新生成路线建议。",
        outdatedWarning:
          "你已经修改了左侧信息，右侧路线仍是上一次生成的结果。请点击“重新生成路线建议”更新结果。",
        formTitle: "填写你的基本情况",
        formHint:
          "先填写必填信息，再按需要展开偏好设置。右侧结果只会在你点击生成后更新。",
        sections: {
          basic: { title: "基础信息", description: "先填写年龄、学历和专业方向。" },
          preference: {
            title: "路线偏好",
            description: "预算、语言和目标国家会直接影响推荐结果。",
          },
          goal: {
            title: "长期规划",
            description: "如果暂时不确定，可以保持默认。",
          },
        },
        labels: {
          age: "年龄",
          education: "学历背景",
          major: "专业方向",
          budget: "预算区间",
          language: "语言能力",
          countryPreference: "国家 / 地区偏好",
          targetCountry: "目标国家偏好",
          partTime: "是否希望边学习边打工？",
          longTerm: "是否希望未来长期留在海外？",
          lowBudget: "是否接受低预算过渡路线？",
        },
        placeholders: {
          age: "例如：22",
          education: "例如：本科 / 大专 / 高中 / 已工作",
          major: "例如：软件工程 / 护理 / 机械 / 无明确方向",
        },
        targetCountryHelper:
          "目标国家选项会根据上方的国家 / 地区偏好自动筛选；如果还没确定，就保持默认。",
        notFilled: "未填写",
        ageSuffix: "岁左右",
        generate: "生成路线建议",
        regenerating: "正在生成路线...",
        regenerate: "重新生成路线建议",
        resetAll: "重置全部信息",
        reset: "重置",
      },
      errors: {
        age: "请填写有效年龄，建议范围为 16 - 65 岁。",
        education: "请先填写当前学历和专业方向 / 工作方向。",
      },
      copy: {
        success: "路线规划摘要已复制",
        failed: "复制失败，请手动复制页面内容",
      },
      modal: {
        resetTitle: "确认重置？",
        resetBody: "这会清空已填写信息和当前路线结果。",
        cancel: "取消",
        confirmReset: "确认重置",
      },
      risk: {
        low: "路线难度较低",
        medium: "路线难度中等",
        high: "路线难度较高",
      },
    },
  },
  ja: {
    home: {
      badge: "個人開発 · ポートフォリオ",
      title: "留学・海外生活 情報整理プラットフォーム",
      subtitle:
        "記事、進路プランニング、ローカル AI 問答 MVP、事例紹介を通じて、情報整理、プロダクト設計、フロントエンド実装、AI 活用理解を示します。",
      ctaCaseStudy: "事例紹介を見る",
      ctaArticles: "記事一覧",
      ctaAbout: "概要",
      languageHint:
        "事例紹介ページは中文 / 日本語 / English に対応。就職・面接向けの説明に利用できます。",
      categoriesTitle: "カテゴリ",
      categoriesDescription: "テーマ別に必要な留学情報を探せます。",
      categoryCardDescription: (name) =>
        `${name} に関する基本情報と実用ガイドを見る。`,
      featuredTitle: "おすすめ記事",
      featuredDescription: "まずはこれらの基礎記事から留学準備を確認。",
      featuredViewAll: "すべて見る →",
    },
    articles: {
      title: "記事一覧",
      description:
        "留学関連ガイドを検索・カテゴリで絞り込み。内容は参考情報です。",
      searchPlaceholder: "記事を検索（例：日本、ビザ、生活費）",
      clear: "クリア",
      all: "すべて",
      resultCount: (count) => `${count} 件の記事が見つかりました`,
      empty: "該当記事がありません。キーワードまたはカテゴリを変更してください。",
    },
    about: {
      title: "概要",
      intro:
        "「留学相談」は留学・海外生活の情報整理プラットフォームであり、日本 IT 就職向けの個人ポートフォリオでもあります。留学、ビザ、海外生活の情報を構造化し、進路プランニング、ローカル AI 問答 MVP、事例紹介と合わせて実装力を示します。",
      positioningTitle: "サイトの位置づけ",
      positioningParagraphs: [
        "日本留学とニュージーランド留学を中心に、ビザ準備、銀行口座、賃貸など海外生活トピックも扱います。実用性と読みやすさを重視しています。",
        "Next.js で構築し、記事データはローカル TypeScript に保存。DB 不要で、ポートフォリオ向けに素早く更新できます。",
      ],
      categoriesTitle: "カテゴリ",
      disclaimerTitle: "免責事項",
      disclaimer:
        "本サイトの内容は参考情報です。法律、移民、留学申請のアドバイスではありません。政策や費用は変わる可能性があるため、公式機関の最新情報を優先してください。ポートフォリオ演示であり、ビザ・合格・就業を保証しません。",
      portfolioNote:
        "個人ポートフォリオとして、フロントエンド実装・プロダクト設計・情報設計力を示すことを目的としています。",
    },
    categoryPage: {
      unknownCategory: "不明なカテゴリ",
      articleCount: (count) => `このカテゴリに ${count} 件の記事があります`,
      empty: "このカテゴリにはまだ記事がありません。",
    },
    articleDetail: {
      backLink: "← 記事一覧に戻る",
      categoryLabel: "カテゴリ",
      readTimeLabel: "読了時間",
    },
    ai: {
      badge: "v0.9.2 · ローカル AI 問答 MVP",
      title: "まず質問を整理する。",
      titleLine2: "そのあと次の一手を決める。",
      description:
        "留学プランニング向けのローカル模擬問答 MVP。情報分解、コンポーネント設計、プロダクト設計力を示します。",
      previewKicker: "模擬回答プレビュー",
      previewTitle: "予算と目標は一緒に判断する",
      previewBody:
        "ローカルルールが目標・予算・語学・リスクに分解し、確認可能な次のステップを提示します。",
      focusCards: [
        {
          title: "目標",
          description: "留学、就業、短期体験、長期滞在のどれを目指すか整理。",
        },
        {
          title: "予算",
          description: "学費、生活費、保証金、予備資金を分けて試算。",
        },
        {
          title: "リスク",
          description: "ビザ、語学、就業、政策変更の不確実性を先に把握。",
        },
      ],
      inputLabel: "留学に関する質問を入力",
      inputPlaceholder: "例：予算 15 万元でどんなルートが考えられる？",
      submit: "模擬回答を生成",
      submitting: "回答を整理中...",
      reset: "最初から",
      emptyError: "先に質問を入力してください。",
      loadingBadge: "回答を整理中",
      loadingTitle: "質問に基づき初步提案を生成しています",
      loadingBody:
        "ローカル模擬ロジックです。本番 AI API は未接続。履歴も保存しません。",
      previewBadge: "回答構造プレビュー",
      previewStructureTitle: "1 つの質問を 3 つの部分に分解。",
      previewStructureBody:
        "留学、語学学校、予算、ルート選び、就活準備、ビザリスクなどを質問できます。",
      previewCards: [
        { label: "結論", hint: "まず把握し、続けて確認。" },
        { label: "提案", hint: "まず把握し、続けて確認。" },
        { label: "リスク", hint: "まず把握し、続けて確認。" },
      ],
      disclaimerLabel: "利用境界：",
      disclaimer:
        "作品集演示です。ローカル模擬のみ。履歴保存なし。ビザ・移民・合格・就業の保証はありません。",
      quickQuestions: [
        "日本語学校期間中に IT 就活をどう準備する？",
        "予算 15 万元で選べる留学ルートは？",
        "英語が苦手でも海外に行ける？",
        "留学、ワーホリ、就労ビザの違いは？",
      ],
    },
    plan: {
      badge: "v0.5.2 · 進路プランニング",
      title: "方向を見極めてから、ルートを選ぶ。",
      description:
        "基本情報を入力し、ローカルルールに基づくルート提案、リスク、次のアクションを取得。",
      steps: [
        { label: "入力", value: "基本条件" },
        { label: "分析", value: "ルートマッチ" },
        { label: "出力", value: "計画レポート" },
      ],
      empty: {
        kicker: "プランニング開始前",
        title: "ルート提案はここに表示されます",
        description:
          "左側の情報を入力すると、最大 3 件のルートが提案されます。方向付け用の参考情報です。",
        cards: [
          {
            step: "1",
            title: "基本情報を入力",
            desc: "年齢、学歴、専攻、予算、語学力。",
          },
          {
            step: "2",
            title: "ルート提案を生成",
            desc: "ルート、強み、リスク、次のステップ。",
          },
          {
            step: "3",
            title: "結果を保存",
            desc: "要約をコピー、または PDF 印刷。",
          },
        ],
        reminder:
          "ローカルルールによる参考結果です。正式申請前に政策と個人条件を再確認してください。",
      },
      result: {
        workbench: "ルート結果ワークベンチ",
        generated: "最新情報に基づき生成",
        outdated: "情報変更あり。再生成が必要",
        heading: "最適ルートを確認し、他の候補も切り替え",
        viewInsight: "全体分析を見る",
        recommendTab: (index, country) => `候補 ${index} · ${country}`,
        matchScore: "適合指数",
        matchScoreHint:
          "目標・予算・条件との一致度。合格・ビザ・就業成功率を保証しません。",
        matchReasons: "マッチ理由",
        askAi: "このルートで AI に質問",
        viewDetail: "詳細を見る",
        relatedArticles: "関連記事",
        actionsKicker: "結果操作",
        actionsTitle: "プランニング結果を保存",
        generatedAt: (time) => `生成時間：${time}`,
        copySummary: "要約をコピー",
        printPdf: "印刷 / PDF 保存",
        disclaimerLabel: "重要：",
        disclaimer:
          "ローカルルールによる参考提案です。ビザ・移民・法律・就業の保証ではありません。",
        noRoutesKicker: "明確なルートなし",
        noRoutesTitle: "現時点では具体ルートを推奨しません",
        noRoutesBody:
          "条件に不確実性があります。語学力向上、方向性の明確化、予算と国の再評価を先に行ってください。",
        noRoutesBoxTitle: "個別評価を先に検討",
        noRoutesAdvice:
          "可能性をさらに知りたい場合は、年齢、学歴、予算、語学力、希望国、家庭状況を踏まえた個別判断を先に行ってください。",
        noRoutesCta: "個別評価について",
        copyInfo: "現在の情報をコピー",
      },
      form: {
        summaryKicker: "入力情報サマリー",
        summaryTitle: "現在のルートはこの情報に基づきます",
        summaryHint:
          "項目をクリックして編集。変更後は再生成が必要です。",
        outdatedWarning:
          "左側情報が変更されました。右側は前回の結果です。「再生成」をクリックしてください。",
        formTitle: "基本情報を入力",
        formHint:
          "必須項目を入力後、必要に応じて偏好設定を展開。結果は生成ボタン後に更新。",
        sections: {
          basic: { title: "基本情報", description: "年齢、学歴、専攻方向。" },
          preference: {
            title: "ルート偏好",
            description: "予算、語学、希望国が結果に影響します。",
          },
          goal: {
            title: "長期計画",
            description: "未定の場合はデフォルトのままで可。",
          },
        },
        labels: {
          age: "年齢",
          education: "学歴",
          major: "専攻 / 職種",
          budget: "予算帯",
          language: "語学力",
          countryPreference: "国 / 地域偏好",
          targetCountry: "希望国",
          partTime: "就学中にアルバイト希望？",
          longTerm: "長期滞在を希望？",
          lowBudget: "低予算ルートを受け入れる？",
        },
        placeholders: {
          age: "例：22",
          education: "例：学士 / 短大 / 高校 / 社会人",
          major: "例：ソフトウェア / 看護 / 機械",
        },
        targetCountryHelper:
          "上の地域偏好に応じて希望国が絞り込まれます。未定ならデフォルトのまま。",
        notFilled: "未入力",
        ageSuffix: "歳頃",
        generate: "ルート提案を生成",
        regenerating: "生成中...",
        regenerate: "再生成",
        resetAll: "すべてリセット",
        reset: "リセット",
      },
      errors: {
        age: "有効な年齢（16〜65 歳）を入力してください。",
        education: "学歴と専攻 / 職種方向を入力してください。",
      },
      copy: {
        success: "要約をコピーしました",
        failed: "コピーに失敗しました",
      },
      modal: {
        resetTitle: "リセットしますか？",
        resetBody: "入力情報とルート結果がすべて消去されます。",
        cancel: "キャンセル",
        confirmReset: "リセットする",
      },
      risk: {
        low: "難易度：低",
        medium: "難易度：中",
        high: "難易度：高",
      },
    },
  },
  en: {
    home: {
      badge: "Personal project · Portfolio",
      title: "Study Abroad Information Platform",
      subtitle:
        "Articles, route planning, a local AI Q&A MVP, and case study presentation—showcasing information design, product thinking, frontend engineering, and AI awareness.",
      ctaCaseStudy: "View case study",
      ctaArticles: "Browse articles",
      ctaAbout: "About",
      languageHint:
        "The case study page supports 中文 / 日本語 / English for job applications and interviews.",
      categoriesTitle: "Categories",
      categoriesDescription: "Find study-abroad topics by theme.",
      categoryCardDescription: (name) =>
        `Browse practical guides and basics for ${name}.`,
      featuredTitle: "Recommended reading",
      featuredDescription: "Start with these foundational articles.",
      featuredViewAll: "View all →",
    },
    articles: {
      title: "All articles",
      description:
        "Search and filter study-abroad guides. Content is for reference only.",
      searchPlaceholder: "Search articles, e.g. Japan, visa, living costs",
      clear: "Clear",
      all: "All",
      resultCount: (count) => `${count} article${count === 1 ? "" : "s"} found`,
      empty: "No articles found. Try a different keyword or category.",
    },
    about: {
      title: "About",
      intro:
        "Study Abroad is a personal information platform and a portfolio project for Japan IT job applications. It structures study-abroad, visa, and overseas-life content alongside route planning, a local AI Q&A MVP, and a case study page.",
      positioningTitle: "Project focus",
      positioningParagraphs: [
        "Focused on Japan and New Zealand study paths, plus visa prep and practical overseas-life topics like banking and housing. Content is practical and clearly structured.",
        "Built with Next.js; articles live in local TypeScript files without a database—easy to iterate for portfolio demos.",
      ],
      categoriesTitle: "Categories",
      disclaimerTitle: "Disclaimer",
      disclaimer:
        "Content is for reference only—not legal, immigration, or admission advice. Policies and costs change; follow official sources. This is a portfolio demo with no visa, admission, or employment guarantees.",
      portfolioNote:
        "A personal portfolio showcasing frontend engineering, product thinking, and information architecture—not a commercial service.",
    },
    categoryPage: {
      unknownCategory: "Unknown category",
      articleCount: (count) =>
        `${count} article${count === 1 ? "" : "s"} in this category`,
      empty: "No articles in this category yet.",
    },
    articleDetail: {
      backLink: "← Back to all articles",
      categoryLabel: "Category",
      readTimeLabel: "Read time",
    },
    ai: {
      badge: "v0.9.2 · Local AI Q&A MVP",
      title: "Ask the question clearly.",
      titleLine2: "Then decide the next step.",
      description:
        "A local mock Q&A MVP for study-abroad planning—demonstrating information breakdown, components, and product design.",
      previewKicker: "Mock answer preview",
      previewTitle: "Judge budget and goals together",
      previewBody:
        "Local rules break questions into goals, budget, language, and risk, then suggest verifiable next steps.",
      focusCards: [
        {
          title: "Goals",
          description: "Study, work, short-term experience, or long-term stay?",
        },
        {
          title: "Budget",
          description: "Split tuition, living costs, deposits, and emergency funds.",
        },
        {
          title: "Risk",
          description: "See visa, language, job, and policy uncertainty early.",
        },
      ],
      inputLabel: "Enter your study-abroad question",
      inputPlaceholder: "e.g. What routes fit a 150k RMB budget?",
      submit: "Generate mock answer",
      submitting: "Organizing answer...",
      reset: "Start over",
      emptyError: "Please enter a question first.",
      loadingBadge: "Organizing answer",
      loadingTitle: "Generating a preliminary suggestion",
      loadingBody:
        "Local mock logic only—no real AI API, no history storage.",
      previewBadge: "Answer structure preview",
      previewStructureTitle: "One question, three parts.",
      previewStructureBody:
        "Ask about study paths, language schools, budget, routes, job prep, or visa risk.",
      previewCards: [
        { label: "Conclusion", hint: "Understand first, then verify." },
        { label: "Suggestions", hint: "Understand first, then verify." },
        { label: "Risks", hint: "Understand first, then verify." },
      ],
      disclaimerLabel: "Boundaries:",
      disclaimer:
        "Portfolio demo with local mock logic. No real AI, no history, no visa/immigration/admission/job promises.",
      quickQuestions: [
        "How to prepare for IT jobs during language school in Japan?",
        "What routes fit a 150k RMB budget?",
        "Can I go abroad with weak English?",
        "Study abroad vs working holiday vs work visa?",
      ],
    },
    plan: {
      badge: "v0.5.2 · Route planning workspace",
      title: "See the direction first. Then choose a route.",
      description:
        "Enter basics to get rule-based route suggestions, risks, and next actions.",
      steps: [
        { label: "Input", value: "Basics" },
        { label: "Analyze", value: "Route match" },
        { label: "Output", value: "Plan report" },
      ],
      empty: {
        kicker: "Before you start",
        title: "Your route suggestions appear here",
        description:
          "After filling the form, up to 3 routes are suggested. For direction only—not final admission advice.",
        cards: [
          {
            step: "1",
            title: "Enter basics",
            desc: "Age, education, major, budget, language.",
          },
          {
            step: "2",
            title: "Generate routes",
            desc: "Routes with strengths, risks, and next steps.",
          },
          {
            step: "3",
            title: "Save results",
            desc: "Copy summary or print/save as PDF.",
          },
        ],
        reminder:
          "Rule-based reference only. Verify policies and personal conditions before applying.",
      },
      result: {
        workbench: "Route workbench",
        generated: "Generated from latest info",
        outdated: "Info changed—regenerate needed",
        heading: "Review the best match, then switch alternatives",
        viewInsight: "View full analysis",
        recommendTab: (index, country) => `Route ${index} · ${country}`,
        matchScore: "Fit score",
        matchScoreHint:
          "How well the route matches your goals and budget—not admission or visa success rate.",
        matchReasons: "Why it matches",
        askAi: "Ask AI about this route",
        viewDetail: "View details",
        relatedArticles: "Related articles",
        actionsKicker: "Actions",
        actionsTitle: "Save your planning results",
        generatedAt: (time) => `Generated: ${time}`,
        copySummary: "Copy summary",
        printPdf: "Print / save PDF",
        disclaimerLabel: "Important:",
        disclaimer:
          "Rule-based preliminary suggestion—not visa, immigration, legal, or employment advice.",
        noRoutesKicker: "No clear route matched",
        noRoutesTitle: "Avoid picking a specific route for now",
        noRoutesBody:
          "High uncertainty in your inputs. Improve language, clarify direction, and reassess budget and country feasibility.",
        noRoutesBoxTitle: "Consider a one-on-one assessment first",
        noRoutesAdvice:
          "If you still want to explore options, get a manual review of age, education, budget, language, target country, and family context before committing.",
        noRoutesCta: "About assessment",
        copyInfo: "Copy current info",
      },
      form: {
        summaryKicker: "Summary",
        summaryTitle: "Current route is based on this info",
        summaryHint:
          "Click items to edit. Regenerate after changes.",
        outdatedWarning:
          "Left panel changed but results are stale. Click regenerate.",
        formTitle: "Enter your basics",
        formHint:
          "Fill required fields first, then expand preferences. Results update after generate.",
        sections: {
          basic: { title: "Basics", description: "Age, education, and major/direction." },
          preference: {
            title: "Preferences",
            description: "Budget, language, and country affect results.",
          },
          goal: {
            title: "Long-term plans",
            description: "Defaults are fine if unsure.",
          },
        },
        labels: {
          age: "Age",
          education: "Education",
          major: "Major / career direction",
          budget: "Budget range",
          language: "Language level",
          countryPreference: "Region preference",
          targetCountry: "Target country",
          partTime: "Part-time work while studying?",
          longTerm: "Plan to stay long-term?",
          lowBudget: "Accept a low-budget transition route?",
        },
        placeholders: {
          age: "e.g. 22",
          education: "e.g. Bachelor / College / High school / Working",
          major: "e.g. Software / Nursing / Mechanical",
        },
        targetCountryHelper:
          "Target countries filter by region preference above. Keep default if undecided.",
        notFilled: "Not filled",
        ageSuffix: " years old",
        generate: "Generate routes",
        regenerating: "Generating...",
        regenerate: "Regenerate routes",
        resetAll: "Reset all",
        reset: "Reset",
      },
      errors: {
        age: "Enter a valid age between 16 and 65.",
        education: "Enter education and major / career direction.",
      },
      copy: {
        success: "Summary copied",
        failed: "Copy failed—select text manually",
      },
      modal: {
        resetTitle: "Reset everything?",
        resetBody: "This clears all form data and route results.",
        cancel: "Cancel",
        confirmReset: "Confirm reset",
      },
      risk: {
        low: "Lower difficulty",
        medium: "Medium difficulty",
        high: "Higher difficulty",
      },
    },
  },
};

export function getPageContent(language: Language): SiteContent {
  return pageContent[language];
}
