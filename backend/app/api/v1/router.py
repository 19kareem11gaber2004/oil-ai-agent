from fastapi import APIRouter

from app.api.health import router as health_router
from app.documents.router import router as document_router
from app.api.chat import router as chat_router
from app.agents.router import router as agent_router
from app.reports.router import router as report_router

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(health_router)
api_router.include_router(document_router)
api_router.include_router(chat_router)
api_router.include_router(agent_router)
api_router.include_router(report_router)