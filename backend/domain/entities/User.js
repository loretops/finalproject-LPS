/**
 * Represents a User entity in the domain layer.
 * Includes methods for managing user state, including email verification.
 */
class User {
  constructor({ 
    id, 
    email, 
    name, 
    role, 
    passwordHash, 
    firstName, 
    lastName,
    emailVerified = false,
    emailVerifiedAt = null,
    ...otherProps 
  }) {
    this.id = id;
    this.email = email;
    this.name = name || `${firstName || ''} ${lastName || ''}`.trim();
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role; 
    this.passwordHash = passwordHash;
    this.emailVerified = emailVerified;
    this.emailVerifiedAt = emailVerifiedAt instanceof Date ? 
      emailVerifiedAt : 
      (emailVerifiedAt ? new Date(emailVerifiedAt) : null);
    
    // Assign other properties if needed
    Object.assign(this, otherProps);
  }

  /**
   * Verifica el email del usuario
   * @returns {User} El usuario actualizado
   */
  verifyEmail() {
    this.emailVerified = true;
    this.emailVerifiedAt = new Date();
    return this;
  }

  /**
   * Comprueba si el email del usuario está verificado
   * @returns {boolean} True si el email está verificado
   */
  isEmailVerified() {
    return this.emailVerified === true;
  }

  /**
   * Comprueba si el usuario puede acceder a funcionalidades que requieren email verificado
   * @returns {boolean} True si el usuario puede acceder
   */
  canAccessVerifiedFeatures() {
    // Los administradores y gestores pueden acceder sin verificación de email
    if (this.role === 'admin' || this.role === 'manager') {
      return true;
    }
    
    // Para otros usuarios, se requiere email verificado
    return this.isEmailVerified();
  }

  /**
   * Obtiene el nombre completo del usuario
   * @returns {string} Nombre completo
   */
  getFullName() {
    if (this.name && this.name.trim() !== '') {
      return this.name;
    }
    
    return `${this.firstName || ''} ${this.lastName || ''}`.trim() || this.email.split('@')[0];
  }

  /**
   * Obtiene la información básica del usuario (segura para compartir)
   * @returns {Object} Información básica
   */
  getBasicInfo() {
    return {
      id: this.id,
      email: this.email,
      name: this.getFullName(),
      role: this.role,
      emailVerified: this.emailVerified
    };
  }
}

module.exports = User; 