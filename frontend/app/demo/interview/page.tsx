'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FiMic, FiMicOff, FiSend, FiMessageSquare, FiUser, FiClock } from 'react-icons/fi';

interface Message {
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

export default function DemoInterviewPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'ai',
      content: "Hello! I'm your AI interviewer today. I'll be asking you some questions about your experience and skills. Are you ready to begin?",
      timestamp: new Date()
    }
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    "Tell me about yourself and your professional background.",
    "What are your greatest strengths and how have they helped you in your career?",
    "Describe a challenging project you worked on and how you handled it.",
    "Where do you see yourself in five years?",
    "Why are you interested in this position?"
  ];

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate AI response after user finishes speaking
      setTimeout(() => {
        const newMessage: Message = {
          type: 'ai',
          content: "Thank you for your response. " + (currentQuestion < questions.length - 1 ? questions[currentQuestion + 1] : "That concludes our interview. Thank you for your time!"),
          timestamp: new Date()
        };
        setMessages(prev => [...prev, newMessage]);
        setCurrentQuestion(prev => prev + 1);
      }, 3000);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Interview Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                <FiUser className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Demo Interview</h1>
                <p className="text-gray-600 dark:text-gray-300">AI-Powered Mock Interview</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <FiClock className="w-5 h-5" />
              <span>30:00</span>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="space-y-6 h-[500px] overflow-y-auto mb-6">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.type === 'ai' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[80%] rounded-xl p-4 ${
                  message.type === 'ai' 
                    ? 'bg-indigo-100 dark:bg-indigo-900 text-gray-900 dark:text-white' 
                    : 'bg-emerald-100 dark:bg-emerald-900 text-gray-900 dark:text-white'
                }`}>
                  <p>{message.content}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Recording Controls */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={toggleRecording}
              className={`p-4 rounded-full transition-all duration-200 ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-indigo-600 hover:bg-indigo-700'
              } text-white`}
            >
              {isRecording ? <FiMicOff className="w-6 h-6" /> : <FiMic className="w-6 h-6" />}
            </button>
            <button
              className="p-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-200"
            >
              <FiSend className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Interview Tips */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Interview Tips</h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li>• Speak clearly and at a moderate pace</li>
            <li>• Take a moment to think before answering</li>
            <li>• Use specific examples from your experience</li>
            <li>• Keep your answers concise and relevant</li>
          </ul>
        </div>
      </div>

      <Footer />
    </main>
  );
} 