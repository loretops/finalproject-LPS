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
import InterestButton from './InterestButton';

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
 * @param {function} [props.onInterestChange] - Función a ejecutar cuando cambia el estado de interés
 */
const ProjectCard = ({ 
  project, 
  variant = 'default',
  onInterestChange
}) => {
  // Extraer el ID como string y asegurarnos que sea válido
  const projectId = String(project?.id || '');
  
  // Extraer el resto de propiedades del proyecto
  const {
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

  // Verificar el tipo de dato del ID para debugging
  console.log(`ProjectCard - ${title} - ID type:`, typeof projectId, 'Value:', projectId);

  // Formatear moneda en euros
  const formatCurrency = (amount) => {
    // Asegurarse de que amount sea un número
    const numAmount = typeof amount === 'number' ? amount : parseFloat(amount || 0);
    
    // Verificar que es un número válido
    if (isNaN(numAmount)) return '0 €';
    
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numAmount);
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
    // Convertir a números y usar valores por defecto
    const targetAmount = parseFloat(target_amount || 0);
    const currentAmount = parseFloat(current_amount || 0);
    
    console.log(`ProjectCard - ${title} - Funding calculation:`, {
      target_amount,
      current_amount,
      targetAmount,
      currentAmount
    });
    
    if (!targetAmount || targetAmount <= 0) return 0;
    const percentage = (currentAmount / targetAmount) * 100;
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

  // Renderizado base de la tarjeta
  return (
    <div className="relative">
      {/* Botón de interés completamente fuera del área de enlace */}
      <div className="absolute bottom-3 right-4 z-30" 
           onClick={(e) => {
             e.stopPropagation();
             e.preventDefault();
           }}>
        <InterestButton
          projectId={projectId}
          variant="outline"
          size="sm"
          showText={variant !== 'compact'}
          onInterestChange={onInterestChange}
        />
      </div>
      
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
              <span>Inversión: {calculateFundingPercentage()}%</span>
              <span>{formatCurrency(current_amount || 0)} / {formatCurrency(target_amount)}</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getProgressBarColor()} transition-all duration-500`}
                style={{ width: `${calculateFundingPercentage()}%` }}
              />
            </div>
          </div>
          
          {/* Footer con datos financieros (sin el botón) */}
          <div className="mt-4 pt-3 border-t">
            {/* Información financiera */}
            <div>
              {/* Datos de interés financiero según variante */}
              {variant === 'compact' ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center text-xs font-medium text-gray-700">
                    <ChartBarIcon className="w-3 h-3 mr-1 text-primary-500" />
                    <span>{expected_roi}% ROI</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center text-xs font-medium text-gray-700">
                    <ChartBarIcon className="w-3 h-3 mr-1 text-primary-500" />
                    <span>{expected_roi}% ROI est.</span>
                  </div>
                  <div className="flex items-center text-xs font-medium text-gray-700">
                    <CurrencyDollarIcon className="w-3 h-3 mr-1 text-primary-500" />
                    <span>Min: {formatCurrency(minimum_investment)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
      
      {/* Enlace que cubre la tarjeta pero con menor prioridad */}
      <Link 
        href={`/projects/${encodeURIComponent(projectId)}`} 
        aria-label={`Ver detalles de ${title}`} 
        className="absolute inset-0 z-10"
        onClick={(e) => {
          console.log('ProjectCard - Navigating to:', `/projects/${encodeURIComponent(projectId)}`);
        }}
      >
        <span className="sr-only">Ver detalles de {title}</span>
      </Link>
    </div>
  );
};

export default ProjectCard; 