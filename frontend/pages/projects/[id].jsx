import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  ArrowLeftIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ExclamationCircleIcon,
  MapPinIcon,
  UserGroupIcon,
  ShareIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  PhotoIcon,
  HomeIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import Button from '../../components/ui/Button';
import Layout from '../../components/layout/Layout';
import InterestButton from '../../components/projects/InterestButton';
import ImageGalleryViewer from '../../components/projects/ImageGalleryViewer';
import DocumentViewer from '../../components/projects/DocumentViewer';
import InvestButton from '../../components/projects/InvestButton';
import InvestmentSummary from '../../components/projects/InvestmentSummary';
import publicProjectService from '../../services/publicProjectService';
import { formatCurrency } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';

/**
 * Página de detalle de un proyecto específico
 * Permite ver toda la información de un proyecto y realizar acciones como
 * expresar interés, compartir o invertir en él.
 */
const ProjectDetailPage = () => {
  const router = useRouter();
  const { id: projectId } = router.query;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [fullScreenDocument, setFullScreenDocument] = useState(null);
  const [isInterested, setIsInterested] = useState(false);
  const [images, setImages] = useState([]);
  const isFetchingRef = useRef(false);
  const { user } = useAuth();
  
  // Estado para almacenar los documentos organizados por categoría
  const [documents, setDocuments] = useState({
    legal: [],
    financial: [],
    technical: [],
    marketing: [],
    other: []
  });
  
  // Calcular porcentaje de financiación
  const getFundingPercentage = () => {
    if (!project || !project.target_amount || !project.current_amount) return 0;
    return Math.min(100, Math.round((project.current_amount / project.target_amount) * 100));
  };
  
  // Procesar los documentos en las categorías adecuadas
  const processDocuments = (projectData) => {
    if (!projectData || !projectData.documents) {
      console.log('No hay documentos para procesar:', projectData);
      return;
    }
    
    console.log('Procesando documentos:', projectData.documents);
    
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
      console.log('Procesando documento:', doc);
      
      // Verificar si es una imagen
      const isImage = 
        doc.documentType === 'image' || 
        doc.fileType?.startsWith('image/') || 
        /\.(jpe?g|png|gif|webp|svg)$/i.test(doc.fileUrl || '');
      
      if (isImage) {
        // Es una imagen para la galería
        console.log('Añadiendo imagen a la galería:', doc.fileUrl);
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
    
    console.log(`Imágenes procesadas: ${projectImages.length}`, projectImages);
    
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

  // Manejar actualización del proyecto después de una inversión exitosa
  const handleInvestmentSuccess = (investmentData) => {
    // Actualizar el objeto del proyecto con el nuevo monto actual
    if (project && investmentData) {
      setProject(prevProject => ({
        ...prevProject,
        current_amount: parseFloat(prevProject.current_amount) + parseFloat(investmentData.amount)
      }));
    }
  };
  
  // Estado para mostrar/ocultar el formulario de inversión
  const [showInvestmentForm, setShowInvestmentForm] = useState(false);
  
  // Manejar apertura del formulario de inversión
  const handleInvestClick = () => {
    setShowInvestmentForm(true);
  };
  
  // Manejar cierre del formulario de inversión
  const handleCloseInvestForm = () => {
    setShowInvestmentForm(false);
  };
  
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
                <p className="text-gray-500">No hay documentos disponibles para este proyecto</p>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };
  
  // Contenido para la sección de acciones (interés, compartir, invertir)
  const renderActionButtons = () => {
    // Determinar si el usuario es socio/inversor o gestor/admin
    const isManagerOrAdmin = user?.role === 'manager' || user?.role === 'admin';

    return (
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 mt-6">
        {/* Mostrar el botón "Me interesa" solo a socios/inversores */}
        {!isManagerOrAdmin && (
          <InterestButton 
            projectId={project.id}
            size="lg"
            onInterestChange={(newState) => {
              // Opcional: Actualizar algún estado o realizar alguna acción adicional
              console.log(`Usuario ${newState ? 'mostró' : 'eliminó'} interés en proyecto ${project.id}`);
            }}
          />
        )}
        
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
  };
  
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
    <>
      <Head>
        <title>{project.title || 'Detalle de proyecto'} | COOPCO</title>
        <meta name="description" content={project.description?.substring(0, 160) || 'Detalle de proyecto de inversión inmobiliaria'} />
      </Head>
      
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navegación y título */}
          <div className="mb-6">
            <button
              onClick={() => router.push('/projects')}
              className="flex items-center text-gray-500 hover:text-gray-700 mb-4"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-1" />
              Volver al listado
            </button>
            
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              {project.title}
            </h1>
            
            <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500 gap-4">
              <span className="flex items-center">
                <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" />
                {project.location || 'Ubicación no especificada'}
              </span>
              
              <span className="flex items-center">
                <BuildingOfficeIcon className="h-4 w-4 mr-1 text-gray-400" />
                {project.property_type || 'Tipo no especificado'}
              </span>
              
              <span className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                Publicado el {new Date(project.published_at || project.created_at).toLocaleDateString('es-ES')}
              </span>
            </div>
          </div>
          
          {/* Contenido principal en 2 columnas en desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna principal (más ancha) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Galería destacada */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                {images.length > 0 ? (
                  <ImageGalleryViewer 
                    images={images} 
                    showThumbnails={true}
                  />
                ) : (
                  <div className="text-center py-12 bg-gray-50">
                    <HomeIcon className="h-12 w-12 text-gray-400 mx-auto" />
                    <p className="mt-2 text-gray-500">No hay imágenes disponibles para este proyecto</p>
                  </div>
                )}
              </div>

              {/* Pestañas para la información */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="border-b border-gray-200">
                  <nav className="flex -mb-px">
                    <button
                      onClick={() => setActiveTab('description')}
                      className={`py-4 px-6 font-medium text-sm border-b-2 ${
                        activeTab === 'description' 
                          ? 'border-blue-500 text-blue-600' 
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <DocumentTextIcon className="h-5 w-5 inline mr-1" />
                      Descripción
                    </button>
                    
                    <button
                      onClick={() => setActiveTab('documents')}
                      className={`py-4 px-6 font-medium text-sm border-b-2 ${
                        activeTab === 'documents' 
                          ? 'border-blue-500 text-blue-600' 
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <DocumentCheckIcon className="h-5 w-5 inline mr-1" />
                      Documentos
                    </button>
                  </nav>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  {renderTabContent()}
                </div>
              </div>
            </div>

            {/* Columna lateral (información financiera y acciones) */}
            <div className="space-y-6">
              {/* Tarjeta de inversión */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Información de Inversión
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="block text-sm font-medium text-gray-500">
                        Inversión mínima
                      </span>
                      <span className="block mt-1 text-2xl font-semibold text-gray-900">
                        {formatCurrency(project.minimum_investment)}
                      </span>
                    </div>
                    
                    <div>
                      <span className="block text-sm font-medium text-gray-500">
                        Rentabilidad esperada
                      </span>
                      <span className="block mt-1 text-2xl font-semibold text-green-600">
                        {project.expected_roi}%
                      </span>
                    </div>

                    <div>
                      <span className="block text-sm font-medium text-gray-500 mb-1">
                        Progreso de financiación
                      </span>
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>{fundingPercentage}% completado</span>
                        <span>{formatCurrency(project.current_amount)} / {formatCurrency(project.target_amount)}</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${fundingColor} transition-all duration-500`}
                          style={{ width: `${fundingPercentage}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* Botones de acción */}
                    <div className="pt-4">
                      {/* Botón de inversión directa - Visible para socios */}
                      {user && ['partner', 'investor'].includes(user.role) && (
                        <Button
                          variant="primary"
                          size="lg"
                          onClick={handleInvestClick}
                          className="w-full mb-3"
                        >
                          <CurrencyDollarIcon className="h-5 w-5 mr-2" />
                          Invertir ahora
                        </Button>
                      )}
                      
                      {/* Otros botones */}
                      {renderActionButtons()}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Información adicional */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-md font-medium text-gray-900 mb-3">
                    Información adicional
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex justify-between">
                      <span className="text-gray-500">Estado:</span>
                      <span className="font-medium">
                        {project.status === 'published' ? 'Publicado' : 
                         project.status === 'funded' ? 'Financiado' : 
                         project.status === 'closed' ? 'Cerrado' : 'Borrador'}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-500">Tipo de propiedad:</span>
                      <span className="font-medium">{project.property_type || 'No especificado'}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-500">Ubicación:</span>
                      <span className="font-medium">{project.location || 'No especificada'}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      
      {/* Modal de inversión */}
      {showInvestmentForm && (
        <InvestButton 
          project={{
            id: project.id,
            title: project.title,
            status: project.status,
            minimumInvestment: project.minimum_investment,
            targetAmount: project.target_amount,
            currentAmount: project.current_amount || 0,
            expectedRoi: project.expected_roi,
            draft: project.draft || false,
            active: project.status === 'published' && !(project.draft === true)
          }}
          initialOpen={true}
          onClose={handleCloseInvestForm}
          onInvestmentSuccess={handleInvestmentSuccess}
        />
      )}
      
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
    </>
  );
};

export default ProjectDetailPage;