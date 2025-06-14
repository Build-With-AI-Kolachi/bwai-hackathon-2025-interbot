'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SecurityPage() {
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
            Security
          </motion.h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Learn how we protect your data and ensure your security.
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
              <li><a href="#data-protection" className="hover:text-indigo-600 dark:hover:text-indigo-400">Data Protection</a></li>
              <li><a href="#encryption" className="hover:text-indigo-600 dark:hover:text-indigo-400">Encryption</a></li>
              <li><a href="#incident-reporting" className="hover:text-indigo-600 dark:hover:text-indigo-400">Incident Reporting</a></li>
              <li><a href="#security-best-practices" className="hover:text-indigo-600 dark:hover:text-indigo-400">Security Best Practices</a></li>
            </ul>
          </motion.div>

          <motion.div
            id="data-protection"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Data Protection</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We implement robust security measures to protect your data from unauthorized access and ensure compliance with industry standards.
            </p>
          </motion.div>

          <motion.div
            id="encryption"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Encryption</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              All data transmitted between your browser and our servers is encrypted using industry-standard protocols to ensure your information is secure.
            </p>
          </motion.div>

          <motion.div
            id="incident-reporting"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Incident Reporting</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you suspect a security incident, please report it immediately to our security team. We take all reports seriously and will investigate promptly.
            </p>
          </motion.div>

          <motion.div
            id="security-best-practices"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Security Best Practices</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We recommend using strong, unique passwords, enabling two-factor authentication, and being cautious of phishing attempts to enhance your security.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Help Us Improve</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">We value your feedback. Let us know how we can improve our security measures.</p>
          <a
            href="mailto:security@interviewgpt.com"
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