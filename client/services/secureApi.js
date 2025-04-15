import axios from 'axios';

// Crear instancia axios segura
const secureApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Permite enviar cookies con las peticiones
  timeout: 10000, // Timeout razonable para evitar problemas
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para manejar tokens de seguridad
secureApi.interceptors.request.use(
  config => {
    // Obtener token de sessionStorage o localStorage
    const token = typeof window !== 'undefined' 
      ? sessionStorage.getItem('auth_token') 
      : null;
    
    // Si el token existe, añadirlo a los headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores de autenticación
secureApi.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    // Si el error es 401 (no autorizado) y no es un reintento
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Intentar refrescar el token
        const refreshResponse = await secureApi.post('/api/auth/refresh-token');
        
        if (refreshResponse.status === 200) {
          // Guardar nuevo token
          sessionStorage.setItem('auth_token', refreshResponse.data.token);
          
          // Actualizar el header y reintentar
          secureApi.defaults.headers.common['Authorization'] = 
            `Bearer ${refreshResponse.data.token}`;
          return secureApi(originalRequest);
        }
      } catch (refreshError) {
        // Si falla el refresh, limpiar sesión y redirigir a login
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

// Métodos auxiliares para operaciones comunes
export const secureGet = async (url, params = {}) => {
  try {
    const response = await secureApi.get(url, { params });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const securePost = async (url, data = {}) => {
  try {
    const response = await secureApi.post(url, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const securePut = async (url, data = {}) => {
  try {
    const response = await secureApi.put(url, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const secureDelete = async (url) => {
  try {
    const response = await secureApi.delete(url);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Gestor de errores centralizado
const handleApiError = (error) => {
  // Log de error en consola (en producción podría enviar a un servicio de monitoreo)
  console.error('API Error:', error);
  
  // Aquí podrías añadir lógica para mostrar notificaciones de error
  // o enviar errores a un servicio de monitoreo como Sentry
};

export default secureApi; 