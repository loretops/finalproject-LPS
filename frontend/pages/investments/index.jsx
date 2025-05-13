import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import withAuth from '../../components/Auth/withAuth';
import investmentService from '../../services/investmentService';
import { useAuth } from '../../context/AuthContext';
import { Toaster, toast } from 'react-hot-toast';
import { 
  BanknotesIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  BuildingLibraryIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { formatCurrency } from '../../utils/formatters';

/**
 * Página de "Mis Inversiones" donde los socios pueden ver y gestionar sus inversiones
 */
const MyInvestmentsPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  
  // Estados
  const [investments, setInvestments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);
  const [filter, setFilter] = useState('all');

  // Opciones de filtrado por estado
  const filterOptions = [
    { id: 'all', label: 'Todas' },
    { id: 'pending', label: 'Pendientes' },
    { id: 'confirmed', label: 'Confirmadas' },
    { id: 'cancelled', label: 'Canceladas' },
    { id: 'rejected', label: 'Rechazadas' }
  ];
  
  // Cargar inversiones del usuario
  const loadInvestments = async (status = null) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Opciones para el filtrado
      const options = { limit: 50 };
      if (status && status !== 'all') {
        options.status = status;
      }
      
      // Obtener lista de inversiones
      const response = await investmentService.getUserInvestments(options);
      setInvestments(response.data || []);
    } catch (err) {
      console.error('Error al cargar inversiones:', err);
      setError('No se pudieron cargar tus inversiones. Por favor, inténtalo de nuevo más tarde.');
      toast.error('Error al cargar tus inversiones');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Cargar las inversiones cuando cambia el filtro
  useEffect(() => {
    const status = filter === 'all' ? null : filter;
    loadInvestments(status);
  }, [filter]);
  
  // Manejar la cancelación de una inversión
  const handleCancelInvestment = async (investmentId, projectTitle) => {
    try {
      setCancellingId(investmentId);
      await investmentService.cancelInvestment(investmentId);
      
      // Actualizar la lista de inversiones para reflejar la cancelación
      setInvestments(investments.map(investment => 
        investment.id === investmentId 
          ? { ...investment, status: 'cancelled' } 
          : investment
      ));
      
      // Mostrar mensaje de éxito
      toast.success(`Se ha cancelado tu inversión en ${projectTitle || 'el proyecto'}`);
    } catch (err) {
      console.error('Error al cancelar inversión:', err);
      toast.error(err.message || 'No se pudo cancelar la inversión');
    } finally {
      setCancellingId(null);
    }
  };
  
  // Función para obtener detalles de una inversión específica
  const handleViewDetails = (investmentId) => {
    router.push(`/investments/${investmentId}`);
  };

  // Función para actualizar la lista de inversiones
  const handleRefresh = () => {
    const status = filter === 'all' ? null : filter;
    loadInvestments(status);
    toast.success('Lista de inversiones actualizada');
  };

  // Renderizar icono según el estado de la inversión
  const renderStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircleIcon className="h-5 w-5 text-gray-500" />;
      case 'rejected':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  // Obtener texto descriptivo del estado
  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'confirmed': return 'Confirmada';
      case 'cancelled': return 'Cancelada';
      case 'rejected': return 'Rechazada';
      default: return 'Desconocido';
    }
  };
  
  // Renderizar estado de carga
  if (isLoading) {
    return (
      <Layout>
        <Head>
          <title>Mis Inversiones | COOPCO</title>
        </Head>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Cargando tus inversiones...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Head>
        <title>Mis Inversiones | COOPCO</title>
        <meta 
          name="description" 
          content="Gestiona tus inversiones en proyectos cooperativos" 
        />
      </Head>
      
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mis Inversiones</h1>
            <p className="mt-2 text-lg text-gray-600">
              Gestiona tus inversiones en proyectos cooperativos
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <Button 
              onClick={handleRefresh}
              variant="secondary"
              className="flex items-center"
            >
              <ArrowPathIcon className="h-5 w-5 mr-2" />
              Actualizar
            </Button>
          </div>
        </div>
        
        {/* Filtros de estado */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map(option => (
              <button
                key={option.id}
                onClick={() => setFilter(option.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${filter === option.id
                    ? 'bg-primary-100 text-primary-800 border border-primary-200'
                    : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Mensaje de error */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}
        
        {/* Contenido principal */}
        {investments.length > 0 ? (
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Proyecto
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Monto
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {investments.map((investment) => (
                    <tr key={investment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {investment.project?.title || 'Proyecto no disponible'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {formatCurrency(investment.amount)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(investment.investedAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {renderStatusIcon(investment.status)}
                          <span className="ml-2 text-sm text-gray-700">
                            {getStatusText(investment.status)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleViewDetails(investment.id)}
                          >
                            Detalles
                          </Button>
                          
                          {investment.status === 'pending' && (
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleCancelInvestment(investment.id, investment.project?.title)}
                              isLoading={cancellingId === investment.id}
                              disabled={cancellingId === investment.id}
                            >
                              Cancelar
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <Card className="p-8 text-center">
            <BanknotesIcon className="h-12 w-12 text-gray-400 mx-auto" />
            <h2 className="mt-2 text-lg font-medium text-gray-900">No tienes inversiones</h2>
            <p className="mt-1 text-gray-500">
              Explora los proyectos disponibles y realiza tu primera inversión para verla aquí.
            </p>
            <div className="mt-6">
              <Button 
                variant="primary"
                onClick={() => router.push('/projects')}
              >
                Explorar proyectos
              </Button>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};

// Proteger la página para que solo accedan socios
export default withAuth(MyInvestmentsPage, ['partner', 'investor', 'manager']); 