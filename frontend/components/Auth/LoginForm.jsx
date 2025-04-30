import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth(); // Get login function and state from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
    await login(email, password);
    // The context handles redirection on success or sets the error state
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Login</h2>
      {error && <p style={styles.error}>{error}</p>} {/* Display login errors */}
      <div style={styles.inputGroup}>
        <label htmlFor="email" style={styles.label}>Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
          disabled={loading} // Disable input while loading
        />
      </div>
      <div style={styles.inputGroup}>
        <label htmlFor="password" style={styles.label}>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
          disabled={loading} // Disable input while loading
        />
      </div>
      <button type="submit" style={styles.button} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'} {/* Show loading state */}
      </button>
    </form>
  );
};

// Basic inline styles for demonstration
const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  }
};

export default LoginForm; 