from langchain_ollama import ChatOllama

from app.agents.tools import TOOLS
from app.config.settings import settings


llm = ChatOllama(
    model=settings.ollama_model,
    base_url=settings.ollama_host,
    temperature=0,
)


agent_llm = llm.bind_tools(TOOLS)