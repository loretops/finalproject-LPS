import React from 'react';
import { 
  ArrowsUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';

/**
 * Componente para ordenar la lista de proyectos
 * @param {Object} props - Propiedades del componente
 * @param {string} props.sortField - Campo actual de ordenación
 * @param {string} props.sortDirection - Dirección de ordenación ('asc' o 'desc')
 * @param {function} props.onSortChange - Función a ejecutar cuando cambia la ordenación
 * @param {boolean} [props.compact=false] - Si se debe mostrar en modo compacto
 */
const ProjectSorting = ({ 
  sortField = '', 
  sortDirection = 'desc', 
  onSortChange,
  compact = false
}) => {
  // Opciones de ordenación disponibles
  const sortOptions = [
    { id: 'publishedAt', label: 'Fecha de publicación' },
    { id: 'expectedRoi', label: 'ROI' },
    { id: 'minimumInvestment', label: 'Inversión mínima' },
    { id: 'currentAmount', label: 'Financiación actual' },
    { id: 'title', label: 'Título' },
  ];

  // Manejar cambio en el campo de ordenación
  const handleSortFieldChange = (e) => {
    if (onSortChange) {
      onSortChange(e.target.value, sortDirection);
    }
  };

  // Manejar clic en una columna para ordenar (modo tabla)
  const handleColumnClick = (field) => {
    if (onSortChange) {
      // Si ya está ordenando por este campo, invertir dirección
      if (field === sortField) {
        onSortChange(field, sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        // Si es un nuevo campo, usar dirección descendente por defecto
        onSortChange(field, 'desc');
      }
    }
  };

  // Manejar cambio de dirección
  const handleDirectionChange = () => {
    if (onSortChange && sortField) {
      onSortChange(sortField, sortDirection === 'asc' ? 'desc' : 'asc');
    }
  };

  // Renderizar componente en modo compacto
  if (compact) {
    return (
      <div className="flex items-center justify-between mb-4 px-2">
        <span className="text-sm font-medium text-gray-700">Ordenar por:</span>
        <div className="flex items-center">
          <select
            value={sortField}
            onChange={handleSortFieldChange}
            className="mr-2 rounded-md border border-gray-300 py-1 px-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="">Por defecto</option>
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          
          {sortField && (
            <button
              onClick={handleDirectionChange}
              className="p-1 rounded hover:bg-gray-100 text-gray-500"
              aria-label={sortDirection === 'asc' ? 'Ordenar descendente' : 'Ordenar ascendente'}
            >
              {sortDirection === 'asc' ? (
                <ArrowUpIcon className="h-5 w-5" />
              ) : (
                <ArrowDownIcon className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Renderizar cabecera de tabla con columnas ordenables
  return (
    <div className="flex items-center bg-gray-50 rounded-t-lg border-b border-gray-200 py-3 px-4">
      {sortOptions.map((option) => (
        <div 
          key={option.id}
          className="flex-1 flex items-center cursor-pointer select-none"
          onClick={() => handleColumnClick(option.id)}
        >
          <span className={`text-sm font-medium ${sortField === option.id ? 'text-primary-600' : 'text-gray-700'}`}>
            {option.label}
          </span>
          
          {sortField === option.id ? (
            sortDirection === 'asc' ? (
              <ArrowUpIcon className="h-4 w-4 ml-1 text-primary-600" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 ml-1 text-primary-600" />
            )
          ) : (
            <ArrowsUpDownIcon className="h-4 w-4 ml-1 text-gray-400 opacity-50" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectSorting; 