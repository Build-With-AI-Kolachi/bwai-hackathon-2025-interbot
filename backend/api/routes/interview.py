from fastapi import APIRouter, HTTPException, Depends, Body
from typing import List, Optional
import json
import os
import uuid
import aiofiles
from core.config import settings
from models.interview import (
    InterviewSession,
    InterviewQuestion,
    InterviewResponse,
    InterviewFeedback,
    InterviewSummary
)
from services.interview_generator import generate_interview_questions, analyze_response

router = APIRouter()

@router.post("/interview/start", response_model=InterviewSession)
async def start_interview(resume_id: str = Body(...)):
    """Start a new interview session based on a resume"""
    
    # Check if resume exists and has been processed
    resume_dir = os.path.join(settings.UPLOAD_DIR, resume_id)
    resume_data_path = os.path.join(resume_dir, "resume_data.json")
    
    if not os.path.exists(resume_data_path):
        raise HTTPException(
            status_code=404, 
            detail="Resume not found or still being processed"
        )
    
    # Read resume data
    async with aiofiles.open(resume_data_path, 'r') as f:
        resume_data_json = await f.read()
    
    resume_data = json.loads(resume_data_json)
    
    # Generate interview questions based on resume
    questions = await generate_interview_questions(resume_data)
    
    # Create interview session
    session_id = str(uuid.uuid4())
    session_dir = os.path.join(settings.UPLOAD_DIR, resume_id, "interviews", session_id)
    os.makedirs(session_dir, exist_ok=True)
    
    # Create interview session data
    session_data = {
        "session_id": session_id,
        "resume_id": resume_id,
        "questions": questions,
        "current_question_index": 0,
        "responses": [],
        "feedback": [],
        "status": "in_progress",
        "created_at": str(uuid.uuid1()),  # Use timestamp for created_at
    }
    
    # Save session data
    session_path = os.path.join(session_dir, "session.json")
    async with aiofiles.open(session_path, 'w') as f:
        await f.write(json.dumps(session_data, indent=2))
    
    return InterviewSession(**session_data)

@router.get("/interview/{session_id}", response_model=InterviewSession)
async def get_interview_session(session_id: str):
    """Get interview session data"""
    
    # Find session file
    for root, dirs, files in os.walk(settings.UPLOAD_DIR):
        if "interviews" in dirs:
            interviews_dir = os.path.join(root, "interviews")
            session_dir = os.path.join(interviews_dir, session_id)
            
            if os.path.exists(session_dir):
                session_path = os.path.join(session_dir, "session.json")
                
                if os.path.exists(session_path):
                    async with aiofiles.open(session_path, 'r') as f:
                        session_data_json = await f.read()
                    
                    session_data = json.loads(session_data_json)
                    return InterviewSession(**session_data)
    
    raise HTTPException(status_code=404, detail="Interview session not found")

@router.get("/interview/{session_id}/question/{question_index}", response_model=InterviewQuestion)
async def get_interview_question(session_id: str, question_index: int):
    """Get a specific interview question"""
    
    # Get session data
    session = await get_interview_session(session_id)
    
    # Validate question index
    if question_index < 0 or question_index >= len(session.questions):
        raise HTTPException(
            status_code=400, 
            detail=f"Question index out of range. Valid range: 0-{len(session.questions) - 1}"
        )
    
    return session.questions[question_index]

