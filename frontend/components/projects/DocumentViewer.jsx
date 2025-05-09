import React, { useState, useEffect } from 'react';
import { 
  DocumentTextIcon, 
  DocumentArrowDownIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  LockClosedIcon,
  ArrowTopRightOnSquareIcon,
  PrinterIcon
} from '@heroicons/react/24/outline';
import Button from '../ui/Button';

/**
 * Componente visor de documentos para proyectos
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.document - Objeto con datos del documento
 * @param {string} props.document.url - URL del documento
 * @param {string} props.document.name - Nombre del documento
 * @param {string} props.document.fileType - Tipo MIME del documento
 * @param {string} props.document.documentType - Tipo de documento (legal, financial, etc.)
 * @param {string} props.document.accessLevel - Nivel de acceso (public, partner, investor, admin)
 * @param {string} props.document.securityLevel - Nivel de seguridad (view_only, download, print, etc.)
 * @param {function} props.onClose - Función para cerrar el visor
 * @param {boolean} props.showControls - Indica si se deben mostrar los controles
 * @param {string} props.className - Clases CSS adicionales
 */
const DocumentViewer = ({ 
  document,
  onClose = () => {},
  showControls = true,
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);
  
  // Si no hay documento, mostrar mensaje
  if (!document || !document.url) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg ${className}`}>
        <DocumentTextIcon className="w-12 h-12 text-gray-400" />
        <p className="mt-4 text-gray-500 text-center">
          No hay documento para visualizar
        </p>
      </div>
    );
  }
  
  // Determinar si el documento es descargable según su nivel de seguridad
  const isDownloadable = document.securityLevel === 'download' || 
                         document.securityLevel === 'full_access';
  
  // Determinar si el documento es imprimible
  const isPrintable = document.securityLevel === 'print' || 
                      document.securityLevel === 'full_access';
  
  // Verificar si es un PDF
  const isPdf = document.fileType?.includes('pdf') || document.url?.endsWith('.pdf');
  
  // Verificar si es una imagen
  const isImage = document.fileType?.startsWith('image/') || 
                  /\.(jpe?g|png|gif|svg|webp)$/i.test(document.url || '');
  
  // Verificar si es un video
  const isVideo = document.fileType?.startsWith('video/') || 
                  /\.(mp4|webm|ogg|mov)$/i.test(document.url || '');
  
  // Verificar si es un documento de Office o texto
  const isOfficeDoc = document.fileType?.includes('officedocument') || 
                     document.fileType?.includes('msword') ||
                     /\.(docx?|xlsx?|pptx?|txt|rtf)$/i.test(document.url || '');
  
  // Manejar descarga del documento
  const handleDownload = () => {
    if (!isDownloadable) {
      alert('Este documento no permite descarga');
      return;
    }
    
    // Crear un enlace temporal para descargar
    const link = document.createElement('a');
    link.href = document.url;
    link.download = document.name || 'documento';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Manejar impresión del documento
  const handlePrint = () => {
    if (!isPrintable) {
      alert('Este documento no permite impresión');
      return;
    }
    
    if (isPdf) {
      // Para PDFs, abrir en una nueva ventana con el diálogo de impresión
      const printWindow = window.open(document.url, '_blank');
      printWindow.addEventListener('load', () => {
        printWindow.print();
      });
    } else if (isImage) {
      // Para imágenes, crear una ventana temporal con la imagen e imprimir
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>${document.name || 'Imagen'}</title>
            <style>
              body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
              img { max-width: 100%; max-height: 100%; object-fit: contain; }
            </style>
          </head>
          <body>
            <img src="${document.url}" alt="${document.name || 'Documento'}" onload="window.print(); window.close();" />
          </body>
        </html>
      `);
      printWindow.document.close();
    } else {
      // Para otros tipos, intentar abrir en una nueva ventana
      alert('Para imprimir este tipo de documento, descárguelo primero');
    }
  };
  
  // Abrir en ventana nueva
  const handleOpenInNewWindow = () => {
    window.open(document.url, '_blank');
  };
  
  // Renderizar controles del documento
  const renderControls = () => {
    if (!showControls) return null;
    
    return (
      <div className="flex items-center space-x-2 p-3 bg-gray-50 border-t border-gray-200">
        {isDownloadable && (
          <Button
            onClick={handleDownload}
            variant="outline"
            size="sm"
            className="flex items-center"
          >
            <DocumentArrowDownIcon className="h-4 w-4 mr-1" />
            Descargar
          </Button>
        )}
        
        {isPrintable && (
          <Button
            onClick={handlePrint}
            variant="outline"
            size="sm"
            className="flex items-center"
          >
            <PrinterIcon className="h-4 w-4 mr-1" />
            Imprimir
          </Button>
        )}
        
        <Button
          onClick={handleOpenInNewWindow}
          variant="outline"
          size="sm"
          className="flex items-center"
        >
          <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1" />
          Abrir
        </Button>
        
        {!isDownloadable && (
          <div className="ml-auto flex items-center text-xs text-gray-500">
            <LockClosedIcon className="h-3 w-3 mr-1" />
            {document.securityLevel === 'view_only' ? 'Solo visualización' : 'Acceso restringido'}
          </div>
        )}
      </div>
    );
  };
  
  // Renderizar el visor según el tipo de documento
  const renderDocumentViewer = () => {
    if (isPdf) {
      return (
        <div className="w-full h-full flex flex-col">
          <div className={`flex-grow relative min-h-[500px] ${isLoading ? 'bg-gray-100' : 'bg-white'}`}>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            )}
            
            {error ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500 mb-2" />
                <p className="text-center text-gray-700 font-medium">Error al cargar el documento</p>
                <p className="text-center text-gray-500 text-sm mt-1">{error}</p>
                <Button 
                  variant="primary" 
                  className="mt-4"
                  onClick={handleOpenInNewWindow}
                >
                  Intentar abrir en nueva ventana
                </Button>
              </div>
            ) : (
              <iframe
                src={`${document.url}#toolbar=${showControls ? '1' : '0'}`}
                className="w-full h-full"
                title={document.name || "Documento PDF"}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false);
                  setError("No se pudo cargar el documento PDF");
                }}
                sandbox="allow-forms allow-modals allow-popups allow-same-origin allow-scripts allow-top-navigation"
              />
            )}
          </div>
          {renderControls()}
        </div>
      );
    } else if (isImage) {
      return (
        <div className="w-full h-full flex flex-col">
          <div className="flex-grow bg-gray-100 relative flex items-center justify-center p-4">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            )}
            
            {error ? (
              <div className="flex flex-col items-center justify-center">
                <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500 mb-2" />
                <p className="text-center text-gray-700">Error al cargar la imagen</p>
              </div>
            ) : (
              <img
                src={document.url}
                alt={document.name || "Documento de imagen"}
                className="max-w-full max-h-[500px] object-contain"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false);
                  setError("No se pudo cargar la imagen");
                }}
              />
            )}
          </div>
          {renderControls()}
        </div>
      );
    } else if (isVideo) {
      return (
        <div className="w-full h-full flex flex-col">
          <div className="flex-grow bg-black relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            )}
            
            <video
              src={document.url}
              controls
              className="w-full h-full max-h-[500px]"
              onLoadedData={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setError("No se pudo cargar el video");
              }}
            >
              Tu navegador no soporta la reproducción de videos.
            </video>
          </div>
          {renderControls()}
        </div>
      );
    } else if (isOfficeDoc) {
      // Para documentos de Office, mostrar vista previa si está disponible o un mensaje de descarga
      return (
        <div className="w-full h-full flex flex-col">
          <div className="flex-grow bg-gray-50 flex flex-col items-center justify-center p-8 text-center">
            <DocumentTextIcon className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {document.name || "Documento"}
            </h3>
            <p className="text-gray-500 mb-6 max-w-md">
              Este tipo de documento requiere una aplicación externa para visualizarlo correctamente.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {isDownloadable && (
                <Button
                  onClick={handleDownload}
                  variant="primary"
                  className="flex items-center"
                >
                  <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                  Descargar documento
                </Button>
              )}
              
              <Button
                onClick={handleOpenInNewWindow}
                variant="outline"
              >
                <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-2" />
                Abrir en nueva ventana
              </Button>
            </div>
          </div>
          {renderControls()}
        </div>
      );
    } else {
      // Para tipos desconocidos, mostrar opción de descarga
      return (
        <div className="w-full h-full flex flex-col">
          <div className="flex-grow bg-gray-50 flex flex-col items-center justify-center p-8 text-center">
            <DocumentTextIcon className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {document.name || "Documento"}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              Tipo: {document.fileType || "Desconocido"}
            </p>
            <p className="text-gray-500 mb-6 max-w-md">
              No se puede mostrar una vista previa para este tipo de documento.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {isDownloadable && (
                <Button
                  onClick={handleDownload}
                  variant="primary"
                  className="flex items-center"
                >
                  <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                  Descargar documento
                </Button>
              )}
            </div>
          </div>
          {renderControls()}
        </div>
      );
    }
  };
  
  // Renderizar en modo de pantalla completa
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        {/* Barra superior */}
        <div className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-200 z-10">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {document.name || "Documento"}
            </h3>
            <p className="text-sm text-gray-500 truncate">
              {document.documentType && (
                <span className="capitalize">{document.documentType}</span>
              )}
              {document.documentType && document.fileType && " • "}
              {document.fileType && (
                <span className="text-gray-400">{document.fileType}</span>
              )}
            </p>
          </div>
          <button 
            onClick={() => {
              setFullScreen(false);
              onClose();
            }}
            className="p-2 rounded-full hover:bg-gray-200 text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        {/* Contenido del documento */}
        <div className="flex-grow overflow-auto">
          {renderDocumentViewer()}
        </div>
      </div>
    );
  }
  
  // Renderizar en modo normal
  return (
    <div className={`bg-white rounded-lg overflow-hidden shadow ${className}`}>
      <div className="p-3 border-b border-gray-200 flex justify-between items-center">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 truncate">
            {document.name || "Documento"}
          </h3>
          <p className="text-xs text-gray-500 truncate">
            {document.documentType && (
              <span className="capitalize">{document.documentType}</span>
            )}
            {document.documentType && document.fileType && " • "}
            {document.fileType && (
              <span className="text-gray-400">{document.fileType}</span>
            )}
          </p>
        </div>
        <button 
          onClick={() => setFullScreen(true)}
          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
        >
          <ArrowTopRightOnSquareIcon className="h-5 w-5" />
        </button>
      </div>
      
      {/* Contenido del documento */}
      <div className="max-h-[600px] overflow-auto">
        {renderDocumentViewer()}
      </div>
    </div>
  );
};

export default DocumentViewer; 