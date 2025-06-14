from pydantic import BaseModel
from typing import Optional

class AudioTranscriptionResponse(BaseModel):
    transcription_id: str
    message: str
    status: str  # "processing", "completed", "failed"
    text: Optional[str] = None
    confidence: Optional[float] = None
    duration: Optional[float] = None  # Duration in seconds
    language: Optional[str] = None
    segments: Optional[list] = None  # List of time-stamped segments