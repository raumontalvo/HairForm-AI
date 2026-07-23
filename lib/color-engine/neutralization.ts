export type NeutralizationTone =
  | "Green"
  | "Blue-green"
  | "Blue"
  | "Blue-violet"
  | "Violet"
  | "Soft violet";

const NEUTRALIZATION_MAP: Record<string, NeutralizationTone> = {
  "Deep red": "Green",
  Red: "Green",
  "Red-orange": "Blue-green",
  "Orange-red": "Blue-green",
  Orange: "Blue",
  "Orange-yellow": "Blue-violet",
  Yellow: "Violet",
  "Pale yellow": "Soft violet",
  "Very pale yellow": "Soft violet",
};

export function getNeutralizationTone(
  underlyingPigment: string,
): NeutralizationTone {
  const tone = NEUTRALIZATION_MAP[underlyingPigment];

  if (!tone) {
    throw new Error(
      `No neutralization tone configured for pigment: ${underlyingPigment}`,
    );
  }

  return tone;
}