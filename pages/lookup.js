// pages/lookup.js
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSearch, FaPills, FaHospital, FaMapMarkerAlt, 
  FaPhone, FaStar, FaFilter, FaDownload
} from 'react-icons/fa';

export default function Lookup() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const mockMedicines = [
    { id: 1, name: 'Paracetamol', generic: 'Acetaminophen', type: 'Painkiller', description: 'For fever and mild pain', availability: 'High', price: '₹20-50' },
    { id: 2, name: 'Ibuprofen', generic: 'Ibuprofen', type: 'NSAID', description: 'For inflammation and pain', availability: 'High', price: '₹30-80' },
    { id: 3, name: 'Amoxicillin', generic: 'Amoxicillin', type: 'Antibiotic', description: 'For bacterial infections', availability: 'Medium', price: '₹100-200' },
    { id: 4, name: 'Cetirizine', generic: 'Cetirizine', type: 'Antihistamine', description: 'For allergies', availability: 'High', price: '₹40-80' },
    { id: 5, name: 'Omeprazole', generic: 'Omeprazole', type: 'PPI', description: 'For acidity and GERD', availability: 'Medium', price: '₹80-150' },
    { id: 6, name: 'Metformin', generic: 'Metformin', type: 'Antidiabetic', description: 'For type 2 diabetes', availability: 'High', price: '₹50-120' },
  ];

  const mockHospitals = [
    { id: 1, name: 'Apollo Hospital', location: 'Delhi', phone: '+91 11 12345678', rating: 4.5, emergency: true },
    { id: 2, name: 'Fortis Hospital', location: 'Mumbai', phone: '+91 22 87654321', rating: 4.3, emergency: true },
    { id: 3, name: 'Manipal Hospital', location: 'Bangalore', phone: '+91 80 23456789', rating: 4.7, emergency: true },
    { id: 4, name: 'AIIMS Delhi', location: 'Delhi', phone: '+91 11 34567890', rating: 4.8, emergency: true },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const filtered = selectedFilter === 'medicines' 
        ? mockMedicines.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : selectedFilter === 'hospitals'
        ? mockHospitals.filter(h => h.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : [...mockMedicines, ...mockHospitals].filter(item => 
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
      setResults(filtered);
      setLoading(false);
    }, 500);
  }, [searchTerm, selectedFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Medical Lookup</h1>
          <p className="text-xl text-gray-600">Find medicines, hospitals, and emergency services in India</p>
        </motion.div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="relative mb-6">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${selectedFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedFilter('medicines')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${selectedFilter === 'medicines' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <FaPills className="inline mr-2" />
                Medicines
              </button>
              <button
                onClick={() => setSelectedFilter('hospitals')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${selectedFilter === 'hospitals' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <FaHospital className="inline mr-2" />
                Hospitals
              </button>
            </div>

            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search for ${selectedFilter === 'medicines' ? 'medicines' : selectedFilter === 'hospitals' ? 'hospitals' : 'medicines or hospitals'}...`}
                className="w-full pl-14 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Results */}
          <div className="mt-8">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Searching...</p>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-12">
                <FaSearch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try a different search term</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {results.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    {'generic' in item ? (
                      // Medicine Card
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FaPills className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                          <p className="text-gray-600">{item.generic} • {item.type}</p>
                          <p className="text-gray-700 mt-2">{item.description}</p>
                          <div className="flex justify-between items-center mt-4">
                            <div>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.availability === 'High' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {item.availability} Availability
                              </span>
                              <span className="ml-4 font-bold text-gray-900">{item.price}</span>
                            </div>
                            <button className="text-blue-600 hover:text-blue-800 font-medium">
                              Find Pharmacies →
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Hospital Card
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FaHospital className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600">{item.location}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaStar className="w-4 h-4 text-amber-400" />
                              <span className="font-bold">{item.rating}</span>
                            </div>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FaPhone className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700">{item.phone}</span>
                            </div>
                            <div className="flex gap-2">
                              {item.emergency && (
                                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                                  Emergency
                                </span>
                              )}
                              <button className="text-blue-600 hover:text-blue-800 font-medium">
                                Directions →
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Emergency Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaPhone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-xl">Emergency</h3>
                <p className="text-red-100">112 / 102</p>
              </div>
            </div>
            <p className="text-red-100 mb-4">National emergency numbers</p>
            <button className="w-full bg-white text-red-600 py-3 rounded-lg font-bold hover:bg-gray-100">
              Call Now
            </button>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaHospital className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-xl">Nearby Hospitals</h3>
                <p className="text-blue-100">Find closest care</p>
              </div>
            </div>
            <p className="text-blue-100 mb-4">Locate emergency hospitals</p>
            <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-bold hover:bg-gray-100">
              Search Hospitals
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaDownload className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-xl">Download Guide</h3>
                <p className="text-green-100">Medical resources</p>
              </div>
            </div>
            <p className="text-green-100 mb-4">Emergency medical guide</p>
            <button className="w-full bg-white text-green-600 py-3 rounded-lg font-bold hover:bg-gray-100">
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}