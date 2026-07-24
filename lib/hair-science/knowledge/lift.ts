export type LiftRisk = "none" | "controlled" | "moderate" | "significant";

export type LiftKnowledge = {
  currentLevel: number;
  targetLevel: number;
  liftDistance: number;
  risk: LiftRisk;
  summary: string;
  pigmentGuidance: string;
  safetyGuidance: string;
};

function clampLevel(level: number): number {
  return Math.min(10, Math.max(1, Math.round(level)));
}

export function getLiftDistance(
  currentLevel: number,
  targetLevel: number,
): number {
  return clampLevel(targetLevel) - clampLevel(currentLevel);
}

export function getLiftRisk(
  currentLevel: number,
  targetLevel: number,
): LiftRisk {
  const liftDistance = getLiftDistance(currentLevel, targetLevel);

  if (liftDistance <= 0) {
    return "none";
  }

  if (liftDistance === 1) {
    return "controlled";
  }

  if (liftDistance <= 3) {
    return "moderate";
  }

  return "significant";
}

export function getExpectedUnderlyingPigment(
  level: number,
): string {
  const normalizedLevel = clampLevel(level);

  if (normalizedLevel <= 2) {
    return "Deep red";
  }

  if (normalizedLevel <= 4) {
    return "Red-orange";
  }

  if (normalizedLevel <= 6) {
    return "Orange";
  }

  if (normalizedLevel === 7) {
    return "Orange-yellow";
  }

  if (normalizedLevel === 8) {
    return "Yellow-orange";
  }

  if (normalizedLevel === 9) {
    return "Yellow";
  }

  return "Pale yellow";
}

export function buildLiftKnowledge(
  currentLevel: number,
  targetLevel: number,
): LiftKnowledge {
  const normalizedCurrentLevel = clampLevel(currentLevel);
  const normalizedTargetLevel = clampLevel(targetLevel);
  const liftDistance =
    normalizedTargetLevel - normalizedCurrentLevel;
  const risk = getLiftRisk(
    normalizedCurrentLevel,
    normalizedTargetLevel,
  );

  if (risk === "none") {
    return {
      currentLevel: normalizedCurrentLevel,
      targetLevel: normalizedTargetLevel,
      liftDistance,
      risk,
      summary:
        "This session does not currently describe an upward lift journey.",
      pigmentGuidance:
        "Focus on the pigment already visible and determine whether the service goal is deposit, darkening, tonal refinement, or corrective work.",
      safetyGuidance:
        "Confirm the service direction before choosing developer, lightener, or tonal strategy.",
    };
  }

  const expectedPigment = getExpectedUnderlyingPigment(
    normalizedTargetLevel,
  );

  if (risk === "controlled") {
    return {
      currentLevel: normalizedCurrentLevel,
      targetLevel: normalizedTargetLevel,
      liftDistance,
      risk,
      summary:
        "This is a controlled one-level lift.",
      pigmentGuidance:
        `The target level commonly reveals ${expectedPigment.toLowerCase()} underlying pigment, but the visible result should always guide tonal refinement.`,
      safetyGuidance:
        "Even a small lift can expose warmth. Assess condition, saturation, and processing visually.",
    };
  }

  if (risk === "moderate") {
    return {
      currentLevel: normalizedCurrentLevel,
      targetLevel: normalizedTargetLevel,
      liftDistance,
      risk,
      summary:
        `Moving ${liftDistance} levels is a moderate lift.`,
      pigmentGuidance:
        `Expect progressively warmer pigment during the journey, with ${expectedPigment.toLowerCase()} commonly associated with the target level.`,
      safetyGuidance:
        "Monitor each lift stage, account for previous artificial color, and avoid choosing toner only from the target level.",
    };
  }

  return {
    currentLevel: normalizedCurrentLevel,
    targetLevel: normalizedTargetLevel,
    liftDistance,
    risk,
    summary:
      `Moving ${liftDistance} levels is a significant lift.`,
    pigmentGuidance:
      `The journey can reveal several warm stages before reaching ${expectedPigment.toLowerCase()} near the target level.`,
    safetyGuidance:
      "Hair condition, elasticity, chemical history, and strand-test results should determine whether the target is realistic in one session.",
  };
}