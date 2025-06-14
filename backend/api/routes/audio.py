from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse
import os
import uuid
import aiofiles
from core.config import settings
from services.speech_to_text import transcribe_audio
from models.audio import AudioTranscriptionResponse

router = APIRouter()

@router.post("/audio/transcribe", response_model=AudioTranscriptionResponse)
async def transcribe_audio_file(
    background_tasks: BackgroundTasks,
    audio: UploadFile = File(...),
    session_id: str = None
):
    """Transcribe audio file to text"""
    
    # Validate file size
    if audio.size > settings.MAX_UPLOAD_SIZE:
        raise HTTPException(status_code=400, detail="File size exceeds the maximum allowed size")
    
    # Validate file type
    allowed_extensions = [".mp3", ".wav", ".m4a", ".ogg", ".webm"]
    file_ext = os.path.splitext(audio.filename)[1].lower()
    
    if file_ext not in allowed_extensions:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid file type. Allowed types: {', '.join(allowed_extensions)}"
        )
    
    # Create unique ID for this transcription
    transcription_id = str(uuid.uuid4())
    
    # Determine upload directory
    if session_id:
        # Find session directory
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
        
        upload_dir = os.path.join(session_dir, "audio")
    else:
        # Use a temporary directory
        upload_dir = os.path.join(settings.UPLOAD_DIR, "temp", transcription_id)
    
    # Create directory if it doesn't exist
    os.makedirs(upload_dir, exist_ok=True)
    
    # Save the audio file
    file_path = os.path.join(upload_dir, f"audio{file_ext}")
    async with aiofiles.open(file_path, 'wb') as out_file:
        content = await audio.read()
        await out_file.write(content)
    
    # Process transcription in background
    background_tasks.add_task(transcribe_audio, file_path, transcription_id, session_id)
    
    return AudioTranscriptionResponse(
        transcription_id=transcription_id,
        message="Audio uploaded successfully. Transcription in progress.",
        status="processing"
    )

@router.get("/audio/transcription/{transcription_id}")
async def get_transcription(transcription_id: str):
    """Get the transcription result"""
    
    # Look for transcription file
    transcription_file = None
    
    # Check in temp directory first
    temp_dir = os.path.join(settings.UPLOAD_DIR, "temp", transcription_id)
    if os.path.exists(temp_dir):
        potential_file = os.path.join(temp_dir, "transcription.json")
        if os.path.exists(potential_file):
            transcription_file = potential_file
    
    # If not found, search in all session directories
    if not transcription_file:
        for root, dirs, files in os.walk(settings.UPLOAD_DIR):
            if "audio" in dirs:
                audio_dir = os.path.join(root, "audio")
                potential_file = os.path.join(audio_dir, f"{transcription_id}.json")
                
                if os.path.exists(potential_file):
                    transcription_file = potential_file
                    break
    
    if not transcription_file:
        # Check if the transcription is still processing
        for root, dirs, files in os.walk(settings.UPLOAD_DIR):
            for file in files:
                if file.endswith(".mp3") or file.endswith(".wav") or file.endswith(".m4a") or file.endswith(".ogg") or file.endswith(".webm"):
                    file_path = os.path.join(root, file)
                    file_name = os.path.splitext(os.path.basename(file_path))[0]
                    
                    if file_name == transcription_id or file_name == "audio":
                        return JSONResponse(
                            status_code=202,
                            content={
                                "transcription_id": transcription_id,
                                "message": "Transcription is still being processed",
                                "status": "processing",
                                "text": None
                            }
                        )
        
        raise HTTPException(status_code=404, detail="Transcription not found")
    
    # Read transcription data
    async with aiofiles.open(transcription_file, 'r') as f:
        transcription_data = await f.read()
    
    import json
    transcription = json.loads(transcription_data)
    
    return transcription