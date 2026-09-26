import {
  getDocuments,
  type Document,
} from "./document.service";

export interface DashboardStats {
  totalDocuments: number;
  indexedDocuments: number;
  processingDocuments: number;
  failedDocuments: number;
  totalStorage: number;
  recentDocuments: Document[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const documents = await getDocuments();

  return {
    totalDocuments: documents.length,

    indexedDocuments: documents.filter(
      (doc) => doc.status === "indexed"
    ).length,

    processingDocuments: documents.filter(
      (doc) => doc.status === "processing"
    ).length,

    failedDocuments: documents.filter(
      (doc) => doc.status === "failed"
    ).length,

    totalStorage: documents.reduce(
      (total, doc) => total + doc.file_size,
      0
    ),

    recentDocuments: [...documents]
      .sort(
        (a, b) =>
          new Date(b.uploaded_at).getTime() -
          new Date(a.uploaded_at).getTime()
      )
      .slice(0, 5),
  };
}