// Cargar variables de entorno
const path = require('path'); // Agregar path para manejar rutas de archivos
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// <<< AÑADIR ESTE LOG AL INICIO PARA DEPURACIÓN >>>
console.log('DEBUG STARTUP - Reading FRONTEND_URL env var:', process.env.FRONTEND_URL);
console.log('DEBUG STARTUP - Reading DATABASE_URL env var:', process.env.DATABASE_URL ? 'URL existe' : 'URL no encontrada');
console.log('DEBUG STARTUP - DATABASE_URL:', process.env.DATABASE_URL);

// <<< EJECUTAR DIAGNÓSTICO DE RENDER >>>
try {
  require('./render-debug.js');
} catch (debugError) {
  console.error('Error en diagnóstico de Render:', debugError.message);
}
// <<< FIN DEL LOG >>>

// Importaciones de dependencias
const express = require('express');
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

// Inicialización
const app = express();
const port = process.env.BACKEND_PORT || process.env.PORT || 8001;
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;

// Middleware de seguridad
app.use(helmet());

// Configurar rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000, // 15 minutos por defecto
  max: parseInt(process.env.RATE_LIMIT_MAX || 500), // aumentamos el límite a 500 solicitudes por ventana
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiadas solicitudes, por favor intente más tarde' }
});

// Aplicar límite de tasa a todas las solicitudes excepto a las rutas de verificación
app.use((req, res, next) => {
  if (req.path.includes('/api/verification') || req.path.includes('/api/notifications')) {
    return next(); // No aplicar rate limit a estas rutas
  }
  limiter(req, res, next);
});

// Middleware estándar
app.use(express.json({ limit: '1mb' })); // Limitar tamaño de payload
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.resolve(__dirname, 'public')));
// Servir archivos estáticos de uploads
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

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
    
    // Log para depuración
    console.log(`CORS request from origin: ${origin}, allowed origins: ${JSON.stringify(allowedOrigins)}`);
    
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

// Middleware adicional para asegurar cabeceras CORS en todas las respuestas
app.use((req, res, next) => {
  // Obtener el origen de la solicitud o usar localhost por defecto
  const origin = req.headers.origin || 'http://localhost:3001';
  
  // Configurar cabeceras CORS explícitamente
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Manejar solicitudes preflight OPTIONS de forma especial
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
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

  // Manejar errores específicos de Prisma
  if (err.code === 'P1001') {
    return res.status(500).json({ 
      error: 'Error de conexión a la base de datos',
      message: 'No se pudo conectar a la base de datos. Por favor, inténtelo de nuevo más tarde.',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
  
  // Manejar errores de CORS
  if (err.message && err.message.includes('CORS')) {
    return res.status(403).json({ 
      error: 'Error de CORS',
      message: 'La solicitud fue bloqueada por política de CORS',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
  
  // Respuesta genérica para otros errores
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