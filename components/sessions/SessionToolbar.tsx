type SessionToolbarProps = {
  sessionCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCreate: () => void;
};

export default function SessionToolbar({
  sessionCount,
  searchQuery,
  onSearchChange,
  onCreate,
}: SessionToolbarProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            Professional workspace
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Hair Sessions
          </h1>

          <p className="mt-3 text-sm leading-7 text-white/50">
            {sessionCount === 1
              ? "1 saved session"
              : `${sessionCount} saved sessions`}
          </p>
        </div>

        <button
          type="button"
          onClick={onCreate}
          className="rounded-xl bg-amber-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-200"
        >
          New Hair Session
        </button>
      </div>

      <div className="mt-6 border-t border-white/10 pt-6">
        <label
          htmlFor="session-search"
          className="text-xs font-semibold uppercase tracking-[0.14em] text-white/35"
        >
          Search sessions
        </label>

        <input
          id="session-search"
          type="search"
          value={searchQuery}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search by session name, pigment, porosity, or notes"
          className="mt-3 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-amber-300/40"
        />
      </div>
    </section>
  );
}