import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../components/Admin/AdminLayout';
import { withAuth } from '../../../utils/withAuth';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { formatCurrency } from '../../../utils/formatters';
import { apiClient } from '../../../services/authService';

const InvestmentDashboard = () => {
  const [investments, setInvestments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    projectId: 'all',
    status: 'all'
  });

  // Cargar todas las inversiones al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Primero cargar todos los proyectos
        const projectsResponse = await apiClient.get('/projects');
        
        let projectsList = [];
        if (projectsResponse.data && Array.isArray(projectsResponse.data)) {
          projectsList = projectsResponse.data;
        } else if (projectsResponse.data && Array.isArray(projectsResponse.data.data)) {
          projectsList = projectsResponse.data.data;
        }
        
        setProjects(projectsList);
        
        // Luego cargar todas las inversiones
        await fetchInvestments(false); // Pasar false para no cambiar loading otra vez
      } catch (error) {
        console.error('Error cargando datos iniciales:', error);
        toast.error('Error al cargar los datos. Inténtalo de nuevo más tarde.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []); // Sin dependencias para evitar ejecuciones múltiples

  // Cargar inversiones cuando cambian los filtros (pero solo después de la carga inicial)
  useEffect(() => {
    // Solo ejecutar si ya hay proyectos cargados (es decir, después de la carga inicial)
    if (projects.length > 0) {
      fetchInvestments();
    }
  }, [filters, projects.length > 0]);

  // Función para cargar inversiones según los filtros actuales
  const fetchInvestments = async (setLoadingState = true) => {
    if (setLoadingState) {
      setIsLoading(true);
    }
    try {
      // Construir query params
      const params = new URLSearchParams();
      if (filters.status !== 'all') params.append('status', filters.status);
      if (filters.projectId !== 'all') params.append('projectId', filters.projectId);
      
      const query = params.toString() ? `?${params.toString()}` : '';
      const response = await apiClient.get(`/investments${query}`);
      
      // Procesar la respuesta
      let investmentsList = [];
      if (response.data && Array.isArray(response.data)) {
        investmentsList = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        investmentsList = response.data.data;
      }
      
      setInvestments(investmentsList);
    } catch (error) {
      console.error('Error cargando inversiones:', error);
      toast.error('Error al cargar las inversiones');
    } finally {
      if (setLoadingState) {
        setIsLoading(false);
      }
    }
  };

  // Actualizar estado de inversión
  const handleUpdateStatus = async (investmentId, newStatus) => {
    try {
      await apiClient.patch(`/investments/${investmentId}/status`, { 
        status: newStatus 
      });
      
      toast.success(`Inversión actualizada a "${newStatus}"`);
      
      // Recargar inversiones
      fetchInvestments();
    } catch (error) {
      console.error('Error actualizando inversión:', error);
      toast.error('Error al actualizar la inversión');
    }
  };

  // Renderizar icono según el estado
  const renderStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'confirmed': return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'rejected': return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'canceled': return <ExclamationCircleIcon className="h-5 w-5 text-gray-500" />;
      default: return null;
    }
  };

  // Obtener nombre del proyecto
  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.title : 'Proyecto desconocido';
  };

  // Convertir estado a texto
  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'confirmed': return 'Confirmada';
      case 'rejected': return 'Rechazada';
      case 'canceled': return 'Cancelada';
      default: return 'Desconocido';
    }
  };

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Inversiones</h1>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="py-4">
            {/* Filtros */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="project-filter" className="block text-sm font-medium text-gray-700">
                  Proyecto
                </label>
                <select
                  id="project-filter"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={filters.projectId}
                  onChange={(e) => setFilters({...filters, projectId: e.target.value})}
                >
                  <option value="all">Todos los proyectos</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700">
                  Estado
                </label>
                <select
                  id="status-filter"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                >
                  <option value="all">Todos los estados</option>
                  <option value="pending">Pendientes</option>
                  <option value="confirmed">Confirmadas</option>
                  <option value="rejected">Rechazadas</option>
                  <option value="canceled">Canceladas</option>
                </select>
              </div>
            </div>
            
            {/* Estado de carga o error */}
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-300 mb-3"></div>
                  <div className="h-4 w-24 bg-gray-300 rounded"></div>
                </div>
              </div>
            ) : investments.length === 0 ? (
              <div className="bg-white shadow rounded-lg p-6 text-center">
                <p className="text-gray-500">No hay inversiones que coincidan con los filtros</p>
              </div>
            ) : (
              <>
                {/* Tabla de inversiones */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Proyecto
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Inversor
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Monto
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estado
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fecha
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {investments.map((investment) => (
                        <tr key={investment.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {getProjectName(investment.projectId)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {investment.user ? 
                                `${investment.user.firstName || ''} ${investment.user.lastName || ''}` : 
                                'Usuario desconocido'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {investment.user?.email || ''}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatCurrency(investment.amount)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {renderStatusIcon(investment.status)}
                              <span className="ml-1 text-sm text-gray-900">
                                {getStatusText(investment.status)}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {investment.investedAt ? 
                              new Date(investment.investedAt).toLocaleDateString() : 
                              '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              href={`/admin/investments/${investment.id}`}
                              className="text-primary-600 hover:text-primary-900 mr-3"
                            >
                              <DocumentTextIcon className="h-5 w-5 inline-block" aria-hidden="true" />
                              <span className="sr-only">Ver detalle</span>
                            </Link>
                            
                            {investment.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleUpdateStatus(investment.id, 'confirmed')}
                                  className="text-green-600 hover:text-green-900 mr-3"
                                >
                                  Confirmar
                                </button>
                                <button
                                  onClick={() => handleUpdateStatus(investment.id, 'rejected')}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Rechazar
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default withAuth(InvestmentDashboard, ['manager', 'admin']); 