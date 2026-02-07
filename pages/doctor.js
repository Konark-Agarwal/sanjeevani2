// 1. Emergency Access Controller
class EmergencyAccessController {
  constructor() {
    this.emergencyAccessLog = [];
    this.emergencyTimeout = 15 * 60 * 1000; // 15 minutes emergency window
  }

  // Generate emergency access token for doctor
  async generateEmergencyAccess(doctorId, patientQrCode) {
    // Verify doctor credentials (mock)
    const doctorVerified = await this.verifyDoctorCredentials(doctorId);
    if (!doctorVerified) {
      throw new Error('Doctor not authorized for emergency access');
    }

    // Decode patient QR (masked ID only) - mock
    const patientMaskedId = this.decodeQrCode(patientQrCode);
    
    // Generate time-limited emergency token
    const emergencyToken = {
      token: crypto.randomBytes(32).toString('hex'), // Use crypto-js in browser if needed
      doctorId: doctorId,
      patientMaskedId: patientMaskedId,
      timestamp: Date.now(),
      expiresAt: Date.now() + this.emergencyTimeout,
      accessType: 'read-only',
      emergencyLevel: 'critical'
    };

    // Log emergency access attempt
    await this.logEmergencyAccess({
      ...emergencyToken,
      ipAddress: '192.168.1.1', // Mock IP
      location: 'Apollo Hospital, Delhi' // Mock location
    });

    return emergencyToken;
  }

  // Verify emergency token and get patient data
  async verifyAndAccessPatientData(emergencyToken) {
    // Check token expiry
    if (Date.now() > emergencyToken.expiresAt) {
      throw new Error('Emergency access token expired');
    }

    // Verify doctor is still authorized (mock)
    const doctorStatus = await this.checkDoctorStatus(emergencyToken.doctorId);
    if (!doctorStatus.active) {
      throw new Error('Doctor authorization revoked');
    }

    // Get patient medical snapshot (masked data) - mock
    const patientData = await this.getPatientMedicalSnapshot(
      emergencyToken.patientMaskedId,
      emergencyToken.doctorId
    );

    return patientData;
  }

  // Mock methods for simulation
  async verifyDoctorCredentials(doctorId) {
    // In real app, check against database
    return true; // Mock: Always verified
  }

  decodeQrCode(qrCode) {
    // Mock: Extract patient ID from QR
    return qrCode.split('-')[1] || 'PAT100'; // e.g., 'QR-PAT100' -> 'PAT100'
  }

  async checkDoctorStatus(doctorId) {
    // Mock: Always active
    return { active: true };
  }

  async getPatientMedicalSnapshot(patientMaskedId, doctorId) {
    // Mock patient data
    const mockPatients = {
      'PAT100': { name: 'John Doe', age: 32, bloodGroup: 'O+', condition: 'Hypertension', allergies: 'None', medications: 'Lisinopril' },
      'PAT200': { name: 'Sarah Smith', age: 45, bloodGroup: 'A-', condition: 'Diabetes', allergies: 'Penicillin', medications: 'Metformin' },
    };
    return mockPatients[patientMaskedId] || { error: 'Patient not found' };
  }

  async logEmergencyAccess(logData) {
    // Store in localStorage for mock persistence
    const logs = JSON.parse(localStorage.getItem('emergencyLogs') || '[]');
    logs.push(logData);
    localStorage.setItem('emergencyLogs', JSON.stringify(logs));
    this.emergencyAccessLog = logs;
  }

  getEmergencyLogs() {
    return JSON.parse(localStorage.getItem('emergencyLogs') || '[]');
  }
}

// pages/doctor.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { 
  FaUserMd, FaSearch, FaQrcode, FaFileMedical, FaBell, 
  FaCalendar, FaChartLine, FaUsers, FaCog, FaSignOutAlt,
  FaStethoscope, FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaDownload, FaShare, FaEdit, FaEye
} from 'react-icons/fa';
import { getCurrentUser, logoutUser } from '../lib/auth';
import toast from 'react-hot-toast';

