/** Apple 风格 — 柔和渐变 + 分层色彩，仅样式 token，不含业务逻辑 */

export const pageBackground =
  "bg-[#f3f7fb] [background-image:radial-gradient(circle_at_16%_8%,rgba(125,211,252,0.16),transparent_32%),radial-gradient(circle_at_84%_4%,rgba(196,181,253,0.10),transparent_34%),radial-gradient(circle_at_50%_100%,rgba(186,230,253,0.08),transparent_42%)]";

/** Hero 主视觉卡片 */
export const cardHero =
  "rounded-2xl border border-white/70 shadow-[0_12px_40px_rgba(15,23,42,0.06)] bg-gradient-to-br from-sky-50/90 via-white to-indigo-50/70";

/** 功能输入区 */
export const cardInput =
  "rounded-2xl border border-sky-100/90 bg-gradient-to-br from-white via-slate-50/70 to-sky-50/50 shadow-[0_10px_30px_rgba(14,116,144,0.07)]";

/** AI 回答主卡 */
export const cardAnswer =
  "rounded-2xl border border-indigo-100/80 bg-gradient-to-br from-white via-sky-50/40 to-indigo-50/50 shadow-[0_12px_40px_rgba(15,23,42,0.08)]";

/** 预览 / loading 回答区 */
export const cardAnswerPreview =
  "rounded-2xl border border-sky-100/80 bg-gradient-to-br from-white via-rose-50/20 to-sky-50/45 shadow-[0_12px_40px_rgba(15,23,42,0.07)]";

/** 信息说明卡 */
export const cardInfo =
  "rounded-2xl border border-slate-200/70 bg-gradient-to-br from-slate-50/80 to-white shadow-sm";

/** 目标 — 淡蓝 */
export const cardTintSky =
  "rounded-2xl border border-sky-200/55 bg-gradient-to-br from-sky-50/85 via-white/92 to-sky-50/35 shadow-[0_8px_24px_rgba(14,165,233,0.08)]";

/** 预算 — 淡紫 */
export const cardTintIndigo =
  "rounded-2xl border border-indigo-200/50 bg-gradient-to-br from-indigo-50/75 via-white/92 to-violet-50/30 shadow-[0_8px_24px_rgba(99,102,241,0.07)]";

/** 风险 — 淡粉/橙，主卡强调 */
export const cardTintRose =
  "rounded-2xl border border-rose-200/55 bg-gradient-to-br from-rose-50/80 via-white/92 to-orange-50/25 shadow-[0_10px_28px_rgba(244,63,94,0.09)] scale-[1.03]";

/** 结构预览 — 结论 */
export const cardPreviewConclusion =
  "rounded-2xl border border-sky-200/50 bg-gradient-to-br from-sky-50/70 to-white/90 shadow-sm";

/** 结构预览 — 建议 */
export const cardPreviewSuggestion =
  "rounded-2xl border border-indigo-200/45 bg-gradient-to-br from-indigo-50/60 to-white/90 shadow-sm";

/** 结构预览 — 风险 */
export const cardPreviewRisk =
  "rounded-2xl border border-rose-200/50 bg-gradient-to-br from-rose-50/65 to-white/90 shadow-sm";

/** 回答三卡 — 建议 */
export const cardAnswerSuggest =
  "rounded-2xl border border-sky-200/50 bg-gradient-to-br from-sky-50/75 via-white/95 to-sky-50/30 shadow-sm";

/** 回答三卡 — 下一步 */
export const cardAnswerNext =
  "rounded-2xl border border-indigo-200/45 bg-gradient-to-br from-indigo-50/65 via-white/95 to-violet-50/25 shadow-sm";

/** 回答三卡 — 风险（主卡） */
export const cardAnswerRisk = cardTintRose;

export const cardHover =
  "transition duration-200 hover:scale-[1.01] hover:shadow-md";

export const btnPrimary =
  "bg-black text-white shadow-sm transition duration-200 hover:bg-black/90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60";

export const btnSecondary =
  "bg-white/90 text-gray-800 border border-black/12 shadow-sm transition duration-200 hover:bg-neutral-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60";

export const chipSecondary =
  "border border-black/10 bg-white/85 text-gray-700 shadow-sm transition duration-200 hover:scale-[1.01] hover:border-sky-200/70 hover:bg-sky-50/55 hover:shadow-md";

