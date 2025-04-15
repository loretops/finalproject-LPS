// Utilidades para gestión segura de documentos
const CryptoJS = require('crypto-js');
const jose = require('jose');

/**
 * Genera URL firmada para acceso temporal a documento
 * @param {String} documentId - ID del documento
 * @param {Object} user - Usuario que solicita el acceso
 * @param {Number} expiresIn - Tiempo de validez en segundos (defecto 1 hora)
 * @returns {String} URL firmada con token temporal
 */
exports.generateSecureDocumentUrl = async (documentId, user, expiresIn = 3600) => {
  // Usar jose para crear un token JWT compatible con browser/edge
  const encoder = new TextEncoder();
  const secretKey = encoder.encode(process.env.JWT_SECRET);
  
  // Crear el payload del token
  const payload = {
    documentId,
    userId: user.id,
    purpose: 'document-access'
  };
  
  // Firmar el token con jose (debe ser await ya que es asíncrono)
  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${expiresIn}s`)
    .sign(secretKey);

  // En un entorno real, esto podría ser una URL a un controlador que 
  // verifica el token y sirve el documento desde almacenamiento seguro
  return `/api/documents/secure/${documentId}?token=${token}`;
};

/**
 * Encripta contenido sensible de documento
 * @param {String|Object} data - Datos a encriptar
 * @returns {String} Datos encriptados
 */
exports.encryptSensitiveData = (data) => {
  // Convertir a string si es un objeto
  const dataStr = typeof data === 'object' ? JSON.stringify(data) : data;
  
  // Encriptar con AES usando la clave secreta del entorno
  return CryptoJS.AES.encrypt(dataStr, process.env.ENCRYPTION_KEY).toString();
};

/**
 * Desencripta contenido sensible
 * @param {String} encryptedData - Datos encriptados
 * @param {Boolean} parseJson - Si debe convertir el resultado a JSON
 * @returns {String|Object} Datos desencriptados
 */
exports.decryptSensitiveData = (encryptedData, parseJson = false) => {
  // Desencriptar datos
  const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.ENCRYPTION_KEY);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  
  // Convertir a objeto si es necesario
  return parseJson ? JSON.parse(decryptedData) : decryptedData;
};

/**
 * Registra acceso a documento para auditoría
 * @param {String} documentId - ID del documento
 * @param {Object} user - Usuario que accede
 * @param {String} action - Tipo de acción (view, download, etc)
 */
exports.logDocumentAccess = (documentId, user, action) => {
  // En implementación real, guardar en base de datos para auditoría
  console.log(`[AUDIT] ${new Date().toISOString()} - User: ${user.id} - Action: ${action} - Document: ${documentId}`);
  
  // Ejemplo de registros para cumplir con normativas de protección de datos
  /* 
  await db.documentAccessLogs.create({
    documentId,
    userId: user.id,
    userIp: requestIp,
    action,
    timestamp: new Date()
  });
  */
}; 