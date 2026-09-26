import {
  ArrowUpRight,
  CalendarDays,
  Sparkles,
} from "lucide-react";

export default function DashboardHero() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-700 p-10 text-white shadow-2xl">

      {/* Background Decorations */}

      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="absolute -bottom-20 left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative flex flex-col justify-between gap-10 lg:flex-row">

        {/* Left */}

        <div className="max-w-2xl">

          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">

            <Sparkles size={16} />

            <span className="text-sm">
              AI Enterprise Workspace
            </span>

          </div>

          <h1 className="mt-6 text-5xl font-bold leading-tight">
            Welcome Back,
            <br />
            Kareem 👋
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-200">
            Manage documents, generate intelligent reports,
            and interact with your AI assistant from one
            unified enterprise dashboard.
          </p>

          <button className="mt-8 flex items-center gap-3 rounded-2xl bg-white px-6 py-4 font-semibold text-slate-900 transition hover:scale-105">

            Open AI Assistant

            <ArrowUpRight size={18} />

          </button>

        </div>

        {/* Right */}

        <div className="flex flex-col justify-between rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur">

          <div>

            <p className="text-sm uppercase tracking-widest text-cyan-200">
              Today
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              {today}
            </h2>

          </div>

          <div className="mt-10 flex items-center gap-3">

            <CalendarDays size={22} />

            <span className="text-slate-200">
              System Running Normally
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}