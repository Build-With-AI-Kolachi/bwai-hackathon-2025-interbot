'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaThumbsUp, FaLightbulb } from 'react-icons/fa';

interface FeedbackCardProps {
  questionText: string;
  responseText: string;
  score: number; // 1-10
  contentFeedback: string;
  clarityFeedback: string;
  confidenceFeedback: string;
  strengths: string[];
  improvements: string[];
  className?: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  questionText,
  responseText,
  score,
  contentFeedback,
  clarityFeedback,
  confidenceFeedback,
  strengths,
  improvements,
  className = '',
}) => {
  // Helper function to get score color
  const getScoreColor = (score: number): string => {
    if (score >= 8) return 'text-green-500';
    if (score >= 6) return 'text-blue-500';
    if (score >= 4) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Generate stars based on score (1-10 scale converted to 1-5)
  const renderStars = () => {
    const starCount = Math.round(score / 2);
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={i < starCount ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}
      />
    ));
  };

  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden w-full max-w-4xl mx-auto p-4 sm:p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header with score */}
      <div className="bg-gray-50 dark:bg-gray-700 px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-600">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
          <h3 className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-white truncate">
            {questionText}
          </h3>
          <div className="flex items-center space-x-2">
            <div className="flex">{renderStars()}</div>
            <span className={`font-bold text-sm sm:text-lg ${getScoreColor(score)}`}>{score}/10</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
        {/* Response */}
        <div className="mb-3 sm:mb-6">
          <h4 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Your Response:</h4>
          <div className="bg-gray-50 dark:bg-gray-900 p-2 sm:p-4 rounded-md text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
            {responseText}
          </div>
        </div>

        {/* Feedback sections */}
        <div className="space-y-3 sm:space-y-4">
          {/* Content feedback */}
          <div>
            <h4 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Content:</h4>
            <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">{contentFeedback}</p>
          </div>

          {/* Clarity feedback */}
          <div>
            <h4 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Clarity:</h4>
            <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">{clarityFeedback}</p>
          </div>

          {/* Confidence feedback */}
          <div>
            <h4 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Confidence:</h4>
            <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">{confidenceFeedback}</p>
          </div>
        </div>

        {/* Strengths and improvements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Strengths */}
          <div className="bg-green-50 dark:bg-green-900/20 p-2 sm:p-4 rounded-md">
            <div className="flex items-center mb-2 sm:mb-3">
              <FaThumbsUp className="text-green-500 mr-2 w-3 h-3 sm:w-4 sm:h-4" />
              <h4 className="font-medium text-green-700 dark:text-green-400 text-xs sm:text-sm">Strengths</h4>
            </div>
            <ul className="space-y-1 sm:space-y-2">
              {strengths.map((strength, index) => (
                <li key={index} className="text-green-800 dark:text-green-300 text-xs sm:text-sm flex items-start">
                  <span className="inline-block w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full mr-2 flex-shrink-0 mt-1"></span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 sm:p-4 rounded-md">
            <div className="flex items-center mb-2 sm:mb-3">
              <FaLightbulb className="text-blue-500 mr-2 w-3 h-3 sm:w-4 sm:h-4" />
              <h4 className="font-medium text-blue-700 dark:text-blue-400 text-xs sm:text-sm">Areas for Improvement</h4>
            </div>
            <ul className="space-y-1 sm:space-y-2">
              {improvements.map((improvement, index) => (
                <li key={index} className="text-blue-800 dark:text-blue-300 text-xs sm:text-sm flex items-start">
                  <span className="inline-block w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full mr-2 flex-shrink-0 mt-1"></span>
                  {improvement}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeedbackCard;