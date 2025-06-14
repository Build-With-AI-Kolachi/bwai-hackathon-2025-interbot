'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FiCalendar, FiTag, FiArrowRight, FiStar, FiZap, FiMessageSquare, FiGlobe } from 'react-icons/fi';

interface Update {
  date: string;
  title: string;
  description: string;
  category: 'feature' | 'improvement' | 'announcement';
  icon: React.ReactNode;
}

const updates: Update[] = [
  {
    date: 'March 25, 2025',
    title: 'Global Interview Platform Launch',
    description: 'We\'re excited to announce our global expansion! InterviewGPT now supports interviews in 50+ languages and offers region-specific interview formats. New features include real-time translation, cultural context awareness, and international job market insights.',
    category: 'announcement',
    icon: <FiGlobe className="w-6 h-6" />
  },
  {
    date: 'March 15, 2024',
    title: 'New AI Interview Simulation',
    description: 'We\'ve enhanced our AI interview simulation with more realistic responses and better feedback mechanisms. The system now provides more detailed analysis of your interview performance.',
    category: 'feature',
    icon: <FiMessageSquare className="w-6 h-6" />
  },
  {
    date: 'March 10, 2024',
    title: 'Performance Analytics Dashboard',
    description: 'Introducing our new analytics dashboard that provides detailed insights into your interview performance, including speaking pace, response quality, and improvement areas.',
    category: 'feature',
    icon: <FiZap className="w-6 h-6" />
  },
  {
    date: 'March 5, 2024',
    title: 'Enhanced Resume Analysis',
    description: 'Our resume analysis tool now includes ATS optimization suggestions and industry-specific recommendations to help you stand out to employers.',
    category: 'improvement',
    icon: <FiStar className="w-6 h-6" />
  },
  {
    date: 'March 1, 2024',
    title: 'New Interview Categories',
    description: 'Added new interview categories including tech, finance, healthcare, and creative industries with specialized question sets for each field.',
    category: 'feature',
    icon: <FiMessageSquare className="w-6 h-6" />
  }
];

const categoryColors = {
  feature: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  improvement: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  announcement: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
};

export default function UpdatesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
              Latest Updates
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Stay informed about the latest features, improvements, and announcements from InterviewGPT.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Updates Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            {updates.map((update, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${categoryColors[update.category]}`}>
                    {update.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <FiCalendar className="w-4 h-4" />
                      <span>{update.date}</span>
                      <span className="mx-2">•</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${categoryColors[update.category]}`}>
                        {update.category.charAt(0).toUpperCase() + update.category.slice(1)}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {update.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {update.description}
                    </p>
                    <button className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-200">
                      Read more
                      <FiArrowRight className="ml-2" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
              Stay Updated
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Subscribe to our newsletter to receive the latest updates and feature announcements.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 text-white font-medium transition-all duration-200"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 