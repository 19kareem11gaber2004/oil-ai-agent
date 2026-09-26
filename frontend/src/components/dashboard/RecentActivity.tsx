import {
  FileUp,
  Bot,
  FileBarChart,
  CheckCircle2,
} from "lucide-react";

import Card from "../common/Card";
const activities = [
  {
    id: 1,
    title: "Document uploaded",
    description: "Well_Report_2025.pdf",
    time: "2 min ago",
    icon: FileUp,
    color: "text-blue-600 bg-blue-100",
  },
  {
    id: 2,
    title: "AI answered a question",
    description: "Pressure analysis completed",
    time: "8 min ago",
    icon: Bot,
    color: "text-violet-600 bg-violet-100",
  },
  {
    id: 3,
    title: "Report generated",
    description: "Monthly Production Report",
    time: "20 min ago",
    icon: FileBarChart,
    color: "text-emerald-600 bg-emerald-100",
  },
  {
    id: 4,
    title: "Indexing completed",
    description: "3 new documents indexed",
    time: "1 hour ago",
    icon: CheckCircle2,
    color: "text-cyan-600 bg-cyan-100",
  },
];

export default function RecentActivity() {
  return (
    <Card>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Recent Activity
        </h2>

        <p className="text-sm text-slate-500">
          Latest actions inside the platform
        </p>
      </div>

      <div className="space-y-5">

        {activities.map((activity) => {

          const Icon = activity.icon;

          return (

            <div
              key={activity.id}
              className="flex items-start gap-4 rounded-2xl p-3 transition hover:bg-slate-50"
            >

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${activity.color}`}
              >
                <Icon size={22} />
              </div>

              <div className="flex-1">

                <h3 className="font-semibold text-slate-900">
                  {activity.title}
                </h3>

                <p className="text-sm text-slate-500">
                  {activity.description}
                </p>

              </div>

              <span className="text-xs text-slate-400">
                {activity.time}
              </span>

            </div>

          );

        })}

      </div>

    </Card>
  );
}