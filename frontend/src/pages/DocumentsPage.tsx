import DocumentsHeader from "../components/documents/DocumentsHeader";
import DocumentsToolbar from "../components/documents/DocumentToolbar";
import UploadZone from "../components/documents/UploadZone";
import DocumentsTable from "../components/documents/DocumentsTable";
import Pagination from "../components/documents/Pagination";

import { useDocuments } from "../hooks/useDocuments";

export default function DocumentsPage() {
  const {
    documents,
    loading,
    error,
    upload,
    remove,
    
  } = useDocuments();

  return (
    <div className="space-y-8">
      <DocumentsHeader />

      <DocumentsToolbar />

      <UploadZone onUpload={upload} />

      <DocumentsTable
        documents={documents}
        loading={loading}
        error={error}
        onDelete={remove}
        
      />

      <Pagination />
    </div>
  );
}