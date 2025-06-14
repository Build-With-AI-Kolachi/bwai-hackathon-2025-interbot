"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiHelpCircle, FiStar, FiAward, FiZap } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const pricingPlans = [
  {
    name: "Starter",
    price: {
      monthly: 29,
      yearly: 290
    },
    description: "Perfect for individuals starting their interview preparation journey",
    features: [
      "5 AI-powered mock interviews per month",
      "Basic resume analysis",
      "Standard feedback reports",
      "Email support",
      "Community access",
      "Basic interview tips"
    ],
    notIncluded: [
      "Advanced analytics",
      "Priority support",
      "Custom interview scenarios",
      "Expert review"
    ],
    icon: FiStar,
    popular: false
  },
  {
    name: "Professional",
    price: {
      monthly: 79,
      yearly: 790
    },
    description: "Ideal for serious job seekers and career changers",
    features: [
      "Unlimited AI-powered mock interviews",
      "Advanced resume analysis",
      "Detailed performance analytics",
      "Priority email support",
      "Community access",
      "Industry-specific questions",
      "Custom interview scenarios",
      "Basic expert review"
    ],
    notIncluded: [
      "1-on-1 expert coaching",
      "Advanced analytics dashboard",
      "Team collaboration"
    ],
    icon: FiAward,
    popular: true
  },
  {
    name: "Enterprise",
    price: {
      monthly: 199,
      yearly: 1990
    },
    description: "For organizations and teams looking to upskill their workforce",
    features: [
      "Everything in Professional",
      "1-on-1 expert coaching",
      "Advanced analytics dashboard",
      "Team collaboration features",
      "Custom branding",
      "API access",
      "Dedicated account manager",
      "Custom training programs"
    ],
    notIncluded: [],
    icon: FiZap,
    popular: false
  }
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 md:pt-32 md:pb-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Choose the perfect plan for your interview preparation needs
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            className="flex items-center justify-center space-x-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className={`text-sm font-medium ${!isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
              Yearly <span className="text-emerald-600 dark:text-emerald-400">(Save 20%)</span>
            </span>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg ${
                  plan.popular ? 'ring-2 ring-indigo-500 dark:ring-indigo-400' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-indigo-600 to-emerald-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">
                    <plan.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white ml-4">
                    {plan.name}
                  </h3>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      ${isYearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-600 dark:text-gray-300">
                      <FiCheck className="w-5 h-5 text-emerald-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-400 dark:text-gray-500">
                      <FiX className="w-5 h-5 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-indigo-600 to-emerald-600 text-white hover:shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => {
                    // Redirect to sign-up page or open a modal for plan selection
                    window.location.href = '/signup';
                  }}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-8">
            {[
              {
                question: "Can I switch plans later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes, we offer a 7-day free trial on all plans. No credit card required to start."
              },
              {
                question: "Can I get a refund?",
                answer: "We offer a 30-day money-back guarantee if you're not satisfied with our service."
              }
            ].map((faq, index) => (
              <motion.div
                key={faq.question}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <FiHelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-3" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
              Ready to Ace Your Interviews?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Start your 7-day free trial today. No credit card required.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
              Start Free Trial
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
