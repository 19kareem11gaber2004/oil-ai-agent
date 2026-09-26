import { Settings } from "lucide-react";

export default function SettingsHeader() {
  return (
    <section className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white shadow-lg">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
          <Settings size={28} />
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            Settings
          </h1>

          <p className="mt-1 text-slate-300">
            Manage your Oil AI Agent configuration and system information.
          </p>
        </div>
      </div>
    </section>
  );
}