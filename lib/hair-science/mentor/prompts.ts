import type { MentorContext } from "./buildResponse";

export function buildMentorPrompts(
  context: MentorContext,
): string[] {
  const {
    currentLevel,
    targetLevel,
    porosity,
    selectedPigment,
  } = context;

  const prompts = [
    `What should I expect when lifting from level ${currentLevel} to level ${targetLevel}?`,
    `How should ${porosity.toLowerCase()} porosity affect my formulation?`,
    selectedPigment
      ? `How do I neutralize ${selectedPigment.toLowerCase()} pigment?`
      : "How do I identify the underlying pigment during lifting?",
  ];

  if (targetLevel - currentLevel >= 3) {
    prompts.push(
      "What risks should I consider with this amount of lift?",
    );
  }

  if (selectedPigment) {
    prompts.push(
      `Why does ${selectedPigment.toLowerCase()} appear during this lift journey?`,
    );
  }

  return prompts;
}