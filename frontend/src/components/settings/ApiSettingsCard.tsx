import { Globe, Link2 } from "lucide-react";

export default function ApiSettingsCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-900">
        API Configuration
      </h2>

      <div className="space-y-5">

        <div className="flex items-center gap-3">
          <Globe
            className="text-blue-600"
            size={20}
          />

          <div>
            <p className="font-medium">
              Base URL
            </p>

            <p className="text-sm text-slate-500">
              http://localhost:8000/api/v1
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link2
            className="text-green-600"
            size={20}
          />

          <div>
            <p className="font-medium">
              Connection Status
            </p>

            <p className="text-green-600">
              Connected
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}