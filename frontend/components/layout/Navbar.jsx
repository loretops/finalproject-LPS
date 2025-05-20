import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import NotificationBell from '../common/NotificationBell';

// Función para verificar si el usuario tiene un rol específico
const hasRole = (user, roleToCheck) => {
  if (!user) return false;
  
  // Manejar diferentes formatos de roles
  const userRoles = Array.isArray(user.roles) 
    ? user.roles 
    : typeof user.role === 'string' 
      ? [user.role] 
      : typeof user.roles === 'string' 
        ? [user.roles]
        : [];
  
  console.log('Navbar - Roles del usuario:', userRoles);
  
  // Verificar si el usuario tiene el rol o es admin
  return userRoles.includes(roleToCheck) || userRoles.includes('admin');
};

// Función para filtrar elementos de navegación según rol
const getNavigationItems = (user) => {
  console.log('Navbar - Usuario actual:', user);
  
  // Navegación básica
  const items = [
    { name: 'Inicio', href: '/', public: true },
    { name: 'Proyectos', href: '/projects', public: true },
    { name: 'Sobre Nosotros', href: '/sobre-nosotros', public: true },
  ];
  
  if (user) {
    // Dashboard para todos los usuarios autenticados
    items.push({ name: 'Dashboard', href: '/dashboard', public: false });
    
    // Opciones específicas según rol
    if (hasRole(user, 'manager') || hasRole(user, 'admin')) {
      // Menú para gestores y administradores
      items.push({ name: 'Admin Proyectos', href: '/admin/projects', public: false });
      items.push({ name: 'Admin Inversiones', href: '/admin/investments', public: false });
      console.log('Navbar - Agregando elementos de administración para rol manager/admin');
    } else {
      // Menú para socios e inversores
      items.push({ name: 'Mis Intereses', href: '/interests', public: false });
      items.push({ name: 'Mis Inversiones', href: '/investments', public: false });
    }
  }
  
  return items;
};

/**
 * Barra de navegación principal con soporte para modo móvil y menú de usuario
 */
const Navbar = () => {
  const router = useRouter();
  const { user, logout, checkRole } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Obtener elementos de navegación según el usuario
  const navigation = getNavigationItems(user);

  // Cambiar estilo de navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  // Filtrar elementos de navegación según el estado de autenticación
  const navItems = navigation.filter(item => item.public || user);

  return (
    <Disclosure as="nav" className={`fixed w-full z-10 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              {/* Logo y navegación principal */}
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <span className="text-xl font-bold text-primary-600">COOPCO</span>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navItems.map((item) => (
                    <Link 
                      key={item.name}
                      href={item.href}
                      className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                        router.pathname === item.href
                          ? 'border-primary-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`}
                      data-cy={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Botones de usuario y menú móvil */}
              <div className="flex items-center">
                {/* Mostrar campana de notificaciones solo para usuarios autenticados */}
                {user && (
                  <div className="mr-2">
                    <NotificationBell />
                  </div>
                )}
                
                {user ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                        <span className="sr-only">Abrir menú de usuario</span>
                        <UserCircleIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
                      </Menu.Button>
                    </div>
                    <Transition
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <span className="block px-4 py-2 text-sm text-gray-700">
                              {user.firstName} {user.lastName}
                            </span>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/perfil"
                              className={`block px-4 py-2 text-sm ${
                                active ? 'bg-gray-100' : ''
                              } text-gray-700`}
                            >
                              Mi Perfil
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`block w-full text-left px-4 py-2 text-sm ${
                                active ? 'bg-gray-100' : ''
                              } text-gray-700`}
                              data-cy="logout-button"
                            >
                              Cerrar Sesión
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="flex items-center">
                    <Link
                      href="/login"
                      className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700"
                      data-cy="login-button"
                    >
                      Iniciar Sesión
                    </Link>
                  </div>
                )}
                
                {/* Botón de menú móvil */}
                <div className="flex items-center sm:hidden ml-2">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                    <span className="sr-only">Abrir menú principal</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          {/* Menú móvil */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2 bg-white">
              {navItems.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                    router.pathname === item.href
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                  }`}
                  data-cy={`mobile-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {!user && (
                <Disclosure.Button
                  as={Link}
                  href="/login"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                  data-cy="mobile-login-button"
                >
                  Iniciar Sesión
                </Disclosure.Button>
              )}
            </div>
            {user && (
              <div className="border-t border-gray-200 pb-3 pt-4 bg-white">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <UserCircleIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Disclosure.Button
                    as={Link}
                    href="/perfil"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Mi Perfil
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="button"
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    data-cy="mobile-logout-button"
                  >
                    Cerrar Sesión
                  </Disclosure.Button>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar; 