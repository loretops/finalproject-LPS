/**
 * Middleware factory to check if the authenticated user has at least one of the required roles.
 * @param {string | string[]} requiredRoles - A single role name or an array of allowed role names.
 * @returns {function} Express middleware function.
 */
function roleAuthMiddleware(requiredRoles) {
  // Ensure requiredRoles is always an array
  const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

  if (roles.length === 0) {
    throw new Error('roleAuthMiddleware requires at least one role.');
  }

  return (req, res, next) => {
    // Assumes jwtAuthMiddleware has run and attached user info
    if (!req.user || !req.user.role) {
      console.warn('Role check failed: req.user or req.user.role is missing. Ensure jwtAuthMiddleware runs first.');
      // 403 Forbidden is more appropriate than 401 Unauthorized here
      return res.status(403).json({ message: 'Forbidden: User role information is missing.' });
    }

    // Check if the user's role is included in the allowed roles
    if (roles.includes(req.user.role)) {
      next(); // User has the required role, proceed
    } else {
      console.warn(`Role check failed: User role '${req.user.role}' is not in allowed roles [${roles.join(', ')}] for ${req.originalUrl}`);
      res.status(403).json({
        message: `Forbidden: Access restricted. Required role(s): ${roles.join(' or ')}.`
      });
    }
  };
}

module.exports = roleAuthMiddleware; 