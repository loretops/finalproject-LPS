/**
 * StorageFactory.js
 * Factory para seleccionar el servicio de almacenamiento según el entorno
 */

const LocalStorageService = require('./LocalStorageService');
const CloudinaryStorageService = require('./CloudinaryStorageService');

/**
 * @class StorageFactory
 * @description Factory para crear instancias del servicio de almacenamiento según la configuración
 */
class StorageFactory {
  /**
   * Crea una instancia del servicio de almacenamiento según la estrategia configurada
   * @returns {object} Instancia del servicio de almacenamiento
   */
  static createStorageService() {
    const strategy = process.env.STORAGE_STRATEGY || 'local';
    
    console.log(`Inicializando servicio de almacenamiento con estrategia: ${strategy}`);
    
    switch (strategy.toLowerCase()) {
      case 'cloudinary':
        // Verificar que las variables de entorno necesarias estén configuradas
        if (!process.env.CLOUDINARY_CLOUD_NAME || 
            !process.env.CLOUDINARY_API_KEY || 
            !process.env.CLOUDINARY_API_SECRET) {
          console.error('Error: Faltan variables de entorno para Cloudinary. Usando almacenamiento local como fallback.');
          return new LocalStorageService();
        }
        return new CloudinaryStorageService();
        
      case 'local':
      default:
        return new LocalStorageService();
    }
  }
}

// Exportar una instancia única del servicio para toda la aplicación
const storageService = StorageFactory.createStorageService();
module.exports = storageService; 