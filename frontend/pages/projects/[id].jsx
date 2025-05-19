import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import withAuth from '../../components/Auth/withAuth';
import publicProjectService from '../../services/publicProjectService';
import InterestButton from '../../components/projects/InterestButton';
import ImageGalleryViewer from '../../components/projects/ImageGalleryViewer';
import DocumentViewer from '../../components/projects/DocumentViewer';
import Button from '../../components/ui/Button';
import { 
  CalendarIcon, 
  MapPinIcon, 
  BuildingOfficeIcon, 
  CurrencyDollarIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ShareIcon,
  UserGroupIcon,
  ArrowLeftIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

/**
 * Página de detalle de un proyecto
 */
const ProjectDetailPage = () => {
  const router = useRouter();
  // Asegurarnos de que el ID es un string y decodificarlo si es necesario
  const projectId = router.query.id ? decodeURIComponent(String(router.query.id)) : null;
  const isFetchingRef = useRef(false);
  
  // Debugging: Mostrar el ID recibido en la consola
  console.log('ProjectDetailPage - Received ID:', projectId);
  console.log('ProjectDetailPage - Full query:', router.query);
  console.log('ProjectDetailPage - Full path:', router.asPath);
  
  // Estados para el proyecto y UI
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [isInterested, setIsInterested] = useState(false);
  const [fullScreenDocument, setFullScreenDocument] = useState(null);
  
  // Categorizar documentos por tipo
  const [images, setImages] = useState([]);
  const [documents, setDocuments] = useState({
    legal: [],
    financial: [],
    technical: [],
    marketing: [],
    other: []
  });
  
  // Formatear valores monetarios
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Calcular porcentaje de financiación
  const getFundingPercentage = () => {
    if (!project || !project.target_amount || project.target_amount <= 0) return 0;
    const currentAmount = project.current_amount || 0; // Asignar 0 por defecto si es undefined o null
    return Math.min(100, Math.round((currentAmount / project.target_amount) * 100));
  };
  
  // Procesar los documentos en las categorías adecuadas
  const processDocuments = (projectData) => {
    if (!projectData || !projectData.documents) return;
    
    const projectImages = [];
    const projectDocs = {
      legal: [],
      financial: [],
      technical: [],
      marketing: [],
      other: []
    };
    
    // Recorrer todos los documentos
    projectData.documents.forEach(doc => {
      // Verificar si es una imagen
      const isImage = 
        doc.documentType === 'image' || 
        doc.fileType?.startsWith('image/') || 
        /\.(jpe?g|png|gif|webp|svg)$/i.test(doc.fileUrl || '');
      
      if (isImage) {
        // Es una imagen para la galería
        projectImages.push({
          url: doc.fileUrl,
          title: doc.title || 'Imagen del proyecto',
          description: doc.description || ''
        });
      } else {
        // Es un documento para categorizar
        const category = doc.documentType || 'other';
        if (projectDocs[category]) {
          projectDocs[category].push(doc);
        } else {
          projectDocs.other.push(doc);
        }
      }
    });
    
    setImages(projectImages);
    setDocuments(projectDocs);
  };
  
  // Cargar los detalles del proyecto
  useEffect(() => {
    const fetchProjectDetails = async () => {
      // Evitar múltiples solicitudes simultáneas o si no hay ID
      if (!projectId || isFetchingRef.current) return;
      
      console.log('ProjectDetailPage - Fetching project with ID:', projectId);
      
      try {
        isFetchingRef.current = true;
        setLoading(true);
        setError(null);
        
        // Llamar a la API para obtener el detalle del proyecto
        const projectData = await publicProjectService.getPublishedProjectById(projectId);
        
        console.log('ProjectDetailPage - Received project data:', projectData);
        
        // Establecer los datos del proyecto
        setProject(projectData);
        
        // Procesar los documentos
        processDocuments(projectData);
        
        // Actualizar el título de la página
        if (projectData && projectData.title) {
          document.title = `${projectData.title} | COOPCO`;
        }
      } catch (err) {
        console.error('Error al cargar detalles del proyecto:', err);
        setError(err.message || 'No se pudo cargar la información del proyecto');
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }
    };
    
    if (router.isReady && projectId) {
      fetchProjectDetails();
    }
  }, [router.isReady, projectId]);
  
  // Manejar el clic en el botón de interés
  const handleInterestClick = async () => {
    if (!project || !project.id) return;
    
    try {
      await publicProjectService.registerInterest(project.id);
      setIsInterested(!isInterested);
    } catch (err) {
      console.error('Error al registrar interés:', err);
      // Aquí podríamos mostrar un toast o notificación de error
    }
  };
  
  // Manejar compartir proyecto
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: `Echa un vistazo a esta oportunidad de inversión: ${project.title}`,
        url: window.location.href
      }).catch(error => console.error('Error compartiendo:', error));
    } else {
      // Fallback para navegadores que no soportan Web Share API
      const url = window.location.href;
      navigator.clipboard.writeText(url)
        .then(() => alert('Enlace copiado al portapapeles'))
        .catch(error => console.error('Error copiando al portapapeles:', error));
    }
  };
  
  // Contenido de cada pestaña
  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="prose prose-lg max-w-none" data-testid="description-content">
            <p>{project.description}</p>
          </div>
        );
      
      case 'gallery':
        return (
          <div className="space-y-6" data-testid="image-gallery">
            {images.length > 0 ? (
              <ImageGalleryViewer 
                images={images} 
                showThumbnails={true}
              />
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No hay imágenes disponibles para este proyecto</p>
              </div>
            )}
          </div>
        );
      
      case 'documents':
        // Obtener categorías que tienen documentos
        const categories = Object.entries(documents)
          .filter(([_, docs]) => docs.length > 0)
          .map(([category, _]) => category);
        
        return (
          <div className="space-y-8" data-testid="documents-section">
            {categories.length > 0 ? (
              <>
                {categories.map(category => (
                  <div key={category} className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 capitalize">
                      Documentos {category === 'other' ? 'adicionales' : category}
                    </h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {documents[category].map(doc => (
                        <div key={doc.id} className="col-span-1">
                          <DocumentViewer 
                            document={{
                              url: doc.fileUrl,
                              name: doc.title || `Documento ${doc.id}`,
                              fileType: doc.fileType,
                              documentType: doc.documentType,
                              accessLevel: doc.accessLevel,
                              securityLevel: doc.securityLevel,
                              description: doc.description
                            }}
                            showControls={true}
                            onFullScreen={() => setFullScreenDocument(doc)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto" />
                <p className="mt-2 text-gray-500">No hay documentos disponibles para este proyecto</p>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };
  
  // Contenido para la sección de acciones (interés, compartir)
  const renderActionButtons = () => (
    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-6">
      <InterestButton 
        projectId={project.id}
        size="lg"
        onInterestChange={(newState) => {
          // Opcional: Actualizar algún estado o realizar alguna acción adicional
          console.log(`Usuario ${newState ? 'mostró' : 'eliminó'} interés en proyecto ${project.id}`);
        }}
      />
      
      <Button
        variant="outline"
        size="lg"
        onClick={handleShareClick}
        aria-label="Compartir proyecto"
        className="flex items-center"
      >
        <ShareIcon className="w-5 h-5 mr-2" />
        Compartir
      </Button>
    </div>
  );
  
  // Renderizar estado de carga
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  // Renderizar estado de error
  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-8 text-center">
            <ExclamationCircleIcon className="h-16 w-16 text-red-500 mx-auto" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Error al cargar el proyecto</h2>
            <p className="mt-2 text-gray-600">{error}</p>
            <Button 
              variant="primary" 
              className="mt-6"
              onClick={() => router.push('/projects')}
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Volver al listado de proyectos
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Renderizar cuando no hay proyecto (nunca debería ocurrir, pero por seguridad)
  if (!project) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Proyecto no encontrado</h2>
            <p className="mt-2 text-gray-600">El proyecto que buscas no existe o ha sido eliminado</p>
            <Button 
              variant="primary" 
              className="mt-6"
              onClick={() => router.push('/projects')}
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Volver al listado de proyectos
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Calcular valores para la UI
  const fundingPercentage = getFundingPercentage();
  const fundingColor = 
    fundingPercentage < 30 ? 'bg-red-500' : 
    fundingPercentage < 70 ? 'bg-yellow-500' : 
    'bg-green-500';
  
  // Renderizar la página de detalle del proyecto
  return (
    <Layout>
      <Head>
        <title>{project ? `${project.title} | COOPCO` : 'Detalle de Proyecto | COOPCO'}</title>
        <meta 
          name="description" 
          content={project?.description?.substring(0, 160) || 'Detalles del proyecto de inversión'} 
        />
      </Head>
      
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Encabezado */}
          <div className="mb-6">
            <button 
              onClick={() => router.push('/projects')}
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              <span>Volver al listado</span>
            </button>
          </div>
          
          {/* Información principal */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8" data-testid="project-header">
            <div className="px-4 py-5 sm:px-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                    {project.title}
                  </h1>
                  <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2">
                    <div className="flex items-center">
                      <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                      <span className="capitalize">{project.property_type || 'Propiedad'}</span>
                    </div>
                    {project.location && (
                      <div className="flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        <span>{project.location}</span>
                      </div>
                    )}
                    {project.published_at && (
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>Publicado el {new Date(project.published_at).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {renderActionButtons()}
              </div>
            </div>
            
            {/* Datos principales */}
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 gap-x-6">
                <div className="col-span-1">
                  <h3 className="text-xs text-gray-500 uppercase tracking-wide">Inversión mínima</h3>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">
                    {formatCurrency(project.minimum_investment)}
                  </p>
                </div>
                
                <div className="col-span-1">
                  <h3 className="text-xs text-gray-500 uppercase tracking-wide">Monto objetivo</h3>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">
                    {formatCurrency(project.target_amount)}
                  </p>
                </div>
                
                <div className="col-span-1">
                  <h3 className="text-xs text-gray-500 uppercase tracking-wide">ROI esperado</h3>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">
                    {project.expected_roi}%
                  </p>
                </div>
                
                <div className="col-span-1">
                  <h3 className="text-xs text-gray-500 uppercase tracking-wide">Inversores</h3>
                  <div className="mt-1 flex items-center">
                    <UserGroupIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <p className="text-2xl font-semibold text-gray-900">
                      {project.investors_count || 0}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Barra de progreso de financiación */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Progreso de inversión: {fundingPercentage}%
                  </span>
                  <span className="text-sm text-gray-600">
                    {formatCurrency(project.current_amount || 0)} de {formatCurrency(project.target_amount)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${fundingColor}`}
                    style={{ width: `${fundingPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pestañas */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="border-b border-gray-200" data-testid="project-tabs">
              <nav className="-mb-px flex space-x-8 px-6 overflow-x-auto">
                <button
                  className={`${
                    activeTab === 'description'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  onClick={() => setActiveTab('description')}
                  data-testid="tab-description"
                >
                  Descripción
                </button>
                
                <button
                  className={`${
                    activeTab === 'gallery'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  onClick={() => setActiveTab('gallery')}
                  data-testid="tab-gallery"
                >
                  Galería {images.length > 0 && `(${images.length})`}
                </button>
                
                <button
                  className={`${
                    activeTab === 'documents'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  onClick={() => setActiveTab('documents')}
                  data-testid="tab-documents"
                >
                  Documentos {Object.values(documents).flat().length > 0 && 
                    `(${Object.values(documents).flat().length})`}
                </button>
              </nav>
            </div>
            
            {/* Contenido de la pestaña activa */}
            <div className="px-4 py-5 sm:p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
      
      {/* Documento en pantalla completa */}
      {fullScreenDocument && (
        <DocumentViewer 
          document={{
            url: fullScreenDocument.fileUrl,
            name: fullScreenDocument.title || `Documento ${fullScreenDocument.id}`,
            fileType: fullScreenDocument.fileType,
            documentType: fullScreenDocument.documentType,
            accessLevel: fullScreenDocument.accessLevel,
            securityLevel: fullScreenDocument.securityLevel
          }}
          isFullScreen={true}
          onClose={() => setFullScreenDocument(null)}
        />
      )}
    </Layout>
  );
};

// Proteger la página para que solo accedan socios
export default withAuth(ProjectDetailPage, ['partner', 'investor', 'manager']); 