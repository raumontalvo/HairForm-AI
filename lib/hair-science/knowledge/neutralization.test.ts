import { describe, expect, it } from "vitest";
import {
  getNeutralizationExplanation,
  getNeutralizationPair,
  getNeutralizingFamily,
  normalizePigmentFamily,
} from "./neutralization";

describe("neutralization knowledge", () => {
  it("normalizes compound pigment names", () => {
    expect(normalizePigmentFamily("Orange-yellow")).toBe(
      "orange",
    );

    expect(normalizePigmentFamily("Pale yellow")).toBe(
      "yellow",
    );
  });

  it("returns null for an unknown pigment", () => {
    expect(normalizePigmentFamily("beige")).toBeNull();
    expect(getNeutralizationPair("beige")).toBeNull();
  });

  it.each([
    ["red", "green"],
    ["orange", "blue"],
    ["yellow", "violet"],
    ["green", "red"],
    ["blue", "orange"],
    ["violet", "yellow"],
  ] as const)(
    "maps %s to %s",
    (pigment, complement) => {
      expect(getNeutralizingFamily(pigment)).toBe(
        complement,
      );
    },
  );

  it("returns the full neutralization pair", () => {
    const pair = getNeutralizationPair("Orange");

    expect(pair).toEqual({
      pigment: "orange",
      complement: "blue",
      explanation:
        "Blue is the complementary family used to soften visible orange. Confirm that the hair has reached the intended level before relying on toner.",
    });
  });

  it("returns a pigment-specific explanation", () => {
    expect(
      getNeutralizationExplanation("Yellow"),
    ).toContain(
      "Violet is the complementary family",
    );
  });

  it("returns fallback guidance without a pigment", () => {
    expect(
      getNeutralizationExplanation(null),
    ).toContain(
      "Identify the pigment that is actually visible",
    );
  });
});