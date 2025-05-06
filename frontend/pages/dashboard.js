import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Importar el hook de autenticación
import { useRouter } from 'next/router'; // Importar el router para redirigir
import Link from 'next/link'; // Importar Link para navegación

const DashboardPage = () => {
  const { isAuthenticated, loading, user, logout } = useAuth(); // Obtener estado de autenticación y la función logout
  const router = useRouter();

  useEffect(() => {
    // Solo actuar después de que el estado de autenticación se haya cargado
    // y si el usuario NO está autenticado.
    if (!loading && !isAuthenticated) {
      router.push('/login'); // Redirigir a la página de login
    }
  }, [isAuthenticated, loading, router]); // Dependencias del efecto

  // Mostrar un estado de carga mientras se verifica la autenticación
  // o si todavía no está autenticado pero aún no se ha redirigido.
  if (loading || !isAuthenticated) {
    return <div>Cargando...</div>; // O un componente Spinner más elegante
  }

  // Si ha pasado la carga y está autenticado, mostrar el contenido
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      {/* Saludamos al usuario (usando email como placeholder por ahora) */}
      <p>Bienvenido al área privada{user?.email ? `, ${user.email}` : ''}!</p>
      
      {/* Menú de navegación si es gestor */}
      {user?.role === 'manager' && (
        <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <h2>Gestión</h2>
          <nav style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <Link 
              href="/admin/invitations"
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#007bff',
                color: 'white',
                borderRadius: '4px',
                textDecoration: 'none'
              }}
            >
              Gestionar Invitaciones
            </Link>
            {/* Añadir más enlaces de administración aquí si es necesario */}
          </nav>
        </div>
      )}
      
      {/* Botón de Logout */}
      <button 
        onClick={logout} 
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage; 