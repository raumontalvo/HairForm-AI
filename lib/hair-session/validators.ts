import type {
  FormulaPlan,
  HairSession,
  PorosityLevel,
} from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

export function isValidLevel(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 1 &&
    value <= 10
  );
}

export function isValidPercentage(
  value: unknown,
): value is number {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    value >= 0 &&
    value <= 100
  );
}

export function isPorosityLevel(
  value: unknown,
): value is PorosityLevel {
  return (
    value === "Low" ||
    value === "Medium" ||
    value === "High"
  );
}

export function isFormulaPlan(
  value: unknown,
): value is FormulaPlan {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.tonalFamily === "string" &&
    typeof value.developerChoice === "string" &&
    typeof value.applicationStrategy === "string" &&
    typeof value.processingNotes === "string" &&
    typeof value.professionalNotes === "string"
  );
}

function isValidTimestamp(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    !Number.isNaN(Date.parse(value))
  );
}

export function isHairSession(
  value: unknown,
): value is HairSession {
  if (!isRecord(value)) {
    return false;
  }

  const selectedPigmentIsValid =
    value.selectedPigment === null ||
    typeof value.selectedPigment === "string";

  return (
    typeof value.id === "string" &&
    value.id.trim().length > 0 &&
    typeof value.name === "string" &&
    value.name.trim().length > 0 &&
    isValidTimestamp(value.createdAt) &&
    isValidTimestamp(value.updatedAt) &&
    isValidLevel(value.currentLevel) &&
    isValidLevel(value.targetLevel) &&
    isPorosityLevel(value.porosity) &&
    selectedPigmentIsValid &&
    isValidPercentage(value.grayPercentage) &&
    typeof value.chemicalHistory === "string" &&
    typeof value.consultationNotes === "string" &&
    isFormulaPlan(value.formulaPlan)
  );
}

export function parseHairSession(
  value: unknown,
): HairSession | null {
  return isHairSession(value) ? value : null;
}