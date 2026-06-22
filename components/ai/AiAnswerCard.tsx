"use client";

import type { AiMockAnswer } from "@/lib/ai";

type AiAnswerCardProps = {
  question: string;
  answer: AiMockAnswer;
};

export default function AiAnswerCard({ question, answer }: AiAnswerCardProps) {
  return (
    <article className="overflow-hidden rounded-[38px] bg-[radial-gradient(circle_at_88%_8%,rgba(251,207,232,0.28),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.54),rgba(255,255,255,0.30))] shadow-[0_24px_90px_rgba(15,23,42,0.08)] ring-1 ring-white/72 backdrop-blur-2xl">
      <div className="px-6 py-7 sm:px-9 sm:py-9">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-sky-600/90">
          模拟回答
        </p>

        <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-slate-950 sm:text-5xl">
          {answer.title}
        </h2>

        <p className="mt-5 rounded-[24px] bg-white/38 px-4 py-3 text-sm leading-6 text-slate-500 ring-1 ring-white/58 backdrop-blur-xl">
          你的问题：{question}
        </p>

        <p className="mt-7 max-w-3xl text-base leading-8 text-slate-600">
          {answer.summary}
        </p>
      </div>

      <div className="space-y-7 border-t border-white/58 px-6 py-6 sm:px-9 sm:py-8">
        <section className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-[30px] bg-white/36 p-5 ring-1 ring-white/58 backdrop-blur-xl">
            <h3 className="text-lg font-medium tracking-tight text-slate-950">
              建议
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              {answer.suggestions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-[30px] bg-orange-50/26 p-5 ring-1 ring-white/58 backdrop-blur-xl">
            <h3 className="text-lg font-medium tracking-tight text-slate-950">
              风险
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              {answer.risks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-[30px] bg-sky-50/30 p-5 ring-1 ring-white/58 backdrop-blur-xl">
            <h3 className="text-lg font-medium tracking-tight text-slate-950">
              下一步
            </h3>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              {answer.nextSteps.map((item, index) => (
                <li key={item}>
                  {index + 1}. {item}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <p className="border-t border-white/62 pt-5 text-xs leading-6 text-slate-500">
          {answer.disclaimer}
        </p>
      </div>
    </article>
  );
}
