"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createMockAiAnswer, type AiMockAnswer } from "@/lib/ai";
import {
  badgeSoft,
  cardAnswerPreview,
  cardHover,
  cardInput,
  cardPreviewConclusion,
  cardPreviewRisk,
  cardPreviewSuggestion,
} from "@/lib/ui/card-system";
import AiAnswerCard from "./AiAnswerCard";
import AiQuestionForm from "./AiQuestionForm";
import AiSuggestionChips from "./AiSuggestionChips";

const quickQuestions = [
  "日本语言学校期间应该怎么准备 IT 求职？",
  "预算 15 万人民币适合哪些出国路线？",
  "英语不好还能出国吗？",
  "留学、打工度假和工签路线有什么区别？",
];

const previewCards = [
  { label: "结论", hint: "先看清楚，再继续核实。", toneClass: cardPreviewConclusion },
  { label: "建议", hint: "先看清楚，再继续核实。", toneClass: cardPreviewSuggestion },
  { label: "风险", hint: "先看清楚，再继续核实。", toneClass: cardPreviewRisk },
];

type AiChatPanelProps = {
  initialQuestion?: string;
};

export default function AiChatPanel({
  initialQuestion = "",
}: AiChatPanelProps) {
  const router = useRouter();
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

  function handleReset() {
    if (loadingTimerRef.current) {
      window.clearTimeout(loadingTimerRef.current);
      loadingTimerRef.current = null;
    }

    setQuestion("");
    setSubmittedQuestion("");
    setAnswer(null);
    setError("");
    setSelectedQuickQuestion("");
    setIsLoading(false);
    router.replace("/ai");
  }

  const showReset =
    Boolean(question.trim()) ||
    Boolean(submittedQuestion.trim()) ||
    answer !== null;

  return (
    <section className="grid min-w-0 gap-5 sm:gap-6 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:items-start lg:gap-8 xl:grid-cols-[minmax(0,460px)_minmax(0,1fr)]">
      <div className={`min-w-0 p-4 sm:p-5 lg:p-6 xl:p-7 ${cardInput}`}>
        <AiQuestionForm
          question={question}
          error={error}
          isLoading={isLoading}
          showReset={showReset}
          onQuestionChange={handleQuestionChange}
          onSubmit={handleSubmit}
          onReset={handleReset}
        />

        <div className="mt-4 border-t border-sky-100/80 pt-4 sm:mt-5 sm:pt-5">
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
          <div
            className={`flex min-h-[min(320px,52vh)] flex-col justify-center p-5 text-center sm:min-h-[360px] sm:p-7 lg:min-h-[420px] lg:p-10 ${cardAnswerPreview}`}
          >
            <p className={`mx-auto mb-4 inline-flex sm:mb-5 sm:px-4 sm:text-sm ${badgeSoft} px-3.5 py-1.5 text-sky-700`}>
              正在整理回答
            </p>

            <h2 className="text-2xl font-semibold leading-snug tracking-tight text-gray-950 sm:text-3xl lg:text-4xl">
              正在根据你的问题生成初步建议
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-600 sm:mt-5 sm:text-base">
              当前为本地模拟逻辑，用于演示 AI 问答场景下的信息拆解，不调用真实 API，也不会保存问题历史。
            </p>
          </div>
        ) : answer && submittedQuestion ? (
          <AiAnswerCard answer={answer} />
        ) : (
          <div
            className={`flex min-h-[min(320px,52vh)] flex-col justify-between overflow-hidden p-5 sm:min-h-[360px] sm:p-7 lg:min-h-[420px] lg:p-10 ${cardAnswerPreview}`}
          >
            <div className="min-w-0">
              <p className={`mb-3 inline-flex sm:mb-4 sm:px-3.5 sm:text-sm ${badgeSoft} px-3 py-1.5 text-sky-700`}>
                回答结构预览
              </p>

              <h2 className="mb-4 max-w-xl text-2xl font-semibold leading-snug tracking-tight text-gray-950 sm:mb-5 sm:text-3xl lg:text-5xl">
                一个问题，会被拆成三个部分。
              </h2>

              <p className="max-w-2xl text-sm leading-relaxed text-gray-700 sm:text-base">
                你可以询问留学、语言学校、预算、路线选择、求职准备或签证风险。
                本 MVP 用 Next.js + TypeScript 组件化实现，仅做本地规则整理，不接真实 AI。
              </p>
            </div>

            <div className="mt-6 grid gap-2.5 sm:mt-8 sm:grid-cols-3 sm:gap-3">
              {previewCards.map((item) => (
                <div
                  key={item.label}
                  className={`px-3.5 py-3.5 sm:px-4 sm:py-4 ${item.toneClass} ${cardHover}`}
                >
                  <p className="text-base font-semibold leading-snug text-gray-950 sm:text-lg">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {item.hint}
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
