import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import '@testing-library/jest-dom';
import ProjectDetailPage from '../../../pages/projects/[id]';
import publicProjectService from '../../../services/publicProjectService';
import { AuthContext } from '../../../context/AuthContext';

// Mock del router de Next.js
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock del servicio de proyectos
jest.mock('../../../services/publicProjectService');

// Mock del componente ImageGalleryViewer
jest.mock('../../../components/projects/ImageGalleryViewer', () => {
  return function MockImageGalleryViewer({ images, showThumbnails }) {
    return (
      <div data-testid="image-gallery-viewer">
        <div data-testid="image-count">{images.length}</div>
        {images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={image.title}
            data-testid={`gallery-image-${index}`}
          />
        ))}
        {showThumbnails && <div data-testid="thumbnails-visible">Thumbnails</div>}
      </div>
    );
  };
});

// Mock del contexto de autenticación
const mockAuthContext = {
  user: {
    id: 'test-user-id',
    email: 'test@example.com',
    role: { name: 'partner' }
  },
  isAuthenticated: true,
  isLoading: false,
  login: jest.fn(),
  logout: jest.fn(),
  checkRole: jest.fn(() => true)
};

// Datos de prueba del proyecto
const mockProjectWithImages = {
  id: '1',
  title: 'Proyecto de Prueba',
  description: 'Descripción del proyecto de prueba',
  location: 'Madrid',
  property_type: 'Residencial',
  minimum_investment: 50000,
  target_amount: 1000000,
  current_amount: 750000,
  expected_roi: 12.5,
  status: 'published',
  documents: [
    {
      id: 'doc-1',
      fileUrl: 'https://example.com/image1.jpg',
      fileType: 'image/jpeg',
      documentType: 'image',
      title: 'Imagen principal',
      accessLevel: 'partner'
    },
    {
      id: 'doc-2',
      fileUrl: 'https://example.com/image2.jpg',
      fileType: 'image/jpeg',
      documentType: 'image',
      title: 'Imagen galería 2',
      accessLevel: 'partner'
    },
    {
      id: 'doc-3',
      fileUrl: 'https://example.com/image3.jpg',
      fileType: 'image/jpeg',
      documentType: 'image',
      title: 'Imagen galería 3',
      accessLevel: 'partner'
    },
    {
      id: 'doc-4',
      fileUrl: 'https://example.com/document.pdf',
      fileType: 'application/pdf',
      documentType: 'legal',
      title: 'Documento legal',
      accessLevel: 'partner'
    }
  ]
};

const mockProjectWithoutImages = {
  id: '2',
  title: 'Proyecto Sin Imágenes',
  description: 'Proyecto que no tiene imágenes',
  location: 'Barcelona',
  property_type: 'Comercial',
  minimum_investment: 100000,
  target_amount: 2000000,
  current_amount: 500000,
  expected_roi: 10.0,
  status: 'published',
  documents: [
    {
      id: 'doc-5',
      fileUrl: 'https://example.com/document.pdf',
      fileType: 'application/pdf',
      documentType: 'legal',
      title: 'Documento legal',
      accessLevel: 'partner'
    }
  ]
};

