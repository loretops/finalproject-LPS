const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PrismaUserRepository = require('../../infrastructure/repositories/PrismaUserRepository');

// Normally you'd use Dependency Injection here
// For simplicity, we instantiate the repository directly
const userRepository = new PrismaUserRepository();

/**
 * Use case for handling user login.
 * @param {object} credentials - User credentials.
 * @param {string} credentials.email - User's email.
 * @param {string} credentials.password - User's plaintext password.
 * @returns {Promise<string>} JWT token if successful.
 * @throws {Error} If authentication fails or an error occurs.
 */
async function loginUser({ email, password }) {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const user = await userRepository.findByEmail(email);

  if (!user) {
    // Avoid revealing if the user exists or not for security
    console.warn(`Login attempt failed for non-existent email: ${email}`);
    throw new Error('Invalid credentials');
  }

  // Compare the provided password with the stored hash
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    console.warn(`Login attempt failed for user ${email} due to invalid password`);
    throw new Error('Invalid credentials');
  }

  // Check if JWT Secret is configured
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error('JWT_SECRET is not defined in environment variables!');
    throw new Error('Server configuration error');
  }

  // Prepare payload for JWT
  const payload = {
    userId: user.id,
    email: user.email,
    // Add role if available and needed for authorization
    role: user.role?.name || 'default' // Example: accessing role name if populated
  };

  const expiresIn = process.env.JWT_EXPIRES_IN || '1h'; // Default expiration to 1 hour

  // Generate JWT
  try {
    const token = jwt.sign(payload, jwtSecret, { expiresIn });
    console.log(`User ${email} logged in successfully.`);
    return token;
  } catch (error) {
    console.error('Error generating JWT:', error);
    throw new Error('Could not generate authentication token');
  }
}

module.exports = loginUser; 