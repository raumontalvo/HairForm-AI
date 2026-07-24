import type { HairSession } from "@/lib/hair-session/types";

type SessionCardProps = {
  session: HairSession;
  onOpen: (session: HairSession) => void;
  onDuplicate: (session: HairSession) => void;
  onDelete: (session: HairSession) => void;
};

function formatUpdatedAt(updatedAt: string): string {
  const date = new Date(updatedAt);

  if (Number.isNaN(date.getTime())) {
    return "Unknown update time";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function SessionCard({
  session,
  onOpen,
  onDuplicate,
  onDelete,
}: SessionCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#111111] p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-300">
            Hair Session
          </p>

          <h2 className="mt-2 text-lg font-semibold text-white">
            {session.name}
          </h2>

          <p className="mt-2 text-sm text-white/45">
            Updated {formatUpdatedAt(session.updatedAt)}
          </p>
        </div>

        <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-medium text-white/55">
          Level {session.currentLevel} → Level {session.targetLevel}
        </div>
      </div>

      <dl className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <dt className="text-xs uppercase tracking-[0.1em] text-white/35">
            Porosity
          </dt>
          <dd className="mt-1 text-sm font-medium text-white">
            {session.porosity}
          </dd>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <dt className="text-xs uppercase tracking-[0.1em] text-white/35">
            Pigment
          </dt>
          <dd className="mt-1 text-sm font-medium text-white">
            {session.selectedPigment ?? "Not selected"}
          </dd>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <dt className="text-xs uppercase tracking-[0.1em] text-white/35">
            Gray
          </dt>
          <dd className="mt-1 text-sm font-medium text-white">
            {session.grayPercentage}%
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => onDelete(session)}
          className="rounded-xl border border-red-400/20 px-4 py-2 text-sm font-medium text-red-200 transition hover:bg-red-400/10"
        >
          Delete
        </button>

        <button
          type="button"
          onClick={() => onDuplicate(session)}
          className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/[0.04] hover:text-white"
        >
          Duplicate
        </button>

        <button
          type="button"
          onClick={() => onOpen(session)}
          className="rounded-xl bg-amber-300 px-4 py-2 text-sm font-semibold text-black transition hover:bg-amber-200"
        >
          Open session
        </button>
      </div>
    </article>
  );
}