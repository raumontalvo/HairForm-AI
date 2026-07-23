import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export default function Textarea({
  id,
  label,
  error,
  className = "",
  ...props
}: TextareaProps) {
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

      <textarea
        id={id}
        className={[
          "w-full resize-none rounded-2xl border bg-[#171717] px-4 py-3 text-white outline-none transition",
          "placeholder:text-white/25",
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
      />

      {error && id ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}