'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
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
            Terms of Service
          </motion.h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Please read these terms carefully before using our services.
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
              <li><a href="#usage-terms" className="hover:text-indigo-600 dark:hover:text-indigo-400">Usage Terms</a></li>
              <li><a href="#user-obligations" className="hover:text-indigo-600 dark:hover:text-indigo-400">User Obligations</a></li>
              <li><a href="#intellectual-property" className="hover:text-indigo-600 dark:hover:text-indigo-400">Intellectual Property</a></li>
              <li><a href="#disclaimers" className="hover:text-indigo-600 dark:hover:text-indigo-400">Disclaimers</a></li>
            </ul>
          </motion.div>

          <motion.div
            id="usage-terms"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Usage Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              By using InterviewGPT, you agree to comply with these terms. You must not misuse our services or violate any laws.
            </p>
          </motion.div>

          <motion.div
            id="user-obligations"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">User Obligations</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You must notify us immediately of any unauthorized use.
            </p>
          </motion.div>

          <motion.div
            id="intellectual-property"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Intellectual Property</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              All content and materials available on InterviewGPT are protected by intellectual property rights. You may not use, reproduce, or distribute any content without our permission.
            </p>
          </motion.div>

          <motion.div
            id="disclaimers"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Disclaimers</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our services are provided "as is" without any warranties. We are not liable for any damages arising from the use of our services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Help Us Improve</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">We value your feedback. Let us know how we can improve our terms of service.</p>
          <a
            href="mailto:terms@interviewgpt.com"
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