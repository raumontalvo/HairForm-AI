"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ToastVariant =
  | "success"
  | "error"
  | "warning"
  | "info";

export type ToastItem = {
  id: string;
  message: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  toasts: ToastItem[];
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
  dismiss: (toastId: string) => void;
};

const ToastContext =
  createContext<ToastContextValue | null>(null);

type ToastProviderProps = {
  children: ReactNode;
};

const TOAST_DURATION_MS = 4500;

export function ToastProvider({
  children,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((toastId: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter(
        (toast) => toast.id !== toastId,
      ),
    );
  }, []);

  const addToast = useCallback(
    (message: string, variant: ToastVariant) => {
      const trimmedMessage = message.trim();

      if (!trimmedMessage) {
        return;
      }

      const toastId = crypto.randomUUID();

      setToasts((currentToasts) => [
        ...currentToasts,
        {
          id: toastId,
          message: trimmedMessage,
          variant,
        },
      ]);

      window.setTimeout(() => {
        dismiss(toastId);
      }, TOAST_DURATION_MS);
    },
    [dismiss],
  );

  const success = useCallback(
    (message: string) => {
      addToast(message, "success");
    },
    [addToast],
  );

  const error = useCallback(
    (message: string) => {
      addToast(message, "error");
    },
    [addToast],
  );

  const warning = useCallback(
    (message: string) => {
      addToast(message, "warning");
    },
    [addToast],
  );

  const info = useCallback(
    (message: string) => {
      addToast(message, "info");
    },
    [addToast],
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      toasts,
      success,
      error,
      warning,
      info,
      dismiss,
    }),
    [
      dismiss,
      error,
      info,
      success,
      toasts,
      warning,
    ],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToast must be used inside ToastProvider",
    );
  }

  return context;
}