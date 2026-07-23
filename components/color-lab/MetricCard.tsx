import Card from "@/components/ui/Card";

type MetricCardProps = {
  label: string;
  value: string;
};

export default function MetricCard({
  label,
  value,
}: MetricCardProps) {
  return (
    <Card>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/35">
        {label}
      </p>

      <p className="mt-3 text-xl font-semibold">{value}</p>
    </Card>
  );
}