from fastapi import APIRouter

from app.config.settings import settings
from app.core.exceptions import OilAIAgentException
from app.schemas.response import APIResponse

router = APIRouter(
    prefix="/health",
    tags=["Health"],
)


@router.get("/", response_model=APIResponse)
def health_check():
    return APIResponse(
        success=True,
        message="Health check completed successfully.",
        data={
            "status": "healthy",
            "service": settings.app_name,
            "version": settings.app_version,
        },
    )


@router.get("/error")
def test_error():
    raise OilAIAgentException(
        message="This is a test exception.",
        status_code=400,
    )