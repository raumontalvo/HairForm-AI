import SessionCard from "@/components/sessions/SessionCard";
import type { HairSession } from "@/lib/hair-session/types";

type SessionListProps = {
  sessions: HairSession[];
  onOpen: (session: HairSession) => void;
  onDuplicate: (session: HairSession) => void;
  onDelete: (session: HairSession) => void;
};

export default function SessionList({
  sessions,
  onOpen,
  onDuplicate,
  onDelete,
}: SessionListProps) {
  return (
    <section
      aria-label="Saved Hair Sessions"
      className="grid gap-5"
    >
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          onOpen={onOpen}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}