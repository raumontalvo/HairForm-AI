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
  loadHairSession,
  saveHairSession,
} from "@/lib/hair-session/storage";
import {
  createFormulaClearedEvent,
  createFormulaUpdatedEvent,
  createHairSessionEvent,
  createLevelChangedEvent,
  createPorosityChangedEvent,
  createSessionCreatedEvent,
  createSessionLoadedEvent,
  createSessionSavedEvent,
  type HairSessionEvent,
} from "@/lib/hair-session/timeline";
import {
  createEmptyHairSession,
  emptyFormulaPlan,
  type FormulaPlan,
  type HairSession as StoredHairSession,
} from "@/lib/hair-session/types";
import type {
  ColorFamily,
  HairLevel,
  Porosity,
} from "@/lib/hair-science";

const ACTIVE_SESSION_STORAGE_KEY =
  "hairform-ai:active-session-id";

const formulaPlanKeys: Array<keyof FormulaPlan> = [
  "tonalFamily",
  "developerChoice",
  "applicationStrategy",
  "processingNotes",
  "professionalNotes",
];

type HairSessionState = {
  activeSessionId: string | null;
  sessionName: string;
  isDirty: boolean;

  currentLevel: HairLevel;
  targetLevel: HairLevel;
  porosity: Porosity;
  selectedPigment: ColorFamily | null;

  grayPercentage: number;
  chemicalHistory: string;
  consultationNotes: string;
  formulaPlan: FormulaPlan;
  timeline: HairSessionEvent[];
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

  markDirty: () => void;
  appendTimelineEvent: (
    event: HairSessionEvent,
  ) => void;
  loadSession: (sessionId: string) => boolean;
  saveActiveSession: () => boolean;
  createNewSession: () => StoredHairSession | null;
  resetSession: () => void;
};

