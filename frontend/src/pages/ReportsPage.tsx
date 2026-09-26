import { useState } from "react";

import { useReports } from "../hooks/useReports";
import { getReport } from "../services/report.service";

export default function ReportsPage() {
  const { reports, loading, error, create, remove } = useReports();
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedContent, setSelectedContent] = useState<string | null>(null);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !prompt.trim()) {
      setFormError("Title and prompt are required.");
      return;
    }
    try {
      setGenerating(true);
      setFormError(null);
      await create(title.trim(), prompt.trim());
      setTitle("");
      setPrompt("");
    } catch {
      setFormError("Failed to generate report.");
    } finally {
      setGenerating(false);
    }
  }

  async function handleView(id: number) {
    try {
      const report = await getReport(id);
      setSelectedId(id);
      setSelectedContent(report.content ?? "");
    } catch {
      setSelectedContent("Failed to load report content.");
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Reports</h1>

      <form
        onSubmit={handleGenerate}
        className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            className="w-full rounded-xl border border-slate-200 px-4 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Monthly production summary"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Prompt
          </label>
          <textarea
            className="w-full rounded-xl border border-slate-200 px-4 py-2"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Summarize production trends from indexed documents..."
          />
        </div>

        {formError && <p className="text-sm text-red-600">{formError}</p>}

        <button
          type="submit"
          disabled={generating}
          className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white disabled:opacity-50"
        >
          {generating ? "Generating..." : "Generate Report"}
        </button>
      </form>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr className="text-left text-sm text-slate-500">
              <th className="px-6 py-4">Title</th>
              <th>Created</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={3} className="p-6">
                  Loading...
                </td>
              </tr>
            )}
            {!loading &&
              reports.map((report) => (
                <tr key={report.id} className="border-t hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {report.title}
                  </td>
                  <td>
                    {report.created_at
                      ? new Date(report.created_at).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleView(report.id)}
                        className="rounded-lg border px-3 py-1 text-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() => remove(report.id)}
                        className="rounded-lg border border-red-200 px-3 py-1 text-sm text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            {!loading && reports.length === 0 && !error && (
              <tr>
                <td colSpan={3} className="py-8 text-center text-slate-500">
                  No reports found.
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={3} className="p-6 text-red-600">
                  {error}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedId !== null && selectedContent !== null && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-bold">Report #{selectedId}</h2>
          <p className="whitespace-pre-wrap text-slate-700">
            {selectedContent}
          </p>
        </div>
      )}
    </div>
  );
}
