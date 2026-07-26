import Link from "next/link";

import HairLevelsLesson from "@/components/academy/hair-levels/HairLevelsLesson";

export default function HairLevelsPage() {
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
            href="/academy"
            className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-white/70 transition hover:border-white/25 hover:text-white"
          >
            Academy
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <HairLevelsLesson />
      </div>
    </main>
  );
}