// @vitest-environment jsdom

import {
  act,
  renderHook,
} from "@testing-library/react";
import type { ReactNode } from "react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  HairSessionProvider,
  useHairSession,
} from "@/context/HairSessionContext";
import {
  loadHairSession,
  saveHairSession,
} from "@/lib/hair-session/storage";
import type { HairSessionEvent } from "@/lib/hair-session/timeline";
import type {
  FormulaPlan,
  HairSession,
} from "@/lib/hair-session/types";

vi.mock("@/lib/hair-session/storage", () => ({
  loadHairSession: vi.fn(),
  saveHairSession: vi.fn(),
}));

const mockedLoadHairSession =
  vi.mocked(loadHairSession);
const mockedSaveHairSession =
  vi.mocked(saveHairSession);

const storedSession: HairSession = {
  id: "stored-session-id",
  name: "Corrective Color Session",
  createdAt: "2026-01-01T12:00:00.000Z",
  updatedAt: "2026-01-02T12:00:00.000Z",

  currentLevel: 4,
  targetLevel: 7,
  porosity: "High",
  selectedPigment: "Orange",

  grayPercentage: 25,
  chemicalHistory: "Previous permanent color",
  consultationNotes: "Strand test before service",

  formulaPlan: {
    tonalFamily: "Ash",
    developerChoice: "20 volume",
    applicationStrategy: "Apply mids and ends first",
    processingNotes: "Check every 10 minutes",
    professionalNotes: "",
  },
};

const timelineEvent: HairSessionEvent = {
  id: "timeline-event",
  type: "custom",
  title: "Timeline event",
  description: "Created during test",
  createdAt: "2026-01-01T12:00:00.000Z",
  metadata: {},
};

const populatedFormulaPlan: FormulaPlan = {
  tonalFamily: "Violet",
  developerChoice: "10 volume",
  applicationStrategy: "Apply to warm zones",
  processingNotes: "Monitor visually",
  professionalNotes: "Review condition first",
};

const emptyPlan: FormulaPlan = {
  tonalFamily: "",
  developerChoice: "",
  applicationStrategy: "",
  processingNotes: "",
  professionalNotes: "",
};

function wrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <HairSessionProvider>
      {children}
    </HairSessionProvider>
  );
}

