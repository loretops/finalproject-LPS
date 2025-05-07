/**
 * Tests unitarios para middleware de subida de archivos
 */

const multer = require('multer');
const { 
  createUploadMiddleware,
  handleUploadErrors
} = require('../../../middleware/uploadMiddleware');
const { ALLOWED_FILE_TYPES } = require('../../../utils/storageConfig');

// Mock de multer
jest.mock('multer', () => {
  const mockSingle = jest.fn().mockReturnValue('SINGLE_MIDDLEWARE');
  const mockArray = jest.fn().mockReturnValue('ARRAY_MIDDLEWARE');
  
  const mockMemoryStorage = jest.fn().mockReturnValue('MEMORY_STORAGE');
  
  const mockMulter = jest.fn().mockReturnValue({
    single: mockSingle,
    array: mockArray
  });
  
  // Agregar memoria de almacenamiento
  mockMulter.memoryStorage = mockMemoryStorage;
  
  // Agregar el constructor de error de Multer
  mockMulter.MulterError = class MulterError extends Error {
    constructor(code, field) {
      super(`MulterError: ${code}`);
      this.code = code;
      this.field = field;
      this.name = 'MulterError';
    }
  };
  
  return mockMulter;
});

describe('Upload Middleware', () => {
  let req, res, next;
  
  beforeEach(() => {
    // Mock de req, res y next para pruebas
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    
    // Limpiar mocks
    jest.clearAllMocks();
  });

  describe('createUploadMiddleware', () => {
    test('debe configurar multer con opciones correctas para tipo de documento', () => {
      const middleware = createUploadMiddleware(ALLOWED_FILE_TYPES.DOCUMENT, 'document');
      
      // Verificar que multer fue llamado con opciones correctas
      expect(multer).toHaveBeenCalledWith({
        storage: 'MEMORY_STORAGE',
        limits: {
          fileSize: ALLOWED_FILE_TYPES.DOCUMENT.maxSize
        },
        fileFilter: expect.any(Function)
      });
      
      // Verificar que se creó un middleware single
      expect(multer().single).toHaveBeenCalledWith('document');
      expect(middleware).toBe('SINGLE_MIDDLEWARE');
    });
    
    test('debe configurar multer para múltiples archivos cuando multiple es true', () => {
      const middleware = createUploadMiddleware(ALLOWED_FILE_TYPES.IMAGE, 'images', true);
      
      // Verificar que se creó un middleware array para múltiples archivos
      expect(multer().array).toHaveBeenCalledWith('images', 10);
      expect(middleware).toBe('ARRAY_MIDDLEWARE');
    });
    
    test('debe usar valores predeterminados cuando no se proporcionan argumentos', () => {
      createUploadMiddleware();
      
      // Verificar que se usaron valores predeterminados
      expect(multer().single).toHaveBeenCalledWith('file');
    });
  });
  
  describe('handleUploadErrors', () => {
    test('debe manejar el error LIMIT_FILE_SIZE', () => {
      const error = new multer.MulterError('LIMIT_FILE_SIZE');
      
      handleUploadErrors(error, req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'El archivo excede el tamaño máximo permitido'
      });
      expect(next).not.toHaveBeenCalled();
    });
    
    test('debe manejar el error LIMIT_FILE_COUNT', () => {
      const error = new multer.MulterError('LIMIT_FILE_COUNT');
      
      handleUploadErrors(error, req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Se ha excedido el número máximo de archivos'
      });
      expect(next).not.toHaveBeenCalled();
    });
    
    test('debe manejar el error LIMIT_UNEXPECTED_FILE', () => {
      const error = new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'wrongField');
      
      handleUploadErrors(error, req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Campo de archivo inesperado: wrongField'
      });
      expect(next).not.toHaveBeenCalled();
    });
    
    test('debe manejar el error de tipo de archivo no permitido', () => {
      const error = new Error('Tipo de archivo no permitido. Se esperaba: .pdf, .doc');
      
      handleUploadErrors(error, req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: error.message
      });
      expect(next).not.toHaveBeenCalled();
    });
    
    test('debe pasar otros errores al siguiente middleware', () => {
      const error = new Error('Error desconocido');
      
      handleUploadErrors(error, req, res, next);
      
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });
}); 