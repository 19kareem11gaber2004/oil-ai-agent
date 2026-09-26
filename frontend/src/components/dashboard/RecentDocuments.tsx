import Card from "../common/Card";
import type { Document } from "../../services/document.service";

interface RecentDocumentsProps {
  documents: Document[];
  loading: boolean;
}

function getFileType(filename: string) {
  const extension = filename
    ?.split(".")
    .pop()
    ?.toUpperCase();

  return extension || "Unknown";
}

function StatusBadge({ status }: { status?: string }) {
  const value = status?.toLowerCase();

  let classes =
    "bg-slate-100 text-slate-700";

  if (value === "indexed") {
    classes =
      "bg-green-100 text-green-700";
  } else if (value === "processing") {
    classes =
      "bg-yellow-100 text-yellow-700";
  } else if (value === "failed") {
    classes =
      "bg-red-100 text-red-700";
  }

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${classes}`}
    >
      {status ?? "Unknown"}
    </span>
  );
}

export default function RecentDocuments({
  documents,
  loading,
}: RecentDocumentsProps) {
  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-bold">
          Recent Documents
        </h2>

        <p className="text-sm text-slate-500">
          Latest uploaded files
        </p>
      </div>

      {loading ? (
        <div className="py-10 text-center text-slate-500">
          Loading...
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-sm text-slate-500">
              <th className="pb-4">
                Document
              </th>

              <th>Type</th>

              <th>Status</th>

              <th>Uploaded</th>
            </tr>
          </thead>

          <tbody>
            {documents.map((doc) => (
              <tr
                key={doc.id}
                className="border-b transition hover:bg-slate-50"
              >
                <td className="py-5 font-medium">
                  {doc.filename}
                </td>

                <td>
                  {getFileType(doc.filename)}
                </td>

                <td>
                  <StatusBadge
                    status={doc.status}
                  />
                </td>

                <td className="text-slate-500">
                  {doc.uploaded_at
                    ? new Date(
                        doc.uploaded_at
                      ).toLocaleDateString()
                    : "-"}
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
      )}
    </Card>
  );
}