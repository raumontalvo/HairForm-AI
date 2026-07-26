import Link from "next/link";

import AcademyProgress from "@/components/academy/AcademyProgress";
import LessonCard from "@/components/academy/LessonCard";
import {
  academyCurriculum,
  getAvailableAcademyLessons,
  getTotalAcademyMinutes,
} from "@/lib/academy/curriculum";

export default function AcademyPage() {
  const availableLessons =
    getAvailableAcademyLessons();

  const totalMinutes =
    getTotalAcademyMinutes();

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link
            href="/dashboard"
            className="text-xl font-semibold tracking-tight"
          >
            HairForm{" "}
            <span className="text-amber-300">
              AI
            </span>
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
        <section className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
            HairForm Academy
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Learn the science behind every decision.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/60">
            Build professional reasoning through a
            structured curriculum covering hair
            levels, underlying pigment, lift,
            neutralization, porosity, formulation,
            consultation, and corrective color.
          </p>
        </section>

        <div className="mt-10">
          <AcademyProgress
            completedLessons={0}
            totalLessons={
              academyCurriculum.length
            }
          />
        </div>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-2xl font-semibold text-white">
              {academyCurriculum.length}
            </p>

            <p className="mt-1 text-sm text-white/45">
              Core lessons
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-2xl font-semibold text-white">
              {availableLessons.length}
            </p>

            <p className="mt-1 text-sm text-white/45">
              Available now
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-2xl font-semibold text-white">
              {totalMinutes}
            </p>

            <p className="mt-1 text-sm text-white/45">
              Curriculum minutes
            </p>
          </div>
        </section>

        <section className="mt-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              Curriculum
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Your learning path
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/50">
              Begin with the level system and move
              through the curriculum in sequence.
              Each lesson will include instruction,
              interactive practice, professional
              examples, and a knowledge check.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {academyCurriculum.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}