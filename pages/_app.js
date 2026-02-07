import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from '../contexts/LanguageContext'; // Add this import

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>  {/* Wrap with provider */}
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </LanguageProvider>
  );
}

export default MyApp;