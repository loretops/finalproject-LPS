import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/Admin/AdminLayout';
import { withAuth } from '../../../utils/withAuth';
import { apiClient } from '../../../services/authService';
import { toast } from 'react-hot-toast';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import {
  ArrowLeftIcon,
  BanknotesIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

/**
 * Página de detalle de inversión para gestores
 * Permite aprobar o rechazar inversiones, pero no cancelarlas (eso es solo para socios)
 */
const AdminInvestmentDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  // Estados
  const [investment, setInvestment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [contractReference, setContractReference] = useState('');
  
  // Cargar datos de la inversión
  useEffect(() => {
    const loadInvestment = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await apiClient.get(`/investments/${id}`);
        setInvestment(response.data.data);
      } catch (err) {
        console.error('Error al cargar inversión:', err);
        setError('No se pudo cargar la información de la inversión');
        toast.error('Error al cargar la inversión');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInvestment();
  }, [id]);
  
  // Actualizar el estado de la inversión
  const handleUpdateStatus = async (status) => {
    if (!id) return;
    
    setIsProcessing(true);
    
    try {
      // Preparar datos
      const data = { status };
      
      // Si es confirmación, añadir referencia de contrato si existe
      if (status === 'confirmed' && contractReference.trim()) {
        data.contractReference = contractReference.trim();
      }
      
      // Enviar actualización
      await apiClient.patch(`/investments/${id}/status`, data);
      
      // Actualizar estado local
      setInvestment(prev => ({ ...prev, status }));
      
      // Notificar éxito
      toast.success(`Inversión ${status === 'confirmed' ? 'confirmada' : 'rechazada'} con éxito`);
    } catch (err) {
      console.error('Error al actualizar inversión:', err);
      toast.error('No se pudo actualizar el estado de la inversión');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Renderizar icono según el estado
  const renderStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'canceled':
        return <XCircleIcon className="h-5 w-5 text-gray-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Obtener texto del estado
  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'confirmed': return 'Confirmada';
      case 'rejected': return 'Rechazada';
      case 'canceled': return 'Cancelada';
      default: return 'Desconocido';
    }
  };
  
  // Obtener color según el estado
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'canceled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // Mostrar spinner mientras carga
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </AdminLayout>
    );
  }
  
  // Mostrar mensaje de error si hay problema
  if (error || !investment) {
    return (
      <AdminLayout>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <XCircleIcon className="h-12 w-12 text-red-500 mx-auto" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">Error</h2>
          <p className="mt-1 text-gray-500">
            {error || 'No se pudo cargar la información de la inversión'}
          </p>
          <button
            onClick={() => router.back()}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            Volver
          </button>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Botón de regreso */}
        <div className="mb-6">
          <button
            type="button"
            className="flex items-center text-gray-600 hover:text-gray-900"
            onClick={() => router.push('/admin/investments')}
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Volver a listado de inversiones
          </button>
        </div>
        
        {/* Encabezado */}
        <div className="mb-8 flex flex-wrap items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Detalle de Inversión #{investment.id.slice(-8)}
            </h1>
            <div className="mt-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(investment.status)}`}>
                {renderStatusIcon(investment.status)}
                <span className="ml-2">{getStatusText(investment.status)}</span>
              </span>
            </div>
          </div>
          
          {/* Acciones del gestor (aprobar/rechazar) - Solo mostrar en estado pendiente */}
          {investment.status === 'pending' && (
            <div className="mt-4 sm:mt-0 flex items-center space-x-4">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
                onClick={() => handleUpdateStatus('rejected')}
                disabled={isProcessing}
              >
                <XCircleIcon className="h-5 w-5 mr-2" />
                Rechazar
              </button>
              
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                onClick={() => handleUpdateStatus('confirmed')}
                disabled={isProcessing}
              >
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                Confirmar
              </button>
            </div>
          )}
        </div>
        
        {/* Detalle de la inversión */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 bg-gray-50">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Información de la inversión
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Detalles completos de la inversión
            </p>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              {/* Proyecto */}
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <BuildingOfficeIcon className="h-5 w-5 mr-2 text-gray-400" />
                  Proyecto
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {investment.project ? (
                    <div>
                      <p className="font-medium">{investment.project.title}</p>
                      {investment.project.expectedRoi && (
                        <p className="text-sm text-gray-500 mt-1">
                          ROI esperado: {investment.project.expectedRoi}%
                        </p>
                      )}
                      <button
                        type="button"
                        className="mt-2 text-primary-600 text-sm"
                        onClick={() => router.push(`/admin/projects/${investment.projectId}`)}
                      >
                        Ver proyecto
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-500">Proyecto no disponible</span>
                  )}
                </dd>
              </div>
              
              {/* Inversor */}
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <UserIcon className="h-5 w-5 mr-2 text-gray-400" />
                  Inversor
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {investment.user ? (
                    <div>
                      <p className="font-medium">{investment.user.firstName} {investment.user.lastName}</p>
                      <p className="text-sm text-gray-500 mt-1">{investment.user.email}</p>
                    </div>
                  ) : (
                    <span className="text-gray-500">Usuario no disponible</span>
                  )}
                </dd>
              </div>
              
              {/* Monto */}
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <BanknotesIcon className="h-5 w-5 mr-2 text-gray-400" />
                  Monto invertido
                </dt>
                <dd className="mt-1 text-sm font-semibold text-gray-900 sm:mt-0 sm:col-span-2">
                  {formatCurrency(investment.amount)}
                </dd>
              </div>
              
              {/* Fecha */}
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-gray-400" />
                  Fecha de inversión
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formatDate(investment.investedAt, { includeTime: true })}
                </dd>
              </div>
              
              {/* Estado */}
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2 text-gray-400" />
                  Estado
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="flex items-center">
                    {renderStatusIcon(investment.status)}
                    <span className="ml-2">{getStatusText(investment.status)}</span>
                  </div>
                  {investment.status === 'pending' && (
                    <p className="mt-1 text-sm text-gray-500">
                      Inversión pendiente de verificación y aprobación.
                    </p>
                  )}
                  {investment.status === 'confirmed' && investment.contractReference && (
                    <p className="mt-1 text-sm text-gray-500">
                      Referencia del contrato: {investment.contractReference}
                    </p>
                  )}
                </dd>
              </div>
              
              {/* Notas */}
              {investment.notes && (
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <DocumentTextIcon className="h-5 w-5 mr-2 text-gray-400" />
                    Notas
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-line">
                    {investment.notes}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
        
        {/* Formulario de referencia de contrato (solo para inversiones pendientes) */}
        {investment.status === 'pending' && (
          <div className="mt-8 bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Confirmar inversión
              </h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div>
                  <label htmlFor="contractReference" className="block text-sm font-medium text-gray-700">
                    Referencia del contrato (opcional)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="contractReference"
                      id="contractReference"
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Ej. CONT-2023-001"
                      value={contractReference}
                      onChange={(e) => setContractReference(e.target.value)}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Introduce una referencia para el contrato si deseas incluirla en la confirmación.
                  </p>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    onClick={() => handleUpdateStatus('rejected')}
                    disabled={isProcessing}
                  >
                    Rechazar inversión
                  </button>
                  
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                    onClick={() => handleUpdateStatus('confirmed')}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Procesando...' : 'Confirmar inversión'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

// Proteger la página para que solo accedan gestores y administradores
export default withAuth(AdminInvestmentDetailPage, ['manager', 'admin']); 