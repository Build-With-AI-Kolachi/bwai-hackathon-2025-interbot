'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  labels,
  className = '',
}) => {
  // Calculate progress percentage
  const progress = (currentStep / totalSteps) * 100;
  
  // Generate step indicators
  const steps = Array.from({ length: totalSteps }, (_, i) => {
    const stepNumber = i + 1;
    const isCompleted = stepNumber <= currentStep;
    const isCurrent = stepNumber === currentStep;
    const label = labels && labels[i] ? labels[i] : `Step ${stepNumber}`;
    
    return { stepNumber, isCompleted, isCurrent, label };
  });

  return (
    <div className={`w-full ${className}`}>
      {/* Progress bar */}
      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-primary-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
      
      {/* Step indicators */}
      <div className="flex justify-between mt-2">
        {steps.map((step) => (
          <div key={step.stepNumber} className="flex flex-col items-center">
            <motion.div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${step.isCompleted ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'} ${step.isCurrent ? 'ring-2 ring-primary-300 dark:ring-primary-700 ring-offset-2 ring-offset-white dark:ring-offset-gray-900' : ''}`}
              initial={{ scale: 0.8 }}
              animate={{
                scale: step.isCurrent ? 1.1 : 1,
                backgroundColor: step.isCompleted ? '#3B82F6' : '#E5E7EB',
              }}
              transition={{ duration: 0.3 }}
            >
              {step.isCompleted ? (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                step.stepNumber
              )}
            </motion.div>
            
            {/* Step label */}
            {labels && (
              <span className="text-xs mt-1 text-gray-600 dark:text-gray-400 text-center max-w-[80px] truncate">
                {step.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;