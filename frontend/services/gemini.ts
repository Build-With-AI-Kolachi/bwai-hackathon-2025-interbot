import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

// Change the model name here
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-001' });

export interface InterviewQuestion {
  question: string;
  follow_up_possible: boolean;
}

export interface InterviewFeedback {
  content: string;
  tone: string;
  clarity: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  engagement: number; // 0-100
  confidence: number; // 0-100
  keywords: string[];
}

export async function generateInterviewQuestions(
  resumeText: string,
  experienceLevel: string,
  previousAnswers: { question: string; answer: string }[] = []
): Promise<InterviewQuestion> {
  if (!previousAnswers || previousAnswers.length === 0) {
    // No context, return a generic question directly
    return { question: "Tell me about yourself and your professional background.", follow_up_possible: true };
  }

  const chat = model.startChat({});

  const history = previousAnswers.flatMap(item => [
    { role: 'user', parts: [{ text: `Question: ${item.question}\nAnswer: ${item.answer}` }] },
    { role: 'model', parts: [{ text: 'Acknowledged. Proceeding with the next question.' }] }, // Simulate model acknowledging previous answer
  ]);

  // Add initial prompt or context
  await chat.sendMessage([{
    text: `You are an AI interviewer. Based on the candidate's resume (if provided) and experience level, generate a relevant interview question. Previous questions and answers are provided in the chat history. Do NOT repeat previous questions. Ask ONLY one question at a time.\n\nIMPORTANT: Your response MUST ALWAYS be a valid JSON object in the format { \"question\": \"...\", \"follow_up_possible\": true/false }. If you do not have enough context, you MUST still return a generic interview question as a JSON object. Never reply with plain text or ask for more context.\n\nResume: ${resumeText}, Experience Level: ${experienceLevel}`
  }]);

  const prompt = `Generate the next interview question based on the provided context and chat history. Ensure it is relevant and encourages detailed responses.\n\nFormat the response as a JSON object: { \"question\": \"string\", \"follow_up_possible\": boolean }.\n\nIf you do not have enough context, you MUST still return a generic interview question in the required JSON format. Never reply with plain text or ask for more context.`;

  try {
    const result = await chat.sendMessage(prompt);
    const responseText = result.response.text();

    // Attempt to extract JSON from potentially non-JSON response
    const jsonMatch = responseText.match(/\{.*?\}/s);
    if (jsonMatch && jsonMatch[0]) {
      try {
        const jsonResponse = JSON.parse(jsonMatch[0]);
        if (typeof jsonResponse.question === 'string' && typeof jsonResponse.follow_up_possible === 'boolean') {
          return jsonResponse as InterviewQuestion;
        } else {
          console.error('Parsed JSON has incorrect structure:', jsonResponse);
          return { question: "I'm sorry, I couldn't generate a question right now. Could you tell me about a project you're proud of?", follow_up_possible: true };
        }
      } catch (parseError) {
        console.error('Failed to parse JSON from response:', responseText, parseError);
        // Fallback to a generic question if JSON parsing fails
        return { question: "Could you tell me about your experience with a specific technology mentioned in your resume?", follow_up_possible: true };
      }
    } else {
      console.error('No JSON found in response:', responseText);
      // Fallback if no JSON is found in the response text
      return { question: "Tell me about yourself and your professional background.", follow_up_possible: true };
    }

  } catch (error) {
    console.error('Error generating interview questions:', error);
    // Provide a fallback question in case of API errors
    return { question: "I encountered an issue. Could you please describe your most recent professional accomplishment?", follow_up_possible: true };
  }
}

export async function analyzeResponse(
  question: string,
  answer: string,
  resumeText: string
): Promise<InterviewFeedback> {
  const prompt = `Analyze the following interview response based on the question and the candidate's resume (if provided). Provide feedback on content, tone, and clarity. Also, provide a sentiment (positive, neutral, negative), engagement score (0-100), confidence score (0-100), and extract key points/keywords from the answer. Format the response as a JSON object: { "content": "string", "tone": "string", "clarity": "string", "sentiment": "positive"|"neutral"|"negative", "engagement": number, "confidence": number, "keywords": string[] }.\n\nQuestion: ${question}\nAnswer: ${answer}\nResume: ${resumeText}`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Attempt to extract JSON from potentially non-JSON response
    const jsonMatch = responseText.match(/\{.*?\}/s);
    if (jsonMatch && jsonMatch[0]) {
      try {
        const jsonResponse = JSON.parse(jsonMatch[0]);
        // Basic validation of the parsed JSON structure
        if (
          typeof jsonResponse.content === 'string' &&
          typeof jsonResponse.tone === 'string' &&
          typeof jsonResponse.clarity === 'string' &&
          ['positive', 'neutral', 'negative'].includes(jsonResponse.sentiment) &&
          typeof jsonResponse.engagement === 'number' && jsonResponse.engagement >= 0 && jsonResponse.engagement <= 100 &&
          typeof jsonResponse.confidence === 'number' && jsonResponse.confidence >= 0 && jsonResponse.confidence <= 100 &&
          Array.isArray(jsonResponse.keywords) && jsonResponse.keywords.every((item: any) => typeof item === 'string')
        ) {
          return jsonResponse as InterviewFeedback;
        } else {
          console.error('Parsed JSON has incorrect structure or values:', jsonResponse);
           return {
             content: "Could not generate detailed feedback. Ensure your response was clear.",
             tone: "Please maintain a confident tone.",
             clarity: "Focus on clear and concise communication.",
             sentiment: "neutral",
             engagement: 50,
             confidence: 50,
             keywords: []
           };
        }
      } catch (parseError) {
        console.error('Failed to parse JSON from response:', responseText, parseError);
        // Fallback feedback if JSON parsing fails
        return {
          content: "Feedback parsing failed. Focus on providing comprehensive answers.",
          tone: "Ensure a professional tone.",
          clarity: "Speak clearly.",
          sentiment: "neutral",
          engagement: 50,
          confidence: 50,
          keywords: []
        };
      }
    }
     else {
      console.error('No JSON found in response:', responseText);
      // Fallback feedback if no JSON is found
       return {
         content: "Feedback generation failed. Ensure your response directly addresses the question.",
         tone: "Maintain an engaged tone.",
         clarity: "Structure your response logically.",
         sentiment: "neutral",
         engagement: 50,
         confidence: 50,
         keywords: []
       };
    }

  } catch (error) {
    console.error('Error analyzing response:', error);
    // Provide fallback feedback in case of API errors
    return {
      content: "An error occurred during feedback analysis. Please try again.",
      tone: "Maintain a steady tone.",
      clarity: "Ensure your answers are easy to understand.",
      sentiment: "neutral",
      engagement: 50,
      confidence: 50,
      keywords: []
    };
  }
}
