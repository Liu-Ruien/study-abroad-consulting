"use client";

import type { FormEvent } from "react";
import { btnPrimary, btnSecondary, inputField } from "@/lib/ui/card-system";

type AiQuestionFormProps = {
  question: string;
  error: string;
  isLoading: boolean;
  showReset: boolean;
  onQuestionChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
};

export default function AiQuestionForm({
  question,
  error,
  isLoading,
  showReset,
  onQuestionChange,
  onSubmit,
  onReset,
}: AiQuestionFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 lg:space-y-5">
      <div>
        <label className="mb-3 block text-sm font-medium text-gray-500 lg:mb-4 lg:text-[15px]">
          输入你的出国问题
        </label>

        <textarea
          value={question}
          onChange={(event) => onQuestionChange(event.target.value)}
          placeholder="例如：预算 15 万人民币适合哪些出国路线？"
          rows={5}
          className={`w-full min-w-0 resize-none rounded-xl px-4 py-4 text-sm leading-relaxed text-gray-900 placeholder:text-gray-400 sm:min-h-[9.5rem] sm:px-5 sm:py-4 sm:text-[15px] lg:min-h-[11.5rem] lg:px-5 lg:py-5 lg:text-base ${inputField}`}
        />
      </div>

      {error && (
        <p className="rounded-xl border border-rose-200/80 bg-rose-50/40 px-4 py-3 text-sm leading-relaxed text-rose-700 shadow-sm">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-stretch">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full rounded-full px-5 py-3.5 text-sm font-medium sm:flex-1 lg:py-4 lg:text-[15px] ${btnPrimary}`}
        >
          {isLoading ? "正在整理回答..." : "生成模拟回答"}
        </button>

        {showReset && (
          <button
            type="button"
            disabled={isLoading}
            onClick={onReset}
            className={`w-full rounded-full px-5 py-3.5 text-sm font-medium sm:w-auto sm:shrink-0 lg:py-4 lg:text-[15px] ${btnSecondary}`}
          >
            重新开始
          </button>
        )}
      </div>
    </form>
  );
}
