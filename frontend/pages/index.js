import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      <div>
        {/* Hero Section con imagen de fondo */}
        <section className="relative h-[80vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/hero-background.jpg" 
              alt="Inversión inmobiliaria" 
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-800/60"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="md:max-w-2xl">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                <span className="block">COOPCO</span>
                <span className="block text-primary-200 mt-2">Inversiones Inmobiliarias</span>
              </h1>
              <p className="mt-6 text-xl text-gray-100">
                Plataforma exclusiva para club privado de inversores inmobiliarios con oportunidades de alta rentabilidad
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Link href="/login" className="btn btn-primary text-center px-8 py-3 text-base font-medium rounded-md shadow-lg hover:shadow-xl transition-all">
                  Acceder a la plataforma
                </Link>
                <Link href="#about" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-800 text-center px-8 py-3 text-base font-medium rounded-md transition-all">
                  Conocer más
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center mb-16">
              <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Bienvenido a COOPCO</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Inversión inmobiliaria inteligente
              </p>
              <p className="mt-4 max-w-3xl text-xl text-gray-500 lg:mx-auto">
                Nuestra plataforma conecta a un club privado de inversores con oportunidades 
                inmobiliarias de alta calidad, facilitando una gestión transparente, segura 
                y eficiente del proceso de inversión.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-56 w-full">
                  <Image 
                    src="/images/exclusivity.jpg" 
                    alt="Exclusividad" 
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">Exclusividad</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">
                    Acceso por invitación a un club cerrado de inversores seleccionados. Solo los mejores proyectos son presentados a nuestros socios.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-56 w-full">
                  <Image 
                    src="/images/analytics.jpg" 
                    alt="Análisis" 
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">Análisis Sólidos</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">
                    Inversiones respaldadas por análisis económicos detallados, estudios de mercado y visualizaciones que permiten tomar decisiones informadas.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-56 w-full">
                  <Image 
                    src="/images/transparency.jpg" 
                    alt="Transparencia" 
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">Transparencia</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">
                    Seguimiento continuo de la evolución de proyectos con informes semanales, documentación completa y vídeos en directo de las obras.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-primary-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white">
                ¿Listo para invertir con nosotros?
              </h2>
              <p className="mt-4 text-xl text-primary-200">
                Coinvertimos entre un 10% y un 15% en cada proyecto, demostrando nuestro compromiso desde el primer momento.
              </p>
              <div className="mt-8">
                <Link href="/login" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-800 bg-white hover:bg-primary-50 transition-colors">
                  Acceder a la plataforma
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
} 