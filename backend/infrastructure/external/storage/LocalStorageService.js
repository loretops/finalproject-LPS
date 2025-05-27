/**
 * LocalStorageService.js
 * Implementación del servicio de almacenamiento en el sistema de archivos local
 * para entorno de desarrollo
 */

const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const mime = require('mime-types');
const sharp = require('sharp');
const StorageInterface = require('../../../interfaces/storage/StorageInterface');

/**
 * @class LocalStorageService
 * @implements {StorageInterface}
 * @description Servicio para almacenar archivos en el sistema de archivos local (desarrollo)
 */
class LocalStorageService extends StorageInterface {
  constructor() {
    super();
    this.baseDir = path.join(process.cwd(), 'backend', 'public', 'uploads');
    
    // Usar la variable de entorno BASE_URL o construir la URL con el puerto
    const port = process.env.BACKEND_PORT || process.env.PORT || 8001;
    this.baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
  }

  /**
   * Genera un nombre único para el archivo
   * @param {string} originalname - Nombre original del archivo
   * @returns {string} Nombre de archivo único
   * @private
   */
  _generateUniqueFilename(originalname) {
    const ext = path.extname(originalname);
    const name = path.basename(originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');
    return `${name}-${uuidv4()}${ext}`;
  }

  /**
   * Verifica si el directorio existe, si no, lo crea
   * @param {string} dirPath - Ruta al directorio
   * @returns {Promise<void>}
   * @private
   */
  async _ensureDir(dirPath) {
    const fullPath = path.join(this.baseDir, dirPath);
    await fs.ensureDir(fullPath);
    return fullPath;
  }

  /**
   * Almacena un archivo en el sistema de archivos local
   * @param {Object} file - Objeto de archivo de multer
   * @param {string} targetPath - Ruta de destino relativa 
   * @param {Object} options - Opciones adicionales
   * @returns {Promise<string>} URL del archivo almacenado
   */
  async storeFile(file, targetPath, options = {}) {
    try {
      const dirPath = await this._ensureDir(targetPath);
      const filename = this._generateUniqueFilename(file.originalname);
      const destPath = path.join(dirPath, filename);

      // Crear stream y escribir el archivo
      await fs.writeFile(destPath, file.buffer);

      // Retornar el path relativo para la URL
      const relativePath = path.join(
        'uploads', 
        targetPath, 
        filename
      ).replace(/\\/g, '/');

      return this.getPublicUrl(relativePath);
    } catch (error) {
      console.error('Error al almacenar archivo:', error);
      throw new Error(`Error al almacenar archivo: ${error.message}`);
    }
  }

  /**
   * Almacena una imagen con optimización
   * @param {Object} file - Objeto de archivo de imagen de multer
   * @param {string} targetPath - Ruta de destino relativa
   * @param {Object} options - Opciones de optimización (width, height, quality, etc)
   * @returns {Promise<string>} URL de la imagen almacenada
   */
  async storeImage(file, targetPath, options = {}) {
    try {
      const dirPath = await this._ensureDir(targetPath);
      const filename = this._generateUniqueFilename(file.originalname);
      const destPath = path.join(dirPath, filename);

      // Configurar opciones para Sharp
      const {
        width = null,
        height = null,
        quality = 80,
        format = 'webp',
      } = options;

      // Procesar y optimizar la imagen
      let sharpInstance = sharp(file.buffer);

      // Redimensionar si se especificó anchura o altura
      if (width || height) {
        sharpInstance = sharpInstance.resize(width, height, {
          fit: 'inside',
          withoutEnlargement: true
        });
      }

      // Convertir a formato especificado (webp por defecto)
      if (format === 'webp') {
        sharpInstance = sharpInstance.webp({ quality });
      } else if (format === 'jpeg' || format === 'jpg') {
        sharpInstance = sharpInstance.jpeg({ quality });
      } else if (format === 'png') {
        sharpInstance = sharpInstance.png({ quality });
      }

      // Guardar la imagen procesada
      await sharpInstance.toFile(destPath);

      // Generar ruta para acceso web
      const ext = `.${format}`;
      const fileBaseName = path.basename(filename, path.extname(filename));
      const newFilename = `${fileBaseName}${ext}`;
      
      const relativePath = path.join(
        'uploads', 
        targetPath, 
        newFilename
      ).replace(/\\/g, '/');

      return this.getPublicUrl(relativePath);
    } catch (error) {
      console.error('Error al procesar imagen:', error);
      throw new Error(`Error al procesar imagen: ${error.message}`);
    }
  }

  /**
   * Elimina un archivo del sistema de almacenamiento
   * @param {string} fileUrl - URL del archivo a eliminar
   * @returns {Promise<boolean>} True si la eliminación fue exitosa
   */
  async deleteFile(fileUrl) {
    try {
      // Extraer la ruta relativa desde la URL
      const parsedUrl = new URL(fileUrl);
      const pathname = parsedUrl.pathname;
      
      // Convertir la ruta URL a ruta de sistema de archivos
      const relativePath = pathname.replace(/^\//, '');
      const filePath = path.join(process.cwd(), 'backend', 'public', relativePath);

      // Verificar si el archivo existe
      const exists = await fs.pathExists(filePath);
      if (!exists) {
        console.warn(`Archivo no encontrado: ${filePath}`);
        return false;
      }

      // Eliminar el archivo
      await fs.unlink(filePath);
      return true;
    } catch (error) {
      console.error('Error al eliminar archivo:', error);
      return false;
    }
  }

  /**
   * Genera un URL firmado para acceso temporal a un archivo privado
   * En la implementación local, simplemente retornamos la URL pública
   * @param {string} fileUrl - URL del archivo
   * @param {number} expiresIn - Tiempo de expiración en segundos (no usado en local)
   * @returns {Promise<string>} URL firmado con tiempo limitado
   */
  async getSignedUrl(fileUrl, expiresIn = 3600) {
    // Para desarrollo local, simplemente retornamos la URL tal cual
    // En una implementación cloud se generaría un token firmado con expiración
    return fileUrl;
  }

  /**
   * Genera una URL pública para un archivo
   * @param {string} relativePath - Ruta relativa del archivo
   * @returns {string} URL público
   */
  getPublicUrl(relativePath) {
    // Asegurarse de que la ruta comience sin "/"
    const cleanPath = relativePath.replace(/^\//, '');
    return `${this.baseUrl}/${cleanPath}`;
  }
}

module.exports = LocalStorageService; 