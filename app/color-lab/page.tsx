"use client";

import { useState } from "react";
import Link from "next/link";

import AnalysisPanel from "@/components/color-lab/AnalysisPanel";
import Button from "@/components/ui/Button";
import {
  analyzeColorScenario,
  type ColorAnalysis,
  type Porosity,
} from "@/lib/color-engine/analyze";
import type { HairLevel } from "@/lib/color-engine/levels";

const startingLevels = [
  "Level 1",
  "Level 2",
  "Level 3",
  "Level 4",
  "Level 5",
  "Level 6",
  "Level 7",
  "Level 8",
  "Level 9",
  "Level 10",
];

const targetTones = [
  "Neutral",
  "Ash",
  "Beige",
  "Gold",
  "Copper",
  "Red",
  "Violet",
];

function parseHairLevel(value: string): HairLevel {
  return Number(value.replace("Level ", "")) as HairLevel;
}

export default function ColorLabPage() {
  const [currentLevel, setCurrentLevel] = useState<HairLevel>(5);
  const [targetLevel, setTargetLevel] = useState<HairLevel>(8);
  const [porosity, setPorosity] = useState<Porosity>("Medium");

  const [analysis, setAnalysis] = useState<ColorAnalysis>(() =>
    analyzeColorScenario({
      currentLevel: 5,
      targetLevel: 8,
      porosity: "Medium",
    }),
  );

  function handleAnalyze() {
    setAnalysis(
      analyzeColorScenario({
        currentLevel,
        targetLevel,
        porosity,
      }),
    );
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
        <section className="max-w-3xl">
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
          <section className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8">
            <div>
              <p className="text-sm text-white/40">Consultation input</p>

              <h2 className="mt-1 text-2xl font-semibold">
                Describe the starting canvas
              </h2>
            </div>

            <form
              className="mt-8 space-y-6"
              onSubmit={(event) => {
                event.preventDefault();
                handleAnalyze();
              }}
            >
              <div>
                <label
                  htmlFor="natural-level"
                  className="text-sm font-semibold text-white/75"
                >
                  Natural level
                </label>

                <select
                  id="natural-level"
                  defaultValue="Level 5"
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none transition focus:border-amber-300/50"
                >
                  {startingLevels.map((level) => (
                    <option key={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="current-level"
                  className="text-sm font-semibold text-white/75"
                >
                  Current cosmetic level
                </label>

                <select
                  id="current-level"
                  value={`Level ${currentLevel}`}
                  onChange={(event) =>
                    setCurrentLevel(parseHairLevel(event.target.value))
                  }
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none transition focus:border-amber-300/50"
                >
                  {startingLevels.map((level) => (
                    <option key={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="target-level"
                    className="text-sm font-semibold text-white/75"
                  >
                    Target level
                  </label>

                  <select
                    id="target-level"
                    value={`Level ${targetLevel}`}
                    onChange={(event) =>
                      setTargetLevel(parseHairLevel(event.target.value))
                    }
                    className="mt-3 w-full rounded-2xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none transition focus:border-amber-300/50"
                  >
                    {startingLevels.map((level) => (
                      <option key={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="target-tone"
                    className="text-sm font-semibold text-white/75"
                  >
                    Target tone
                  </label>

                  <select
                    id="target-tone"
                    defaultValue="Beige"
                    className="mt-3 w-full rounded-2xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none transition focus:border-amber-300/50"
                  >
                    {targetTones.map((tone) => (
                      <option key={tone}>{tone}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="gray"
                  className="text-sm font-semibold text-white/75"
                >
                  Gray percentage
                </label>

                <input
                  id="gray"
                  type="number"
                  min="0"
                  max="100"
                  defaultValue="30"
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none transition focus:border-amber-300/50"
                />
              </div>

              <div>
                <label
                  htmlFor="porosity"
                  className="text-sm font-semibold text-white/75"
                >
                  Porosity
                </label>

                <select
                  id="porosity"
                  value={porosity}
                  onChange={(event) =>
                    setPorosity(event.target.value as Porosity)
                  }
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none transition focus:border-amber-300/50"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Uneven</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="history"
                  className="text-sm font-semibold text-white/75"
                >
                  Chemical history
                </label>

                <textarea
                  id="history"
                  rows={5}
                  placeholder="Example: Permanent color on roots, previous highlights through mids and ends..."
                  className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none placeholder:text-white/25 transition focus:border-amber-300/50"
                />
              </div>

              <Button type="submit" fullWidth>
                Analyze Consultation
              </Button>
            </form>
          </section>

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