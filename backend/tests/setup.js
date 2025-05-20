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
process.env.SMTP_HOST = 'smtp.gmail.com';
process.env.SMTP_PORT = '587';
process.env.SMTP_USER = 'loretopsg@gmail.com';
process.env.SMTP_PASS = 'tghb iebz amhh xmqc';
process.env.EMAIL_FROM = 'loretopsg@gmail.com';
process.env.FRONTEND_URL = 'http://localhost:3001';
process.env.DATABASE_URL = 'postgresql://postgres:password@localhost:5432/coopco';

// Este archivo configura el entorno de pruebas para Jest

// Configuración de variables de entorno para pruebas
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.EMAIL_FROM = 'test@example.com';
process.env.SMTP_HOST = 'smtp.example.com';
process.env.SMTP_PORT = '587';
process.env.SMTP_USER = 'test@example.com';
process.env.SMTP_PASS = 'test-password';

// Configurar tiempos de espera más largos para pruebas de integración
jest.setTimeout(10000);

// Mock global de console.error para pruebas más limpias
global.originalConsoleError = console.error;
console.error = (...args) => {
  // Omitir errores esperados en pruebas
  if (args[0] && typeof args[0] === 'string' && 
      (args[0].includes('test error') || args[0].includes('mock error'))) {
    return;
  }
  // Mantener los errores inesperados
  global.originalConsoleError(...args);
};

// No es necesario configurar afterEach aquí, ya que se configurará en cada archivo de test 