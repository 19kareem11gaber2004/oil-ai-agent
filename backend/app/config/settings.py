from pydantic_settings import BaseSettings, SettingsConfigDict
frontend_url: str = "http://localhost:5173"

class Settings(BaseSettings):
    app_name: str = "Oil AI Agent API"
    app_version: str = "1.0.0"
    debug: bool = True

    host: str = "127.0.0.1"
    port: int = 8000

    frontend_url: str = "http://localhost:5173"

    openai_api_key: str = ""
    gemini_api_key: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()