export const inputField =
  "bg-white/90 border border-sky-100/90 shadow-sm outline-none transition duration-200 focus:ring-2 focus:ring-sky-400/20 focus:border-sky-200/80";

export const badgeSoft =
  "rounded-full border border-sky-100/80 bg-white/90 px-3.5 py-1 text-xs font-medium text-gray-600 shadow-sm";

/** 兼容旧引用 — Case Study 等页面 */
export const cardBase = cardInfo;

export const cardElevated = cardAnswer;

export const cardFloating =
  "rounded-2xl border border-white/80 bg-gradient-to-br from-white to-sky-50/55 shadow-md transition duration-200 hover:shadow-lg";

export const cardTriplePrimary = cardTintRose;

export const cardTripleSecondary =
  "rounded-2xl border border-slate-200/60 bg-gradient-to-br from-slate-50/70 to-white/95 shadow-sm opacity-90";

export const caseStudyModule =
  "rounded-2xl border border-sky-100/80 bg-gradient-to-br from-white via-sky-50/25 to-indigo-50/20 shadow-[0_10px_30px_rgba(15,23,42,0.07)]";

export const caseStudyModuleIndigo =
  "rounded-2xl border border-indigo-100/70 bg-gradient-to-br from-white via-indigo-50/30 to-violet-50/20 shadow-[0_10px_30px_rgba(99,102,241,0.06)]";

export const caseStudyModuleRose =
  "rounded-2xl border border-rose-100/70 bg-gradient-to-br from-white via-rose-50/25 to-orange-50/15 shadow-[0_10px_30px_rgba(244,63,94,0.06)]";

/** /case-study Hero — 弱边界、浮于背景 */
export const caseStudyHeroGlow =
  "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.18),transparent_50%),radial-gradient(circle_at_82%_28%,rgba(129,140,248,0.16),transparent_42%),radial-gradient(circle_at_16%_76%,rgba(14,165,233,0.10),transparent_46%)]";

export const caseStudyHeroContent =
  "relative mx-auto w-full max-w-5xl text-center";

/** /case-study 深色产品区块 */
export const caseStudyDarkSection =
  "bg-[#050505] [background-image:radial-gradient(circle_at_12%_0%,rgba(56,189,248,0.14),transparent_36%),radial-gradient(circle_at_88%_18%,rgba(129,140,248,0.10),transparent_42%),radial-gradient(circle_at_50%_100%,rgba(15,23,42,0.88),transparent_48%)] text-white";

export const caseStudyDarkCard =
  "rounded-[2rem] border border-white/[0.10] bg-gradient-to-b from-white/[0.08] via-white/[0.045] to-white/[0.025] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.48)] backdrop-blur-xl sm:p-10";

export const caseStudyDarkCardHover =
  "transition duration-300 hover:border-white/[0.14] hover:bg-gradient-to-b hover:from-[#151b28] hover:to-[#0a0a0a]";

export const caseStudyGlassCard =
  "relative overflow-hidden rounded-[32px] border border-cyan-200/15 bg-[linear-gradient(135deg,rgba(15,23,42,0.92),rgba(17,24,39,0.72))] text-white shadow-[0_30px_100px_rgba(0,0,0,0.42)] backdrop-blur-2xl transition duration-300 before:pointer-events-none before:absolute before:left-6 before:right-6 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-cyan-300/45 before:to-transparent hover:border-cyan-300/30 hover:bg-white/[0.08]";

/** /case-study 架构分层卡 */
export const caseStudyArchLayer =
  caseStudyGlassCard;

export const caseStudyArchFlowNode =
  `${caseStudyGlassCard} px-8 py-4 text-center font-medium text-slate-100 sm:min-w-[16rem]`;

export const caseStudySectionLabel =
  "text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-sky-600";

export const caseStudySectionDarkLabel =
  "text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-sky-400/90";

/** /case-study Navbar 约 3.5rem */
export const caseStudyNavOffset = "3.5rem";

export const tagApple =
  "rounded-full border border-black/10 bg-neutral-100 px-3 py-1 text-sm text-gray-700";

/** 全站导航栏 — 滚动时保持不透明 */
export const navbarShell =
  "sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-white/90";

export const navbarSubBar =
  "border-t border-slate-200/60 bg-white/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/85";

