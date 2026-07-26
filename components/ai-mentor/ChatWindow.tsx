"use client";

import { useState } from "react";

import ChatInput from "@/components/ai-mentor/ChatInput";
import ChatMessage from "@/components/ai-mentor/ChatMessage";
import HairSessionSummary from "@/components/ai-mentor/HairSessionSummary";
import PromptSuggestions from "@/components/ai-mentor/PromptSuggestions";
import TypingIndicator from "@/components/ai-mentor/TypingIndicator";
import { useHairSession } from "@/context/HairSessionContext";
import type { ChatMessage as ChatMessageType } from "@/lib/ai/types";
import { buildMentorResponse } from "@/lib/hair-science/mentor/buildResponse";
import { buildMentorPrompts } from "@/lib/hair-science/mentor/prompts";
import { createMentorQuestionEvent } from "@/lib/hair-session/timeline";

export default function ChatWindow() {
  const {
    currentLevel,
    targetLevel,
    porosity,
    selectedPigment,
    appendTimelineEvent,
  } = useHairSession();

  const mentorContext = {
    currentLevel,
    targetLevel,
    porosity,
    selectedPigment,
  };

  const contextualWelcome = selectedPigment
    ? `You are exploring ${selectedPigment.toLowerCase()} in the current Hair Session. Ask me why this pigment appears, how its complement works, or how it connects to neutralization.`
    : "Welcome to HairForm AI Mentor. Ask me about color theory, corrective color, haircut geometry, consultations, or professional salon scenarios.";

  const [messages, setMessages] = useState<
    ChatMessageType[]
  >([
    {
      id: "welcome-message",
      role: "assistant",
      content: contextualWelcome,
      createdAt: new Date().toISOString(),
    },
  ]);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const suggestions =
    buildMentorPrompts(mentorContext);

  async function handleSubmit(content: string) {
    const trimmedContent = content.trim();

    if (!trimmedContent || isSubmitting) {
      return;
    }

    const userMessage: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedContent,
      createdAt: new Date().toISOString(),
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
    ]);

    setIsSubmitting(true);

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 900),
      );

      const assistantMessage: ChatMessageType = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: buildMentorResponse({
          question: trimmedContent,
          context: mentorContext,
        }),
        createdAt: new Date().toISOString(),
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        assistantMessage,
      ]);

      appendTimelineEvent(
        createMentorQuestionEvent(
          trimmedContent,
        ),
      );
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
          {selectedPigment
            ? `Context: ${selectedPigment} · Level ${currentLevel} to Level ${targetLevel}`
            : `Level ${currentLevel} to Level ${targetLevel} · ${porosity} porosity`}
        </p>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <HairSessionSummary
          currentLevel={currentLevel}
          targetLevel={targetLevel}
          porosity={porosity}
          selectedPigment={selectedPigment}
        />

        <div className="space-y-5">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
            />
          ))}

          {isSubmitting ? (
            <TypingIndicator />
          ) : null}
        </div>

        <PromptSuggestions
          suggestions={suggestions}
          disabled={isSubmitting}
          onSelect={handleSubmit}
        />
      </div>

      <ChatInput
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
    </section>
  );
}