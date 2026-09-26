import { useEffect, useState } from "react";

import {
  getReports,
  generateReport,
  deleteReport,
  type Report,
} from "../services/report.service";

export function useReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchReports() {
    try {
      setLoading(true);
      setError(null);

      const data = await getReports();
      setReports(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load reports.");
    } finally {
      setLoading(false);
    }
  }

  async function create(title: string, prompt: string) {
    try {
      const report = await generateReport({ title, prompt });
      await fetchReports();
      return report;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async function remove(id: number) {
    try {
      await deleteReport(id);
      await fetchReports();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  useEffect(() => {
    fetchReports();
  }, []);

  return {
    reports,
    loading,
    error,
    fetchReports,
    create,
    remove,
  };
}
