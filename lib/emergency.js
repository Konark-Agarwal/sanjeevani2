// lib/emergency.js

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

    // Decode patient QR (masked ID only) - mock decoding
    const patientMaskedId = this.decodeQrCode(patientQrCode);
    
    // Generate time-limited emergency token
    const emergencyToken = {
      token: this.generateSecureToken(),
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

    // Get patient medical snapshot (masked data) - mock data
    const patientData = await this.getPatientMedicalSnapshot(
      emergencyToken.patientMaskedId,
      emergencyToken.doctorId
    );

    return patientData;
  }

  // Helper: Generate secure token
  generateSecureToken() {
    if (window.crypto && window.crypto.getRandomValues) {
      const array = new Uint8Array(32);
      window.crypto.getRandomValues(array);
      return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    } else {
      // Fallback for older browsers
      return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }
  }

  // Mock: Verify doctor credentials
  async verifyDoctorCredentials(doctorId) {
    // In real app, check against database
    return true; // Assume verified
  }

  // Mock: Decode QR code
  decodeQrCode(qrCode) {
    // In real app, decode actual QR
    return qrCode.split('-')[1] || 'PAT001'; // Mock masked ID
  }

  // Mock: Check doctor status
  async checkDoctorStatus(doctorId) {
    // In real app, check database
    return { active: true };
  }

  // Mock: Get patient medical snapshot
  async getPatientMedicalSnapshot(patientMaskedId, doctorId) {
    // Mock patient data - in real app, fetch from API
    const mockData = {
      id: patientMaskedId,
      name: 'John Doe (Masked)',
      age: 32,
      bloodGroup: 'O+',
      allergies: ['Penicillin', 'Peanuts'],
      medications: ['Lisinopril 10mg', 'Metformin 500mg'],
      conditions: ['Hypertension', 'Type 2 Diabetes'],
      lastVisit: '2024-01-15',
      emergencyContacts: ['Jane Doe: +91 9876543210']
    };
    return mockData;
  }

  // Log emergency access
  async logEmergencyAccess(logData) {
    this.emergencyAccessLog.push(logData);
    console.log('Emergency Access Logged:', logData);
    // In real app, send to server
  }
}

export default EmergencyAccessController;