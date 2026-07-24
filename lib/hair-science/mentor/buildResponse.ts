import {
  getNeutralizingFamily,
} from "../knowledge/neutralization";
import {
  detectTopic,
  type MentorTopic,
} from "./detectTopic";

export type MentorContext = {
  currentLevel: number;
  targetLevel: number;
  porosity: string;
  selectedPigment: string | null;
};

type ResponseBuilderInput = {
  question: string;
  context: MentorContext;
};

function buildSessionIntroduction(
  context: MentorContext,
): string {
  const pigmentText = context.selectedPigment
    ? ` The selected pigment is ${context.selectedPigment.toLowerCase()}.`
    : "";

  return `In your current Hair Session, the plan moves from level ${context.currentLevel} to level ${context.targetLevel} with ${context.porosity.toLowerCase()} porosity.${pigmentText}`;
}

function buildNeutralizationResponse(
  context: MentorContext,
): string {
  const neutralizingTone = getNeutralizingFamily(
    context.selectedPigment,
  );

  if (context.selectedPigment && neutralizingTone) {
    return `${buildSessionIntroduction(context)} ${context.selectedPigment} is balanced by the complementary ${neutralizingTone} family. Confirm that the visible pigment matches the selected pigment before toning. Neutralization should refine the result rather than replace any lift that is still required. Because the hair has ${context.porosity.toLowerCase()} porosity, control the strength, saturation, and processing time so cooler pigment does not over-deposit.`;
  }

  return `${buildSessionIntroduction(context)} Neutralization begins by identifying the pigment that is actually visible. Blue helps balance orange, violet helps balance yellow, and green helps balance red. Match the correcting family to the observed pigment and its intensity, then account for porosity before choosing the final tonal balance.`;
}

function buildPorosityResponse(
  context: MentorContext,
): string {
  const normalizedPorosity = context.porosity.toLowerCase();

  if (normalizedPorosity.includes("high")) {
    return `${buildSessionIntroduction(context)} Highly porous hair can absorb pigment quickly and unevenly, especially through lightened mids and ends. Consider zoning the application, reducing tonal intensity where appropriate, monitoring visually, and performing a strand test. The same formula may not behave uniformly across the full head.`;
  }

  if (normalizedPorosity.includes("low")) {
    return `${buildSessionIntroduction(context)} Lower-porosity hair may resist moisture and color penetration. Thorough saturation, appropriate processing time, and working within the product system are important. Avoid increasing developer strength automatically; first determine whether the challenge is resistance, product choice, or application technique.`;
  }

  return `${buildSessionIntroduction(context)} Medium porosity generally offers more predictable absorption, but previously colored or lightened zones can still behave differently. Evaluate the roots, mids, and ends separately, maintain even saturation, and monitor the most compromised areas so they do not over-deposit.`;
}

function buildLiftResponse(
  context: MentorContext,
): string {
  const liftDistance =
    context.targetLevel - context.currentLevel;

  if (liftDistance <= 0) {
    return `${buildSessionIntroduction(context)} This session does not currently describe an upward lift journey. Recheck whether the goal is deposit, tonal refinement, darkening, or corrective work. The educational plan should match the actual direction of the service.`;
  }

  const distanceDescription =
    liftDistance >= 4
      ? "a significant lift"
      : liftDistance >= 2
        ? "a moderate lift"
        : "a controlled lift";

  return `${buildSessionIntroduction(context)} Moving ${liftDistance} level${liftDistance === 1 ? "" : "s"} represents ${distanceDescription}. Expect warmer underlying pigments to appear as natural pigment is removed. Evaluate each stage visually instead of choosing toner only from the target level. Hair condition, previous artificial color, and elasticity determine whether the target can be reached safely in one session.`;
}

function buildDeveloperResponse(
  context: MentorContext,
): string {
  return `${buildSessionIntroduction(context)} Developer selection should follow the specific color or lightener system, the desired amount of lift or deposit, scalp considerations, and the condition of the hair. A higher volume is not automatically more effective or more appropriate. Previously lightened or porous areas may require a different strategy from healthy virgin regrowth. Always follow manufacturer directions and confirm the plan with testing.`;
}

function buildGrayCoverageResponse(
  context: MentorContext,
): string {
  return `${buildSessionIntroduction(context)} Effective gray coverage depends on the gray percentage, resistance, texture, distribution, target depth, and the requirements of the color line. Natural-base support, mixing ratio, developer, and full processing time may all matter. Assess resistant zones separately instead of assuming the same formula will cover every area equally.`;
}

function buildCorrectionResponse(
  context: MentorContext,
): string {
  return `${buildSessionIntroduction(context)} Corrective work should begin by dividing the hair into zones and documenting the level, visible pigment, porosity, elasticity, and chemical history of each zone. Decide which areas need lift, deposit, filling, neutralization, or no additional processing. The safest correction is often a staged plan rather than one aggressive formula across the entire head.`;
}

function buildStrandTestResponse(
  context: MentorContext,
): string {
  return `${buildSessionIntroduction(context)} A strand test can verify lift, tonal direction, timing, condition, and compatibility before a complete service. Select a section that represents the most challenging area, record the exact formula and processing time, and evaluate both the color result and the integrity of the hair before proceeding.`;
}

function buildColorTheoryResponse(
  context: MentorContext,
): string {
  const neutralizingTone = getNeutralizingFamily(
    context.selectedPigment,
  );

  const complementText =
    context.selectedPigment && neutralizingTone
      ? ` In this session, ${context.selectedPigment.toLowerCase()} is complemented by ${neutralizingTone}.`
      : "";

  return `${buildSessionIntroduction(context)} Color theory helps explain both visible warmth and tonal correction. Complementary colors sit opposite one another: blue and orange, violet and yellow, and green and red.${complementText} The practical goal is controlled balance based on the hair’s actual level, pigment intensity, and porosity.`;
}

function buildGeneralResponse(
  context: MentorContext,
): string {
  return `${buildSessionIntroduction(context)} Begin with diagnosis: confirm the starting level, visible pigment, porosity, elasticity, chemical history, and desired result. Separate the hair into zones when the condition or starting point varies. Use the color wheel and lift journey as educational guides, follow the product manufacturer’s instructions, and verify the plan with a strand test.`;
}

function buildTopicResponse(
  topic: MentorTopic,
  context: MentorContext,
): string {
  switch (topic) {
    case "neutralization":
      return buildNeutralizationResponse(context);
    case "porosity":
      return buildPorosityResponse(context);
    case "lift":
      return buildLiftResponse(context);
    case "developer":
      return buildDeveloperResponse(context);
    case "gray-coverage":
      return buildGrayCoverageResponse(context);
    case "corrective-color":
      return buildCorrectionResponse(context);
    case "strand-test":
      return buildStrandTestResponse(context);
    case "color-theory":
      return buildColorTheoryResponse(context);
    case "general":
      return buildGeneralResponse(context);
  }
}

export function buildMentorResponse({
  question,
  context,
}: ResponseBuilderInput): string {
  const topic = detectTopic(question);

  return buildTopicResponse(topic, context);
}