from pydantic import BaseModel, Field
from typing import List, Optional

class InterviewQuestion(BaseModel):
    question_id: str
    question_text: str
    question_type: str  # e.g., "behavioral", "technical", "background"
    context: Optional[str] = None  # Additional context or information about the question
    expected_topics: Optional[List[str]] = Field(default_factory=list)  # Topics that should be covered in the answer

class InterviewResponse(BaseModel):
    question_index: int
    response_text: str
    audio_file_path: Optional[str] = None
    timestamp: str

class InterviewFeedback(BaseModel):
    question_index: int
    content_feedback: str  # Feedback on the content of the response
    tone_feedback: str  # Feedback on the tone and delivery
    clarity_feedback: str  # Feedback on clarity and structure
    overall_score: float = Field(ge=0, le=10)  # Score from 0-10
    timestamp: str

class InterviewSession(BaseModel):
    session_id: str
    resume_id: str
    questions: List[InterviewQuestion] = Field(default_factory=list)
    current_question_index: int = 0
    responses: List[InterviewResponse] = Field(default_factory=list)
    feedback: List[InterviewFeedback] = Field(default_factory=list)
    status: str  # "in_progress", "completed", "abandoned"
    created_at: str

class InterviewSummary(BaseModel):
    session_id: str
    resume_id: str
    question_count: int
    average_score: float = Field(ge=0, le=10)  # Average score from 0-10
    strengths: List[str] = Field(default_factory=list)  # List of identified strengths
    areas_for_improvement: List[str] = Field(default_factory=list)  # List of areas to improve
    overall_feedback: str  # Overall feedback and recommendations
    timestamp: str