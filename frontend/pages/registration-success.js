import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const RegistrationSuccessPage = () => {
  const router = useRouter();

  // Estilos básicos (mover a CSS si se prefiere)
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '50px auto',
      padding: '40px',
      textAlign: 'center',
      border: '1px solid #d4edda',
      backgroundColor: '#d4edda', // Verde claro
      color: '#155724', // Verde oscuro
      borderRadius: '8px',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      marginBottom: '20px',
    },
    paragraph: {
      marginBottom: '25px',
      fontSize: '1.1em',
    },
    link: {
      display: 'inline-block',
      padding: '10px 20px',
      backgroundColor: '#007bff', // Azul
      color: 'white',
      textDecoration: 'none',
      borderRadius: '5px',
      transition: 'background-color 0.2s ease',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>¡Registro Completado!</h1>
      <p style={styles.paragraph}>
        Tu cuenta ha sido creada exitosamente. Ahora puedes iniciar sesión.
      </p>
      {/* 
        // Sección opcional para verificación de email (si se implementa)
        <p style={styles.paragraph}>
          Hemos enviado un correo electrónico a tu dirección para verificar tu cuenta.
          Por favor, revisa tu bandeja de entrada (y spam) y sigue las instrucciones.
        </p>
        <button 
          // onClick={handleResendVerification} // Añadir lógica si se implementa reenvío
          style={{ ...styles.link, backgroundColor: '#6c757d', marginRight: '10px' }} // Gris
        >
          Reenviar Email de Verificación
        </button> 
      */}
      <Link href="/login" style={styles.link}>
        Ir a Iniciar Sesión
      </Link>
    </div>
  );
};

export default RegistrationSuccessPage; 