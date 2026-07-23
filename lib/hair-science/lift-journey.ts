import {
  getNeutralizationTone,
  getUnderlyingPigment,
  type HairLevel,
} from "@/lib/hair-science";

export type LiftJourneyStep = {
  level: HairLevel;
  pigment: string;
  neutralizationTone: string;
};

export type LiftJourney = {
  currentLevel: HairLevel;
  targetLevel: HairLevel;
  direction: "lift" | "deposit" | "same-level";
  steps: LiftJourneyStep[];
};

function buildLevelRange(
  currentLevel: HairLevel,
  targetLevel: HairLevel,
): HairLevel[] {
  if (currentLevel === targetLevel) {
    return [currentLevel];
  }

  const direction = targetLevel > currentLevel ? 1 : -1;
  const levels: HairLevel[] = [];

  for (
    let level = currentLevel;
    direction > 0 ? level <= targetLevel : level >= targetLevel;
    level += direction
  ) {
    levels.push(level as HairLevel);
  }

  return levels;
}

export function createLiftJourney(
  currentLevel: HairLevel,
  targetLevel: HairLevel,
): LiftJourney {
  const direction =
    targetLevel > currentLevel
      ? "lift"
      : targetLevel < currentLevel
        ? "deposit"
        : "same-level";

  const steps = buildLevelRange(currentLevel, targetLevel).map((level) => {
    const pigment = getUnderlyingPigment(level);

    return {
      level,
      pigment,
      neutralizationTone: getNeutralizationTone(pigment),
    };
  });

  return {
    currentLevel,
    targetLevel,
    direction,
    steps,
  };
}