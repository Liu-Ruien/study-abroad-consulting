"use client";

import type { ReactNode } from "react";
import { cardTintSky } from "@/lib/ui/card-system";

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
      className={`relative rounded-[22px] transition-all duration-200 ${cardTintSky} ${
        isOpen ? "z-10 overflow-visible shadow-sm" : "z-0 overflow-hidden"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-sky-50/30"
      >
        <div>
          <h3 className="font-semibold text-slate-950">{title}</h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
        </div>

        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-sky-100/80 bg-sky-50/60 text-sm text-slate-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ˅
        </span>
      </button>

      {isOpen && (
        <div className="relative space-y-3 overflow-visible border-t border-sky-100/70 px-4 py-4 pb-5">
          {children}
        </div>
      )}
    </section>
  );
}
