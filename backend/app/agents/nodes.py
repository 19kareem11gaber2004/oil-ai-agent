from app.agents.state import AgentState
from app.llm.agent import agent_llm


def chatbot(state: AgentState):
    """
    Main LangGraph chatbot node.

    The LLM decides whether to answer directly
    or call one of the registered tools.
    """

    response = agent_llm.invoke(state["messages"])

    return {
        "messages": [response]
    }