import React, { useState, useEffect } from 'react';
import { login } from '../services/authService';
import axios from 'axios';

const AuthTestPage = () => {
  const [email, setEmail] = useState('manager@example.com');
  const [password, setPassword] = useState('password123');
  const [loginResponse, setLoginResponse] = useState(null);
  const [localStorageToken, setLocalStorageToken] = useState(null);
  const [error, setError] = useState(null);
  const [directResponseData, setDirectResponseData] = useState(null);

  // Verificar localStorage al cargar
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    setLocalStorageToken(storedToken);
  }, []);

  // Función para actualizar el token mostrado
  const checkLocalStorage = () => {
    const storedToken = localStorage.getItem('authToken');
    setLocalStorageToken(storedToken);
  };

  // Función para limpiar localStorage
  const clearLocalStorage = () => {
    localStorage.removeItem('authToken');
    setLocalStorageToken(null);
    setError(null);
    setLoginResponse(null);
    setDirectResponseData(null);
  };

  // Función para establecer manualmente un token
  const setManualToken = () => {
    const dummyToken = 'test_token_' + Date.now();
    localStorage.setItem('authToken', dummyToken);
    checkLocalStorage();
  };

  // Probar la autenticación usando el servicio de autenticación
  const handleLoginWithService = async (e) => {
    e.preventDefault();
    setError(null);
    setLoginResponse(null);
    
    try {
      console.log('Intentando login con:', { email, password });
      const response = await login(email, password);
      setLoginResponse(response);
      checkLocalStorage();
    } catch (err) {
      console.error('Error de login:', err);
      setError(err.message || 'Error desconocido en el login');
    }
  };

  // Probar la autenticación directamente con axios
  const handleDirectLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setDirectResponseData(null);
    
    try {
      console.log('Intentando login directo con:', { email, password });
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api';
      
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      console.log('Respuesta completa:', response);
      
      setDirectResponseData(response.data);
      
      // Guardar token manualmente
      if (response.data && response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        checkLocalStorage();
      }
    } catch (err) {
      console.error('Error en login directo:', err);
      setError(err.response?.data?.message || err.message || 'Error desconocido en el login directo');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Página de Diagnóstico de Autenticación</h1>
      
      {/* Estado actual */}
      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Estado Actual</h2>
        <div className="mb-2">
          <strong>Token en localStorage:</strong> 
          {localStorageToken ? (
            <div className="mt-1 p-2 bg-green-100 rounded text-xs font-mono overflow-auto max-h-32">
              {localStorageToken}
            </div>
          ) : (
            <span className="text-red-500 ml-2">No hay token almacenado</span>
          )}
        </div>
        <div className="flex space-x-2 mt-4">
          <button 
            onClick={checkLocalStorage}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Verificar localStorage
          </button>
          <button 
            onClick={clearLocalStorage}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Limpiar localStorage
          </button>
          <button 
            onClick={setManualToken}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Establecer token de prueba
          </button>
        </div>
      </div>
      
      {/* Formulario de login con servicio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Login con Servicio</h2>
          <form onSubmit={handleLoginWithService} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <button 
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Iniciar Sesión con Servicio
            </button>
          </form>
          
          {loginResponse && (
            <div className="mt-4">
              <h3 className="font-medium mb-1">Respuesta del servicio:</h3>
              <pre className="p-2 bg-gray-100 rounded text-xs overflow-auto max-h-40">
                {JSON.stringify(loginResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>
        
        {/* Formulario de login directo con axios */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Login Directo (Axios)</h2>
          <form onSubmit={handleDirectLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <button 
              type="submit"
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Iniciar Sesión Directo
            </button>
          </form>
          
          {directResponseData && (
            <div className="mt-4">
              <h3 className="font-medium mb-1">Respuesta Directa:</h3>
              <pre className="p-2 bg-gray-100 rounded text-xs overflow-auto max-h-40">
                {JSON.stringify(directResponseData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
      
      {/* Mensaje de error */}
      {error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {/* Instrucciones */}
      <div className="mt-8 p-4 bg-yellow-50 rounded-lg text-sm">
        <h3 className="font-medium mb-2">Instrucciones para diagnóstico:</h3>
        <ol className="list-decimal list-inside space-y-1">
          <li>Intenta el login con ambos métodos y observa las diferencias</li>
          <li>Verifica si el token aparece en el localStorage</li>
          <li>Revisa en las herramientas del desarrollador (F12) cualquier error en la consola</li>
          <li>Comprueba que la respuesta del servidor incluya el token</li>
        </ol>
      </div>
    </div>
  );
};

export default AuthTestPage; 