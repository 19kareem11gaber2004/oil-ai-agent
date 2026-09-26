"""Regression tests for priority fixes.

All tests run without Ollama, Postgres, or Chroma - heavy
dependencies are mocked. Run from backend/: ../.venv/bin/python -m pytest tests/ -q
"""

import sys
from pathlib import Path
from unittest.mock import MagicMock, patch

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from fastapi.testclient import TestClient  # noqa: E402


def test_reindex_is_service_method():
    from app.documents.service import DocumentService, document_service

    assert hasattr(document_service, "reindex_document")
    assert "reindex_document" in dir(DocumentService)


def test_list_documents_tool_handles_dicts():
    with patch("app.agents.tools.documents.SessionLocal"), patch(
        "app.agents.tools.documents.document_service"
    ) as mock_svc:
        mock_svc.list_documents.return_value = [
            {
                "id": 3,
                "original_filename": "well.pdf",
                "status": "indexed",
                "file_size": 42,
                "created_at": "2026-01-01",
            }
        ]
        from app.agents.tools.documents import list_documents

        out = list_documents.invoke({})
        assert out["success"] is True
        assert out["documents"][0]["filename"] == "well.pdf"


def test_list_documents_tool_empty():
    with patch("app.agents.tools.documents.SessionLocal"), patch(
        "app.agents.tools.documents.document_service"
    ) as mock_svc:
        mock_svc.list_documents.return_value = []
        from app.agents.tools.documents import list_documents

        assert list_documents.invoke({}) == {"success": True, "documents": []}


def test_report_empty_index_raises_404():
    from app.core.exceptions import OilAIAgentException
    from app.reports.service import report_service

    with patch("app.reports.service.retriever") as mock_ret:
        mock_ret.search.return_value = []
        try:
            report_service.generate_report(title="t", prompt="p", db=MagicMock())
        except OilAIAgentException as exc:
            assert exc.status_code == 404
        else:
            raise AssertionError("expected OilAIAgentException")


def test_report_request_validation():
    from app.reports.schema import GenerateReportRequest

    for bad in ({"title": "", "prompt": "x"}, {"title": "t", "prompt": ""}):
        try:
            GenerateReportRequest(**bad)
        except Exception:
            pass
        else:
            raise AssertionError(f"expected validation error for {bad}")


def test_retriever_empty_collection_returns_empty():
    from app.rag.retriever import retriever

    with patch.object(retriever, "embedder") as mock_emb, patch(
        "app.rag.retriever.vector_store"
    ) as mock_vs:
        mock_emb.embed.return_value = [0.0, 0.1]
        mock_vs.search.return_value = {
            "documents": [[]],
            "metadatas": [[]],
            "distances": [[]],
        }
        assert retriever.search("hello") == []


def test_single_health_route():
    # FastAPI >=0.139 keeps include_router() entries lazy until the
    # app handles a request, so assert via openapi instead of app.routes.
    client = TestClient(__import__("main").app)
    spec = client.get("/openapi.json").json()
    assert list(spec["paths"].keys()).count("/api/v1/health/") == 1
    resp = client.get("/api/v1/health/")
    assert resp.status_code == 200
    assert resp.json()["success"] is True


def test_chat_rejects_blank_question():
    client = TestClient(__import__("main").app)
    resp = client.post("/api/v1/chat", params={"question": "   "})
    assert resp.status_code == 400
    assert resp.json()["success"] is False


def test_agent_falls_back_when_model_rejects_tools():
    from app.agents.agent import OilAIAgent

    agent = OilAIAgent()
    with patch("app.agents.agent.graph") as mock_graph, patch(
        "app.agents.agent.rag_service"
    ) as mock_rag:
        mock_graph.invoke.side_effect = Exception(
            "registry.ollama.ai/library/gemma3:4b does not support tools"
        )
        mock_rag.ask.return_value = {
            "answer": "Wellbore instability.",
            "sources": [{"document": "drilling.pdf"}],
        }
        out = agent.ask("What are the challenges?", thread_id="t-1")
        assert out["answer"] == "Wellbore instability."
        assert out["sources"] == [{"document": "drilling.pdf"}]
        assert out["thread_id"] == "t-1"
        mock_rag.ask.assert_called_once()


