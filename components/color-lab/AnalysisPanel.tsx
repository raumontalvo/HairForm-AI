import type { ColorAnalysis } from "@/lib/color-engine/analyze";

import MetricCard from "./MetricCard";
import SafetyChecklist from "./SafetyChecklist";

type AnalysisPanelProps = {
  currentLevel: number;
  targetLevel: number;
  analysis: ColorAnalysis;
};

export default function AnalysisPanel({
  currentLevel,
  targetLevel,
  analysis,
}: AnalysisPanelProps) {
  const metrics = [
    {
      label: "Required lift",
      value: analysis.liftDescription,
    },
    {
      label: "Underlying pigment",
      value: analysis.underlyingPigment,
    },
    {
      label: "Neutralization focus",
      value: analysis.neutralizationTone,
    },
    {
      label: "Porosity risk",
      value: analysis.porosityRisk,
    },
  ];

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-amber-300/20 bg-amber-300/[0.07] p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
              Educational analysis
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              Level {currentLevel} to Level {targetLevel}
            </h2>
          </div>

          <span className="w-fit rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
            Learning mode
          </span>
        </div>

        <p className="mt-6 leading-7 text-white/65">
          This scenario requires {analysis.liftDescription.toLowerCase()}. The
          exposed underlying pigment is{" "}
          {analysis.underlyingPigment.toLowerCase()}, with a suggested
          neutralization focus of{" "}
          {analysis.neutralizationTone.toLowerCase()}.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
          />
        ))}
      </div>

      <article className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8">
        <p className="text-sm font-semibold text-amber-300">
          Why this matters
        </p>

        <div className="mt-5 space-y-4 text-sm leading-7 text-white/60">
          <p>
            Changing from Level {currentLevel} to Level {targetLevel} can expose
            underlying warmth that must be considered before selecting the final
            tone.
          </p>

          <p>
            The expected exposed pigment is{" "}
            {analysis.underlyingPigment.toLowerCase()}, which commonly points
            toward a {analysis.neutralizationTone.toLowerCase()} neutralization
            strategy.
          </p>

          <p>
            Porosity assessment: {analysis.porosityRisk}. A strand test helps
            confirm lift, tone response, elasticity, and processing tolerance
            before full application.
          </p>
        </div>
      </article>

      <SafetyChecklist />

      <p className="text-xs leading-5 text-white/35">
        HairForm AI provides educational decision support and does not replace
        professional judgment, manufacturer instructions, strand testing,
        allergy testing, or an in-person hair assessment.
      </p>
    </section>
  );
}