'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';

interface TimerProps {
  initialSeconds?: number;
  autoStart?: boolean;
  showControls?: boolean;
  onTimeUpdate?: (seconds: number) => void;
  className?: string;
}

const Timer: React.FC<TimerProps> = ({
  initialSeconds = 0,
  autoStart = false,
  showControls = true,
  onTimeUpdate,
  className = '',
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Format time as HH:MM:SS
  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const formattedHours = hours > 0 ? `${hours.toString().padStart(2, '0')}:` : '';
    return `${formattedHours}${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start timer
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  // Pause timer
  const pauseTimer = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };

  // Reset timer
  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(initialSeconds);
  };

  // Handle timer logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => {
          const newSeconds = prevSeconds + 1;
          if (onTimeUpdate) {
            onTimeUpdate(newSeconds);
          }
          return newSeconds;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, onTimeUpdate]);

  return (
    <div className={`flex items-center ${className}`}>
      <div className="text-xl sm:text-2xl font-mono font-semibold">
        {formatTime(seconds)}
      </div>
      
      {showControls && (
        <div className="flex ml-3 sm:ml-4 space-x-1.5 sm:space-x-2">
          {isRunning ? (
            <button
              onClick={pauseTimer}
              className="p-1.5 sm:p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full transition-colors duration-200"
              aria-label="Pause timer"
            >
              <FaPause className="text-gray-700 dark:text-gray-300 w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          ) : (
            <button
              onClick={startTimer}
              className="p-1.5 sm:p-2 bg-primary-100 dark:bg-primary-900 hover:bg-primary-200 dark:hover:bg-primary-800 rounded-full transition-colors duration-200"
              aria-label="Start timer"
            >
              <FaPlay className="text-primary-700 dark:text-primary-300 w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          )}
          
          <button
            onClick={resetTimer}
            className="p-1.5 sm:p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full transition-colors duration-200"
            aria-label="Reset timer"
          >
            <FaRedo className="text-gray-700 dark:text-gray-300 w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Timer;