import os
import json
import uuid
import aiofiles
from typing import Dict, Any, List, Optional
from core.config import settings
from models.interview import InterviewQuestion, InterviewSession, InterviewFeedback, InterviewSummary
from models.resume import ResumeData

async def generate_interview_questions(resume_id: str, session_id: str) -> List[InterviewQuestion]:
    """Generate interview questions based on resume data"""
    
    try:
        # Load resume data
        resume_data = await load_resume_data(resume_id)
        
        if not resume_data:
            raise ValueError(f"Resume data not found for resume_id: {resume_id}")
        
        # Use AI to generate questions based on resume data
        if settings.OPENAI_API_KEY:
            questions = await generate_questions_with_openai(resume_data, session_id)
        elif settings.GEMINI_API_KEY:
            questions = await generate_questions_with_gemini(resume_data, session_id)
        else:
            # No API keys available, use mock data
            questions = create_mock_interview_questions(resume_data, session_id)
        
        return questions
    
    except Exception as e:
        print(f"Error generating interview questions: {str(e)}")
        # Return some default questions
        return create_default_interview_questions(session_id)

async def load_resume_data(resume_id: str) -> Optional[Dict[str, Any]]:
    """Load resume data from file"""
    
    resume_dir = os.path.join(settings.UPLOAD_DIR, "resumes", resume_id)
    resume_data_path = os.path.join(resume_dir, "resume_data.json")
    
    if not os.path.exists(resume_data_path):
        return None
    
    async with aiofiles.open(resume_data_path, 'r') as f:
        resume_data = json.loads(await f.read())
    
    return resume_data

async def generate_questions_with_openai(resume_data: Dict[str, Any], session_id: str) -> List[InterviewQuestion]:
    """Generate interview questions using OpenAI API"""
    
    try:
        import openai
        
        openai.api_key = settings.OPENAI_API_KEY
        
        # Create a system message that instructs the model to generate interview questions
        system_message = {
            "role": "system",
            "content": "You are an expert interviewer. Generate relevant interview questions based on the candidate's resume."
        }
        
        # Create a user message with the resume data
        user_message = {
            "role": "user",
            "content": f"Generate {settings.INTERVIEW_QUESTIONS_COUNT} interview questions for a candidate with the following resume. Include a mix of behavioral, technical, and experience-based questions. Format the output as JSON with question text, type (behavioral, technical, experience), and difficulty (1-5).\n\nResume:\n{json.dumps(resume_data, indent=2)}"
        }
        
        # Call the OpenAI API
        response = openai.chat.completions.create(
            model="gpt-4",  # or another appropriate model
            messages=[system_message, user_message],
            temperature=0.7,
            max_tokens=2000,
            response_format={"type": "json_object"}
        )
        
        # Parse the response
        response_content = response.choices[0].message.content
        parsed_data = json.loads(response_content)
        
        # Convert to InterviewQuestion objects
        questions = []
        for i, q_data in enumerate(parsed_data.get("questions", [])):
            question = InterviewQuestion(
                question_id=f"{session_id}_{i}",
                text=q_data.get("text", "Tell me about yourself."),
                type=q_data.get("type", "general"),
                difficulty=q_data.get("difficulty", 3),
                order=i
            )
            questions.append(question)
        
        # Ensure we have the required number of questions
        if len(questions) < settings.INTERVIEW_QUESTIONS_COUNT:
            # Add default questions if needed
            default_questions = create_default_interview_questions(session_id)
            questions.extend(default_questions[len(questions):settings.INTERVIEW_QUESTIONS_COUNT])
        
        return questions[:settings.INTERVIEW_QUESTIONS_COUNT]
    
    except Exception as e:
        print(f"Error generating questions with OpenAI: {str(e)}")
        # Fall back to mock questions
        return create_mock_interview_questions(resume_data, session_id)

