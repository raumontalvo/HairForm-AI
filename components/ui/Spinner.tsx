type SpinnerProps = {
  size?: "small" | "medium" | "large";
  label?: string;
};

const sizeStyles = {
  small: "h-4 w-4 border-2",
  medium: "h-5 w-5 border-2",
  large: "h-8 w-8 border-[3px]",
};

export default function Spinner({
  size = "medium",
  label = "Loading",
}: SpinnerProps) {
  return (
    <span className="inline-flex items-center gap-2" role="status">
      <span
        aria-hidden="true"
        className={[
          "inline-block animate-spin rounded-full border-white/25 border-t-current",
          sizeStyles[size],
        ].join(" ")}
      />

      <span className="sr-only">{label}</span>
    </span>
  );
}