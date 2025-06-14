import os
import uuid
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse
from typing import Optional
import aiofiles
from core.config import settings
from services.resume_parser import parse_resume
from models.resume import ResumeData, ResumeUploadResponse

router = APIRouter()

@router.post("/resume/upload", response_model=ResumeUploadResponse)
async def upload_resume(
    background_tasks: BackgroundTasks,
    resume: Optional[UploadFile] = File(None),
    resume_link: Optional[str] = Form(None)
):
    """Upload a resume file or provide a link to a resume"""
    
    if not resume and not resume_link:
        raise HTTPException(status_code=400, detail="Either resume file or resume link must be provided")
    
    resume_id = str(uuid.uuid4())
    
    # Handle file upload
    if resume:
        # Validate file size
        if resume.size > settings.MAX_UPLOAD_SIZE:
            raise HTTPException(status_code=400, detail="File size exceeds the maximum allowed size")
        
        # Validate file type
        allowed_extensions = [".pdf", ".doc", ".docx"]
        file_ext = os.path.splitext(resume.filename)[1].lower()
        
        if file_ext not in allowed_extensions:
            raise HTTPException(
                status_code=400, 
                detail=f"Invalid file type. Allowed types: {', '.join(allowed_extensions)}"
            )
        
        # Create upload directory if it doesn't exist
        upload_dir = os.path.join(settings.UPLOAD_DIR, resume_id)
        os.makedirs(upload_dir, exist_ok=True)
        
        # Save the file
        file_path = os.path.join(upload_dir, f"resume{file_ext}")
        async with aiofiles.open(file_path, 'wb') as out_file:
            content = await resume.read()
            await out_file.write(content)
        
        # Process resume in background
        background_tasks.add_task(parse_resume, file_path, resume_id)
        
        return ResumeUploadResponse(
            resume_id=resume_id,
            message="Resume uploaded successfully. Processing in progress.",
            status="processing"
        )
    
    # Handle resume link
    elif resume_link:
        # Save the link to a file
        upload_dir = os.path.join(settings.UPLOAD_DIR, resume_id)
        os.makedirs(upload_dir, exist_ok=True)
        
        link_file_path = os.path.join(upload_dir, "resume_link.txt")
        async with aiofiles.open(link_file_path, 'w') as out_file:
            await out_file.write(resume_link)
        
        # Process resume link in background
        background_tasks.add_task(parse_resume, link_file_path, resume_id, is_link=True)
        
        return ResumeUploadResponse(
            resume_id=resume_id,
            message="Resume link provided successfully. Processing in progress.",
            status="processing"
        )

@router.get("/resume/{resume_id}", response_model=ResumeData)
async def get_resume_data(resume_id: str):
    """Get parsed resume data"""
    
    # Check if resume exists
    resume_dir = os.path.join(settings.UPLOAD_DIR, resume_id)
    if not os.path.exists(resume_dir):
        raise HTTPException(status_code=404, detail="Resume not found")
    
    # Check if resume data exists
    resume_data_path = os.path.join(resume_dir, "resume_data.json")
    if not os.path.exists(resume_data_path):
        return JSONResponse(
            status_code=202,
            content={"message": "Resume is still being processed", "status": "processing"}
        )
    
    # Read resume data
    async with aiofiles.open(resume_data_path, 'r') as f:
        resume_data_json = await f.read()
    
    # Parse JSON to ResumeData model
    import json
    resume_data = json.loads(resume_data_json)
    
    return ResumeData(**resume_data)