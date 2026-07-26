import ColorWheel from "@/components/color-wheel/ColorWheel";
import AppShell from "@/components/layout/AppShell";
import ActiveSessionHeader from "@/components/sessions/ActiveSessionHeader";

export default function ColorWheelPage() {
  return (
    <AppShell title="Interactive Color Wheel">
      <ActiveSessionHeader />

      <section className="mt-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
          Hair science
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Interactive Color Wheel
        </h1>

        <p className="mt-5 text-lg leading-8 text-white/60">
          Explore complementary color relationships and learn how they connect
          to professional hair-color neutralization.
        </p>
      </section>

      <div className="mt-10">
        <ColorWheel />
      </div>
    </AppShell>
  );
}