from langchain_core.tools import tool

from app.rag.service import rag_service


@tool
def search_documents(question: str) -> dict:
    """
    Search uploaded documents using RAG.
    """
    return rag_service.ask(question)