/**
 * StorageInterface.js
 * Define la interfaz para los servicios de almacenamiento de archivos
 */

/**
 * @interface StorageInterface
 * @description Interfaz para implementar servicios de almacenamiento de archivos
 */
class StorageInterface {
  /**
   * Almacena un archivo en el sistema de almacenamiento
   * @param {Object} file - Objeto de archivo de multer
   * @param {string} targetPath - Ruta de destino relativa 
   * @param {Object} options - Opciones adicionales
   * @returns {Promise<string>} URL del archivo almacenado
   */
  async storeFile(file, targetPath, options = {}) {
    throw new Error('Method storeFile() must be implemented');
  }

  /**
   * Almacena una imagen con optimización
   * @param {Object} file - Objeto de archivo de imagen de multer
   * @param {string} targetPath - Ruta de destino relativa
   * @param {Object} options - Opciones de optimización (ancho, alto, calidad, etc)
   * @returns {Promise<string>} URL de la imagen almacenada
   */
  async storeImage(file, targetPath, options = {}) {
    throw new Error('Method storeImage() must be implemented');
  }

  /**
   * Elimina un archivo del sistema de almacenamiento
   * @param {string} fileUrl - URL del archivo a eliminar
   * @returns {Promise<boolean>} True si la eliminación fue exitosa
   */
  async deleteFile(fileUrl) {
    throw new Error('Method deleteFile() must be implemented');
  }

  /**
   * Genera un URL firmado para acceso temporal a un archivo privado
   * @param {string} fileUrl - URL del archivo
   * @param {number} expiresIn - Tiempo de expiración en segundos
   * @returns {Promise<string>} URL firmado con tiempo limitado
   */
  async getSignedUrl(fileUrl, expiresIn = 3600) {
    throw new Error('Method getSignedUrl() must be implemented');
  }

  /**
   * Genera una URL pública para un archivo
   * @param {string} relativePath - Ruta relativa del archivo
   * @returns {string} URL público
   */
  getPublicUrl(relativePath) {
    throw new Error('Method getPublicUrl() must be implemented');
  }
}

module.exports = StorageInterface; 