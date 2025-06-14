'use client';

import { motion } from 'framer-motion';
import { FiCode, FiClock, FiBook, FiServer } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ApiPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="flex-grow max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
            API Documentation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Access InterviewGPT's powerful features through our comprehensive API
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          >
            <div className="flex items-center mb-4">
              <FiClock className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Coming Soon</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're working hard to bring you a powerful and easy-to-use API. Stay tuned for updates!
            </p>
            <div className="space-y-4">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                RESTful API endpoints
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                Comprehensive documentation
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                SDK support for major languages
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          >
            <div className="flex items-center mb-4">
              <FiBook className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Features</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Interview Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get detailed analysis of interview responses and performance metrics
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Resume Processing</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Upload and analyze resumes with our advanced AI technology
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time Feedback</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Receive instant feedback on interview responses and suggestions
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Want to be notified when our API launches?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Join our waitlist to get early access and exclusive updates
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
            Join Waitlist
          </button>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
} 