"use client";

import type { FormEvent } from "react";

type AiQuestionFormProps = {
  question: string;
  error: string;
  isLoading: boolean;
  onQuestionChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function AiQuestionForm({
  question,
  error,
  isLoading,
  onQuestionChange,
  onSubmit,
}: AiQuestionFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          输入你的出国问题
        </label>

        <textarea
          value={question}
          onChange={(event) => onQuestionChange(event.target.value)}
          placeholder="例如：预算 15 万人民币适合哪些出国路线？"
          rows={4}
          className="w-full resize-none rounded-[26px] border border-slate-200 bg-white/92 px-4 py-4 text-sm leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-sky-100/80"
        />
      </div>

      {error && (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "正在整理回答..." : "生成模拟回答"}
      </button>
    </form>
  );
}
