const loginUser = require('../../../application/use_cases/loginUser');
const invitationService = require('../../../application/services/invitationService'); // Importar servicio de invitación
const registerUser = require('../../../application/use_cases/registerUser'); // Importar caso de uso de registro
const LoginDto = require('../dto/login.dto'); // Optional: for validation/structure

/**
 * Controller for handling authentication-related HTTP requests.
 */
class AuthController {
  /**
   * Handles the POST /login request.
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async login(req, res) {
    try {
      // Optional basic validation or use DTO
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
      // const loginDto = new LoginDto(req.body); // Stricter validation via DTO

      // Call the use case
      const token = await loginUser({ email, password });

      // Send successful response
      res.status(200).json({ token });

    } catch (error) {
      console.error('Login error in AuthController:', error.message);
      // Handle specific errors from use case
      if (error.message === 'Invalid credentials') {
        return res.status(401).json({ message: 'Invalid credentials' });
      } if (error.message === 'Email and password are required') {
        return res.status(400).json({ message: error.message });
      }
      // Handle generic/server errors
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  }

  /**
   * Handles the GET /invitation/:token request to validate an invitation.
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async validateInvitation(req, res) {
    const { token } = req.params; // Obtener token de los parámetros de ruta

    try {
      const result = await invitationService.validateInvitationToken(token);

      if (result.isValid) {
        // Token válido: devolver OK con el email asociado
        res.status(200).json({ status: 'valid', email: result.email });
      } else {
        // Token inválido: determinar la razón y devolver el código apropiado
        switch (result.reason) {
          case 'not_found':
            res.status(404).json({ status: 'invalid', message: 'Invitation token not found.' });
            break;
          case 'used':
          case 'expired':
            res.status(410).json({ status: 'invalid', message: `Invitation token already ${result.reason}.` });
            break;
          case 'Token is required': // O cualquier otro error de validación inicial
             res.status(400).json({ status: 'invalid', message: 'Invitation token is required.' });
             break;
          default:
            res.status(400).json({ status: 'invalid', message: 'Invalid invitation token.' });
        }
      }
    } catch (error) {
      // Error inesperado en el servicio
      console.error(`Error validating invitation token ${token}:`, error);
      res.status(500).json({ message: 'An internal server error occurred while validating the invitation.' });
    }
  }

  /**
   * Handles the POST /register request to register a new user with an invitation token.
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async register(req, res) {
    try {
      const { firstName, lastName, email, password, token } = req.body;

      // 1. Validación básica
      if (!firstName || !lastName || !email || !password || !token) {
        return res.status(400).json({ 
          message: 'All fields are required: firstName, lastName, email, password, and invitation token.' 
        });
      }

      // 2. Validar el token de invitación
      const validationResult = await invitationService.validateInvitationToken(token);

      if (!validationResult.isValid) {
        // Si el token no es válido, devolver el error apropiado
        let statusCode = 400;
        let message = 'Invalid invitation token.';

        switch (validationResult.reason) {
          case 'not_found':
            statusCode = 404;
            message = 'Invitation token not found.';
            break;
          case 'used':
            statusCode = 410;
            message = 'Invitation token has already been used.';
            break;
          case 'expired':
            statusCode = 410;
            message = 'Invitation token has expired.';
            break;
        }

        return res.status(statusCode).json({ message });
      }

      // 3. Verificar que el email coincide con el de la invitación
      if (validationResult.email.toLowerCase() !== email.toLowerCase()) {
        return res.status(400).json({ 
          message: 'The email does not match the invitation.' 
        });
      }

      // 4. Registrar el usuario usando el caso de uso
      const userData = {
        firstName,
        lastName,
        email,
        password,
        role: 'partner' // Asignar rol automáticamente
      };

      const newUser = await registerUser(userData);

      // 5. Marcar la invitación como utilizada
      await invitationService.markInvitationAsUsed(token);

      // 6. Generar token JWT para la sesión inicial
      const authToken = await loginUser({ email, password });

      // 7. Responder con éxito y el token
      res.status(201).json({
        message: 'Registration successful.',
        user: { id: newUser.id, email: newUser.email, firstName: newUser.firstName, role: newUser.role }, // Devolver info básica del usuario
        token: authToken
      });

    } catch (error) {
      console.error('Registration error:', error);
      
      // Manejo de errores específicos
      if (error.message.includes('already exists')) {
        return res.status(409).json({ message: 'A user with this email already exists.' });
      }
      
      if (error.message.includes('password')) {
        // Podríamos ser más específicos si el caso de uso devuelve errores de validación de contraseña
        return res.status(400).json({ message: error.message }); 
      }
      
      // Error genérico
      res.status(500).json({ message: 'An error occurred during registration.' });
    }
  }

  // Add other methods for register, logout, etc.
}

// Export an instance or the class depending on your preference
module.exports = new AuthController(); 