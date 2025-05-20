import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import withAuth from '../../components/Auth/withAuth';
import investmentService from '../../services/investmentService';
import { Toaster, toast } from 'react-hot-toast';
import { formatCurrency, formatDate } from '../../utils/formatters';
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
 * Página de detalle de una inversión específica
 */
const InvestmentDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  // Estados
  const [investment, setInvestment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);
  
  // Cargar datos de la inversión
  useEffect(() => {
    const loadInvestment = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await investmentService.getInvestmentById(id);
        setInvestment(response.data);
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
  
  // Manejar la cancelación de la inversión
  const handleCancelInvestment = async () => {
    if (!investment || !investment.id) return;
    
    setIsCancelling(true);
    
    try {
      await investmentService.cancelInvestment(investment.id);
      
      // Actualizar estado local
      setInvestment({
        ...investment,
        status: 'canceled'
      });
      
      toast.success('Inversión cancelada con éxito');
    } catch (err) {
      console.error('Error al cancelar inversión:', err);
      toast.error(err.message || 'No se pudo cancelar la inversión');
    } finally {
      setIsCancelling(false);
    }
  };
  
  // Obtener color según el estado de la inversión
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'canceled':
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // Obtener texto descriptivo del estado
  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'confirmed': return 'Confirmada';
      case 'canceled':
      case 'cancelled': return 'Cancelada';
      case 'rejected': return 'Rechazada';
      default: return 'Desconocido';
    }
  };
  
  // Renderizar icono según el estado de la inversión
  const renderStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'canceled':
      case 'cancelled':
        return <XCircleIcon className="h-5 w-5 text-gray-500" />;
      case 'rejected':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Renderizar estado de carga
  if (isLoading) {
    return (
      <Layout>
        <Head>
          <title>Detalle de Inversión | COOPCO</title>
        </Head>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Cargando información de la inversión...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Renderizar mensaje de error
  if (error || !investment) {
    return (
      <Layout>
        <Head>
          <title>Error | COOPCO</title>
        </Head>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="p-8 text-center">
            <XCircleIcon className="h-12 w-12 text-red-500 mx-auto" />
            <h2 className="mt-2 text-lg font-medium text-gray-900">No se pudo cargar la inversión</h2>
            <p className="mt-1 text-gray-500">
              {error || 'La inversión solicitada no existe o no tienes permiso para verla.'}
            </p>
            <div className="mt-6">
              <Button 
                variant="primary"
                onClick={() => router.push('/investments')}
              >
                Volver a mis inversiones
              </Button>
            </div>
          </Card>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Head>
        <title>Detalle de Inversión | COOPCO</title>
        <meta 
          name="description" 
          content="Información detallada sobre tu inversión" 
        />
      </Head>
      
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Botón de regreso */}
        <div className="mb-6">
          <Button
            variant="text"
            className="flex items-center text-gray-600 hover:text-gray-900"
            onClick={() => router.push('/investments')}
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Volver a mis inversiones
          </Button>
        </div>
        
        {/* Encabezado */}
        <div className="mb-8 flex flex-wrap items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Detalle de Inversión
            </h1>
            <div className="mt-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(investment.status)}`}>
                {renderStatusIcon(investment.status)}
                <span className="ml-2">{getStatusText(investment.status)}</span>
              </span>
            </div>
          </div>
          
          {/* Acciones */}
          {investment.status === 'pending' && (
            <div className="mt-4 sm:mt-0">
              <Button
                variant="danger"
                onClick={handleCancelInvestment}
                isLoading={isCancelling}
                disabled={isCancelling}
              >
                Cancelar inversión
              </Button>
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
              Detalles completos de tu inversión y su estado actual
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
                      <Button
                        variant="text"
                        size="sm"
                        className="mt-2 text-primary-600"
                        onClick={() => router.push(`/projects/${investment.project.id}`)}
                      >
                        Ver proyecto
                      </Button>
                    </div>
                  ) : (
                    <span className="text-gray-500">Proyecto no disponible</span>
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
                      Tu inversión está pendiente de confirmación por parte de los gestores del proyecto.
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
        
        {/* Información adicional */}
        {investment.status === 'confirmed' && (
          <div className="mt-8">
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Próximos pasos</h3>
              <p className="text-gray-600">
                Tu inversión ha sido confirmada. El equipo de gestión se pondrá en contacto 
                contigo para los siguientes pasos del proceso. Si tienes alguna pregunta, 
                no dudes en contactar con nosotros.
              </p>
            </Card>
          </div>
        )}
        
        {investment.status === 'pending' && (
          <div className="mt-8">
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">¿Qué significa estado pendiente?</h3>
              <p className="text-gray-600">
                Tu intención de inversión ha sido registrada correctamente. El equipo de gestión 
                revisará tu solicitud y se pondrá en contacto contigo para formalizar la inversión. 
                Mientras tanto, puedes cancelar tu intención de inversión si cambias de opinión.
              </p>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

// Proteger la página para que solo accedan socios
export default withAuth(InvestmentDetailPage, ['partner', 'investor', 'manager']);