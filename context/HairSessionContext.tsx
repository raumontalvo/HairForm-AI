"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  createEmptyHairSession,
  emptyFormulaPlan,
  type FormulaPlan,
  type HairSession as StoredHairSession,
} from "@/lib/hair-session/types";
import {
  loadHairSession,
  saveHairSession,
} from "@/lib/hair-session/storage";
import type {
  ColorFamily,
  HairLevel,
  Porosity,
} from "@/lib/hair-science";

const ACTIVE_SESSION_STORAGE_KEY =
  "hairform-ai:active-session-id";

type HairSessionState = {
  activeSessionId: string | null;
  sessionName: string;

  currentLevel: HairLevel;
  targetLevel: HairLevel;
  porosity: Porosity;
  selectedPigment: ColorFamily | null;

  grayPercentage: number;
  chemicalHistory: string;
  consultationNotes: string;
  formulaPlan: FormulaPlan;
};

type HairSessionContextValue = HairSessionState & {
  setSessionName: (name: string) => void;
  setCurrentLevel: (level: HairLevel) => void;
  setTargetLevel: (level: HairLevel) => void;
  setPorosity: (porosity: Porosity) => void;
  setSelectedPigment: (
    pigment: ColorFamily | null,
  ) => void;
  setGrayPercentage: (percentage: number) => void;
  setChemicalHistory: (history: string) => void;
  setConsultationNotes: (notes: string) => void;
  setFormulaPlan: (plan: FormulaPlan) => void;

  loadSession: (sessionId: string) => boolean;
  saveActiveSession: () => boolean;
  createNewSession: () => StoredHairSession | null;
  resetSession: () => void;
};

