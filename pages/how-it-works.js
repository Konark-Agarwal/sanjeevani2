import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FileText, CheckCircle } from 'lucide-react';
import Header from '../components/header';
import Footer from '../components/footer';

// HowItWorks Component (copied from your index.js)
const steps = [
  {
    icon: FileText,
    title: 'Register in 2 Minutes',
    description: 'Fill your details and medical history in our secure portal',
    features: ['Secure data encryption', 'Multi-language support', '24/7 assistance'],
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: FileText,  // Replace with QrCode if needed
    title: 'Get Your Digital QR',
    description: 'Download your unique medical QR code and ID card',
    features: ['Printable format', 'Digital wallet', 'Emergency card'],
    color: 'from-teal-500 to-teal-600'
  },
  {
    icon: FileText,  // Replace with Activity if needed
    title: 'Instant Emergency Access',
    description: 'Doctors scan QR to access your complete medical profile',
    features: ['Real-time access', 'Family notification', 'Hospital coordination'],
    color: 'from-emerald-500 to-emerald-600'
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
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#f37021] to-[#ff9e4d] rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{step.description}</p>
                <div className="space-y-3">
                  {step.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center`}>
                    <step.icon className="text-white" size={40} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <HowItWorks />
      <Footer />
    </div>
  );
}