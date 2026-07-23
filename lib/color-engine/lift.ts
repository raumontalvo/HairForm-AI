import type { HairLevel } from "./levels";

export type LiftDirection = "lift" | "deposit" | "same-level";

export type LiftAnalysis = {
  levels: number;
  direction: LiftDirection;
  description: string;
};

export function calculateLift(
  currentLevel: HairLevel,
  targetLevel: HairLevel,
): LiftAnalysis {
  const difference = targetLevel - currentLevel;

  if (difference > 0) {
    return {
      levels: difference,
      direction: "lift",
      description: `Approximately ${difference} level${
        difference === 1 ? "" : "s"
      } of lift`,
    };
  }

  if (difference < 0) {
    const depositLevels = Math.abs(difference);

    return {
      levels: depositLevels,
      direction: "deposit",
      description: `Approximately ${depositLevels} level${
        depositLevels === 1 ? "" : "s"
      } darker`,
    };
  }

  return {
    levels: 0,
    direction: "same-level",
    description: "No level change",
  };
}