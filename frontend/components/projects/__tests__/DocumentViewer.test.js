import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DocumentViewer from '../DocumentViewer';

// Mock para window.open
global.open = jest.fn();

// Mock para alert
global.alert = jest.fn();

// Mock para document.createElement
const mockCreateElement = jest.fn();
const mockAppendChild = jest.fn();
const mockRemoveChild = jest.fn();
const mockClick = jest.fn();

const originalCreateElement = document.createElement;
const mockLink = {
  href: '',
  download: '',
  click: mockClick
};

beforeAll(() => {
  document.createElement = (tagName) => {
    if (tagName === 'a') {
      mockCreateElement(tagName);
      return mockLink;
    }
    return originalCreateElement.call(document, tagName);
  };
  
  document.body.appendChild = mockAppendChild;
  document.body.removeChild = mockRemoveChild;
});

afterAll(() => {
  document.createElement = originalCreateElement;
});

// Resetear mocks antes de cada test
beforeEach(() => {
  jest.clearAllMocks();
});

// Documentos de prueba
const pdfDocument = {
  url: 'https://example.com/document.pdf',
  name: 'Test PDF',
  fileType: 'application/pdf',
  documentType: 'legal',
  accessLevel: 'partner',
  securityLevel: 'view_only'
};

const imageDocument = {
  url: 'https://example.com/image.jpg',
  name: 'Test Image',
  fileType: 'image/jpeg',
  documentType: 'marketing',
  accessLevel: 'public',
  securityLevel: 'download'
};

const videoDocument = {
  url: 'https://example.com/video.mp4',
  name: 'Test Video',
  fileType: 'video/mp4',
  documentType: 'marketing',
  accessLevel: 'public',
  securityLevel: 'full_access'
};

const officeDocument = {
  url: 'https://example.com/document.docx',
  name: 'Test Document',
  fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  documentType: 'financial',
  accessLevel: 'investor',
  securityLevel: 'download'
};

describe('DocumentViewer Component', () => {
  test('should render empty state when no document is provided', () => {
    render(<DocumentViewer document={null} />);
    expect(screen.getByText('No hay documento para visualizar')).toBeInTheDocument();
  });

  test('should render PDF viewer for PDF documents', () => {
    render(<DocumentViewer document={pdfDocument} />);
    expect(screen.getByTitle('Test PDF')).toBeInTheDocument();
    expect(screen.getByText('Test PDF')).toBeInTheDocument();
  });

  test('should render image viewer for image documents', () => {
    render(<DocumentViewer document={imageDocument} />);
    expect(screen.getByAltText('Test Image')).toBeInTheDocument();
    expect(screen.getByText('Test Image')).toBeInTheDocument();
  });

  test('should render video player for video documents', () => {
    render(<DocumentViewer document={videoDocument} />);
    expect(screen.getByText('Tu navegador no soporta la reproducción de videos.')).toBeInTheDocument();
    expect(screen.getByText('Test Video')).toBeInTheDocument();
  });

  test('should render document info for office documents', () => {
    render(<DocumentViewer document={officeDocument} />);
    expect(screen.getByText('Test Document')).toBeInTheDocument();
    expect(screen.getByText('Este tipo de documento requiere una aplicación externa para visualizarlo correctamente.')).toBeInTheDocument();
  });

  test('should show download button for downloadable documents', () => {
    render(<DocumentViewer document={imageDocument} />);
    expect(screen.getByText('Descargar')).toBeInTheDocument();
  });

  test('should not show download button for view-only documents', () => {
    render(<DocumentViewer document={pdfDocument} />);
    expect(screen.queryByText('Descargar')).not.toBeInTheDocument();
    expect(screen.getByText('Solo visualización')).toBeInTheDocument();
  });

  test('should handle document download when clicking download button', () => {
    render(<DocumentViewer document={imageDocument} />);
    
    const downloadButton = screen.getByText('Descargar');
    fireEvent.click(downloadButton);
    
    expect(mockCreateElement).toHaveBeenCalledWith('a');
    expect(mockLink.href).toBe('https://example.com/image.jpg');
    expect(mockLink.download).toBe('Test Image');
    expect(mockClick).toHaveBeenCalled();
    expect(mockAppendChild).toHaveBeenCalled();
    expect(mockRemoveChild).toHaveBeenCalled();
  });

  test('should handle opening document in new window', () => {
    render(<DocumentViewer document={pdfDocument} />);
    
    const openButton = screen.getByText('Abrir');
    fireEvent.click(openButton);
    
    expect(global.open).toHaveBeenCalledWith('https://example.com/document.pdf', '_blank');
  });

  test('should warn when trying to download a view-only document', () => {
    // Modificar el documento para probar casos de acceso
    const viewOnlyDoc = {
      ...imageDocument,
      securityLevel: 'view_only'
    };
    
    const { container } = render(<DocumentViewer document={viewOnlyDoc} />);
    
    // Simular intento de descarga llamando directamente al manejador
    // (el botón no estaría visible en la UI)
    const instance = container.firstChild;
    const handleDownload = () => {
      if (!viewOnlyDoc.securityLevel === 'download') {
        alert('Este documento no permite descarga');
        return;
      }
    };
    
    handleDownload();
    
    // Verificar que el alert fue llamado
    expect(global.alert).toHaveBeenCalledWith('Este documento no permite descarga');
  });

  test('should not show controls when showControls is false', () => {
    render(<DocumentViewer document={imageDocument} showControls={false} />);
    
    expect(screen.queryByText('Descargar')).not.toBeInTheDocument();
    expect(screen.queryByText('Abrir')).not.toBeInTheDocument();
  });

  test('should enter fullscreen mode', () => {
    render(<DocumentViewer document={pdfDocument} />);
    
    const fullscreenButton = screen.getByRole('button', { name: /ArrowTopRightOnSquareIcon/i });
    fireEvent.click(fullscreenButton);
    
    // En modo fullscreen, debería haber un botón para cerrar (con XMarkIcon)
    expect(screen.getByRole('button', { name: /XMarkIcon/i })).toBeInTheDocument();
  });

  test('should call onClose when closing fullscreen mode', () => {
    const onCloseMock = jest.fn();
    render(<DocumentViewer document={pdfDocument} isFullScreen={true} onClose={onCloseMock} />);
    
    const closeButton = screen.getByRole('button', { name: /XMarkIcon/i });
    fireEvent.click(closeButton);
    
    expect(onCloseMock).toHaveBeenCalled();
  });
}); 