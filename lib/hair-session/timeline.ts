export type HairSessionEventType =
  | "session-created"
  | "session-loaded"
  | "session-saved"
  | "session-duplicated"
  | "session-deleted"
  | "current-level-changed"
  | "target-level-changed"
  | "porosity-changed"
  | "pigment-changed"
  | "formula-updated"
  | "formula-cleared"
  | "consultation-analyzed"
  | "mentor-question-asked"
  | "custom";

export type HairSessionEventMetadata = Record<
  string,
  string | number | boolean | null
>;

export type HairSessionEvent = {
  id: string;
  type: HairSessionEventType;
  title: string;
  description: string;
  createdAt: string;
  metadata: HairSessionEventMetadata;
};

export type CreateHairSessionEventInput = {
  type: HairSessionEventType;
  title: string;
  description?: string;
  createdAt?: string;
  metadata?: HairSessionEventMetadata;
};

function createEventId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `event-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

function normalizeText(value: string): string {
  return value.trim();
}

export function createHairSessionEvent(
  input: CreateHairSessionEventInput,
): HairSessionEvent {
  const title = normalizeText(input.title);
  const description = normalizeText(
    input.description ?? "",
  );

  if (!title) {
    throw new Error(
      "Hair session timeline events require a title.",
    );
  }

  return {
    id: createEventId(),
    type: input.type,
    title,
    description,
    createdAt:
      input.createdAt ?? new Date().toISOString(),
    metadata: {
      ...input.metadata,
    },
  };
}

export function appendHairSessionEvent(
  events: HairSessionEvent[],
  event: HairSessionEvent,
): HairSessionEvent[] {
  return [...events, event];
}

export function prependHairSessionEvent(
  events: HairSessionEvent[],
  event: HairSessionEvent,
): HairSessionEvent[] {
  return [event, ...events];
}

export function sortHairSessionEventsNewestFirst(
  events: HairSessionEvent[],
): HairSessionEvent[] {
  return [...events].sort(
    (firstEvent, secondEvent) =>
      new Date(secondEvent.createdAt).getTime() -
      new Date(firstEvent.createdAt).getTime(),
  );
}

export function getRecentHairSessionEvents(
  events: HairSessionEvent[],
  limit = 5,
): HairSessionEvent[] {
  if (limit <= 0) {
    return [];
  }

  return sortHairSessionEventsNewestFirst(events).slice(
    0,
    limit,
  );
}

export function createSessionCreatedEvent(
  createdAt?: string,
): HairSessionEvent {
  return createHairSessionEvent({
    type: "session-created",
    title: "Session created",
    description:
      "A new Hair Session was created.",
    createdAt,
  });
}

export function createSessionLoadedEvent(
  sessionName: string,
  createdAt?: string,
): HairSessionEvent {
  return createHairSessionEvent({
    type: "session-loaded",
    title: "Session opened",
    description: `"${sessionName.trim()}" was loaded into the active workspace.`,
    createdAt,
    metadata: {
      sessionName: sessionName.trim(),
    },
  });
}

export function createSessionSavedEvent(
  sessionName: string,
  createdAt?: string,
): HairSessionEvent {
  return createHairSessionEvent({
    type: "session-saved",
    title: "Session saved",
    description: `"${sessionName.trim()}" was saved successfully.`,
    createdAt,
    metadata: {
      sessionName: sessionName.trim(),
    },
  });
}

export function createLevelChangedEvent(
  levelType: "current" | "target",
  previousLevel: number,
  nextLevel: number,
  createdAt?: string,
): HairSessionEvent {
  const isCurrentLevel = levelType === "current";

  return createHairSessionEvent({
    type: isCurrentLevel
      ? "current-level-changed"
      : "target-level-changed",
    title: isCurrentLevel
      ? "Current level changed"
      : "Target level changed",
    description: `Level ${previousLevel} → Level ${nextLevel}`,
    createdAt,
    metadata: {
      previousLevel,
      nextLevel,
    },
  });
}

export function createPorosityChangedEvent(
  previousPorosity: string,
  nextPorosity: string,
  createdAt?: string,
): HairSessionEvent {
  return createHairSessionEvent({
    type: "porosity-changed",
    title: "Porosity changed",
    description: `${previousPorosity.trim()} → ${nextPorosity.trim()}`,
    createdAt,
    metadata: {
      previousPorosity: previousPorosity.trim(),
      nextPorosity: nextPorosity.trim(),
    },
  });
}

export function createFormulaUpdatedEvent(
  createdAt?: string,
): HairSessionEvent {
  return createHairSessionEvent({
    type: "formula-updated",
    title: "Formula updated",
    description:
      "The active formulation plan was changed.",
    createdAt,
  });
}

export function createFormulaClearedEvent(
  createdAt?: string,
): HairSessionEvent {
  return createHairSessionEvent({
    type: "formula-cleared",
    title: "Formula cleared",
    description:
      "The active formulation plan was cleared.",
    createdAt,
  });
}

export function createConsultationAnalyzedEvent(
  createdAt?: string,
): HairSessionEvent {
  return createHairSessionEvent({
    type: "consultation-analyzed",
    title: "Consultation analyzed",
    description:
      "Hair Science analysis was completed for the active consultation.",
    createdAt,
  });
}

export function createMentorQuestionEvent(
  question: string,
  createdAt?: string,
): HairSessionEvent {
  const normalizedQuestion = question.trim();

  return createHairSessionEvent({
    type: "mentor-question-asked",
    title: "AI Mentor consulted",
    description: normalizedQuestion,
    createdAt,
    metadata: {
      question: normalizedQuestion,
    },
  });
}