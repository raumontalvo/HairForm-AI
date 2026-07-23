import Link from "next/link";
const tools = [
  {
    title: "Color Lab",
    description:
      "Practice color formulation, analyze starting levels, and understand the reasoning behind each recommendation.",
    href: "/color-lab",
    icon: "🎨",
    label: "Flagship tool",
  },
  {
    title: "Hair Geometry",
    description:
      "Learn elevation, overdirection, sectioning, guides, and weight distribution.",
    href: "/hair-geometry",
    icon: "✂️",
    label: "Interactive learning",
  },
  {
    title: "Academy",
    description:
      "Continue structured lessons, quizzes, case studies, and professional development.",
    href: "/academy",
    icon: "📚",
    label: "Learning path",
  },
  {
    title: "AI Mentor",
    description:
      "Ask questions about color theory, cutting techniques, corrections, and consultations.",
    href: "/ai-mentor",
    icon: "🧠",
    label: "Professional support",
  },
];

const recentActivity = [
  {
    title: "Understanding underlying pigment",
    type: "Color theory lesson",
    progress: "72%",
  },
  {
    title: "Elevation and weight distribution",
    type: "Haircut geometry",
    progress: "45%",
  },
  {
    title: "Gray coverage consultation",
    type: "Practice scenario",
    progress: "Not started",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            HairForm <span className="text-amber-300">AI</span>
          </Link>

          <div className="flex items-center gap-4">
            <button className="hidden rounded-full border border-white/10 px-4 py-2 text-sm text-white/65 transition hover:border-white/25 hover:text-white sm:block">
              View Progress
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-300 font-semibold text-black">
              R
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[240px_1fr] lg:px-8">
        <aside className="hidden lg:block">
          <nav className="sticky top-8 space-y-2">
            <a
              href="/dashboard"
              className="block rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black"
            >
              Dashboard
            </a>

            <a
              href="/color-lab"
              className="block rounded-xl px-4 py-3 text-sm text-white/55 transition hover:bg-white/5 hover:text-white"
            >
              Color Lab
            </a>

            <a
              href="/hair-geometry"
              className="block rounded-xl px-4 py-3 text-sm text-white/55 transition hover:bg-white/5 hover:text-white"
            >
              Hair Geometry
            </a>

            <a
              href="/academy"
              className="block rounded-xl px-4 py-3 text-sm text-white/55 transition hover:bg-white/5 hover:text-white"
            >
              Academy
            </a>

            <a
              href="/ai-mentor"
              className="block rounded-xl px-4 py-3 text-sm text-white/55 transition hover:bg-white/5 hover:text-white"
            >
              AI Mentor
            </a>

            <a
              href="/saved"
              className="block rounded-xl px-4 py-3 text-sm text-white/55 transition hover:bg-white/5 hover:text-white"
            >
              Saved Work
            </a>
          </nav>
        </aside>

        <section>
          <div className="rounded-[2rem] border border-amber-300/20 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.15),transparent_35%)] p-7 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
              Your learning dashboard
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Welcome back, Raul.
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/60">
              Continue learning, practice professional scenarios, and build
              confidence through guided education.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/color-lab"
                className="rounded-full bg-amber-300 px-6 py-3 text-center font-semibold text-black transition hover:bg-amber-200"
              >
                Start a Color Consultation
              </a>

              <a
                href="/academy"
                className="rounded-full border border-white/15 px-6 py-3 text-center font-semibold transition hover:bg-white/5"
              >
                Continue Learning
              </a>
            </div>
          </div>

          <div className="mt-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
                  Core tools
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                  What would you like to work on?
                </h2>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {tools.map((tool) => (
                <a
                  key={tool.title}
                  href={tool.href}
                  className="group rounded-3xl border border-white/10 bg-[#111111] p-6 transition hover:-translate-y-1 hover:border-amber-300/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-3xl">{tool.icon}</div>

                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/45">
                      {tool.label}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold">{tool.title}</h3>

                  <p className="mt-3 leading-7 text-white/55">
                    {tool.description}
                  </p>

                  <p className="mt-6 text-sm font-semibold text-amber-300">
                    Open tool →
                  </p>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded-3xl border border-white/10 bg-[#111111] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/40">Learning activity</p>
                  <h2 className="mt-1 text-2xl font-semibold">
                    Continue where you left off
                  </h2>
                </div>

                <a
                  href="/academy"
                  className="text-sm font-semibold text-amber-300"
                >
                  View all
                </a>
              </div>

              <div className="mt-6 space-y-3">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.title}
                    className="rounded-2xl border border-white/10 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold">{activity.title}</p>
                        <p className="mt-1 text-sm text-white/40">
                          {activity.type}
                        </p>
                      </div>

                      <span className="text-sm text-amber-300">
                        {activity.progress}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-[#111111] p-6">
              <p className="text-sm text-white/40">Weekly progress</p>
              <h2 className="mt-1 text-2xl font-semibold">You are building momentum.</h2>

              <div className="mt-8 flex items-end gap-3">
                <span className="text-6xl font-semibold">3</span>
                <span className="pb-2 text-white/45">lessons completed</span>
              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[62%] rounded-full bg-amber-300" />
              </div>

              <p className="mt-4 text-sm leading-6 text-white/45">
                Complete two more lessons this week to reach your learning
                target.
              </p>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}