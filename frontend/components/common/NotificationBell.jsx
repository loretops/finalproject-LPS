import React, { useState, useEffect, useRef } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import notificationService from '../../services/notificationService';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const { user } = useAuth();

  // Función para cargar notificaciones
  const loadNotifications = async () => {
    if (!isDropdownOpen) return;
    
    try {
      setIsLoading(true);
      const fetchedNotifications = await notificationService.getNotifications({ limit: 5 });
      setNotifications(fetchedNotifications);
      setUnreadCount(fetchedNotifications.filter(n => !n.read).length);
    } catch (error) {
      console.error('Error al cargar notificaciones:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar notificaciones solo cuando se abre el dropdown
  useEffect(() => {
    if (isDropdownOpen) {
      loadNotifications();
    }
  }, [isDropdownOpen]);

  // Cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Marcar notificación como leída
  const handleNotificationClick = async (notification) => {
    try {
      if (!notification.read) {
        await notificationService.markAsRead(notification.id);
        setNotifications(prevNotifications => 
          prevNotifications.map(n => 
            n.id === notification.id ? { ...n, read: true } : n
          )
        );
        setUnreadCount(prevCount => prevCount - 1);
      }
      
      // Navegar a la página relacionada según el tipo de notificación y el rol del usuario
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
      } else {
        router.push('/notifications');
      }
      
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Error al marcar notificación como leída:', error);
    }
  };

  // Marcar todas como leídas
  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prevNotifications => 
        prevNotifications.map(n => ({ ...n, read: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Error al marcar todas las notificaciones como leídas:', error);
    }
  };

  // Ver todas las notificaciones
  const handleViewAll = () => {
    router.push('/notifications');
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-label="Notificaciones"
      >
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>
      
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-20 ring-1 ring-black ring-opacity-5 py-1">
          <div className="px-4 py-2 border-b flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Notificaciones</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Marcar todas como leídas
              </button>
            )}
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {isLoading ? (
              <div className="px-4 py-6 text-center text-gray-500">
                Cargando notificaciones...
              </div>
            ) : notifications.length === 0 ? (
              <div className="px-4 py-6 text-center text-gray-500">
                No tienes notificaciones
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex justify-between">
                    <p className={`text-sm ${!notification.read ? 'font-semibold' : 'text-gray-700'}`}>
                      {notification.content}
                    </p>
                    {!notification.read && (
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
          
          <div className="px-4 py-2 border-t">
            <button
              onClick={handleViewAll}
              className="w-full py-2 text-center text-sm text-blue-600 hover:text-blue-800"
            >
              Ver todas las notificaciones
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell; 