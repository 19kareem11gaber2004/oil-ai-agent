import logging
from pathlib import Path

# Create logs directory if it doesn't exist
Path("logs").mkdir(exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
    handlers=[
        logging.FileHandler("logs/app.log"),
        logging.StreamHandler(),
    ],
)

logger = logging.getLogger("oil_ai_agent")