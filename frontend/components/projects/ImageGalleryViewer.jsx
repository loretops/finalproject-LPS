import React, { useState, useEffect, useCallback } from 'react';
import { 
  XMarkIcon, 
  ArrowLeftIcon, 
  ArrowRightIcon,
  ArrowsPointingOutIcon,
  PhotoIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

/**
 * Componente visor de galería de imágenes para proyectos
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.images - Array de objetos de imagen con url, title y description
 * @param {boolean} props.showThumbnails - Indica si se deben mostrar miniaturas (default: true)
 * @param {function} props.onClose - Función para cerrar el visor en modo fullscreen
 * @param {boolean} props.isFullScreen - Indica si el visor está en modo pantalla completa
 * @param {string} props.className - Clases CSS adicionales
 */
const ImageGalleryViewer = ({ 
  images = [], 
  showThumbnails = true, 
  onClose = () => {}, 
  isFullScreen = false,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullScreen, setFullScreen] = useState(isFullScreen);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  // Reiniciar el estado de error cuando cambia la imagen actual
  useEffect(() => {
    setImageError(false);
    setIsLoading(true);
  }, [currentIndex]);
  
  // Navegar a la imagen anterior
  const goToPrevious = useCallback(() => {
    if (images.length <= 1) return;
    
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, images.length]);
  
  // Navegar a la imagen siguiente
  const goToNext = useCallback(() => {
    if (images.length <= 1) return;
    
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, images.length]);
  
  // Manejar navegación con teclado
  useEffect(() => {
    if (!fullScreen) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'Escape') {
        setFullScreen(false);
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullScreen, goToNext, goToPrevious, onClose]);
  
  // Si no hay imágenes, mostrar mensaje
  if (images.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg ${className}`}>
        <PhotoIcon className="w-12 h-12 text-gray-400" />
        <p className="mt-4 text-gray-500 text-center">
          No hay imágenes disponibles para este proyecto
        </p>
      </div>
    );
  }
  
  // Imagen actual
  const currentImage = images[currentIndex];
  
  // Renderizar el visor en pantalla completa
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
        {/* Barra superior */}
        <div className="flex justify-between items-center p-4 text-white z-10">
          <div className="flex-1">
            <h3 className="text-lg font-medium truncate">
              {currentImage.title || `Imagen ${currentIndex + 1} de ${images.length}`}
            </h3>
            {currentImage.description && (
              <p className="text-sm text-gray-300 truncate max-w-lg">
                {currentImage.description}
              </p>
            )}
          </div>
          <button 
            onClick={() => {
              setFullScreen(false);
              onClose();
            }}
            className="p-2 rounded-full hover:bg-gray-700 text-white"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        {/* Visor de imagen principal */}
        <div className="flex-1 flex items-center justify-center relative overflow-hidden">
          {/* Navegación izquierda */}
          {images.length > 1 && (
            <button 
              onClick={goToPrevious}
              className="absolute left-4 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 text-white z-10"
              aria-label="Imagen anterior"
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
          )}
          
          {/* Imagen */}
          <div className="relative flex items-center justify-center h-full w-full">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            )}
            
            {imageError ? (
              <div className="flex flex-col items-center justify-center text-white">
                <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500 mb-2" />
                <p>Error al cargar la imagen</p>
              </div>
            ) : (
              <img
                src={currentImage.url}
                alt={currentImage.title || `Imagen ${currentIndex + 1}`}
                className="max-h-full max-w-full object-contain"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false);
                  setImageError(true);
                }}
              />
            )}
          </div>
          
          {/* Navegación derecha */}
          {images.length > 1 && (
            <button 
              onClick={goToNext}
              className="absolute right-4 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 text-white z-10"
              aria-label="Imagen siguiente"
            >
              <ArrowRightIcon className="h-6 w-6" />
            </button>
          )}
        </div>
        
        {/* Miniaturas */}
        {showThumbnails && images.length > 1 && (
          <div className="p-3 bg-black bg-opacity-70">
            <div className="flex space-x-2 overflow-x-auto py-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden ${
                    index === currentIndex ? 'ring-2 ring-primary-500' : 'opacity-70'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.title || `Miniatura ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.png';
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Renderizar el visor normal (no pantalla completa)
  return (
    <div className={`bg-white rounded-lg overflow-hidden shadow ${className}`}>
      {/* Visor de imagen principal */}
      <div className="relative aspect-w-16 aspect-h-9 bg-gray-100">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        )}
        
        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-yellow-500 mb-2" />
            <p className="text-sm text-gray-500">Error al cargar la imagen</p>
          </div>
        ) : (
          <img
            src={currentImage.url}
            alt={currentImage.title || `Imagen ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setImageError(true);
            }}
          />
        )}
        
        {/* Botón pantalla completa */}
        <button
          onClick={() => setFullScreen(true)}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 text-gray-700 shadow"
          aria-label="Ver a pantalla completa"
        >
          <ArrowsPointingOutIcon className="h-5 w-5" />
        </button>
        
        {/* Navegación */}
        {images.length > 1 && (
          <>
            <button 
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 text-gray-700 shadow"
              aria-label="Imagen anterior"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            
            <button 
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 text-gray-700 shadow"
              aria-label="Imagen siguiente"
            >
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      
      {/* Título e información */}
      {(currentImage.title || currentImage.description) && (
        <div className="p-3 border-t border-gray-100">
          {currentImage.title && (
            <h4 className="font-medium text-gray-900">{currentImage.title}</h4>
          )}
          {currentImage.description && (
            <p className="mt-1 text-sm text-gray-500">{currentImage.description}</p>
          )}
        </div>
      )}
      
      {/* Miniaturas */}
      {showThumbnails && images.length > 1 && (
        <div className="border-t border-gray-100 bg-gray-50 p-2">
          <div className="flex space-x-2 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-14 h-14 rounded overflow-hidden ${
                  index === currentIndex ? 'ring-2 ring-primary-500' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={image.url}
                  alt={image.title || `Miniatura ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.png';
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGalleryViewer; 