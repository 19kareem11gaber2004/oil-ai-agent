import httpx
from fastapi import APIRouter
from pydantic import BaseModel

from app.agents.agent import oil_ai_agent
from app.config.logging import logger
from app.config.settings import settings
from app.core.exceptions import OilAIAgentException
from app.schemas.response import APIResponse


router = APIRouter(
    prefix="/agent",
    tags=["AI Agent"],
)


class AgentChatRequest(BaseModel):
    question: str
    thread_id: str | None = None


@router.post("/chat", response_model=APIResponse)
def chat(request: AgentChatRequest):

    try:
        result = oil_ai_agent.ask(
            question=request.question,
            thread_id=request.thread_id,
        )
    except (httpx.ConnectError, httpx.ConnectTimeout, ConnectionError) as exc:
        logger.exception("Cannot reach Ollama at %s", settings.ollama_host)
        raise OilAIAgentException(
            message=(
                "Cannot reach the AI model server at "
                f"{settings.ollama_host}. "
                "Make sure Ollama is running and reachable."
            ),
            status_code=503,
        ) from exc

    return APIResponse(
    success=True,
    message="Agent response generated successfully.",
    data={
        "question": request.question,
        "answer": result["answer"],
        "sources": result["sources"],
        "thread_id": result["thread_id"],
    },
)