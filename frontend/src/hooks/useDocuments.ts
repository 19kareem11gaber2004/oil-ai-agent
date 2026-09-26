import { useEffect, useState } from "react";

import {
  getDocuments,
  uploadDocument,
  deleteDocument,
  reindexDocument,
  type Document,
} from "../services/document.service";

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchDocuments() {
    try {
      setLoading(true);
      setError(null);

      const data = await getDocuments();
      setDocuments(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load documents.");
    } finally {
      setLoading(false);
    }
  }

  async function upload(file: File) {
    try {
      await uploadDocument(file);
      await fetchDocuments();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async function remove(id: number) {
    try {
      await deleteDocument(id);
      await fetchDocuments();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async function reindex(id: number) {
    try {
      await reindexDocument(id);
      await fetchDocuments();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  useEffect(() => {
    fetchDocuments();
  }, []);

  return {
    documents,
    loading,
    error,
    fetchDocuments,
    upload,
    remove,
    reindex,
  };
}