async def generate_questions_with_gemini(resume_data: Dict[str, Any], session_id: str) -> List[InterviewQuestion]:
    """Generate interview questions using Gemini API"""
    
    try:
        import google.generativeai as genai
        
        genai.configure(api_key=settings.GEMINI_API_KEY)
        
        # Set up the model
        model = genai.GenerativeModel('gemini-pro')
        
        # Create a prompt for the model
        prompt = f"""Generate {settings.INTERVIEW_QUESTIONS_COUNT} interview questions for a candidate with the following resume. Include a mix of behavioral, technical, and experience-based questions.

Resume:
{json.dumps(resume_data, indent=2)}

Output the questions as a valid JSON object with the following structure:
{{
  "questions": [
    {{
      "text": "Question text",
      "type": "behavioral|technical|experience|general",
      "difficulty": 3  // 1-5 scale
    }},
    // more questions...
  ]
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
        
        # Convert to InterviewQuestion objects
        questions = []
        for i, q_data in enumerate(parsed_data.get("questions", [])):
            question = InterviewQuestion(
                question_id=f"{session_id}_{i}",
                text=q_data.get("text", "Tell me about yourself."),
                type=q_data.get("type", "general"),
                difficulty=q_data.get("difficulty", 3),
                order=i
            )
            questions.append(question)
        
        # Ensure we have the required number of questions
        if len(questions) < settings.INTERVIEW_QUESTIONS_COUNT:
            # Add default questions if needed
            default_questions = create_default_interview_questions(session_id)
            questions.extend(default_questions[len(questions):settings.INTERVIEW_QUESTIONS_COUNT])
        
        return questions[:settings.INTERVIEW_QUESTIONS_COUNT]
    
    except Exception as e:
        print(f"Error generating questions with Gemini: {str(e)}")
        # Fall back to mock questions
        return create_mock_interview_questions(resume_data, session_id)

def create_mock_interview_questions(resume_data: Dict[str, Any], session_id: str) -> List[InterviewQuestion]:
    """Create mock interview questions for testing purposes"""
    
    # Extract skills from resume data
    skills = [skill.get("name", "") for skill in resume_data.get("skills", [])]
    
    # Extract experience from resume data
    experiences = resume_data.get("experience", [])
    latest_job = experiences[0].get("title", "your current role") if experiences else "your current role"
    
    # Create questions based on resume data
    questions = [
        InterviewQuestion(
            question_id=f"{session_id}_0",
            text="Tell me about yourself and your background in the industry.",
            type="general",
            difficulty=1,
            order=0
        ),
        InterviewQuestion(
            question_id=f"{session_id}_1",
            text=f"What are your key responsibilities in {latest_job}?",
            type="experience",
            difficulty=2,
            order=1
        )
    ]
    
    # Add skill-based questions
    for i, skill in enumerate(skills[:3]):
        questions.append(
            InterviewQuestion(
                question_id=f"{session_id}_{i+2}",
                text=f"Can you describe a project where you used {skill}?",
                type="technical",
                difficulty=3,
                order=i+2
            )
        )
    
    # Add behavioral questions
    behavioral_questions = [
        "Tell me about a time when you had to overcome a significant challenge at work.",
        "Describe a situation where you had to work with a difficult team member.",
        "How do you handle tight deadlines and pressure?",
        "Give an example of a time when you had to learn a new technology quickly.",
        "Describe a project that you're particularly proud of and your contribution to it."
    ]
    
    for i, question in enumerate(behavioral_questions):
        if len(questions) < settings.INTERVIEW_QUESTIONS_COUNT:
            questions.append(
                InterviewQuestion(
                    question_id=f"{session_id}_{len(questions)}",
                    text=question,
                    type="behavioral",
                    difficulty=4,
                    order=len(questions)
                )
            )
    
    return questions[:settings.INTERVIEW_QUESTIONS_COUNT]

def create_default_interview_questions(session_id: str) -> List[InterviewQuestion]:
    """Create default interview questions when resume data is not available"""
    
    default_questions = [
        InterviewQuestion(
            question_id=f"{session_id}_0",
            text="Tell me about yourself and your professional background.",
            type="general",
            difficulty=1,
            order=0
        ),
        InterviewQuestion(
            question_id=f"{session_id}_1",
            text="What are your key strengths and areas for improvement?",
            type="general",
            difficulty=2,
            order=1
        ),
        InterviewQuestion(
            question_id=f"{session_id}_2",
            text="Describe a challenging project you worked on and how you approached it.",
            type="behavioral",
            difficulty=3,
            order=2
        ),
        InterviewQuestion(
            question_id=f"{session_id}_3",
            text="How do you stay updated with the latest trends and technologies in your field?",
            type="general",
            difficulty=2,
            order=3
        ),
        InterviewQuestion(
            question_id=f"{session_id}_4",
            text="Where do you see yourself professionally in the next 3-5 years?",
            type="general",
            difficulty=2,
            order=4
        ),
        InterviewQuestion(
            question_id=f"{session_id}_5",
            text="Tell me about a time when you had to work with a difficult team member.",
            type="behavioral",
            difficulty=3,
            order=5
        ),
        InterviewQuestion(
            question_id=f"{session_id}_6",
            text="How do you handle tight deadlines and pressure?",
            type="behavioral",
            difficulty=3,
            order=6
        ),
        InterviewQuestion(
            question_id=f"{session_id}_7",
            text="What motivates you in your work?",
            type="general",
            difficulty=2,
            order=7
        ),
        InterviewQuestion(
            question_id=f"{session_id}_8",
            text="Describe your ideal work environment.",
            type="general",
            difficulty=1,
            order=8
        ),
        InterviewQuestion(
            question_id=f"{session_id}_9",
            text="Do you have any questions for me about the role or company?",
            type="general",
            difficulty=1,
            order=9
        )
    ]
    
    return default_questions[:settings.INTERVIEW_QUESTIONS_COUNT]

async def analyze_response(session_id: str, question_index: int, response_text: str) -> InterviewFeedback:
    """Analyze user's response to an interview question"""
    
    try:
        # Load interview session
        session = await load_interview_session(session_id)
        
        if not session:
            raise ValueError(f"Interview session not found: {session_id}")
        
        # Get the question
        if question_index >= len(session.questions):
            raise ValueError(f"Question index out of range: {question_index}")
        
        question = session.questions[question_index]
        
        # Use AI to analyze the response
        if settings.OPENAI_API_KEY:
            feedback = await analyze_with_openai(question, response_text)
        elif settings.GEMINI_API_KEY:
            feedback = await analyze_with_gemini(question, response_text)
        else:
            # No API keys available, use mock feedback
            feedback = create_mock_feedback(question, response_text)
        
        return feedback
    
    except Exception as e:
        print(f"Error analyzing response: {str(e)}")
        # Return default feedback
        return create_default_feedback()

