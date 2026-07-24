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

type WeightedPhrase = {
  phrase: string;
  weight: number;
};

type TopicRule = {
  topic: MentorTopic;
  phrases: WeightedPhrase[];
};

const topicRules: TopicRule[] = [
  {
    topic: "neutralization",
    phrases: [
      { phrase: "how do i neutralize", weight: 18 },
      { phrase: "how to neutralize", weight: 18 },
      { phrase: "neutralization", weight: 16 },
      { phrase: "neutralize", weight: 14 },
      { phrase: "tone out", weight: 13 },
      { phrase: "cancel out", weight: 13 },
      { phrase: "counteract", weight: 12 },
      { phrase: "complementary color", weight: 12 },
      { phrase: "complement", weight: 9 },
      { phrase: "brassy", weight: 8 },
      { phrase: "orange", weight: 2 },
      { phrase: "yellow", weight: 2 },
      { phrase: "red", weight: 2 },
      { phrase: "green", weight: 2 },
      { phrase: "blue", weight: 2 },
      { phrase: "violet", weight: 2 },
    ],
  },
  {
    topic: "porosity",
    phrases: [
      { phrase: "how does porosity", weight: 18 },
      { phrase: "how should porosity", weight: 18 },
      { phrase: "porosity affect", weight: 17 },
      { phrase: "high porosity", weight: 15 },
      { phrase: "medium porosity", weight: 15 },
      { phrase: "low porosity", weight: 15 },
      { phrase: "porosity", weight: 13 },
      { phrase: "porous", weight: 11 },
      { phrase: "uneven deposit", weight: 10 },
      { phrase: "fades quickly", weight: 9 },
      { phrase: "grabbed dark", weight: 9 },
      { phrase: "grab", weight: 5 },
      { phrase: "absorbs", weight: 5 },
      { phrase: "absorb", weight: 5 },
    ],
  },
  {
    topic: "lift",
    phrases: [
      { phrase: "what should i expect when lifting", weight: 20 },
      { phrase: "during this lift", weight: 18 },
      { phrase: "stages of lift", weight: 18 },
      { phrase: "lift journey", weight: 17 },
      { phrase: "underlying pigment", weight: 16 },
      { phrase: "how many levels", weight: 15 },
      { phrase: "lifting from level", weight: 15 },
      { phrase: "lightening from level", weight: 15 },
      { phrase: "lift", weight: 10 },
      { phrase: "lifting", weight: 10 },
      { phrase: "lighten", weight: 9 },
      { phrase: "lightening", weight: 9 },
      { phrase: "target level", weight: 8 },
      { phrase: "current level", weight: 8 },
      { phrase: "level", weight: 3 },
    ],
  },
  {
    topic: "developer",
    phrases: [
      { phrase: "which developer", weight: 20 },
      { phrase: "what developer", weight: 20 },
      { phrase: "developer should i use", weight: 20 },
      { phrase: "developer strength", weight: 17 },
      { phrase: "developer volume", weight: 17 },
      { phrase: "10 volume", weight: 16 },
      { phrase: "20 volume", weight: 16 },
      { phrase: "30 volume", weight: 16 },
      { phrase: "40 volume", weight: 16 },
      { phrase: "developer", weight: 13 },
      { phrase: "peroxide", weight: 11 },
      { phrase: "oxidizer", weight: 11 },
      { phrase: "volume", weight: 5 },
    ],
  },
  {
    topic: "gray-coverage",
    phrases: [
      { phrase: "gray coverage", weight: 20 },
      { phrase: "grey coverage", weight: 20 },
      { phrase: "cover resistant gray", weight: 19 },
      { phrase: "cover resistant grey", weight: 19 },
      { phrase: "resistant gray", weight: 18 },
      { phrase: "resistant grey", weight: 18 },
      { phrase: "white hair coverage", weight: 17 },
      { phrase: "gray", weight: 10 },
      { phrase: "grey", weight: 10 },
      { phrase: "white hair", weight: 8 },
    ],
  },
  {
    topic: "corrective-color",
    phrases: [
      { phrase: "color correction", weight: 20 },
      { phrase: "corrective color", weight: 20 },
      { phrase: "how do i correct", weight: 18 },
      { phrase: "how to correct", weight: 18 },
      { phrase: "hot roots", weight: 17 },
      { phrase: "uneven color", weight: 16 },
      { phrase: "color banding", weight: 16 },
      { phrase: "banding", weight: 14 },
      { phrase: "bands", weight: 10 },
      { phrase: "muddy", weight: 10 },
      { phrase: "uneven", weight: 8 },
      { phrase: "correction", weight: 8 },
      { phrase: "corrective", weight: 8 },
    ],
  },
  {
    topic: "strand-test",
    phrases: [
      { phrase: "how do i strand test", weight: 20 },
      { phrase: "how to strand test", weight: 20 },
      { phrase: "strand test", weight: 18 },
      { phrase: "test strand", weight: 18 },
      { phrase: "patch test", weight: 12 },
      { phrase: "test piece", weight: 12 },
    ],
  },
  {
    topic: "color-theory",
    phrases: [
      { phrase: "how does the color wheel", weight: 20 },
      { phrase: "color wheel", weight: 18 },
      { phrase: "primary color", weight: 16 },
      { phrase: "secondary color", weight: 16 },
      { phrase: "tertiary color", weight: 16 },
      { phrase: "warm tone", weight: 12 },
      { phrase: "cool tone", weight: 12 },
      { phrase: "tone family", weight: 12 },
      { phrase: "color theory", weight: 18 },
    ],
  },
];

const intentPriority: MentorTopic[] = [
  "strand-test",
  "developer",
  "gray-coverage",
  "corrective-color",
  "porosity",
  "lift",
  "neutralization",
  "color-theory",
  "general",
];

function scoreTopic(
  normalizedQuestion: string,
  rule: TopicRule,
): number {
  return rule.phrases.reduce((total, { phrase, weight }) => {
    if (!normalizedQuestion.includes(phrase)) {
      return total;
    }

    const phraseBonus = phrase.includes(" ") ? 3 : 0;

    return total + weight + phraseBonus;
  }, 0);
}

function getPriority(topic: MentorTopic): number {
  return intentPriority.indexOf(topic);
}

export function detectTopic(question: string): MentorTopic {
  const normalizedQuestion = question
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalizedQuestion) {
    return "general";
  }

  const rankedTopics = topicRules
    .map((rule) => ({
      topic: rule.topic,
      score: scoreTopic(normalizedQuestion, rule),
    }))
    .filter(({ score }) => score > 0)
    .sort((first, second) => {
      if (second.score !== first.score) {
        return second.score - first.score;
      }

      return (
        getPriority(first.topic) -
        getPriority(second.topic)
      );
    });

  return rankedTopics[0]?.topic ?? "general";
}