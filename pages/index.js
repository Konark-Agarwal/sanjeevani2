import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Heart, Mail, Phone, MapPin, Shield, FileText, QrCode, Activity,
  Users, Clock, Building2, Star, ChevronLeft, ChevronRight,
  Plus, AlertTriangle, Bell, Globe, Lock, CheckCircle,
  ArrowRight, Play, Download, Award, Zap, Target,
  MessageCircle, ThumbsUp, Truck, Thermometer,
  Pill, Stethoscope, Hospital, Ambulance
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useLanguage } from '../contexts/LanguageContext'; // Import the language hook

// Floating animation for Hero section
const floatingAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const countries = ['USA', 'UK', 'Germany', 'Japan', 'Australia', 'France', 'Canada', 'Singapore'];

// Header Component
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
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#f37021] to-[#ff9e4d] rounded-xl flex items-center justify-center">
              <Shield size={24} className="text-white" />
            </div>
            <span className={`text-2xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Sanjeevani
            </span>
          </div>

          {/* Navigation */}
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
            {/* Register Now Button */}
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

// Hero Component
function Hero() {
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [hospitalCount, setHospitalCount] = useState(0);
  const { t } = useLanguage(); // Use language hook for translations

  useEffect(() => {
    const targetCount = 500;
    const duration = 2000;
    const increment = targetCount / (duration / 50);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetCount) {
        setHospitalCount(targetCount);
        clearInterval(timer);
      } else {
        setHospitalCount(Math.floor(current));
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const currentCountry = countries[currentCountryIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentCountry.length) {
          setDisplayText(currentCountry.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentCountry.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentCountryIndex((prev) => (prev + 1) % countries.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentCountryIndex]);

  const handleGetStarted = () => {
    toast.success('Redirecting to registration...');
    setTimeout(() => {
      window.location.href = '/register';
    }, 1000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#2c5197] via-[#1a3d7c] to-[#2c5197]">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTExIDE4YzMuODY2IDAgNy0zLjEzNCA3LTdzLTMuMTM0LTctNy03LTcgMy4xMzQtNyA3IDMuMTM0IDcgNyA3em00OCAyNWMzLjg2NiAwIDctMy4xMzQgNy03cy0zLjEzNC03LTctNy03IDMuMTM0LTcgNyAzLjEzNCA3IDcgN3ptLTQzLTdjMS42NTcgMCAzLTEuMzQzIDMtM3MtMS4zNDMtMy0zLTMtMyAxLjM0My0zIDMgMS4zNDMgMyAzIDN6bTYzIDMxYzEuNjU3IDAgMy0xLjM0MyAzLTNzLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzIDEuMzQzIDMgMyAzek0zNCA5MGMxLjY1NyAwIDMtMS4zNDMgMy0zcy0xLjM0My0zLTMtMy0zIDEuMzQzLTMgMyAxLjM0MyAzIDMgM3ptNTYtNzZjMS42NTcgMCAzLTEuMzQzIDMtM3MtMS4zNDMtMy0zLTMtMyAxLjM0My0zIDMgMS4zNDMgMyAzIDN6TTEyIDg2YzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNHptMjgtNjVjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0em0yMy0xMWMyLjc2IDAgNS0yLjI0IDUtNXMtMi4yNC01LTUtNS01IDIuMjQtNSA1IDIuMjQgNSA1IDV6bS02IDYwYzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNHptMjkgMjJjMi43NiAwIDUtMi4yNCA1LTVzLTIuMjQtNS01LTUtNSAyLjI0LTUgNSAyLjI0IDUgNSA1ek0zMiA2M2MyLjc2IDAgNS0yLjI0IDUtNXMtMi4yNC01LTUtNS01IDIuMjQtNSA1IDIuMjQgNSA1IDV6bTU3LTEzYzIuNzYgMCA1LTIuMjQgNS01cy0yLjI0LTUtNS01LTUgMi4yNC01IDUgMi4yNCA1IDUgNXptLTktMjFjMS4xMDUgMCAyLS44OTUgMi0ycy0uODk1LTItMi0yLTIgLjg5NS0yIDIgLjg5NSAyIDIgMnptNDMgNDJjMS4xMDUgMCAyLS44OTUgMi0ycy0uODk1LTItMi0yLTIgLjg9NS0yIDIgLjg5NSAyIDIgMnoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-20"></div>

      {/* Floating Icons */}
      <motion.div className="absolute top-20 left-10 text-white/20" animate={floatingAnimation}>
        <Heart size={60} />
      </motion.div>
      <motion.div className="absolute top-40 right-20 text-white/20" animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 0.5 } }}>
        <Shield size={70} />
      </motion.div>
      <motion.div className="absolute bottom-40 left-1/4 text-white/20" animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}>
        <Plus size={80} />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full"
          >
            <span className="w-2 h-2 bg-[#28a745] rounded-full animate-pulse"></span>
            <span className="text-white text-sm font-medium">Trusted by 10,000+ Travelers</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Safe Travels in India
            <br />
            <span className="bg-gradient-to-r from-[#f37021] to-[#ff9e4d] bg-clip-text text-transparent">
              with Instant Medical Support
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto"
          >
            {t('description')} {/* Translated description */}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-white/80 mb-12 h-8 flex items-center justify-center"
          >
            Trusted by travelers from{' '}
            <span className="font-semibold text-[#ff9e4d] ml-2 min-w-[120px] text-left">
              {displayText}
            </span>
            <span className="animate-pulse">|</span>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="group relative bg-[#f37021] text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Your Safe Travel ID
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            <motion.a
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              href="#how-it-works"
              className="group flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors"
            >
              <Play size={20} />
              Watch Demo
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <div className="inline-flex items-center space-x-3 bg-white/15 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/10">
              <Shield className="text-[#28a745]" size={32} />
              <div className="text-left">
                <p className="text-white/70 text-sm">Connected to</p>
                <p className="text-white font-bold text-2xl">
                  {hospitalCount}+ <span className="text-lg">hospitals</span>
                </p>
              </div>
            </div>

            <div className="inline-flex items-center space-x-3 bg-white/15 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/10">
              <Users className="text-[#3a6bc5]" size={32} />
              <div className="text-left">
                <p className="text-white/70 text-sm">Protected</p>
                <p className="text-white font-bold text-2xl">
                  10K+ <span className="text-lg">travelers</span>
                </p>
              </div>
            </div>

            <div className="inline-flex items-center space-x-3 bg-white/15 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/10">
              <Clock className="text-[#ff9e4d]" size={32} />
 <div className="text-left">
                <p className="text-white/70 text-sm">Avg. Response</p>
                <p className="text-white font-bold text-2xl">
                  8 <span className="text-lg">minutes</span>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}

// HowItWorks Component
const steps = [
  {
    icon: FileText,
    title: 'Register in 2 Minutes',
    description: 'Fill your details and medical history in our secure portal',
    color: 'from-blue-500 to-blue-600',
    features: ['Secure data encryption', 'Multi-language support', '24/7 assistance']
  },
  {
    icon: QrCode,
    title: 'Get Your Digital QR',
    description: 'Download your unique medical QR code and ID card',
    color: 'from-teal-500 to-teal-600',
    features: ['Printable format', 'Digital wallet', 'Emergency card']
  },
  {
    icon: Activity,
    title: 'Instant Emergency Access',
    description: 'Doctors scan QR to access your complete medical profile',
    color: 'from-emerald-500 to-emerald-600',
    features: ['Real-time access', 'Family notification', 'Hospital coordination']
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How <span className="text-[#f37021]">Sanjeevani</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to ensure your medical safety while traveling in India
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                {/* Step Number */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#f37021] to-[#ff9e4d] rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6">{step.description}</p>

                {/* Features */}
                <div className="space-y-3">
                  {step.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Icon at bottom */}
                <div className="mt-8 flex justify-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center`}>
                    <step.icon className="text-white" size={40} />
                  </div>
                </div>
              </div>

              {/* Connector line between steps */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-1 bg-gradient-to-r from-blue-300 to-teal-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Statistics Component
const stats = [
  {
    icon: Users,
    value: 10000,
    suffix: '+',
    label: 'Tourists Protected',
    color: 'from-blue-500 to-blue-600',
    description: 'Across 50+ countries'
  },
  {
    icon: Clock,
    value: 8,
    suffix: ' min',
    label: 'Average Response Time',
    color: 'from-teal-500 to-teal-600',
    description: 'From scan to access'
  },
  {
    icon: Shield,
    value: 97,
    suffix: '%',
    label: 'Family Notification Rate',
    color: 'from-emerald-500 to-emerald-600',
    description: 'Automatic alerts'
  },
  {
    icon: Building2,
    value: 500,
    suffix: '+',
    label: 'Partner Hospitals',
    color: 'from-amber-500 to-amber-600',
    description: 'Across India'
  },
];

function AnimatedCounter({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = target / (duration / 50);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

function Statistics() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isVisible ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-4"
          >
            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium">
              📊 TRUST & IMPACT
            </div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Real impact, real safety - numbers that matter
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center border border-white/20 hover:border-white/40 transition-all duration-300 h-full">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isVisible ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: "spring" }}
                  className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="text-white" size={40} />
                </motion.div>

                <motion.div
                  className="text-5xl font-bold text-white mb-2"
                  initial={{ opacity: 0 }}
                  animate={isVisible ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {isVisible ? <AnimatedCounter target={stat.value} suffix={stat.suffix} /> : `0${stat.suffix}`}
                </motion.div>

                <h3 className="text-white text-xl font-bold mb-2">{stat.label}</h3>
                <p className="text-white/70 text-sm">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Features Component
const features = [
  {
    icon: AlertTriangle,
    title: 'Emergency QR Scan',
    description: 'Instant access to complete medical history by scanning QR code',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    delay: 0
  },
  {
    icon: Bell,
    title: 'Family Notification',
    description: 'Automatic alerts to emergency contacts during medical emergencies',
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
    delay: 0.1
  },
  {
    icon: Globe,
    title: 'Multi-language Support',
    description: 'Medical information available in English and 10+ Indian languages',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    delay: 0.2
  },
  {
    icon: Lock,
    title: 'Military-grade Security',
    description: 'End-to-end encryption with HIPAA compliance for data protection',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
    delay: 0.3
  },
  {
    icon: Zap,
    title: 'Real-time Updates',
    description: 'Instant sync of medical records and emergency information',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    delay: 0.4
  },
  {
    icon: Target,
    title: 'Hospital Network',
    description: 'Direct integration with 500+ hospitals across India',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
    delay: 0.5
  },
];

function Features() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isVisible ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-4"
          >
            <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              🔧 POWERFUL FEATURES
            </div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-blue-600">Sanjeevani</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive features designed for medical emergencies and peace of mind
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: feature.delay }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className={`${feature.bgColor} rounded-3xl p-8 h-full transform transition-all duration-300 group-hover:shadow-2xl border border-transparent group-hover:border-gray-200`}>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isVisible ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.4, delay: feature.delay + 0.2, type: "spring" }}
                  className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`${feature.color} w-8 h-8`} />
                </motion.div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>

                <motion.div
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: '100%' } : {}}
                  transition={{ delay: feature.delay + 0.4, duration: 0.8 }}
                  className="h-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Component
