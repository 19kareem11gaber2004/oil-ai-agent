from fastapi import APIRouter, Query

from app.core.exceptions import OilAIAgentException
from app.rag.service import rag_service
from app.schemas.response import APIResponse

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post("", response_model=APIResponse)
def chat(question: str = Query(min_length=1, max_length=2000)):
    question = question.strip()

    if not question:
        raise OilAIAgentException(
            message="Question must not be empty.",
            status_code=400,
        )

    answer = rag_service.ask(question)

    return APIResponse(
        success=True,
        message="Answer generated successfully.",
        data={
            "question": question,
            "answer": answer,
        },
    )