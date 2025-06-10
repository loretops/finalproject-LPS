const crypto = require('crypto');

/**
 * Genera un UUID (Identificador Único Universal) v4
 * @returns {string} - UUID generado
 */
function generateUUID() {
  return crypto.randomUUID();
}

module.exports = {
  generateUUID
}; 