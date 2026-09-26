from fastapi import APIRouter, BackgroundTasks, Depends, File, UploadFile
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.documents.schema import DocumentResponse
from app.documents.service import document_service
from app.rag.processor import document_processor
from app.schemas.response import APIResponse

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


@router.post("/upload", response_model=APIResponse)
async def upload_document(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    """
    Upload a document and start indexing in the background.
    """

    result = await document_service.save_document(
        file=file,
        db=db,
    )

    # Start document indexing asynchronously.
    background_tasks.add_task(
        document_processor.process_document,
        result["id"],
    )

    return APIResponse(
        success=True,
        message="Document uploaded successfully.",
        data=DocumentResponse(**result),
    )


@router.get("", response_model=APIResponse)
def list_documents(
    db: Session = Depends(get_db),
):
    """
    Retrieve all uploaded documents.
    """

    documents = document_service.list_documents(db)

    return APIResponse(
        success=True,
        message="Documents retrieved successfully.",
        data=documents,
    )


@router.get("/{document_id}", response_model=APIResponse)
def get_document(
    document_id: int,
    db: Session = Depends(get_db),
):
    """
    Retrieve a document by its ID.
    """

    result = document_service.get_document(
        document_id=document_id,
        db=db,
    )

    return APIResponse(
        success=True,
        message="Document retrieved successfully.",
        data=result,
    )


@router.delete("/{document_id}", response_model=APIResponse)
def delete_document(
    document_id: int,
    db: Session = Depends(get_db),
):
    """
    Delete a document by its ID.
    """

    document_service.delete_document(
        document_id=document_id,
        db=db,
    )

    return APIResponse(
        success=True,
        message="Document deleted successfully.",
        data=None,
    )
@router.post("/{document_id}/reindex")
def reindex_document(
    document_id: int,
    db: Session = Depends(get_db),
):

    result = document_service.reindex_document(
        document_id=document_id,
        db=db,
    )

    return APIResponse(
        success=True,
        message="Document reindexed successfully.",
        data=result,
    )