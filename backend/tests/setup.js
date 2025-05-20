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