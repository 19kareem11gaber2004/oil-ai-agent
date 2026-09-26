"""Comprehensive system readiness checks.

Each check is lightweight, read-only, and independently guarded so one
failing component never breaks the whole report. No documents are
reindexed, no models are downloaded, and no LLM text is generated.
"""

import httpx
from sqlalchemy import func, text
from sqlalchemy.orm import Session

from app.config.logging import logger
from app.config.settings import settings
from app.models.document import Document, DocumentStatus
from app.reports.model import Report

OLLAMA_TIMEOUT_SECONDS = 5.0


def _ok(detail: str = "", **extra):
    result = {"status": "healthy"}
    if detail:
        result["detail"] = detail
    result.update(extra)
    return result


def _fail(reason: str, **extra):
    result = {"status": "unhealthy", "detail": reason}
    result.update(extra)
    return result


class SystemCheckService:
    """Run every readiness probe and summarize the result."""

    def check_all(self, db: Session) -> dict:
        ollama_tags = self._fetch_ollama_tags()
        checks = {
            "backend": self._check_backend(),
            "database": self._check_database(db),
            "ollama": self._check_ollama(ollama_tags),
            "llm": self._check_llm_model(ollama_tags),
            "vector_store": self._check_vector_store(),
            "rag": self._check_rag(db),
            "agent": self._check_agent(),
            "reports": self._check_reports(db),
        }

        overall = (
            "healthy"
            if all(c["status"] == "healthy" for c in checks.values())
            else "degraded"
        )

        return {"status": overall, "checks": checks}

    @staticmethod
    def _check_backend() -> dict:
        return _ok(
            f"{settings.app_name} v{settings.app_version} responding",
        )

    @staticmethod
    def _check_database(db: Session) -> dict:
        try:
            db.rollback()
            db.execute(text("SELECT 1"))
            db.rollback()
            return _ok("PostgreSQL reachable, SELECT 1 succeeded")
        except Exception as exc:
            db.rollback()
            logger.warning("Database check failed: %s", exc)
            return _fail(f"Database query failed: {exc.__class__.__name__}")

    @staticmethod
    def _fetch_ollama_tags() -> dict | None:
        try:
            response = httpx.get(
                f"{settings.ollama_host}/api/tags",
                timeout=OLLAMA_TIMEOUT_SECONDS,
            )
            response.raise_for_status()
            return response.json()
        except Exception as exc:
            logger.warning("Ollama check failed: %s", exc)
            return None

    @staticmethod
    def _check_ollama(tags: dict | None) -> dict:
        if tags is None:
            return _fail(f"Cannot connect to {settings.ollama_host}")
        models = [m.get("name", "") for m in tags.get("models", [])]
        return _ok(
            f"Ollama reachable, {len(models)} model(s) installed",
        )

    @staticmethod
    def _check_llm_model(tags: dict | None) -> dict:
        model = settings.ollama_model
        if tags is None:
            return _fail(f"Cannot connect to {settings.ollama_host}", model=model)

        names = [m.get("name", "") for m in tags.get("models", [])]
        base_names = {n.split(":")[0] for n in names}
        if model in names or model.split(":")[0] in base_names:
            return _ok(
                f"Model {model} available",
                model=model,
            )
        return _fail(f"Model {model} not found on server", model=model)

    @staticmethod
    def _check_vector_store() -> dict:
        try:
            from app.rag.vector_store import vector_store

            count = vector_store.collection.count()
            return _ok(
                f"Chroma collection accessible, {count} chunk(s)",
                chunks=count,
            )
        except Exception as exc:
            logger.warning("Vector store check failed: %s", exc)
            return _fail(f"Vector store unavailable: {exc.__class__.__name__}")

    @staticmethod
    def _check_rag(db: Session) -> dict:
        try:
            from app.rag.embeddings import EmbeddingService

            db.rollback()
            indexed = (
                db.query(func.count())
                .select_from(Document)
                .filter(Document.status == DocumentStatus.INDEXED)
                .scalar()
            )

            # Proves the local embedding model loads and encodes.
            vector = EmbeddingService().embed("health check")
            if not vector:
                return _fail("Embedding model returned empty vector")

            return _ok(
                f"Embeddings ready, {indexed} indexed document(s)",
                indexed_documents=indexed,
            )
        except Exception as exc:
            db.rollback()
            logger.warning("RAG check failed: %s", exc)
            return _fail(f"RAG not ready: {exc.__class__.__name__}")

    @staticmethod
    def _check_agent() -> dict:
        try:
            from app.agents.graph import graph
            from app.agents.tools import TOOLS
            from app.llm.agent import agent_llm

            if graph is None:
                return _fail("Agent graph failed to build")

            if not TOOLS:
                return _fail("Agent has no tools registered")

            bound_model = getattr(agent_llm, "model", None)
            if bound_model != settings.ollama_model:
                return _fail(
                    f"Agent model {bound_model} != configured {settings.ollama_model}"
                )

            return _ok(
                f"Graph ready ({len(TOOLS)} tools, model {bound_model})",
                tools=len(TOOLS),
                model=bound_model,
            )
        except Exception as exc:
            logger.warning("Agent check failed: %s", exc)
            return _fail(f"Agent not ready: {exc.__class__.__name__}")

    @staticmethod
    def _check_reports(db: Session) -> dict:
        try:
            from app.reports.service import report_service  # noqa: F401

            db.rollback()
            total = db.query(func.count()).select_from(Report).scalar()
            return _ok(
                f"Reports service ready, {total} report(s) stored",
                reports=total,
            )
        except Exception as exc:
            db.rollback()
            logger.warning("Reports check failed: %s", exc)
            return _fail(f"Reports not ready: {exc.__class__.__name__}")


system_check_service = SystemCheckService()
