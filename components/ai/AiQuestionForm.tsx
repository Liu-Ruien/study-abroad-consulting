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
        <label className="mb-3 block text-sm font-medium text-slate-500">
          输入你的出国问题
        </label>

        <textarea
          value={question}
          onChange={(event) => onQuestionChange(event.target.value)}
          placeholder="例如：预算 15 万人民币适合哪些出国路线？"
          rows={5}
          className="w-full resize-none rounded-[30px] border border-transparent bg-white/42 px-4 py-4 text-sm leading-7 text-slate-900 shadow-inner outline-none ring-1 ring-white/68 backdrop-blur-xl transition placeholder:text-slate-400 focus:bg-white/72 focus:ring-4 focus:ring-white/65"
        />
      </div>

      {error && (
        <p className="rounded-2xl bg-white/58 px-4 py-3 text-sm leading-6 text-rose-700 ring-1 ring-rose-100/70">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-full bg-slate-950 px-5 py-3.5 text-sm font-medium text-white shadow-[0_16px_40px_rgba(15,23,42,0.20)] transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "正在整理回答..." : "生成模拟回答"}
      </button>
    </form>
  );
}
