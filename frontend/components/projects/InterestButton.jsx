import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import Button from '../ui/Button';
import interestService from '../../services/interestService';
import { useAuth } from '../../context/AuthContext';

/**
 * Botón "Me Interesa" para proyectos de inversión
 * @param {Object} props - Propiedades del componente
 * @param {string} props.projectId - ID del proyecto
 * @param {string} [props.variant='primary'] - Variante visual del botón
 * @param {string} [props.size='md'] - Tamaño del botón
 * @param {boolean} [props.showText=true] - Si debe mostrar texto además del icono
 * @param {string} [props.className=''] - Clases CSS adicionales
 * @param {Function} [props.onInterestChange] - Callback al cambiar el estado de interés
 */
const InterestButton = ({
  projectId,
  variant = 'primary',
  size = 'md',
  showText = true,
  className = '',
  onInterestChange,
}) => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  
  // Asegurar que el ID sea un string y esté limpio
  const sanitizedProjectId = projectId ? String(projectId).trim() : '';
  
  // Mostrar información de debugging
  console.log(`InterestButton - ProjectID tipo: ${typeof projectId}, valor: ${projectId}, sanitizado: ${sanitizedProjectId}`);
  
  // Estados
  const [isInterested, setIsInterested] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  
  // Verificar si el usuario tiene interés en este proyecto
  useEffect(() => {
    const checkInterest = async () => {
      if (isAuthenticated && sanitizedProjectId) {
        try {
          const hasInterest = await interestService.checkUserInterest(sanitizedProjectId);
          setIsInterested(hasInterest);
        } catch (error) {
          console.error('Error al verificar interés:', error);
        } finally {
          setIsInitializing(false);
        }
      } else {
        setIsInitializing(false);
      }
    };
    
    checkInterest();
  }, [sanitizedProjectId, isAuthenticated]);
  
  // Handler para detener la propagación
  const stopPropagation = (e) => {
    // Detener la propagación para evitar que el clic llegue a la tarjeta/enlace
    if (e) {
      e.stopPropagation();
      e.preventDefault();
      // Usar también stopImmediatePropagation para mayor seguridad
      if (e.nativeEvent) {
        e.nativeEvent.stopImmediatePropagation();
      }
    }
  };
  
  // Manejar clic en el botón
  const handleInterestClick = async (e) => {
    // Detener la propagación
    stopPropagation(e);
    
    // Si no está autenticado, redirigir al login
    if (!isAuthenticated) {
      // Guardar la URL actual para redirigir después del login
      const returnUrl = router.asPath;
      localStorage.setItem('returnUrl', returnUrl);
      
      toast.error('Debes iniciar sesión para mostrar interés en proyectos', {
        duration: 4000,
      });
      
      router.push(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
      return;
    }
    
    if (!sanitizedProjectId) {
      console.error('No se puede registrar interés: ID de proyecto no válido', {
        original: projectId,
        sanitized: sanitizedProjectId
      });
      toast.error('No se pudo procesar la acción. ID de proyecto no válido.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log('Estado de interés antes de la acción:', isInterested ? 'Interesado' : 'No interesado');
      
      if (isInterested) {
        // Obtenemos primero el ID del interés
        const interests = await interestService.getUserInterests({ status: 'active' });
        console.log('Intereses obtenidos:', interests);
        
        const interest = interests.find(i => i.project?.id === sanitizedProjectId);
        console.log('Interés encontrado:', interest);
        
        if (interest) {
          await interestService.removeInterest(interest.id);
          setIsInterested(false);
          
          toast.success('Has eliminado tu interés en este proyecto');
          
          if (onInterestChange) {
            onInterestChange(false);
          }
        } else {
          // Si no encontramos el interés pero el estado es "interesado", corregir el estado
          console.warn('Estado inconsistente: isInterested=true pero no se encontró el interés');
          setIsInterested(false);
          toast.error('No se encontró tu interés previo en este proyecto');
        }
      } else {
        try {
          await interestService.registerInterest(sanitizedProjectId);
          setIsInterested(true);
          
          toast.success('Has mostrado interés en este proyecto', {
            description: 'Te mantendremos informado de las novedades'
          });
          
          if (onInterestChange) {
            onInterestChange(true);
          }
        } catch (error) {
          // Si el error es 409 (Conflict), significa que ya tiene interés
          if (error.response && error.response.status === 409) {
            // Actualizar el estado para mostrar como interesado
            setIsInterested(true);
            
            toast.success('Ya habías mostrado interés en este proyecto anteriormente');
            
            if (onInterestChange) {
              onInterestChange(true);
            }
          } else if (error.response && error.response.status === 500) {
            // Error del servidor
            const errorDetail = error.response?.data?.message || 'Error interno del servidor';
            console.error('Error 500 detallado:', {
              projectId: sanitizedProjectId,
              error: errorDetail,
              response: error.response?.data
            });
            
            toast.error(`Error en el servidor: ${errorDetail}. Por favor, inténtalo de nuevo más tarde.`);
            
            // Vamos a actualizar el estado de interés para evitar inconsistencias
            try {
              const hasInterest = await interestService.checkUserInterest(sanitizedProjectId);
              setIsInterested(hasInterest);
            } catch (checkError) {
              console.error('Error al verificar estado de interés:', checkError);
            }
          } else {
            // Propagar el error para que sea manejado por el bloque catch externo
            throw error;
          }
        }
      }
    } catch (error) {
      // Mostrar mensaje de error específico si viene del servidor
      const errorMessage = error.response?.data?.message || 
        'Ha ocurrido un error al procesar tu solicitud';
      
      toast.error(errorMessage);
      console.error('Error al actualizar interés:', error);
      
      // Intentar recuperar el estado actual de interés para evitar inconsistencias
      try {
        const currentInterestState = await interestService.checkUserInterest(sanitizedProjectId);
        if (currentInterestState !== isInterested) {
          console.log('Corrigiendo estado inconsistente de interés');
          setIsInterested(currentInterestState);
        }
      } catch (checkError) {
        console.error('Error al verificar estado actual de interés:', checkError);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // Determinar variante visual según el estado de interés
  const buttonVariant = isInterested ? 'secondary' : variant;
  
  return (
    <div 
      onClick={stopPropagation}
      onMouseDown={stopPropagation}
      onTouchStart={stopPropagation}
      className="relative z-50"
    >
      <Button
        variant={buttonVariant}
        size={size}
        isLoading={isLoading || isInitializing}
        onClick={handleInterestClick}
        className={`group transition-all duration-300 ${isInterested ? 'bg-green-100 text-green-800 hover:bg-green-200 border border-green-300' : ''} ${className}`}
        disabled={isLoading || isInitializing}
        aria-label={isInterested ? 'Quitar interés' : 'Mostrar interés'}
        title={isInterested ? 'Ya has mostrado interés en este proyecto' : 'Mostrar interés en este proyecto'}
      >
        {/* Icono de corazón con animación */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill={isInterested ? "currentColor" : "none"} 
          stroke="currentColor" 
          className={`w-5 h-5 ${showText ? 'mr-2' : ''} transition-transform duration-300 group-hover:scale-110 ${isInterested ? 'text-green-600' : ''}`}
          strokeWidth={isInterested ? "0" : "2"}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" 
          />
        </svg>
        
        {/* Texto del botón (opcional) */}
        {showText && (
          <span>
            {isInterested ? 'Interesado' : 'Me interesa'}
          </span>
        )}
      </Button>
    </div>
  );
};

export default InterestButton; 