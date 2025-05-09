import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

/**
 * HOC para proteger rutas basado en roles de usuario
 * @param {React.ComponentType} Component - Componente a proteger
 * @param {Array|string} allowedRoles - Rol o roles permitidos para acceder a la ruta
 * @returns {React.ComponentType} Componente protegido
 */
const withAuth = (Component, allowedRoles = []) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const { user, isAuthenticated, loading } = useAuth();
    
    useEffect(() => {
      // Si no está cargando y no está autenticado, redirigir a login
      if (!loading && !isAuthenticated) {
        router.push('/login?redirect=' + encodeURIComponent(router.asPath));
        return;
      }
      
      // Si está autenticado pero no tiene los roles permitidos, redirigir a dashboard
      if (!loading && isAuthenticated && allowedRoles.length > 0) {
        const hasRequiredRole = allowedRoles.includes(user?.role);
        
        if (!hasRequiredRole) {
          console.warn('User does not have the required role to access this page');
          router.push('/dashboard');
        }
      }
    }, [router, isAuthenticated, loading, user]);
    
    // Mientras verifica la autenticación, mostrar estado de carga
    if (loading || !isAuthenticated) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      );
    }
    
    // Si el usuario no tiene el rol requerido, no mostrar nada mientras redirige
    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      );
    }
    
    // Si está autenticado y tiene los roles permitidos, mostrar el componente
    return <Component {...props} />;
  };
  
  // Copiar el nombre para mejor depuración
  AuthenticatedComponent.displayName = `withAuth(${Component.displayName || Component.name || 'Component'})`;
  
  return AuthenticatedComponent;
};

export default withAuth; 