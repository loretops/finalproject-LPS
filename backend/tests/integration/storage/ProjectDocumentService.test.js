/**
 * Tests de integración para el servicio de documentos de proyectos
 */

const { PrismaClient } = require('@prisma/client');
const ProjectDocumentService = require('../../../domain/services/ProjectDocumentService');
const LocalStorageService = require('../../../infrastructure/external/storage/LocalStorageService');

// Mocks
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    project: {
      findUnique: jest.fn(),
    },
    projectDocument: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
    documentView: {
      create: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

jest.mock('../../../infrastructure/external/storage/LocalStorageService');

describe('ProjectDocumentService Integration Tests', () => {
  let service;
  let prisma;
  let mockStorageService;
  
  const mockProject = {
    id: 'project-123',
    title: 'Test Project',
    status: 'draft',
  };
  
  const mockFile = {
    originalname: 'test-document.pdf',
    buffer: Buffer.from('test content'),
    mimetype: 'application/pdf',
    size: 1024,
  };
  
  const mockDocument = {
    id: 'doc-123',
    projectId: 'project-123',
    fileUrl: 'http://localhost:8001/uploads/documents/project-123/test-document-uuid.pdf',
    fileType: 'application/pdf',
    documentType: 'legal',
    accessLevel: 'partner',
    securityLevel: 'view_only',
    createdAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Configurar mocks de Prisma
    prisma = new PrismaClient();
    prisma.project.findUnique.mockResolvedValue(mockProject);
    prisma.projectDocument.create.mockResolvedValue(mockDocument);
    prisma.projectDocument.findMany.mockResolvedValue([mockDocument]);
    prisma.projectDocument.findUnique.mockResolvedValue(mockDocument);
    prisma.projectDocument.delete.mockResolvedValue(mockDocument);
    prisma.documentView.create.mockResolvedValue({ 
      id: 'view-123', 
      documentId: 'doc-123',
      userId: 'user-123',
    });
    
    // Configurar mock de LocalStorageService
    mockStorageService = new LocalStorageService();
    mockStorageService.storeFile.mockResolvedValue(mockDocument.fileUrl);
    mockStorageService.storeImage.mockResolvedValue('http://localhost:8001/uploads/images/project-123/test-image-uuid.webp');
    mockStorageService.deleteFile.mockResolvedValue(true);
    mockStorageService.getSignedUrl.mockResolvedValue(mockDocument.fileUrl);
    
    // Crear servicio con mocks
    service = new ProjectDocumentService();
    service.prisma = prisma;
    service.storageService = mockStorageService;
  });

  describe('uploadProjectDocument', () => {
    test('debe subir un documento y crear registro en la base de datos', async () => {
      const metadata = {
        documentType: 'legal',
        accessLevel: 'partner',
        securityLevel: 'view_only',
      };
      
      const result = await service.uploadProjectDocument('project-123', mockFile, metadata);
      
      // Verificar que se verificó la existencia del proyecto
      expect(prisma.project.findUnique).toHaveBeenCalledWith({
        where: { id: 'project-123' }
      });
      
      // Verificar que se almacenó el archivo
      expect(mockStorageService.storeFile).toHaveBeenCalledWith(
        mockFile,
        expect.stringContaining('documents/project-123')
      );
      
      // Verificar que se creó un registro en la base de datos
      expect(prisma.projectDocument.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          projectId: 'project-123',
          fileUrl: mockDocument.fileUrl,
          fileType: mockFile.mimetype,
          documentType: metadata.documentType,
          accessLevel: metadata.accessLevel,
          securityLevel: metadata.securityLevel,
        })
      });
      
      // Verificar respuesta
      expect(result).toEqual(mockDocument);
    });
    
    test('debe optimizar imágenes cuando el archivo es una imagen', async () => {
      const imageFile = {
        originalname: 'test-image.jpg',
        buffer: Buffer.from('fake image data'),
        mimetype: 'image/jpeg',
      };
      
      const metadata = {
        documentType: 'image',
        accessLevel: 'public',
        optimize: 'medium',
      };
      
      await service.uploadProjectDocument('project-123', imageFile, metadata);
      
      // Verificar que se usó storeImage en lugar de storeFile
      expect(mockStorageService.storeImage).toHaveBeenCalledWith(
        imageFile,
        expect.stringContaining('images/project-123'),
        expect.objectContaining({
          format: 'webp',
        })
      );
      
      expect(mockStorageService.storeFile).not.toHaveBeenCalled();
    });
    
    test('debe lanzar un error si el proyecto no existe', async () => {
      prisma.project.findUnique.mockResolvedValue(null);
      
      await expect(service.uploadProjectDocument('nonexistent', mockFile, {}))
        .rejects.toThrow('Error al subir documento: Proyecto con ID nonexistent no encontrado');
      
      // Verificar que no se intentó almacenar ni crear registro
      expect(mockStorageService.storeFile).not.toHaveBeenCalled();
      expect(prisma.projectDocument.create).not.toHaveBeenCalled();
    });
  });

  describe('getProjectDocuments', () => {
    test('debe recuperar documentos de un proyecto', async () => {
      const result = await service.getProjectDocuments('project-123');
      
      expect(prisma.projectDocument.findMany).toHaveBeenCalledWith({
        where: { projectId: 'project-123' },
        orderBy: { createdAt: 'desc' }
      });
      
      expect(result).toEqual([mockDocument]);
    });
    
    test('debe aplicar filtros de tipo y nivel de acceso', async () => {
      const options = {
        documentType: 'legal',
        accessLevel: 'partner',
      };
      
      await service.getProjectDocuments('project-123', options);
      
      expect(prisma.projectDocument.findMany).toHaveBeenCalledWith({
        where: {
          projectId: 'project-123',
          documentType: 'legal',
          accessLevel: 'partner',
        },
        orderBy: { createdAt: 'desc' }
      });
    });
  });

  describe('deleteDocument', () => {
    test('debe eliminar un documento exitosamente', async () => {
      const result = await service.deleteDocument('doc-123');
      
      // Verificar consulta de documento
      expect(prisma.projectDocument.findUnique).toHaveBeenCalledWith({
        where: { id: 'doc-123' }
      });
      
      // Verificar eliminación física
      expect(mockStorageService.deleteFile).toHaveBeenCalledWith(mockDocument.fileUrl);
      
      // Verificar eliminación en base de datos
      expect(prisma.projectDocument.delete).toHaveBeenCalledWith({
        where: { id: 'doc-123' }
      });
      
      expect(result).toBe(true);
    });
    
    test('debe lanzar error si el documento no existe', async () => {
      prisma.projectDocument.findUnique.mockResolvedValue(null);
      
      await expect(service.deleteDocument('nonexistent'))
        .rejects.toThrow('Error al eliminar documento: Documento con ID nonexistent no encontrado');
      
      // Verificar que no se intentó eliminar
      expect(mockStorageService.deleteFile).not.toHaveBeenCalled();
      expect(prisma.projectDocument.delete).not.toHaveBeenCalled();
    });
  });

  describe('getSignedDocumentUrl', () => {
    test('debe generar URL firmada y registrar visualización', async () => {
      const result = await service.getSignedDocumentUrl('doc-123', 'user-123');
      
      // Verificar consulta de documento
      expect(prisma.projectDocument.findUnique).toHaveBeenCalledWith({
        where: { id: 'doc-123' },
        include: { project: true }
      });
      
      // Verificar generación de URL firmada
      expect(mockStorageService.getSignedUrl).toHaveBeenCalledWith(
        mockDocument.fileUrl,
        3600
      );
      
      // Verificar registro de visualización
      expect(prisma.documentView.create).toHaveBeenCalledWith({
        data: {
          documentId: 'doc-123',
          userId: 'user-123',
          ipAddress: expect.any(String)
        }
      });
      
      // Verificar estructura de respuesta
      expect(result).toEqual({
        document: mockDocument,
        url: mockDocument.fileUrl,
        expiresIn: 3600
      });
    });
  });
}); 