const initialState: HairSessionState = {
  activeSessionId: null,
  sessionName: "Untitled Hair Session",
  isDirty: false,

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
  timeline: [],
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

function normalizeFormulaValue(
  value: FormulaPlan[keyof FormulaPlan],
): string {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function areFormulaPlansEqual(
  firstPlan: FormulaPlan,
  secondPlan: FormulaPlan,
): boolean {
  return formulaPlanKeys.every(
    (key) =>
      normalizeFormulaValue(firstPlan[key]) ===
      normalizeFormulaValue(secondPlan[key]),
  );
}

function isFormulaPlanEmpty(
  plan: FormulaPlan,
): boolean {
  return formulaPlanKeys.every(
    (key) =>
      normalizeFormulaValue(plan[key]).length === 0,
  );
}

function createPigmentChangedEvent(
  previousPigment: ColorFamily | null,
  nextPigment: ColorFamily | null,
): HairSessionEvent {
  const previousLabel =
    previousPigment ?? "None";
  const nextLabel = nextPigment ?? "None";

  return createHairSessionEvent({
    type: "pigment-changed",
    title: "Pigment changed",
    description: `${previousLabel} → ${nextLabel}`,
    metadata: {
      previousPigment,
      nextPigment,
    },
  });
}

export function HairSessionProvider({
  children,
}: HairSessionProviderProps) {
  const [activeSessionId, setActiveSessionId] = useState<
    string | null
  >(initialState.activeSessionId);

  const [sessionName, setSessionNameState] = useState(
    initialState.sessionName,
  );

  const [isDirty, setIsDirty] = useState(
    initialState.isDirty,
  );

  const [currentLevel, setCurrentLevelState] =
    useState<HairLevel>(initialState.currentLevel);

  const [targetLevel, setTargetLevelState] =
    useState<HairLevel>(initialState.targetLevel);

  const [porosity, setPorosityState] =
    useState<Porosity>(initialState.porosity);

  const [selectedPigment, setSelectedPigmentState] =
    useState<ColorFamily | null>(
      initialState.selectedPigment,
    );

  const [grayPercentage, setGrayPercentageState] =
    useState(initialState.grayPercentage);

  const [chemicalHistory, setChemicalHistoryState] =
    useState(initialState.chemicalHistory);

  const [consultationNotes, setConsultationNotesState] =
    useState(initialState.consultationNotes);

  const [formulaPlan, setFormulaPlanState] =
    useState<FormulaPlan>({
      ...initialState.formulaPlan,
    });

  const [timeline, setTimeline] = useState<
    HairSessionEvent[]
  >(initialState.timeline);

  const markDirty = useCallback(() => {
    setIsDirty(true);
  }, []);

  const appendTimelineEvent = useCallback(
    (event: HairSessionEvent) => {
      setTimeline((currentTimeline) => [
        event,
        ...currentTimeline,
      ]);
    },
    [],
  );

  const setSessionName = useCallback(
    (name: string) => {
      if (name === sessionName) {
        return;
      }

      setSessionNameState(name);
      setIsDirty(true);
    },
    [sessionName],
  );

  const setCurrentLevel = useCallback(
    (level: HairLevel) => {
      if (level === currentLevel) {
        return;
      }

      const event = createLevelChangedEvent(
        "current",
        currentLevel,
        level,
      );

      setCurrentLevelState(level);
      setIsDirty(true);
      appendTimelineEvent(event);
    },
    [appendTimelineEvent, currentLevel],
  );

  const setTargetLevel = useCallback(
    (level: HairLevel) => {
      if (level === targetLevel) {
        return;
      }

      const event = createLevelChangedEvent(
        "target",
        targetLevel,
        level,
      );

      setTargetLevelState(level);
      setIsDirty(true);
      appendTimelineEvent(event);
    },
    [appendTimelineEvent, targetLevel],
  );

  const setPorosity = useCallback(
    (nextPorosity: Porosity) => {
      if (nextPorosity === porosity) {
        return;
      }

      const event = createPorosityChangedEvent(
        porosity,
        nextPorosity,
      );

      setPorosityState(nextPorosity);
      setIsDirty(true);
      appendTimelineEvent(event);
    },
    [appendTimelineEvent, porosity],
  );

  const setSelectedPigment = useCallback(
    (pigment: ColorFamily | null) => {
      if (pigment === selectedPigment) {
        return;
      }

      const event = createPigmentChangedEvent(
        selectedPigment,
        pigment,
      );

      setSelectedPigmentState(pigment);
      setIsDirty(true);
      appendTimelineEvent(event);
    },
    [appendTimelineEvent, selectedPigment],
  );

  const setGrayPercentage = useCallback(
    (percentage: number) => {
      if (percentage === grayPercentage) {
        return;
      }

      setGrayPercentageState(percentage);
      setIsDirty(true);
    },
    [grayPercentage],
  );

  const setChemicalHistory = useCallback(
    (history: string) => {
      if (history === chemicalHistory) {
        return;
      }

      setChemicalHistoryState(history);
      setIsDirty(true);
    },
    [chemicalHistory],
  );

  const setConsultationNotes = useCallback(
    (notes: string) => {
      if (notes === consultationNotes) {
        return;
      }

      setConsultationNotesState(notes);
      setIsDirty(true);
    },
    [consultationNotes],
  );

  const setFormulaPlan = useCallback(
    (plan: FormulaPlan) => {
      if (areFormulaPlansEqual(formulaPlan, plan)) {
        return;
      }

      const wasEmpty =
        isFormulaPlanEmpty(formulaPlan);
      const isNowEmpty = isFormulaPlanEmpty(plan);

      setFormulaPlanState({
        ...plan,
      });
      setIsDirty(true);

      if (!wasEmpty && isNowEmpty) {
        appendTimelineEvent(
          createFormulaClearedEvent(),
        );
        return;
      }

      appendTimelineEvent(
        createFormulaUpdatedEvent(),
      );
    },
    [appendTimelineEvent, formulaPlan],
  );

  const applyStoredSession = useCallback(
    (session: StoredHairSession) => {
      setActiveSessionId(session.id);
      setSessionNameState(session.name);

      setCurrentLevelState(
        session.currentLevel as HairLevel,
      );
      setTargetLevelState(
        session.targetLevel as HairLevel,
      );
      setPorosityState(session.porosity as Porosity);
      setSelectedPigmentState(
        session.selectedPigment as ColorFamily | null,
      );

      setGrayPercentageState(session.grayPercentage);
      setChemicalHistoryState(session.chemicalHistory);
      setConsultationNotesState(
        session.consultationNotes,
      );
      setFormulaPlanState({
        ...session.formulaPlan,
      });

      setIsDirty(false);
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
      setTimeline([
        createSessionLoadedEvent(
          storedSession.name,
        ),
      ]);

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
      setTimeline([]);
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
    setSessionNameState(session.name);
    setIsDirty(false);
    setStoredActiveSessionId(sessionId);

    appendTimelineEvent(
      createSessionSavedEvent(session.name),
    );

    return true;
  }, [
    activeSessionId,
    appendTimelineEvent,
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
      setIsDirty(true);
      setTimeline([
        createSessionCreatedEvent(),
      ]);

      return newSession;
    }, [applyStoredSession]);

  const resetSession = useCallback(() => {
    setActiveSessionId(initialState.activeSessionId);
    setSessionNameState(initialState.sessionName);
    setIsDirty(initialState.isDirty);

    setCurrentLevelState(initialState.currentLevel);
    setTargetLevelState(initialState.targetLevel);
    setPorosityState(initialState.porosity);
    setSelectedPigmentState(
      initialState.selectedPigment,
    );

    setGrayPercentageState(
      initialState.grayPercentage,
    );
    setChemicalHistoryState(
      initialState.chemicalHistory,
    );
    setConsultationNotesState(
      initialState.consultationNotes,
    );
    setFormulaPlanState({
      ...initialState.formulaPlan,
    });
    setTimeline([]);

    setStoredActiveSessionId(null);
  }, []);

  const value = useMemo<HairSessionContextValue>(
    () => ({
      activeSessionId,
      sessionName,
      isDirty,

      currentLevel,
      targetLevel,
      porosity,
      selectedPigment,

      grayPercentage,
      chemicalHistory,
      consultationNotes,
      formulaPlan,
      timeline,

      setSessionName,
      setCurrentLevel,
      setTargetLevel,
      setPorosity,
      setSelectedPigment,
      setGrayPercentage,
      setChemicalHistory,
      setConsultationNotes,
      setFormulaPlan,

      markDirty,
      appendTimelineEvent,
      loadSession,
      saveActiveSession,
      createNewSession,
      resetSession,
    }),
    [
      activeSessionId,
      appendTimelineEvent,
      chemicalHistory,
      consultationNotes,
      createNewSession,
      currentLevel,
      formulaPlan,
      grayPercentage,
      isDirty,
      loadSession,
      markDirty,
      porosity,
      resetSession,
      saveActiveSession,
      selectedPigment,
      sessionName,
      setChemicalHistory,
      setConsultationNotes,
      setCurrentLevel,
      setFormulaPlan,
      setGrayPercentage,
      setPorosity,
      setSelectedPigment,
      setSessionName,
      setTargetLevel,
      targetLevel,
      timeline,
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