import React from 'react';

/**
 * Componente Card reutilizable para mostrar información en tarjetas
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido de la tarjeta
 * @param {string} [props.className=''] - Clases adicionales para la tarjeta
 * @param {React.ReactNode} [props.title] - Título de la tarjeta
 * @param {React.ReactNode} [props.footer] - Pie de la tarjeta
 * @param {boolean} [props.hover=false] - Si la tarjeta debe tener efecto hover
 * @param {boolean} [props.compact=false] - Si la tarjeta debe tener un padding reducido
 */
const Card = ({
  children,
  className = '',
  title,
  footer,
  hover = false,
  compact = false,
  ...props
}) => {
  const baseClasses = 'rounded-lg border border-gray-200 bg-white shadow-sm';
  const hoverClasses = hover ? 'transition-shadow hover:shadow-md' : '';
  const paddingClasses = compact ? 'p-4' : 'p-6';
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {title && (
        <div className="border-b border-gray-200 px-6 py-4">
          {typeof title === 'string' ? (
            <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
          ) : (
            title
          )}
        </div>
      )}
      
      <div className={title ? paddingClasses : paddingClasses}>
        {children}
      </div>
      
      {footer && (
        <div className="border-t border-gray-200 px-6 py-4">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card; 