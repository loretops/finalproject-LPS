/**
 * Configuración para los tests de backend
 */

// Evita errores de TextEncoder/TextDecoder
if (typeof TextEncoder === 'undefined') {
  global.TextEncoder = require('util').TextEncoder;
}

if (typeof TextDecoder === 'undefined') {
  global.TextDecoder = require('util').TextDecoder;
}

// Mock para variables de entorno
process.env.BASE_URL = 'http://localhost:8001';
process.env.FRONTEND_URL = 'http://localhost:3001'; 