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
      const updatedProject = await projectService.publishProject(selectedProject.id);
      
      // Actualizar el proyecto en la lista sin necesidad de recargar todo
      setProjects(projects.map(project => 
        project.id === selectedProject.id ? updatedProject : project
      ));
      
      // Establecer el ID del proyecto publicado para la animación
      setLastPublishedId(selectedProject.id);
      
      // Cerrar el modal y limpiar estados
      setIsPublishModalOpen(false);
      setSelectedProject(null);
      
      // Mostrar mensaje de éxito
      toast.success('Proyecto publicado con éxito');
      setError(null);
    } catch (err) {
      console.error('Error al publicar proyecto:', err);
      toast.error('Error al publicar el proyecto');
      setError('Hubo un error al publicar el proyecto. Por favor, inténtalo de nuevo.');
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
      <PublishProjectModal
        project={selectedProject}
        isOpen={isPublishModalOpen}
        onClose={() => {
          setIsPublishModalOpen(false);
          setSelectedProject(null);
        }}
        onPublish={handlePublishConfirm}
        isPublishing={isPublishing}
      />
    </AdminLayout>
  );
};

export default ProjectsPage; 