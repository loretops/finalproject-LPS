import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Usar la variable NEXT_PUBLIC_API_URL que ya debe venir configurada desde next.config.js
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Crear una instancia de Axios preconfigurada
// Esta instancia será usada para todas las llamadas a la API
// y aquí añadiremos los interceptores.
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// --- INTERCEPTOR --- 
// Añadimos un interceptor a la instancia de apiClient.
// Este interceptor se ejecutará ANTES de que cada petición sea enviada.
apiClient.interceptors.request.use(
  (config) => {
    // Intentamos obtener el token de localStorage
    let token = null;
    if (typeof window !== "undefined") { // Asegurarse de que estamos en el navegador
      token = localStorage.getItem('authToken');
    }

    // Si el token existe, lo añadimos a la cabecera Authorization
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // Devolvemos la configuración modificada (o la original si no había token)
    return config;
  },
  (error) => {
    // Manejar errores en la configuración de la petición (poco común)
    return Promise.reject(error);
  }
);

/**
 * Calls the backend API to log in a user using Axios.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Promise<object>} The response data (including the token) or throws an error.
 */
export const login = async (email, password) => {
  try {
    // Usamos la instancia apiClient
    const response = await apiClient.post('/auth/login', { email, password });
    // Axios devuelve los datos directamente en response.data
    // y lanza errores para respuestas 4xx/5xx automáticamente.
    // Store token in localStorage
    localStorage.setItem('authToken', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Error during login API call:', error.response?.data?.message || error.message);
    // Rethrow a more specific error message if available from backend response
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

/**
 * Handles user registration with an invitation token.
 * @param {object} userData - User registration data
 * @param {string} userData.firstName - User's first name
 * @param {string} userData.lastName - User's last name
 * @param {string} userData.email - User's email (must match the invitation)
 * @param {string} userData.password - User's password
 * @param {string} userData.token - Invitation token
 * @returns {Promise<object>} Backend response with token
 */
export const register = async (userData) => {
  if (!userData.firstName || !userData.lastName || !userData.email || !userData.password || !userData.token) {
    throw new Error('First name, last name, email, password and invitation token are required');
  }
  
  try {
    const response = await apiClient.post('/auth/register', userData);
    
    // Store the token in localStorage if provided
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    console.error('Error during register API call:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

/**
 * Calls the backend API to validate an invitation token.
 * @param {string} token - The invitation token from the URL.
 * @returns {Promise<object>} Response data { status: 'valid' | 'invalid', email?: string, message?: string }
 */
export const validateInvitationToken = async (token) => {
  if (!token) {
    throw new Error('Token is required for validation.');
  }
  try {
    // Usamos apiClient para que los interceptores se apliquen si fueran necesarios en el futuro,
    // aunque esta llamada específica no requiere autenticación.
    const response = await apiClient.get(`/auth/invitation/${token}`);
    return response.data; // Ej: { status: 'valid', email: 'user@example.com' }
  } catch (error) {
    console.error('Error during invitation token validation API call:', error.response?.data || error.message);
    // Si el backend devuelve un error (4xx, 5xx), axios lo lanza.
    // Devolvemos la data del error si existe, o un error genérico.
    if (error.response?.data) {
        return error.response.data; // Ej: { status: 'invalid', message: '...' }
    } else {
        throw new Error('Failed to validate invitation token');
    }
  }
};

/**
 * Logout the current user by removing the token
 */
export const logout = () => {
  localStorage.removeItem('authToken');
  // Could also call an API endpoint to invalidate the token server-side
  // Example: await apiClient.post('/auth/logout');
};

/**
 * Retrieve the authentication token from localStorage
 * @returns {string|null} The stored authentication token or null if not available
 */
export const getAuthToken = () => {
  if (typeof window === 'undefined') return null; // Check for server-side rendering
  return localStorage.getItem('authToken');
};

/**
 * Get the current authenticated user
 * @returns {Object|null} The decoded user from the token, or null if not authenticated
 */
export const getCurrentUser = () => {
  const token = getAuthToken(); // Use the new function
  if (!token) return null;
  
  try {
    // Decode token to get user info (without verifying signature)
    // This is just for UI purposes, backend will verify the token properly
    const decoded = jwtDecode(token);
    
    // Check if token is expired
    if (decoded.exp * 1000 < Date.now()) {
      logout(); // Remove expired token
      return null;
    }
    
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    logout();
    return null;
  }
};

// Exportar la instancia de apiClient también puede ser útil si otros servicios
// necesitan hacer llamadas API con la misma configuración e interceptores.
export { apiClient }; 