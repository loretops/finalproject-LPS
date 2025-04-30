import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
// Importaremos el formulario aquí después
import InvitationForm from '../../components/Admin/InvitationForm';
import InvitationList from '../../components/Admin/InvitationList';

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
    // Podrías mostrar un mensaje específico de "Acceso denegado" si !loading && user?.role !== 'manager'
    return <div>Cargando o acceso no autorizado...</div>;
  }

  // Si es manager autenticado, mostrar el contenido
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Gestión de Invitaciones</h1>
      <p>Desde aquí puedes enviar nuevas invitaciones y ver su estado.</p>
      
      {/* Sección de enviar invitaciones */}
      <div style={{ marginBottom: '2rem' }}>
        <h2>Enviar nueva invitación</h2>
        <InvitationForm />
      </div>
      
      {/* Sección de lista de invitaciones */}
      <div>
        <InvitationList />
      </div>
    </div>
  );
};

export default AdminInvitationsPage; 