/**
 * Represents a VerificationToken entity in the domain layer.
 * Used for email verification processes.
 */
class VerificationToken {
  constructor({ 
    id, 
    userId, 
    token, 
    used = false, 
    createdAt = new Date(), 
    expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000), // Default 24 hours expiration
    ...otherProps 
  }) {
    this.id = id;
    this.userId = userId;
    this.token = token;
    this.used = used;
    this.createdAt = createdAt instanceof Date ? createdAt : new Date(createdAt);
    this.expiresAt = expiresAt instanceof Date ? expiresAt : new Date(expiresAt);
    
    // Assign other properties if needed
    Object.assign(this, otherProps);
  }

  /**
   * Checks if the token has expired
   * @returns {boolean} True if the token has expired, false otherwise
   */
  hasExpired() {
    return this.expiresAt < new Date();
  }

  /**
   * Checks if the token is valid (not used and not expired)
   * @returns {boolean} True if the token is valid, false otherwise
   */
  isValid() {
    return !this.used && !this.hasExpired();
  }

  /**
   * Marks the token as used
   * @returns {VerificationToken} The updated token
   */
  markAsUsed() {
    this.used = true;
    return this;
  }

  /**
   * Creates a verification token with specified expiration time
   * @param {Object} data - Token data
   * @param {string} data.userId - The user ID
   * @param {string} data.token - The token string
   * @param {number} expirationHours - Hours until expiration (default: 24)
   * @returns {VerificationToken} A new verification token instance
   */
  static create(data, expirationHours = 24) {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + expirationHours);
    
    return new VerificationToken({
      ...data,
      used: false,
      createdAt: new Date(),
      expiresAt
    });
  }
}

module.exports = VerificationToken; 