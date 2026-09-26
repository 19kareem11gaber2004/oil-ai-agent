import {
  Server,
  Database,
  Bot,
  HardDrive,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import Card from "../common/Card";
const services = [
  {
    name: "Backend API",
    value: "Online",
    icon: Server,
  },
  {
    name: "AI Model",
    value: "Running",
    icon: Bot,
  },
  {
    name: "Database",
    value: "Connected",
    icon: Database,
  },
  {
    name: "Vector Store",
    value: "Ready",
    icon: HardDrive,
  },
];

export default function SystemStatus() {
  return (
    <Card>

      <div className="mb-6">

        <h2 className="text-xl font-bold text-slate-900">
          System Status
        </h2>

        <p className="text-sm text-slate-500">
          Infrastructure monitoring
        </p>

      </div>

      <div className="space-y-4">

        {services.map((service) => {

          const Icon = service.icon;

          return (

            <div
              key={service.name}
              className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
            >

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-blue-100 p-3">
                  <Icon
                    size={20}
                    className="text-blue-600"
                  />
                </div>

                <div>

                  <p className="font-medium text-slate-900">
                    {service.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    Healthy
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1">

                <CheckCircle2
                  size={15}
                  className="text-green-600"
                />

                <span className="text-sm font-semibold text-green-700">
                  {service.value}
                </span>

              </div>

            </div>

          );

        })}

      </div>

      <div className="mt-6 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-5 text-white">

        <div className="flex items-center gap-3">

          <Clock3 size={20} />

          <span className="font-semibold">
            Average AI Response Time
          </span>

        </div>

        <h2 className="mt-4 text-4xl font-bold">
          1.2s
        </h2>

        <p className="mt-2 text-blue-100">
          Faster than 94% of requests
        </p>

      </div>

    </Card>
  );
}