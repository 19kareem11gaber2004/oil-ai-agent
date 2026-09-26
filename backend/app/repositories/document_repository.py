from sqlalchemy.orm import Session

from app.models.document import Document, DocumentStatus


class DocumentRepository:
    """Repository for document database operations."""

    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        document: Document,
    ) -> Document:
        """Create a new document."""

        self.db.add(document)
        self.db.commit()
        self.db.refresh(document)

        return document

    def list_all(self) -> list[Document]:
        """Return all documents."""

        return (
            self.db.query(Document)
            .order_by(Document.created_at.desc())
            .all()
        )

    def get(
        self,
        document_id: int,
    ) -> Document | None:
        """Return a document by ID."""

        return (
            self.db.query(Document)
            .filter(Document.id == document_id)
            .first()
        )

    def update_status(
        self,
        document_id: int,
        status: DocumentStatus,
    ) -> Document | None:
        """Update a document status."""

        document = self.get(document_id)

        if document is None:
            return None

        document.status = status

        self.db.commit()
        self.db.refresh(document)

        return document

    def delete(
        self,
        document: Document,
    ) -> None:
        """Delete a document."""

        self.db.delete(document)
        self.db.commit()