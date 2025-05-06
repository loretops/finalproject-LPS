import React, { useState, useEffect } from 'react';
import { getInvitations } from '../../services/invitationService';

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

  // Función para formatear fechas
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Obtener invitaciones
  useEffect(() => {
    const fetchInvitations = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getInvitations();
        setInvitations(data);
      } catch (err) {
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
    return <div>Cargando invitaciones...</div>;
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <p style={styles.errorText}>{error}</p>
        <button onClick={handleRefresh} style={styles.refreshButton}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Invitaciones enviadas</h2>
        <button onClick={handleRefresh} style={styles.refreshButton}>
          Actualizar
        </button>
      </div>
      
      {invitations.length === 0 ? (
        <p>No hay invitaciones para mostrar.</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Estado</th>
                <th style={styles.th}>Fecha de creación</th>
                <th style={styles.th}>Expira</th>
              </tr>
            </thead>
            <tbody>
              {invitations.map((invitation) => (
                <tr key={invitation.id} style={
                  invitation.status === 'EXPIRED' ? styles.expiredRow :
                  invitation.status === 'USED' ? styles.usedRow :
                  styles.pendingRow
                }>
                  <td style={styles.td}>{invitation.email}</td>
                  <td style={styles.td}>{getStatusText(invitation.status)}</td>
                  <td style={styles.td}>{formatDate(invitation.createdAt)}</td>
                  <td style={styles.td}>{formatDate(invitation.expiresAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Estilos inline
const styles = {
  container: {
    marginTop: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  refreshButton: {
    padding: '8px 12px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  },
  th: {
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    padding: '10px',
    textAlign: 'left',
  },
  td: {
    padding: '10px',
    border: '1px solid #dee2e6',
  },
  pendingRow: {
    backgroundColor: '#ffffff',
  },
  usedRow: {
    backgroundColor: '#e6f7e6', // Light green for used invitations
  },
  expiredRow: {
    backgroundColor: '#ffeeee', // Light red for expired invitations
    color: '#999999',
  },
  errorContainer: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#ffebee',
    borderRadius: '4px',
  },
  errorText: {
    color: '#d32f2f',
    marginBottom: '10px',
  }
};

export default InvitationList; 