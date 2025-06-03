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
    <Card className="max-w-md w-full mx-auto overflow-hidden border-0 shadow-xl rounded-xl">
      <div className="px-8 pt-8 pb-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-primary-800 mb-1 text-center">Iniciar Sesión</h2>
        <p className="text-center text-gray-500 text-sm">Accede a tu cuenta exclusiva</p>
      </div>
      
      {/* Mensaje de error */}
      {error && (
        <div className="mx-8 mt-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5 p-8">
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
          className="bg-gray-50 border-gray-200 focus:bg-white"
        />
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <Link href="/recuperar-password" className="text-sm text-primary-600 hover:text-primary-500 font-medium">
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
            className="bg-gray-50 border-gray-200 focus:bg-white"
          />
        </div>
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={loading}
          disabled={loading}
          className="py-2.5 text-base font-medium mt-2"
        >
          Iniciar Sesión
        </Button>
        
        <div className="flex items-center justify-center">
          <div className="w-full border-t border-gray-200"></div>
          <div className="px-3 text-xs text-gray-500 uppercase">O continúa con</div>
          <div className="w-full border-t border-gray-200"></div>
        </div>
        
        {/* Botones de acceso rápido para testing - Visible en desarrollo y Vercel */}
        {isTestingEnvironment() && (
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={loginAsManager} 
              variant="outline" 
              size="md"
              disabled={loading}
              className="text-primary-700 border-primary-200 hover:bg-primary-50"
            >
              Acceder como Manager
            </Button>
            <Button 
              onClick={loginAsPartner} 
              variant="outline" 
              size="md"
              disabled={loading}
              className="text-primary-700 border-primary-200 hover:bg-primary-50"
            >
              Acceder como Socio
            </Button>
          </div>
        )}
      </form>
      
      {/* Nota informativa */}
      <div className="px-8 py-5 bg-gray-50 border-t border-gray-100">
        <p className="text-center text-sm text-gray-500">
          Sólo usuarios autorizados. El acceso a esta plataforma está restringido.
        </p>
      </div>
      
      {/* Credenciales de demostración - Visible en desarrollo y Vercel */}
      {isTestingEnvironment() && (
        <div className="mx-8 mb-6 p-3 bg-gray-50 border border-gray-200 rounded-md">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Credenciales de demostración</h3>
          <p className="text-xs text-gray-600 mb-1"><span className="font-semibold">Manager:</span> <span className="font-mono">manager@example.com</span> / <span className="font-mono">password123</span></p>
          <p className="text-xs text-gray-600"><span className="font-semibold">Socio:</span> <span className="font-mono">lpardo@trucco.es</span> / <span className="font-mono">password123</span></p>
        </div>
      )}
    </Card>
  );
};

export default LoginForm; 