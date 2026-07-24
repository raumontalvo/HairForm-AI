import { describe, expect, it } from "vitest";
import {
  detectTopic,
  type MentorTopic,
} from "./detectTopic";

type TopicTestCase = {
  question: string;
  expectedTopic: MentorTopic;
};

const topicCases: TopicTestCase[] = [
  {
    question: "How do I neutralize orange?",
    expectedTopic: "neutralization",
  },
  {
    question: "Which complementary color cancels yellow?",
    expectedTopic: "neutralization",
  },
  {
    question: "Why does orange appear during this lift?",
    expectedTopic: "lift",
  },
  {
    question:
      "What should I expect when lifting from level 5 to level 8?",
    expectedTopic: "lift",
  },
  {
    question:
      "How should high porosity affect my formulation?",
    expectedTopic: "porosity",
  },
  {
    question: "Why did the ends grab too dark?",
    expectedTopic: "porosity",
  },
  {
    question: "Which developer should I use?",
    expectedTopic: "developer",
  },
  {
    question: "Should I use 20 volume or 30 volume?",
    expectedTopic: "developer",
  },
  {
    question:
      "How can I improve coverage on resistant gray?",
    expectedTopic: "gray-coverage",
  },
  {
    question: "How do I correct uneven orange banding?",
    expectedTopic: "corrective-color",
  },
  {
    question: "Why are the roots warmer than the rest?",
    expectedTopic: "corrective-color",
  },
  {
    question: "How do I perform a strand test?",
    expectedTopic: "strand-test",
  },
  {
    question: "How does the color wheel work?",
    expectedTopic: "color-theory",
  },
  {
    question: "Explain primary and secondary colors.",
    expectedTopic: "color-theory",
  },
  {
    question:
      "Can you help me think through this consultation?",
    expectedTopic: "general",
  },
  {
    question: "",
    expectedTopic: "general",
  },
  {
    question: "   ",
    expectedTopic: "general",
  },
];

describe("detectTopic", () => {
  it.each(topicCases)(
    'classifies "$question" as $expectedTopic',
    ({ question, expectedTopic }) => {
      expect(detectTopic(question)).toBe(expectedTopic);
    },
  );

  it("is case-insensitive", () => {
    expect(
      detectTopic("HOW DO I NEUTRALIZE ORANGE?"),
    ).toBe("neutralization");
  });

  it(
    "prioritizes lift intent over an incidental pigment word",
    () => {
      expect(
        detectTopic(
          "Why does orange appear during this lift journey?",
        ),
      ).toBe("lift");
    },
  );

  it(
    "prioritizes correction intent over an incidental pigment word",
    () => {
      expect(
        detectTopic(
          "How do I correct uneven orange color banding?",
        ),
      ).toBe("corrective-color");
    },
  );

  it(
    "prioritizes porosity intent when color terminology is also present",
    () => {
      expect(
        detectTopic(
          "How does high porosity affect blue toner absorption?",
        ),
      ).toBe("porosity");
    },
  );
});