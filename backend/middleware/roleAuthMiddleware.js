/**
 * Middleware factory to check if the authenticated user has at least one of the required roles.
 * @param {string | string[]} requiredRoles - A single role name or an array of allowed role names.
 * @returns {function} Express middleware function.
 */
const roleAuthMiddleware = (requiredRoles) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user || !user.role || !user.role.name) {
      return res.status(403).json({ message: 'Acceso denegado. Rol de usuario no definido.' });
    }

    const userRoles = [user.role.name];
    
    // Si el usuario es un 'partner' con inversiones activas, se le considera también 'investor'
    if (user.role.name === 'partner' && user.isActiveInvestor) {
      userRoles.push('investor');
    }

    const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));

    if (!hasRequiredRole) {
      return res.status(403).json({
        message: `Acceso denegado. Se requiere uno de los siguientes roles: ${requiredRoles.join(', ')}`,
      });
    }

    next();
  };
};

module.exports = roleAuthMiddleware; 