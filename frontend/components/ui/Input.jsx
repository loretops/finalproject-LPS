import React, { forwardRef } from 'react';

/**
 * Componente Input reutilizable para formularios
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.id] - Id del input
 * @param {string} [props.name] - Nombre del input
 * @param {string} [props.type='text'] - Tipo de input
 * @param {string} [props.label] - Etiqueta del input
 * @param {string} [props.placeholder] - Placeholder del input
 * @param {string} [props.error] - Mensaje de error
 * @param {string} [props.className=''] - Clases adicionales
 * @param {boolean} [props.disabled=false] - Si el input está deshabilitado
 * @param {boolean} [props.required=false] - Si el input es requerido
 * @param {React.ReactNode} [props.icon] - Icono para el input
 * @param {React.ReactNode} [props.rightIcon] - Icono para la derecha del input
 * @param {string} [props.helperText] - Texto de ayuda
 */
const Input = forwardRef(({
  id,
  name,
  type = 'text',
  label,
  placeholder,
  error,
  className = '',
  disabled = false,
  required = false,
  icon,
  rightIcon,
  helperText,
  ...props
}, ref) => {
  // Clases base para el input
  const baseInputClasses = 'flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50';
  
  // Clases condicionales basadas en el estado del input
  const stateClasses = error 
    ? 'border-red-300 focus:ring-red-500 text-red-900 placeholder-red-300'
    : 'border-gray-300 focus:ring-primary-500 text-gray-900 placeholder-gray-400';
  
  // Clases para el icono a la izquierda
  const iconClasses = icon ? 'pl-10' : '';
  
  // Combinar todas las clases
  const inputClasses = `${baseInputClasses} ${stateClasses} ${iconClasses} ${className}`;
  
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={id || name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          id={id || name}
          name={name}
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={helperText ? `${id || name}-helper` : undefined}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600" id={`${id || name}-error`}>
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500" id={`${id || name}-helper`}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 