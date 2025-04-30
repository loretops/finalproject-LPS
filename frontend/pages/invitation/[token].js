import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Para el enlace de registro o a la home
// Importar el servicio de autenticación (ajusta la ruta si es necesario)
import { validateInvitationToken } from '../../services/authService'; // Descomentado y usando la función específica

const ValidateInvitationPage = () => {
  const router = useRouter();
  const { token } = router.query; // Obtiene el token de la URL

  const [loading, setLoading] = useState(true);
  const [validationResult, setValidationResult] = useState({ status: null, message: '', email: null });

  useEffect(() => {
    // Asegurarse de que el token está disponible en la query de la URL
    if (token) {
      console.log(`Validating token: ${token}`);
      setLoading(true);

      const validateToken = async () => {
        try {
          // --- INICIO LLAMADA REAL --- 
          const response = await validateInvitationToken(token);
          console.log('API Response:', response);

          if (response.status === 'valid') {
            setValidationResult({ 
              status: 'valid', 
              message: 'Invitation is valid!', 
              email: response.email 
            });
            // Redirigir a registro si es válido
            // Esperar un breve momento para que el usuario vea el mensaje (opcional)
            setTimeout(() => {
              router.push(`/register?token=${token}&email=${encodeURIComponent(response.email)}`); 
            }, 1500); // Espera 1.5 segundos
          } else {
             // El token es inválido (not_found, used, expired) - la API devuelve status 'invalid'
             setValidationResult({ 
               status: 'invalid', 
               message: response.message || 'Invalid invitation token.' // Usar mensaje de la API
             });
             setLoading(false);
          }
          // --- FIN LLAMADA REAL ---
          
          // --- SIMULACIÓN ELIMINADA --- 

        } catch (error) {
          // --- INICIO MANEJO DE ERROR REAL --- 
          console.error('Error validating invitation token:', error);
          let errorMessage = 'Failed to validate invitation token.';
          // En este caso, nuestro servicio ya maneja los errores 4xx/5xx y los devuelve
          // como una respuesta normal, así que el error aquí sería por un fallo de red
          // o un error inesperado no controlado por el servicio.
          setValidationResult({ 
            status: 'error', 
            message: errorMessage // Mensaje genérico para errores inesperados
          });
          setLoading(false);
          // --- FIN MANEJO DE ERROR REAL --- 
        }
      };
      
      validateToken();

    } else {
      // Token aún no disponible en router.query, esperar
      // console.log('Token not available yet...');
    }

  }, [token, router]); // Depender de token y router

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Validating Invitation</h1>
      {loading && <p>Loading, please wait...</p>}
      
      {!loading && validationResult.status === 'valid' && (
        <p style={{ color: 'green' }}>{validationResult.message} Redirecting to registration...</p>
      )}

      {!loading && (validationResult.status === 'invalid' || validationResult.status === 'error') && (
        <div>
          <p style={{ color: 'red' }}>Error: {validationResult.message}</p>
          <Link href="/">
            <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
              Go back to Home
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ValidateInvitationPage; 