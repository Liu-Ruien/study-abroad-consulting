"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { languageOptions, type Language } from "@/lib/i18n/language";
import { uiStrings } from "@/lib/i18n/ui-strings";

type LanguageDropdownProps = {
  className?: string;
  variant?: "navbar" | "menu";
};

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0 text-slate-900"
    >
      <path
        d="M3.5 8.2 6.4 11 12.5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`h-3 w-3 shrink-0 text-slate-400 transition-transform duration-150 ease-out ${
        open ? "rotate-180" : ""
      }`}
    >
      <path
        d="M4 6.2 8 10.2 12 6.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const menuPanelClass =
  "rounded-2xl border border-white/40 bg-white/90 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl";

export default function LanguageDropdown({
  className = "",
  variant = "navbar",
}: LanguageDropdownProps) {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const strings = uiStrings[language];

  const currentLabel =
    languageOptions.find((option) => option.id === language)?.label ?? "中文";

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function handleSelect(nextLanguage: Language) {
    setLanguage(nextLanguage);
    setOpen(false);
  }

  function renderOptions(inline = false) {
    return (
      <div
        className={`${menuPanelClass} ${
          inline
            ? "mt-1.5"
            : "absolute right-0 top-[calc(100%+0.4rem)] z-50 min-w-[9.5rem] origin-top-right scale-100 opacity-100 transition duration-150 ease-out"
        }`}
        role="menu"
      >
        {languageOptions.map((option) => {
          const isActive = language === option.id;

          return (
            <button
              key={option.id}
              type="button"
              role="menuitemradio"
              aria-checked={isActive}
              onClick={() => handleSelect(option.id)}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition duration-150 ease-out ${
                isActive
                  ? "bg-slate-100/90 font-medium text-slate-950"
                  : "text-slate-600 hover:bg-slate-50/90 hover:text-slate-950"
              }`}
            >
              <span className="flex h-3.5 w-3.5 items-center justify-center">
                {isActive ? <CheckIcon /> : null}
              </span>
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === "menu") {
    return (
      <div ref={rootRef} className={className}>
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="menu"
          onClick={() => setOpen((current) => !current)}
          className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition duration-150 ease-out hover:bg-slate-50"
        >
          <span>{strings.languageMenuLabel}</span>
          <ChevronIcon open={open} />
        </button>

        {open ? renderOptions(true) : null}
      </div>
    );
  }

  return (
    <div ref={rootRef} className={`relative shrink-0 ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Language"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/70 bg-white/70 px-2.5 py-1.5 text-sm font-medium text-slate-600 shadow-sm backdrop-blur-sm transition duration-150 ease-out hover:border-slate-300/80 hover:bg-white/90 hover:text-slate-950"
      >
        <span aria-hidden="true" className="text-[13px] leading-none">
          🌐
        </span>
        <span>{currentLabel}</span>
        <ChevronIcon open={open} />
      </button>

      {open ? renderOptions() : null}
    </div>
  );
}
