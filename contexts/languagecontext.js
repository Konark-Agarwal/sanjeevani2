import { createContext, useContext, useState, useEffect } from 'react';

// Translations object - Add more languages and keys as needed
const translations = {
  en: {
    howItWorks: 'How It Works',
    features: 'Features',
    hospitals: 'Hospitals',
    blogs: 'Blogs',
    resources: 'Resources',
    registerNow: 'Register Now',
    welcome: 'Welcome to Sanjeevani',
    description: 'Your trusted medical emergency platform.',
    // Add more keys for other components
  },
  hi: {
    howItWorks: 'यह कैसे काम करता है',
    features: 'सुविधाएँ',
    hospitals: 'अस्पताल',
    blogs: 'ब्लॉग',
    resources: 'संसाधन',
    registerNow: 'अभी पंजीकरण करें',
    welcome: 'संजीवनी में आपका स्वागत है',
    description: 'आपका विश्वसनीय चिकित्सा आपातकालीन प्लेटफॉर्म।',
    // Add more keys for other components
  },
  // Add more languages: es, fr, etc.
};

// Detect user's language from browser or IP
export const detectUserLanguage = () => {
  if (typeof window !== 'undefined') {
    // Option 1: Check browser language
    const browserLang = navigator.language || navigator.userLanguage;
    const shortLang = browserLang.split('-')[0]; // 'en-US' → 'en'
    
    // Supported languages in our app
    const supportedLangs = Object.keys(translations);
    
    if (supportedLangs.includes(shortLang)) {
      return shortLang;
    }
    
    // Option 2: Try to get from IP location (simplified)
    // In production, use an IP geolocation service
    return 'en'; // Default to English
  }
  return 'en';
};

// Store language preference in localStorage
export const saveLanguagePreference = (lang) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferred_language', lang);
  }
};

export const getSavedLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('preferred_language');
  }
  return null;
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default

  useEffect(() => {
    // Load saved language or detect from browser
    const savedLang = getSavedLanguage();
    const detectedLang = savedLang || detectUserLanguage();
    setLanguage(detectedLang);
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    saveLanguagePreference(lang);
  };

  const t = (key) => translations[language]?.[key] || key; // Translation function

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);