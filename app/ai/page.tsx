// AI 问答 MVP 页面
// 当前阶段只使用本地模拟回答，不接真实 AI API、不接数据库

import AiChatPanel from "@/components/ai/AiChatPanel";
import {
  badgeSoft,
  cardFloating,
  cardHero,
  cardHover,
  cardInfo,
  cardTintIndigo,
  cardTintRose,
  cardTintSky,
  pageBackground,
} from "@/lib/ui/card-system";

const focusCards = [
  {
    title: "目标",
    description: "先判断你要留学、工作、短期体验，还是长期发展。",
    toneClass: cardTintSky,
  },
  {
    title: "预算",
    description: "把学费、生活费、保证金和应急金拆开计算。",
    toneClass: cardTintIndigo,
  },
  {
    title: "风险",
    description: "提前看见签证、语言、就业和政策变化的不确定性。",
    toneClass: cardTintRose,
  },
];

type AiPageProps = {
  searchParams?: Promise<{
    q?: string | string[];
  }>;
};

export default async function AiPage({ searchParams }: AiPageProps) {
  const resolvedSearchParams = await searchParams;
  const rawQuestion = resolvedSearchParams?.q;
  const initialQuestion = Array.isArray(rawQuestion)
    ? rawQuestion[0]?.trim() ?? ""
    : rawQuestion?.trim() ?? "";

  return (
    <main
      className={`min-h-screen overflow-x-hidden px-4 py-5 pb-10 text-gray-950 sm:px-6 sm:py-8 sm:pb-14 lg:py-10 lg:pb-16 ${pageBackground}`}
    >
      <div className="mx-auto max-w-6xl min-w-0">
        <section
          className={`relative mb-5 overflow-hidden px-4 py-8 text-center sm:mb-6 sm:px-6 sm:py-11 lg:mb-7 lg:px-8 lg:py-14 ${cardHero}`}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(186,230,253,0.35),transparent_38%),radial-gradient(circle_at_82%_14%,rgba(221,214,254,0.22),transparent_36%)]" />

          <div className="relative mx-auto max-w-4xl min-w-0">
            <p className={`mb-4 inline-flex sm:mb-5 sm:px-4 sm:py-1.5 ${badgeSoft}`}>
              v0.9.2 · 本地模拟 AI 问答 MVP
            </p>

            <h1 className="mx-auto max-w-4xl text-[1.875rem] font-semibold leading-[1.08] tracking-[-0.05em] text-gray-950 sm:text-5xl sm:leading-[0.98] md:text-6xl lg:text-7xl">
              先把问题问清楚。
              <br />
              再决定下一步。
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 sm:mt-5 sm:text-base lg:text-lg">
              这是一个面向出国规划场景的本地模拟问答 MVP，用于展示信息拆解、组件化前端与产品设计能力。
            </p>

            <div
              className={`mx-auto mt-6 hidden max-w-xl p-4 text-left sm:mt-8 sm:block sm:p-5 lg:mt-9 ${cardFloating}`}
            >
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-sky-600">
                模拟回答预览
              </p>
              <h2 className="mt-2 text-xl font-semibold leading-snug tracking-tight text-gray-950 sm:text-2xl">
                预算和目标要一起判断
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                本地规则会把问题拆成目标、预算、语言和风险，再给出可继续核实的下一步。
              </p>
            </div>
          </div>
        </section>

        <section className="mb-5 grid gap-3 sm:mb-6 sm:gap-4 md:grid-cols-3 md:gap-5 lg:mb-7">
          {focusCards.map((card) => (
            <div
              key={card.title}
              className={`min-w-0 px-5 py-5 sm:px-6 sm:py-6 md:min-h-[148px] md:py-7 ${card.toneClass} ${cardHover}`}
            >
              <h2 className="text-2xl font-semibold leading-snug tracking-tight text-gray-950 sm:text-3xl md:text-4xl">
                {card.title}
              </h2>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-600 sm:mt-4">
                {card.description}
              </p>
            </div>
          ))}
        </section>

        <AiChatPanel initialQuestion={initialQuestion} />

        <section
          className={`mx-auto mt-6 max-w-4xl px-4 py-3.5 text-sm leading-relaxed text-gray-500 sm:mt-8 sm:px-6 sm:py-4 ${cardInfo}`}
        >
          <strong className="text-gray-950">使用边界：</strong>
          本页为作品集演示，使用本地模拟逻辑，不接真实 AI，不保存历史记录，不提供签证、移民、录取或就业承诺。重要信息请以学校、使领馆、入管局及官方政策为准。
        </section>
      </div>
    </main>
  );
}
