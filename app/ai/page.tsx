// AI 问答 MVP 页面
// 当前阶段只使用本地模拟回答，不接真实 AI API、不接数据库

import AiChatPanel from "@/components/ai/AiChatPanel";

export default function AiPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] px-4 py-8 text-slate-950 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <section className="mb-8 overflow-hidden rounded-[36px] bg-[radial-gradient(circle_at_18%_12%,rgba(14,165,233,0.09)_0%,rgba(224,242,254,0.36)_34%,transparent_60%),linear-gradient(145deg,rgba(248,250,252,0.96)_0%,rgba(255,255,255,0.94)_52%,rgba(241,245,249,0.86)_100%)] px-6 py-9 shadow-[0_24px_80px_rgba(15,23,42,0.075)] ring-1 ring-white/80 backdrop-blur-xl sm:px-10 sm:py-12">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full bg-slate-950 px-4 py-1.5 text-sm font-medium text-white shadow-sm">
              v0.8.1 · AI 问答体验优化
            </p>

            <h1 className="text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">
              先把问题问清楚，再决定下一步。
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-500">
              输入出国、留学、语言学校、预算、路线选择或求职准备问题，系统会用本地模拟逻辑整理一份初步回答。
            </p>
          </div>
        </section>

        <AiChatPanel />

        <section className="mt-6 rounded-[28px] bg-white/90 p-5 text-sm leading-7 text-slate-500 shadow-sm ring-1 ring-black/5">
          <strong className="text-slate-950">使用边界：</strong>
          当前页面不接真实 AI，不保存历史记录，不提供签证、移民、录取或就业承诺。重要信息请以学校、使领馆、入管局及官方政策为准。
        </section>
      </div>
    </main>
  );
}
