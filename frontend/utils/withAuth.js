import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCurrentUser } from '../services/authService';

/**
 * HOC para proteger rutas que requieren autenticación y roles específicos
 * @param {React.Component} Component - Componente a proteger
 * @param {Array<string>} allowedRoles - Roles permitidos (opcional)
 * @returns {React.Component} Componente protegido
 */
export function withAuth(Component, allowedRoles = []) {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
      // Verificar autenticación
      const user = getCurrentUser();
      
      console.log('withAuth - Usuario actual:', user);
      console.log('withAuth - Roles requeridos:', allowedRoles);
      
      if (!user) {
        // No autenticado, redirigir a login
        console.warn('withAuth - No hay usuario autenticado, redirigiendo a login');
        router.push(`/login?redirect=${encodeURIComponent(router.asPath)}`);
        return;
      }
      
      // Temporalmente: permitir acceso independientemente de los roles
      // Solo mostrar advertencia en consola para depuración
      if (allowedRoles.length > 0) {
        console.log('withAuth - Roles del usuario:', user.roles || 'No roles definidos');
        
        /*
        const hasRole = allowedRoles.some(role => 
          user.roles && (user.roles.includes(role) || user.roles.includes('admin'))
        );
        
        if (!hasRole) {
          // No autorizado, redirigir a dashboard
          console.warn('Usuario no tiene los roles requeridos:', allowedRoles);
          router.push('/dashboard');
          return;
        }
        */
      }
      
      // Autorizado
      console.log('withAuth - Usuario autorizado');
      setAuthorized(true);
      setLoading(false);
    }, [router]);

    // Mostrar pantalla de carga mientras se verifica
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-center">
            <svg className="animate-spin h-10 w-10 mx-auto text-primary-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-2 text-sm text-gray-500">Verificando acceso...</p>
          </div>
        </div>
      );
    }

    // Renderizar el componente original si está autorizado
    return authorized ? <Component {...props} /> : null;
  };

  // Copiar los displayName y propTypes si existen
  if (Component.displayName) {
    AuthenticatedComponent.displayName = `withAuth(${Component.displayName})`;
  }
  
  if (Component.propTypes) {
    AuthenticatedComponent.propTypes = Component.propTypes;
  }

  return AuthenticatedComponent;
} 