/** 文字链接 accent */
export const linkAccent =
  "font-medium text-sky-700 transition-colors hover:text-sky-800";

export const linkMuted =
  "text-sm text-gray-600 transition-colors hover:text-sky-700";

/** 文章分类标签 */
export const tagCategory =
  "rounded-full border border-sky-200/70 bg-sky-100/55 px-2.5 py-1 text-xs font-medium text-sky-800";

/** 文章卡片 — 按分类 tint（明显非纯白） */
export const articleCardJapan =
  "rounded-2xl border border-sky-200/65 bg-gradient-to-br from-sky-50/95 via-white/90 to-blue-50/85 shadow-[0_8px_26px_rgba(14,165,233,0.12)]";

export const articleCardNewZealand =
  "rounded-2xl border border-indigo-200/60 bg-gradient-to-br from-indigo-50/90 via-white/90 to-violet-50/80 shadow-[0_8px_26px_rgba(99,102,241,0.11)]";

export const articleCardVisa =
  "rounded-2xl border border-cyan-200/55 bg-gradient-to-br from-cyan-50/90 via-white/90 to-slate-50/85 shadow-[0_8px_26px_rgba(6,182,212,0.10)]";

export const articleCardLife =
  "rounded-2xl border border-rose-200/55 bg-gradient-to-br from-rose-50/88 via-white/90 to-orange-50/78 shadow-[0_8px_26px_rgba(244,63,94,0.10)]";

export const articleCardDefault =
  "rounded-2xl border border-sky-200/55 bg-gradient-to-br from-sky-50/85 via-white/90 to-indigo-50/75 shadow-[0_8px_26px_rgba(14,165,233,0.10)]";

export const articleCardHover =
  "transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(15,23,42,0.12)]";

export function getArticleCardTone(categorySlug: string): string {
  switch (categorySlug) {
    case "japan-study":
      return articleCardJapan;
    case "new-zealand-study":
      return articleCardNewZealand;
    case "visa-guide":
      return articleCardVisa;
    case "overseas-life":
      return articleCardLife;
    default:
      return articleCardDefault;
  }
}

export function getArticleTagTone(categorySlug: string): string {
  const base =
    "rounded-full border px-2.5 py-1 text-xs font-medium backdrop-blur-sm";
  switch (categorySlug) {
    case "japan-study":
      return `${base} border-sky-200/70 bg-sky-100/70 text-sky-800`;
    case "new-zealand-study":
      return `${base} border-indigo-200/65 bg-indigo-100/60 text-indigo-800`;
    case "visa-guide":
      return `${base} border-cyan-200/60 bg-cyan-50/75 text-cyan-900`;
    case "overseas-life":
      return `${base} border-rose-200/60 bg-rose-50/70 text-rose-800`;
    default:
      return tagCategory;
  }
}

/** 弹窗容器 */
export const modalShell =
  "overflow-hidden rounded-[30px] border border-sky-100/80 bg-gradient-to-br from-white via-sky-50/25 to-indigo-50/20 shadow-[0_24px_80px_rgba(15,23,42,0.12)]";

export const modalHeader =
  "border-b border-sky-100/80 bg-gradient-to-br from-sky-50/40 via-white to-indigo-50/25 px-5 py-5 sm:px-6";

export const modalFooter =
  "border-t border-sky-100/70 bg-gradient-to-b from-white/95 to-slate-50/50 px-5 py-4 sm:px-6";

/** /plan 表单外壳 */
export const planFormShell =
  "no-print rounded-[30px] border border-sky-200/70 bg-gradient-to-br from-sky-50/80 via-white/95 to-sky-50/60 p-4 shadow-[0_10px_30px_rgba(14,116,144,0.09)] sm:p-5";

export const progressTrack =
  "h-2 overflow-hidden rounded-full bg-slate-200/80";

export const progressFill = "h-full rounded-full bg-slate-900";

export const selectMenu =
  "overflow-hidden rounded-2xl border border-sky-100/90 bg-gradient-to-br from-white to-slate-50/90 shadow-[0_12px_40px_rgba(15,23,42,0.08)]";

export const selectOptionActive =
  "border border-black/10 bg-black text-white font-medium shadow-sm";

export const selectOptionIdle =
  "border border-transparent text-gray-700 hover:bg-sky-50/55 hover:text-gray-950";
