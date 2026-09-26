from app.database.session import SessionLocal
from app.models.document import DocumentStatus
from app.repositories.document_repository import DocumentRepository
from app.rag.service import rag_service


class DocumentProcessor:
    """Background document processing service."""

    def process_document(
        self,
        document_id: int,
    ) -> None:

        db = SessionLocal()

        try:
            repository = DocumentRepository(db)

            document = repository.get(document_id)

            if document is None:
                return

            repository.update_status(
                document.id,
                DocumentStatus.PROCESSING,
            )

            rag_service.index_document(document)

            repository.update_status(
                document.id,
                DocumentStatus.INDEXED,
            )

        except Exception:
            if document is not None:
                repository.update_status(
                    document.id,
                    DocumentStatus.FAILED,
                )
            raise

        finally:
            db.close()


document_processor = DocumentProcessor()