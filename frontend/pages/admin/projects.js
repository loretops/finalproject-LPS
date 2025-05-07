import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import ProjectsTable from '../../components/Admin/ProjectsTable';
import { useAuth } from '../../context/AuthContext';
import projectService from '../../services/projectService';

/**
 * Página de administración para gestionar proyectos de inversión
 */
const ProjectsAdminPage = () => {
  const router = useRouter();
  const { user, isLoading, checkRole } = useAuth();
  
  // Estados para los proyectos y filtros
  const [projects, setProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para paginación y filtros
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalItems: 0,
  });
  const [statusFilter, setStatusFilter] = useState(null);
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Cargar proyectos
  const loadProjects = async () => {
    setIsLoadingProjects(true);
    setError(null);
    
    try {
      const { data, pagination: paginationData } = await projectService.getProjects({
        page: pagination.page,
        limit: 10,
        status: statusFilter,
        sortField,
        sortDirection,
      });
      
      setProjects(data);
      setPagination(paginationData);
    } catch (err) {
      console.error('Error al cargar proyectos:', err);
      setError('Error al cargar la lista de proyectos. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoadingProjects(false);
    }
  };
  
  // Cargar proyectos al montar el componente y cuando cambien los filtros
  useEffect(() => {
    if (user && checkRole(user, ['manager', 'admin'])) {
      loadProjects();
    }
  }, [user, pagination.page, statusFilter, sortField, sortDirection]);
  
  // Redirigir a login si no está autenticado o no tiene permisos
  useEffect(() => {
    if (!isLoading && (!user || !checkRole(user, ['manager', 'admin']))) {
      router.replace('/login');
    }
  }, [user, isLoading]);
  
  // Funciones para manejar las acciones en la tabla
  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, page }));
  };
  
  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    setPagination(prev => ({ ...prev, page: 1 })); // Resetear a primera página al cambiar filtro
  };
  
  const handleSortChange = (field, direction) => {
    setSortField(field);
    setSortDirection(direction);
  };
  
  const handleDelete = async (projectIds) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar ${projectIds.length > 1 ? 'estos proyectos' : 'este proyecto'}?`)) {
      return;
    }
    
    try {
      await Promise.all(projectIds.map(id => projectService.deleteProject(id)));
      loadProjects(); // Recargar después de eliminar
    } catch (err) {
      console.error('Error al eliminar proyectos:', err);
      setError('Hubo un error al eliminar los proyectos. Por favor, inténtalo de nuevo.');
    }
  };
  
  const handlePublish = async (projectId) => {
    if (!confirm('¿Estás seguro de que deseas publicar este proyecto? Una vez publicado, será visible para todos los socios.')) {
      return;
    }
    
    try {
      await projectService.publishProject(projectId);
      loadProjects(); // Recargar después de publicar
    } catch (err) {
      console.error('Error al publicar proyecto:', err);
      setError('Hubo un error al publicar el proyecto. Por favor, inténtalo de nuevo.');
    }
  };
  
  // Si está cargando autenticación, mostrar carga
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
  
  // Si no tiene permisos, esto se manejará en el efecto que redirige a login
  
  return (
    <Layout>
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Administración de Proyectos</h1>
        </div>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
            {error}
          </div>
        )}
        
        {isLoadingProjects ? (
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
          <ProjectsTable 
            projects={projects}
            onDelete={handleDelete}
            onPublish={handlePublish}
            pagination={pagination}
            onPageChange={handlePageChange}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusFilterChange}
            sortField={sortField}
            sortDirection={sortDirection}
            onSortChange={handleSortChange}
          />
        )}
      </div>
    </Layout>
  );
};

export default ProjectsAdminPage; 