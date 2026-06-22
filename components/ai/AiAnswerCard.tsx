"use client";

import { useEffect, useRef, useState } from "react";
import { formatAiAnswerForCopy, type AiMockAnswer } from "@/lib/ai";
import {
  btnSecondary,
  cardAnswer,
  cardAnswerNext,
  cardAnswerRisk,
  cardAnswerSuggest,
  cardHover,
} from "@/lib/ui/card-system";

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
        className={`pointer-events-none fixed left-1/2 top-[4.25rem] z-[70] max-w-[min(calc(100vw-2rem),20rem)] -translate-x-1/2 rounded-full border border-sky-100/90 bg-white/95 px-4 py-2.5 text-center text-xs font-medium text-gray-900 shadow-md transition-all duration-300 sm:top-20 sm:max-w-none sm:px-5 sm:py-3 sm:text-sm md:top-24 ${
          isCopyToastVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-2 opacity-0"
        }`}
      >
        {copyToastMessage}
      </div>

      <article className={`min-w-0 overflow-hidden ${cardAnswer}`}>
        <div className="px-5 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="min-w-0">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-sky-600">
                模拟回答
              </p>

              <button
                type="button"
                onClick={handleCopyAnswer}
                className={`inline-flex w-fit shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium sm:px-4 sm:py-2 sm:text-sm ${btnSecondary}`}
              >
                复制回答
              </button>
            </div>

            <h2 className="mt-4 break-words text-2xl font-semibold leading-snug tracking-tight text-gray-950 sm:text-3xl md:text-4xl lg:text-[2.75rem]">
              {answer.title}
            </h2>

            <p className="mt-6 max-w-3xl break-words text-base leading-relaxed text-gray-700 sm:mt-7 sm:text-lg">
              {answer.summary}
            </p>
          </div>
        </div>

        <div className="space-y-8 border-t border-indigo-100/60 px-5 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
          <section className="grid min-w-0 items-start gap-4 sm:gap-5 lg:grid-cols-3">
            <div className={`min-w-0 p-5 sm:p-6 ${cardAnswerSuggest} ${cardHover}`}>
              <h3 className="text-base font-semibold leading-snug text-gray-950 sm:text-lg">
                建议
              </h3>
              <ul className="mt-5 space-y-4 text-sm leading-relaxed text-gray-700 sm:text-[15px]">
                {answer.suggestions.map((item) => (
                  <li key={item} className="break-words">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`min-w-0 p-5 sm:p-6 ${cardAnswerRisk} ${cardHover}`}>
              <h3 className="text-base font-semibold leading-snug text-gray-950 sm:text-lg">
                风险
              </h3>
              <ul className="mt-5 space-y-4 text-sm leading-relaxed text-gray-700 sm:text-[15px]">
                {answer.risks.map((item) => (
                  <li key={item} className="break-words">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`min-w-0 p-5 sm:p-6 ${cardAnswerNext} ${cardHover}`}>
              <h3 className="text-base font-semibold leading-snug text-gray-950 sm:text-lg">
                下一步
              </h3>
              <ol className="mt-5 space-y-4 text-sm leading-relaxed text-gray-700 sm:text-[15px]">
                {answer.nextSteps.map((item, index) => (
                  <li key={item} className="break-words">
                    {index + 1}. {item}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <p className="break-words border-t border-indigo-100/50 pt-6 text-xs leading-relaxed text-gray-500 sm:text-sm">
            {answer.disclaimer}
          </p>
        </div>
      </article>
    </>
  );
}
