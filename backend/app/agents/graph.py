from langgraph.checkpoint.memory import InMemorySaver
from langgraph.graph import START, StateGraph
from langgraph.prebuilt import ToolNode, tools_condition
from app.agents.state import AgentState
from app.agents.tools import TOOLS
from app.llm.agent import agent_llm

def chatbot(state: AgentState) -> dict:
    response = agent_llm.invoke(state["messages"])

    return {
        "messages": [response],
    }


builder = StateGraph(AgentState)

builder.add_node("chatbot", chatbot)
builder.add_node("tools", ToolNode(TOOLS))

builder.add_edge(START, "chatbot")

builder.add_conditional_edges(
    "chatbot",
    tools_condition,
)

builder.add_edge("tools", "chatbot")

# Memory for conversation history
memory = InMemorySaver()

graph = builder.compile(
    checkpointer=memory,
)