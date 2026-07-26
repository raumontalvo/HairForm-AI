import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  appendHairSessionEvent,
  createConsultationAnalyzedEvent,
  createFormulaClearedEvent,
  createFormulaUpdatedEvent,
  createHairSessionEvent,
  createLevelChangedEvent,
  createMentorQuestionEvent,
  createPorosityChangedEvent,
  createSessionCreatedEvent,
  createSessionLoadedEvent,
  createSessionSavedEvent,
  getRecentHairSessionEvents,
  prependHairSessionEvent,
  sortHairSessionEventsNewestFirst,
} from "@/lib/hair-session/timeline";

describe("hair session timeline", () => {
  beforeEach(() => {
    vi.stubGlobal("crypto", {
      randomUUID: vi.fn(() => "event-id"),
    });
  });

  it("creates a normalized timeline event", () => {
    const event = createHairSessionEvent({
      type: "custom",
      title: "  Strand test completed  ",
      description: "  Result was even.  ",
      createdAt: "2026-01-01T10:00:00.000Z",
      metadata: {
        successful: true,
      },
    });

    expect(event).toEqual({
      id: "event-id",
      type: "custom",
      title: "Strand test completed",
      description: "Result was even.",
      createdAt: "2026-01-01T10:00:00.000Z",
      metadata: {
        successful: true,
      },
    });
  });

  it("rejects events without a title", () => {
    expect(() =>
      createHairSessionEvent({
        type: "custom",
        title: "   ",
      }),
    ).toThrow(
      "Hair session timeline events require a title.",
    );
  });

  it("appends an event without mutating the original array", () => {
    const firstEvent = createSessionCreatedEvent(
      "2026-01-01T10:00:00.000Z",
    );
    const secondEvent = createFormulaUpdatedEvent(
      "2026-01-01T11:00:00.000Z",
    );
    const originalEvents = [firstEvent];

    const result = appendHairSessionEvent(
      originalEvents,
      secondEvent,
    );

    expect(result).toEqual([
      firstEvent,
      secondEvent,
    ]);
    expect(originalEvents).toEqual([firstEvent]);
  });

  it("prepends an event without mutating the original array", () => {
    const firstEvent = createSessionCreatedEvent(
      "2026-01-01T10:00:00.000Z",
    );
    const secondEvent = createFormulaUpdatedEvent(
      "2026-01-01T11:00:00.000Z",
    );
    const originalEvents = [firstEvent];

    const result = prependHairSessionEvent(
      originalEvents,
      secondEvent,
    );

    expect(result).toEqual([
      secondEvent,
      firstEvent,
    ]);
    expect(originalEvents).toEqual([firstEvent]);
  });

  it("sorts events newest first", () => {
    const oldest = createSessionCreatedEvent(
      "2026-01-01T10:00:00.000Z",
    );
    const newest = createFormulaUpdatedEvent(
      "2026-01-01T12:00:00.000Z",
    );
    const middle = createSessionSavedEvent(
      "Session",
      "2026-01-01T11:00:00.000Z",
    );

    const result =
      sortHairSessionEventsNewestFirst([
        oldest,
        newest,
        middle,
      ]);

    expect(result).toEqual([
      newest,
      middle,
      oldest,
    ]);
  });

  it("returns a limited number of recent events", () => {
    const events = [
      createSessionCreatedEvent(
        "2026-01-01T10:00:00.000Z",
      ),
      createFormulaUpdatedEvent(
        "2026-01-01T11:00:00.000Z",
      ),
      createSessionSavedEvent(
        "Session",
        "2026-01-01T12:00:00.000Z",
      ),
    ];

    const result = getRecentHairSessionEvents(
      events,
      2,
    );

    expect(result).toHaveLength(2);
    expect(result[0].type).toBe("session-saved");
    expect(result[1].type).toBe("formula-updated");
  });

  it("returns no recent events for a non-positive limit", () => {
    expect(
      getRecentHairSessionEvents(
        [createSessionCreatedEvent()],
        0,
      ),
    ).toEqual([]);
  });

  it("creates a session-created event", () => {
    const event = createSessionCreatedEvent(
      "2026-01-01T10:00:00.000Z",
    );

    expect(event.type).toBe("session-created");
    expect(event.title).toBe("Session created");
  });

  it("creates a session-loaded event", () => {
    const event = createSessionLoadedEvent(
      " Corrective Color ",
      "2026-01-01T10:00:00.000Z",
    );

    expect(event.type).toBe("session-loaded");
    expect(event.description).toContain(
      "Corrective Color",
    );
    expect(event.metadata.sessionName).toBe(
      "Corrective Color",
    );
  });

  it("creates a session-saved event", () => {
    const event = createSessionSavedEvent(
      "Blonde Session",
      "2026-01-01T10:00:00.000Z",
    );

    expect(event.type).toBe("session-saved");
    expect(event.metadata.sessionName).toBe(
      "Blonde Session",
    );
  });

  it("creates current-level and target-level events", () => {
    const currentEvent = createLevelChangedEvent(
      "current",
      5,
      6,
    );
    const targetEvent = createLevelChangedEvent(
      "target",
      7,
      9,
    );

    expect(currentEvent.type).toBe(
      "current-level-changed",
    );
    expect(currentEvent.description).toBe(
      "Level 5 → Level 6",
    );

    expect(targetEvent.type).toBe(
      "target-level-changed",
    );
    expect(targetEvent.description).toBe(
      "Level 7 → Level 9",
    );
  });

  it("creates a porosity-change event", () => {
    const event = createPorosityChangedEvent(
      "Medium",
      "High",
    );

    expect(event.type).toBe("porosity-changed");
    expect(event.description).toBe(
      "Medium → High",
    );
  });

  it("creates formula events", () => {
    expect(createFormulaUpdatedEvent().type).toBe(
      "formula-updated",
    );
    expect(createFormulaClearedEvent().type).toBe(
      "formula-cleared",
    );
  });

  it("creates a consultation-analysis event", () => {
    const event =
      createConsultationAnalyzedEvent();

    expect(event.type).toBe(
      "consultation-analyzed",
    );
  });

  it("creates a normalized mentor-question event", () => {
    const event = createMentorQuestionEvent(
      "  How do I neutralize orange?  ",
    );

    expect(event.type).toBe(
      "mentor-question-asked",
    );
    expect(event.description).toBe(
      "How do I neutralize orange?",
    );
    expect(event.metadata.question).toBe(
      "How do I neutralize orange?",
    );
  });
});