describe("HairSessionContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();

    mockedLoadHairSession.mockReturnValue(null);
    mockedSaveHairSession.mockReturnValue(true);

    vi.stubGlobal("crypto", {
      randomUUID: vi.fn(() => "generated-id"),
    });
  });

  it("starts with a clean session and empty timeline", () => {
    const { result } = renderHook(
      () => useHairSession(),
      { wrapper },
    );

    expect(result.current.activeSessionId).toBeNull();
    expect(result.current.isDirty).toBe(false);
    expect(result.current.timeline).toEqual([]);
  });

  it("marks the session dirty when the name changes", () => {
    const { result } = renderHook(
      () => useHairSession(),
      { wrapper },
    );

    act(() => {
      result.current.setSessionName(
        "Blonde Transformation",
      );
    });

    expect(result.current.sessionName).toBe(
      "Blonde Transformation",
    );
    expect(result.current.isDirty).toBe(true);
  });

  it("does nothing when the session name is unchanged", () => {
    const { result } = renderHook(
      () => useHairSession(),
      { wrapper },
    );

    act(() => {
      result.current.setSessionName(
        "Untitled Hair Session",
      );
    });

    expect(result.current.isDirty).toBe(false);
    expect(result.current.timeline).toEqual([]);
  });

  it("records a current-level change", () => {
    const { result } = renderHook(
      () => useHairSession(),
      { wrapper },
    );

    act(() => {
      result.current.setCurrentLevel(3);
    });

    expect(result.current.currentLevel).toBe(3);
    expect(result.current.isDirty).toBe(true);
    expect(result.current.timeline[0].type).toBe(
      "current-level-changed",
    );
    expect(result.current.timeline[0].description).toBe(
      "Level 5 → Level 3",
    );
  });

  it("does not record an unchanged current level", () => {
    const { result } = renderHook(
      () => useHairSession(),
      { wrapper },
    );

    act(() => {
      result.current.setCurrentLevel(5);
    });

    expect(result.current.isDirty).toBe(false);
    expect(result.current.timeline).toEqual([]);
  });

  it("records a target-level change", () => {
    const { result } = renderHook(
      () => useHairSession(),
      { wrapper },
    );

    act(() => {
      result.current.setTargetLevel(9);
    });

    expect(result.current.targetLevel).toBe(9);
    expect(result.current.isDirty).toBe(true);
    expect(result.current.timeline[0].type).toBe(
      "target-level-changed",
    );
    expect(result.current.timeline[0].description).toBe(
      "Level 8 → Level 9",
    );
  });

  it("does not record an unchanged target level", () => {
    const { result } = renderHook(
      () => useHairSession(),
      { wrapper },
    );

    act(() => {
      result.current.setTargetLevel(8);
    });

    expect(result.current.isDirty).toBe(false);
    expect(result.current.timeline).toEqual([]);
  });

  it("records a porosity change", () => {
    const { result } = renderHook(
      () => useHairSession(),
      { wrapper },
    );

    act(() => {
      result.current.setPorosity("High");
    });

    expect(result.current.porosity).toBe("High");
    expect(result.current.isDirty).toBe(true);
    expect(result.current.timeline[0].type).toBe(
      "porosity-changed",
    );
    expect(result.current.timeline[0].description).toBe(
      "Medium → High",
    );
  });

  it("does not record unchanged porosity", () => {
    const { result } = renderHook(
      () => useHairSession(),
      { wrapper },
    );

    act(() => {
      result.current.setPorosity("Medium");
    });

    expect(result.current.isDirty).toBe(false);
    expect(result.current.timeline).toEqual([]);
  });

  it("records a pigment change", () => {
    const { result } = renderHook(
      () => useHairSession(),
      { wrapper },
    );

    act(() => {
      result.current.setSelectedPigment("Orange");
    });

    expect(result.current.selectedPigment).toBe(
      "Orange",
    );
    expect(result.current.isDirty).toBe(true);
    expect(result.current.timeline[0].type).toBe(
      "pigment-changed",
    );
    expect(result.current.timeline[0].description).toBe(
      "None → Orange",
    );
  });

  it("does not record an unchanged pigment", () => {
    const { result } = renderHook(
      () => useHairSession(),
      { wrapper },
    );

    act(() => {
      result.current.setSelectedPigment(null);
    });

    expect(result.current.isDirty).toBe(false);
    expect(result.current.timeline).toEqual([]);
  });

  it("marks the session dirty when gray percentage changes", () => {
    const { result } = renderHook(
      () => useHairSession(),
      { wrapper },
    );

    act(() => {
      result.current.setGrayPercentage(40);
    });

    expect(result.current.grayPercentage).toBe(40);
    expect(result.current.isDirty).toBe(true);
    expect(result.current.timeline).toEqual([]);
  });

  it("marks the session dirty when chemical history changes", () => {
    const { result } = renderHook(
      () => useHairSession(),
      { wrapper },
    );

    act(() => {
      result.current.setChemicalHistory(
        "Previous lightener service",
      );
    });

    expect(result.current.chemicalHistory).toBe(
      "Previous lightener service",
    );
    expect(result.current.isDirty).toBe(true);
  });

  it("marks the session dirty when consultation notes change", () => {
    const { result } = renderHook(
      () => useHairSession(),
      { wrapper },
    );

    act(() => {
      result.current.setConsultationNotes(
        "Client prefers a cool finish",
      );
    });

    expect(result.current.consultationNotes).toBe(
      "Client prefers a cool finish",
    );
    expect(result.current.isDirty).toBe(true);
  });

  it("records a formula update", () => {
    const { result } = renderHook(
      () => useHairSession(),
      { wrapper },
    );

    act(() => {
      result.current.setFormulaPlan(
        populatedFormulaPlan,
      );
    });

    expect(result.current.formulaPlan).toEqual(
      populatedFormulaPlan,
    );
    expect(result.current.isDirty).toBe(true);
    expect(result.current.timeline[0].type).toBe(
      "formula-updated",
    );
  });

  it("records a formula clear", () => {
    const { result } = renderHook(
      () => useHairSession(),
      { wrapper },
    );

    act(() => {
      result.current.setFormulaPlan(
        populatedFormulaPlan,
      );
    });

    act(() => {
      result.current.setFormulaPlan(emptyPlan);
    });

    expect(result.current.formulaPlan).toEqual(
      emptyPlan,
    );
    expect(result.current.timeline[0].type).toBe(
      "formula-cleared",
    );
    expect(result.current.timeline[1].type).toBe(
      "formula-updated",
    );
  });

  it("does not record an unchanged formula plan", () => {
    const { result } = renderHook(
      () => useHairSession(),
      { wrapper },
    );

    act(() => {
      result.current.setFormulaPlan(emptyPlan);
    });

    expect(result.current.isDirty).toBe(false);
    expect(result.current.timeline).toEqual([]);
  });

  it("allows the session to be marked dirty directly", () => {
    const { result } = renderHook(
      () => useHairSession(),
      { wrapper },
    );

    act(() => {
      result.current.markDirty();
    });

    expect(result.current.isDirty).toBe(true);
  });

  it("appends timeline events newest first", () => {
    const { result } = renderHook(
      () => useHairSession(),
      { wrapper },
    );

    const newerEvent: HairSessionEvent = {
      ...timelineEvent,
      id: "newer-event",
      title: "Newer event",
    };

    act(() => {
      result.current.appendTimelineEvent(
        timelineEvent,
      );
      result.current.appendTimelineEvent(
        newerEvent,
      );
    });

    expect(result.current.timeline).toEqual([
      newerEvent,
      timelineEvent,
    ]);
  });

  it("records a successful session save", () => {
    const { result } = renderHook(
      () => useHairSession(),
      { wrapper },
    );

    act(() => {
      result.current.setCurrentLevel(6);
    });

    let didSave = false;

    act(() => {
      didSave = result.current.saveActiveSession();
    });

    expect(didSave).toBe(true);
    expect(mockedSaveHairSession).toHaveBeenCalledOnce();
    expect(result.current.activeSessionId).toBe(
      "generated-id",
    );
    expect(result.current.isDirty).toBe(false);
    expect(result.current.timeline[0].type).toBe(
      "session-saved",
    );
    expect(result.current.timeline[1].type).toBe(
      "current-level-changed",
    );
  });

  it("does not record a save event when saving fails", () => {
    mockedSaveHairSession.mockReturnValue(false);

    const { result } = renderHook(
      () => useHairSession(),
      { wrapper },
    );

    act(() => {
      result.current.setTargetLevel(10);
    });

    let didSave = true;

    act(() => {
      didSave = result.current.saveActiveSession();
    });

    expect(didSave).toBe(false);
    expect(result.current.activeSessionId).toBeNull();
    expect(result.current.isDirty).toBe(true);
    expect(
      result.current.timeline.some(
        (event) => event.type === "session-saved",
      ),
    ).toBe(false);
    expect(result.current.timeline[0].type).toBe(
      "target-level-changed",
    );
  });

  it("loads a stored session and starts a fresh timeline", () => {
    mockedLoadHairSession.mockReturnValue(
      storedSession,
    );

    const { result } = renderHook(
      () => useHairSession(),
      { wrapper },
    );

    act(() => {
      result.current.appendTimelineEvent(
        timelineEvent,
      );
    });

    let didLoad = false;

    act(() => {
      didLoad = result.current.loadSession(
        storedSession.id,
      );
    });

    expect(didLoad).toBe(true);
    expect(result.current.activeSessionId).toBe(
      storedSession.id,
    );
    expect(result.current.sessionName).toBe(
      storedSession.name,
    );
    expect(result.current.currentLevel).toBe(4);
    expect(result.current.targetLevel).toBe(7);
    expect(result.current.isDirty).toBe(false);
    expect(result.current.timeline).toHaveLength(1);
    expect(result.current.timeline[0].type).toBe(
      "session-loaded",
    );
    expect(
      result.current.timeline[0].metadata.sessionName,
    ).toBe(storedSession.name);
  });

  it("does not change state when a session cannot be loaded", () => {
    mockedLoadHairSession.mockReturnValue(null);

    const { result } = renderHook(
      () => useHairSession(),
      { wrapper },
    );

    act(() => {
      result.current.setCurrentLevel(2);
    });

    let didLoad = true;

    act(() => {
      didLoad = result.current.loadSession(
        "missing-session",
      );
    });

    expect(didLoad).toBe(false);
    expect(result.current.currentLevel).toBe(2);
    expect(result.current.isDirty).toBe(true);
    expect(result.current.timeline[0].type).toBe(
      "current-level-changed",
    );
  });

  it("creates a new session and starts a fresh timeline", () => {
    const { result } = renderHook(
      () => useHairSession(),
      { wrapper },
    );

    act(() => {
      result.current.appendTimelineEvent(
        timelineEvent,
      );
    });

    let createdSession: HairSession | null = null;

    act(() => {
      createdSession =
        result.current.createNewSession();
    });

    expect(createdSession).not.toBeNull();
    expect(mockedSaveHairSession).toHaveBeenCalledOnce();
    expect(result.current.activeSessionId).not.toBeNull();
    expect(result.current.isDirty).toBe(true);
    expect(result.current.timeline).toHaveLength(1);
    expect(result.current.timeline[0].type).toBe(
      "session-created",
    );
  });

  it("does not activate a session when creation fails", () => {
    mockedSaveHairSession.mockReturnValue(false);

    const { result } = renderHook(
      () => useHairSession(),
      { wrapper },
    );

    let createdSession: HairSession | null =
      storedSession;

    act(() => {
      createdSession =
        result.current.createNewSession();
    });

    expect(createdSession).toBeNull();
    expect(result.current.activeSessionId).toBeNull();
    expect(result.current.isDirty).toBe(false);
    expect(result.current.timeline).toEqual([]);
  });

  it("resets the session and clears the timeline", () => {
    const { result } = renderHook(
      () => useHairSession(),
      { wrapper },
    );

    act(() => {
      result.current.setSessionName("Changed");
      result.current.setCurrentLevel(2);
      result.current.setTargetLevel(10);
      result.current.setPorosity("High");
    });

    expect(result.current.isDirty).toBe(true);
    expect(result.current.timeline.length).toBeGreaterThan(
      0,
    );

    act(() => {
      result.current.resetSession();
    });

    expect(result.current.activeSessionId).toBeNull();
    expect(result.current.sessionName).toBe(
      "Untitled Hair Session",
    );
    expect(result.current.currentLevel).toBe(5);
    expect(result.current.targetLevel).toBe(8);
    expect(result.current.porosity).toBe("Medium");
    expect(result.current.isDirty).toBe(false);
    expect(result.current.timeline).toEqual([]);
  });
});