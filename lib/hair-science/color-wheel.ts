export type ColorFamily =
  | "Red"
  | "Orange"
  | "Yellow"
  | "Green"
  | "Blue"
  | "Violet";

export type ColorWheelEntry = {
  color: ColorFamily;
  complements: ColorFamily;
  description: string;
  commonHairUse: string;
};

export const COLOR_WHEEL_ENTRIES: ColorWheelEntry[] = [
  {
    color: "Red",
    complements: "Green",
    description:
      "Red is a warm primary color commonly exposed in deeper levels.",
    commonHairUse:
      "Green-based tones can help control excessive red when appropriate.",
  },
  {
    color: "Orange",
    complements: "Blue",
    description:
      "Orange commonly appears while lifting through the middle levels.",
    commonHairUse:
      "Blue-based tones can help neutralize unwanted orange.",
  },
  {
    color: "Yellow",
    complements: "Violet",
    description:
      "Yellow is commonly exposed in lighter blonde levels.",
    commonHairUse:
      "Violet-based tones can help control unwanted yellow.",
  },
  {
    color: "Green",
    complements: "Red",
    description:
      "Green is the complementary opposite of red.",
    commonHairUse:
      "Red-based warmth can help counter unwanted green casts.",
  },
  {
    color: "Blue",
    complements: "Orange",
    description:
      "Blue is the complementary opposite of orange.",
    commonHairUse:
      "Orange warmth can help counter overly blue or ashy results.",
  },
  {
    color: "Violet",
    complements: "Yellow",
    description:
      "Violet is the complementary opposite of yellow.",
    commonHairUse:
      "Yellow warmth can help soften overly violet results.",
  },
];

export function getColorWheelEntry(
  color: ColorFamily,
): ColorWheelEntry {
  const entry = COLOR_WHEEL_ENTRIES.find(
    (item) => item.color === color,
  );

  if (!entry) {
    throw new Error(`No color-wheel entry found for: ${color}`);
  }

  return entry;
}