import Card from "../common/Card";
import { Bot } from "lucide-react";

const chats = [
  "Pressure Analysis Report",
  "Oil Temperature Summary",
  "Safety Guidelines",
  "Production Forecast",
  "Equipment Maintenance",
];

export default function RecentChats() {
  return (
    <Card>

      <div className="mb-6">

        <h2 className="text-xl font-bold">
          Recent AI Chats
        </h2>

        <p className="text-sm text-slate-500">
          Latest conversations
        </p>

      </div>

      <div className="space-y-3">

        {chats.map((chat) => (

          <div
            key={chat}
            className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 transition hover:bg-blue-50"
          >

            <div className="rounded-xl bg-blue-100 p-3">
              <Bot
                size={18}
                className="text-blue-600"
              />
            </div>

            <div className="flex-1">

              <h3 className="font-medium">
                {chat}
              </h3>

              <p className="text-xs text-slate-500">
                2 minutes ago
              </p>

            </div>

          </div>

        ))}

      </div>

    </Card>
  );
}