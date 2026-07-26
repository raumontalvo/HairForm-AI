import Link from "next/link";

import type { AcademyLesson } from "@/lib/academy/types";

type LessonCardProps = {
  lesson: AcademyLesson;
};

export default function LessonCard({
  lesson,
}: LessonCardProps) {
  const isAvailable =
    lesson.status === "available";

  return (
    <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-[#111111] p-6 transition hover:border-white/20">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10 text-sm font-semibold text-amber-300">
          {lesson.order}
        </div>

        <span
          className={
            isAvailable
              ? "rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200"
              : "rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/40"
          }
        >
          {isAvailable
            ? "Available"
            : "Coming soon"}
        </span>
      </div>

      <h2 className="mt-6 text-xl font-semibold tracking-tight text-white">
        {lesson.title}
      </h2>

      <p className="mt-3 text-sm leading-7 text-white/55">
        {lesson.description}
      </p>

      <ul className="mt-5 space-y-2">
        {lesson.topics.map((topic) => (
          <li
            key={topic}
            className="flex items-center gap-2 text-sm text-white/45"
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-amber-300"
            />

            {topic}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-7">
        <p className="mb-4 text-xs text-white/35">
          Approximately {lesson.estimatedMinutes} minutes
        </p>

        {isAvailable ? (
          <Link
            href={`/academy/${lesson.slug}`}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-amber-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-200"
          >
            Start lesson
          </Link>
        ) : (
          <span className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/30">
            In development
          </span>
        )}
      </div>
    </article>
  );
}