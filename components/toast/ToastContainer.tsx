"use client";

import Toast from "@/components/toast/Toast";
import { useToast } from "@/context/ToastContext";

export default function ToastContainer() {
  const { toasts, dismiss } = useToast();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      aria-relevant="additions removals"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:left-auto sm:w-full sm:max-w-sm"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto w-full"
        >
          <Toast
            toast={toast}
            onDismiss={dismiss}
          />
        </div>
      ))}
    </div>
  );
}