const initialState: HairSessionState = {
  activeSessionId: null,
  sessionName: "Untitled Hair Session",

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

const HairSessionContext =
  createContext<HairSessionContextValue | null>(null);

type HairSessionProviderProps = {
  children: ReactNode;
};

function setStoredActiveSessionId(
  sessionId: string | null,
) {
  if (typeof window === "undefined") {
    return;
  }

  if (sessionId) {
    window.localStorage.setItem(
      ACTIVE_SESSION_STORAGE_KEY,
      sessionId,
    );
    return;
  }

  window.localStorage.removeItem(
    ACTIVE_SESSION_STORAGE_KEY,
  );
}

function getStoredActiveSessionId(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(
    ACTIVE_SESSION_STORAGE_KEY,
  );
}

export function HairSessionProvider({
  children,
}: HairSessionProviderProps) {
  const [activeSessionId, setActiveSessionId] = useState<
    string | null
  >(initialState.activeSessionId);

  const [sessionName, setSessionName] = useState(
    initialState.sessionName,
  );

  const [currentLevel, setCurrentLevel] =
    useState<HairLevel>(initialState.currentLevel);

  const [targetLevel, setTargetLevel] =
    useState<HairLevel>(initialState.targetLevel);

  const [porosity, setPorosity] = useState<Porosity>(
    initialState.porosity,
  );

  const [selectedPigment, setSelectedPigment] =
    useState<ColorFamily | null>(
      initialState.selectedPigment,
    );

  const [grayPercentage, setGrayPercentage] = useState(
    initialState.grayPercentage,
  );

  const [chemicalHistory, setChemicalHistory] = useState(
    initialState.chemicalHistory,
  );

  const [consultationNotes, setConsultationNotes] =
    useState(initialState.consultationNotes);

  const [formulaPlan, setFormulaPlan] =
    useState<FormulaPlan>({
      ...initialState.formulaPlan,
    });

  const applyStoredSession = useCallback(
    (session: StoredHairSession) => {
      setActiveSessionId(session.id);
      setSessionName(session.name);

      setCurrentLevel(
        session.currentLevel as HairLevel,
      );
      setTargetLevel(
        session.targetLevel as HairLevel,
      );
      setPorosity(session.porosity as Porosity);
      setSelectedPigment(
        session.selectedPigment as ColorFamily | null,
      );

      setGrayPercentage(session.grayPercentage);
      setChemicalHistory(session.chemicalHistory);
      setConsultationNotes(session.consultationNotes);
      setFormulaPlan({
        ...session.formulaPlan,
      });

      setStoredActiveSessionId(session.id);
    },
    [],
  );

  const loadSession = useCallback(
    (sessionId: string): boolean => {
      const storedSession = loadHairSession(sessionId);

      if (!storedSession) {
        return false;
      }

      applyStoredSession(storedSession);
      return true;
    },
    [applyStoredSession],
  );

  useEffect(() => {
    const storedSessionId = getStoredActiveSessionId();

    if (!storedSessionId) {
      return;
    }

    const storedSession =
      loadHairSession(storedSessionId);

    if (!storedSession) {
      setStoredActiveSessionId(null);
      return;
    }

    queueMicrotask(() => {
      applyStoredSession(storedSession);
    });
  }, [applyStoredSession]);

  const saveActiveSession = useCallback((): boolean => {
    const existingSession = activeSessionId
      ? loadHairSession(activeSessionId)
      : null;

    const timestamp = new Date().toISOString();
    const sessionId =
      activeSessionId ?? crypto.randomUUID();

    const session: StoredHairSession = {
      id: sessionId,
      name:
        sessionName.trim() || "Untitled Hair Session",
      createdAt:
        existingSession?.createdAt ?? timestamp,
      updatedAt: timestamp,

      currentLevel,
      targetLevel,
      porosity,
      selectedPigment,

      grayPercentage,
      chemicalHistory,
      consultationNotes,

      formulaPlan: {
        ...formulaPlan,
      },
    };

    const didSave = saveHairSession(session);

    if (!didSave) {
      return false;
    }

    setActiveSessionId(sessionId);
    setStoredActiveSessionId(sessionId);

    return true;
  }, [
    activeSessionId,
    chemicalHistory,
    consultationNotes,
    currentLevel,
    formulaPlan,
    grayPercentage,
    porosity,
    selectedPigment,
    sessionName,
    targetLevel,
  ]);

  const createNewSession =
    useCallback((): StoredHairSession | null => {
      const newSession = createEmptyHairSession();

      if (!saveHairSession(newSession)) {
        return null;
      }

      applyStoredSession(newSession);
      return newSession;
    }, [applyStoredSession]);

  const resetSession = useCallback(() => {
    setActiveSessionId(initialState.activeSessionId);
    setSessionName(initialState.sessionName);

    setCurrentLevel(initialState.currentLevel);
    setTargetLevel(initialState.targetLevel);
    setPorosity(initialState.porosity);
    setSelectedPigment(
      initialState.selectedPigment,
    );

    setGrayPercentage(initialState.grayPercentage);
    setChemicalHistory(initialState.chemicalHistory);
    setConsultationNotes(
      initialState.consultationNotes,
    );
    setFormulaPlan({
      ...initialState.formulaPlan,
    });

    setStoredActiveSessionId(null);
  }, []);

  const value = useMemo<HairSessionContextValue>(
    () => ({
      activeSessionId,
      sessionName,

      currentLevel,
      targetLevel,
      porosity,
      selectedPigment,

      grayPercentage,
      chemicalHistory,
      consultationNotes,
      formulaPlan,

      setSessionName,
      setCurrentLevel,
      setTargetLevel,
      setPorosity,
      setSelectedPigment,
      setGrayPercentage,
      setChemicalHistory,
      setConsultationNotes,
      setFormulaPlan,

      loadSession,
      saveActiveSession,
      createNewSession,
      resetSession,
    }),
    [
      activeSessionId,
      chemicalHistory,
      consultationNotes,
      createNewSession,
      currentLevel,
      formulaPlan,
      grayPercentage,
      loadSession,
      porosity,
      resetSession,
      saveActiveSession,
      selectedPigment,
      sessionName,
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