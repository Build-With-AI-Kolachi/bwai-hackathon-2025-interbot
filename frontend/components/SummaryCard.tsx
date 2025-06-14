'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaChartLine, FaThumbsUp, FaLightbulb, FaDownload } from 'react-icons/fa';

interface SummaryCardProps {
  averageScore: number; // 1-10
  overallFeedback: string;
  strengths: string[];
  improvements: string[];
  recommendations: string[];
  onDownload?: () => void;
  className?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  averageScore,
  overallFeedback,
  strengths,
  improvements,
  recommendations,
  onDownload,
  className = '',
}) => {
  // Helper function to get score color
  const getScoreColor = (score: number): string => {
    if (score >= 8) return 'text-green-500';
    if (score >= 6) return 'text-blue-500';
    if (score >= 4) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Helper function to get score label
  const getScoreLabel = (score: number): string => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Satisfactory';
    return 'Needs Improvement';
  };

  // Generate stars based on score (1-10 scale converted to 1-5)
  const renderStars = () => {
    const starCount = Math.round(averageScore / 2);
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={i < starCount ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}
        size={24}
      />
    ));
  };

  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with score */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Interview Performance Summary</h2>
        <p className="text-primary-100 mb-4">Here's how you did in your mock interview</p>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white/10 rounded-lg p-4">
          <div className="flex items-center mb-3 sm:mb-0">
            <div className="flex mr-3">{renderStars()}</div>
            <div>
              <div className={`text-2xl font-bold ${getScoreColor(averageScore)}`}>
                {averageScore.toFixed(1)}/10
              </div>
              <div className="text-sm text-primary-100">{getScoreLabel(averageScore)}</div>
            </div>
          </div>
          
          {onDownload && (
            <button
              onClick={onDownload}
              className="flex items-center justify-center px-4 py-2 bg-white text-primary-600 rounded-md hover:bg-primary-50 transition-colors duration-200 font-medium"
            >
              <FaDownload className="mr-2" />
              Download Report
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Overall feedback */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
            <FaChartLine className="mr-2 text-primary-500" />
            Overall Assessment
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{overallFeedback}</p>
        </div>

        {/* Strengths and improvements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Strengths */}
          <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg">
            <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-4 flex items-center">
              <FaThumbsUp className="mr-2" />
              Key Strengths
            </h3>
            <ul className="space-y-3">
              {strengths.map((strength, index) => (
                <li key={index} className="text-green-800 dark:text-green-300 flex items-start">
                  <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0 mt-1"></span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400 mb-4 flex items-center">
              <FaLightbulb className="mr-2" />
              Areas for Improvement
            </h3>
            <ul className="space-y-3">
              {improvements.map((improvement, index) => (
                <li key={index} className="text-blue-800 dark:text-blue-300 flex items-start">
                  <span className="inline-block w-4 h-4 bg-blue-500 rounded-full mr-3 flex-shrink-0 mt-1"></span>
                  {improvement}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <FaLightbulb className="mr-2 text-yellow-500" />
            Recommendations
          </h3>
          <div className="bg-yellow-50 dark:bg-yellow-900/10 p-5 rounded-lg">
            <ul className="space-y-4">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="text-gray-800 dark:text-gray-300">
                  <div className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500 text-white font-bold text-sm mr-3 flex-shrink-0">
                      {index + 1}
                    </span>
                    <p>{recommendation}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SummaryCard;