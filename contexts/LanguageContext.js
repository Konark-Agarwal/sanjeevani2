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
    // Add more keys for other components (e.g., buttons, labels)
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
    // Add more keys for other components (e.g., buttons, labels)
  },
  // Add more languages: es, fr, etc.
};

// Supported languages (expand as needed)
const supportedLangs = ['en', 'hi', 'es', 'fr', 'de', 'zh', 'ar', 'bn'];

// Detect user's language from browser or IP
export const detectUserLanguage = () => {
  if (typeof window !== 'undefined') {
    const browserLang = navigator.language || navigator.userLanguage;
    const shortLang = browserLang.split('-')[0];
    if (supportedLangs.includes(shortLang)) {
      return shortLang;
    }
    return 'en'; // Default
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
  const [language, setLanguage] = useState('en');
  const [translationsCache, setTranslationsCache] = useState({}); // Cache translations

  useEffect(() => {
    const savedLang = getSavedLanguage();
    const detectedLang = savedLang || detectUserLanguage();
    setLanguage(detectedLang);
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    saveLanguagePreference(lang);
    setTranslationsCache({}); // Clear cache on language change
  };

  // Translation function using your API route
  const t = async (key, defaultText = key) => {
    if (language === 'en') return defaultText; // No translation needed for English
    if (translationsCache[key]) return translationsCache[key]; // Use cached translation

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: defaultText, targetLang: language }),
      });
      const data = await response.json();
      if (data.translatedText) {
        setTranslationsCache((prev) => ({ ...prev, [key]: data.translatedText }));
        return data.translatedText;
      }
      return defaultText; // Fallback
    } catch (error) {
      console.error('Translation error:', error);
      return defaultText; // Fallback to original text
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);