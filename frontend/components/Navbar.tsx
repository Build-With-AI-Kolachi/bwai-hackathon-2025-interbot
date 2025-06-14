'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX, FiMoon, FiSun, FiUpload, FiUser, FiMessageSquare, FiLogOut } from 'react-icons/fi';
import { useUser, useClerk } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('darkMode');
      let isDark;
      if (stored !== null) {
        isDark = stored === 'true';
      } else {
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      setIsDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    if (typeof window !== 'undefined') {
      const newState = !isDarkMode;
      setIsDarkMode(newState);
      if (newState) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
      }
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <FiMessageSquare className="w-8 h-8 mr-2 text-indigo-600 dark:text-indigo-400" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
                 InterBot
              </span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex space-x-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === link.path 
                      ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="ml-4 flex items-center space-x-2">
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>

              {isSignedIn ? (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/interview"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 transition-all duration-200 flex items-center shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30"
                  >
                    <FiUpload className="mr-2" />
                    Upload Resume
                  </Link>
                  <div className="relative">
                    <UserButton 
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "w-10 h-10 ring-2 ring-offset-2 ring-indigo-400 dark:ring-emerald-500 rounded-full shadow-lg bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400 p-0.5",
                          userButtonPopoverCard: "bg-white dark:bg-gray-900 border border-indigo-200 dark:border-emerald-700 shadow-2xl",
                          userButtonPopoverActionButton: "text-black dark:text-black hover:bg-gradient-to-r hover:from-indigo-50 hover:to-emerald-50 dark:hover:from-indigo-900 dark:hover:to-emerald-900 transition-all duration-200",
                          userButtonPopoverFooter: "border-t border-indigo-200 dark:border-emerald-700",
                        }
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center"
                  >
                    <FiUser className="mr-2" />
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 transition-all duration-200 flex items-center shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none mr-2"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            
            {isSignedIn && (
              <div className="mr-2">
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-8 h-8 ring-2 ring-offset-2 ring-indigo-400 dark:ring-emerald-500 rounded-full shadow-lg bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400 p-0.5",
                    }
                  }}
                />
              </div>
            )}
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`block px-3 py-2 rounded-lg text-base font-medium ${
                  pathname === link.path 
                    ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              {isSignedIn ? (
                <>
                  <Link
                    href="/interview"
                    className="block px-3 py-2 rounded-lg text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <FiUpload className="mr-2" />
                      Upload Resume
                    </div>
                  </Link>
                  <div className="mt-4 px-3 py-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <UserButton 
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            userButtonAvatarBox: "w-10 h-10 ring-2 ring-offset-2 ring-indigo-400 dark:ring-emerald-500 rounded-full shadow-lg bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400 p-0.5",
                          }
                        }}
                      />
                      <span className="ml-3 text-gray-700 dark:text-gray-200">
                        {user?.firstName} {user?.lastName}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <FiLogOut size={20} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <FiUser className="mr-2" />
                      Login
                    </div>
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-3 py-2 mt-2 rounded-lg text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <FiUser className="mr-2" />
                      Sign Up
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;