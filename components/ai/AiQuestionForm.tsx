"use client";

import type { FormEvent } from "react";

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
        <label className="mb-3 block text-sm font-medium text-slate-500 lg:mb-4 lg:text-[15px]">
          输入你的出国问题
        </label>

        <textarea
          value={question}
          onChange={(event) => onQuestionChange(event.target.value)}
          placeholder="例如：预算 15 万人民币适合哪些出国路线？"
          rows={5}
          className="w-full min-w-0 resize-none rounded-[24px] border border-transparent bg-[radial-gradient(circle_at_12%_0%,rgba(186,230,253,0.14),transparent_42%),linear-gradient(145deg,rgba(255,255,255,0.42),rgba(248,250,252,0.28))] px-4 py-4 text-sm leading-7 text-slate-900 shadow-[inset_0_1px_2px_rgba(15,23,42,0.04)] outline-none ring-1 ring-white/68 backdrop-blur-xl transition placeholder:text-slate-400 focus:bg-[radial-gradient(circle_at_12%_0%,rgba(186,230,253,0.18),transparent_42%),linear-gradient(145deg,rgba(255,255,255,0.62),rgba(248,250,252,0.44))] focus:ring-4 focus:ring-white/60 sm:min-h-[9.5rem] sm:rounded-[28px] sm:px-5 sm:py-4 sm:text-[15px] lg:min-h-[11.5rem] lg:rounded-[30px] lg:px-5 lg:py-5 lg:text-base lg:leading-8"
        />
      </div>

      {error && (
        <p className="rounded-2xl bg-[linear-gradient(145deg,rgba(255,255,255,0.48),rgba(254,242,242,0.32))] px-4 py-3 text-sm leading-6 text-rose-700 ring-1 ring-rose-100/60">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-stretch">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-slate-950 px-5 py-3.5 text-sm font-medium text-white shadow-[0_16px_40px_rgba(15,23,42,0.20)] transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-1 lg:py-4 lg:text-[15px]"
        >
          {isLoading ? "正在整理回答..." : "生成模拟回答"}
        </button>

        {showReset && (
          <button
            type="button"
            disabled={isLoading}
            onClick={onReset}
            className="w-full rounded-full bg-white/42 px-5 py-3.5 text-sm font-medium text-slate-600 ring-1 ring-white/70 backdrop-blur-xl transition hover:bg-white/68 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:shrink-0 lg:py-4 lg:text-[15px]"
          >
            重新开始
          </button>
        )}
      </div>
    </form>
  );
}
