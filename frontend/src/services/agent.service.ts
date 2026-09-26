import api from "../api/axios";

export interface AgentRequest {
  question: string;
  thread_id?: string | null;
}

export interface AgentSource {
  document: string;
  page: string | number;
  score: number;
}

export interface AgentResponse {
  question: string;
  answer: string;
  thread_id: string;
  sources?: AgentSource[];
}

export async function chatWithAgent(
  body: AgentRequest
): Promise<AgentResponse> {
  const response = await api.post(
    "/agent/chat",
    body
  );

  return response.data.data;
}