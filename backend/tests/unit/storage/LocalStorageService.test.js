/**
 * Tests unitarios para el servicio de almacenamiento local
 */

const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');
const LocalStorageService = require('../../../infrastructure/external/storage/LocalStorageService');

// Mocks
jest.mock('fs-extra');
jest.mock('sharp');
jest.mock('path', () => {
  const originalPath = jest.requireActual('path');
  return {
    ...originalPath,
    join: jest.fn().mockImplementation((...args) => args.join('/')),
    basename: jest.fn().mockImplementation((path, ext) => {
      if (ext) return path.substring(0, path.lastIndexOf(ext));
      return path.substring(path.lastIndexOf('/') + 1);
    }),
    extname: jest.fn().mockImplementation((path) => {
      const lastDotIndex = path.lastIndexOf('.');
      return lastDotIndex !== -1 ? path.substring(lastDotIndex) : '';
    })
  };
});

describe('LocalStorageService', () => {
  let storageService;
  let mockFile;
  let mockSharpInstance;
  let originalProcessCwd;

  beforeAll(() => {
    originalProcessCwd = process.cwd;
    process.cwd = jest.fn(() => '/fake/root');
  });

  afterAll(() => {
    process.cwd = originalProcessCwd;
  });

  beforeEach(() => {
    // Configurar mocks
    jest.clearAllMocks();
    
    // Mock para Sharp
    mockSharpInstance = {
      resize: jest.fn().mockReturnThis(),
      webp: jest.fn().mockReturnThis(),
      jpeg: jest.fn().mockReturnThis(),
      png: jest.fn().mockReturnThis(),
      toFile: jest.fn().mockResolvedValue(true)
    };
    sharp.mockReturnValue(mockSharpInstance);
    
    // Mock para fs-extra
    fs.ensureDir.mockResolvedValue('/fake/path');
    fs.writeFile.mockResolvedValue();
    fs.pathExists.mockResolvedValue(true);
    fs.unlink.mockResolvedValue();

    // Crear instancia del servicio
    storageService = new LocalStorageService();
    
    // Archivo de prueba
    mockFile = {
      originalname: 'test-file.pdf',
      buffer: Buffer.from('test content'),
      mimetype: 'application/pdf'
    };
  });

  describe('_generateUniqueFilename', () => {
    test('debe generar un nombre de archivo con UUID y mantener la extensión', () => {
      const filename = storageService._generateUniqueFilename('Test File.PDF');
      
      // Verificar formato general
      expect(filename).toMatch(/^test-file-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.pdf$/i);
      
      // Verificar que el nombre está en minúscula (excepto posiblemente la extensión)
      const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
      expect(nameWithoutExt).toEqual(nameWithoutExt.toLowerCase());
      
      // Verificar manejo de caracteres especiales
      const specialName = storageService._generateUniqueFilename('Special@Chars!.jpg');
      expect(specialName).toMatch(/^special-chars-+-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.jpg$/i);
    });
  });

  describe('storeFile', () => {
    test('debe almacenar un archivo y devolver la URL', async () => {
      const result = await storageService.storeFile(mockFile, 'documents');
      
      // Verificar que se creó el directorio
      expect(fs.ensureDir).toHaveBeenCalledWith(expect.stringContaining('documents'));
      
      // Verificar que se escribió el archivo
      expect(fs.writeFile).toHaveBeenCalledWith(
        expect.stringContaining('test-file'),
        mockFile.buffer
      );
      
      // Verificar que la URL contiene el camino correcto
      expect(result).toContain('http://localhost:8001/uploads/documents/');
      expect(result).toMatch(/test-file-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.pdf/i);
    });
    
    test('debe manejar errores correctamente', async () => {
      // Simular error al escribir
      fs.writeFile.mockRejectedValue(new Error('Error al escribir'));
      
      await expect(storageService.storeFile(mockFile, 'documents'))
        .rejects.toThrow('Error al almacenar archivo: Error al escribir');
    });
  });

  describe('storeImage', () => {
    beforeEach(() => {
      // Archivo de imagen de prueba
      mockFile = {
        originalname: 'test-image.jpg',
        buffer: Buffer.from('fake image data'),
        mimetype: 'image/jpeg'
      };
    });
    
    test('debe optimizar y almacenar una imagen', async () => {
      const options = {
        width: 800,
        height: 600,
        quality: 85,
        format: 'webp'
      };
      
      const result = await storageService.storeImage(mockFile, 'images', options);
      
      // Verificar que se usó Sharp para procesar la imagen
      expect(sharp).toHaveBeenCalledWith(mockFile.buffer);
      
      // Verificar que se aplicaron las opciones de redimensionamiento
      expect(mockSharpInstance.resize).toHaveBeenCalledWith(800, 600, expect.any(Object));
      
      // Verificar que se usó el formato webp
      expect(mockSharpInstance.webp).toHaveBeenCalledWith({ quality: 85 });
      
      // Verificar que se guardó el archivo
      expect(mockSharpInstance.toFile).toHaveBeenCalled();
      
      // Verificar que la URL contiene la ruta correcta
      expect(result).toContain('http://localhost:8001/uploads/images/');
      expect(result).toMatch(/test-image-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.webp/i);
    });
    
    test('debe usar configuración predeterminada cuando no se proporcionan opciones', async () => {
      await storageService.storeImage(mockFile, 'images');
      
      // No debe haber redimensionamiento sin opciones de tamaño
      expect(mockSharpInstance.resize).not.toHaveBeenCalled();
      
      // Debe usar webp por defecto
      expect(mockSharpInstance.webp).toHaveBeenCalledWith({ quality: 80 });
    });
  });

  describe('deleteFile', () => {
    test('debe eliminar un archivo cuando existe', async () => {
      const fileUrl = 'http://localhost:8001/uploads/documents/file.pdf';
      
      const result = await storageService.deleteFile(fileUrl);
      
      // Verificar que se comprobó la existencia del archivo
      expect(fs.pathExists).toHaveBeenCalled();
      
      // Verificar que se eliminó el archivo
      expect(fs.unlink).toHaveBeenCalled();
      
      // Verificar que devuelve true para éxito
      expect(result).toBe(true);
    });
    
    test('debe manejar correctamente archivos inexistentes', async () => {
      fs.pathExists.mockResolvedValue(false);
      
      const fileUrl = 'http://localhost:8001/uploads/documents/nonexistent.pdf';
      const result = await storageService.deleteFile(fileUrl);
      
      // Verificar que se comprobó la existencia
      expect(fs.pathExists).toHaveBeenCalled();
      
      // Verificar que NO se intentó eliminar
      expect(fs.unlink).not.toHaveBeenCalled();
      
      // Verificar que devuelve false para "no eliminado"
      expect(result).toBe(false);
    });
  });

  describe('getPublicUrl', () => {
    test('debe generar URLs correctas', () => {
      // Con barra al inicio
      expect(storageService.getPublicUrl('/uploads/file.pdf'))
        .toBe('http://localhost:8001/uploads/file.pdf');
      
      // Sin barra al inicio
      expect(storageService.getPublicUrl('uploads/file.pdf'))
        .toBe('http://localhost:8001/uploads/file.pdf');
    });
  });
}); 