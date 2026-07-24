export type PorosityLevel = "Low" | "Medium" | "High";

export type FormulaPlan = {
  tonalFamily: string;
  developerChoice: string;
  applicationStrategy: string;
  processingNotes: string;
  professionalNotes: string;
};

export type HairSession = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;

  currentLevel: number;
  targetLevel: number;
  porosity: PorosityLevel;
  selectedPigment: string | null;

  grayPercentage: number;
  chemicalHistory: string;
  consultationNotes: string;

  formulaPlan: FormulaPlan;
};

export const emptyFormulaPlan: FormulaPlan = {
  tonalFamily: "",
  developerChoice: "",
  applicationStrategy: "",
  processingNotes: "",
  professionalNotes: "",
};

export function createEmptyHairSession(): HairSession {
  const timestamp = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    name: "Untitled Hair Session",
    createdAt: timestamp,
    updatedAt: timestamp,

    currentLevel: 5,
    targetLevel: 8,
    porosity: "Medium",
    selectedPigment: null,

    grayPercentage: 0,
    chemicalHistory: "",
    consultationNotes: "",

    formulaPlan: {
      ...emptyFormulaPlan,
    },
  };
}