def test_agent_reraises_unrelated_errors():
    from app.agents.agent import OilAIAgent

    agent = OilAIAgent()
    with patch("app.agents.agent.graph") as mock_graph:
        mock_graph.invoke.side_effect = RuntimeError("boom")
        try:
            agent.ask("hi?")
        except RuntimeError:
            pass
        else:
            raise AssertionError("expected RuntimeError to propagate")


def test_agent_router_503_when_ollama_unreachable():
    import httpx
    from fastapi.testclient import TestClient

    with patch("app.agents.router.oil_ai_agent") as mock_agent:
        mock_agent.ask.side_effect = httpx.ConnectError("refused")
        client = TestClient(__import__("main").app)
        resp = client.post("/api/v1/agent/chat", json={"question": "hi?"})
        assert resp.status_code == 503
        body = resp.json()
        assert body["success"] is False
        assert "Ollama" in body["message"]


def test_retriever_admits_genuine_match_below_noise():
    from app.rag.retriever import retriever

    with patch.object(retriever, "embedder") as mock_emb, patch(
        "app.rag.retriever.vector_store"
    ) as mock_vs:
        mock_emb.embed.return_value = [0.0, 0.1]
        mock_vs.search.return_value = {
            "documents": [["real chunk", "noise chunk"]],
            "metadatas": [[{"document_name": "a"}, {"document_name": "b"}]],
            "distances": [[0.77, 1.43]],
        }
        out = retriever.search("drilling challenges?")
        assert len(out) == 1
        assert out[0]["text"] == "real chunk"


def test_check_all_returns_every_component():
    from app.config.settings import Settings

    client = TestClient(__import__("main").app)
    resp = client.get("/api/v1/health/check-all")
    assert resp.status_code == 200
    body = resp.json()
    assert body["success"] is True
    data = body["data"]
    assert set(data["checks"]) == {
        "backend",
        "database",
        "ollama",
        "llm",
        "vector_store",
        "rag",
        "agent",
        "reports",
    }
    assert data["status"] in ("healthy", "degraded")
    for name, check in data["checks"].items():
        assert check["status"] in ("healthy", "unhealthy"), name
        if check["status"] == "unhealthy":
            assert check.get("detail"), name
    assert data["checks"]["backend"]["status"] == "healthy"
    # LLM check must report the centrally configured model, never a secret.
    assert data["checks"]["llm"].get("model") == Settings().ollama_model


def test_check_all_healthy_when_ollama_reachable():
    from unittest.mock import MagicMock

    from app.services.system_check_service import system_check_service
    from app.database.session import SessionLocal

    fake_tags = MagicMock()
    fake_tags.raise_for_status.return_value = None
    fake_tags.json.return_value = {"models": [{"name": "gemma3:4b"}]}

    with patch(
        "app.services.system_check_service.httpx.get", return_value=fake_tags
    ):
        db = SessionLocal()
        try:
            result = system_check_service.check_all(db)
        finally:
            db.close()

    assert result["checks"]["ollama"]["status"] == "healthy"
    assert result["checks"]["llm"]["status"] == "healthy"
    assert result["checks"]["llm"]["model"] == "gemma3:4b"


def test_check_all_survives_database_outage():
    from app.services.system_check_service import system_check_service

    broken = MagicMock()
    broken.execute.side_effect = Exception("connection refused")
    broken.query.side_effect = Exception("connection refused")

    result = system_check_service.check_all(broken)

    assert result["checks"]["database"]["status"] == "unhealthy"
    assert result["checks"]["database"]["detail"] != ""
    # Independent checks still report their own status.
    assert result["checks"]["vector_store"]["status"] == "healthy"
    assert result["status"] == "degraded"


def test_validate_document_rejects_non_pdf():
    from app.core.exceptions import OilAIAgentException
    from app.documents.service import document_service

    fake = MagicMock()
    fake.filename = "notes.txt"
    fake.content_type = "text/plain"
    try:
        document_service.validate_document(fake)
    except OilAIAgentException as exc:
        assert exc.status_code == 400
    else:
        raise AssertionError("expected OilAIAgentException")
