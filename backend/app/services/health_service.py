from app.config.settings import settings


class HealthService:
    def get_health_status(self):
        return {
            "status": "healthy",
            "service": settings.app_name,
            "version": settings.app_version,
        }


health_service = HealthService()