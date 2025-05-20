import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import notificationService from '../../services/notificationService';
import { withAuth } from '../../utils/withAuth';
import { TrashIcon, EnvelopeOpenIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const router = useRouter();
  const user = useAuth().user;

  // Función para cargar notificaciones
  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      const fetchedNotifications = await notificationService.getNotifications({
        unreadOnly: unreadOnly
      });
      setNotifications(fetchedNotifications);
    } catch (error) {
      console.error('Error al cargar notificaciones:', error);
      toast.error('Error al cargar notificaciones');
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar notificaciones al montar el componente o cambiar el filtro
  useEffect(() => {
    loadNotifications();
  }, [unreadOnly]);

  // Marcar una notificación como leída
  const handleMarkAsRead = async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      ));
      toast.success('Notificación marcada como leída');
    } catch (error) {
      console.error('Error al marcar notificación como leída:', error);
      toast.error('Error al marcar notificación como leída');
    }
  };

  // Marcar todas las notificaciones como leídas
  const handleMarkAllAsRead = async () => {
    try {
      const result = await notificationService.markAllAsRead();
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      toast.success(`${result.count} notificaciones marcadas como leídas`);
    } catch (error) {
      console.error('Error al marcar todas las notificaciones como leídas:', error);
      toast.error('Error al marcar todas las notificaciones como leídas');
    }
  };

  // Eliminar una notificación
  const handleDelete = async (notificationId) => {
    try {
      await notificationService.deleteNotification(notificationId);
      setNotifications(notifications.filter(n => n.id !== notificationId));
      toast.success('Notificación eliminada');
    } catch (error) {
      console.error('Error al eliminar notificación:', error);
      toast.error('Error al eliminar notificación');
    }
  };

  // Navegación según el tipo de notificación
  const handleNavigate = (notification) => {
    try {
      if (!notification.read) {
        handleMarkAsRead(notification.id);
      }
      
      if (notification.type.includes('investment_') && notification.relatedId) {
        // Si es gestor o admin, redirigir a la página de administración
        if (user?.role === 'manager' || user?.role === 'admin') {
          router.push(`/admin/investments/${notification.relatedId}`);
        } else {
          // Para socios e inversores, usar la ruta normal
          router.push(`/investments/${notification.relatedId}`);
        }
      } else if (notification.type.includes('project_') && notification.relatedId) {
        router.push(`/projects/${notification.relatedId}`);
      }
    } catch (error) {
      console.error('Error al navegar a la notificación:', error);
    }
  };

  // Renderizar fecha en formato relativo
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffSecs < 60) return 'hace unos segundos';
    if (diffMins < 60) return `hace ${diffMins} ${diffMins === 1 ? 'minuto' : 'minutos'}`;
    if (diffHours < 24) return `hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
    if (diffDays < 7) return `hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
    
    return date.toLocaleDateString();
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Mis Notificaciones</h1>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="unreadOnly"
                checked={unreadOnly}
                onChange={() => setUnreadOnly(!unreadOnly)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="unreadOnly" className="ml-2 text-sm text-gray-700">
                Solo no leídas
              </label>
            </div>
            <button
              onClick={handleMarkAllAsRead}
              disabled={notifications.every(n => n.read) || isLoading}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                notifications.some(n => !n.read) && !isLoading
                  ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <EnvelopeOpenIcon className="h-4 w-4 mr-2" />
              Marcar todas como leídas
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="py-12 flex justify-center">
            <div className="animate-pulse text-center">
              <p className="text-gray-500">Cargando notificaciones...</p>
            </div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="py-12 text-center bg-white rounded-lg shadow">
            <p className="text-gray-500">
              {unreadOnly
                ? 'No tienes notificaciones sin leer'
                : 'No tienes notificaciones'}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {notifications.map(notification => (
                <li key={notification.id} className={`${!notification.read ? 'bg-blue-50' : ''}`}>
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 cursor-pointer" onClick={() => handleNavigate(notification)}>
                      <p className={`text-sm ${!notification.read ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                        {notification.content}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatRelativeTime(notification.createdAt)}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex space-x-2">
                      {!notification.read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsRead(notification.id);
                          }}
                          className="bg-blue-100 text-blue-600 hover:bg-blue-200 p-2 rounded-full"
                          title="Marcar como leída"
                        >
                          <EnvelopeOpenIcon className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(notification.id);
                        }}
                        className="bg-red-100 text-red-600 hover:bg-red-200 p-2 rounded-full"
                        title="Eliminar notificación"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default withAuth(NotificationsPage); 