'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaDownload, FaRedo } from 'react-icons/fa';

import SummaryCard from '@/components/SummaryCard';
import FeedbackCard from '@/components/FeedbackCard';

interface InterviewQuestion {
  id: string;
  text: string;
  type: string;
}

interface InterviewResponse {
  text: string;
  audio_url?: string;
  duration?: number;
}

interface InterviewFeedback {
  score: number;
  content: string;
  clarity: string;
  confidence: string;
  strengths: string[];
  improvements: string[];
}

interface InterviewData {
  session_id: string;
  resume_id: string;
  questions: InterviewQuestion[];
  responses: InterviewResponse[];
  feedback: InterviewFeedback[];
  summary: {
    average_score: number;
    overall_feedback: string;
    strengths: string[];
    improvements: string[];
    recommendations: string[];
  };
  completed: boolean;
  created_at: string;
  updated_at: string;
}

const InterviewSummaryPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [interviewData, setInterviewData] = useState<InterviewData | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID provided');
      setLoading(false);
      return;
    }

    const fetchInterviewData = async () => {
      try {
        // In a real app, this would be an API call to get the interview data
        // For now, we'll simulate it with a timeout and mock data
        const response = await fetch(`/api/interview/${sessionId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch interview data');
        }
        
        const data = await response.json();
        setInterviewData(data);
      } catch (err) {
        console.error('Error fetching interview data:', err);
        setError('Failed to load interview data. Please try again.');
        
        // For demo purposes, create mock data if the API fails
        setInterviewData(createMockInterviewData());
      } finally {
        setLoading(false);
      }
    };

    fetchInterviewData();
  }, [sessionId]);

  const downloadReport = async () => {
    if (!interviewData) return;
    
    try {
      // In a real app, this would be an API call to generate and download the report
      // For now, we'll simulate it with a timeout
      const response = await fetch(`/api/interview/${sessionId}/report`, {
        method: 'GET',
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate report');
      }
      
      // Get the blob from the response
      const blob = await response.blob();
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link element
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `interview-report-${sessionId}.zip`;
      
      // Append the link to the body
      document.body.appendChild(a);
      
      // Click the link to trigger the download
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading report:', err);
      alert('Failed to download report. Please try again.');
      
      // For demo purposes, create a mock report download
      simulateMockReportDownload();
    }
  };

  const startNewInterview = () => {
    router.push('/interview');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Loading your interview results...</h2>
        </div>
      </div>
    );
  }

  if (error || !interviewData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="text-center max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
            {error || 'Something went wrong'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We couldn't load your interview results. Please try again or start a new interview.
          </p>
          <div className="flex flex-col space-y-3">
            <Link 
              href="/interview"
              className="w-full px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors duration-200"
            >
              Start New Interview
            </Link>
            <Link 
              href="/"
              className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link 
              href="/"
              className="flex items-center text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
            >
              <FaArrowLeft className="mr-2" />
              <span>Home</span>
            </Link>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={downloadReport}
              className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors duration-200"
            >
              <FaDownload className="mr-2" />
              <span>Download Report</span>
            </button>
            <button
              onClick={startNewInterview}
              className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <FaRedo className="mr-2" />
              <span>New Interview</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <SummaryCard
            averageScore={interviewData.summary.average_score}
            overallFeedback={interviewData.summary.overall_feedback}
            strengths={interviewData.summary.strengths}
            improvements={interviewData.summary.improvements}
            recommendations={interviewData.summary.recommendations}
            onDownload={downloadReport}
          />
        </motion.div>

        {/* Question Feedback Cards */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Detailed Feedback by Question</h2>
        
        <div className="space-y-8">
          {interviewData.questions.map((question, index) => {
            // Only show feedback for questions that have responses and feedback
            if (index < interviewData.responses.length && index < interviewData.feedback.length) {
              return (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <FeedbackCard
                    questionText={question.text}
                    responseText={interviewData.responses[index].text}
                    score={interviewData.feedback[index].score}
                    contentFeedback={interviewData.feedback[index].content}
                    clarityFeedback={interviewData.feedback[index].clarity}
                    confidenceFeedback={interviewData.feedback[index].confidence}
                    strengths={interviewData.feedback[index].strengths}
                    improvements={interviewData.feedback[index].improvements}
                  />
                </motion.div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

// Helper function to create mock interview data for demo purposes
function createMockInterviewData(): InterviewData {
  return {
    session_id: 'mock-session-123',
    resume_id: 'mock-resume-123',
    questions: [
      { id: 'q1', text: 'Tell me about your experience with React and Next.js.', type: 'technical' },
      { id: 'q2', text: 'Describe a challenging project you worked on and how you overcame obstacles.', type: 'behavioral' },
      { id: 'q3', text: 'How do you stay updated with the latest technologies in your field?', type: 'general' },
    ],
    responses: [
      { text: 'I have been working with React for 3 years and Next.js for about 1.5 years. I have built several production applications using these technologies, including e-commerce platforms and content management systems. I particularly enjoy Next.js for its server-side rendering capabilities and improved SEO performance.', duration: 45 },
      { text: 'One challenging project was developing a real-time collaboration tool with WebSockets. We faced issues with connection stability and data synchronization. I implemented a robust error handling system and offline mode that would queue changes and sync when connection was restored. This improved user experience significantly.', duration: 62 },
      { text: 'I follow several tech blogs and newsletters like JavaScript Weekly and React Status. I also participate in online communities, attend virtual conferences, and work on side projects to experiment with new technologies. Recently, I've been exploring AI integration in web applications.', duration: 38 },
    ],
    feedback: [
      {
        score: 8,
        content: 'Your answer demonstrates solid experience with React and Next.js, with specific mentions of production applications you've built. You've highlighted the benefits of Next.js, showing technical understanding.',
        clarity: 'Your response was clear and well-structured, making it easy to follow your experience timeline.',
        confidence: 'You spoke with confidence about your experience, which comes across well to the interviewer.',
        strengths: [
          'Specific mention of years of experience',
          'Examples of real applications built',
          'Highlighting technical benefits of Next.js',
        ],
        improvements: [
          'Could mention specific features of React you're proficient with',
          'Consider mentioning any performance optimizations you've implemented',
        ],
      },
      {
        score: 9,
        content: 'Excellent response that clearly identifies the challenge (real-time collaboration with WebSockets), the specific issues (connection stability, data sync), and your solution (error handling, offline mode). You also mentioned the positive outcome.',
        clarity: 'Very well-structured answer following the STAR method (Situation, Task, Action, Result) which is ideal for behavioral questions.',
        confidence: 'You demonstrated strong problem-solving abilities and technical expertise in your delivery.',
        strengths: [
          'Clear problem identification',
          'Specific technical solution described',
          'Mentioned the positive outcome of your solution',
          'Followed STAR method effectively',
        ],
        improvements: [
          'Could briefly mention what you learned from this experience',
          'Consider quantifying the improvement in user experience if possible',
        ],
      },
      {
        score: 7,
        content: 'Good answer showing multiple ways you stay updated (blogs, newsletters, communities, conferences, side projects). The mention of AI exploration shows forward-thinking.',
        clarity: 'Your answer was organized and easy to follow, listing different methods you use.',
        confidence: 'You conveyed enthusiasm for continuous learning, which is positive.',
        strengths: [
          'Multiple learning methods mentioned',
          'Specific resources named (JavaScript Weekly, React Status)',
          'Mention of current interest in AI integration shows initiative',
        ],
        improvements: [
          'Could mention how you apply new knowledge in your work',
          'Consider discussing how you evaluate which new technologies are worth learning',
          'Mention any formal learning like courses or certifications',
        ],
      },
    ],
    summary: {
      average_score: 8.0,
      overall_feedback: 'You performed very well in this mock interview, demonstrating strong technical knowledge, good communication skills, and a structured approach to answering questions. Your responses were detailed and included specific examples, which is exactly what interviewers look for. You showed confidence in discussing both technical concepts and your problem-solving approach.',
      strengths: [
        'Strong technical knowledge of React and Next.js with practical examples',
        'Excellent problem-solving skills demonstrated through the WebSocket challenge example',
        'Clear, structured responses following interview best practices',
        'Good balance of technical details and high-level explanations',
        'Demonstrated continuous learning mindset and staying current with technology',
      ],
      improvements: [
        'Some answers could include more quantifiable results or metrics',
        'Consider preparing more specific examples of performance optimizations',
        'Develop more detailed explanations of how you apply new technologies in practical scenarios',
        'Practice discussing technical concepts at different levels of complexity for different audiences',
      ],
      recommendations: [
        'Prepare 2-3 more examples of technical challenges you've overcome with specific details about your approach',
        'Practice quantifying the impact of your work with metrics when possible (e.g., "improved performance by 40%")',
        'Consider creating a portfolio that showcases the projects you mentioned to provide visual evidence of your work',
        'Prepare questions for the interviewer that demonstrate your interest in their technical challenges',
        'Continue focusing on the intersection of AI and web development as it's a growing area of interest',
      ],
    },
    completed: true,
    created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    updated_at: new Date().toISOString(),
  };
}

// Helper function to simulate a mock report download
function simulateMockReportDownload() {
  // Create a simple text file as a mock report
  const mockReportContent = JSON.stringify(createMockInterviewData(), null, 2);
  const blob = new Blob([mockReportContent], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'mock-interview-report.json';
  
  document.body.appendChild(a);
  a.click();
  
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

export default InterviewSummaryPage;