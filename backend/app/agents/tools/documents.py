from langchain_core.tools import tool

from app.database.session import SessionLocal
from app.documents.service import document_service


@tool
def list_documents() -> dict:
    """
    List all uploaded documents.
    """

    db = SessionLocal()

    try:
        documents = document_service.list_documents(db)

        if not documents:
            return {
                "success": True,
                "documents": [],
            }

        return {
            "success": True,
            "documents": [
                {
                    "id": document["id"],
                    "filename": document["original_filename"],
                    "status": document["status"],
                    "size": document["file_size"],
                    "uploaded_at": str(document["created_at"]),
                }
                for document in documents
            ],
        }

    finally:
        db.close()