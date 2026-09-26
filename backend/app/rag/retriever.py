from app.config.constants import (
    DEFAULT_MAX_DISTANCE,
    DEFAULT_TOP_K,
)
from app.rag.embeddings import EmbeddingService
from app.rag.vector_store import vector_store


class Retriever:
    """Retrieve relevant document chunks."""

    def __init__(self):
        self.embedder = EmbeddingService()

    def search(
        self,
        query: str,
        n_results: int = DEFAULT_TOP_K,
        max_distance: float = DEFAULT_MAX_DISTANCE,
    ) -> list[dict]:
        """Search the vector store and return relevant document chunks."""

        query_embedding = self.embedder.embed(query)

        results = vector_store.search(
            query_embedding=query_embedding,
            n_results=n_results,
        )

        doc_lists = (results.get("documents") or [[]])
        meta_lists = (results.get("metadatas") or [[]])
        dist_lists = (results.get("distances") or [[]])

        if not doc_lists or not doc_lists[0]:
            return []

        documents = doc_lists[0]
        metadatas = meta_lists[0] if meta_lists else []
        distances = dist_lists[0] if dist_lists else []

        retrieved: list[dict] = []

        for document, metadata, distance in zip(
            documents,
            metadatas,
            distances,
        ):
            if distance <= max_distance:
                retrieved.append(
                    {
                        "text": document,
                        "metadata": metadata,
                        "distance": distance,
                    }
                )

        return retrieved


retriever = Retriever()