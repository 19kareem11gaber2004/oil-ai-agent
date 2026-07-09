from fastapi import Request
from fastapi.responses import JSONResponse

from app.core.exceptions import OilAIAgentException


async def oil_ai_exception_handler(
    request: Request,
    exc: OilAIAgentException,
):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "message": exc.message,
            "status_code": exc.status_code,
        },
    )