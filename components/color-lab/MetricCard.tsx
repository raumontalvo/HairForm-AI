type MetricCardProps = {
  label: string;
  value: string;
};

export default function MetricCard({
  label,
  value,
}: MetricCardProps) {
  return (
    <article className="rounded-3xl border border-white/10 bg-[#111111] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/35">
        {label}
      </p>

      <p className="mt-3 text-xl font-semibold">{value}</p>
    </article>
  );
}