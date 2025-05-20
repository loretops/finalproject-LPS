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
      console.log('🔍 REGISTRO: Iniciando proceso de registro');
      const { firstName, lastName, email, password, token } = req.body;
      console.log('🔍 REGISTRO: Datos recibidos:', { firstName, lastName, email, token, password: '***REDACTED***' });

      // 1. Validación básica
      if (!firstName || !lastName || !email || !password || !token) {
        console.log('🔍 REGISTRO: Error de validación - campos faltantes');
        return res.status(400).json({ 
          message: 'All fields are required: firstName, lastName, email, password, and invitation token.' 
        });
      }

      // 2. Validar el token de invitación
      console.log('🔍 REGISTRO: Validando token de invitación:', token);
      const validationResult = await invitationService.validateInvitationToken(token);
      console.log('🔍 REGISTRO: Resultado de validación de token:', validationResult);

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

        console.log(`🔍 REGISTRO: Token inválido - ${message}`);
        return res.status(statusCode).json({ message });
      }

      // 3. Verificar que el email coincide con el de la invitación
      if (validationResult.email.toLowerCase() !== email.toLowerCase()) {
        console.log(`🔍 REGISTRO: Email no coincide - Invitación: ${validationResult.email}, Registro: ${email}`);
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

      console.log('🔍 REGISTRO: Intentando registrar usuario:', { ...userData, password: '[REDACTED]' });

      try {
        const newUser = await registerUser(userData);
        console.log('🔍 REGISTRO: Usuario creado exitosamente:', { id: newUser.id, email: newUser.email });

        // 5. Marcar la invitación como utilizada
        console.log('🔍 REGISTRO: Marcando invitación como utilizada');
        await invitationService.markInvitationAsUsed(token);
        console.log('🔍 REGISTRO: Invitación marcada como utilizada exitosamente');

        // 6. Generar token JWT para la sesión inicial
        console.log('🔍 REGISTRO: Generando token JWT para inicio de sesión');
        const authToken = await loginUser({ email, password });
        console.log('🔍 REGISTRO: Token JWT generado exitosamente');

        // 7. Responder con éxito y el token
        console.log('🔍 REGISTRO: Enviando respuesta exitosa al cliente');
        res.status(201).json({
          message: 'Registration successful.',
          user: { 
            id: newUser.id, 
            email: newUser.email, 
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            role: newUser.role 
          },
          token: authToken
        });
      } catch (registerError) {
        console.error('🔍 REGISTRO: Error específico en registerUser:', registerError);
        // Re-lanzar para ser manejado por el catch exterior
        throw registerError;
      }

    } catch (error) {
      console.error('🔍 REGISTRO ERROR DETALLADO:', error);
      console.error('🔍 REGISTRO ERROR Stack:', error.stack);
      
      // Manejo de errores específicos
      if (error.message.includes('already exists')) {
        return res.status(409).json({ message: 'A user with this email already exists.' });
      }
      
      if (error.message.includes('Password must')) {
        return res.status(400).json({ message: error.message }); 
      }

      if (error.message.includes('Role')) {
        return res.status(500).json({ message: 'Error configuring user role. Please contact support.' });
      }
      
      // Error genérico
      res.status(500).json({ 
        message: 'An error occurred during registration.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Add other methods for register, logout, etc.
}

// Export an instance or the class depending on your preference
module.exports = new AuthController(); 