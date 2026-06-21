"use client";

import { useEffect, useRef, useState } from "react";

export type SelectFieldOption<T extends string> = {
  value: T;
  label: string;
};

type SelectFieldProps<T extends string> = {
  label: string;
  value: T;
  options: SelectFieldOption<T>[];
  onChange: (value: T) => void;
  helperText?: string;
};

export default function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
  helperText,
}: SelectFieldProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!selectRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={selectRef} className={`relative ${isOpen ? "z-50" : "z-0"}`}>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-2xl border bg-white/90 px-4 py-3 text-left text-sm outline-none transition duration-200 ${isOpen
          ? "border-slate-300 shadow-sm ring-4 ring-sky-100/80"
          : "border-slate-200 hover:border-slate-300 hover:bg-white"
          }`}
      >
        <span className="text-slate-950">
          {selectedOption?.label ?? "请选择"}
        </span>

        <span
          className={`ml-3 flex h-4 w-4 shrink-0 items-center justify-center transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
          aria-hidden="true"
        >
          <span className="h-2 w-2 rotate-45 border-b-2 border-r-2 border-slate-400" />
        </span>
      </button>

      <div
        className={`absolute left-0 right-0 top-full z-50 mt-2 origin-top overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_48px_rgba(15,23,42,0.14)] ring-1 ring-black/5 transition duration-200 ${isOpen
          ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
          : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"
          }`}
      >
        <div className="max-h-[min(16rem,50vh)] overflow-y-auto overscroll-contain p-1.5 [scrollbar-width:thin] [scrollbar-color:rgba(203,213,225,0.45)_transparent]">
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full rounded-xl border px-3 py-2.5 text-left text-sm transition ${isSelected
                  ? "border-sky-100 bg-sky-50 font-medium text-sky-700 ring-1 ring-sky-100"
                  : "border-transparent text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                  }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {helperText && (
        <p className="mt-2 text-xs leading-5 text-slate-500">
          {helperText}
        </p>
      )}
    </div>
  );
}