describe('ProjectDetailPage - Image Gallery', () => {
  const mockRouter = {
    query: { id: '1' },
    push: jest.fn(),
    pathname: '/projects/[id]',
    route: '/projects/[id]',
    asPath: '/projects/1'
  };

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
    jest.clearAllMocks();
  });

  const renderWithAuth = (component) => {
    return render(
      <AuthContext.Provider value={mockAuthContext}>
        {component}
      </AuthContext.Provider>
    );
  };

  test('should load and display project images correctly', async () => {
    // Configurar mock del servicio
    publicProjectService.getPublishedProjectById.mockResolvedValue(mockProjectWithImages);

    renderWithAuth(<ProjectDetailPage />);

    // Esperar a que se cargue el proyecto
    await waitFor(() => {
      expect(screen.getByText('Proyecto de Prueba')).toBeInTheDocument();
    });

    // Verificar que se muestran las imágenes en la galería destacada
    await waitFor(() => {
      expect(screen.getByTestId('image-gallery-viewer')).toBeInTheDocument();
    });

    // Verificar que se cargaron las 3 imágenes
    expect(screen.getByTestId('image-count')).toHaveTextContent('3');

    // Verificar que cada imagen se muestra
    expect(screen.getByTestId('gallery-image-0')).toHaveAttribute('src', 'https://example.com/image1.jpg');
    expect(screen.getByTestId('gallery-image-1')).toHaveAttribute('src', 'https://example.com/image2.jpg');
    expect(screen.getByTestId('gallery-image-2')).toHaveAttribute('src', 'https://example.com/image3.jpg');

    // Verificar que se muestran las miniaturas
    expect(screen.getByTestId('thumbnails-visible')).toBeInTheDocument();
  });

  test('should show gallery tab with image count', async () => {
    publicProjectService.getPublishedProjectById.mockResolvedValue(mockProjectWithImages);

    renderWithAuth(<ProjectDetailPage />);

    await waitFor(() => {
      expect(screen.getByText('Proyecto de Prueba')).toBeInTheDocument();
    });

    // Verificar que la pestaña de galería muestra el número de imágenes
    const galleryTab = screen.getByRole('button', { name: /Galería.*3.*/ });
    expect(galleryTab).toBeInTheDocument();
  });

  test('should handle project without images gracefully', async () => {
    publicProjectService.getPublishedProjectById.mockResolvedValue(mockProjectWithoutImages);
    mockRouter.query.id = '2';

    renderWithAuth(<ProjectDetailPage />);

    await waitFor(() => {
      expect(screen.getByText('Proyecto Sin Imágenes')).toBeInTheDocument();
    });

    // Verificar que se muestra el mensaje de no hay imágenes
    await waitFor(() => {
      expect(screen.getByText('No hay imágenes disponibles para este proyecto')).toBeInTheDocument();
    });

    // Verificar que se muestra 0 imágenes
    expect(screen.getByTestId('image-count')).toHaveTextContent('0');
  });

  test('should filter images from documents correctly', async () => {
    const projectWithMixedDocs = {
      ...mockProjectWithImages,
      documents: [
        ...mockProjectWithImages.documents,
        {
          id: 'doc-6',
          fileUrl: 'https://example.com/image4.png',
          fileType: 'image/png',
          documentType: 'marketing',
          title: 'Imagen PNG',
          accessLevel: 'partner'
        },
        {
          id: 'doc-7',
          fileUrl: 'https://example.com/image5.svg',
          fileType: 'image/svg+xml',
          documentType: 'other',
          title: 'Imagen SVG',
          accessLevel: 'partner'
        }
      ]
    };

    publicProjectService.getPublishedProjectById.mockResolvedValue(projectWithMixedDocs);

    renderWithAuth(<ProjectDetailPage />);

    await waitFor(() => {
      expect(screen.getByText('Proyecto de Prueba')).toBeInTheDocument();
    });

    // Debe mostrar 5 imágenes (3 originales + 2 nuevas)
    await waitFor(() => {
      expect(screen.getByTestId('image-count')).toHaveTextContent('5');
    });

    // Verificar que las nuevas imágenes también se muestran
    expect(screen.getByTestId('gallery-image-3')).toHaveAttribute('src', 'https://example.com/image4.png');
    expect(screen.getByTestId('gallery-image-4')).toHaveAttribute('src', 'https://example.com/image5.svg');
  });

  test('should show gallery in tab content when gallery tab is active', async () => {
    publicProjectService.getPublishedProjectById.mockResolvedValue(mockProjectWithImages);

    renderWithAuth(<ProjectDetailPage />);

    await waitFor(() => {
      expect(screen.getByText('Proyecto de Prueba')).toBeInTheDocument();
    });

    // Click en la pestaña de galería
    const galleryTab = screen.getByRole('button', { name: /Galería/ });
    galleryTab.click();

    // Verificar que se muestra el contenido de la galería
    await waitFor(() => {
      expect(screen.getByTestId('image-gallery')).toBeInTheDocument();
    });
  });

  test('should call service with correct project ID', async () => {
    publicProjectService.getPublishedProjectById.mockResolvedValue(mockProjectWithImages);

    renderWithAuth(<ProjectDetailPage />);

    await waitFor(() => {
      expect(publicProjectService.getPublishedProjectById).toHaveBeenCalledWith('1');
    });
  });

  test('should handle service errors gracefully', async () => {
    publicProjectService.getPublishedProjectById.mockRejectedValue(new Error('Network error'));

    renderWithAuth(<ProjectDetailPage />);

    await waitFor(() => {
      expect(screen.getByText('Error al cargar el proyecto')).toBeInTheDocument();
    });
  });
}); 