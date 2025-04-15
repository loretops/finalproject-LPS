import { useState, useEffect, useRef } from 'react';
import { secureGet } from '../services/secureApi';

/**
 * Componente para visualización segura de documentos
 * Previene descarga y minimiza riesgos de filtración
 */
const SecureDocumentViewer = ({ documentId, documentType }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [documentUrl, setDocumentUrl] = useState(null);
  const iframeRef = useRef(null);

  // Estilos CSS para prevenir acciones del usuario
  const secureIframeStyles = {
    width: '100%',
    height: '800px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
  };

  // Contenedor que previene acciones de descarga
  const secureContainerStyles = {
    position: 'relative',
    overflow: 'hidden',
  };

  // Overlay que previene click derecho y otras acciones
  const secureOverlayStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 10, // Por encima del iframe pero transparente
  };

  useEffect(() => {
    const loadDocument = async () => {
      try {
        setLoading(true);
        
        // Solicitar URL segura para acceder al documento
        const response = await secureGet(`/api/documents/access/${documentId}`);
        
        if (response.success && response.url) {
          setDocumentUrl(response.url);
        } else {
          throw new Error(response.error || 'No se pudo obtener acceso al documento');
        }
      } catch (err) {
        console.error('Error al cargar el documento:', err);
        setError('No se pudo cargar el documento. Verifica tus permisos.');
      } finally {
        setLoading(false);
      }
    };

    if (documentId) {
      loadDocument();
    }
    
    // Limpiar al desmontar
    return () => {
      // Si hay alguna operación de limpieza necesaria
    };
  }, [documentId]);

  // Registrar evento de carga para auditoría
  const handleIframeLoad = () => {
    // En un entorno real, aquí podrías enviar una petición al backend
    // para registrar que el documento fue visto
    console.log(`Documento ${documentId} visualizado`);
  };

  // Prevenir acciones de descarga y copia
  const handleContextMenu = (e) => {
    e.preventDefault();
    return false;
  };

  // Prevenir arrastrar y soltar
  const handleDragStart = (e) => {
    e.preventDefault();
    return false;
  };

  if (loading) {
    return <div>Cargando documento seguro...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div 
      style={secureContainerStyles}
      onContextMenu={handleContextMenu}
    >
      {/* Overlay para prevenir interacciones no deseadas */}
      <div 
        style={secureOverlayStyles}
        onDragStart={handleDragStart}
        onClick={() => console.log('Interacción con documento detectada')}
      />
      
      {/* El iframe con el contenido real */}
      <iframe
        ref={iframeRef}
        src={documentUrl}
        style={secureIframeStyles}
        title={`Documento seguro ${documentType || ''}`}
        onLoad={handleIframeLoad}
        sandbox="allow-same-origin allow-scripts"
        loading="lazy"
      />
      
      {/* Marcador de agua para recordar confidencialidad */}
      <div 
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          background: 'rgba(255,255,255,0.7)',
          padding: '5px 10px',
          borderRadius: '4px',
          fontSize: '12px',
          color: '#666',
        }}
      >
        Documento confidencial - {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};

export default SecureDocumentViewer; 