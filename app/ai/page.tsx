// AI 问答 MVP 页面
// 当前阶段只使用本地模拟回答，不接真实 AI API、不接数据库

import AiChatPanel from "@/components/ai/AiChatPanel";

export default function AiPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] px-4 py-7 text-slate-950 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <section className="mb-7 overflow-hidden rounded-[34px] bg-white/72 px-6 py-8 shadow-[0_18px_60px_rgba(15,23,42,0.055)] ring-1 ring-white/85 backdrop-blur-xl sm:px-10 sm:py-10">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex rounded-full bg-slate-950 px-3.5 py-1.5 text-xs font-medium text-white shadow-sm">
              v0.8.2 · AI 问答视觉精修
            </p>

            <h1 className="text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">
              先把问题问清楚，再决定下一步。
            </h1>

            <p className="mt-4 max-w-xl text-base leading-8 text-slate-500">
              用本地模拟逻辑，先整理出国问题的方向、风险和下一步。
            </p>
          </div>
        </section>

        <AiChatPanel />

        <section className="mt-7 rounded-[26px] bg-white/68 px-5 py-4 text-sm leading-7 text-slate-500 shadow-[0_12px_36px_rgba(15,23,42,0.045)] ring-1 ring-white/80 backdrop-blur-xl sm:px-6">
          <strong className="text-slate-950">使用边界：</strong>
          当前页面不接真实 AI，不保存历史记录，不提供签证、移民、录取或就业承诺。重要信息请以学校、使领馆、入管局及官方政策为准。
        </section>
      </div>
    </main>
  );
}
