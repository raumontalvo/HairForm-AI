import type { ColorFamily } from "./color-wheel";

export type PigmentMapping = {
  pigment: string;
  colorFamily: ColorFamily;
  mentorTopic: string;
  learningSummary: string;
};

const pigmentMappings: PigmentMapping[] = [
  {
    pigment: "Deep red",
    colorFamily: "Red",
    mentorTopic: "deep red underlying pigment",
    learningSummary:
      "Deep red warmth is commonly associated with the darkest lift stages.",
  },
  {
    pigment: "Red",
    colorFamily: "Red",
    mentorTopic: "red underlying pigment",
    learningSummary:
      "Red is a dominant underlying pigment in deeper hair levels.",
  },
  {
    pigment: "Red-orange",
    colorFamily: "Orange",
    mentorTopic: "red-orange underlying pigment",
    learningSummary:
      "Red-orange sits between red and orange and may require balanced complementary control.",
  },
  {
    pigment: "Orange-red",
    colorFamily: "Orange",
    mentorTopic: "orange-red underlying pigment",
    learningSummary:
      "Orange-red warmth commonly appears while lifting through deeper middle levels.",
  },
  {
    pigment: "Orange",
    colorFamily: "Orange",
    mentorTopic: "orange underlying pigment",
    learningSummary:
      "Orange is commonly exposed during middle stages of lift and relates to blue on the color wheel.",
  },
  {
    pigment: "Orange-yellow",
    colorFamily: "Orange",
    mentorTopic: "orange-yellow underlying pigment",
    learningSummary:
      "Orange-yellow sits between orange and yellow and often relates to a blue-violet strategy.",
  },
  {
    pigment: "Yellow",
    colorFamily: "Yellow",
    mentorTopic: "yellow underlying pigment",
    learningSummary:
      "Yellow is commonly exposed at lighter blonde levels and relates to violet on the color wheel.",
  },
  {
    pigment: "Pale yellow",
    colorFamily: "Yellow",
    mentorTopic: "pale yellow underlying pigment",
    learningSummary:
      "Pale yellow is typically associated with very light blonde stages.",
  },
  {
    pigment: "Very pale yellow",
    colorFamily: "Yellow",
    mentorTopic: "very pale yellow underlying pigment",
    learningSummary:
      "Very pale yellow is associated with the lightest lift stages and requires careful tonal control.",
  },
];

export function getPigmentMapping(pigment: string): PigmentMapping {
  const mapping = pigmentMappings.find(
    (item) => item.pigment === pigment,
  );

  if (!mapping) {
    throw new Error(`No pigment mapping found for: ${pigment}`);
  }

  return mapping;
}

export function getColorFamilyForPigment(
  pigment: string,
): ColorFamily {
  return getPigmentMapping(pigment).colorFamily;
}