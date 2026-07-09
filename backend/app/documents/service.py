from pathlib import Path

from fastapi import UploadFile

from app.core.exceptions import OilAIAgentException
from pathlib import Path
from uuid import uuid4


UPLOAD_DIR = Path("uploads/documents")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

MAX_FILE_SIZE = 20 * 1024 * 1024  # 20 MB
ALLOWED_CONTENT_TYPES = {
    "application/pdf",
}
class DocumentService:

    def validate_document(self, file: UploadFile):

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

    async def save_document(self, file: UploadFile):

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

        return {
                "original_filename": file.filename,
                "stored_filename": unique_filename,
                "file_size": len(content),
}
def validate_document(self, file: UploadFile):

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


document_service = DocumentService()