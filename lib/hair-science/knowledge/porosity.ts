export type PorosityLevel = "low" | "medium" | "high";

export type PorosityKnowledge = {
  level: PorosityLevel;
  summary: string;
  formulationGuidance: string;
  applicationGuidance: string;
};

const porosityKnowledge: Record<
  PorosityLevel,
  PorosityKnowledge
> = {
  low: {
    level: "low",
    summary:
      "Low-porosity hair has a more resistant cuticle and may accept moisture and pigment more slowly.",
    formulationGuidance:
      "Prioritize complete saturation, appropriate processing time, and product-system guidance. Do not automatically increase developer strength simply because the hair appears resistant.",
    applicationGuidance:
      "Work in clean sections, maintain even saturation, and monitor whether resistant areas need more time rather than a stronger formula.",
  },
  medium: {
    level: "medium",
    summary:
      "Medium-porosity hair generally absorbs and retains color more predictably.",
    formulationGuidance:
      "A balanced approach is usually appropriate, but previous color, heat exposure, and environmental wear can still create differences between roots, mids, and ends.",
    applicationGuidance:
      "Evaluate each zone independently and monitor previously processed areas so they do not over-deposit.",
  },
  high: {
    level: "high",
    summary:
      "High-porosity hair has a more open or compromised structure and may absorb pigment quickly and unevenly.",
    formulationGuidance:
      "Consider reduced tonal intensity where appropriate, porosity equalization, zoning, and close visual monitoring. Highly porous areas may grab cool or dark pigment more strongly.",
    applicationGuidance:
      "Protect fragile areas, avoid unnecessary overlap, and consider delayed application or a separate strategy for compromised mids and ends.",
  },
};

export function normalizePorosity(
  porosity: string | null | undefined,
): PorosityLevel {
  const normalizedPorosity = porosity
    ?.toLowerCase()
    .trim();

  if (normalizedPorosity?.includes("high")) {
    return "high";
  }

  if (normalizedPorosity?.includes("low")) {
    return "low";
  }

  return "medium";
}

export function getPorosityKnowledge(
  porosity: string | null | undefined,
): PorosityKnowledge {
  return porosityKnowledge[normalizePorosity(porosity)];
}

export function getPorositySummary(
  porosity: string | null | undefined,
): string {
  return getPorosityKnowledge(porosity).summary;
}

export function getPorosityFormulationGuidance(
  porosity: string | null | undefined,
): string {
  return getPorosityKnowledge(porosity).formulationGuidance;
}

export function getPorosityApplicationGuidance(
  porosity: string | null | undefined,
): string {
  return getPorosityKnowledge(porosity).applicationGuidance;
}