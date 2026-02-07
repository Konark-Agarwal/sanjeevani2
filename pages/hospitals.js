import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Clock, Search } from 'lucide-react';

// Import shared components (corrected paths)
import Header from '../components/header';
import Footer from '../components/footer';

// Hospitals Component (expanded from your HospitalPartners component)
const hospitals = [
  { name: 'Apollo Hospitals', location: 'Mumbai, Maharashtra', phone: '+91-22-1234-5678', logo: '🏥', specialties: 'Cardiology, Neurology' },
  { name: 'Fortis Healthcare', location: 'Delhi, NCR', phone: '+91-11-9876-5432', logo: '🏨', specialties: 'Oncology, Orthopedics' },
  { name: 'Max Healthcare', location: 'New Delhi', phone: '+91-11-4567-8901', logo: '⚕️', specialties: 'Emergency Care, Pediatrics' },
  { name: 'AIIMS', location: 'New Delhi', phone: '+91-11-2658-8500', logo: '🏛️', specialties: 'Research, General Medicine' },
  { name: 'Artemis Hospitals', location: 'Gurgaon, Haryana', phone: '+91-124-6767-000', logo: '🩺', specialties: 'Cardiology, Transplant' },
  { name: 'Manipal Hospitals', location: 'Bangalore, Karnataka', phone: '+91-80-2502-4444', logo: '💊', specialties: 'Nephrology, Gastroenterology' },
  { name: 'Kokilaben Dhirubhai Ambani Hospital', location: 'Mumbai, Maharashtra', phone: '+91-22-3099-9999', logo: '🏥', specialties: 'Cancer Care, Robotic Surgery' },
  { name: 'Medanta - The Medicity', location: 'Gurgaon, Haryana', phone: '+91-124-414-1414', logo: '🏨', specialties: 'Heart Institute, Liver Transplant' },
  { name: 'BLK-Max Super Speciality Hospital', location: 'New Delhi', phone: '+91-11-3040-3040', logo: '⚕️', specialties: 'Bone Marrow Transplant, IVF' },
  { name: 'Narayana Health', location: 'Bangalore, Karnataka', phone: '+91-80-7122-2222', logo: '🏛️', specialties: 'Cardiac Surgery, Pediatrics' },
];

function Hospitals() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              🏥 PARTNER HOSPITALS
            </div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-[#f37021]">Hospital Network</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Trusted healthcare partners across India ready to provide instant access to your medical data
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search hospitals by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#f37021] focus:border-transparent"
            />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHospitals.map((hospital, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-50 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#f37021]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{hospital.logo}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{hospital.name}</h3>
                  <p className="text-gray-600 text-sm">{hospital.specialties}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin size={16} />
                  <span className="text-sm">{hospital.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone size={16} />
                  <span className="text-sm">{hospital.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock size={16} />
                  <span className="text-sm">24/7 Emergency Services</span>
                </div>
              </div>

              <button className="w-full bg-[#f37021] text-white py-2 rounded-full font-bold hover:bg-[#e65c00] transition-colors">
                View Details
              </button>
            </motion.div>
          ))}
        </div>

        {filteredHospitals.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 mt-12"
          >
            No hospitals found matching your search.
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Main Page Component
export default function HospitalsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <Hospitals />
      <Footer />
    </div>
  );
}