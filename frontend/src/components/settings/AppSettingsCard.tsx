import {
  Bell,
  Moon,
  Palette,
} from "lucide-react";

export default function AppSettingsCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-900">
        Application Settings
      </h2>

      <div className="space-y-6">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell size={20} />
            <span>Notifications</span>
          </div>

          <span className="text-slate-500">
            Coming Soon
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Moon size={20} />
            <span>Dark Mode</span>
          </div>

          <span className="text-slate-500">
            Coming Soon
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Palette size={20} />
            <span>Theme</span>
          </div>

          <span className="text-slate-500">
            Coming Soon
          </span>
        </div>

      </div>
    </div>
  );
}