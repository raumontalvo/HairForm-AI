export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div
        className="inline-flex items-center gap-1.5 rounded-3xl border border-white/10 bg-[#111111] px-5 py-4"
        role="status"
        aria-label="HairForm AI is typing"
      >
        <span className="h-2 w-2 animate-bounce rounded-full bg-amber-300 [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-amber-300 [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-amber-300" />
      </div>
    </div>
  );
}