"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import AppShell from "@/components/layout/AppShell";
import EmptyState from "@/components/sessions/EmptyState";
import SessionList from "@/components/sessions/SessionList";
import SessionToolbar from "@/components/sessions/SessionToolbar";
import { useHairSession } from "@/context/HairSessionContext";
import { useToast } from "@/context/ToastContext";
import {
  deleteHairSession,
  listHairSessions,
  saveHairSession,
} from "@/lib/hair-session/storage";
import {
  createEmptyHairSession,
  type HairSession,
} from "@/lib/hair-session/types";

function buildDuplicateSession(
  sourceSession: HairSession,
): HairSession {
  const timestamp = new Date().toISOString();

  return {
    ...sourceSession,
    id: crypto.randomUUID(),
    name: `${sourceSession.name} Copy`,
    createdAt: timestamp,
    updatedAt: timestamp,
    formulaPlan: {
      ...sourceSession.formulaPlan,
    },
  };
}

function matchesSearch(
  session: HairSession,
  searchQuery: string,
): boolean {
  const normalizedQuery = searchQuery
    .toLowerCase()
    .trim();

  if (!normalizedQuery) {
    return true;
  }

  const searchableText = [
    session.name,
    session.porosity,
    session.selectedPigment ?? "",
    session.chemicalHistory,
    session.consultationNotes,
    session.formulaPlan.tonalFamily,
    session.formulaPlan.developerChoice,
    session.formulaPlan.applicationStrategy,
    session.formulaPlan.processingNotes,
    session.formulaPlan.professionalNotes,
    `level ${session.currentLevel}`,
    `level ${session.targetLevel}`,
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(normalizedQuery);
}

export default function SavedSessionsPage() {
  const router = useRouter();
  const { loadSession } = useHairSession();
  const toast = useToast();

  const [sessions, setSessions] = useState<HairSession[]>(
    () => listHairSessions(),
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSessions = useMemo(
    () =>
      sessions.filter((session) =>
        matchesSearch(session, searchQuery),
      ),
    [sessions, searchQuery],
  );

  function refreshSessions() {
    setSessions(listHairSessions());
  }

  function handleCreate() {
    const session = createEmptyHairSession();

    if (!saveHairSession(session)) {
      toast.error("Unable to create the hair session.");
      return;
    }

    refreshSessions();
    toast.success("Hair session created.");
  }

  function handleOpen(session: HairSession) {
    const didLoad = loadSession(session.id);

    if (!didLoad) {
      toast.error("Unable to load the selected hair session.");
      return;
    }

    toast.success(`Opened "${session.name}".`);
    router.push("/color-lab");
  }

  function handleDuplicate(session: HairSession) {
    const duplicate = buildDuplicateSession(session);

    if (!saveHairSession(duplicate)) {
      toast.error("Unable to duplicate the hair session.");
      return;
    }

    refreshSessions();
    toast.success(`Duplicated "${session.name}".`);
  }

  function handleDelete(session: HairSession) {
    const confirmed = window.confirm(
      `Delete "${session.name}"? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    if (!deleteHairSession(session.id)) {
      toast.error("Unable to delete the hair session.");
      return;
    }

    refreshSessions();
    toast.success(`Deleted "${session.name}".`);
  }

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-6 lg:px-8">
        <SessionToolbar
          sessionCount={sessions.length}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onCreate={handleCreate}
        />

        <div className="mt-6">
          {sessions.length === 0 ? (
            <EmptyState onCreate={handleCreate} />
          ) : filteredSessions.length === 0 ? (
            <section className="rounded-3xl border border-white/10 bg-[#111111] px-6 py-12 text-center">
              <h2 className="text-xl font-semibold text-white">
                No matching sessions
              </h2>

              <p className="mt-3 text-sm text-white/50">
                Try a different search term.
              </p>
            </section>
          ) : (
            <SessionList
              sessions={filteredSessions}
              onOpen={handleOpen}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
            />
          )}
        </div>
      </main>
    </AppShell>
  );
}