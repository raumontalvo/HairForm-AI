import { describe, expect, it } from "vitest";
import {
  getPorosityApplicationGuidance,
  getPorosityFormulationGuidance,
  getPorosityKnowledge,
  getPorositySummary,
  normalizePorosity,
} from "./porosity";

describe("porosity knowledge", () => {
  it.each([
    ["Low", "low"],
    ["low porosity", "low"],
    ["Medium", "medium"],
    ["normal", "medium"],
    ["High", "high"],
    ["highly porous", "high"],
  ] as const)(
    "normalizes %s as %s",
    (input, expected) => {
      expect(normalizePorosity(input)).toBe(expected);
    },
  );

  it("defaults missing porosity to medium", () => {
    expect(normalizePorosity(null)).toBe("medium");
    expect(normalizePorosity(undefined)).toBe("medium");
    expect(normalizePorosity("")).toBe("medium");
  });

  it("returns complete high-porosity knowledge", () => {
    const knowledge = getPorosityKnowledge("High");

    expect(knowledge.level).toBe("high");
    expect(knowledge.summary).toContain(
      "absorb pigment quickly and unevenly",
    );
    expect(knowledge.formulationGuidance).toContain(
      "reduced tonal intensity",
    );
    expect(knowledge.applicationGuidance).toContain(
      "avoid unnecessary overlap",
    );
  });

  it("returns low-porosity formulation guidance", () => {
    expect(
      getPorosityFormulationGuidance("Low"),
    ).toContain("Do not automatically increase developer strength");
  });

  it("returns medium-porosity application guidance", () => {
    expect(
      getPorosityApplicationGuidance("Medium"),
    ).toContain("monitor previously processed areas");
  });

  it("returns a readable summary", () => {
    expect(getPorositySummary("High")).toContain(
      "more open or compromised structure",
    );
  });
});