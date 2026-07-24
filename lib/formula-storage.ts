import type { FormulaPlan } from "@/components/formula-builder/FormulaPlanningForm";

const FORMULA_PLAN_STORAGE_KEY = "hairform-ai:formula-plan";

function isFormulaPlan(value: unknown): value is FormulaPlan {
  if (!value || typeof value !== "object") {
    return false;
  }

  const plan = value as Record<string, unknown>;

  return (
    typeof plan.tonalFamily === "string" &&
    typeof plan.developerChoice === "string" &&
    typeof plan.applicationStrategy === "string" &&
    typeof plan.processingNotes === "string" &&
    typeof plan.professionalNotes === "string"
  );
}

export function loadFormulaPlan(): FormulaPlan | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedValue = window.localStorage.getItem(
      FORMULA_PLAN_STORAGE_KEY,
    );

    if (!storedValue) {
      return null;
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    return isFormulaPlan(parsedValue) ? parsedValue : null;
  } catch {
    return null;
  }
}

export function saveFormulaPlan(plan: FormulaPlan): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.localStorage.setItem(
      FORMULA_PLAN_STORAGE_KEY,
      JSON.stringify(plan),
    );

    return true;
  } catch {
    return false;
  }
}

export function clearFormulaPlan(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.localStorage.removeItem(
      FORMULA_PLAN_STORAGE_KEY,
    );

    return true;
  } catch {
    return false;
  }
}