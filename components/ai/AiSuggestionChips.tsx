"use client";

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
      <p className="mb-3 text-sm font-medium text-slate-600">
        常见问题
      </p>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            disabled={isLoading}
            onClick={() => onSelect(suggestion)}
            className={`rounded-2xl px-3.5 py-2.5 text-left text-sm leading-6 ring-1 transition disabled:cursor-not-allowed disabled:opacity-60 ${
              selectedQuestion === suggestion
                ? "bg-slate-950 text-white ring-slate-950 shadow-sm"
                : "bg-slate-50/80 text-slate-600 ring-slate-200/50 hover:bg-white hover:text-slate-950 hover:shadow-sm"
            }`}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
