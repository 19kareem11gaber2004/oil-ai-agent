from fastapi import APIRouter

from app.api.health import router as health_router
from app.documents.router import router as document_router

api_router = APIRouter()

api_router.include_router(health_router)
api_router.include_router(document_router)