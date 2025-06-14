'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface VoiceVisualizerProps {
  isRecording: boolean;
  audioLevel?: number; // 0-100 scale
  className?: string;
}

const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({
  isRecording,
  audioLevel = 50,
  className = '',
}) => {
  const [bars, setBars] = useState<number[]>([]);
  const animationRef = useRef<number>();
  const barCount = 20; // Number of visualization bars

  // Initialize bars with random heights
  useEffect(() => {
    setBars(Array.from({ length: barCount }, () => Math.random() * 100));
  }, []);

  // Animation loop for the visualizer
  useEffect(() => {
    if (!isRecording) {
      // When not recording, set all bars to a minimal height
      setBars(Array.from({ length: barCount }, () => 5 + Math.random() * 10));
      return;
    }

    const updateBars = () => {
      setBars(prevBars =>
        prevBars.map(() => {
          // Use audioLevel to determine the maximum height
          const maxHeight = audioLevel * 0.8;
          // Generate a random height between 10% and 100% of maxHeight
          return 10 + Math.random() * maxHeight;
        })
      );
      animationRef.current = requestAnimationFrame(updateBars);
    };

    animationRef.current = requestAnimationFrame(updateBars);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRecording, audioLevel]);

  return (
    <div className={`flex items-end justify-center space-x-0.5 sm:space-x-1 h-16 sm:h-24 ${className}`}>
      {bars.map((height, index) => (
        <motion.div
          key={index}
          className="w-0.5 sm:w-1 bg-primary-500 rounded-t-full"
          initial={{ height: 5 }}
          animate={{ height: `${Math.max(5, height)}%` }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
            mass: 0.5,
          }}
        />
      ))}
    </div>
  );
};

export default VoiceVisualizer;