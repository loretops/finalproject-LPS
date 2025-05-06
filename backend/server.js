require('dotenv').config({ path: '../.env' });

// Importaciones
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authRoutes = require('./interfaces/http/routes/auth.routes'); // Importar rutas de autenticación
const invitationRoutes = require('./interfaces/http/routes/invitation.routes'); // Importar rutas de invitaciones

// <<< AÑADIR ESTE LOG AL INICIO >>>
console.log('DEBUG STARTUP - Reading FRONTEND_URL env var:', process.env.FRONTEND_URL);
// <<< FIN DEL LOG >>>

// Inicialización
const app = express();
const prisma = new PrismaClient();
const port = process.env.BACKEND_PORT || 8001;

// Middleware
app.use(express.json());

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

// Ruta básica de health check
app.get('/api/health', (req, res) => {
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

// Middleware para manejo de errores (Opcional, pero recomendado)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// <<< Exportar la app ANTES de iniciar el servidor >>>
module.exports = app;

// <<< Iniciar servidor solo si el script se ejecuta directamente >>>
if (require.main === module) {
  const server = app.listen(port, () => {
    console.log(`Servidor backend ejecutándose en http://localhost:${port}`);
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