import {
  LayoutDashboard,
  FileText,
 Bot,
  BarChart3,
  Settings,
  Database,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menu = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Documents",
    href: "/documents",
    icon: FileText,
  },
  {
    title: "AI Agent",
    href: "/agent",
    icon: Bot,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950">

      {/* Logo */}
      <div className="border-b border-slate-800 p-8">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-xl font-bold text-white">
            AI
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              Oil AI
            </h1>

            <p className="text-sm text-slate-400">
              Enterprise Platform
            </p>
          </div>

        </div>

      </div>

      {/* Menu */}

      <nav className="flex-1 space-y-2 p-5">

        {menu.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-2xl px-5 py-4 transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`
              }
            >
              <Icon size={22} />

              <span className="font-medium">
                {item.title}
              </span>

            </NavLink>
          );
        })}

      </nav>

      {/* Storage */}

      <div className="m-5 rounded-3xl bg-slate-900 p-5">

        <div className="mb-4 flex items-center gap-3">

          <Database className="text-cyan-400" />

          <h3 className="font-semibold text-white">
            Storage
          </h3>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-700">

          <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600" />

        </div>

        <p className="mt-3 text-sm text-slate-400">
          3.8 GB / 5 GB Used
        </p>

      </div>

      {/* Footer */}

      <div className="border-t border-slate-800 p-5">

        <p className="text-center text-xs text-slate-500">
          Version 1.0.0
        </p>

      </div>

    </aside>
  );
}