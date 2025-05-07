import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../../components/layout/Layout';
import { useAuth } from '../../../../context/AuthContext';
import projectService from '../../../../services/projectService';
import { formatCurrency, formatDate } from '../../../../utils/formatters';
import { PencilIcon, ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline';

// Mapa de tipos de propiedad
const PROPERTY_TYPES = {
  'residential': 'Residencial',
  'commercial': 'Comercial',
  'industrial': 'Industrial',
  'land': 'Terreno',
  'mixed': 'Uso mixto',
};

// Mapa de estados
const STATUS_LABELS = {
  'draft': 'Borrador',
  'published': 'Publicado',
  'closed': 'Cerrado',
};

// Clases CSS para estados
const STATUS_CLASSES = {
  'draft': 'bg-gray-100 text-gray-800',
  'published': 'bg-green-100 text-green-800',
  'closed': 'bg-red-100 text-red-800',
};

/**
 * Página para ver los detalles de un proyecto
 */
const ProjectDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user, isLoading, checkRole } = useAuth();
  
  const [project, setProject] = useState(null);
  const [isLoadingProject, setIsLoadingProject] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  
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
      
      try {
        const data = await projectService.getProjectById(id);
        setProject(data);
      } catch (err) {
        console.error('Error al cargar proyecto:', err);
        setError('No se pudo cargar el proyecto. Por favor, inténtelo de nuevo.');
      } finally {
        setIsLoadingProject(false);
      }
    };
    
    loadProject();
  }, [id]);
  
  // Manejar eliminación del proyecto
  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de que deseas eliminar este proyecto? Esta acción no se puede deshacer.')) {
      return;
    }
    
    setIsDeleting(true);
    
    try {
      await projectService.deleteProject(id);
      
      // Mostrar mensaje de éxito temporal antes de redirigir
      const successMessage = document.createElement('div');
      successMessage.className = 'fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50';
      successMessage.innerHTML = '<strong>¡Éxito!</strong> Proyecto eliminado correctamente.';
      document.body.appendChild(successMessage);
      
      // Redirigir después de un breve retraso para que el usuario vea el mensaje
      setTimeout(() => {
        router.push('/admin/projects');
      }, 1000);
    } catch (err) {
      console.error('Error al eliminar proyecto:', err);
      
      // Si el error es 404, el proyecto ya no existe, así que podemos redirigir
      if (err.response?.status === 404) {
        // Mostrar mensaje informativo
        const infoMessage = document.createElement('div');
        infoMessage.className = 'fixed bottom-4 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded z-50';
        infoMessage.innerHTML = '<strong>Información:</strong> El proyecto ya ha sido eliminado o no existe.';
        document.body.appendChild(infoMessage);
        
        // Redirigir después de un breve retraso
        setTimeout(() => {
          router.push('/admin/projects');
        }, 1500);
      } else {
        // Para otros errores, mostrar en la interfaz
        const errorMessage = err.message || 'No se pudo eliminar el proyecto. Por favor, inténtelo de nuevo.';
        setError(errorMessage);
        setIsDeleting(false);
        
        // Mostrar también un toast con el error
        const alertMessage = document.createElement('div');
        alertMessage.className = 'fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50';
        alertMessage.innerHTML = `<strong>Error:</strong> ${errorMessage}`;
        document.body.appendChild(alertMessage);
        
        // Eliminar el mensaje después de unos segundos
        setTimeout(() => {
          if (document.body.contains(alertMessage)) {
            document.body.removeChild(alertMessage);
          }
        }, 5000);
      }
    }
  };
  
  // Manejar publicación del proyecto
  const handlePublish = async () => {
    if (!confirm('¿Estás seguro de que deseas publicar este proyecto? Una vez publicado, será visible para todos los socios.')) {
      return;
    }
    
    setIsPublishing(true);
    
    try {
      const updatedProject = await projectService.publishProject(id);
      setProject(updatedProject);
      setIsPublishing(false);
    } catch (err) {
      console.error('Error al publicar proyecto:', err);
      setError('No se pudo publicar el proyecto. Por favor, inténtelo de nuevo.');
      setIsPublishing(false);
    }
  };
  
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
        {/* Encabezado con botones de acción */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Detalles del Proyecto</h1>
            <p className="mt-1 text-sm text-gray-600">
              Visualización completa de todos los detalles del proyecto.
            </p>
          </div>
          
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <Link 
              href="/admin/projects"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Volver al Listado
            </Link>
            
            <Link
              href={`/admin/projects/${id}/edit`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <PencilIcon className="h-5 w-5 mr-2 text-gray-500" aria-hidden="true" />
              Editar
            </Link>
            
            {project && project.status === 'draft' && (
              <button
                onClick={handlePublish}
                disabled={isPublishing}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {isPublishing ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publicando...
                  </span>
                ) : (
                  <>
                    <ArrowPathIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                    Publicar
                  </>
                )}
              </button>
            )}
            
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {isDeleting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Eliminando...
                </span>
              ) : (
                <>
                  <TrashIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                  Eliminar
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Mensajes de error */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
            {error}
          </div>
        )}
        
        {/* Contenido del proyecto */}
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
        ) : project ? (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              {/* Encabezado del proyecto */}
              <div className="pb-5 border-b border-gray-200 mb-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
                  {project.status && (
                    <span className={`inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium ${STATUS_CLASSES[project.status] || ''}`}>
                      {STATUS_LABELS[project.status] || project.status}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-gray-600">{project.description}</p>
              </div>
              
              {/* Información principal */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                {/* Inversión Mínima */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Inversión Mínima</h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{formatCurrency(project.minimum_investment)}</p>
                </div>
                
                {/* Monto Objetivo */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Monto Objetivo</h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{formatCurrency(project.target_amount)}</p>
                </div>
                
                {/* ROI Esperado */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">ROI Esperado</h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{project.expected_roi}%</p>
                </div>
              </div>
              
              {/* Información adicional */}
              <div className="border-t border-gray-200 pt-5">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 mt-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Tipo de Propiedad</dt>
                    <dd className="mt-1 text-sm text-gray-900">{PROPERTY_TYPES[project.property_type] || project.property_type}</dd>
                  </div>
                  
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Ubicación</dt>
                    <dd className="mt-1 text-sm text-gray-900">{project.location}</dd>
                  </div>
                  
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Fecha de Creación</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatDate(project.created_at)}</dd>
                  </div>
                  
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Última Actualización</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatDate(project.updated_at)}</dd>
                  </div>
                </dl>
              </div>
              
              {/* Sección de documentos (en desarrollo) */}
              <div className="border-t border-gray-200 pt-5 mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Documentos</h3>
                <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                  La gestión de documentos estará disponible próximamente.
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-sm rounded-lg p-6 text-center text-gray-500">
            No se encontró el proyecto solicitado.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProjectDetailPage; 