async def load_interview_session(session_id: str) -> Optional[InterviewSession]:
    """Load interview session from file"""
    
    session_dir = os.path.join(settings.UPLOAD_DIR, "interviews", session_id)
    session_path = os.path.join(session_dir, "session.json")
    
    if not os.path.exists(session_path):
        return None
    
    async with aiofiles.open(session_path, 'r') as f:
        session_data = json.loads(await f.read())
    
    return InterviewSession(**session_data)

async def analyze_with_openai(question: InterviewQuestion, response_text: str) -> InterviewFeedback:
    """Analyze response using OpenAI API"""
    
    try:
        import openai
        
        openai.api_key = settings.OPENAI_API_KEY
        
        # Create a system message that instructs the model to analyze the response
        system_message = {
            "role": "system",
            "content": "You are an expert interviewer and coach. Analyze the candidate's response to the interview question and provide constructive feedback."
        }
        
        # Create a user message with the question and response
        user_message = {
            "role": "user",
            "content": f"Analyze the following response to an interview question. Provide feedback on content, clarity, relevance, and confidence. Score the response on a scale of 1-10. Include specific strengths and areas for improvement.\n\nQuestion: {question.text}\nQuestion Type: {question.type}\nDifficulty: {question.difficulty}/5\n\nResponse: {response_text}"
        }
        
        # Call the OpenAI API
        response = openai.chat.completions.create(
            model="gpt-4",  # or another appropriate model
            messages=[system_message, user_message],
            temperature=0.5,
            max_tokens=1000,
            response_format={"type": "json_object"}
        )
        
        # Parse the response
        response_content = response.choices[0].message.content
        parsed_data = json.loads(response_content)
        
        # Create feedback object
        feedback = InterviewFeedback(
            question_id=question.question_id,
            score=parsed_data.get("score", 5),
            content_feedback=parsed_data.get("content_feedback", "Your answer addressed the question."),
            clarity_feedback=parsed_data.get("clarity_feedback", "Your response was clear."),
            confidence_feedback=parsed_data.get("confidence_feedback", "You demonstrated confidence."),
            strengths=parsed_data.get("strengths", ["You provided a relevant answer."]),
            improvements=parsed_data.get("improvements", ["Consider providing more specific examples."])
        )
        
        return feedback
    
    except Exception as e:
        print(f"Error analyzing with OpenAI: {str(e)}")
        # Fall back to mock feedback
        return create_mock_feedback(question, response_text)

