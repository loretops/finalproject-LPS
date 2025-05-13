require('dotenv').config({ path: '../.env' });

// Importaciones
const express = require('express');
const path = require('path'); // Agregar path para manejar rutas de archivos
const { PrismaClient } = require('@prisma/client');
const authRoutes = require('./interfaces/http/routes/auth.routes'); // Importar rutas de autenticación
const invitationRoutes = require('./interfaces/http/routes/invitation.routes'); // Importar rutas de invitaciones
const projectRoutes = require('./interfaces/http/routes/project.routes'); // Importar rutas de proyectos
const publicProjectRoutes = require('./interfaces/http/routes/publicProject.routes'); // Importar rutas de proyectos públicos
const projectDocumentRoutes = require('./application/routes/projectDocumentRoutes'); // Importar rutas de documentos
const interestRoutes = require('./interfaces/http/routes/interest.routes'); // Importar rutas de intereses
const investmentRoutes = require('./interfaces/http/routes/investment.routes'); // Importar rutas de inversiones

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
  const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:3001';
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// --- Rutas de la API ---
app.use('/api/auth', authRoutes); // Usar rutas de autenticación
app.use('/api/invitations', invitationRoutes); // Usar rutas de invitaciones
app.use('/api/projects/public', publicProjectRoutes); // Usar rutas de proyectos públicos
app.use('/api/projects', projectRoutes); // Usar rutas de proyectos
app.use('/api/interests', interestRoutes); // Usar rutas de intereses
app.use('/api', investmentRoutes); // Usar rutas de inversiones
app.use('/api', projectDocumentRoutes); // Usar rutas de documentos de proyectos

// Ruta básica de health check
app.use('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando correctamente' });
});

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