type KnowledgeResponse = {
  keywords: string[];
  answer: string;
};

const knowledgeResponses: KnowledgeResponse[] = [
  {
    keywords: ["green", "toner", "muddy"],
    answer:
      "A toner can appear green when too much blue or ash is applied over hair that still contains yellow. Blue combined with yellow can read as green. Review the actual underlying pigment, reduce the ash intensity, and consider a warmer or violet-balanced approach. Always assess porosity and strand test before correcting.",
  },
  {
    keywords: ["hot roots", "roots", "warmer"],
    answer:
      "Hot roots usually happen because scalp heat accelerates processing, the root area is more virgin than the mids and ends, or the formula is too warm or too strong at the scalp. A common strategy is to adjust the root formula, developer, timing, or application order while following the manufacturer’s instructions.",
  },
  {
    keywords: ["orange", "lift", "brassy"],
    answer:
      "Orange is commonly exposed when lifting through the middle levels because the underlying pigment has not yet reached yellow. The solution is not always stronger ash. First determine the actual level, hair condition, and whether additional lift is safe. Then select the complementary tone appropriate for the exposed pigment.",
  },
  {
    keywords: ["banding", "bands", "uneven"],
    answer:
      "Banding usually reflects different starting levels, overlapping applications, uneven saturation, or inconsistent processing histories. Treat each band as a separate zone. Analyze the level, porosity, and condition of each area before choosing a correction strategy.",
  },
  {
    keywords: ["porosity", "grab", "dark"],
    answer:
      "Highly porous hair can absorb cool or dark pigments too strongly because the cuticle is more open and the internal structure is compromised. Use a strand test, consider porosity equalization, and avoid assuming the same formula will behave consistently from roots to ends.",
  },
];

const fallbackResponse =
  "That is a great professional question. Start by identifying the current level, underlying pigment, porosity, chemical history, and desired result. From there, compare the visual problem with the color wheel and the product manufacturer’s instructions. A strand test is the safest way to confirm the plan before full application.";

export function getSampleResponse(question: string): string {
  const normalizedQuestion = question.toLowerCase();

  const match = knowledgeResponses.find((response) =>
    response.keywords.some((keyword) =>
      normalizedQuestion.includes(keyword),
    ),
  );

  return match?.answer ?? fallbackResponse;
}