import type { HairLevel } from "./levels";

export const UNDERLYING_PIGMENTS: Record<HairLevel, string> = {
  1: "Deep red",
  2: "Red",
  3: "Red",
  4: "Red-orange",
  5: "Orange-red",
  6: "Orange",
  7: "Orange-yellow",
  8: "Yellow",
  9: "Pale yellow",
  10: "Very pale yellow",
};

export function getUnderlyingPigment(level: HairLevel): string {
  return UNDERLYING_PIGMENTS[level];
}