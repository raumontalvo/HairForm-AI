type PromptSuggestionsProps = {
  suggestions: string[];
  disabled?: boolean;
  onSelect: (suggestion: string) => void | Promise<void>;
};

export default function PromptSuggestions({
  suggestions,
  disabled = false,
  onSelect,
}: PromptSuggestionsProps) {
  return (
    <section aria-label="Suggested questions">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/35">
        Suggested questions
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(suggestion)}
            className={[
              "rounded-full border border-white/10 px-4 py-2 text-left text-sm transition",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70",
              disabled
                ? "cursor-not-allowed text-white/25"
                : "text-white/60 hover:border-amber-300/30 hover:bg-amber-300/[0.06] hover:text-white",
            ].join(" ")}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </section>
  );
}