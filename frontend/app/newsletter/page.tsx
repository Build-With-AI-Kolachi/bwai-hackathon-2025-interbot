'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NewsletterPage = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setSubscribed(true);
      } else {
        console.error('Failed to subscribe');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Stay Updated</h1>
          <p className="mb-6 text-gray-600 dark:text-gray-300">Subscribe to our newsletter for the latest updates and features.</p>
          {!subscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <p className="text-green-600 dark:text-green-400">Thank you for subscribing!</p>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsletterPage; 