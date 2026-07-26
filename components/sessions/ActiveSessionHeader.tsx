"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import Button from "@/components/ui/Button";
import { useHairSession } from "@/context/HairSessionContext";

export default function ActiveSessionHeader() {
  const {
    activeSessionId,
    sessionName,
    currentLevel,
    targetLevel,
    isDirty,
    saveActiveSession,
  } = useHairSession();

  const [statusMessage, setStatusMessage] = useState("");

  const sessionStatus = useMemo(() => {
    if (!activeSessionId) {
      return {
        label: "New session",
        className:
          "border-sky-300/20 bg-sky-300/10 text-sky-200",
      };
    }

    if (isDirty) {
      return {
        label: "Unsaved changes",
        className:
          "border-amber-300/20 bg-amber-300/10 text-amber-200",
      };
    }

    return {
      label: "Saved",
      className:
        "border-emerald-300/20 bg-emerald-300/10 text-emerald-200",
    };
  }, [activeSessionId, isDirty]);

  const canSave = !activeSessionId || isDirty;

  function handleSave() {
    const didSave = saveActiveSession();

    setStatusMessage(
      didSave
        ? "Session saved successfully."
        : "The session could not be saved.",
    );
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-[#111111] px-5 py-4 sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">
            Active Hair Session
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-semibold text-white">
              {sessionName}
            </h2>

            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-medium text-white/50">
              Level {currentLevel} → Level {targetLevel}
            </span>

            <span
              className={[
                "rounded-full border px-3 py-1 text-xs font-medium",
                sessionStatus.className,
              ].join(" ")}
            >
              {sessionStatus.label}
            </span>
          </div>

          {statusMessage ? (
            <p
              role="status"
              className="mt-2 text-sm text-white/45"
            >
              {statusMessage}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/saved"
            className="rounded-2xl border border-white/15 px-5 py-3.5 text-center font-semibold text-white transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70"
          >
            View sessions
          </Link>

          <Button
            onClick={handleSave}
            disabled={!canSave}
          >
            {isDirty || !activeSessionId
              ? "Save session"
              : "Session saved"}
          </Button>
        </div>
      </div>
    </section>
  );
}