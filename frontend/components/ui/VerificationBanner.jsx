import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaTimesCircle, FaTimes, FaEnvelope } from 'react-icons/fa';
import VerificationService from '../../services/verificationService';
import Button from './Button';

/**
 * Banner para mostrar en la parte superior de las páginas cuando
 * el usuario no tiene el email verificado
 */
const VerificationBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState({
    verified: null, // null = loading, true = verified, false = not verified
    loading: false,
    sendSuccess: false,
    error: null
  });

  useEffect(() => {
    // Verificar si el banner está cerrado en localStorage
    const bannerClosed = localStorage.getItem('verificationBannerClosed');
    if (bannerClosed) {
      setIsVisible(false);
    }
    
    // Solo intentar verificar en desarrollo o si estamos en producción y es seguro hacerlo
    const isProduction = process.env.NODE_ENV === 'production';
    if (!isProduction) {
      // En entorno de desarrollo, siempre intentar verificar
      checkVerificationStatus();
    } else {
      // En producción, temporalmente establecer verified a true para evitar problemas
      setVerificationStatus(prev => ({
        ...prev,
        verified: true
      }));
      setIsVisible(false);
    }
  }, []);

  const checkVerificationStatus = async () => {
    try {
      const response = await VerificationService.checkVerificationStatus();
      if (response.success) {
        setVerificationStatus(prev => ({
          ...prev,
          verified: response.verified
        }));
        
        // Si está verificado, ocultar el banner
        if (response.verified) {
          setIsVisible(false);
        }
      }
    } catch (error) {
      console.error('Error checking verification status:', error);
    }
  };

  const handleSendVerification = async () => {
    try {
      setVerificationStatus(prev => ({
        ...prev,
        loading: true,
        sendSuccess: false,
        error: null
      }));
      
      const response = await VerificationService.sendVerificationEmail();
      
      if (response.success) {
        setVerificationStatus(prev => ({
          ...prev,
          loading: false,
          sendSuccess: true
        }));
      } else {
        setVerificationStatus(prev => ({
          ...prev,
          loading: false,
          error: response.message || 'No se pudo enviar el email de verificación.'
        }));
      }
    } catch (error) {
      setVerificationStatus(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Error al enviar el email de verificación.'
      }));
    }
  };

  const handleCloseBanner = () => {
    setIsVisible(false);
    // Recordar que el usuario cerró el banner
    localStorage.setItem('verificationBannerClosed', 'true');
  };

  // No mostrar si está verificado o el estado es desconocido (cargando)
  if (!isVisible || verificationStatus.verified === null || verificationStatus.verified === true) {
    return null;
  }

  return (
    <div className="bg-yellow-50 border-b border-yellow-100 px-4 py-3 fixed top-0 left-0 w-full z-30">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center mb-2 sm:mb-0 pr-4">
          <FaExclamationTriangle className="text-yellow-500 mr-2" />
          <span className="text-sm font-medium">
            Tu correo electrónico no ha sido verificado
          </span>
        </div>
        
        <div className="flex items-center">
          {verificationStatus.sendSuccess ? (
            <span className="text-green-600 text-xs mr-3">
              Email de verificación enviado correctamente
            </span>
          ) : (
            <Button
              variant="light"
              size="xs"
              onClick={handleSendVerification}
              isLoading={verificationStatus.loading}
              icon={<FaEnvelope />}
              className="mr-3"
            >
              Enviar email de verificación
            </Button>
          )}
          
          <button 
            onClick={handleCloseBanner} 
            className="text-gray-400 hover:text-gray-600"
            aria-label="Cerrar"
          >
            <FaTimes />
          </button>
        </div>
        
        {verificationStatus.error && (
          <div className="w-full mt-1">
            <p className="text-red-500 text-xs">
              <FaTimesCircle className="inline mr-1" /> 
              {verificationStatus.error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationBanner; 