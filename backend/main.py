from fastapi import FastAPI
from app.schemas.response import APIResponse
from app.api.v1.router import api_router
from app.config.logging import logger
from app.config.settings import settings
from app.core.exceptions import OilAIAgentException
from app.core.handlers import oil_ai_exception_handler
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Backend API for the Oil AI Agent Platform",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_exception_handler(
    OilAIAgentException,
    oil_ai_exception_handler,
)

# Log that the application has started
logger.info("Oil AI Agent API started successfully.")

app.include_router(
    api_router,
    prefix="/api/v1",
)


@app.get("/", response_model=APIResponse)
def root():

    return APIResponse(
        success=True,
        message="Welcome to Oil AI Agent API.",
        data=None,
    )