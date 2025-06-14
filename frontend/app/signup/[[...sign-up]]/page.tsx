'use client';

import { SignUp } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FiArrowRight, FiMessageSquare } from 'react-icons/fi';

const SignupPage = () => {
  return (
    <main className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Navbar />

      {/* Removed Background Pattern */}

      <section className="flex-grow flex items-center justify-center px-4 py-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}

          {/* Sign Up Card */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 space-y-2 border border-gray-200 dark:border-gray-700 max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="mb-2 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Create Your Account</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Sign up to unlock AI-powered interview practice and feedback.</p>
              <div className="flex justify-center mt-1 mb-1">
                <span className="inline-block w-12 h-0.5 rounded bg-gradient-to-r from-indigo-500 to-emerald-500"></span>
              </div>
            </div>
            <SignUp 
              appearance={{
                elements: {
                  formFieldInput: 
                    'block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm dark:bg-gray-700 dark:text-white transition-colors duration-200',
                  formFieldLabel: 'text-xs font-semibold text-gray-700 dark:text-gray-300 mb-0.5 block',
                  formButtonPrimary: 
                    'w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 mt-3',
                  socialButtonsBlockButton: 
                    'w-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 font-medium text-gray-700 dark:text-gray-200 py-2',
                  footerActionLink: 'text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors duration-200 text-xs',
                  formFieldAction: 'text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 text-xs',
                  alertText: 'text-xs text-red-600 dark:text-red-400',
                  alert: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 p-2 rounded-lg mb-2 text-xs',
                  dividerText: 'text-gray-500 dark:text-gray-400 text-xs',
                  card: 'bg-transparent shadow-none',
                  headerTitle: 'hidden',
                  headerSubtitle: 'hidden',
                },
                layout: {
                  socialButtonsPlacement: 'bottom',
                  socialButtonsVariant: 'blockButton',
                  privacyPageUrl: '/privacy',
                  termsPageUrl: '/terms',
                },
              }}
              routing="path"
              path="/signup"
              signInUrl="/login"
              redirectUrl="/"
            />
          </motion.div>

          {/* Features Section */}
          <motion.div
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-100 dark:border-gray-700 shadow-md flex flex-col items-center">
              <span className="mb-3 text-3xl text-indigo-600 dark:text-indigo-400">
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-8 h-8'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6l-9-5m9 5l9-5' /></svg>
              </span>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">AI-Powered Interviews</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Practice with our advanced AI interviewer</p>
            </div>
            <div className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-100 dark:border-gray-700 shadow-md flex flex-col items-center">
              <span className="mb-3 text-3xl text-emerald-600 dark:text-emerald-400">
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-8 h-8'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m4 4h-1a2 2 0 01-2-2V7a2 2 0 012-2h1a2 2 0 012 2v7a2 2 0 01-2 2z' /></svg>
              </span>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">Real-time Feedback</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Get instant feedback on your responses</p>
            </div>
            <div className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-100 dark:border-gray-700 shadow-md flex flex-col items-center">
              <span className="mb-3 text-3xl text-yellow-500 dark:text-yellow-300">
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-8 h-8'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z' /></svg>
              </span>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">Progress Tracking</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Monitor your improvement over time</p>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 text-white font-semibold shadow-md">
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-5 h-5'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m13-3.13a4 4 0 10-8 0 4 4 0 008 0zm-8 0a4 4 0 11-8 0 4 4 0 018 0z' /></svg>
              Trusted by 10,000+ professionals worldwide
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
};

export default SignupPage; 