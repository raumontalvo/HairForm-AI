export type PigmentFamily =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "violet";

export type NeutralizationPair = {
  pigment: PigmentFamily;
  complement: PigmentFamily;
  explanation: string;
};

const neutralizationPairs: Record<
  PigmentFamily,
  NeutralizationPair
> = {
  red: {
    pigment: "red",
    complement: "green",
    explanation:
      "Green is the complementary family used to soften visible red. The goal is controlled balance, not an overly green result.",
  },
  orange: {
    pigment: "orange",
    complement: "blue",
    explanation:
      "Blue is the complementary family used to soften visible orange. Confirm that the hair has reached the intended level before relying on toner.",
  },
  yellow: {
    pigment: "yellow",
    complement: "violet",
    explanation:
      "Violet is the complementary family used to soften visible yellow. Pale yellow and yellow-orange require different tonal balances.",
  },
  green: {
    pigment: "green",
    complement: "red",
    explanation:
      "Red is the complementary family used to soften visible green. Reassess whether the green came from over-ashing, porosity, or an incompatible tonal combination.",
  },
  blue: {
    pigment: "blue",
    complement: "orange",
    explanation:
      "Orange is the complementary family used to soften visible blue. Adjust carefully so the correction does not become overly warm.",
  },
  violet: {
    pigment: "violet",
    complement: "yellow",
    explanation:
      "Yellow is the complementary family used to soften visible violet. Use warmth carefully and account for the hair’s level and porosity.",
  },
};

export function normalizePigmentFamily(
  pigment: string | null | undefined,
): PigmentFamily | null {
  if (!pigment) {
    return null;
  }

  const normalizedPigment = pigment.toLowerCase();

  if (normalizedPigment.includes("orange")) {
    return "orange";
  }

  if (normalizedPigment.includes("yellow")) {
    return "yellow";
  }

  if (normalizedPigment.includes("violet")) {
    return "violet";
  }

  if (normalizedPigment.includes("green")) {
    return "green";
  }

  if (normalizedPigment.includes("blue")) {
    return "blue";
  }

  if (normalizedPigment.includes("red")) {
    return "red";
  }

  return null;
}

export function getNeutralizationPair(
  pigment: string | null | undefined,
): NeutralizationPair | null {
  const pigmentFamily = normalizePigmentFamily(pigment);

  if (!pigmentFamily) {
    return null;
  }

  return neutralizationPairs[pigmentFamily];
}

export function getNeutralizingFamily(
  pigment: string | null | undefined,
): PigmentFamily | null {
  return getNeutralizationPair(pigment)?.complement ?? null;
}

export function getNeutralizationExplanation(
  pigment: string | null | undefined,
): string {
  const pair = getNeutralizationPair(pigment);

  if (!pair) {
    return "Identify the pigment that is actually visible before choosing a neutralizing family. Blue balances orange, violet balances yellow, and green balances red.";
  }

  return pair.explanation;
}