import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import InterestButton from '../../components/projects/InterestButton';
import interestService from '../../services/interestService';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';

// Mock servicios y hooks
jest.mock('../../services/interestService');
jest.mock('../../context/AuthContext');
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
  loading: jest.fn(() => ({ dismiss: jest.fn() }))
}));

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('InterestButton', () => {
  // Setup común para todos los tests
  const defaultProps = {
    projectId: 'project-1',
    onInterestChange: jest.fn()
  };
  
  // Referencias a los mocks
  let mockRouter;
  
  beforeEach(() => {
    // Limpiar todos los mocks
    jest.clearAllMocks();
    
    // Mock router
    mockRouter = { push: jest.fn() };
    useRouter.mockReturnValue(mockRouter);
    
    // Por defecto: usuario autenticado, sin interés en el proyecto
    useAuth.mockReturnValue({
      isAuthenticated: true,
      user: { id: 'user-1' }
    });
    
    // Setup servicios
    interestService.checkUserInterest.mockResolvedValue(false);
    interestService.registerInterest.mockResolvedValue({ id: 'new-interest-id' });
    interestService.removeInterest.mockResolvedValue({ success: true });
    interestService.getUserInterests.mockResolvedValue([]);
  });
  
  it('muestra el estado inicial como "Me interesa"', async () => {
    // Render del componente
    render(<InterestButton {...defaultProps} />);
    
    // Verificar la carga inicial
    await waitFor(() => {
      expect(interestService.checkUserInterest).toHaveBeenCalledWith('project-1');
    });
    
    // Verificar estado del botón
    expect(screen.getByRole('button')).toHaveTextContent('Me interesa');
  });
  
  it('muestra "Interesado" si el usuario ya mostró interés', async () => {
    // Simular que el usuario ya tiene interés
    interestService.checkUserInterest.mockResolvedValue(true);
    
    // Render
    render(<InterestButton {...defaultProps} />);
    
    // Esperar verificación
    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent('Interesado');
    });
  });
  
  it('redirige a login si un usuario no autenticado hace clic', async () => {
    // Usuario no autenticado
    useAuth.mockReturnValue({
      isAuthenticated: false,
      user: null
    });
    
    // Render
    render(<InterestButton {...defaultProps} />);
    
    // Esperar a que termine de cargar
    await waitFor(() => {
      expect(screen.getByRole('button')).not.toBeDisabled();
    });
    
    // Hacer clic
    fireEvent.click(screen.getByRole('button'));
    
    // Verificar redirección
    expect(mockRouter.push).toHaveBeenCalled();
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });
  
  it('registra interés cuando el usuario hace clic', async () => {
    // Render
    render(<InterestButton {...defaultProps} />);
    
    // Esperar carga
    await waitFor(() => {
      expect(screen.getByRole('button')).not.toBeDisabled();
    });
    
    // Hacer clic para mostrar interés
    fireEvent.click(screen.getByRole('button'));
    
    // Verificar llamada al servicio
    await waitFor(() => {
      expect(interestService.registerInterest).toHaveBeenCalledWith('project-1');
    });
  });
  
  it('elimina interés cuando un usuario interesado hace clic', async () => {
    // Simular usuario con interés
    interestService.checkUserInterest.mockResolvedValue(true);
    interestService.getUserInterests.mockResolvedValue([
      { id: 'interest-123', project: { id: 'project-1' } }
    ]);
    
    // Render
    render(<InterestButton {...defaultProps} />);
    
    // Esperar carga y verificar estado
    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent('Interesado');
    });
    
    // Hacer clic para quitar interés
    fireEvent.click(screen.getByRole('button'));
    
    // Verificar llamadas a servicio
    await waitFor(() => {
      expect(interestService.getUserInterests).toHaveBeenCalled();
      expect(interestService.removeInterest).toHaveBeenCalledWith('interest-123');
    });
  });
  
  it('admite variantes de tamaño y estilo', () => {
    // Render con variante de tamaño grande
    render(
      <InterestButton 
        projectId="project-1" 
        size="lg" 
        variant="solid" 
      />
    );
    
    // Verificar que el botón tiene el tamaño adecuado
    const button = screen.getByRole('button');
    
    // El tamaño lg debe tener ciertas clases
    expect(button.className).toContain('py-2'); // Clases específicas de tamaño lg
  });
}); 