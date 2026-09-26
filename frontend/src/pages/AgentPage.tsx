import useAgent from "../hooks/useAgent";

import ChatInput from "../components/agent/ChatInput";
import ChatWindow from "../components/agent/ChatWindow";

export default function AgentPage() {
  const {
    messages,
    loading,
    sendMessage,
    clearChat,
  } = useAgent();

  return (
    <div className="mx-auto flex h-[calc(100vh-120px)] max-w-5xl flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            AI Agent
          </h1>

          <p className="mt-2 text-slate-500">
            Ask questions about your uploaded documents.
          </p>
        </div>

        <button
          onClick={clearChat}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm transition hover:bg-slate-100"
        >
          New Chat
        </button>
      </div>

      {/* Chat Window */}
      <ChatWindow
        messages={messages}
        loading={loading}
      />

      {/* Chat Input */}
      <ChatInput
        loading={loading}
        onSend={sendMessage}
      />
    </div>
  );
}