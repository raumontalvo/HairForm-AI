const safetyItems = [
  "Confirm complete chemical history.",
  "Assess elasticity and porosity.",
  "Perform an allergy alert test when required.",
  "Complete a strand test before full application.",
  "Follow the selected manufacturer’s instructions.",
];

export default function SafetyChecklist() {
  return (
    <article className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8">
      <p className="text-sm font-semibold text-amber-300">
        Professional safety checklist
      </p>

      <div className="mt-5 space-y-3">
        {safetyItems.map((item) => (
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
  );
}