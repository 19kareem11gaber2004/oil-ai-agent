import {
  Activity,
  Bot,
  Cpu,
  Database,
  FileText,
  HardDrive,
  RefreshCw,
  Search,
  Server,
} from "lucide-react";

import type { SystemCheckData } from "../../services/settings.service";

interface HealthCardProps {
  checks: SystemCheckData | null;
  loading: boolean;
  lastChecked: string;
  onCheckAll: () => void;
}

const ROWS: Array<{
  key: string;
  label: string;
  icon: typeof Server;
}> = [
  { key: "backend", label: "Backend", icon: Server },
  { key: "database", label: "Database", icon: Database },
  { key: "ollama", label: "Ollama", icon: Cpu },
  { key: "llm", label: "LLM", icon: Bot },
  { key: "vector_store", label: "Vector Store", icon: HardDrive },
  { key: "rag", label: "RAG", icon: Search },
  { key: "agent", label: "Agent", icon: Activity },
  { key: "reports", label: "Reports", icon: FileText },
];

export default function HealthCard({
  checks,
  loading,
  lastChecked,
  onCheckAll,
}: HealthCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Activity className="text-green-600" size={24} />

          <h2 className="text-xl font-bold text-slate-900">
            System Check
          </h2>
        </div>

        <button
          onClick={onCheckAll}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
          />
          {loading ? "Checking..." : "Check All"}
        </button>
      </div>

      <div className="space-y-5">
        {ROWS.map(({ key, label, icon: Icon }) => {
          const check = checks?.checks[key];
          const healthy = check?.status === "healthy";

          return (
            <div key={key}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon size={20} className="text-blue-600" />

                  <span className="font-medium">
                    {label}
                    {check?.model && (
                      <span className="ml-2 text-sm font-normal text-slate-500">
                        {check.model}
                      </span>
                    )}
                  </span>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    check
                      ? healthy
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {!check
                    ? "Not checked"
                    : healthy
                      ? "Healthy"
                      : "Failed"}
                </span>
              </div>

              {check && !healthy && check.detail && (
                <p className="mt-1 pl-8 text-sm text-red-600">
                  {check.detail}
                </p>
              )}
            </div>
          );
        })}

        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-sm text-slate-500">
            Last Checked
          </span>

          <span className="text-sm font-medium text-slate-700">
            {lastChecked}
          </span>
        </div>
      </div>
    </div>
  );
}
