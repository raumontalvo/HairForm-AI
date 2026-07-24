"use client";

import FormulaPlanningForm from "@/components/formula-builder/FormulaPlanningForm";
import FormulaSessionSummary from "@/components/formula-builder/FormulaSessionSummary";
import AppShell from "@/components/layout/AppShell";
import { useHairSession } from "@/context/HairSessionContext";

export default function FormulaBuilderPage() {
  const {
    currentLevel,
    targetLevel,
    porosity,
    selectedPigment,
  } = useHairSession();

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            Professional planning workspace
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Formula Builder
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/55 sm:text-base">
            Organize your formulation plan, review the active Hair Session,
            and connect each decision to the underlying hair science.
          </p>

          <div className="mt-8">
            <FormulaSessionSummary
              currentLevel={currentLevel}
              targetLevel={targetLevel}
              porosity={porosity}
              selectedPigment={selectedPigment}
            />
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <FormulaPlanningForm />

            <section className="rounded-2xl border border-amber-300/15 bg-amber-300/[0.04] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">
                Hair science guidance
              </p>

              <h2 className="mt-2 text-lg font-semibold text-white">
                Reasoning before formulation
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/50">
                This area will explain expected pigment, neutralization,
                porosity considerations, lift risk, and strand-test guidance.
              </p>
            </section>
          </div>
        </section>
      </main>
    </AppShell>
  );
}