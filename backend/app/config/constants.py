"""
Project constants.
"""

# PDF Processing
CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200

# Retrieval
DEFAULT_TOP_K = 5
# Chroma uses L2 distance on length-normalized embeddings, where
# distance = sqrt(2 * (1 - cosine_similarity)). A threshold of 1.0
# admits chunks with cosine similarity >= 0.5 while still rejecting
# unrelated content (observed noise floor is ~1.4+).
DEFAULT_MAX_DISTANCE = 1.0

# Storage
UPLOAD_DIRECTORY = "uploads/documents"
CHROMA_DIRECTORY = "storage/chroma"

# Models
EMBEDDING_MODEL = "all-MiniLM-L6-v2"
DEFAULT_OLLAMA_MODEL = "llama3.1:8b"