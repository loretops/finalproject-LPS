/**
 * Script para verificar la configuración de despliegue
 * 
 * Este script realiza las siguientes comprobaciones:
 * 1. Conexión a la base de datos
 * 2. Configuración de servicio de almacenamiento
 * 3. Configuración de envío de correos
 * 4. Variables de entorno esenciales
 */

require('dotenv').config({ path: '.env' }); // Primero intenta cargar el .env del backend
require('dotenv').config({ path: '../.env' }); // Luego carga el .env de la raíz

const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');
const cloudinary = require('cloudinary').v2;
const storageService = require('./infrastructure/external/storage/StorageFactory');

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Función para mostrar mensajes formateados
function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  let color = colors.reset;
  
  switch (type) {
    case 'success':
      color = colors.green;
      break;
    case 'error':
      color = colors.red;
      break;
    case 'warning':
      color = colors.yellow;
      break;
    case 'info':
      color = colors.blue;
      break;
    case 'title':
      color = colors.cyan;
      break;
  }
  
  console.log(`${color}[${timestamp}] ${message}${colors.reset}`);
}

// Función principal de verificación
async function checkDeploymentConfig() {
  log('VERIFICACIÓN DE CONFIGURACIÓN DE DESPLIEGUE', 'title');
  log('=============================================', 'title');
  
  // 1. Verificar variables de entorno esenciales
  log('\n1. VERIFICANDO VARIABLES DE ENTORNO', 'title');
  
  const requiredVars = [
    'DATABASE_URL',
    'NODE_ENV', 
    'FRONTEND_URL',
    'BACKEND_URL',
    'JWT_SECRET',
    'JWT_EXPIRES_IN',
  ];
  
  const optionalVars = [
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
    'SMTP_HOST',
    'SMTP_PORT',
    'EMAIL_SECURE',
    'SMTP_USER',
    'SMTP_PASS',
    'EMAIL_FROM',
    'STORAGE_STRATEGY',
    'COOKIE_SECURE',
    'COOKIE_HTTP_ONLY',
    'COOKIE_SAME_SITE',
    'RATE_LIMIT_WINDOW',
    'RATE_LIMIT_MAX',
  ];
  
  let missingRequired = 0;
  
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      log(`  ❌ Falta variable requerida: ${varName}`, 'error');
      missingRequired++;
    } else {
      log(`  ✅ ${varName}: ${maskValue(varName, process.env[varName])}`, 'success');
    }
  }
  
  log('\n  Variables opcionales (recomendadas):', 'info');
  
  for (const varName of optionalVars) {
    if (!process.env[varName]) {
      log(`  ⚠️ Falta variable opcional: ${varName}`, 'warning');
    } else {
      log(`  ✅ ${varName}: ${maskValue(varName, process.env[varName])}`, 'success');
    }
  }
  
  if (missingRequired > 0) {
    log(`\n❌ Faltan ${missingRequired} variables de entorno requeridas`, 'error');
    return;
  } else {
    log('\n✅ Todas las variables de entorno requeridas están configuradas', 'success');
  }
  
  // 2. Verificar conexión a la base de datos
  log('\n2. VERIFICANDO CONEXIÓN A LA BASE DE DATOS', 'title');
  
  const prisma = new PrismaClient();
  
  try {
    log('  Intentando conexión a la base de datos...', 'info');
    // Intenta hacer una consulta simple
    const roles = await prisma.role.findMany({ take: 1 });
    log(`  ✅ Conexión exitosa. Roles encontrados: ${roles.length}`, 'success');
  } catch (error) {
    log(`  ❌ Error de conexión a la base de datos: ${error.message}`, 'error');
  } finally {
    await prisma.$disconnect();
  }
  
  // 3. Verificar configuración de almacenamiento
  log('\n3. VERIFICANDO CONFIGURACIÓN DE ALMACENAMIENTO', 'title');
  
  const storageStrategy = process.env.STORAGE_STRATEGY || 'local';
  log(`  Estrategia de almacenamiento: ${storageStrategy}`, 'info');
  
  if (storageStrategy === 'cloudinary') {
    if (!process.env.CLOUDINARY_CLOUD_NAME || 
        !process.env.CLOUDINARY_API_KEY || 
        !process.env.CLOUDINARY_API_SECRET) {
      log('  ❌ Faltan credenciales de Cloudinary', 'error');
    } else {
      try {
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
          secure: true
        });
        
        log('  Verificando configuración de Cloudinary...', 'info');
        const result = await cloudinary.api.ping();
        log(`  ✅ Cloudinary configurado correctamente: ${result.status}`, 'success');
      } catch (error) {
        log(`  ❌ Error al verificar Cloudinary: ${error.message}`, 'error');
      }
    }
  } else {
    log('  ℹ️ Usando almacenamiento local', 'info');
    log(`  Directorio base: ${storageService.baseDir || 'No disponible'}`, 'info');
  }
  
  // 4. Verificar configuración de correo
  log('\n4. VERIFICANDO CONFIGURACIÓN DE CORREO', 'title');
  
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    log('  ⚠️ Configuración de correo incompleta', 'warning');
  } else {
    try {
      log('  Creando transporter de nodemailer...', 'info');
      
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
      
      log('  Verificando configuración de SMTP...', 'info');
      const verify = await transporter.verify();
      
      if (verify) {
        log('  ✅ Configuración de correo verificada correctamente', 'success');
      } else {
        log('  ❌ Error al verificar la configuración de correo', 'error');
      }
    } catch (error) {
      log(`  ❌ Error al verificar configuración de correo: ${error.message}`, 'error');
    }
  }
  
  log('\nVERIFICACIÓN COMPLETADA', 'title');
}

// Función para ocultar valores sensibles
function maskValue(varName, value) {
  const sensitiveVars = [
    'DATABASE_URL', 
    'JWT_SECRET', 
    'CLOUDINARY_API_SECRET', 
    'CLOUDINARY_API_KEY',
    'SMTP_PASS'
  ];
  
  if (sensitiveVars.includes(varName)) {
    return value.substring(0, 3) + '...' + value.substring(value.length - 3);
  }
  
  return value;
}

// Ejecutar verificación
checkDeploymentConfig()
  .catch(error => {
    console.error('Error en la verificación:', error);
    process.exit(1);
  }); 