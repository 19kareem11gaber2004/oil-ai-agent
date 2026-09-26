import SettingsHeader from "../components/settings/SettingsHeader";
import SystemInfoCard from "../components/settings/SystemInfoCard";
import ApiSettingsCard from "../components/settings/ApiSettingsCard";
import AppSettingsCard from "../components/settings/AppSettingsCard";
import HealthCard from "../components/settings/HealthCard";

import { useSettings } from "../hooks/useSettings";

export default function SettingsPage() {
  const { checks, lastChecked, loading, error, checkAll } =
    useSettings();

  return (
    <div className="space-y-8">
      <SettingsHeader />

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <SystemInfoCard />

        <HealthCard
          checks={checks}
          loading={loading}
          lastChecked={lastChecked}
          onCheckAll={checkAll}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ApiSettingsCard />

        <AppSettingsCard />
      </div>

      {loading && (
        <p className="text-center text-slate-500">
          Checking system status...
        </p>
      )}
    </div>
  );
}
