from datetime import datetime
from enum import Enum

from sqlalchemy import DateTime, Enum as SqlEnum, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class DocumentStatus(str, Enum):
    UPLOADED = "uploaded"
    PROCESSING = "processing"
    INDEXED = "indexed"
    FAILED = "failed"


class Document(Base):
    __tablename__ = "documents"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    original_filename: Mapped[str] = mapped_column(String(255))

    stored_filename: Mapped[str] = mapped_column(String(255), unique=True)

    mime_type: Mapped[str] = mapped_column(String(100))

    file_size: Mapped[int] = mapped_column(Integer)

    status: Mapped[DocumentStatus] = mapped_column(
        SqlEnum(DocumentStatus),
        default=DocumentStatus.UPLOADED,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )