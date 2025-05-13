import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import InvestmentForm from './InvestmentForm';
import projectService from '../../services/projectService';
import { formatCurrency } from '../../utils/formatters';

/**
 * Componente para mostrar un botón de inversión en un proyecto
 * Incluye un modal con el formulario de inversión
 */
const InvestButton = ({ project, initialOpen = false, onClose, onInvestmentSuccess }) => {
  const [showModal, setShowModal] = useState(initialOpen);
  const [isLoadingProject, setIsLoadingProject] = useState(false);
  const [projectDetails, setProjectDetails] = useState(project || {});
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  // Verificar si tenemos datos de proyecto válidos
  const projectDataAvailable = projectDetails && 
    typeof projectDetails === 'object' && 
    Object.keys(projectDetails).length > 0;

  // Verificar estado del proyecto (con comprobaciones de seguridad)
  const currentAmount = projectDataAvailable && projectDetails.currentAmount ? 
    parseFloat(projectDetails.currentAmount) : 0;
  const targetAmount = projectDataAvailable && projectDetails.targetAmount ? 
    parseFloat(projectDetails.targetAmount) : 0;
  
  const isProjectFull = currentAmount >= targetAmount && targetAmount > 0;
  const isUnavailable = !projectDataAvailable || 
    projectDetails.status !== 'published' || 
    isProjectFull;
  
  // Determinar el texto del botón según el estado
  const getButtonText = () => {
    if (!projectDataAvailable) return 'Cargando proyecto...';
    if (isProjectFull) return 'Financiación completada';
    if (projectDetails.status !== 'published') return 'No disponible para inversión';
    return 'Invertir en este proyecto';
  };

  /**
   * Abre el modal de inversión, obtiene datos actualizados del proyecto
   */
  const handleOpenModal = async () => {
    if (!isAuthenticated && !isLoading) {
      // Redirigir al login si no está autenticado
      router.push(`/auth/login?redirect=${router.asPath}`);
      return;
    }
    
    // Obtener datos actualizados del proyecto antes de mostrar el formulario
    setIsLoadingProject(true);
    try {
      if (projectDataAvailable && projectDetails.id) {
        const response = await projectService.getProjectById(projectDetails.id);
        setProjectDetails(response.data);
      }
      setShowModal(true);
    } catch (error) {
      console.error('Error al cargar detalles del proyecto:', error);
    } finally {
      setIsLoadingProject(false);
    }
  };

  /**
   * Cierra el modal de inversión
   */
  const handleCloseModal = () => {
    setShowModal(false);
    if (onClose) onClose();
  };

  /**
   * Maneja el éxito en la inversión
   */
  const handleInvestmentSuccess = (investmentData) => {
    // Actualizar los datos del proyecto para reflejar la nueva inversión
    if (projectDataAvailable) {
      setProjectDetails(prev => ({
        ...prev,
        currentAmount: (parseFloat(prev.currentAmount) || 0) + parseFloat(investmentData.amount)
      }));
    }
    
    // Cerrar el modal
    setShowModal(false);
    
    // Notificar al componente padre
    if (onInvestmentSuccess) {
      onInvestmentSuccess(investmentData);
    }
  };

  // Verificar permisos para inversión
  const canInvest = isAuthenticated && 
    !isLoading && 
    user?.role && 
    ['partner', 'investor', 'manager', 'admin'].includes(user.role) &&
    !isUnavailable;

  return (
    <>
      <div className="my-6">
        <button
          onClick={handleOpenModal}
          disabled={isUnavailable || isLoadingProject}
          className={`w-full py-3 px-6 rounded-md font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 
            ${canInvest 
              ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' 
              : 'bg-gray-400 cursor-not-allowed'}`}
        >
          {isLoadingProject ? 'Cargando...' : getButtonText()}
        </button>
        {isProjectFull && projectDataAvailable && (
          <div className="mt-2 text-center text-green-600 font-medium">
            ¡Este proyecto ha alcanzado su objetivo de {formatCurrency(projectDetails.targetAmount)}!
          </div>
        )}
      </div>

      {/* Modal de inversión */}
      {showModal && projectDataAvailable && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Invertir en {projectDetails.title}
              </h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <InvestmentForm 
                project={projectDetails} 
                onSuccess={handleInvestmentSuccess} 
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

InvestButton.propTypes = {
  /** Datos del proyecto en el que se invertirá */
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    minimumInvestment: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    targetAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    currentAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }).isRequired,
  /** Indica si el modal debe abrirse al montar el componente */
  initialOpen: PropTypes.bool,
  /** Función a llamar cuando se cierra el modal */
  onClose: PropTypes.func,
  /** Función a llamar después de una inversión exitosa */
  onInvestmentSuccess: PropTypes.func
};

export default InvestButton; 