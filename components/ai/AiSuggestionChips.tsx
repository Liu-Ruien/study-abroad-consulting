"use client";

import { btnPrimary, chipSecondary } from "@/lib/ui/card-system";

type AiSuggestionChipsProps = {
  suggestions: string[];
  selectedQuestion: string;
  isLoading: boolean;
  onSelect: (question: string) => void;
};

export default function AiSuggestionChips({
  suggestions,
  selectedQuestion,
  isLoading,
  onSelect,
}: AiSuggestionChipsProps) {
  return (
    <div>
      <p className="mb-3 text-sm font-medium text-gray-500">常见问题</p>

      <div className="flex flex-wrap gap-2 sm:gap-2.5">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            disabled={isLoading}
            onClick={() => onSelect(suggestion)}
            className={`max-w-full rounded-full px-3.5 py-2 text-left text-[13px] leading-relaxed transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4 sm:text-sm ${
              selectedQuestion === suggestion
                ? `${btnPrimary} border-black`
                : chipSecondary
            }`}
          >
            <span className="block break-words">{suggestion}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
