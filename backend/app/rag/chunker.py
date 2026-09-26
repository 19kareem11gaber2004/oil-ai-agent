from typing import List


class TextChunker:
    """Split text into fixed-size chunks."""

    def chunk(
        self,
        text: str,
        chunk_size: int = 1000,
        overlap: int = 200,
    ) -> List[str]:
        chunks = []

        start = 0

        while start < len(text):
            end = start + chunk_size

            chunks.append(text[start:end])

            start += chunk_size - overlap

        return chunks