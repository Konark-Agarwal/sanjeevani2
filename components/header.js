import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext'; // Add this import

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, changeLanguage, t } = useLanguage(); // Use language hook

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      suppressHydrationWarning={true}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" legacyBehavior>
            <a className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-[#f37021] to-[#ff9e4d] rounded-xl flex items-center justify-center">
                <Shield size={24} className="text-white" />
              </div>
              <span className={`text-2xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                Sanjeevani
              </span>
            </a>
          </Link>

          {/* Navigation - Using Link with legacyBehavior for client-side routing */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: t('howItWorks'), href: '/how-it-works' },
              { label: t('features'), href: '/features' },
              { label: t('hospitals'), href: '/hospitals' },
              { label: t('blogs'), href: '/blogs' },
              { label: t('resources'), href: '/resources' }
            ].map((item) => (
              <Link key={item.label} href={item.href} legacyBehavior>
                <a className={`font-medium transition-colors cursor-pointer ${
                  isScrolled ? 'text-gray-700 hover:text-[#f37021]' : 'text-white/90 hover:text-white'
                }`}>
                  {item.label}
                </a>
              </Link>
            ))}
            {/* Language Switcher */}
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className={`px-3 py-1 rounded border ${
                isScrolled ? 'bg-white text-gray-700' : 'bg-transparent text-white'
              }`}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              {/* Add more options as needed */}
            </select>
            {/* Updated "Register Now" button to navigate to /register */}
            <Link href="/register" legacyBehavior>
              <a className="bg-[#f37021] text-white px-6 py-2 rounded-full font-bold hover:shadow-lg transition-shadow cursor-pointer">
                {t('registerNow')}
              </a>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;