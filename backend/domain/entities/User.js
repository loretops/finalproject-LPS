/**
 * Represents a User entity in the domain layer.
 * For now, it's a simple placeholder.
 * Can be expanded with methods for business logic later.
 */
class User {
  constructor({ id, email, name, role, passwordHash, ...otherProps }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.role = role; // Assuming role is an object or string
    this.passwordHash = passwordHash; // Store only the hash
    // Assign other properties if needed
    Object.assign(this, otherProps);
  }

  // Add domain-specific methods here if needed
  // e.g., changePassword(newPassword), updateProfile(data), etc.
}

module.exports = User; 