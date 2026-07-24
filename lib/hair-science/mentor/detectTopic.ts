export type MentorTopic =
  | "neutralization"
  | "porosity"
  | "lift"
  | "developer"
  | "gray-coverage"
  | "corrective-color"
  | "strand-test"
  | "color-theory"
  | "general";

type TopicRule = {
  topic: MentorTopic;
  keywords: string[];
};

const topicRules: TopicRule[] = [
  {
    topic: "neutralization",
    keywords: [
      "neutralize",
      "neutralization",
      "complement",
      "cancel",
      "counteract",
      "tone out",
      "brassy",
      "orange",
      "yellow",
      "red",
      "green",
      "blue",
      "violet",
    ],
  },
  {
    topic: "porosity",
    keywords: [
      "porosity",
      "porous",
      "grab",
      "absorbs",
      "absorb",
      "fades quickly",
      "uneven deposit",
    ],
  },
  {
    topic: "lift",
    keywords: [
      "lift",
      "lifting",
      "lighten",
      "lightening",
      "level",
      "underlying pigment",
      "stages of lift",
    ],
  },
  {
    topic: "developer",
    keywords: [
      "developer",
      "volume",
      "peroxide",
      "oxidizer",
      "10 volume",
      "20 volume",
      "30 volume",
      "40 volume",
    ],
  },
  {
    topic: "gray-coverage",
    keywords: [
      "gray",
      "grey",
      "gray coverage",
      "grey coverage",
      "resistant gray",
      "white hair",
    ],
  },
  {
    topic: "corrective-color",
    keywords: [
      "corrective",
      "correction",
      "color correction",
      "banding",
      "bands",
      "uneven",
      "hot roots",
      "muddy",
    ],
  },
  {
    topic: "strand-test",
    keywords: [
      "strand test",
      "test strand",
      "patch test",
      "test piece",
    ],
  },
  {
    topic: "color-theory",
    keywords: [
      "color wheel",
      "primary color",
      "secondary color",
      "tertiary color",
      "warm tone",
      "cool tone",
      "tone family",
    ],
  },
];

export function detectTopic(question: string): MentorTopic {
  const normalizedQuestion = question.toLowerCase().trim();

  if (!normalizedQuestion) {
    return "general";
  }

  const rankedTopics = topicRules
    .map((rule) => ({
      topic: rule.topic,
      score: rule.keywords.reduce(
        (total, keyword) =>
          normalizedQuestion.includes(keyword)
            ? total + keyword.length
            : total,
        0,
      ),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return rankedTopics[0]?.topic ?? "general";
}