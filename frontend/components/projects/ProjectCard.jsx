import React from 'react';
import Link from 'next/link';
import { 
  MapPinIcon, 
  HomeIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import Card from '../ui/Card';
import Button from '../ui/Button';

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
 * @param {number} props.project.target_amount - Monto total objetivo
 * @param {number} props.project.current_amount - Monto actualmente invertido
 * @param {number} props.project.expected_roi - Retorno de inversión esperado (%)
 * @param {string} props.project.image_url - URL de la imagen principal (opcional)
 * @param {string} props.project.status - Estado del proyecto
 * @param {string} [props.variant='default'] - Variante de la tarjeta: 'default', 'compact', 'featured'
 * @param {function} [props.onInterestClick] - Función a ejecutar cuando se marca interés
 * @param {boolean} [props.isInterested=false] - Si el usuario ha marcado interés en este proyecto
 */
const ProjectCard = ({ 
  project, 
  variant = 'default',
  onInterestClick,
  isInterested = false
}) => {
  const {
    id,
    title,
    description,
    location,
    property_type,
    minimum_investment,
    target_amount = 0,
    current_amount = 0,
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

  // Calcular el porcentaje de financiación
  const calculateFundingPercentage = () => {
    if (!target_amount || target_amount <= 0) return 0;
    const percentage = (current_amount / target_amount) * 100;
    return Math.min(Math.round(percentage), 100); // No permitir valores mayores a 100%
  };

  // Determinar el color de la barra de progreso
  const getProgressBarColor = () => {
    const percentage = calculateFundingPercentage();
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-green-400';
    if (percentage >= 50) return 'bg-yellow-400';
    if (percentage >= 25) return 'bg-orange-400';
    return 'bg-red-400';
  };

  // Determinar tamaño de la imagen según la variante
  const getImageHeight = () => {
    switch (variant) {
      case 'compact':
        return 'h-32';
      case 'featured':
        return 'h-64';
      default:
        return 'h-48';
    }
  };

  // Manejar clic en botón de interés
  const handleInterestClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onInterestClick) {
      onInterestClick(id);
    }
  };

  // Renderizado base de la tarjeta
  return (
    <Card
      hover
      className={`overflow-hidden ${variant === 'featured' ? 'border-primary-200' : ''}`}
    >
      <div className="relative">
        {/* Imagen */}
        <div className={`relative w-full overflow-hidden bg-gray-200 ${getImageHeight()}`}>
          {image_url ? (
            <img
              src={image_url}
              alt={title}
              className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
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
      <div className={`flex flex-col ${variant === 'compact' ? 'p-3' : 'p-4'}`}>
        <h3 className={`font-semibold text-gray-900 hover:text-primary-600 transition-colors duration-300 ${variant === 'compact' ? 'text-base' : 'text-lg'}`}>
          {title}
        </h3>
        
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <MapPinIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
          <span>{location}</span>
        </div>
        
        {variant !== 'compact' && (
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <HomeIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
          <span>{property_type}</span>
        </div>
        )}
        
        {variant !== 'compact' && (
          <p className={`mt-2 text-sm text-gray-500 ${variant === 'featured' ? 'line-clamp-4' : 'line-clamp-2'}`}>
          {description}
        </p>
        )}
        
        {/* Barra de progreso de financiación */}
        <div className="mt-4">
          <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
            <span>Financiación: {calculateFundingPercentage()}%</span>
            <span>{formatCurrency(current_amount)} / {formatCurrency(target_amount)}</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getProgressBarColor()} transition-all duration-500`}
              style={{ width: `${calculateFundingPercentage()}%` }}
            />
          </div>
        </div>
        
        <div className={`mt-4 grid grid-cols-2 gap-4 border-t border-gray-200 pt-4 ${variant === 'featured' ? 'text-base' : 'text-sm'}`}>
          <div>
            <div className="text-xs text-gray-500">Inversión mínima</div>
            <div className="mt-1 flex items-center font-medium">
              <CurrencyDollarIcon className="mr-1 h-4 w-4 text-gray-500" />
              {formatCurrency(minimum_investment)}
            </div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500">ROI esperado</div>
            <div className="mt-1 flex items-center font-medium">
              <ChartBarIcon className="mr-1 h-4 w-4 text-gray-500" />
              {expected_roi}%
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <Link 
            href={`/projects/${id}`}
            className={`inline-flex items-center text-primary-600 hover:text-primary-700 font-medium ${variant === 'compact' ? 'text-xs' : 'text-sm'}`}
            data-testid="view-details-link"
          >
            Ver detalles
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          
          {onInterestClick && (
            <button
              onClick={handleInterestClick}
              className="inline-flex items-center justify-center rounded-full p-1.5 text-gray-500 hover:bg-gray-100 focus:outline-none"
              aria-label={isInterested ? "Eliminar interés" : "Marcar interés"}
            >
              {isInterested ? (
                <HeartIconSolid className="h-5 w-5 text-red-500" />
              ) : (
                <HeartIcon className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard; 