/**
 * Data Transfer Object for login requests.
 * Primarily for documentation and potential validation.
 */
class LoginDto {
  /**
   * @param {object} data - The request body data.
   * @param {string} data.email - The user's email.
   * @param {string} data.password - The user's password.
   */
  constructor({ email, password }) {
    if (!email || typeof email !== 'string') {
      throw new Error('Invalid or missing email');
    }
    if (!password || typeof password !== 'string') {
      throw new Error('Invalid or missing password');
    }
    this.email = email;
    this.password = password;
  }
}

module.exports = LoginDto; 