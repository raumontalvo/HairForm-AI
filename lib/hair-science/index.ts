export {
  analyzeColorScenario,
  type ColorAnalysis,
  type ColorAnalysisInput,
  type Porosity,
} from "@/lib/color-engine/analyze";

export {
  HAIR_LEVELS,
  getHairLevelName,
  isValidHairLevel,
  type HairLevel,
} from "@/lib/color-engine/levels";

export {
  calculateLift,
  type LiftAnalysis,
  type LiftDirection,
} from "@/lib/color-engine/lift";

export {
  getNeutralizationTone,
  type NeutralizationTone,
} from "@/lib/color-engine/neutralization";

export {
  getUnderlyingPigment,
  UNDERLYING_PIGMENTS,
} from "@/lib/color-engine/pigments";

export {
  COLOR_WHEEL_ENTRIES,
  getColorWheelEntry,
  type ColorFamily,
  type ColorWheelEntry,
} from "./color-wheel";