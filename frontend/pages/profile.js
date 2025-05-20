import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import VerificationStatus from '../components/ui/VerificationStatus';
import Button from '../components/ui/Button';
import { AuthContext } from '../context/AuthContext';
import VerificationService from '../services/verificationService';
import { withAuth } from '../utils/withAuth';
import { FaUser, FaEnvelope, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();
  
  const [verificationState, setVerificationState] = useState({
    verified: false,
    loading: false,
    sendSuccess: false,
    error: null
  });

  useEffect(() => {
    if (user) {
      checkVerificationStatus();
    }
  }, [user]);

  const checkVerificationStatus = async () => {
    try {
      const response = await VerificationService.checkVerificationStatus();
      if (response.success) {
        setVerificationState(prev => ({
          ...prev,
          verified: response.verified
        }));
      }
    } catch (error) {
      console.error('Error checking verification status:', error);
    }
  };

  const handleSendVerificationEmail = async () => {
    try {
      setVerificationState(prev => ({
        ...prev,
        loading: true,
        sendSuccess: false,
        error: null
      }));
      
      const response = await VerificationService.sendVerificationEmail();
      
      if (response.success) {
        setVerificationState(prev => ({
          ...prev,
          loading: false,
          sendSuccess: true
        }));
      } else {
        setVerificationState(prev => ({
          ...prev,
          loading: false,
          error: response.message || 'No se pudo enviar el email de verificación.'
        }));
      }
    } catch (error) {
      setVerificationState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Error al enviar el email de verificación.'
      }));
    }
  };

  // Formatear la fecha
  const formatDate = (date) => {
    if (!date) return 'No disponible';
    
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <div className="text-center py-8">
              <p>Cargando perfil...</p>
            </div>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout hideVerificationBanner={true}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Perfil de Usuario</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarjeta principal */}
          <div className="md:col-span-2">
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaUser className="text-blue-500 mt-1 mr-4" />
                    <div>
                      <p className="text-sm text-gray-500">Nombre</p>
                      <p className="font-medium">{user.firstName} {user.lastName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaEnvelope className="text-blue-500 mt-1 mr-4" />
                    <div>
                      <p className="text-sm text-gray-500">Correo electrónico</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaCalendarAlt className="text-blue-500 mt-1 mr-4" />
                    <div>
                      <p className="text-sm text-gray-500">Miembro desde</p>
                      <p className="font-medium">{formatDate(user.createdAt)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-3">Estado de verificación</h3>
                  <VerificationStatus 
                    isVerified={verificationState.verified}
                    onSendVerification={handleSendVerificationEmail}
                    loading={verificationState.loading}
                    sendSuccess={verificationState.sendSuccess}
                    error={verificationState.error}
                  />
                </div>
              </div>
            </Card>
          </div>
          
          {/* Tarjeta lateral */}
          <div>
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Acciones</h2>
                
                <div className="space-y-3">
                  <Button 
                    variant="danger"
                    className="w-full"
                    icon={<FaSignOutAlt />}
                    onClick={logout}
                  >
                    Cerrar sesión
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(ProfilePage); 