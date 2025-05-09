import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageGalleryViewer from '../ImageGalleryViewer';

// Mock de imágenes para pruebas
const mockImages = [
  {
    url: '/test-image-1.jpg',
    title: 'Test Image 1',
    description: 'Test description 1'
  },
  {
    url: '/test-image-2.jpg',
    title: 'Test Image 2',
    description: 'Test description 2'
  },
  {
    url: '/test-image-3.jpg',
    title: 'Test Image 3',
    description: 'Test description 3'
  }
];

// Mock para preventDefault en eventos
const mockPreventDefault = jest.fn();

// Mock para Event con key
class MockKeyboardEvent extends Event {
  constructor(type, keyProps) {
    super(type);
    this.key = keyProps.key || '';
    this.keyCode = keyProps.keyCode || 0;
    this.which = keyProps.which || this.keyCode;
    this.preventDefault = mockPreventDefault;
  }
}

// Resetear mocks antes de cada test
beforeEach(() => {
  mockPreventDefault.mockClear();
});

describe('ImageGalleryViewer Component', () => {
  test('should render empty state when no images are provided', () => {
    render(<ImageGalleryViewer images={[]} />);
    expect(screen.getByText('No hay imágenes disponibles para este proyecto')).toBeInTheDocument();
  });

  test('should render the first image by default', () => {
    render(<ImageGalleryViewer images={mockImages} />);
    expect(screen.getByAltText('Test Image 1')).toBeInTheDocument();
    expect(screen.getByText('Test Image 1')).toBeInTheDocument();
    expect(screen.getByText('Test description 1')).toBeInTheDocument();
  });

  test('should navigate to next image when clicking next button', () => {
    render(<ImageGalleryViewer images={mockImages} />);
    
    // Verificar que se muestra la primera imagen
    expect(screen.getByAltText('Test Image 1')).toBeInTheDocument();
    
    // Hacer clic en el botón siguiente
    const nextButton = screen.getByLabelText('Imagen siguiente');
    fireEvent.click(nextButton);
    
    // Verificar que se muestra la segunda imagen
    expect(screen.getByAltText('Test Image 2')).toBeInTheDocument();
    expect(screen.getByText('Test Image 2')).toBeInTheDocument();
  });

  test('should navigate to previous image when clicking previous button', () => {
    render(<ImageGalleryViewer images={mockImages} />);
    
    // Navegar a la segunda imagen
    fireEvent.click(screen.getByLabelText('Imagen siguiente'));
    expect(screen.getByAltText('Test Image 2')).toBeInTheDocument();
    
    // Hacer clic en el botón anterior
    const prevButton = screen.getByLabelText('Imagen anterior');
    fireEvent.click(prevButton);
    
    // Verificar que vuelve a la primera imagen
    expect(screen.getByAltText('Test Image 1')).toBeInTheDocument();
  });

  test('should cycle to the first image when clicking next on the last image', () => {
    render(<ImageGalleryViewer images={mockImages} />);
    
    // Navegar a la última imagen
    fireEvent.click(screen.getByLabelText('Imagen siguiente'));
    fireEvent.click(screen.getByLabelText('Imagen siguiente'));
    expect(screen.getByAltText('Test Image 3')).toBeInTheDocument();
    
    // Hacer clic en el botón siguiente nuevamente
    fireEvent.click(screen.getByLabelText('Imagen siguiente'));
    
    // Verificar que vuelve a la primera imagen
    expect(screen.getByAltText('Test Image 1')).toBeInTheDocument();
  });

  test('should cycle to the last image when clicking previous on the first image', () => {
    render(<ImageGalleryViewer images={mockImages} />);
    
    // Verificar que se muestra la primera imagen
    expect(screen.getByAltText('Test Image 1')).toBeInTheDocument();
    
    // Hacer clic en el botón anterior
    fireEvent.click(screen.getByLabelText('Imagen anterior'));
    
    // Verificar que salta a la última imagen
    expect(screen.getByAltText('Test Image 3')).toBeInTheDocument();
  });

  test('should show thumbnails when showThumbnails is true', () => {
    render(<ImageGalleryViewer images={mockImages} showThumbnails={true} />);
    
    // Verificar que hay 3 miniaturas (una por cada imagen)
    const thumbnails = screen.getAllByAltText(/Miniatura/);
    expect(thumbnails.length).toBe(3);
  });

  test('should not show thumbnails when showThumbnails is false', () => {
    render(<ImageGalleryViewer images={mockImages} showThumbnails={false} />);
    
    // Verificar que no hay miniaturas
    const thumbnails = screen.queryAllByAltText(/Miniatura/);
    expect(thumbnails.length).toBe(0);
  });

  test('should enter fullscreen mode when clicking fullscreen button', () => {
    render(<ImageGalleryViewer images={mockImages} />);
    
    // Hacer clic en el botón de pantalla completa
    fireEvent.click(screen.getByLabelText('Ver a pantalla completa'));
    
    // Verificar que se muestra el botón de cerrar (indicando modo pantalla completa)
    expect(screen.getByRole('button', { name: /XMarkIcon/i })).toBeInTheDocument();
  });
  
  test('should show correct image when clicking on a thumbnail', () => {
    render(<ImageGalleryViewer images={mockImages} showThumbnails={true} />);
    
    // Encontrar todas las miniaturas
    const thumbnails = screen.getAllByAltText(/Miniatura/);
    
    // Hacer clic en la tercera miniatura
    fireEvent.click(thumbnails[2]);
    
    // Verificar que se muestra la tercera imagen
    expect(screen.getByAltText('Test Image 3')).toBeInTheDocument();
    expect(screen.getByText('Test Image 3')).toBeInTheDocument();
  });
});

// Test para modo de pantalla completa
describe('ImageGalleryViewer in Fullscreen mode', () => {
  test('should render in fullscreen mode when isFullScreen is true', () => {
    const onCloseMock = jest.fn();
    render(
      <ImageGalleryViewer 
        images={mockImages} 
        isFullScreen={true} 
        onClose={onCloseMock} 
      />
    );
    
    // Verificar que se muestra en modo pantalla completa
    expect(screen.getByText(/Imagen 1 de 3/i)).toBeInTheDocument();
  });
  
  test('should call onClose when clicking close button in fullscreen mode', () => {
    const onCloseMock = jest.fn();
    render(
      <ImageGalleryViewer 
        images={mockImages} 
        isFullScreen={true} 
        onClose={onCloseMock} 
      />
    );
    
    // Encontrar y hacer clic en el botón de cerrar
    fireEvent.click(screen.getByRole('button', { name: /XMarkIcon/i }));
    
    // Verificar que se llamó la función onClose
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
}); 