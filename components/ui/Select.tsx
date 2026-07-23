import type { ReactNode, SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  children: ReactNode;
};

export default function Select({
  id,
  label,
  error,
  children,
  className = "",
  ...props
}: SelectProps) {
  return (
    <div>
      {label ? (
        <label
          htmlFor={id}
          className="text-sm font-semibold text-white/75"
        >
          {label}
        </label>
      ) : null}

      <select
        id={id}
        className={[
          "w-full rounded-2xl border bg-[#171717] px-4 py-3 text-white outline-none transition",
          error
            ? "border-red-400/60 focus:border-red-400"
            : "border-white/10 focus:border-amber-300/50",
          label ? "mt-3" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-invalid={Boolean(error)}
        aria-describedby={error && id ? `${id}-error` : undefined}
        {...props}
      >
        {children}
      </select>

      {error && id ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}