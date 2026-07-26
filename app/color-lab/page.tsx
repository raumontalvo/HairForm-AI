"use client";

import Link from "next/link";
import { useState } from "react";

import AnalysisPanel from "@/components/color-lab/AnalysisPanel";
import ConsultationForm from "@/components/color-lab/ConsultationForm";
import ActiveSessionHeader from "@/components/sessions/ActiveSessionHeader";
import { useHairSession } from "@/context/HairSessionContext";
import {
  analyzeColorScenario,
  type ColorAnalysis,
} from "@/lib/hair-science";

export default function ColorLabPage() {
  const {
    currentLevel,
    targetLevel,
    porosity,
    setCurrentLevel,
    setTargetLevel,
    setPorosity,
  } = useHairSession();

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [analysis, setAnalysis] = useState<ColorAnalysis>(() =>
    analyzeColorScenario({
      currentLevel,
      targetLevel,
      porosity,
    }),
  );

  async function handleAnalyze() {
    if (isAnalyzing) {
      return;
    }

    setIsAnalyzing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));

      setAnalysis(
        analyzeColorScenario({
          currentLevel,
          targetLevel,
          porosity,
        }),
      );
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link
            href="/dashboard"
            className="text-xl font-semibold tracking-tight"
          >
            HairForm <span className="text-amber-300">AI</span>
          </Link>

          <Link
            href="/dashboard"
            className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-white/70 transition hover:border-white/25 hover:text-white"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <ActiveSessionHeader />

        <section className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
            Flagship learning tool
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            AI Color Lab
          </h1>

          <p className="mt-5 text-lg leading-8 text-white/60">
            Build a consultation scenario and explore the color theory,
            underlying pigment, lift requirements, neutralization strategy, and
            safety considerations behind the result.
          </p>
        </section>

        <div className="mt-10 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <ConsultationForm
            currentLevel={currentLevel}
            targetLevel={targetLevel}
            porosity={porosity}
            isAnalyzing={isAnalyzing}
            onCurrentLevelChange={setCurrentLevel}
            onTargetLevelChange={setTargetLevel}
            onPorosityChange={setPorosity}
            onAnalyze={handleAnalyze}
          />

          <AnalysisPanel
            currentLevel={currentLevel}
            targetLevel={targetLevel}
            analysis={analysis}
          />
        </div>
      </div>
    </main>
  );
}