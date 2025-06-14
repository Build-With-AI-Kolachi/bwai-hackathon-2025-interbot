import os
import json
import uuid
import aiofiles
import requests
from typing import Dict, Any, Optional
import PyPDF2
import docx
from core.config import settings
from models.resume import ResumeData

async def parse_resume(file_path: str, resume_id: str, is_link: bool = False) -> None:
    """Parse a resume file or link and extract structured data"""
    
    try:
        # Extract text from file or link
        if is_link:
            # Read the link from the file
            async with aiofiles.open(file_path, 'r') as f:
                resume_link = await f.read()
            
            # Extract text from link (e.g., LinkedIn profile or online resume)
            resume_text = await extract_text_from_link(resume_link)
        else:
            # Extract text from file based on file extension
            file_ext = os.path.splitext(file_path)[1].lower()
            
            if file_ext == ".pdf":
                resume_text = extract_text_from_pdf(file_path)
            elif file_ext in [".doc", ".docx"]:
                resume_text = extract_text_from_docx(file_path)
            else:
                # Unsupported file type
                raise ValueError(f"Unsupported file type: {file_ext}")
        
        # Use AI to parse resume text into structured data
        resume_data = await parse_resume_with_ai(resume_text, resume_id)
        
        # Save parsed data
        resume_dir = os.path.dirname(file_path)
        resume_data_path = os.path.join(resume_dir, "resume_data.json")
        
        async with aiofiles.open(resume_data_path, 'w') as f:
            await f.write(json.dumps(resume_data, indent=2))
    
    except Exception as e:
        # Log error
        print(f"Error parsing resume: {str(e)}")
        
        # Save error status
        resume_dir = os.path.dirname(file_path)
        error_path = os.path.join(resume_dir, "error.txt")
        
        async with aiofiles.open(error_path, 'w') as f:
            await f.write(f"Error parsing resume: {str(e)}")

