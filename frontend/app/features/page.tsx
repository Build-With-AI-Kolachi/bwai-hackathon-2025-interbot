"use client";

import { motion } from 'framer-motion';
import { FiMessageSquare, FiUpload, FiBarChart2, FiUsers, FiShield, FiClock, FiAward, FiGlobe } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const features = [
  {
    icon: FiMessageSquare,
    title: "AI-Powered Interview Coaching",
    description: "Get personalized interview coaching powered by advanced AI technology. Our system analyzes your responses in real-time and provides instant feedback to help you improve.",
    benefits: [
      "Real-time response analysis",
      "Personalized feedback",
      "Industry-specific coaching",
      "Behavioral question preparation"
    ]
  },
  {
    icon: FiUpload,
    title: "Smart Resume Analysis",
    description: "Upload your resume and get instant analysis of your experience, skills, and achievements. Our AI helps identify areas for improvement and suggests enhancements.",
    benefits: [
      "ATS optimization",
      "Skill gap analysis",
      "Achievement highlighting",
      "Format recommendations"
    ]
  },
  {
    icon: FiBarChart2,
    title: "Performance Analytics",
    description: "Track your interview performance with detailed analytics and insights. Monitor your progress over time and identify areas for improvement.",
    benefits: [
      "Progress tracking",
      "Performance metrics",
      "Improvement suggestions",
      "Historical data analysis"
    ]
  },
  {
    icon: FiUsers,
    title: "Expert Community",
    description: "Connect with industry experts and other professionals. Share experiences, get advice, and learn from others' success stories.",
    benefits: [
      "Peer networking",
      "Expert mentorship",
      "Success stories",
      "Community support"
    ]
  }
];

const highlights = [
  {
    icon: FiShield,
    title: "Secure & Private",
    description: "Your data is encrypted and protected. We maintain strict privacy standards to ensure your information remains confidential."
  },
  {
    icon: FiClock,
    title: "24/7 Availability",
    description: "Practice interviews anytime, anywhere. Our AI coach is available round the clock to help you prepare."
  },
  {
    icon: FiAward,
    title: "Industry Recognition",
    description: "Trusted by professionals from top companies worldwide. Join thousands of successful candidates who have used our platform."
  },
  {
    icon: FiGlobe,
    title: "Global Reach",
    description: "Support for multiple languages and regions. Prepare for interviews in your preferred language and cultural context."
  }
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Powerful Features for Your Success
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover how InterviewGPT's advanced features can help you excel in your interviews and advance your career
          </motion.p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white ml-4">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Why Choose InterviewGPT?
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-xl flex items-center justify-center text-white mb-4">
                  <highlight.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>
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
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
              Get Started Now
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
