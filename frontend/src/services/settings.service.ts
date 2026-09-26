import api from "../api/axios";

export interface HealthStatus {
  success: boolean;
  message: string;
  data: unknown;
}

export type CheckState = "healthy" | "unhealthy";

export interface SystemCheckItem {
  status: CheckState;
  detail?: string;
  model?: string;
  chunks?: number;
  indexed_documents?: number;
  tools?: number;
  reports?: number;
}

export interface SystemCheckData {
  status: "healthy" | "degraded";
  checks: Record<string, SystemCheckItem>;
}

export async function getHealthStatus(): Promise<HealthStatus> {
  const response = await api.get("/health");

  return response.data;
}

export async function getDatabaseStatus(): Promise<boolean> {
  try {
    await api.get("/health/database");
    return true;
  } catch {
    return false;
  }
}

export async function getSystemCheck(): Promise<SystemCheckData> {
  const response = await api.get("/health/check-all");

  return response.data.data;
}
