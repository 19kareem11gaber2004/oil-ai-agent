from ollama import Client
from app.config.settings import settings


class LLMClient:
    def __init__(self):
        self.client = Client(host=settings.ollama_host)

    def ask(self, system_prompt: str, user_prompt: str) -> str:
        response = self.client.chat(
            model=settings.ollama_model,
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },
                {
                    "role": "user",
                    "content": user_prompt,
                },
            ],
        )

        return response["message"]["content"]


llm_client = LLMClient()