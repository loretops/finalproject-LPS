import React from 'react';
import Link from 'next/link';
import { 
  MapPinIcon, 
  HomeIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

/**
 * Componente de tarjeta para mostrar una oportunidad de inversión inmobiliaria
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.project - Datos del proyecto a mostrar
 * @param {string} props.project.id - ID único del proyecto
 * @param {string} props.project.title - Título del proyecto
 * @param {string} props.project.description - Descripción corta del proyecto
 * @param {string} props.project.location - Ubicación del proyecto
 * @param {string} props.project.property_type - Tipo de propiedad
 * @param {number} props.project.minimum_investment - Inversión mínima requerida
 * @param {number} props.project.expected_roi - Retorno de inversión esperado (%)
 * @param {string} props.project.image_url - URL de la imagen principal (opcional)
 * @param {string} props.project.status - Estado del proyecto
 */
const ProjectCard = ({ project }) => {
  const {
    id,
    title,
    description,
    location,
    property_type,
    minimum_investment,
    expected_roi,
    image_url,
    status
  } = project;

  // Formatear moneda en euros
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Color de fondo según el estado
  const getStatusBadgeClass = () => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'funded':
        return 'bg-blue-100 text-blue-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Texto del estado en español
  const getStatusText = () => {
    switch (status) {
      case 'published':
        return 'Publicado';
      case 'draft':
        return 'Borrador';
      case 'funded':
        return 'Financiado';
      case 'closed':
        return 'Cerrado';
      default:
        return status;
    }
  };

  return (
    <div className="card group hover:shadow-md transition-shadow duration-300">
      <div className="relative">
        {/* Imagen */}
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-gray-200">
          {image_url ? (
            <img
              src={image_url}
              alt={title}
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200">
              <HomeIcon className="h-12 w-12 text-gray-400" />
            </div>
          )}
        </div>
        
        {/* Badge de estado */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass()}`}>
            {getStatusText()}
          </span>
        </div>
      </div>
      
      {/* Contenido */}
      <div className="flex flex-col p-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
          {title}
        </h3>
        
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <MapPinIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
          <span>{location}</span>
        </div>
        
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <HomeIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
          <span>{property_type}</span>
        </div>
        
        <p className="mt-2 line-clamp-3 text-sm text-gray-500">
          {description}
        </p>
        
        <div className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
          <div>
            <div className="text-xs text-gray-500">Inversión mínima</div>
            <div className="mt-1 flex items-center text-sm font-medium">
              <CurrencyDollarIcon className="mr-1 h-4 w-4 text-gray-500" />
              {formatCurrency(minimum_investment)}
            </div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500">ROI esperado</div>
            <div className="mt-1 flex items-center text-sm font-medium">
              <ChartBarIcon className="mr-1 h-4 w-4 text-gray-500" />
              {expected_roi}%
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Link 
            href={`/proyectos/${id}`}
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 