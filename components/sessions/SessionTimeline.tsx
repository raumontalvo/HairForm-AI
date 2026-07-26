"use client";

import { useMemo } from "react";

import { useHairSession } from "@/context/HairSessionContext";
import { getRecentHairSessionEvents } from "@/lib/hair-session/timeline";

function formatEventTime(createdAt: string): string {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default function SessionTimeline() {
  const { timeline } = useHairSession();

  const recentEvents = useMemo(
    () => getRecentHairSessionEvents(timeline, 8),
    [timeline],
  );

  return (
    <section className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">
          Session activity
        </p>

        <h2 className="mt-2 text-xl font-semibold text-white">
          Latest timeline
        </h2>

        <p className="mt-2 text-sm leading-6 text-white/50">
          Review recent changes and important actions from the active Hair
          Session.
        </p>
      </div>

      {recentEvents.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-black/20 px-5 py-8 text-center">
          <p className="text-sm font-medium text-white/65">
            No session activity yet
          </p>

          <p className="mt-2 text-sm leading-6 text-white/40">
            Changes, saves, formula updates, and other actions will appear here.
          </p>
        </div>
      ) : (
        <ol className="mt-6 space-y-3">
          {recentEvents.map((event) => (
            <li
              key={event.id}
              className="rounded-2xl border border-white/10 bg-black/20 p-4"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-300"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-sm font-semibold text-white">
                      {event.title}
                    </h3>

                    <time
                      dateTime={event.createdAt}
                      className="text-xs text-white/35"
                    >
                      {formatEventTime(event.createdAt)}
                    </time>
                  </div>

                  {event.description ? (
                    <p className="mt-1 text-sm leading-6 text-white/50">
                      {event.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}