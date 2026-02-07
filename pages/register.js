import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaIdCard, FaHospital } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { registerUser } from '../lib/auth';  // Ensure this file exists (see below)

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'patient',
    emergencyContact: '',
    bloodGroup: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role,
        emergencyContact: formData.emergencyContact,
        bloodGroup: formData.bloodGroup,
      };

      const result = await registerUser(userData);
      
      if (result.success) {
        toast.success('Registration successful!');
        
        setTimeout(() => {
          if (result.user.role === 'doctor') {
            router.push('/doctor');
          } else {
            router.push('/dashboard');
          }
        }, 1000);
      } else {
        toast.error(result.error || 'Registration failed');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Create Your Sanjeevani Account</h1>
          <p className="text-gray-600">Secure medical profile for emergency situations</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Progress Steps */}
            <div className="md:w-1/4 bg-blue-600 p-8 text-white">
              <div className="space-y-8">
                <div>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                    <span className="font-bold">1</span>
                  </div>
                  <h3 className="font-bold">Personal Details</h3>
                  <p className="text-blue-100 text-sm">Basic information</p>
                </div>
                
                <div>
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-3">
                    <span className="font-bold">2</span>
                  </div>
                  <h3 className="font-bold">Medical Profile</h3>
                  <p className="text-blue-100 text-sm">Health information</p>
                </div>
                
                <div>
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-3">
                    <span className="font-bold">3</span>
                  </div>
                  <h3 className="font-bold">Security</h3>
                  <p className="text-blue-100 text-sm">Login credentials</p>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div className="md:w-3/4 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Blood Group
                    </label>
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>

                  {/* Role Selection */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      I am a *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className={`relative cursor-pointer p-4 border rounded-lg text-center transition-all ${formData.role === 'patient' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                        <input
                          type="radio"
                          name="role"
                          value="patient"
                          checked={formData.role === 'patient'}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <FaUser className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                        <span className="font-medium">Patient/Tourist</span>
                        <p className="text-sm text-gray-600 mt-1">Need medical assistance</p>
                      </label>
                      
                      <label className={`relative cursor-pointer p-4 border rounded-lg text-center transition-all ${formData.role === 'doctor' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                        <input
                          type="radio"
                          name="role"
                          value="doctor"
                          checked={formData.role === 'doctor'}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <FaHospital className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                        <span className="font-medium">Doctor/Hospital</span>
                        <p className="text-sm text-gray-600 mt-1">Provide medical care</p>
                      </label>
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact *
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Emergency phone number"
                      />
                    </div>
                  </div>

                  {/* Password Fields */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Minimum 6 characters"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Re-enter your password"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="h-4 w-4 text-blue-600 rounded mt-1"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    I agree to the{' '}
                    <Link href="/terms" className="text-blue-600 hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>. I understand that my medical data will be accessible to authorized doctors during emergencies.
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {loading ? 'Creating Account...' : 'Create Sanjeevani Account'}
                  </button>
                </div>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="text-blue-600 font-medium hover:underline">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}