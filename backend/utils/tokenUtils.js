const crypto = require('crypto');

/**
 * Generates a cryptographically secure random token.
 * @param {number} length - The desired length of the token in bytes.
 * @returns {string} A hex-encoded secure random token.
 */
function generateSecureToken(length = 32) { 
  return crypto.randomBytes(length).toString('hex');
}

module.exports = {
  generateSecureToken,
}; 