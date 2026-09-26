from sqlalchemy.orm import Session

from app.core.exceptions import OilAIAgentException
from app.llm.model import llm
from app.rag.retriever import retriever

from app.reports.model import Report
from app.reports.prompts import REPORT_PROMPT
from app.reports.repository import ReportRepository


class ReportService:
    """Service for AI report generation."""

    def generate_report(
        self,
        title: str,
        prompt: str,
        db: Session,
    ) -> Report:
        """
        Generate an AI report from indexed documents.
        """

        documents = retriever.search(prompt)

        if not documents:
            raise OilAIAgentException(
                message="No indexed documents were found.",
                status_code=404,
            )

        context = "\n\n".join(
            document["text"]
            for document in documents
        )

        final_prompt = REPORT_PROMPT.format(
            title=title,
            context=context,
            prompt=prompt,
        )

        response = llm.invoke(final_prompt)

        repository = ReportRepository(db)

        report = Report(
            title=title,
            prompt=prompt,
            content=response.content,
        )

        return repository.create(report)

    def list_reports(
        self,
        db: Session,
    ) -> list[Report]:
        repository = ReportRepository(db)

        return repository.list_all()

    def get_report(
        self,
        report_id: int,
        db: Session,
    ) -> Report:
        repository = ReportRepository(db)

        report = repository.get(report_id)

        if report is None:
            raise OilAIAgentException(
                message="Report not found.",
                status_code=404,
            )

        return report

    def delete_report(
        self,
        report_id: int,
        db: Session,
    ) -> None:
        repository = ReportRepository(db)

        report = repository.get(report_id)

        if report is None:
            raise OilAIAgentException(
                message="Report not found.",
                status_code=404,
            )

        repository.delete(report)


report_service = ReportService()