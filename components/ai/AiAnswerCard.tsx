"use client";

import type { AiMockAnswer } from "@/lib/ai";

type AiAnswerCardProps = {
  question: string;
  answer: AiMockAnswer;
};

export default function AiAnswerCard({ question, answer }: AiAnswerCardProps) {
  return (
    <article className="overflow-hidden rounded-[30px] bg-white/78 shadow-[0_18px_60px_rgba(15,23,42,0.055)] ring-1 ring-white/85 backdrop-blur-xl">
      <div className="px-5 py-5 sm:px-7 sm:py-6">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-sky-600/90">
          模拟回答
        </p>

        <h2 className="mt-2 text-2xl font-medium tracking-tight text-slate-950">
          {answer.title}
        </h2>

        <p className="mt-4 rounded-2xl bg-slate-50/72 px-4 py-3 text-sm leading-6 text-slate-500">
          你的问题：{question}
        </p>
      </div>

      <div className="space-y-6 border-t border-slate-200/45 px-5 py-5 sm:px-7 sm:py-6">
        <section>
          <h3 className="mb-2 text-sm font-medium text-slate-950">
            简短结论
          </h3>
          <p className="text-sm leading-7 text-slate-600">
            {answer.summary}
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-950">
              分点建议
            </h3>
            <ul className="space-y-2.5 text-sm leading-6 text-slate-600">
              {answer.suggestions.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl bg-slate-50/68 px-3.5 py-2.5"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-950">
              风险提醒
            </h3>
            <ul className="space-y-2.5 text-sm leading-6 text-slate-600">
              {answer.risks.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl bg-orange-50/42 px-3.5 py-2.5 text-slate-600"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-3xl bg-sky-50/45 p-4">
          <h3 className="mb-3 text-sm font-medium text-slate-950">
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

        <p className="border-t border-slate-200/55 pt-4 text-xs leading-6 text-slate-400">
          {answer.disclaimer}
        </p>
      </div>
    </article>
  );
}
