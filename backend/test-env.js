// Cargar variables de entorno
require('dotenv').config({ path: '../.env' });
require('dotenv').config({ path: './.env' });

// Imprimir todas las variables relevantes
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('Variables DATABASE:', Object.keys(process.env).filter(key => key.includes('DATABASE')));
console.log('Variables FRONTEND:', Object.keys(process.env).filter(key => key.includes('FRONTEND'))); 