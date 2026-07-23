"use client";

import { useMemo, useState } from "react";

import LiftExplanation from "@/components/lift-journey/LiftExplanation";
import LiftTimeline from "@/components/lift-journey/LiftTimeline";
import Select from "@/components/ui/Select";
import { useHairSession } from "@/context/HairSessionContext";
import {
  createLiftJourney,
  type HairLevel,
  type LiftJourneyStep,
} from "@/lib/hair-science";

const hairLevels: HairLevel[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function LiftJourney() {
  const {
    currentLevel,
    targetLevel,
    setCurrentLevel,
    setTargetLevel,
  } = useHairSession();

  const journey = useMemo(
    () => createLiftJourney(currentLevel, targetLevel),
    [currentLevel, targetLevel],
  );

  const [selectedLevel, setSelectedLevel] =
    useState<HairLevel>(currentLevel);

  const selectedStep =
    journey.steps.find((step) => step.level === selectedLevel) ??
    journey.steps[0];

  function handleCurrentLevelChange(level: HairLevel) {
    setCurrentLevel(level);
    setSelectedLevel(level);
  }

  function handleTargetLevelChange(level: HairLevel) {
    setTargetLevel(level);

    const nextJourney = createLiftJourney(currentLevel, level);

    if (
      !nextJourney.steps.some((step) => step.level === selectedLevel)
    ) {
      setSelectedLevel(currentLevel);
    }
  }

  function handleStepSelect(step: LiftJourneyStep) {
    setSelectedLevel(step.level);
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
            Journey controls
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            Choose the starting and target levels.
          </h2>

          <p className="mt-4 leading-7 text-white/55">
            HairForm AI maps every level between the selected points and shows
            the expected underlying pigment and complementary neutralization
            relationship.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Select
            id="lift-current-level"
            label="Current level"
            value={currentLevel}
            onChange={(event) =>
              handleCurrentLevelChange(
                Number(event.target.value) as HairLevel,
              )
            }
          >
            {hairLevels.map((level) => (
              <option key={level} value={level}>
                Level {level}
              </option>
            ))}
          </Select>

          <Select
            id="lift-target-level"
            label="Target level"
            value={targetLevel}
            onChange={(event) =>
              handleTargetLevelChange(
                Number(event.target.value) as HairLevel,
              )
            }
          >
            {hairLevels.map((level) => (
              <option key={level} value={level}>
                Level {level}
              </option>
            ))}
          </Select>
        </div>

        <div className="mt-8">
          <LiftTimeline
            journey={journey}
            selectedStep={selectedStep}
            onStepSelect={handleStepSelect}
          />
        </div>
      </section>

      <LiftExplanation step={selectedStep} />
    </div>
  );
}