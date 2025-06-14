'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaStop } from 'react-icons/fa';
import VoiceVisualizer from './VoiceVisualizer';

interface AudioRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
  onRecordingStart?: () => void;
  onRecordingStop?: () => void;
  maxDuration?: number; // in seconds
  className?: string;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onRecordingComplete,
  onRecordingStart,
  onRecordingStop,
  maxDuration = 120, // 2 minutes default
  className = '',
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevel, setAudioLevel] = useState(50);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneStreamRef = useRef<MediaStream | null>(null);
  
  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start recording
  const startRecording = async () => {
    try {
      // Reset state
      audioChunksRef.current = [];
      setRecordingTime(0);
      
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      microphoneStreamRef.current = stream;
      
      // Set up audio analyzer for visualization
      setupAudioAnalyzer(stream);
      
      // Create media recorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      // Set up event handlers
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        // Create audio blob from chunks
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        onRecordingComplete(audioBlob);
        
        // Clean up
        if (microphoneStreamRef.current) {
          microphoneStreamRef.current.getTracks().forEach(track => track.stop());
          microphoneStreamRef.current = null;
        }
        
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
          analyserRef.current = null;
        }
        
        if (onRecordingStop) {
          onRecordingStop();
        }
      };
      
      // Start recording
      mediaRecorder.start(1000); // Collect data every second
      setIsRecording(true);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          const newTime = prev + 1;
          // Auto-stop if max duration reached
          if (newTime >= maxDuration) {
            stopRecording();
          }
          return newTime;
        });
      }, 1000);
      
      if (onRecordingStart) {
        onRecordingStart();
      }
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not access microphone. Please check permissions and try again.');
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Clear timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  // Set up audio analyzer for visualization
  const setupAudioAnalyzer = (stream: MediaStream) => {
    // Create audio context
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioContextRef.current = audioContext;
    
    // Create analyzer
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    analyserRef.current = analyser;
    
    // Connect microphone to analyzer
    const microphone = audioContext.createMediaStreamSource(stream);
    microphone.connect(analyser);
    
    // Start analyzing audio levels
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const updateAudioLevel = () => {
      if (!analyserRef.current || !isRecording) return;
      
      analyserRef.current.getByteFrequencyData(dataArray);
      
      // Calculate average level
      const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
      // Convert to 0-100 scale
      const normalizedLevel = Math.min(100, Math.max(0, average * 100 / 255));
      
      setAudioLevel(normalizedLevel);
      
      // Continue analyzing
      requestAnimationFrame(updateAudioLevel);
    };
    
    updateAudioLevel();
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      if (microphoneStreamRef.current) {
        microphoneStreamRef.current.getTracks().forEach(track => track.stop());
      }
      
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className={`flex flex-col items-center w-full max-w-2xl mx-auto ${className}`}>
      <div className="w-full mb-4 px-4 sm:px-6">
        <VoiceVisualizer 
          isRecording={isRecording} 
          audioLevel={audioLevel} 
          className="w-full h-24 sm:h-32"
        />
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 px-4 sm:px-6">
        {isRecording ? (
          <button
            onClick={stopRecording}
            className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors duration-300 shadow-lg"
            aria-label="Stop recording"
          >
            <FaStop className="text-lg sm:text-xl" />
          </button>
        ) : (
          <button
            onClick={startRecording}
            className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-primary-500 hover:bg-primary-600 text-white rounded-full transition-colors duration-300 shadow-lg"
            aria-label="Start recording"
          >
            <FaMicrophone className="text-lg sm:text-xl" />
          </button>
        )}
        
        <div className="text-base sm:text-lg font-mono bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
          {formatTime(recordingTime)}
          {maxDuration && (
            <span className="text-gray-500"> / {formatTime(maxDuration)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioRecorder;