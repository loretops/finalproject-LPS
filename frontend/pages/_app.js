import React from 'react';
import { AuthProvider } from '../context/AuthContext';
// Import global styles with Tailwind CSS
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      {/* // Global Layout component can go here if needed */}
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp; 