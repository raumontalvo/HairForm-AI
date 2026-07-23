import type { ChatMessage as ChatMessageType } from "@/lib/ai/types";

type ChatMessageProps = {
  message: ChatMessageType;
};

export default function ChatMessage({
  message,
}: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={[
        "flex",
        isUser ? "justify-end" : "justify-start",
      ].join(" ")}
    >
      <article
        className={[
          "max-w-[88%] rounded-3xl px-5 py-4 sm:max-w-[78%]",
          isUser
            ? "bg-amber-300 text-black"
            : "border border-white/10 bg-[#111111] text-white",
        ].join(" ")}
      >
        <p className="whitespace-pre-wrap text-sm leading-7">
          {message.content}
        </p>

        <p
          className={[
            "mt-3 text-xs",
            isUser ? "text-black/50" : "text-white/30",
          ].join(" ")}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
      </article>
    </div>
  );
}