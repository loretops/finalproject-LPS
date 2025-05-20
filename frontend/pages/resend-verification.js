import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import VerificationService from '../services/verificationService';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { FaEnvelope, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const ResendVerificationPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setFormState({
        loading: false,
        success: false,
        error: 'Por favor, introduce tu dirección de correo electrónico.',
      });
      return;
    }
    
    try {
      setFormState({ loading: true, success: false, error: null });
      
      const response = await VerificationService.resendVerificationEmail(email);
      
      if (response.success) {
        setFormState({
          loading: false,
          success: true,
          error: null,
        });
      } else {
        // Manejar diferentes tipos de errores
        let errorMessage = 'No se pudo enviar el correo de verificación.';
        
        if (response.reason === 'user_not_found') {
          errorMessage = 'No se encontró ninguna cuenta con este correo electrónico.';
        } else if (response.reason === 'already_verified') {
          errorMessage = 'Este correo electrónico ya ha sido verificado.';
        } else if (response.message) {
          errorMessage = response.message;
        }
        
        setFormState({
          loading: false,
          success: false,
          error: errorMessage,
        });
      }
    } catch (error) {
      setFormState({
        loading: false,
        success: false,
        error: error.message || 'Ocurrió un error al intentar reenviar el correo de verificación.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <Card className="max-w-md w-full">
        <div className="text-center">
          <FaEnvelope className="text-blue-500 text-5xl mx-auto mb-4" />
          
          <h2 className="text-2xl font-bold mb-4">
            Reenviar correo de verificación
          </h2>
          
          <p className="text-gray-700 mb-6">
            Si no has recibido el correo de verificación o el enlace ha expirado, podemos enviarte uno nuevo.
          </p>
          
          {formState.success ? (
            <div className="mb-6">
              <FaCheckCircle className="text-green-500 text-3xl mx-auto mb-2" />
              <p className="text-green-600">
                Se ha enviado un nuevo correo de verificación a tu dirección de email.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Por favor, revisa tu bandeja de entrada y sigue las instrucciones para verificar tu cuenta.
              </p>
              
              <div className="mt-6">
                <Link href="/login">
                  <Button variant="secondary">
                    Volver a iniciar sesión
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Introduce tu correo electrónico"
                required
                icon={<FaEnvelope />}
                error={formState.error}
              />
              
              <Button 
                type="submit"
                variant="primary"
                isLoading={formState.loading}
                className="w-full"
              >
                Enviar nuevo correo de verificación
              </Button>
            </form>
          )}
          
          <div>
            <Link href="/login" className="text-blue-500 hover:underline">
              Volver a iniciar sesión
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResendVerificationPage; 