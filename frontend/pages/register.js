import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
// Importar el servicio de registro
import { register } from '../services/authService';
import { 
  UserIcon, 
  EnvelopeIcon, 
  LockClosedIcon,
  IdentificationIcon 
} from '@heroicons/react/24/outline';

const RegisterPage = () => {
  const router = useRouter();

  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [token, setToken] = useState('');

  // Estado para UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Obtener token y email de la URL cuando el router esté listo
  useEffect(() => {
    if (router.isReady) {
      const { token: urlToken, email: urlEmail } = router.query;
      if (urlToken && urlEmail) {
        setToken(urlToken);
        setFormData(prev => ({ ...prev, email: urlEmail }));
      } else {
        setError('Información de invitación inválida o faltante. No se puede registrar.');
      }
    }
  }, [router.isReady, router.query]);

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar errores específicos al escribir
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
    setError(''); // Limpiar error general
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPasswordError('');

    // Validaciones Frontend
    if (!formData.firstName || !formData.lastName || !formData.password || !formData.confirmPassword) {
      setError('Todos los campos (excepto email) son requeridos.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);

    // Preparar datos para la API
    const registrationData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      token: token
    };

    try {
      // Llamada al servicio de registro
      const response = await register(registrationData);
      console.log('API Response:', response);

      // Redirigir a la página de éxito
      router.push('/registration-success'); 
    } catch (apiError) {
      console.error('Error en el registro:', apiError);
      setError(apiError.message || 'Ocurrió un error durante el registro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout hideNav={true}>
      <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-600 mb-2">COOPCO</h1>
            <p className="text-gray-600 mb-6">
              Plataforma exclusiva para club privado de inversores inmobiliarios
            </p>
          </div>
          
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Registro de Nuevo Socio</h2>
            <p className="text-gray-600 mb-6 text-center">
              Bienvenido/a. Por favor, completa tus datos para finalizar el registro.
            </p>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
            type="email"
            id="email"
            name="email"
                label="Email (invitación)"
                value={formData.email}
                readOnly
                disabled
                icon={<EnvelopeIcon className="h-5 w-5" />}
                helperText="Email asociado a tu invitación"
              />
              
              <Input
            type="text"
            id="firstName"
            name="firstName"
                label="Nombre"
            value={formData.firstName}
            onChange={handleChange}
            required
                icon={<UserIcon className="h-5 w-5" />}
                placeholder="Tu nombre"
          />

              <Input
            type="text"
            id="lastName"
            name="lastName"
                label="Apellidos"
            value={formData.lastName}
            onChange={handleChange}
            required
                icon={<IdentificationIcon className="h-5 w-5" />}
                placeholder="Tus apellidos"
          />

              <Input
            type="password"
            id="password"
            name="password"
                label="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
                icon={<LockClosedIcon className="h-5 w-5" />}
                placeholder="••••••••"
                helperText="Mínimo 8 caracteres recomendado"
          />

              <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
                label="Confirmar Contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
                icon={<LockClosedIcon className="h-5 w-5" />}
                placeholder="••••••••"
                error={passwordError}
              />
              
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={loading}
                disabled={loading || !token}
              >
                Completar Registro
              </Button>
      </form>

      {!token && error && (
              <p className="mt-4 text-center text-sm text-gray-600">
                Si tienes problemas, contacta con el administrador o{' '}
                <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
                  vuelve al inicio
                </Link>.
              </p>
      )}
          </Card>
        </div>
    </div>
    </Layout>
  );
};

export default RegisterPage; 