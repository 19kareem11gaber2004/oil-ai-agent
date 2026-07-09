from fastapi import APIRouter, File, UploadFile

from app.documents.schema import DocumentUploadResponse
from app.documents.service import document_service
from app.schemas.response import APIResponse

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


@router.post("/upload", response_model=APIResponse)
async def upload_document(
    file: UploadFile = File(...),
):
    result = await document_service.save_document(file)

    return APIResponse(
        success=True,
        message="Document uploaded successfully.",
        data=DocumentUploadResponse(**result),
    )