// frontend/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as loginService } from '../services/authService';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

// Función helper para decodificar y validar token
const decodeTokenAndSetUser = (token, setTokenState, setUserState) => {
  try {
    const decoded = jwtDecode(token); // Decodificar el token
    // Verificar si ha expirado (exp se mide en segundos, Date.now() en ms)
    if (decoded.exp * 1000 < Date.now()) {
      console.warn('Token expired on load');
      localStorage.removeItem('authToken');
      setTokenState(null);
      setUserState(null);
      return null;
    } else {
      // Token válido y no expirado: establecer estado
      setTokenState(token);
      // Extraer información relevante del payload del token
      const userData = {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role,
        // Añadir otros campos si los incluiste en el payload del backend
      };
      setUserState(userData);
      return userData;
    }
  } catch (error) {
    console.error('Failed to decode token:', error);
    localStorage.removeItem('authToken');
    setTokenState(null);
    setUserState(null);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Efecto para verificar token al cargar la app
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      decodeTokenAndSetUser(storedToken, setToken, setUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const data = await loginService(email, password);
      if (data.token) {
        // Usar la función helper para decodificar y establecer estado
        const loggedInUser = decodeTokenAndSetUser(data.token, setToken, setUser);
        if (loggedInUser) { // Solo guardar y redirigir si el token es válido
          localStorage.setItem('authToken', data.token);
          router.push('/dashboard');
        } else {
          throw new Error('Received invalid token from server.');
        }
      } else {
        throw new Error('Token not received');
      }
    } catch (err) {
      console.error('Login failed in AuthContext:', err);
      setError(err.message || 'Failed to login');
      setUser(null);
      setToken(null);
      localStorage.removeItem('authToken');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  /**
   * Verifica si un usuario tiene uno de los roles especificados
   * @param {Object} user - Usuario a verificar
   * @param {Array|string} roles - Rol o array de roles permitidos
   * @returns {boolean} true si el usuario tiene al menos uno de los roles especificados
   */
  const checkRole = (user, roles) => {
    // Si no hay usuario o no tiene un rol, no tiene acceso
    if (!user || !user.role) return false;
    
    // Si roles es un string, convertirlo a array
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    
    // Verificar si el rol del usuario está en los roles permitidos
    return allowedRoles.includes(user.role);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    logout,
    checkRole, // Añadir la función checkRole al contexto
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 