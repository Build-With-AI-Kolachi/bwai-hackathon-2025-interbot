'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FiSearch, FiChevronDown, FiMail } from 'react-icons/fi';

const faqs = [
  {
    question: 'How do I create an account?',
    answer: 'Click the Sign Up button on the top right, fill in your details, and follow the instructions to verify your email.'
  },
  {
    question: 'How does the AI interview simulation work?',
    answer: 'Our AI simulates real interview scenarios by asking questions and providing instant feedback based on your responses.'
  },
  {
    question: 'Can I use InterviewGPT for free?',
    answer: 'Yes, we offer a free plan with limited features. You can upgrade anytime for more advanced tools and analytics.'
  },
  {
    question: 'How do I contact support?',
    answer: 'You can reach our support team via the contact form at the bottom of this page or by emailing support@interviewgpt.com.'
  },
  {
    question: 'Is my data secure?',
    answer: 'We use industry-standard encryption and never share your data with third parties. Your privacy and security are our top priorities.'
  }
];

export default function HelpCenterPage() {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(search.toLowerCase()) ||
    faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400"
          >
            Help Center
          </motion.h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Find answers to common questions or get in touch with our support team.
          </p>
          <div className="relative max-w-xl mx-auto mb-8">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for help..."
              className="w-full px-12 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
            Quick Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.a
              href="#faq"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-2">FAQs</h3>
              <p className="text-gray-600 dark:text-gray-300">Find answers to common questions</p>
            </motion.a>
            <motion.a
              href="#tutorials"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Tutorials</h3>
              <p className="text-gray-600 dark:text-gray-300">Watch video guides and tutorials</p>
            </motion.a>
            <motion.a
              href="#contact"
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Contact Us</h3>
              <p className="text-gray-600 dark:text-gray-300">Get in touch with our support team</p>
            </motion.a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {filteredFaqs.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400">No results found.</p>
            )}
            {filteredFaqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow p-4"
              >
                <button
                  className="flex justify-between items-center w-full text-left text-lg font-medium text-gray-900 dark:text-white focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  aria-expanded={openIndex === idx}
                >
                  {faq.question}
                  <FiChevronDown className={`ml-2 transition-transform duration-200 ${openIndex === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden mt-2 text-gray-700 dark:text-gray-300"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Tutorial Section */}
      <section id="tutorials" className="py-12 px-4 bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
            Video Tutorials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Getting Started with InterviewGPT"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Getting Started with InterviewGPT</h3>
                <p className="text-gray-600 dark:text-gray-300">Learn how to set up your account and start your first interview simulation.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Advanced Features"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Advanced Features</h3>
                <p className="text-gray-600 dark:text-gray-300">Discover advanced features and tips to maximize your interview preparation.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section id="contact" className="py-16 px-4 bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-2xl mx-auto text-center bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Need More Help?</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">If you can't find the answer you're looking for, our support team is here to help.</p>
          <a
            href="mailto:support@interviewgpt.com"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
          >
            <FiMail className="mr-2" />
            Contact Support
          </a>
        </div>
      </section>

      {/* Feedback Form Section */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
            Help Us Improve
          </h2>
          <form className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="mb-4">
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Feedback</label>
              <textarea
                id="feedback"
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Tell us how we can improve our help center..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
} 