async def analyze_with_gemini(question: InterviewQuestion, response_text: str) -> InterviewFeedback:
    """Analyze response using Gemini API"""
    
    try:
        import google.generativeai as genai
        
        genai.configure(api_key=settings.GEMINI_API_KEY)
        
        # Set up the model
        model = genai.GenerativeModel('gemini-pro')
        
        # Create a prompt for the model
        prompt = f"""Analyze the following response to an interview question. Provide feedback on content, clarity, relevance, and confidence. Score the response on a scale of 1-10. Include specific strengths and areas for improvement.

Question: {question.text}
Question Type: {question.type}
Difficulty: {question.difficulty}/5

Response: {response_text}

Output the analysis as a valid JSON object with the following structure:
{{
  "score": 7,  // 1-10 scale
  "content_feedback": "Feedback on the content of the response",
  "clarity_feedback": "Feedback on the clarity of the response",
  "confidence_feedback": "Feedback on the confidence demonstrated",
  "strengths": ["Strength 1", "Strength 2", "Strength 3"],
  "improvements": ["Area for improvement 1", "Area for improvement 2"]
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
        
        # Create feedback object
        feedback = InterviewFeedback(
            question_id=question.question_id,
            score=parsed_data.get("score", 5),
            content_feedback=parsed_data.get("content_feedback", "Your answer addressed the question."),
            clarity_feedback=parsed_data.get("clarity_feedback", "Your response was clear."),
            confidence_feedback=parsed_data.get("confidence_feedback", "You demonstrated confidence."),
            strengths=parsed_data.get("strengths", ["You provided a relevant answer."]),
            improvements=parsed_data.get("improvements", ["Consider providing more specific examples."])
        )
        
        return feedback
    
    except Exception as e:
        print(f"Error analyzing with Gemini: {str(e)}")
        # Fall back to mock feedback
        return create_mock_feedback(question, response_text)

def create_mock_feedback(question: InterviewQuestion, response_text: str) -> InterviewFeedback:
    """Create mock feedback for testing purposes"""
    
    # Simple analysis based on response length and keywords
    response_length = len(response_text.split())
    
    # Score based on length (simple heuristic)
    score = min(max(response_length // 20, 1), 10)  # 1-10 scale
    
    # Check for specific keywords based on question type
    keywords = []
    if question.type == "behavioral":
        keywords = ["situation", "task", "action", "result", "learned", "challenge", "team", "problem", "solution"]
    elif question.type == "technical":
        keywords = ["experience", "project", "technology", "implemented", "developed", "designed", "architecture", "solution"]
    elif question.type == "experience":
        keywords = ["responsibility", "role", "achievement", "project", "team", "managed", "led", "improved"]
    
    # Count keywords
    keyword_count = sum(1 for keyword in keywords if keyword.lower() in response_text.lower())
    
    # Adjust score based on keywords
    score = min(max(score + keyword_count // 2, 1), 10)
    
    # Generate feedback
    strengths = []
    improvements = []
    
    if response_length > 50:
        strengths.append("You provided a detailed response.")
    else:
        improvements.append("Consider providing more details in your response.")
    
    if keyword_count > 3:
        strengths.append("You used relevant terminology and concepts.")
    else:
        improvements.append("Try to incorporate more specific terminology relevant to the question.")
    
    if "example" in response_text.lower() or "instance" in response_text.lower():
        strengths.append("You provided concrete examples to support your answer.")
    else:
        improvements.append("Consider including specific examples to illustrate your points.")
    
    # Ensure we have at least one strength and one improvement
    if not strengths:
        strengths.append("You addressed the question directly.")
    
    if not improvements:
        improvements.append("Consider structuring your response with a clear beginning, middle, and end.")
    
    # Create feedback object
    feedback = InterviewFeedback(
        question_id=question.question_id,
        score=score,
        content_feedback="Your answer was relevant to the question." if score > 5 else "Your answer could be more focused on the question.",
        clarity_feedback="Your response was clear and well-structured." if score > 5 else "Your response could be more organized.",
        confidence_feedback="You demonstrated confidence in your response." if score > 5 else "Try to speak with more confidence.",
        strengths=strengths,
        improvements=improvements
    )
    
    return feedback

def create_default_feedback() -> InterviewFeedback:
    """Create default feedback when analysis fails"""
    
    return InterviewFeedback(
        question_id="unknown",
        score=5,
        content_feedback="Your answer addressed the question.",
        clarity_feedback="Your response was clear.",
        confidence_feedback="You demonstrated confidence in your response.",
        strengths=["You provided a relevant answer."],
        improvements=["Consider providing more specific examples to support your points."]
    )

async def generate_interview_summary(session_id: str) -> InterviewSummary:
    """Generate a summary of the interview session"""
    
    try:
        # Load interview session
        session = await load_interview_session(session_id)
        
        if not session:
            raise ValueError(f"Interview session not found: {session_id}")
        
        # Check if all questions have responses and feedback
        if not all(q.response and q.feedback for q in session.questions):
            raise ValueError("Not all questions have responses and feedback")
        
        # Use AI to generate summary
        if settings.OPENAI_API_KEY:
            summary = await generate_summary_with_openai(session)
        elif settings.GEMINI_API_KEY:
            summary = await generate_summary_with_gemini(session)
        else:
            # No API keys available, use mock summary
            summary = create_mock_summary(session)
        
        return summary
    
    except Exception as e:
        print(f"Error generating interview summary: {str(e)}")
        # Return default summary
        return create_default_summary(session_id)

async def generate_summary_with_openai(session: InterviewSession) -> InterviewSummary:
    """Generate interview summary using OpenAI API"""
    
    try:
        import openai
        
        openai.api_key = settings.OPENAI_API_KEY
        
        # Create a system message that instructs the model to generate a summary
        system_message = {
            "role": "system",
            "content": "You are an expert interviewer and coach. Generate a comprehensive summary of the interview session."
        }
        
        # Create a user message with the session data
        user_message = {
            "role": "user",
            "content": f"Generate a comprehensive summary of the following interview session. Include overall performance, key strengths, areas for improvement, and specific recommendations. Calculate an average score based on the individual question scores.\n\nInterview Session:\n{json.dumps(session.dict(), indent=2)}"
        }
        
        # Call the OpenAI API
        response = openai.chat.completions.create(
            model="gpt-4",  # or another appropriate model
            messages=[system_message, user_message],
            temperature=0.5,
            max_tokens=1500,
            response_format={"type": "json_object"}
        )
        
        # Parse the response
        response_content = response.choices[0].message.content
        parsed_data = json.loads(response_content)
        
        # Calculate average score
        scores = [q.feedback.score for q in session.questions if q.feedback]
        avg_score = sum(scores) / len(scores) if scores else 5
        
        # Create summary object
        summary = InterviewSummary(
            session_id=session.session_id,
            average_score=parsed_data.get("average_score", avg_score),
            overall_feedback=parsed_data.get("overall_feedback", "You performed well in the interview."),
            strengths=parsed_data.get("strengths", ["You provided relevant answers."]),
            improvements=parsed_data.get("improvements", ["Consider providing more specific examples."]),
            recommendations=parsed_data.get("recommendations", ["Practice structuring your responses using the STAR method."])
        )
        
        return summary
    
    except Exception as e:
        print(f"Error generating summary with OpenAI: {str(e)}")
        # Fall back to mock summary
        return create_mock_summary(session)

async def generate_summary_with_gemini(session: InterviewSession) -> InterviewSummary:
    """Generate interview summary using Gemini API"""
    
    try:
        import google.generativeai as genai
        
        genai.configure(api_key=settings.GEMINI_API_KEY)
        
        # Set up the model
        model = genai.GenerativeModel('gemini-pro')
        
        # Create a prompt for the model
        prompt = f"""Generate a comprehensive summary of the following interview session. Include overall performance, key strengths, areas for improvement, and specific recommendations. Calculate an average score based on the individual question scores.

