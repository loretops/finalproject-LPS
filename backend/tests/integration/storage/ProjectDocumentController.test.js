/**
 * Tests para el controlador de documentos de proyectos
 */

// Mockear el servicio
jest.mock('../../../domain/services/ProjectDocumentService', () => {
  return jest.fn().mockImplementation(() => ({
    uploadProjectDocument: jest.fn(),
    getProjectDocuments: jest.fn(),
    getDocumentById: jest.fn(),
    deleteDocument: jest.fn(),
    getSignedDocumentUrl: jest.fn()
  }));
});

const ProjectDocumentService = require('../../../domain/services/ProjectDocumentService');
const mockServiceInstance = new ProjectDocumentService();

// Reemplazar la importación para usar nuestro mock
jest.mock('../../../application/controllers/ProjectDocumentController', () => {
  const actualController = jest.requireActual('../../../application/controllers/ProjectDocumentController');
  actualController.documentService = mockServiceInstance;
  return actualController;
});

const controller = require('../../../application/controllers/ProjectDocumentController');

describe('ProjectDocumentController', () => {
  let req;
  let res;
  
  const mockDocument = {
    id: 'doc-123',
    projectId: 'project-123',
    fileUrl: 'http://localhost:8001/uploads/documents/project-123/test-document.pdf',
    fileType: 'application/pdf',
    documentType: 'legal',
    accessLevel: 'partner',
    securityLevel: 'view_only',
  };

  beforeEach(() => {
    // Limpiar todos los mocks
    jest.clearAllMocks();
    
    // Configurar mocks de request y response
    req = {
      params: { projectId: 'project-123', documentId: 'doc-123' },
      file: {
        originalname: 'test-document.pdf',
        buffer: Buffer.from('test content'),
        mimetype: 'application/pdf',
      },
      body: {
        documentType: 'legal',
        accessLevel: 'partner',
        securityLevel: 'view_only',
      },
      query: {},
      user: { id: 'user-123' },
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    
    // Configurar comportamiento de los mocks
    mockServiceInstance.uploadProjectDocument.mockResolvedValue(mockDocument);
    mockServiceInstance.getProjectDocuments.mockResolvedValue([mockDocument]);
    mockServiceInstance.getDocumentById.mockResolvedValue(mockDocument);
    mockServiceInstance.deleteDocument.mockResolvedValue(true);
    mockServiceInstance.getSignedDocumentUrl.mockResolvedValue({
      document: mockDocument,
      url: mockDocument.fileUrl,
      expiresIn: 3600,
    });
  });

  describe('uploadProjectDocument', () => {
    test('debe subir un documento exitosamente', async () => {
      await controller.uploadProjectDocument(req, res);
      
      expect(mockServiceInstance.uploadProjectDocument).toHaveBeenCalledWith(
        'project-123',
        req.file,
        {
          documentType: 'legal',
          accessLevel: 'partner',
          securityLevel: 'view_only',
          optimize: undefined,
        }
      );
      
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Documento subido correctamente',
        document: mockDocument,
      });
    });
    
    test('debe retornar error 400 si no hay archivo', async () => {
      req.file = null;
      
      await controller.uploadProjectDocument(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'No se ha proporcionado ningún archivo'
      });
      
      expect(mockServiceInstance.uploadProjectDocument).not.toHaveBeenCalled();
    });
    
    test('debe manejar errores del servicio', async () => {
      mockServiceInstance.uploadProjectDocument.mockRejectedValue(
        new Error('Error al subir documento: Proyecto con ID project-123 no encontrado')
      );
      
      await controller.uploadProjectDocument(req, res);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Error al subir documento: Proyecto con ID project-123 no encontrado'
      });
    });
  });

  describe('getProjectDocuments', () => {
    test('debe obtener documentos de un proyecto', async () => {
      await controller.getProjectDocuments(req, res);
      
      expect(mockServiceInstance.getProjectDocuments).toHaveBeenCalledWith(
        'project-123',
        expect.any(Object)
      );
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        documents: [mockDocument]
      });
    });
    
    test('debe pasar filtros del query string al servicio', async () => {
      req.query = {
        documentType: 'legal',
        accessLevel: 'partner',
      };
      
      await controller.getProjectDocuments(req, res);
      
      expect(mockServiceInstance.getProjectDocuments).toHaveBeenCalledWith(
        'project-123',
        {
          documentType: 'legal',
          accessLevel: 'partner',
        }
      );
    });
  });

  describe('getDocumentById', () => {
    test('debe obtener un documento por ID', async () => {
      await controller.getDocumentById(req, res);
      
      expect(mockServiceInstance.getDocumentById).toHaveBeenCalledWith('doc-123');
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        document: mockDocument
      });
    });
    
    test('debe manejar error de documento no encontrado', async () => {
      mockServiceInstance.getDocumentById.mockRejectedValue(
        new Error('Error al obtener documento: Documento con ID doc-123 no encontrado')
      );
      
      await controller.getDocumentById(req, res);
      
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('deleteDocument', () => {
    test('debe eliminar un documento por ID', async () => {
      await controller.deleteDocument(req, res);
      
      expect(mockServiceInstance.deleteDocument).toHaveBeenCalledWith('doc-123');
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Documento eliminado correctamente'
      });
    });
  });

  describe('getSignedDocumentUrl', () => {
    test('debe generar URL firmada para acceso a documento', async () => {
      await controller.getSignedDocumentUrl(req, res);
      
      expect(mockServiceInstance.getSignedDocumentUrl).toHaveBeenCalledWith(
        'doc-123',
        'user-123'
      );
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        document: mockDocument,
        url: mockDocument.fileUrl,
        expiresIn: 3600,
      });
    });
  });
}); 