import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ProjectFilters from '../../components/projects/filters/ProjectFilters';
import ProjectSorting from '../../components/projects/filters/ProjectSorting';
import ProjectCard from '../../components/projects/ProjectCard';
import publicProjectService from '../../services/publicProjectService';
import interestService from '../../services/interestService';
import { useAuth } from '../../context/AuthContext';
import withAuth from '../../components/Auth/withAuth';

// Número de proyectos por página
const ITEMS_PER_PAGE = 9;

/**
 * Página de listado de proyectos de inversión para socios
 */
const ProjectsListPage = () => {
  const router = useRouter();
  const { query } = router;
  const { user, isAuthenticated } = useAuth();
  
  // Referencia para evitar múltiples solicitudes
  const isFetchingRef = useRef(false);

  // Estado para los proyectos
  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estado para manejar los filtros y ordenación
  const [filters, setFilters] = useState({});
  const [sortField, setSortField] = useState('publishedAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Estado para intereses del usuario
  const [interestProjectIds, setInterestProjectIds] = useState(new Set());
  const [isLoadingInterests, setIsLoadingInterests] = useState(true);
  
  // Extraer listas únicas de tipos de propiedad y ubicaciones
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  
  // Efecto para cargar parámetros desde la URL al iniciar
  useEffect(() => {
    if (router.isReady) {
      // Recuperar filtros de la URL
      const { 
        propertyType, 
        location, 
        minRoi, 
        maxInvestment,
        sort,
        direction,
        page
      } = query;
      
      // Actualizar estado de filtros
      const urlFilters = {};
      if (propertyType) urlFilters.propertyType = propertyType;
      if (location) urlFilters.location = location;
      if (minRoi) urlFilters.minRoi = Number(minRoi);
      if (maxInvestment) urlFilters.maxInvestment = Number(maxInvestment);
      
      setFilters(urlFilters);
      
      // Actualizar estado de ordenación
      if (sort) setSortField(sort);
      if (direction) setSortDirection(direction);
      
      // Actualizar página actual
      if (page) setCurrentPage(Number(page));
    }
  }, [router.isReady, query]);
  
  // Efecto para cargar proyectos cuando cambian los filtros, ordenación o página
  useEffect(() => {
    const fetchProjects = async () => {
      // Evitar múltiples solicitudes simultáneas
      if (isFetchingRef.current) return;
      
      try {
        isFetchingRef.current = true;
        setLoading(true);
        setError(null);
        
        // Preparar opciones para la API
        const options = {
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          sort_field: sortField,
          sort_direction: sortDirection,
          ...filters
        };
        
        // Llamar a la API
        const result = await publicProjectService.getPublishedProjects(options);
        
        if (result && result.data) {
          setProjects(result.data);
          // Corregir acceso a totalItems en pagination, no en meta
          setTotalProjects(result.pagination ? result.pagination.totalItems : 0);
          
          // Extraer listas únicas si es la primera página
          if (currentPage === 1) {
            // Estas listas se usarían para popular los filtros
            // En una implementación real se obtendrían de un endpoint específico
            const types = [...new Set(result.data.filter(p => p.property_type).map(p => p.property_type))];
            const locs = [...new Set(result.data.filter(p => p.location).map(p => p.location))];
            
            setPropertyTypes(types);
            setLocations(locs);
          }
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message || 'Error al cargar los proyectos');
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }
    };
    
    // Solo hacer la petición si el router está listo y hay un usuario autenticado
    if (router.isReady && user && !isFetchingRef.current) {
      fetchProjects();
    }
  }, [router.isReady, user, filters, sortField, sortDirection, currentPage]);
  
  // Efecto para cargar intereses del usuario al iniciar
  useEffect(() => {
    const loadUserInterests = async () => {
      if (!user || !isAuthenticated) return;
      
      try {
        setIsLoadingInterests(true);
        // Utilizamos el nuevo servicio para obtener todos los IDs de proyectos marcados como interés
        const projectIds = await interestService.getUserInterestProjectIds();
        setInterestProjectIds(projectIds);
      } catch (error) {
        console.error('Error al cargar intereses del usuario:', error);
      } finally {
        setIsLoadingInterests(false);
      }
    };
    
    loadUserInterests();
  }, [user, isAuthenticated]);
  
  // Efecto separado para actualizar la URL cuando cambian los filtros
  useEffect(() => {
    if (!router.isReady) return;
    
    // Actualizar URL con los filtros actuales (sin recargar la página)
    const queryParams = new URLSearchParams();
    if (filters.propertyType) queryParams.set('propertyType', filters.propertyType);
    if (filters.location) queryParams.set('location', filters.location);
    if (filters.minRoi) queryParams.set('minRoi', filters.minRoi);
    if (filters.maxInvestment) queryParams.set('maxInvestment', filters.maxInvestment);
    if (sortField) queryParams.set('sort', sortField);
    if (sortDirection) queryParams.set('direction', sortDirection);
    if (currentPage > 1) queryParams.set('page', currentPage);
    
    // Verificar si los query params han cambiado realmente
    const newQueryString = queryParams.toString();
    const currentQueryString = router.asPath.split('?')[1] || '';
    
    if (newQueryString !== currentQueryString) {
      router.push(`/projects${newQueryString ? `?${newQueryString}` : ''}`, undefined, { shallow: true });
    }
  }, [router.isReady, filters, sortField, sortDirection, currentPage]);
  
  // Manejar cambio de filtros
  const handleFilterChange = (newFilters) => {
    // Volver a la primera página al cambiar filtros
    setCurrentPage(1);
    setFilters(newFilters);
  };
  
  // Manejar cambio de ordenación
  const handleSortChange = (field, direction) => {
    setSortField(field);
    setSortDirection(direction);
  };
  
  // Manejar cambio de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Hacer scroll al inicio de la lista
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Manejar cambio de estado de interés
  const handleInterestChange = (projectId, newState) => {
    // Actualizar el conjunto local de IDs de proyectos con interés
    const newInterestProjectIds = new Set(interestProjectIds);
    
    if (newState) {
      newInterestProjectIds.add(projectId);
    } else {
      newInterestProjectIds.delete(projectId);
    }
    
    setInterestProjectIds(newInterestProjectIds);
  };
  
  // Calcular número total de páginas
  const totalPages = Math.ceil(totalProjects / ITEMS_PER_PAGE);
  
  // Construir array de números de página para paginación
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Mostrar todas las páginas si son menos que el máximo
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Mostrar un subconjunto de páginas
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = startPage + maxPagesToShow - 1;
      
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
      
      // Añadir primera página y elipsis si es necesario
      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) pageNumbers.push('...');
      }
      
      // Añadir páginas intermedias
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Añadir última página y elipsis si es necesario
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <>
      <Head>
        <title>Proyectos de Inversión | COOPCO</title>
        <meta name="description" content="Explora todas las oportunidades de inversión inmobiliaria disponibles para los socios" />
      </Head>

      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Oportunidades de Inversión</h1>
            <p className="text-lg text-gray-600">
              Explora las oportunidades de inversión inmobiliaria disponibles exclusivamente para socios.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar con filtros */}
            <div className="lg:col-span-1">
              <ProjectFilters 
                filters={filters}
                onFilterChange={handleFilterChange}
                propertyTypes={propertyTypes}
                locations={locations}
                compact={false}
                data-testid="project-filters"
              />
            </div>
            
            {/* Contenido principal */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-500">
                    Mostrando {Math.min(ITEMS_PER_PAGE * (currentPage - 1) + 1, totalProjects)} - {Math.min(ITEMS_PER_PAGE * currentPage, totalProjects)} de {totalProjects} proyectos
                  </div>
                  <ProjectSorting 
                    sortField={sortField}
                    sortDirection={sortDirection}
                    onSortChange={handleSortChange}
                    compact={true}
                    data-testid="project-sorting"
                  />
                </div>
                
                {/* Listado de proyectos */}
                {loading || isLoadingInterests ? (
                  <div className="py-12 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
                    <p className="mt-2 text-gray-500">Cargando proyectos...</p>
                  </div>
                ) : error ? (
                  <div className="py-8 text-center">
                    <div className="inline-flex items-center justify-center rounded-full bg-red-100 p-2">
                      <span className="text-red-600">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Error al cargar los proyectos</h3>
                    <p className="mt-1 text-gray-500">{error}</p>
                    <button 
                      onClick={() => window.location.reload()}
                      className="mt-4 rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
                    >
                      Intentar de nuevo
                    </button>
                  </div>
                ) : projects.length === 0 ? (
                  <div className="py-8 text-center">
                    <div className="inline-flex items-center justify-center rounded-full bg-gray-100 p-2">
                      <span className="text-gray-600">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No se encontraron proyectos</h3>
                    <p className="mt-1 text-gray-500">
                      No hay proyectos que coincidan con los criterios seleccionados. Intenta cambiar los filtros.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" data-testid="projects-grid">
                    {projects.map(project => (
                      <ProjectCard 
                        key={project.id} 
                        project={project}
                        onInterestChange={(newState) => handleInterestChange(project.id, newState)}
                        data-testid="project-card"
                      />
                    ))}
                  </div>
                )}
                
                {/* Paginación */}
                {!loading && !error && projects.length > 0 && totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                        aria-label="Página anterior"
                      >
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      
                      {getPageNumbers().map((page, idx) => (
                        <button
                          key={idx}
                          onClick={() => typeof page === 'number' && handlePageChange(page)}
                          disabled={page === '...'}
                          className={`px-3 py-1 rounded-md ${
                            page === currentPage
                              ? 'bg-primary-600 text-white'
                              : page === '...'
                              ? 'bg-white text-gray-700 cursor-default'
                              : 'bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                        aria-label="Página siguiente"
                      >
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Proteger la página para que solo accedan socios
export default withAuth(ProjectsListPage, ['partner', 'investor', 'manager']); 