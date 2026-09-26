import { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  loading: boolean;
  onSend: (message: string) => void;
}

export default function ChatInput({
  loading,
  onSend,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!message.trim()) return;

    onSend(message);

    setMessage("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3"
    >
      <input
        type="text"
        placeholder="Ask a question about your documents..."
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        disabled={loading}
        className="flex-1 rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Send size={18} />
        {loading ? "Sending..." : "Send"}
      </button>
    </form>
  );
}