const testimonials = [
  {
    name: 'Sarah Johnson',
    country: 'USA',
    flag: '🇺🇸',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'This service saved my life when I had a severe allergic reaction in Mumbai. The doctors immediately knew about my allergies and treated me accordingly.',
    role: 'Tourist'
  },
  {
    name: 'Dr. Rajesh Kumar',
    country: 'India',
    flag: '🇮🇳',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'As an emergency room doctor, Sanjeevani has revolutionized how we handle foreign patients. Instant access to medical history saves precious time.',
    role: 'Emergency Physician'
  },
  {
    name: 'Yuki Tanaka',
    country: 'Japan',
    flag: '🇯🇵',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'Traveling with diabetes was always stressful. With Sanjeevani, I felt safe knowing my medical information was just a QR scan away.',
    role: 'Tourist'
  },
  {
    name: 'Emma Wilson',
    country: 'UK',
    flag: '🇬🇧',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'Every tourist visiting India should use this. The QR code system is brilliant and could be life-saving in emergencies.',
    role: 'Travel Blogger'
  },
];

function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isVisible ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-4"
          >
            <div className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
              ⭐ REAL STORIES
            </div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trusted by Travelers & Doctors
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from those who experienced the power of Sanjeevani firsthand
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          <div className="relative min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 100, rotateY: 10 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -100, rotateY: -10 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
                  {/* Decorative Background */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-teal-50 rounded-full -translate-y-32 translate-x-32"></div>
                  
                  <div className="relative">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="flex-shrink-0"
                      >
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center">
                            <span className="text-4xl">{testimonials[current].flag}</span>
                          </div>
                        </div>
                      </motion.div>

                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                          <div>
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                              className="flex gap-1 mb-2"
                            >
                              {[...Array(testimonials[current].rating)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                              ))}
                            </motion.div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">
                              {testimonials[current].name}
                            </h3>
                            <div className="flex items-center gap-2 text-gray-600">
                              <span className="text-2xl">{testimonials[current].flag}</span>
                              <span>{testimonials[current].country}</span>
                              <span className="mx-2">•</span>
                              <span className="text-blue-600 font-medium">{testimonials[current].role}</span>
                            </div>
                          </div>
                        </div>

                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="text-lg text-gray-700 leading-relaxed italic relative pl-6 border-l-4 border-blue-500"
                        >
                          "{testimonials[current].text}"
                        </motion.p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center items-center gap-6 mt-12">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </motion.button>

            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === current 
                      ? 'w-10 bg-gradient-to-r from-blue-500 to-teal-500' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

