import { describe, expect, it } from "vitest";
import { createEmptyHairSession } from "./types";
import {
  clearHairSessions,
  deleteHairSession,
  listHairSessions,
  loadHairSession,
  saveHairSession,
} from "./storage";

class MemoryStorage implements Storage {
  private values = new Map<string, string>();

  get length(): number {
    return this.values.size;
  }

  clear(): void {
    this.values.clear();
  }

  getItem(key: string): string | null {
    return this.values.get(key) ?? null;
  }

  key(index: number): string | null {
    return [...this.values.keys()][index] ?? null;
  }

  removeItem(key: string): void {
    this.values.delete(key);
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value);
  }
}

describe("hair session storage", () => {
  it("returns an empty list when storage is empty", () => {
    const storage = new MemoryStorage();

    expect(listHairSessions(storage)).toEqual([]);
  });

  it("saves and loads a valid session", () => {
    const storage = new MemoryStorage();
    const session = createEmptyHairSession();

    expect(saveHairSession(session, storage)).toBe(true);

    const storedSession = loadHairSession(
      session.id,
      storage,
    );

    expect(storedSession).not.toBeNull();
    expect(storedSession?.id).toBe(session.id);
    expect(storedSession?.name).toBe(session.name);
  });

  it("updates an existing session instead of duplicating it", () => {
    const storage = new MemoryStorage();
    const session = createEmptyHairSession();

    saveHairSession(session, storage);

    const updatedSession = {
      ...session,
      name: "Updated consultation",
    };

    saveHairSession(updatedSession, storage);

    const sessions = listHairSessions(storage);

    expect(sessions).toHaveLength(1);
    expect(sessions[0]?.name).toBe(
      "Updated consultation",
    );
  });

  it("preserves the original creation timestamp when updating", () => {
    const storage = new MemoryStorage();
    const session = {
      ...createEmptyHairSession(),
      createdAt: "2026-01-01T10:00:00.000Z",
      updatedAt: "2026-01-01T10:00:00.000Z",
    };

    saveHairSession(session, storage);
    saveHairSession(
      {
        ...session,
        name: "Renamed session",
      },
      storage,
    );

    expect(
      loadHairSession(session.id, storage)?.createdAt,
    ).toBe("2026-01-01T10:00:00.000Z");
  });

  it("lists sessions by most recently updated", () => {
    const storage = new MemoryStorage();

    storage.setItem(
      "hairform-ai:hair-sessions",
      JSON.stringify([
        {
          ...createEmptyHairSession(),
          id: "older-session",
          createdAt: "2026-01-01T10:00:00.000Z",
          updatedAt: "2026-01-01T10:00:00.000Z",
        },
        {
          ...createEmptyHairSession(),
          id: "newer-session",
          createdAt: "2026-02-01T10:00:00.000Z",
          updatedAt: "2026-02-01T10:00:00.000Z",
        },
      ]),
    );

    expect(
      listHairSessions(storage).map(
        (session) => session.id,
      ),
    ).toEqual(["newer-session", "older-session"]);
  });

  it("deletes an existing session", () => {
    const storage = new MemoryStorage();
    const session = createEmptyHairSession();

    saveHairSession(session, storage);

    expect(
      deleteHairSession(session.id, storage),
    ).toBe(true);

    expect(loadHairSession(session.id, storage)).toBeNull();
  });

  it("returns false when deleting a missing session", () => {
    const storage = new MemoryStorage();

    expect(
      deleteHairSession("missing-session", storage),
    ).toBe(false);
  });

  it("clears all sessions", () => {
    const storage = new MemoryStorage();

    saveHairSession(createEmptyHairSession(), storage);

    expect(clearHairSessions(storage)).toBe(true);
    expect(listHairSessions(storage)).toEqual([]);
  });

  it("ignores malformed entries while preserving valid sessions", () => {
    const storage = new MemoryStorage();
    const validSession = createEmptyHairSession();

    storage.setItem(
      "hairform-ai:hair-sessions",
      JSON.stringify([
        validSession,
        { id: "invalid-session" },
        null,
      ]),
    );

    expect(listHairSessions(storage)).toEqual([
      validSession,
    ]);
  });

  it("handles malformed JSON safely", () => {
    const storage = new MemoryStorage();

    storage.setItem(
      "hairform-ai:hair-sessions",
      "{invalid-json",
    );

    expect(listHairSessions(storage)).toEqual([]);
  });

  it("rejects invalid sessions", () => {
    const storage = new MemoryStorage();
    const invalidSession = {
      ...createEmptyHairSession(),
      currentLevel: 12,
    };

    expect(
      saveHairSession(invalidSession, storage),
    ).toBe(false);
  });

  it("returns safe defaults without browser storage", () => {
    const session = createEmptyHairSession();

    expect(listHairSessions(null)).toEqual([]);
    expect(loadHairSession(session.id, null)).toBeNull();
    expect(saveHairSession(session, null)).toBe(false);
    expect(deleteHairSession(session.id, null)).toBe(
      false,
    );
    expect(clearHairSessions(null)).toBe(false);
  });
});