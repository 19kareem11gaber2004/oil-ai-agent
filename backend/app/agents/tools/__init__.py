from app.agents.tools.rag import search_documents
from app.agents.tools.documents import list_documents
from app.agents.tools.reports import generate_report
from app.agents.tools.calculator import calculator

TOOLS = [
    search_documents,
    list_documents,
    calculator,
    generate_report,
]