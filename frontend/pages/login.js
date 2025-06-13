import React, { useEffect } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import Image from 'next/image';

const LoginPage = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated and not loading
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  // No mostrar contenido si está cargando o ya autenticado
  if (loading || isAuthenticated) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto"></div>
            <p className="mt-3 text-gray-600">Cargando...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Render the login form if not authenticated and done loading
  return (
    <Layout>
      <div className="relative flex min-h-screen">
        {/* Left side - Image */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <div className="absolute inset-0">
            <Image 
              src="/images/optimized/luxury-real-estate.webp" 
              alt="Inversión inmobiliaria" 
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/70 to-primary-800/30"></div>
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12 z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">COOPCO</h1>
            <p className="text-xl md:text-2xl text-center max-w-md">
              Club exclusivo para inversores inmobiliarios
            </p>
            <div className="mt-12 space-y-4 max-w-md">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary-400 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-white text-lg">Oportunidades exclusivas</p>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary-400 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-white text-lg">Acceso privado y seguro</p>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary-400 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-white text-lg">Rentabilidad garantizada</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-gradient-to-b from-white to-gray-50">
          <div className="w-full max-w-md">
            <div className="text-center mb-8 lg:hidden">
              <h1 className="text-3xl font-bold text-primary-600 mb-2">COOPCO</h1>
              <p className="text-gray-600">
                Plataforma exclusiva para club privado de inversores inmobiliarios
              </p>
            </div>
            
            <LoginForm />
            
            <p className="mt-8 text-center text-sm text-gray-500">
              Somos un equipo consolidado que promueve proyectos en toda España.<br />
              Siempre coinvertimos entre un 10% y un 15% en cada uno de nuestros proyectos.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage; 