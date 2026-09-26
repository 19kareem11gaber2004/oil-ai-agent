interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export default function ChatMessage({
  role,
  content,
}: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-3xl rounded-2xl px-4 py-3 shadow-sm ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-white border border-slate-200 text-slate-900"
        }`}
      >
        <p className="mb-1 text-xs font-semibold opacity-70">
          {isUser ? "You" : "AI Assistant"}
        </p>

        <p className="whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </div>
  );
}