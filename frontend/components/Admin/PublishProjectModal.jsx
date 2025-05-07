import React, { useEffect, useState, useRef } from 'react';
import { XMarkIcon, CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { formatCurrency, formatDate } from '../../utils/formatters';

// Mapa de tipos de propiedad
const PROPERTY_TYPES = {
  'residential': 'Residencial',
  'commercial': 'Comercial',
  'industrial': 'Industrial',
  'land': 'Terreno',
  'mixed': 'Uso mixto',
};

/**
 * Modal para la vista previa y confirmación de publicación de un proyecto
 * 
 * @param {Object} props
 * @param {Object} props.project - Datos del proyecto a publicar
 * @param {boolean} props.isOpen - Controla si el modal está abierto
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {Function} props.onPublish - Función para publicar el proyecto
 * @param {boolean} props.isPublishing - Estado de publicación (loading)
 */
const PublishProjectModal = ({ project, isOpen, onClose, onPublish, isPublishing }) => {
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const modalRef = useRef(null);
  
  // Verificar que todos los campos necesarios estén completos
  useEffect(() => {
    if (project) {
      const errors = [];
      
      if (!project.title || project.title.trim() === '') {
        errors.push('El título del proyecto es obligatorio');
      }
      
      if (!project.description || project.description.trim() === '') {
        errors.push('La descripción del proyecto es obligatoria');
      }
      
      if (!project.minimum_investment || project.minimum_investment <= 0) {
        errors.push('La inversión mínima debe ser un valor positivo');
      }
      
      if (!project.target_amount || project.target_amount <= 0) {
        errors.push('El monto objetivo debe ser un valor positivo');
      }
      
      if (!project.expected_roi || project.expected_roi <= 0) {
        errors.push('El ROI esperado debe ser un valor positivo');
      }
      
      if (!project.location || project.location.trim() === '') {
        errors.push('La ubicación del proyecto es obligatoria');
      }
      
      setValidationErrors(errors);
    }
  }, [project]);

  // Reset el estado de confirmación cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      setHasConfirmed(false);
    }
  }, [isOpen]);
  
  // Si el modal no está abierto o no hay proyecto, no renderizar nada
  if (!isOpen || !project) return null;
  
  const canPublish = validationErrors.length === 0 && hasConfirmed;
  
  // Función para manejar el cierre del modal
  const handleClose = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!isPublishing) {
      onClose();
    }
  };
  
  // Función para manejar la publicación
  const handlePublish = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (canPublish && !isPublishing) {
      onPublish();
    }
  };
  
  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-gray-500 bg-opacity-75 z-40"
        onClick={handleClose}
      ></div>
      
      {/* Modal */}
      <div 
        className="fixed inset-0 z-50 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex min-h-screen items-center justify-center p-4">
          <div
            ref={modalRef}
            className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera con título y botón cerrar */}
            <div className="flex items-center justify-between mb-4">
              <h3 id="modal-headline" className="text-xl font-semibold text-gray-900">
                Vista previa de publicación
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={handleClose}
                disabled={isPublishing}
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            
            {/* Validación */}
            {validationErrors.length > 0 && (
              <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      El proyecto no puede ser publicado por los siguientes motivos:
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <ul className="list-disc pl-5 space-y-1">
                        {validationErrors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Vista previa del proyecto */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Encabezado */}
              <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">{project.title}</h2>
                <p className="mt-1 text-sm text-gray-600">{project.description}</p>
              </div>
              
              {/* Información principal */}
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded">
                    <span className="text-xs text-gray-500 uppercase">Inversión Mínima</span>
                    <p className="text-lg font-semibold">{formatCurrency(project.minimum_investment)}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <span className="text-xs text-gray-500 uppercase">Monto Objetivo</span>
                    <p className="text-lg font-semibold">{formatCurrency(project.target_amount)}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <span className="text-xs text-gray-500 uppercase">ROI Esperado</span>
                    <p className="text-lg font-semibold">{project.expected_roi}%</p>
                  </div>
                </div>
                
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Tipo de Propiedad</dt>
                    <dd className="mt-1 text-sm text-gray-900">{PROPERTY_TYPES[project.property_type] || project.property_type}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Ubicación</dt>
                    <dd className="mt-1 text-sm text-gray-900">{project.location}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Fecha de Creación</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatDate(project.created_at)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Última Actualización</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatDate(project.updated_at)}</dd>
                  </div>
                </dl>
              </div>
            </div>
            
            {/* Mensaje de advertencia sobre publicación */}
            <div className="mt-5 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Información importante</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      Al publicar este proyecto, estará visible para todos los socios de la plataforma. 
                      Los proyectos publicados <strong>no pueden ser modificados</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Checkbox de confirmación */}
            <div className="mt-5">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="confirm-publish"
                    name="confirm-publish"
                    type="checkbox"
                    checked={hasConfirmed}
                    onChange={(e) => setHasConfirmed(e.target.checked)}
                    className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                    disabled={isPublishing}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="confirm-publish" className="font-medium text-gray-700">
                    Confirmo que he revisado todos los detalles del proyecto y entiendo que una vez publicado no podrá ser modificado
                  </label>
                </div>
              </div>
            </div>
            
            {/* Botones de acción */}
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button
                type="button"
                disabled={!canPublish || isPublishing}
                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:col-start-2 sm:text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  canPublish 
                    ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' 
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
                onClick={handlePublish}
              >
                {isPublishing ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publicando...
                  </span>
                ) : (
                  <>
                    <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Publicar proyecto
                  </>
                )}
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                onClick={handleClose}
                disabled={isPublishing}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublishProjectModal; 