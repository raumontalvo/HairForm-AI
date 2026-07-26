import type { HairLevelLessonEntry } from "@/lib/academy/hairLevels";

type HairLevelChartProps = {
  levels: HairLevelLessonEntry[];
  selectedLevel: number;
  onSelectLevel: (level: number) => void;
};

export default function HairLevelChart({
  levels,
  selectedLevel,
  onSelectLevel,
}: HairLevelChartProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
        Reference chart
      </p>

      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
        Levels 1–10 at a glance
      </h2>

      <p className="mt-3 max-w-3xl text-sm leading-7 text-white/55">
        Level describes depth. It does not describe
        whether the hair is ash, gold, copper, red,
        violet, neutral, or another tonal family.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white/35">
                Level
              </th>

              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white/35">
                Natural depth
              </th>

              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white/35">
                Underlying pigment
              </th>

              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white/35">
                Description
              </th>
            </tr>
          </thead>

          <tbody>
            {levels.map((entry) => {
              const isSelected =
                entry.level === selectedLevel;

              return (
                <tr
                  key={entry.level}
                  className={
                    isSelected
                      ? "border-b border-white/10 bg-amber-300/[0.08]"
                      : "border-b border-white/10"
                  }
                >
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      onClick={() =>
                        onSelectLevel(entry.level)
                      }
                      className={
                        isSelected
                          ? "inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-300 text-sm font-semibold text-black"
                          : "inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-white hover:border-white/25"
                      }
                    >
                      {entry.level}
                    </button>
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-white">
                    {entry.name}
                  </td>

                  <td className="px-4 py-4 text-sm text-amber-200">
                    {entry.underlyingPigment}
                  </td>

                  <td className="px-4 py-4 text-sm leading-6 text-white/50">
                    {entry.depthDescription}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}