type AcademyProgressProps = {
  completedLessons: number;
  totalLessons: number;
};

export default function AcademyProgress({
  completedLessons,
  totalLessons,
}: AcademyProgressProps) {
  const percentage =
    totalLessons > 0
      ? Math.round(
          (completedLessons / totalLessons) * 100,
        )
      : 0;

  return (
    <section className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            Learning progress
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
            Build your color knowledge
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
            Complete each lesson in order to build a
            connected understanding of hair science,
            consultation, and formulation.
          </p>
        </div>

        <div className="shrink-0">
          <p className="text-3xl font-semibold text-white">
            {percentage}%
          </p>

          <p className="mt-1 text-xs text-white/40">
            {completedLessons} of {totalLessons} lessons
          </p>
        </div>
      </div>

      <div
        className="mt-6 h-2 overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-label="Academy progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
      >
        <div
          className="h-full rounded-full bg-amber-300 transition-[width]"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </section>
  );
}