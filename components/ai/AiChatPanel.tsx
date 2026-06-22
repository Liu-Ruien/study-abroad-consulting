"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { createMockAiAnswer, type AiMockAnswer } from "@/lib/ai";
import AiAnswerCard from "./AiAnswerCard";
import AiQuestionForm from "./AiQuestionForm";
import AiSuggestionChips from "./AiSuggestionChips";

const quickQuestions = [
  "日本语言学校期间应该怎么准备 IT 求职？",
  "预算 15 万人民币适合哪些出国路线？",
  "英语不好还能出国吗？",
  "留学、打工度假和工签路线有什么区别？",
];

type AiChatPanelProps = {
  initialQuestion?: string;
};

export default function AiChatPanel({
  initialQuestion = "",
}: AiChatPanelProps) {
  const normalizedInitialQuestion = initialQuestion.trim();
  const [question, setQuestion] = useState(normalizedInitialQuestion);
  const [submittedQuestion, setSubmittedQuestion] = useState(
    normalizedInitialQuestion
  );
  const [answer, setAnswer] = useState<AiMockAnswer | null>(() =>
    normalizedInitialQuestion
      ? createMockAiAnswer(normalizedInitialQuestion)
      : null
  );
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedQuickQuestion, setSelectedQuickQuestion] = useState("");
  const loadingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (loadingTimerRef.current) {
        window.clearTimeout(loadingTimerRef.current);
      }
    };
  }, []);

  function generateAnswer(nextQuestion: string) {
    const trimmedQuestion = nextQuestion.trim();

    if (!trimmedQuestion) {
      setError("请先输入你想了解的问题。");
      return;
    }

    if (loadingTimerRef.current) {
      window.clearTimeout(loadingTimerRef.current);
    }

    setQuestion(trimmedQuestion);
    setSubmittedQuestion(trimmedQuestion);
    setAnswer(null);
    setError("");
    setIsLoading(true);

    // 用短暂延迟模拟整理回答的过程，当前阶段不调用任何 AI API。
    loadingTimerRef.current = window.setTimeout(() => {
      setAnswer(createMockAiAnswer(trimmedQuestion));
      setIsLoading(false);
    }, 680);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSelectedQuickQuestion("");
    generateAnswer(question);
  }

  function handleSuggestionSelect(nextQuestion: string) {
    setSelectedQuickQuestion(nextQuestion);
    generateAnswer(nextQuestion);
  }

  function handleQuestionChange(value: string) {
    setQuestion(value);
    setSelectedQuickQuestion("");

    if (error) {
      setError("");
    }
  }

  return (
    <section className="grid min-w-0 gap-5 sm:gap-6 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:items-start lg:gap-8 xl:grid-cols-[minmax(0,460px)_minmax(0,1fr)]">
      <div className="min-w-0 rounded-[28px] bg-[radial-gradient(circle_at_14%_16%,rgba(186,230,253,0.48),transparent_42%),radial-gradient(circle_at_92%_10%,rgba(221,214,254,0.34),transparent_38%),linear-gradient(145deg,rgba(255,255,255,0.54),rgba(241,245,249,0.32))] p-4 shadow-[0_24px_80px_rgba(15,23,42,0.075)] ring-1 ring-white/72 backdrop-blur-2xl sm:rounded-[32px] sm:p-5 lg:rounded-[36px] lg:p-6 lg:shadow-[0_28px_90px_rgba(15,23,42,0.08)] xl:p-7">
        <AiQuestionForm
          question={question}
          error={error}
          isLoading={isLoading}
          onQuestionChange={handleQuestionChange}
          onSubmit={handleSubmit}
        />

        <div className="mt-4 border-t border-white/65 pt-4 sm:mt-5 sm:pt-5 lg:mt-5">
          <AiSuggestionChips
            suggestions={quickQuestions}
            selectedQuestion={selectedQuickQuestion}
            isLoading={isLoading}
            onSelect={handleSuggestionSelect}
          />
        </div>
      </div>

      <div className="min-h-[min(320px,52vh)] min-w-0 sm:min-h-[360px] lg:min-h-[420px]">
        {isLoading ? (
          <div className="flex min-h-[min(320px,52vh)] flex-col justify-center rounded-[28px] bg-[radial-gradient(circle_at_18%_14%,rgba(186,230,253,0.36),transparent_40%),radial-gradient(circle_at_84%_12%,rgba(251,207,232,0.28),transparent_36%),linear-gradient(145deg,rgba(255,255,255,0.48),rgba(248,250,252,0.28))] p-5 text-center shadow-[0_24px_80px_rgba(15,23,42,0.075)] ring-1 ring-white/72 backdrop-blur-2xl sm:min-h-[360px] sm:rounded-[32px] sm:p-7 lg:min-h-[420px] lg:rounded-[36px] lg:p-10">
            <p className="mx-auto mb-4 inline-flex rounded-full bg-white/58 px-3.5 py-1.5 text-xs font-medium text-sky-700 ring-1 ring-white/75 backdrop-blur-xl sm:mb-5 sm:px-4 sm:text-sm">
              正在整理回答
            </p>

            <h2 className="text-2xl font-medium tracking-[-0.035em] text-slate-950 sm:text-3xl lg:text-4xl">
              正在根据你的问题生成初步建议
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:mt-5 sm:leading-7">
              当前使用本地模拟逻辑，不调用真实 AI，也不会保存你的问题历史。
            </p>
          </div>
        ) : answer && submittedQuestion ? (
          <AiAnswerCard answer={answer} />
        ) : (
          <div className="flex min-h-[min(320px,52vh)] flex-col justify-between overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_16%_12%,rgba(186,230,253,0.38),transparent_38%),radial-gradient(circle_at_82%_14%,rgba(221,214,254,0.28),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.48),rgba(248,250,252,0.26))] p-5 shadow-[0_24px_80px_rgba(15,23,42,0.075)] ring-1 ring-white/72 backdrop-blur-2xl sm:min-h-[360px] sm:rounded-[32px] sm:p-7 lg:min-h-[420px] lg:rounded-[36px] lg:p-10">
            <div className="min-w-0">
              <p className="mb-3 inline-flex rounded-full bg-white/48 px-3 py-1.5 text-xs font-medium text-sky-700 ring-1 ring-white/70 backdrop-blur-xl sm:mb-4 sm:px-3.5 sm:text-sm">
                回答结构预览
              </p>

              <h2 className="mb-4 max-w-xl text-2xl font-medium tracking-[-0.04em] text-slate-950 sm:mb-5 sm:text-3xl lg:text-5xl">
                一个问题，会被拆成三个部分。
              </h2>

              <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                你可以询问留学、语言学校、预算、路线选择、求职准备或签证风险。
                当前 MVP 只使用本地规则整理回答，不调用真实 AI 服务。
              </p>
            </div>

            <div className="mt-6 grid gap-2.5 sm:mt-8 sm:grid-cols-3 sm:gap-3">
              {["结论", "建议", "风险"].map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] bg-white/42 px-3.5 py-3.5 ring-1 ring-white/68 backdrop-blur-xl sm:rounded-[26px] sm:px-4 sm:py-4"
                >
                  <p className="text-base font-medium tracking-tight text-slate-950 sm:text-lg">
                    {item}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    先看清楚，再继续核实。
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
