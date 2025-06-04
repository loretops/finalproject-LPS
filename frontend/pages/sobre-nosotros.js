import React from 'react';
import Layout from '../components/layout/Layout';
import Image from 'next/image';

export default function SobreNosotros() {
  return (
    <Layout>
      <div className="bg-white">
        {/* Hero section */}
        <div className="relative pt-16 pb-12 sm:pt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Sobre COOPCO</span>
                <span className="block text-primary-600 mt-1">Club privado de inversión inmobiliaria</span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
                Conectamos inversores con oportunidades inmobiliarias exclusivas para maximizar rentabilidad y seguridad.
              </p>
            </div>
          </div>
        </div>

        {/* Nuestra historia */}
        <div className="overflow-hidden">
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="absolute top-0 bottom-0 left-3/4 hidden w-screen bg-gray-50 lg:block" />
            <div className="mx-auto max-w-prose text-base lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-8">
              <div>
                <h2 className="text-lg font-semibold text-primary-600">Nuestra Historia</h2>
                <h3 className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">Un nuevo enfoque de inversión</h3>
              </div>
            </div>
            <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="relative lg:col-start-2 lg:row-start-1">
                <div className="relative mx-auto max-w-prose text-base lg:max-w-none">
                  <figure>
                    <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                      <div className="h-80 overflow-hidden rounded-lg shadow-lg relative">
                        <Image
                          src="/images/luxury-interior.jpg"
                          alt="Equipo de COOPCO"
                          layout="fill"
                          objectFit="cover"
                          className="object-center"
                        />
                      </div>
                    </div>
                  </figure>
                </div>
              </div>
              <div className="mt-8 lg:mt-0">
                <div className="mx-auto max-w-prose text-base lg:max-w-none">
                  <p className="text-lg text-gray-500">
                    COOPCO nació en 2020 de la visión de un grupo de profesionales del sector inmobiliario que detectaron un nicho de mercado: inversores que buscaban proyectos rentables pero que carecían del tiempo o conocimientos técnicos para evaluarlos correctamente.
                  </p>
                </div>
                <div className="prose prose-primary mx-auto mt-5 text-gray-500 lg:col-start-1 lg:row-start-1 lg:max-w-none">
                  <p>
                    Tras años trabajando en el sector inmobiliario, identificamos un patrón común: muchos inversores tenían capital disponible pero les faltaba acceso a proyectos realmente rentables y seguros. Al mismo tiempo, excelentes oportunidades inmobiliarias no encontraban la financiación adecuada.
                  </p>
                  <p>
                    Decidimos crear un club exclusivo donde:
                  </p>
                  <ul>
                    <li>Seleccionamos rigurosamente a nuestros socios inversores</li>
                    <li>Analizamos profesionalmente cada oportunidad inmobiliaria</li>
                    <li>Coinvertimos entre un 10-15% en cada proyecto</li>
                    <li>Ofrecemos total transparencia en el proceso</li>
                  </ul>
                  <p>
                    Hoy, COOPCO ha gestionado más de 50 millones de euros en inversiones inmobiliarias, con una rentabilidad media superior al 15% anual para nuestros socios.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Valores */}
        <div className="bg-primary-50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base font-semibold uppercase tracking-wide text-primary-600">Nuestros valores</h2>
              <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                Los pilares de nuestro éxito
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Estos principios guían todas nuestras decisiones y relaciones comerciales.
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10 md:space-y-0">
                <div className="relative">
                  <dt>
                    <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-primary-600 text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Exclusividad</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Seleccionamos cuidadosamente a nuestros socios y proyectos para garantizar que cada inversión cumpla con nuestros altos estándares.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-primary-600 text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Transparencia</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Compartimos toda la información relevante, desde análisis de riesgos hasta informes de progreso, para que nuestros socios puedan tomar decisiones informadas.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-primary-600 text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Compromiso</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Coinvertimos en cada proyecto, alineando nuestros intereses con los de nuestros socios y demostrando nuestra confianza en cada oportunidad.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 