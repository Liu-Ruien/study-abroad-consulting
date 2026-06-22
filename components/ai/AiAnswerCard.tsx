"use client";

import { useEffect, useRef, useState } from "react";
import { formatAiAnswerForCopy, type AiMockAnswer } from "@/lib/ai";

type AiAnswerCardProps = {
  answer: AiMockAnswer;
};

export default function AiAnswerCard({ answer }: AiAnswerCardProps) {
  const [copyToastMessage, setCopyToastMessage] = useState("");
  const [isCopyToastVisible, setIsCopyToastVisible] = useState(false);
  const copyToastTimerRef = useRef<number | null>(null);
  const copyToastHideTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyToastTimerRef.current) {
        window.clearTimeout(copyToastTimerRef.current);
      }

      if (copyToastHideTimerRef.current) {
        window.clearTimeout(copyToastHideTimerRef.current);
      }
    };
  }, []);

  function showCopyToast(message: string) {
    if (copyToastTimerRef.current) {
      window.clearTimeout(copyToastTimerRef.current);
    }

    if (copyToastHideTimerRef.current) {
      window.clearTimeout(copyToastHideTimerRef.current);
    }

    setCopyToastMessage(message);
    setIsCopyToastVisible(true);

    copyToastTimerRef.current = window.setTimeout(() => {
      setIsCopyToastVisible(false);

      copyToastHideTimerRef.current = window.setTimeout(() => {
        setCopyToastMessage("");
      }, 260);
    }, 1800);
  }

  async function handleCopyAnswer() {
    try {
      await navigator.clipboard.writeText(formatAiAnswerForCopy(answer));
      showCopyToast("已复制回答");
    } catch {
      showCopyToast("复制失败，请手动选择文本");
    }
  }

  return (
    <>
      <div
        aria-live="polite"
        className={`pointer-events-none fixed left-1/2 top-[4.25rem] z-[70] max-w-[min(calc(100vw-2rem),20rem)] -translate-x-1/2 rounded-full bg-white/86 px-4 py-2.5 text-center text-xs font-medium text-slate-900 shadow-[0_18px_45px_rgba(15,23,42,0.14)] ring-1 ring-white/80 backdrop-blur-xl transition-all duration-300 sm:top-20 sm:max-w-none sm:px-5 sm:py-3 sm:text-sm md:top-24 ${
          isCopyToastVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-2 opacity-0"
        }`}
      >
        {copyToastMessage}
      </div>

      <article className="min-w-0 overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_78%_6%,rgba(251,207,232,0.34),transparent_36%),radial-gradient(circle_at_14%_14%,rgba(186,230,253,0.40),transparent_40%),radial-gradient(circle_at_50%_88%,rgba(221,214,254,0.20),transparent_42%),linear-gradient(145deg,rgba(255,255,255,0.48),rgba(248,250,252,0.28))] shadow-[0_24px_80px_rgba(15,23,42,0.075)] ring-1 ring-white/72 backdrop-blur-2xl sm:rounded-[32px] lg:rounded-[36px]">
        <div className="relative px-5 py-6 sm:px-7 sm:py-7 lg:px-9 lg:py-9">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_72%_0%,rgba(251,207,232,0.22),transparent_58%),radial-gradient(circle_at_18%_0%,rgba(186,230,253,0.24),transparent_56%)] sm:h-40" />

          <div className="relative min-w-0">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-sky-600/90">
                模拟回答
              </p>

              <button
                type="button"
                onClick={handleCopyAnswer}
                className="inline-flex w-fit shrink-0 rounded-full bg-white/42 px-3.5 py-1.5 text-xs font-medium text-slate-700 ring-1 ring-white/70 backdrop-blur-xl transition hover:bg-white/68 hover:text-slate-950 sm:px-4 sm:py-2 sm:text-sm"
              >
                复制回答
              </button>
            </div>

            <h2 className="mt-3 break-words text-2xl font-medium tracking-[-0.04em] text-slate-950 sm:text-3xl md:text-4xl lg:text-5xl">
              {answer.title}
            </h2>

            <p className="mt-4 max-w-3xl break-words text-sm leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
              {answer.summary}
            </p>
          </div>
        </div>

        <div className="space-y-5 border-t border-white/58 px-5 py-5 sm:space-y-7 sm:px-7 sm:py-6 lg:px-9 lg:py-8">
          <section className="grid min-w-0 gap-4 sm:gap-5 lg:grid-cols-3">
            <div className="min-w-0 rounded-[24px] bg-[radial-gradient(circle_at_18%_18%,rgba(186,230,253,0.36),transparent_52%),linear-gradient(145deg,rgba(255,255,255,0.32),rgba(238,242,255,0.22))] p-4 ring-1 ring-white/58 backdrop-blur-xl sm:rounded-[30px] sm:p-5">
              <h3 className="text-base font-medium tracking-tight text-slate-950 sm:text-lg">
                建议
              </h3>
              <ul className="mt-3 space-y-2.5 text-sm leading-6 text-slate-600 sm:mt-4 sm:space-y-3">
                {answer.suggestions.map((item) => (
                  <li key={item} className="break-words">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0 rounded-[24px] bg-[radial-gradient(circle_at_18%_18%,rgba(254,215,170,0.34),transparent_52%),linear-gradient(145deg,rgba(255,255,255,0.30),rgba(255,247,237,0.20))] p-4 ring-1 ring-white/58 backdrop-blur-xl sm:rounded-[30px] sm:p-5">
              <h3 className="text-base font-medium tracking-tight text-slate-950 sm:text-lg">
                风险
              </h3>
              <ul className="mt-3 space-y-2.5 text-sm leading-6 text-slate-600 sm:mt-4 sm:space-y-3">
                {answer.risks.map((item) => (
                  <li key={item} className="break-words">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0 rounded-[24px] bg-[radial-gradient(circle_at_18%_18%,rgba(186,230,253,0.30),transparent_52%),linear-gradient(145deg,rgba(255,255,255,0.30),rgba(224,242,254,0.22))] p-4 ring-1 ring-white/58 backdrop-blur-xl sm:rounded-[30px] sm:p-5">
              <h3 className="text-base font-medium tracking-tight text-slate-950 sm:text-lg">
                下一步
              </h3>
              <ol className="mt-3 space-y-2.5 text-sm leading-6 text-slate-600 sm:mt-4 sm:space-y-3">
                {answer.nextSteps.map((item, index) => (
                  <li key={item} className="break-words">
                    {index + 1}. {item}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <p className="break-words border-t border-white/62 pt-4 text-xs leading-6 text-slate-500 sm:pt-5">
            {answer.disclaimer}
          </p>
        </div>
      </article>
    </>
  );
}
