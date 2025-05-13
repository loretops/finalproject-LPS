import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import InterestButton from '../../components/projects/InterestButton';
import interestService from '../../services/interestService';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';

// Mock de los servicios y hooks
jest.mock('../../services/interestService');
jest.mock('../../context/AuthContext');
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn()
}));

describe('InterestButton', () => {
  // Configuración común para las pruebas
  const defaultProps = {
    projectId: 'project-123',
    onInterestChange: jest.fn()
  };
  
  // Configuración de los mocks antes de cada prueba
  beforeEach(() => {
    // Mock del router
    useRouter.mockReturnValue({
      push: jest.fn(),
      asPath: '/projects/project-123'
    });
    
    // Mock del context de autenticación
    useAuth.mockReturnValue({
      isAuthenticated: true,
      user: { id: 'user-123', role: 'partner' }
    });
    
    // Mock del servicio de intereses
    interestService.checkUserInterest.mockResolvedValue(false);
    interestService.registerInterest.mockResolvedValue({});
    interestService.getUserInterests.mockResolvedValue([]);
    interestService.removeInterest.mockResolvedValue({});
    
    // Limpiar el localStorage mock
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn()
      },
      writable: true
    });
    
    // Limpiar todos los mocks
    jest.clearAllMocks();
  });
  
  test('renderiza correctamente en estado inicial', async () => {
    render(<InterestButton {...defaultProps} />);
    
    // Verificar que se llama a checkUserInterest
    expect(interestService.checkUserInterest).toHaveBeenCalledWith('project-123');
    
    // Botón debe estar en estado de carga inicialmente
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
    
    // Esperar a que termine la inicialización
    await waitFor(() => {
      expect(screen.getByText('Me interesa')).toBeInTheDocument();
    });
  });
  
  test('muestra el botón en estado "Interesado" cuando el usuario ya mostró interés', async () => {
    // Configurar el mock para indicar que el usuario ya tiene interés
    interestService.checkUserInterest.mockResolvedValue(true);
    
    render(<InterestButton {...defaultProps} />);
    
    // Esperar a que se muestre el botón en estado "Interesado"
    await waitFor(() => {
      expect(screen.getByText('Interesado')).toBeInTheDocument();
    });
  });
  
  test('registra interés al hacer clic cuando el usuario no tiene interés', async () => {
    render(<InterestButton {...defaultProps} />);
    
    // Esperar a que termine la inicialización
    await waitFor(() => {
      expect(screen.getByText('Me interesa')).toBeInTheDocument();
    });
    
    // Hacer clic en el botón
    fireEvent.click(screen.getByText('Me interesa'));
    
    // Verificar que se llama al servicio para registrar interés
    expect(interestService.registerInterest).toHaveBeenCalledWith('project-123');
    
    // Verificar que se llama al callback onInterestChange
    await waitFor(() => {
      expect(defaultProps.onInterestChange).toHaveBeenCalledWith(true);
    });
  });
  
  test('elimina interés al hacer clic cuando el usuario ya tiene interés', async () => {
    // Configurar el mock para indicar que el usuario ya tiene interés
    interestService.checkUserInterest.mockResolvedValue(true);
    
    // Mock de getUserInterests para devolver un interés existente
    interestService.getUserInterests.mockResolvedValue([
      { id: 'interest-123', project: { id: 'project-123' } }
    ]);
    
    render(<InterestButton {...defaultProps} />);
    
    // Esperar a que se muestre el botón en estado "Interesado"
    await waitFor(() => {
      expect(screen.getByText('Interesado')).toBeInTheDocument();
    });
    
    // Hacer clic en el botón
    fireEvent.click(screen.getByText('Interesado'));
    
    // Verificar que se llama al servicio para obtener los intereses del usuario
    expect(interestService.getUserInterests).toHaveBeenCalled();
    
    // Verificar que se llama al servicio para eliminar el interés
    expect(interestService.removeInterest).toHaveBeenCalledWith('interest-123');
    
    // Verificar que se llama al callback onInterestChange
    await waitFor(() => {
      expect(defaultProps.onInterestChange).toHaveBeenCalledWith(false);
    });
  });
  
  test('redirige al login si el usuario no está autenticado', async () => {
    // Configurar el mock para indicar que el usuario no está autenticado
    useAuth.mockReturnValue({
      isAuthenticated: false,
      user: null
    });
    
    const router = useRouter();
    
    render(<InterestButton {...defaultProps} />);
    
    // Esperar a que termine la inicialización
    await waitFor(() => {
      expect(screen.getByText('Me interesa')).toBeInTheDocument();
    });
    
    // Hacer clic en el botón
    fireEvent.click(screen.getByText('Me interesa'));
    
    // Verificar que se guarda la URL de retorno en localStorage
    expect(window.localStorage.setItem).toHaveBeenCalledWith('returnUrl', '/projects/project-123');
    
    // Verificar que se redirige al login
    expect(router.push).toHaveBeenCalledWith(expect.stringContaining('/login?returnUrl='));
    
    // Verificar que no se llama al servicio para registrar interés
    expect(interestService.registerInterest).not.toHaveBeenCalled();
  });
  
  test('maneja correctamente variantes visuales', async () => {
    render(
      <InterestButton 
        {...defaultProps} 
        variant="outline" 
        size="sm" 
        showText={false} 
      />
    );
    
    // Esperar a que termine la inicialización
    await waitFor(() => {
      // No debería haber texto
      expect(screen.queryByText('Me interesa')).not.toBeInTheDocument();
    });
    
    // Debe contener el icono SVG
    const svgElement = document.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    
    // Comprobar que las clases para tamaño pequeño se aplican
    const button = svgElement.closest('button');
    expect(button).toHaveClass('px-3', 'py-1.5', 'text-sm'); // Clases para tamaño pequeño
  });
}); 