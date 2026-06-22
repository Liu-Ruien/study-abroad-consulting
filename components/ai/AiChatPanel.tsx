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
      setError("请先输入一个想咨询的问题。");
      return;
    }

    if (loadingTimerRef.current) {
      window.clearTimeout(loadingTimerRef.current);
    }

    setQuestion(trimmedQuestion);
    setError("");
    setIsLoading(true);

    // 用短暂延迟模拟整理回答的过程，当前阶段不调用任何 AI API。
    loadingTimerRef.current = window.setTimeout(() => {
      setSubmittedQuestion(trimmedQuestion);
      setAnswer(createMockAiAnswer(trimmedQuestion));
      setIsLoading(false);
    }, 520);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    generateAnswer(question);
  }

  function handleSuggestionSelect(nextQuestion: string) {
    generateAnswer(nextQuestion);
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-start">
      <div className="rounded-[32px] bg-[radial-gradient(circle_at_16%_8%,rgba(14,165,233,0.075)_0%,rgba(224,242,254,0.30)_34%,transparent_62%),linear-gradient(145deg,rgba(255,255,255,0.94)_0%,rgba(248,250,252,0.88)_58%,rgba(255,255,255,0.92)_100%)] p-4 shadow-[0_22px_55px_rgba(15,23,42,0.075)] ring-1 ring-white/80 backdrop-blur-xl sm:p-5">
        <AiQuestionForm
          question={question}
          error={error}
          isLoading={isLoading}
          onQuestionChange={setQuestion}
          onSubmit={handleSubmit}
        />

        <div className="mt-6 border-t border-slate-200/70 pt-5">
          <AiSuggestionChips
            suggestions={quickQuestions}
            isLoading={isLoading}
            onSelect={handleSuggestionSelect}
          />
        </div>
      </div>

      <div className="min-h-[360px]">
        {answer && submittedQuestion ? (
          <AiAnswerCard question={submittedQuestion} answer={answer} />
        ) : (
          <div className="flex min-h-[360px] flex-col justify-between rounded-[32px] border border-dashed border-sky-200 bg-gradient-to-br from-sky-50 to-white p-5 shadow-sm sm:p-8">
            <div>
              <p className="mb-3 text-sm font-medium text-sky-700">
                等待你的问题
              </p>

              <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-950">
                这里会显示本地模拟回答
              </h2>

              <p className="max-w-2xl text-sm leading-7 text-slate-600">
                你可以询问留学、语言学校、预算、路线选择、求职准备或签证风险。
                当前 MVP 只使用本地规则整理回答，不调用真实 AI 服务。
              </p>
            </div>

            <div className="mt-8 rounded-3xl bg-amber-50/70 p-4 text-sm leading-7 text-amber-800 ring-1 ring-amber-200/70">
              回答仅适合作为初步信息整理。涉及政策、签证、学校和费用时，请继续核实官方渠道。
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
