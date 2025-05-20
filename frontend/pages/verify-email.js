import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import VerificationService from '../services/verificationService';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaSyncAlt, FaEnvelope } from 'react-icons/fa';

const VerifyEmailPage = () => {
  const router = useRouter();
  const { token } = router.query;
  
  const [verificationState, setVerificationState] = useState({
    status: 'loading', // loading, success, error, notfound, expired, used
    message: 'Verificando tu correo electrónico...',
    email: '',
  });
  
  const [resendState, setResendState] = useState({
    loading: false,
    success: false,
    error: null,
  });

  useEffect(() => {
    // Solo verificar cuando tengamos el token disponible
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  const verifyEmail = async (token) => {
    try {
      const response = await VerificationService.verifyEmail(token);
      
      if (response.success) {
        setVerificationState({
          status: 'success',
          message: 'Tu correo electrónico ha sido verificado correctamente.',
          email: response.user?.email || '',
        });
      } else {
        // Manejar diferentes tipos de errores
        if (response.reason === 'token_expired') {
          setVerificationState({
            status: 'expired',
            message: 'El enlace de verificación ha expirado.',
            email: '',
          });
        } else if (response.reason === 'token_already_used') {
          setVerificationState({
            status: 'used',
            message: 'Este enlace de verificación ya ha sido utilizado.',
            email: '',
          });
        } else if (response.reason === 'user_not_found') {
          setVerificationState({
            status: 'notfound',
            message: 'No se encontró la cuenta asociada a este enlace.',
            email: '',
          });
        } else {
          setVerificationState({
            status: 'error',
            message: response.message || 'Error al verificar el correo electrónico.',
            email: '',
          });
        }
      }
    } catch (error) {
      setVerificationState({
        status: 'error',
        message: 'Ocurrió un error al verificar tu correo electrónico.',
        email: '',
      });
    }
  };

  const handleResendEmail = async () => {
    const email = prompt('Introduce tu correo electrónico para reenviar la verificación:');
    
    if (!email) return;
    
    try {
      setResendState({ loading: true, success: false, error: null });
      
      const response = await VerificationService.resendVerificationEmail(email);
      
      if (response.success) {
        setResendState({
          loading: false,
          success: true,
          error: null,
        });
      } else {
        setResendState({
          loading: false,
          success: false,
          error: response.message || 'Error al reenviar el correo de verificación.',
        });
      }
    } catch (error) {
      setResendState({
        loading: false,
        success: false,
        error: error.message || 'Error al reenviar el correo de verificación.',
      });
    }
  };

  const renderIcon = () => {
    switch (verificationState.status) {
      case 'loading':
        return <FaSyncAlt className="animate-spin text-blue-500 text-5xl mb-4" />;
      case 'success':
        return <FaCheckCircle className="text-green-500 text-5xl mb-4" />;
      case 'error':
      case 'notfound':
        return <FaTimesCircle className="text-red-500 text-5xl mb-4" />;
      case 'expired':
      case 'used':
        return <FaExclamationTriangle className="text-yellow-500 text-5xl mb-4" />;
      default:
        return null;
    }
  };

  const renderContent = () => {
    return (
      <div className="text-center">
        {renderIcon()}
        
        <h2 className="text-2xl font-bold mb-4">
          {verificationState.status === 'loading' ? 'Verificando correo electrónico' : 
           verificationState.status === 'success' ? '¡Verificación completada!' : 
           'Verificación no completada'}
        </h2>
        
        <p className="text-gray-700 mb-6">{verificationState.message}</p>
        
        {verificationState.status === 'success' && (
          <div className="mb-6">
            <Button 
              variant="primary"
              onClick={() => router.push('/login')}
            >
              Iniciar sesión
            </Button>
          </div>
        )}
        
        {(verificationState.status === 'expired' || verificationState.status === 'used') && (
          <div className="mb-6">
            <Button 
              variant="secondary"
              onClick={handleResendEmail}
              isLoading={resendState.loading}
              icon={<FaEnvelope />}
            >
              Reenviar email de verificación
            </Button>
            
            {resendState.success && (
              <p className="text-green-500 mt-2">
                Se ha enviado un nuevo correo de verificación.
              </p>
            )}
            
            {resendState.error && (
              <p className="text-red-500 mt-2">
                {resendState.error}
              </p>
            )}
          </div>
        )}
        
        <div>
          <Link href="/" className="text-blue-500 hover:underline">
            Volver a la página principal
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <Card className="max-w-md w-full">
        {renderContent()}
      </Card>
    </div>
  );
};

export default VerifyEmailPage; 