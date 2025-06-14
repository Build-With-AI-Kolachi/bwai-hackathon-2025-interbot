'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FiUsers, FiAward, FiCoffee, FiGlobe, FiHeart, FiZap, FiArrowRight, FiBriefcase, FiMapPin, FiClock } from 'react-icons/fi';

interface JobOpening {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

const jobOpenings: JobOpening[] = [
  {
    title: "Senior AI Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Join our AI team to build and improve our interview simulation technology. You'll work on cutting-edge NLP and machine learning projects.",
    requirements: [
      "5+ years of experience in AI/ML development",
      "Strong Python and PyTorch skills",
      "Experience with NLP and transformer models",
      "Bachelor's degree in Computer Science or related field"
    ]
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Hybrid",
    type: "Full-time",
    description: "Help shape the future of our platform by creating intuitive and engaging user experiences for our interview simulation features.",
    requirements: [
      "3+ years of product design experience",
      "Strong portfolio showcasing UX/UI work",
      "Experience with Figma and design systems",
      "Understanding of user research methodologies"
    ]
  },
  {
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote",
    type: "Full-time",
    description: "Build and maintain relationships with our enterprise clients, ensuring they get the most value from our platform.",
    requirements: [
      "2+ years in customer success or account management",
      "Excellent communication skills",
      "Experience with enterprise SaaS products",
      "Strong problem-solving abilities"
    ]
  }
];

const benefits = [
  {
    icon: <FiUsers className="w-6 h-6" />,
    title: "Collaborative Culture",
    description: "Work with talented individuals in a supportive and inclusive environment."
  },
  {
    icon: <FiAward className="w-6 h-6" />,
    title: "Growth Opportunities",
    description: "Continuous learning and career development through training and mentorship."
  },
  {
    icon: <FiCoffee className="w-6 h-6" />,
    title: "Work-Life Balance",
    description: "Flexible hours and remote work options to maintain a healthy balance."
  },
  {
    icon: <FiGlobe className="w-6 h-6" />,
    title: "Global Team",
    description: "Work with colleagues from around the world in a diverse environment."
  },
  {
    icon: <FiHeart className="w-6 h-6" />,
    title: "Health & Wellness",
    description: "Comprehensive health coverage and wellness programs for all employees."
  },
  {
    icon: <FiZap className="w-6 h-6" />,
    title: "Innovation",
    description: "Be part of a team that's revolutionizing the interview preparation industry."
  }
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
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
              Join Our Team
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Help us revolutionize the way people prepare for interviews. Be part of a team that's making a real difference in people's careers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
            Why Join Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
            Open Positions
          </h2>
          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                      <span className="flex items-center">
                        <FiBriefcase className="mr-2" />
                        {job.department}
                      </span>
                      <span className="flex items-center">
                        <FiMapPin className="mr-2" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <FiClock className="mr-2" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 px-6 py-2 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                    Apply Now
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {job.description}
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Requirements:</h4>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                    {job.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
              Our Application Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              We believe in a transparent and efficient hiring process. Here's what you can expect:
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Initial Screening</h3>
                <p className="text-gray-600 dark:text-gray-300">Review of your application and resume</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Technical Interview</h3>
                <p className="text-gray-600 dark:text-gray-300">Skills assessment and technical discussion</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Team Interview</h3>
                <p className="text-gray-600 dark:text-gray-300">Meet the team and discuss role fit</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Life at InterviewGPT Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
            Life at InterviewGPT
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Our Culture</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                At InterviewGPT, we foster a culture of innovation, collaboration, and continuous learning. Our team members are passionate about helping others succeed in their careers.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Weekly team sync-ups and knowledge sharing</li>
                <li>• Monthly hackathons and innovation days</li>
                <li>• Regular team building activities</li>
                <li>• Open communication and feedback culture</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Work Environment</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We provide a flexible and supportive work environment that enables our team to do their best work.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Remote-first work culture</li>
                <li>• Modern office spaces in key locations</li>
                <li>• Latest tools and equipment</li>
                <li>• Flexible working hours</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
              Get in Touch
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
              Have questions about working at InterviewGPT? We'd love to hear from you!
            </p>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your message"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 