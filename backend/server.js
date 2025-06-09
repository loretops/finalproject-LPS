// Cargar variables de entorno
require('dotenv').config({ path: '../.env' }); // Primero carga el .env de la raíz 
require('dotenv').config({ path: '.env' }); // Luego intenta cargar el .env del backend si existe

// Importaciones
const express = require('express');
const path = require('path'); // Agregar path para manejar rutas de archivos
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

// Importar la instancia compartida de PrismaClient
const prisma = require('./utils/prismaClient');

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
const dashboardRoutes = require('./interfaces/http/routes/dashboard.routes');

// <<< AÑADIR ESTE LOG AL INICIO >>>
console.log('DEBUG STARTUP - Reading FRONTEND_URL env var:', process.env.FRONTEND_URL);
// <<< FIN DEL LOG >>>

// Inicialización
const app = express();
const port = process.env.BACKEND_PORT || process.env.PORT || 8001;
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;

// Middleware de seguridad
app.use(helmet());

// Configurar rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000, // 15 minutos por defecto
  max: parseInt(process.env.RATE_LIMIT_MAX || 100), // límite de 100 solicitudes por ventana
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiadas solicitudes, por favor intente más tarde' }
});

// Aplicar límite de tasa a todas las solicitudes
app.use(limiter);

// Middleware estándar
app.use(express.json({ limit: '1mb' })); // Limitar tamaño de payload
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configuración CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir solicitudes sin origen (como las aplicaciones móviles o curl)
    if (!origin) return callback(null, true);
    
    // Lista de orígenes permitidos
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      process.env.FRONTEND_URL
    ].filter(Boolean); // Eliminar valores nulos o indefinidos
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.log('Origen bloqueado por CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
};

// Aplicar configuración CORS
app.use(cors(corsOptions));

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
app.use('/api/dashboard', dashboardRoutes);

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
    console.log(`Servidor backend ejecutándose en ${baseUrl}`);
    console.log(`Archivos estáticos disponibles en ${baseUrl}/uploads`);
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