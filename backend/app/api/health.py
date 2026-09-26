from fastapi import APIRouter
from app.services.health_service import health_service
from app.services.system_check_service import system_check_service
from app.core.exceptions import OilAIAgentException
from app.schemas.response import APIResponse
from fastapi import Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.database.dependencies import get_db

router = APIRouter(
    prefix="/health",
    tags=["Health"],
)


@router.get("/", response_model=APIResponse)
def health_check():
    return APIResponse(
        success=True,
        message="Health check completed successfully.",
        data=health_service.get_health_status(),
    )


@router.get("/error")
def test_error():
    raise OilAIAgentException(
        message="This is a test exception.",
        status_code=400,
    )


@router.get("/database")
def database_check(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))

    return APIResponse(
        success=True,
        message="Database connection successful.",
        data=None,
    )


@router.get("/check-all", response_model=APIResponse)
def check_all(db: Session = Depends(get_db)):
    """Run every lightweight readiness probe and report per-component status."""

    result = system_check_service.check_all(db)

    return APIResponse(
        success=True,
        message="System check completed successfully.",
        data=result,
    )