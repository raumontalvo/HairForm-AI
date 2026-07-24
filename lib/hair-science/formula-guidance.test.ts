import { describe, expect, it } from "vitest";
import {
  buildFormulaGuidance,
  type FormulaGuidanceInput,
} from "./formula-guidance";

const baseInput: FormulaGuidanceInput = {
  currentLevel: 5,
  targetLevel: 8,
  porosity: "Medium",
  selectedPigment: "Orange",
  tonalFamily: "ash",
  developerChoice: "20-volume",
  applicationStrategy: "zone-application",
};

describe("buildFormulaGuidance", () => {
  it("uses the active selected pigment", () => {
    const guidance = buildFormulaGuidance(baseInput);

    expect(guidance.expectedPigment).toContain("Orange");
    expect(guidance.neutralization).toContain("blue");
    expect(guidance.neutralization).toContain("ash");
  });

  it("describes a moderate lift", () => {
    const guidance = buildFormulaGuidance(baseInput);

    expect(guidance.liftConsideration).toContain(
      "Moving 3 levels",
    );
    expect(guidance.liftConsideration).toContain(
      "moderate lift",
    );
  });

  it("warns about significant lift", () => {
    const guidance = buildFormulaGuidance({
      ...baseInput,
      currentLevel: 3,
      targetLevel: 8,
    });

    expect(guidance.liftConsideration).toContain(
      "significant lift",
    );
    expect(guidance.liftConsideration).toContain(
      "strand-test results",
    );
  });

  it("handles a non-lifting service", () => {
    const guidance = buildFormulaGuidance({
      ...baseInput,
      targetLevel: 5,
    });

    expect(guidance.liftConsideration).toContain(
      "No upward lift",
    );
  });

  it("builds high-porosity guidance", () => {
    const guidance = buildFormulaGuidance({
      ...baseInput,
      porosity: "High",
    });

    expect(guidance.porosityConsideration).toContain(
      "High porosity",
    );
    expect(guidance.porosityConsideration).toContain(
      "rapid, uneven, or overly cool deposit",
    );
  });

  it("builds low-porosity guidance", () => {
    const guidance = buildFormulaGuidance({
      ...baseInput,
      porosity: "Low",
    });

    expect(guidance.porosityConsideration).toContain(
      "Low porosity",
    );
    expect(guidance.porosityConsideration).toContain(
      "resist color penetration",
    );
  });

  it("builds zone-application guidance", () => {
    const guidance = buildFormulaGuidance(baseInput);

    expect(guidance.applicationConsideration).toContain(
      "zone-by-zone strategy",
    );
    expect(guidance.applicationConsideration).toContain(
      "separate goal and timing plan",
    );
  });

  it("includes the recorded developer choice", () => {
    const guidance = buildFormulaGuidance(baseInput);

    expect(guidance.safetyReminder).toContain("20 volume");
    expect(guidance.safetyReminder).toContain(
      "manufacturer instructions",
    );
    expect(guidance.safetyReminder).toContain(
      "strand test",
    );
  });

  it("handles an undecided developer", () => {
    const guidance = buildFormulaGuidance({
      ...baseInput,
      developerChoice: "not-decided",
    });

    expect(guidance.safetyReminder).toContain(
      "Developer is still undecided",
    );
  });

  it("handles a session without a selected pigment", () => {
    const guidance = buildFormulaGuidance({
      ...baseInput,
      selectedPigment: null,
    });

    expect(guidance.neutralization).toContain(
      "Select or identify the visible pigment",
    );
    expect(guidance.neutralization).toContain(
      "Blue balances orange",
    );
  });
});