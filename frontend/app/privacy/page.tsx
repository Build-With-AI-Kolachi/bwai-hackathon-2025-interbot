'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
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
            Privacy Policy
          </motion.h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Learn how we collect, use, and protect your data.
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Table of Contents</h2>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
              <li><a href="#data-collection" className="hover:text-indigo-600 dark:hover:text-indigo-400">Data Collection</a></li>
              <li><a href="#data-usage" className="hover:text-indigo-600 dark:hover:text-indigo-400">Data Usage</a></li>
              <li><a href="#data-sharing" className="hover:text-indigo-600 dark:hover:text-indigo-400">Data Sharing</a></li>
              <li><a href="#user-rights" className="hover:text-indigo-600 dark:hover:text-indigo-400">Your Rights</a></li>
            </ul>
          </motion.div>

          <motion.div
            id="data-collection"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Data Collection</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We collect information you provide directly to us, such as your name, email address, and usage data. This helps us improve our services and provide a better user experience.
            </p>
          </motion.div>

          <motion.div
            id="data-usage"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Data Usage</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Your data is used to personalize your experience, improve our services, and communicate with you about updates and offers. We never sell your data to third parties.
            </p>
          </motion.div>

          <motion.div
            id="data-sharing"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Data Sharing</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We may share your data with trusted third-party service providers who assist us in operating our website and conducting our business. These partners are bound by confidentiality agreements.
            </p>
          </motion.div>

          <motion.div
            id="user-rights"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Your Rights</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You have the right to access, correct, or delete your data. You can also opt out of marketing communications at any time. Contact us for assistance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Help Us Improve</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">We value your feedback. Let us know how we can improve our privacy policy.</p>
          <a
            href="mailto:privacy@interviewgpt.com"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
          >
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
} 