import React, { useEffect, useState, useRef } from 'react';
import { XMarkIcon, CheckIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { formatCurrency, formatDate } from '../../utils/formatters';
import projectService from '../../services/projectService';
import documentService from '../../services/documentService';

// Mapa de tipos de propiedad
const PROPERTY_TYPES = {
  'residential': 'Residencial',
  'commercial': 'Comercial',
  'industrial': 'Industrial',
  'land': 'Terreno',
  'mixed': 'Uso mixto',
};

/**
 * Modal para publicar un proyecto con verificación de campos requeridos y documentos
 * @param {Object} props - Propiedades del componente
 * @param {string} props.projectId - ID del proyecto a publicar
 * @param {boolean} props.isOpen - Si el modal está abierto
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {Function} props.onSuccess - Función a llamar después de publicar con éxito
 */
const PublishProjectModal = ({ projectId, isOpen, onClose, onSuccess }) => {
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState([]);
  
  // Criterios a verificar antes de la publicación
  const [checks, setChecks] = useState({
    title: { pass: false, message: 'Título del proyecto' },
    description: { pass: false, message: 'Descripción completa' },
    investment: { pass: false, message: 'Inversión mínima y objetivo' },
    roi: { pass: false, message: 'ROI esperado' },
    location: { pass: false, message: 'Ubicación del proyecto' },
    legalDocs: { pass: false, message: 'Documentación legal' },
    financialDocs: { pass: false, message: 'Documentación financiera' },
    images: { pass: false, message: 'Imágenes del proyecto' }
  });
  
  // Cargar datos del proyecto al abrir el modal
  useEffect(() => {
    if (isOpen && projectId) {
      loadProjectData();
      loadProjectDocuments();
    }
  }, [isOpen, projectId]);
  
  // Cargar datos del proyecto
  const loadProjectData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const projectData = await projectService.getProjectById(projectId);
      setProject(projectData);
      
      // Verificar campos del proyecto
      validateProjectFields(projectData);
    } catch (err) {
      console.error('Error al cargar proyecto:', err);
      setError('No se pudo cargar la información del proyecto.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Cargar documentos del proyecto
  const loadProjectDocuments = async () => {
    try {
      const docs = await documentService.getProjectDocuments(projectId);
      setDocuments(docs);
      
      // Verificar documentos requeridos
      validateDocuments(docs);
    } catch (err) {
      console.error('Error al cargar documentos:', err);
    }
  };
  
  // Validar campos del proyecto
  const validateProjectFields = (projectData) => {
    setChecks(prevChecks => ({
      ...prevChecks,
      title: { 
        ...prevChecks.title, 
        pass: !!(projectData.title && projectData.title.trim().length >= 5) 
      },
      description: { 
        ...prevChecks.description, 
        pass: !!(projectData.description && projectData.description.trim().length >= 50) 
      },
      investment: { 
        ...prevChecks.investment, 
        pass: !!(projectData.minimum_investment > 0 && projectData.target_amount > 0) 
      },
      roi: { 
        ...prevChecks.roi, 
        pass: !!(typeof projectData.expected_roi === 'number' && projectData.expected_roi > 0) 
      },
      location: { 
        ...prevChecks.location, 
        pass: !!(projectData.location && projectData.location.trim().length > 0) 
      }
    }));
  };
  
  // Validar documentos requeridos
  const validateDocuments = (docs) => {
    // Verificar documentos legales
    const hasLegalDocs = docs.some(doc => doc.documentType === 'legal');
    
    // Verificar documentos financieros
    const hasFinancialDocs = docs.some(doc => doc.documentType === 'financial');
    
    // Verificar imágenes
    const hasImages = docs.some(doc => doc.documentType === 'image');
    
    setChecks(prevChecks => ({
      ...prevChecks,
      legalDocs: { 
        ...prevChecks.legalDocs, 
        pass: hasLegalDocs 
      },
      financialDocs: { 
        ...prevChecks.financialDocs, 
        pass: hasFinancialDocs 
      },
      images: { 
        ...prevChecks.images, 
        pass: hasImages 
      }
    }));
  };
  
  // Verificar si todos los criterios obligatorios pasan
  const allRequiredChecksPassed = () => {
    // Comprobar solo los criterios obligatorios
    const requiredChecks = ['title', 'description', 'investment', 'location', 'legalDocs'];
    return requiredChecks.every(key => checks[key].pass);
  };
  
  // Verificar si todos los criterios recomendados pasan
  const allRecommendedChecksPassed = () => {
    return Object.values(checks).every(check => check.pass);
  };
  
  // Publicar proyecto
  const handlePublish = async () => {
    setPublishLoading(true);
    setError(null);
    
    try {
      console.log('📢 Iniciando publicación del proyecto:', projectId);
      
      // Usar fetch directamente para mejor control del manejo de errores
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/projects/${projectId}/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({})
      });
      
      console.log('📢 Respuesta recibida:', response.status, response.statusText);
      
      if (!response.ok) {
        let errorData = {};
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        
        try {
          // Intentar parsear el error como JSON
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            errorData = await response.json();
            console.log('📢 Datos de error recibidos:', errorData);
            errorMessage = errorData.message || errorMessage;
          } else {
            const textError = await response.text();
            console.log('📢 Texto de error recibido:', textError);
            errorMessage = textError || errorMessage;
          }
        } catch (parseError) {
          console.error('📢 Error al parsear respuesta de error:', parseError);
        }
        
        console.error('📢 Error en respuesta:', errorMessage);
        
        // Actualizar la UI para mostrar el error
        updateValidationUI(errorMessage);
        
        // Mostrar el mensaje de error en el modal
        setError(errorMessage);
        
        throw new Error(errorMessage);
      }
      
      const result = await response.json();
      console.log('📢 Resultado de la publicación:', result);
      
      if (onSuccess) {
        console.log('📢 Llamando a onSuccess');
        try {
          onSuccess(result);
          console.log('📢 onSuccess completado');
        } catch (callbackError) {
          console.error('📢 Error en callback onSuccess:', callbackError);
          // No propagar este error, continuar con el cierre normal
        }
      }
      
      console.log('📢 Cerrando modal de publicación');
      onClose();
    } catch (err) {
      console.error('📢 Error detallado al publicar proyecto:', err);
      
      // Extraer mensaje más específico si está disponible
      let errorMessage = 'Error desconocido';
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      console.error('📢 Mensaje de error a mostrar:', errorMessage);
      setError('No se pudo publicar el proyecto: ' + errorMessage);
      
      // No cerrar el modal en caso de error para que el usuario vea el mensaje
    } finally {
      setPublishLoading(false);
    }
  };
  
  // Función para actualizar la UI de validación basada en el mensaje de error
  const updateValidationUI = (errorMessage) => {
    if (!errorMessage) return;
    
    console.log('📢 Actualizando UI con mensaje de error:', errorMessage);
    const lowerMessage = errorMessage.toLowerCase();
    
    // Actualizar estado de validación basado en el mensaje
    if (lowerMessage.includes('descripción') || lowerMessage.includes('descripc')) {
      setChecks(prev => ({
        ...prev,
        description: { ...prev.description, pass: false }
      }));
    }
    
    if (lowerMessage.includes('documento legal') || lowerMessage.includes('documentación legal')) {
      setChecks(prev => ({
        ...prev,
        legalDocs: { ...prev.legalDocs, pass: false }
      }));
    }
    
    if (lowerMessage.includes('título')) {
      setChecks(prev => ({
        ...prev,
        title: { ...prev.title, pass: false }
      }));
    }
    
    if (lowerMessage.includes('inversión') || lowerMessage.includes('monto')) {
      setChecks(prev => ({
        ...prev,
        investment: { ...prev.investment, pass: false }
      }));
    }
    
    if (lowerMessage.includes('ubicación') || lowerMessage.includes('localización')) {
      setChecks(prev => ({
        ...prev,
        location: { ...prev.location, pass: false }
      }));
    }
    
    if (lowerMessage.includes('roi') || lowerMessage.includes('rentabilidad')) {
      setChecks(prev => ({
        ...prev,
        roi: { ...prev.roi, pass: false }
      }));
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-black/50"
          onClick={onClose}
          aria-hidden="true"
        ></div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span className="sr-only">Cerrar</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Publicar Proyecto
                </h3>
                
                {error && (
                  <div className="mt-2 p-3 bg-red-100 border-l-4 border-red-500 rounded text-red-700 text-sm">
                    <div className="flex items-center">
                      <ExclamationTriangleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  </div>
                )}
                
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Antes de publicar el proyecto, verifica que cumple con todos los requisitos necesarios.
                    Los inversores podrán ver toda la información después de la publicación.
                  </p>
                  
                  {isLoading ? (
                    <div className="py-4 text-center">
                      <svg className="animate-spin h-5 w-5 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <p className="mt-2 text-sm text-gray-500">Verificando proyecto...</p>
                    </div>
                  ) : (
                    <div className="mt-4 border rounded-md divide-y">
                      <div className="px-4 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Requisitos obligatorios
                      </div>
                      
                      {Object.entries(checks)
                        .filter(([key]) => ['title', 'description', 'investment', 'location', 'legalDocs'].includes(key))
                        .map(([key, { pass, message }]) => (
                          <div key={key} className={`px-4 py-3 flex items-center ${!pass ? 'bg-red-50' : ''}`}>
                            <div className={`flex-shrink-0 h-5 w-5 ${pass ? 'text-green-500' : 'text-red-500'}`}>
                              {pass ? (
                                <CheckCircleIcon className="h-5 w-5" />
                              ) : (
                                <ExclamationTriangleIcon className="h-5 w-5" />
                              )}
                            </div>
                            <div className="ml-3">
                              <p className={`text-sm ${pass ? 'text-gray-800' : 'text-red-700 font-medium'}`}>
                                {message}
                              </p>
                              {!pass && ['title', 'description', 'legalDocs'].includes(key) && (
                                <p className="text-xs text-red-600 mt-1">
                                  {key === 'title' && 'El título del proyecto es obligatorio y debe ser descriptivo.'}
                                  {key === 'description' && 'La descripción debe tener al menos 50 caracteres y detallar el proyecto.'}
                                  {key === 'legalDocs' && (
                                    <>
                                      Debe subir al menos un documento legal antes de publicar.
                                      <a 
                                        href={`/admin/projects/${projectId}/documents/add`} 
                                        target="_blank" 
                                        className="block mt-1 text-blue-600 hover:text-blue-800 underline"
                                      >
                                        + Añadir documento legal
                                      </a>
                                    </>
                                  )}
                                </p>
                              )}
                            </div>
                          </div>
                        ))
                      }
                      
                      <div className="px-4 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Requisitos recomendados
                      </div>
                      
                      {Object.entries(checks)
                        .filter(([key]) => ['roi', 'financialDocs', 'images'].includes(key))
                        .map(([key, { pass, message }]) => (
                          <div key={key} className="px-4 py-3 flex items-center">
                            <div className={`flex-shrink-0 h-5 w-5 ${pass ? 'text-green-500' : 'text-orange-500'}`}>
                              {pass ? (
                                <CheckCircleIcon className="h-5 w-5" />
                              ) : (
                                <ExclamationTriangleIcon className="h-5 w-5" />
                              )}
                            </div>
                            <div className="ml-3">
                              <p className={`text-sm ${pass ? 'text-gray-800' : 'text-gray-600'}`}>
                                {message}
                              </p>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handlePublish}
              disabled={!allRequiredChecksPassed() || publishLoading}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${
                allRequiredChecksPassed() 
                  ? allRecommendedChecksPassed()
                    ? 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500'
                    : 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
                  : 'bg-gray-300 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              {publishLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publicando...
                </>
              ) : allRecommendedChecksPassed() ? 'Publicar Proyecto' : 'Publicar de todos modos'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishProjectModal; 