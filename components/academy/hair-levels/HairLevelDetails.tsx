import type { HairLevelLessonEntry } from "@/lib/academy/hairLevels";

type HairLevelDetailsProps = {
  entry: HairLevelLessonEntry;
};

export default function HairLevelDetails({
  entry,
}: HairLevelDetailsProps) {
  return (
    <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <article className="rounded-3xl border border-amber-300/20 bg-amber-300/[0.06] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
          Selected depth
        </p>

        <p className="mt-5 text-sm text-white/45">
          Level {entry.level}
        </p>

        <h2 className="mt-1 text-4xl font-semibold tracking-tight text-white">
          {entry.name}
        </h2>

        <p className="mt-5 text-sm leading-7 text-white/60">
          {entry.depthDescription}
        </p>

        <div className="mt-7 rounded-2xl border border-white/10 bg-black/20 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
            Typical underlying pigment
          </p>

          <p className="mt-2 text-xl font-semibold text-amber-200">
            {entry.underlyingPigment}
          </p>

          <p className="mt-2 text-sm leading-6 text-white/50">
            {entry.pigmentDescription}
          </p>
        </div>
      </article>

      <article className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
          Professional application
        </p>

        <h2 className="mt-3 text-2xl font-semibold text-white">
          Working with Level {entry.level}
        </h2>

        <div className="mt-6">
          <p className="text-sm font-semibold text-white">
            Common service connections
          </p>

          <ul className="mt-3 space-y-3">
            {entry.commonServices.map(
              (service) => (
                <li
                  key={service}
                  className="flex items-start gap-3 text-sm leading-6 text-white/55"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300"
                  />

                  {service}
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-sm font-semibold text-white">
            Professional note
          </p>

          <p className="mt-2 text-sm leading-7 text-white/55">
            {entry.professionalNote}
          </p>
        </div>
      </article>
    </section>
  );
}