export default function Doctor() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [emergencyController] = useState(new EmergencyAccessController());
  const [emergencyLogs, setEmergencyLogs] = useState([]);
  const [currentToken, setCurrentToken] = useState(null);
  const [emergencySearchTerm, setEmergencySearchTerm] = useState('');
  const [emergencySearchResults, setEmergencySearchResults] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null); // For modals
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [updateData, setUpdateData] = useState({ condition: '', medications: '' });
  const [shareData, setShareData] = useState({ recipientEmail: '', message: '' });
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'doctor') {
      router.push('/login');
      return;
    }
    setUser(currentUser);

    // Mock patient data
    const mockPatients = [
      { id: 1, name: 'John Doe', age: 32, bloodGroup: 'O+', lastVisit: '2024-01-15', condition: 'Hypertension', medications: 'Lisinopril', emergency: false, qrCode: 'QR-PAT100' },
      { id: 2, name: 'Sarah Smith', age: 45, bloodGroup: 'A-', lastVisit: '2024-01-10', condition: 'Diabetes', medications: 'Metformin', emergency: true, qrCode: 'QR-PAT200' },
      { id: 3, name: 'Michael Chen', age: 28, bloodGroup: 'B+', lastVisit: '2024-01-05', condition: 'Asthma', medications: 'Albuterol', emergency: false, qrCode: 'QR-PAT300' },
      { id: 4, name: 'Emma Wilson', age: 65, bloodGroup: 'AB+', lastVisit: '2023-12-20', condition: 'Cardiac', medications: 'Aspirin', emergency: true, qrCode: 'QR-PAT400' },
      { id: 5, name: 'Robert Brown', age: 52, bloodGroup: 'O-', lastVisit: '2023-12-15', condition: 'Arthritis', medications: 'Ibuprofen', emergency: false, qrCode: 'QR-PAT500' },
    ];
    setPatients(mockPatients);
    setFilteredPatients(mockPatients);

    // Load emergency logs
    setEmergencyLogs(emergencyController.getEmergencyLogs());
  }, [router, emergencyController]);

  // Filter patients based on search term
  useEffect(() => {
    const filtered = patients.filter(patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `PAT${patient.id}00`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [searchTerm, patients]);

  const handleLogout = () => {
    logoutUser();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  const handleScanQR = async () => {
    const mockQrCode = 'QR-PAT100';
    try {
      const token = await emergencyController.generateEmergencyAccess(user.id, mockQrCode);
      setCurrentToken(token);
      toast.success('Emergency access token generated! Access patient data.');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEmergencyAccess = async (patientId) => {
    if (!currentToken) {
      toast.error('No active emergency token. Scan QR first.');
      return;
    }
    try {
      const patientData = await emergencyController.verifyAndAccessPatientData(currentToken);
      toast.success(`Emergency access granted: ${patientData.name} - ${patientData.condition}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleNewPatient = () => {
    const newPatient = {
      id: patients.length + 1,
      name: 'New Patient',
      age: 30,
      bloodGroup: 'O+',
      lastVisit: new Date().toISOString().split('T')[0],
      condition: 'General Checkup',
      medications: 'None',
      emergency: false,
      qrCode: `QR-PAT${patients.length + 1}00`
    };
    setPatients([...patients, newPatient]);
    toast.success('New patient added successfully!');
  };

  const handleAddMedicalRecord = () => {
    toast.success('Medical record added for patient!');
  };

  const handleQuickEmergencyAccess = () => {
    setActiveTab('emergency');
    handleScanQR();
  };

  const handleViewHistory = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    toast.success(`Viewing history for ${patient.name}: Last visit ${patient.lastVisit}, Condition: ${patient.condition}`);
  };

  const handleSearchPatient = () => {
    const results = patients.filter(patient =>
      patient.name.toLowerCase().includes(emergencySearchTerm.toLowerCase()) ||
      `PAT${patient.id}00`.toLowerCase().includes(emergencySearchTerm.toLowerCase())
    );
    setEmergencySearchResults(results);
    if (results.length > 0) {
      toast.success(`Found ${results.length} patient(s)`);
    } else {
      toast.error('No patients found');
    }
  };

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
  };

  const handleEmergencyHotline = () => {
    toast.success('Calling Emergency Hotline: +91 1800-SAFE-ID');
  };

  // New Feature Handlers
  const handleViewMedicalQR = (patient) => {
    setSelectedPatient(patient);
    setShowQRModal(true);
  };

  const handleUpdateMedicalInfo = (patient) => {
    setSelectedPatient(patient);
    setUpdateData({ condition: patient.condition, medications: patient.medications });
    setShowUpdateModal(true);
  };

  const handleDownloadIDCard = (patient) => {
    toast.success(`Downloading ID Card for ${patient.name}...`);
    // Mock download: In real app, generate and download PDF
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual PDF URL
    link.download = `${patient.name}_ID_Card.pdf`;
    link.click();
  };

  const handleShareWithDoctor = (patient) => {
    setSelectedPatient(patient);
    setShareData({ recipientEmail: '', message: `Sharing medical info for ${patient.name}` });
    setShowShareModal(true);
  };

  const submitUpdateMedicalInfo = () => {
    setPatients(patients.map(p => 
      p.id === selectedPatient.id ? { ...p, condition: updateData.condition, medications: updateData.medications } : p
    ));
    setShowUpdateModal(false);
    toast.success('Medical info updated successfully!');
  };

  const submitShareWithDoctor = () => {
    toast.success(`Shared ${selectedPatient.name}'s info with ${shareData.recipientEmail}`);
    setShowShareModal(false);
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

  const stats = [
    { label: 'Total Patients', value: '1,234', icon: FaUsers, color: 'blue' },
    { label: 'Today\'s Appointments', value: '18', icon: FaCalendar, color: 'green' },
    { label: 'Emergency Cases', value: '3', icon: FaBell, color: 'red' },
    { label: 'Avg. Response Time', value: '8 min', icon: FaChartLine, color: 'purple' },
  ];

  const recentScans = [
    { id: 1, patient: 'John Doe', time: '10:30 AM', access: 'Full', location: 'Emergency Room' },
    { id: 2, patient: 'Sarah Smith', time: '09:15 AM', access: 'Emergency', location: 'ICU' },
    { id: 3, patient: 'Michael Chen', time: 'Yesterday', access: 'Limited', location: 'OPD' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <FaStethoscope className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Sanjeevani Doctor Portal</h1>
                <p className="text-sm text-gray-600">Emergency Medical Access System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative">
                <FaBell className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaUserMd className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-600">Cardiologist</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUserMd className="w-12 h-12 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-600">Senior Cardiologist</p>
                <div className="mt-2 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                  <FaStethoscope className="w-4 h-4" />
                  <span className="text-sm font-medium">Verified Doctor</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                  <FaPhone className="w-5 h-5 text-gray-400" />
                  <span>+91 9876543210</span>
                </div>
                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                  <FaEnvelope className="w-5 h-5 text-gray-400" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                  <FaMapMarkerAlt className="w-5 h-5 text-gray-400" />
                  <span>Apollo Hospital, Delhi</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <nav className="space-y-1">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: FaChartLine },
                  { id: 'patients', label: 'Patients', icon: FaUsers },
                  { id: 'scanner', label: 'QR Scanner', icon: FaQrcode },
                  { id: 'emergency', label: 'Emergency Access', icon: FaBell },
                  { id: 'history', label: 'Patient History', icon: FaFileMedical },
                  { id: 'settings', label: 'Settings', icon: FaCog },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg ${
                      activeTab === item.id ? 'bg-gray-50' : ''
                    }`}
                  >
                    <item.icon className="w-5 h-5 text-gray-400" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>  

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${
                    stat.color === 'blue' ? 'border-blue-500' :
                    stat.color === 'green' ? 'border-green-500' :
                    stat.color === 'red' ? 'border-red-500' : 'border-purple-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${
                      stat.color === 'blue' ? 'text-blue-500' :
                      stat.color === 'green' ? 'text-green-500' :
                      stat.color === 'red' ? 'text-red-500' : 'text-purple-500'
                    }`} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search patients by name, ID, or condition..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={handleScanQR}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <FaQrcode />
                  Scan QR Code
                </button>
                <button
                  onClick={handleNewPatient}
                  className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <FaFileMedical />
                  New Patient
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b">
                <div className="px-6 py-4">
                  <h2 className="text-xl font-bold">
                    {activeTab === 'dashboard' && 'Recent Activity'}
                    {activeTab === 'patients' && 'Patient List'}
                    {activeTab === 'scanner' && 'QR Code Scanner'}
                    {activeTab === 'emergency' && 'Emergency Access'}
                    {activeTab === 'history' && 'Patient History'}
                    {activeTab === 'settings' && 'Settings'}
                  </h2>
                </div>
              </div>

              <div className="p-6">
                {/* Dashboard Content */}
                {activeTab === 'dashboard' && (
                  <div className="space-y-8">
                    {/* Recent Scans */}
                    <div>
                      <h3 className="text-lg font-bold mb-4">Recent QR Scans</h3>
                      <div className="space-y-3">
                        {recentScans.map((scan) => (
                          <div key={scan.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                            <div>
                              <p className="font-medium">{scan.patient}</p>
                              <p className="text-sm text-gray-600">{scan.location}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">{scan.time}</p>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                scan.access === 'Full' ? 'bg-green-100 text-green-800' :
                                scan.access === 'Emergency' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {scan.access} Access
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div>
                      <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <button
                          onClick={handleScanQR}
                          className="p-6 border-2 border-dashed border-blue-300 rounded-xl text-center hover:bg-blue-50 transition-colors"
                        >
                          <FaQrcode className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                          <p className="font-medium">Scan Patient QR</p>
                          <p className="text-sm text-gray-600 mt-1">Access medical history</p>
                        </button>
                        
                        <button
                          onClick={handleAddMedicalRecord}
                          className="p-6 border-2 border-dashed border-green-300 rounded-xl text-center hover:bg-green-50 transition-colors"
                        >
                          <FaFileMedical className="w-8 h-8 text-green-600 mx-auto mb-3" />
                          <p className="font-medium">Add Medical Record</p>
                          <p className="text-sm text-gray-600 mt-1">Update patient history</p>
                        </button>
                        
                        <button
                          onClick={handleQuickEmergencyAccess}
                          className="p-6 border-2 border-dashed border-red-300 rounded-xl text-center hover:bg-red-50 transition-colors"
                        >
                          <FaBell className="w-8 h-8 text-red-600 mx-auto mb-3" />
                          <p className="font-medium">Emergency Access</p>
                          <p className="text-sm text-gray-600 mt-1">Critical care override</p>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Patients Content */}
                {activeTab === 'patients' && (
                  <div className="space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">Patient</th>
                            <th className="text-left py-3 px-4">Age</th>
                            <th className="text-left py-3 px-4">Blood Group</th>
                            <th className="text-left py-3 px-4">Condition</th>
                            <th className="text-left py-3 px-4">Last Visit</th>
                            <th className="text-left py-3 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredPatients.map((patient) => (
                            <tr key={patient.id} className="border-b hover:bg-gray-50">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                    <FaUserMd className="w-5 h-5 text-gray-400" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{patient.name}</p>
                                    <p className="text-sm text-gray-600">ID: PAT{patient.id}00</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4">{patient.age}</td>
                              <td className="py-3 px-4">
                                <span className="font-bold text-red-600">{patient.bloodGroup}</span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                  {patient.condition}
                                </span>
                              </td>
                              <td className="py-3 px-4">{patient.lastVisit}</td>
                              <td className="py-3 px-4">
                                <div className="flex flex-wrap gap-2">
                                  <button
                                    onClick={() => handleViewMedicalQR(patient)}
                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 flex items-center gap-1"
                                  >
                                    <FaEye /> View QR
                                  </button>
                                  <button
                                    onClick={() => handleUpdateMedicalInfo(patient)}
                                    className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 flex items-center gap-1"
                                  >
                                    <FaEdit /> Update Info
                                  </button>
                                  <button
                                    onClick={() => handleDownloadIDCard(patient)}
                                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200 flex items-center gap-1"
                                  >
                                    <FaDownload /> Download ID
                                  </button>
                                  <button
                                    onClick={() => handleShareWithDoctor(patient)}
                                    className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 flex items-center gap-1"
                                  >
                                    <FaShare /> Share
                                  </button>
                                  <button
                                    onClick={() => handleEmergencyAccess(patient.id)}
                                    className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200"
                                  >
                                    Emergency Access
                                  </button>
                                  <button
                                    onClick={() => handleViewHistory(patient.id)}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                                  >
                                    View History
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* QR Scanner Content */}
                {activeTab === 'scanner' && (
                  <div className="text-center py-12">
                    <div className="max-w-md mx-auto">
                      <div className="relative mb-8">
                        <div className="w-64 h-64 mx-auto border-4 border-blue-300 rounded-lg relative">
                          {/* Mock QR Scanner */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <FaQrcode className="w-32 h-32 text-blue-200" />
                          </div>
                          {/* Scanning Animation */}
                          <motion.div
                            className="absolute left-0 right-0 h-1 bg-blue-500"
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                          />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-4">QR Code Scanner</h3>
                      <p className="text-gray-600 mb-8">
                        Point your camera at a patient's Sanjeevani QR code to instantly access their medical history
                      </p>
                      <button
                        onClick={handleScanQR}
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                      >
                        Start Scanning
                      </button>
                      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                          <strong>Note:</strong> Scanning a QR code grants you temporary access to the patient's 
                          medical history for emergency treatment purposes.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Emergency Access Content */}
                {activeTab === 'emergency' && (
                  <div className="space-y-6">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <FaBell className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-red-900">Emergency Medical Access</h3>
                          <p className="text-red-700">Critical care override for life-threatening situations</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-6">
                        Use this feature only in emergency situations when you cannot scan a patient's QR code. 
                        You will be able to search for patients and access their full medical history.
                      </p>
                      <div className="flex gap-4">
                        <input
                          type="text"
                          value={emergencySearchTerm}
                          onChange={(e) => setEmergencySearchTerm(e.target.value)}
                          placeholder="Enter patient name, ID, or phone number..."
                          className="flex-grow px-4 py-3 border border-gray-300 rounded-lg"
                        />
                        <button
                          onClick={handleSearchPatient}
                          className="px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700"
                        >
                          Search Patient
                        </button>
                      </div>
                      {emergencySearchResults.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-bold mb-2">Search Results:</h4>
                          <div className="space-y-2">
                            {emergencySearchResults.map((patient) => (
                              <div key={patient.id} className="p-3 border rounded-lg bg-white">
                                <p className="font-medium">{patient.name} - ID: PAT{patient.id}00</p>
                                <p className="text-sm text-gray-600">Condition: {patient.condition}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Generate Emergency Token */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-blue-900 mb-4">Generate Emergency Token</h3>
                      <p className="text-blue-700 mb-4">
                        Manually generate an emergency access token for a patient QR code.
                      </p>
                      <div className="flex gap-4">
                        <input
                          type="text"
                          placeholder="Enter patient QR code (e.g., QR-PAT100)"
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="flex-grow px-4 py-3 border border-gray-300 rounded-lg"
                        />
                        <button
                          onClick={() => handleGenerateEmergencyToken(searchTerm)}
                          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
                        >
                          Generate Token
                        </button>
                      </div>
                      {currentToken && (
                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-green-800 font-medium">Token Generated!</p>
                          <p className="text-sm text-green-600">Expires: {new Date(currentToken.expiresAt).toLocaleString()}</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">Recent Emergency Accesses</h3>
                      <div className="space-y-3">
                        {emergencyLogs.slice(-5).map((log, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                            <div>
                              <p className="font-bold">Patient ID: {log.patientMaskedId}</p>
                              <p className="text-sm text-gray-600">Doctor: {log.doctorId} | Location: {log.location}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">{new Date(log.timestamp).toLocaleString()}</p>
                              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                                Emergency Access
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Settings Content */}
                {activeTab === 'settings' && (
                  <div className="max-w-2xl space-y-6">
                    <div>
                      <h3 className="text-lg font-bold mb-4">Account Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Doctor Name
                          </label>
                          <input
                            type="text"
                            defaultValue={user.name}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                                                <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Hospital Affiliation
                          </label>
                          <input
                            type="text"
                            defaultValue="Apollo Hospital, Delhi"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Medical License Number
                          </label>
                          <input
                            type="text"
                            defaultValue="MCI-784532"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-4">Access Preferences</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span className="ml-2">Allow emergency access notifications</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span className="ml-2">Auto-log after 30 minutes of inactivity</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded" />
                          <span className="ml-2">Require PIN for emergency access</span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-6 border-t">
                      <button
                        onClick={handleSaveSettings}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Emergency Banner */}
            <div className="mt-8 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xl mb-2">24/7 Emergency Support</h3>
                  <p>For critical situations requiring immediate medical history access</p>
                </div>
                <button
                  onClick={handleEmergencyHotline}
                  className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100"
                >
                  Emergency Hotline: +91 1800-SAFE-ID
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {/* QR Modal */}
      {showQRModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Medical QR Code for {selectedPatient.name}</h3>
            <div className="text-center mb-4">
              <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                <FaQrcode className="w-24 h-24 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mt-2">QR Code: {selectedPatient.qrCode}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowQRModal(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Close
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedPatient.qrCode);
                  toast.success('QR Code copied to clipboard!');
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Copy QR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Medical Info Modal */}
      {showUpdateModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Update Medical Info for {selectedPatient.name}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                <input
                  type="text"
                  value={updateData.condition}
                  onChange={(e) => setUpdateData({ ...updateData, condition: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Hypertension"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medications</label>
                <input
                  type="text"
                  value={updateData.medications}
                  onChange={(e) => setUpdateData({ ...updateData, medications: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Lisinopril"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={submitUpdateMedicalInfo}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share with Doctor Modal */}
      {showShareModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Share {selectedPatient.name}'s Info</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Email</label>
                <input
                  type="email"
                  value={shareData.recipientEmail}
                  onChange={(e) => setShareData({ ...shareData, recipientEmail: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="doctor@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={shareData.message}
                  onChange={(e) => setShareData({ ...shareData, message: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows="3"
                  placeholder="Optional message..."
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowShareModal(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={submitShareWithDoctor}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}