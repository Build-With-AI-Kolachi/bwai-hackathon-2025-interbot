'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FiUsers, FiTarget, FiBarChart2, FiMessageSquare } from 'react-icons/fi';

const teamMembers = [
  {
    name: "Muhammad Sami Asghar Mughal",
    role: "Founder",
    image: "https://media.licdn.com/dms/image/v2/D4D35AQEXM42LGIXgZg/profile-framedphoto-shrink_100_100/B4DZVbdBt_GcAk-/0/1740996091187?e=1749762000&v=beta&t=mt1dgOeA2OF4EpADCUyTaYRZFKc_focVwboDKHPZtAM",
    bio: "Full Stack Web Developer | Python & AI Enthusiast | React, Next.js, TypeScript, Tailwind CSS | Building Scalable Web Apps & Intelligent AI Agents 🚀",
    joinedDate: "Joined: <insert actual month year here>",
    linkedin: "https://www.linkedin.com/in/muhammadsami987123"
  },
  {
    name: "Iqra Hussain",
    role: "Co-Founder",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQHKAn9a_aFGWw/profile-displayphoto-shrink_200_200/B4EZSVKRbKGgAg-/0/1737669286352?e=1754524800&v=beta&t=lU2dNBkjl6iiu8Ait557QgZyskIBsyQE8x7Uhvh-6Yo",
    bio: "A Spring AI enthusiast and participant in the Governor Sindh IT initiative for Gen AI, Web3, and the Metaverse.",
    joinedDate: "Joined: <insert actual month year here>",
    linkedin: "https://www.linkedin.com/in/iqra-hussain-7b6b03323/"
  }
  
];

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
        {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
            <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400"
            initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
            About InterviewGPT
            </motion.h1>
            <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
            Our mission is to revolutionize the way people prepare for interviews. We believe everyone deserves the chance to showcase their full potential, and our AI-powered platform is designed to provide the tools and feedback you need to succeed.
            </motion.p>
          </div>
        </section>
        
      {/* Mission & Vision Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              To provide accessible, effective, and personalized interview preparation for everyone, everywhere. We leverage cutting-edge AI technology to offer realistic simulations and actionable feedback, helping job seekers build confidence and perform at their best.
            </p>
          </motion.div>
              <motion.div 
            initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
              Our Vision
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              To be the leading global platform for interview success, continuously innovating and expanding our offerings to meet the evolving needs of the job market. We aim to create a community where individuals feel supported and empowered throughout their career journeys.
                </p>
              </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Why Choose InterviewGPT?
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400 mb-4">
                <FiBarChart2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Data-Driven Feedback</h3>
              <p className="text-gray-600 dark:text-gray-300">Receive detailed analytics on your performance to identify areas for improvement.</p>
            </motion.div>
              <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400 mb-4">
                <FiMessageSquare className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Realistic Simulations</h3>
              <p className="text-gray-600 dark:text-gray-300">Practice with AI interviewers that adapt to your responses for a real experience.</p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400 mb-4">
                <FiUsers className="w-8 h-8" />
                </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Expert-Backed Content</h3>
              <p className="text-gray-600 dark:text-gray-300">Our content is developed with input from career coaches and industry professionals.</p>
              </motion.div>
              <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400 mb-4">
                <FiTarget className="w-8 h-8" />
                </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Personalized Learning</h3>
              <p className="text-gray-600 dark:text-gray-300">Tailored recommendations and practice plans based on your strengths and weaknesses.</p>
              </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className=" py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Meet the Team
          </motion.h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-8 justify-items-center">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.name}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-indigo-500 dark:border-indigo-400"
                  src={member.image}
                  alt={member.name}
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-indigo-600 dark:text-indigo-400 mb-2">{member.role}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{member.joinedDate}</p>
                <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
              </motion.div>
            ))}
            </div>
          </div>
        </section>
        
      {/* Final CTA */}
      <section className="py-20 px-4 text-center">
            <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
              Ready to Transform Your Interview Skills?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of successful job seekers who used InterviewGPT to land their dream job.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
              Get Started Today
            </button>
          </motion.div>
          </div>
        </section>
      
      <Footer />
    </main>
  );
}