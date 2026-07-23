type HairSessionSummaryProps = {
  currentLevel: number;
  targetLevel: number;
  porosity: string;
  selectedPigment: string | null;
};

function getNeutralizingTone(selectedPigment: string | null) {
  if (!selectedPigment) {
    return "Not selected";
  }

  const normalizedPigment = selectedPigment.toLowerCase();

  if (normalizedPigment.includes("red")) {
    return "Green";
  }

  if (normalizedPigment.includes("orange")) {
    return "Blue";
  }

  if (normalizedPigment.includes("yellow")) {
    return "Violet";
  }

  if (normalizedPigment.includes("green")) {
    return "Red";
  }

  if (normalizedPigment.includes("blue")) {
    return "Orange";
  }

  if (normalizedPigment.includes("violet")) {
    return "Yellow";
  }

  return "Review color wheel";
}

export default function HairSessionSummary({
  currentLevel,
  targetLevel,
  porosity,
  selectedPigment,
}: HairSessionSummaryProps) {
  const neutralizingTone = getNeutralizingTone(selectedPigment);

  return (
    <section
      aria-labelledby="hair-session-summary-title"
      className="rounded-2xl border border-amber-300/15 bg-amber-300/[0.04] p-4 sm:p-5"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">
          Active context
        </p>

        <h2
          id="hair-session-summary-title"
          className="mt-2 text-base font-semibold text-white"
        >
          Current Hair Session
        </h2>
      </div>

      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <dt className="text-xs uppercase tracking-[0.12em] text-white/35">
            Lift journey
          </dt>
          <dd className="mt-1 text-sm font-medium text-white">
            Level {currentLevel} → Level {targetLevel}
          </dd>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <dt className="text-xs uppercase tracking-[0.12em] text-white/35">
            Porosity
          </dt>
          <dd className="mt-1 text-sm font-medium capitalize text-white">
            {porosity}
          </dd>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <dt className="text-xs uppercase tracking-[0.12em] text-white/35">
            Selected pigment
          </dt>
          <dd className="mt-1 text-sm font-medium text-white">
            {selectedPigment ?? "Not selected"}
          </dd>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <dt className="text-xs uppercase tracking-[0.12em] text-white/35">
            Neutralizing tone
          </dt>
          <dd className="mt-1 text-sm font-medium text-white">
            {neutralizingTone}
          </dd>
        </div>
      </dl>
    </section>
  );
}