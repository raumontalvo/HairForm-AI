import type { LiftJourneyStep } from "@/lib/hair-science";

type LiftStepProps = {
  step: LiftJourneyStep;
  isSelected: boolean;
  isLast: boolean;
  onSelect: (step: LiftJourneyStep) => void;
};

export default function LiftStep({
  step,
  isSelected,
  isLast,
  onSelect,
}: LiftStepProps) {
  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        aria-pressed={isSelected}
        onClick={() => onSelect(step)}
        className={[
          "w-full rounded-3xl border p-5 text-left transition",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70",
          isSelected
            ? "border-amber-300/50 bg-amber-300/[0.08]"
            : "border-white/10 bg-[#111111] hover:border-white/25",
        ].join(" ")}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/35">
          Level {step.level}
        </p>

        <p className="mt-3 text-xl font-semibold">{step.pigment}</p>

        <p className="mt-2 text-sm text-white/50">
          Neutralization: {step.neutralizationTone}
        </p>
      </button>

      {!isLast ? (
        <div
          aria-hidden="true"
          className="my-3 h-10 w-px bg-gradient-to-b from-amber-300/60 to-white/10"
        />
      ) : null}
    </div>
  );
}