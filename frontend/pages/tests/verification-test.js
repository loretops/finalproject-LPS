import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import VerificationStatus from '../../components/ui/VerificationStatus';
import VerificationService from '../../services/verificationService';
import { FaEnvelope, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

/**
 * Página de prueba para verificar la funcionalidad de verificación de email
 */
const VerificationTestPage = () => {
  const [testEmail, setTestEmail] = useState('');
  const [testToken, setTestToken] = useState('');
  const [verificationState, setVerificationState] = useState({
    verified: false,
    loading: false,
    sendSuccess: false,
    error: null
  });
  const [tokenVerificationState, setTokenVerificationState] = useState({
    loading: false,
    result: null,
    error: null
  });
  const [resendState, setResendState] = useState({
    loading: false,
    result: null,
    error: null
  });

  // Simular verificación de estado
  const handleToggleVerified = () => {
    setVerificationState(prev => ({
      ...prev,
      verified: !prev.verified
    }));
  };

  // Probar envío de verificación
  const handleSendVerification = async () => {
    try {
      setVerificationState(prev => ({
        ...prev,
        loading: true,
        sendSuccess: false,
        error: null
      }));
      
      // Simular retraso de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setVerificationState(prev => ({
        ...prev,
        loading: false,
        sendSuccess: true
      }));
    } catch (error) {
      setVerificationState(prev => ({
        ...prev,
        loading: false,
        error: 'Error simulado: ' + error.message
      }));
    }
  };

  // Probar verificación de token
  const handleVerifyToken = async () => {
    if (!testToken) {
      setTokenVerificationState(prev => ({
        ...prev,
        error: 'Debes introducir un token'
      }));
      return;
    }
    
    try {
      setTokenVerificationState({
        loading: true,
        result: null,
        error: null
      });
      
      const response = await VerificationService.verifyEmail(testToken);
      
      setTokenVerificationState({
        loading: false,
        result: response,
        error: null
      });
    } catch (error) {
      setTokenVerificationState({
        loading: false,
        result: null,
        error: error.message
      });
    }
  };

  // Probar reenvío de verificación
  const handleResendVerification = async () => {
    if (!testEmail) {
      setResendState(prev => ({
        ...prev,
        error: 'Debes introducir un email'
      }));
      return;
    }
    
    try {
      setResendState({
        loading: true,
        result: null,
        error: null
      });
      
      const response = await VerificationService.resendVerificationEmail(testEmail);
      
      setResendState({
        loading: false,
        result: response,
        error: null
      });
    } catch (error) {
      setResendState({
        loading: false,
        result: null,
        error: error.message
      });
    }
  };

  return (
    <Layout hideVerificationBanner={true}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Pruebas de Verificación de Email</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Componente VerificationStatus */}
          <Card>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Componente VerificationStatus</h2>
              
              <div className="mb-4 flex space-x-4">
                <Button 
                  variant={verificationState.verified ? "danger" : "primary"}
                  onClick={handleToggleVerified}
                >
                  {verificationState.verified ? "Simular No Verificado" : "Simular Verificado"}
                </Button>
                
                <Button 
                  variant="secondary"
                  onClick={() => {
                    setVerificationState(prev => ({
                      ...prev,
                      error: prev.error ? null : 'Error de prueba'
                    }));
                  }}
                >
                  Toggle Error
                </Button>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-md">
                <VerificationStatus 
                  isVerified={verificationState.verified}
                  onSendVerification={handleSendVerification}
                  loading={verificationState.loading}
                  sendSuccess={verificationState.sendSuccess}
                  error={verificationState.error}
                />
              </div>
              
              <div className="mt-4">
                <h3 className="font-medium mb-2">Versión Compacta</h3>
                <div className="p-4 bg-gray-50 rounded-md">
                  <VerificationStatus 
                    isVerified={verificationState.verified}
                    compact={true}
                  />
                </div>
              </div>
            </div>
          </Card>
          
          {/* Prueba de API: Verificar Token */}
          <Card>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Prueba API: Verificar Token</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Token de Verificación
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={testToken}
                    onChange={(e) => setTestToken(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-l-md"
                    placeholder="Introduce un token de verificación"
                  />
                  <Button 
                    variant="primary"
                    isLoading={tokenVerificationState.loading}
                    className="rounded-l-none"
                    onClick={handleVerifyToken}
                  >
                    Verificar
                  </Button>
                </div>
              </div>
              
              {tokenVerificationState.result && (
                <div className="mb-4 p-3 bg-gray-50 rounded-md">
                  <h3 className="font-medium mb-2">Respuesta:</h3>
                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                    {JSON.stringify(tokenVerificationState.result, null, 2)}
                  </pre>
                </div>
              )}
              
              {tokenVerificationState.error && (
                <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
                  <FaTimesCircle className="inline mr-1" />
                  {tokenVerificationState.error}
                </div>
              )}
            </div>
          </Card>
          
          {/* Prueba de API: Reenviar Email */}
          <Card>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Prueba API: Reenviar Email</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email para Reenvío
                </label>
                <div className="flex">
                  <input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-l-md"
                    placeholder="Introduce un email"
                  />
                  <Button 
                    variant="primary"
                    isLoading={resendState.loading}
                    className="rounded-l-none"
                    onClick={handleResendVerification}
                  >
                    Reenviar
                  </Button>
                </div>
              </div>
              
              {resendState.result && (
                <div className="mb-4 p-3 bg-gray-50 rounded-md">
                  <h3 className="font-medium mb-2">Respuesta:</h3>
                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                    {JSON.stringify(resendState.result, null, 2)}
                  </pre>
                </div>
              )}
              
              {resendState.error && (
                <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
                  <FaTimesCircle className="inline mr-1" />
                  {resendState.error}
                </div>
              )}
            </div>
          </Card>
          
          {/* Enlaces a otras páginas de prueba */}
          <Card>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Enlaces de Prueba</h2>
              
              <ul className="space-y-2">
                <li>
                  <a href="/verify-email?token=test-token" className="text-blue-500 hover:underline">
                    Página de Verificación (token de prueba)
                  </a>
                </li>
                <li>
                  <a href="/verify-email?token=expired-token" className="text-blue-500 hover:underline">
                    Página de Verificación (token expirado)
                  </a>
                </li>
                <li>
                  <a href="/resend-verification" className="text-blue-500 hover:underline">
                    Página de Reenvío de Verificación
                  </a>
                </li>
                <li>
                  <a href="/profile" className="text-blue-500 hover:underline">
                    Página de Perfil (con estado de verificación)
                  </a>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default VerificationTestPage; 