Interview Session:
{json.dumps(session.dict(), indent=2)}

Output the summary as a valid JSON object with the following structure:
{{
  "average_score": 7.5,  // 1-10 scale
  "overall_feedback": "Overall assessment of the interview performance",
  "strengths": ["Strength 1", "Strength 2", "Strength 3"],
  "improvements": ["Area for improvement 1", "Area for improvement 2"],
  "recommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"]
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
        
        # Calculate average score
        scores = [q.feedback.score for q in session.questions if q.feedback]
        avg_score = sum(scores) / len(scores) if scores else 5
        
        # Create summary object
        summary = InterviewSummary(
            session_id=session.session_id,
            average_score=parsed_data.get("average_score", avg_score),
            overall_feedback=parsed_data.get("overall_feedback", "You performed well in the interview."),
            strengths=parsed_data.get("strengths", ["You provided relevant answers."]),
            improvements=parsed_data.get("improvements", ["Consider providing more specific examples."]),
            recommendations=parsed_data.get("recommendations", ["Practice structuring your responses using the STAR method."])
        )
        
        return summary
    
    except Exception as e:
        print(f"Error generating summary with Gemini: {str(e)}")
        # Fall back to mock summary
        return create_mock_summary(session)

def create_mock_summary(session: InterviewSession) -> InterviewSummary:
    """Create mock interview summary for testing purposes"""
    
    # Calculate average score
    scores = [q.feedback.score for q in session.questions if q.feedback]
    avg_score = sum(scores) / len(scores) if scores else 5
    
    # Collect strengths and improvements from all feedback
    all_strengths = []
    all_improvements = []
    
    for question in session.questions:
        if question.feedback:
            all_strengths.extend(question.feedback.strengths)
            all_improvements.extend(question.feedback.improvements)
    
    # Count occurrences of each strength and improvement
    from collections import Counter
    
    strength_counter = Counter(all_strengths)
    improvement_counter = Counter(all_improvements)
    
    # Get the most common strengths and improvements
    top_strengths = [s for s, _ in strength_counter.most_common(3)]
    top_improvements = [i for i, _ in improvement_counter.most_common(3)]
    
    # Ensure we have at least some strengths and improvements
    if not top_strengths:
        top_strengths = ["You provided relevant answers to the questions.", "You demonstrated knowledge in your field."]
    
    if not top_improvements:
        top_improvements = ["Consider providing more specific examples.", "Practice structuring your responses more clearly."]
    
    # Generate recommendations based on improvements
    recommendations = [
        "Practice using the STAR method (Situation, Task, Action, Result) for behavioral questions.",
        "Prepare specific examples from your experience that highlight your skills and achievements.",
        "Record yourself answering practice questions to improve clarity and confidence."
    ]
    
    # Create overall feedback based on average score
    if avg_score >= 8:
        overall_feedback = "You performed excellently in this interview. Your responses were clear, relevant, and demonstrated strong experience and skills."
    elif avg_score >= 6:
        overall_feedback = "You performed well in this interview. Your responses were generally good, with some areas that could be improved."
    elif avg_score >= 4:
        overall_feedback = "Your interview performance was satisfactory. There are several areas where you could improve to make a stronger impression."
    else:
        overall_feedback = "Your interview performance needs significant improvement. Focus on the recommendations to better prepare for future interviews."
    
    # Create summary object
    summary = InterviewSummary(
        session_id=session.session_id,
        average_score=avg_score,
        overall_feedback=overall_feedback,
        strengths=top_strengths,
        improvements=top_improvements,
        recommendations=recommendations
    )
    
    return summary

def create_default_summary(session_id: str) -> InterviewSummary:
    """Create default summary when generation fails"""
    
    return InterviewSummary(
        session_id=session_id,
        average_score=5,
        overall_feedback="Thank you for completing the interview. Here is a summary of your performance.",
        strengths=[
            "You completed all the interview questions.",
            "You demonstrated willingness to engage with the interview process."
        ],
        improvements=[
            "Consider providing more specific examples in your responses.",
            "Practice structuring your answers more clearly."
        ],
        recommendations=[
            "Practice using the STAR method (Situation, Task, Action, Result) for behavioral questions.",
            "Prepare specific examples from your experience that highlight your skills and achievements.",
            "Record yourself answering practice questions to improve clarity and confidence."
        ]
    )