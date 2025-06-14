'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FiFileText, FiDownload, FiExternalLink, FiCalendar, FiBookOpen } from 'react-icons/fi';
import Link from 'next/link';

interface PressRelease {
  title: string;
  date: string;
  description: string;
  link: string;
}

interface MediaMention {
  title: string;
  source: string;
  date: string;
  description: string;
  link: string;
}

const pressReleases: PressRelease[] = [
  {
    title: 'InterviewGPT Raises $10M Series A to Expand AI-Powered Interview Platform',
    date: 'March 15, 2024',
    description: 'Funding will accelerate product development and international expansion of the AI-powered interview preparation platform.',
    link: '#'
  },
  {
    title: 'InterviewGPT Launches New Enterprise Solution for Corporate Training',
    date: 'February 28, 2024',
    description: 'New enterprise features enable companies to create custom interview scenarios and track candidate progress.',
    link: '#'
  },
  {
    title: 'InterviewGPT Partners with Leading Universities for Student Career Development',
    date: 'January 20, 2024',
    description: 'Strategic partnerships with top universities to provide AI-powered interview preparation to students.',
    link: '#'
  }
];

const mediaMentions: MediaMention[] = [
  {
    title: 'How AI is Transforming Interview Preparation',
    source: 'TechCrunch',
    date: 'March 10, 2024',
    description: 'InterviewGPT is revolutionizing how job seekers prepare for interviews using advanced AI technology.',
    link: '#'
  },
  {
    title: 'Top 10 EdTech Startups to Watch in 2024',
    source: 'Forbes',
    date: 'February 15, 2024',
    description: 'InterviewGPT makes the list of most promising education technology startups.',
    link: '#'
  },
  {
    title: 'The Future of AI in Career Development',
    source: 'Harvard Business Review',
    date: 'January 5, 2024',
    description: 'Analysis of how InterviewGPT is shaping the future of career preparation.',
    link: '#'
  }
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
              Press & Media
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover the latest news, press releases, and media resources about InterviewGPT. Stay up to date with our journey to revolutionize interview preparation.
            </p>
            <div className="flex flex-col items-center gap-4 mb-8">
              <blockquote className="italic text-lg text-indigo-700 dark:text-indigo-300 max-w-2xl mx-auto border-l-4 border-indigo-400 pl-4">
                "InterviewGPT is setting a new standard for AI-driven career development." <span className="font-semibold">- TechCrunch</span>
              </blockquote>
            </div>
            <div className="flex justify-center">
              <a
                href="#subscribe"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
              >
                Subscribe for Press Updates
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Press Releases Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
            Press Releases
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pressReleases.map((release, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-t-4 border-indigo-200 dark:border-indigo-700 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                  <span className="flex items-center">
                    <FiCalendar className="mr-2" />
                    {release.date}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {release.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {release.description}
                </p>
                <Link
                  href={release.link}
                  className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                >
                  Read More
                  <FiExternalLink className="ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Mentions Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
            Media Mentions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mediaMentions.map((mention, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-t-4 border-emerald-200 dark:border-emerald-700 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                  <span className="flex items-center">
                    <FiBookOpen className="mr-2" />
                    {mention.source}
                  </span>
                  <span className="flex items-center">
                    <FiCalendar className="mr-2" />
                    {mention.date}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {mention.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {mention.description}
                </p>
                <Link
                  href={mention.link}
                  className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                >
                  Read Article
                  <FiExternalLink className="ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Kit Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
            Press Kit
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                <FiFileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Company Overview
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Download our company fact sheet, mission statement, and key statistics.
              </p>
              <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                <FiDownload className="mr-2" />
                Download PDF
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                <FiFileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Brand Assets
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Access our logo, brand guidelines, and other visual assets.
              </p>
              <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                <FiDownload className="mr-2" />
                Download ZIP
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                <FiFileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Media Contact
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Get in touch with our press team for media inquiries and interviews.
              </p>
              <Link
                href="mailto:press@interviewgpt.com"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action for Journalists */}
      <section id="subscribe" className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Stay in the Loop</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">Journalists and media professionals can subscribe to receive our latest press releases and updates directly to their inbox.</p>
          <form className="flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
} 