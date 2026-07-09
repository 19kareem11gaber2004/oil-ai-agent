from pydantic import BaseModel


class DocumentUploadResponse(BaseModel):
    original_filename: str
    stored_filename: str
    file_size: int