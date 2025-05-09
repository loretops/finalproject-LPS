import React, { useEffect } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';

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
      <Layout hideNav={true}>
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
    <Layout hideNav={true}>
      <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-600 mb-2">COOPCO</h1>
            <p className="text-gray-600">
              Plataforma exclusiva para club privado de inversores inmobiliarios
            </p>
          </div>
          
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage; 