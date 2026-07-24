type KnowledgeResponse = {
  keywords: string[];
  answer: string;
};

const knowledgeResponses: KnowledgeResponse[] = [
  {
    keywords: ["green", "toner", "muddy"],
    answer:
      "A toner can appear green when too much blue or ash is applied over hair that still contains yellow. Blue combined with yellow can visually read as green. Reassess the true underlying pigment, reduce the ash intensity, and consider a warmer or violet-balanced correction. Porous areas may absorb cool pigment more aggressively, so strand testing is essential.",
  },
  {
    keywords: ["hot roots", "roots", "warmer"],
    answer:
      "Hot roots often occur because scalp heat accelerates processing, the root area is more resistant or more virgin than the mids and ends, or the root formula is too warm or too strong. Consider application order, developer strength, timing, and whether the root area requires a separate formula. Always stay within the product manufacturer’s instructions.",
  },
  {
    keywords: ["banding", "bands", "uneven"],
    answer:
      "Banding usually reflects different starting levels, overlapping applications, uneven saturation, or inconsistent chemical histories. Treat each band as a separate zone. Evaluate the level, pigment, porosity, elasticity, and condition of each area before deciding whether to lift, deposit, fill, or leave it untouched.",
  },
  {
    keywords: ["neutralize", "neutralization", "complement", "cancel"],
    answer:
      "Neutralization works by using the complementary color opposite the unwanted pigment on the color wheel. Blue helps control orange, violet helps control yellow, and green helps control red. The goal is balance, not simply adding the strongest cool tone. Match the correcting tone to the actual pigment and level, then account for porosity before formulating.",
  },
  {
    keywords: ["orange", "brassy"],
    answer:
      "Orange commonly appears while lifting through the middle levels because the hair has not yet reached a pale yellow stage. First determine whether the hair is safely capable of more lift. If the level is correct and the goal is deposit, blue is the complementary family used to soften orange. Avoid over-ashing porous hair, since it may become dull or muddy.",
  },
  {
    keywords: ["yellow"],
    answer:
      "Yellow is usually exposed at lighter levels after much of the red and orange pigment has been lifted away. Violet is its complementary family. Before toning, confirm whether the yellow is pale, bright, or yellow-orange, because each requires a different balance. The lighter and more porous the hair, the more carefully the formula should be controlled.",
  },
  {
    keywords: ["red"],
    answer:
      "Red is a dominant underlying pigment at deeper levels and can remain visible through lifting or fading. Green is the complementary family used to soften red. However, the formula must match the actual level and intensity of the red. Too much green or ash over porous hair can create an unnatural or muddy result.",
  },
  {
    keywords: ["lift", "lifting", "levels", "level"],
    answer:
      "A lift journey should be evaluated one stage at a time. As natural pigment is removed, the hair typically reveals deeper red tones first, then orange, yellow-orange, yellow, and finally pale yellow. The exact path depends on the starting level and previous color history. Do not choose a toner based only on the target level—formulate for the pigment that is actually visible.",
  },
  {
    keywords: ["porosity", "porous", "grab", "dark"],
    answer:
      "Porosity affects how quickly and unevenly hair absorbs color. Highly porous hair may grab cool or dark pigment, fade quickly, or process inconsistently. Lower-porosity hair may resist deposit. Adjust saturation, timing, tone intensity, and application strategy by zone rather than assuming one formula will behave uniformly from roots to ends.",
  },
  {
    keywords: ["developer", "volume", "peroxide"],
    answer:
      "Developer choice affects oxidation and lifting power, but stronger is not automatically better. Select developer according to the product system, desired lift or deposit, starting level, scalp sensitivity, and hair condition. Previously lightened or fragile hair may not tolerate the same approach as healthy virgin hair. Follow the manufacturer’s directions and strand test.",
  },
  {
    keywords: ["gray", "grey", "coverage", "resistant"],
    answer:
      "Gray coverage depends on the percentage and resistance of the gray, the desired depth, the product line, and the balance between natural and tonal pigment. Resistant gray may require specific mixing ratios, development time, or a natural-base component. Avoid using a universal formula without first assessing the distribution and texture of the gray.",
  },
  {
    keywords: ["corrective", "correction", "color correction"],
    answer:
      "Corrective color should begin with diagnosis, not formulation. Map the head into zones, document the starting level and pigment in each zone, assess porosity and elasticity, and review the full chemical history. Decide what can safely be lifted, what needs filling, what requires deposit, and what should not be altered in one session.",
  },
  {
    keywords: ["strand test", "test strand"],
    answer:
      "A strand test helps confirm lift, tone, timing, condition, and compatibility before committing to a full service. Choose a representative section that reflects the most challenging area. Record the formula, developer, processing time, and visual result so the test becomes useful evidence rather than a quick guess.",
  },
];

const fallbackResponse =
  "Begin with diagnosis: identify the current level, visible underlying pigment, porosity, elasticity, chemical history, and desired result. Then separate the hair into zones if the condition or starting level varies. Use the color wheel to understand the pigment relationship, follow the product manufacturer’s instructions, and confirm the plan with a strand test before full application.";

export function getSampleResponse(question: string): string {
  const normalizedQuestion = question.toLowerCase();

  const rankedResponses = knowledgeResponses
    .map((response) => ({
      response,
      score: response.keywords.reduce(
        (total, keyword) =>
          normalizedQuestion.includes(keyword)
            ? total + keyword.length
            : total,
        0,
      ),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return rankedResponses[0]?.response.answer ?? fallbackResponse;
}