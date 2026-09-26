import {
  Server,
  Database,
  Brain,
  BadgeInfo,
} from "lucide-react";

export default function SystemInfoCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-900">
        System Information
      </h2>

      <div className="space-y-5">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Server className="text-blue-600" size={20} />
            <span>Backend</span>
          </div>

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            Online
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="text-purple-600" size={20} />
            <span>AI Model</span>
          </div>

          <span>Ollama</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database className="text-green-600" size={20} />
            <span>Database</span>
          </div>

          <span>PostgreSQL</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BadgeInfo className="text-orange-600" size={20} />
            <span>Version</span>
          </div>

          <span>v1.0.0</span>
        </div>

      </div>
    </div>
  );
}