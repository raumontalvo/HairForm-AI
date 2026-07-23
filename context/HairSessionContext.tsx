"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type {
  ColorFamily,
  HairLevel,
  Porosity,
} from "@/lib/hair-science";

type HairSession = {
  currentLevel: HairLevel;
  targetLevel: HairLevel;
  porosity: Porosity;
  selectedPigment: ColorFamily | null;
  consultationNotes: string;
};

type HairSessionContextValue = HairSession & {
  setCurrentLevel: (level: HairLevel) => void;
  setTargetLevel: (level: HairLevel) => void;
  setPorosity: (porosity: Porosity) => void;
  setSelectedPigment: (pigment: ColorFamily | null) => void;
  setConsultationNotes: (notes: string) => void;
  resetSession: () => void;
};

const initialSession: HairSession = {
  currentLevel: 5,
  targetLevel: 8,
  porosity: "Medium",
  selectedPigment: null,
  consultationNotes: "",
};

const HairSessionContext =
  createContext<HairSessionContextValue | null>(null);

type HairSessionProviderProps = {
  children: ReactNode;
};

export function HairSessionProvider({
  children,
}: HairSessionProviderProps) {
  const [currentLevel, setCurrentLevel] = useState<HairLevel>(
    initialSession.currentLevel,
  );
  const [targetLevel, setTargetLevel] = useState<HairLevel>(
    initialSession.targetLevel,
  );
  const [porosity, setPorosity] = useState<Porosity>(
    initialSession.porosity,
  );
  const [selectedPigment, setSelectedPigment] =
    useState<ColorFamily | null>(initialSession.selectedPigment);
  const [consultationNotes, setConsultationNotes] = useState(
    initialSession.consultationNotes,
  );

  function resetSession() {
    setCurrentLevel(initialSession.currentLevel);
    setTargetLevel(initialSession.targetLevel);
    setPorosity(initialSession.porosity);
    setSelectedPigment(initialSession.selectedPigment);
    setConsultationNotes(initialSession.consultationNotes);
  }

  const value = useMemo<HairSessionContextValue>(
    () => ({
      currentLevel,
      targetLevel,
      porosity,
      selectedPigment,
      consultationNotes,
      setCurrentLevel,
      setTargetLevel,
      setPorosity,
      setSelectedPigment,
      setConsultationNotes,
      resetSession,
    }),
    [
      consultationNotes,
      currentLevel,
      porosity,
      selectedPigment,
      targetLevel,
    ],
  );

  return (
    <HairSessionContext.Provider value={value}>
      {children}
    </HairSessionContext.Provider>
  );
}

export function useHairSession() {
  const context = useContext(HairSessionContext);

  if (!context) {
    throw new Error(
      "useHairSession must be used inside HairSessionProvider",
    );
  }

  return context;
}