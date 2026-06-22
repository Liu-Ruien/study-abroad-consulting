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
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_16%_8%,rgba(125,211,252,0.32),transparent_32%),radial-gradient(circle_at_84%_4%,rgba(244,114,182,0.22),transparent_34%),radial-gradient(circle_at_52%_34%,rgba(251,191,36,0.16),transparent_36%),radial-gradient(circle_at_50%_100%,rgba(186,230,253,0.18),transparent_42%),linear-gradient(180deg,#f8fbff_0%,#f6f7fb_42%,#f5f5f7_100%)] px-4 py-7 pb-12 text-slate-950 sm:px-6 sm:py-10 sm:pb-16">
      <div className="mx-auto max-w-6xl">
        <section className="relative mb-8 overflow-hidden rounded-[40px] px-5 py-14 text-center shadow-[0_30px_100px_rgba(15,23,42,0.08)] ring-1 ring-white/75 sm:px-8 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(186,230,253,0.78),transparent_34%),radial-gradient(circle_at_80%_18%,rgba(251,207,232,0.62),transparent_34%),radial-gradient(circle_at_50%_85%,rgba(187,247,208,0.50),transparent_38%),linear-gradient(135deg,rgba(255,255,255,0.82)_0%,rgba(248,250,252,0.42)_100%)]" />
          <div className="absolute inset-x-10 bottom-0 h-28 rounded-full bg-white/35 blur-3xl" />

          <div className="relative mx-auto max-w-4xl">
            <p className="mb-5 inline-flex rounded-full bg-white/58 px-4 py-1.5 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-white/75 backdrop-blur-xl">
              v0.8.3 · AI 问答产品视觉
            </p>

            <h1 className="mx-auto max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] text-slate-950 sm:text-7xl lg:text-8xl">
              先把问题问清楚。
              <br />
              再决定下一步。
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              用本地模拟逻辑，帮你把出国问题整理成目标、预算、语言和风险。
            </p>

            <div className="mx-auto mt-10 max-w-xl rounded-[32px] bg-white/58 p-4 text-left shadow-[0_24px_80px_rgba(15,23,42,0.10)] ring-1 ring-white/80 backdrop-blur-2xl sm:p-5">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-sky-600">
                模拟回答预览
              </p>
              <h2 className="mt-2 text-2xl font-medium tracking-tight text-slate-950">
                预算和目标要一起判断
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                系统会先把你的问题拆成目标、预算、语言和风险，再给出可继续核实的下一步。
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-5 md:grid-cols-3">
          {focusCards.map((card) => (
            <div
              key={card.title}
              className={`min-h-[178px] rounded-[34px] px-6 py-7 shadow-[0_22px_70px_rgba(15,23,42,0.065)] ring-1 ring-white/72 backdrop-blur-2xl ${card.toneClass}`}
            >
              <h2 className="text-3xl font-medium tracking-[-0.045em] text-slate-950 sm:text-4xl">
                {card.title}
              </h2>
              <p className="mt-5 max-w-xs text-sm leading-7 text-slate-600">
                {card.description}
              </p>
            </div>
          ))}
        </section>

        <AiChatPanel initialQuestion={initialQuestion} />

        <section className="mx-auto mt-8 max-w-4xl rounded-[28px] bg-white/42 px-5 py-4 text-sm leading-7 text-slate-500 shadow-[0_12px_40px_rgba(15,23,42,0.045)] ring-1 ring-white/70 backdrop-blur-xl sm:px-6">
          <strong className="text-slate-950">使用边界：</strong>
          当前页面不接真实 AI，不保存历史记录，不提供签证、移民、录取或就业承诺。重要信息请以学校、使领馆、入管局及官方政策为准。
        </section>
      </div>
    </main>
  );
}
