import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectSorting from '../../../../components/projects/filters/ProjectSorting';

describe('ProjectSorting', () => {
  const mockOnSortChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza correctamente el componente en modo tabla', () => {
    render(
      <ProjectSorting
        sortField="publishedAt"
        sortDirection="desc"
        onSortChange={mockOnSortChange}
      />
    );
    
    // Verificar que los campos de ordenación están presentes
    expect(screen.getByText('Fecha de publicación')).toBeInTheDocument();
    expect(screen.getByText('ROI')).toBeInTheDocument();
    expect(screen.getByText('Inversión mínima')).toBeInTheDocument();
    expect(screen.getByText('Financiación actual')).toBeInTheDocument();
    expect(screen.getByText('Título')).toBeInTheDocument();
  });

  test('renderiza correctamente el componente en modo compacto', () => {
    render(
      <ProjectSorting
        sortField="publishedAt"
        sortDirection="desc"
        onSortChange={mockOnSortChange}
        compact={true}
      />
    );
    
    // En modo compacto, debe mostrar un select
    expect(screen.getByText('Ordenar por:')).toBeInTheDocument();
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    
    // El select debe contener las opciones correctas
    expect(screen.getByText('Por defecto')).toBeInTheDocument();
    expect(screen.getByText('Fecha de publicación')).toBeInTheDocument();
    expect(screen.getByText('ROI')).toBeInTheDocument();
  });

  test('llama a onSortChange cuando se cambia el campo de ordenación en modo compacto', () => {
    render(
      <ProjectSorting
        sortField="publishedAt"
        sortDirection="desc"
        onSortChange={mockOnSortChange}
        compact={true}
      />
    );
    
    // Cambiar el campo de ordenación
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'expectedRoi' }
    });
    
    // Verificar que se llamó onSortChange con los parámetros correctos
    expect(mockOnSortChange).toHaveBeenCalledWith('expectedRoi', 'desc');
  });

  test('llama a onSortChange cuando se cambia la dirección en modo compacto', () => {
    render(
      <ProjectSorting
        sortField="publishedAt"
        sortDirection="desc"
        onSortChange={mockOnSortChange}
        compact={true}
      />
    );
    
    // Cambiar la dirección de ordenación
    const directionButton = screen.getByRole('button', { name: 'Ordenar ascendente' });
    fireEvent.click(directionButton);
    
    // Verificar que se llamó onSortChange con los parámetros correctos
    expect(mockOnSortChange).toHaveBeenCalledWith('publishedAt', 'asc');
  });

  test('llama a onSortChange cuando se hace clic en una columna en modo tabla', () => {
    render(
      <ProjectSorting
        sortField="publishedAt"
        sortDirection="desc"
        onSortChange={mockOnSortChange}
      />
    );
    
    // Hacer clic en una columna diferente
    fireEvent.click(screen.getByText('ROI'));
    
    // Verificar que se llamó onSortChange con los parámetros correctos
    expect(mockOnSortChange).toHaveBeenCalledWith('expectedRoi', 'desc');
  });

  test('invierte la dirección al hacer clic en la columna actualmente ordenada', () => {
    render(
      <ProjectSorting
        sortField="publishedAt"
        sortDirection="desc"
        onSortChange={mockOnSortChange}
      />
    );
    
    // Hacer clic en la columna actualmente ordenada
    fireEvent.click(screen.getByText('Fecha de publicación'));
    
    // Verificar que se llamó onSortChange con dirección invertida
    expect(mockOnSortChange).toHaveBeenCalledWith('publishedAt', 'asc');
  });

  test('muestra correctamente el estado actual de ordenación', () => {
    render(
      <ProjectSorting
        sortField="expectedRoi"
        sortDirection="asc"
        onSortChange={mockOnSortChange}
      />
    );
    
    // La columna ROI debe tener estilo visual distinto (texto primary-600)
    const roiText = screen.getByText('ROI');
    expect(roiText.className).toContain('text-primary-600');
    
    // Debe mostrar el icono de ordenación ascendente
    const icons = document.querySelectorAll('svg.h-4.w-4.ml-1.text-primary-600');
    expect(icons.length).toBeGreaterThan(0);
  });
}); 