import { TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Card from "../common/Card";

interface Props {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
}

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  color,
}: Props) {
  return (
    <Card>
      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            {value}
          </h2>

          <div className="mt-4 flex items-center gap-2">

            <TrendingUp
              size={16}
              className="text-green-500"
            />

            <span className="text-sm font-semibold text-green-600">
              {change}
            </span>

          </div>

        </div>

        <div
          className={`rounded-2xl p-4 ${color}`}
        >
          <Icon
            size={28}
            className="text-white"
          />
        </div>

      </div>
    </Card>
  );
}