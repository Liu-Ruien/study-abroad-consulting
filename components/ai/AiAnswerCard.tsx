"use client";

import type { AiMockAnswer } from "@/lib/ai";

type AiAnswerCardProps = {
  answer: AiMockAnswer;
};

export default function AiAnswerCard({ answer }: AiAnswerCardProps) {
  return (
    <article className="overflow-hidden rounded-[36px] bg-[radial-gradient(circle_at_78%_6%,rgba(251,207,232,0.34),transparent_36%),radial-gradient(circle_at_14%_14%,rgba(186,230,253,0.40),transparent_40%),radial-gradient(circle_at_50%_88%,rgba(221,214,254,0.20),transparent_42%),linear-gradient(145deg,rgba(255,255,255,0.48),rgba(248,250,252,0.28))] shadow-[0_24px_80px_rgba(15,23,42,0.075)] ring-1 ring-white/72 backdrop-blur-2xl">
      <div className="relative px-6 py-7 sm:px-9 sm:py-9">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_72%_0%,rgba(251,207,232,0.22),transparent_58%),radial-gradient(circle_at_18%_0%,rgba(186,230,253,0.24),transparent_56%)]" />

        <div className="relative">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-sky-600/90">
            模拟回答
          </p>

          <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-slate-950 sm:text-5xl">
            {answer.title}
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
            {answer.summary}
          </p>
        </div>
      </div>

      <div className="space-y-7 border-t border-white/58 px-6 py-6 sm:px-9 sm:py-8">
        <section className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-[30px] bg-[radial-gradient(circle_at_18%_18%,rgba(186,230,253,0.36),transparent_52%),linear-gradient(145deg,rgba(255,255,255,0.32),rgba(238,242,255,0.22))] p-5 ring-1 ring-white/58 backdrop-blur-xl">
            <h3 className="text-lg font-medium tracking-tight text-slate-950">
              建议
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              {answer.suggestions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-[30px] bg-[radial-gradient(circle_at_18%_18%,rgba(254,215,170,0.34),transparent_52%),linear-gradient(145deg,rgba(255,255,255,0.30),rgba(255,247,237,0.20))] p-5 ring-1 ring-white/58 backdrop-blur-xl">
            <h3 className="text-lg font-medium tracking-tight text-slate-950">
              风险
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              {answer.risks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-[30px] bg-[radial-gradient(circle_at_18%_18%,rgba(186,230,253,0.30),transparent_52%),linear-gradient(145deg,rgba(255,255,255,0.30),rgba(224,242,254,0.22))] p-5 ring-1 ring-white/58 backdrop-blur-xl">
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
