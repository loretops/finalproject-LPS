// Importar dependencias
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // Añadir helmet para seguridad

// Inicializar aplicación Express
const app = express();

// Middleware de seguridad
app.use(helmet()); // Proporciona cabeceras HTTP seguras
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_URL 
    : 'http://localhost:3000',
  credentials: true // Necesario para cookies/autenticación
}));
app.use(express.json({ limit: '1mb' })); // Limita el tamaño de payloads

// Middleware para prevenir ataques de fuerza bruta
const rateLimit = require('express-rate-limit');
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 peticiones por ventana
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', apiLimiter);

// Rutas básicas
app.get('/', (req, res) => {
  res.json({ message: '¡Hola Mundo desde COOPCO API!' });
});

// Importar rutas adicionales (comentado por ahora)
// const routes = require('./routes');
// app.use('/api', routes);

// Puerto
const PORT = process.env.PORT || 5000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
