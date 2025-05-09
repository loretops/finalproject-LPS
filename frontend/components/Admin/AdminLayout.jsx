import React from 'react';
import { useRouter } from 'next/router';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

/**
 * Layout específico para las páginas de administración
 * Incluye navegación y estructura común para el área de admin
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido de la página
 * @param {boolean} props.showHeader - Si se debe mostrar el encabezado genérico (false por defecto)
 */
const AdminLayout = ({ children, showHeader = false }) => {
  const router = useRouter();
  
  // Verificar si el usuario está autenticado y tiene rol admin
  // En un sistema real, esto normalmente estaría en un middleware o contexto de autenticación
  React.useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login?redirect=' + encodeURIComponent(router.asPath));
    }
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {showHeader && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Panel de Administración</h1>
            <p className="text-sm text-gray-600">Gestión de proyectos y usuarios</p>
          </div>
        )}
        
        <div className="bg-white shadow-md rounded-lg p-6">
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminLayout; 