"use client";

import ColorInfoPanel from "@/components/color-wheel/ColorInfoPanel";
import ColorNode from "@/components/color-wheel/ColorNode";
import { useHairSession } from "@/context/HairSessionContext";
import {
  COLOR_WHEEL_ENTRIES,
  getColorWheelEntry,
  type ColorFamily,
} from "@/lib/hair-science";

const positions: Record<ColorFamily, string> = {
  Red: "left-1/2 top-0 -translate-x-1/2",
  Orange: "right-0 top-1/4",
  Yellow: "right-0 bottom-1/4",
  Green: "left-1/2 bottom-0 -translate-x-1/2",
  Blue: "left-0 bottom-1/4",
  Violet: "left-0 top-1/4",
};

export default function ColorWheel() {
  const { selectedPigment, setSelectedPigment } = useHairSession();

  const activeColor = selectedPigment ?? "Orange";
  const selectedEntry = getColorWheelEntry(activeColor);

  function handleSelect(color: ColorFamily) {
    setSelectedPigment(color);
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1fr_0.9fr]">
      <section className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
            Interactive color theory
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            Select a color to explore its complement.
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-white/55">
            Complementary colors sit opposite each other on the wheel and can
            help explain common neutralization relationships in professional
            hair color.
          </p>
        </div>

        <div className="relative mx-auto mt-10 aspect-square w-full max-w-[560px]">
          <div className="absolute inset-[21%] rounded-full border border-dashed border-white/15" />

          <div className="absolute inset-[37%] flex items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/[0.06] text-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/35">
                Selected
              </p>

              <p className="mt-2 text-xl font-semibold text-amber-300">
                {activeColor}
              </p>
            </div>
          </div>

          {COLOR_WHEEL_ENTRIES.map((entry) => (
            <div
              key={entry.color}
              className={`absolute ${positions[entry.color]}`}
            >
              <ColorNode
                color={entry.color}
                isSelected={activeColor === entry.color}
                onSelect={handleSelect}
              />
            </div>
          ))}
        </div>
      </section>

      <ColorInfoPanel entry={selectedEntry} />
    </div>
  );
}