import {
  Bot,
  Database,
  FileBarChart,
  FileText,
} from "lucide-react";

import StatCard from "./StatCard";
import type { DashboardStats } from "../../services/dashboard.service.ts";

interface StatCardsProps {
  stats: DashboardStats | null;
  loading: boolean;
}

function formatStorage(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export default function StatCards({
  stats,
  loading,
}: StatCardsProps) {
  if (loading || !stats) {
    return (
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-36 animate-pulse rounded-2xl bg-slate-200"
          />
        ))}
      </section>
    );
  }

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Documents"
        value={stats.totalDocuments.toString()}
        change={`${stats.indexedDocuments} Indexed`}
        icon={FileText}
        color="bg-blue-600"
      />

      <StatCard
        title="Processing"
        value={stats.processingDocuments.toString()}
        change="Documents in queue"
        icon={Bot}
        color="bg-violet-600"
      />

      <StatCard
        title="Failed"
        value={stats.failedDocuments.toString()}
        change="Need attention"
        icon={FileBarChart}
        color="bg-red-600"
      />

      <StatCard
        title="Storage"
        value={formatStorage(stats.totalStorage)}
        change="Total uploaded"
        icon={Database}
        color="bg-cyan-600"
      />
    </section>
  );
}