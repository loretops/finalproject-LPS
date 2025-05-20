// Cargar variables de entorno
require('dotenv').config({ path: '.env' }); // Primero intenta cargar el .env del backend
require('dotenv').config({ path: '../.env' }); // Luego carga el .env de la raíz

// Importaciones
const express = require('express');
const path = require('path'); // Agregar path para manejar rutas de archivos
const { PrismaClient } = require('@prisma/client');

// Rutas API 
const authRoutes = require('./interfaces/http/routes/auth.routes');
const invitationRoutes = require('./interfaces/http/routes/invitation.routes');
const projectRoutes = require('./interfaces/http/routes/project.routes');
const publicProjectRoutes = require('./interfaces/http/routes/publicProject.routes');
const projectDocumentRoutes = require('./application/routes/projectDocumentRoutes');
const interestRoutes = require('./interfaces/http/routes/interest.routes');
const investmentRoutes = require('./interfaces/http/routes/investment.routes');
const notificationRoutes = require('./interfaces/http/routes/notification.routes');
const logRoutes = require('./interfaces/http/routes/log.routes');
const verificationRoutes = require('./interfaces/http/routes/verification.routes');

// <<< AÑADIR ESTE LOG AL INICIO >>>
console.log('DEBUG STARTUP - Reading FRONTEND_URL env var:', process.env.FRONTEND_URL);
// <<< FIN DEL LOG >>>

// Inicialización
const app = express();
const prisma = new PrismaClient();
const port = process.env.BACKEND_PORT || 8001;

// Middleware
app.use(express.json());

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Habilitar CORS
app.use((req, res, next) => {
  // En desarrollo, aceptar cualquier origen
  const allowedOrigins = ['http://localhost:3001', 'http://localhost:3000'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    // Para desarrollo, permitir cualquier origen
    res.header('Access-Control-Allow-Origin', '*');
  }
  
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Ruta para verificar que la API está funcionando
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando correctamente' });
});

// --- Rutas públicas que no requieren autenticación ---
app.use('/api/auth', authRoutes);
app.use('/api/projects/public', publicProjectRoutes);

// --- Rutas que requieren autenticación ---
app.use('/api/invitations', invitationRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/interests', interestRoutes);
app.use('/api', investmentRoutes);
app.use('/api', projectDocumentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/verification', verificationRoutes);

// Ruta de ejemplo usando Prisma
app.get('/api/roles', async (req, res) => {
  try {
    const roles = await prisma.role.findMany();
    res.json(roles);
  } catch (error) {
    console.error('Error al obtener roles:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error('Error en la aplicación:', err.stack);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Ocurrió un error inesperado'
  });
});

// <<< Exportar la app ANTES de iniciar el servidor >>>
module.exports = app;

// <<< Iniciar servidor solo si el script se ejecuta directamente >>>
if (require.main === module) {
  const server = app.listen(port, () => {
    console.log(`Servidor backend ejecutándose en http://localhost:${port}`);
    console.log(`Archivos estáticos disponibles en http://localhost:${port}/uploads`);
  });

  // Manejar cierre correctamente
  const gracefulShutdown = async () => {
    console.log('Cerrando servidor backend...');
    server.close(async () => {
      console.log('Servidor HTTP cerrado.');
      await prisma.$disconnect();
      console.log('Conexión Prisma cerrada.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
} 