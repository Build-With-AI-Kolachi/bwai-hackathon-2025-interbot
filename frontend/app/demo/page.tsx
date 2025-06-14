'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FiMessageSquare, FiUpload, FiBarChart2, FiUsers, FiPlay, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-200"
            >
              Try InterviewGPT Live
            </motion.h1>
            <p className="text-xl mb-8">
              Experience a real AI-powered interview simulation, resume analysis, and instant feedback—all in one seamless demo.
            </p>
            <Link href="/demo/interview">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold shadow-lg hover:bg-indigo-50 transition-all duration-200 text-lg"
              >
                <FiPlay className="mr-2" />
                Start Demo Interview
              </motion.button>
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src="/demo-hero.svg" alt="Demo Illustration" className="w-full max-w-md rounded-2xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Step-by-Step Walkthrough */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
            How the Demo Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 mb-4">
                <FiUpload className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">1. Upload Resume</h3>
              <p className="text-gray-600 dark:text-gray-300">Start by uploading your resume for instant AI analysis and improvement tips.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900 mb-4">
                <FiMessageSquare className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">2. Mock Interview</h3>
              <p className="text-gray-600 dark:text-gray-300">Engage in a realistic mock interview with our AI, tailored to your job role and experience.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
                <FiBarChart2 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">3. Get Feedback</h3>
              <p className="text-gray-600 dark:text-gray-300">Receive instant, actionable feedback and analytics to help you improve.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
            Success Stories
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mx-auto max-w-2xl">
            <p className="text-xl text-gray-700 dark:text-gray-200 mb-6">
              "InterviewGPT helped me land my dream job! The AI interview felt real, and the feedback was spot on. I felt so much more confident going into my actual interview."
            </p>
            <div className="flex items-center justify-center gap-4">
              <img src="/user-avatar.png" alt="User" className="w-12 h-12 rounded-full border-2 border-indigo-500" />
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-white">Alex Johnson</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Software Engineer, Hired at TechCorp</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow">
              <h3 className="font-semibold text-lg mb-2 text-indigo-600 dark:text-indigo-400">Is the demo free?</h3>
              <p className="text-gray-600 dark:text-gray-300">Yes! The demo is completely free and gives you a real taste of the platform's capabilities.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow">
              <h3 className="font-semibold text-lg mb-2 text-indigo-600 dark:text-indigo-400">Do I need to sign up?</h3>
              <p className="text-gray-600 dark:text-gray-300">No signup is required for the demo. Just click and start practicing!</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow">
              <h3 className="font-semibold text-lg mb-2 text-indigo-600 dark:text-indigo-400">What happens after the demo?</h3>
              <p className="text-gray-600 dark:text-gray-300">You'll get a summary of your performance and an invitation to explore the full platform for more features.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Features */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                <FiMessageSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                AI Interview Simulation
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Experience our realistic AI interviewer that adapts to your responses and provides instant feedback.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mb-4">
                <FiUpload className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Resume Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Upload your resume and get instant feedback on how to improve it for better job opportunities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <FiBarChart2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Performance Analytics
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track your progress with detailed analytics and get personalized improvement suggestions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-indigo-600 to-emerald-600 rounded-2xl p-8 md:p-12 text-white"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">
                  Try Our Interactive Demo
                </h2>
                <p className="text-lg mb-6 text-indigo-100">
                  Experience a 5-minute mock interview with our AI interviewer. Get instant feedback and see how our platform can help you improve.
                </p>
                <button className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-200">
                  <FiPlay className="mr-2" />
                  Start Demo Interview
                </button>
              </div>
              <div className="md:w-1/2">
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <FiUsers className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold">AI Interviewer</h3>
                      <p className="text-sm text-indigo-100">Ready to help you practice</p>
                    </div>
                  </div>
                  <p className="text-indigo-100">
                    "Hi! I'm your AI interviewer. I'll help you practice common interview questions and provide feedback on your responses. Are you ready to begin?"
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
              Ready to Transform Your Interview Skills?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of professionals who have already improved their interview performance with InterviewGPT
            </p>
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
              Get Started Now
              <FiArrowRight className="ml-2" />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 