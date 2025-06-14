from pydantic import BaseModel, Field
from typing import List, Optional, Dict

class Education(BaseModel):
    institution: str
    degree: str
    field_of_study: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    description: Optional[str] = None

class Experience(BaseModel):
    company: str
    title: str
    location: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    description: Optional[str] = None
    highlights: Optional[List[str]] = None

class Skill(BaseModel):
    name: str
    level: Optional[str] = None
    keywords: Optional[List[str]] = None

class Project(BaseModel):
    name: str
    description: Optional[str] = None
    highlights: Optional[List[str]] = None
    keywords: Optional[List[str]] = None
    url: Optional[str] = None

class ResumeData(BaseModel):
    resume_id: str
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    summary: Optional[str] = None
    education: List[Education] = Field(default_factory=list)
    experience: List[Experience] = Field(default_factory=list)
    skills: List[Skill] = Field(default_factory=list)
    projects: Optional[List[Project]] = Field(default_factory=list)
    languages: Optional[List[str]] = Field(default_factory=list)
    certifications: Optional[List[str]] = Field(default_factory=list)
    interests: Optional[List[str]] = Field(default_factory=list)
    links: Optional[Dict[str, str]] = Field(default_factory=dict)
    raw_text: Optional[str] = None
    status: str = "processed"

class ResumeUploadResponse(BaseModel):
    resume_id: str
    message: str
    status: str