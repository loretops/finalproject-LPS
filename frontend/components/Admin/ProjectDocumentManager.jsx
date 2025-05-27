import React, { useState, useEffect, useCallback } from 'react';
import { 
  DocumentArrowUpIcon, 
  TrashIcon, 
  DocumentMagnifyingGlassIcon, 
  ExclamationCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import documentService from '../../services/documentService';

// Constantes para tipos de documentos y niveles de acceso
const DOCUMENT_TYPES = [
  { value: 'legal', label: 'Legal' },
  { value: 'financial', label: 'Financiero' },
  { value: 'technical', label: 'Técnico' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'image', label: 'Imagen' },
  { value: 'video', label: 'Video' },
  { value: 'other', label: 'Otro' }
];

const ACCESS_LEVELS = [
  { value: 'public', label: 'Público' },
  { value: 'partner', label: 'Solo Socios' },
  { value: 'investor', label: 'Solo Inversores' },
  { value: 'admin', label: 'Solo Administradores' }
];

const SECURITY_LEVELS = [
  { value: 'view_only', label: 'Solo visualización' },
  { value: 'download', label: 'Permitir descarga' },
  { value: 'print', label: 'Permitir impresión' },
  { value: 'full_access', label: 'Acceso completo' }
];

/**
 * Componente para gestionar documentos de un proyecto
 * @param {Object} props - Propiedades del componente
 * @param {string} props.projectId - ID del proyecto
 * @param {boolean} props.readOnly - Modo solo lectura (opcional)
 */
const ProjectDocumentManager = ({ projectId, readOnly = false }) => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState({});
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Estado para nuevo documento
  const [newDocument, setNewDocument] = useState({
    file: null,
    documentType: 'legal',
    accessLevel: 'partner',
    securityLevel: 'view_only',
    title: '',
    description: ''
  });

  // Cargar documentos del proyecto
  const loadDocuments = useCallback(async () => {
    if (!projectId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await documentService.getProjectDocuments(projectId);
      // Asegurar que lo que se guarda en el estado sea un array
      setDocuments(Array.isArray(result) ? result : (result?.data || []));
    } catch (err) {
      console.error('Error al cargar documentos:', err);
      setError('No se pudieron cargar los documentos. Por favor, inténtalo de nuevo.');
      // En caso de error, garantizar que documents sea al menos un array vacío
      setDocuments([]);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  // Cargar documentos al montar el componente o cambiar el projectId
  useEffect(() => {
    loadDocuments();
  }, [projectId, loadDocuments]);

  // Manejar cambio de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Autodetectar tipo de documento según extensión/tipo
    let documentType = 'other';
    if (file.type.startsWith('image/')) {
      documentType = 'image';
    } else if (file.type.startsWith('video/')) {
      documentType = 'video';
    } else if (file.type.includes('pdf') || file.type.includes('document')) {
      documentType = 'legal';
    }
    
    setNewDocument({
      ...newDocument,
      file,
      documentType,
      title: file.name
    });
  };

  // Manejar cambio en campos de formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDocument({
      ...newDocument,
      [name]: value
    });
  };

  // Subir documento
  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!newDocument.file) {
      setError('Por favor, selecciona un archivo para subir.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setSuccessMessage('Subiendo documento... Por favor espera.');
    try {
      // Subida real al backend (y Cloudinary)
      const uploaded = await documentService.uploadDocument(
        projectId,
        newDocument.file,
        {
          documentType: newDocument.documentType,
          accessLevel: newDocument.accessLevel,
          securityLevel: newDocument.securityLevel,
          title: newDocument.title,
          description: newDocument.description
        }
      );
      setSuccessMessage('¡Documento subido correctamente!');
      setTimeout(() => setSuccessMessage(''), 3000);
      setNewDocument({
        file: null,
        documentType: 'legal',
        accessLevel: 'partner',
        securityLevel: 'view_only',
        title: '',
        description: ''
      });
      setUploadProgress({});
      // Recargar documentos desde el backend
      loadDocuments();
    } catch (err) {
      console.error('Error al subir documento:', err);
      setError('Error al subir el documento. ' + (err.message || 'Por favor, inténtalo de nuevo.'));
    } finally {
      setIsLoading(false);
    }
  };

  // Eliminar documento
  const handleDelete = async (documentId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este documento?')) {
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      await documentService.deleteDocument(documentId);
      
      // Mostrar mensaje de éxito
      setSuccessMessage('Documento eliminado correctamente');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Recargar documentos
      loadDocuments();
    } catch (err) {
      console.error('Error al eliminar documento:', err);
      setError('Error al eliminar el documento. ' + (err.message || 'Por favor, inténtalo de nuevo.'));
    } finally {
      setIsLoading(false);
    }
  };

  // Visualizar documento
  const handleView = async (documentId) => {
    try {
      const url = await documentService.getDocumentAccessUrl(documentId);
      window.open(url, '_blank');
    } catch (err) {
      console.error('Error al visualizar documento:', err);
      setError('Error al acceder al documento. ' + (err.message || 'Por favor, inténtalo de nuevo.'));
    }
  };

  // Filtrar por tipo de documento
  const filteredDocuments = Array.isArray(documents) 
    ? documents.filter(doc => {
        if (activeFilter === 'all') return true;
        return doc.documentType === activeFilter;
      })
    : [];

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          Documentos del Proyecto
        </h3>
        
        {/* Mensajes de éxito y error */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600 flex items-start">
            <ExclamationCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        
        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md text-green-600 flex items-start">
            <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}
        
        {/* Formulario de subida (oculto en modo readOnly) */}
        {!readOnly && (
          <form onSubmit={handleUpload} className="mb-6 p-4 bg-gray-50 rounded-md">
            <h4 className="text-md font-medium text-gray-700 mb-3">Subir nuevo documento</h4>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-4">
              {/* Selector de archivo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Archivo *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary-50 file:text-primary-600
                      hover:file:bg-primary-100"
                  />
                </div>
                {newDocument.file && (
                  <p className="mt-1 text-sm text-gray-500 truncate">
                    {newDocument.file.name} ({Math.round(newDocument.file.size / 1024)} KB)
                  </p>
                )}
              </div>
              
              {/* Título del documento */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newDocument.title}
                  onChange={handleInputChange}
                  placeholder="Nombre descriptivo"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-4">
              {/* Tipo de documento */}
              <div>
                <label htmlFor="documentType" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de documento *
                </label>
                <select
                  id="documentType"
                  name="documentType"
                  value={newDocument.documentType}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  {DOCUMENT_TYPES.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Nivel de acceso */}
              <div>
                <label htmlFor="accessLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  Nivel de acceso *
                </label>
                <select
                  id="accessLevel"
                  name="accessLevel"
                  value={newDocument.accessLevel}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  {ACCESS_LEVELS.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Nivel de seguridad */}
              <div>
                <label htmlFor="securityLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  Nivel de seguridad *
                </label>
                <select
                  id="securityLevel"
                  name="securityLevel"
                  value={newDocument.securityLevel}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  {SECURITY_LEVELS.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Descripción */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                rows="2"
                value={newDocument.description}
                onChange={handleInputChange}
                placeholder="Descripción opcional del documento"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
            
            {/* Botón de subida */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading || !newDocument.file}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subiendo...
                  </>
                ) : (
                  <>
                    <DocumentArrowUpIcon className="-ml-1 mr-2 h-5 w-5" />
                    Subir Documento
                  </>
                )}
              </button>
            </div>
            
            {/* Barra de progreso */}
            {newDocument.file && uploadProgress[newDocument.file.name] && (
              <div className="mt-2">
                <div className="text-xs font-semibold mb-1">
                  Progreso: {uploadProgress[newDocument.file.name]}%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full" 
                    style={{ width: `${uploadProgress[newDocument.file.name]}%` }}
                  ></div>
                </div>
              </div>
            )}
          </form>
        )}
        
        {/* Filtros de documentos */}
        <div className="mb-4 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            <button
              className={`${
                activeFilter === 'all'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveFilter('all')}
            >
              Todos
            </button>
            {DOCUMENT_TYPES.map(type => (
              <button
                key={type.value}
                className={`${
                  activeFilter === type.value
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveFilter(type.value)}
              >
                {type.label}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Lista de documentos */}
        {isLoading && documents.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-2 text-sm font-medium">Cargando documentos...</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <p className="text-sm font-medium">No hay documentos disponibles</p>
            {!readOnly && (
              <p className="mt-1 text-xs">Sube documentos usando el formulario de arriba</p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documento
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acceso
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subido
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-100 rounded-md">
                          {doc.documentType === 'image' ? (
                            <img 
                              src={doc.thumbnailUrl || doc.url} 
                              alt={doc.title} 
                              className="h-8 w-8 rounded object-cover" 
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder-image.png';
                              }}
                            />
                          ) : (
                            <span className="text-gray-500 text-lg">
                              {doc.documentType === 'legal' ? '📄' : 
                               doc.documentType === 'financial' ? '💰' :
                               doc.documentType === 'technical' ? '🔧' :
                               doc.documentType === 'marketing' ? '📊' :
                               doc.documentType === 'video' ? '🎬' : '📝'}
                            </span>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                            {doc.title || doc.filename || 'Sin título'}
                          </div>
                          {doc.description && (
                            <div className="text-xs text-gray-500 truncate max-w-xs">
                              {doc.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        {DOCUMENT_TYPES.find(t => t.value === doc.documentType)?.label || doc.documentType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        doc.accessLevel === 'public' ? 'bg-green-100 text-green-800' :
                        doc.accessLevel === 'partner' ? 'bg-blue-100 text-blue-800' :
                        doc.accessLevel === 'investor' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {ACCESS_LEVELS.find(l => l.value === doc.accessLevel)?.label || doc.accessLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleView(doc.id)}
                        className="text-primary-600 hover:text-primary-900 mr-3"
                        title="Ver documento"
                      >
                        <DocumentMagnifyingGlassIcon className="h-5 w-5" />
                      </button>
                      {!readOnly && (
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Eliminar documento"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDocumentManager; 