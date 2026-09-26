import { useEffect, useState } from "react";
import {
  getDashboardStats,
  type DashboardStats,
} from "../services/dashboard.service";

export default function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchDashboard() {
    try {
      setLoading(true);
      setError(null);

      const data = await getDashboardStats();

      setStats(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    stats,
    loading,
    error,
    refresh: fetchDashboard,
  };
}