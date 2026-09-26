import {
  FileText,
  FileSpreadsheet,
  FileCode2,
} from "lucide-react";

import DeleteDialog from "./DeleteDialog";

import type { Document } from "../../services/document.service";

interface DocumentsTableProps {
  documents: Document[];
  loading: boolean;
  error: string | null;
  onDelete: (id: number) => Promise<void>;
}

function FileIcon(filename?: string) {
  if (!filename) {
    return (
      <FileCode2
        className="text-blue-600"
        size={20}
      />
    );
  }

  const extension = filename
    .split(".")
    .pop()
    ?.toLowerCase();

  switch (extension) {
    case "pdf":
      return (
        <FileText
          className="text-red-500"
          size={20}
        />
      );

    case "xlsx":
    case "xls":
      return (
        <FileSpreadsheet
          className="text-green-600"
          size={20}
        />
      );

    default:
      return (
        <FileCode2
          className="text-blue-600"
          size={20}
        />
      );
  }
}

function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();

  const styles =
    normalized === "indexed"
      ? "bg-green-100 text-green-700"
      : normalized === "processing"
        ? "bg-yellow-100 text-yellow-700"
        : normalized === "failed"
          ? "bg-red-100 text-red-700"
          : "bg-slate-100 text-slate-600";

  const label =
    normalized.charAt(0).toUpperCase() + normalized.slice(1);

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {label}
    </span>
  );
}

export default function DocumentsTable({
  documents,
  loading,
  error,
  onDelete,
}: DocumentsTableProps) {
  if (loading) {
    return (
      <p className="p-6">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p className="p-6 text-red-600">
        {error}
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr className="text-left text-sm text-slate-500">
            <th className="px-6 py-4">
              Document
            </th>

            <th>Status</th>

            <th>Uploaded</th>

            <th className="text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {documents.map((doc) => (
            <tr
              key={doc.id}
              className="border-t transition hover:bg-slate-50"
            >
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  {FileIcon(doc.filename)}

                  <div>
                    <p className="font-semibold text-slate-900">
                      {doc.filename ?? "Unknown Document"}
                    </p>
                  </div>
                </div>
              </td>

              <td>
                <StatusBadge status={doc.status} />
              </td>

              <td>
                {doc.uploaded_at
                  ? new Date(
                      doc.uploaded_at
                    ).toLocaleDateString()
                  : "-"}
              </td>

              <td>
                <div className="flex items-center justify-center">
                  <DeleteDialog
                    fileName={
                      doc.filename ??
                      "Unknown Document"
                    }
                    onDelete={() =>
                      onDelete(doc.id)
                    }
                  />
                </div>
              </td>
            </tr>
          ))}

          {documents.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="py-8 text-center text-slate-500"
              >
                No documents found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}