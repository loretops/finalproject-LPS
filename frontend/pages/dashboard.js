import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Importar el hook de autenticación
import { useRouter } from 'next/router'; // Importar el router para redirigir
import Link from 'next/link'; // Importar Link para navegación
import Layout from '../components/layout/Layout';
import dashboardService from '../services/dashboardService';
import { formatCurrency } from '../utils/formatters';
import { 
  UserIcon, 
  EnvelopeIcon, 
  BuildingLibraryIcon,
  KeyIcon,
  DocumentTextIcon,
  UserGroupIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

const DashboardPage = () => {
  const { isAuthenticated, loading, user, logout } = useAuth(); // Obtener estado de autenticación y la función logout
  const router = useRouter();
  
  // Estado para las estadísticas del dashboard
  const [stats, setStats] = useState({
    activePartners: 0,
    activeProjects: 0,
    totalInvested: 0,
    userStats: {
      totalInvested: 0
    },
    loading: true,
    error: false
  });

  useEffect(() => {
    // Solo actuar después de que el estado de autenticación se haya cargado
    // y si el usuario NO está autenticado.
    if (!loading && !isAuthenticated) {
      router.push('/login'); // Redirigir a la página de login
    }
  }, [isAuthenticated, loading, router]); // Dependencias del efecto
  
  // Cargar estadísticas cuando el usuario esté autenticado
  useEffect(() => {
    if (isAuthenticated && user) {
      loadDashboardStats();
    }
  }, [isAuthenticated, user]);

  const loadDashboardStats = async () => {
    try {
      setStats(prev => ({ ...prev, loading: true, error: false }));
      const dashboardStats = await dashboardService.getDashboardStats();
      
      setStats({
        activePartners: dashboardStats.activePartners || 0,
        activeProjects: dashboardStats.activeProjects || 0,
        totalInvested: dashboardStats.totalInvested || 0,
        userStats: dashboardStats.userStats || { totalInvested: 0 },
        loading: false,
        error: false
      });
    } catch (error) {
      console.error('Error cargando estadísticas del dashboard:', error);
      setStats(prev => ({ ...prev, loading: false, error: true }));
    }
  };

  // Mostrar un estado de carga mientras se verifica la autenticación
  // o si todavía no está autenticado pero aún no se ha redirigido.
  if (loading || !isAuthenticated) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto"></div>
            <p className="mt-3 text-gray-600">Cargando...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Si ha pasado la carga y está autenticado, mostrar el contenido
  return (
    <Layout>
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Cabecera del Dashboard */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-500">
            Bienvenido a tu panel de control, {user?.firstName || user?.email}
          </p>
        </div>

        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserGroupIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Socios Activos
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stats.loading ? (
                          <div className="animate-pulse bg-gray-200 h-6 w-8 rounded"></div>
                        ) : stats.error ? (
                          <span className="text-red-500">Error</span>
                        ) : (
                          stats.activePartners
                        )}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DocumentTextIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Proyectos Activos
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stats.loading ? (
                          <div className="animate-pulse bg-gray-200 h-6 w-8 rounded"></div>
                        ) : stats.error ? (
                          <span className="text-red-500">Error</span>
                        ) : (
                          stats.activeProjects
                        )}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BuildingLibraryIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Capital Invertido (Total)
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stats.loading ? (
                          <div className="animate-pulse bg-gray-200 h-6 w-16 rounded"></div>
                        ) : stats.error ? (
                          <span className="text-red-500">Error</span>
                        ) : (
                          formatCurrency(stats.totalInvested)
                        )}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CurrencyDollarIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Tu Inversión
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-green-600">
                        {stats.loading ? (
                          <div className="animate-pulse bg-gray-200 h-6 w-16 rounded"></div>
                        ) : stats.error ? (
                          <span className="text-red-500">Error</span>
                        ) : (
                          formatCurrency(stats.userStats.totalInvested)
                        )}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de administración para gestores */}
        {user?.role === 'manager' && (
          <div className="bg-white shadow rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Gestión de Plataforma
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Accede a las herramientas de administración
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Link 
                  href="/admin/invitations" 
                  className="group relative bg-white rounded-lg border border-gray-200 p-6 hover:border-primary-500 hover:shadow-md transition-all"
                >
                  <div>
                    <EnvelopeIcon className="h-8 w-8 text-primary-600" aria-hidden="true" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">Invitaciones</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Gestiona las invitaciones para nuevos socios.
                    </p>
                  </div>
                  <span className="absolute top-0 right-0 px-2 py-1 text-xs font-semibold text-primary-600 bg-primary-100 rounded-bl-lg rounded-tr-lg">
                    Admin
                  </span>
                </Link>

                <Link 
                  href="/admin/projects" 
                  className="group relative bg-white rounded-lg border border-gray-200 p-6 hover:border-primary-500 hover:shadow-md transition-all"
                >
                  <div>
                    <DocumentTextIcon className="h-8 w-8 text-primary-600" aria-hidden="true" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">Proyectos</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Administra los proyectos de inversión.
                    </p>
                  </div>
                  <span className="absolute top-0 right-0 px-2 py-1 text-xs font-semibold text-primary-600 bg-primary-100 rounded-bl-lg rounded-tr-lg">
                    Admin
                  </span>
                </Link>

                <Link 
                  href="/admin/users" 
                  className="group relative bg-white rounded-lg border border-gray-200 p-6 hover:border-primary-500 hover:shadow-md transition-all"
                >
                  <div>
                    <UserIcon className="h-8 w-8 text-primary-600" aria-hidden="true" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">Usuarios</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Gestiona los usuarios y sus roles.
                    </p>
                  </div>
                  <span className="absolute top-0 right-0 px-2 py-1 text-xs font-semibold text-primary-600 bg-primary-100 rounded-bl-lg rounded-tr-lg">
                    Admin
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Sección para todos los usuarios */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Cuenta y Preferencias
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Gestiona tu perfil y ajustes personales
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link 
                href="/perfil" 
                className="group relative bg-white rounded-lg border border-gray-200 p-6 hover:border-primary-500 hover:shadow-md transition-all"
              >
                <div>
                  <UserIcon className="h-8 w-8 text-primary-600" aria-hidden="true" />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">Mi Perfil</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Actualiza tu información personal y preferencias.
                  </p>
                </div>
              </Link>

              <Link 
                href="/cambiar-password" 
                className="group relative bg-white rounded-lg border border-gray-200 p-6 hover:border-primary-500 hover:shadow-md transition-all"
              >
                <div>
                  <KeyIcon className="h-8 w-8 text-primary-600" aria-hidden="true" />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">Seguridad</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Actualiza tu contraseña y ajustes de seguridad.
                  </p>
                </div>
              </Link>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={logout}
                className="btn btn-outline text-red-600 hover:bg-red-50"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage; 