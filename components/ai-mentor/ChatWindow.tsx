"use client";

import { useState } from "react";

import ChatInput from "@/components/ai-mentor/ChatInput";
import ChatMessage from "@/components/ai-mentor/ChatMessage";
import TypingIndicator from "@/components/ai-mentor/TypingIndicator";
import { getSampleResponse } from "@/lib/ai/sampleResponses";
import type { ChatMessage as ChatMessageType } from "@/lib/ai/types";

const initialMessages: ChatMessageType[] = [
  {
    id: "welcome-message",
    role: "assistant",
    content:
      "Welcome to HairForm AI Mentor. Ask me about color theory, corrective color, haircut geometry, consultations, or professional salon scenarios.",
    createdAt: new Date().toISOString(),
  },
];

export default function ChatWindow() {
  const [messages, setMessages] =
    useState<ChatMessageType[]>(initialMessages);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(content: string) {
    if (isSubmitting) {
      return;
    }

    const userMessage: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
    ]);
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));

      const assistantMessage: ChatMessageType = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: getSampleResponse(content),
        createdAt: new Date().toISOString(),
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        assistantMessage,
      ]);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111]">
      <div className="border-b border-white/10 px-5 py-4 sm:px-6">
        <p className="text-sm font-semibold text-white">
          HairForm AI Mentor
        </p>

        <p className="mt-1 text-xs text-white/40">
          Offline educational prototype
        </p>
      </div>

      <div className="min-h-[520px] space-y-5 p-5 sm:p-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isSubmitting ? <TypingIndicator /> : null}
      </div>

      <ChatInput
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
    </section>
  );
}