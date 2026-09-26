from sentence_transformers import SentenceTransformer

from app.config.constants import EMBEDDING_MODEL


class EmbeddingService:
    """Generate embeddings for text."""

    def __init__(self):
        self.model = SentenceTransformer(
            EMBEDDING_MODEL
        )

    def embed(self, text: str) -> list[float]:
        embedding = self.model.encode(
            text,
            normalize_embeddings=True,
        )

        return embedding.tolist()

    def embed_many(
        self,
        texts: list[str],
    ) -> list[list[float]]:
        embeddings = self.model.encode(
            texts,
            normalize_embeddings=True,
        )

        return embeddings.tolist()