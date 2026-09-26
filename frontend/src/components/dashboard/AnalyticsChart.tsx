import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Card from "../common/Card";

const data = [
  { day: "Mon", uploads: 4, questions: 20 },
  { day: "Tue", uploads: 7, questions: 26 },
  { day: "Wed", uploads: 5, questions: 18 },
  { day: "Thu", uploads: 9, questions: 35 },
  { day: "Fri", uploads: 8, questions: 30 },
  { day: "Sat", uploads: 12, questions: 45 },
  { day: "Sun", uploads: 10, questions: 39 },
];

export default function AnalyticsChart() {
  return (
    <Card className="h-[420px]">

      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Weekly Analytics
        </h2>

        <p className="text-sm text-slate-500">
          Uploads and AI activity during the last 7 days
        </p>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>

          <defs>
            <linearGradient id="uploads" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.5}/>
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
            </linearGradient>

            <linearGradient id="questions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.5}/>
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="4 4" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="uploads"
            stroke="#2563eb"
            fill="url(#uploads)"
            strokeWidth={3}
          />

          <Area
            type="monotone"
            dataKey="questions"
            stroke="#06b6d4"
            fill="url(#questions)"
            strokeWidth={3}
          />

        </AreaChart>
      </ResponsiveContainer>

    </Card>
  );
}