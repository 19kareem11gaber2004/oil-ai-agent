import api from "../api/axios";

interface DocumentDto {
  id: number;
  original_filename: string;
  stored_filename: string;
  file_size: number;
  status: string;
  created_at: string;
}

export interface Document {
  id: number;
  filename: string;
  uploaded_at: string;
  stored_filename: string;
  file_size: number;
  status: string;
}

function mapDocument(doc: DocumentDto): Document {
  return {
    id: doc.id,
    filename: doc.original_filename,
    uploaded_at: doc.created_at,
    stored_filename: doc.stored_filename,
    file_size: doc.file_size,
    status: doc.status,
  };
}

export async function getDocuments(): Promise<Document[]> {
  const response = await api.get("/documents");

  return response.data.data.map(mapDocument);
}

export async function getDocument(id: number): Promise<Document> {
  const response = await api.get(`/documents/${id}`);

  return mapDocument(response.data.data);
}

export async function uploadDocument(file: File): Promise<Document> {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    "/documents/upload",
    formData
  );

  return mapDocument(response.data.data);
}

export async function deleteDocument(id: number): Promise<void> {
  await api.delete(`/documents/${id}`);
}

export async function reindexDocument(id: number) {
  const response = await api.post(`/documents/${id}/reindex`);

  return response.data.data;
}