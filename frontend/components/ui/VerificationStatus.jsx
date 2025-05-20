import React from 'react';
import Link from 'next/link';
import { FaCheckCircle, FaTimesCircle, FaEnvelope, FaExclamationTriangle } from 'react-icons/fa';
import Button from './Button';

/**
 * Componente para mostrar el estado de verificación de email de un usuario
 * 
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isVerified - Si el email está verificado
 * @param {function} props.onSendVerification - Función para enviar email de verificación
 * @param {boolean} props.loading - Si está cargando el envío
 * @param {boolean} props.sendSuccess - Si el envío fue exitoso
 * @param {string} props.error - Mensaje de error si hay alguno
 * @param {boolean} props.compact - Si se debe mostrar en modo compacto
 * @param {string} props.className - Clases adicionales
 */
const VerificationStatus = ({ 
  isVerified, 
  onSendVerification, 
  loading = false,
  sendSuccess = false,
  error = null,
  compact = false,
  className = ''
}) => {
  // Si está verificado, mostrar check verde
  if (isVerified) {
    return (
      <div className={`flex items-center ${compact ? 'text-sm' : ''} ${className}`}>
        <FaCheckCircle className="text-green-500 mr-2" />
        <span>
          {compact ? 'Email verificado' : 'Tu dirección de correo electrónico ha sido verificada.'}
        </span>
      </div>
    );
  }
  
  // Si no está verificado, mostrar advertencia o error
  return (
    <div className={`${compact ? '' : 'p-4 border border-yellow-200 bg-yellow-50 rounded-md'} ${className}`}>
      <div className={`flex items-center ${compact ? 'text-sm' : ''}`}>
        <FaExclamationTriangle className={`text-yellow-500 ${compact ? 'mr-2' : 'text-xl mr-3'}`} />
        <span className={compact ? '' : 'font-medium'}>
          {compact ? 'Email no verificado' : 'Tu correo electrónico no ha sido verificado'}
        </span>
      </div>
      
      {!compact && (
        <>
          <p className="mt-2 ml-7 text-sm text-gray-600">
            Para acceder a todas las funcionalidades, por favor verifica tu dirección de correo electrónico.
          </p>
          
          <div className="mt-3 ml-7">
            {sendSuccess ? (
              <p className="text-green-600 text-sm">
                <FaCheckCircle className="inline mr-1" /> Email de verificación enviado correctamente.
              </p>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={onSendVerification}
                isLoading={loading}
                icon={<FaEnvelope />}
              >
                Enviar email de verificación
              </Button>
            )}
            
            {error && (
              <p className="text-red-500 text-sm mt-1">
                <FaTimesCircle className="inline mr-1" /> {error}
              </p>
            )}
          </div>
          
          <p className="mt-3 ml-7 text-xs text-gray-500">
            ¿No recibiste el email? {' '}
            <Link href="/resend-verification" className="text-blue-500 hover:underline">
              Solicitar reenvío
            </Link>
          </p>
        </>
      )}
    </div>
  );
};

export default VerificationStatus; 