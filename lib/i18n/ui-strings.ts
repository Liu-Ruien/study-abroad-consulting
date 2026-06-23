import type { Language } from "./language";

type NavLinkKey =
  | "home"
  | "articles"
  | "plan"
  | "ai"
  | "caseStudy"
  | "about";

type CategorySlug =
  | "japan-study"
  | "new-zealand-study"
  | "visa-guide"
  | "overseas-life";

type UiStrings = {
  siteName: string;
  menu: string;
  categories: string;
  languageMenuLabel: string;
  footerCategoriesTitle: string;
  footerQuickLinksTitle: string;
  footerCopyright: string;
  footerIntro: string;
  homeLanguageHint: string;
  navLinks: Record<NavLinkKey, { href: string; label: string }>;
  categoryLabels: Record<CategorySlug, string>;
  categoryDescriptions: Record<CategorySlug, string>;
};

export const uiStrings: Record<Language, UiStrings> = {
  zh: {
    siteName: "出国咨询",
    menu: "菜单",
    categories: "分类",
    languageMenuLabel: "语言",
    footerCategoriesTitle: "内容分类",
    footerQuickLinksTitle: "快速链接",
    footerCopyright: "出国咨询 · 个人作品集项目 · 内容仅供参考",
    footerIntro:
      "个人开发的出国信息整理平台，围绕内容、路线规划、本地 AI 问答 MVP 与项目案例展示，呈现前端工程与产品拆解能力。",
    homeLanguageHint:
      "项目案例页已提供中文 / 日本語 / English 展示，方便求职与面试说明。",
    navLinks: {
      home: { href: "/", label: "首页" },
      articles: { href: "/articles", label: "全部文章" },
      plan: { href: "/plan", label: "路线规划" },
      ai: { href: "/ai", label: "AI 问答" },
      caseStudy: { href: "/case-study", label: "项目案例" },
      about: { href: "/about", label: "关于" },
    },
    categoryLabels: {
      "japan-study": "日本留学",
      "new-zealand-study": "新西兰留学",
      "visa-guide": "签证指南",
      "overseas-life": "海外生活",
    },
    categoryDescriptions: {
      "japan-study": "整理日本语言学校、留学费用、打工规则、租房生活等实用信息。",
      "new-zealand-study": "介绍新西兰留学适合人群、生活成本、学习环境和基础准备。",
      "visa-guide": "整理出国前材料准备、签证申请流程和常见注意事项。",
      "overseas-life": "介绍银行卡、电话卡、租房、生活适应等海外生活基础内容。",
    },
  },
  ja: {
    siteName: "留学相談",
    menu: "メニュー",
    categories: "カテゴリ",
    languageMenuLabel: "言語",
    footerCategoriesTitle: "カテゴリ",
    footerQuickLinksTitle: "クイックリンク",
    footerCopyright:
      "留学相談 · 個人ポートフォリオ · 内容は参考情報です",
    footerIntro:
      "留学・海外生活の情報整理、進路プランニング、ローカル AI 問答 MVP、ポートフォリオ展示を通じて、フロントエンド実装とプロダクト設計力を示す個人プロジェクトです。",
    homeLanguageHint:
      "事例紹介ページは中文 / 日本語 / English に対応。就職・面接向けの説明に利用できます。",
    navLinks: {
      home: { href: "/", label: "ホーム" },
      articles: { href: "/articles", label: "記事一覧" },
      plan: { href: "/plan", label: "ルート計画" },
      ai: { href: "/ai", label: "AI 問答" },
      caseStudy: { href: "/case-study", label: "事例紹介" },
      about: { href: "/about", label: "概要" },
    },
    categoryLabels: {
      "japan-study": "日本留学",
      "new-zealand-study": "ニュージーランド留学",
      "visa-guide": "ビザガイド",
      "overseas-life": "海外生活",
    },
    categoryDescriptions: {
      "japan-study":
        "語学学校、留学費用、バイト規則、賃貸生活などの実用情報を整理。",
      "new-zealand-study":
        "NZ留学の適性、生活費、学習環境、基本準備を紹介。",
      "visa-guide": "出国前の書類、ビザ申請、注意点を整理。",
      "overseas-life":
        "銀行口座、SIM、賃貸、生活適応などの基礎情報。",
    },
  },
  en: {
    siteName: "Study Abroad",
    menu: "Menu",
    categories: "Categories",
    languageMenuLabel: "Language",
    footerCategoriesTitle: "Categories",
    footerQuickLinksTitle: "Quick Links",
    footerCopyright:
      "Study Abroad · Personal portfolio · For reference only",
    footerIntro:
      "A personal portfolio for study-abroad information, route planning, a local AI Q&A MVP, and case study presentation—showcasing frontend engineering and product thinking.",
    homeLanguageHint:
      "The case study page supports 中文 / 日本語 / English for job applications and interviews.",
    navLinks: {
      home: { href: "/", label: "Home" },
      articles: { href: "/articles", label: "Articles" },
      plan: { href: "/plan", label: "Route Plan" },
      ai: { href: "/ai", label: "AI Q&A" },
      caseStudy: { href: "/case-study", label: "Case Study" },
      about: { href: "/about", label: "About" },
    },
    categoryLabels: {
      "japan-study": "Japan Study",
      "new-zealand-study": "New Zealand Study",
      "visa-guide": "Visa Guide",
      "overseas-life": "Overseas Life",
    },
    categoryDescriptions: {
      "japan-study":
        "Language schools, study costs, part-time rules, and housing basics in Japan.",
      "new-zealand-study":
        "Who NZ study fits, living costs, learning environment, and preparation.",
      "visa-guide":
        "Document prep, visa steps, and common reminders before departure.",
      "overseas-life":
        "Banking, SIM cards, housing, and everyday life abroad.",
    },
  },
};

export const navLinkOrder: NavLinkKey[] = [
  "home",
  "articles",
  "plan",
  "ai",
  "caseStudy",
  "about",
];

export const footerQuickLinkOrder: NavLinkKey[] = [
  "articles",
  "plan",
  "ai",
  "caseStudy",
  "about",
];

export function getCategoryLabel(language: Language, slug: string) {
  const labels = uiStrings[language].categoryLabels;
  return slug in labels
    ? labels[slug as CategorySlug]
    : uiStrings.zh.categoryLabels[slug as CategorySlug] ?? slug;
}

export function getCategoryDescription(language: Language, slug: string) {
  const descriptions = uiStrings[language].categoryDescriptions;
  return slug in descriptions
    ? descriptions[slug as CategorySlug]
    : uiStrings.zh.categoryDescriptions[slug as CategorySlug] ?? "";
}
