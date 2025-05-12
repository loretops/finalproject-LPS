import React, { useState, useEffect } from 'react';
import { 
  XMarkIcon, 
  FunnelIcon,
  HomeIcon,
  MapPinIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import Button from '../../ui/Button';
import Card from '../../ui/Card';

/**
 * Componente de filtros para proyectos de inversión
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.filters - Filtros actualmente aplicados
 * @param {function} props.onFilterChange - Función a ejecutar cuando cambian los filtros
 * @param {Array} props.propertyTypes - Lista de tipos de propiedades disponibles
 * @param {Array} props.locations - Lista de ubicaciones disponibles
 * @param {boolean} [props.compact=false] - Si se debe mostrar en modo compacto
 * @param {boolean} [props.showClearAll=true] - Si se debe mostrar el botón de limpiar todos los filtros
 */
const ProjectFilters = ({ 
  filters = {}, 
  onFilterChange, 
  propertyTypes = [],
  locations = [],
  compact = false,
  showClearAll = true 
}) => {
  // Estado interno para manejar los filtros antes de aplicarlos
  const [localFilters, setLocalFilters] = useState({
    propertyType: filters.propertyType || '',
    location: filters.location || '',
    minRoi: filters.minRoi || '',
    maxInvestment: filters.maxInvestment || ''
  });

  // Actualizar estado local cuando cambien los filtros externos
  useEffect(() => {
    setLocalFilters({
      propertyType: filters.propertyType || '',
      location: filters.location || '',
      minRoi: filters.minRoi || '',
      maxInvestment: filters.maxInvestment || ''
    });
  }, [filters]);

  // Manejar cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    
    // Para campos numéricos, asegurar que el valor sea positivo o vacío
    const numericFields = ['minRoi', 'maxInvestment'];
    if (numericFields.includes(name)) {
      // Validar que el valor sea un número válido o vacío
      if (value === '' || (!isNaN(value) && Number(value) >= 0)) {
        setLocalFilters({
          ...localFilters,
          [name]: value,
        });
      }
    } else {
      setLocalFilters({
        ...localFilters,
        [name]: value,
      });
    }
  };

  // Aplicar los filtros
  const applyFilters = () => {
    if (onFilterChange) {
      // Convertir valores vacíos a null para facilitar el filtrado
      const formattedFilters = Object.entries(localFilters).reduce((acc, [key, value]) => {
        // Convertir valores numéricos
        if (['minRoi', 'maxInvestment'].includes(key) && value !== '') {
          acc[key] = Number(value);
        } else if (value !== '') {
          acc[key] = value;
        }
        return acc;
      }, {});
      
      onFilterChange(formattedFilters);
    }
  };

  // Limpiar todos los filtros
  const clearAllFilters = () => {
    const emptyFilters = {
      propertyType: '',
      location: '',
      minRoi: '',
      maxInvestment: ''
    };
    setLocalFilters(emptyFilters);
    if (onFilterChange) {
      onFilterChange({});
    }
  };

  // Limpiar un filtro específico
  const clearFilter = (filterName) => {
    setLocalFilters({
      ...localFilters,
      [filterName]: ''
    });
    
    const updatedFilters = { ...localFilters, [filterName]: '' };
    // Eliminamos el filtro del objeto para la próxima consulta
    if (onFilterChange) {
      const formattedFilters = Object.entries(updatedFilters).reduce((acc, [key, value]) => {
        if (['minRoi', 'maxInvestment'].includes(key) && value !== '') {
          acc[key] = Number(value);
        } else if (value !== '') {
          acc[key] = value;
        }
        return acc;
      }, {});
      
      onFilterChange(formattedFilters);
    }
  };

  // Contar filtros activos
  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== undefined && value !== null && value !== '').length;

  // Verificar si hay algún filtro activo
  const hasActiveFilters = activeFiltersCount > 0;

  // Renderizar chips de filtros activos
  const renderActiveFilters = () => {
    if (!hasActiveFilters) return null;
    
    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {filters.propertyType && (
          <FilterChip 
            icon={<HomeIcon className="h-3 w-3" />}
            label={`Tipo: ${filters.propertyType}`} 
            onRemove={() => clearFilter('propertyType')} 
          />
        )}
        {filters.location && (
          <FilterChip 
            icon={<MapPinIcon className="h-3 w-3" />}
            label={`Ubicación: ${filters.location}`} 
            onRemove={() => clearFilter('location')} 
          />
        )}
        {filters.minRoi && (
          <FilterChip 
            icon={<CurrencyDollarIcon className="h-3 w-3" />}
            label={`ROI ≥ ${filters.minRoi}%`} 
            onRemove={() => clearFilter('minRoi')} 
          />
        )}
        {filters.maxInvestment && (
          <FilterChip 
            icon={<CurrencyDollarIcon className="h-3 w-3" />}
            label={`Inversión ≤ ${new Intl.NumberFormat('es-ES', {
              style: 'currency',
              currency: 'EUR',
              maximumFractionDigits: 0
            }).format(filters.maxInvestment)}`} 
            onRemove={() => clearFilter('maxInvestment')} 
          />
        )}
        
        {showClearAll && hasActiveFilters && (
          <button
            className="text-xs text-primary-600 hover:text-primary-800 font-medium flex items-center"
            onClick={clearAllFilters}
          >
            Limpiar todos
          </button>
        )}
      </div>
    );
  };

  // Renderizar formulario de filtros completo
  const renderFilterForm = () => (
    <div className="space-y-4">
      <div>
        <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de propiedad
        </label>
        <select
          id="propertyType"
          name="propertyType"
          value={localFilters.propertyType}
          onChange={handleFilterChange}
          className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          data-testid="filter-property-type"
        >
          <option value="">Todos los tipos</option>
          {propertyTypes.map((type) => (
            <option key={type} value={type} data-testid={`property-type-option-${type.toLowerCase()}`}>
              {type}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
          Ubicación
        </label>
        <select
          id="location"
          name="location"
          value={localFilters.location}
          onChange={handleFilterChange}
          className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          <option value="">Todas las ubicaciones</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="minRoi" className="block text-sm font-medium text-gray-700 mb-1">
          ROI mínimo (%)
        </label>
        <input
          type="number"
          id="minRoi"
          name="minRoi"
          min="0"
          step="0.5"
          value={localFilters.minRoi}
          onChange={handleFilterChange}
          placeholder="Ej: 10"
          className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>
      
      <div>
        <label htmlFor="maxInvestment" className="block text-sm font-medium text-gray-700 mb-1">
          Inversión máxima (€)
        </label>
        <input
          type="number"
          id="maxInvestment"
          name="maxInvestment"
          min="0"
          step="1000"
          value={localFilters.maxInvestment}
          onChange={handleFilterChange}
          placeholder="Ej: 100000"
          className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>
    </div>
  );

  // Para modo compacto, solo mostrar filtros activos y botón de filtrar
  if (compact) {
    return (
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FunnelIcon className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-sm font-medium">
              Filtros {hasActiveFilters && `(${activeFiltersCount})`}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => document.getElementById('filter-modal').showModal()}
          >
            {hasActiveFilters ? 'Modificar filtros' : 'Añadir filtros'}
          </Button>
        </div>
        {renderActiveFilters()}
        
        {/* Modal de filtros para vista compacta */}
        <dialog id="filter-modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Filtrar proyectos</h3>
            {renderFilterForm()}
            <div className="modal-action">
              <form method="dialog">
                <Button variant="outline" className="mr-2">Cancelar</Button>
                <Button 
                  onClick={() => {
                    applyFilters();
                    document.getElementById('filter-modal').close();
                  }}
                >
                  Aplicar filtros
                </Button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    );
  }

  // Renderizado completo con tarjeta
  return (
    <Card className="mb-6">
      <div className="p-4">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <FunnelIcon className="h-5 w-5 text-gray-500 mr-2" />
          Filtrar proyectos
        </h3>
        
        {renderFilterForm()}
        
        <div className="mt-4 flex justify-end">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="mr-2"
            >
              Limpiar filtros
            </Button>
          )}
          <Button onClick={applyFilters}>
            Aplicar filtros
          </Button>
        </div>
        
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm font-medium text-gray-700 mb-2">
              Filtros activos:
            </div>
            <div data-testid="active-filters">
              {renderActiveFilters()}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

// Componente auxiliar para mostrar un filtro activo como "chip"
const FilterChip = ({ label, onRemove, icon }) => (
  <div className="inline-flex items-center bg-gray-100 rounded-full py-1 pl-2 pr-1 text-xs">
    {icon && <span className="mr-1">{icon}</span>}
    <span className="mr-1">{label}</span>
    <button
      onClick={onRemove}
      className="rounded-full h-4 w-4 bg-gray-300 hover:bg-gray-400 inline-flex items-center justify-center"
      aria-label={`Eliminar filtro ${label}`}
    >
      <XMarkIcon className="h-3 w-3 text-gray-600" />
    </button>
  </div>
);

export default ProjectFilters; 