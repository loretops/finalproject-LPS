import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
// Importar el servicio de registro (ajustar ruta si es necesario)
import { register } from '../services/authService';
// Opcional: Importar contexto de autenticación si se usa para actualizar estado global
// import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const router = useRouter();
  // const { login: contextLogin } = useAuth(); // Obtener función para actualizar contexto

  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',       // Se llenará desde la URL
    password: '',
    confirmPassword: '',
  });
  const [token, setToken] = useState(''); // Se llenará desde la URL

  // Estado para UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Obtener token y email de la URL cuando el router esté listo
  useEffect(() => {
    if (router.isReady) {
      const { token: urlToken, email: urlEmail } = router.query;
      if (urlToken && urlEmail) {
        setToken(urlToken);
        setFormData(prev => ({ ...prev, email: urlEmail }));
      } else {
        setError('Información de invitación inválida o faltante. No se puede registrar.');
        // O redirigir a otra página si no hay token/email
        // router.push('/'); 
      }
    }
  }, [router.isReady, router.query]);

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar errores específicos al escribir
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
    setError(''); // Limpiar error general
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir recarga de página
    setError(''); // Limpiar errores previos
    setPasswordError('');

    // --- Validaciones Frontend --- 
    if (!formData.firstName || !formData.lastName || !formData.password || !formData.confirmPassword) {
      setError('Todos los campos (excepto email) son requeridos.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Las contraseñas no coinciden.');
      return;
    }
    // Añadir validación de fortaleza de contraseña si se desea
    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    // if (!passwordRegex.test(formData.password)) {
    //   setPasswordError('La contraseña debe tener al menos 8 caracteres, una letra y un número.');
    //   return;
    // }

    setLoading(true);
    console.log('Enviando datos de registro:', {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      token: token
    });

    // --- Preparar datos para la API --- 
    const registrationData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      token: token
    };
    console.log('Enviando datos de registro a la API:', registrationData);

    // --- Llamada a API Real --- 
    try {
      // Llamada al servicio real
      const response = await register(registrationData);
      console.log('API Response:', response);

      // Éxito: El servicio ya guarda el token en localStorage.
      // Opcional: Actualizar estado global de autenticación si se usa contexto
      // if (contextLogin) { contextLogin(response.token); } // Actualiza el contexto 

      // Redirigir a la página de éxito o al dashboard
      // Idealmente, la página de confirmación del Ticket #11
      router.push('/registration-success'); 
      // O si el login es inmediato y se prefiere ir al dashboard:
      // router.push('/dashboard');

    } catch (apiError) {
      // El servicio register ya lanza un Error con el mensaje del backend o uno genérico
      console.error('Error en el registro:', apiError);
      setError(apiError.message || 'Ocurrió un error durante el registro.');
    } finally {
      setLoading(false);
    }
    // --- Fin Llamada a API --- 
  };

  return (
    <div style={styles.container}>
      <h1>Registro de Nuevo Socio</h1>
      <p>Bienvenido/a. Por favor, completa tus datos para finalizar el registro.</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Email (invitación)</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email} // Valor desde la URL
            readOnly // No editable
            style={{ ...styles.input, backgroundColor: '#e9ecef' }} // Estilo para indicar no editable
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="firstName" style={styles.label}>Nombre</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="lastName" style={styles.label}>Apellidos</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="confirmPassword" style={styles.label}>Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={passwordError ? { ...styles.input, ...styles.inputError } : styles.input}
          />
          {passwordError && <p style={styles.errorTextSmall}>{passwordError}</p>}
        </div>

        {error && <p style={styles.errorTextGeneral}>{error}</p>}

        <button type="submit" disabled={loading || !token} style={styles.button}>
          {loading ? 'Registrando...' : 'Completar Registro'}
        </button>
      </form>

      {!token && error && (
         <p style={{marginTop: '1rem'}}>Si tienes problemas, contacta con el administrador o <Link href="/"><span style={{color:'blue', textDecoration: 'underline'}}>vuelve al inicio</span></Link>.</p>
      )}
    </div>
  );
};

// Estilos básicos (puedes moverlos a un archivo CSS o usar CSS-in-JS)
const styles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '30px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
    fontSize: '0.9em',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1em',
  },
  inputError: {
    borderColor: 'red',
  },
  button: {
    padding: '12px 15px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1em',
    marginTop: '10px',
    transition: 'background-color 0.2s ease',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  errorTextGeneral: {
    color: 'red',
    textAlign: 'center',
    marginTop: '10px',
    fontSize: '0.9em',
  },
   errorTextSmall: {
    color: 'red',
    marginTop: '5px',
    fontSize: '0.8em',
  }
};


export default RegisterPage; 