import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ResetearPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  const router = useRouter();
  const { token } = router.query;

  // Verificar token cuando el componente se monta
  useEffect(() => {
    // En un caso real, validaríamos el token contra el backend
    // Para esta demo, simplemente comprobamos que existe un token
    if (router.isReady) {
      if (!token) {
        setTokenValid(false);
        setError('El enlace de restablecimiento no es válido o ha expirado.');
      }
    }
  }, [router.isReady, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar contraseñas
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      // En un caso real, aquí llamaríamos a una API para cambiar la contraseña
      // Por ahora, simularemos un éxito después de un pequeño retraso
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mostrar mensaje de éxito
      setSuccess(true);
    } catch (err) {
      setError('Error al cambiar la contraseña. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Restablece tu contraseña
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Crea una nueva contraseña para tu cuenta
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Card className="shadow-lg">
            {!tokenValid ? (
              <div className="p-8 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">Enlace inválido</h3>
                <p className="mt-2 text-sm text-gray-500">
                  {error || 'El enlace de restablecimiento no es válido o ha expirado.'}
                </p>
                <div className="mt-6">
                  <Link href="/recuperar-password" className="text-primary-600 hover:text-primary-500 font-medium">
                    Solicitar un nuevo enlace
                  </Link>
                </div>
              </div>
            ) : success ? (
              <div className="p-8 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">Contraseña actualizada</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Tu contraseña ha sido cambiada exitosamente.
                </p>
                <div className="mt-6">
                  <Link href="/login" className="text-primary-600 hover:text-primary-500 font-medium">
                    Iniciar sesión
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
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Nueva contraseña
                  </label>
                  <div className="mt-1">
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                      placeholder="••••••••"
                      icon={<LockClosedIcon className="h-5 w-5" />}
                      className="bg-gray-50 border-gray-200 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirmar contraseña
                  </label>
                  <div className="mt-1">
                    <Input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={loading}
                      placeholder="••••••••"
                      icon={<LockClosedIcon className="h-5 w-5" />}
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
                    Cambiar contraseña
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ResetearPassword; 