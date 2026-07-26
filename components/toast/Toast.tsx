"use client";

import type {
  ToastItem,
  ToastVariant,
} from "@/context/ToastContext";

type ToastProps = {
  toast: ToastItem;
  onDismiss: (toastId: string) => void;
};

const variantStyles: Record<
  ToastVariant,
  {
    badge: string;
    border: string;
    label: string;
  }
> = {
  success: {
    badge: "bg-emerald-300/15 text-emerald-200",
    border: "border-emerald-300/20",
    label: "Success",
  },
  error: {
    badge: "bg-red-300/15 text-red-200",
    border: "border-red-300/20",
    label: "Error",
  },
  warning: {
    badge: "bg-amber-300/15 text-amber-200",
    border: "border-amber-300/20",
    label: "Warning",
  },
  info: {
    badge: "bg-sky-300/15 text-sky-200",
    border: "border-sky-300/20",
    label: "Info",
  },
};

export default function Toast({
  toast,
  onDismiss,
}: ToastProps) {
  const styles = variantStyles[toast.variant];

  return (
    <article
      className={[
        "w-full rounded-2xl border bg-[#151515] p-4 shadow-2xl shadow-black/30",
        styles.border,
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <span
          className={[
            "rounded-full px-2.5 py-1 text-xs font-semibold",
            styles.badge,
          ].join(" ")}
        >
          {styles.label}
        </span>

        <p className="min-w-0 flex-1 pt-0.5 text-sm leading-6 text-white/80">
          {toast.message}
        </p>

        <button
          type="button"
          onClick={() => onDismiss(toast.id)}
          aria-label="Dismiss notification"
          className="rounded-lg px-2 py-1 text-sm text-white/40 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70"
        >
          ×
        </button>
      </div>
    </article>
  );
}