'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaUser } from 'react-icons/fa';

export type MessageType = 'ai' | 'user';

interface MessageBubbleProps {
  type: MessageType;
  message: string;
  isTyping?: boolean;
  timestamp?: string;
  className?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  type,
  message,
  isTyping = false,
  timestamp,
  className = '',
}) => {
  // Determine styles based on message type
  const isAI = type === 'ai';
  const bubbleClass = isAI
    ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
    : 'bg-primary-500 text-white';
  
  const alignmentClass = isAI ? 'justify-start' : 'justify-end';
  
  // Typing animation dots
  const TypingAnimation = () => (
    <div className="flex space-x-1 mt-1 items-center justify-center">
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          className="w-2 h-2 bg-gray-400 rounded-full"
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: dot * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );

  return (
    <motion.div
      className={`flex ${alignmentClass} w-full mb-2 sm:mb-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`flex max-w-[90%] sm:max-w-[80%] ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isAI ? 'mr-1.5 sm:mr-3' : 'ml-1.5 sm:ml-3'} mt-1`}>
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            {isAI ? (
              <FaRobot className="text-primary-500 w-3 h-3 sm:w-5 sm:h-5" />
            ) : (
              <FaUser className="text-gray-600 dark:text-gray-300 w-3 h-3 sm:w-5 sm:h-5" />
            )}
          </div>
        </div>
        
        {/* Message content */}
        <div className="flex flex-col">
          <div
            className={`rounded-2xl py-1.5 sm:py-3 px-2.5 sm:px-4 text-xs sm:text-base ${bubbleClass} ${isAI ? 'rounded-tl-none' : 'rounded-tr-none'}`}
          >
            {isTyping ? (
              <TypingAnimation />
            ) : (
              <div className="whitespace-pre-wrap break-words">{message}</div>
            )}
          </div>
          
          {/* Timestamp */}
          {timestamp && (
            <div className={`text-[9px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 ${isAI ? 'text-left' : 'text-right'}`}>
              {timestamp}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;