'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CookiesPage() {
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
            Cookies Policy
          </motion.h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Learn how we use cookies to enhance your experience.
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
              <li><a href="#cookie-types" className="hover:text-indigo-600 dark:hover:text-indigo-400">Cookie Types</a></li>
              <li><a href="#cookie-usage" className="hover:text-indigo-600 dark:hover:text-indigo-400">Cookie Usage</a></li>
              <li><a href="#cookie-management" className="hover:text-indigo-600 dark:hover:text-indigo-400">Cookie Management</a></li>
              <li><a href="#user-preferences" className="hover:text-indigo-600 dark:hover:text-indigo-400">User Preferences</a></li>
            </ul>
          </motion.div>

          <motion.div
            id="cookie-types"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Cookie Types</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We use essential cookies to ensure the functionality of our website, analytical cookies to improve our services, and third-party cookies for marketing purposes.
            </p>
          </motion.div>

          <motion.div
            id="cookie-usage"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Cookie Usage</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Cookies help us remember your preferences, analyze site traffic, and personalize your experience. We only use cookies with your consent.
            </p>
          </motion.div>

          <motion.div
            id="cookie-management"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Cookie Management</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You can manage your cookie preferences through your browser settings. Disabling cookies may affect the functionality of our website.
            </p>
          </motion.div>

          <motion.div
            id="user-preferences"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">User Preferences</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Help Us Improve</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">We value your feedback. Let us know how we can improve our cookies policy.</p>
          <a
            href="mailto:cookies@interviewgpt.com"
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