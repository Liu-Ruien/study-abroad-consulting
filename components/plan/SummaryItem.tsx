"use client";

import type { ReactNode } from "react";
import { cardInfo, cardInput } from "@/lib/ui/card-system";

type SummaryItemProps = {
  label: string;
  value: string;
  isEditing: boolean;
  onToggle: () => void;
  children: ReactNode;
};

export default function SummaryItem({
  label,
  value,
  isEditing,
  onToggle,
  children,
}: SummaryItemProps) {
  return (
    <div
      className={`rounded-[22px] text-sm leading-6 text-slate-700 transition-all duration-200 ${
        isEditing
          ? `${cardInput} ring-2 ring-sky-200/40`
          : `${cardInfo} hover:-translate-y-[1px] hover:shadow-md`
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
      >
        <span
          className={
            isEditing ? "shrink-0 text-slate-900" : "shrink-0 text-slate-400"
          }
        >
          {label}
        </span>

        <span className="flex items-center gap-2 text-right">
          <span className="font-semibold tracking-tight text-slate-950">
            {value}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-medium transition ${
              isEditing
                ? "bg-slate-950 text-white"
                : "bg-slate-100 text-slate-400 opacity-0 group-hover:opacity-100"
            }`}
          >
            {isEditing ? "编辑中" : "修改"}
          </span>
        </span>
      </button>

      {isEditing && (
        <div className="relative z-50 overflow-visible px-4 pb-4 pt-1">
          {children}
        </div>
      )}
    </div>
  );
}

export const SummarySelectItem = SummaryItem;
