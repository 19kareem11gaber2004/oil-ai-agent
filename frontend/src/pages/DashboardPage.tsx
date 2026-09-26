import DashboardHero from "../components/dashboard/DashboardHero";
import StatCards from "../components/dashboard/StatCards";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import StorageAnalytics from "../components/dashboard/StorageAnalytics";
import RecentDocuments from "../components/dashboard/RecentDocuments";
import RecentChats from "../components/dashboard/RecentChats";
import RecentActivity from "../components/dashboard/RecentActivity";
import SystemStatus from "../components/dashboard/SystemStatus";
import QuickActions from "../components/dashboard/QuickActions";

import useDashboard from "../hooks/useDashboard";

export default function DashboardPage() {
  const {
    stats,
    loading,
    error,
  } = useDashboard();

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <DashboardHero />

      <StatCards
        stats={stats}
        loading={loading}
      />

      <div className="grid gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <AnalyticsChart />
        </div>

        <StorageAnalytics />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <RecentDocuments
          documents={stats?.recentDocuments ?? []}
          loading={loading}
        />

        <RecentChats />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <RecentActivity />
        <SystemStatus />
      </div>

      <QuickActions />
    </div>
  );
}