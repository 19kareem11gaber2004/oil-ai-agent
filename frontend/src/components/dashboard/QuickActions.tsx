import {
  Upload,
  Bot,
  FileBarChart,
  FolderOpen,
} from "lucide-react";

import Card from "../common/Card";
const actions = [
  {
    title: "Upload Documents",
    description: "Add new files to the knowledge base",
    icon: Upload,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Ask AI",
    description: "Chat with the intelligent assistant",
    icon: Bot,
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Generate Report",
    description: "Create AI-powered reports",
    icon: FileBarChart,
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Browse Files",
    description: "Manage uploaded documents",
    icon: FolderOpen,
    color: "from-orange-500 to-red-500",
  },
];

export default function QuickActions() {
  return (
    <Card>

      <div className="mb-6">

        <h2 className="text-xl font-bold">
          Quick Actions
        </h2>

        <p className="text-sm text-slate-500">
          Frequently used operations
        </p>

      </div>

      <div className="space-y-4">

        {actions.map((action) => {

          const Icon = action.icon;

          return (

            <button
              key={action.title}
              className="
                group
                flex
                w-full
                items-center
                gap-4
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                text-left
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-500
                hover:shadow-lg
              "
            >

              <div
                className={`
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-r
                  ${action.color}
                  text-white
                `}
              >
                <Icon size={24} />
              </div>

              <div className="flex-1">

                <h3 className="font-semibold text-slate-900 group-hover:text-blue-600">
                  {action.title}
                </h3>

                <p className="text-sm text-slate-500">
                  {action.description}
                </p>

              </div>

            </button>

          );

        })}

      </div>

    </Card>
  );
}