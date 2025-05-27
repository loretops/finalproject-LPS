/**
 * CloudinaryStorageService.js
 * Implementación del servicio de almacenamiento utilizando Cloudinary
 * para entorno de producción
 */

const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const StorageInterface = require('../../../interfaces/storage/StorageInterface');

/**
 * @class CloudinaryStorageService
 * @implements {StorageInterface}
 * @description Servicio para almacenar archivos en Cloudinary (producción)
 */
class CloudinaryStorageService extends StorageInterface {
  constructor() {
    super();
    
    // Configurar Cloudinary con las credenciales
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true
    });
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
    return `${name}-${uuidv4()}`;
  }

  /**
   * Convierte un buffer a un stream legible
   * @param {Buffer} buffer - Buffer de datos
   * @returns {Readable} Stream legible
   * @private
   */
  _bufferToStream(buffer) {
    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);
    return readable;
  }

  /**
   * Sube un archivo a Cloudinary
   * @param {Buffer} buffer - Buffer del archivo
   * @param {string} folder - Carpeta en Cloudinary
   * @param {string} filename - Nombre del archivo
   * @param {Object} options - Opciones adicionales
   * @returns {Promise<Object>} Resultado de la subida
   * @private
   */
  async _uploadToCloudinary(buffer, folder, filename, options = {}) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          public_id: filename,
          resource_type: 'auto',
          ...options
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      this._bufferToStream(buffer).pipe(uploadStream);
    });
  }

  /**
   * Almacena un archivo en Cloudinary
   * @param {Object} file - Objeto de archivo de multer
   * @param {string} targetPath - Ruta de destino relativa (usado como folder en Cloudinary)
   * @param {Object} options - Opciones adicionales
   * @returns {Promise<string>} URL del archivo almacenado
   */
  async storeFile(file, targetPath, options = {}) {
    try {
      const filename = this._generateUniqueFilename(file.originalname);
      const folder = targetPath.replace(/\\/g, '/');
      
      const result = await this._uploadToCloudinary(
        file.buffer,
        folder,
        filename,
        options
      );

      return result.secure_url;
    } catch (error) {
      console.error('Error al almacenar archivo en Cloudinary:', error);
      throw new Error(`Error al almacenar archivo: ${error.message}`);
    }
  }

  /**
   * Almacena una imagen con optimización en Cloudinary
   * @param {Object} file - Objeto de archivo de imagen
   * @param {string} targetPath - Ruta de destino relativa (usado como folder en Cloudinary)
   * @param {Object} options - Opciones de optimización
   * @returns {Promise<string>} URL de la imagen almacenada
   */
  async storeImage(file, targetPath, options = {}) {
    try {
      const filename = this._generateUniqueFilename(file.originalname);
      const folder = targetPath.replace(/\\/g, '/');
      
      const {
        width = null,
        height = null,
        quality = 80,
        format = 'webp',
      } = options;

      // Configurar transformaciones de Cloudinary
      const cloudinaryOptions = {
        folder,
        resource_type: 'image',
        format,
        quality,
        transformation: []
      };

      // Añadir transformación de redimensionamiento si se especificó
      if (width || height) {
        cloudinaryOptions.transformation.push({
          width,
          height,
          crop: 'limit'
        });
      }

      const result = await this._uploadToCloudinary(
        file.buffer,
        folder,
        filename,
        cloudinaryOptions
      );

      return result.secure_url;
    } catch (error) {
      console.error('Error al procesar imagen en Cloudinary:', error);
      throw new Error(`Error al procesar imagen: ${error.message}`);
    }
  }

  /**
   * Elimina un archivo de Cloudinary
   * @param {string} fileUrl - URL del archivo a eliminar
   * @returns {Promise<boolean>} True si la eliminación fue exitosa
   */
  async deleteFile(fileUrl) {
    try {
      // Extraer el public_id desde la URL de Cloudinary
      const urlParts = fileUrl.split('/');
      const filenameWithExt = urlParts[urlParts.length - 1];
      const filename = filenameWithExt.split('.')[0];
      
      // Obtener la carpeta desde la URL
      const folderIndex = urlParts.indexOf('upload') + 1;
      const folderParts = urlParts.slice(folderIndex, urlParts.length - 1);
      const folder = folderParts.join('/');
      
      // Construir el public_id completo
      const publicId = folder ? `${folder}/${filename}` : filename;
      
      // Detectar resource_type según extensión
      const extension = path.extname(filenameWithExt).toLowerCase();
      const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
      const videoExts = ['.mp4', '.mov', '.avi', '.mkv', '.wmv', '.flv'];
      let resourceType;
      if (imageExts.includes(extension)) {
        resourceType = 'image';
      } else if (videoExts.includes(extension)) {
        resourceType = 'video';
      } else {
        resourceType = 'raw';
      }
      // Eliminar el archivo en Cloudinary con resource_type adecuado
      const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
      return result.result === 'ok';
    } catch (error) {
      console.error('Error al eliminar archivo de Cloudinary:', error);
      return false;
    }
  }

  /**
   * Genera un URL firmado para acceso temporal a un archivo privado
   * @param {string} fileUrl - URL del archivo
   * @param {number} expiresIn - Tiempo de expiración en segundos
   * @returns {Promise<string>} URL firmado con tiempo limitado
   */
  async getSignedUrl(fileUrl, expiresIn = 3600) {
    try {
      // Extraer el public_id y resource_type desde la URL de acuerdo a la extensión
      const urlParts = fileUrl.split('/');
      const filenameWithExt = urlParts[urlParts.length - 1];
      const filename = filenameWithExt.split('.')[0];
      const extension = path.extname(filenameWithExt).toLowerCase();
      let resourceType;
      // Definir resource_type según extensión
      const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
      const videoExts = ['.mp4', '.mpeg', '.mov', '.avi', '.wmv'];
      if (imageExts.includes(extension)) {
        resourceType = 'image';
      } else if (videoExts.includes(extension)) {
        resourceType = 'video';
      } else {
        resourceType = 'raw';
      }
      
      // Obtener la carpeta desde la URL
      const folderIndex = urlParts.indexOf('upload') + 1;
      const folderParts = urlParts.slice(folderIndex, urlParts.length - 1);
      const folder = folderParts.join('/');
      
      // Construir el public_id completo
      const publicId = folder ? `${folder}/${filename}` : filename;
      
      // Determinar tipo de entrega: authenticated para raw (documentos), upload para otros
      const deliveryType = resourceType === 'raw' ? 'authenticated' : 'upload';
      // Generar URL firmada
      const signedUrl = cloudinary.url(publicId, {
        resource_type: resourceType,
        type: deliveryType,
        secure: true,
        sign_url: true,
        expires_at: Math.floor(Date.now() / 1000) + expiresIn
      });
      
      return signedUrl;
    } catch (error) {
      console.error('Error al generar URL firmada:', error);
      throw new Error(`Error al generar URL firmada: ${error.message}`);
    }
  }

  /**
   * Genera una URL pública para un archivo
   * @param {string} publicId - ID público del recurso en Cloudinary
   * @returns {string} URL público
   */
  getPublicUrl(publicId) {
    return cloudinary.url(publicId, {
      secure: true,
      resource_type: 'auto'
    });
  }
}

module.exports = CloudinaryStorageService; 