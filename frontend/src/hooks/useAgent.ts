import { useState } from "react";
import {
  chatWithAgent,
  type AgentResponse,
} from "../services/agent.service";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function useAgent() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function sendMessage(question: string) {
    if (!question.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: question,
      },
    ]);

    setLoading(true);

    try {
      const result: AgentResponse = await chatWithAgent({
        question,
        thread_id: threadId,
      });

      setThreadId(result.thread_id);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: result.answer,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    setMessages([]);
    setThreadId(null);
  }

  return {
    messages,
    loading,
    sendMessage,
    clearChat,
  };
}