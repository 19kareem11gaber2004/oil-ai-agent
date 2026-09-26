from uuid import uuid4

from langchain_core.messages import AIMessage, HumanMessage, ToolMessage

from app.agents.graph import graph
from app.config.logging import logger
from app.rag.service import rag_service


class OilAIAgent:
    """Main AI Agent."""

    # Ollama returns HTTP 400 with this message for models whose
    # template has no tool support (e.g. gemma3:4b). Tool calling
    # then cannot work, so fall back to grounded RAG instead.
    TOOLS_UNSUPPORTED_MARKER = "does not support tools"

    def ask(
        self,
        question: str,
        thread_id: str | None = None,
    ) -> dict:
        """
        Ask the AI agent a question.

        Args:
            question: User question.
            thread_id: Existing conversation thread ID. A new one will be
                generated if not provided.

        Returns:
            A dictionary containing:
                - answer: Final AI response.
                - sources: Retrieved document sources (if available).
                - thread_id: Conversation thread ID.
        """

        if thread_id is None:
            thread_id = str(uuid4())

        try:
            result = graph.invoke(
                {
                    "messages": [
                        HumanMessage(content=question),
                    ]
                },
                config={
                    "configurable": {
                        "thread_id": thread_id,
                    }
                },
            )
        except Exception as exc:
            if self.TOOLS_UNSUPPORTED_MARKER in str(exc).lower():
                logger.warning(
                    "Model does not support tools, falling back to RAG: %s",
                    exc,
                )
                return self._ask_without_tools(question, thread_id)
            raise

        messages = result["messages"]

        answer = self._extract_answer(messages)
        sources = self._extract_sources(messages)

        return {
            "answer": answer,
            "sources": sources,
            "thread_id": thread_id,
        }

    def _ask_without_tools(
        self,
        question: str,
        thread_id: str,
    ) -> dict:
        """Answer via grounded RAG when the model rejects tool calls."""

        result = rag_service.ask(question)

        return {
            "answer": result["answer"],
            "sources": result["sources"],
            "thread_id": thread_id,
        }

    @staticmethod
    def _extract_answer(messages) -> str:
        """Extract the final AI response."""

        for message in reversed(messages):
            if isinstance(message, AIMessage):
                return message.content

        return ""

    @staticmethod
    def _extract_sources(messages) -> list:
        """Extract document sources from the latest tool message."""

        for message in reversed(messages):
            if not isinstance(message, ToolMessage):
                continue

            artifact = getattr(message, "artifact", None)

            if isinstance(artifact, dict):
                return artifact.get("sources", [])

            if isinstance(message.content, dict):
                return message.content.get("sources", [])

        return []


oil_ai_agent = OilAIAgent()