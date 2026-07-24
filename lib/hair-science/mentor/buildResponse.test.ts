import { describe, expect, it } from "vitest";
import {
  buildMentorResponse,
  type MentorContext,
} from "./buildResponse";

const baseContext: MentorContext = {
  currentLevel: 5,
  targetLevel: 8,
  porosity: "Medium",
  selectedPigment: "Orange",
};

describe("buildMentorResponse", () => {
  it("builds a neutralization response from the active pigment", () => {
    const response = buildMentorResponse({
      question: "How do I neutralize orange?",
      context: baseContext,
    });

    expect(response).toContain("Orange");
    expect(response).toContain("blue");
    expect(response).toContain("level 5");
    expect(response).toContain("level 8");
    expect(response).toContain("medium porosity");
  });

  it("builds a lift response using the level distance", () => {
    const response = buildMentorResponse({
      question: "What should I expect during this lift?",
      context: baseContext,
    });

    expect(response).toContain("Moving 3 levels");
    expect(response).toContain("moderate lift");
    expect(response).toContain("underlying pigments");
  });

  it("builds a high-porosity response", () => {
    const response = buildMentorResponse({
      question: "How should porosity affect my formulation?",
      context: {
        ...baseContext,
        porosity: "High",
      },
    });

    expect(response).toContain("Highly porous hair");
    expect(response).toContain("absorb pigment quickly");
    expect(response).toContain("strand test");
  });

  it("builds a low-porosity response", () => {
    const response = buildMentorResponse({
      question: "How should low porosity affect deposit?",
      context: {
        ...baseContext,
        porosity: "Low",
      },
    });

    expect(response).toContain("Lower-porosity hair");
    expect(response).toContain("resist moisture and color penetration");
  });

  it("builds a developer response without prescribing a volume", () => {
    const response = buildMentorResponse({
      question: "Which developer should I use?",
      context: baseContext,
    });

    expect(response).toContain("Developer selection");
    expect(response).toContain("higher volume is not automatically");
    expect(response).toContain("manufacturer directions");
  });

  it("handles sessions without a selected pigment", () => {
    const response = buildMentorResponse({
      question: "How does neutralization work?",
      context: {
        ...baseContext,
        selectedPigment: null,
      },
    });

    expect(response).toContain(
      "Neutralization begins by identifying the pigment",
    );
    expect(response).toContain("Blue helps balance orange");
  });

  it("handles a target level equal to the current level", () => {
    const response = buildMentorResponse({
      question: "What should I expect during this lift?",
      context: {
        ...baseContext,
        targetLevel: 5,
      },
    });

    expect(response).toContain(
      "does not currently describe an upward lift journey",
    );
  });

  it("returns a diagnostic response for a general question", () => {
    const response = buildMentorResponse({
      question: "Help me think through this consultation.",
      context: baseContext,
    });

    expect(response).toContain("Begin with diagnosis");
    expect(response).toContain("chemical history");
    expect(response).toContain("strand test");
  });
});