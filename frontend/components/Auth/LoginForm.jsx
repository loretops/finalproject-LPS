import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

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

  return (
    <div className="bg-white shadow-md rounded-lg px-8 py-10 max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Iniciar Sesión</h2>
      
      {/* Mensaje de error */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="input w-full"
            placeholder="tu@email.com"
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <Link href="/recuperar-password" className="text-sm text-primary-600 hover:text-primary-500">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className="input w-full"
            placeholder="••••••••"
          />
        </div>
        
        <div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Accediendo...</span>
              </span>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </div>
      </form>
      
      {/* Nota informativa */}
      <p className="mt-8 text-center text-sm text-gray-500">
        Sólo usuarios autorizados. El acceso a esta plataforma está restringido.
      </p>
      
      {/* Credenciales de demostración - Solo para desarrollo */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Credenciales de demostración</h3>
          <p className="text-xs text-gray-600">Email: <span className="font-mono">manager@example.com</span></p>
          <p className="text-xs text-gray-600">Contraseña: <span className="font-mono">password123</span></p>
        </div>
      )}
    </div>
  );
};

export default LoginForm; 