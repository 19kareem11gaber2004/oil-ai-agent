import { FileText, Upload } from "lucide-react";
import { Button } from "../ui/button";

interface DocumentsHeaderProps {
  totalDocuments?: number;
  onUpload?: () => void;
}

export default function DocumentsHeader({
  totalDocuments = 0,
  onUpload,
}: DocumentsHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
          <FileText className="h-8 w-8 text-blue-600" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Documents
          </h1>

          <p className="mt-1 text-slate-500">
            Upload, manage, search, and process your enterprise documents.
          </p>

          <p className="mt-3 text-sm font-medium text-slate-600">
            {totalDocuments} Documents Available
          </p>
        </div>
      </div>

      <Button
        onClick={onUpload}
        size="lg"
        className="gap-2 rounded-xl"
      >
        <Upload className="h-5 w-5" />
        Upload Document
      </Button>
    </div>
  );
}