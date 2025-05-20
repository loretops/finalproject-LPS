import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AdminLayout from '../../../components/Admin/AdminLayout';
import { useAuth } from '../../../context/AuthContext';
import projectService from '../../../services/projectService';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import ProjectsTable from '../../../components/Admin/ProjectsTable';
import PublishProjectModal from '../../../components/Admin/PublishProjectModal';
import { toast } from 'react-hot-toast';

const ProjectsPage = () => {
  const router = useRouter();
  const { user, isLoading, checkRole } = useAuth();
  
  const [projects, setProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  
  // Estados para filtros y paginación
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(10);
  
  // Estados para ordenación
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Estados para el modal de publicación
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  
  // Estado para mantener registro del último proyecto publicado (para animación)
  const [lastPublishedId, setLastPublishedId] = useState(null);
  
  // Renderizar estado con información adicional
  const renderStatusWithInfo = (status) => {
    switch (status) {
      case 'draft':
        return (
          <div className="flex items-center">
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs font-medium">Borrador</span>
            <span className="ml-2 text-xs text-gray-500">(editable)</span>
          </div>
        );
      case 'published':
        return (
          <div className="flex items-center">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">Publicado</span>
            <span className="ml-2 text-xs text-gray-500">(no editable)</span>
          </div>
        );
      case 'closed':
        return (
          <div className="flex items-center">
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs font-medium">Cerrado</span>
          </div>
        );
      default:
        return status;
    }
  };

  // Efecto para verificar autenticación
  useEffect(() => {
    if (!isLoading && (!user || !checkRole(user, ['manager', 'admin']))) {
      router.replace('/login');
    }
  }, [user, isLoading, router, checkRole]);
  
  // Cargar proyectos al inicio
  useEffect(() => {
    const loadProjects = async () => {
      if (isLoading || !user) return;
      
      setIsLoadingProjects(true);
      setError(null);
      
      try {
        const filterStatus = filter !== 'all' ? filter : null;
        const data = await projectService.getProjects({
          status: filterStatus,
          page: currentPage,
          limit: itemsPerPage,
          sortField,
          sortDirection
        });
        
        setProjects(data.data);
        setTotalPages(data.pagination.totalPages);
        setTotalItems(data.pagination.totalItems);
      } catch (error) {
        console.error('Error al cargar proyectos:', error);
        setError('No se pudieron cargar los proyectos. Refresque la página o inténtelo más tarde.');
      } finally {
        setIsLoadingProjects(false);
      }
    };
    
    loadProjects();
  }, [isLoading, user, filter, currentPage, itemsPerPage, sortField, sortDirection]);
  
  // Manejar cambio de filtro
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); // Volver a la primera página al cambiar el filtro
  };
  
  // Manejar cambio de página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Manejar ordenación
  const handleSort = (field) => {
    if (field === sortField) {
      // Si es el mismo campo, cambiar dirección
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Si es campo diferente, establecer el nuevo campo y dirección por defecto asc
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1); // Volver a la primera página al cambiar la ordenación
  };

  // Renderizar el icono de ordenación
  const renderSortIcon = (field) => {
    if (field !== sortField) {
      return (
        <span className="ml-1 text-gray-400">
          <ArrowUpIcon className="h-4 w-4 inline" />
        </span>
      );
    }
    
    return (
      <span className="ml-1 text-primary-600">
        {sortDirection === 'asc' ? (
          <ArrowUpIcon className="h-4 w-4 inline" />
        ) : (
          <ArrowDownIcon className="h-4 w-4 inline" />
        )}
      </span>
    );
  };
  
  // Manejar eliminación de proyecto
  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este proyecto? Esta acción no se puede deshacer.')) {
      return;
    }
    
    setIsDeleting(true);
    setDeleteId(id);
    
    try {
      await projectService.deleteProject(id);
      
      // Actualizar la lista sin necesidad de recargar todos los datos
      setProjects(projects.filter(project => project.id !== id));
      
      // Mostrar mensaje de éxito temporal
      const successMessage = document.createElement('div');
      successMessage.className = 'fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50';
      successMessage.innerHTML = '<strong>¡Éxito!</strong> Proyecto eliminado correctamente.';
      document.body.appendChild(successMessage);
      
      // Eliminar el mensaje después de unos segundos
      setTimeout(() => {
        if (document.body.contains(successMessage)) {
          document.body.removeChild(successMessage);
        }
      }, 3000);
    } catch (error) {
      console.error('Error al eliminar proyectos:', error);
      
      // Si el error es 404, el proyecto ya no existe, así que técnicamente se cumplió el objetivo
      if (error.response?.status === 404) {
        // Actualizar la lista sin necesidad de recargar todos los datos
        setProjects(projects.filter(project => project.id !== id));
        
        // Mostrar mensaje informativo
        const infoMessage = document.createElement('div');
        infoMessage.className = 'fixed bottom-4 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded z-50';
        infoMessage.innerHTML = '<strong>Información:</strong> El proyecto ya ha sido eliminado o no existe.';
        document.body.appendChild(infoMessage);
        
        // Eliminar el mensaje después de unos segundos
        setTimeout(() => {
          if (document.body.contains(infoMessage)) {
            document.body.removeChild(infoMessage);
          }
        }, 3000);
      } else {
        // Para otros errores, mostrar alerta con el mensaje específico
        const errorMessage = error.message || 'No se pudo eliminar el proyecto. Por favor, inténtelo de nuevo.';
        
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
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };
  
  // Manejar publicación de proyecto
  const handlePublishClick = async (projectId) => {
    try {
      // Cargar los detalles completos del proyecto
      const projectDetails = await projectService.getProjectById(projectId);
      setSelectedProject(projectDetails);
      setIsPublishModalOpen(true);
    } catch (err) {
      console.error('Error al cargar detalles del proyecto:', err);
      toast.error('No se pudieron cargar los detalles del proyecto');
    }
  };
  
  const handlePublishConfirm = async () => {
    if (!selectedProject) return;
    
    setIsPublishing(true);
    try {
      console.log('🔍 Iniciando publicación del proyecto:', selectedProject.id);
      const updatedProject = await projectService.publishProject(selectedProject.id);
      console.log('✅ Proyecto publicado exitosamente:', updatedProject);
      
      // Actualizar el proyecto en la lista sin necesidad de recargar todo
      try {
        console.log('🔄 Actualizando lista de proyectos');
        const updatedProjects = projects.map(project => 
          project.id === selectedProject.id ? updatedProject : project
        );
        setProjects(updatedProjects);
        console.log('✅ Lista de proyectos actualizada');
      } catch (updateError) {
        console.error('❌ Error al actualizar la lista de proyectos:', updateError);
        // No fallar completamente si solo hay un error en la actualización de la UI
      }
      
      // Establecer el ID del proyecto publicado para la animación
      try {
        setLastPublishedId(selectedProject.id);
      } catch (animationError) {
        console.error('❌ Error al establecer ID para animación:', animationError);
        // No fallar por problemas con la animación
      }
      
      // Cerrar el modal y limpiar estados
      try {
        setIsPublishModalOpen(false);
        setSelectedProject(null);
      } catch (stateError) {
        console.error('❌ Error al cerrar modal y limpiar estado:', stateError);
        // Intentar forzar el cierre del modal en caso de error
        setTimeout(() => {
          setIsPublishModalOpen(false);
          setSelectedProject(null);
        }, 500);
      }
      
      // Mostrar mensaje de éxito
      toast.success('Proyecto publicado con éxito');
      setError(null);
    } catch (err) {
      console.error('❌ Error detallado al publicar proyecto:', err);
      
      // Extraer un mensaje más específico del error
      let errorMessage = 'Error desconocido';
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      console.error('❌ Mensaje de error a mostrar:', errorMessage);
      toast.error(`Error: ${errorMessage}`);
      setError(`Hubo un error al publicar el proyecto: ${errorMessage}`);
      
      // Dejamos el modal abierto para que el usuario vea el error
    } finally {
      setIsPublishing(false);
    }
  };
  
  // Si está cargando la autenticación, mostrar indicador
  if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto"></div>
            <p className="mt-3 text-gray-600">Cargando...</p>
          </div>
        </div>
    );
  }
  
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="border-b border-gray-200 pb-5 mb-5">
          <h1 className="text-2xl font-bold text-gray-900">Administración de Proyectos</h1>
          <p className="mt-2 text-sm text-gray-600">
              Administre los proyectos de inversión disponibles para los socios.
            </p>
          </div>
          
        <div className="flex justify-end">
          <Button
            variant="primary"
            onClick={() => router.push('/admin/projects/new')}
            >
              Nuevo Proyecto
          </Button>
        </div>
        
        {/* Filtros */}
        <Card>
            <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === 'all' ? 'primary' : 'outline'}
                onClick={() => handleFilterChange('all')}
              size="sm"
              >
                Todos
            </Button>
            <Button
              variant={filter === 'draft' ? 'primary' : 'outline'}
                onClick={() => handleFilterChange('draft')}
              size="sm"
              >
                Borradores
            </Button>
            <Button
              variant={filter === 'published' ? 'primary' : 'outline'}
                onClick={() => handleFilterChange('published')}
              size="sm"
              >
                Publicados
            </Button>
            <Button
              variant={filter === 'closed' ? 'primary' : 'outline'}
                onClick={() => handleFilterChange('closed')}
              size="sm"
              >
                Cerrados
            </Button>
          </div>
        </Card>
        
        {/* Mensaje de error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
            {error}
          </div>
        )}
        
        {/* Tabla de proyectos */}
        <Card>
          {isLoadingProjects ? (
            <div className="px-4 py-5 sm:p-6 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-700 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Cargando proyectos...</p>
            </div>
          ) : projects.length > 0 ? (
            <ProjectsTable 
              projects={projects}
              onDelete={handleDelete}
              onPublish={handlePublishClick}
              pagination={{
                page: currentPage,
                totalPages: totalPages,
                totalItems: totalItems
              }}
              onPageChange={handlePageChange}
              statusFilter={filter}
              onStatusFilterChange={handleFilterChange}
              sortField={sortField}
              sortDirection={sortDirection}
              onSortChange={handleSort}
              lastPublishedId={lastPublishedId}
            />
          ) : (
            <div className="px-4 py-5 sm:p-6 text-center">
              <p className="text-gray-500 mb-4">No hay proyectos que coincidan con los filtros seleccionados.</p>
              <Button 
                variant="outline"
                onClick={() => handleFilterChange('all')}
              >
                Ver todos los proyectos
              </Button>
            </div>
          )}
          
          {/* Paginación */}
          {totalPages > 1 && (
            <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </Button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a{' '}
                    <span className="font-medium">
                      {Math.min(currentPage * itemsPerPage, totalItems)}
                    </span>{' '}
                    de <span className="font-medium">{totalItems}</span> resultados
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="rounded-l-md"
                    >
                      <span className="sr-only">Anterior</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </Button>
                    
                    {[...Array(totalPages).keys()].map((page) => (
                      <Button
                        key={page + 1}
                        variant={currentPage === page + 1 ? "primary" : "outline"}
                        onClick={() => handlePageChange(page + 1)}
                      >
                        {page + 1}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="rounded-r-md"
                    >
                      <span className="sr-only">Siguiente</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
      
      {/* Modal de publicación de proyecto */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-black/50"
              onClick={() => {
                setIsPublishModalOpen(false);
                setSelectedProject(null);
              }}
              aria-hidden="true"
            ></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Publicar Proyecto
                    </h3>
                    
                    {error && (
                      <div className="mt-2 p-3 bg-red-100 border-l-4 border-red-500 rounded text-red-700 text-sm">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <span>{error}</span>
                        </div>
                        {(error.includes('descripción') || error.includes('documento legal')) && (
                          <div className="mt-2 ml-7">
                            <p>Para solucionar este problema:</p>
                            <ul className="list-disc ml-5 mt-1">
                              {error.includes('descripción') && (
                                <li className="mt-1">
                                  <a href={`/admin/projects/${selectedProject?.id}/edit`} className="text-blue-700 underline hover:text-blue-900">Editar la descripción</a> para que tenga al menos 50 caracteres
                                </li>
                              )}
                              {error.includes('documento legal') && (
                                <li className="mt-1">
                                  <a href={`/admin/projects/${selectedProject?.id}/documents/add`} className="text-blue-700 underline hover:text-blue-900">Añadir un documento legal</a> al proyecto
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">
                        ¿Estás seguro de que deseas publicar este proyecto? 
                        Una vez publicado, estará visible para todos los socios.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => {
                    try {
                      console.log("🚀 Iniciando publicación directa");
                      setIsPublishing(true);
                      
                      // Llamada directa a la API sin usar el modal complejo
                      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/projects/${selectedProject.id}/publish`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                        },
                        body: JSON.stringify({})
                      })
                      .then(response => {
                        console.log("✅ Respuesta recibida:", response.status);
                        if (!response.ok) {
                          // Intentar obtener el mensaje de error detallado del backend
                          return response.json().then(errorData => {
                            console.log("❌ Datos de error recibidos:", errorData);
                            throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
                          }).catch(jsonError => {
                            // Si no se puede parsear como JSON, usar el error original
                            throw new Error(`Error ${response.status}: ${response.statusText}`);
                          });
                        }
                        return response.json();
                      })
                      .then(data => {
                        console.log("✅ Proyecto publicado con éxito:", data);
                        // Actualizar UI
                        const updatedProjects = projects.map(project => 
                          project.id === selectedProject.id ? {...project, status: 'published', draft: false} : project
                        );
                        setProjects(updatedProjects);
                        toast.success('Proyecto publicado con éxito');
                        setIsPublishModalOpen(false);
                      })
                      .catch(error => {
                        console.error("❌ Error en publicación directa:", error);
                        setError(`Error al publicar: ${error.message}`);
                      })
                      .finally(() => {
                        setIsPublishing(false);
                      });
                    } catch (error) {
                      console.error("❌ Error general en proceso de publicación:", error);
                      setError(`Error inesperado: ${error.message}`);
                      setIsPublishing(false);
                    }
                  }}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  disabled={isPublishing}
                >
                  {isPublishing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Publicando...
                    </>
                  ) : (
                    'Publicar Proyecto'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsPublishModalOpen(false);
                    setSelectedProject(null);
                  }}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal original (lo dejamos comentado por ahora) */}
      {/* <PublishProjectModal
        project={selectedProject}
        isOpen={isPublishModalOpen}
        onClose={() => {
          setIsPublishModalOpen(false);
          setSelectedProject(null);
        }}
        onPublish={handlePublishConfirm}
        isPublishing={isPublishing}
      /> */}
    </AdminLayout>
  );
};

export default ProjectsPage; 