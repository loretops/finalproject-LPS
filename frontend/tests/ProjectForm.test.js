// tests/ProjectForm.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectForm from '../components/Admin/ProjectForm';
import projectService from '../services/projectService';
import { useRouter } from 'next/router';

// Mock de next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock de projectService
jest.mock('../services/projectService', () => ({
  createProject: jest.fn(),
  updateProject: jest.fn(),
}));

describe('ProjectForm Component', () => {
  // Configuración común para las pruebas
  const mockRouter = {
    push: jest.fn(),
  };
  
  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
    jest.clearAllMocks();
  });
  
  // Prueba de renderizado en modo creación
  it('renders correctly in create mode', () => {
    render(<ProjectForm mode="create" />);
    
    // Verificar título del formulario
    expect(screen.getByText('Nuevo Proyecto')).toBeInTheDocument();
    
    // Verificar botones
    expect(screen.getByText('Crear Proyecto')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    
    // Verificar campos principales
    expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Inversión Mínima/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Monto Objetivo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ROI Esperado/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tipo de Propiedad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ubicación/i)).toBeInTheDocument();
  });
  
  // Prueba de renderizado en modo edición
  it('renders correctly in edit mode with initial data', () => {
    const initialData = {
      id: '1',
      title: 'Proyecto de Prueba',
      description: 'Descripción de prueba',
      minimum_investment: 10000,
      target_amount: 60000,
      expected_roi: 12,
      property_type: 'commercial',
      location: 'Madrid',
      status: 'draft',
    };
    
    render(<ProjectForm mode="edit" initialData={initialData} />);
    
    // Verificar título del formulario
    expect(screen.getByText('Editar Proyecto')).toBeInTheDocument();
    
    // Verificar valores iniciales
    expect(screen.getByLabelText(/Título/i)).toHaveValue(initialData.title);
    expect(screen.getByLabelText(/Descripción/i)).toHaveValue(initialData.description);
    expect(screen.getByLabelText(/Inversión Mínima/i)).toHaveValue(initialData.minimum_investment);
    expect(screen.getByLabelText(/Monto Objetivo/i)).toHaveValue(initialData.target_amount);
    expect(screen.getByLabelText(/ROI Esperado/i)).toHaveValue(initialData.expected_roi);
    expect(screen.getByLabelText(/Ubicación/i)).toHaveValue(initialData.location);
    
    // Verificar botones
    expect(screen.getByText('Guardar Cambios')).toBeInTheDocument();
  });
  
  // Prueba de validación de formulario
  it('shows validation errors when submitting empty form', async () => {
    render(<ProjectForm mode="create" />);
    
    // Intentar enviar el formulario vacío
    fireEvent.click(screen.getByText('Crear Proyecto'));
    
    // Verificar mensajes de error
    await waitFor(() => {
      expect(screen.getByText('El título es obligatorio')).toBeInTheDocument();
      expect(screen.getByText('La descripción es obligatoria')).toBeInTheDocument();
      expect(screen.getByText('La inversión mínima es obligatoria')).toBeInTheDocument();
      expect(screen.getByText('El monto objetivo es obligatorio')).toBeInTheDocument();
      expect(screen.getByText('El ROI esperado es obligatorio')).toBeInTheDocument();
      expect(screen.getByText('La ubicación es obligatoria')).toBeInTheDocument();
    });
    
    // Verificar que no se llamó al servicio
    expect(projectService.createProject).not.toHaveBeenCalled();
  });
  
  // Prueba de envío de formulario exitoso en modo creación
  it('submits form data correctly in create mode', async () => {
    // Mock de respuesta exitosa
    projectService.createProject.mockResolvedValue({
      id: '1',
      title: 'Nuevo Proyecto',
      status: 'draft',
    });
    
    render(<ProjectForm mode="create" />);
    
    // Llenar el formulario
    fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Nuevo Proyecto' } });
    fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: 'Descripción del nuevo proyecto' } });
    fireEvent.change(screen.getByLabelText(/Inversión Mínima/i), { target: { value: '10000' } });
    fireEvent.change(screen.getByLabelText(/ROI Esperado/i), { target: { value: '12' } });
    fireEvent.change(screen.getByLabelText(/Ubicación/i), { target: { value: 'Barcelona' } });
    
    // Enviar el formulario
    fireEvent.click(screen.getByText('Crear Proyecto'));
    
    // Verificar que se llamó correctamente al servicio
    await waitFor(() => {
      expect(projectService.createProject).toHaveBeenCalledTimes(1);
      expect(projectService.createProject).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Nuevo Proyecto',
        description: 'Descripción del nuevo proyecto',
        minimum_investment: 10000,
        target_amount: 60000, // 6x la inversión mínima
        expected_roi: 12,
        location: 'Barcelona',
        property_type: 'residential', // valor por defecto
      }));
    });
    
    // Verificar mensaje de éxito
    await waitFor(() => {
      expect(screen.getByText('Proyecto creado con éxito')).toBeInTheDocument();
    });
    
    // Verificar redirección
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/admin/projects');
    });
  });
  
  // Prueba de manejo de errores
  it('handles API errors correctly when updating a project', async () => {
    const initialData = {
      id: '1',
      title: 'Proyecto Existente',
      description: 'Descripción existente',
      minimum_investment: 10000,
      target_amount: 60000,
      expected_roi: 12,
      property_type: 'residential',
      location: 'Madrid',
      status: 'draft',
    };
    
    // Mock de error en la API
    const errorMessage = 'No se puede modificar un proyecto ya publicado';
    projectService.updateProject.mockRejectedValue(new Error(errorMessage));
    
    render(<ProjectForm mode="edit" initialData={initialData} />);
    
    // Modificar el título
    fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Proyecto Modificado' } });
    
    // Enviar el formulario
    fireEvent.click(screen.getByText('Guardar Cambios'));
    
    // Verificar que se llamó al servicio
    await waitFor(() => {
      expect(projectService.updateProject).toHaveBeenCalledTimes(1);
    });
    
    // Verificar mensaje de error
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
    
    // Verificar que no se redirigió
    expect(mockRouter.push).not.toHaveBeenCalled();
  });
}); 