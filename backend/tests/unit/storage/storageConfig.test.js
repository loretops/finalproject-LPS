/**
 * Tests unitarios para la configuración de almacenamiento y validación de tipos de archivos
 */

const { 
  ALLOWED_FILE_TYPES, 
  PROJECT_DOCUMENT_TYPES, 
  ACCESS_LEVELS, 
  SECURITY_LEVELS,
  IMAGE_OPTIMIZATION_OPTIONS,
  isFileTypeAllowed 
} = require('../../../utils/storageConfig');

describe('Storage Configuration', () => {
  describe('ALLOWED_FILE_TYPES', () => {
    test('debe definir tipos de archivos permitidos con sus propiedades', () => {
      // Verificar que los tipos principales están definidos
      expect(ALLOWED_FILE_TYPES).toHaveProperty('DOCUMENT');
      expect(ALLOWED_FILE_TYPES).toHaveProperty('IMAGE');
      expect(ALLOWED_FILE_TYPES).toHaveProperty('VIDEO');
      
      // Verificar que cada tipo tiene las propiedades requeridas
      Object.values(ALLOWED_FILE_TYPES).forEach(fileType => {
        if (fileType !== ALLOWED_FILE_TYPES.ANY) {
          expect(fileType).toHaveProperty('mimeTypes');
          expect(fileType).toHaveProperty('extensions');
          expect(fileType).toHaveProperty('maxSize');
          expect(fileType).toHaveProperty('directory');
          
          // Los mimeTypes deben ser arrays
          expect(Array.isArray(fileType.mimeTypes)).toBe(true);
          // Las extensiones deben ser arrays
          expect(Array.isArray(fileType.extensions)).toBe(true);
          // El tamaño máximo debe ser un número
          expect(typeof fileType.maxSize).toBe('number');
        }
      });
    });
    
    test('debe tener configurados los tipos MIME correctos', () => {
      // Verificar tipos de documentos
      expect(ALLOWED_FILE_TYPES.DOCUMENT.mimeTypes).toContain('application/pdf');
      expect(ALLOWED_FILE_TYPES.DOCUMENT.mimeTypes).toContain('application/msword');
      
      // Verificar tipos de imágenes
      expect(ALLOWED_FILE_TYPES.IMAGE.mimeTypes).toContain('image/jpeg');
      expect(ALLOWED_FILE_TYPES.IMAGE.mimeTypes).toContain('image/png');
      expect(ALLOWED_FILE_TYPES.IMAGE.mimeTypes).toContain('image/webp');
      
      // Verificar tipos de videos
      expect(ALLOWED_FILE_TYPES.VIDEO.mimeTypes).toContain('video/mp4');
      expect(ALLOWED_FILE_TYPES.VIDEO.mimeTypes).toContain('video/mpeg');
    });
    
    test('debe tener tamaños máximos razonables', () => {
      // Verificar que los documentos tienen un límite razonable (hasta 10MB)
      expect(ALLOWED_FILE_TYPES.DOCUMENT.maxSize).toBeLessThanOrEqual(20 * 1024 * 1024);
      
      // Verificar que las imágenes tienen un límite menor que los documentos
      expect(ALLOWED_FILE_TYPES.IMAGE.maxSize).toBeLessThan(ALLOWED_FILE_TYPES.DOCUMENT.maxSize);
      
      // Verificar que los videos tienen un límite mayor
      expect(ALLOWED_FILE_TYPES.VIDEO.maxSize).toBeGreaterThan(ALLOWED_FILE_TYPES.DOCUMENT.maxSize);
    });
  });
  
  describe('PROJECT_DOCUMENT_TYPES', () => {
    test('debe definir todos los tipos de documentos de proyecto necesarios', () => {
      // Verificar tipos básicos
      expect(PROJECT_DOCUMENT_TYPES).toHaveProperty('LEGAL');
      expect(PROJECT_DOCUMENT_TYPES).toHaveProperty('FINANCIAL');
      expect(PROJECT_DOCUMENT_TYPES).toHaveProperty('TECHNICAL');
      expect(PROJECT_DOCUMENT_TYPES).toHaveProperty('MARKETING');
      expect(PROJECT_DOCUMENT_TYPES).toHaveProperty('IMAGE');
      expect(PROJECT_DOCUMENT_TYPES).toHaveProperty('VIDEO');
      expect(PROJECT_DOCUMENT_TYPES).toHaveProperty('OTHER');
      
      // Verificar que son strings
      Object.values(PROJECT_DOCUMENT_TYPES).forEach(type => {
        expect(typeof type).toBe('string');
      });
    });
  });
  
  describe('ACCESS_LEVELS y SECURITY_LEVELS', () => {
    test('debe definir niveles de acceso adecuados', () => {
      expect(ACCESS_LEVELS).toHaveProperty('PUBLIC');
      expect(ACCESS_LEVELS).toHaveProperty('PARTNER');
      expect(ACCESS_LEVELS).toHaveProperty('INVESTOR');
      expect(ACCESS_LEVELS).toHaveProperty('ADMIN');
    });
    
    test('debe definir niveles de seguridad adecuados', () => {
      expect(SECURITY_LEVELS).toHaveProperty('VIEW_ONLY');
      expect(SECURITY_LEVELS).toHaveProperty('DOWNLOAD');
      expect(SECURITY_LEVELS).toHaveProperty('PRINT');
      expect(SECURITY_LEVELS).toHaveProperty('FULL_ACCESS');
    });
  });
  
  describe('IMAGE_OPTIMIZATION_OPTIONS', () => {
    test('debe definir opciones de optimización para diferentes tamaños', () => {
      expect(IMAGE_OPTIMIZATION_OPTIONS).toHaveProperty('THUMBNAIL');
      expect(IMAGE_OPTIMIZATION_OPTIONS).toHaveProperty('MEDIUM');
      expect(IMAGE_OPTIMIZATION_OPTIONS).toHaveProperty('LARGE');
      expect(IMAGE_OPTIMIZATION_OPTIONS).toHaveProperty('ORIGINAL');
      
      // Verificar estructura de opciones
      const optionSets = [
        IMAGE_OPTIMIZATION_OPTIONS.THUMBNAIL,
        IMAGE_OPTIMIZATION_OPTIONS.MEDIUM,
        IMAGE_OPTIMIZATION_OPTIONS.LARGE
      ];
      
      optionSets.forEach(options => {
        expect(options).toHaveProperty('width');
        expect(options).toHaveProperty('height');
        expect(options).toHaveProperty('quality');
        expect(options).toHaveProperty('format');
        
        expect(typeof options.width).toBe('number');
        expect(typeof options.height).toBe('number');
        expect(typeof options.quality).toBe('number');
        expect(typeof options.format).toBe('string');
      });
      
      // ORIGINAL no debería tener width/height
      expect(IMAGE_OPTIMIZATION_OPTIONS.ORIGINAL).not.toHaveProperty('width');
      expect(IMAGE_OPTIMIZATION_OPTIONS.ORIGINAL).not.toHaveProperty('height');
    });
    
    test('debe tener una jerarquía lógica de tamaños', () => {
      // Thumbnails deben ser más pequeños que Medium
      expect(IMAGE_OPTIMIZATION_OPTIONS.THUMBNAIL.width)
        .toBeLessThan(IMAGE_OPTIMIZATION_OPTIONS.MEDIUM.width);
      
      // Medium debe ser más pequeño que Large
      expect(IMAGE_OPTIMIZATION_OPTIONS.MEDIUM.width)
        .toBeLessThan(IMAGE_OPTIMIZATION_OPTIONS.LARGE.width);
    });
  });
  
  describe('isFileTypeAllowed', () => {
    test('debe permitir tipos de archivo válidos', () => {
      // Crear mock de archivo PDF
      const pdfFile = { mimetype: 'application/pdf' };
      expect(isFileTypeAllowed(pdfFile, ALLOWED_FILE_TYPES.DOCUMENT)).toBe(true);
      
      // Crear mock de archivo imagen
      const imageFile = { mimetype: 'image/jpeg' };
      expect(isFileTypeAllowed(imageFile, ALLOWED_FILE_TYPES.IMAGE)).toBe(true);
      
      // Crear mock de archivo video
      const videoFile = { mimetype: 'video/mp4' };
      expect(isFileTypeAllowed(videoFile, ALLOWED_FILE_TYPES.VIDEO)).toBe(true);
    });
    
    test('debe rechazar tipos de archivo no permitidos', () => {
      // Archivo no permitido para el tipo documento
      const imageFile = { mimetype: 'image/jpeg' };
      expect(isFileTypeAllowed(imageFile, ALLOWED_FILE_TYPES.DOCUMENT)).toBe(false);
      
      // Archivo no permitido para el tipo imagen
      const pdfFile = { mimetype: 'application/pdf' };
      expect(isFileTypeAllowed(pdfFile, ALLOWED_FILE_TYPES.IMAGE)).toBe(false);
      
      // Tipo MIME desconocido
      const unknownFile = { mimetype: 'application/unknown' };
      expect(isFileTypeAllowed(unknownFile, ALLOWED_FILE_TYPES.DOCUMENT)).toBe(false);
    });
    
    test('debe permitir cualquier tipo si no hay restricciones', () => {
      // Cualquier tipo de archivo
      const anyFile = { mimetype: 'any/type' };
      expect(isFileTypeAllowed(anyFile, ALLOWED_FILE_TYPES.ANY)).toBe(true);
      
      // Pasar null/undefined como tipo permitido
      expect(isFileTypeAllowed(anyFile, null)).toBe(true);
      expect(isFileTypeAllowed(anyFile, undefined)).toBe(true);
    });
  });
}); 