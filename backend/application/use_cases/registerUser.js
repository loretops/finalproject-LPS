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
  // 1. Validaciones adicionales
  if (!firstName || !lastName || !email || !password) {
    throw new Error('First name, last name, email and password are required.');
  }

  // Validar formato de email básico con regex
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format.');
  }

  // Validar contraseña: mínimo 8 caracteres, al menos 1 letra y 1 número
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error('Password must be at least 8 characters long and contain at least one letter and one number.');
  }

  // 2. Verificar si el usuario ya existe
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw new Error('A user with this email already exists.');
  }

  // 3. Encriptar la contraseña
  const saltRounds = 12; // Nivel de seguridad recomendado
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // 4. Obtener el ID del rol
  const roleRecord = await prisma.role.findUnique({
    where: { name: role }
  });

  if (!roleRecord) {
    throw new Error(`Role '${role}' not found.`);
  }

  // 5. Crear el usuario con el rol correspondiente
  const dataToCreate = {
    firstName,
    lastName,
    email,
    passwordHash: hashedPassword,
    role: {
      connect: { id: roleRecord.id }
    },
    status: 'active',
    emailVerified: false
  };

  // DEBUG: Log the exact data being sent to prisma.user.create
  console.log('DEBUG: Data for prisma.user.create:', JSON.stringify(dataToCreate, null, 2));

  const newUser = await prisma.user.create({
    data: dataToCreate,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      status: true,
      createdAt: true
      // No incluir el passwordHash en la respuesta por seguridad
    }
  });

  return newUser;
};

module.exports = registerUser; 