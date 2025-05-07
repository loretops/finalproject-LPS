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
  const [isCreatingTestProject, setIsCreatingTestProject] = useState(false);
  
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
      console.log('📥 Cargando proyectos con opciones:', {
        page: pagination.page,
        limit: 10,
        status: statusFilter,
        sortField,
        sortDirection,
      });
      
      const { data, pagination: paginationData } = await projectService.getProjects({
        page: pagination.page,
        limit: 10,
        status: statusFilter,
        sortField,
        sortDirection,
      });
      
      console.log('📋 Proyectos cargados:', data);
      console.log('📊 Información de paginación:', paginationData);
      
      setProjects(data);
      setPagination(paginationData);
      
      // Si no hay proyectos y no hay filtros activos, mostramos un mensaje informativo
      if (data.length === 0 && !statusFilter) {
        setError('No hay proyectos disponibles. Crea tu primer proyecto usando el botón "Nuevo Proyecto".');
      }
    } catch (err) {
      console.error('Error al cargar proyectos:', err);
      setError('Error al cargar la lista de proyectos. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoadingProjects(false);
    }
  };
  
  // Crear un proyecto de prueba
  const createTestProject = async () => {
    setIsCreatingTestProject(true);
    try {
      const testProject = {
        title: `Proyecto Test ${new Date().toLocaleString()}`,
        description: 'Este es un proyecto de prueba creado automáticamente',
        minimum_investment: 5000,
        target_amount: 50000,
        expected_roi: 12,
        status: 'draft',
        property_type: 'residential',
        location: 'Madrid, España'
      };
      
      console.log('🔧 Creando proyecto de prueba:', testProject);
      const createdProject = await projectService.createProject(testProject);
      console.log('✅ Proyecto de prueba creado:', createdProject);
      
      // Agregar el nuevo proyecto a la lista
      setProjects(prev => [createdProject, ...prev]);
      setError(null);
      
      // Actualizar contador en paginación
      setPagination(prev => ({
        ...prev,
        totalItems: prev.totalItems + 1
      }));
    } catch (err) {
      console.error('Error al crear proyecto de prueba:', err);
      setError('Error al crear el proyecto de prueba. Por favor, inténtalo de nuevo.');
    } finally {
      setIsCreatingTestProject(false);
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
      setProjects(projects.filter(project => !projectIds.includes(project.id)));
      setError(null);
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
      const updatedProject = await projectService.publishProject(projectId);
      // Actualizar el proyecto en la lista sin necesidad de recargar todo
      setProjects(projects.map(project => 
        project.id === projectId ? updatedProject : project
      ));
      setError(null);
    } catch (err) {
      console.error('Error al publicar proyecto:', err);
      setError('Hubo un error al publicar el proyecto. Por favor, inténtalo de nuevo.');
    }
  };
  
  // Mostrar mensaje de retroalimentación según estado
  const renderFeedback = () => {
    if (error) {
      return (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          {error}
          {projects.length === 0 && (
            <div className="mt-2">
              <button 
                onClick={createTestProject} 
                disabled={isCreatingTestProject}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-2"
              >
                {isCreatingTestProject ? 'Creando...' : 'Crear proyecto de prueba'}
              </button>
              <button 
                onClick={loadProjects} 
                disabled={isLoadingProjects}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-2"
              >
                {isLoadingProjects ? 'Recargando...' : 'Reintentar carga'}
              </button>
            </div>
          )}
        </div>
      );
    }
    
    if (projects.length === 0 && !isLoadingProjects && !statusFilter) {
      return (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md text-blue-600">
          No hay proyectos disponibles. Crea tu primer proyecto usando el botón "Nuevo Proyecto".
          <div className="mt-2">
            <button 
              onClick={createTestProject} 
              disabled={isCreatingTestProject}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2"
            >
              {isCreatingTestProject ? 'Creando...' : 'Crear proyecto de prueba'}
            </button>
          </div>
        </div>
      );
    }
    
    return null;
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
          <div className="mt-4 sm:mt-0">
            <button 
              onClick={() => router.push('/admin/projects/new')} 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Nuevo Proyecto
            </button>
            {projects.length > 0 && (
              <button 
                onClick={loadProjects} 
                disabled={isLoadingProjects}
                className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {isLoadingProjects ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Actualizando...
                  </span>
                ) : 'Actualizar'}
              </button>
            )}
          </div>
        </div>
        
        {renderFeedback()}
        
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