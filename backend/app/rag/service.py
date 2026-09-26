from pathlib import Path
from uuid import uuid4

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.config.constants import (
    CHUNK_SIZE,
    CHUNK_OVERLAP,
    UPLOAD_DIRECTORY,
)
from app.llm.model import llm
from app.llm.prompts import RAG_PROMPT
from app.rag.embeddings import EmbeddingService
from app.rag.retriever import retriever
from app.rag.vector_store import vector_store


class RAGService:
    """Retrieval-Augmented Generation service."""

    def __init__(self):
        self.embedder = EmbeddingService()

        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=CHUNK_SIZE,
            chunk_overlap=CHUNK_OVERLAP,
        )

    def ask(self, question: str) -> dict:
        """
        Search indexed documents and generate an answer.
        """

        documents = retriever.search(question)

        if not documents:
            return {
                "answer": "I couldn't find that information in the uploaded documents.",
                "sources": [],
            }

        context = "\n\n".join(
            document["text"] for document in documents
        )

        prompt = RAG_PROMPT.format(
            context=context,
            question=question,
        )

        response = llm.invoke(prompt)

        sources = []

        for document in documents:
            sources.append(
                {
                    "document": document["metadata"].get(
                        "document_name",
                        "Unknown",
                    ),
                    "page": document["metadata"].get(
                        "page",
                        "?",
                    ),
                    "score": round(
                        (1 - document["distance"]) * 100,
                        1,
                    ),
                }
            )

        return {
            "answer": response.content,
            "sources": sources,
        }

    def index_document(self, document) -> None:
        """
        Read a PDF, split it into chunks, generate embeddings,
        and store them in ChromaDB.
        """

        file_path = Path(UPLOAD_DIRECTORY) / document.stored_filename

        loader = PyPDFLoader(str(file_path))
        pages = loader.load()

        chunks = self.text_splitter.split_documents(pages)

        texts = []
        metadatas = []
        ids = []

        for chunk in chunks:
            texts.append(chunk.page_content)

            metadatas.append(
                {
                    "document_id": str(document.id),
                    "document_name": document.original_filename,
                    "page": chunk.metadata.get("page", 0),
                }
            )

            ids.append(str(uuid4()))

        embeddings = self.embedder.embed_many(texts)

        vector_store.add_documents(
            texts=texts,
            embeddings=embeddings,
            metadatas=metadatas,
            ids=ids,
        )


rag_service = RAGService()