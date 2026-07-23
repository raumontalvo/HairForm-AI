import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-amber-300 text-black hover:bg-amber-200 disabled:bg-amber-300/50",
  secondary:
    "border border-white/15 bg-transparent text-white hover:bg-white/5 disabled:text-white/40",
  ghost:
    "bg-transparent text-white/70 hover:bg-white/5 hover:text-white disabled:text-white/30",
};

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        "rounded-2xl px-5 py-3.5 font-semibold transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70",
        "disabled:cursor-not-allowed",
        variantStyles[variant],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}