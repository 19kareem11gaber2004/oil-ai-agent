from fastapi import FastAPI

from app.api.health import router as health_router
from app.config.logging import logger
from app.config.settings import settings
from app.core.exceptions import OilAIAgentException
from app.core.handlers import oil_ai_exception_handler

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Backend API for the Oil AI Agent Platform",
)
app.add_exception_handler(
    OilAIAgentException,
    oil_ai_exception_handler,
)
# Log that the application has started
logger.info("Oil AI Agent API started successfully.")

app.include_router(health_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to Oil AI Agent API 🚀"
    }