@router.post("/interview/{session_id}/response", response_model=InterviewFeedback)
async def submit_response(
    session_id: str,
    question_index: int = Body(...),
    response_text: str = Body(...),
    audio_file_path: Optional[str] = Body(None)
):
    """Submit a response to an interview question and get feedback"""
    
    # Get session data
    session = await get_interview_session(session_id)
    
    # Validate question index
    if question_index < 0 or question_index >= len(session.questions):
        raise HTTPException(
            status_code=400, 
            detail=f"Question index out of range. Valid range: 0-{len(session.questions) - 1}"
        )
    
    # Create response object
    response = InterviewResponse(
        question_index=question_index,
        response_text=response_text,
        audio_file_path=audio_file_path,
        timestamp=str(uuid.uuid1())  # Use timestamp
    )
    
    # Analyze response and generate feedback
    feedback = await analyze_response(session_id, question_index, response_text)
    
    # Update session data
    session_dir = None
    for root, dirs, files in os.walk(settings.UPLOAD_DIR):
        if "interviews" in dirs:
            interviews_dir = os.path.join(root, "interviews")
            potential_session_dir = os.path.join(interviews_dir, session_id)
            
            if os.path.exists(potential_session_dir):
                session_dir = potential_session_dir
                break
    
    if not session_dir:
        raise HTTPException(status_code=404, detail="Interview session not found")
    
    session_path = os.path.join(session_dir, "session.json")
    
    # Read current session data
    async with aiofiles.open(session_path, 'r') as f:
        session_data = json.loads(await f.read())
    
    # Update session data
    session_data["responses"].append({
        "question_index": question_index,
        "response_text": response_text,
        "audio_file_path": audio_file_path,
        "timestamp": response.timestamp
    })
    
    session_data["feedback"].append({
        "question_index": question_index,
        "content_feedback": feedback.content_feedback,
        "tone_feedback": feedback.tone_feedback,
        "clarity_feedback": feedback.clarity_feedback,
        "overall_score": feedback.overall_score,
        "timestamp": feedback.timestamp
    })
    
    # Update current question index
    if question_index == session_data["current_question_index"]:
        session_data["current_question_index"] = min(
            question_index + 1, 
            len(session_data["questions"]) - 1
        )
    
    # Check if interview is complete
    if question_index == len(session_data["questions"]) - 1:
        session_data["status"] = "completed"
    
    # Save updated session data
    async with aiofiles.open(session_path, 'w') as f:
        await f.write(json.dumps(session_data, indent=2))
    
    return feedback

@router.get("/interview/{session_id}/summary", response_model=InterviewSummary)
async def get_interview_summary(session_id: str):
    """Get a summary of the interview session"""
    
    # Get session data
    session = await get_interview_session(session_id)
    
    # Check if interview is complete
    if session.status != "completed" and len(session.responses) < len(session.questions):
        raise HTTPException(
            status_code=400, 
            detail="Interview is not complete. Please answer all questions first."
        )
    
    # Calculate average scores
    overall_scores = [feedback.overall_score for feedback in session.feedback]
    avg_score = sum(overall_scores) / len(overall_scores) if overall_scores else 0
    
    # Identify strengths and areas for improvement
    strengths = []
    improvements = []
    
    for feedback in session.feedback:
        # Extract positive feedback as strengths
        if "good" in feedback.content_feedback.lower() or "excellent" in feedback.content_feedback.lower():
            strengths.append(feedback.content_feedback)
        
        # Extract constructive feedback as areas for improvement
        if "improve" in feedback.content_feedback.lower() or "consider" in feedback.content_feedback.lower():
            improvements.append(feedback.content_feedback)
        
        # Add tone feedback
        if "good" in feedback.tone_feedback.lower() or "excellent" in feedback.tone_feedback.lower():
            strengths.append(feedback.tone_feedback)
        elif "improve" in feedback.tone_feedback.lower() or "consider" in feedback.tone_feedback.lower():
            improvements.append(feedback.tone_feedback)
        
        # Add clarity feedback
        if "good" in feedback.clarity_feedback.lower() or "excellent" in feedback.clarity_feedback.lower():
            strengths.append(feedback.clarity_feedback)
        elif "improve" in feedback.clarity_feedback.lower() or "consider" in feedback.clarity_feedback.lower():
            improvements.append(feedback.clarity_feedback)
    
    # Limit to top 3 strengths and improvements
    strengths = strengths[:3]
    improvements = improvements[:3]
    
    # Create summary
    summary = InterviewSummary(
        session_id=session_id,
        resume_id=session.resume_id,
        question_count=len(session.questions),
        average_score=avg_score,
        strengths=strengths,
        areas_for_improvement=improvements,
        overall_feedback="You demonstrated good communication skills and relevant experience. "
                         "Continue to practice providing specific examples and quantifiable results.",
        timestamp=str(uuid.uuid1())  # Use timestamp
    )
    
    return summary