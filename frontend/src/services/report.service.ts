import api from "../api/axios";

export interface Report {
  id: number;
  title: string;
  prompt?: string;
  content?: string;
  created_at: string;
}

export interface GenerateReportRequest {
  title: string;
  prompt: string;
}

export async function getReports(): Promise<Report[]> {
  const response = await api.get("/reports");

  return response.data.data;
}

export async function getReport(id: number): Promise<Report> {
  const response = await api.get(`/reports/${id}`);

  return response.data.data;
}

export async function generateReport(
  body: GenerateReportRequest
): Promise<Report> {
  const response = await api.post("/reports/generate", body);

  return response.data.data;
}

export async function deleteReport(id: number): Promise<void> {
  await api.delete(`/reports/${id}`);
}
