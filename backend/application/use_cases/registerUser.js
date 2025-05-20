const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Validates and registers a new user.
 * @param {Object} userData - The user data.
 * @param {string} userData.firstName - The user's first name.
 * @param {string} userData.lastName - The user's last name.
 * @param {string} userData.email - The user's email.
 * @param {string} userData.password - The user's password.
 * @param {string} userData.role - The user's role (default: 'partner').
 * @returns {Promise<Object>} The created user (without password).
 * @throws {Error} If validation fails or user creation fails.
 */
const registerUser = async ({ firstName, lastName, email, password, role = 'partner' }) => {
  try {
    console.log('🧪 REGISTER_USER: Iniciando validación y registro de usuario');
    
    // 1. Validaciones adicionales
    if (!firstName || !lastName || !email || !password) {
      console.log('🧪 REGISTER_USER: Error - Faltan campos requeridos');
      throw new Error('First name, last name, email and password are required.');
    }

    // Validar formato de email básico con regex
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      console.log('🧪 REGISTER_USER: Error - Formato de email inválido');
      throw new Error('Invalid email format.');
    }

    // Validar contraseña: mínimo 8 caracteres, al menos 1 letra y 1 número
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      console.log('🧪 REGISTER_USER: Error - Contraseña no cumple requisitos');
      throw new Error('Password must be at least 8 characters long and contain at least one letter and one number.');
    }

    // 2. Verificar si el usuario ya existe
    console.log('🧪 REGISTER_USER: Verificando si el usuario ya existe');
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      console.log('🧪 REGISTER_USER: Error - Usuario ya existe');
      throw new Error('A user with this email already exists.');
    }

    // 3. Encriptar la contraseña
    console.log('🧪 REGISTER_USER: Encriptando contraseña');
    const saltRounds = 12; // Nivel de seguridad recomendado
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('🧪 REGISTER_USER: Contraseña encriptada exitosamente');

    // 4. Obtener el ID del rol
    console.log(`🧪 REGISTER_USER: Buscando rol '${role}'`);
    const roleRecord = await prisma.role.findUnique({
      where: { name: role }
    });

    if (!roleRecord) {
      console.log(`🧪 REGISTER_USER: Error - Rol '${role}' no encontrado`);
      throw new Error(`Role '${role}' not found. Please contact support.`);
    }
    console.log(`🧪 REGISTER_USER: Rol '${role}' encontrado con ID: ${roleRecord.id}`);

    // 5. Crear el usuario con el rol correspondiente
    const dataToCreate = {
      firstName,
      lastName,
      email,
      passwordHash: hashedPassword,
      roleId: roleRecord.id,
      status: 'active',
      emailVerified: false
    };

    // DEBUG: Log the exact data being sent to prisma.user.create
    console.log('🧪 REGISTER_USER: Datos para crear usuario:', JSON.stringify({
      ...dataToCreate,
      passwordHash: '[HASH_REDACTADO]' 
    }, null, 2));

    console.log('🧪 REGISTER_USER: Intentando crear usuario en base de datos');
    const newUser = await prisma.user.create({
      data: dataToCreate,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: {
          select: {
            name: true
          }
        },
        status: true,
        createdAt: true
      }
    });
    console.log('🧪 REGISTER_USER: Usuario creado exitosamente con ID:', newUser.id);

    return newUser;
  } catch (error) {
    console.error('🧪 REGISTER_USER ERROR DETALLADO:', error);
    console.error('🧪 REGISTER_USER ERROR STACK:', error.stack);
    
    // Si es un error de Prisma, mostrar códigos específicos
    if (error.code) {
      console.error('🧪 REGISTER_USER PRISMA ERROR CODE:', error.code);
      console.error('🧪 REGISTER_USER PRISMA META:', error.meta);
    }
    
    throw error; // Propagar el error para que el controlador pueda manejarlo
  }
};

module.exports = registerUser; 