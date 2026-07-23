import Link from "next/link";

import Card from "@/components/ui/Card";
import type { LiftJourneyStep } from "@/lib/hair-science";

type LiftExplanationProps = {
  step: LiftJourneyStep;
};

export default function LiftExplanation({
  step,
}: LiftExplanationProps) {
  return (
    <Card padding="large">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
        Selected lift stage
      </p>

      <h2 className="mt-3 text-3xl font-semibold">
        Level {step.level}
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/35">
            Underlying pigment
          </p>

          <p className="mt-2 text-xl font-semibold">{step.pigment}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/35">
            Complementary focus
          </p>

          <p className="mt-2 text-xl font-semibold">
            {step.neutralizationTone}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/[0.06] p-5">
        <p className="text-sm font-semibold text-amber-200">
          Educational note
        </p>

        <p className="mt-3 text-sm leading-7 text-white/60">
          At Level {step.level}, the expected underlying pigment is{" "}
          {step.pigment.toLowerCase()}. This commonly points toward a{" "}
          {step.neutralizationTone.toLowerCase()} relationship when unwanted
          warmth needs to be controlled. Final product selection must still
          account for tone goals, porosity, condition, prior chemical history,
          and manufacturer guidance.
        </p>
      </div>

      <Link
        href="/color-wheel"
        className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-amber-300 px-5 py-3.5 font-semibold text-black transition hover:bg-amber-200"
      >
        View on Color Wheel
      </Link>
    </Card>
  );
}