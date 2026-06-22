"use client";

import type { AiMockAnswer } from "@/lib/ai";

type AiAnswerCardProps = {
  question: string;
  answer: AiMockAnswer;
};

export default function AiAnswerCard({ question, answer }: AiAnswerCardProps) {
  return (
    <article className="overflow-hidden rounded-[32px] bg-white/92 shadow-[0_22px_70px_rgba(15,23,42,0.08)] ring-1 ring-black/5 backdrop-blur-xl">
      <div className="border-b border-slate-100 bg-[linear-gradient(145deg,rgba(255,255,255,0.96)_0%,rgba(248,250,252,0.92)_100%)] px-5 py-5 sm:px-7">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-sky-600">
          模拟回答
        </p>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
          {answer.title}
        </h2>

        <p className="mt-3 rounded-2xl bg-slate-50/90 px-4 py-3 text-sm leading-6 text-slate-500 ring-1 ring-slate-200/70">
          你的问题：{question}
        </p>
      </div>

      <div className="space-y-5 px-5 py-5 sm:px-7 sm:py-6">
        <section>
          <h3 className="mb-2 text-sm font-semibold text-slate-950">
            简短结论
          </h3>
          <p className="text-sm leading-7 text-slate-600">
            {answer.summary}
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-slate-50/80 p-4 ring-1 ring-slate-200/70">
            <h3 className="mb-3 text-sm font-semibold text-slate-950">
              分点建议
            </h3>
            <ul className="space-y-2 text-sm leading-6 text-slate-600">
              {answer.suggestions.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-amber-50/70 p-4 ring-1 ring-amber-200/70">
            <h3 className="mb-3 text-sm font-semibold text-amber-900">
              风险提醒
            </h3>
            <ul className="space-y-2 text-sm leading-6 text-amber-800">
              {answer.risks.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-3xl bg-sky-50/70 p-4 ring-1 ring-sky-100">
          <h3 className="mb-3 text-sm font-semibold text-slate-950">
            下一步行动
          </h3>
          <ol className="space-y-2 text-sm leading-6 text-slate-600">
            {answer.nextSteps.map((item, index) => (
              <li key={item}>
                {index + 1}. {item}
              </li>
            ))}
          </ol>
        </section>

        <p className="rounded-3xl bg-slate-950 px-4 py-3 text-xs leading-6 text-white/85">
          {answer.disclaimer}
        </p>
      </div>
    </article>
  );
}
