'use client';

import React, { useState, useRef } from 'react';
import { FaUpload, FaLink, FaSpinner, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

interface ResumeUploaderProps {
  onUploadComplete: (resumeId: string) => void;
  className?: string;
}

type UploadMethod = 'file' | 'link';
type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

const ResumeUploader: React.FC<ResumeUploaderProps> = ({
  onUploadComplete,
  className = '',
}) => {
  const [uploadMethod, setUploadMethod] = useState<UploadMethod>('file');
  const [resumeLink, setResumeLink] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Check file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        setErrorMessage('Please upload a PDF, DOC, or DOCX file.');
        setSelectedFile(null);
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('File size must be less than 5MB.');
        setSelectedFile(null);
        return;
      }
      
      setSelectedFile(file);
      setErrorMessage('');
    }
  };

  // Handle link input
  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResumeLink(event.target.value);
    setErrorMessage('');
  };

  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Validate input
    if (uploadMethod === 'file' && !selectedFile) {
      setErrorMessage('Please select a file to upload.');
      return;
    }
    
    if (uploadMethod === 'link' && !resumeLink) {
      setErrorMessage('Please enter a valid resume link.');
      return;
    }
    
    // Set uploading status
    setUploadStatus('uploading');
    setErrorMessage('');
    
    try {
      // Create form data
      const formData = new FormData();
      
      if (uploadMethod === 'file') {
        formData.append('file', selectedFile as File);
      } else {
        formData.append('resume_link', resumeLink);
      }
      
      // Send request to backend
      const response = await fetch('/api/resume/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to upload resume');
      }
      
      const data = await response.json();
      
      // Set success status
      setUploadStatus('success');
      
      // Call the callback with the resume ID
      onUploadComplete(data.resume_id);
    } catch (error) {
      console.error('Error uploading resume:', error);
      setUploadStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 w-full max-w-2xl mx-auto ${className}`}>
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Upload Your Resume</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Upload method selector */}
        <div className="flex space-x-2 sm:space-x-4">
          <button
            type="button"
            onClick={() => setUploadMethod('file')}
            className={`flex-1 flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 ${
              uploadMethod === 'file'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <FaUpload className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setUploadMethod('link')}
            className={`flex-1 flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 ${
              uploadMethod === 'link'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <FaLink className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            Paste Link
          </button>
        </div>

        {uploadMethod === 'file' ? (
          <div className="mb-4 sm:mb-6">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
            />
            
            <div
              onClick={triggerFileInput}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-3 sm:p-8 text-center cursor-pointer hover:border-primary-500 dark:hover:border-primary-500 transition-colors duration-200"
            >
              {selectedFile ? (
                <div className="text-center">
                  <FaCheck className="mx-auto text-green-500 text-lg sm:text-2xl mb-2" />
                  <p className="text-gray-800 dark:text-white font-medium text-xs sm:text-base break-all">{selectedFile.name}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button
                    type="button"
                    className="mt-2 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-xs sm:text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerFileInput();
                    }}
                  >
                    Change file
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <FaUpload className="mx-auto text-gray-400 text-xl sm:text-2xl mb-2" />
                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-1">
                    Click to upload your resume
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                    PDF, DOC, or DOCX (max 5MB)
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mb-4 sm:mb-6">
            <input
              type="url"
              value={resumeLink}
              onChange={handleLinkChange}
              placeholder="Paste your resume link here"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
        )}

        {errorMessage && (
          <div className="flex items-center text-red-500 text-xs sm:text-sm">
            <FaExclamationTriangle className="mr-2 w-3 h-3 sm:w-4 sm:h-4" />
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={uploadStatus === 'uploading' || (!selectedFile && !resumeLink)}
          className={`w-full flex items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ${
            uploadStatus === 'uploading' ? 'cursor-wait' : ''
          }`}
        >
          {uploadStatus === 'uploading' ? (
            <>
              <FaSpinner className="animate-spin mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              Uploading...
            </>
          ) : (
            'Upload Resume'
          )}
        </button>
      </form>
    </div>
  );
};

export default ResumeUploader;