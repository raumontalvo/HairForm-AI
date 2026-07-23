import Link from "next/link";

import ChatWindow from "@/components/ai-mentor/ChatWindow";

export default function AiMentorPage() {
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

      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
            AI Mentor
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Learn from an AI hair educator.
          </h1>

          <p className="mt-5 text-lg leading-8 text-white/60">
            Ask professional questions about color theory, haircut geometry,
            consultations, corrective color, and salon best practices.
          </p>
        </div>

        <div className="mt-10">
          <ChatWindow />
        </div>
      </div>
    </main>
  );
}