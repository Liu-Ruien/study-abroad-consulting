"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createMockAiAnswer, type AiMockAnswer } from "@/lib/ai";
import { usePageContent } from "@/lib/i18n/use-page-content";
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

const previewToneClasses = [
  cardPreviewConclusion,
  cardPreviewSuggestion,
  cardPreviewRisk,
];

type AiChatPanelProps = {
  initialQuestion?: string;
};

export default function AiChatPanel({
  initialQuestion = "",
}: AiChatPanelProps) {
  const copy = usePageContent();
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
      setError(copy.ai.emptyError);
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
            suggestions={copy.ai.quickQuestions}
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
              {copy.ai.loadingBadge}
            </p>

            <h2 className="text-2xl font-semibold leading-snug tracking-tight text-gray-950 sm:text-3xl lg:text-4xl">
              {copy.ai.loadingTitle}
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-600 sm:mt-5 sm:text-base">
              {copy.ai.loadingBody}
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
                {copy.ai.previewBadge}
              </p>

              <h2 className="mb-4 max-w-xl text-2xl font-semibold leading-snug tracking-tight text-gray-950 sm:mb-5 sm:text-3xl lg:text-5xl">
                {copy.ai.previewStructureTitle}
              </h2>

              <p className="max-w-2xl text-sm leading-relaxed text-gray-700 sm:text-base">
                {copy.ai.previewStructureBody}
              </p>
            </div>

            <div className="mt-6 grid gap-2.5 sm:mt-8 sm:grid-cols-3 sm:gap-3">
              {copy.ai.previewCards.map((item, index) => (
                <div
                  key={item.label}
                  className={`px-3.5 py-3.5 sm:px-4 sm:py-4 ${previewToneClasses[index]} ${cardHover}`}
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
