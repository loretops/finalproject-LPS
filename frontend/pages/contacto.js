import React, { useState } from 'react';
import Layout from '../components/layout/Layout';

export default function Contacto() {
  const [formState, setFormState] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
    tipo: 'consulta'
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // En un escenario real, aquí enviaríamos los datos a un backend
    // Para esta demo, simularemos un envío exitoso
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        error: false,
        message: 'Gracias por contactarnos. Nos pondremos en contacto contigo pronto.'
      });
      
      // Restablecer el formulario
      setFormState({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: '',
        tipo: 'consulta'
      });
    }, 1000);
  };

  return (
    <Layout>
      <div className="bg-white">
        {/* Header */}
        <div className="relative bg-primary-800">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-primary-800" />
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Contacto</h1>
            <p className="mt-6 max-w-3xl text-xl text-primary-100">
              Estamos aquí para ayudarte con cualquier consulta relacionada con tus inversiones inmobiliarias.
            </p>
          </div>
        </div>

        {/* Formulario de contacto y datos */}
        <div className="relative bg-white">
          <div className="absolute inset-0">
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50" />
          </div>
          <div className="relative max-w-7xl mx-auto lg:grid lg:grid-cols-5">
            <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
              <div className="max-w-lg mx-auto">
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Información de contacto</h2>
                <p className="mt-3 text-lg leading-6 text-gray-500">
                  No dudes en ponerte en contacto con nosotros utilizando cualquiera de los siguientes medios.
                </p>
                <dl className="mt-8 text-base text-gray-500">
                  <div>
                    <dt className="sr-only">Dirección</dt>
                    <dd>
                      <p>Calle Principal 123</p>
                      <p>28001, Madrid, España</p>
                    </dd>
                  </div>
                  <div className="mt-6">
                    <dt className="sr-only">Teléfono</dt>
                    <dd className="flex">
                      <svg className="flex-shrink-0 h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="ml-3">+34 91 123 45 67</span>
                    </dd>
                  </div>
                  <div className="mt-3">
                    <dt className="sr-only">Email</dt>
                    <dd className="flex">
                      <svg className="flex-shrink-0 h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="ml-3">info@coopco.com</span>
                    </dd>
                  </div>
                </dl>
                <p className="mt-6 text-base text-gray-500">
                  Horario de atención:<br />
                  <span className="text-sm">Lunes a Viernes: 9:00 - 18:00</span>
                </p>
              </div>
            </div>
            <div className="bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
              <div className="max-w-lg mx-auto lg:max-w-none">
                {formStatus.submitted ? (
                  <div className="rounded-md bg-green-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Mensaje enviado</h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>{formStatus.message}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                        Nombre completo
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="nombre"
                          id="nombre"
                          autoComplete="name"
                          required
                          value={formState.nombre}
                          onChange={handleChange}
                          className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                        Teléfono
                      </label>
                      <div className="mt-1">
                        <input
                          type="tel"
                          name="telefono"
                          id="telefono"
                          autoComplete="tel"
                          value={formState.telefono}
                          onChange={handleChange}
                          className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
                        Tipo de consulta
                      </label>
                      <select
                        id="tipo"
                        name="tipo"
                        value={formState.tipo}
                        onChange={handleChange}
                        className="mt-1 block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="consulta">Consulta general</option>
                        <option value="inversion">Información sobre inversiones</option>
                        <option value="soporte">Soporte técnico</option>
                        <option value="partnership">Propuesta de colaboración</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700">
                        Mensaje
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="mensaje"
                          name="mensaje"
                          rows={4}
                          required
                          value={formState.mensaje}
                          onChange={handleChange}
                          className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Enviar mensaje
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 