import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../components/layout/Layout';
import { useAuth } from '../../../context/AuthContext';
import projectService from '../../../services/projectService';
import { formatCurrency, formatDate } from '../../../utils/formatters';

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
          limit: itemsPerPage
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
  }, [isLoading, user, filter, currentPage, itemsPerPage]);
  
  // Manejar cambio de filtro
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); // Volver a la primera página al cambiar el filtro
  };
  
  // Manejar cambio de página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Proyectos de Inversión</h1>
            <p className="mt-1 text-sm text-gray-600">
              Administre los proyectos de inversión disponibles para los socios.
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Nuevo Proyecto
            </Link>
          </div>
        </div>
        
        {/* Filtros */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  filter === 'all' 
                    ? 'bg-primary-100 text-primary-800' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => handleFilterChange('draft')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  filter === 'draft' 
                    ? 'bg-primary-100 text-primary-800' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Borradores
              </button>
              <button
                onClick={() => handleFilterChange('published')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  filter === 'published' 
                    ? 'bg-primary-100 text-primary-800' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Publicados
              </button>
              <button
                onClick={() => handleFilterChange('closed')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  filter === 'closed' 
                    ? 'bg-primary-100 text-primary-800' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Cerrados
              </button>
            </div>
          </div>
        </div>
        
        {/* Mensaje de error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
            {error}
          </div>
        )}
        
        {/* Tabla de proyectos */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {isLoadingProjects ? (
            <div className="px-4 py-5 sm:p-6 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-700 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Cargando proyectos...</p>
            </div>
          ) : projects.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Título
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Inversión Mínima
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Monto Objetivo
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ROI (%)
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Creado
                    </th>
                    <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50">
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{project.title}</div>
                        <div className="text-xs text-gray-500">{project.location}</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatCurrency(project.minimum_investment)}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatCurrency(project.target_amount)}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{project.expected_roi}%</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        {renderStatusWithInfo(project.status)}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(project.created_at)}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/admin/projects/${project.id}`}
                          className="text-primary-600 hover:text-primary-900 mr-4"
                        >
                          Ver
                        </Link>
                        
                        {project.status === 'draft' ? (
                          <Link
                            href={`/admin/projects/${project.id}/edit`}
                            className="text-primary-600 hover:text-primary-900 mr-4"
                          >
                            Editar
                          </Link>
                        ) : (
                          <span className="text-gray-400 cursor-not-allowed mr-4" title="Los proyectos publicados no pueden ser editados">
                            Editar
                          </span>
                        )}
                        
                        <button
                          onClick={() => handleDelete(project.id)}
                          disabled={isDeleting && deleteId === project.id}
                          className={`${
                            isDeleting && deleteId === project.id
                              ? 'text-gray-400 cursor-wait'
                              : 'text-red-600 hover:text-red-900 cursor-pointer'
                          }`}
                        >
                          {isDeleting && deleteId === project.id ? 'Eliminando...' : 'Eliminar'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-4 py-5 sm:p-6 text-center">
              <p className="text-gray-500 mb-4">No hay proyectos que coincidan con los filtros seleccionados.</p>
              <button
                onClick={() => handleFilterChange('all')}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Ver todos los proyectos
              </button>
            </div>
          )}
          
          {/* Paginación */}
          {totalPages > 1 && (
            <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Anterior
                </button>
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Siguiente
                </button>
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
                    <button
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === 1
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="sr-only">Anterior</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {[...Array(totalPages).keys()].map((page) => (
                      <button
                        key={page + 1}
                        onClick={() => handlePageChange(page + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === page + 1
                            ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {page + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === totalPages
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="sr-only">Siguiente</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProjectsPage; 