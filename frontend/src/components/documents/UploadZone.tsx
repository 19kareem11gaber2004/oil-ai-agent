import { useState } from "react";
import { CloudUpload, FileText } from "lucide-react";

interface UploadZoneProps {
  onUpload: (file: File) => Promise<void>;
}

export default function UploadZone({
  onUpload,
}: UploadZoneProps) {
  const [uploading, setUploading] = useState(false);

  async function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = event.target.files;

    if (!files || files.length === 0) return;

    try {
      setUploading(true);

      for (const file of Array.from(files)) {
        await onUpload(file);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <section
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border-2
        border-dashed
        border-slate-300
        bg-gradient-to-br
        from-slate-50
        to-blue-50
        p-12
        transition-all
        duration-300
        hover:border-blue-500
        hover:bg-blue-50
      "
    >
      <input
        type="file"
        multiple
        disabled={uploading}
        className="absolute inset-0 cursor-pointer opacity-0 disabled:cursor-not-allowed"
        onChange={handleChange}
      />

      <div className="flex flex-col items-center text-center">
        <div
          className="
            mb-6
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-full
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            text-white
            shadow-xl
            transition-transform
            group-hover:scale-110
          "
        >
          <CloudUpload size={42} />
        </div>

        <h2 className="text-3xl font-bold text-slate-900">
          Drag & Drop Documents
        </h2>

        <p className="mt-4 max-w-xl text-slate-500">
          Upload PDF, DOCX, TXT, or Excel files to build your AI knowledge
          base.
        </p>

        <button
          type="button"
          disabled={uploading}
          className="
            mt-8
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            px-8
            py-4
            font-semibold
            text-white
            shadow-lg
            transition
            hover:scale-105
            disabled:cursor-not-allowed
            disabled:opacity-70
          "
        >
          {uploading ? "Uploading..." : "Browse Files"}
        </button>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <span className="rounded-full bg-white px-4 py-2 shadow">
            <FileText size={16} className="mr-2 inline" />
            PDF
          </span>

          <span className="rounded-full bg-white px-4 py-2 shadow">
            DOCX
          </span>

          <span className="rounded-full bg-white px-4 py-2 shadow">
            XLSX
          </span>

          <span className="rounded-full bg-white px-4 py-2 shadow">
            TXT
          </span>
        </div>
      </div>
    </section>
  );
}