type FormulaSessionSummaryProps = {
  currentLevel: number;
  targetLevel: number;
  porosity: string;
  selectedPigment: string | null;
};

export default function FormulaSessionSummary({
  currentLevel,
  targetLevel,
  porosity,
  selectedPigment,
}: FormulaSessionSummaryProps) {
  return (
    <section
      aria-labelledby="formula-session-title"
      className="rounded-2xl border border-amber-300/15 bg-amber-300/[0.04] p-5"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">
        Active Hair Session
      </p>

      <h2
        id="formula-session-title"
        className="mt-2 text-lg font-semibold text-white"
      >
        Formulation context
      </h2>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <dt className="text-xs uppercase tracking-[0.12em] text-white/35">
            Current level
          </dt>
          <dd className="mt-2 text-base font-semibold text-white">
            Level {currentLevel}
          </dd>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <dt className="text-xs uppercase tracking-[0.12em] text-white/35">
            Target level
          </dt>
          <dd className="mt-2 text-base font-semibold text-white">
            Level {targetLevel}
          </dd>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <dt className="text-xs uppercase tracking-[0.12em] text-white/35">
            Porosity
          </dt>
          <dd className="mt-2 text-base font-semibold capitalize text-white">
            {porosity}
          </dd>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <dt className="text-xs uppercase tracking-[0.12em] text-white/35">
            Selected pigment
          </dt>
          <dd className="mt-2 text-base font-semibold text-white">
            {selectedPigment ?? "Not selected"}
          </dd>
        </div>
      </dl>
    </section>
  );
}