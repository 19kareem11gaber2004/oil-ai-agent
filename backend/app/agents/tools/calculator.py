from langchain_core.tools import tool
import math


SAFE_GLOBALS = {
    "__builtins__": {},
    "abs": abs,
    "round": round,
    "min": min,
    "max": max,
    "pow": pow,
    "sqrt": math.sqrt,
    "sin": math.sin,
    "cos": math.cos,
    "tan": math.tan,
    "pi": math.pi,
    "e": math.e,
}


@tool
def calculator(expression: str) -> dict:
    """
    Evaluate a mathematical expression.
    """

    try:
        result = eval(expression, SAFE_GLOBALS)

        return {
            "success": True,
            "result": str(result),
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e),
        }