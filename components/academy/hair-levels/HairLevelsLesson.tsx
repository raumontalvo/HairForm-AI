"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import HairLevelChart from "@/components/academy/hair-levels/HairLevelChart";
import HairLevelDetails from "@/components/academy/hair-levels/HairLevelDetails";
import HairLevelQuiz from "@/components/academy/hair-levels/HairLevelQuiz";
import HairLevelSelector from "@/components/academy/hair-levels/HairLevelSelector";
import {
  getHairLevelEntry,
  hairLevelLessonEntries,
  hairLevelQuizQuestions,
} from "@/lib/academy/hairLevels";

const COMPLETION_STORAGE_KEY =
  "hairform-ai:academy:hair-levels:completed";

export default function HairLevelsLesson() {
  const [selectedLevel, setSelectedLevel] =
    useState(5);

  const [answers, setAnswers] = useState<
    Record<string, string>
  >({});

  const [isSubmitted, setIsSubmitted] =
    useState(false);

  const [isCompleted, setIsCompleted] =
    useState(false);

  useEffect(() => {
    const storedCompletion =
      window.localStorage.getItem(
        COMPLETION_STORAGE_KEY,
      );

    if (storedCompletion !== "true") {
      return;
    }

    queueMicrotask(() => {
      setIsCompleted(true);
    });
  }, []);

  const selectedEntry = useMemo(
    () => getHairLevelEntry(selectedLevel),
    [selectedLevel],
  );

  const score = hairLevelQuizQuestions.filter(
    (question) =>
      answers[question.id] ===
      question.correctOption,
  ).length;

  const didPass =
    isSubmitted &&
    score >=
      Math.ceil(
        hairLevelQuizQuestions.length * 0.8,
      );

  function handleAnswer(
    questionId: string,
    option: string,
  ) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: option,
    }));
  }

  function handleSubmitQuiz() {
    setIsSubmitted(true);
  }

  function handleResetQuiz() {
    setAnswers({});
    setIsSubmitted(false);
  }

  function handleCompleteLesson() {
    setIsCompleted(true);

    window.localStorage.setItem(
      COMPLETION_STORAGE_KEY,
      "true",
    );
  }

  return (
    <>
      <section className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8 lg:p-10">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-200">
              Lesson 1
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/45">
              Approximately 20 minutes
            </span>

            {isCompleted ? (
              <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                Completed
              </span>
            ) : null}
          </div>

          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
            HairForm Academy
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Hair Levels
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/60">
            Learn how professionals describe depth
            from Level 1 to Level 10, distinguish
            level from tone, anticipate exposed
            pigment, and make safer formulation
            decisions.
          </p>
        </div>
      </section>

      <section className="mt-6 grid gap-5 md:grid-cols-3">
        <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm font-semibold text-white">
            Level means depth
          </p>

          <p className="mt-3 text-sm leading-7 text-white/50">
            The level system describes how dark or
            light the hair appears. It does not
            describe tone.
          </p>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm font-semibold text-white">
            Tone means character
          </p>

          <p className="mt-3 text-sm leading-7 text-white/50">
            Ash, gold, copper, red, violet, and
            neutral are tonal descriptions that can
            exist at different levels.
          </p>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm font-semibold text-white">
            Pigment guides formulation
          </p>

          <p className="mt-3 text-sm leading-7 text-white/50">
            Every lifting stage exposes predictable
            warmth that must be supported,
            enhanced, or neutralized intentionally.
          </p>
        </article>
      </section>

      <div className="mt-6">
        <HairLevelSelector
          levels={hairLevelLessonEntries}
          selectedLevel={selectedLevel}
          onSelectLevel={setSelectedLevel}
        />
      </div>

      <div className="mt-6">
        <HairLevelDetails
          entry={selectedEntry}
        />
      </div>

      <div className="mt-6">
        <HairLevelChart
          levels={hairLevelLessonEntries}
          selectedLevel={selectedLevel}
          onSelectLevel={setSelectedLevel}
        />
      </div>

      <section className="mt-6 rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
          Professional reasoning
        </p>

        <h2 className="mt-3 text-2xl font-semibold text-white">
          How to identify a level accurately
        </h2>

        <ol className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            "Evaluate the hair in neutral, consistent lighting.",
            "Separate depth from reflected warmth or coolness.",
            "Compare multiple areas, including roots, mids, and ends.",
            "Account for artificial pigment, porosity, density, and previous services.",
          ].map((step, index) => (
            <li
              key={step}
              className="rounded-2xl border border-white/10 bg-black/20 p-5"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                Step {index + 1}
              </span>

              <p className="mt-2 text-sm leading-7 text-white/55">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-6">
        <HairLevelQuiz
          questions={hairLevelQuizQuestions}
          answers={answers}
          isSubmitted={isSubmitted}
          onAnswer={handleAnswer}
          onSubmit={handleSubmitQuiz}
          onReset={handleResetQuiz}
        />
      </div>

      <section className="mt-6 rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8">
        {isCompleted ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Lesson complete
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-white">
              Hair Levels completed
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
              You can now return to the Academy or
              continue practicing level
              identification throughout HairForm AI.
            </p>
          </div>
        ) : (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              Complete the lesson
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-white">
              Record your progress
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
              Score at least 80% on the knowledge
              check to complete this lesson.
            </p>

            <button
              type="button"
              disabled={!didPass}
              onClick={handleCompleteLesson}
              className="mt-6 rounded-2xl bg-amber-300 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30"
            >
              Mark lesson complete
            </button>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/academy"
            className="text-sm font-semibold text-white/55 transition hover:text-white"
          >
            ← Back to Academy
          </Link>

          <span className="text-sm font-semibold text-white/30">
            Next: Underlying Pigment
          </span>
        </div>
      </section>
    </>
  );
}