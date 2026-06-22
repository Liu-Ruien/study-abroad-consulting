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

export default function AiChatPanel() {
  const [question, setQuestion] = useState("");
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [answer, setAnswer] = useState<AiMockAnswer | null>(null);
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
    <section className="grid gap-7 lg:grid-cols-[minmax(0,390px)_minmax(0,1fr)] lg:items-start">
      <div className="rounded-[30px] bg-white/74 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.055)] ring-1 ring-white/85 backdrop-blur-xl sm:p-5">
        <AiQuestionForm
          question={question}
          error={error}
          isLoading={isLoading}
          onQuestionChange={handleQuestionChange}
          onSubmit={handleSubmit}
        />

        <div className="mt-6 border-t border-slate-200/50 pt-5">
          <AiSuggestionChips
            suggestions={quickQuestions}
            selectedQuestion={selectedQuickQuestion}
            isLoading={isLoading}
            onSelect={handleSuggestionSelect}
          />
        </div>
      </div>

      <div className="min-h-[360px]">
        {isLoading ? (
          <div className="flex min-h-[340px] flex-col justify-center rounded-[30px] bg-white/76 p-6 text-center shadow-[0_18px_55px_rgba(15,23,42,0.055)] ring-1 ring-white/85 backdrop-blur-xl sm:p-8">
            <p className="mx-auto mb-4 inline-flex rounded-full bg-sky-50/85 px-4 py-1.5 text-sm font-medium text-sky-700 ring-1 ring-sky-100/80">
              正在整理回答
            </p>

            <h2 className="text-2xl font-medium tracking-tight text-slate-950">
              正在根据你的问题生成初步建议
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500">
              当前使用本地模拟逻辑，不调用真实 AI，也不会保存你的问题历史。
            </p>
          </div>
        ) : answer && submittedQuestion ? (
          <AiAnswerCard question={submittedQuestion} answer={answer} />
        ) : (
          <div className="flex min-h-[340px] flex-col justify-between rounded-[30px] bg-white/64 p-5 shadow-[0_14px_45px_rgba(15,23,42,0.045)] ring-1 ring-white/80 backdrop-blur-xl sm:p-8">
            <div>
              <p className="mb-3 text-sm font-medium text-sky-700">
                等待你的问题
              </p>

              <h2 className="mb-4 text-2xl font-medium tracking-tight text-slate-950">
                这里会显示本地模拟回答
              </h2>

              <p className="max-w-2xl text-sm leading-7 text-slate-600">
                你可以询问留学、语言学校、预算、路线选择、求职准备或签证风险。
                当前 MVP 只使用本地规则整理回答，不调用真实 AI 服务。
              </p>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-50/80 p-4 text-sm leading-7 text-slate-500 ring-1 ring-slate-200/60">
              回答仅适合作为初步信息整理。涉及政策、签证、学校和费用时，请继续核实官方渠道。
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
