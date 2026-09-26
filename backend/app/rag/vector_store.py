import chromadb

from app.config.constants import CHROMA_DIRECTORY


class VectorStore:
    """Manage ChromaDB operations."""

    def __init__(self):
        self.client = chromadb.PersistentClient(
            path=CHROMA_DIRECTORY
        )

        self.collection = self.client.get_or_create_collection(
            name="oil_documents"
        )

    def add_documents(
        self,
        texts: list[str],
        embeddings: list[list[float]],
        metadatas: list[dict],
        ids: list[str],
    ):
        self.collection.add(
            documents=texts,
            embeddings=embeddings,
            metadatas=metadatas,
            ids=ids,
        )

    def search(
        self,
        query_embedding: list[float],
        n_results: int = 5,
    ):
        return self.collection.query(
            query_embeddings=[query_embedding],
            n_results=n_results,
        )

    def delete_document(
        self,
        document_id: int,
    ):
        self.collection.delete(
            where={
                "document_id": str(document_id),
            }
        )


vector_store = VectorStore()