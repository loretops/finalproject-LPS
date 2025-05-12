import React, { useState } from 'react';
import Head from 'next/head';
import ImageGalleryViewer from '../../components/projects/ImageGalleryViewer';
import Button from '../../components/ui/Button';

// Imágenes de ejemplo
const EXAMPLE_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'Casa moderna con piscina',
    description: 'Propiedad de lujo con amplios espacios, acabados premium y vistas panorámicas'
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'Villa de estilo mediterráneo',
    description: 'Vivienda de dos plantas con jardín y terraza cubierta'
  },
  {
    url: 'https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'Apartamento premium',
    description: 'Espacio urbano con acabados de alta calidad y sistemas inteligentes'
  },
  {
    url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
    title: 'Oficinas modernas',
    description: 'Espacio de trabajo con diseño contemporáneo y áreas de colaboración'
  },
  {
    url: 'https://images.unsplash.com/photo-1542889601-399c4f3a8402?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: 'Edificio comercial',
    description: 'Propiedad de uso mixto con locales comerciales y oficinas'
  }
];

// Esta URL no existe intencionalmente para demostrar el manejo de errores
const BROKEN_IMAGE = {
  url: 'https://example.com/non-existent-image.jpg',
  title: 'Imagen con error',
  description: 'Esta imagen no existe para demostrar el manejo de errores'
};

/**
 * Página de demostración del componente ImageGalleryViewer
 */
const ImageGalleryExamplePage = () => {
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [includeError, setIncludeError] = useState(false);
  
  // Preparar imágenes de ejemplo (opcionalmente incluyendo una que genere error)
  const demoImages = includeError 
    ? [BROKEN_IMAGE, ...EXAMPLE_IMAGES] 
    : EXAMPLE_IMAGES;
  
  return (
    <>
      <Head>
        <title>Ejemplo de Visor de Galería | COOPCO</title>
        <meta name="description" content="Demostración del componente de visor de galería de imágenes" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Demostración: Visor de Galería de Imágenes
        </h1>
        
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Opciones de demostración</h2>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={() => setShowFullscreen(true)}
              variant="primary"
            >
              Abrir en pantalla completa
            </Button>
            
            <Button 
              onClick={() => setIncludeError(!includeError)}
              variant={includeError ? "danger" : "outline"}
            >
              {includeError ? "Quitar imagen con error" : "Incluir imagen con error"}
            </Button>
          </div>
          
          <p className="mt-4 text-sm text-gray-600">
            <strong>Nota:</strong> En el modo de pantalla completa, puedes usar las teclas de flecha 
            para navegar entre imágenes (← →) y Escape para cerrar.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Visor estándar</h2>
            <ImageGalleryViewer 
              images={demoImages} 
              showThumbnails={true}
            />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Visor sin miniaturas</h2>
            <ImageGalleryViewer 
              images={demoImages} 
              showThumbnails={false}
            />
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Visor con una sola imagen</h2>
          <div className="max-w-md">
            <ImageGalleryViewer 
              images={[demoImages[0]]} 
              showThumbnails={false}
            />
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Visor sin imágenes (estado vacío)</h2>
          <div className="max-w-md">
            <ImageGalleryViewer 
              images={[]} 
              showThumbnails={true}
            />
          </div>
        </div>
      </div>
      
      {/* Visor en pantalla completa */}
      {showFullscreen && (
        <ImageGalleryViewer 
          images={demoImages} 
          showThumbnails={true}
          isFullScreen={true}
          onClose={() => setShowFullscreen(false)}
        />
      )}
    </>
  );
};

export default ImageGalleryExamplePage; 