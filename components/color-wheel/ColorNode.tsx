import type { ColorFamily } from "@/lib/hair-science";

type ColorNodeProps = {
  color: ColorFamily;
  isSelected: boolean;
  onSelect: (color: ColorFamily) => void;
};

const colorStyles: Record<ColorFamily, string> = {
  Red: "bg-red-500",
  Orange: "bg-orange-400",
  Yellow: "bg-yellow-300 text-black",
  Green: "bg-green-500",
  Blue: "bg-blue-500",
  Violet: "bg-violet-500",
};

export default function ColorNode({
  color,
  isSelected,
  onSelect,
}: ColorNodeProps) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={() => onSelect(color)}
      className={[
        "flex h-24 w-24 items-center justify-center rounded-full border-4 text-sm font-semibold shadow-lg transition sm:h-28 sm:w-28",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
        colorStyles[color],
        isSelected
          ? "scale-110 border-white shadow-white/20"
          : "border-white/20 hover:scale-105 hover:border-white/50",
      ].join(" ")}
    >
      {color}
    </button>
  );
}