import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout/Layout';
import ProjectForm from '../../../components/Admin/ProjectForm';
import { useAuth } from '../../../context/AuthContext';

/**
 * Página para crear un nuevo proyecto de inversión
 */
const NewProjectPage = () => {
  const router = useRouter();
  const { user, isLoading, checkRole } = useAuth();
  
  // Redireccionar si el usuario no tiene permisos
  React.useEffect(() => {
    if (!isLoading && (!user || !checkRole(user, ['manager', 'admin']))) {
      router.replace('/login');
    }
  }, [user, isLoading, router, checkRole]);
  
  // Si está cargando la autenticación, mostrar indicador
  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto"></div>
            <p className="mt-3 text-gray-600">Cargando...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Crear Nuevo Proyecto</h1>
          <p className="mt-2 text-sm text-gray-600">
            Complete el formulario para crear un nuevo proyecto de inversión.
          </p>
        </div>
        
        <ProjectForm mode="create" />
      </div>
    </Layout>
  );
};

export default NewProjectPage; 