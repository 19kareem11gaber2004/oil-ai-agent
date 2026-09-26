from sqlalchemy.orm import Session

from app.reports.model import Report


class ReportRepository:
    """Repository for report database operations."""

    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        report: Report,
    ) -> Report:
        """Create a new report."""

        self.db.add(report)
        self.db.commit()
        self.db.refresh(report)

        return report

    def list_all(self) -> list[Report]:
        """Return all reports."""

        return (
            self.db.query(Report)
            .order_by(Report.created_at.desc())
            .all()
        )

    def get(
        self,
        report_id: int,
    ) -> Report | None:
        """Return a report by ID."""

        return (
            self.db.query(Report)
            .filter(Report.id == report_id)
            .first()
        )

    def delete(
        self,
        report: Report,
    ) -> None:
        """Delete a report."""

        self.db.delete(report)
        self.db.commit()