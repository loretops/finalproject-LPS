import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectFilters from '../../../../components/projects/filters/ProjectFilters';

describe('ProjectFilters', () => {
  const mockPropertyTypes = ['Residencial', 'Comercial', 'Industrial', 'Turístico'];
  const mockLocations = ['Madrid', 'Barcelona', 'Valencia', 'Málaga'];
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza correctamente el componente sin filtros aplicados', () => {
    render(
      <ProjectFilters
        filters={{}}
        onFilterChange={mockOnFilterChange}
        propertyTypes={mockPropertyTypes}
        locations={mockLocations}
      />
    );
    
    // Verificar elementos de la UI
    expect(screen.getByText('Filtrar proyectos')).toBeInTheDocument();
    expect(screen.getByText('Tipo de propiedad')).toBeInTheDocument();
    expect(screen.getByText('Ubicación')).toBeInTheDocument();
    expect(screen.getByText('ROI mínimo (%)')).toBeInTheDocument();
    expect(screen.getByText('Inversión máxima (€)')).toBeInTheDocument();
    
    // Verificar opciones disponibles
    const propertyTypeSelect = screen.getByLabelText('Tipo de propiedad');
    expect(propertyTypeSelect).toBeInTheDocument();
    mockPropertyTypes.forEach(type => {
      expect(screen.getByText(type)).toBeInTheDocument();
    });
    
    // Verificar botón aplicar
    expect(screen.getByText('Aplicar filtros')).toBeInTheDocument();
    
    // No debe mostrar sección de filtros activos
    expect(screen.queryByText('Filtros activos:')).not.toBeInTheDocument();
  });

  test('muestra correctamente los filtros activos', () => {
    const activeFilters = {
      propertyType: 'Residencial',
      location: 'Madrid',
      minRoi: 10
    };
    
    render(
      <ProjectFilters
        filters={activeFilters}
        onFilterChange={mockOnFilterChange}
        propertyTypes={mockPropertyTypes}
        locations={mockLocations}
      />
    );
    
    // Debe mostrar sección de filtros activos
    expect(screen.getByText('Filtros activos:')).toBeInTheDocument();
    expect(screen.getByText('Tipo: Residencial')).toBeInTheDocument();
    expect(screen.getByText('Ubicación: Madrid')).toBeInTheDocument();
    expect(screen.getByText('ROI ≥ 10%')).toBeInTheDocument();
    
    // Debe mostrar botón de limpiar todos
    expect(screen.getByText('Limpiar todos')).toBeInTheDocument();
  });

  test('llama a onFilterChange cuando se aplican filtros', () => {
    render(
      <ProjectFilters
        filters={{}}
        onFilterChange={mockOnFilterChange}
        propertyTypes={mockPropertyTypes}
        locations={mockLocations}
      />
    );
    
    // Seleccionar tipo de propiedad
    fireEvent.change(screen.getByLabelText('Tipo de propiedad'), {
      target: { value: 'Residencial' }
    });
    
    // Aplicar filtros
    fireEvent.click(screen.getByText('Aplicar filtros'));
    
    // Verificar que se llamó onFilterChange con los filtros correctos
    expect(mockOnFilterChange).toHaveBeenCalledWith({ propertyType: 'Residencial' });
  });

  test('limpia todos los filtros correctamente', () => {
    const activeFilters = {
      propertyType: 'Residencial',
      location: 'Madrid'
    };
    
    render(
      <ProjectFilters
        filters={activeFilters}
        onFilterChange={mockOnFilterChange}
        propertyTypes={mockPropertyTypes}
        locations={mockLocations}
      />
    );
    
    // Limpiar todos los filtros
    fireEvent.click(screen.getByText('Limpiar todos'));
    
    // Verificar que se llamó onFilterChange con objeto vacío
    expect(mockOnFilterChange).toHaveBeenCalledWith({});
  });

  test('limpia un filtro individual correctamente', () => {
    const activeFilters = {
      propertyType: 'Residencial',
      location: 'Madrid'
    };
    
    render(
      <ProjectFilters
        filters={activeFilters}
        onFilterChange={mockOnFilterChange}
        propertyTypes={mockPropertyTypes}
        locations={mockLocations}
      />
    );
    
    // Encontrar y hacer clic en el botón de eliminar para un filtro específico
    const removeButtons = screen.getAllByRole('button', { name: /Eliminar filtro/ });
    fireEvent.click(removeButtons[0]); // Eliminar el primer filtro (propertyType)
    
    // Verificar que onFilterChange fue llamado con los filtros actualizados
    expect(mockOnFilterChange).toHaveBeenCalled();
    // Al menos debería quedar el filtro de location
    const lastCallArgs = mockOnFilterChange.mock.calls[mockOnFilterChange.mock.calls.length - 1][0];
    expect(Object.keys(lastCallArgs).length).toBe(1);
  });

  test('renderiza correctamente en modo compacto', () => {
    render(
      <ProjectFilters
        filters={{}}
        onFilterChange={mockOnFilterChange}
        propertyTypes={mockPropertyTypes}
        locations={mockLocations}
        compact={true}
      />
    );
    
    // En modo compacto, no debe mostrar el formulario de filtros directamente
    expect(screen.queryByText('Tipo de propiedad')).not.toBeInTheDocument();
    
    // Debe mostrar botón para abrir filtros
    expect(screen.getByText('Filtros')).toBeInTheDocument();
    expect(screen.getByText('Añadir filtros')).toBeInTheDocument();
  });

  test('valida correctamente los campos numéricos', () => {
    render(
      <ProjectFilters
        filters={{}}
        onFilterChange={mockOnFilterChange}
        propertyTypes={mockPropertyTypes}
        locations={mockLocations}
      />
    );
    
    // Intentar ingresar un valor negativo en ROI mínimo
    const roiInput = screen.getByLabelText('ROI mínimo (%)');
    fireEvent.change(roiInput, { target: { value: '-5' } });
    
    // El valor no debería cambiar (o debería cambiarse a un valor válido)
    expect(roiInput.value).not.toBe('-5');
    
    // Intentar ingresar un valor válido
    fireEvent.change(roiInput, { target: { value: '12.5' } });
    expect(roiInput.value).toBe('12.5');
  });
}); 