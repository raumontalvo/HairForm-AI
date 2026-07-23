import AppShell from "@/components/layout/AppShell";
import LiftJourney from "@/components/lift-journey/LiftJourney";

export default function LiftJourneyPage() {
  return (
    <AppShell title="Lift Journey">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
          Hair science
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Lift Journey
        </h1>

        <p className="mt-5 text-lg leading-8 text-white/60">
          Explore how underlying pigment changes from the starting level to the
          target level, one stage at a time.
        </p>
      </section>

      <div className="mt-10">
        <LiftJourney />
      </div>
    </AppShell>
  );
}