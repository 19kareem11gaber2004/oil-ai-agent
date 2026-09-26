import {
  Search,
  Filter,
  ArrowUpDown,
  RefreshCw,
} from "lucide-react";

export default function DocumentsToolbar() {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      {/* Search */}
      <div className="relative w-full lg:max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search documents..."
          className="
            w-full
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

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 transition hover:bg-slate-100">
          <Filter size={18} />
          Filter
        </button>

        <button className="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 transition hover:bg-slate-100">
          <ArrowUpDown size={18} />
          Sort
        </button>

        <button className="flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700">
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>
    </div>
  );
}