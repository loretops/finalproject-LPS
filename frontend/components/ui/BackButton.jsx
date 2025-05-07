import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

/**
 * Botón para regresar a una página anterior o a una ruta específica
 * @param {Object} props - Propiedades del componente
 * @param {string} props.href - URL a la que redirigir (opcional)
 * @param {Function} props.onClick - Función a ejecutar al hacer clic (opcional)
 * @param {string} props.label - Texto del botón (opcional)
 */
const BackButton = ({ href, onClick, label = 'Volver', ...props }) => {
  // Si se proporciona onClick, usar esa función
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        {...props}
      >
        <ArrowLeftIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
        {label}
      </button>
    );
  }
  
  // Si se proporciona href, usar Link
  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        {...props}
      >
        <ArrowLeftIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
        {label}
      </Link>
    );
  }
  
  // Si no se proporciona ni onClick ni href, usar la función de historial del navegador
  return (
    <button
      onClick={() => window.history.back()}
      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      {...props}
    >
      <ArrowLeftIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  );
};

export default BackButton; 