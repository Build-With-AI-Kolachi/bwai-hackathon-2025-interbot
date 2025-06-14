'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FiMic, FiMicOff, FiMessageSquare, FiDownload, FiClock, FiVideo, FiVideoOff, FiUser, FiArrowRight } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';
import StreamingText from '@/components/StreamingText';
import { generateInterviewQuestions, analyzeResponse, type InterviewQuestion, type InterviewFeedback } from '@/services/gemini';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { motion, AnimatePresence } from 'framer-motion';

// Add type definitions for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
  interpretation: string | null;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  audioUrl?: string; // URL to the recorded audio
};

type InterviewState = 'intro' | 'question' | 'listening' | 'processing' | 'feedback' | 'complete';

interface StreamingTextProps {
  text: string;
  speed?: number;
}

function StreamingText({ text, speed = 30 }: StreamingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);

  return <span>{displayedText}</span>;
}

const InterviewerAvatar = dynamic(() => import('@/components/InterviewerAvatar'), { ssr: false });

export default function InterviewSession() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [interviewState, setInterviewState] = useState<InterviewState>('intro');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [feedback, setFeedback] = useState<InterviewFeedback | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [micPermission, setMicPermission] = useState<boolean | null>(null);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  
  // Mock interview questions
  const mockQuestions = [
    "Tell me about yourself and your background.",
    "What are your greatest strengths and how have you applied them in your previous roles?",
    "Describe a challenging situation you faced at work and how you handled it.",
    "Why are you interested in this position and what can you bring to the role?",
    "Where do you see yourself in five years?"
  ];
  
  const mockFeedback = {
    content: "Your answer was comprehensive and highlighted relevant experience. Consider providing more specific examples of achievements with metrics.",
    tone: "Professional and confident. Maintain consistent volume throughout your response.",
    clarity: "Well-structured response. Try to reduce filler words like 'um' and 'like' for improved clarity."
  };

  // Check permissions
  const checkPermissions = async () => {
    try {
      // Check microphone
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStream.getTracks().forEach(track => track.stop());
      setMicPermission(true);

      // Check camera
      const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoStream.getTracks().forEach(track => track.stop());
      setCameraPermission(true);

      return true;
    } catch (error: any) {
      console.error('Permission check failed:', error);
      if (error && error.name === 'NotAllowedError') {
        alert('Access to camera or microphone was denied. Please allow permissions in your browser settings and reload the page.');
      } else if (error && error.name === 'NotFoundError') {
        alert('No camera or microphone device found. Please connect a device and try again.');
      } else if (error && error.name === 'NotReadableError') {
        alert('Camera or microphone is already in use by another application. Please close other apps (like Google Meet, Zoom, etc.) and try again.');
      } else {
        alert('Could not access camera or microphone. Please check your device and browser settings.');
      }
      setMicPermission(false);
      setCameraPermission(false);
      return false;
    }
  };

  // Start interview with permissions
  const startInterviewWithPermissions = async () => {
    setIsStarting(true);
    try {
      const permissionsGranted = await checkPermissions();
      
      if (!permissionsGranted) {
        alert('Please grant microphone and camera permissions to start the interview.');
        return;
      }

      // Start camera
      try {
        const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = videoStream;
        if (videoRef.current) {
          videoRef.current.srcObject = videoStream;
        }
        setIsCameraOn(true);
      } catch (videoError) {
        console.error('Could not start video source:', videoError);
        alert('Could not start video source. Please check your camera and permissions.');
        setIsCameraOn(false);
        return;
      }

      // Generate first question
      const question = await generateInterviewQuestions(
        "User's resume would go here",
        "mid-level"
      );
      setCurrentQuestion(question);
      
      // Add initial question message
      const questionMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: question.question,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, questionMessage]);
      setIsSpeaking(true);
      setInterviewState('question');
      
      // Start timer
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        if (startTimeRef.current) {
          const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
          setElapsedTime(elapsed);
        }
      }, 1000);
    } catch (error) {
      console.error('Error starting interview:', error);
      alert('Failed to start interview. Please try again.');
    } finally {
      setIsStarting(false);
    }
  };

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSpeechSupported(!!SpeechRecognition);

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setCurrentTranscript(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        stopListening();
      };

      recognitionRef.current = recognition;
    }

    // Check microphone permission on component mount
    checkPermissions();

    // Simulate loading resume data
    const loadInterview = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add initial assistant message
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Hello! I'm your AI interviewer today. I've reviewed your resume and I'm ready to ask you some questions about your experience and skills. When you're ready to begin, click the 'Start Interview' button.",
        timestamp: new Date()
      };
      
      setMessages([welcomeMessage]);
      setIsLoading(false);
    };
    
    loadInterview();
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isCameraOn) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.error('Error accessing camera:', err);
          alert('Could not start video source. Please check your camera and permissions.');
          setIsCameraOn(false);
        });
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  }, [isCameraOn]);

  const askNextQuestion = async () => {
    const previousAnswers = messages
      .filter(msg => msg.role === 'user')
      .map(msg => ({
        question: messages[messages.indexOf(msg) - 1]?.content || '',
        answer: msg.content
      }));

    const question = await generateInterviewQuestions(
      "User's resume would go here",
      "mid-level",
      previousAnswers
    );
    
    setCurrentQuestion(question);
    
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: question.question,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInterviewState('question');
    setIsSpeaking(true);
  };

  const handleResponseComplete = async (transcript: string) => {
    if (!currentQuestion) return;

    const analysis = await analyzeResponse(
      currentQuestion.question,
      transcript,
      "User's resume would go here"
    );
    
    setFeedback(analysis);
    setInterviewState('feedback');
  };

  const toggleListening = async () => {
    console.log('Toggle listening clicked, current state:', {
      isListening,
      interviewState,
      micPermission
    });

    if (isListening) {
      stopListening();
    } else {
      try {
        if (micPermission === false) {
          const result = window.confirm('Microphone access is required. Would you like to grant permission?');
          if (result) {
            await checkPermissions();
            if (micPermission) {
              await startListening();
            }
          }
        } else {
          await startListening();
        }
      } catch (error) {
        console.error('Error in toggleListening:', error);
        alert('There was an error accessing the microphone. Please try again.');
      }
    }
  };

  const startListening = async () => {
    console.log('Starting listening...');
    
    if (!isSpeechSupported) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      console.log('Microphone access granted');
      streamRef.current = stream;
      setMicPermission(true);
      
      // Initialize MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm;codecs=opus' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Add user message with transcript and audio
        const userMessage: Message = {
          id: Date.now().toString(),
          role: 'user',
          content: currentTranscript,
          timestamp: new Date(),
          audioUrl
        };
        
        setMessages(prev => [...prev, userMessage]);
        setCurrentTranscript('');
        setInterviewState('processing');
        
        // Simulate processing time
        setTimeout(() => {
          handleResponseComplete(currentTranscript);
        }, 2000);
      };

      // Start recording
      mediaRecorder.start();
      console.log('MediaRecorder started');
      
      // Start speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.start();
        console.log('Speech recognition started');
      }
      
      setIsListening(true);
      setInterviewState('listening');
      setCurrentTranscript('');
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setMicPermission(false);
      alert('Unable to access microphone. Please ensure you have granted microphone permissions.');
    }
  };

  const stopListening = () => {
    console.log('Stopping listening...');
    setIsListening(false);
    
    // Stop speech recognition
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      console.log('Speech recognition stopped');
    }
    
    // Stop recording
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      console.log('MediaRecorder stopped');
    }
    
    // Stop all tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      console.log('Audio tracks stopped');
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const downloadReport = async () => {
    // Create a JSON representation of the interview
    const interviewData = {
      date: new Date().toISOString(),
      duration: elapsedTime,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp,
        audioUrl: msg.audioUrl
      })),
      feedback: {
        overall: "Your interview performance was strong. You demonstrated good communication skills and relevant experience.",
        strengths: [
          "Clear articulation of past experiences",
          "Specific examples that highlight achievements",
          "Professional communication style"
        ],
        areas_for_improvement: [
          "Provide more quantifiable results",
          "Prepare more concise responses for common questions",
          "Improve handling of behavioral questions with the STAR method"
        ]
      }
    };
    
    // Generate HTML report
    const htmlReport = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Interview Report</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1, h2, h3 { color: #0284c7; }
          .question { background-color: #f0f9ff; padding: 10px; border-left: 4px solid #0284c7; margin-bottom: 10px; }
          .answer { background-color: #f9fafb; padding: 10px; border-left: 4px solid #6b7280; margin-bottom: 20px; }
          .feedback { background-color: #f0fdf4; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .strength { color: #059669; }
          .improvement { color: #b91c1c; }
          .audio-player { margin-top: 10px; }
        </style>
      </head>
      <body>
        <h1>AI Interview Report</h1>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Duration:</strong> ${formatTime(elapsedTime)}</p>
        
        <h2>Interview Transcript</h2>
        ${messages.map(msg => {
          if (msg.role === 'assistant' && messages.indexOf(msg) > 0) {
            return `<div class="question"><strong>Interviewer:</strong> ${msg.content}</div>`;
          } else if (msg.role === 'user') {
            return `
              <div class="answer">
                <strong>You:</strong> ${msg.content}
                ${msg.audioUrl ? `
                  <div class="audio-player">
                    <audio controls>
                      <source src="${msg.audioUrl}" type="audio/webm;codecs=opus">
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                ` : ''}
              </div>`;
          } else if (messages.indexOf(msg) === 0) {
            return `<p><em>${msg.content}</em></p>`;
          }
          return '';
        }).join('')}
        
        <h2>Performance Feedback</h2>
        <div class="feedback">
          <p>${interviewData.feedback.overall}</p>
          
          <h3>Strengths</h3>
          <ul>
            ${interviewData.feedback.strengths.map(strength => 
              `<li class="strength">${strength}</li>`
            ).join('')}
          </ul>
          
          <h3>Areas for Improvement</h3>
          <ul>
            ${interviewData.feedback.areas_for_improvement.map(area => 
              `<li class="improvement">${area}</li>`
            ).join('')}
          </ul>
        </div>
        
        <h2>Next Steps</h2>
        <p>Consider the feedback provided and practice the areas for improvement. You can use this report to track your progress over time.</p>
        
        <footer>
          <p><small>Generated by AI Interview Platform</small></p>
        </footer>
      </body>
      </html>
    `;
    
    // Create a zip file with JSON and HTML reports
    const zip = new JSZip();
    zip.file("interview_data.json", JSON.stringify(interviewData, null, 2));
    zip.file("interview_report.html", htmlReport);
    
    // Add audio files to zip
    messages.forEach((msg, index) => {
      if (msg.audioUrl) {
        fetch(msg.audioUrl)
          .then(response => response.blob())
          .then(blob => {
            zip.file(`audio_${index}.webm`, blob);
          });
      }
    });
    
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "interview_report.zip");
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="voice-wave mb-4">
                <span className="voice-wave-bar"></span>
                <span className="voice-wave-bar"></span>
                <span className="voice-wave-bar"></span>
                <span className="voice-wave-bar"></span>
                <span className="voice-wave-bar"></span>
              </div>
              <p className="text-gray-300">Preparing your interview...</p>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
              {/* Left Panel - Timer and Controls */}
              <div className="col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 flex flex-col">
                {interviewState === 'intro' ? (
                  <button
                    onClick={startInterviewWithPermissions}
                    disabled={isStarting}
                    className="w-full py-4 px-6 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-emerald-600 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 flex items-center justify-center"
                  >
                    {isStarting ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        <span>Starting Interview...</span>
                      </div>
                    ) : (
                      <>
                        <span>Start Interview</span>
                        <FiArrowRight className="ml-2" />
                      </>
                    )}
                  </button>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-lg font-semibold mb-4 flex items-center">
                        <FiClock className="mr-2" />
                        Interview Time
                      </h2>
                      <div className="text-3xl font-mono text-center mb-2">
                        {formatTime(elapsedTime)}
                      </div>
                      <div className="h-1 bg-gray-700 rounded-full">
                        <div 
                          className="h-1 bg-blue-500 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, (messages.length / 10) * 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <button
                        onClick={() => setIsCameraOn(!isCameraOn)}
                        className={`w-full p-3 rounded-lg flex items-center justify-center transition-all duration-200 ${
                          isCameraOn 
                            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                            : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700/70'
                        }`}
                      >
                        {isCameraOn ? <FiVideoOff size={20} /> : <FiVideo size={20} />}
                      </button>
                      
                      <button
                        onClick={toggleListening}
                        disabled={interviewState === 'intro'}
                        className={`w-full p-3 rounded-lg flex items-center justify-center transition-all duration-200 ${
                          isListening 
                            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                            : micPermission === false
                            ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                            : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700/70'
                        }`}
                      >
                        {isListening ? <FiMicOff size={20} /> : <FiMic size={20} />}
                      </button>
                    </div>

                    {!isSpeechSupported && (
                      <div className="mt-4 p-3 bg-yellow-500/20 rounded-lg text-yellow-400 text-sm">
                        Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.
                      </div>
                    )}

                    {micPermission === false && (
                      <div className="mt-4 p-3 bg-yellow-500/20 rounded-lg text-yellow-400 text-sm">
                        Microphone access is required. Please grant permission to use the microphone.
                      </div>
                    )}

                    {isListening && (
                      <div className="mt-4 p-3 bg-blue-500/20 rounded-lg text-blue-400 text-sm">
                        Recording in progress... Click the microphone button again to stop.
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Center Panel - Interviewer and Chat */}
              <div className="col-span-7 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 flex flex-col">
                <div className="flex-1 relative">
                  {/* 3D Interviewer Avatar */}
                  {interviewState !== 'intro' && (
                    <div className="absolute inset-0">
                      {/* <InterviewerAvatar isSpeaking={isSpeaking} isListening={isListening} /> */}
                    </div>
                  )}

                  {/* Chat Messages */}
                  <div className="absolute bottom-0 left-0 right-0 max-h-[40%] overflow-y-auto space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg p-4 ${
                            message.role === 'assistant'
                              ? 'bg-gray-700/50 text-white'
                              : 'bg-blue-500/50 text-white'
                          }`}
                        >
                          {message.role === 'assistant' ? (
                            <StreamingText 
                              text={message.content} 
                              onComplete={() => setIsSpeaking(false)}
                            />
                          ) : (
                            <p>{message.content}</p>
                          )}
                          <div className="text-xs mt-2 opacity-70">
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                    {currentTranscript && (
                      <div className="flex justify-end">
                        <div className="max-w-[80%] rounded-lg p-4 bg-blue-500/50 text-white">
                          <p>{currentTranscript}</p>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
                
                {/* Status Bar */}
                <div className="mt-4 p-4 bg-gray-700/30 rounded-lg">
                  <p className="text-gray-300">
                    {interviewState === 'question' && 'Click the microphone button to respond...'}
                    {interviewState === 'listening' && 'Listening to your response...'}
                    {interviewState === 'processing' && 'Processing your response...'}
                    {interviewState === 'feedback' && 'Review feedback and continue when ready...'}
                    {interviewState === 'complete' && 'Interview complete! Download your report.'}
                    {interviewState === 'intro' && 'Click "Start Interview" when you\'re ready to begin...'}
                  </p>
                </div>
              </div>

              {/* Right Panel - AI Feedback */}
              <div className="col-span-3 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4">AI Analysis</h2>
                
                {interviewState !== 'intro' && (
                  <div className="space-y-6">
                    {/* Sentiment Analysis */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-2">Sentiment</h3>
                      <div className="h-2 bg-gray-700 rounded-full">
                        <div 
                          className="h-2 bg-green-500 rounded-full transition-all duration-300"
                          style={{ width: `${feedback?.sentiment === 'positive' ? 80 : feedback?.sentiment === 'neutral' ? 50 : 20}%` }}
                        />
                      </div>
                    </div>

                    {/* Engagement Level */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-2">Engagement</h3>
                      <div className="h-2 bg-gray-700 rounded-full">
                        <div 
                          className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                          style={{ width: `${feedback?.engagement || 0}%` }}
                        />
                      </div>
                    </div>

                    {/* Confidence Score */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-2">Confidence</h3>
                      <div className="h-2 bg-gray-700 rounded-full">
                        <div 
                          className="h-2 bg-purple-500 rounded-full transition-all duration-300"
                          style={{ width: `${feedback?.confidence || 0}%` }}
                        />
                      </div>
                    </div>

                    {/* Keywords */}
                    {feedback?.keywords && feedback.keywords.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Key Points</h3>
                        <div className="flex flex-wrap gap-2">
                          {feedback.keywords.map((keyword, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-gray-700/50 rounded-full text-sm"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Detailed Feedback */}
                    {feedback && (
                      <div className="mt-6 space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-400 mb-2">Content Analysis</h3>
                          <p className="text-sm text-gray-300">{feedback.content}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-400 mb-2">Tone Analysis</h3>
                          <p className="text-sm text-gray-300">{feedback.tone}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-400 mb-2">Clarity Analysis</h3>
                          <p className="text-sm text-gray-300">{feedback.clarity}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Camera Preview */}
                {isCameraOn && (
                  <div className="mt-6">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}