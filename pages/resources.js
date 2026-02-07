import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Download, FileText, Video, BookOpen } from 'lucide-react';

// Import shared components (corrected paths)
import Header from '../components/header';
import Footer from '../components/footer';

// Resources Component (new)
const resources = [
  { title: 'Emergency Guide PDF', description: 'Download our comprehensive emergency guide', icon: Download, type: 'PDF' },
  { title: 'Video Tutorials', description: 'Step-by-step video guides for registration', icon: Video, type: 'Video' },
  { title: 'FAQ Document', description: 'Frequently asked questions and answers', icon: FileText, type: 'PDF' },
  { title: 'Travel Health Tips', description: 'Essential health tips for travelers to India', icon: BookOpen, type: 'Article' },
];

function Resources() {
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
    <section ref={sectionRef} className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-[#f37021]">Resources</span> & Downloads
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Helpful guides, tutorials, and documents to make your travel safer
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all"
            >
              <resource.icon className="text-[#f37021] w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.title}</h3>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <span className="text-sm text-[#f37021] font-medium">{resource.type}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default function ResourcesPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <Resources />
      <Footer />
    </div>
  );
}