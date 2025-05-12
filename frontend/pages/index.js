import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">COOPCO</span>
                <span className="block text-primary-600 mt-2">Inversiones Inmobiliarias</span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
                Plataforma exclusiva para club privado de inversores inmobiliarios
              </p>
              <div className="mt-10 flex justify-center">
                <Link href="/login" className="btn btn-primary">
                  Acceder a la plataforma
                </Link>
                <Link href="#about" className="ml-4 btn btn-outline">
                  Conocer más
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center mb-12">
              <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Bienvenido a COOPCO</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Inversión inmobiliaria inteligente
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Nuestra plataforma conecta a un club privado de inversores con oportunidades 
                inmobiliarias de alta calidad, facilitando una gestión transparente, segura 
                y eficiente del proceso de inversión.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="card hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-md bg-primary-500 text-white flex items-center justify-center mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Exclusividad</h3>
                <p className="text-gray-600">
                  Acceso por invitación a un club cerrado de inversores seleccionados.
                </p>
              </div>
              
              <div className="card hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-md bg-primary-500 text-white flex items-center justify-center mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Análisis Sólidos</h3>
                <p className="text-gray-600">
                  Inversiones respaldadas por análisis económicos, de mercado y visuales.
                </p>
              </div>
              
              <div className="card hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-md bg-primary-500 text-white flex items-center justify-center mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Transparencia</h3>
                <p className="text-gray-600">
                  Seguimiento continuo de la evolución de proyectos con vídeos en directo.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
} 