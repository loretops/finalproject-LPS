const jwt = require('jsonwebtoken');
const PrismaUserRepository = require('../infrastructure/repositories/PrismaUserRepository');

const userRepository = new PrismaUserRepository();
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware to verify JWT token and attach user info to request object.
 */
async function jwtAuthMiddleware(req, res, next) {
  // 1. Get token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required: No token provided.' });
  }
  const token = authHeader.split(' ')[1];

  // 2. Verify token
  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined! Cannot verify token.');
    return res.status(500).json({ message: 'Server configuration error.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // 3. Check if payload has userId (adjust based on your JWT payload)
    if (!decoded.userId) {
      console.warn('JWT verification successful, but no userId found in payload.', decoded);
      return res.status(401).json({ message: 'Invalid authentication token payload.' });
    }

    // 4. (Optional but Recommended) Fetch user from DB to ensure they still exist and get fresh data
    const user = await userRepository.findById(decoded.userId);
    if (!user) {
      console.warn(`User with ID ${decoded.userId} from valid JWT not found in DB.`);
      return res.status(401).json({ message: 'Authenticated user not found.' });
    }

    // 5. Attach user information to the request object
    // We attach the full user object fetched from DB, including the role
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role?.name, // Extract role name
      // Add other relevant user fields if needed
    };

    next(); // Proceed to the next middleware or route handler

  } catch (error) {
    // Handle specific JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Authentication token has expired.' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid authentication token.' });
    }
    // Handle other unexpected errors
    console.error('Error during JWT verification:', error);
    return res.status(500).json({ message: 'Internal server error during authentication.' });
  }
}

module.exports = jwtAuthMiddleware; 