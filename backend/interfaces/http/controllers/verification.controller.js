const emailVerificationService = require('../../../application/services/emailVerificationService');

/**
 * Controller for handling email verification operations
 */
class VerificationController {
  /**
   * Sends a verification email to the user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async sendVerificationEmail(req, res) {
    try {
      // Get the user ID from the authenticated user
      const userId = req.user?.id;
      
      if (!userId) {
        return res.status(401).json({ 
          success: false, 
          message: 'Authentication required' 
        });
      }
      
      // Send verification email
      await emailVerificationService.sendVerificationEmail(userId);
      
      return res.status(200).json({
        success: true,
        message: 'Verification email sent successfully'
      });
    } catch (error) {
      console.error('Error sending verification email:', error);
      
      // Handle specific errors
      if (error.message.includes('already verified')) {
        return res.status(400).json({
          success: false,
          message: 'Email is already verified'
        });
      }
      
      if (error.message.includes('User not found')) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      // Generic error
      return res.status(500).json({
        success: false,
        message: 'Failed to send verification email'
      });
    }
  }
  
  /**
   * Verifies an email using a token
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async verifyEmail(req, res) {
    try {
      const { token } = req.params;
      
      if (!token) {
        return res.status(400).json({
          success: false,
          message: 'Verification token is required'
        });
      }
      
      // Verify the email
      const result = await emailVerificationService.verifyEmail(token);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          message: 'Email verified successfully',
          user: result.user
        });
      } else {
        // Handle different verification failure reasons
        let statusCode = 400;
        let message = 'Invalid verification token';
        
        switch (result.reason) {
          case 'token_expired':
            message = 'Verification token has expired';
            break;
          case 'token_already_used':
            message = 'Verification token has already been used';
            break;
          case 'user_not_found':
            statusCode = 404;
            message = 'User not found';
            break;
          case 'server_error':
            statusCode = 500;
            message = 'Server error during verification';
            break;
        }
        
        return res.status(statusCode).json({
          success: false,
          message,
          reason: result.reason
        });
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to verify email'
      });
    }
  }
  
  /**
   * Resends a verification email
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async resendVerificationEmail(req, res) {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required'
        });
      }
      
      // Resend verification email
      const result = await emailVerificationService.resendVerificationEmail(email);
      
      if (result.success) {
        return res.status(200).json({
          success: true,
          message: 'Verification email resent successfully'
        });
      } else {
        // Handle different failure reasons
        let statusCode = 400;
        let message = 'Failed to resend verification email';
        
        switch (result.reason) {
          case 'user_not_found':
            statusCode = 404;
            message = 'User not found';
            break;
          case 'already_verified':
            message = 'Email is already verified';
            break;
          case 'server_error':
            statusCode = 500;
            message = 'Server error during resend operation';
            break;
        }
        
        return res.status(statusCode).json({
          success: false,
          message,
          reason: result.reason
        });
      }
    } catch (error) {
      console.error('Error resending verification email:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to resend verification email'
      });
    }
  }
  
  /**
   * Checks if the current user's email is verified
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async checkVerificationStatus(req, res) {
    try {
      const userId = req.user?.id;
      
      if (!userId) {
        return res.status(401).json({ 
          success: false, 
          message: 'Authentication required' 
        });
      }
      
      const isVerified = await emailVerificationService.isEmailVerified(userId);
      
      return res.status(200).json({
        success: true,
        verified: isVerified
      });
    } catch (error) {
      console.error('Error checking verification status:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to check verification status'
      });
    }
  }
}

module.exports = new VerificationController(); 