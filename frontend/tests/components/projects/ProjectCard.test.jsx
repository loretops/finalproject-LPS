import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectCard from '../../../components/projects/ProjectCard';

// Mock para next/link
jest.mock('next/link', () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('ProjectCard', () => {
  const mockProject = {
    id: 'test-project-id',
    title: 'Residencial Las Palmas',
    description: 'Proyecto residencial con 20 apartamentos en una zona exclusiva',
    location: 'Madrid',
    property_type: 'Residencial',
    minimum_investment: 50000,
    target_amount: 2000000,
    current_amount: 1000000,
    expected_roi: 12.5,
    status: 'published',
    image_url: 'https://example.com/image.jpg'
  };
  
  test('muestra correctamente la información del proyecto', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByText('Residencial Las Palmas')).toBeInTheDocument();
    expect(screen.getByText('Madrid')).toBeInTheDocument();
    expect(screen.getByText('Residencial')).toBeInTheDocument();
    expect(screen.getByText('12.5%')).toBeInTheDocument();
    expect(screen.getByText('Ver detalles')).toBeInTheDocument();
  });

  test('muestra correctamente el porcentaje de financiación', () => {
    render(<ProjectCard project={mockProject} />);
    
    // 1000000 / 2000000 = 50%
    expect(screen.getByText('Financiación: 50%')).toBeInTheDocument();
  });

  test('maneja correctamente el botón de interés', () => {
    const mockOnInterestClick = jest.fn();
    
    render(
      <ProjectCard 
        project={mockProject} 
        onInterestClick={mockOnInterestClick} 
        isInterested={false}
      />
    );
    
    const interestButton = screen.getByRole('button', { name: 'Marcar interés' });
    fireEvent.click(interestButton);
    
    expect(mockOnInterestClick).toHaveBeenCalledWith('test-project-id');
  });

  test('muestra el ícono de corazón relleno cuando isInterested es true', () => {
    render(
      <ProjectCard 
        project={mockProject} 
        onInterestClick={jest.fn()} 
        isInterested={true}
      />
    );
    
    expect(screen.getByRole('button', { name: 'Eliminar interés' })).toBeInTheDocument();
  });

  test('adapta la visualización a la variante compact', () => {
    render(<ProjectCard project={mockProject} variant="compact" />);
    
    // En variante compacta no se muestra la descripción
    expect(screen.queryByText('Proyecto residencial con 20 apartamentos en una zona exclusiva')).not.toBeInTheDocument();
  });

  test('adapta la visualización a la variante featured', () => {
    const { container } = render(<ProjectCard project={mockProject} variant="featured" />);
    
    // En variante featured la imagen es más alta
    const imageContainer = container.querySelector('[class*="h-64"]');
    expect(imageContainer).toBeInTheDocument();
  });

  test('muestra imagen por defecto cuando no hay image_url', () => {
    const projectWithoutImage = { ...mockProject, image_url: null };
    const { container } = render(<ProjectCard project={projectWithoutImage} />);
    
    // Debe mostrar el icono por defecto
    const homeIcon = container.querySelector('svg.h-12.w-12');
    expect(homeIcon).toBeInTheDocument();
  });

  test('formatea correctamente los valores monetarios', () => {
    render(<ProjectCard project={mockProject} />);
    
    // Formatea 50000 como "50.000 €" (formato español)
    expect(screen.getByText(/50.000/)).toBeInTheDocument();
  });

  test('muestra correctamente el badge de estado', () => {
    render(<ProjectCard project={mockProject} />);
    
    // El estado es 'published', debe mostrar 'Publicado'
    expect(screen.getByText('Publicado')).toBeInTheDocument();
  });
}); 