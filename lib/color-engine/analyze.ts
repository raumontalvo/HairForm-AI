import { calculateLift } from "./lift";
import type { HairLevel } from "./levels";
import { getNeutralizationTone } from "./neutralization";
import { getUnderlyingPigment } from "./pigments";

export type Porosity = "Low" | "Medium" | "High" | "Uneven";

export type ColorAnalysisInput = {
  currentLevel: HairLevel;
  targetLevel: HairLevel;
  porosity: Porosity;
};

export type ColorAnalysis = {
  liftDescription: string;
  liftLevels: number;
  direction: "lift" | "deposit" | "same-level";
  underlyingPigment: string;
  neutralizationTone: string;
  porosityRisk: string;
};

function getPorosityRisk(porosity: Porosity): string {
  switch (porosity) {
    case "Low":
      return "May resist color penetration";
    case "Medium":
      return "Generally predictable deposit";
    case "High":
      return "May absorb cool tones too strongly";
    case "Uneven":
      return "Risk of uneven tone deposit";
  }
}

export function analyzeColorScenario(
  input: ColorAnalysisInput,
): ColorAnalysis {
  const lift = calculateLift(input.currentLevel, input.targetLevel);
  const underlyingPigment = getUnderlyingPigment(input.targetLevel);
  const neutralizationTone = getNeutralizationTone(underlyingPigment);

  return {
    liftDescription: lift.description,
    liftLevels: lift.levels,
    direction: lift.direction,
    underlyingPigment,
    neutralizationTone,
    porosityRisk: getPorosityRisk(input.porosity),
  };
}