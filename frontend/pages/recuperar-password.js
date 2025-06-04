import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { requestPasswordReset } from '../services/authService';

const RecuperarPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Enviar solicitud usando el servicio de autenticación
      await requestPasswordReset(email);
      
      // Mostrar mensaje de éxito
      setSuccess(true);
    } catch (err) {
      console.error('Error al solicitar restablecimiento de contraseña:', err);
      
      // Mostrar mensaje de error específico si el servidor lo proporciona
      if (err.message) {
        setError(err.message);
      } else {
        setError('Ha ocurrido un error al procesar la solicitud. Por favor, intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Recupera tu contraseña
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Te enviaremos instrucciones para restablecer tu contraseña
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Card className="shadow-lg">
            {success ? (
              <div className="p-8 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">Correo enviado</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Si existe una cuenta con ese correo electrónico, hemos enviado instrucciones para restablecer tu contraseña.
                </p>
                <div className="mt-6">
                  <Link href="/login" className="text-primary-600 hover:text-primary-500 font-medium">
                    Volver a iniciar sesión
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 p-8">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo electrónico
                  </label>
                  <div className="mt-1">
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                      placeholder="tu@email.com"
                      icon={<EnvelopeIcon className="h-5 w-5" />}
                      className="bg-gray-50 border-gray-200 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    isLoading={loading}
                    disabled={loading}
                    className="py-2.5 text-base font-medium"
                  >
                    Enviar instrucciones
                  </Button>
                </div>

                <div className="text-center">
                  <Link href="/login" className="text-sm text-primary-600 hover:text-primary-500 font-medium">
                    Volver a iniciar sesión
                  </Link>
                </div>
              </form>
            )}
          </Card>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta? Contacta con nuestro equipo de soporte.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecuperarPassword; 