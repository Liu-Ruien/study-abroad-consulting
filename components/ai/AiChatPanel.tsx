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
    <section className="grid gap-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-start">
      <div className="rounded-[36px] bg-[linear-gradient(145deg,rgba(255,255,255,0.58),rgba(255,255,255,0.34))] p-4 shadow-[0_24px_80px_rgba(15,23,42,0.075)] ring-1 ring-white/72 backdrop-blur-2xl sm:p-5">
        <AiQuestionForm
          question={question}
          error={error}
          isLoading={isLoading}
          onQuestionChange={handleQuestionChange}
          onSubmit={handleSubmit}
        />

        <div className="mt-6 border-t border-white/65 pt-5">
          <AiSuggestionChips
            suggestions={quickQuestions}
            selectedQuestion={selectedQuickQuestion}
            isLoading={isLoading}
            onSelect={handleSuggestionSelect}
          />
        </div>
      </div>

      <div className="min-h-[420px]">
        {isLoading ? (
          <div className="flex min-h-[420px] flex-col justify-center rounded-[36px] bg-white/50 p-7 text-center shadow-[0_24px_90px_rgba(15,23,42,0.08)] ring-1 ring-white/72 backdrop-blur-2xl sm:p-10">
            <p className="mx-auto mb-5 inline-flex rounded-full bg-white/58 px-4 py-1.5 text-sm font-medium text-sky-700 ring-1 ring-white/75 backdrop-blur-xl">
              正在整理回答
            </p>

            <h2 className="text-3xl font-medium tracking-[-0.035em] text-slate-950 sm:text-4xl">
              正在根据你的问题生成初步建议
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-500">
              当前使用本地模拟逻辑，不调用真实 AI，也不会保存你的问题历史。
            </p>
          </div>
        ) : answer && submittedQuestion ? (
          <AiAnswerCard question={submittedQuestion} answer={answer} />
        ) : (
          <div className="flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[36px] bg-[radial-gradient(circle_at_82%_14%,rgba(191,219,254,0.36),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.52),rgba(255,255,255,0.28))] p-7 shadow-[0_24px_90px_rgba(15,23,42,0.07)] ring-1 ring-white/70 backdrop-blur-2xl sm:p-10">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-white/48 px-3.5 py-1.5 text-sm font-medium text-sky-700 ring-1 ring-white/70 backdrop-blur-xl">
                回答结构预览
              </p>

              <h2 className="mb-5 max-w-xl text-3xl font-medium tracking-[-0.04em] text-slate-950 sm:text-5xl">
                一个问题，会被拆成三个部分。
              </h2>

              <p className="max-w-2xl text-base leading-8 text-slate-600">
                你可以询问留学、语言学校、预算、路线选择、求职准备或签证风险。
                当前 MVP 只使用本地规则整理回答，不调用真实 AI 服务。
              </p>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {["结论", "建议", "风险"].map((item) => (
                <div
                  key={item}
                  className="rounded-[26px] bg-white/42 px-4 py-4 ring-1 ring-white/68 backdrop-blur-xl"
                >
                  <p className="text-lg font-medium tracking-tight text-slate-950">
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
