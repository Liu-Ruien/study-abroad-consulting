"use client";

import type { ReactNode } from "react";

type FormSectionProps = {
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
};

export default function FormSection({
  title,
  description,
  isOpen,
  onToggle,
  children,
}: FormSectionProps) {
  return (
    <section
      className={`relative rounded-[22px] bg-white/80 ring-1 ring-slate-200/80 transition-all duration-200 ${isOpen ? "z-10 overflow-visible shadow-sm" : "z-0 overflow-hidden"
        }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-slate-50/80"
      >
        <div>
          <h3 className="font-semibold text-slate-950">{title}</h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
        </div>

        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""
            }`}
        >
          ˅
        </span>
      </button>

      {isOpen && (
        <div className="relative space-y-3 overflow-visible border-t border-slate-100 px-4 py-4 pb-5">
          {children}
        </div>
      )}
    </section>
  );
}
