import Card from "@/components/ui/Card";
import type { ColorWheelEntry } from "@/lib/hair-science";

type ColorInfoPanelProps = {
  entry: ColorWheelEntry;
};

export default function ColorInfoPanel({
  entry,
}: ColorInfoPanelProps) {
  return (
    <Card padding="large">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
        Selected color
      </p>

      <h2 className="mt-3 text-3xl font-semibold">{entry.color}</h2>

      <p className="mt-5 leading-7 text-white/60">
        {entry.description}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/35">
            Complement
          </p>

          <p className="mt-2 text-xl font-semibold">
            {entry.complements}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/35">
            Professional use
          </p>

          <p className="mt-2 text-sm leading-6 text-white/65">
            {entry.commonHairUse}
          </p>
        </div>
      </div>
    </Card>
  );
}