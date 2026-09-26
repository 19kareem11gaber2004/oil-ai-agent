import ChatMessage from "./ChatMessage";
import type { ChatMessage as Message } from "../../hooks/useAgent";

interface ChatWindowProps {
  messages: Message[];
  loading: boolean;
}

export default function ChatWindow({
  messages,
  loading,
}: ChatWindowProps) {
  return (
    <div className="flex h-[500px] flex-col gap-4 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-6">
      {messages.length === 0 && (
        <div className="m-auto text-center text-slate-500">
          <h2 className="text-xl font-semibold">
            Welcome 👋
          </h2>

          <p className="mt-2">
            Ask any question about your uploaded
            documents.
          </p>
        </div>
      )}

      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          role={message.role}
          content={message.content}
        />
      ))}

      {loading && (
        <div className="text-sm text-slate-500">
          AI Assistant is typing...
        </div>
      )}
    </div>
  );
}