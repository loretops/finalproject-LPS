import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Por favor, introduce email y contraseña.');
      return;
    }
    await login(email, password);
  };

  // Funciones para el acceso rápido
  const loginAsManager = async () => {
    await login('manager@example.com', 'password123');
  };

  const loginAsPartner = async () => {
    await login('lpardo@trucco.es', 'password123');
  };

  // Comprobar si estamos en un entorno de testing (desarrollo local o Vercel)
  const isTestingEnvironment = () => {
    return process.env.NODE_ENV === 'development' || 
           (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app'));
  };

  return (
    <Card className="max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Iniciar Sesión</h2>
      
      {/* Mensaje de error */}
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
          label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            placeholder="tu@email.com"
          icon={<EnvelopeIcon className="h-5 w-5" />}
          />
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <Link href="/recuperar-password" className="text-sm text-primary-600 hover:text-primary-500">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
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
          />
        </div>
        
        <Button
            type="submit"
          variant="primary"
          fullWidth
          isLoading={loading}
            disabled={loading}
        >
          Iniciar Sesión
        </Button>
      </form>
      
      {/* Nota informativa */}
      <p className="mt-8 text-center text-sm text-gray-500">
        Sólo usuarios autorizados. El acceso a esta plataforma está restringido.
      </p>
      
      {/* Botones de acceso rápido para testing - Visible en desarrollo y Vercel */}
      {isTestingEnvironment() && (
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">Acceso rápido para testing</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={loginAsManager} 
              variant="secondary" 
              size="sm"
              disabled={loading}
            >
              Acceder como Manager
            </Button>
            <Button 
              onClick={loginAsPartner} 
              variant="secondary" 
              size="sm"
              disabled={loading}
            >
              Acceder como Socio
            </Button>
          </div>
        </div>
      )}
      
      {/* Credenciales de demostración - Visible en desarrollo y Vercel */}
      {isTestingEnvironment() && (
        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Credenciales de demostración</h3>
          <p className="text-xs text-gray-600 mb-1"><span className="font-semibold">Manager:</span> <span className="font-mono">manager@example.com</span> / <span className="font-mono">password123</span></p>
          <p className="text-xs text-gray-600"><span className="font-semibold">Socio:</span> <span className="font-mono">lpardo@trucco.es</span> / <span className="font-mono">password123</span></p>
        </div>
      )}
    </Card>
  );
};

export default LoginForm; 