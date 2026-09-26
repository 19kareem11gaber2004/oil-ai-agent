from langchain_core.tools import tool

from app.llm.model import llm


@tool
def generate_report(text: str) -> str:
    """
    Generate a professional maintenance report.
    """

    prompt = f"""
You are an expert petroleum maintenance engineer.

Generate a professional maintenance report.

Include:

- Executive Summary
- Findings
- Risks
- Recommendations
- Priority

Input:

{text}
"""

    response = llm.invoke(prompt)

    return response.content