import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/Admin/AdminLayout';
import InvitationForm from '../../components/Admin/InvitationForm';
import InvitationList from '../../components/Admin/InvitationList';
import Card from '../../components/ui/Card';

const AdminInvitationsPage = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirigir si no está autenticado o no es manager
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/login'); // Primero a login si no está autenticado
      } else if (user?.role !== 'manager') {
        console.warn('Access denied: User is not a manager.');
        router.push('/dashboard'); // Redirigir a dashboard si no es manager
      }
    }
  }, [user, isAuthenticated, loading, router]);

  // Mostrar carga o null si no se cumplen las condiciones
  if (loading || !isAuthenticated || user?.role !== 'manager') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto"></div>
          <p className="mt-3 text-gray-600">
            {loading ? 'Cargando...' : 'Acceso no autorizado'}
          </p>
        </div>
      </div>
    );
  }

  // Si es manager autenticado, mostrar el contenido
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="border-b border-gray-200 pb-5 mb-5">
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Invitaciones</h1>
          <p className="mt-2 text-sm text-gray-600">
            Desde aquí puedes enviar nuevas invitaciones y ver su estado.
          </p>
        </div>
        
        {/* Sección de enviar invitaciones */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Enviar nueva invitación</h2>
          <InvitationForm />
        </div>
        
        {/* Sección de lista de invitaciones */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Invitaciones existentes</h2>
          <InvitationList />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminInvitationsPage; 