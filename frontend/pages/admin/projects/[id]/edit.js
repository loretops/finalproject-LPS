import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../../components/layout/Layout';
import ProjectForm from '../../../../components/Admin/ProjectForm';
import { useAuth } from '../../../../context/AuthContext';
import projectService from '../../../../services/projectService';

/**
 * Página para editar un proyecto existente
 */
const EditProjectPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user, isLoading, checkRole } = useAuth();
  
  const [project, setProject] = useState(null);
  const [isLoadingProject, setIsLoadingProject] = useState(true);
  const [error, setError] = useState(null);
  const [warningMessage, setWarningMessage] = useState(null);
  
  // Redireccionar si el usuario no tiene permisos
  useEffect(() => {
    if (!isLoading && (!user || !checkRole(user, ['manager', 'admin']))) {
      router.replace('/login');
    }
  }, [user, isLoading, router, checkRole]);
  
  // Cargar datos del proyecto
  useEffect(() => {
    const loadProject = async () => {
      if (!id) return;
      
      setIsLoadingProject(true);
      setError(null);
      setWarningMessage(null);
      
      try {
        const data = await projectService.getProjectById(id);
        setProject(data);
        
        // Verificar si el proyecto está publicado y mostrar advertencia
        if (data.status === 'published') {
          setWarningMessage('Este proyecto ya está publicado. Los proyectos publicados no pueden ser modificados según la política de la plataforma.');
        }
      } catch (err) {
        console.error('Error al cargar proyecto:', err);
        setError('No se pudo cargar el proyecto. Por favor, inténtelo de nuevo.');
      } finally {
        setIsLoadingProject(false);
      }
    };
    
    loadProject();
  }, [id]);
  
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
          <h1 className="text-2xl font-bold text-gray-900">Editar Proyecto</h1>
          <p className="mt-2 text-sm text-gray-600">
            Modifique los detalles del proyecto según sea necesario.
          </p>
        </div>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
            {error}
            <button 
              onClick={() => router.push('/admin/projects')}
              className="ml-3 underline hover:text-red-800"
            >
              Volver al listado
            </button>
          </div>
        )}
        
        {warningMessage && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-700">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Advertencia</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  {warningMessage}
                </div>
                <div className="mt-4">
                  <div className="-mx-2 -my-1.5 flex">
                    <button
                      type="button"
                      onClick={() => router.push(`/admin/projects/${id}`)}
                      className="px-2 py-1.5 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      Ver detalles
                    </button>
                    <button
                      type="button"
                      onClick={() => router.push('/admin/projects')}
                      className="ml-3 px-2 py-1.5 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      Volver al listado
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {isLoadingProject ? (
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          project && <ProjectForm mode="edit" initialData={project} />
        )}
      </div>
    </Layout>
  );
};

export default EditProjectPage; 