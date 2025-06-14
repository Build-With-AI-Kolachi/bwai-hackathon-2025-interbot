'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FiUpload, FiZap, FiCheckCircle, FiTarget, FiBarChart2, FiMessageSquare, FiArrowRight, FiUsers, FiAward, FiStar, FiBriefcase, FiGlobe, FiPlayCircle, FiClock, FiSmile, FiClipboard } from 'react-icons/fi';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      {/* Hero Section */}
      <section className="flex-grow flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-28">
        <motion.div 
          className="w-full md:w-1/2 mb-8 sm:mb-12 md:mb-0 md:pr-8 lg:pr-12 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative z-10">
            {/* Animated background elements */}
            <motion.div 
              className="absolute -top-8 -left-8 w-24 sm:w-32 h-24 sm:h-32 bg-indigo-500/10 rounded-full blur-2xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute top-1/2 -right-8 w-16 sm:w-24 h-16 sm:h-24 bg-emerald-500/10 rounded-full blur-2xl"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
              Master Your Interviews with InterBot
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-4 font-medium bg-gradient-to-r from-indigo-500/10 to-emerald-500/10 px-3 sm:px-4 py-2 rounded-lg inline-block">
              Your Personal AI Interview Coach
            </p>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Prepare smarter, not harder. InterviewGPT leverages advanced AI to provide realistic mock interviews, personalized feedback, and actionable insights to help you land your dream job.
            </p>

            {/* Key Benefits List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-left text-base sm:text-lg">
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <FiCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 mr-2" />
                <span>Realistic Mock Interviews</span>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <FiBarChart2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 mr-2" />
                <span>In-depth Performance Analytics</span>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <FiTarget className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500 mr-2" />
                <span>Personalized Improvement Plans</span>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <FiAward className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 mr-2" />
                <span>Industry & Role Specific Questions</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
              <Link 
                href="/interview" 
                className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-emerald-600 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300"
              >
                Start Your Free Mock Interview
                <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/pricing" 
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View Pricing
              </Link>
            </div>

            <div className="flex items-center justify-center md:justify-start space-x-3 sm:space-x-4">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white dark:ring-gray-800 bg-gradient-to-r from-indigo-500 to-emerald-500 flex items-center justify-center text-white text-sm sm:text-base font-semibold">
                  U1
                </div>
                <div className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white dark:ring-gray-800 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm sm:text-base font-semibold">
                  U2
                </div>
                <div className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white dark:ring-gray-800 bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm sm:text-base font-semibold">
                  U3
                </div>
                <div className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white dark:ring-gray-800 bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white text-sm sm:text-base font-semibold">
                  U4
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Join 10,000+ successful professionals
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="w-full md:w-1/2 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* Video Demo Section */}
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl">
            <video 
              className="w-full h-full object-cover"
              autoPlay 
              muted 
              loop 
              playsInline
              poster="/human-like-robot-and-artificial.jpg"
            >
              <source src="/main.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="mt-3 sm:mt-4 text-center text-gray-600 dark:text-gray-300 text-xs sm:text-sm max-w-sm mx-auto">
            See InterviewGPT in action. Our AI provides instant, actionable feedback to help you shine.
          </p>
        </motion.div>
      </section>

      {/* Features Section - Improved Content */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Comprehensive Features Designed for Your Success
          </motion.h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg sm:shadow-xl p-6 sm:p-8 text-left space-y-3 sm:space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <FiUpload className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Smart Resume Analysis</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">Upload your resume, and our AI will analyze it to generate personalized questions and identify areas to focus on during your practice sessions. Get feedback relevant to your unique profile.</p>
            </motion.div>
            
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg sm:shadow-xl p-6 sm:p-8 text-left space-y-3 sm:space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <FiMessageSquare className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Highly Realistic Mock Interviews</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">Practice with an AI interviewer that adapts to your responses, simulating the dynamic flow of a real job interview. Experience various question types and scenarios.</p>
            </motion.div>
            
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg sm:shadow-xl p-6 sm:p-8 text-left space-y-3 sm:space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <FiBarChart2 className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Detailed Performance Reports</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">Get immediate, in-depth feedback on key aspects like your communication clarity, answer structure, pace, and confidence level. Identify strengths and areas for targeted practice.</p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg sm:shadow-xl p-6 sm:p-8 text-left space-y-3 sm:space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <FiTarget className="w-10 h-10 sm:w-12 sm:h-12 text-pink-600 dark:text-pink-400" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Personalized Improvement Paths</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">Based on your performance data, InterviewGPT creates a customized plan with exercises and tips specifically designed to help you overcome your weaknesses and maximize your strengths.</p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg sm:shadow-xl p-6 sm:p-8 text-left space-y-3 sm:space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <FiAward className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-600 dark:text-yellow-400" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Industry & Role Specific Practice</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">Tailor your practice to the specific demands of your target industry and job role. Access a vast library of questions relevant to tech, finance, healthcare, and more.</p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg sm:shadow-xl p-6 sm:p-8 text-left space-y-3 sm:space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <FiSmile className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Boost Your Confidence</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">Reduce interview jitters and build confidence by practicing in a low-pressure, supportive environment. Feel prepared and calm on the day of your actual interview.</p>
            </motion.div>
          </div>
        </div>
      </section>

       {/* How It Works Section - Improved Content */}
       <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
         <div className="max-w-7xl mx-auto">
           <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400"
             initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Your Simple 3-Step Path to Interview Mastery
          </motion.h2>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <motion.div
              className="flex flex-col items-center text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg sm:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-600 text-white dark:bg-indigo-400 dark:text-gray-900 mb-6 text-3xl font-bold shadow-lg">
                <FiUpload className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">Upload Your Resume</h3>
              <p className="text-gray-600 dark:text-gray-300">Easily upload your resume in minutes. Our AI quickly processes it to create a personalized foundation for your practice.</p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg sm:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-emerald-600 text-white dark:bg-emerald-400 dark:text-gray-900 mb-6 text-3xl font-bold shadow-lg">
                <FiMessageSquare className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">Practice with AI</h3>
              <p className="text-gray-600 dark:text-gray-300">Dive into a realistic mock interview conversation. Our AI asks relevant questions and challenges you based on your profile and target role.</p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg sm:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-600 text-white dark:bg-purple-400 dark:text-gray-900 mb-6 text-3xl font-bold shadow-lg">
                <FiClipboard className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">Get Instant Feedback</h3>
              <p className="text-gray-600 dark:text-gray-300">Receive immediate, detailed, and actionable feedback on your responses, communication style, and overall performance to pinpoint exactly what to improve.</p>
            </motion.div>
          </div>
         </div>
       </section>

      {/* Target Audience Section */}
      <section className="py-20 px-4 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400"
             initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Who Can Benefit from InterviewGPT?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Whether you're just starting out, looking to advance, or changing careers, InterviewGPT is designed for you.
          </motion.p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-left space-y-4 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <FiBriefcase className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Experienced Professionals</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Refine your interview technique, practice for senior roles, and stay sharp with targeted AI-driven practice sessions.</p>
            </motion.div>
            
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-left space-y-4 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <FiUsers className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Students & Recent Grads</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Build foundational interview skills, gain confidence for your first job interviews, and get tailored practice based on your academic background.</p>
            </motion.div>
            
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-left space-y-4 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <FiGlobe className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Career Changers</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Transition smoothly into a new industry or role by practicing with relevant questions and scenarios, and get feedback on how to best present your transferable skills.</p>
        </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section - Improved Content */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">98%</div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Reported Interview Success Rate</p>
            </motion.div>
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">10,000+</div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Users Trust InterviewGPT</p>
            </motion.div>
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">4.9/5</div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Average Rating from Users</p>
            </motion.div>
          </div>
                </div>
      </section>

      {/* Testimonials Section - Improved Content */}
      <section className="py-20 px-4 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400"
             initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Hear From Our Successful Users
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-700 dark:text-gray-300 italic mb-4 leading-relaxed">
                "InterviewGPT was an absolute game-changer for my interview preparation. The AI provided incredibly realistic simulations and pinpointed exactly where I needed to improve. Highly recommended!"
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">Sarah K.</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Software Engineer</p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-700 dark:text-gray-300 italic mb-4 leading-relaxed">
                "The detailed analytics from InterviewGPT gave me insights I never would have gotten from traditional practice. I felt so much more confident walking into my interviews after using this platform."
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">Michael B.</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Marketing Specialist</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
          <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
              Ready to Land Your Dream Job?
          </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
              Stop feeling unprepared. Start practicing with InterviewGPT today and gain the confidence to ace your next interview. Your future starts now.
          </p>
            <Link 
              href="/interview" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-emerald-600 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300"
            >
              Start Your Free Mock Interview
              <FiArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}