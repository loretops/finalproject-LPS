import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { Toaster } from 'react-hot-toast';
// Import global styles with Tailwind CSS
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          // Configuración por defecto para todos los toasts
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          // Configuración específica por tipo de toast
          success: {
            duration: 3000,
            style: {
              background: '#10B981',
            },
          },
          error: {
            duration: 5000,
            style: {
              background: '#EF4444',
            },
          },
          loading: {
            duration: Infinity,
          },
        }}
      />
      {/* // Global Layout component can go here if needed */}
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp; 