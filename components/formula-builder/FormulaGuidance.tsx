import type { FormulaGuidance as FormulaGuidanceData } from "@/lib/hair-science/formula-guidance";

type FormulaGuidanceProps = {
  guidance: FormulaGuidanceData;
};

type GuidanceItemProps = {
  label: string;
  content: string;
};

function GuidanceItem({
  label,
  content,
}: GuidanceItemProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-white/35">
        {label}
      </dt>

      <dd className="mt-2 text-sm leading-6 text-white/65">
        {content}
      </dd>
    </div>
  );
}

export default function FormulaGuidance({
  guidance,
}: FormulaGuidanceProps) {
  return (
    <section
      aria-labelledby="formula-guidance-title"
      className="rounded-2xl border border-amber-300/15 bg-amber-300/[0.04] p-5"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">
        Hair science guidance
      </p>

      <h2
        id="formula-guidance-title"
        className="mt-2 text-lg font-semibold text-white"
      >
        Reasoning before formulation
      </h2>

      <p className="mt-2 text-sm leading-6 text-white/50">
        Review the science connected to the active Hair Session and your
        current planning choices.
      </p>

      <dl className="mt-6 grid gap-4">
        <GuidanceItem
          label="Expected pigment"
          content={guidance.expectedPigment}
        />

        <GuidanceItem
          label="Neutralization"
          content={guidance.neutralization}
        />

        <GuidanceItem
          label="Lift consideration"
          content={guidance.liftConsideration}
        />

        <GuidanceItem
          label="Porosity consideration"
          content={guidance.porosityConsideration}
        />

        <GuidanceItem
          label="Application consideration"
          content={guidance.applicationConsideration}
        />

        <div className="rounded-xl border border-amber-300/15 bg-amber-300/[0.05] p-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-300">
            Professional safety reminder
          </dt>

          <dd className="mt-2 text-sm leading-6 text-white/65">
            {guidance.safetyReminder}
          </dd>
        </div>
      </dl>
    </section>
  );
}