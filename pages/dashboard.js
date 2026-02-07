// pages/dashboard.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { 
  FaUser, FaQrcode, FaHistory, FaBell, FaShieldAlt, 
  FaFileMedical, FaHospital, FaPhone, FaMapMarkerAlt,
  FaDownload, FaPrint, FaShare
} from 'react-icons/fa';
import { getCurrentUser, logoutUser } from '../lib/auth';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [medicalQR, setMedicalQR] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    
    // Generate mock QR code data
    const qrData = {
      name: currentUser.name,
      bloodGroup: 'O+',
      emergencyContact: '+91 9876543210',
      allergies: 'None',
      conditions: 'None',
      patientId: 'PAT' + Date.now().toString().slice(-6)
    };
    setMedicalQR(JSON.stringify(qrData));
  }, [router]);

  const handleLogout = () => {
    logoutUser();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const medicalHistory = [
    { date: '2024-01-15', doctor: 'Dr. Sharma', diagnosis: 'Common Cold', hospital: 'Apollo Delhi' },
    { date: '2023-11-20', doctor: 'Dr. Gupta', diagnosis: 'Minor Injury', hospital: 'Fortis Mumbai' },
  ];

  const emergencyContacts = [
    { name: 'Emergency Services', number: '112', type: 'Government' },
    { name: 'Ambulance', number: '102', type: 'Medical' },
    { name: 'Police', number: '100', type: 'Police' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <FaShieldAlt className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Sanjeevani</h1>
                <p className="text-sm text-gray-600">Medical ID Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative">
                <FaBell className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaUser className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.role}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUser className="w-12 h-12 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <div className="mt-2 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                  <FaShieldAlt className="w-4 h-4" />
                  <span className="text-sm font-medium">Verified Profile</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Patient ID</span>
                  <span className="font-mono font-bold">PAT784532</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Blood Group</span>
                  <span className="font-bold text-red-600">O+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Emergency Contact</span>
                  <span className="font-medium">+91 9876543210</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <FaQrcode className="w-5 h-5 text-blue-600" />
                  <span>View Medical QR</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <FaFileMedical className="w-5 h-5 text-green-600" />
                  <span>Update Medical Info</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <FaDownload className="w-5 h-5 text-purple-600" />
                  <span>Download ID Card</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <FaShare className="w-5 h-5 text-amber-600" />
                  <span>Share with Doctor</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm mb-6">
              <div className="border-b">
                <nav className="flex -mb-px">
                  {['overview', 'medical-history', 'qr-code', 'emergency'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-4 font-medium text-sm border-b-2 ${
                        activeTab === tab
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-lg">Medical QR Code</h3>
                          <FaQrcode className="w-8 h-8 text-blue-600" />
                        </div>
                        <p className="text-gray-600 mb-4">Your emergency medical access code</p>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                          Show QR Code
                        </button>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-lg">Emergency Contacts</h3>
                          <FaPhone className="w-8 h-8 text-green-600" />
                        </div>
                        <p className="text-gray-600 mb-4">Quick access to emergency services</p>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                          View Contacts
                        </button>
                      </div>
                    </div>

                    <div className="bg-white border rounded-xl p-6">
                      <h3 className="font-bold text-lg mb-4">Recent Medical History</h3>
                      <div className="space-y-4">
                        {medicalHistory.slice(0, 2).map((record, index) => (
                          <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">{record.diagnosis}</p>
                              <p className="text-sm text-gray-600">by {record.doctor}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm">{record.date}</p>
                              <p className="text-xs text-gray-500">{record.hospital}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Medical History Tab */}
                {activeTab === 'medical-history' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold">Medical History</h3>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Add New Record
                      </button>
                    </div>
                    {medicalHistory.map((record, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold">{record.diagnosis}</h4>
                            <p className="text-gray-600">Doctor: {record.doctor}</p>
                            <p className="text-gray-600">Hospital: {record.hospital}</p>
                          </div>
                          <span className="text-sm text-gray-500">{record.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* QR Code Tab */}
                {activeTab === 'qr-code' && (
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-2xl inline-block">
                      <div className="w-64 h-64 bg-white rounded-lg flex items-center justify-center mx-auto mb-4 border-4 border-blue-200">
                        {/* Mock QR Code */}
                        <div className="grid grid-cols-10 gap-1">
                          {Array.from({ length: 100 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-5 h-5 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                            ></div>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">Scan this QR code to access medical information</p>
                      <p className="text-sm text-gray-500">Patient ID: PAT784532</p>
                    </div>
                    <div className="flex justify-center gap-4 mt-6">
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <FaDownload />
                        Download QR
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <FaPrint />
                        Print
                      </button>
                    </div>
                  </div>
                )}

                {/* Emergency Tab */}
                {activeTab === 'emergency' && (
                  <div className="space-y-6">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <FaHospital className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">Emergency Alert</h3>
                          <p className="text-red-600">Use in case of medical emergency</p>
                        </div>
                      </div>
                      <button className="w-full bg-red-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-red-700">
                        Send Emergency Alert
                      </button>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg mb-4">Emergency Contacts</h3>
                      <div className="space-y-3">
                        {emergencyContacts.map((contact, index) => (
                          <div key={index} className="bg-white border rounded-lg p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">{contact.name}</h4>
                                <p className="text-gray-600">{contact.type}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xl font-bold">{contact.number}</p>
                                <button className="text-blue-600 hover:underline">Call Now</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Emergency Banner */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xl mb-2">Emergency Medical Access</h3>
                  <p>Show your QR code to any hospital for instant medical history access</p>
                </div>
                <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100">
                  View Emergency Instructions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
