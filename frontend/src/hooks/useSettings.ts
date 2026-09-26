import { useEffect, useRef, useState } from "react";

import {
  getSystemCheck,
  type SystemCheckData,
} from "../services/settings.service";

export function useSettings() {
  const [checks, setChecks] = useState<SystemCheckData | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [lastChecked, setLastChecked] = useState("");

  // Ref guard: state updates are async, so a ref is the reliable
  // protection against duplicate requests from double-clicks.
  const runningRef = useRef(false);

  async function checkAll() {
    if (runningRef.current) return;
    runningRef.current = true;

    try {
      setLoading(true);
      setError(null);

      const data = await getSystemCheck();
      setChecks(data);

      setLastChecked(new Date().toLocaleString());
    } catch (err) {
      console.error(err);

      setChecks({
        status: "degraded",
        checks: {
          backend: {
            status: "unhealthy",
            detail: "Cannot reach the backend API.",
          },
        },
      });

      setError("Failed to connect to backend.");
    } finally {
      setLoading(false);
      runningRef.current = false;
    }
  }

  useEffect(() => {
    checkAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    checks,
    lastChecked,
    loading,
    error,
    checkAll,
  };
}
