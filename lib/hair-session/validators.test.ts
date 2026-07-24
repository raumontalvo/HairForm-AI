import { describe, expect, it } from "vitest";
import {
  isFormulaPlan,
  isHairSession,
  isPorosityLevel,
  isValidLevel,
  isValidPercentage,
  parseHairSession,
} from "./validators";
import {
  createEmptyHairSession,
  emptyFormulaPlan,
} from "./types";

describe("hair session validators", () => {
  it.each([
    [1, true],
    [5, true],
    [10, true],
    [0, false],
    [11, false],
    [5.5, false],
    ["5", false],
  ])("validates level %s as %s", (value, expected) => {
    expect(isValidLevel(value)).toBe(expected);
  });

  it.each([
    [0, true],
    [50, true],
    [100, true],
    [-1, false],
    [101, false],
    [Number.NaN, false],
    ["50", false],
  ])(
    "validates percentage %s as %s",
    (value, expected) => {
      expect(isValidPercentage(value)).toBe(expected);
    },
  );

  it.each([
    ["Low", true],
    ["Medium", true],
    ["High", true],
    ["low", false],
    ["Normal", false],
    [null, false],
  ])("validates porosity %s as %s", (value, expected) => {
    expect(isPorosityLevel(value)).toBe(expected);
  });

  it("validates a complete formula plan", () => {
    expect(isFormulaPlan(emptyFormulaPlan)).toBe(true);
  });

  it("rejects an incomplete formula plan", () => {
    expect(
      isFormulaPlan({
        tonalFamily: "ash",
        developerChoice: "20-volume",
      }),
    ).toBe(false);
  });

  it("validates a newly created hair session", () => {
    const session = createEmptyHairSession();

    expect(isHairSession(session)).toBe(true);
    expect(parseHairSession(session)).toEqual(session);
  });

  it("rejects malformed session data", () => {
    const session = {
      ...createEmptyHairSession(),
      currentLevel: 12,
    };

    expect(isHairSession(session)).toBe(false);
    expect(parseHairSession(session)).toBeNull();
  });

  it("rejects invalid timestamps", () => {
    const session = {
      ...createEmptyHairSession(),
      updatedAt: "not-a-date",
    };

    expect(isHairSession(session)).toBe(false);
  });

  it("allows a null selected pigment", () => {
    const session = {
      ...createEmptyHairSession(),
      selectedPigment: null,
    };

    expect(isHairSession(session)).toBe(true);
  });

  it("rejects an empty session name", () => {
    const session = {
      ...createEmptyHairSession(),
      name: "   ",
    };

    expect(isHairSession(session)).toBe(false);
  });

  it("rejects arrays and primitive values", () => {
    expect(isHairSession([])).toBe(false);
    expect(isHairSession(null)).toBe(false);
    expect(isHairSession("session")).toBe(false);
  });
});