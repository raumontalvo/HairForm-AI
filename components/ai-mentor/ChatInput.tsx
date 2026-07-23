"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";

type ChatInputProps = {
  isSubmitting: boolean;
  onSubmit: (message: string) => void | Promise<void>;
};

export default function ChatInput({
  isSubmitting,
  onSubmit,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isSubmitting) {
      return;
    }

    setMessage("");
    await onSubmit(trimmedMessage);
  }

  return (
    <form
      className="border-t border-white/10 bg-[#0b0b0b] p-4 sm:p-5"
      onSubmit={async (event) => {
        event.preventDefault();
        await handleSubmit();
      }}
    >
      <Textarea
        id="mentor-message"
        aria-label="Ask HairForm AI a question"
        rows={3}
        value={message}
        disabled={isSubmitting}
        placeholder="Ask about color theory, corrective color, haircut geometry, or consultations..."
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={async (event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            await handleSubmit();
          }
        }}
      />

      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="text-xs text-white/35">
          Press Enter to send. Use Shift + Enter for a new line.
        </p>

        <Button
          type="submit"
          disabled={isSubmitting || !message.trim()}
          className="shrink-0"
        >
          {isSubmitting ? "Thinking..." : "Send"}
        </Button>
      </div>
    </form>
  );
}