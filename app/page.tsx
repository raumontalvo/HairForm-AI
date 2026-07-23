const features = [
  {
    title: "AI Color Coach",
    description:
      "Build safer, more confident color plans with structured guidance, color theory, and clear explanations.",
    icon: "🎨",
  },
  {
    title: "Haircut Geometry",
    description:
      "Learn elevation, overdirection, sectioning, guides, and weight distribution through visual lessons.",
    icon: "✂️",
  },
  {
    title: "AI Mentor",
    description:
      "Ask professional questions and receive educational answers tailored to hair color, cutting, and technique.",
    icon: "🧠",
  },
  {
    title: "Professional Academy",
    description:
      "Complete lessons, quizzes, and case studies while tracking your progress and building confidence.",
    icon: "📚",
  },
];

const audiences = ["Students", "Professional Stylists", "Educators"];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <a href="#" className="text-xl font-semibold tracking-tight">
            HairForm <span className="text-amber-300">AI</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>

            <a href="#audience" className="transition hover:text-white">
              Who It&apos;s For
            </a>

            <a href="#journey" className="transition hover:text-white">
              How It Works
            </a>
          </nav>

          <a
            href="#get-started"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-200"
          >
            Get Started
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.16),transparent_35%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-32">
          <div className="flex flex-col justify-center">
            <div className="mb-6 w-fit rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm text-amber-200">
              Professional education powered by AI
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Master the science and geometry of hair.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65 sm:text-xl">
              Learn color formulation, haircut geometry, corrective techniques,
              and professional consultation skills with an AI platform built
              specifically for hair professionals.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#get-started"
                className="rounded-full bg-amber-300 px-7 py-3.5 text-center font-semibold text-black transition hover:bg-amber-200"
              >
                Start Learning
              </a>

              <a
                href="#features"
                className="rounded-full border border-white/15 px-7 py-3.5 text-center font-semibold transition hover:border-white/30 hover:bg-white/5"
              >
                Explore Features
              </a>
            </div>

            <div
              id="audience"
              className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/45"
            >
              {audiences.map((audience) => (
                <span key={audience}>✓ {audience}</span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-amber-300/5 backdrop-blur">
              <div className="rounded-[1.5rem] border border-white/10 bg-[#111111] p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-sm text-white/45">HairForm AI</p>

                    <h2 className="mt-1 text-2xl font-semibold">
                      Color Consultation
                    </h2>
                  </div>

                  <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                    Learning mode
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    ["Natural level", "Level 5"],
                    ["Current color", "Warm brunette"],
                    ["Target result", "Level 8 beige"],
                    ["Gray percentage", "30%"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <p className="text-xs uppercase tracking-[0.16em] text-white/35">
                        {label}
                      </p>

                      <p className="mt-2 font-medium">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/[0.07] p-5">
                  <p className="text-sm font-semibold text-amber-200">
                    Educational analysis
                  </p>

                  <p className="mt-3 text-sm leading-6 text-white/65">
                    The target requires approximately three levels of lift.
                    HairForm AI explains the exposed underlying pigment,
                    neutralization strategy, porosity risks, and why a strand
                    test should be completed before application.
                  </p>
                </div>

                <button className="mt-5 w-full rounded-2xl bg-white py-3.5 font-semibold text-black">
                  Generate Learning Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="border-y border-white/10 bg-white/[0.02]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Core platform
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Built for learning and real professional decisions.
            </h2>

            <p className="mt-5 text-lg leading-8 text-white/60">
              Every tool is designed to explain the reasoning behind a
              technique, not just provide an answer.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-3xl border border-white/10 bg-[#111111] p-7 transition hover:-translate-y-1 hover:border-amber-300/30"
              >
                <div className="text-3xl">{feature.icon}</div>

                <h3 className="mt-6 text-2xl font-semibold">{feature.title}</h3>

                <p className="mt-3 leading-7 text-white/55">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="journey">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                Learning journey
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Learn. Practice. Understand. Master.
              </h2>
            </div>

            <div className="space-y-4">
              {[
                ["01", "Learn the principle"],
                ["02", "Practice with guided scenarios"],
                ["03", "Test your understanding"],
                ["04", "Apply it with greater confidence"],
              ].map(([number, title]) => (
                <div
                  key={number}
                  className="flex items-center gap-5 rounded-2xl border border-white/10 p-5"
                >
                  <span className="text-sm font-semibold text-amber-300">
                    {number}
                  </span>

                  <p className="font-medium">{title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="get-started" className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-amber-300/20 bg-amber-300/[0.08] px-6 py-16 text-center sm:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">
            HairForm AI
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Professional hair education, reimagined with AI.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/60">
            Start with color formulation and haircut geometry, then build your
            skills through lessons, practice scenarios, and AI-guided learning.
          </p>

          <button className="mt-8 rounded-full bg-white px-8 py-3.5 font-semibold text-black transition hover:bg-amber-200">
            Join the Early Access List
          </button>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 HairForm AI. All rights reserved.</p>

          <p>Learn. Formulate. Create.</p>
        </div>
      </footer>
    </main>
  );
}