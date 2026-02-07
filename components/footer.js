import { motion } from 'framer-motion';
import { Heart, Mail, Phone, MapPin, Shield } from 'lucide-react';  // Added Shield import for consistency

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

export default Footer;