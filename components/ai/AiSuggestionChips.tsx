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
      <p className="mb-3 text-sm font-medium text-slate-500">
        常见问题
      </p>

      <div className="flex flex-wrap gap-2 sm:gap-2.5">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            disabled={isLoading}
            onClick={() => onSelect(suggestion)}
            className={`max-w-full rounded-full px-3.5 py-2 text-left text-[13px] leading-6 ring-1 transition disabled:cursor-not-allowed disabled:opacity-60 sm:px-4 sm:text-sm ${
              selectedQuestion === suggestion
                ? "bg-slate-950 text-white ring-slate-950 shadow-sm"
                : "bg-[linear-gradient(145deg,rgba(255,255,255,0.34),rgba(248,250,252,0.22))] text-slate-600 ring-white/62 backdrop-blur-xl hover:bg-[linear-gradient(145deg,rgba(255,255,255,0.58),rgba(248,250,252,0.38))] hover:text-slate-950 hover:shadow-sm"
            }`}
          >
            <span className="block break-words">{suggestion}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