// FAQ Component
const faqs = [
  {
    question: 'Is my medical data secure with Sanjeevani?',
    answer: 'Absolutely! We use military-grade encryption (AES-256) and comply with HIPAA, GDPR, and Indian data protection laws. Your data is never shared without your explicit consent, even in emergencies.',
  },
  {
    question: 'What happens if I lose my QR code or phone?',
    answer: 'You can always re-download your QR code from your account dashboard. For emergencies, hospitals can also look you up using your registered phone number or passport ID.',
  },
  {
    question: 'Do all Indian hospitals accept Sanjeevani QR codes?',
    answer: 'We partner with 500+ hospitals across India that are trained to use our system. Most major hospitals in metropolitan areas accept it, and our network is growing daily.',
  },
  {
    question: 'How much does Sanjeevani cost?',
    answer: 'Basic registration is completely free! Premium features like advanced analytics, priority support, and family tracking are available starting at ₹499/month.',
  },
  {
    question: 'Can I update my medical information after registration?',
    answer: 'Yes! You can update your medical profile anytime through our mobile app or website. Changes are synced instantly across our network.',
  },
  {
    question: 'What languages are supported?',
    answer: 'We support English, Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, and 5+ other Indian languages. Doctors can view information in their preferred language.',
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isVisible ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-4"
          >
            <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              ❓ FAQ
            </div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about SafeTravel ID
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full bg-gray-50 hover:bg-gray-100 rounded-2xl p-6 text-left transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-2 rounded-full ${openIndex === index ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}
                  >
                    <ChevronRight size={20} />
                  </motion.div>
                </div>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === index ? 'auto' : 0, opacity: openIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="pt-4 text-gray-600 leading-relaxed border-t border-gray-200 mt-4">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Component
function CTA() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-blue-600 via-teal-500 to-blue-700 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
      
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          delay: 1,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isVisible ? { scale: 1 } : {}}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-block mb-6"
          >
            <div className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full text-lg font-medium">
              🚀 READY TO GET STARTED?
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Your Safety Journey Begins Here
          </h2>

          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of smart travelers who travel with confidence. 
            Get your medical safety net in just 2 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/register'}
              className="group relative bg-white text-blue-600 px-10 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Get Your Free Travel ID
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </motion.button>

            <motion.a
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              href="/lookup"
              className="group flex items-center justify-center gap-3 px-8 py-5 border-2 border-white text-white rounded-full text-lg font-bold hover:bg-white/10 transition-all duration-300"
            >
              <Download />
              Download Emergency Guide
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
            className="inline-flex flex-wrap justify-center gap-6 text-white/80"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-300" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-300" />
              <span>2-minute setup</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-300" />
              <span>24/7 emergency support</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center">
                <Shield size={28} />
              </div>
              <div>
                <span className="text-2xl font-bold">Sanjeevani</span>
                <p className="text-sm text-gray-400">Medical Safety ID</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Empowering travelers with instant medical access across India. 
              Your health safety net for worry-free travel experiences.
            </p>
            <div className="flex gap-4 mt-6">
              {['Twitter', 'Facebook', 'LinkedIn', 'Instagram'].map((social) => (
                <motion.a
                  key={social}
                  whileHover={{ y: -3 }}
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                >
                  {social.charAt(0)}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['How It Works', 'Features', 'Pricing', 'Hospital Network', 'For Doctors'].map((link) => (
                <li key={link}>
                  <motion.a
                    whileHover={{ x: 5 }}
                    href={`/${link.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Legal</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Data Protection', 'Cookie Policy', 'HIPAA Compliance'].map((link) => (
                <li key={link}>
                  <motion.a
                    whileHover={{ x: 5 }}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="text-blue-400 flex-shrink-0 mt-1" size={18} />
                <a href="mailto:support@sanjeevani.com" className="text-gray-400 hover:text-white transition-colors">
                  support@sanjeevani.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-blue-400 flex-shrink-0 mt-1" size={18} />
                <div className="text-gray-400">
                  <p>+91 1800-SAFE-ID</p>
                  <p className="text-sm text-gray-500">(24/7 Emergency Hotline)</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-blue-400 flex-shrink-0 mt-1" size={18} />
                <div className="text-gray-400">
                  <p>Mumbai, Maharashtra</p>
                  <p className="text-sm text-gray-500">India</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 Sanjeevani Medical Safety ID. All rights reserved.
            </p>

            <motion.p
              className="flex items-center gap-2 text-gray-400 text-sm"
              whileHover={{ scale: 1.05 }}
            >
              Made with <Heart className="text-rose-500" size={14} fill="currentColor" /> 
              <span className="ml-1">for safer travels</span>
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <HowItWorks />
      <Statistics />
      <Features />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}