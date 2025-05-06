import React from 'react';
import LoginForm from '../components/Auth/LoginForm';
import { AuthProvider } from '../context/AuthContext'; // Import AuthProvider if not wrapping in _app.js
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated and not loading
  // Check loading state to prevent premature redirect before auth status is confirmed
  React.useEffect(() => {
    if (!loading && isAuthenticated) {
        router.push('/dashboard'); // Or wherever authenticated users should go
    }
  }, [isAuthenticated, loading, router]);

  // Show loading indicator or null while checking auth status
  if (loading || isAuthenticated) {
      return <div>Loading...</div>; // Or a spinner component
  }

  // Render the login form if not authenticated and done loading
  return (
    <div>
      {/* If AuthProvider wraps _app.js, you don't need it here */}
      {/* <AuthProvider> */}
        <h1>Login Page</h1>
        <LoginForm />
      {/* </AuthProvider> */}
    </div>
  );
};

export default LoginPage; 