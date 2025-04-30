import React, { useState } from 'react';
import { createInvitation } from '../../services/invitationService';

const InvitationForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Reset states
    setIsLoading(true);
    setMessage('');
    setError('');

    // Basic email validation
    if (!email) {
      const msg = 'Por favor, introduce un email.';
      setError(msg);
      setIsLoading(false);
      return;
    }

    // More thorough email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      const msg = 'Por favor, introduce un email válido.';
      setError(msg);
      setIsLoading(false);
      return;
    }

    try {
      const response = await createInvitation(email);
      setMessage(response.message || `Invitación enviada correctamente a ${email}`);
      setEmail(''); // Clear the form on success
    } catch (err) {
      // Get the error message from the error object
      setError(err.message || 'Ha ocurrido un error al enviar la invitación.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email del futuro socio:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@dominio.com"
            style={styles.input}
            disabled={isLoading}
            required
          />
        </div>

        {message && <p style={styles.successMessage}>{message}</p>}
        {error && <p style={styles.errorMessage}>{error}</p>}

        <button 
          type="submit" 
          disabled={isLoading} 
          style={isLoading ? { ...styles.submitButton, ...styles.submitButtonDisabled } : styles.submitButton}
        >
          {isLoading ? 'Enviando...' : 'Enviar Invitación'}
        </button>
      </form>
    </div>
  );
};

// Inline styles consistent with other components
const styles = {
  container: {
    marginTop: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    display: 'block',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  submitButton: {
    padding: '10px 15px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    alignSelf: 'flex-start',
  },
  submitButtonDisabled: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
  },
  successMessage: {
    color: 'green',
    padding: '10px',
    backgroundColor: '#e6ffe6',
    border: '1px solid #b3ffb3',
    borderRadius: '4px',
    marginBottom: '15px',
  },
  errorMessage: {
    color: 'red',
    padding: '10px',
    backgroundColor: '#ffe6e6',
    border: '1px solid #ffb3b3',
    borderRadius: '4px',
    marginBottom: '15px',
  }
};

export default InvitationForm; 