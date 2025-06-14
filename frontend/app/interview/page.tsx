'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiLink, FiFile, FiArrowRight, FiBriefcase, FiBarChart2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function InterviewPage() {
  const router = useRouter();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeLink, setResumeLink] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'file' | 'link'>('file');
  const [error, setError] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('intermediate');

  const jobRoles = [
    'Software Engineer',
    'Data Scientist',
    'Product Manager',
    'UX Designer',
    'DevOps Engineer',
    'Full Stack Developer',
    'Machine Learning Engineer',
    'Other'
  ];

  const difficultyLevels = [
    { value: 'basic', label: 'Basic', description: 'Entry-level questions' },
    { value: 'intermediate', label: 'Intermediate', description: 'Standard professional questions' },
    { value: 'expert', label: 'Expert', description: 'Advanced technical questions' }
  ];

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setResumeFile(acceptedFiles[0]);
        setError('');
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (uploadMethod === 'file' && !resumeFile) {
      setError('Please upload your resume');
      return;
    }

    if (uploadMethod === 'link' && !resumeLink) {
      setError('Please provide a link to your resume');
      return;
    }

    if (!jobRole) {
      setError('Please select a job role');
      return;
    }

    try {
      setIsUploading(true);
      
      // Create form data
      const formData = new FormData();
      if (uploadMethod === 'file' && resumeFile) {
        formData.append('resume', resumeFile);
      } else if (uploadMethod === 'link') {
        formData.append('resume_link', resumeLink);
      }
      formData.append('job_role', jobRole);
      formData.append('difficulty_level', difficultyLevel);

      // In a real app, you would send this to your backend
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume`, {
      //   method: 'POST',
      //   body: formData,
      // });
      
      // For demo purposes, we'll just simulate a successful upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to the interview session page
      router.push('/interview/session');
    } catch (error) {
      console.error('Error uploading resume:', error);
      setError('Failed to upload resume. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      {/* Interview Setup Form */}
      <section className="flex-grow py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="max-w-3xl w-full mx-auto px-4">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
              Start Your AI-Powered Interview
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Job Role Selection */}
              <div>
                <label htmlFor="jobRole" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FiBriefcase className="inline-block mr-2 w-5 h-5 text-indigo-500" />
                  Select Job Role
                </label>
                <select
                  id="jobRole"
                  value={jobRole || ''}
                  onChange={(e) => setJobRole(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
                >
                  <option value="">Select a role...</option>
                  {jobRoles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FiBarChart2 className="inline-block mr-2 w-5 h-5 text-emerald-500" />
                  Interview Difficulty
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {difficultyLevels.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setDifficultyLevel(level.value)}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 text-center ${level.value === difficultyLevel
                        ? {
                            basic: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200',
                            intermediate: 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-200',
                            expert: 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200',
                          }[level.value]
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="font-medium mb-1">
                        {level.label}
                      </div>
                      <div className="text-xs opacity-90">
                        {level.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Resume Upload Section */}
              <div className="mb-6">
                <div className="flex space-x-4 mb-6">
                  <button
                    type="button"
                    className={`flex-1 py-3 px-4 rounded-lg transition-all duration-200 font-medium ${{
                      file: 'bg-gradient-to-r from-indigo-600 to-emerald-600 text-white shadow-md',
                      link: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600',
                    }[uploadMethod]
                    }`}
                    onClick={() => setUploadMethod('file')}
                  >
                    <div className="flex items-center justify-center">
                      <FiFile className="mr-2 w-5 h-5" />
                      <span>Upload File</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-3 px-4 rounded-lg transition-all duration-200 font-medium ${{
                      link: 'bg-gradient-to-r from-indigo-600 to-emerald-600 text-white shadow-md',
                      file: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600',
                    }[uploadMethod]
                    }`}
                    onClick={() => setUploadMethod('link')}
                  >
                    <div className="flex items-center justify-center">
                      <FiLink className="mr-2 w-5 h-5" />
                      <span>Provide Link</span>
                    </div>
                  </button>
                </div>
                
                {uploadMethod === 'file' ? (
                  <div 
                    key="file-upload"
                    {...getRootProps()} 
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${isDragActive ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-300 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'}
                    `}
                  >
                    <input {...getInputProps()} />
                    <div className="text-center">
                      <FiUpload className="mx-auto text-gray-400 mb-4 w-10 h-10" />
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                        {isDragActive
                          ? "Drop your resume here"
                          : "Drag and drop your resume, or click to browse"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Supported formats: PDF, DOC, DOCX
                      </p>
                      {resumeFile && (
                        <div className="mt-4 p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded text-sm text-indigo-800 dark:text-indigo-200">
                          {resumeFile.name}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div key="link-upload">
                    <input
                      type="url"
                      value={resumeLink || ''}
                      onChange={(e) => setResumeLink(e.target.value)}
                      placeholder="https://example.com/my-resume.pdf"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Provide a direct link to your resume (PDF, DOC, DOCX, or LinkedIn profile)
                    </p>
                  </div>
                )}
              </div>
              
              {error && (
                <motion.div 
                  className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {error}
                </motion.div>
              )}

              <button 
                type="submit"
                className={`w-full flex items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-lg shadow-lg transition-all duration-300 ${isUploading 
                  ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-indigo-600 to-emerald-600 hover:shadow-xl hover:opacity-90'
                }`}
                disabled={isUploading}
              >
                {isUploading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <FiArrowRight className="mr-2 w-5 h-5" />
                )}
                {isUploading ? 'Starting Interview...' : 'Start Interview'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}