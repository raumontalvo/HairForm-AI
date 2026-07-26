import type { HairLevelLessonEntry } from "@/lib/academy/hairLevels";

type HairLevelSelectorProps = {
  levels: HairLevelLessonEntry[];
  selectedLevel: number;
  onSelectLevel: (level: number) => void;
};

export default function HairLevelSelector({
  levels,
  selectedLevel,
  onSelectLevel,
}: HairLevelSelectorProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
        Interactive exercise
      </p>

      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
        Explore the level system
      </h2>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
        Select a level to review its natural depth,
        exposed pigment, common services, and
        professional considerations.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5 lg:grid-cols-10">
        {levels.map((entry) => {
          const isSelected =
            selectedLevel === entry.level;

          return (
            <button
              key={entry.level}
              type="button"
              onClick={() =>
                onSelectLevel(entry.level)
              }
              aria-pressed={isSelected}
              className={
                isSelected
                  ? "rounded-2xl border border-amber-300 bg-amber-300 px-3 py-4 text-center text-black transition"
                  : "rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-4 text-center text-white transition hover:border-white/25 hover:bg-white/[0.06]"
              }
            >
              <span className="block text-xs font-semibold uppercase tracking-wider opacity-70">
                Level
              </span>

              <span className="mt-1 block text-2xl font-semibold">
                {entry.level}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}