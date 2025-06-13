import React, { useState, useEffect } from 'react';
import { getInvitations } from '../../services/invitationService';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const InvitationList = () => {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Para forzar refrescos

  // Función para convertir estados a texto legible
  const getStatusText = (status) => {
    switch (status) {
      case 'PENDING': return 'Pendiente';
      case 'USED': return 'Utilizada';
      case 'EXPIRED': return 'Expirada';
      default: return status;
    }
  };

  // Función para obtener clases para el estado
  const getStatusClasses = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'USED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'EXPIRED':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Función para formatear fechas de forma segura
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Fecha inválida';
      
      return date.toLocaleDateString('es-ES', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formateando fecha:', error);
      return 'Error en fecha';
    }
  };

  // Obtener invitaciones
  useEffect(() => {
    const fetchInvitations = async () => {
      setLoading(true);
      setError('');
      try {
        console.log('🔍 Cargando invitaciones...');
        const data = await getInvitations();
        console.log('📋 Datos de invitaciones recibidos:', data);
        
        // Verificar que data sea un array
        if (Array.isArray(data)) {
          setInvitations(data);
        } else {
          console.warn('⚠️ Los datos recibidos no son un array:', data);
          setInvitations([]);
        }
      } catch (err) {
        console.error('❌ Error al cargar invitaciones:', err);
        setError('Error al cargar las invitaciones: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvitations();
  }, [refreshTrigger]); // Recargar cuando cambie refreshTrigger

  // Función para refrescar la lista
  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
          <p className="mt-3 text-gray-600">Cargando invitaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Invitaciones enviadas</h2>
        <Button 
          variant="secondary" 
          onClick={handleRefresh}
          className="flex items-center"
        >
          <ArrowPathIcon className="h-5 w-5 mr-2" />
          Actualizar
        </Button>
      </div>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
          <p className="mb-3">{error}</p>
          <Button variant="outline" onClick={handleRefresh} size="sm">
            Reintentar
          </Button>
        </div>
      )}
      
      {!error && invitations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No hay invitaciones para mostrar.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha de creación
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expira
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invitations.map((invitation) => (
                <tr key={invitation.id || invitation.email} className={invitation.status === 'EXPIRED' ? 'bg-gray-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invitation.email || 'Email no disponible'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(invitation.status)}`}>
                      {getStatusText(invitation.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(invitation.createdAt || invitation.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(invitation.expiresAt || invitation.expires_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default InvitationList; 