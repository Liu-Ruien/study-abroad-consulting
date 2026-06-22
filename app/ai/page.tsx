// AI 问答 MVP 页面
// 当前阶段只使用本地模拟回答，不接真实 AI API、不接数据库

import AiChatPanel from "@/components/ai/AiChatPanel";

const focusCards = [
  {
    title: "目标",
    description: "先判断你要留学、工作、短期体验，还是长期发展。",
    toneClass:
      "bg-[radial-gradient(circle_at_18%_12%,rgba(191,219,254,0.72),transparent_48%),linear-gradient(145deg,rgba(255,255,255,0.54),rgba(238,242,255,0.38))]",
  },
  {
    title: "预算",
    description: "把学费、生活费、保证金和应急金拆开计算。",
    toneClass:
      "bg-[radial-gradient(circle_at_18%_12%,rgba(253,230,138,0.54),transparent_48%),linear-gradient(145deg,rgba(255,255,255,0.54),rgba(255,247,237,0.36))]",
  },
  {
    title: "风险",
    description: "提前看见签证、语言、就业和政策变化的不确定性。",
    toneClass:
      "bg-[radial-gradient(circle_at_18%_12%,rgba(251,207,232,0.54),transparent_48%),linear-gradient(145deg,rgba(255,255,255,0.54),rgba(248,250,252,0.36))]",
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
    <main className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_16%_8%,rgba(125,211,252,0.32),transparent_32%),radial-gradient(circle_at_84%_4%,rgba(244,114,182,0.22),transparent_34%),radial-gradient(circle_at_52%_34%,rgba(251,191,36,0.16),transparent_36%),radial-gradient(circle_at_50%_100%,rgba(186,230,253,0.18),transparent_42%),linear-gradient(180deg,#f8fbff_0%,#f6f7fb_42%,#f5f5f7_100%)] px-4 py-5 pb-10 text-slate-950 sm:px-6 sm:py-8 sm:pb-14 lg:py-10 lg:pb-16">
      <div className="mx-auto max-w-6xl min-w-0">
        <section className="relative mb-5 overflow-hidden rounded-[28px] px-4 py-8 text-center shadow-[0_24px_80px_rgba(15,23,42,0.07)] ring-1 ring-white/75 sm:mb-6 sm:rounded-[36px] sm:px-6 sm:py-11 lg:mb-7 lg:rounded-[40px] lg:px-8 lg:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(186,230,253,0.78),transparent_34%),radial-gradient(circle_at_80%_18%,rgba(251,207,232,0.62),transparent_34%),radial-gradient(circle_at_50%_85%,rgba(187,247,208,0.50),transparent_38%),linear-gradient(135deg,rgba(255,255,255,0.82)_0%,rgba(248,250,252,0.42)_100%)]" />
          <div className="absolute inset-x-6 bottom-0 h-20 rounded-full bg-white/35 blur-3xl sm:inset-x-10 sm:h-28" />

          <div className="relative mx-auto max-w-4xl min-w-0">
            <p className="mb-4 inline-flex rounded-full bg-white/58 px-3.5 py-1 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-white/75 backdrop-blur-xl sm:mb-5 sm:px-4 sm:py-1.5">
              v0.8.6 · AI 问答体验优化
            </p>

            <h1 className="mx-auto max-w-4xl text-[1.875rem] font-semibold leading-[1.08] tracking-[-0.05em] text-slate-950 sm:text-5xl sm:leading-[0.98] md:text-6xl lg:text-7xl">
              先把问题问清楚。
              <br />
              再决定下一步。
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8 lg:text-lg">
              用本地模拟逻辑，帮你把出国问题整理成目标、预算、语言和风险。
            </p>

            <div className="mx-auto mt-6 hidden max-w-xl rounded-[28px] bg-white/58 p-4 text-left shadow-[0_24px_80px_rgba(15,23,42,0.10)] ring-1 ring-white/80 backdrop-blur-2xl sm:mt-8 sm:block sm:rounded-[32px] sm:p-5 lg:mt-9">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-sky-600">
                模拟回答预览
              </p>
              <h2 className="mt-2 text-xl font-medium tracking-tight text-slate-950 sm:text-2xl">
                预算和目标要一起判断
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                系统会先把你的问题拆成目标、预算、语言和风险，再给出可继续核实的下一步。
              </p>
            </div>
          </div>
        </section>

        <section className="mb-5 grid gap-3 sm:mb-6 sm:gap-4 md:grid-cols-3 md:gap-5 lg:mb-7">
          {focusCards.map((card) => (
            <div
              key={card.title}
              className={`min-w-0 rounded-[26px] px-5 py-5 shadow-[0_18px_60px_rgba(15,23,42,0.055)] ring-1 ring-white/72 backdrop-blur-2xl sm:rounded-[30px] sm:px-6 sm:py-6 md:min-h-[148px] md:py-7 lg:rounded-[34px] ${card.toneClass}`}
            >
              <h2 className="text-2xl font-medium tracking-[-0.04em] text-slate-950 sm:text-3xl md:text-4xl">
                {card.title}
              </h2>
              <p className="mt-3 max-w-xs text-sm leading-6 text-slate-600 sm:mt-4 sm:leading-7">
                {card.description}
              </p>
            </div>
          ))}
        </section>

        <AiChatPanel initialQuestion={initialQuestion} />

        <section className="mx-auto mt-6 max-w-4xl rounded-[24px] bg-white/42 px-4 py-3.5 text-sm leading-6 text-slate-500 shadow-[0_12px_40px_rgba(15,23,42,0.045)] ring-1 ring-white/70 backdrop-blur-xl sm:mt-8 sm:rounded-[28px] sm:px-6 sm:py-4 sm:leading-7">
          <strong className="text-slate-950">使用边界：</strong>
          当前页面不接真实 AI，不保存历史记录，不提供签证、移民、录取或就业承诺。重要信息请以学校、使领馆、入管局及官方政策为准。
        </section>
      </div>
    </main>
  );
}
