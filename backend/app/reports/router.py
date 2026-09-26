from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.reports.schema import (
    GenerateReportRequest,
    ReportResponse,
    ReportListResponse,
)
from app.reports.service import report_service
from app.schemas.response import APIResponse


router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)


@router.post("/generate", response_model=APIResponse)
def generate_report(
    request: GenerateReportRequest,
    db: Session = Depends(get_db),
):
    """
    Generate an AI report from indexed documents.
    """

    report = report_service.generate_report(
        title=request.title,
        prompt=request.prompt,
        db=db,
    )

    return APIResponse(
        success=True,
        message="Report generated successfully.",
        data=ReportResponse.model_validate(report),
    )


@router.get("", response_model=APIResponse)
def list_reports(
    db: Session = Depends(get_db),
):
    """
    Retrieve all reports.
    """

    reports = report_service.list_reports(db)

    return APIResponse(
        success=True,
        message="Reports retrieved successfully.",
        data=[
            ReportListResponse.model_validate(report)
            for report in reports
        ],
    )


@router.get("/{report_id}", response_model=APIResponse)
def get_report(
    report_id: int,
    db: Session = Depends(get_db),
):
    """
    Retrieve a report by ID.
    """

    report = report_service.get_report(
        report_id,
        db,
    )

    return APIResponse(
        success=True,
        message="Report retrieved successfully.",
        data=ReportResponse.model_validate(report),
    )


@router.delete("/{report_id}", response_model=APIResponse)
def delete_report(
    report_id: int,
    db: Session = Depends(get_db),
):
    """
    Delete a report.
    """

    report_service.delete_report(
        report_id,
        db,
    )

    return APIResponse(
        success=True,
        message="Report deleted successfully.",
        data=None,
    )