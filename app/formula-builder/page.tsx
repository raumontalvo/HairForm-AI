"use client";

import { useState } from "react";
import FormulaGuidance from "@/components/formula-builder/FormulaGuidance";
import FormulaPlanningForm, {
  type FormulaPlan,
} from "@/components/formula-builder/FormulaPlanningForm";
import FormulaSessionSummary from "@/components/formula-builder/FormulaSessionSummary";
import AppShell from "@/components/layout/AppShell";
import { useHairSession } from "@/context/HairSessionContext";
import { buildFormulaGuidance } from "@/lib/hair-science/formula-guidance";

const initialPlan: FormulaPlan = {
  tonalFamily: "",
  developerChoice: "",
  applicationStrategy: "",
  processingNotes: "",
  professionalNotes: "",
};

export default function FormulaBuilderPage() {
  const {
    currentLevel,
    targetLevel,
    porosity,
    selectedPigment,
  } = useHairSession();

  const [plan, setPlan] = useState<FormulaPlan>(initialPlan);

  const guidance = buildFormulaGuidance({
    currentLevel,
    targetLevel,
    porosity,
    selectedPigment,
    tonalFamily: plan.tonalFamily,
    developerChoice: plan.developerChoice,
    applicationStrategy: plan.applicationStrategy,
  });

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

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <FormulaPlanningForm onPlanChange={setPlan} />

            <FormulaGuidance guidance={guidance} />
          </div>
        </section>
      </main>
    </AppShell>
  );
}