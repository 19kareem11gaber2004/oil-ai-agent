import {
  Bell,
  Search,
  Sun,
} from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur-xl">

      {/* Left */}

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500">
          Welcome back to your AI workspace.
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Search */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            placeholder="Search..."
            className="
              w-80
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              py-3
              pl-11
              pr-4
              outline-none
              transition
              focus:border-blue-500
              focus:bg-white
            "
          />

        </div>

        {/* Theme */}

        <button className="rounded-xl border border-slate-200 p-3 transition hover:bg-slate-100">
          <Sun size={20} />
        </button>

        {/* Notification */}

        <button className="relative rounded-xl border border-slate-200 p-3 transition hover:bg-slate-100">

          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />

        </button>

        {/* User */}

        <button className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 transition hover:shadow-md">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-white">
            K
          </div>

          <div className="text-left">

            <h3 className="font-semibold text-slate-900">
              Kareem
            </h3>

            <p className="text-xs text-slate-500">
              AI Engineer
            </p>

          </div>

        </button>

      </div>

    </header>
  );
}