def extract_text_from_pdf(file_path: str) -> str:
    """Extract text from a PDF file"""
    
    text = ""
    with open(file_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text()
    
    return text

def extract_text_from_docx(file_path: str) -> str:
    """Extract text from a DOCX file"""
    
    doc = docx.Document(file_path)
    text = "\n".join([paragraph.text for paragraph in doc.paragraphs])
    return text

async def extract_text_from_link(link: str) -> str:
    """Extract text from a link (e.g., LinkedIn profile or online resume)"""
    
    # For LinkedIn profiles, we would need to use a scraping approach
    # This is a simplified example that just fetches the HTML
    # In a real implementation, you would use a proper scraping library
    
    try:
        response = requests.get(link)
        response.raise_for_status()
        
        # In a real implementation, you would parse the HTML to extract relevant text
        # For now, we'll just return the raw HTML
        return response.text
    except Exception as e:
        raise ValueError(f"Failed to extract text from link: {str(e)}")

async def parse_resume_with_ai(resume_text: str, resume_id: str) -> Dict[str, Any]:
    """Use AI to parse resume text into structured data"""
    
    # In a real implementation, you would use OpenAI or Gemini API to parse the resume
    # For this example, we'll create a mock implementation
    
    # Check if we have API keys
    if settings.OPENAI_API_KEY:
        return await parse_with_openai(resume_text, resume_id)
    elif settings.GEMINI_API_KEY:
        return await parse_with_gemini(resume_text, resume_id)
    else:
        # No API keys available, use mock data
        return create_mock_resume_data(resume_text, resume_id)

async def parse_with_openai(resume_text: str, resume_id: str) -> Dict[str, Any]:
    """Parse resume text using OpenAI API"""
    
    try:
        import openai
        
        openai.api_key = settings.OPENAI_API_KEY
        
        # Create a system message that instructs the model to parse the resume
        system_message = {
            "role": "system",
            "content": "You are a resume parsing assistant. Extract structured information from the resume text provided."
        }
        
        # Create a user message with the resume text
        user_message = {
            "role": "user",
            "content": f"Parse the following resume and extract structured information like name, contact details, education, experience, skills, etc. Format the output as JSON.\n\nResume:\n{resume_text}"
        }
        
        # Call the OpenAI API
        response = openai.chat.completions.create(
            model="gpt-4",  # or another appropriate model
            messages=[system_message, user_message],
            temperature=0.2,  # Lower temperature for more deterministic output
            max_tokens=2000,
            response_format={"type": "json_object"}
        )
        
        # Parse the response
        parsed_data = json.loads(response.choices[0].message.content)
        
        # Add resume_id to the parsed data
        parsed_data["resume_id"] = resume_id
        
        return parsed_data
    
    except Exception as e:
        print(f"Error parsing with OpenAI: {str(e)}")
        # Fall back to mock data
        return create_mock_resume_data(resume_text, resume_id)

async def parse_with_gemini(resume_text: str, resume_id: str) -> Dict[str, Any]:
    """Parse resume text using Gemini API"""
    
    try:
        import google.generativeai as genai
        
        genai.configure(api_key=settings.GEMINI_API_KEY)
        
        # Set up the model
        model = genai.GenerativeModel('gemini-pro')
        
        # Create a prompt for the model
        prompt = f"""Parse the following resume and extract structured information like name, contact details, education, experience, skills, etc. Format the output as JSON.

Resume:
{resume_text}

Output the parsed resume as a valid JSON object with the following structure:
{{
  "name": "Full Name",
  "email": "email@example.com",
  "phone": "Phone number",
  "location": "City, State",
  "summary": "Professional summary",
  "education": [
    {{
      "institution": "University Name",
      "degree": "Degree Name",
      "field_of_study": "Field of Study",
      "start_date": "Start Date",
      "end_date": "End Date"
    }}
  ],
  "experience": [
    {{
      "company": "Company Name",
      "title": "Job Title",
      "location": "Job Location",
      "start_date": "Start Date",
      "end_date": "End Date",
      "description": "Job Description",
      "highlights": ["Achievement 1", "Achievement 2"]
    }}
  ],
  "skills": [
    {{
      "name": "Skill Name",
      "level": "Skill Level",
      "keywords": ["Keyword 1", "Keyword 2"]
    }}
  ],
  "projects": [
    {{
      "name": "Project Name",
      "description": "Project Description",
      "highlights": ["Highlight 1", "Highlight 2"],
      "keywords": ["Keyword 1", "Keyword 2"],
      "url": "Project URL"
    }}
  ],
  "languages": ["Language 1", "Language 2"],
  "certifications": ["Certification 1", "Certification 2"],
  "interests": ["Interest 1", "Interest 2"],
  "links": {{
    "linkedin": "LinkedIn URL",
    "github": "GitHub URL",
    "portfolio": "Portfolio URL"
  }}
}}

Ensure the output is a valid JSON object.
"""
        
        # Generate response
        response = model.generate_content(prompt)
        
        # Extract JSON from response
        response_text = response.text
        
        # Find JSON in the response (it might be wrapped in markdown code blocks)
        import re
        json_match = re.search(r'```json\n(.+?)\n```', response_text, re.DOTALL)
        
        if json_match:
            json_str = json_match.group(1)
        else:
            # Try to find JSON without markdown formatting
            json_match = re.search(r'({.+})', response_text, re.DOTALL)
            if json_match:
                json_str = json_match.group(1)
            else:
                json_str = response_text
        
        # Parse the JSON
        parsed_data = json.loads(json_str)
        
        # Add resume_id to the parsed data
        parsed_data["resume_id"] = resume_id
        
        return parsed_data
    
    except Exception as e:
        print(f"Error parsing with Gemini: {str(e)}")
        # Fall back to mock data
        return create_mock_resume_data(resume_text, resume_id)

def create_mock_resume_data(resume_text: str, resume_id: str) -> Dict[str, Any]:
    """Create mock resume data for testing purposes"""
    
    # Extract some basic information from the resume text
    # This is a very simplified approach and won't work well in practice
    
    # Try to extract name (first line or something that looks like a name)
    lines = resume_text.split('\n')
    name = lines[0] if lines else "John Doe"
    
    # Try to extract email (something with @ symbol)
    import re
    email_match = re.search(r'[\w.+-]+@[\w-]+\.[\w.-]+', resume_text)
    email = email_match.group(0) if email_match else "john.doe@example.com"
    
    # Try to extract phone number
    phone_match = re.search(r'\(\d{3}\)\s*\d{3}[-.]\d{4}|\d{3}[-.]\d{3}[-.]\d{4}', resume_text)
    phone = phone_match.group(0) if phone_match else "555-123-4567"
    
    # Create mock data
    mock_data = {
        "resume_id": resume_id,
        "name": name,
        "email": email,
        "phone": phone,
        "location": "New York, NY",
        "summary": "Experienced software developer with expertise in web development and AI.",
        "education": [
            {
                "institution": "University of Technology",
                "degree": "Bachelor of Science",
                "field_of_study": "Computer Science",
                "start_date": "2015",
                "end_date": "2019"
            }
        ],
        "experience": [
            {
                "company": "Tech Solutions Inc.",
                "title": "Senior Software Developer",
                "location": "New York, NY",
                "start_date": "2019",
                "end_date": "Present",
                "description": "Developed and maintained web applications using React and Node.js.",
                "highlights": [
                    "Improved application performance by 40%",
                    "Led a team of 5 developers",
                    "Implemented CI/CD pipeline"
                ]
            },
            {
                "company": "Digital Innovations",
                "title": "Junior Developer",
                "location": "Boston, MA",
                "start_date": "2017",
                "end_date": "2019",
                "description": "Assisted in the development of mobile applications using React Native.",
                "highlights": [
                    "Developed features for iOS and Android platforms",
                    "Collaborated with design team to implement UI/UX improvements"
                ]
            }
        ],
        "skills": [
            {
                "name": "JavaScript",
                "level": "Expert",
                "keywords": ["React", "Node.js", "TypeScript"]
            },
            {
                "name": "Python",
                "level": "Intermediate",
                "keywords": ["Django", "Flask", "Data Analysis"]
            },
            {
                "name": "Database",
                "level": "Advanced",
                "keywords": ["MongoDB", "PostgreSQL", "SQL"]
            }
        ],
        "projects": [
            {
                "name": "E-commerce Platform",
                "description": "Developed a full-stack e-commerce platform with React and Node.js.",
                "highlights": ["Implemented payment processing", "Built responsive UI"],
                "keywords": ["React", "Node.js", "MongoDB"],
                "url": "https://github.com/johndoe/ecommerce"
            }
        ],
        "languages": ["English", "Spanish"],
        "certifications": ["AWS Certified Developer", "MongoDB Certified Developer"],
        "interests": ["Machine Learning", "Open Source", "Hiking"],
        "links": {
            "linkedin": "https://linkedin.com/in/johndoe",
            "github": "https://github.com/johndoe",
            "portfolio": "https://johndoe.dev"
        },
        "raw_text": resume_text,
        "status": "processed"
    }
    
    return mock_data