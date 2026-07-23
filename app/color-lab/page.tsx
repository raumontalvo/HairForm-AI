"use client";

import { useState } from "react";
import Link from "next/link";

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
    const nextAnalysis = analyzeColorScenario({
      currentLevel,
      targetLevel,
      porosity,
    });

    setAnalysis(nextAnalysis);
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

            <form className="mt-8 space-y-6">
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

              <button
                type="button"
                onClick={handleAnalyze}
                className="w-full rounded-2xl bg-amber-300 px-5 py-3.5 font-semibold text-black transition hover:bg-amber-200"
              >
                Analyze Consultation
              </button>
            </form>
          </section>

          <section className="space-y-6">
            <div className="rounded-3xl border border-amber-300/20 bg-amber-300/[0.07] p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
                    Educational analysis
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold">
                    Level {currentLevel} to Level {targetLevel}
                  </h2>
                </div>

                <span className="w-fit rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                  Learning mode
                </span>
              </div>

              <p className="mt-6 leading-7 text-white/65">
                This scenario requires {analysis.liftDescription.toLowerCase()}.
                The exposed underlying pigment is{" "}
                {analysis.underlyingPigment.toLowerCase()}, with a suggested
                neutralization focus of{" "}
                {analysis.neutralizationTone.toLowerCase()}.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                {
                  label: "Required lift",
                  value: analysis.liftDescription,
                },
                {
                  label: "Underlying pigment",
                  value: analysis.underlyingPigment,
                },
                {
                  label: "Neutralization focus",
                  value: analysis.neutralizationTone,
                },
                {
                  label: "Porosity risk",
                  value: analysis.porosityRisk,
                },
              ].map((item) => (
                <article
                  key={item.label}
                  className="rounded-3xl border border-white/10 bg-[#111111] p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/35">
                    {item.label}
                  </p>

                  <p className="mt-3 text-xl font-semibold">{item.value}</p>
                </article>
              ))}
            </div>

            <article className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8">
              <p className="text-sm font-semibold text-amber-300">
                Why this matters
              </p>

              <div className="mt-5 space-y-4 text-sm leading-7 text-white/60">
                <p>
                  Changing from Level {currentLevel} to Level {targetLevel} can
                  expose underlying warmth that must be considered before
                  selecting the final tone.
                </p>

                <p>
                  The expected exposed pigment is{" "}
                  {analysis.underlyingPigment.toLowerCase()}, which commonly
                  points toward a{" "}
                  {analysis.neutralizationTone.toLowerCase()} neutralization
                  strategy.
                </p>

                <p>
                  Porosity assessment: {analysis.porosityRisk}. A strand test
                  helps confirm lift, tone response, elasticity, and processing
                  tolerance before full application.
                </p>
              </div>
            </article>

            <article className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8">
              <p className="text-sm font-semibold text-amber-300">
                Professional safety checklist
              </p>

              <div className="mt-5 space-y-3">
                {[
                  "Confirm complete chemical history.",
                  "Assess elasticity and porosity.",
                  "Perform an allergy alert test when required.",
                  "Complete a strand test before full application.",
                  "Follow the selected manufacturer’s instructions.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-2xl border border-white/10 p-4"
                  >
                    <span className="text-amber-300">✓</span>
                    <p className="text-sm text-white/65">{item}</p>
                  </div>
                ))}
              </div>
            </article>

            <p className="text-xs leading-5 text-white/35">
              HairForm AI provides educational decision support and does not
              replace professional judgment, manufacturer instructions, strand
              testing, allergy testing, or an in-person hair assessment.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}