'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FiCalendar, FiUser, FiTag, FiArrowRight, FiSearch, FiClock, FiBookmark } from 'react-icons/fi';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

const featuredPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How AI is Revolutionizing Interview Preparation',
    excerpt: 'Discover how artificial intelligence is transforming the way candidates prepare for interviews, providing personalized feedback and realistic simulations.',
    author: 'Sarah Chen',
    date: 'March 25, 2024',
    category: 'Technology',
    image: '/blog/placeholder.svg',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Top 10 Interview Questions for Software Engineers in 2024',
    excerpt: 'Stay ahead of the curve with our comprehensive guide to the most common and challenging interview questions for software engineering roles.',
    author: 'Michael Rodriguez',
    date: 'March 20, 2024',
    category: 'Career Tips',
    image: '/blog/placeholder.svg',
    readTime: '8 min read'
  },
  {
    id: '3',
    title: 'The Future of Remote Interviews: Trends and Best Practices',
    excerpt: 'Explore the evolving landscape of remote interviews and learn how to excel in virtual interview settings.',
    author: 'Priya Patel',
    date: 'March 15, 2024',
    category: 'Remote Work',
    image: '/blog/placeholder.svg',
    readTime: '6 min read'
  }
];

const latestPosts: BlogPost[] = [
  {
    id: '4',
    title: 'Mastering Behavioral Interview Questions',
    excerpt: 'Learn how to effectively answer behavioral questions using the STAR method and real-world examples.',
    author: 'David Kim',
    date: 'March 18, 2024',
    category: 'Career Tips',
    image: '/blog/behavioral-interview.jpg',
    readTime: '7 min read'
  },
  {
    id: '5',
    title: 'The Impact of AI on HR and Recruitment',
    excerpt: 'How artificial intelligence is transforming the recruitment process and what it means for job seekers.',
    author: 'Emma Wilson',
    date: 'March 16, 2024',
    category: 'Technology',
    image: '/blog/ai-recruitment.jpg',
    readTime: '6 min read'
  },
  {
    id: '6',
    title: 'Building a Strong Professional Network',
    excerpt: 'Strategies for building and maintaining a professional network that can help advance your career.',
    author: 'James Thompson',
    date: 'March 14, 2024',
    category: 'Career Tips',
    image: '/blog/networking.jpg',
    readTime: '5 min read'
  }
];

const categories = [
  { name: 'Technology', count: 12 },
  { name: 'Career Tips', count: 8 },
  { name: 'Remote Work', count: 6 },
  { name: 'Industry Insights', count: 10 },
  { name: 'Success Stories', count: 5 }
];

const popularTags = [
  'Interview Tips',
  'AI Technology',
  'Career Growth',
  'Remote Work',
  'Job Search',
  'Resume Writing',
  'Leadership',
  'Tech Industry'
];

const authors = [
  {
    name: 'Sarah Chen',
    role: 'Senior AI Engineer',
    image: '/team/placeholder.svg',
    bio: 'Expert in AI and machine learning with a passion for helping others succeed in tech interviews.',
    articles: 15
  },
  {
    name: 'Michael Rodriguez',
    role: 'Product Manager',
    image: '/team/placeholder.svg',
    bio: 'Product leader with experience in building innovative interview preparation tools.',
    articles: 12
  },
  {
    name: 'Priya Patel',
    role: 'UX Designer',
    image: '/team/placeholder.svg',
    bio: 'Design expert focused on creating intuitive and engaging user experiences.',
    articles: 10
  }
];

export default function BlogPage() {
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
              InterviewGPT Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Insights, tips, and trends in interview preparation and career development
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-12"
                />
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
            Featured Articles
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                    <span className="flex items-center">
                      <FiCalendar className="mr-2" />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <FiUser className="mr-2" />
                      {post.author}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {post.readTime}
                    </span>
                    <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center">
                      Read More
                      <FiArrowRight className="ml-2" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
            Latest Articles
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {latestPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                    <span className="flex items-center">
                      <FiCalendar className="mr-2" />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <FiUser className="mr-2" />
                      {post.author}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {post.readTime}
                    </span>
                    <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center">
                      Read More
                      <FiArrowRight className="ml-2" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
            Categories
          </h2>
          <div className="grid md:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                <FiTag className="w-8 h-8 mx-auto mb-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {category.count} articles
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tags Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
            Popular Tags
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {popularTags.map((tag, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors duration-200 shadow-sm"
              >
                #{tag}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Authors Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
            Our Authors
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {authors.map((author, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center"
              >
                <img
                  src={author.image}
                  alt={author.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {author.name}
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400 mb-3">
                  {author.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {author.bio}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {author.articles} articles
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Load More Button */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
          >
            Load More Articles
          </motion.button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-indigo-600 to-emerald-600 rounded-xl p-8 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-lg mb-8 text-indigo-100">
              Subscribe to our newsletter for the latest articles and insights
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors duration-200"
                >
                  Subscribe
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