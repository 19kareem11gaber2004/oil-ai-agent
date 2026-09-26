from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class GenerateReportRequest(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    prompt: str = Field(min_length=1, max_length=5000)


class ReportResponse(BaseModel):
    id: int
    title: str
    prompt: str
    content: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ReportListResponse(BaseModel):
    id: int
    title: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)