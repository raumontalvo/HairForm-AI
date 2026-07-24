import type { HairSession } from "./types";
import { isHairSession } from "./validators";

const HAIR_SESSIONS_STORAGE_KEY = "hairform-ai:hair-sessions";

type StorageLike = Pick<
  Storage,
  "getItem" | "setItem" | "removeItem"
>;

function getBrowserStorage(): StorageLike | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
}

function parseStoredSessions(
  storedValue: string | null,
): HairSession[] {
  if (!storedValue) {
    return [];
  }

  try {
    const parsedValue: unknown = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isHairSession);
  } catch {
    return [];
  }
}

function sortSessions(
  sessions: HairSession[],
): HairSession[] {
  return [...sessions].sort(
    (first, second) =>
      Date.parse(second.updatedAt) -
      Date.parse(first.updatedAt),
  );
}

export function listHairSessions(
  storage: StorageLike | null = getBrowserStorage(),
): HairSession[] {
  if (!storage) {
    return [];
  }

  try {
    return sortSessions(
      parseStoredSessions(
        storage.getItem(HAIR_SESSIONS_STORAGE_KEY),
      ),
    );
  } catch {
    return [];
  }
}

export function loadHairSession(
  sessionId: string,
  storage: StorageLike | null = getBrowserStorage(),
): HairSession | null {
  if (!sessionId.trim()) {
    return null;
  }

  return (
    listHairSessions(storage).find(
      (session) => session.id === sessionId,
    ) ?? null
  );
}

export function saveHairSession(
  session: HairSession,
  storage: StorageLike | null = getBrowserStorage(),
): boolean {
  if (!storage || !isHairSession(session)) {
    return false;
  }

  try {
    const sessions = listHairSessions(storage);
    const timestamp = new Date().toISOString();

    const existingSession = sessions.find(
      (candidate) => candidate.id === session.id,
    );

    const sessionToSave: HairSession = {
      ...session,
      createdAt:
        existingSession?.createdAt ?? session.createdAt,
      updatedAt: timestamp,
      formulaPlan: {
        ...session.formulaPlan,
      },
    };

    const remainingSessions = sessions.filter(
      (candidate) => candidate.id !== session.id,
    );

    storage.setItem(
      HAIR_SESSIONS_STORAGE_KEY,
      JSON.stringify(
        sortSessions([
          sessionToSave,
          ...remainingSessions,
        ]),
      ),
    );

    return true;
  } catch {
    return false;
  }
}

export function deleteHairSession(
  sessionId: string,
  storage: StorageLike | null = getBrowserStorage(),
): boolean {
  if (!storage || !sessionId.trim()) {
    return false;
  }

  try {
    const sessions = listHairSessions(storage);
    const nextSessions = sessions.filter(
      (session) => session.id !== sessionId,
    );

    if (nextSessions.length === sessions.length) {
      return false;
    }

    storage.setItem(
      HAIR_SESSIONS_STORAGE_KEY,
      JSON.stringify(nextSessions),
    );

    return true;
  } catch {
    return false;
  }
}

export function clearHairSessions(
  storage: StorageLike | null = getBrowserStorage(),
): boolean {
  if (!storage) {
    return false;
  }

  try {
    storage.removeItem(HAIR_SESSIONS_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}