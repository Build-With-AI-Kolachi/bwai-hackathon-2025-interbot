'use client';

import { SignIn } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Head>
        <title>Sign In | AI-Powered Voice Interview Platform</title>
        <meta name="description" content="Sign in to your account and continue your interview preparation journey" />
      </Head>
      <main className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Navbar />

        {/* Removed Background Pattern */}

        <section className="flex-grow flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header Section */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Welcome Back
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Sign in to continue your interview preparation
              </p>
            </motion.div>

            {/* Sign In Card */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6 border border-gray-200 dark:border-gray-700 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}

            >
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sign In to Your Account</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Access your AI-powered interview practice dashboard</p>
                <div className="flex justify-center mt-2 mb-2">
                  <span className="inline-block w-12 h-0.5 rounded bg-gradient-to-r from-indigo-500 to-emerald-500"></span>
                </div>
              </div>
              <SignIn 
                appearance={{
                  elements: {
                    formFieldInput: 
                      'block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm dark:bg-gray-700 dark:text-white transition-all duration-200 hover:border-indigo-400',
                    formFieldLabel: 'text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 block',
                    formButtonPrimary: 
                      'w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 mt-4 disabled:opacity-50 disabled:cursor-not-allowed',
                    socialButtonsBlockButton: 
                      'w-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 font-medium text-gray-700 dark:text-gray-200 py-2.5 hover:border-indigo-400',
                    footerActionLink: 'text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors duration-200 text-sm hover:underline',
                    formFieldAction: 'text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 text-sm hover:underline',
                    alertText: 'text-sm text-red-600 dark:text-red-400',
                    alert: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 p-3 rounded-lg mb-4 text-sm animate-shake',
                    dividerText: 'text-gray-500 dark:text-gray-400 text-sm',
                    card: 'bg-transparent shadow-none',
                    headerTitle: 'hidden',
                    headerSubtitle: 'hidden',
                    formFieldInputShowPasswordButton: 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                    formFieldInputWrapper: 'relative',
                    identityPreviewEditButton: 'text-indigo-600 hover:text-indigo-500 dark:text-indigo-400',
                    identityPreviewText: 'text-gray-700 dark:text-gray-300',
                    otpCodeFieldInput: 'text-center tracking-widest',
                    formResendCodeLink: 'text-indigo-600 hover:text-indigo-500 dark:text-indigo-400',
                  },
                  layout: {
                    socialButtonsPlacement: 'bottom',
                    socialButtonsVariant: 'blockButton',
                    privacyPageUrl: '/privacy',
                    termsPageUrl: '/terms',
                  },
                }}
                routing="path"
                path="/login"
                signUpUrl="/signup"
                redirectUrl="/"
              />
            </motion.div>

            {/* Admin Access */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Admin access?{' '}
                <a 
                  href="/admin/login" 
                  className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 hover:underline transition-colors duration-200"
                >
                  Login here
                </a>
              </p>
            </motion.div>
          </motion.div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default LoginPage; 