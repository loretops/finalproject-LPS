import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaTimesCircle, FaTimes, FaEnvelope } from 'react-icons/fa';
import VerificationService from '../../services/verificationService';
import Button from './Button';

/**
 * Banner para mostrar en la parte superior de las páginas cuando
 * el usuario no tiene el email verificado
 * TEMPORALMENTE DESACTIVADO PARA REDUCIR CARGA EN LA API
 */
const VerificationBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState({
    verified: true,
    loading: false,
    sendSuccess: false,
    error: null
  });

  useEffect(() => {
    setIsVisible(false);
    
    setVerificationStatus(prev => ({
      ...prev,
      verified: true
    }));
  }, []);

  const checkVerificationStatus = async () => {
    return;
  };

  const handleSendVerification = async () => {
    return;
  };

  const handleCloseBanner = () => {
    setIsVisible(false);
  };

  return null;
};

export default VerificationBanner;