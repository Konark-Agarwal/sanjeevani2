import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { 
  AlertTriangle, Bell, Globe, Lock, Zap, Target, CheckCircle
} from 'lucide-react';

// Import shared components (corrected paths)
import Header from '../components/header';
import Footer from '../components/footer';

// Features Component (copied from your index.js)
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

// Main Page Component
export default function FeaturesPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <Features />
      <Footer />
    </div>
  );
}