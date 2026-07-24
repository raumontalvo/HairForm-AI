import { describe, expect, it } from "vitest";
import {
  buildLiftKnowledge,
  getExpectedUnderlyingPigment,
  getLiftDistance,
  getLiftRisk,
} from "./lift";

describe("lift knowledge", () => {
  it("calculates lift distance", () => {
    expect(getLiftDistance(5, 8)).toBe(3);
    expect(getLiftDistance(8, 5)).toBe(-3);
  });

  it.each([
    [5, 5, "none"],
    [5, 6, "controlled"],
    [5, 8, "moderate"],
    [3, 8, "significant"],
  ] as const)(
    "classifies level %s to %s as %s",
    (currentLevel, targetLevel, expectedRisk) => {
      expect(
        getLiftRisk(currentLevel, targetLevel),
      ).toBe(expectedRisk);
    },
  );

  it.each([
    [1, "Deep red"],
    [3, "Red-orange"],
    [5, "Orange"],
    [7, "Orange-yellow"],
    [8, "Yellow-orange"],
    [9, "Yellow"],
    [10, "Pale yellow"],
  ] as const)(
    "maps level %s to %s",
    (level, expectedPigment) => {
      expect(
        getExpectedUnderlyingPigment(level),
      ).toBe(expectedPigment);
    },
  );

  it("builds moderate lift guidance", () => {
    const knowledge = buildLiftKnowledge(5, 8);

    expect(knowledge.liftDistance).toBe(3);
    expect(knowledge.risk).toBe("moderate");
    expect(knowledge.summary).toContain(
      "Moving 3 levels",
    );
    expect(knowledge.pigmentGuidance).toContain(
      "yellow-orange",
    );
  });

  it("builds significant lift guidance", () => {
    const knowledge = buildLiftKnowledge(3, 8);

    expect(knowledge.risk).toBe("significant");
    expect(knowledge.safetyGuidance).toContain(
      "strand-test results",
    );
  });

  it("handles a non-lifting service", () => {
    const knowledge = buildLiftKnowledge(7, 5);

    expect(knowledge.risk).toBe("none");
    expect(knowledge.summary).toContain(
      "does not currently describe an upward lift journey",
    );
  });

  it("clamps levels to the professional 1–10 scale", () => {
    expect(getExpectedUnderlyingPigment(0)).toBe("Deep red");
    expect(getExpectedUnderlyingPigment(12)).toBe(
      "Pale yellow",
    );
  });
});