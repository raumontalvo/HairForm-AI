import {
  getNeutralizingFamily,
} from "./knowledge/neutralization";

export type FormulaGuidanceInput = {
  currentLevel: number;
  targetLevel: number;
  porosity: string;
  selectedPigment: string | null;
  tonalFamily: string;
  developerChoice: string;
  applicationStrategy: string;
};

export type FormulaGuidance = {
  expectedPigment: string;
  neutralization: string;
  liftConsideration: string;
  porosityConsideration: string;
  applicationConsideration: string;
  safetyReminder: string;
};

function buildExpectedPigment(
  currentLevel: number,
  targetLevel: number,
  selectedPigment: string | null,
): string {
  if (selectedPigment) {
    return `${selectedPigment} is the active pigment selected for this Hair Session. Confirm that it matches the pigment that is actually visible before finalizing the tonal plan.`;
  }

  const liftDistance = targetLevel - currentLevel;

  if (liftDistance <= 0) {
    return "This session does not describe upward lift. Focus on the visible pigment already present and whether the service goal is deposit, darkening, or tonal refinement.";
  }

  return `A ${liftDistance}-level lift can expose progressively warmer underlying pigment. Evaluate the hair visually through each stage instead of assuming the target level guarantees a specific pigment.`;
}

function buildNeutralization(
  selectedPigment: string | null,
  tonalFamily: string,
): string {
  const neutralizingFamily = getNeutralizingFamily(
    selectedPigment,
  );

  if (!selectedPigment || !neutralizingFamily) {
    return "Select or identify the visible pigment before choosing a neutralizing family. Blue balances orange, violet balances yellow, and green balances red.";
  }

  const tonalText = tonalFamily
    ? ` Your selected tonal direction is ${tonalFamily}.`
    : "";

  return `${selectedPigment} is complemented by the ${neutralizingFamily} family.${tonalText} Use complementary tone for balance, not as a substitute for lift that is still required.`;
}

function buildLiftConsideration(
  currentLevel: number,
  targetLevel: number,
): string {
  const liftDistance = targetLevel - currentLevel;

  if (liftDistance <= 0) {
    return "No upward lift is currently planned. Recheck whether the service is deposit-only, tonal refinement, darkening, or corrective work.";
  }

  if (liftDistance >= 4) {
    return `Moving ${liftDistance} levels is a significant lift. Hair condition, elasticity, previous artificial color, and strand-test results should determine whether the target is realistic in one session.`;
  }

  if (liftDistance >= 2) {
    return `Moving ${liftDistance} levels is a moderate lift. Expect visible warmth and monitor each stage rather than formulating only from the target level.`;
  }

  return "This is a controlled one-level lift. Even a small shift can expose warmth, so confirm the visible pigment before refining tone.";
}

function buildPorosityConsideration(
  porosity: string,
): string {
  const normalizedPorosity = porosity.toLowerCase();

  if (normalizedPorosity.includes("high")) {
    return "High porosity can cause rapid, uneven, or overly cool deposit. Consider zoning, reducing tonal intensity where appropriate, and monitoring the most compromised areas closely.";
  }

  if (normalizedPorosity.includes("low")) {
    return "Low porosity may resist color penetration. Prioritize complete saturation, appropriate processing time, and product-system guidance rather than automatically increasing developer strength.";
  }

  return "Medium porosity is generally more predictable, but roots, mids, and ends may still behave differently because of previous color and environmental exposure.";
}

function buildApplicationConsideration(
  applicationStrategy: string,
): string {
  switch (applicationStrategy) {
    case "roots-first":
      return "A roots-first plan should account for scalp heat and the possibility of faster processing near the scalp. Confirm that this order matches the starting condition and product system.";
    case "mids-ends-first":
      return "A mids-and-ends-first plan can help when those areas require more time or lift, but porous ends may need protection or delayed application.";
    case "zone-application":
      return "A zone-by-zone strategy is appropriate when levels, pigment, porosity, or chemical history vary. Document a separate goal and timing plan for each zone.";
    case "virgin-application":
      return "A virgin application should account for the difference between scalp heat at the roots and the cooler mids and ends. Application order should follow the product system.";
    case "retouch":
      return "A retouch should minimize overlap onto previously processed hair and preserve the integrity of the mids and ends.";
    case "corrective":
      return "A corrective application should treat each band or zone independently. Avoid applying one aggressive formula across hair with different histories and conditions.";
    case "strand-test-first":
      return "A strand-test-first strategy provides evidence about lift, tone, timing, compatibility, and hair integrity before a complete service.";
    case "custom":
      return "Document the order, zone boundaries, saturation plan, timing checkpoints, and contingency steps for the custom application.";
    default:
      return "Choose an application strategy based on zone differences, starting level, chemical history, porosity, and product instructions.";
  }
}

function buildDeveloperReminder(
  developerChoice: string,
): string {
  if (!developerChoice) {
    return "Developer has not been selected. Choose it within the requirements of the specific color or lightener system.";
  }

  if (developerChoice === "not-decided") {
    return "Developer is still undecided. Base the choice on the product system, desired lift or deposit, scalp considerations, and hair condition.";
  }

  return `The recorded developer choice is ${developerChoice.replaceAll("-", " ")}. Confirm that it is approved for the chosen product system and appropriate for the hair condition and service goal.`;
}

export function buildFormulaGuidance(
  input: FormulaGuidanceInput,
): FormulaGuidance {
  return {
    expectedPigment: buildExpectedPigment(
      input.currentLevel,
      input.targetLevel,
      input.selectedPigment,
    ),
    neutralization: buildNeutralization(
      input.selectedPigment,
      input.tonalFamily,
    ),
    liftConsideration: buildLiftConsideration(
      input.currentLevel,
      input.targetLevel,
    ),
    porosityConsideration: buildPorosityConsideration(
      input.porosity,
    ),
    applicationConsideration: buildApplicationConsideration(
      input.applicationStrategy,
    ),
    safetyReminder: `${buildDeveloperReminder(input.developerChoice)} Always follow manufacturer instructions, assess elasticity and condition, and confirm the plan with a strand test before full application.`,
  };
}