import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { register } from '../../services/authService'; // Import the register function
// Optional: import a password strength meter component if you have one
// import PasswordStrengthMeter from './PasswordStrengthMeter'; 

const RegistrationForm = ({ invitationToken, prefilledEmail }) => {
  // const [name, setName] = useState(''); // Old state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0); // Example state for strength
  const router = useRouter();

  useEffect(() => {
    // Reset form if token or email changes
    // setName(''); // Old reset
    setFirstName('');
    setLastName('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setLoading(false);
  }, [invitationToken, prefilledEmail]);

  // Basic password strength calculation (example)
  useEffect(() => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength); // Max 5 in this example
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // --- Client-Side Validation ---
    if (!firstName) {
      const msg = 'El nombre es obligatorio.';
      setError(msg);
      return;
    }
    if (!lastName) {
      const msg = 'Los apellidos son obligatorios.';
      setError(msg);
      return;
    }
    if (!password) {
      const msg = 'La contraseña es obligatoria.';
      setError(msg);
      return;
    }
    if (password !== confirmPassword) {
      const msg = 'Las contraseñas no coinciden.';
      setError(msg);
      return;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      const msg = 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra y un número.';
      setError(msg);
      return;
    }
    // --- End Validation ---

    setLoading(true);

    try {
      const userData = {
        // name, // Old data
        firstName,
        lastName,
        email: prefilledEmail, // Use the prefilled email
        password,
        token: invitationToken, // Pass the invitation token
      };
      
      const response = await register(userData);
      
      // On successful registration, the authService automatically logs the user in
      // by storing the token. We can now redirect to the dashboard.
      router.push('/dashboard'); // Redirect after successful registration

    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.message || 'Error durante el registro. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
      {error && <p style={styles.errorMessage}>{error}</p>}
      
      <div style={styles.formGroup}>
        {/* Changed from 'name' to 'firstName' */}
        <label htmlFor="firstName" style={styles.label}>Nombre:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          style={styles.input}
        />
      </div>

      {/* Added lastName field */}
      <div style={styles.formGroup}>
        <label htmlFor="lastName" style={styles.label}>Apellidos:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="email" style={styles.label}>Email:</label>
        <input
          type="email"
          id="email"
          value={prefilledEmail} // Display the prefilled email
          readOnly // Make it non-editable
          style={{...styles.input, ...styles.readOnlyInput}} // Apply read-only styling
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="password" style={styles.label}>Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        {/* Optional: Display password strength meter */}
        {/* <PasswordStrengthMeter strength={passwordStrength} /> */}
         <div style={{ marginTop: '5px', fontSize: '0.8em' }}>
          Fortaleza: {passwordStrength}/5 
          <meter value={passwordStrength} min="0" max="5" style={{ width: '100%', height: '10px' }}></meter>
        </div>
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="confirmPassword" style={styles.label}>Confirmar Contraseña:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={styles.input}
        />
      </div>

      <button 
        type="submit" 
        disabled={loading} 
        style={loading ? {...styles.button, ...styles.buttonDisabled} : styles.button}
      >
        {loading ? 'Registrando...' : 'Completar Registro'}
      </button>
    </form>
  );
};

// Basic inline styles (consider moving to a CSS module or styled-components)
const styles = {
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box', // Ensure padding doesn't affect width
  },
   readOnlyInput: {
    backgroundColor: '#e9ecef', // Grey background for read-only
    cursor: 'not-allowed',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  buttonDisabled: {
    backgroundColor: '#6c757d',
    cursor: 'not-allowed',
  },
  errorMessage: {
    color: 'red',
    backgroundColor: '#f8d7da',
    border: '1px solid #f5c6cb',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
};

export default RegistrationForm; 