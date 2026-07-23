import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  padding?: "none" | "small" | "medium" | "large";
  interactive?: boolean;
};

const paddingStyles = {
  none: "",
  small: "p-4",
  medium: "p-6",
  large: "p-6 sm:p-8",
};

export default function Card({
  children,
  padding = "medium",
  interactive = false,
  className = "",
  ...props
}: CardProps) {
  return (
    <article
      className={[
        "rounded-3xl border border-white/10 bg-[#111111]",
        paddingStyles[padding],
        interactive
          ? "transition hover:-translate-y-1 hover:border-amber-300/30"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </article>
  );
}