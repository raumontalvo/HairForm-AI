type EmptyStateProps = {
  onCreate: () => void;
};

export default function EmptyState({
  onCreate,
}: EmptyStateProps) {
  return (
    <section className="rounded-3xl border border-dashed border-white/15 bg-[#111111] px-6 py-14 text-center">
      <div className="mx-auto max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">
          No saved sessions
        </p>

        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
          Start your first Hair Session
        </h2>

        <p className="mt-4 text-sm leading-7 text-white/50">
          Create a session to organize the consultation, lift journey,
          formula plan, pigment context, and professional notes in one place.
        </p>

        <button
          type="button"
          onClick={onCreate}
          className="mt-7 rounded-xl bg-amber-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-200"
        >
          Create Hair Session
        </button>
      </div>
    </section>
  );
}