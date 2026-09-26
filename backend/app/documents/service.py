from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.core.exceptions import OilAIAgentException
from app.models.document import Document, DocumentStatus
from app.repositories.document_repository import DocumentRepository
from app.rag.vector_store import vector_store
from app.rag.service import rag_service

from app.config.constants import UPLOAD_DIRECTORY

UPLOAD_DIR = Path(UPLOAD_DIRECTORY)
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

MAX_FILE_SIZE = 20 * 1024 * 1024  # 20 MB

ALLOWED_CONTENT_TYPES = {
    "application/pdf",
}


class DocumentService:
    """Handles document validation, storage, retrieval, and deletion."""

    def validate_document(self, file: UploadFile) -> None:
        """Validate the uploaded document."""

        if not file.filename:
            raise OilAIAgentException(
                message="No file selected.",
                status_code=400,
            )

        if file.content_type not in ALLOWED_CONTENT_TYPES:
            raise OilAIAgentException(
                message="Only PDF files are allowed.",
                status_code=400,
            )

    async def save_document(
        self,
        file: UploadFile,
        db: Session,
    ) -> dict:
        """Validate and save an uploaded document."""

        self.validate_document(file)

        extension = Path(file.filename).suffix
        unique_filename = f"{uuid4()}{extension}"

        file_path = UPLOAD_DIR / unique_filename

        content = await file.read()

        if len(content) == 0:
            raise OilAIAgentException(
                message="Uploaded file is empty.",
                status_code=400,
            )

        if len(content) > MAX_FILE_SIZE:
            raise OilAIAgentException(
                message="File size exceeds 20 MB.",
                status_code=400,
            )

        with open(file_path, "wb") as f:
            f.write(content)

        repository = DocumentRepository(db)

        document = Document(
            original_filename=file.filename,
            stored_filename=unique_filename,
            mime_type=file.content_type,
            file_size=len(content),
            status=DocumentStatus.UPLOADED,
        )

        document = repository.create(document)

        return self._to_dict(document)

    def list_documents(
        self,
        db: Session,
    ) -> list[dict]:
        """Return all documents."""

        repository = DocumentRepository(db)

        documents = repository.list_all()

        return [
            self._to_dict(document)
            for document in documents
        ]

    def get_document(
        self,
        document_id: int,
        db: Session,
    ) -> dict:
        """Return a document by ID."""

        repository = DocumentRepository(db)

        document = repository.get(document_id)

        if document is None:
            raise OilAIAgentException(
                message="Document not found.",
                status_code=404,
            )

        return self._to_dict(document)

    def delete_document(
        self,
        document_id: int,
        db: Session,
    ) -> None:
        """Delete a document."""

        repository = DocumentRepository(db)

        document = repository.get(document_id)

        if document is None:
            raise OilAIAgentException(
                message="Document not found.",
                status_code=404,
            )

        file_path = UPLOAD_DIR / document.stored_filename

        if file_path.exists():
            file_path.unlink()

        try:
            vector_store.delete_document(document.id)
        except Exception:
            # Ignore if document is not indexed yet.
            pass

        repository.delete(document)

    def get_document_status(
        self,
        document_id: int,
        db: Session,
    ) -> dict:
        """Return only the document status."""

        repository = DocumentRepository(db)

        document = repository.get(document_id)

        if document is None:
            raise OilAIAgentException(
                message="Document not found.",
                status_code=404,
            )

        return {
            "id": document.id,
            "status": document.status.value,
        }

    @staticmethod
    def _to_dict(document: Document) -> dict:
        """Convert a Document model into a serializable dictionary."""

        return {
            "id": document.id,
            "original_filename": document.original_filename,
            "stored_filename": document.stored_filename,
            "file_size": document.file_size,
            "status": document.status.value,
            "created_at": document.created_at,
        }

    def reindex_document(
        self,
        document_id: int,
        db: Session,
    ) -> dict:
        """Delete old embeddings then rebuild the vector index."""

        repository = DocumentRepository(db)

        document = repository.get(document_id)

        if document is None:
            raise OilAIAgentException(
                message="Document not found.",
                status_code=404,
            )

        repository.update_status(
            document.id,
            DocumentStatus.PROCESSING,
        )

        try:
            # Remove previous embeddings if they exist.
            try:
                vector_store.delete_document(document.id)
            except Exception:
                pass

            # Build the new index.
            rag_service.index_document(document)

            repository.update_status(
                document.id,
                DocumentStatus.INDEXED,
            )

        except Exception:
            repository.update_status(
                document.id,
                DocumentStatus.FAILED,
            )
            raise

        document = repository.get(document.id)

        return {
            "id": document.id,
            "status": document.status.value,
        }

document_service = DocumentService()