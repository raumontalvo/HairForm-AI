import LiftStep from "@/components/lift-journey/LiftStep";
import type {
  LiftJourney,
  LiftJourneyStep,
} from "@/lib/hair-science";

type LiftTimelineProps = {
  journey: LiftJourney;
  selectedStep: LiftJourneyStep;
  onStepSelect: (step: LiftJourneyStep) => void;
};

export default function LiftTimeline({
  journey,
  selectedStep,
  onStepSelect,
}: LiftTimelineProps) {
  return (
    <section>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
          Lift timeline
        </p>

        <h2 className="mt-3 text-3xl font-semibold">
          Level {journey.currentLevel} to Level {journey.targetLevel}
        </h2>

        <p className="mt-3 text-sm leading-6 text-white/50">
          Select any stage to explore the underlying pigment and its
          complementary neutralization relationship.
        </p>
      </div>

      <div>
        {journey.steps.map((step, index) => (
          <LiftStep
            key={step.level}
            step={step}
            isSelected={selectedStep.level === step.level}
            isLast={index === journey.steps.length - 1}
            onSelect={onStepSelect}
          />
        ))}
      </div>
    </section>
  );
}